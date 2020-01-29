<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-bind:class="{ current: item.current }"
          v-for="(item, index) in menuTab"
          :key="index"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- form表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label for="">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="">密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="model === 'register'"
        >
          <label for="">重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="20"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
                >{{ codeButtonStatus.text }}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class=" login-btn block"
            :disabled="loginButtonStatus"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateEmail,
  validatePassWord,
  validatecode
} from "@/utils/validate.js";
import sha1 from "js-sha1";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { GetSms, Register, Login } from "@/api/login";
export default {
  name: "login",
  setup(props, { refs, root }) {
    // form表单数据
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePassWord(value)) {
        callback(new Error("密码为6-20位的数字+字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    let validatePasswords = (rule, value, callback) => {
      //如果模块值为login，直接通过
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validatecode(value)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    //这里防止data数据，生命周期，自定义的函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    //模块值
    const model = ref("login");
    //登录按钮禁用状态
    const loginButtonStatus = ref(false);
    //验证码按钮状态
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    //倒计时
    const timer = ref(null);
    //表单数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    //表单的规则
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    //判断model是不是基础数据类型
    // console.log(isRef(model) ? true : false)
    //声明函数--切换模块
    const toggleMenu = data => {
      // this.menuTab.forEach(elem) => {
      //   elem.current = false
      // }
      for (let i = 0; i < menuTab.length; i++) {
        menuTab[i].current = false;
      }
      //高光
      data.current = true;
      //修改模块值
      model.value = data.type;
      resetFromData();
      clearCountDown();
    };
    //清除表单数据
    const resetFromData = () => {
      //重置表单
      // this.$refs[formName].resetFields();
      refs.loginForm.resetFields();
    };
    //更新按钮状态
    const updataButtonStatus = params => {
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;
    };
    //获取验证码
    const getSms = () => {
      //进行提示
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空哦");
        return false;
      } else if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式错误，请重新输入");
      }
      //获取验证码-请求接口
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //修改获取验证按钮
      updataButtonStatus({
        status: true,
        text: "发送中"
      });
      setTimeout(() => {
        GetSms(requestData)
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });
            //启用登录和注册按钮
            loginButtonStatus.value = false;
            //调定时器
            countDown(60);

            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }, 1000);
      //请求接口
      // GetSms({username: ruleForm.username});
    };
    //提交表单
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          model.value === "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    //登录
    const login = () => {
      let requstetData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      Login(requstetData)
        .then(response => {
          console.log("登陆成功");
        })
        .catch(error => {});
    };
    //注册
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register" //必选项
      };
      //注册接口
      Register(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {});
    };
    //倒计时
    const countDown = number => {
      let time = number;
      timer.value = setInterval(() => {
        time--;
        console.log(time);
        if (time === 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`; // es5 '倒计时'+ time + '秒'
        }
      }, 1000);
    };
    //清除倒计时
    const clearCountDown = () => {
      //还原验证码按钮默认状态
      updataButtonStatus({
            status: false,
            text: "获取验证码"
          });
      //清除倒计时
      clearInterval(timer.value);
    };
    //生命周期 挂在完成后
    onMounted(() => {});
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      timer,
      rules,
      toggleMenu,
      submitForm,
      getSms
    };
  }
};
</script>

<style lang="less" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.el-form-item {
  margin-bottom: 0;
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
