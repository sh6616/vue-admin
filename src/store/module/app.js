import { Login } from "@/api/login";

const app = {
  state: {  
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
  },
  getters: {
    //es6写法
    count: state => state.count + 10

    //es5写法
    // count: function(state){
    //   return state.count+ 10
    // }
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    }
  },
  actions: {
    // setMenuState(content,data) {
    //   // content.state
    //   // content.getters
    //   // content.mutations
    //   // content.rootGetters
    //   // content.rootState
    //   // content.commit("SET_COLLAPSE")
    //   // console.log(data)
    //   // console.log(11)
    // }
    login(content, requstetData) {
      return new Promise((resolve, reject) => {
        Login(requstetData)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          });
      });
    }
  }
}

export default app;
