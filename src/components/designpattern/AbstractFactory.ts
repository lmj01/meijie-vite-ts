//  - 抽象工厂模式
// product A
interface AbstractProductA {
    usefulFunctionA(): string;
}
class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA() : string {
        return 'the result of the product A1.';
    }
}
class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA() : string {
        return 'the result of the product A2.';
    }
}
// product B
interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA) : string;
}
class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB() : string {
        return 'the result of the product B1.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `the result of the B1  collaborating with the (${result})`;
    }
}
class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'the result of the product B2.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `the result of the B2 collaborating with the (${result})`;
    }
}
// factory
interface AbstractFactory {
    createProductA() : AbstractProductA;
    createProductB() : AbstractProductB;
}
class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }
    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}
class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }
    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}
const clientCode = (factory: AbstractFactory) => {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}
export const testAbstractFactory = () => {
    clientCode(new ConcreteFactory1());
    clientCode(new ConcreteFactory2());
}
  