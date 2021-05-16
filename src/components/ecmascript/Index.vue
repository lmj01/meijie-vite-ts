<template>
  <div class="ecmascript">
    <Function />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import Function from './Function.vue'

export default defineComponent({
  name: 'EcmaScript.Index',
  components: {
    Function,
  },
  setup: () => {    
    return { 
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
