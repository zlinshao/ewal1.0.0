<template>
  <div id="reward">
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1 @click="organModule = true">赏罚分明</h1>
        <h2 class="items-center" v-if="chooseTab">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <!--<div class="searchTerm" v-if="chooseTab === 3">-->
        <!--<el-checkbox-group v-model="checkList">-->
        <!--<el-checkbox label="1">离职员工</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</div>-->
        <div class="icons-font" @click="publish(chooseTab)" v-if="chooseTab === 1|| chooseTab===2"><b>发榜</b></div>
        <div class="icons-font" @click="exchange(chooseTab)" v-if="chooseTab === 1"><b>兑换</b></div>
        <div class="icons search" @click="highSearch(chooseTab)" v-if="chooseTab === 1 || chooseTab===2"></div>
      </div>
    </div>

    <div class="main-container reward-container">
      <div class="content flex-center" v-if="!chooseTab">
        <div class="left flex-center" @click="chooseTab=1"><span>扬善令</span></div>
        <div class="right flex-center" @click="chooseTab=2"><span class="gray">惩恶令</span></div>
      </div>
    </div>
    <!--扬善-->
    <div class="up" v-if="chooseTab==1"></div>

    <!--惩恶-->
    <div class="down" v-if="chooseTab==2">惩恶</div>

    <!--扬善表单-->
    <div v-show="chooseTab === 1">
      <RewardUp :searchVal="searchFruit1"></RewardUp>

    </div>
    <work-info v-show="chooseTab" :work-info="work_info" :event-data="event_data"
               @change="handleChangeDate"></work-info>
    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>


    <!--赏善令-->
    <lj-dialog
      :visible="reward_order"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
      @close="reward_order = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>赏善令</h3>
          <!--<div class="header_right">-->
            <!--<el-button size="mini" type="primary" plain>新增</el-button>-->
          <!--</div>-->
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="reward_order_form" label-width="80px" style="width: 80%">
            <el-form-item label="姓名">
              <el-input v-model="reward_order_form.name" placeholder="选择人员自动获取"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="reward_order_form.department" placeholder="选择人员自动获取">
              </el-input>
            </el-form-item>
            <el-form-item label="岗位">
              <el-input v-model="reward_order_form.station" placeholder="选择人员自动获取">
              </el-input>
            </el-form-item>

            <el-form-item label="事件">
              <div class="items-center iconInput">
                <el-select v-model="reward_order_form.event" placeholder="请选择事件">
                  <el-option :value="1" label="事件1"></el-option>
                </el-select>
              </div>
            </el-form-item>
              <el-form-item label="奖励类型">
                <div class="items-center iconInput">
                  <el-select v-model="reward_order_form.reward_type" placeholder="请选择奖励类型">
                    <el-option :value="1" label="奖励1"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            <el-form-item label="奖额">
              <el-input v-model="reward_order_form.bonus" placeholder="请填写奖励金额">
              </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="reward_order_form.remark" placeholder="请填写备注">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="reward_order = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import StaffOrgan from '../../common/staffOrgan.vue';
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import RewardUp from './rewardUp/index.vue';//扬善表单
  import WorkInfo from './components/workInfo/work-info';
  import LjDialog from '../../common/lj-dialog.vue';
  import {staffBookSearch, LeaveJobSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';


  export default {
    name: "index",
    components: {
      StaffOrgan,
      MenuList,
      Upload,
      RewardUp,
      WorkInfo,
      LjDialog,
    },
    data() {
      return {
        staffBookSearch,
        LeaveJobSearch,
        humanResource,
        resourceDepart,
        selects: [
          {
            id: 1,
            title: '扬善',
          },
          {
            id: 2,
            title: '惩恶',
          }
        ],//tab切换

        organModule: false,//组织架构
        chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门
        searchFruit1: {},//扬善搜索结果
        searchFruit2: {},//惩恶搜索结果

        //乐伽dialog
        //赏善令
        reward_order: false,
        reward_order_form: {
          name: '',//姓名
          department: '',//部门,
          station: '',//岗位
          event: '',//事件
          reward_type: '',//奖励类型
          bonus: '',//奖额
          remark: '',//备注
        },


        //侧滑栏数据
        show_market: false,
        work_info: [
          {work: '平均在线时长', val: '8 h'},
          {work: '平均处理用时', val: '30 min'},
          {work: '当日处理事件数', val: '16 件'},
          {work: '本周处理事件数', val: '35 件'},
        ],
        event_data: [
          [{value: 500, name: '一般'},
            {value: 300, name: '特殊'},
            {value: 200, name: '紧急'},],
          [{value: 400, name: '一般'},
            {value: 300, name: '特殊'},
            {value: 300, name: '紧急'},],
          [{value: 200, name: '一般'},
            {value: 400, name: '特殊'},
            {value: 400, name: '紧急'},],
        ],
      }
    },
    mounted() {
      this.show_market = true;
      this.work_info[0].val = '7 h';
      //this.event_data[0].value = 700;
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleChangeDate(id) {

      },
      handleCloseMenu() {
        this.show_market = false;
      },

      publish() {
        this.reward_order = true;
      },
      exchange() {

      },


      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$nextTick(function () {
          switch (id) {
            case 1:
              this.searchFruit1 = this.handleSearch(this.staffBookSearch);
              break;
          }
        });
        this.$store.dispatch('route_animation');
      },
      hiddenOrgan(val) {
        this.organModule = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/reward/index.scss";

  @mixin rewardImg($m, $n) {
    $url: '../../../assets/image/humanResource/reward/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #reward {
      .listTopRight {
        .icons-font {
          @include rewardImg('fabang.png', 'theme1');
        }
      }

      .reward-container {

        .content {
          @include rewardImg('sffmbj.png', 'theme1');

          .left {
            @include rewardImg('yslx.png', 'theme1')
          }

          .right {
            @include rewardImg('celw.png', 'theme1')
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #reward {

    }
  }

  #theme_name.theme3 {
    #reward {

    }
  }

  #theme_name.theme4 {
    #reward {

    }
  }
</style>
