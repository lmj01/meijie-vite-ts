<template>
  <div class="design-pattern">
    <p>抽象工厂</p>    
    <div class="abstract-factory">
      <button @click="runAbstractFactory">运行抽象工厂</button>
    </div>
    <div class="part-register">      
      
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue';
import { AbstractFactory, ConcreateFactory1, ConcreateFactory2 } from './AbstractFactory';

export default defineComponent({
  name: 'Abstract.Factory',
  setup: () => {  
    const clientAbstractFactor = (factory: AbstractFactory) => {
      const productA = factory.createProductA();
      const productB = factory.createProductB();
      console.log(productB.usefulFunctionB());
      console.log(productB.anotherUsefulFunctionB(productA));
    }
    const runAbstractFactory = () => {
      clientAbstractFactor(new ConcreateFactory1());
      clientAbstractFactor(new ConcreateFactory2());
    }
    return { 
      runAbstractFactory,
    }
  }
})
</script>

<style lang="scss" scoped>
.design-pattern {
  width: 100%;
  // height: 100%;
  .abstract-factory {
    
  }
  .part-register {

  }
}
</style>
