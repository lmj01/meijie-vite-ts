<template>
  <div class="side-view">
    <canvas id="idcanvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {AppOptions, AppEngine} from './App'
import * as dat from 'dat.gui'
import { 
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  PointLight,
} from 'three'
export default defineComponent({
  name: 'SideView',
  setup: () => {
    const engine = new AppEngine();
    const gui = new dat.GUI({autoPlace: false});
    gui.domElement.id = 'idGui';  
    const guiOptions = {
      side: 'front',
    }
    gui.add(guiOptions, 'side', ['front', 'back', 'left', 'right', 'top', 'bottom'])
    .onChange((val)=>{
      console.log('side', val);
    })

    const pointCreate = () => {
      // geom    
      const vertices = [];
      for (var i=0; i<500; i++) {
        vertices.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 100);
      }
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
      engine.addObject(new Points(geometry, new PointsMaterial({color: 0x00afaf})), false);        
    }
    const lightCreate = () => {
      // light
      var light = new PointLight( 0xffffff, .7, 0 );
      light.position.set(1, 1, 100 );
      engine.addObject(light, true);    
    }
    onMounted(()=>{
      let canvas = document.getElementById('idcanvas')
      let elParent = canvas.parentElement;
      elParent.appendChild(gui.domElement);
      let style = getComputedStyle(elParent);
      let width = parseInt(style.width);
      let height = parseInt(style.height);
      // canvas.width = width;
      // canvas.height = height;
      const appOptions: AppOptions = {
        canvas: canvas,
        width: width,
        height: height,
        showAxes: true,        
      };
      
      engine.initial(appOptions);      
      engine.loop();
      pointCreate();
      lightCreate();
    })
    return { 
      engine,
      gui,
      pointCreate,
      lightCreate,
    }
  }
})
</script>
<style lang="scss" scoped>
.side-view {
  width: 100%;
  height: 100%;
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
  }  
}
</style>
