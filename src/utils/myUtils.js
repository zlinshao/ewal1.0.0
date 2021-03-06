import {Notification} from 'element-ui';

class myUtils {
  constructor(data) {
    this.arr = data;
  }

  // 判断字符串是否为空
  static isNull(str) {
    return str === null || str.length === 0 || str === '';
  }

  static open4(msg) {
    Notification.error({
      title: '错误',
      message: msg,
    });
  }

  // 清空图片
  static emptyPic(val) {
    for (let item of val) {
      item.setFile = [];
    }
  }

  // 判断是否为Number类型
  static isNum(num) {
    if (num === '') return false;
    return !Number.isNaN(Number(num));
  }

  // 去重
  static arrayWeight(array) {
    let temp = [];
    let index = [];
    let l = array.length;
    for (let i = 0; i < l; i++) {
      for (let j = i + 1; j < l; j++) {
        if (array[i] === array[j]) {
          i++;
          j = i;
        }
      }
      temp.push(array[i]);
      index.push(i);
    }
    return temp;
  }

  //格式化日期
  static formatDate(v, format = 'yyyy-MM-dd') {//用法:format="yyyy-MM-dd hh:mm:ss";
    if (!v) return null;
    let d = v;
    if (typeof v === 'string') {
      if (v.indexOf("/Date(") > -1)
        d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
      else
        d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    let o = {
      "M+": d.getMonth() + 1,  //month
      "d+": d.getDate(),       //day
      "h+": d.getHours(),      //hour
      "m+": d.getMinutes(),    //minute
      "s+": d.getSeconds(),    //second
      "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
      "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }


  //判断时间是否在给定的日期范围内
  //第三个参数传选定的日期 不传默认当前时间
  static judgeDateInRange(startTime, endTime, inTime = new Date()) {
    let time = new Date(inTime).getTime();
    let sTime = new Date(startTime.replace(/-/g, '/')).getTime();
    let eTime = new Date(endTime.replace(/-/g, '/')).getTime();
    return sTime < time && eTime > time;
  }

  // 阿拉伯数字 转换 中文数字
  static DX(num) {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = (temp) => {
      let strArr = temp.toString().split("").reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
      }
      return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  }

  //获取地址栏参数
  static getUrlParams(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  }

  /**判断是否为空对象 */
  static isNullObject(obj) {
    let keyArr = Object.keys(obj)
    if (keyArr.length === 0) {
      return true
    }
    return false
  }
}


export default myUtils
