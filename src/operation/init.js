import { AbstractBlueTooth, errorMsg } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { login, errorLog } from "../utils/api";
import { accessKeyStorageKey, accessSecretStorageKey, userInfoStorageKey } from '../utils/urlStore';
import store from "../utils/store";
import regeneratorRuntime from '../utils/runtime.js';

export default class Init extends AbstractBlueTooth{
    constructor(){
        super()
    }
    verifyLogin(){
        let accessKey = store.get(accessKeyStorageKey),
            accessSecret = store.get(accessSecretStorageKey),
            userInfo = store.get(accessSecretStorageKey),
            loginStatus;
        if(!accessKey || !accessSecret || !userInfo || JSON.stringify(userInfo)==='{}'){
            loginStatus = {
                errno: -1,
                errmsg: '未登录',
            }
        }else {
            loginStatus = {
                errno: 0,
                errmsg: '已登录',
            }
        }
        return loginStatus;
    }
    init(params) {
        return new Promise((resolve, reject) => {
            let testResult = this.initDataTest(params);
            if (!testResult) return reject({errno: -1, errmsg: '请传入正确的初始化参数'});
            store.save(accessKeyStorageKey, params.accessKey);
            store.save(accessSecretStorageKey, params.accessSecret);
            login(params.userInfo)
                .then(res => {
                    store.save(userInfoStorageKey, res)
                    resolve({errno: 0, errmsg: '登陆成功'});
                })
                .catch(err => {
                    resolve({errno: -1, errmsg: '登陆失败'});
                })
        })
    }
    // 校验初始化数据格式
    initDataTest(initData) {
        let result = true
        if (typeof initData !== 'object') {
            console.warn('初始化参数格式不对')
            result = false
        } else if (!initData.appId) {
            // console.warn('缺少appID参数，不能初始化享宿SDK');
            // result = false;
        } else if (!initData.hasOwnProperty('userInfo') || !initData['userInfo']) {
            console.warn('缺少userInfo参数，不能初始化SDK')
            result = false
        } else if (!initData.accessKey) {
            console.warn('缺少accessKey参数，不能初始化SDK')
            result = false
        } else if (!initData.accessSecret) {
            console.warn('缺少accessSecret参数，不能初始化SDK')
            result = false
        }
        return result
    }
}
