# 人脸认证

    
##### 简要描述

- 人脸认证接口

##### 请求URL
- ` sdk/v1/mini/faceAuth`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|uid |是  |int |用户的ID   |
|imgUrl |是  |string | 人脸的图片    |

##### 返回示例 

``` 
{
    "errno": 0,
    "errmsg": "",
    "statusCode": 200,
    "data": "认证成功"
}
```
