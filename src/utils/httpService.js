import axios from 'axios';
import storage from './storage';


let url = globalConfig.server;

//const TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkYzI1Y2YyZDI5ZTIxMDM4MWVlNDU5YzgzZjNiNDllYjc2MmNhNjljMTAxNDFkYTgxMGI4N2NmNGU0MjA1ZWIzYjhlZmJkZmI1YWJlNzM2In0.eyJhdWQiOiIxIiwianRpIjoiMGRjMjVjZjJkMjllMjEwMzgxZWU0NTljODNmM2I0OWViNzYyY2E2OWMxMDE0MWRhODEwYjg3Y2Y0ZTQyMDVlYjNiOGVmYmRmYjVhYmU3MzYiLCJpYXQiOjE1NTg2MDgwNjMsIm5iZiI6MTU1ODYwODA2MywiZXhwIjoxNTU5OTA0MDYzLCJzdWIiOiI2MCIsInNjb3BlcyI6W119.WpMvynXIK4i6iAvONOEoxlex3SAFzbmKRX0wju18LCOZvoE3fvUHzaGPzuQlRUOJ5TzVECdDjk14_AXfmQd7tNFt9Udqxgzd51Y6FSYSBE0tBve1dPu4UCmkZ1EPurQ8_cx46hDrjTu_By76pPcNf8PDf-Ga6oqab5cyWFmjmSIvG5SGr9e6gh8RRdiyZcMHgrD1vxgeQ_IoqSq2cm70BHw6s4e4NQunKGpNEkc7_ncdlffsNoDSH78YvY4F2kzsc8KAaTzXZTObq0Om5CIMHik5pbSNOlgZNOBJ2_S2VoY3U-R1M9cRnWtm3mqRhRsQiEH4hqPewTwfUsyHLkPGerr5_5RD1sv5nCGntOnACqh7_pzu-jiHhvK1gIVWC2l1VeOrrAZNt0W4F19K2gpIi0kVzQiD5htGvUmG35BB0XOB1zCCIkToOgaMue9Qm5R2BbQ-ajrwb4Ts-fnQqXh8t3bUtXxSXPjrBcvXszQf-3qRnzh-6-_lCAw0BRuJ9vVNX3nps3dHoS8jMtH58Xkh2WWly6mcs7ormhEDOAskbcobdOPKWqiI9dW1E1dqoCbISAXIqWd8kq-pYs40xilF5k1FMGaeS-FLxuQKHCcAVO3tEHHsHhn9aNjTbzUtF1dcW4lSnr9uNhnim6V1QXIOlzOyCyv_FeHV03llgyDiGZI';
//const TOKEN = storage.get('Authorization');
//debugger

axios.defaults.timeout = 100000;
//axios.defaults.headers.common['Authorization'] = TOKEN;

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
