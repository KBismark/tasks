
// Create a Person object
const Person = {
    name: 'Bismark',
    age: 34,
    greet(){
        console.log(`Hello my name is ${this.name} and I'm ${this.age} years old.`);
    }
}

// Executes the greet method directly on the object 
Person.greet();
// Executes the greet method using the call method
const {greet} = Person;
greet.call(Person);
// Executes the greet method apply method
greet.apply(Person)
// Executes the greet method bind
greet.bind(Person)()