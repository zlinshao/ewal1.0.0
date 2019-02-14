class myUtils {
  constructor(data) {
    this.arr = data;
  }

  // 判断字符串是否为空
  static isNull(str) {
    return str === null || str.length === 0 || str === '';
  }

  // 判断是否为Number类型
  static isNum(num) {
    if (num === '') return false;
    return !Number.isNaN(Number(num));
  }
}

export default myUtils
