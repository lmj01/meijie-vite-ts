<template>
  <div class="shadow">
    <p>box-shadow</p>
    <div class="shadow-text">
      <p class="p1">多色阴影</p>
      <p class="p2">火焰</p>
      <p class="p3">立体凸起</p>
      <p class="p4">立体凹下</p>
      <p class="p5">描边</p>
      <p class="p6">外发光</p>            
    </div>
    <div class="shadow-box">
        <p>配合transform效果更好,特别是没有层级的box时,就需要它</p>
        <div class="bs1">右下</div>
        <div class="bs2">四边同色</div>
        <div class="bs3">四边同色阴影扩展</div>
        <div class="bs4">四边同色内阴影</div>
        <div class="bs5">四边异色外阴影</div>
        <div class="bs6">叠加异色阴影</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Html5.Shadow',
  setup: () => {    
    
    return { 
      
    }
  }
})
</script>

<style lang="scss" scoped>
.shadow {
  width: 100%;
  // height: 100%;
  .shadow-box {
      width: 800px;
      overflow: hidden;
      margin: 50px auto;

      & div {
          width: 150px;
          height: 150px;
          margin: 40px 20px;
          // background-color: gray;
          display: inline-block;
      }
      // 右下阴影
      .bs1 {
          box-shadow: 3px 3px 3px;
      }
      // 四边同色阴影
      .bs2 {
          box-shadow: 0 0 10px #0CC;
          // transform: translateY(-5px);
      }
      // 四边同色阴影扩展
      .bs3 {
          box-shadow: 0 0 10px 15px #0CC;
      }
      // 四边同色内阴影
      .bs4 {
          box-shadow: inset 0 0 10px #0CC;
      }
      // 四边异色外阴影
      .bs5 {
          box-shadow: 
              -10px 0 10px red, // 左边阴影
              10px 0 10px yellow, // 右边阴影
              -10px 10px blue, // 顶部阴影
              10px 10px green; // 底边阴影
      }
      // 叠加异色阴影
      .bs6 {
          box-shadow: 0 0 10px 5px black, 0 10px 20px red;
      }
  }
  .shadow-text {
      width: 600px;
      overflow: hidden;
      margin: 10px auto;

      p {
          width: 300px;
          font-size: 3rem;
          margin: 10px;
          padding: 20px;
          text-align: center;
      }
      .p1 {
          text-shadow: 0.2em 0.5em 0.1em #600, -0.3em 0.1em 0.1em #060, 0.4em -0.3em 0.1em #006;
          color: red;    
      }
      .p2 {
          background: black;    
          text-shadow: 0 -5px 4px #FF3, 2px -10px 6px #fd3, -2px -15px 11px #f80, 2px -25px 18px #f20;
          color: red;
      }
      .p3 {
          text-shadow: -1px -1px white, 1px 1px #333;    
          color: #D1D1D1;
          font-weight: bold;
          background: #CCC;
      }
      .p4 {
          text-shadow: 1px 1px white, -1px -1px #333;
          color: #D1D1D1;
          font-weight: bold;
          background: #CCC;
      }
      .p5 {
          text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
          color: #ffffff;
          background: #CCC;
      }
      .p6 {
          text-shadow: 0 0 0.2em #F87, 0 0 0.2em #f87;
          color: #d1d1d1;
          background: #CCC;
      }
  }
}
</style>
