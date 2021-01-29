## 初始化


## 实例化初始化类
init 实例，可通过 new Init() 获取。
```
import { Init } from './miniprogram_npm/fxl-mp-sdk/main'
const init = new Init();

const SDK = require('./miniprogram_npm/fxl-mp-sdk/main')
const init = new SDK.Init();
```

### 方法：

## init.verifyLogin()
校验是否登录 
```
// Eg:
const res = init.verifyLogin();
```


##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码。0：已登录，-1：未登录  |
|errmsg | 提示信息。 0：已登录，-1：未登录 |

## init.init()
初始化（登录）

##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|accessKey |是  |string |商户accessKey   |
|accessSecret |是  |string | 商户accessSecret    |
|userInfo     |否  |object | { mobile: '', nickname: '', sex: '', avatar: '', province: '', city: '', }    |

