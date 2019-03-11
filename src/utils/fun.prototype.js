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
    Vue.prototype.$LjNotify = function (type = '',status = {},during = 3000) {
      switch (type) {
        case 'success':
        this.$store.dispatch('open_notify',{
          type: 'success',
          ...status
        });
        break;

        case 'error':
        this.$store.dispatch('open_notify',{
          type: 'error',
          ...status
        });
        break;

        case 'info':
        this.$store.dispatch('open_notify',{
          type: 'info',
          ...status
        });
        break;

        case 'warning':
        this.$store.dispatch('open_notify', {
          type: 'warning',
          ...status
        });
        break;

        default :
        this.$store.dispatch('open_notify',{
          type: 'info',
          ...status
        });
      }
      this.$store.dispatch('auto_close_notify',during);
    };

    //消息提示
    Vue.prototype.$LjMessage = function (type = '',status = {},during = 2000) {
      switch (type) {
        case 'success':
          this.$store.dispatch('open_message',{
            type: 'success',
            ...status
          });
          break;

        case 'error':
          this.$store.dispatch('open_message',{
            type: 'error',
            ...status
          });
          break;

        case 'info':
          this.$store.dispatch('open_message',{
            type: 'info',
            ...status
          });
          break;

        case 'warning':
          this.$store.dispatch('open_message', {
            type: 'warning',
            ...status
          });
          break;

        default :
        this.$store.dispatch('open_message',{
          type: 'info',
          ...status
        });
      }
      this.$store.dispatch('auto_close_message',during);
    }
  }
}
