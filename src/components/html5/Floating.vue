<template>
  <div class="test-floating">
    <div class="main-content">
      <p>漂浮窗体</p>
    </div>
    <div class="floating-window">
      <div class="win-one" :style="`transform: translate(${ud.leftOne}px, ${ud.topOne}px)`" @mousedown="winOneMouseDown" @mousemove="winOneMouseMove" @mouseup="winOneMouseUp">
        <button>btn1</button>
        <button>btn2</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Html5.Floating',
  setup: () => {  
    const ud = reactive({
      leftOne: 20,
      topOne: 20,
      bPosX: 0,
      bPosY: 0,
      validOne: false,
    })
    const winOneMouseDown = (event) => {
      console.log('down', event)
      event.preventDefault()
      event.stopPropagation()
      ud.validOne = true
      ud.bPosX = event.clientX
      ud.bPosY = event.clientY
    }
    const winOneMouseMove = (event) => {
      console.log('move', event)
      event.preventDefault()
      event.stopPropagation()
      if (ud.validOne) {
        ud.leftOne += event.clientX - ud.bPosX
        ud.topOne += event.clientY - ud.bPosY
        ud.bPosX = event.clientX
        ud.bPosY = event.clientY
      }
    }
    const winOneMouseUp = (event) => {
      console.log('up', event)
      ud.validOne = false
    }  
    return { 
      ud,
      winOneMouseDown,
      winOneMouseMove,
      winOneMouseUp,
    }
  }
})
</script>

<style lang="scss" scoped>
$height-descripe: 50px;
.test-floating {
  width: 100%;
  height: 100%;
  position: relative;
  .main-content {
    background-color: lightcoral;
  }
  .floating-window {
    top: 0;
    left: 0;
    width: 100%;
    cursor: grab;
    height: 100%;
    z-index: 10;
    overflow: hidden;
    position: fixed;
    min-width: 1024px;
    pointer-events: none;
    .win-one {
      position: relative;
      width: 300px;
      height: 400px;
      z-index: 20;
      background-color: lavender;
      pointer-events: all;
      transform: translate(487px, 441px);
      // height: auto;
      will-change: auto;
    }
  }
}
</style>
