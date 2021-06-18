<template>
    <div class="home-head">
        <div class="item">
            <h6>page1 for nested router</h6>
        </div>
        <div class="item">
            <router-link to="/page1/">测试1</router-link>
        </div>
        <div class="item">
            <router-link to="/page1/test2">测试2</router-link>
        </div>
        <div class="item">
            <router-link to="/page1/recipe">处方表</router-link>
        </div>
        <div class="item">
            <router-link to="/page1/mobile">移动端</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'One.head',
}
</script>