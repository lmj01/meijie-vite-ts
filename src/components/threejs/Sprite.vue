<template>
  <div class="threejs-trackball">
    <canvas id="idcanvas" width="800" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import {
  Vector2,
  Vector3,
  Quaternion,
  Float32BufferAttribute,
  EventDispatcher,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  Points,
  PointsMaterial,
  BufferGeometry,
} from 'three/build/three.module'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {MjSprite} from './MjObject'
export default defineComponent({
  name: 'Trackball',
  setup: () => {    
    /**
    * Scene
    **/
    const app = reactive({
      renderer: null,
      controls: null,
      canvas: null,
    })
    var scene = new Scene();
    var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    // geom    
    const vertices = [];
    for (var i=0; i<5; i++) {
      vertices.push(Math.random() * 20, Math.random() * 20, 0);
    }
    const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    scene.add(new Points(geometry, new PointsMaterial({color: 0x00afaf})));
    // light
    var light = new PointLight( 0xffffff, .7, 0 );
    light.position.set(1, 1, 100 );
    scene.add(light)
    // main
    function animate() {
      requestAnimationFrame( animate );
      app.renderer.render( scene, camera );
      app.controls.update();
    }
    const pointCreate = () => {
      
    }
    const spriteCreate = () => {

    }
    // animate();
    onMounted(()=>{
      app.canvas = document.getElementById('idcanvas');
      let elParent = app.canvas.parentNode;
      let style = getComputedStyle(elParent);
      let width = parseInt(style.width);
      let height = parseInt(style.height);
      app.canvas.width = width;
      app.canvas.height = height;
      app.renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('idcanvas')
      });
      app.renderer.setSize( width, height );
      app.controls = new TrackballControls(camera, app.renderer.domElement);
      
      spriteCreate();

      animate();
    })
    return { 
      app,
      spriteCreate,
    }
  }
})
</script>
<style lang="scss" scoped>
.threejs-trackball {
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
