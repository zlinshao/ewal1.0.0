export default {
  install(Vue, options) {
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
      return this.$store.dispatch('switch_loading',status);
    };

    //操作提示
    Vue.prototype.$LjNotify = function (type = 'info',status = {},during = 3000) {
      this.$store.dispatch('open_notify',{
        type,
        ...status
      });
      this.$store.dispatch('auto_close_notify',during);
    };

    //消息提示
    Vue.prototype.$LjMessage = function (type = 'info',status = {},during = 2000) {
      this.$store.dispatch('open_message',{
        type,
        ...status
      });
      this.$store.dispatch('auto_close_message',during);
    }
  }
}
