<template>
  <div id="my_favorite">
    <div class="favorite-container">
      <div class="favorite-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-left-static">我的收藏</span>
          <span class="toolbar-left-dynamic">共{{total}}个内容</span>
        </div>
        <div class="toolbar-right">
          <search-bar placeholder="搜索姓名/岗位/时间" v-model="searchValue"></search-bar>
        </div>
      </div>
      <div class="favorite-table">

        <div class="favorite-table-list">
          <div :key="index" v-for="(item,index) in favoriteList" class="favorite-table-item">
            <div class="item-upper">
              <div class="item-upper-photo">
                <img :src="item.cover[0].uri">
              </div>
              <div class="item-upper-content">
                <div>{{item.title}}</div>
              </div>
              <div class="item-upper-operate">
                <div class="item-response">
                  <i class="icon-response"></i>
                  <span>{{item.comment_number}}</span>
                </div>
                <div class="item-view">
                  <i class="icon-view"></i>
                  <span>{{item.status? item.status.read_people : 0}}</span>
                </div>
                <div class="item-like">
                  <i class="icon-like"></i>
                  <span>{{item.thumbs_up_number}}</span>
                </div>
              </div>
            </div>
            <div class="item-lower">
              <div class="item-lower-left">
                <img :src="item.user_id.avatar">
              </div>
              <div class="item-lower-right">
                {{item.created_at.split(" ")[0]}}
              </div>
            </div>
          </div>
        </div>

        <div class="favorite-table-pagination flex-center common-page">
          <div class="page">
            <el-pagination
              :current-page="currentPage"
              :page-size="10"
              :total="total"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import SearchBar from '@/components/common/lightweightComponents/SearchBar';

  export default {
    name: "myFavorite",
    components: {
      SearchBar,
    },
    data() {
      return {
        url: globalConfig.favorite,
        searchValue: '',
        currentPage: 1,
        total: 20,
        favoriteList: [],
      }
    },
    watch: {
      currentPage(){
        this.getFavoriteList();
      }
    },
    mounted(){
      this.getFavoriteList();
    },
    methods: {
      getFavoriteList: function () {
        let param = {
          offset: this.currentPage,
          limit: 10
        }
        this.$http.post(`${this.url}api/article/collect/userCollect`,param).then(res => {
          console.log(res)
          if (res.status=== 200) { 
            this.total = res.data.data.total
            for (let i = 0; i < res.data.data.length; i++) {
              this.favoriteList.push(res.data.data[i])
            }
          }
        })
      }
    },
  }
</script>


<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myFavorite/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #my_favorite {
      .favorite-container {
        .icon-response {
          @include personalCenterImg('pinglun.png', 'theme1');
        }
        .icon-view {
          @include personalCenterImg('yikan.png', 'theme1');
        }
        .icon-like {
          @include personalCenterImg('zan.png', 'theme1');
        }
      }
    }
  }

  #theme_name.theme2 {
    #my_favorite {

    }
  }

  #theme_name.theme3 {
    #my_favorite {

    }
  }

  #theme_name.theme4 {
    #my_favorite {

    }
  }


</style>
