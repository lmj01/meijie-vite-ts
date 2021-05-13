<template>
    <div class="frame-b">
        <p>Frame B</p>
        <Molar />
        <Molar :left="true" />
        <Complaints />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import Molar from './Molar.vue'
import Complaints from './Complaints.vue'

export default defineComponent({
    name: 'Recipe.Frame.B',
    components: {
        Molar,
        Complaints,
    },
})
</script>