<template>
  <div class="design-pattern">
    <p>抽象工厂</p>    
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
    <div class="all">
      <div class="creational">
        <p>创建型模式Creational Patterns</p>
        <p>提供了一种创建对象同时隐藏创建逻辑的，不使用new直接实例化对象</p>
        <button @click="callAbstractFactory">抽象工厂Abstract Factory</button>
        <button @click="callFactoryMethod">工厂方法Factory</button>
        <button @click="callBuilder">生成Builder</button>
        <button @click="callPrototype">原型Prototype</button>
        <button @click="callSingleton">单例Singleton</button>        
      </div>
      <div class="structural">
        <p>结构型模式Structural Patterns</p>
        <p>关注类和对象的组合</p>
        <button @click="callAdapter">适配器Adapter</button>
        <button @click="callBridge">桥接Bridge</button>
        <button @click="callComposite">组合Composite</button>
        <button @click="callDecorator">装饰Decorator</button>
        <button @click="callFacade">外观Facade</button>
        <button @click="callFlyweight">享元Flyweight</button>
        <button @click="callProxy">代理Proxy</button>
        <button @click="callFilter">过滤器Filter(Criteria)</button>
      </div>
      <div class="behavioral">
        <p>行为模式Behavioral Patterns</p>
        <p>关注对象之间的通信</p>
        <button @click="callChainOfResponsibility">责任链Chain of Responsibility</button>
        <button @click="callCommand">命令Command</button>
        <button @click="callIterator">迭代器Iterator</button>
        <button @click="callMediator">中介者Mediator</button>
        <button @click="callMemento">备忘录Memento</button>
        <button @click="callObserver">观察者Observer</button>
        <button @click="callState">状态State</button>
        <button @click="callStrategy">策略Strategy</button>
        <button @click="callTemplateMethod">模板方法Template</button>
        <button @click="callVisitor">访问者Visitor</button>
        <button @click="callVisitor">解释器Interpreter</button>
      </div>  
    </div>
    <div>
      <textarea ref="code" id="code"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 主题色彩
// import 'codemirror/theme/idea.css'
import 'codemirror/mode/javascript/javascript'

import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'

import { testAbstractFactory } from './AbstractFactory';
import { testBuilder } from './Builder';
import { testFactoryMethod } from './FactorMethod';
import { testPrototype } from './Prototype'
import { testSingleton } from './Singleton'
import { testAdapter } from './Adapter'
import { testBridge } from './Bridge'
import { testComposite } from './Composite'
import { testDecorator } from './Decorator'
import { testFacade } from './Facade'
import { testFlyweight } from './Flyweight'
import { testProxy } from './Proxy'
import { testChainOfResponsibility } from './ChainOfResponsibility'
import { testCommand } from './Command'
import { testIterator } from './Iterator'
import { testMediator } from './Mediator'
import { testMemento } from './Memento'
import { testObserver } from './Observer'
import { testState } from './State'
import { testStrategy } from './Strategy'
import { testTemplateMethod } from './TemplateMethod'
import { testVisitor } from './Visitor'
import { testFilter } from './Filter'

export default defineComponent({
  name: 'Abstract.Factory',
  setup: () => {  
    const route = useRouter()
    console.log('--setup--', route)
    const codeEditor = ref(null)
    const configEditor: CodeMirror.EditorConfiguration = {
      value: '',
      height: '350px',
      tabsize: 4,
      lineNumbers: true,
      mode: 'javascript',
      autofocus: true,
      autoMatchParens: true,
      styleActiveLine: true,
      // theme: 'idea',
      rtlMoveVisually: true,
      scrollbarStyle: 'overlay',
      lineWrapping: true,
      foldGutter: true,
      gutters:['CodeMirror-linenumbers', 'CodeMirrorfoldgutter'],
    }
    onMounted(()=>{
      const elEditor = document.getElementById('code') as HTMLTextAreaElement;
      codeEditor.value = CodeMirror.fromTextArea(elEditor, configEditor);
      console.log('-editor-', codeEditor.value);
      codeEditor.value.setValue('');
      // codeEditor.value.on('change', ()=>{
      //   console.log('-after change-', codeEditor.value.getValue());
      // })
    })
    const callByCode = () => {
      
      const name = 'Adapter.ts'
      const testname = '/src/components/designpattern/Adapter.ts'
      fetch(testname).then(res=>res.text()).then((res)=>{
        let res2 = res.split('//# sourceMappingURL');
        console.log('--', res2)
        codeEditor.value.setValue(res2[0]);
      })
    }
    const callAbstractFactory = () => {
      testAbstractFactory();
      callByCode();
    }
    const callBuilder = () => testBuilder();
    const callFactoryMethod = ()=> testFactoryMethod();
    const callPrototype = ()=> testPrototype();
    const callSingleton = () => testSingleton();
    const callAdapter = () => testAdapter();
    const callBridge = () => testBridge();
    const callComposite = () => testComposite();
    const callDecorator = () => testDecorator();
    const callFacade = () => testFacade();
    const callFlyweight = () => testFlyweight();
    const callProxy = () => testProxy();
    const callChainOfResponsibility = () => testChainOfResponsibility();
    const callCommand = () => testCommand();
    const callMediator = () => testMediator();
    const callIterator = () => testIterator();
    const callMemento = () => testMemento();
    const callObserver = () => testObserver();
    const callState = () => testState();
    const callStrategy = () => testStrategy();
    const callTemplateMethod = () => testTemplateMethod();
    const callVisitor = () => testVisitor();
    const callFilter = () => testFilter();
    return { 
      callAbstractFactory,
      callBuilder,
      callFactoryMethod,
      callPrototype,
      callSingleton,
      callAdapter,
      callBridge,
      callComposite,
      callDecorator,
      callFacade,
      callFlyweight,
      callProxy,
      callChainOfResponsibility,
      callCommand,
      callMediator,
      callIterator,
      callMemento,
      callObserver,
      callState,
      callStrategy,
      callTemplateMethod,
      callVisitor,
      callFilter,
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
      min-width: 300px;
      display: flex;
      flex-direction: column;
      margin: auto;
      button {
        width: auto;
      }
    }
  }
}
</style>
