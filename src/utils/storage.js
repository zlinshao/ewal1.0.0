let storage = {
  set(key, value,expires = 1296000) {//expires为秒,默认保存15天即1296000秒
    let entity = {
      time:Date.now(),
      value,
      expires:expires*1000
    };
    localStorage.setItem(key, JSON.stringify(entity));
  },
  get(key) {
    let val =localStorage.getItem(key);
    if(!val){
      return '';
    }
    val =JSON.parse(val);
    if(val.expires) {
      let s = Date.now();
      let t = val.time;
      let q = val.expires*1000;
      if(Date.now()-val.time>val.expires){
        localStorage.removeItem(key);
        return null;
      }
    }
    return val.value;
  },
  remove(key) {
    localStorage.removeItem(key);
  }

}

export default storage;
