<template>
  <div class="design-pattern">
    <div class="all">
      <div class="creational">
        <p>创建型模式Creational Patterns</p>
        <p>提供了一种创建对象同时隐藏创建逻辑的，不使用new直接实例化对象</p>
        <button @click="callByBtn(0)">抽象工厂Abstract Factory</button>
        <button @click="callByBtn(1)">工厂方法Factory</button>
        <button @click="callByBtn(2)">生成Builder</button>
        <button @click="callByBtn(3)">原型Prototype</button>
        <button @click="callByBtn(4)">单例Singleton</button>        
      </div>
      <div class="structural">
        <p>结构型模式Structural Patterns</p>
        <p>关注类和对象的组合</p>
        <button @click="callByBtn(5)">适配器Adapter</button>
        <button @click="callByBtn(6)">桥接Bridge</button>
        <button @click="callByBtn(7)">组合Composite</button>
        <button @click="callByBtn(8)">装饰Decorator</button>
        <button @click="callByBtn(9)">外观Facade</button>
        <button @click="callByBtn(10)">享元Flyweight</button>
        <button @click="callByBtn(11)">代理Proxy</button>
        <button @click="callByBtn(12)">过滤器Filter(Criteria)</button>
      </div>
      <div class="behavioral">
        <p>行为模式Behavioral Patterns</p>
        <p>关注对象之间的通信</p>
        <button @click="callByBtn(13)">责任链Chain of Responsibility</button>
        <button @click="callByBtn(14)">命令Command</button>
        <button @click="callByBtn(15)">迭代器Iterator</button>
        <button @click="callByBtn(16)">中介者Mediator</button>
        <button @click="callByBtn(17)">备忘录Memento</button>
        <button @click="callByBtn(18)">观察者Observer</button>
        <button @click="callByBtn(19)">状态State</button>
        <button @click="callByBtn(20)">策略Strategy</button>
        <button @click="callByBtn(21)">模板方法Template</button>
        <button @click="callByBtn(22)">访问者Visitor</button>
        <button @click="callByBtn(23)">解释器Interpreter</button>
      </div>
      <div id="codeDiv" class="">
      </div>  
    </div>
    <div>
      <p><q>Rather than try to fit a problem to the procedural approach of a language, OOP attempts to fit the language to the problem</q></p>
      <p><q>The C++ Shift: Object-Oriented Programming, C++ Primer Plus, sixth Edition</q></p>
      <p>设计模式是一套被反复使用、代码设计经验的总结，是编码过程中真正的工程化的过程，GOF写的
        <q>Design Patterns - Elements of Reusable Object-Oriented Software</q></p>
    </div>
    <div>
      <p>设计模式的六大原则</p>      
      <p>1、开闭Open Close：对扩展开放，对修改关闭</p>
      <p>2、里氏代换Liskov Substitution：任何基类可以出现的地方，子类一定可以出现，它是对实现抽象化的具体规范</p>
      <p>3、依赖倒转Dependence Inversion：针对接口编程，依赖于抽象而不是具体对象</p>
      <p>4、接口隔离Interface Segregation：使用多个隔离的接口，降低依赖与耦合</p>
      <p>5、迪米特Demeter：一个实体尽量少地与其他实体发生相互作用，尽量功能模块相对独立</p>
      <p>6、合成复用Composite Reuse：尽量使用合成(聚合)而不是使用继承</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { codeMirrorEditor } from '@/helpers/CodeMirror'

import { creational, structural, behavioral } from './Index'

export default defineComponent({
  name: 'DesignPattern',
  setup: () => {  
    const route = useRouter()
    const { mjCreateEditor, mjUpdateCode } = codeMirrorEditor();
    onMounted(()=>{
      mjCreateEditor(document.getElementById('codeDiv'))
    })
    const srcName = [
      // 0
      'AbstractFactory',
      'FactoryMethod',
      'Builder',      
      'Prototype',
      'Singleton',
      // 5
      'Adapter',
      'Bridge',
      'Composite',
      'Decorator',
      'Facade',
      'Flyweight',
      'Proxy',
      'Criteria',
      // 13
      'ChainOfResponsibility',
      'Command',
      'Iterator',
      'Mediator',
      'Memento',
      'Observer',
      'State',
      'Strategy',
      'TemplateMethod',
      'Visitor',
      'Interpreter',
    ]
    const callByCode = (idx: number) => {      
      const testname = `/src/components/designpattern/${srcName[idx]}.ts`;
      fetch(testname).then(res=>res.text()).then((res)=>{
        let res2 = res.split('//# sourceMappingURL');
        mjUpdateCode(res2[0]);
      })
    }
    const callByBtn = (idx: number) => {
      if (idx == 0) creational.testAbstractFactory();
      else if (idx == 1) creational.testFactoryMethod();
      else if (idx == 2) creational.testBuilder();
      else if (idx == 3) creational.testPrototype();
      else if (idx == 4) creational.testSingleton();
      else if (idx == 5) structural.testAdapter();
      else if (idx == 6) structural.testBridge();
      else if (idx == 7) structural.testComposite();
      else if (idx == 8) structural.testDecorator();
      else if (idx == 9) structural.testFacade();
      else if (idx == 10) structural.testFlyweight();
      else if (idx == 11) structural.testProxy();
      else if (idx == 12) structural.testFilter();
      else if (idx == 13) behavioral.testChainOfResponsibility();
      else if (idx == 14) behavioral.testCommand();
      else if (idx == 15) behavioral.testIterator();
      else if (idx == 16) behavioral.testMediator();
      else if (idx == 17) behavioral.testMemento();
      else if (idx == 18) behavioral.testObserver();
      else if (idx == 19) behavioral.testState();
      else if (idx == 20) behavioral.testStrategy();
      else if (idx == 21) behavioral.testTemplateMethod();
      else if (idx == 22) behavioral.testVisitor();
      else throw 'not valid index'
      // 
      callByCode(idx)
    }
    return { 
      callByBtn,
    }
  }
})
</script>

<style lang="scss" scoped>
.design-pattern {
  width: 100%;
  // height: 100%;
  .all {
    display: flex;
    width: 100%;
    justify-content: center;
    .creational,
    .structural,
    .behavioral {
      // min-width: 300px;
      width: 25%;
      display: flex;
      flex-direction: column;
      margin: auto;
      border: 1px dashed;
      button {
        width: auto;
      }
    }
    #codeDiv {
      width: 400px;
      border: 1px dashed lightblue;
    }
  }
}
</style>
