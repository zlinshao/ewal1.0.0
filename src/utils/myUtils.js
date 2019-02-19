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
}

export default myUtils
