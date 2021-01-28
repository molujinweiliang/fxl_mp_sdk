import { AbstractBlueTooth, errorMsg, tools } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
import { openLogPage, syncOpenLog, errorLog } from "@/static/js/modules/bluetooth";
var _timerout = null;

export default class OpenHistory extends AbstractBlueTooth{
    constructor(){
        super()
    }

	uploadHistory(mac_id){
		const that = this;
		let _index = 50;//为了防止和其他id冲突，造成无法区分，故设置了一个起始值；
		let currentDevice = null;
		return new Promise((resolve, reject) => {
			that.open()
			    .then(res=> that.search(mac_id))
				.then(res=>{
					currentDevice = res;
					that.status = 30;
					return that.connect(currentDevice);
				})
				.then(res=> that.getKey(mac_id))
				.then(res=> that.sendData(`${tools.toString16(_index)}`, res.sendLockData, 5000))
				.then(async res=>{
					console.log('设备返回数据1', res);
					if(res.id==`${tools.toString16(_index)}`){
						return that.loopSend(_index, mac_id, res['1a'] || res['1A']);
					}else{
						return reject(errorCodeCallback(1094));
					}
				})
				.then(async res=> {
					resolve(errorCodeCallback(0));
				})
				.catch(code=> {
				    reject(errorCodeCallback(code));
				    errorLog({ content: errorLogFunction(code) }).catch(e=>{});
				})
		})
	}

	async loopSend(index, mac_id, syncData){
		let _syncData = syncData, isContinue = 1, promiseResult = true, code = 0;
		for(let i=1; i>0; i++){
			// console.log(index + i);
			let uploadResult = await this.sendRecord(mac_id, _syncData);
			// console.log("服务器返回结果",  uploadResult);
			if(!uploadResult) {
				promiseResult = false;
				code = 1070;
				break;
			}
			isContinue = uploadResult.isContinue;
			if(isContinue==1){
				// console.log('当前isContinue为1，继续发送数据');
				const sendResult = await this.sendData(tools.toString16(index+i), uploadResult.sendLockData, 5000);
				// console.log('硬件返回数据为', sendResult)
				if(sendResult && (sendResult.id == tools.toString16(index+i))){
					_syncData = sendResult['1a'] || sendResult['1A'];
				}else{
					promiseResult = false;
					code = 1094;
					break;
				}
			}else{
				promiseResult = true;
				code = 0;
				break;
			}
		}
		if(promiseResult){
			return Promise.resolve(0);
		}else{
			return Promise.reject(code);
		}
	}
	// 获取页码
    getKey(mac_id){
        return new Promise((resolve, reject) => {
            let data = {
				mac_id,
			}
			openLogPage(data).then(res=>{
				// console.log('获取页码的数据', res);
				resolve(res);
			}).catch(err=>{
				reject(1070);
			})
        })
    }
	// 上传开锁记录api
	sendRecord(mac_id, syncData){
		// console.log("上传开锁记录的数据为;", mac_id, syncData);
		return new Promise((resolve, reject) => {
			let data = {
				mac_id,
				syncData: syncData
			}
			syncOpenLog(data).then(res=>{
				resolve(res);
			}).catch(err=>{
				reject(1070);
			})
		})
	}
}
