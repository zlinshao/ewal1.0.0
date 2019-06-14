<template>
  <div id="theme_name" class="theme1">
    <!--为了正常显示lj-dialog的css样式-->
    <div id="todo_list" :class="{'todo-list': todo_list_visible}">
      <div class="pendant-container">
        <div class="pendant">
          <div class="horizontal"></div>
          <div class="todo-list-title" @click="demo">待办事项</div>
          <div class="item-list">
            <div @click="getCurrentList(item,index)" class="item-detail" :class="{'checked':checked==(index+1)}"
                 v-for="(item,index) in todo_list_toolbar" :key="index">
              <span v-if="item.count">{{item.count}}</span>
              <i :class="{'multi-font':item.name.length>=3}" :title="item.name">{{item.name.slice(0,4)}}</i>
            </div>
          </div>
          <div class="search-bar">
            <!--            <div class="search-bar-item icons-category"></div>-->
            <!--            <div class="search-bar-item icons-add" @click='handleCreateTodo'></div>-->
            <!--            <div class="search-bar-item icons-search"></div>-->
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
               :key="key"
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
      <!--稽查中心审批-->
      <agency-check></agency-check>
    </div>
  </div>

</template>

<script>
  import AnswerQuestionnaireOrExam from './components/humanResource/answerQuestionnaireOrExam';
  import interviewDialog from './components/humanResource/interviewDialog';
  import repositoryDialog from './components/humanResource/repositoryDialog';
  import attenceDialog from './components/humanResource/attenceDialog';
  import finespaymentDialog from './components/humanResource/finespaymentDialog';
  //市场客服
  import SeeHouse from './components/marketCentre/see-house.vue';
  import AgencyCheck from './components/customService/agencyCheck';

  export default {
    name: "todoList",
    components: {
      interviewDialog,
      repositoryDialog,
      attenceDialog,
      finespaymentDialog,
      SeeHouse,
      AnswerQuestionnaireOrExam,
      AgencyCheck,
    },
    computed: {
      currentTodoModule() {
        return this.$store.state.todo.currentModule;
      },
      todo_list_visible() {
        return this.$store.state.todo.todo_list_visible;
      },
      refresh_todo_list() {
        return this.$store.state.todo.refresh_todo_list;
      },
      todo_list_current_selection() {
        return this.$store.state.todo.todo_list_current_selection;
      },
    },
    watch: {
      refresh_todo_list: {
        handler(val,oldVal) {
          this.getTodoListToolBar();
        },
        deep:true,
      },
      todo_list_visible(val) {
        if(val) {
          this.getTodoListToolBar();
        }
      },
    },
    data() {
      /*
      * 流程筛选(in)
      *
      * */
      let processDefinitionKey = {
        "Agency-Supervision":"",
      };
      /*
      * 流程筛选(notIn)
      *
      * */
      let processDefinitionKeyNotIn = {
        "MarketCollect":'',
        "MC-Bulletin":'',
        "HR-ApplyForSubOfficeDormitory":'',
        "HR-ApplyForAddOfficeDormitory":'',
        "Market-RentCompletionData":'租房资料补齐',
        "Market-CompleteData":'补齐资料',
        "HandoverOrder":'交接',
        "Rent-Retainage":'尾款报备',
        "MC-Bulletin-Collect":'报备',
        "MG-BulletinApproval":'片区经理审批',
        "Market-VillageExpand":'产控审核',
        "Market-CollectTakeLook":'带看',
        "MC-CollectContractSigning":'合同签署',
        "MC-RentContractSigning":'合同签署',
        "Market-RentBooking":'租房预定',
        "Market-RentTakeLook":'租房带看',
        "MC-Bulletin-Renter":'报备',
        "Market-CompleteAsset":'报备-补齐物品',
      };

      /*
      * 任务筛选(notIn)
      *
      * */
      let taskDefinitionKeyNotIn = {
        "Return-visit":'回访',
        "BulletinAgency":'报备中介费',
      };


      return {

        url: globalConfig.approval_sever,//待办接口
        counts: 0,
        params: {
          title: '',
          page: 1,
          size: 10,//每页条数
          assignee: this.$storage.get('user_info').id,
        },
        checked: 1,//选择哪个toolbar
        categoryKey: '',
        categoryChecked: 0,
        processDefinitionKey:Object.keys(processDefinitionKey).join(','),
        taskDefinitionKeyNotIn:Object.keys(taskDefinitionKeyNotIn).join(','),
        processDefinitionKeyNotIn: Object.keys(processDefinitionKeyNotIn).join(','),//pc端不需要的category及列表 筛选

        todo_list_toolbar: [
          {
            id: 1,
            key: '',
            name: '全部',
            count: 0,
          },
        ],

        todo_list_container: [],
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
        //this.$store.dispatch('change_refresh_todo_list');
      },

      //获取待办toolbar数据
      getTodoListToolBar() {
        let params = {
          ...this.params,
          taskDefKeyNotIn:this.taskDefinitionKeyNotIn,
          processDefinitionKey:this.search,
          procDefKeyNotIn: this.processDefinitionKeyNotIn,
        };
        if(!params.assignee) return;
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
          //taskDefinitionKey:this.taskDefinitionKey,
          taskDefinitionKeyNotIn:this.taskDefinitionKeyNotIn,
          //assignee:this.$storage.get('user_info').id,
          processDefinitionKey: item.key || categoryKey || '',
          //processDefinitionKey: this.taskDefinitionKey,
          processDefinitionKeyNotIn: this.processDefinitionKeyNotIn,
        };

        if(params.processDefinitionKey=='Agency-Supervision') {
          params.taskDefinitionKey = 'jczx_approval';
        }

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
                /*人资招聘*/
              case 'HR-Recruitment':
                obj.onClick = 'humanResource_interview';
                //obj.name = '面试任务';
                obj.project = _.find(variables,{name:'position_name'})?.value||'-';
                obj.date = _.find(variables,{name:'interview_time'})?.value||'-';
                obj.user = _.find(variables,{name:'interview_name'})?.value||'-';
                obj.platform = _.find(variables,{name:'platform'})?.value||'-';
                break;
              /*罚款缴纳*/
              case 'HR-FinesPay':
                obj.onClick = 'humanResource_finespayment';
                obj.tip = _.find(variables,{name:'title'})?.value||'-';
                obj.date = this.myUtils.formatDate(_.find(variables,{name:'send_at'})?.value,'yyyy-MM-dd');
                obj.money = (_.find(variables,{name:'money'})?.value||0)+'元';
                break;
              /*考勤*/
              case 'HR-Attendance':
                obj.name = _.find(variables, {name: 'title'})?.value || '-';
                obj.onClick = 'humanResource_attence';
                break;
              /*考试*/
              case 'HR-Exam':
                obj.onClick = 'humanResource_answer_test_paper';
                obj.name = _.find(variables, {name: 'title'})?.value || '-';
                obj.user = item.description;
                obj.date = _.find(variables, {name: 'start_time'})?.value || '-';
                break;
              /*稽查中心审批*/
              case 'Agency-Supervision':
                obj.onClick = 'customerService_agency_check';
                obj.date = item.createTime;
                obj.tip = _.find(variables, {name: 'title'})?.value || '-';
                obj.project = _.find(variables, {name: 'doubt_reason'})?.value || '-';
                obj.user = _.find(variables, {name: 'bulletin_staff_name'})?.value || '--';
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
