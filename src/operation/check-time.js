import AbstractBlueTooth from '../abstract-bluetooth';
import { errorCodeCallback, errorLogFunction } from "../errorMsg";
import { syncTime, errorLog } from "@/static/js/modules/bluetooth";



export default class CheckTime extends AbstractBlueTooth{
    constructor(){
        super()
    }

    // checkTime
    checkTime(mac_id){
        const that = this;
        return new Promise((resolve, reject) => {
            let currentDevice = null, keyData = null;
            that.open()
                .then(res=> that.search(mac_id))
                .then(res=> {
                    currentDevice = res;
                    that.status = 30;
                    return that.getKey(res, mac_id);
                })
                .then(res=> {
                    keyData = res;
                    return that.connect(currentDevice);
                })
                .then(res=> that.sendData('02', keyData))
                .then( async res=>{
                    await that.finalize();
                    if (res.id == "02" && res['02'] == "00") {
                        resolve(errorCodeCallback(0));
                    }else {
                        reject(errorCodeCallback(1094));
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
                })
                .catch(code=> {
                    reject(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                })
        })
    }

    // 获取秘钥
    getKey(currentDevice, mac_id){
        return new Promise((resolve, reject) => {
            let data = {
                mac_id: mac_id,
            }
            if(currentDevice.status==0 && currentDevice.version=='00'){
                return reject(1051);
            }
            syncTime(data).then(res=>{
                let dataArr = [{
                    k: "0A",
                    v: res,
                    l: 18,
                }];
                resolve(dataArr);
            }).catch(err =>{
                let code = 1070;
                if (err.errno == 200022 || err.errno == 200016) {
                    // 照片未通过对比
                    code = 1071;
                } else if (err.errno == 100008) {
                    // 未完成实名认证
                    code = 1072
                } else if (err.errno == 200023) {
                    // 未到可以开锁时间
                    code = 1073;
                } else if (err.errno == 200024) {
                    // 已过有效期
                    code = 1074;
                }
                reject(code);
            })
        })
    }


}
