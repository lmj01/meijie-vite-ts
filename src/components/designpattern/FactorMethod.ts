// 工厂方法
interface Product {
    operation(): string;
}
class ConcreteProduct1 implements Product {
    public operation(): string {
        return `{Result of the ConcreteProduct1}`;
    }
}
class ConcreateProduct2 implements Product {
    public operation(): string {
        return `{result of the ConcreteProduct2}`;
    }
}
//
export abstract class Creator {
    public abstract factoryMethod(): Product;
    public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: the same creator's code has just worked with ${product.operation()}`;
    }
}
//
export class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}
export class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreateProduct2();
    }
}

const clientCode = (creator: Creator) => {
    console.log(creator.someOperation());
}
export const testFactoryMethod = ()=>{
    clientCode(new ConcreteCreator1());
    clientCode(new ConcreteCreator2());
}
