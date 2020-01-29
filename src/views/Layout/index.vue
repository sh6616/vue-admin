<template>
  <div id="Layout">
    <LayoutMain />
    <LayoutHeader />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutMain from "../Layout/Components/Main"
import LayoutHeader from "../Layout/Components/Header"
import LayoutNav from "../Layout/Components/Nav"
export default {
  name: 'Layout',
  components: { LayoutMain, LayoutHeader, LayoutNav }
}
</script>

<style lang="less" scoped>
#main-Layout {
  background-color: #f7f7f7;
}
</style>