<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <canvas id="idCanvas"></canvas>
  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import {
  Engine, 
  Scene, 
  FreeCamera,
  Vector3,
  HemisphericLight,
  Mesh,
} from 'babylonjs'
import cssExample from './css/example.module.css'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    this.initialBabylon();
  },
  methods: {
    initialBabylon() {
      let canvas = document.getElementById('idCanvas');
      canvas.className = cssExample.red;
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
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>