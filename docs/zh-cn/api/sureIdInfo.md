# 确定上传身份证识别结果
    
**简要描述：** 

- 确定上传身份证识别结果接口

**请求URL：** 
- ` sdk/v1/mini/user/sure/idInfo`
  
**请求方式：**
- POST 

**参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|uid |是  |int |用户的ID   |
|name |是  |string |姓名   |
|sex |是  |string | 性别，传男，或者女    |
|nation     |否  |string | 民族    |
|birthday |是  |string |生日   |
|address |否  |string | 住址    |
|idNo     |是  |string | 身份证号码    |
|idCardImg     |是  |string | 身份证图片地址，我返回给你    |


 **返回示例**

``` 
  {
    "errno": 0,
	"errMessage": "",
	"data": "上传成功"
  }
```
