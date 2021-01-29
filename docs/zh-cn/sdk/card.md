## 实例化卡片类
Card 实例，可通过 new Card() 获取。
```
import { Card } from './miniprogram_npm/fxl-mp-sdk/main'
const card = new Card();
或
const SDK = require('./miniprogram_npm/fxl-mp-sdk/main')
const card = new SDK.Card();
```

### 方法：

## card.add()
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
   card.add({
        mac_id，
        manage_id，
   }, (res)=>{
        console.log(res);
   })
```

## card.cancel()
取消添加卡片

##### 示例：
```
   onHide(){
       card.cancel();
   },
   onUnload(){
       card.cancel();
   }
```

## card.remove()
移除卡片

类型：Promise
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|{mac_id, card_id} |是  |Object | mac地址，card_id: 卡片id  |
|callback |是  |Function | 回调函数  |
##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |
##### 示例：
```
   card.remove({
        mac_id，
        card_id，
   }, (res)=>{
        console.log(res);
   })
```

## card.sync()
同步卡片（适合与远程添加卡---暂未开放）

类型：Promise
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|{mac_id, card_id} |是  |Object | mac地址，card_id: 卡片id  |
|callback |是  |Function | 回调函数  |
##### 返回说明


|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |
##### 示例：
```
   card.remove({
        mac_id, 
        card_id
   }, (res)=>{
        console.log(res);
   })
```
