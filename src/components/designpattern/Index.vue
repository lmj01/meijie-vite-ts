<template>
  <div class="design-pattern">
    <p>抽象工厂</p>    
    <div>
      <p><q>Rather than try to fit a problem to the procedural approach of a language, OOP attempts to fit the language to the problem</q></p>
      <p><q>The C++ Shift: Object-Oriented Programming, C++ Primer Plus, sixth Edition</q></p>
    </div>
    <div class="">
      <button @click="callAbstractFactory">抽象工厂</button>
      <button @click="callFactoryMethod">工厂方法</button>
      <button @click="callBuilder">生成模式</button>
      <button @click="callPrototype">原型模式</button>
      <button @click="callSingleton">单例模式</button>
      <button @click="callAdapter">适配器模式</button>
      <button @click="callBridge">桥接模式</button>
      <button @click="callComposite">组合模式</button>
      <button @click="callDecorator">装饰模式</button>
      <button @click="callFacade">外观模式</button>
      <button @click="callFlyweight">享元模式</button>
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
    }
  }
})
</script>

<style lang="scss" scoped>
.design-pattern {
  width: 100%;
  // height: 100%;
}
</style>
