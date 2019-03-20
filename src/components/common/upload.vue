<template>
  <div id="upLoad">
    <div class="flex">
      <div class="showFile" :style="uploadCss" v-for="(item,index) in showFile">
        <img :src="item.url" v-if="item.type === 'image'">
        <video :src="item.url" v-else></video>
        <div class="progress">
          <el-progress :text-inside="true" :stroke-width="20" :percentage="progress"></el-progress>
        </div>
        <div class="remove flex" @click="removeFile(index)">
          <img src="../../assets/image/common/theme1/closeBtn.png">
        </div>
      </div>
      <label class="uploadPic" :style="uploadCss" :for="file.keyName">
        <img src="../../assets/image/common/theme1/upload.png">
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
        ids: [],
        token: '',//上传凭证
        showFile: [],//本地文件地址
        isVideo: '',//是否视频
        progress: 0,
        uploadCss: (this.file.size && this.file.size.width) || {width: '100px', height: '100px'},
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      file: {
        handler(val, oldVal) {
          console.log(val)
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      removeFile(index) {
        // this.file.setFile.splice(index, 1);
        this.showFile.splice(index, 1);
        this.ids.splice(index, 1);
        this.$emit('success', this.ids);
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
            next(res) {
              that.progress = Math.floor(res.total.percent);
              // console.log(res);
            },
            error(err) {
              console.log(err);
            },
            complete(res) {
              let data = {};
              data.url = globalConfig.domain + res.key;
              data.name = res.key;
              data.raw_name = res.key;
              data.type = fileType;
              data.size = fileSize;
              that.$http.uploadServer(data).then(res => {
                console.log(res);
                if (res.code === "110100") {
                  that.ids.push(res.data.id);
                  that.$emit('success', that.ids);
                }
              })
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
      overflow: hidden;
      @include radius(6px);
    }
    .showFile {
      position: relative;
      margin: 10px 10px 0 0;
      .progress {
        position: absolute;
        left: 8px;
        right: 8px;
        top: 50%;
        @include transform(translateY(-50%));
        opacity: .8;
      }
      .remove {
        cursor: pointer;
        position: absolute;
        top: -10px;
        right: -10px;
        width: 35px;
        height: 35px;
        @include radius(50%);
        background-color: $colorE33;
        align-items: flex-end;
        img {
          margin: 0 0 7px 7px;
          width: 12px;
          height: 12px;
        }
      }
    }
    .uploadPic {
      cursor: pointer;
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #EBEEF5;
    }
  }

</style>
