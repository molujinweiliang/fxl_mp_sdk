import { AbstractBlueTooth, errorMsg } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { getAesKey, addLockCallBack, errorLog } from "@/static/js/modules/bluetooth";
var _timerout = null;
import regeneratorRuntime from '../utils/runtime.js';

export default class AddLock extends AbstractBlueTooth{
    constructor(){
        super()
    }

    start(timeout=120000){
        const that = this;
        return new Promise((resolve, reject) => {
            this.open().then(res=> this.searchNoLimit())
                .then(res=>{
                    resolve(errorCodeCallback(0));
                }).catch(code=> {
                    reject(errorCodeCallback(code));
                });
            _timerout = setTimeout(()=>{
                console.warn('停留时间过长，基于性能考虑，停止搜索');
                this.stopSearch();
            }, timeout);
            // 120000
        })
    }
    onDeviceFound(callback){
        this.EventBus.addEventListener('searchDeviceSuccess', (data)=>{
            typeof callback == "function" && callback(this.foundDevice);
        });
    }
    offDeviceFound(){
        if(this.EventBus.handlers.hasOwnProperty('searchDeviceSuccess')){
            this.EventBus.dispatchEvent('searchDeviceSuccess');
        }
    }


    destroy(){
        return new Promise(async (resolve) => {
            this.stopSearch();
            await this.close().catch(err=>{});
            this.destroyDeviceFound();
            if(_timerout){
                clearTimeout(_timerout);
                _timerout = null;
            }
            resolve()
        })
    }

    addLock(device){
        const that = this;
        if(_timerout){
            clearTimeout(_timerout);
            _timerout = null;
        }
        this.stopSearch();
        let keyData = null;
        return new Promise((resolve, reject) => {
            this.getKey(device)
                .then(res=> {
                    keyData = res;
                    return this.connect(device);
                })
                .then(res=> this.sendData('01', keyData))
                .then(res=>{
                    if(res.id =="01" && res['02']=="00"){
                        // 添加成功之后
                        return this.addLockCallBackByTimes(device, res);
                    }else {
                        reject(errorCodeCallback(1094));
                        errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
                    }
                }).then(res=>{
                    resolve(errorCodeCallback(0));
                })
                .catch(async code=> {
                    console.log(code);
                    reject(errorCodeCallback(code));
                    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
                }).finally(async()=>{
                    that.start();
                    if(that.status>40){
                        await that.closeConnect();
                    }
                })
        })
    }

    getKey(device){
        return new Promise((resolve, reject) => {
            let dataArr = [
                {
                    k:"04",
                    v:(parseInt(new Date().getTime()/1000)).toString(16),
                    l: 6,
                },
            ];
            if(device.version=='00'){
                dataArr.push({
                    k:"09",
                    v: "00000000000000000000000000000000",
                    l: 18,
                });
                resolve(dataArr);
            }else{
                // 示例数据
                // [{k:"0C",v: lockData.key,l: 18,},{k:"0D",v: lockData.open_id,l: 18,},]
                let _data = {
                    mac_id: device.deviceIdToService,
                    lockType: device.lockType,
                    bluetooth: device.name,
                    quantity: device.electricity/100,
                    version: device.version,
                    bigLockType: device.bigLockType,
                }
                getAesKey(_data).then(res=>{
                    dataArr.push(...res);
                    resolve(dataArr);
                }).catch(err=>{
                    reject(1070);
                })
            }
        })
    }

    addLockCallBackByTimes(device, result){
        const that = this;
        return new Promise(async (resolve, reject) => {
            var callbackResult;
            for(let i=0; i<3; i++){
                callbackResult = await this.addLockCallback(device, result);
                if(callbackResult) {
                    break;
                }
            }
            if(callbackResult){
                resolve();
            }else {
                reject(1100);
            }
        })
    }

    addLockCallback(device, result){
        let data = {
            mac_id: device.deviceIdToService,
            bind_type: 1,
            version: device.version,
            lockType: result['0B'] || device.lockType,
            bluetooth: device.name,
            quantity: device.electricity/100,
            open_id: result['06'],
            key: result['09'],
        };
        return new Promise((resolve, reject) => {
            addLockCallBack(data)
                .then(res=>{
                    resolve(true);
                })
                .catch(err=>{
                    resolve(false);
                })
        })
    }
}
