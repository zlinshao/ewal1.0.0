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
    }
  }
}
