<template>
  <div id="Layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutMain />
    <LayoutHeader />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutMain from "../Layout/Components/Main"
import LayoutHeader from "../Layout/Components/Header"
import LayoutNav from "../Layout/Components/Nav"
import { computed } from '@vue/composition-api'
export default {
  name: 'Layout',
  components: { LayoutMain, LayoutHeader, LayoutNav },
  setup(props,{root}) {
    const menuStatus = computed(() => {
      return root.$store.state.app.isCollapse
    })
    return {
      menuStatus
    }
  }
}
</script>

<style lang="less" scoped>
#main-Layout {
  background-color: #f7f7f7;
}
</style>