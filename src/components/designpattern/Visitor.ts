// 访问者
// 一种行为设计模式
interface Component {
    accept(visitor: Visitor): void;
}
class ConcreteComponentA implements Component {
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentA(this);
    }
    public exclusiveMethodOfConcreteComponentA(): string {
        return 'A';
    }
}
class ConcreteComponentB implements Component {
    public accept(visitor: Visitor): void {
        visitor.visitConcreteComponentB(this);
    }
    public specialMethodOfConcreteComponentB(): string {
        return 'B';
    }
}
interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;
    visitConcreteComponentB(element: ConcreteComponentB): void;
}
class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisistor1`);
    }
    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
    }
}
class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisistor2`);
    }
    public visitConcreteComponentB(element: ConcreteComponentB): void {
        console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
    }
}
const clientCode = (components: Component[], visitor: Visitor) => {
    for (const component of components) {
        component.accept(visitor);
    }
}
export const testVisitor = () => {
    const components = [
        new ConcreteComponentA(),
        new ConcreteComponentB(),
    ];
    const visitor1 = new ConcreteVisitor1();
    clientCode(components, visitor1);
    const visitor2 = new ConcreteVisitor2();
    clientCode(components, visitor2);
}