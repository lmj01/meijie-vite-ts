// 生成器模式
class Product1 {
    public parts: string[] = [];
    public listPart(): void {
        console.log(`product parts: ${this.parts.join(',')}\n`);
    }
}
// 
interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}
class ConcreteBuilder1 implements Builder {
    private product!: Product1;
    constructor() {
        this.reset();
    }
    public reset(): void{
        this.product = new Product1();
    }
    public producePartA(): void{
        this.product.parts.push('PartA1');
    }
    public producePartB(): void {
        this.product.parts.push('PartB1');
    }
    public producePartC(): void {
        this.product.parts.push('PartC1');
    }
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}
// 
class Director {
    private builder!: Builder;
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }
    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }
    public buildFullFeatureProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

const clientCode = (director: Director) => {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);
    //
    director.buildMinimalViableProduct();
    builder.getProduct().listPart();
    // 
    director.buildFullFeatureProduct();
    builder.getProduct().listPart();
    //
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listPart();
}
export const testBuilder = () => {
    clientCode(new Director());
}
