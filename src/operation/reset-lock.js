import { AbstractBlueTooth, errorMsg, tools } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { resetF, resetCallBack, errorLog } from "@/static/js/modules/bluetooth";


export default class ResetLock extends AbstractBlueTooth{
    constructor(){
        super()
    }
    // 恢复出厂
    reset(mac_id){
        const that = this;
        return new Promise((resolve, reject) => {
            let currentDevice = null, keyData = null;
            that.open()
                .then(res=> that.search(mac_id))
                .then(res=> {
                    currentDevice = res;
                    that.status = 30;
                    return that.getKey(mac_id);
                })
                .then(res=> {
                    keyData = res;
                    return that.connect(currentDevice);
                })
                .then(res=> that.sendData("03", keyData))
                .then( async res=>{
                    await that.finalize();
                    if (res.id == "03" && res['02'] == "00") {
                        resolve(errorCodeCallback(0));
                        // 恢复出厂设置-回调接口
                        resetCallBack({mac_id}).catch(e=>{});
                    }else {
                        reject(errorCodeCallback(1094));
                        // 错误日志上传
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
                })
                .catch(async code=> {
                    reject(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                })
        })
    }

    // 获取恢复出厂秘钥
    getKey(mac_id){
        return new Promise((resolve, reject) => {
            let data = {
                mac_id: mac_id,
            }
            resetF(data).then(res=>{
                resolve(res);
            }).catch(err=>{
                let code = 1070;
                reject(code);
            })
        })
    }
}
