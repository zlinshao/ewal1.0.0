class myUtils {
  constructor(data) {
    this.arr = data;
  }

  // 判断字符串是否为空
  static isNull(str) {
    return str === null || str.length === 0 || str === '';
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

  //时间格式化
    static  dateFormat(){
        var myDate = new Date();
        myDate.getYear();        // 获取当前年份(2位)
        myDate.getFullYear();    // 获取完整的年份(4位,1970-????)
        myDate.getMonth();       // 获取当前月份(0-11,0代表1月)
        myDate.getDate();        // 获取当前日(1-31)
        myDate.getDay();         // 获取当前星期X(0-6,0代表星期天)
        myDate.getTime();        // 获取当前时间(从1970.1.1开始的毫秒数)
        myDate.getHours();       // 获取当前小时数(0-23)
        myDate.getMinutes();     // 获取当前分钟数(0-59)
        myDate.getSeconds();     // 获取当前秒数(0-59)
        myDate.getMilliseconds();    // 获取当前毫秒数(0-999)
        myDate.toLocaleDateString();     // 获取当前日期
        var mytime=myDate.toLocaleTimeString();     // 获取当前时间
        myDate.toLocaleString( );        // 获取日期与时间

        Date.prototype.Format = function (fmt) { //
            var o = {
                "M+": this.getMonth() + 1, // 月份
                "d+": this.getDate(), // 日
                "h+": this.getHours(), // 小时
                "m+": this.getMinutes(), // 分
                "s+": this.getSeconds(), // 秒
                "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
                "S": this.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        return new Date().Format("yyyy-MM-dd hh:mm:ss");
    }
}


export default myUtils
