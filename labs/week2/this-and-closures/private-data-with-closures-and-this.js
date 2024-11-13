
function createCounter(){
    let count = 0
    return {
        increment(){
            count++;
            console.log(this.count);
        },
        getCount(){return count}
    }
}

// const counter = createCounter();
// counter.increment()