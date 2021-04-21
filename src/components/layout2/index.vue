<template>
  <div id="app" class="app-home">
      <Head class="home-head" />
      <div class="home-main">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
import Head from './Head.vue'
export default {
  name: 'One.home',
  components: {
    Head,
  },
}
</script>