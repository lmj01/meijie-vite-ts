<template>
  <div class="threejs-sprite">
    <canvas id="idcanvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {
  Float32BufferAttribute,
  PointLight,
  Points,
  PointsMaterial,
  BufferGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from 'three'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {initEngineByCanvas} from './AppAuxiliary'
import {AppEngine} from './App'
import {TextParameter, createTextTexture} from './MjObject'
export default defineComponent({
  name: 'Trackball',
  setup: () => {    
    const engine = new AppEngine();
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
    const planeCreate = () => {
      const tPara:TextParameter = {
        text: '25',
        fontsize: 32,
        rotate45: false,
      }
      const geo = new PlaneGeometry(5, 5, 32);
      // const positionAttribute = geo.attributes.position;
      // let uvs = [];
      // for (let i=0, total = positionAttribute.count; i<total; i++) {
      //     uvs.push(0, 1);
      // }
      // geo.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
      // console.log('--', geo)
      const material:MeshBasicMaterial = new MeshBasicMaterial({
        side: DoubleSide,
        vertexColors: false,
      });
      createTextTexture(tPara).then((map)=>{
        material.map = map;
        material.needsUpdate = true;
        console.log('-update plane texture-', material);        
      })
      const plane = new Mesh(geo, material);
      engine.addObject(plane, false);
    }
    const lightCreate = () => {
      // light
      var light = new PointLight( 0xffffff, .7, 0 );
      light.position.set(1, 1, 100 );
      engine.addObject(light, true);    
    }    
    onMounted(()=>{
      initEngineByCanvas('idcanvas', engine);
      pointCreate();
      lightCreate();
      planeCreate();
    })
    return { 
      engine,
      pointCreate,
      lightCreate,
      planeCreate,
    }
  }
})
</script>
<style lang="scss" scoped>
.threejs-sprite {
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
