// 代理模式
// 一种结构型设计模式，代理接收请求(访问控制与缓存等)，通过代理把请求传递给服务器
interface Subject {
    request(): void;
}
class RealSubject implements Subject {
    public request(): void {
        console.log(`RealSubject: Handling request`);
    }
}
class Proxy implements Subject {
    private realSubject: RealSubject;
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }
    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }
    private checkAccess(): boolean {
        console.log(`Proxy: Checking access prior to firing a real request`);
        return true;
    }
    private logAccess(): void {
        console.log(`Proxy: Logging the time of request`);
    }
}
const clientCode = (subject: Subject) => {
    subject.request();
}
export const testProxy = () => {
    const realSubject = new RealSubject();
    clientCode(realSubject);
    const proxy = new Proxy(realSubject);
    clientCode(proxy);
}