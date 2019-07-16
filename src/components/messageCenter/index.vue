<template>
  <div id="messageCenter">
    <div class="flex-center">
      <div class="mainList">
        <div class="messageCenter-menu-card">
          <div class="messageCenter-card-info flex-center" v-for="key in Object.keys(select_type)" :key="key">
            <div @click="selectTab(selects[key].key)" :class="chooseTab===selects[key].key ? selects[key].active:selects[key].class">
              <h1><span>{{select_type[key].count}}</span></h1>
              <p><span>{{select_type[key].name}}</span></p>
              <!-- <p><span>{{selects[key].title}}</span></p> -->
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
              <!-- tab在已读的时候不显示 -->
              <div class="read" v-show="chooseItem!==1" @click="isReadArr">
                标记为已读
              </div>
            </div>

            <div class="message-table">
              <el-table :data="messageData" :show-header="true" header-row-class-name="tableHeader"
                @selection-change="handleSelectionChange"  @row-click="rowClick" highlight-current-row>
                <el-table-column align="center" label="状态" width="100">
                  <template slot-scope="scope">
                    <span>
                      <i class="message-mail" v-if="scope.row.is_read===0"></i>
                      <i class="message-mail-read" v-else></i>
                      <!-- <i class="message-res">B</i> -->
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="来源" prop="sender.name" width="120">
                </el-table-column>
                <el-table-column align="center" label="时间" prop="add_time" width="180">
                </el-table-column>
                <el-table-column align="center" label="描述" prop="description.detail" width="180">
                </el-table-column>
                <el-table-column
                  align="center"
                  type="selection"
                  label="操作">
                </el-table-column>
              </el-table>
            </div>

          </div>
          <div class="messageCenter-main-right">
            <div class="no-content-box" v-if="Object.keys(msg_show_box).length===0">
              <i class="noContent-icon"></i>
              <p>未选择任何内容</p>
            </div>
            <div class="msg-show-box" v-else>
              <div class="msg-show-box-header">
                <div>
                  <div class="img">
                    <span>B</span>
                  </div>
                  <div class="txt">
                    <h5>{{msg_show_box.sender.name}}</h5>
                    <p>{{msg_show_box.add_time}}</p>
                  </div>
                </div>
              </div>
              <div class="msg-show-box-body">
                <div v-html="msg_show_box.content.detail"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="messageCenter-bottom">
          <div class="page">
            <el-pagination :total="params.total" layout="total,jumper,prev,pager,next" :current-page="params.page" :page-size="params.limit"
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
        notice: { key: 1, title: '通知消息', class: 'card-1', active: 'activeCard-1',type:'notice' },
        bulletin: { key: 2, title: '报备消息', class: 'card-2', active: 'activeCard-2' ,type:'bulletin'},
        approval: { key: 3, title: '审批', class: 'card-3', active: 'activeCard-3',type:'approval' },
        comment: { key: 4, title: '评论', class: 'card-4', active: 'activeCard-4' ,type:'comment'},
        announcement: { key: 5, title: '公告', class: 'card-5', active: 'activeCard-5' ,type:'announcement'},
      },
      select_type: {},
      // 控制消息已读未读的状态
      tabs: [
        { id: 2, title: '全部消息' },
        { id: 1, title: '已读' },
        { id: 0, title: '未读' },
      ],
      // 控制选中的具体某一类消息
      chooseTab: 1,
      // 控制选中全部消息/已读/未读
      chooseItem: 2,
      // 控制分页
      params: {
        limit: 7,
        page: 1,
        total:80
      },
      messageData: [
        // { id: 1, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 2, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 3, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 4, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 5, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 6, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 7, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
        // { id: 8, desc: '向您发送了一条***消息', time: '2019-04-08 14:32:16', name: 'BOSS小秘书' },
      ],
      message_sever: globalConfig.message_sever,
      // 控制右侧msg-show-box数据
      msg_show_box:{},
      // checkbox选中的未读列表
      unreadArr:[]
    }
  },
  created () {
    this.getTopList();
    this.getInfoList();
  },
  methods: {
    // 获取消息的列表
    getTopList () {
      this.$http.get(this.message_sever + 'ewal/message/message-type-list?uid='+this.$storage.get("user_info").id).then(res => {
        if (res.code == 10020) {
          // console.log(res.data)
          this.select_type = res.data
        }
      })
    },
    // 获取消息分类下的具体消息列表
    getInfoList(){
      // 用户id
      let userid=this.$storage.get("user_info").id;
      // 页数
      let page=this.params.page;
      // 每页数据长度
      let limit=this.params.limit;
      // 已读/全部/未读
      let status=this.chooseItem===2?'':this.chooseItem;
      // 匹配是哪一类的数据
      let arr=Object.values(this.selects);
      let typeArr=arr.filter(item=>{
        return item.key===this.chooseTab
      })
      let data={
        uid:userid,
        status:status,
        page:page,
        limit:limit,
        type:typeArr[0].type
      }
      // console.log(data)
      this.$http.get(this.message_sever + '/ewal/message/msg-list',data).then(res => {
        if (res.code == 10020) {
          console.log(res.data);
          // 写入数据
          this.messageData=res.data.data;
          // 写入数据总条数
          this.params.total=res.data.count;
          // 重新获取数据类型
          this.getTopList()
        }
      })
    },
    // 选择具体的某一类的消息
    // @params 传入data中selects的key的值
    selectTab (id) {
      // 传入选择的参数
      this.chooseTab = id;
      // 把页码初始化
      this.params.page=1;
      // 清除msg_show_box内容
      this.msg_show_box={}
      this.getInfoList();
    },
    selectsItem (id) {
      // 传入选择的参数
      this.chooseItem = id;
      // 把页码初始化
      this.params.page=1;
      // 清除msg_show_box内容
      this.msg_show_box={}
      this.getInfoList();
    },
    // 分页切换事件
    handleChangePage (page) {
      this.params.page=page;
      // 清除msg_show_box内容
      this.msg_show_box={}
      this.getInfoList();
    },
    // 点击表格每一行的checkbox所触发的事件
    handleSelectionChange (val) {
      this.unreadArr=val.filter(item=>{
        return item.is_read===0
      })
    },
    // 点击表格每一行的事件
    rowClick(row, column, event){
      // 将选中的信息设置为已读
      this.isRead(row);
      this.showDetail(row);
    },
    // 将消息设置为已读
    isRead(infoObj){
      // 如果是未读
      if(infoObj.is_read===0){
        this.changeRead(infoObj);
        let data={
          uid:this.$storage.get("user_info").id,
          type:infoObj.type,
          content:infoObj
        }
        this.$http.post(this.message_sever + '/ewal/message/consumer',data).then(res => {
          // console.log(res)
          if (res.code == 10020) {
            infoObj.is_read=1;
            // 更新消息类型的未读数据
            this.getTopList();
          }
        })
      }


    },

    //显示右侧栏详情
    showDetail(row) {
      // 赋值给右边的展示框
      this.msg_show_box=row;

      switch (row.type) {
        case 'announcement':
          this.msg_show_box.content.detail = '';
          this.$http.get(row.url).then(res=> {
            let usefulData = res.data.sanction_info;
            let htmlDom = '';
            _.forEach(usefulData,(o)=> {
              let htmlDomItem = '';
              let userName = o.user_info.name;
              let money = o.money;
              let type = o.sanction_type==1?'奖赏':'处罚';
              let payName = o.pay_status==1?'未缴纳':'已缴纳';
              htmlDomItem = `员工姓名: ${userName}</br>奖惩类型: ${type}</br>金额:${money}</br>缴纳状态:${payName}</br></br></br>`;
              htmlDom += htmlDomItem;
            })
            this.msg_show_box.content.detail = htmlDom;
          });
          break;
        default:
          break;

      }
    },

    //根据type不同 调用不同的已读未读接口
    changeRead(obj) {
      if(obj.is_read) {return};
      switch (obj.type) {
        case "announcement":
          let announcementParams = {
            id:obj.url.split('/')[obj.url.split('/').length-1],
          };
          this.$http.post(`${globalConfig.humanResource_server}announcement/Announcement/reading`,announcementParams).then(res=> {});
          break;
      }
    },

    isReadArr(){
      if(this.unreadArr.length>0){
        this.unreadArr.forEach(item=>{
          this.isRead(item);
        })
      }
    }
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
              i.message-mail {
                @include messageCenterImg("weidu.png", "theme1");
                background-size:80%;
                background-position: center;
                margin-left:0;
              }
              i.message-mail-read {
                @include messageCenterImg("yidu.png", "theme1");
                background-size:80%;
                background-position: center;
                margin-left:0;
              }
            }
          }
        }
        .messageCenter-main-right {
          i {
            @include messageCenterImg("neirong.png", "theme1");
          }
        }
      }
    }
  }
}
</style>
