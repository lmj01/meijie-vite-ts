<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
      <p>Babylon JS library </p>
      <p><router-link to="/babylonjs/demo">demo first</router-link></p>
      <p><router-link to="/helloworld">hello world</router-link></p>
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