<template>
  <div id="nav-wrap">
    <div class="logo"><img src="../../../assets/images/logo.png" alt="" /></div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子集菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  computed
} from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //data数据
    // const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    //监听
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });
    //函数
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      isCollapse,
      routers,
      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config";
.logo {
  text-align: center;
  ing {
    margin: 28px auto 25px;
    width: 92px;
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    -ms-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  // @include webkit(transition,all .3s ease 0s);
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  -ms-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 70%;
  }
}
</style>
