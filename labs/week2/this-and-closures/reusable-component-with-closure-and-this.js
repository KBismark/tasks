function createTimer(duration, elementId){
    if(isNaN(Number(duration))||typeof elementId!=='string') throw new Error('Unexpected arguments');
    
    this.element = document.getElementById(elementId);
    if(!this.element) throw new Error('Not an element');

    // If time has already expired, logs time up and returns
    if(duration <= 0) {
        this.element.textContent = 0;
        return console.log('Time up!');
    }

    this.element.textContent = duration;
    const interval = setInterval(() => {
        this.element.textContent = --duration;
        // If time has expired, logs time up and returns
        if(duration <= 0){
            console.log('Time up!');
            clearInterval(interval)
        }
    }, 1000);
}

