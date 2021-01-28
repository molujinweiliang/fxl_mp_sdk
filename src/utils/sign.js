var MD5Encode = require("./MD5Encode.js");

const formatTime = date => {
  var date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function timestamp() {
  return new Date().getTime()
}

function sign(accessSecret, data) {
  var newdata = objKeySort(data) + "key=" + accessSecret;
  var sign = md5(encodeURIComponent(newdata)).toUpperCase();
  return sign
}

function objKeySort(obj) {//排序的函数
  var newkey = Object.keys(obj).sort();
  var str = '';
  str += '&' ;
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组

  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    if(newkey[i]!=='sign' && newkey[i]!=='key'){
      str += `${newkey[i]}=${obj[newkey[i]]}&`;
    }
  }
  return str.substring(1);//返回排好序的新对象
}

function doMD5Encode(toEncode) {
  return MD5Encode.hexMD5(toEncode);
}

function md5(str) {
  return doMD5Encode(str);
}

function changeTimeStamp(date){
  var now_time = new Date().getTime()/1000,
    target_time = date ? dateFromString(date).getTime() / 1000 : now_time,
    show_date = '',
    timestamp = target_time - now_time;
  if(timestamp<=0){
    show_date = '00天 00:00:00';
  }else{
    var d,h,m,s;
    d = parseInt(timestamp / (24 * 60 * 60));
    h = parseInt((timestamp - d * 24 * 60 * 60) / (60 * 60));
    m = parseInt((timestamp - d * 24 * 60 * 60 - h * 60 * 60) / (60));
    s = parseInt(timestamp - d * 24 * 60 * 60 - h * 60 * 60  - m*60);
    d = d < 10 ? `0${d}` : d;
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    show_date = `${d}天 ${h}:${m}:${s}`;
  }
  return show_date;
}

function dateFromString(time) {
  time = time.replace(/-/g, ':').replace(' ', ':')
  time = time.split(':')
  var time1 = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5])
  return time1
}

const tools = {
  formatTime: formatTime,
  timestamp: timestamp,
  sign: sign,
  changeTimeStamp,
}

export default tools;

module.exports = {
  formatTime: formatTime,
  timestamp: timestamp,
  sign: sign,
  changeTimeStamp,
}
