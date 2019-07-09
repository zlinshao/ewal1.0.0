<template>
  <div id="postChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div :title="inputContent" class="input-container">
      <el-input :size="size" :disabled="disabled" readonly @focus="departModule = true" v-model="inputContent" :placeholder="title"></el-input>
      <p v-if="showIcon" class="icons position"></p>
    </div>

    <PostOrgan :initial="initial_value" :module="departModule" :organ-data="organData" @close="hiddenOrgan"></PostOrgan>
  </div>
</template>

<script>
  import _ from 'lodash';
  import PostOrgan from './origin/postOrgan';

  export default {
    name: "postChoose",
    //props: ['value', 'width', 'num', 'title','showIcon'],
    props:{
      value:{},
      width:{},
      num:{},
      title:{},
      disabled: {},
      size: {
        default() {
          return null;
        }
      },
      showIcon: {
        default() {
          return true;
        }
      },
      dataType: {
        default: 'array',
      },
    },
    components: {
      PostOrgan
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        departModule: false,
        organData: {
          num:Infinity,
        },// 组织架构配置 选择数量 num
        inputContent: '',
        post_name:[],
        dropdownListWidth: 320,
        initial_value: null,
      }
    },
    watch: {
      value: {
        handler(val, oldVal) {
          this.initial_value = val;
          if(val && !Array.isArray(val)) {
            val = [val];
          }
          if (val && val.constructor === Array && val.length > 0) {
            let params = {
              id:val
            };
            this.$http.get(`${this.url}organization/position`,params).then(res=> {
              if(res.code.endsWith('0')) {
                this.post_name = _.map(res.data.data,'name');
                this.inputContent = this.post_name.join(',');
              }else {
                this.post_name = [];
                this.inputContent = '';
              }

            });
          }else{
            this.post_name = [];
            this.inputContent = '';
          }
        },
        immediate: true,
      },
      initial_value: {
        handler(val,oldVal) {
          if(val && !Array.isArray(val)) {
            this.initial_value = [val];
          }
        },
        immediate:true,
      },
      width: {
        handler(val, oldVal) {
          if (val) {
            this.dropdownListWidth = val;
          }
        },
        immediate: true
      },
      num: {
        handler(val, oldVal) {
          if (val) {
            this.organData.num = parseInt(val);
          }else {
            this.organData.num = Infinity;
          }
        },
        immediate: true
      }
    },
    methods: {
      // 关闭 选择人员
      hiddenOrgan(ids, names, arr) {
        this.departModule = false;
        if (ids !== 'close') {
          this.inputContent = names;
          if(ids.length == 1 && this.dataType =='int') {
            ids = ids[0];
          }
          this.$emit('input', ids);
        }
      },
    }
  }
</script>

<style scoped lang="scss">

  @import "../../../assets/scss/common/lightweightComponents/PostChoose";

  @mixin commonImg($m,$n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }


  .position {
    @include commonImg('zhiwei.png', 'theme1');
  }
</style>
