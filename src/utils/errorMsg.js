const errrorMsg = {
	10000: "未初始化蓝牙适配器",
	10001: "当前蓝牙适配器不可用",
	10002: "没有找到指定设备",
	10003: "连接失败",
	10004: "没有找到指定服务",
	10005: "没有找到指定特征值",
	10006: "当前连接已断开",
	10007: "当前特征值不支持此操作",
	10008: "其余所有系统上报的异常",
	10009: "Android 系统特有，系统版本低于 4.3 不支持 BLE",
	10012: "连接超时",
	10013: "连接 deviceId 为空或者是格式不正确",
	21000: "请前往应用管理-权限控制打开地理位置权限",
}
const errorCode = {
	'-1': '未知错误',
	0: '成功',
	1000: '未初始化蓝牙适配器',
	1010: '当前应用未获得蓝牙权限或者未打开蓝牙',
	1020: '未传设备的MAC地址',
	1030: '请前往应用管理-权限控制打开地理位置权限',
	1040: '搜索设备失败',
	1050: '未搜索到对应设备',
	1051: '当前设备无管理员',
	1060: '请求设备信息失败',
	1070: '获取秘钥失败',
	1071: '照片未通过对比',
	1072: '未完成实名认证',
	1073: '未到可以开锁时间',
	1074: '已过有效期',
	1080: '连接设备失败',
	1081: '启用notifyBLECharacteristicValueChange失败',
	1082: '连接设备出现10003或者10012错误,并且重连3次后失败',
	1090: '向蓝牙数据失败',
	1091: '发送数据失败： 数据格式不正确',
	1092: '发送数据失败： 获取特征值失败',
	1093: '蓝牙反馈超时或未反馈',
	1094: '蓝牙反馈数据为操作失败',
	1095: '设备读卡失败',
	1096: '操作超时',//添加卡和添加指纹的时候，超出时间
	1097: '此卡片已被添加',
	1100: '添加锁回调时出现错误',

	9999: '程序进入后台或者用户主动取消'
}


const errorCodeCallback = (code = '-1') => {
	if(!errorCode.hasOwnProperty(code)){
		code = '-1';
	}
	return {
		errno: code,
		errMsg: errorCode[code]
	};
}
const errorLogFunction = (err) => {
	if(errorCode.hasOwnProperty(err)){
		return `错误： ${JSON.stringify(errorCodeCallback(err))}`;
	}else {
		return `${err}`;
	}
}


// 免费版
// lock_type :0预留，1:蓝牙；2:蓝牙加密码；3:蓝牙+密码+指纹；4:蓝牙+密码+刷卡；5:蓝牙+密码+刷卡+指纹
// 收费版
// lock_type :128预留，129:蓝牙；130:蓝牙加密码；131:蓝牙+密码+指纹；132:蓝牙+密码+刷卡；133:蓝牙+密码+刷卡+指纹

// lock_type大于128的时候需要支付


// bigLockType: 锁的大类型；0： 预留；1: 门锁；2: 门禁；3: 6位密码锁

export {
	errrorMsg,
	errorCode,
	errorCodeCallback,
	errorLogFunction
};



/*// 消息id：
// 添加锁： 01,
// 开锁：02，
// 恢复出厂设置：03，
// 设置管理员密码: 04,
// 同步时间: 05,
// 添加卡：
		第一次，向设备表明需要添加设备 06,
		第二次，正式添加卡 07,
	添加指纹：

 */
