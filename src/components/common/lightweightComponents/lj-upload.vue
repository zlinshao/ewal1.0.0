<template>
  <div id="lj_upload">
    <div class="upload-container">
      <span v-if="title" class="upload-title">{{title}}</span>
      <upload :num="num" :max-size="maxSize" :download="download" :view-file="viewFile" show :limit="limit_origin"
              :limitEasy="limitEasy" :disabled="disabled" :file="photoData" @success="handleSuccess" @uploaded="isUploaded"></upload>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Upload from './upload';

  export default {
    name: "ljUpload",
    //props: ['title', 'value', 'size', 'data', 'disabled'],
    props: {
      title: {},
      value: {},
      size: {},
      data: {},
      num: {//上传个数
        type:Number
      },
      limit: {},
      limitEasy: {//
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        default: false,
      },
      download: {
        default: true
      },
      maxSize: {
        type: Number,
      },
      viewFile: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    components: {
      Upload
    },
    watch: {
      limit: {
        handler(val, oldVal) {
          if (val.length > 0) {
            this.limit_origin = val;
          }
        },
        //immediate:true,
      },
      limitEasy: {
        handler(val, oldVal) {
          if (val.length > 0 && !oldVal) {
            _.forEach(val, (o) => {
              if (o == 'image') {
                this.limit_origin = _.concat(this.limit_origin, ['png', 'jpg', 'jpeg', 'gif', 'bmp']);
              } else if (o == 'video') {
                this.limit_origin = _.concat(this.limit_origin, ['mp4', 'avi', 'mov', 'wmv', '3gp', 'rmvb']);
              } else if (o == 'text') {
                this.limit_origin = _.concat(this.limit_origin, ['txt', 'doc', 'pdf', 'xls', 'md']);
              }
              this.limit_origin = _.uniq(this.limit_origin);
            });
          }
        },
        immediate: true,
      },

      data: {
        handler(val, oldVal) {
          if (val) {
            this.photoData.setFile = val;
          }
        },
        immediate: true,
      },

      value: {
        handler(val, oldVal) {
          if(Array.isArray(val) && val.length==0) {return}
          if(this.is_upload) {
            this.is_upload = false;
            return;
          }
          if (val && val.length == 0 && this.count == 0) {
            if (oldVal) {
              this.count++;
            }
            return;
          }

          if (val && val.length > 0 && this.count == 0) {
            this.count++;
            this.getPhotoInfoList(_.uniq(val));
            return;
          }
          if (val && val.length > 0 && this.count == 0 && this.disabled) {
            this.count++;
            this.getPhotoInfoList(_.uniq(val));
            return;
          }
        },
        immediate: true
      },
      size: {
        handler(val, oldVal) {
          if (val) {
            if (val.constructor === Object) {
              this.photoData.size.width = parseInt(val.width) + 'px';
              this.photoData.size.height = parseInt(val.height) + 'px';
            } else {
              this.photoData.size.width = val + 'px';
              this.photoData.size.height = val + 'px';
            }
          }
        },
        immediate: true
      },
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        limit_origin: [],
        is_upload:false,//是否在上传
        photoData: {
          keyName: Date.now(),
          setFile: [],
          size: {
            width: '60px',
            height: '60px'
          },
        },
        count: 0,
        oldVal: null,
      }
    },
    mounted() {
      if (this.value && this.value.length > 0) {
        this.getPhotoInfoList(this.value);
      }
    },
    methods: {
      handleSuccess(val) {
        if (val[2]) {
          this.$emit('input', val[1]);
        }
      },
      //是否上传完成
      isUploaded(val) {
        if(val) {
          this.is_upload = true;
        }
      },

      reset() {
        this.photoData.setFile = [];
      },

      getPhotoInfoList(val) {
        let params = {"ids": val};
        this.$http.post(`${globalConfig.upload_sever}api/v1/get_urls`,params).then(res=> {
          if (res.code.endsWith('0')) {
            this.photoData.setFile = res.data;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .disabled {
    pointer-events: none;
  }

  #lj_upload {
    .upload-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .upload-title {
        display: inline-block;
        width: 120px;
        height: 60px;
        line-height: 60px;
      }
    }
  }
</style>
