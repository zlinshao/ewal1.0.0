<template>
  <div id="my_response">
    <div class="response-container">
      <div class="response-toolbar">
        <div class="toolbar-left">
          <div class="toolbar-left-upper">
            <span :class="choosedTab == index? 'checked' : ''" v-for="(item, index) in changeTab" :key="index" @click="chooseTab(index)">{{item.title}}</span>
          </div>
        </div>
        <div class="toolbar-right">
          <search-bar placeholder="搜索姓名/岗位" v-model="searchValue"></search-bar>
        </div>
      </div>
      <div class="response-table">
        <div class="response-table-list">
          <div class="response-table-item" v-for="(item, index) in messageList" :key="index">
            <div class="table-item-container">
              <div class="item-upper">
                <div class="item-upper-left">
                  <img v-if="item.article.user_id.avatar" :src="item.article.user_id.avatar">
                  <img v-else src="../../../assets/image/no_avatar.png">
                </div>
                <div class="item-upper-right">
                  <div class="upper-right-info">
                    <span>{{item.article.user_id.name}}</span>
                    <span>{{item.article.created_at.split(' ')[0]}}</span>
                  </div>
                  <div class="upper-right-comment">
                    {{item.article.title}}
                  </div>
                </div>
              </div>
              <div class="item-lower">
                <div class="lower-content">
                  <div class="lower-content-container">
                    <div class="content-username">{{item.user_id.staff.real_name}}</div>
                    <div class="content-detail">
                      {{item.content}}
                    </div>
                  </div>
                </div>
                <div class="lower-operate">
                  <div class="item-view">
                    <i class="icon-response"></i>
                    <span>{{item.article.comment_number}}</span>
                  </div>
                  <div class="item-like">
                    <i class="icon-like"></i>
                    <span>{{item.thumbs_up_number? item.thumbs_up_number: 0}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page flex-center common-page">
        <el-pagination :current-page="currentPage" :page-size="4" :total="total" layout="total,jumper,prev,pager,next">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/common/lightweightComponents/SearchBar';

export default {
  name: "workLog",
  components: {
    SearchBar,
  },
  data () {
    return {
      url: globalConfig.newMedia_sever,
      changeTab: [{ id: 0, title: '收到的回复' }, { id: 1, title: '发出的评论' }],
      choosedTab: 0,
      currentPage: 1,
      total: 1,
      searchValue: '',
      params: {
        page: 1,
        limit: 5
      },
      counts: 0,
      messageList: [],//消息列表 包含收到的回复和发出的评论 choosedTab = 0 时为收到的回复 1为发出的评论
      commentList: []
    }
  },
  mounted () {
    this.getResponseList();
  },
  watch: {
    currentPage () {
      if (this.choosedTab === 0) {
        this.getResponseList();
      } else {
        this.getCommentList();
      }
    }
  },
  methods: {
    chooseTab (index) {
      this.choosedTab = index;
      if (index === 0) {
        this.getResponseList();
      } else {
        this.getCommentList();
      }
    },
    //获取收到的回复列表
    getResponseList() {
      this.messageList = [];
      let param = {
        type: "be_comment",
        offset: this.currentPage,
        limit: 4,
      };
      this.$LjLoading({el:'.response-table',loading:true});
      this.$http.post(`${this.url}/api/article/comment/userComment`, param).then(res => {
        this.$LjLoading({el:'.response-table',loading:false});
        if (res.status == 200) {
          this.total = res.data.data.length;
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = res.data.data[i];
            this.messageList.push(obj)
          }
        }
      })
    },
    //获取发出的评论列表
    getCommentList () {
      this.messageList = [];
      let param = {
        type: "comment",
        offset: this.currentPage,
        limit: 4,
      };
      this.$LjLoading({el:'.response-table',loading:true});
      this.$http.post(`${this.url}/api/article/comment/userComment`, param).then(res => {
        this.$LjLoading({el:'.response-table',loading:false});
        this.total = res.data.data.length;
        if (res.status == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = res.data.data[i];
            this.messageList.push(obj);
          }
        }
      })
    }
  },
}
</script>


<style scoped lang="scss">
@import "../../../assets/scss/personalCenter/myResponse/index";

@mixin personalCenterImg($m, $n) {
  $url: "../../../assets/image/personalCenter/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #my_response {
    .response-container {
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
  #my_response {
  }
}

#theme_name.theme3 {
  #my_response {
  }
}

#theme_name.theme4 {
  #my_response {
  }
}
</style>
