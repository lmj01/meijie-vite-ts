<template>
  <div class="multi-scenes">
    <div class="part-left">
      <canvas id="canvasLeft" width="800" height="600"></canvas>
    </div>
    <div class="part-right">
      <div class="upper">
        <canvas id="canvasUpper" width="800" height="600"></canvas>
      </div>
      <div class="lower">
        <canvas id="canvasLower" width="800" height="600"></canvas>
      </div>
    </div>    
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {initEngineByCanvas} from './AppAuxiliary'
import {AppEngine} from './App'
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
    const engineUpper = new AppEngine();
    const engineLower = new AppEngine();
    
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
    const updateControl = () => {
      engineUpper.control.addEventListener('change', ()=>{ 
        engineUpper.renderFrame();
        engineLower.camera.position.copy(engineUpper.camera.position);
        engineLower.camera.quaternion.position.copy(engineUpper.camera.quaternion);
        engineLower.camera.scale.copy(engineUpper.camera.scale);
        engineLower.camera.updateMatrix();
        engineLower.renderFrame();        
      });
      engineLower.control.addEventListener('change', ()=>{ 
        engineLower.renderFrame();
        engineUpper.camera.position.copy(engineLower.camera.position);
        engineUpper.camera.quaternion.position.copy(engineLower.camera.quaternion);
        engineUpper.camera.scale.copy(engineLower.camera.scale);
        engineUpper.camera.updateMatrix();
        engineUpper.renderFrame();        
      });
    }
    onMounted(()=>{
      initEngineByCanvas('canvasLeft', engine);
      initEngineByCanvas('canvasUpper', engineUpper);
      initEngineByCanvas('canvasLower', engineLower);
      updateControl();
      pointCreate();
      lightCreate();
      boxCreate();
    })
    return { 
      engine,
      engineUpper,
      engineLower,
      pointCreate,
      lightCreate,
      boxCreate,
      updateControl,
    }
  }
})
</script>
<style lang="scss" scoped>
$width-left: 40%;
.multi-scenes {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  canvas {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .part-left {
    height: 100%;
    width: $width-left;  
    & > canvas {
      border: 1px solid lightcoral;
    } 
  }
  .part-right {
    height: 100%;
    width: calc(100% - #{$width-left});
    .upper {
      width: 100%;
      height: 50%;
      &>canvas {
        border: 1px solid lightgreen;
      }
    }
    .lower {
      width: 100%;
      height: 50%;
      &>canvas {
        border: 1px solid lightskyblue;
      }
    }
  }  
}
</style>
