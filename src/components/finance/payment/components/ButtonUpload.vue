<template>
    <div id="button_upload">
      <label>
        <!--<el-button size="small" type="primary" plain @click="triggerFile">导入报表</el-button>-->
        <el-input size="small" @focus="triggerFile" readonly style="width: 220px"><i
          class="el-icon-folder el-input__icon"
          slot="suffix">
        </i></el-input>
        <input type="file" id="button_upload_file" hidden multiple @change="uploadPic">
      </label>
    </div>
</template>

<script>
  import _ from 'lodash';
  import * as qiniu from 'qiniu-js'
  import {md5} from '../../../../../static/js/MD5.js'

  export default {
    /*专门处理上传报表的组件*/
    name: "ButtonUpload",
    props: {
    },
    data() {
      return {
        url:globalConfig.humanResource_server,
        token: '',//上传凭证
        ids: [],
        showFile: [],//本地文件地址
        file: {
          keyName: Date.now(),
          setFile: [],
          size: {
            width: '60px',
            height: '60px'
          },
          count: 0,
        }
      }
    },
    methods: {
      triggerFile() {
        document.getElementById('button_upload_file').click();
      },

      // 获取token
      uploadPic() {
        if (this.token) {
          this.startUpload();
        } else {
          this.$http.get(globalConfig.upload_sever + 'api/v1/token').then(res => {
            this.token = res.data.data;
            this.startUpload();
          })
        }
      },
      // 图片地址
      showPhoto(val, type, name) {
        let data = {};
        data.info = {};
        data.uri = val;
        data.info.mime = type;
        data.name = name;
      },
      // 开始上传
      startUpload() {
        let that = this;
        let files = document.getElementById('button_upload_file').files;
        if(files.length>1) {
          this.$LjMessage('warning',{
            title:'警告',
            msg:`请传入单个文件`,
          });
          return;
        }
        for (let file of files) {
          let reader = new FileReader();//构造FileReader对象
          let fileType = '';
          let fileName = file.name;
          let fileSize = file.size;
          let key = "lejia" + md5(fileName + new Date().getTime()).toLowerCase() + "." + fileName.split(".")[1];
          reader.readAsDataURL(file);
          reader.onload = function (event) {
            if (file.type.includes('image') || file.type.includes('video')) {
              if (file.type.includes('image')) {
                fileType = 'image';
                that.showPhoto(event.target.result, 'image', fileName);
              } else {
                fileType = 'video';
                that.showPhoto(event.target.result, 'video', fileName);
              }
            } else {
              if (fileName.includes('.xls')) {
                fileType = 'xls';
                that.showPhoto(event.target.result, 'xls', fileName);
              } else if (fileName.includes('.doc') || fileName.includes('.rtf')) {
                fileType = 'doc';
                that.showPhoto(event.target.result, 'doc', fileName);
              } else if (fileName.includes('.txt')) {
                fileType = 'text';
                that.showPhoto(event.target.result, 'txt', fileName);
              } else if (fileName.includes('.pdf')) {
                fileType = 'pdf';
                that.showPhoto(event.target.result, 'pdf', fileName);
              } else {
                fileType = 'file';
                that.showPhoto(event.target.result, 'file', fileName);
              }
            }
          };
          let putExtra = {
            fname: fileName,
            params: {},
            mimeType: [] || null
          };
          let config = {
            useCdnDomain: true,

          };
          let observable = qiniu.upload(file, key, that.token, putExtra, config);
          let subscription = observable.subscribe({
            next(res) {
            },
            error(err) {
              console.log(err);
            },
            complete(res) {
              console.log(res);
              let data = {};
              data.url = globalConfig.domain + res.key;
              data.name = res.key;
              data.raw_name = res.key;
              data.type = fileType;
              data.size = fileSize;
              that.$http.uploadServer(data).then(res => {
                if (res.code === "110100") {
                  that.ids.push(Number(res.data.id));
                  that.$emit('success',that.ids);
                }
              })
            }
          });
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  #theme_name {
    #button_upload {
      display: inline-block;
    }
  }

  #theme_name.theme1 {
    #button_upload {

    }
  }

  #theme_name.theme2 {
    #button_upload {

    }
  }

  #theme_name.theme3 {
    #button_upload {

    }
  }

  #theme_name.theme4 {
    #button_upload {

    }
  }
</style>
