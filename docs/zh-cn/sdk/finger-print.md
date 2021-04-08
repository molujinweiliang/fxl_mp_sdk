## 实例化指纹类
FingerPrint 实例，可通过 new FingerPrint 获取。
```
import { FingerPrint } from './miniprogram_npm/zm_mp-sdk/main'
const fingerPrint = new FingerPrint();
或
const SDK = require('./miniprogram_npm/zm_mp-sdk/main')
const fingerPrint = new SDK.FingerPrint();
```

### 方法：

## fingerPrint.add()
添加卡片

##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|{mac_id, manage_id} |是  |Object | mac地址，manage_id  |
|callback |是  |Function | 回调函数  |
##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |
##### 示例：
```
   fingerPrint.add({
        mac_id，
        manage_id，
   }, (res)=>{
        console.log(res);
   })
```

## fingerPrint.cancel()
取消添加卡片

##### 示例：
```
   onHide(){
       fingerPrint.cancel();
   },
   onUnload(){
       fingerPrint.cancel();
   }
```

## fingerPrint.remove()
移除卡片

类型：Promise
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|{mac_id, fingerprint_id} |是  |Object | mac地址，card_id: 卡片id  |
|callback |是  |Function | 回调函数  |
##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |
##### 示例：
```
    fingerPrint.remove({
       mac_id, 
       fingerprint_id
    }, res=>{
    
    })
```
