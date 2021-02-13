<template>
  <div class="demo">
    <canvas id="idCanvas2"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, onUpdated, onBeforeUpdate, onActivated, onDeactivated } from 'vue'
import {
  Engine, 
  Scene, 
  FreeCamera,
  Vector3,
  HemisphericLight,
  Mesh,
} from 'babylonjs'
import cssExample from '../css/example.module.css'

export default defineComponent({
  name: 'babylonjs.demo',
  setup() {
    onMounted(()=>{
      let canvas = document.getElementById('idCanvas2');
      // canvas.className = cssExample.red;
      let engine = new Engine(canvas, true, {preserveDrawingBuffer:true, stencil:true});
      let createScene = function() {
        let scene = new Scene(engine);
        let camera = new FreeCamera('camera1', new Vector3(0,5,-10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, false);

        let light = new HemisphericLight('light1', new Vector3(0,1,0), scene);
        let sphere = Mesh.CreateSphere('sphere1', 16, 2, scene, false, Mesh.FRONTSIDE);
        sphere.position.y = 1;
        let ground = Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
        return scene;
      }
      let scene = createScene();
      engine.runRenderLoop(function(){
        scene.render();
      });
      window.addEventListener('resize', function(){
        engine.resize();
      })
    })    

    onUnmounted(()=>{

    })

    onUpdated(()=>{

    })

    onBeforeUpdate(()=>{

    })

    onActivated(()=>{

    })

    onDeactivated(()=>{

    })
    return {
      
    }
  }
})
</script>

<style scoped>
.demo {
  color: #42b983;
}
</style>
