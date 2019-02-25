<template>
  <div id="staffRoster">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>员工名册</h1>
      </div>
      <div class="items-center listTopRight">
        <div class="searchTerm">
          <b>部门/人员</b>
          <el-select v-model="value" clearable :popper-class="`appTheme${themeName}`">
            <el-option
              :class="`el-option-${themeName}`"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="searchTerm">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="1">离职员工</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="buttons">设置报表</div>
        <div class="buttons">导出报表</div>
        <!--<div class="icons add"><b>+</b></div>-->
        <!--<div class="icons search" @click="highSearch"></div>-->
      </div>
    </div>
    <div>
      <div class="page">
        <el-pagination
          :total="100"
          layout="total,jumper,prev,pager,next">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        checkList: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      themeName() {
        return this.$store.state.app.themeName;
      }
    },
    methods: {
      moduleList() {

      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/staffRoster/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../assets/image/humanResource/staffRoster/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffRoster {

    }
  }

  #theme_name.theme2 {
    #staffRoster {

    }
  }

  #theme_name.theme3 {
    #staffRoster {

    }
  }

  #theme_name.theme4 {
    #staffRoster {

    }
  }
</style>
