// 享元模式
// 一种结构型设计模式
class Flyweight {
    private sharedState: any;
    constructor(sharedState: any) {
        this.sharedState = sharedState;
    }
    public operation(uniqueState: any): void {
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
}
class FlyweightFactory {
    private flyweights: {[key: string]: Flyweight} = <any>{};
    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }
    private getKey(state: string[]): string {
        return state.join('_');
    }
    public getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);
        if (!(key in this.flyweights)) {
            console.log(`FlyweightFactory: can\'t find a flyweight, creating new one`);
            this.flyweights[key] = new  Flyweight(sharedState);
        } else {
            console.log(`FlyweightFactory: resuing existing flyweight`);
        }
        return this.flyweights[key];
    }
    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: I hava ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}
export const testFlyweight = () => {
    const factory = new FlyweightFactory([
        ['Chevrolet', 'Camarz018', 'pink'],
        ['Mercedes Benz', 'C300', 'black'],
        ['Mercedes Benz', 'C300', 'red'],
        ['BWM', 'M5', 'red'],
        ['BWM', 'X6', 'white'],
    ])
    factory.listFlyweights();

    function addCarToPoliceDatabase(ff: FlyweightFactory, plates: string,
        owner: string, brand: string, model: string, color: string) {
        console.log(`\nClient: adding a car to database`);
        const flyweight = ff.getFlyweight([brand, model, color]);
        flyweight.operation([plates, owner]);
    }
    addCarToPoliceDatabase(factory, 'CL234IR', 'James Does', 'BMW', 'M5', 'red');
    addCarToPoliceDatabase(factory, 'CL234IR', 'James Does', 'BMW', 'X1', 'red');
    factory.listFlyweights();
}