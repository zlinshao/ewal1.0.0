import UserChoose from '../components/common/lightweightComponents/UserChoose';
import OrgChoose from '../components/common/lightweightComponents/OrgChoose';
import PostChoose from '../components/common/lightweightComponents/PostChoose';
import LjDialog from '../components/common/lj-dialog';
import ComingSoon from '../components/common/ComingSoon';
import LjUpload from '../components/common/lightweightComponents/lj-upload';
import DropdownList from '../components/common/lightweightComponents/dropdown-list';
import { DROPDOWN_CONSTANT, GLOBAL_CONSTANT } from '@/assets/js/allConstantData';
import HouseCommunity from '../components/common/houseCommunity'
export default {
    install(Vue, options) {
        /*全局组件及全局常量注册*/
        Vue.component(UserChoose.name, UserChoose); //选人
        Vue.component(OrgChoose.name, OrgChoose); //选部门
        Vue.component(PostChoose.name, PostChoose); //选岗位
        Vue.component(LjDialog.name, LjDialog); //对话框
        Vue.component(LjUpload.name, LjUpload); //对话框
        Vue.component(ComingSoon.name, ComingSoon); //对话框
        Vue.component(DropdownList.name, DropdownList); //下拉组件
        Vue.prototype.DROPDOWN_CONSTANT = DROPDOWN_CONSTANT;
        Vue.prototype.GLOBAL_CONSTANT = GLOBAL_CONSTANT;
        Vue.component(HouseCommunity.name, HouseCommunity); //选部门

        Vue.component('remote-script', {//index.html页面中不能直接引入 长时间会报错
          render: function (createElement) {
            let self = this;
            return createElement('script', {
              attrs: {
                type: 'text/javascript',
                src: this.src
              },
              on: {
                load: function (event) {
                  self.$emit('load', event);
                },
                error: function (event) {
                  self.$emit('error', event);
                },
                readystatechange: function (event) {
                  if (this.readyState == 'complete') {
                    self.$emit('load', event);
                  }
                }
              }
            });
          },

          props: {
            src: {
              type: String,
              required: true
            }
          }
        });


        // 路由跳转
        Vue.prototype.routerLink = function(url, data, url_name) {
            if (data) {
                this.$router.push({ path: url, query: data, name: url_name });
            } else {
                this.$router.push(url);
            }
        };
        Vue.prototype.mainListHeight = function(num = 0) {
            return window.innerHeight - 170 - num;
        };
        Vue.prototype.showLoading = function(status = true) {
            return this.$store.dispatch('switch_loading', status);
        };
        Vue.prototype.showLoading2 = function(status = true) {
          return this.$store.dispatch('switch_loading2', status);
        };
        // 克隆数据/JSON数据转换
        Vue.prototype.jsonData = function(val, way = 'clone') {
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
        Vue.prototype.handleSearch = function(data) {
            let fruit = {};
            for (let item of data.data) {
                fruit[item.keyName] = item.dataType;
            }
            fruit.page = data.page ? data.page : 1;
            fruit.limit = data.limit ? data.limit : 30;
            return fruit;
        };
        //操作提示
        Vue.prototype.$LjNotify = function(type = 'info', status = {}, during = 3000) {
            this.$store.dispatch('open_notify', {
                type,
                ...status
            });
            this.$store.dispatch('auto_close_notify', during);
        };

        //消息提示
        Vue.prototype.$LjMessage = function(type = 'info', status = {}, during = 2000) {
                this.$store.dispatch('open_message', {
                    type,
                    ...status
                });
                this.$store.dispatch('auto_close_message', during);
            }
            //全局触发待办事项对话框显示隐藏
        Vue.prototype.todoListVisibleTrigger = function(val) {
                if (val && val.onClick) {
                    this.$store.dispatch('save_todo_list_current_selection', val);
                    Vue.prototype.$todo_list_current_selection = val;
                    this.$store.dispatch('change_' + val.onClick + '_visible');
                }
            }
            //中央事件总线
        const Bus = new Vue({
            methods: {
                emit(event, ...args) {
                    this.$emit(event, ...args)
                },
                on(event, callback) {
                    this.$on(event, callback)
                },
                off(event, callback) {
                    this.$off(event, callback)
                }
            }
        })
        Vue.prototype.$bus = Bus;

        //统一管理接口处理结果
        Vue.prototype.$LjNotifyEasy = function(res, callback) {
            if (res.code?.toString().endsWith('0') || res.status?.toString().endsWith('0')) {
                this.$LjNotify('success', {
                    title: '成功',
                    message: res.msg || res.message,
                });
                if (callback) {
                    callback();
                }
            } else {
                this.$LjNotify('error', {
                    title: '失败',
                    message: res.msg || res.message,
                });
            }
        }

        Vue.prototype.$LjMessageEasy = function(res, callback) {
            if (res.code.toString().endsWith('0') || res.status?.toString().endsWith('0')) {
                this.$LjMessage('success', {
                    title: '成功',
                    msg: res.msg || res.message,
                });
                if (callback) {
                    callback();
                }
            } else {
                this.$LjMessage('error', {
                    title: '失败',
                    msg: res.msg || res.message,
                });
            }
        }

        /*截取字符串方法*/
        Vue.prototype.substringPlugin = function(content, limit = 10) {
                if (!content) {return};
                if (content.constructor !== String) return;
                if (content.length <= limit) {
                    return content;
                }
                return `${content.substring(0,limit)}...`;
            },

            Vue.prototype.$resetForm = function(form) {
                //重置表单
                if (!form) {
                    return false;
                }
                for (let key in form) {
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

        Vue.prototype.$exportData = function(data) {
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement('a');
            link.style.display = 'a';
            link.href = url;
            link.setAttribute('download', 'excel.xls');
            document.body.appendChild(link);
            link.click();
        };

        /*验证权限*/
        /*Vue.prototype.validatePermission =async function(sign,type = 'auth') {
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
        }*/
        /*全局权限变量*/
        Vue.prototype.VALIDATE_PERMISSION = {};


      Vue.prototype.validatePermission = function(validName,tip='无权限') {
        if (!this.$storage.get('VALIDATE_PERMISSION')[validName]) {
          this.$LjMessageNoPermission(tip);
          return false;
        }
        return true;
      }

        /*Vue.prototype.validatePermission = function(validName) {
            if (!this.VALIDATE_PERMISSION[validName]) {
                this.$LjMessageNoPermission();
                return false;
            }
            return true;
        }*/

        Vue.prototype.$LjMessageNoPermission = function(msg = '无权限') {
            this.$LjMessage('warning', { title: '警告', msg: msg });
        };
    }
}
