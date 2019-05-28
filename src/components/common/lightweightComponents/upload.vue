<template>
  <div id="upLoad">
    <transition-group name="list" tag="p" class="items-center" style="flex-wrap: nowrap">
      <div v-for="(item,index) in showFile" :key="JSON.stringify(item)" class="showFile" :style="uploadCss">
        <!--图片-->
        <img :src="item.uri" v-if="item.info.mime.includes('image') && editable">
        <img @click="showImgSlider(showFile,index)" :src="item.uri"
             v-if="item.info.mime.includes('image') && !editable">
        <!--视频-->
        <div v-else-if="item.info.mime.includes('video') && editable">
          <!--<div class="playVideo" @click="videoPlay(index)">播放</div>-->
          <video :id="'video' + file.keyName + index">
            <source :src="item.uri" type="video/ogg"/>
            <source :src="item.uri" type="video/mp4"/>
            <source :src="item.uri" type="video/webm"/>
            <source :src="item.uri" type="audio/ogg"/>
            <source :src="item.uri" type="audio/mpeg"/>
          </video>
        </div>

        <div @click="showImgSlider(showFile,index)" v-else-if="item.info.mime.includes('video') && !editable">
          <video :id="'video' + file.keyName + index">
            <source :src="item.uri" type="video/ogg"/>
            <source :src="item.uri" type="video/mp4"/>
            <source :src="item.uri" type="video/webm"/>
            <source :src="item.uri" type="audio/ogg"/>
            <source :src="item.uri" type="audio/mpeg"/>
          </video>
        </div>

        <!--其它类型-->
        <img src="../../../assets/image/common/theme1/bg(1).png" v-else-if="item.info.mime.includes('xls')">
        <!--<img @click="downloadFile(item)" src="../../../assets/image/file/xls.png" v-else-if="item.info.mime.includes('xls')&& !editable">-->
        <img src="../../../assets/image/file/doc.png" v-else-if="item.info.mime.includes('doc')">
        <img src="../../../assets/image/file/txt.png" v-else-if="item.info.mime.includes('text')">
        <img src="../../../assets/image/file/pdf.png" v-else-if="item.info.mime.includes('pdf')">
        <img src="../../../assets/image/file/file.png" v-else>
        <!--<img @click="downloadFile(item)" src="../../../assets/image/file/file.png" v-else-if="!editable">-->
        <!--进图条-->
        <div v-if="editable" class="progress" :id="'progress' + file.keyName + index"
             v-show="!item.uri.includes('http://static.lejias.cn')">
        </div>
        <!--删除按钮-->
        <div v-if="editable" class="remove flex" @click="removeFile(index)">
          <img src="../../../assets/image/common/theme1/closeBtn.png">
        </div>
      </div>
      <!--上传按钮-->
      <label v-if="editable" class="uploadPic" style="padding: 0" :key="1" :style="uploadCss" :for="file.keyName">
        <img src="../../../assets/image/common/theme1/tj.png">
        <input type="file" :id="file.keyName" hidden multiple @change="uploadPic">
      </label>
      <!--下载按钮-->
      <label title="下载全部" @click="downloadAll" v-if="!editable && download &&showFile.length>0" class="uploadPic" :key="1" :style="uploadCss"
             :for="file.keyName">
        <img src="../../../assets/image/common/theme1/xiazai_xue.png">
      </label>
    </transition-group>


    <!--事项详情中图片展示dialog-->
    <lj-dialog
      :visible="photo_detail_dialog"
      :size="{width: 700 + 'px',height: 550 + 'px'}"
      @close="photo_detail_dialog = false"
    >
      <div class="dialog_container borrow-receive-dialog">
        <div class="dialog_header">
          <span class="notify-size">详情</span>
        </div>
        <div class="dialog_main  borrow-receive-img-dialog">
          <!--<img-slider :ids="tableSettingData.borrowReceive.formData.receive_picture"></img-slider>-->
          <img-slider :arr="showFileData" :initialIndex="currentIndex"></img-slider>
        </div>

      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import _ from 'lodash';
  import axios from 'axios';
  import * as qiniu from 'qiniu-js'
  import {md5} from '../../../../static/js/MD5.js'
  import JSZip from '../../../../static/js/jszip'
  import FileSaver from '../../../../static/js/FileSaver'
  import LjDialog from '@/components/common/lj-dialog';
  import ImgSlider from '@/components/common/lightweightComponents/ImgSlider';


  const getFile = url => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        responseType: 'arraybuffer'
      }).then(data => {
        resolve(data.data)
      }).catch(error => {
        reject(error.toString())
      })
    })
  }


  export default {
    name: "upload",
    //props: ['file', 'disabled','download'],
    props: {
      file: {},
      disabled:{},
      download:{},
      limit: {
        type:Array,
        default() {
          return [];
        }
      },
      maxSize: {
        type:[Number],
      },
      viewFile: {
        type: Array,
      },
    },
    components: {
      LjDialog,
      ImgSlider,
    },
    data() {
      return {
        currentIndex: 1,
        showFileData: [],
        photo_detail_dialog: false,
        token: '',//上传凭证
        ids: [],
        showFile: [],//本地文件地址
        isVideo: '',//是否视频
        progress: [],
        uploadCss: this.file.size || {width: '100px', height: '100px'},
        //limit: ['doc','txt','png'],
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      file: {
        handler(val, oldVal) {
          if(!this.disabled) return;
          if (val.setFile.length > 0) {
            this.showFile = [];
            for (let item of val.setFile) {
              this.ids.push(Number(item.id));
              this.showFile.push(item);
              this.progress.push(0);
            }
          } else {
            this.ids = [];
            this.showFile = [];
            this.progress = [];
          }

          this.$emit('success', [this.file.keyName, _.uniq(this.ids), true]);
        },
        deep: true,
        immediate: true,
      },
      viewFile: {
        handler(val,oldVal) {
          if(val.constructor===Array&&val.length>0) {
            this.showFile = val;
          }
        },
        immediate: true,
      },
    },
    computed: {
      editable() {
        return !this.disabled;
      }
    },
    methods: {
      //下载全部
      downloadAll() {
        const data = this.showFile; // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
        const zip = new JSZip()
        const cache = {}
        const promises = []
        data.forEach(mItem => {
          //const arr_name = item.split("/")
          //const file_name = item.name // 获取文件名
          //zip.file(file_name, data, { binary: true }) // 逐个添加文件
          const promise = getFile(mItem.uri).then(data => { // 下载文件, 并存成ArrayBuffer对象
            //const arr_name = item.split("/")
            const file_name = mItem.name // 获取文件名
            zip.file(file_name, data, {binary: true}) // 逐个添加文件
            cache[file_name] = data
          })
          promises.push(promise)
        })

        Promise.all(promises).then(() => {
          zip.generateAsync({type: "blob"}).then(content => { // 生成二进制流
            FileSaver.saveAs(content, "附件.zip") // 利用file-saver保存文件
          })
        })
      },

      showImgSlider(showFile, index) {
        let cur = showFile[index];
        let mIdx = 0;
        showFile = _.filter(showFile, (value) => {

          let sResult = value.info.mime.includes('image') || value.info.mime.includes('video');
          if(!sResult) {
            if(index>mIdx) {
              index--;
            }
          }
          mIdx++;
          return sResult;
        });
        //console.log(showFile)
        this.showFileData = showFile;
        this.currentIndex = index || 1;
        this.photo_detail_dialog = true;
      },

      videoPlay(index) {
        let id = 'video' + this.file.keyName + index;
        let myVideo = document.getElementById(id);
        myVideo.play();
      },
      removeFile(index) {
        this.showFile.splice(index, 1);
        this.ids.splice(index, 1);
        this.progress.splice(index, 1);
        let status = this.ids.length === this.showFile.length;
        this.$emit('success', [this.file.keyName, _.uniq(this.ids), status]);
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
        this.showFile.push(data);
      },
      // 开始上传
      startUpload() {
        let that = this;
        let files = document.getElementById(that.file.keyName).files;
        for (let file of files) {
          let reader = new FileReader();//构造FileReader对象
          let fileType = '';
          let fileName = file.name;
          let fileSize = file.size;
          let ext = file.name.split('.')[file.name.split('.').length-1];
          if(this.limit.constructor===Array&&this.limit.length>0) {
            if(!_.includes(this.limit,ext)) {
              this.$LjMessage('warning',{
                title:'警告',
                msg:`仅支持上传${this.limit.join(',')}的类型`,
              });
              document.getElementById(that.file.keyName).value = null;
              return;
            }
          }
          if(this.maxSize) {
            if(this.maxSize*1024*1024<=file.size) {
              this.$LjMessage('warning',{
                title:'警告',
                msg:`超过最大上传限制${this.maxSize}M`,
              });
              return;
            }
          }
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
          that.progress.push(0);
          let pro = 'progress' + that.file.keyName + (that.progress.length - 1);
          let observable = qiniu.upload(file, key, that.token, putExtra, config);
          let subscription = observable.subscribe({
            next(res) {
              document.getElementById(pro).innerText = Math.floor(res.total.percent) + '%';
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
                  let status = that.ids.length === that.showFile.length;
                  let s = that.ids;
                  that.$emit('success', [that.file.keyName, _.uniq(that.ids), status]);
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
  @import "../../../assets/scss/common.scss";

  #upLoad {
    .notify-size {
      cursor: default;
      font-size: 22px;
      border: 1px dashed #ccc;
    }

    video {
      width: 100%;
      height: 100%;
    }
    width: 100%;
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    .showFile, .uploadPic {
      overflow: hidden;
      @include radius(6px);
    }
    .items-center {
      flex-wrap: wrap;
    }
    .showFile {
      position: relative;
      margin: 10px 10px 0 0;
      .progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: $colorFFF;
        background-color: rgba(0, 0, 0, .5);
        opacity: .8;
        height: 30px;
        line-height: 30px;
        text-align: center;
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
