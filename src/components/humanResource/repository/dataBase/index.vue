<template>
  <div id="dataBase">
    <div class="main-nav">
      <span
        v-for="(item,index) in active"
        :key="index"
        :class="{'isActive': item.id === activeName}"
        @click="changeTab(index)"
      >{{item.val}}</span>
    </div>
    <div class="dataBase-container">
      <el-table 
              :data="areaChangeOrder"
              v-if="activeName === 0"
              highlight-current-row
              header-row-class-name="tableHeader"
              style="width: 100%">
          <el-table-column label="审批编号" align="center"></el-table-column>
          <el-table-column label="审批名称" align="center"></el-table-column>
          <el-table-column label="上传时间" align="center"></el-table-column>
          <el-table-column label="申请人" align="center"></el-table-column>
          <el-table-column label="所属部门" align="center"></el-table-column>
          <el-table-column label="接收人" align="center"></el-table-column>
          <el-table-column label="证明人" align="center"></el-table-column>
          <el-table-column label="电子资料" align="center"></el-table-column>
      </el-table>
      <el-table
              v-if="activeName === 1"
              highlight-current-row
              header-row-class-name="tableHeader"
              style="width: 100%"
              :data="contractList">
          <el-table-column prop="process_id" label="审批编号" align="center"></el-table-column>
          <el-table-column prop="title" label="采购申请" align="center"></el-table-column>
          <el-table-column prop="source" label="供应商" align="center"></el-table-column>
          <el-table-column prop="start_time" label="签订时间" align="center"></el-table-column>
          <el-table-column prop="end_time" label="合同到期时间" align="center"></el-table-column>
          <el-table-column prop="signUser" label="签订人" align="center"></el-table-column>
          <el-table-column prop="department" label="所属部门" align="center"></el-table-column>
          <el-table-column prop="electronicData" label="电子资料" align="center"></el-table-column>
      </el-table>
    </div>
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        areaChangeOrder: [],
        url: globalConfig.humanResource_server,
        activeName: 0,
        active: [
          {id: 0, val: '片区异动交接单'},
          {id: 1, val: '采购合同'}
        ],
        contractList: []
      }
    },
    mounted(){
      this.getAreaChangeOrder();
    },
    methods: {
      changeTab: function (index) {
        this.activeName = index
        if(index ===0) {
          this.getAreaChangeOrder()
        } else{
          this.getContractList()
        }
      },
      getAreaChangeOrder: function() {
        
      },
      getContractList: function() {
        this.contractList = []
        this.$http.get(`${this.url}eam/contract`).then(res => {
          if(res.code === '20000'){
            for(var i = 0; i < res.data.data.length; i++){
              let department = ''
              for(var j = 0; j < res.data.data[i].user.org.length; j++){
                department = department + res.data.data[i].user.org[j].name + '-'
              }
              let obj = {
                process_id: res.data.data[i].process_id,
                title: res.data.data[i].title,
                source: res.data.data[i].source.name,
                start_time: res.data.data[i].start_time,
                end_time: res.data.data[i].end_time,
                signUser: res.data.data[i].user.name,
                department: department.substring(0,department.length-1),
                electronicData: res.data.data[i].attachment
              }
              this.contractList.push(obj)
            }
          }
        })
      }
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
