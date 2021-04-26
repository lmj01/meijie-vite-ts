// https://refactoringguru.cn/design-patterns/abstract-factory/typescript/example
// 抽象工厂
// product A
interface AbstractProductA {
    usefulFunctionA(): string;
}
class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA() : string {
        return 'the result of the product A1.';
    }
}
class ConcreateProductA2 implements AbstractProductA {
    public usefulFunctionA() : string {
        return 'the result of the product A2.';
    }
}
// product B
interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA) : string;
}
class ConcreateProductB1 implements AbstractProductB {
    public usefulFunctionB() : string {
        return 'the result of the product B1.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `the result of the B1  collaborating with the (${result})`;
    }
}
class ConcreateProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'the result of the product B2.';
    }
    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `the result of the B2 collaborating with the (${result})`;
    }
}
// factory
export interface AbstractFactory {
    createProductA() : AbstractProductA;
    createProductB() : AbstractProductB;
}
export class ConcreateFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }
    public createProductB(): AbstractProductB {
        return new ConcreateProductB1();
    }
}
export class ConcreateFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreateProductA2();
    }
    public createProductB(): AbstractProductB {
        return new ConcreateProductB2();
    }
}