# 初始化


## 实例化开锁类
OpenLock 实例，可通过 new OpenLock() 获取。
```
import { OpenLock } from './miniprogram_npm/zm_mp-sdk/main'
const openLock = new OpenLock();
或
const SDK = require('./miniprogram_npm/zm_mp-sdk/main')
const openLock = new SDK.OpenLock();
```

## openLock.openLock()
打开设备（开锁）
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|mac_id |是  |String | 设备的mac_id  |
|manage_id |是  |String | 设备的manage_id   |
|filePath |否  |String | 人脸图片路径  |
|callback |是  |Function | 开锁回调  |

##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |

##### 示例：
```
   open(){
        openLock.openLock({
            mac_id，
            manage_id，
            filePath，
        }, (res)=>{
            if(res.errno==0){
                console.log('开锁成功');
            }esle{
                console.log('开锁失败');
            }
        })
   }
```

## openLock.destroy()
取消开锁流程（开锁整个流程较长，为了防止调用开锁方法时快速返回上一界面，后台仍在进行开锁流程时出现各种意想不到的bug）
##### 示例：
```
    onHide(){
        openLock.cancel();
    },
    onUnload(){
        openLock.cancel();
    }
```


