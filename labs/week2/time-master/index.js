
function formatNumberToText(number){
    return number<10?`0${number}`:`${number}`
}

function isWithinRange(number,{start, end}){
    return number<=end&&number>=start
}

// Class Constructor
function Clock({setTo24HourFormat, color} = {setTo24HourFormat: false, color: '#515151'}){
    const date = new Date()
    this.hours = date.getHours()
    this.minutes = date.getMinutes()
    this.seconds = date.getSeconds()
    this.use24Hour = !!setTo24HourFormat;
    this.color = color;
    this.clockElement = document.createElement('div');
    this.interval = null;
    this.alarms = {}
}

Clock.prototype.getFormattedTime = function getFormattedTime(){
    return `${formatNumberToText(this.hours)}:${formatNumberToText(this.minutes)}:${formatNumberToText(this.seconds)}`
}

Clock.prototype.get12HourTime = function get12HourTime(){
    let {hours} = this
    let am_pm = 'AM'

    if(hours>12){
        hours = hours - 12
        am_pm = 'PM'
    }else if(hours>11){
        am_pm = 'PM'
    }

    return `${formatNumberToText(hours)}:${formatNumberToText(this.minutes)}:${formatNumberToText(this.seconds)} ${am_pm}`
}

// Returns the current time
Clock.prototype.getTime = function getTime(){
    if(!this.use24Hour) return this.get12HourTime();
    const am_pm = this.hours>11?'PM':'AM'
    return `${formatNumberToText(this.hours)}:${formatNumberToText(this.minutes)}:${formatNumberToText(this.seconds)} ${am_pm}`
}

Clock.prototype.getColor = function getColor(){return this.color}

Clock.prototype.getClockElement = function getClockElement(){return this.clockElement}

Clock.prototype.pause = function pause(){
    clearInterval(this.interval)
    this.interval = undefined;
}
Clock.prototype.isPaused = function isPaused(){
    return typeof this.interval === 'undefined'
}

Clock.prototype.play = function play(){
    this.interval = setInterval(() => {
        this.moveBySecond()
        this.clockElement.textContent = this.getTime();
    }, 1000);
}

Clock.prototype.setColor = function setColor(color){
    if (typeof color !== 'string'||color.trim().length<3) throw new Error("Can't use "+color+" as a color");
    this.color = color;
    this.clockElement.style.color = color
}

// Increases the clock by a second
Clock.prototype.moveBySecond = function moveBySecond(){
    this.seconds++
    if(this.seconds>59){
        this.seconds = 0;
        this.minutes++;
        if(this.minutes>59){
            this.minutes = 0;
            this.hours++;
            if(this.hours>23){
                this.hours = 0;
            }
        }
    }
    
    // Check for alarm due
    if(this.alarms[`${this.hours}-${this.minutes}`]){ // alert user of alarm due
        this.removeAlarm({hours: this.hours,minutes: this.minutes})
        alert(`Hello, your alarm set to ${formatNumberToText(this.hours)}:${formatNumberToText(this.minutes)} is due.`)
        
    }
}

// Sets the time display to a 24-hour format
Clock.prototype.setTo24HourFormat = function setTo24HourFormat(){
    this.use24Hour = true;
}

// Sets the time display to a 12-hour format
Clock.prototype.setTo12HourFormat = function setTo12HourFormat(){
    this.use24Hour = false;
}

Clock.prototype.displayClock = function displayClock(){
    const {clockElement} = this;
    clockElement.setAttribute('class','clock');
    clockElement.style.color = this.getColor();
    clockElement.textContent = this.getTime()

    this.interval = setInterval(() => {
        this.moveBySecond()
        this.clockElement.textContent = this.getTime();
    }, 1000);
}


Clock.prototype.setAlarm = function setAlarm({hours, minutes} = {hours: 0, minutes: 0}){
    if(typeof hours !== 'number'||typeof minutes !== 'number'||!isWithinRange(hours,{start: 0, end: 23})||!isWithinRange(minutes,{start: 0, end: 59})){
        return false;
    }
    this.alarms[`${hours}-${minutes}`] = true;
    return true
}

Clock.prototype.removeAlarm = function removeAlarm({hours, minutes} = {hours: 0, minutes: 0}){
    const key = `${hours}-${minutes}`;
    this.alarms[key] = null;
    delete this.alarms[key];
}


const clock = new Clock();

document.getElementById('clock-postion').replaceWith(clock.getClockElement())

clock.displayClock()

const colorInput = document.getElementById('color-input')
document.getElementById('color-setter').addEventListener('click',function(){
    const inputValue = colorInput.value.trim();
    if(inputValue.length<3) return alert("Can't set "+inputValue+" as a color.");
    clock.setColor(inputValue);
    colorInput.value = ''
})

const hourInput = document.getElementById('hour-input')
const minuteInput = document.getElementById('minute-input')
document.getElementById('alarm-setter').addEventListener('click',function(){
    const hours = Number(hourInput.value.trim());
    if(isNaN(hours)||hours<0||hours>59) return alert("Can't set "+hours+" as an hour value.");
    const minutes = Number(minuteInput.value.trim());
    if(isNaN(minutes)||minutes<0||minutes>59) return alert("Can't set "+minutes+" as a minute value.");
    clock.setAlarm({hours,minutes})
    hourInput.value = ''
    minuteInput.value = ''
})
