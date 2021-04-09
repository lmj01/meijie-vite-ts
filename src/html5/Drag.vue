<template>
  <div class="test-drag">
    <p>drag div, div的element元素没有resize，但是可以在element中添加一个iframe，通过对iframe的window进行resize监听，可以获取到变化事件</p>
    <div class="drag-area">
      <div ref="element" class="content" v-drag draggable="false">
        <p>文字内容</p>
      </div>
      <div class="content-textarea" contenteditable="true">
        <p>文字内容</p>
      </div>
    </div>
    <div class="resize-area">
      <div id="idLeft" class="resizeable">
        <div class="handle" v-resize:left @click="fResize" >
        </div>
      </div>
      <div class="rest-area">
        <div class="child-area">
          <div id="idRight" class="child-resizeable">
            <div class="handle" v-resize:right @click="fResize" >
            </div>
          </div>
          <div class="child-rest-area">
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="clickHideResizeArea('idLeft')">隐藏左边</button>
      <button @click="clickHideResizeArea('idRight')">隐藏右边</button>
      <button @click="clickShowResizeArea('idLeft')">显示左边</button>
      <button @click="clickShowResizeArea('idRight')">显示右边</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Drag',
  setup: () => {    
    const fResize = () => {
      // console.log('bind function resize');
    }
    const clickHideResizeArea = (id) => {
      let el = document.getElementById(id);
      el.children[0].style.display = 'none';
      let elBrother = el.nextElementSibling;
      el.style.setProperty('--resizeable-width', `${0}px`);
      elBrother.style.setProperty('--resizeable-width', `${0}px`);
    }
    const clickShowResizeArea = (id) => {
      let el = document.getElementById(id);
      el.children[0].style.display = 'block';
      let elBrother = el.nextElementSibling;
      let width = id === 'idLeft' ? 300: 200;
      el.style.setProperty('--resizeable-width', `${width}px`);
      elBrother.style.setProperty('--resizeable-width', `${width}px`);
    }
    return { 
      fResize,
      clickHideResizeArea,
      clickShowResizeArea,
    }
  }
})
</script>

<style lang="scss" scoped>
.test-drag {
  width: 100%;
  // height: 100%;

  .drag-area {
    background-color: lightblue;
    position: relative;
    height: 300px;
    width: 100%;
  }
  .content {
    position: absolute;
    background-color: lightgray;
    cursor: pointer;
  }
  .content-textarea {
    position: absolute;
    background-color: lightgray;
    /* cursor: pointer; */
    resize: vertical;
    top: 100px;
  }
  .content-textarea:empty:before {
    content: attr(placeholder);
    color: #bbb;
  }

  .resize-area {
    width: 100%;
    height: 500px;
    margin-top: 5px;
    position: relative;
    .handle {
      float: right;
      height: 100%;
      width: 1px;
      background-color: blue;
      z-index: 1;
      &::after {
        content: "";
        width: 9px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin-left: -4px;
        background-color: transparent;
        cursor: ew-resize;
        z-index: 2;
      }
    }
    .resizeable {
      --resizeable-width: 300px;
      height: 100%;
      width: var(--resizeable-width);
      // min-width: var(--min-width);
      // max-width: var(--max-width);
      background-color: grey;
    }
    .rest-area {
      --resizeable-width: 300px;
      width: calc(100% - var(--resizeable-width));
      height: 100%;
      position: absolute;
      top: 0;
      left: var(--resizeable-width);
      .child-area {
        height: 100%;
        width: 100%;
        position: relative;
        .child-resizeable {        
          --resizeable-width: 200px;
          height: 100%;
          width: calc(100% - var(--resizeable-width));
          position: absolute;
          top: 0;
          left: 0;
        }
        .child-rest-area {
          --resizeable-width: 200px;
          background-color: lightpink;
          height: 100%;
          width: var(--resizeable-width);
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
