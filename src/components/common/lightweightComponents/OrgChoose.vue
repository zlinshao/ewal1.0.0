<template>
  <div id="orgChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div :title="inputContent" class="input-container">
      <el-input :size="size" :disabled="disabled" readonly @focus="departModule = true" v-model="inputContent"
                :placeholder="title"></el-input>
      <p v-if="showIcon" class="icons organization"></p>
    </div>

    <DepartOrgan :initial="initial_value" :module="departModule" :organ-data="organData"
                 @close="hiddenOrgan"></DepartOrgan>
  </div>
</template>

<script>
  import _ from 'lodash';
  import DepartOrgan from './origin/departOrgan';

  export default {
    name: "OrgChoose",
    //props: ['value', 'width', 'num', 'title'],
    props: {
      value: {},
      width: {},
      num: {},
      title: {},
      size: {
        default() {
          return null;
        }
      },
      disabled: {
        default() {
          return false;
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
      DepartOrgan
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        departModule: false,
        organData: {
          num: Infinity,
        },// 组织架构配置 选择数量 num
        inputContent: '',
        org_name: [],
        dropdownListWidth: 320,
        initial_value: null,
      }
    },
    watch: {
      value: {
        handler(val, oldVal) {
          this.initial_value = val;
          if (val && !Array.isArray(val)) {
            val = [val];
          }
          if (val && val.constructor === Array && val.length > 0) {
            let params = {
              org_id: val,
              is_enable: 1,
            };
            this.$http.get(`${this.url}organization/organization`, params).then(res => {
              if (res.data) {
                this.org_name = _.map(res.data.data, 'name');
                this.inputContent = this.org_name.join(',');
              }
            });
          } else {
            this.org_name = [];
            this.inputContent = '';
          }
        },
        immediate: true,
      },
      initial_value: {
        handler(val, oldVal) {
          if (val && !Array.isArray(val)) {
            this.initial_value = [val];
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
          } else {
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
          if (ids.length == 1 && this.dataType == 'int') {
            ids = ids[0];
          }
          this.$emit('input', ids);
        }
      },
    }
  }
</script>

<style scoped lang="scss">

  @import "../../../assets/scss/common/lightweightComponents/OrgChoose";

  @mixin commonImg($m,$n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }


  .organization {
    @include commonImg('zuzhijiagou.png', 'theme1');
  }
</style>
