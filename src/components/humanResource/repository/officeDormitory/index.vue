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
    </div>
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="currentPage" :page-size="10"></el-pagination>
      </div>
    </footer>
    
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload.vue';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  export default {
    name: "index",
    components: {
      LjDialog,
      LjUpload,
      UserChoose
    },
    data() {
      return {
        activeName: 0,
        active: [
          {id: 0, val: '办公室管理'},
          {id: 1, val: '宿舍管理'}
        ],
        currentPage: 1,
        total: 20,
      }
    },
    mounted(){
    },
    methods: {
      changeTab: function (index) {
        this.activeName = index
      },
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
