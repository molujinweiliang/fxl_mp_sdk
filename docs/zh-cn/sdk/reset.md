## 实例化恢复出厂设置类
ResetLock 实例，可通过 new ResetLock() 获取。
```
import { ResetLock } from './miniprogram_npm/zm_mp-sdk/main'
const resetLock = new ResetLock();
或
const SDK = require('./miniprogram_npm/zm_mp-sdk/main')
const resetLock = new SDK.ResetLock();
```

### 方法：

## resetLock.reset()
恢复出厂设置

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
   resetLock.reset(mac_id).then(res=>{
      console.log(res);
      if(res.errno==0){
      
      }esle{
          
      }
   }).catch(err=>{})
```
