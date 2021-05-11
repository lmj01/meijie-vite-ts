// 过滤器Filter，标准Criteria
// 一种结构型设计模式
class Person {
    private name: string;
    private gender: string;
    private maritalStatus: string;
    constructor(name: string, gender: string, maritalStatus: string) {
        this.name = name;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
    }
    public getName(): string {
        return this.name;
    }
    public getGender(): string {
        return this.gender;
    }
    public getMaritalStatus(): string {
        return this.maritalStatus;
    }
}
interface Criteria {
    meetCriteria(persons: Person[]): Person[];
}
class CriteriaMale implements Criteria {
    public meetCriteria(persons: Person[]): Person[] {
        const malePersons: Person[] = [];
        for (const person of persons) {
            if (person.getGender() === 'Male') {
                malePersons.push(person);
            }
        }
        return malePersons;
    }
}
class CriteriaFemale implements Criteria {
    public meetCriteria(persons: Person[]): Person[] {
        const femalePersons: Person[] = [];
        for (const person of persons) {
            if (person.getGender() === 'Female') {
                femalePersons.push(person);
            }
        }
        return femalePersons;
    }
}
class CriteriaSingle implements Criteria {
    public meetCriteria(persons: Person[]): Person[] {
        const singlePersons: Person[] = [];
        for (const person of persons) {
            if (person.getMaritalStatus() === 'Single') {
                singlePersons.push(person);
            }
        }
        return singlePersons;
    }
}
class AndCriteria implements Criteria {
    private criteria: Criteria;
    private otherCriteria: Criteria;
    constructor(criteria: Criteria, otherCriteria: Criteria) {
        this.criteria = criteria;
        this.otherCriteria = otherCriteria;
    }
    public meetCriteria(persons: Person[]): Person[] {
        const tmpPersons = this.criteria.meetCriteria(persons);
        return this.otherCriteria.meetCriteria(tmpPersons);
    }
}
class OrCriteria implements Criteria {
    private criteria: Criteria;
    private otherCriteria: Criteria;
    constructor(criteria: Criteria, otherCriteria: Criteria) {
        this.criteria = criteria;
        this.otherCriteria = otherCriteria;
    }
    public meetCriteria(persons: Person[]): Person[] {
        const tmp1Persons = this.criteria.meetCriteria(persons);
        const tmp2Persons = this.otherCriteria.meetCriteria(persons);
        for (const person of tmp2Persons) {
            if (!tmp1Persons.includes(person)) {
                tmp1Persons.push(person);
            }
        }
        return tmp1Persons;
    }
}
const clientCode = (persons: Person[]) => {
    for (const person of persons) {
        console.log(`Persons: [ Name: ${person.getName()}, Gender: ${person.getGender()}, Marital Status: ${person.getMaritalStatus()}]`);
    }
}
export const testFilter = () => {
    const persons: Person[] = [];
    persons.push(new Person('Robert', 'Male', 'Single'));
    persons.push(new Person('John', 'Male', 'Married'));
    persons.push(new Person('Laura', 'Female', 'Married'));
    persons.push(new Person('Diana', 'Female', 'Single'));
    persons.push(new Person('Mike', 'Male', 'Single'));
    persons.push(new Person('Bobby', 'Male', 'Single'));

    const male = new CriteriaMale();
    const female = new CriteriaFemale();
    const single = new CriteriaSingle();
    const singleMale = new AndCriteria(single, male);
    const singleOrFemale = new OrCriteria(single, female);

    console.log('males');
    clientCode(male.meetCriteria(persons));
    console.log('females');
    clientCode(female.meetCriteria(persons));
    console.log('Single Males');
    clientCode(singleMale.meetCriteria(persons));
    console.log('Single Or Females');
    clientCode(singleOrFemale.meetCriteria(persons));
}