import { AbstractBlueTooth, errorMsg, tools } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { login, errorLog } from "@/static/js/modules/bluetooth";
import { accessKeyStorageKey, accessSecretStorageKey, userInfoStorageKey } from '../utils/urlStore';

export default class ResetLock extends AbstractBlueTooth{
    constructor(){
        super()
    }
    init(self, params) {
        let testResult = this.initDataTest(params);
        if (!testResult) return;
        store.save(accessKeyStorageKey, params.accessKey);
        store.save(accessSecretStorageKey, params.accessSecret);
        login(params.userInfo)
            .then(res => {
                store.save(userInfoStorageKey, res)
            })
            .catch(err => {
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
            console.warn('缺少userInfo参数，不能初始化享宿SDK')
            result = false
        } else if (!initData.accessKey) {
            console.warn('缺少accessKey参数，不能初始化享宿SDK')
            result = false
        } else if (!initData.accessSecret) {
            console.warn('缺少accessSecret参数，不能初始化享宿SDK')
            result = false
        }
        return result
    }
}
