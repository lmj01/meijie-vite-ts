<template>
    <div class="top-bar">
        <span v-html="title"></span>
    </div>
</template>
<script>
export default {
    name: 'Topbar',
    setup() {
        const title = 'title for topbar'
        return {
            title,
        }
    }
}
</script>
<style lang="scss" scoped>
.top-bar {
    width: 100%;
    height: 100%;
}
</style>