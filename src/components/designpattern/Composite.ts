// 组合模式
// 一种结构型设计模型
abstract class Component {
    protected parent?: Component | null;
    // constructor() {
    //     this.parent = null;
    // }
    public setParent(parent: Component | null) {
        this.parent = parent;
    }
    public getParent(): Component | null | undefined {
        return this.parent;
    }
    public add(component: Component): void {}
    public remove(component: Component): void {}
    public isComposite(): boolean {
        return false;
    }
    public abstract operation(): string;
}
class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}
class Composite extends Component {
    protected children: Component[] = [];
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }
    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    }
    public isComposite(): boolean {
        return true;
    }
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }
        return `Branch(${results.join('+')})`;
    }
}

const clientCode = (component: Component)=>{
    console.log(`Result: ${component.operation()}`)
}
const clientCode2 = (component1: Component, component2: Component) => {
    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);
}
export const testComposite = () => {
    const simple = new Leaf();
    clientCode(simple);

    // 
    const branch1 = new Composite();
    branch1.add(new Leaf());
    branch1.add(new Leaf());
    const branch2 = new Composite();
    branch2.add(new Leaf());
    const tree = new Composite();
    tree.add(branch1);
    tree.add(branch2);

    clientCode(tree);
    //
    clientCode2(tree, simple);
}