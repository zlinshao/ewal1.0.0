<template>
  <div id="theme_name">
    <!--为了正常显示lj-dialog的css样式-->
    <div id="todo_list" :class="{'todo-list': todo_list_visible}">
      <div class="pendant-container">
        <div class="pendant">
          <div class="horizontal"></div>
          <div class="todo-list-title" @click="demo">待办事项</div>
          <div class="item-list">
            <div @click="getCurrentList(item,index)" class="item-detail" :class="{'checked':checked==(index+1)}"
                 v-for="(item,index) in todo_list_toolbar">
              <span v-if="item.count">{{item.count}}</span>
              <i :class="{'multi-font':item.name.length>3}">{{item.name}}</i>
            </div>
          </div>
          <div class="search-bar">
            <!--            <div class="search-bar-item icons-category"></div>-->
            <div class="search-bar-item icons-add" @click='handleCreateTodo'></div>
            <div class="search-bar-item icons-search"></div>
          </div>
        </div>
      </div>
      <div class="todo-list-container">
        <!--渲染todo_list数据-->

        <div v-for="(item,index) in todo_list_container"
             @click="todoListVisibleTrigger(item)"
             class="todo-list-item">
          <div :title="item.name" class="todo-list-item-title">{{item.name}}</div>
          <div v-for="(value,key) in item"
               v-if="(key=='user'||key=='date'||key=='tip'||key=='money'||key=='project'||key=='location')&&value"
               class="todo-list-item-content">
            <i :class="'todo-list-item-content-icon-'+key"></i>
            {{value}}
          </div>
        </div>

      </div>
      <footer class="flex-center common-page">
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="params.page"
                         :page-size="params.size" :total="counts" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>

      <!--面试相关-->
      <interview-dialog></interview-dialog>
      <!--内务库房相关-->
      <repository-dialog></repository-dialog>
      <!--考勤核对相关-->
      <attence-dialog></attence-dialog>
      <!--罚款缴纳相关-->
      <finespayment-dialog></finespayment-dialog>

      <!--收租房带看-->
      <SeeHouse></SeeHouse>

      <!--问卷/考试答题-->
      <answer-questionnaire-or-exam></answer-questionnaire-or-exam>
    </div>
  </div>

</template>

<script>
  import _ from 'lodash';

  import AnswerQuestionnaireOrExam from './components/humanResource/answerQuestionnaireOrExam';
  import interviewDialog from './components/humanResource/interviewDialog';
  import repositoryDialog from './components/humanResource/repositoryDialog';
  import attenceDialog from './components/humanResource/attenceDialog';
  import finespaymentDialog from './components/humanResource/finespaymentDialog';
  //市场客服
  import SeeHouse from './components/marketCentre/see-house.vue';

  export default {
    name: "todoList",
    components: {
      interviewDialog,
      repositoryDialog,
      attenceDialog,
      finespaymentDialog,
      SeeHouse,
      AnswerQuestionnaireOrExam
    },
    computed: {
      currentTodoModule() {
        return this.$store.state.todo.currentModule
      },
      todo_list_visible() {
        return this.$store.state.todo.todo_list_visible;
      },
      /*todo_list_toolbar () {
        return this.$store.state.todo.todo_list_toolbar;
      },*/
      /*todo_list_container() {
        return this.$store.state.todo.todo_list_container;
      },*/
      todo_list_current_selection() {
        return this.$store.state.todo.todo_list_current_selection;
      },
    },
    watch: {},
    data() {
      return {
        url: globalConfig.approval_sever,//待办接口
        counts: 0,
        params: {
          title: '',
          page: 1,
          size: 10,//每页条数
          assignee: 289,
        },
        checked: 1,//选择哪个toolbar
        categoryKey: '',
        categoryChecked: 0,
        noSearch: 'MarketCollect,MC-Bulletin,HR-ApplyForSubOfficeDormitory,HR-ApplyForAddOfficeDormitory',//pc端不需要的category及列表 筛选

        todo_list_toolbar: [
          {
            id: 1,
            key: '',
            name: '全部',
            count: 0,
          },
        ],
        todo_list_container: [
          {
            id: 1,
            name: '维修工单',
            tip: '距离考试20分钟',
            money: '扣款200元',
            project: '研发中心会议',
            onClick: 'humanResource_interview' //click事件控制lj-dialog显示隐藏
          },
          {
            id: 2,
            name: '资料补齐',
            user: '张无忌',
            date: '2019-03-22',
            location: '艺术家工厂',
            onClick: 'humanResource_interview_evaluate' //click事件控制lj-dialog显示隐藏
          },
          {
            id: 3,
            name: '资料补齐',
            user: '张无忌',
            money: '扣款200元',
            project: '研发中心会议',
            onClick: 'humanResource_attence'
          },
          {
            id: 4,
            name: '资料补齐',
            user: '张无忌',
            date: '2019-03-22',
            project: '研发中心会议',
            onClick: 'humanResource_finespayment'
          },
          {
            id: 5,
            name: '资料补齐',
            date: '2019-03-22',
            tip: '距离考试20分钟',
            money: '扣款200元',
            onClick: 'humanResource_answer_test_paper',
          },
          {
            id: 6,
            name: '资料补齐',
            user: '张无忌',
            date: '2019-03-22',
            location: '艺术家工厂'
          },
          {
            id: 7,
            name: '资料补齐',
            user: '张无忌',
            money: '扣款200元',
            project: '研发中心会议'
          },
          {
            id: 8,
            name: '资料补齐',
            tip: '距离考试20分钟',
            money: '扣款200元',
            project: '研发中心会议'
          },
          {
            id: 9,
            name: '文职入职考试',
            tip: '距离考试20分钟',
            money: '扣款200元',
            project: '研发中心会议'
          },
          {
            id: 10,
            name: '领取通知',
            date: '2019-03-22',
            user: '张无忌',
            location: '财务部领取',
            project: '借用审批编号10086',
            onClick: 'humanResource_repository' //click事件控制lj-dialog显示隐藏
          }
        ],

        /*todo_list_container: [],*/
      }
    },
    mounted() {
      this.getTodoListToolBar();
    },
    methods: {
      handleCreateTodo() {
        //  收租房带看
        this.$store.dispatch('switch_see_house', true);
      },
      demo() {
        console.log(this.todo_list_current_selection);
        debugger
      },

      //获取待办toolbar数据
      getTodoListToolBar() {
        let params = {
          ...this.params,
          procDefKeyNotIn: this.noSearch,
          //assignee:289,//用户id
        };
        this.$http.get(`${this.url}runtime/taskCatalog`, params).then(res => {
          if (res.constructor == Array) {//返回正确
            this.todo_list_toolbar = res;
            let allCount = _(res).map('count').sum();
            this.$store.dispatch('change_todo_list_badge_count', allCount);
            this.todo_list_toolbar.unshift(
              {
                id: 1,
                key: '',
                name: '全部',
                count: allCount,
              });
            return true;
          } else {
            return false;
          }
        }).then(res => {
          if (res) {
            this.getCurrentList();
          }
        });
      },

      //获取待办下方列表数据
      async getCurrentList(item = {}, index = 0, categoryKey, categoryChecked) {
        if (Object.keys(item).length > 0) {
          this.params.page = 1;
        }
        if(categoryChecked==1) {
          categoryKey = '';
        }
        let params = {
          ...this.params,
          //assignee:289,
          processDefinitionKey: item.key || categoryKey || '',
          processDefinitionKeyNotIn: this.noSearch
        };

        this.checked = categoryChecked || (index + 1);
        this.categoryChecked = this.checked;
        this.todo_list_container = [];
        await this.$http.get(`${this.url}runtime/tasks`, params).then(res => {
          this.todo_list_container = [];
          for (let item of res.data) {
            let obj = {
              ...item
            };
            let itemKey = item.processDefinitionId.split(':')[0];//类型
            this.categoryKey = itemKey;
            let variables = item.variables;
            switch (itemKey) {
              /*交接*/
              case 'HandoverOrder':
                obj.time = '';
                break;
              /*补齐资料*/
              case 'Market-CompleteData':
                break;
              /*跟进任务*/
              case 'FA-FollowUpTask':
                break;
              /*合同签署*/
              case 'MC-CollectContractSigning':
                break;
              /*报备审批*/
              case 'MG-BulletinApproval':
                break;
              /*完整版*/
              case 'MarketCollect':
                break;
              /*报备*/
              case 'MC-Bulletin':
                break;
              /*带看*/
              case 'Market-CollectTakeLook':
                break;
              /*补齐物品*/
              case 'Market-CompleteAsset':
                break;
              /*罚款缴纳*/
              case 'HR-FinesPay':
                obj.onClick = 'humanResource_finespayment';
                break;
              /*考勤*/
              case 'HR-Attendance':
                obj.name = _.find(variables, {name: 'title'})?.value || '-';
                obj.onClick = 'humanResource_attence'
                break;
              /*考试*/
              case 'HR-Exam':
                obj.onClick = 'humanResource_answer_test_paper';
                obj.name = _.find(variables, {name: 'title'})?.value || '-';
                obj.user = item.description;
                obj.date = _.find(variables, {name: 'start_time'})?.value || '-';
                break;
              default:
                break;
            }
            this.todo_list_container.push(obj);
          }
          this.counts = res.total;
        });


        //console.log(item);
        //debugger
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getCurrentList({}, 0, this.categoryKey, this.categoryChecked);
      },
      trigger(val) {
        console.log(val);
      }
    }
  }
</script>
<!--<style lang="scss">
  #todo_list {
    footer.common-page {
      .el-input__inner {
        border: 1px solid #CF2E33 !important;
      }
    }
  }
</style>-->
<style scoped lang="scss">
  @import "../../assets/scss/todoList/index.scss";

  @mixin todoListImg($m, $n) {
    $url: "../../assets/image/todoList/" + $n + "/" + $m;
    @include bgImage($url);
  }

  #todo_list {
    .pendant {
      .item-list {
        .item-detail {
          @include todoListImg("dbw.png", "theme1");

          &.checked {
            @include todoListImg("dbx.png", "theme1");
          }
        }
      }

      .search-bar {
        .search-bar-item {
          &.icons-category {
            @include todoListImg("gx.png", "theme1");
          }

          &.icons-add {
            @include todoListImg("tj.png", "theme1");
          }

          &.icons-search {
            @include todoListImg("ss.png", "theme1");
          }
        }
      }
    }

    .todo-list-container {
      .todo-list-item {
        @include todoListImg("bjw.png", "theme1");

        &:hover {
          @include todoListImg("xzbj.png", "theme1");

          .todo-list-item-content {
            .todo-list-item-content-icon-date {
              @include todoListImg("sjx.png", "theme1");
            }

            .todo-list-item-content-icon-user {
              @include todoListImg("ryx.png", "theme1");
            }

            .todo-list-item-content-icon-location {
              @include todoListImg("dzx.png", "theme1");
            }

            .todo-list-item-content-icon-tip {
              @include todoListImg("txx.png", "theme1");
            }

            .todo-list-item-content-icon-money {
              @include todoListImg("jqx.png", "theme1");
            }

            .todo-list-item-content-icon-project {
              @include todoListImg("xmx.png", "theme1");
            }
          }
        }

        .todo-list-item-content {
          .todo-list-item-content-icon-date {
            @include todoListImg("sjw.png", "theme1");
          }

          .todo-list-item-content-icon-user {
            @include todoListImg("ryw.png", "theme1");
          }

          .todo-list-item-content-icon-location {
            @include todoListImg("dzw.png", "theme1");
          }

          .todo-list-item-content-icon-tip {
            @include todoListImg("txw.png", "theme1");
          }

          .todo-list-item-content-icon-money {
            @include todoListImg("jqw.png", "theme1");
          }

          .todo-list-item-content-icon-project {
            @include todoListImg("xmw.png", "theme1");
          }
        }
      }
    }
  }
</style>
