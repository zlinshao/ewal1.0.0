<template>
  <div id="orgChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <div :title="inputContent" class="input-container">
      <el-input :size="size" :disabled="disabled" @focus="houseModule = true" v-model="inputContent"
                :placeholder="title"></el-input>
    </div>
    <HouseAdress :visible='houseModule' @close="closeHouse" :selectHouseItem='houseItem'></HouseAdress>
  </div>
</template>

<script>
  import _ from 'lodash';
  import HouseAdress from './lightweightComponents/house-community/house.vue';

  export default {
    name: "HouseCommunity",
    props: {
      value: {},
      width: {},
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
    },
    components: {
      HouseAdress
    },
    data() {
      return {
        market_server: globalConfig.market_server,
        houseModule: false,
        inputContent: '',
        dropdownListWidth: 320,
        houseItem: {
          house_id: '',
          house_name: ''
        }, //传给子自组件的房屋信息
      }
    },
    watch: {
      value: {
        handler(val, oldVal) {
          this.houseItem.house_id = val; //获取父组件传过来房屋id
          if (val) {
            let params = {
              type: 1,
              search: val,
              page: 1,
              limit: 999
            };
            this.$http.get(this.market_server + '/v1.0/market/house/searchVH', params).then(res => {
              if (res.code === 200) {
                let houseArr = res.data.data;
                if (houseArr.length > 0) {
                  houseArr.forEach(element => {
                    if (element.house_id == val) {
                      this.inputContent = element.house_name;
                      this.houseItem.house_name = this.inputContent;
                    }
                  });
                }
              }
            })
          } else {
            this.inputContent = '';
            this.houseItem.house_name = this.inputContent;
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
    },
    methods: {
      // 关闭弹框，取消按钮
      closeHouse(val) {
        this.houseModule = false;
        if (val != 'close') {
          if (val.house_id) {
            this.inputContent = val.house_name;
            this.$emit("getHouseIdName", val);
          } else {
            this.inputContent = "";
            this.$emit("getHouseIdName", val);
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  @import "../../assets/scss/common/lightweightComponents/OrgChoose";

  @mixin commonImg($m,$n) {
    $url: '../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }


  .organization {
    @include commonImg('zuzhijiagou.png', 'theme1');
  }
</style>
