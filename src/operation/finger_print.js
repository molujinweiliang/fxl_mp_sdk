import { AbstractBlueTooth, errorMsg } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { addFingerprintStepOne, removeFingerprint, fingerprintCallback, errorLog } from "@/static/js/modules/bluetooth";
const Rx = require('../rxjs.umd.min.js');
const { of, from } = Rx;
const { concatMap, mergeMap, finalize, } = Rx.operators;
var addSubscribition = null, removeSubscribition = null;
const timeout = 42000;//添加指纹超时时间

export default class FingerPrint extends AbstractBlueTooth{
    constructor() {
        super();
    }

    add({mac_id, manage_id}, callback){
        const that = this;
        let fingerprint_id = null, start_time = new Date().getTime();
        addSubscribition = of(1)
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
                concatMap(currentDevice=>{
                    return from(that.connect(currentDevice));
                })
            )
            .pipe(
                concatMap(res=>{
                    return from(that.getStepOneKey(mac_id, manage_id));
                })
            )
            .pipe(
                concatMap(res=>{
                    fingerprint_id = res.fingerprint_id;
                    let _use_time = new Date().getTime() - start_time;
                    return from(that.sendData('10', res.sendLockData, timeout - _use_time -1));
                })
            )
            .pipe(
                finalize(async (res) => {
                    await that.finalize();
                })
            )
            .subscribe(
                res=> {
                    console.log(res);
                    if (res.id == "10" && res['02'] == "00") {
                        callback(errorCodeCallback(0));
                        // 添加卡成功的回调
                        fingerprintCallback({
                            fingerprint_id,
                            action: 'add',
                        }).catch(e=>{})
                    }else {
                        callback(errorCodeCallback(1094));
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
                },
                code=> {
                    callback(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                },
            )
    }

    // 删除卡
    remove({mac_id, fingerprint_id}, callback){
        const that = this;
        let currentDevice = null, keyData = null;
        removeSubscribition = of(1)
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
                    return from(that.getRemoveKey(fingerprint_id));
                })
            )
            .pipe(
                concatMap(res=>{
                    keyData = res.sendLockData;
                    return from(that.connect(currentDevice));
                })
            )
            .pipe(
                concatMap(res=>{
                    return from(that.sendData('11', keyData));
                })
            )
            .pipe(
                finalize(async (res) => {
                    await that.finalize();
                })
            )
            .subscribe(
                res=> {
                    if (res.id == "11" && res['02'] == "00") {
                        callback(errorCodeCallback(0));
                        // 添加卡成功的回调
                        fingerprintCallback({
                            fingerprint_id,
                            action: 'remove',
                        }).catch(e=>{})
                    }else {
                        callback(errorCodeCallback(1094));
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
                },
                code=> {
                    callback(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                },
            )
    }

    // 获取发起添加卡的秘钥
    getStepOneKey(mac_id, manage_id){
        return new Promise((resolve, reject) => {
            addFingerprintStepOne({mac_id, manage_id}).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(1070);
            })
        })
    }
    // 获取删除指纹
    getRemoveKey(fingerprint_id){
        return new Promise((resolve, reject) => {
            removeFingerprint({fingerprint_id}).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(1070)
            })
        })
    }

    async cancel(){
        await this.finalize();
        if(addSubscribition){
            addSubscribition.unsubscribe();
            addSubscribition = null;
        }
        if(removeSubscribition){
            removeSubscribition.unsubscribe();
            removeSubscribition = null;
        }
        if(syncSubscribition){
            syncSubscribition.unsubscribe();
            syncSubscribition = null;
        }
    }
}
