<template>
  <!--<div :class="{'disabled':disabled}" id="lj_upload">-->
  <div id="lj_upload">
    <div class="upload-container">
      <span v-if="title" class="upload-title">{{title}}</span>
      <upload :max-size="maxSize" :download="download" show :disabled="disabled" :file="photoData" @success="handleSuccess"></upload>
    </div>
  </div>
</template>

<script>
  import Upload from './origin/upload';

  export default {
    name: "lj-upload",
    //props: ['title', 'value', 'size', 'data', 'disabled'],
    props: {
      title:{},
      value:{},
      size:{},
      data:{},
      disabled:{
        default:false,
      },
      download: {
        default: true
      },
      maxSize:{
        type: Number,
      },
    },
    components: {
      Upload
    },
    watch: {
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
          if (val && !oldVal && this.count == 0) {
            this.count++;
            this.getPhotoInfoList(val);
          }
        },
        immediate: true
      },
      size: {
        handler(val, oldVal) {
          if (val) {
            this.photoData.size.width = val + 'px';
            this.photoData.size.height = val + 'px';
          }
        },
        immediate: true
      },
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        photoData: {
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

      getPhotoInfoList(val) {
        let params = {"id": val};
        this.$http.post(`${this.url}public/pic`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.photoData.setFile = res.data;
          }
        }).catch();
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
