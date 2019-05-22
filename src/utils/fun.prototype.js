export default {
  install(Vue, options) {
    // 路由跳转
    Vue.prototype.routerLink = function (url, data,url_name) {
      if (data) {
        this.$router.push({path: url, query: data,name:url_name});
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
    //全局触发待办事项对话框显示隐藏
    Vue.prototype.todoListVisibleTrigger = function (val) {
      if (val && val.onClick) {
        this.$store.dispatch('save_todo_list_current_selection',val);
        Vue.prototype.$todo_list_current_selection = val;
        this.$store.dispatch('change_' + val.onClick + '_visible');
      }
    }
    //中央事件总线
    const Bus = new Vue({
        methods:{
            emit(event,...args){
                this.$emit(event,...args)
            },
            on(event,callback){
                this.$on(event,callback)
            },
            off(event,callback){
                this.$off(event,callback)
            }
        }
    })
    Vue.prototype.$bus = Bus;

    //统一管理接口处理结果
    Vue.prototype.$LjNotifyEasy = function(res,callback) {
      if (res.code.toString().endsWith('0')) {
        this.$LjNotify('success', {
          title: '成功',
          message: res.msg,
        });
        if(callback) {
          callback();
        }
      } else {
        this.$LjNotify('error', {
          title: '失败',
          message: res.msg,
        });
      }
    }

    Vue.prototype.$LjMessageEasy = function(res,callback) {
      if (res.code.toString().endsWith('0')) {
        this.$LjMessage('success', {
          title: '成功',
          msg: res.msg,
        });
        if(callback) {
          callback();
        }
      } else {
        this.$LjMessage('error', {
          title: '失败',
          msg: res.msg,
        });
      }
    }

    /*截取字符串方法*/
    Vue.prototype.substringPlugin = function(content,limit = 10) {
      if(content.constructor !== String) return;
      if(content.length<=limit) {
        return content;
      }
      return `${content.substring(0,limit)}...`;
    },

    Vue.prototype.$resetForm = function (form) {
      //重置表单
      if (!form) {
        return false;
      }
      for (var key in form) {
        if (typeof form[key] === 'string' || typeof form[key] === 'number') {
          form[key] = '';
        }
        if (form[key] instanceof Array) {
          form[key] = [];
        }
        if (form[key] instanceof Object) {
          this.$resetForm(form[key]);
        }
      }
    }

    Vue.prototype.$exportData = function (data) {
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement('a');
      link.style.display = 'a';
      link.href = url;
      link.setAttribute('download', 'excel.xls');
      document.body.appendChild(link);
      link.click();
    };

    /*验证权限*/
    Vue.prototype.validatePermission =async function(sign,type = 'auth') {
      let params = {
        type,
        sign,
        user_id:'289',
      };
      let result = await this.$http.get(`${globalConfig.humanResource_server}organization/permission/check`,params);
      if(result.code.endsWith('0')) {
        return result.data;
      }
      return false;
    }
    /*全局权限变量*/
    Vue.prototype.VALIDATE_PERMISSION = {};

    Vue.prototype.$LjMessageNoPermission = function(msg='无权限') {
      this.$LjMessage('warning',{title:'警告',msg:msg});
    };
  }
}
