import { AbstractBlueTooth, errorMsg } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { addCardStepOne, addCardStepTwo, removeCard, cardSyncData, cardCallback, errorLog } from "@/static/js/modules/bluetooth";
const Rx = require('../rxjs.umd.min.js');
const { of, from } = Rx;
const { concatMap, mergeMap, finalize, } = Rx.operators;
var addSubscribition = null, removeSubscribition = null, syncSubscribition = null;
const timeout = 32000;//添加卡超时时间

export default class Card extends AbstractBlueTooth{
    constructor() {
        super();
    }

    add({mac_id, manage_id}, callback){
        const that = this;
        let card_id = null, start_time = new Date().getTime();
        var timer = setTimeout(()=>{
            callback(1096);
            that.cancel();
        }, timeout);
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
                    let _use_time = new Date().getTime() - start_time;
                    return from(that.sendData('06', res, timeout - _use_time - 1));
                })
            )
            .pipe(
                concatMap(notifyData=>{
                    return from(that.getStepTwoKey(notifyData, mac_id, manage_id));
                })
            )
            .pipe(
                concatMap(res=>{
                    card_id = res.card_id;
                    let _use_time2 = new Date().getTime() - start_time;
                    return from(that.sendData('07', res.sendLockData, timeout - _use_time2 - 1));
                })
            )
            .pipe(
                finalize(async (res) => {
                    clearTimeout(timer);
                    await that.finalize();
                })
            )
            .subscribe(
                res=> {
                    if (res.id == "07" && res['02'] == "00") {
                        callback(errorCodeCallback(0));
                        // 添加卡成功的回调
                        cardCallback({
                            card_id,
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
    remove({mac_id, card_id}, callback){
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
                    return from(that.getRemoveKey(card_id));
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
                    return from(that.sendData('08', keyData));
                })
            )
            .pipe(
                finalize(async (res) => {
                    await that.finalize();
                })
            )
            .subscribe(
                res=> {
                    if (res.id == "08" && (res['02'] == "00" || res['02'] == "06")) {
                        callback(errorCodeCallback(0));
                        // 添加卡成功的回调
                        cardCallback({
                            card_id,
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

    sync({mac_id, card_id}, callback){
        const that = this;
        let currentDevice = null, keyData = null;
        syncSubscribition = of(1)
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
                    return from(that.getSyncCardKey(card_id));
                })
            )
            .pipe(
                concatMap(res=>{
                    keyData = res;
                    return from(that.connect(currentDevice));
                })
            )
            .pipe(
                concatMap(res=>{
                    return from(that.sendData('09', keyData));
                })
            )
            .pipe(
                finalize(async (res) => {
                    await that.finalize();
                })
            )
            .subscribe(
                res=> {
                    if (res.id == "09" && res['02'] == "00") {
                        callback(errorCodeCallback(0));
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
            addCardStepOne({mac_id, manage_id}).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(1070);
            })
        })
    }
    // 获取添加卡的秘钥
    getStepTwoKey(notifyData, mac_id, manage_id){
        return new Promise((resolve, reject) => {
            if(notifyData.id=="06"){
                // 设备读取卡号失败
                if(!notifyData['10'] && !notifyData['11'])  return reject(1095);

                let data = {
                    mac_id,
                    manage_id,
                };
                if(notifyData.hasOwnProperty('10')){
                    data.type = 1;
                    data.card_num = notifyData['10'];
                }else if(notifyData.hasOwnProperty('11')){
                    data.type = 2;
                    data.card_num = notifyData['11'];
                }
                addCardStepTwo(data).then(res=>{
                    resolve(res);
                }).catch(err=>{
                    let code = 1070;
                    if(err.errno == 200042){
                        code = 1097
                    }
                    reject(code);
                })
            }else {
                reject(1094);
            }

        })
    }

    getRemoveKey(card_id){
        return new Promise((resolve, reject) => {
            removeCard({card_id}).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(1070)
            })
        })
    }

    getSyncCardKey(card_id){
        return new Promise((resolve, reject) => {
            cardSyncData({card_id}).then(res=>{
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
