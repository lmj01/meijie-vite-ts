<template>
  <div>
      <canvas id="idCanvas"></canvas>
  </div>
</template>

<script>
import App from './App';
import { onMounted, onUpdated } from 'vue';
export default {
    props: {
        user: {
            type: String,
            required: true
        }
    },
    setup(props) {        
        console.log('setup', props);
        let app = null;
        onMounted(()=>{
            const canvas = document.getElementById('idCanvas');
            app = new App(canvas);
            app.createScene();
            // app.addFreeCamera(0, 5, -10);
            app.addArcRotateCamera(0, 60, 0);
            app.renderLoop();
            window.addEventListener('resize', function(){
                app.resize();
            })
            console.log(app, canvas);
        })

        onUpdated(()=>{
            console.log('update', app.engine._glVersion);
        })

        return {
            app,
        }
    }
}
</script>

<style>

</style>