// Task 1 & 2: Object Creation Basics with methods and properties
const Hero = {
    name: 'Batman',
    secretIdentity: 'secret123',
    powers: [],
    weakness: '',
    usePower(powerName){
        console.log(`${this.name} is using the power, ${powerName}`);
    },
    revealIdentity(){
        console.log(this.secretIdentity);
    }
}

// Task 3: Object Constructors
function SuperHero(props){
    if(typeof props!=='object'||props===null) throw new Error('Expected an object as argument but received '+typeof props)
    if(typeof props.name==='string'){
        this.name=props.name
    }
    if(typeof props.secretIdentity==='string'){
        this.secretIdentity=props.secretIdentity
    }
    if(Array.isArray(props.powers)){
        this.powers=props.powers
    }
    if(props.weakness){
        this.weakness=props.weakness
    }
    Object.setPrototypeOf(this,Hero);
}

function ExtendedSuperHero(props){
    SuperHero.bind(this)(props||{});
    const defaultProps = {
        name: true, powers: true, 
        weakness: true, secretIdentity: true, 
    };
    for(let prop in props){
        if(!defaultProps[prop]){
            this[prop] = props[prop]
        }
    }
}

const superhero = new ExtendedSuperHero({
    name: 'Iron Man',
    godname: 'Hello',
});
console.log(superhero.name, superhero.godname);
