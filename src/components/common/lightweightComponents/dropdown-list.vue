<template>
  <div id="drop_down_list" :style="{width:`${this.dropdownListWidth}px`}">
    <el-select
      :popper-class="'appTheme' + themeName"
      :value="dropdown_code" @input="handleInputEvent" clearable :placeholder="title"
               @change="changeSelection">
      <el-option v-for="item in dropdown_list"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "dropdown-list",
    props: {
      value: [Number, String],
      width: [Number, String],//宽度
      code: [String, Number],
      title: String,
      url: [String]  //请求地址
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
          this.dropdown_code = Number(this.value) || '';
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
      getDropdownList() {
        //debugger
        //this.$http.get(`${this.url}eam/category`,
        this.$http.get(this.url,
          {
            'type': this.code
          }).then((res) => {
          if (res.code == "20000") {
            this.dropdown_list = res.data.data;
          } else {
            console.log("获取类型失败");
          }
        });
      },
      //更新状态
      update() {
        this.getDropdownList();
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
