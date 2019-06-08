import Axios from './httpService'
import Vue from 'vue';
import storage from './storage';



export default async function getPermission() {
  async function permission() {
    if(!storage.get('Authorization')) return;
    let params = {
      user_id: 'self',
      type: 'all',
    };
    /*let params = {
      user_id:'289',
      system_id:22,
      type:'all',
    };*/
    let result = await Axios.get(`${globalConfig.humanResource_server}organization/permission/all`, params);
    if (result.code.endsWith('0')) {
      Vue.prototype.VALIDATE_PERMISSION = {};
      _(result.data).forEach((o, index) => {
        Vue.prototype.VALIDATE_PERMISSION[o] = true;
      });
    }
  }
  await permission();
  setInterval(permission, 1000 * 60*5);
}
