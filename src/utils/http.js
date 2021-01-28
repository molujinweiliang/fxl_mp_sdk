import {
    baseUrl,
    IV,
    userInfoStorageKey,
    accessKeyStorageKey,
    accessSecretStorageKey
} from './urlStore';
import store from './store.js';
import CBC from './cbc.js';
import tools from './sign';

export const http = (url, data= {}, method = 'Get', hasToast = true) => {
    method = method.toUpperCase();
    if(store.get(userInfoStorageKey)){
        data.uid = store.get(userInfoStorageKey).uid;
    }
    if(!store.get(accessKeyStorageKey)){
        console.warn('缺少accessKey，请先初始化SDK');
        return
    }
    if(!store.get(accessSecretStorageKey)){
        console.warn('缺少accessSecret，请先初始化SDK');
        return
    }
    data.accessKey = store.get(accessKeyStorageKey);
    data.timeStamp = parseInt(new Date().getTime()/1000);
    data.key = store.get(accessSecretStorageKey);
    data.sign = tools.sign(store.get(accessSecretStorageKey), data);
    let header = {};
    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
        header["Content-Type"] = "application/x-www-form-urlencoded";
    }

    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data,
            method,
            header,
            success(result) {
                const res = result.data ? JSON.parse(CBC.decryptDes(result.data, store.get(accessSecretStorageKey), IV)) : '';
                if (res && res.errno === 0) {
                    resolve(res.data);
                } else {
                    if (hasToast) {
                        wx.showToast({
                            title: res.errmsg || "网络连接失败",
                            icon: "none",
                        })
                    }
                    reject(res);
                }
            },
            fail(err) {
                if (hasToast) {
                    wx.showToast({
                        title: '网络连接失败',
                        icon: "none",
                    })
                }
                reject(err);
            }
        });
    })
};

// 请求一些需要附带图片参数的接口
export const ajaxWithImage = (url, filePath, data = {}, hasToast = true) => {
    const that = this;
    if(store.get(userInfoStorageKey)){
        data.uid = store.get(userInfoStorageKey).uid;
    }
    if(!store.get(accessKeyStorageKey)){
        console.warn('缺少accessKey，请先初始化SDK');
        return
    }
    if(!store.get(accessSecretStorageKey)){
        console.warn('缺少accessSecret，请先初始化SDK');
        return
    }
    data.accessKey = store.get(accessKeyStorageKey);
    data.timeStamp = parseInt(new Date().getTime()/1000);
    data.key = store.get(accessSecretStorageKey);
    data.sign = tools.sign(store.get(accessSecretStorageKey), data);
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: baseUrl + url,
            filePath: filePath,
            name: 'image',
            formData: data,
            success: (uploadFileRes) => {
                let data = JSON.parse(CBC.decryptDes(uploadFileRes.data, store.get(accessSecretStorageKey), IV));
                if (data.errno === 0) {
                    resolve(data.data);
                } else {
                    if (hasToast) {
                        wx.showToast({
                            title: data.errmsg,
                            icon: "none",
                        })
                    }
                    reject(data);
                }
            },
            fail: (err) => {
                if (hasToast) {
                    wx.showToast({
                        title: '网络连接失败',
                        icon: "none",
                    })
                }
                reject(err);
            }
        });


    })
}
