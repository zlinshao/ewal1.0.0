import axios from 'axios';


let url = globalConfig.server;

const TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEzNmQzMWQ1ZGU4ZWFhZDQyYmMzNWRmZjYzNTZkNWNlNWVmZDhhZGQ1N2I3ZjQxYjc1YjM2YmEyM2VjMDQ1ZjQ2OGM2NjhiODUwZDgzYjdmIn0.eyJhdWQiOiIxIiwianRpIjoiYTM2ZDMxZDVkZThlYWFkNDJiYzM1ZGZmNjM1NmQ1Y2U1ZWZkOGFkZDU3YjdmNDFiNzViMzZiYTIzZWMwNDVmNDY4YzY2OGI4NTBkODNiN2YiLCJpYXQiOjE1NTcyOTUyNDEsIm5iZiI6MTU1NzI5NTI0MSwiZXhwIjoxNTU4NTkxMjQwLCJzdWIiOiIyNDA5Iiwic2NvcGVzIjpbXX0.M5V6d6Of4iSaolFlJQZ9OjRgb_OJloZ03ltlcOF2tTUmSHVEUYRsyNodKM8ytYYRddKxiUUYQCLCwZKZMsCygJCNGEt4Yo3afTmTTnQz-pqIawBePdhHHL9FDQ_hc3MuGIO4LxCckymlV71x6Hpm_zxr_TOYrlkBRydqpLpy04FDfT1F7fRN-oaM8dISoBpy1-FD7eq61NmdeLllzqT8YjZ2A-xKy2e0oD-km_I5qZzIHEmJpJIgGC8X4OvnzfEmstPyQzNORb05tGJhVDwwWEV6BYPkY8I9aFTY-vVkzZ5ORdwssj_C5PXcrzw7YMIyD8fyjyIWBmlEbGhQSmEmvGrIlESBVD0IOlXbsZpXNyi87-as5lbBYwIg0vrp9n2cSy2xKbRx4UMdC1S9PEQoWRSgrdzArhHDUokxErScv-EDLgJZFKEKxo61OQ4Fwk-8zXV0d9Yy_76eOrfIDPS7KR2w3Kd4tGobvq3HMcgR0nZ5JjhUExhuVKsT22eQ9WSJYeerEGeTj69bWhlMOmUKyYnae9eZFIvzc_-Qv6Ui9Zy81Wt7cJL_NqEFVv0qCoIkHuV6NHi09ExwBKskLtuGEZy3YEJqT3_wwK04c13J6X4HSYEZ70Qp2xXWF8aPDzGFk86c6c8YF7v8Fs8Mt-Cv6BEXNdKAjPCjM9DEWrCSRMk';

axios.defaults.timeout = 100000;
axios.defaults.headers.common['Authorization'] = TOKEN;

// axios.defaults.baseURL = globalConfig.server; // 域名

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求');
        break;
      case 401:
        console.log('未授权，请重新登录');
        // window.location.href = window.location.origin + '/jurisdiction';
        break;
      case 403:
        console.log('拒绝访问');
        // window.location.href = window.location.origin + '/jurisdiction';
        break;
      case 404:
        console.log('请求错误,未找到该资源');
        break;
      case 405:
        console.log('请求方法未允许');
        break;
      case 408:
        console.log('请求超时');
        break;
      case 500:
        console.log('服务器端出错');
        // window.location.href = window.location.origin + '/network_error';
        break;
      case 501:
        console.log('网络未实现');
        break;
      case 502:
        console.log('网络错误');
        break;
      case 503:
        console.log('服务不可用');
        break;
      case 504:
        console.log('网络超时');
        break;
      case 505:
        console.log('http版本不支持该请求');
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response);
});

class Axios {
  static get(url, params = {},Type = '') {
    return new Promise((resolve, reject) => {
      axios.get(url, {params: params,responseType: Type}).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(response => {
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(response => {
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, data).then(response => {
        resolve(response.data);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static patch(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(response => {
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
