import service from "@/utils/request";
//获得验证码
export function GetSms(data) {
  service.request({
    method: "post",
    url: "/getSms/",
    data: data //等价于data
  });
}

//获取用户角色

//登录

//注册
