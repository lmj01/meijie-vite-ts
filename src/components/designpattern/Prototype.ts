// 原型模式
// 创建型设计模式
export class ComponentWithBackReference {
    public prototype: Prototype;
    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}
export class Prototype {
    public primitive: any;
    public component!: object;
    public circularReference!: ComponentWithBackReference;
    public clone(): this {
        const clone = Object.create(this);
        clone.component = Object.create(this.component);
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };
        return clone;
    }
}
export const testPrototype = ()=>{
    const p1 = new Prototype();
    p1.primitive = 234;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
      console.log(`primitive field values support copy`);
    } else {
      console.log(`primitive field values not support copy`)
    }

    if (p1.component === p2.component) {
      console.log(`simple component not cloned`);
    } else {
      console.log(`simple component has been cloned`);
    }

    if (p1.circularReference === p2.circularReference) {
      console.log(`component with back reference not cloned`);
    } else {
      console.log(`component with back reference has been cloned`);
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
      console.log(`component with back reference linked to originial`);        
    } else {
      console.log(`component with back reference linked to the cloned`);
    }
}
  