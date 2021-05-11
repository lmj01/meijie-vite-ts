// 策略
// 一种行为设计模式
class Context {
    private strategy: Strategy;
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }
    public doSomeBusinessLogic(): void {
        console.log(`Context: Sorting data using the strategy (not sure how it'll do it)`);
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    }
}
interface Strategy {
    doAlgorithm(data: string[]): string[];
}
class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}
class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}
export const testStrategy = () => {
    const context = new Context(new ConcreteStrategyA());
    context.doSomeBusinessLogic();
    context.setStrategy(new ConcreteStrategyB());
    context.doSomeBusinessLogic();
}