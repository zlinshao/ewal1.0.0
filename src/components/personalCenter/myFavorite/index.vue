<template>
  <div id="my_favorite">
    <div class="favorite-container">
      <div class="favorite-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-left-static">我的收藏</span>
          <span class="toolbar-left-dynamic">共{{total}}个内容</span>
        </div>
        <div class="toolbar-right">
          <search-bar placeholder="搜索姓名/岗位" v-model="searchValue"></search-bar>
        </div>
      </div>
      <div class="favorite-table">

        <div class="favorite-table-list">
          <div :key="index" v-for="(item,index) in favoriteList" class="favorite-table-item">
            <div class="item-upper">
              <div title="详情" @click="routerLink('/newsDetail',{id:item.id})" class="item-upper-photo">
                <img v-if="item.cover && item.cover.length>0" :src="item.cover[0].uri">
                <img v-else :src="favoriteImg[Math.ceil(Math.random()*3)]">
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
                <img v-if="item.user_id.avatar" :src="item.user_id.avatar">
                <img v-else src="../../../assets/image/no_avatar.png">
                <span>{{item.user_id.name}}</span>
              </div>
              <div class="item-lower-right">
                {{item.created_at.split(" ")[0]}}
              </div>
            </div>
          </div>
        </div>

        <div class="favorite-table-pagination flex-center common-page">
          <div class="page">
            <el-pagination :current-page.sync="currentPage" :page-size="10" :total="total" layout="total,jumper,prev,pager,next">
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
  data () {
    return {
      url: globalConfig.favorite,
      searchValue: '',
      currentPage: 1,
      total: 0,
      favoriteList: [],
      favoriteImg:{
        1:require('./img/favorite1.png'),
        2:require('./img/favorite2.png'),
        3:require('./img/favorite3.png'),
      },//我收藏的默认图片
    }
  },
  watch: {
    currentPage () {
      this.getFavoriteList();
    }
  },
  mounted () {
    this.getFavoriteList();
  },
  methods: {
    getFavoriteList () {
      let param = {
        offset: this.currentPage,
        limit: 10
      }
      this.$LjLoading({el:'.favorite-table',loading:true});
      this.$http.post(`${this.url}api/article/collect/userCollect`, param).then(res => {
        this.$LjLoading({el:'.favorite-table',loading:false});
        if (res.status === 200) {
          this.total = res.data.total
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
  $url: "../../../assets/image/personalCenter/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #my_favorite {
    .favorite-container {
      .icon-response {
        @include personalCenterImg("pinglun.png", "theme1");
      }
      .icon-view {
        @include personalCenterImg("yikan.png", "theme1");
      }
      .icon-like {
        @include personalCenterImg("zan.png", "theme1");
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
