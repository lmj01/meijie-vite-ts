<template>
  <div class="side-view">
    <canvas id="idcanvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {initEngineByCanvas} from './AppAuxiliary'
import {AppEngine} from './App'
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
  Object3D,
  MeshBasicMaterial,
  Color,
  AmbientLight,
  DirectionalLight
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
    .onChange((val:string)=>{
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
      const files = [
        '/models/A011SU/0_lower.drc',
        '/models/A011SU/0_upper.drc',
        '/models/A011SU/18.drc',
        '/models/A011SU/17.drc',
        '/models/A011SU/16.drc',
        '/models/A011SU/15.drc',
        '/models/A011SU/14.drc',
        '/models/A011SU/13.drc',
        '/models/A011SU/12.drc',
        '/models/A011SU/11.drc',
        '/models/A011SU/21.drc',
        '/models/A011SU/22.drc',
        '/models/A011SU/23.drc',
        '/models/A011SU/24.drc',
        '/models/A011SU/25.drc',
        '/models/A011SU/26.drc',
        '/models/A011SU/27.drc',
        '/models/A011SU/28.drc',
        '/models/A011SU/31.drc',
        '/models/A011SU/32.drc',
        '/models/A011SU/33.drc',
        '/models/A011SU/34.drc',
        '/models/A011SU/35.drc',
        '/models/A011SU/36.drc',
        '/models/A011SU/37.drc',
        // '/models/A011SU/38.drc',
        '/models/A011SU/41.drc',
        '/models/A011SU/42.drc',
        '/models/A011SU/43.drc',
        '/models/A011SU/44.drc',
        '/models/A011SU/45.drc',
        '/models/A011SU/46.drc',
        '/models/A011SU/47.drc',
        // '/models/A011SU/48.drc',
      ];
      // modelLoader.load(files[0], loadOptions);
      const allPromise: any = [];
      files.forEach(e=>allPromise.push(modelLoader.load(e, loadOptions)))
      Promise.all(allPromise).then((values)=>{
        console.log(values);
        values.forEach((mesh)=>{
          engine.addObject((<Mesh>mesh), false);
        })
      })
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
      var pointLight = new PointLight( 0xffffff, .7, 0 );
      pointLight.position.set(1, 100, 100 );      
      pointLight.intensity = 2.4;
      engine.addObject(pointLight, true); 
      // ambient light
      const ambientLight = new AmbientLight(0x404040);
      engine.addObject(ambientLight, true);   
      // direction 
      const directionalLight = new DirectionalLight(0xffffff, 0.8);
      engine.addObject(directionalLight, true);
    }
    onMounted(()=>{
      initEngineByCanvas('idcanvas', engine);
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
