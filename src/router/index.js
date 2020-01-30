import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/login/index")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台"
    },
    component: () => import("../views/Layout/index"),
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理"
    },
    component: () => import("../views/Layout/index"),
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category")
      }
    ]
  },
  //用户管理
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理"
    },
    component: () => import("../views/Layout/index"),
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index")
      }
    ]
  }

];

const router = new VueRouter({
  routes
});

export default router;
