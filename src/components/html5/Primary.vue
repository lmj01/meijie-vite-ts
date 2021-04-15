<template>
  <div class="shadow">
    <p>基础控件的测试内容</p>    
    <div class="select-wrapper">
        <!-- https://stackoverflow.com/questions/10484053/change-select-list-option-background-colour-on-hover -->
        <!-- 这是唯一看到的一个实现效果，原理还不太清楚 -->
        <!-- See a single select tag cannot be styled as the control goes to system. Here what is done is on click, the select gets changed to multiple select using size. There is no restriction on multiple select, so the style works. Brilliant -->
        <select onfocus="this.size=10;" onblur="this.size=0;" onchange="this.size=1;this.blur();">
            <option v-for="item in options" :key="item">
                {{item}}
            </option>
        </select>
    </div>
    <div class="images">
      <img src="../../assets/loading.svg" draggable="false">
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Html5.Primary',
  setup: () => {    
    const options = [ 1, 2, 3, 4, 5, 6]
    return { 
      options,
    }
  }
})
</script>

<style lang="scss" scoped>
.shadow {
  width: 100%;
  // height: 100%;
  .select-wrapper {
      select {
          &>option {
              &:checked {
                background-color: green;
              }
              &:hover {
                background-color: red;
                cursor: pointer;
                box-shadow: 0 0 10px 100px #1882a8 inset;
              }
          }
      }
  }
  .images {
    width: 200px;
    height: 200px;
  }
}
</style>
