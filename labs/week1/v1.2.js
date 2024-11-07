
/* String Transformations */

const testString = 'hello'

const capitalize = (str) => str.replace(/^./,(letter)=>letter.toUpperCase())

// Test: 
console.log(capitalize(testString));

const reverse = (str) => str.split('').reverse().join('')

// Test:
console.log(reverse(testString))

const isPalindrome = (str) => {
    const copy = str.toUpperCase();
    return copy === reverse(copy)
}

// Test 1:
console.log(isPalindrome(testString)); // Expects false

// Test 2:
console.log(isPalindrome('Madam')); // Expects true

const wordCount = (str) => str.length

// Test:
console.log(wordCount(testString)); 




/* Array Transformations */

const double = (arr) => arr.map((number)=>number*2)
// Test:
console.log(double([8,6,3,4]));


const filterEven = (arr) => arr.filter((number)=>Math.abs(number)%2==1)
// Test:
console.log(filterEven([8,6,3,4, -3]));


const sum = (arr)=> arr.reduce((previousValue,currentValue)=>previousValue+currentValue,0)
// Test: 
console.log(sum([2,4,6]));


const average = (arr) => sum(arr)/arr.length;
// Test: 
console.log(average([2,4,6]));



/* Object Transformations */
const fullName = (person) => `${person.firstName} ${person.lastName}`


const isAdult = (person) => person.age >= 18;

const filterByAge = (people, minAge) => people.filter((person)=>person.age>=minAge)


/* Function Composition */

const compose = (...fns) =>{
    return function composed(value){
        return fns.reduceRight((preValue,currentFn)=>currentFn(preValue),value)
    }
}

// Test: 
console.log(compose(average,double,filterEven)([3,5,2]));
