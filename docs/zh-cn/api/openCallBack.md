# 开锁回调

    
##### 简要描述

- 开锁回调接口

##### 请求URL
- ` sdk/v1/mini/lock/openCallBack`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mac_id |是  |string |mac地址   |
|uid |是  |int | 用户的ID    |
|quantity |否  |number | 锁的电量    |
|historyId     |是  |int | 历史id    |

##### 返回示例 

``` 
  {
    "errno": 0,
    "errmsg": "",
    "statusCode": 200,
    "data": true
}
```

##### 返回参数说明 
