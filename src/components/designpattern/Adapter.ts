// 适配器
// 一种结构型设计模式，使不兼容对象相互合作
class Target {
    public request(): string {
        return `target: the defautl target\'s behavior`;
    }
}
//
class Adaptee {
    public specificReques(): string {
        return `.eetpadA eht fo roivaheb laicepS`;
    }
}
class Adapter extends Target {
    private adaptee: Adaptee;
    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }
    // 覆盖接口，实现兼容性逻辑
    public request(): string {
        const result = this.adaptee.specificReques().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

const clientCode = (target: Target)=>{
    console.log(target.request());
}
export const testAdapter = () => {
    const target = new Target();
    clientCode(target);
    //
    const adaptee = new Adaptee();
    console.log(adaptee.specificReques());
    //
    const adapter = new Adapter(adaptee);
    clientCode(adapter);
}
  