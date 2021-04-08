## 实例化设置管理员密码类
ResetLock 实例，可通过 new ResetLock() 获取。
```
import { SetPassword } from './miniprogram_npm/zm_mp-sdk/main'
const setPassword = new SetPassword();
或
const SDK = require('./miniprogram_npm/zm_mp-sdk/main')
const setPassword = new SDK.SetPassword();
```

### 方法：

## setPassword.setPassword()
设置管理员密码

类型： PROMISE
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|mac_id |是  |String | 设备mac_id  |
|password |是  |String | 密码  |
##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |
##### 示例：
```
   let mac_id = 'FE:51:6F:BB:A3:48', password = '12345678'
   setPassword.setPassword(mac_id, password).then(res=>{
        console.log(res);
        if(res.errno==0){
            
        }esle{
            
        }
   }).catch(err=>{})
```
