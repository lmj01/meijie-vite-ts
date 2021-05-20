<template>
    <div class="frame-b">
        <p>Frame B</p>
        <Teeth name="missing" label="缺失牙齿" />
        <Teeth name="restrictMove" label="不可移动牙齿" />
        <Teeth name="restrictAttach" label="不加附件牙齿" />
        <Crowd />
        <SpecialDescribe />
        <Remote />
        <Spacing />
        <Spacing :left="false" />
        <Molar />
        <Molar :left="false" />
        <Complaints />
        <DentalArch />
        <MesioDistal />
        <MesioDistal :left="false" />
        <Overbite />
        <Overjet />
        <Anterior />
        <Anterior :crossbite="false"/>
        <Posterior />
        <MiddleLine />
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import Molar from './Molar.vue'
import Complaints from './Complaints.vue'
import DentalArch from './DentalArch.vue'
import MesioDistal from './MesioDistal.vue'
import Overbite from './Overbite.vue'
import Overjet from './Overjet.vue'
import Anterior from './Anterior.vue'
import Posterior from './Posterior.vue'
import MiddleLine from './MiddleLine.vue'
import Spacing from './Spacing.vue'
import Remote from './Remote.vue'
import SpecialDescribe from './SpecialDescribe.vue'
import Crowd from './Crowd.vue'
import Teeth from './Teeth.vue'

export default defineComponent({
    name: 'Recipe.Frame.B',
    components: {
        Molar,
        Complaints,
        DentalArch,
        MesioDistal,
        Overbite,
        Overjet,
        Anterior,
        Posterior,
        MiddleLine,
        Spacing,
        Remote,
        SpecialDescribe,
        Crowd,
        Teeth,
    },
})
</script>