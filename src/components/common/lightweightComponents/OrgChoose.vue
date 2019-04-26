<template>
  <div id="orgChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div class="input-container">
      <el-input :title="inputContent" @focus="departModule = true" v-model="inputContent" :placeholder="title"></el-input>
      <p class="icons organization"></p>
    </div>

    <DepartOrgan :initial="value" :module="departModule" :organ-data="organData" @close="hiddenOrgan"></DepartOrgan>
  </div>
</template>

<script>
  import _ from 'lodash';
  import DepartOrgan from './origin/departOrgan';

  export default {
    name: "OrgChoose",
    props: ['value', 'width', 'num', 'title'],
    components: {
      DepartOrgan
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
              org_id:val
            };
            this.$http.get(`${this.url}organization/organization`,params).then(res=> {
              this.inputContent = _.map(res.data.data,'name').join(',');
            });
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

  @import "../../../assets/scss/common/lightweightComponents/OrgChoose";

  @mixin commonImg($m,$n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }


  .organization {
    @include commonImg('zuzhijiagou.png', 'theme1');
  }
</style>
