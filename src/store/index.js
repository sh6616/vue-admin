import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./module/app.js"

export default new Vuex.Store({
  modules: {
    app
  }
})