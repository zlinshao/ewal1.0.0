<template>
  <div id="my_response">
    <div class="response-container">
      <div class="response-toolbar">
        <div class="toolbar-left">
          <div class="toolbar-left-upper">
            <span class="checked">收到的回复</span>
            <span>发出的评论</span>
          </div>
          <!--<div class="toolbar-left-below">
            <span class="checked">员工广场</span>
            <span>会议记录</span>
          </div>-->
        </div>
        <div class="toolbar-right">
          <search-bar placeholder="搜索姓名/岗位/时间" v-model="searchValue"></search-bar>
        </div>
      </div>
      <div class="response-table">
        <div class="response-table-list">
          <div class="response-table-item">
            <div class="table-item-container">
              <div class="item-upper">
                <div class="item-upper-left">
                  <img
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                </div>
                <div class="item-upper-right">
                  <div class="upper-right-info">
                    <span>张三</span>
                    <span>2019-04-13</span>
                  </div>
                  <div class="upper-right-comment">
                    按时灯笼裤飞机撒赖咖啡碱斯科拉飞机撒赖咖啡碱飞机撒赖咖啡碱斯科拉附近开了
                  </div>
                </div>
              </div>
              <div class="item-lower">
                <div class="lower-content">
                  <div class="lower-content-container">
                    <div class="content-username">张三丰</div>
                    <div class="content-detail">
                      上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘
                      卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见
                      分厘卡上了看见分厘上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡
                      卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡上了看见分厘卡
                    </div>
                  </div>
                </div>
                <div class="lower-operate">
                  <div class="item-view">
                    <i class="icon-response"></i>
                    <span>587</span>
                  </div>
                  <div class="item-like">
                    <i class="icon-like"></i>
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>

            <!--<div class="item-lower">
              <div class="item-lower-left">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                <span>张三</span>
              </div>
              <div class="item-lower-right">
                2019-04-13
              </div>
            </div>-->
          </div>

          <!--<div :key="index" v-for="index of 7" class="response-table-item">
            <div class="item-upper">
              <div class="item-upper-photo">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
              </div>
              <div class="item-upper-content">
                <div title="文章标题文章标题文章标题">文章标题文章标题文章标题文章标题文章标题文章标题</div>
              </div>
              <div class="item-upper-operate">
                <div class="item-response">
                  <i class="icon-response"></i>
                  <span>90</span>
                </div>
                <div class="item-view">
                  <i class="icon-view"></i>
                  <span>587</span>
                </div>
                <div class="item-like">
                  <i class="icon-like"></i>
                  <span>12</span>
                </div>
              </div>
            </div>
            <div class="item-lower">
              <div class="item-lower-left">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
                <span>张三</span>
              </div>
              <div class="item-lower-right">
                2019-04-13
              </div>
            </div>
          </div>-->
        </div>
        <div class="response-table-pagination flex-center common-page">
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="params.page"
              :page-size="params.limit"
              :total="counts"
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
    name: "workLog",
    components: {
      SearchBar,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        searchValue: '',
        params: {
          page: 1,
          limit: 5
        },
        counts: 0,
        responseList: [],

      }
    },
    methods: {
      handleSizeChange() {
      },
      handleCurrentChange() {
      },
    },
  }
</script>


<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/myResponse/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #my_response {
      .response-container {
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
