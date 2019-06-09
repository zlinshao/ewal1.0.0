<template>
  <div id="postChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div :title="inputContent" class="input-container">
      <el-input :size="size" :disabled="disabled" @focus="departModule = true" v-model="inputContent" :placeholder="title"></el-input>
      <p v-if="showIcon" class="icons position"></p>
    </div>

    <PostOrgan :initial="value" :module="departModule" :organ-data="organData" @close="hiddenOrgan"></PostOrgan>
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
      }
    },
    components: {
      PostOrgan
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        departModule: false,
        organData: {
          //num:1,
        },// 组织架构配置 选择数量 num
        inputContent: '',
        dropdownListWidth: 320
      }
    },
    watch: {
      value: {
        handler(val, oldVal) {
          if (val && val.length > 0) {
            let params = {
              id:val
            };
            this.$http.get(`${this.url}organization/position`,params).then(res=> {
              if(res.code.endsWith('0')) {
                this.inputContent = _.map(res.data.data,'name').join(',');
              }else {
                this.inputContent = '';
              }

            });
          }else{
            this.inputContent = '';
          }
        },
        immediate: true,
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
