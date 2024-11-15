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
class SuperHero {
    constructor(props) {
        if (typeof props !== 'object' || props === null) throw new Error('Expected an object as argument but received ' + typeof props);
        if (typeof props.name === 'string') {
            this.name = props.name;
        }
        if (typeof props.secretIdentity === 'string') {
            this.secretIdentity = props.secretIdentity;
        }
        if (Array.isArray(props.powers)) {
            this.powers = props.powers;
        }
        if (props.weakness) {
            this.weakness = props.weakness;
        }
    }
    name = ''
    secretIdentity = ''
    powers = []
    weakness = ''
    rank = ''

}

// Task 4: Prototypal Inheritance
class ExtendedSuperHero extends SuperHero {
    constructor(props={hiddenPowers:[]}) {
        super(props);
        this.hiddenPowers = props.hiddenPowers;
    }
    hiddenPowers = []
    rank = 0
}

// Task 5: Object Iteration and Transformation

const super_IronMan = new SuperHero({
    name: 'Iron Man',
    secretIdentity: 'iron_secret',
    powers: ['Iron hammer'],
    weakness: 'Water'
});

const super_Acquaman = new SuperHero({
    name: 'Acquaman',
    secretIdentity: 'water_secret',
    powers: ['Water'],
    weakness: 'Fire'
});

const superhero_Kyeiwaa = new ExtendedSuperHero({
    name: 'Kyeiwaa',
    secretIdentity: 'witchcraft_secret',
    powers: ['Fly without wings'],
    weakness: 'Prayers',
    hiddenPowers: ['Kill']
});

const superhero_Sampson = new ExtendedSuperHero({
    name: 'Sampson',
    secretIdentity: 'stength_secret',
    powers: ['Natural Strenght'],
    weakness: 'Delilah',
    hiddenPowers: ['Kill lions']
});

const allHeroes = [superhero_Kyeiwaa, superhero_Sampson,super_IronMan, super_Acquaman]

allHeroes.forEach((hero)=>{
    console.log(`${hero.name}'s powers are ${JSON.stringify(hero.powers)}`);
})

const allHeroesWithRanks = allHeroes.map((hero,index)=>{
    hero.rank = index+1;
    return hero;
})

const superheroes = allHeroes.filter((hero,index)=>hero instanceof ExtendedSuperHero)


console.log(superheroes);

