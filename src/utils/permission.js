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
    if(result.code==88800 || result.code==888888) {
      storage.remove('Authorization');
      storage.remove('VALIDATE_PERMISSION');
      return;   
    }

    if (result.code.endsWith('0')) {
      Vue.prototype.VALIDATE_PERMISSION = {};
      _(result.data).forEach((o, index) => {
        Vue.prototype.VALIDATE_PERMISSION[o] = true;
        storage.set('VALIDATE_PERMISSION',Vue.prototype.VALIDATE_PERMISSION);
      });
      return true;
    }
  };
  async function getUserInfo() {
    if(!storage.get('Authorization')) return;
    let result =await Axios.get(`${globalConfig.shield_server}api/auth/user`);
        if (result.success === true) {
          await storage.set('user_info', {
            id: result.data.id,
            name: result.data.name,
            org:result.data.detail?.org||[],
            position:result.data.detail?.position||[],
            avatar: result.data.detail?.avatar,
            position_level: result.data.detail?.staff?.position_level||null,//职位等级
            company_info: result.data.detail?.company_info || {},//公司信息
          });
        }
  };
  await permission();
  await getUserInfo();
  setInterval(permission, 1000 * 60 * 5);
  setInterval(getUserInfo, 1000 * 60 * 5);
}
