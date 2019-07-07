<template>
  <div id="goodStaff" class="scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
    <h1 class="flex-center"><span>优秀员工大赏</span></h1>
    <div class="goodStaff-lists">
      <div class="goodStaff-lists-info" v-for="(item,index) in goodStaffData">
        <div class="goodStaff-box">
          <div>
            <!--<img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">-->
            <img :src="item.star_id?item.star_id.avatar:''">
          </div>
          <p>
            <span >{{item.star_id?item.star_id.org[0].name: ''}}</span>
            <span>{{item.star_id?item.star_id.name: ''}}</span>
          </p>
        </div>
      </div>
    </div>
    <!--分页-->
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="count" layout="total,jumper,prev,pager,next" :current-page="params.offset" :page-size="params.limit"
          @current-change="handleChangePage">
        </el-pagination>
      </div>
    </footer>

  </div>
</template>
<script>
export default {
  name: "goodStaff",
  data () {
    return {
      goodStaffData: [],
      params: {
        offset: 1,
        limit: 8,
      },
      count: 0,
    }
  },
  mounted () {
    this.getDataLists();
  },
  methods: {
    handleChangePage (page) {
      this.params.offset = page;
      this.getDataLists();
    },
    getDataLists () {
      this.$http.get(globalConfig.newMedia_sever + '/api/humanity/excellent', this.params).then(res => {
        if (res.status === 200) {
          this.goodStaffData = res.data.data;
          console.log(res);
          this.count = res.data.total;
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/newMedia/front/humanity/components/goodStaff.scss";
@mixin goodStaffImg($n, $m) {
  $url: "../../../../../assets/image/newMedia/" + $n + "/" + $m;
  @include bgImage($url);
}
#theme_name.theme1 {
  #goodStaff {
    @include goodStaffImg("theme1", "background_2.png");
    > h1 {
      @include goodStaffImg("theme1", "yxyg_dashang.png");
    }
    .goodStaff-lists {
      .goodStaff-lists-info {
        .goodStaff-box {
          > div {
            @include goodStaffImg("theme1", "youxiu_grey.png");
            &:hover {
              @include goodStaffImg("theme1", "youxiu_red.png");
            }
          }
          img {
          }
        }
      }
    }
  }
}
</style>