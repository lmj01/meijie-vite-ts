<template>
  <div class="side-view">
    <canvas id="idcanvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {AppOptions} from './AppType'
import {AppEngine} from './App'
import * as dat from 'dat.gui'
import { 
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  PointLight,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Color,
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
      engine.setSideView(val);
    })

    const pointCreate = () => {
      // geom    
      const length = 10;
      const offset = length / 2;
      const vertices = [];
      for (var i=0; i<50; i++) {
        vertices.push(Math.random() * length - offset, Math.random() * length - offset, Math.random() * length - length);
      }
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
      engine.addObject(new Points(geometry, new PointsMaterial({color: 0xff0000})), false);        
    }
    const boxCreate = () => {
      const geo = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({color: 0xf0f0f0});
      const cube = new Mesh(geo, material);
      engine.addObject(cube, false);
      const materialX = new MeshBasicMaterial({color: 0xff0000});
      const cubeX = new Mesh(geo, materialX);
      cubeX.position.x = 5;
      engine.addObject(cubeX, false);
      const materialY = new MeshBasicMaterial({color: 0x00ff00});
      const cubeY = new Mesh(geo, materialY);
      cubeY.position.y = 5;
      engine.addObject(cubeY, false);
      const materialZ = new MeshBasicMaterial({color: 0x0000ff});
      const cubeZ = new Mesh(geo, materialZ);
      cubeZ.position.z = 5;
      engine.addObject(cubeZ, false);
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
        axesSize: 5,   
      };
      
      engine.initial(appOptions);      
      engine.loop();
      pointCreate();
      lightCreate();
      boxCreate();
    })
    return { 
      engine,
      gui,
      pointCreate,
      lightCreate,
      boxCreate,
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
