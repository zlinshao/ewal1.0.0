<template>
  <div id="search_bar" :style="{width:width+'px'}">
    <!--<el-input
      :size="size"
      :placeholder="placeholder"
      prefix-icon="el-icon-search"
      v-model="searchValue">
    </el-input>-->

    <i class="el-icon-search"></i>
    <input
      v-model="searchValue"
      @keydown.enter="triggerKeydownEnter"
      :placeholder="placeholder" type="text"/>
  </div>
</template>

<script>
  export default {
    name: "search-bar",
    props: {
      value: {
        required: true,
      },
      size: {
        default: 'mini'
      },
      placeholder: {
        default:'请输入搜索项',
      },
      width: {
        default:300,
      },
    },
    watch: {
      /*value: {
        handler(val,oldVal) {
          this.searchValue = val;
        },
        immediate: true,
      },*/
      searchValue: {
        handler(val,oldVal) {
          this.$emit('input',val);
        },
        //immediate:true,
      },
    },
    data() {
      return {
        searchValue: '',
      }
    },
    computed() {
      this.searchValue = this.value;
    },
    methods :{
      triggerKeydownEnter() {
        this.$emit('enter');
      }
    },

  }
</script>

<style lang="scss">
  #search_bar {
    .el-input__inner {
      //border: none !important;
    }
  }
</style>


<style scoped lang="scss">
  #theme_name {
    #search_bar {
      display: inline-block;
      position: relative;
      background-color: white;
      //border-radius: 6px !important;
      //overflow: hidden;
      .el-icon-search {
        position: absolute;
        top: 7px;
        left: 10px;
      }
      input {
        border: 1px solid #ccc;
        border-radius:20px;
        //width: 220px;
        height: 28px;
        padding: 2px 12px 2px 32px;
      }
    }
  }

  #theme_name.theme1 {
    #search_bar {

    }
  }

  #theme_name.theme2 {
    #search_bar {

    }
  }

  #theme_name.theme3 {
    #search_bar {

    }
  }

  #theme_name.theme4 {
    #search_bar {

    }
  }

</style>
