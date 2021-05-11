// 中介者模式
// 一种行为设计模型
interface Mediator {
    notify(sender: object, event: string): void;
}
class BaseComponent {
    protected mediator: Mediator | null;
    constructor(mediator: Mediator | null) {
        this.mediator = mediator;
    }
    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}
class Component1 extends BaseComponent {
    public doA(): void {
        console.log(`Component 1 does A`);
        this.mediator?.notify(this, 'A');
    }
    public doB(): void {
        console.log(`Component 1 does B`);
        this.mediator?.notify(this, 'B');
    }
}
class Component2 extends BaseComponent {
    public doC(): void {
        console.log(`Component 2 does C`);
        this.mediator?.notify(this, 'C');
    }
    public doD(): void {
        console.log(`Component 2 does D`);
        this.mediator?.notify(this, 'D');
    }
}
class ConcreteMediator implements Mediator {
    private component1: Component1;
    private component2: Component2;
    constructor(c1: Component1, c2: Component2) {
        this.component1 = c1;
        this.component1.setMediator(this);
        this.component2 = c2;
        this.component2.setMediator(this);
    }
    public notify(sender: object, event: string): void {
        if (event === 'A') {
            console.log(`Mediator reacts on A and triggers following operations`);
            this.component2.doC();
        }
        if (event === 'D') {
            console.log(`Mediator reacts on D and triggers following operations`);
            this.component1.doB();
            this.component2.doC();
        }
    }
}
export const testMediator = () => {
    const c1 = new Component1(null);
    const c2 = new Component2(null);
    const mediator = new ConcreteMediator(c1, c2);
    c1.doA();
    c2.doD();
}