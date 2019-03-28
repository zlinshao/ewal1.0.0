<template>
  <div id="discussPolitics" class="discuss-politics">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>奏事议政</h1>
        <div class="date-value-container">
          <el-date-picker
            v-model="dateValue"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
      </div>
    </div>

    <div class="main-container discuss-politics-container">
      <div class="calendar-container">
        <div class="container-left scroll_bar">
          <div class="calendar-week">
            <div class="ui-container">
              <div v-for="(item,index) in weekList" class="calendar-week-item">
                <div class="calendar-week-item-container">
                  <span :class="{weekday:index>4}" class="week-item-date">{{item}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="calendar-day">
            <div class="ui-container">
              <div @click="add_meeting_dialog_visible = true" v-for="item in daysList" class="calendar-day-item">
                <div class="calendar-day-item-container">
                  <span :class="{'gray':item.type=='prev'||item.type=='next','current':item.today}"
                        class="calendar-day-item-container-date">
                    {{item.date}}
                    <i v-if="item.tips">{{item.tips}}</i>
                  </span>
                  <div class="calendar-day-item-container-content">
                    <div @click.stop="handleDialog(contentItem)"
                         :class="[contentItem.type=='default'?'default':contentItem.type=='warning'?'warning':'danger']"
                         :title="contentItem.content"
                         v-for="(contentItem,index) in item.todoList"
                         v-if="index<2">
                      {{contentItem.content}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="container-right scroll_bar">
          <div @click="meeting_counts_dialog_visible = true" class="monthTitle">
            <span title="本月会议数">{{monthContent}}</span>
          </div>
          <!--时间线-->
          <div class="timeline">
            <el-timeline>
              <el-timeline-item
                :key="index"
                :color="item.todoType=='default'?'#50E38F':item.todoType=='warning'?'#FFDC75':'#FF7A3C'"
                v-if="item.todoList&&item.todoList.length>0" v-for="(item,index) in daysList" :timestamp="item.datetime"
                placement="top">
                <el-card>
                  <div :class="{prev:item.type=='prev'}" class="timeline-item-container">
                    <div class="timeline-item-container-content-item" @click="handleDialog(contentItem)"
                         :title="contentItem.content" v-for="(contentItem,contentItemIndex) in item.todoList">
                      {{contentItem.content}}
                      <span title="删除" @click.stop="contentDelete(index,contentItemIndex)" class="icons-delete"></span>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>

          </div>
        </div>
      </div>
    </div>

    <!--周例会详情  -->
    <lj-dialog :visible="weekly_meeting_dialog_visible"
               :size="{width: 800 + 'px',height: 600 + 'px'}"
               @close="weekly_meeting_dialog_visible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>周例会 09:00-11:00</h3>
        </div>
        <div class="dialog_main flex-center borderNone">

          <div class="weekly_form_container">
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议主题</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{weekly_meeting_form.meetingTheme}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">申请人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">尤晓伟</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议室</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">大会议室</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">主持人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">张三</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">应到/实到</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content"><span class="form-item-content-span-red">19/19</span></div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议提醒</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    会议开始前<span class="form-item-content-span-input">3</span>小时<span class="form-item-content-span-input">20</span>分钟提醒
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">参加人员</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    张三,李四,张三,李四,张三,李四,张三,李四,张三,李四,张三,李四
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">上传附件</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <div class="icons-upload"></div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">反馈</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <el-input type="textarea" v-model="weekly_meeting_form.feedback"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>

          </div>

        </div>
        <div class="dialog_footer">
          <el-button type="primary" plain>发布</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--会议个数详情dialog  -->
    <lj-dialog :visible="meeting_counts_dialog_visible"
               :size="{width: 800 + 'px',height: 600 + 'px'}"
               @close="meeting_counts_dialog_visible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>本月会议数:7</h3>
        </div>
        <div class="dialog_main flex-center borderNone">

          <div class="meeting-counts-container">

            <div @click="weekly_meeting_dialog_visible = true" class="form-item" v-for="item in meeting_counts_form">
              <el-row :gutter="80">
                <el-col :span="10">
                  <div class="form-item-title">{{item.title}}</div>
                </el-col>
                <el-col :span="14">
                  <div class="form-item-content">{{item.content}}</div>
                </el-col>
              </el-row>
            </div>



          </div>

        </div>
      </div>
    </lj-dialog>



    <!--新建会议-->
    <lj-dialog
      :visible="add_meeting_dialog_visible"
      :size="{width: 520 + 'px',height: 670 + 'px'}"
      @close="add_meeting_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建会议</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form :model="add_meeting_form" style="text-align: left" size="small" label-width="100px">

            <el-form-item label="会议主题">
              <el-input v-model="add_meeting_form.meetingTheme" placeholder="请输入会议主题" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item label="会议室">
              <el-select v-model="add_meeting_form.meetingRoom" placeholder="请选择会议室" style="width: 320px">
                <el-option :value="1" label="会议室1"></el-option>
              </el-select>
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="add_meeting_room_dialog_visible = true">+</span>
            </el-form-item>

            <el-form-item label="会议类型">
              <el-select v-model="add_meeting_form.meetingType" placeholder="请选择会议类型" style="width: 320px">
                <el-option :value="1" label="会议类型1"></el-option>
              </el-select>
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="add_meeting_type_dialog_visible = true">+</span>
            </el-form-item>

            <el-form-item label="会议时间">
             <date-time-picker :width="320" date-type="timerange"></date-time-picker>
            </el-form-item>

            <el-form-item label="主持人">
              <el-input v-model="add_meeting_form.compere" placeholder="请输入主持人" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item label="应到人数">
              <el-input v-model="add_meeting_form.counts" placeholder="请输入应到人数" style="width: 320px">
              </el-input>
            </el-form-item>


            <el-form-item label="会议提醒">
              <div class="form-item-content">
                会议开始前<span class="span-input">3</span>小时<span class="span-input">20</span>分钟提醒
              </div>
            </el-form-item>

            <el-form-item label="选择人员">
              <el-input @focus="organSearch(item)" v-model="showName.staff" placeholder="请选择人员" readonly></el-input>
            </el-form-item>

            <el-form-item label="上传附件">
              <div class="icons-upload"></div>
            </el-form-item>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
        </div>
      </div>
    </lj-dialog>



    <!--添加会议室-->
    <lj-dialog
      :visible="add_meeting_room_dialog_visible"
      :size="{width: 500 + 'px',height: 300 + 'px'}"
      @close="add_meeting_room_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加会议室</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-room-container">
          <el-form :model="add_meeting_room_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item label="会议室名称">
              <el-input v-model="add_meeting_room_form.meetingRoom" placeholder="必填" style="width: 300px">
              </el-input>
            </el-form-item>
            <div @click="view_meeting_room_dialog_visible = true" class="right-tip">查看会议室</div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="add_meeting_room_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--查看会议室dialog-->
    <lj-dialog
      :visible="view_meeting_room_dialog_visible"
      :size="{width: 500 + 'px',height: 700 + 'px'}"
      @close="view_meeting_room_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>会议室名称</h3>
        </div>
        <div class="dialog_main borderNone view-meeting-room-container">
          <div class="meeting-room-list">
            <div class="meeting-room-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">大会议室</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="meeting-room-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">大会议室</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="meeting-room-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">大会议室</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>



    <!--添加会议类型-->
    <lj-dialog
      :visible="add_meeting_type_dialog_visible"
      :size="{width: 500 + 'px',height: 300 + 'px'}"
      @close="add_meeting_type_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加会议类型</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-type-container">
          <el-form :model="add_meeting_type_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item label="会议类型名称">
              <el-input v-model="add_meeting_type_form.meetingType" placeholder="必填" style="width: 300px">
              </el-input>
            </el-form-item>
            <div @click="view_meeting_type_dialog_visible = true" class="right-tip">查看会议类型</div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="add_meeting_type_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--查看会议类型dialog-->
    <lj-dialog
      :visible="view_meeting_type_dialog_visible"
      :size="{width: 500 + 'px',height: 700 + 'px'}"
      @close="view_meeting_type_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>会议类型名称</h3>
        </div>
        <div class="dialog_main borderNone view-meeting-type-container">
          <div class="meeting-type-list">
            <div class="meeting-type-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">会议类型</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="meeting-type-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">会议类型</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="meeting-type-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">会议类型</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>

    <work-info :work-info="work_info" :event-data-list="event_data_list"
               @change="handleChangeDate"></work-info>

    <!--组织架构选人-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

  </div>
</template>

<script>
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import DateTimePicker from '../../common/lightweightComponents/datetimepicker';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import WorkInfo from '../components/work-info';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      MenuList,
      LjDialog,
      DateTimePicker,
      StaffOrgan,
      WorkInfo,
    },
    data() {
      return {
        humanResource,
        resourceDepart,


        //侧滑栏数据
        show_market: false,
        work_info: [
          {work: '穿铠甲', val: '10'},
          {work: '攻下小城池', val: '6'},
          {work: '攻下大城池', val: '3'},
          {work: '攻下国家', val: '3'},
        ],

        event_data_list: [
          {
            title:'事件占有率:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'十佳萌新:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'十佳老司机:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title:'赏善令:',
            value:[
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          }
        ],
        event_data: [
          {value: 500, name: '一般'},
          {value: 300, name: '特殊'},
          {value: 200, name: '紧急'}
        ],





        staffModule: false,//组织架构
        organData: {},
        showName: {},
        //chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门

        dateValue: new Date(),
        weekList: ['一', '二', '三', '四', '五', '六', '日'],
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        daysList: [],
        monthContent: '',


        /*dialog 群组*/
        //周例会详情
        weekly_meeting_dialog_visible: false,
        weekly_meeting_form: {
          meetingTheme: '乐伽周期会',//开会主题
          applyPerson: '张三',//申请人
          meetingRoom: '大会议室',//会议室
          compere: '李四',//主持人
          arrival: '19/19',//应到/实到
          meetingTip: {
            hours: '3',
            minutes: '30'
          },
          participant: [
            {
              id: '1',
              name: '张三'
            },
            {
              id:'2',
              name:'李四'
            }
          ],//参加人员
          accessory:{},//上传附件
          feedback:'',//反馈
        },

        //会议个数dialog
        meeting_counts_dialog_visible:false,
        meeting_counts_form: [
          {
            title:'公司周例会',
            content:'02-03 09:00-16:35'
          },
          {
            title:'公司2周例会',
            content:'02-03 09:00-16:35'
          },
          {
            title:'公司3周例会',
            content:'02-03 09:00-16:35'
          },
          {
            title:'公司4周例会',
            content:'02-03 09:00-16:35'
          },
        ],


        //新建会议
        add_meeting_dialog_visible: false,
        add_meeting_form: {//会议form表单
          meetingTheme: '',//会议主题
          meetingRoom: '',//会议室
          meetingType: '',//会议类型
          meetingTime:'',//会议时间
          compere:'',//主持人
          counts:'',//应到人数
          meetingTips:{},//会议提醒
          chooseMember:'',//选择人员
          upload:'',//上传附件
        },


        //添加会议室dialog
        add_meeting_room_dialog_visible: false,
        add_meeting_room_form: {
          meetingRoom: '',//会议室
        },

        //查看会议室dialog
        view_meeting_room_dialog_visible: false,

        //添加会议类型dialog
        add_meeting_type_dialog_visible: false,
        add_meeting_type_form: {
          meetingType: '',//会议类型
        },

        //查看会议类型dialog
        view_meeting_type_dialog_visible: false,

      }
    },
    mounted() {
      //this.initDaysList(this.dateValue);
    },
    activated() {
    },
    watch: {
      dateValue: {
        handler() {
          this.initDaysList(this.dateValue);
        },
        immediate: true
      },
    },
    computed: {},
    methods: {
      handleChangeDate(id) {

      },
      hiddenOrgan(ids, names, arr) {
        this.staffModule = false;
        if (ids !== 'close') {
          //this.params[this.organKey] = ids;
          this.showName['staff'] = names;
        }
      },
      // 组织架构筛选
      organSearch(val = {}) {
        this.staffModule = true;
        this.organData = val.value;
        this.organKey = val.keyName;
      },


      contentDelete(index, todoListIndex) {
        //console.log(this.daysList);
        this.daysList[index].todoList.splice(todoListIndex, 1);

        //this.initDaysList();//重新渲染数据
      },

      //处理会议点击事件
      handleDialog(item) {
        this.weekly_meeting_dialog_visible = true;
        console.log(item);
      },


      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },

      initDaysList(date) {
        if (date) {
          let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
          daysList.forEach((item, index) => {
            item.id = ++index;
          })
          this.daysList = daysList;
        } else {
          this.monthContent = '';
          this.daysList = [];
        }

      },






      /*下面为不需要业务的代码*/



      //获取date月当月天总数,参数二可获取其他月天总数(需传特定值)
      getDaysCount(date, setmonth = 0) {
        let curDate = new Date(date);
        /* 获取当前月份 */
        let curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1 + setmonth);
        /* 将日期设置为0 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
      },
      //获取某月第一天是周几
      getCurrMonthFirstWeek(date) {
        let curDate = new Date(date);
        curDate.setDate(1);
        return curDate.getDay() || 7;
      },
      //获取某月最后一天是周几
      getCurrMonthLastWeek(date) {
        let curDate = new Date(date);
        curDate.setDate(this.getDaysCount(date));
        return curDate.getDay() || 7;
      },
      //获取上月存留日历几天-->日历页面前部灰色日期
      getPrevMonthRestList(date) {
        let arr = [];
        let lastMonthRest = this.getCurrMonthFirstWeek(date) - 1;//获取上月余几天
        let lastMonthCounts = this.getDaysCount(date, -1);
        for (let i = lastMonthCounts - lastMonthRest + 1; i <= lastMonthCounts; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, -1),
            today: false,
            type: 'prev',//用来区分 上月本月下月字体颜色 本月黑 上下月灰
            tips: '3',
            todoType: 'default',//严重程度 用来区分时间线颜色
            todoList: [
              {
                id: 1,
                content: '09:00-11:00 周会',
                type: 'danger'
              }, {
                id: 2,
                content: '09:00-11:00 周会',
                type: 'default'
              },
              {
                id: 3,
                content: '09:00-11:00 周会',
                type: 'danger'
              },
            ],
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },

      getCurrentMonthList(date) {
        let days = this.getDaysCount(date);
        let months = this.getCurrentMonth(date);
        this.monthContent = this.monthList[months - 1];
        let arr = [];
        let curDay = this.getCurrentDay();
        for (let i = 1; i <= days; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, 1),
            today: curDay == i && this.getCurrentMonth() == this.getCurrentMonth(date),
            type: 'cur',
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },
      //获取当前时间下 今日几号
      getCurrentDay() {
        let date = new Date();
        let day = date.getDate();
        return day;
      },
      //获取当前时间下 几月  不传参默认当月
      getCurrentMonth(date = new Date()) {
        let curDate = new Date(date);
        let curMonth = curDate.getMonth() + 1;
        return curMonth;
      },

      //获取下月存留日历几天-->日历页面前部灰色日期
      getNextMonthRestList(date) {
        let arr = [];
        let nextMonthRest = 7 - this.getCurrMonthLastWeek(date);//获取下月余几天
        let nextMonthCounts = this.getDaysCount(date, 1);
        for (let i = 1; i <= nextMonthRest; i++) {
          let obj = {
            datetime: this.getDateTimeByDay(date, i, 1),
            today: false,
            type: 'next',
            date: i
          };
          arr.push(obj);
        }
        return arr;
      },


      //通过当日几号和月份传入获取日期格式
      getDateTimeByDay(date, dayIndex, setMonth = 0) {
        let cDate = new Date(date);
        let curMonth = cDate.getMonth();
        cDate.setMonth(curMonth + setMonth);
        cDate.setDate(dayIndex);
        return this.formatDate(cDate, 'yyyy-MM-dd');
      },

      /**
       格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
       */
      formatDate(v, format) {
        if (!v) return "";
        let d = v;
        if (typeof v === 'string') {
          if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
          else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
        }
        let o = {
          "M+": d.getMonth() + 1,  //month
          "d+": d.getDate(),       //day
          "h+": d.getHours(),      //hour
          "m+": d.getMinutes(),    //minute
          "s+": d.getSeconds(),    //second
          "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
          "S": d.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }
        return format;
      }

    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/humanResource/discussPolitics/index";

  @mixin discussPoliticsImg($m, $n) {
    $url: '../../../assets/image/humanResource/discussPolitics/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #discussPolitics {
      .icons-delete {
        @include discussPoliticsImg('shanchu.png', 'theme1')
      }
      .icons-delete-red {
        @include discussPoliticsImg('shanchu1.png', 'theme1')
      }
      .icons-upload {
        @include discussPoliticsImg('ckfj.png','theme1')
      }
    }
  }
</style>
