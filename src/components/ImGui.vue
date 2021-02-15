<template>
  <div>
      <p>imgui</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as ImGui from '../thirdlibs/imgui.umd'
// import {exports} from '../thirdlibs/imgui.umd.js'
// import ImGui_Impl from '../thirdlibs/imgui_impl.umd'
// const imguiDemo = (async function(){
  // await ImGui.default();

  //   function _done() {
  //     ImGui_Impl.Shutdown();
  //     ImGui.DestoryContext();
  //   }

// });

export default defineComponent({
  name: 'App.imgui',
  setup() {    
    onMounted(()=>{
      console.log('sdf', ImGui);
      // console.log(ImGui_VERSION);
      // imguiDemo();    
    })
  }
})
</script>

<style>

</style>