import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index")
  },
  {
    path: "/console",
    name: "Console",
    component: () => import("../views/Layout/index"),
    children: [
      {
        path: "/console",
        name: "Console",
        component: () => import("../views/Console/index")
      }
    ]
  }

];

const router = new VueRouter({
  routes
});

export default router;
