<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
      <p>Vite Vue3 Demo </p>
      <p><router-link to="/helloworld">hello world</router-link></p>
      <p><router-link to="/threejs">layout 1 相同布局的内容</router-link></p>
      <p><router-link to="/imgui">the Immediate mode GUI -- imgui</router-link></p>
      <p><router-link to="/html/ficusjs/index.html">web component -- ficus js library</router-link></p>
      <p><a href="/page1/#/">Page 1 for bootstrap</a></p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App.index',
  components: {
  },
})
</script>

<style>

</style>