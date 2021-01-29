## 实例化校准时间类
CheckTime 实例，可通过 new CheckTime() 获取。
```
import { CheckTime } from './miniprogram_npm/fxl-mp-sdk/main'
const checkTime = new CheckTime();
或
const SDK = require('./miniprogram_npm/fxl-mp-sdk/main')
const checkTime = new SDK.CheckTime();
```

### 方法：

## checkTime.checkTime()
校准时间

类型： PROMISE
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|mac_id |是  |String | 设备mac_id  |
##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |
##### 示例：
```
   let mac_id = 'FE:51:6F:BB:A3:48'
   checkTime.checkTime(mac_id).then(res=>{
        console.log(res);
        if(res.errno==0){
            
        }esle{
            
        }
   }).catch(err=>{})
```
