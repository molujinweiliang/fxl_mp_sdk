import { http,ajaxWithImage } from './http.js';

//错误日志
export const errorLog = (params) => http('sdk/v1/mini/init', params,'Post');

//登录注册
export const login = (params) => http('sdk/v1/mini/init', params,'Post');

// 开锁
export const openLock = (params,filePath) => {
  if(filePath){
    return ajaxWithImage('sdk/v1/mini/lock/open', filePath, params,false);
  }else{
    return http('sdk/v1/mini/lock/open', params,'POST',false);
  }

};

// 开锁成功的回调
export const openCallback =(params) => http('sdk/v1/mini/lock/openCallBack', params,'Post', false);

// 身份证识别
export const ocr =(params) => http('sdk/v1/mini/ocr/idCard', params,'Post', false);

// 身份证确认
export const confirm =(params) => http('sdk/v1/mini/user/sure/idInfo', params,'Post', false);

// 人脸认证
export const faceAuth =(params) => http('sdk/v1/mini/faceAuth', params,'Post', false);


