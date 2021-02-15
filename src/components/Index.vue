<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
      <p>Vite Vue3 Demo </p>
      <p><router-link to="/babylonjs">babylon js library </router-link></p>
      <p><router-link to="/helloworld">hello world</router-link></p>
      <p><router-link to="/imgui">the Immediate mode GUI -- imgui</router-link></p>
      <p><router-link to="/jsx">Jsx style components</router-link></p>
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