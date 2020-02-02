<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
   
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../../../styles/config";
#main-wrap {
  // width: 100vh;
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  -webkit-box-sizing: border;
  -webkit-transition: all .3s ease 0s;
  -moz-transition: all .3s ease 0s;
  -o-transition: all .3s ease 0s;
  -ms-transition: all .3s ease 0s;
  transition: all .3s ease 0s;
}
.main-content {  
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.open {
  #main-wrap {
    left: $navMenu;
  }
}
.close {
  #main-wrap {
    left: $navMenuMin;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>