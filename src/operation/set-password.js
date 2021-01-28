import { AbstractBlueTooth, errorMsg, tools } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { setLockPassword, errorLog } from "@/static/js/modules/bluetooth";

export default class SetPassword extends AbstractBlueTooth{
    constructor(){
        super();
    }
    // 设置管理员密码
    setPassword(mac_id, password){
        const that = this;
        return new Promise((resolve, reject) => {
            let currentDevice = null, keyData = null;
            that.open()
                .then(res=> that.search(mac_id))
                .then(res=> {
                    currentDevice = res;
                    that.status = 30;
                    return that.getKey(res, mac_id, password);
                })
                .then(res=> {
                    keyData = res;
                    return that.connect(currentDevice);
                })
                .then(res=> that.sendData('04', keyData))
                .then( async res=>{
                    if (res.id == "04" && res['02'] == "00") {
                        resolve(errorCodeCallback(0));
                    }else {
                        reject(errorCodeCallback(1094));
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
                })
                .catch(code=> {
                    reject(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                }).finally(async ()=>{
                    await that.finalize();
                })
        })
    }

    // 获取秘钥
    getKey(currentDevice, mac_id, password){
        return new Promise((resolve, reject) => {
            let data = {
                mac_id: mac_id,
                version: currentDevice.version,
                has_manage: currentDevice.status,
                password,
            };
            if(currentDevice.status==0 && currentDevice.version=='00'){
                return reject(1051);
            }
            setLockPassword(data).then(res=>{
                resolve(res);
            }).catch(err=>{
                let code = 1070;
                reject(code);
            })
        })
    }
}
