#放在header里面的参数：

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|CLIENT | 是  |string |写SDK1.1,调用接口终端设备   |
|ACCESS-KEY | 是  |string |惊奇锁平台分配的ACCESS-KEY   |
|PLATFORM | 是  |string |调用设备系统，IOS或者android,大小写无所谓   |
|DEVICE | 是  |string |手机型号，比如：iphone11，MIX3   |
|SYSTEMVERSION |否  |string |系统的版本号，比如：android10，IOS14.4   |
|TOKEN | 是  |string |签名校验的token   |

TOKEN算法：
第一步：
String access_key = ""; //惊奇锁平台分配的access_key;
String access_secret = "";//惊奇锁平台分配的access_secret;
String key = "c2e2a195b0a8add57542651f0130cc53"; //写死
String iv = "SDKV@1.1";//写死

第二步：
String str = access_key + "#" + access_secret + "@" + key + "&" + iv;

第三步骤：
str = md5(str);

第四步：
str = base64_encode(str) ;


#请求参数只有一个data：
data算法是：
第一步：将你的业务参数转成json
比如：
{
	"mobile": "xxxxx",
	"password": "ssdsdasda",
	"code": "324234"
}
#PS：手机号码是公共参数

第二步：
进行des加密：
加密方式是：DES-CBC
output 的类型是：hex
key就是上述token算法中的key
iv就是上述token算法中的iv

Des des = new Des(key, 'DES-CBC', Des::OUTPUT_HEX, iv);

String str = des.encrypt({
	"mobile": "xxxxx",
	"password": "ssdsdasda",
	"code": "324234"
});

返回的参数也是需要解密的，解密的key和iv都是上述所有的key和iv
