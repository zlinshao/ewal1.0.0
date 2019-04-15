<template>
  <div id="orgChoose"  :style="{width:`${this.dropdownListWidth}px`}">
    <div class="input-container">
      <el-input @focus="departModule = true" v-model="inputContent" :placeholder="title"></el-input>
      <p class="icons organization"></p>
    </div>

    <DepartOrgan :module="departModule" :organ-data="organData" @close="hiddenOrgan"></DepartOrgan>
  </div>
</template>

<script>
  import DepartOrgan from '../departOrgan';

  export default {
    name: "OrgChoose",
    props: ['value', 'width', 'num','title'],
    components: {
      DepartOrgan
    },
    data() {
      return {
        departModule: false,
        organData: {
          //num:1,
        },// 组织架构配置 选择数量 num
        inputContent: '',
        dropdownListWidth: 320
      }
    },
    watch: {
      width: {
        handler(val, oldVal) {
          if (val) {
            this.dropdownListWidth = val;
          }
        },
        immediate: true//第一次绑定也执行
      },
      num: {
        handler(val, oldVal) {
          if (val) {
            this.organData.num = parseInt(val);
          }
        },
        immediate: true//第一次绑定也执行
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
