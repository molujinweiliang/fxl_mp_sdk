# 公共参数说明

##### 公共参数
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|timeStamp |是  |timestamp |时间戳（不得超过服务器20分钟，超过签名结果无效）   |
|accessKey |是  |string | 商家的accessKey    |
|sign     |是  |string | 签名    |


签名算法：
//{"a":"1233", "c": "789", "b":"456" }
ksort($params); //按照键升序（{"a":"1233",  "b":"456", "c": "789" }）
$str = "";
foreach ($params as $k=> $v){
	$str .= $k."=".$v."&"; 
}
//"a=1233&b=456&c=789&"
$stringSignTemp = $str."key=".$key;//"a=1233&b=456&c=789&key=xasxasx",key是商家的accessSecret 
$stringSignTemp = urlencode($stringSignTemp);//字符串要url编码一下,防止有中文
$signValue = strtoupper(md5($stringSignTemp));//然后md5之后转大写

2:返回参数
$str = "7fea874f1675cf1b5eeb5ae758ac6cc6b618aa986c5d83117b576a84596a1e3594a25041e9868f424aae7964c348bd758c28dad8e5955c2319246a5a5cc0dda764792b09904e36d92093084de06dcbabdbdcddbb0571974be30ccc6e90e6f85dc6890c70847dfa7097d0708e5d94af2b6643f282bcd26ddd5210851579813fc8567255e3d20e2449e51330c307af98bace6030fd744eb280e54e08f79d801ff41f22a9c4d7c4d355cacad190b15187b2d94067121529e8a057efd65d1115df22ddd59292ca51718cbc712194d925456dba76094ab604ca02148fd73c1daf90e8dca611fca8152d7c559fd022402851e87a954e29be7e7332b17305e42cc7a724845b8e628e8c3459575c776930662ce72a985884b8b85ab2c8ff16e05eb189fbf5b219a51e0b3b09b4b142db747d1c4918fbd98e48a3d484188c88ea80d0b967a5c6ff09a070b039ada7b67528e8c8c00e3edd7c77b86d0d07b0d0a63055a2d3d6c0542bff7c5b6be54f10e879ba8947";

$iv= "Mv@L)ock";
$key = 商家的accessSecret

解密出来就是:
{
    "errno": 0,
    "errmsg": "",
    "statusCode": 200,
    "data": {
        "uid": 17,
        "mobile": "17682306667",
        "nickname": "周阳",
        "user_name": "",
        "sex": 0,
        "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er4ulmIJSvjhoNYr8ttmpNEub23SOicsicYgIomNG9lJlOdLibqq1GQdWJFooPTUrGZsGltSpHajysRA/132",
        "province": "Anhui",
        "city": "Luan",
        "is_auth": 1,
        "create_time": "2019-12-04 10:12:13"
    }
}
