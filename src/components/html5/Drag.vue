<template>
  <div class="test-drag">
    <div class="descripe">
      <p>drag div, div的element元素没有resize，但是可以在element中添加一个iframe，通过对iframe的window进行resize监听，可以获取到变化事件</p>
    </div>
    <div class="main-content">
      <div class="drag-area">
        <div ref="element" class="content" v-drag draggable="false">
          <p>文字内容</p>
        </div>
        <div class="content-textarea" contenteditable="true">
          <p>文字内容</p>
        </div>
      </div>
      <div class="handle vertical" v-resizev:up @click="fResize" ></div>
      <div class="resize-area">
        <div class="resize-horizontal">
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
          <div>
            <button @click="clickHideResizeArea('idLeft')">隐藏左边</button>
            <button @click="clickHideResizeArea('idRight')">隐藏右边</button>
            <button @click="clickShowResizeArea('idLeft')">显示左边</button>
            <button @click="clickShowResizeArea('idRight')">显示右边</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Html5.Drag',
  setup: () => {    
    const fResize = () => {
      // console.log('bind function resize');
    }
    console.log('meta env', import.meta.env.VITE_APP_TEST)
    const clickHideResizeArea = (id) => {
      let el = document.getElementById(id);
      let child = el.children[0];
      if (child) child.style.display = 'none';
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
$height-descripe: 50px;
.test-drag {
  width: 100%;
  height: 100%;
  position: relative;
  .descripe {
    height: $height-descripe;
    p {
      margin: 0;
    }
  }
  .main-content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: calc(100% - #{$height-descripe});    
    .drag-area {
      --resizeable-height: 300px;
      background-color: lightblue;
      position: relative;
      height: var(--resizeable-height);
      width: 100%;      
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
    }
    .handle {
      float: right;
      height: 100%;
      width: 1px;
      cursor: ew-resize;        
      &.vertical {
        position: relative;
        width: 100%;
        height: 2px;
        float: unset;
        cursor: ns-resize;
      }
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
        z-index: 2;
      }
      &.vertical::after {
        content: "";
        width: 9px;
        position: absolute;
        left: 50%;
        background-color: transparent;
        z-index: 2;
      }
    }      
    .resize-area {
      --resizeable-height: 300px;
      width: 100%;
      height: calc(100% - var(--resizeable-height));
      position: relative;
      .resize-horizontal {
        position: relative;
        height: calc(100% - 50px);
        .resizeable {
          --resizeable-width: 10%;
          height: 100%;
          width: var(--resizeable-width);
          // min-width: var(--min-width);
          // max-width: var(--max-width);
          background-color: grey;
        }
        .rest-area {
          --resizeable-width: 10%;
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
  }
}
</style>
