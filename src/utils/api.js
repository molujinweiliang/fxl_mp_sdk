import { http,ajaxWithImage, upload, upLoadOss } from './http.js';
const api = {};

//登录注册
api.login = (params) => http('sdk/v1/mini/init', params,'Post');

// 开锁
api.openLock = (params,filePath) => {
  if(filePath){
    return ajaxWithImage('sdk/v1/mini/lock/open', filePath, params,false);
  }else{
    return http('sdk/v1/mini/lock/open', params,'POST',false);
  }

};

// 开锁成功的回调
api.openCallback =(params) => http('sdk/v1/mini/lock/openCallBack', params,'Post', false);

// 身份证识别
api.ocr =(params) => http('sdk/v1/mini/ocr/idCard', params,'Post', false);

// 身份证确认
api.confirm =(params) => http('sdk/v1/mini/user/sure/idInfo', params,'Post', false);

// 人脸认证
api.faceAuth =(params) => http('sdk/v1/mini/faceAuth', params,'Post', false);


export default api;
module.exports = api;
