<template>
  <div id="userChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div :title="inputContent" class="input-container">
      <el-input :size="size" :disabled="disabled" @focus="staffModule = true" v-model="inputContent" :placeholder="title"></el-input>
      <p class="icons user"></p>
    </div>


    <StaffOrgan :initial="value" :module="staffModule" :organ-data="organData" @close="hiddenOrgan"></StaffOrgan>
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
      title:{},
      disabled: {},
      size: {
        default:'',
      },
    },
    components: {
      StaffOrgan
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        staffModule: false,
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
              limit:1000,
              user_id:val,
              staff:1,
            };
            this.$http.get(`${this.url}staff/user`,params).then(res=> {
              this.inputContent = _.map(res.data?.data,'name').join(',');
            });
          }
        },
        immediate: true,
      },


      /*value: {
        handler(val, oldVal) {
          if (val) {
            if (val.constructor == Array) {
              return;
            }
            let username = storage.get(`user-id${val}`);
            if (username) {
              this.inputContent = username;
              return;
            }
            this.$http.get(`${this.url}/staff/user/${val}`).then(res => {
              if (res.code.endsWith('0')) {
                this.inputContent = res.data.name;
                storage.set(`user-id${val}`, res.data.name);
              }
            });
          }
        },
        immediate: true//第一次绑定也执行
      },*/
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
