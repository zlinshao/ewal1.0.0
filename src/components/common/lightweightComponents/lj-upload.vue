<template>
  <div id="lj_upload">
    <div class="upload-container">
      <span v-if="title" class="upload-title">{{title}}</span>
      <upload :file="photoData" @success="handleSuccess"></upload>
    </div>
  </div>
</template>

<script>
  import Upload from '../upload';
  export default {
    name: "lj-upload",
    props: ['title','value','size'],
    components: {
      Upload
    },
    watch: {
      value: {
        handler(val,oldVal) {
          //debugger
          //this.getPhotoInfoList(val);
          //console.log(val);
        },
        immediate: true
      },
      size: {
        handler(val,oldVal) {
          if(val) {
            this.photoData.size.width = val+'px';
            this.photoData.size.height = val+'px';
          }

        },
        immediate: true
      },
      /*width: {
        handler(val,oldVal) {
          this.photoData.size.width = `${val}px`;
          this.photoData.size.height = `${val}px`;
        },
        immediate: true
      },
      height: {
        handler(val,oldVal) {
          this.photoData.size.width = `${val}px`;
          this.photoData.size.height = `${val}px`;
        },
        immediate: true
      },*/
    },
    data() {
      return {
        url:globalConfig.humanResource_server,
        photoData: {
          keyName: Date.now(),
          setFile: [],
          size: {
            width: '60px',
            height: '60px'
          }
        }
      }
    },
    mounted() {
      if(this.value) {
        this.getPhotoInfoList(this.value);
      }

    },
    methods: {
      handleSuccess(val) {
        //debugger
        if(val[2]) {
          this.$emit('input',val[1]);
        }
        //console.log(val);
      },

      getPhotoInfoList(val) {
        let params = {"id":val};
        this.$http.post(`${this.url}public/pic`,params).then(res=> {
          //debugger
          if(res.code.endsWith('0')) {
            this.photoData.setFile = res.data;
          }
        }).catch();
      }
    }
  }
</script>

<style scoped lang="scss">
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
