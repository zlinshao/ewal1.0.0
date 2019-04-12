<template>
  <div id="dataBase">
    <div class="main-nav">
      <span
        v-for="(item,index) in active"
        :key="index"
        :class="{'isActive': item.id === activeName}"
        @click="activeName = index"
      >{{item.val}}</span>
    </div>
    <div style="background-color: white;" class="salary-container">
      <el-table v-if="activeName === 0">
          <el-table-column label="审批编号" align="center"></el-table-column>
          <el-table-column label="审批名称" align="center"></el-table-column>
          <el-table-column label="上传时间" align="center"></el-table-column>
          <el-table-column label="申请人" align="center"></el-table-column>
          <el-table-column label="所属部门" align="center"></el-table-column>
          <el-table-column label="接收人" align="center"></el-table-column>
          <el-table-column label="证明人" align="center"></el-table-column>
          <el-table-column label="电子资料" align="center"></el-table-column>
      </el-table >
      <el-table  v-if="activeName === 1">
          <el-table-column label="物品名称" align="center"></el-table-column>
          <el-table-column label="品牌" align="center"></el-table-column>
          <el-table-column label="供应商" align="center"></el-table-column>
          <el-table-column label="签订时间" align="center"></el-table-column>
          <el-table-column label="合同到期时间" align="center"></el-table-column>
          <el-table-column label="签订人" align="center"></el-table-column>
          <el-table-column label="所属部门" align="center"></el-table-column>
          <el-table-column label="电子资料" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        activeName: 0,
        active: [
          {id: 0, val: '片区异动交接单'},
          {id: 1, val: '采购合同'}
        ]
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/repository/dataBase/index.scss";

  @mixin childrenImg($m,$n) {
    $url: '../../../../assets/image/humanResource/repository/dataBase/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1{
    #dataBase {
      .main-nav {
        .isActive {
          @include childrenImg('teji.png', 'theme1');
          color: white;
        }
      }
    }
  }

  #theme_name.theme2 { 
    #dataBase {

    }
  }

  #theme_name.theme3 {
    #dataBase {

    }
  }

  #theme_name.theme4 {
    #dataBase {

    }
  }
</style>
