<template>
  <div id="messageCenter">
    <div class="flex-center">
      <div class="mainList">
        <div class="messageCenter-menu-card">
          <div class="messageCenter-card-info flex-center" v-for="key in Object.keys(select_type)" :key="key">
            <div @click="selectTab(selects[key].key)" :class="chooseTab===selects[key].key ? selects[key].active:selects[key].class">
              <h1><span>{{select_type[key].count}}</span></h1>
              <p><span>{{selects[key].title}}</span></p>
            </div>
          </div>
        </div>
        <div class="messageCenter-main">
          <div class="messageCenter-main-left">
            <div class="message-tab">
              <div>
                <span class="defaultTab" v-for="(item,index) in tabs" :key="index" :class="chooseItem===item.id?'activeTab':''"
                  @click.stop="selectsItem(item.id)">{{item.title}}</span>
              </div>
              <div class="check-all">
                <el-checkbox>标记当前页全部为已读</el-checkbox>
              </div>
            </div>

            <div class="message-table">
              <el-table :data="messageData" @row-dblclick="tableClickRow" :show-header="false" header-row-class-name="tableHeader"
                @select="handleSelectionChange">
                <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
                <!--</el-table-column>-->

                <el-table-column align="center" label="状态" prop="id" width="120">
                  <template slot-scope="scope">
                    <span>
                      <i class="message-mail"></i>
                      <i class="message-res">B</i>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="来源" prop="name" width="120">
                </el-table-column>
                <el-table-column align="center" label="时间" prop="time" width="200">
                </el-table-column>
                <el-table-column align="center" label="desc" prop="time">
                </el-table-column>
                <el-table-column align="center" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-checkbox>标记为已读</el-checkbox>
                  </template>
                </el-table-column>

              </el-table>
            </div>

          </div>
          <div class="messageCenter-main-right">
            <div>

            </div>
            <i class="noContent-icon"></i>
          </div>
        </div>
        <div class="messageCenter-bottom">
          <div class="page">
            <el-pagination :total=0 layout="total,jumper,prev,pager,next" :current-page="params.page" :page-size="params.limit"
              @current-change="handleChangePage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      selects: {
        notice: { key: 1, title: '通知消息', class: 'card-1', active: 'activeCard-1' },
        bulletin: { key: 2, title: '报备消息', class: 'card-2', active: 'activeCard-2' },
        approval: { key: 3, title: '审批', class: 'card-3', active: 'activeCard-3' },
        comment: { key: 4, title: '评论', class: 'card-4', active: 'activeCard-4' },
        announcement: { key: 5, title: '公告', class: 'card-5', active: 'activeCard-5' },
      },
      select_type: {},
      tabs: [
        { id: 1, title: '全部消息' },
        { id: 2, title: '已读' },
        { id: 3, title: '未读' },
      ],
      chooseTab: 1,
      chooseItem: 1,
      params: {
        limit: 12,
        page: 1,
      },
      count: 0,
      messageData: [
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },

      ],
      message_sever: globalConfig.message_sever,
    }
  },
  created () {
    this.getTopList()
  },
  methods: {
    getTopList () {
      this.$http.get(this.message_sever + 'ewal/message/message-type-list').then(res => {
        if (res.code == 10020) {
          this.select_type = res.data
        }
      })
    },
    selectTab (id) {
      this.chooseTab = id;
    },
    selectsItem (id) {
      this.chooseItem = id;
    },
    handleChangePage (page) {
      this.params.page = page;
    },
    tableClickRow (row) { },
    handleSelectionChange () {
      console.log(1)
    },
  }


}
</script>

<style scoped lang="scss">
@import "../../assets/scss/messageCenter/index.scss";
@mixin messageCenterImg($n, $m) {
  $url: "../../assets/image/messageCenter/" + $m + "/" + $n;
  @include bgImage($url);
}
#theme_name.theme1 {
  #messageCenter {
    > div {
    }
    .mainList {
      .messageCenter-menu-card {
        .messageCenter-card-info {
          @for $i from 1 through 5 {
            .card-#{$i} {
              @include messageCenterImg("gery_#{$i}.png", "theme1");
              &:hover {
                @include messageCenterImg("pic_#{$i}.png", "theme1");
                color: #ffffff;
              }
            }

            .activeCard-#{$i} {
              @include messageCenterImg("pic_#{$i}.png", "theme1");
              color: #ffffff;
            }
          }
        }
      }
      .messageCenter-main {
        .messageCenter-main-left {
          .message-tab {
            > div {
              .defaultTab {
                @include messageCenterImg("yiyuedu.png", "theme1");
              }
              .activeTab {
                @include messageCenterImg("weiyuedu.png", "theme1");
                color: #ffffff;
              }
            }
          }
          .message-table {
            span {
              i:first-child {
                @include messageCenterImg("weidu.png", "theme1");
              }
            }
          }
        }
        .messageCenter-main-right {
          i {
            @include messageCenterImg("neirong.png", "theme1");
          }
          > div {
          }
        }
      }
    }
  }
}
</style>