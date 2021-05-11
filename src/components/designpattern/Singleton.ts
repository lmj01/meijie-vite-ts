// 单例模式
// 一种创建型模式，保证一个类只有一个实例，并提供一个访问方法
class Singleton {
    private static instance: Singleton;
    private constructor() {

    }
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    public otherBusinessLogic() {
        console.log('some other business logic');
    }
}

export const testSingleton = ()=>{
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();
    if (s1 === s2) {
      console.log(`singleton return the same instance`);
    } else {
      console.log(`singleton return not the same instance`);
    }
    s1.otherBusinessLogic();
    s2.otherBusinessLogic();
}
  