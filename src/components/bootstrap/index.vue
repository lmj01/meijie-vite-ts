<template>
    <div>
        <p>page one 1 index</p>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'bootstrap.index',
})
</script>