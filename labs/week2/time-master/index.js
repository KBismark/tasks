
// Class Constructor
function Clock({setTo24HourFormat, color} = {setTo24HourFormat: false, color: '#515151'}){
    const date = new Date()
    this.hours = date.getHours()
    this.minutes = date.getMinutes()
    this.seconds = date.getSeconds()
    this.use24Hour = !!setTo24HourFormat;
    this.color = color;
    this.clockElement = document.createElement('div');
    this.interval = undefined;
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
                this.hours = 0
            }
        }
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


function formatNumberToText(number){
    return number<10?`0${number}`:`${number}`
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




const clock = new Clock()
document.body.append(clock.getClockElement())

clock.displayClock()
// clock.setColor('green')
// clock.pause()
// setTimeout(() => {
//     clock.play()
// }, 5000);
