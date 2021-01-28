import { AbstractBlueTooth, errorMsg } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { openDoor, openCallBack, errorLog, syncOpenLogByOpenLock } from "@/static/js/modules/bluetooth";
// import {of, from } from "rxjs";
// import { concatMap, mergeMap, finalize } from "rxjs/operators";
const Rx = require('../rxjs.umd.min.js');
const { of, from } = Rx;
const { concatMap, mergeMap, finalize, } = Rx.operators;
var subscribition = null;

export default class OpenLock extends AbstractBlueTooth{
    constructor(){
        super();
    }
    // 开锁
    openLock({ mac_id, manage_id, filePath = null }, callback){
        const that = this;
        let currentDevice = null, keyData = null, historyId = null;
        subscribition = of(1)
            .pipe(
                concatMap(res=>{
                    return from(that.open());
                })
            )
            .pipe(
                concatMap(res=>{
                    return from(that.search(mac_id));
                })
            )
            .pipe(
                concatMap(res=>{
                    currentDevice = res;
                    that.status = 30;
                    return from(that.getKey(res, mac_id, manage_id, filePath));
                })
            )
            .pipe(
                concatMap(res=>{
                    keyData = res.sendLockData;
                    historyId = res.historyId;
                    return from(that.connect(currentDevice));
                })
            )
            .pipe(
                concatMap(res=>{
                    return from(that.sendData('02', keyData, 5000));
                })
            )
            .pipe(
                finalize(async (res) => {
                    await that.closeConnect();
                })
            )
            .subscribe(
                res=> {
                    if (res.id == "02" && res['02'] == "00") {
                        callback(errorCodeCallback(0));
                        // 开锁成功的回调
                        openCallBack({
                            mac_id,
                            historyId,
                            result: 1,
                            quantity: currentDevice.electricity/100,
                        }).catch(e=>{})
                    }else {
                        callback(errorCodeCallback(1094));
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
					// 上传开锁记录
					if(res['1a'] || res['1A']){
						syncOpenLogByOpenLock({mac_id, syncData: res['1a'] || res['1A']}).catch(err=>{})
					}
                },
                code=> {
                    callback(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                },
            )
    }

    async cancel(){
        if(subscribition){
            await this.finalize();
            subscribition.unsubscribe();
            subscribition = null;
        }
    }

    // openLock(mac_id, manage_id, filePath){
    //     const that = this;
    //     return new Promise((resolve, reject) => {
    //         let currentDevice = null, keyData = null, historyId = null;
    //         that.open()
    //             .then(res=> that.search(mac_id))
    //             .then(res=> {
    //                 currentDevice = res;
    //                 that.status = 30;
    //                 return that.getKey(res, mac_id, manage_id, filePath);
    //             })
    //             .then(res=> {
    //                 keyData = res.sendLockData;
    //                 historyId = res.historyId;
    //                 return that.connect(currentDevice);
    //             })
    //             .then(res=> that.sendData('02', keyData))
    //             .then( async res=>{
    //                 if (res.id == "02" && res['02'] == "00") {
    //                     resolve(errorCodeCallback(0));
    //                     // 开锁成功的回调
    //                     openCallBack({
    //                         mac_id,
    //                         historyId,
    //                         result: 1,
    //                         quantity: currentDevice.electricity/100,
    //                     }).catch(e=>{})
    //                 }else {
    //                     reject(errorCodeCallback(1094));
    //                     errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
    //                 }
    //             })
    //             .catch(code=> {
    //                 reject(errorCodeCallback(code));
    //                 errorLog({ content: errorLogFunction(code) }).catch(e=>{});
    //             }).finally(async ()=>{
    //                 await that.finalize();
    //             })
    //     })
    // }

    // 获取秘钥
    getKey(currentDevice, mac_id, manage_id, filePath){
        return new Promise((resolve, reject) => {
            let data = {
                mac_id: mac_id,
                manage_id,
                version: currentDevice.version,
                has_manage: currentDevice.status,
            };
            if(currentDevice.status==0 && currentDevice.version=='00'){
                return reject(1051);
            }
            openDoor(data, filePath).then(res=>{
                resolve(res);
            }).catch(err=>{
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
