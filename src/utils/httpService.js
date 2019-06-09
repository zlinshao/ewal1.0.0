import axios from 'axios';
import common from './myUtils.js';

let url = globalConfig.server;

axios.defaults.timeout = 10000;

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  if (!response.data) {
    response.data = {};
    response.data.httpCode = response.status;
  } else {
    response.data.httpCode = response.status;
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        common.open4('错误请求');
        console.log('错误请求');
        break;
      case 401:
        common.open4('未授权，请重新登录');
        console.log('未授权，请重新登录');
        break;
      case 403:
        common.open4('拒绝访问');
        console.log('拒绝访问');
        break;
      case 404:
        common.open4('请求错误,未找到该资源');
        console.log('请求错误,未找到该资源');
        break;
      case 405:
        common.open4('请求方法未允许');
        console.log('请求方法未允许');
        break;
      case 408:
        common.open4('请求超时');
        console.log('请求超时');
        break;
      case 500:
        common.open4('服务器端出错');
        console.log('服务器端出错');
        break;
      case 501:
        common.open4('网络未实现');
        console.log('网络未实现');
        break;
      case 502:
        common.open4('网络错误');
        console.log('网络错误');
        break;
      case 503:
        common.open4('服务不可用');
        console.log('服务不可用');
        break;
      case 504:
        common.open4('网络超时');
        console.log('网络超时');
        break;
      case 505:
        common.open4('http版本不支持该请求');
        console.log('http版本不支持该请求');
        break;
      default:
        common.open4(`连接错误${err.response.status}`);
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    common.open4('连接到服务器失败');
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response);
});

class Axios {
  static get(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params: data}).then(response => {
        if (response.status > 399) {
          return;
        }
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(response => {
        if (response.status > 399) {
          return;
        }
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(response => {
        if (response.status > 399) {
          return;
        }
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {params: data}).then(response => {
        if (response.status > 399) {
          return;
        }
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static patch(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(response => {
        if (response.status > 399) {
          return;
        }
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  // 上传文件
  static uploadServer(data) {
    return new Promise((resolve, reject) => {
      this.post(globalConfig.upload_sever + 'api/v1/upload-direct', data).then(res => {
        resolve(res);
      });
    });
  }

  // 组织架构部门
  static getOrganization(org) {
    //debugger
    return new Promise((resolve, reject) => {
      this.get(url + 'organization/organization', {
        parent_id: org,
        page: 1,
        limit: 999
      }).then(res => {
        resolve(res);
      });
    });
  }

  // 组织架构职位
  static getDuty(params) {
    return new Promise((resolve, reject) => {
      this.get(url + 'organization/duty', params).then(res => {
        resolve(res);
      });
    });
  }

  // 组织架构岗位
  static getPosition(params) {
    return new Promise((resolve, reject) => {
      this.get(url + 'organization/position', params).then(res => {
        resolve(res);
      });
    });
  }
}

export default Axios
