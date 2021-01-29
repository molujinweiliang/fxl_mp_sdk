# 初始化


## 实例化添加锁类
AddLock 实例，可通过 new AddLock() 获取。
```
import { AddLock } from './miniprogram_npm/fxl-mp-sdk/main'
const addLock = new AddLock();
或
const SDK = require('./miniprogram_npm/fxl-mp-sdk/main')
const addLock = new SDK.AddLock();
```

### 方法：

## addLock.start()
开始搜索设备

类型： PROMISE
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|timeout |否  |Number | 搜索的最大持续时间，基于性能考虑，搜索是有时间限制的，超过这个时间限制就会停止搜索，不传默认120000ms  |
##### 示例：
```
   addLock.start(150000).then(res=>{
      console.log(res);
   }).catch(err=>{})
```
## addLock.onDeviceFound()
监听搜索到的设备，一有设备被搜索到，就会触发一次回调。
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|callback |是  |Function |   |

##### 返回说明

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|deviceLists |是  |Array | 返回的是搜索到的设备列表  |

#### deviceLists
|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|lockType |是  |String | 设备类型  |
|deviceIdToService |是  |String | 统一转换过后的mac地址，不再区分安卓和ios  |
|lockingStatus |是  |String | 设备状态  |
|version |是  |String | 版本号  |
|bigLockType |是  |String | 设备大类型,默认为门锁  |

##### 示例：
```
   onLoad(){
        addLock.onDeviceFound((res)=>{
            // resolve返回的就是完整的设备列表
           this.setData({
               deviceLists: res,
           })
        })
   }
```


## addLock.addLock()
添加设备
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|device |是  |Object | 这里的就是device就是上面onDeviceFound获得的设备列表中的一项  |

##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |

##### 示例：
```
   add(index){
        addLock.addLock(this.data.deviceLists[index])
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{})
   }
```

## addLock.destroy()
销毁
##### 示例：
```
   onUnload(index){
        addLock.destroy();
        addLock.offDeviceFound()
   }
```

## addLock.offDeviceFound()
取消监听搜索到设备


