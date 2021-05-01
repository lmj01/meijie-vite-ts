// 桥接模式
// 一种结构性设计模式，将业务逻辑与大类拆分为不同的层次结构
interface Implementation {
    operationImplementation(): string;
}
class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
        return `ConcreteImplementationA：Here\' the result on the platform A`;
    }
}
class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
        return `ConcreteImplementationB: Here\'s the result on the platform B`;
    }
}
//
class Abstraction {
    protected implementation: Implementation;
    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:---${result}`;
    }
}
class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with: ---${result}`;
    }
}

function clientCode(abstraction: Abstraction) {
    console.log(abstraction.operation());
}

export function testBridge() {
    let implementation = new  ConcreteImplementationA();
    let abstraction = new Abstraction(implementation);
    clientCode(abstraction);
    //
    implementation = new ConcreteImplementationB();
    abstraction = new ExtendedAbstraction(implementation);
    clientCode(abstraction);
}