<template>
  <div id="upLoad">
    <div class="flex">
      <div class="showFile" v-for="(item,index) in showFile" @click="removeFile(index)">
        <img :src="item.url" v-if="item.type === 'image'">
        <video :src="item.url" v-else></video>
      </div>
      <label class="uploadPic" :for="file.keyName">
        <img src="../../assets/image/common/theme1/humanresourcehongdi2.png">
        <input type="file" :id="file.keyName" hidden multiple @change="uploadPic">
      </label>
    </div>
  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import {md5} from '../../../static/js/MD5.js'

  export default {
    name: "upload",
    props: ['file'],
    data() {
      return {
        token: '',//上传凭证
        showFile: [],//本地文件地址
        isVideo: '',//是否视频z
      }
    },
    mounted() {
      this.$http.get(globalConfig.upload_sever + 'api/v1/token').then(res => {
        this.token = res.data.data;
      })
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      removeFile(index) {
        this.file.setFile.splice(index, 1);
        this.showFile.splice(index, 1);
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
      showPhoto(val, type = 'image') {
        let data = {};
        data.url = val;
        data.type = type;
        this.showFile.push(data);
      },
      // 开始上传
      startUpload() {
        let that = this;
        let files = document.getElementById(that.file.keyName).files;
        for (let file of files) {
          let reader = new FileReader();//构造FileReader对象
          let fileType = file.type;
          let fileName = file.name;
          let fileSize = file.size;
          let key = "lejia" + md5(fileName + new Date().getTime()).toLowerCase() + "." + fileName.split(".")[1];
          if (fileType.includes('image')) {
            reader.readAsDataURL(file);
            reader.onload = function (event) {
              that.showPhoto(event.target.result);
            };
          } else {
            reader.readAsDataURL(file);
            reader.onload = function (event) {
              that.showPhoto(event.target.result, 'video');
            };
          }
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
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            },
            complete: (res) => {
              console.log(res);
            }
          });
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";

  #upLoad {
    .showFile, .uploadPic {
      width: 100px;
      height: 100px;
      cursor: pointer;
      overflow: hidden;
      @include radius(6px);
    }
    .showFile {
      margin: 10px 10px 0 0;
    }
    .uploadPic {
      margin-top: 10px;
    }
  }

</style>
