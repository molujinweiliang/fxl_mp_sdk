# 获取锁的详情

    
##### 简要描述

- 获取锁的详情接口

##### 请求URL
- ` sdk/v1/mini/lock/getInfo`
  
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mac_id |是  |string |mac地址   |
|uid |是  |int | 用户的ID    |

##### 返回示例 

``` 
  {
    "lock_id": 1697, //锁的id
    "mac_id": "E7:F1:16:EB:65:5E",//锁的mac地址
    "bluetooth": "MVL655E",//蓝牙名字
    "quantity": "1.00",//电量
    "version": "01",//版本号
    "lock_type": "02",//锁的类型
    "notice": "大家下班后记得关门再回家",//公告
    "manage_id": 2548,//数据库这条记录的自增id
    "start_time": 0,//开始时间。0：没有开始时间
    "end_time": 0,//结束时间。0没有结束时间
    "is_face": 1,//是否需要人脸开锁，0：不需要；1：需要
    "note": "享宿会议室大门",//备注名字
    "img": "https://imglock.autochat.cc/video/a9a863e80f7da128471c984c8c1131448502.jpg",//锁的图片
    "is_admin": 0,//是否是管理员；0：不是；1：是管理员
    "create_time": "2020-09-08 18:09:51"//创建时间
}
```

##### 返回参数说明 
