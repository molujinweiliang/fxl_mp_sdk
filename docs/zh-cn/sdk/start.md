# 开始

## 原生小程序接入

1.安装sdk以及依赖：
> ps: <medium>如果在你的小程序根目录下面没有package.json文件，请先执行npm init或者npm init -y，然后一路回车即可。</medium>

```
npm i crypto-js --save
npm i abstract-bluetooth --save
npm i zm_mp-sdk --save
```
2.小程序构建npm：
> ps: <medium>构建成功之后会在根目录生成miniprogram_npm文件夹，在具体的页面中根据对应的路径引入miniprogram_npm/zm_mp-sdk/main.js </medium>

3.项目中引入使用
> ps: <medium>在具体的页面中根据对应的路径引入miniprogram_npm/zm_mp-sdk/main.js </medium>

```
就初始化举例
import { Init } from './miniprogram_npm/zm_mp-sdk/main'
const init = new Init();
init.init(params);
或者
const SDK = require('./miniprogram_npm/zm_mp-sdk/main')
const init = new SDK.Init();
init.init(params);
```


## uniapp、mpvue、taro等小程序框架中接入
1.安装sdk以及依赖：

```
npm i zm_mp-sdk --save
```

2.项目中引入使用
```
// 依赖加载
import { Init } from 'zm_mp-sdk'
// 全局引入
import SDK from 'zm_mp-sdk'
```

> ps: <medium>在后面的方法实例中就以小程序引入为例，如果您是使用第三方框架开发，更改一下引入方式，请注意！！！</medium>

