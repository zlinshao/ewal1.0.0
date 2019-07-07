<template>
  <div id="userChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div :title="inputContent" class="input-container">
      <el-input :size="size" :disabled="disabled" @focus="staffModule = true" readonly v-model="inputContent"
                :placeholder="title"></el-input>
      <p v-if="showIcon" class="icons user"></p>
    </div>


    <StaffOrgan :initial="value" :module="staffModule" :is_on_job="is_on_job" :organ-data="organData"
                @close="hiddenOrgan"></StaffOrgan>
  </div>
</template>

<script>
  import StaffOrgan from './origin/staffOrgan';
  import storage from '../../../utils/storage';

  export default {
    name: "UserChoose",
    //props: ['value', 'width', 'num', 'title', 'disabled'],
    props: {
      value: {},
      width: {},
      num: {},
      is_on_job: {},
      title: {},
      disabled: {},
      size: {
        default: '',
      },
      showIcon: {
        default() {
          return true;
        }
      },
    },
    components: {
      StaffOrgan
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        staffModule: false,
        // is_on_job: '',
        organData: {
          num: Infinity,
        },// 组织架构配置 选择数量 num
        inputContent: '',
        user_name: [],
        dropdownListWidth: 320
      }
    },
    watch: {
      value: {
        async handler(val, oldVal) {
          if (val && val.constructor === Array && val.length > 0) {
            let params = {
              limit: 1000,
              user_id: val,
              staff: 1,
            };
            await this.$http.get(`${this.url}staff/user`, params).then(res => {
              this.user_name = _.map(res.data?.data, 'name');
              this.inputContent = this.user_name.join(',');
            });
          } else {
            this.user_name = [];
            this.inputContent = '';
          }
          this.$emit('user-choose-name', this.user_name)
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
      },
    },
    methods: {
      // 关闭 选择部门
      hiddenOrgan(ids, names, arr) {
        this.staffModule = false;
        if (ids !== 'close') {
          this.inputContent = names;
          this.$emit('input', ids);
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common/lightweightComponents/UserChoose";

  @mixin commonImg($m,$n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }


  .user {
    @include commonImg('yonghu.png', 'theme1');
  }
</style>
