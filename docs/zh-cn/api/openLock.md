# 开锁

    
##### 简要描述

- 开锁接口

##### 请求URL
- ` sdk/v1/mini/lock/open `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mac_id |是  |string |锁的mac地址   |
|uid |是  |string | 初始化用户的ID    |
|image     |是  |file | 人脸图片    |

##### 返回示例 

``` 
  {
    "errno": 0,
    "errmsg": "",
    "statusCode": 200,
    "data": {
        "sendLockData": [
            {
                "k": "06",
                "v": "743537ACD3F118EF08F88FC1174CCB64",
                "l": 18
            }
        ],
        "note": "MVL4D80", //备注
        "historyId": "16281"//开锁记录的ID，回调会用到
    }
}
```
