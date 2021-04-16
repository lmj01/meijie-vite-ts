<template>
  <div class="side-view">
    <canvas id="idcanvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {AppOptions, AppEngine} from './App'
import {ModelLoader, LoadOption, ExtType} from './Loader'
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
      engine.setSideView(val);
    })
    // 测试数据
    // http://masteralign.cn/editor?uuid=0c9a4c2a7bfa4e339dfbce6864708192    
    const midFaceNormal = [1, 0, 0];
    const occlusionNormal = [0, 0.9991733, 0.040653728];
    const modelLoader = new ModelLoader(ExtType.DRC);
    const loadOptions: LoadOption = {
      color: 0xff00ff,
    }

    const loadDrcFiles = () => {
      const files = ['/models/A011SU/0_lower.drc'];
      modelLoader.load(files[0], loadOptions);
      // const allPromise = [];
      // files.forEach(e=>allPromise.push(modelLoader.load(e, loadOptions)))
      // Promise.all(allPromise).then((values)=>{
      //   console.log(values);
      // })
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
      lightCreate();
      boxCreate();
      loadDrcFiles();
    })
    return { 
      engine,
      gui,
      lightCreate,
      boxCreate,
      loadDrcFiles,
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
