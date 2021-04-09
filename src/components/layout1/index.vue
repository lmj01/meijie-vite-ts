<template>
    <div class="app-wrapper">
        <div class="side-left">
            <Sidebar />
        </div>
        <div class="side-content">
            <Topbar class="topbar" />
            <AppMain class="app-main" />
        </div>
    </div>
</template>

<script>
import { AppMain, Topbar, Sidebar } from './'

export default {
  name: 'Layout1',
  components: {
    AppMain,
    Topbar,
    Sidebar,
  },
}
</script>
<style lang="scss" scoped>
$h-top: 50px;
$w-sidebar: 200px;
.app-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  .side-left {
    width: $w-sidebar;
    height: 100%;
  }
  .side-content {
    position: relative;
    .topbar {
      height: $h-top;
      width: 100%;
    }
    .app-main {
      width: calc(100vw - #{$w-sidebar});
      height: calc(100% - #{$h-top});
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>
