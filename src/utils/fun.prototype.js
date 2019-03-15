export default {
  install(Vue, options) {
    // 路由跳转
    Vue.prototype.routerLink = function (url, data) {
      if (data) {
        this.$router.push({path: url, query: data});
      } else {
        this.$router.push(url);
      }
    };
    Vue.prototype.mainListHeight = function (num = 0) {
      return window.innerHeight - 170 - num;
    };
    Vue.prototype.showLoading = function (status = true) {
      return this.$store.dispatch('switch_loading', status);
    };
    // 克隆数据/JSON数据转换
    Vue.prototype.jsonData = function (val, way = 'clone') {
      let data;
      switch (way) {
        case 'clone':
          data = JSON.parse(JSON.stringify(val));
          break;
        case 'string':
          data = JSON.stringify(val);
          break;
        case 'parse':
          data = JSON.parse(val);
          break;
        default:
          this.$LjMessage('warning', {
            title: '警告',
            msg: '请传入转换类型！'
          });
          break;
      }
      return data;
    };
    // 搜索项处理
    Vue.prototype.handleSearch = function (data) {
      let fruit = {};
      for (let item of data.data) {
        fruit[item.keyName] = item.dataType;
      }
      fruit.page = data.page ? data.page : 1;
      fruit.limit = data.limit ? data.limit : 30;
      return fruit;
    };
    //操作提示
    Vue.prototype.$LjNotify = function (type = 'info', status = {}, during = 3000) {
      this.$store.dispatch('open_notify', {
        type,
        ...status
      });
      this.$store.dispatch('auto_close_notify', during);
    };

    //消息提示
    Vue.prototype.$LjMessage = function (type = 'info', status = {}, during = 2000) {
      this.$store.dispatch('open_message', {
        type,
        ...status
      });
      this.$store.dispatch('auto_close_message', during);
    }
  }
}
