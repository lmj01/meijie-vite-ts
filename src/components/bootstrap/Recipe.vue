<template>
    <div class="page-recipe">
        <div class="container">
            <ul class="nav nav-pills nav-justified">
                <li class="nav-item active">
                    <router-link to="/page1/recipe/framea">FrameA</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/page1/recipe/frameb">FrameB</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/page1/recipe/framec">FrameC</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'bootstrap.recipe',
})
</script>