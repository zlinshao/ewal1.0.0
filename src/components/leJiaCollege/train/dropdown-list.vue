<template>
  <div id="drop_down_list" :style="{width:`${this.dropdownListWidth}px`}">
    <el-select
      :size="size"
      :disabled="disabled"
      :popper-class="'appTheme' + themeName"
      :value="dropdown_code" @input="handleInputEvent" clearable :placeholder="title"
      @change="changeSelection">
      <el-option v-for="item in dropdown_list"
                 :key="item.value"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import storage from '../../../utils/storage';

  export default {
    name: "dropdown-list",
    props: {
      value: [Number, String],
      width: [Number, String],//宽度
      code: [String, Number],
      title: String,
      url: [String],  //请求地址
      params: [Object, String],
      arr: [Object, Array],
      jsonArr: [Object, Array],
      disabled: [Boolean],
      size: {//medium / small / mini
        type: [String],
        default: '',
      },//高度
      root: {//接口返回数据data层级   //默认2级
        type: [String, Number],
        default: 2,
      },
      cache: {//是否缓存
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        //url: globalConfig.humanResource_server,
        dropdown_code: '',
        dropdown_list: [],
        dropdownListWidth: 320
      }
    },
    watch: {
      value: {
        handler(val, oldVal) {
          if (val === '') {
            this.dropdown_code = '';
            return;
          }
          this.dropdown_code = Number(this.value)||'';
          /*if (this.arr) {
            this.dropdown_code = Number(this.value);
          } else {
            this.dropdown_code = Number(this.value) || '';
          }*/
        },
        immediate: true//第一次绑定也执行
      },
      width: {
        handler(val, oldVal) {
          if (val) {
            this.dropdownListWidth = val;
          }
        },
        immediate: true//第一次绑定也执行
      },
      height: {
        handler(val, oldVal) {
          if (val) {

          }
        },
        immediate: true,
      },

    },
    computed: {
      themeName() {
        return this.$store.state.app.themeName;
      }
    },
    methods: {
      //双向绑定
      handleInputEvent(value) {
        this.dropdown_code = value;
        this.$emit('input', value); //触发 input 事件，并传入新值
      },
      changeSelection(val) {
        this.$emit('change-selection', val);
      },
      getQueryParams() {
        let queryParams;
        if (this.code) {
          queryParams = {'type': this.code};
        } else if (this.params) {
          queryParams = this.params;
        } else {
          queryParams = {};
        }
        return queryParams;
      },
      request(queryParams) {
        this.$http.get(this.url, queryParams).then((res) => {
          if (res.status == 200) {
            this.dropdown_list = res.data.data;
            if(this.cache) {
              let keys = this.url + JSON.stringify(queryParams);
              storage.set(keys, this.dropdown_list);
            }

          } else {
            console.log("获取类型失败");
          }
        });
      },
      getDropdownList() {
        if (this.arr) {
          let myArr = [];
          this.arr.forEach((item, index) => {
            let myItem = {
              id: index,
              name: item
            }
            myArr.push(myItem);
          })
          this.dropdown_list = myArr;

        }
        else if (this.jsonArr) {
          this.dropdown_list = this.jsonArr;
        }
        else {
          //this.$http.get(`${this.url}eam/category`,
          let queryParams = this.getQueryParams();
          let keys = this.url + (JSON.stringify(queryParams) == '{}' ? '' : JSON.stringify(queryParams));
          let caches = storage.get(keys);
          if (caches) {
            this.dropdown_list = caches;
          } else {
            this.request(queryParams);
          }
        }

      },
      //更新状态
      update() {
        let queryParams = this.getQueryParams();
        this.request(queryParams);
      }
    },
    mounted() {
      this.getDropdownList();
    }
  }
</script>

<style scoped lang="scss">
  #drop_down_list {
    display: inline-block;
  }
</style>
