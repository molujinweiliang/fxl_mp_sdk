# 初始化

    
##### 简要描述

- 初始化接口

##### 请求URL
- ` sdk/v1/mini/init `
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mobile |是  |string |用户的手机号码   |
|nickname |否  |string | 昵称    |
|sex     |否  |string | 性别：1:男；2:女    |
|avatar     |否  |string | 头像    |
|province     |否  |string | 性别    |
|city     |否  |string | 城市   |

##### 返回示例 

``` 
  {
    "errno": 0,
    "errmsg": "",
    "statusCode": 200,
    "data": {
        "uid": 17, //用户的ID
        "mobile": "17682306667",//手机号码
        "nickname": "周阳",//昵称
        "user_name": "",//真实姓名
        "sex": 0,//性别
        "avatar"://头像 "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er4ulmIJSvjhoNYr8ttmpNEub23SOicsicYgIomNG9lJlOdLibqq1GQdWJFooPTUrGZsGltSpHajysRA/132",
        "province": "Anhui",//省份
        "city": "Luan",//城市
        "is_auth": 1,//是否认证；1:认证了；2:没有认证
        "create_time": "2019-12-04 10:12:13"//创建时间
    }
}
```
