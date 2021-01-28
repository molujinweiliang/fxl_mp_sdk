# 身份证识别

    
##### 简要描述

- 身份证识别接口

##### 请求URL
- ` sdk/v1/mini/ocr/idCard`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|uid |是  |string |用户的uid   |
|imgUrl |是  |string | 身份证的url    |

##### 返回示例 

``` 
 {
    "errno": 0,
    "errmsg": "",
    "statusCode": 200,
    "data": {
        "name": "周阳",
        "nation": "汉",
        "birthday": "1991-04-04",
        "address": "安徽省金寨县斑竹园镇漆店村黄尖组",
        "idNo": "342426199104043213",
        "sex": "男",
        "idCardImg": "https://imglock.autochat.cc/video/8951dfcf39bd8d0792120b2fe9bff9087195.jpg"
    }
}
```
