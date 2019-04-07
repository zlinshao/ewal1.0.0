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
              <div @click="showAddNewMeetingDialog(item)" v-for="item in daysList" class="calendar-day-item">
                <div class="calendar-day-item-container">
                  <div class="calendar-day-item-container-tip">
                    <el-badge :value="item.todoList.length>0?item.todoList.length:''" class="item">
                      <div :class="{'gray':item.type=='prev'||item.type=='next','current':item.today}"
                           class="calendar-day-item-container-date">
                        {{item.date}}
                      </div>
                    </el-badge>
                  </div>
                  <div class="calendar-day-item-container-content">
                    <div @click.stop="openMeetingDialog(contentItem)"
                         :class="[contentItem.status==0?'default':contentItem.type==1?'warning':'danger']"
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
          <div @click="getCurrentSelectMonthMeetingCounts" class="monthTitle">
            <span title="本月会议数">{{monthContent}}</span>
          </div>
          <!--时间线-->
          <div class="timeline">
            <el-timeline>
              <el-timeline-item
                :key="index"
                :color="item.todoType==0?'#50E38F':item.todoType==1?'#FFDC75':'#FF7A3C'"
                v-if="item.todoList&&item.todoList.length>0" v-for="(item,index) in daysList" :timestamp="item.datetime"
                placement="top">
                <el-card>
                  <div :class="{prev:item.type=='prev'}" class="timeline-item-container">
                    <div :class="{'cancel-status':contentItem.status==2}" class="timeline-item-container-content-item"
                         @click="openMeetingDialog(contentItem)"
                         :title="contentItem.content" v-for="(contentItem,contentItemIndex) in item.todoList">
                      {{contentItem.content}}
                      <span v-if="contentItem.status==0" title="取消"
                            @click.stop="cancelMeeting(contentItem,index,contentItemIndex)"
                            class="icons-delete"></span>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>

    <!--会议详情  -->
    <lj-dialog :visible="meeting_detail_dialog_visible"
               :size="{width: 800 + 'px',height: 600 + 'px'}"
               @close="meeting_detail_dialog_visible = false">
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
                  <div class="form-item-content">{{meeting_detail_form.meetingTheme}}</div>
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
                    会议开始前<span class="form-item-content-span-input">3</span>小时<span
                    class="form-item-content-span-input">20</span>分钟提醒
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
                    <el-input type="textarea" v-model="meeting_detail_form.feedback"></el-input>
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
          <h3>本月会议数:{{meeting_counts_form.length}}</h3>
        </div>
        <div class="dialog_main flex-center borderNone">

          <div class="meeting-counts-container">

            <div @click="meeting_detail_dialog_visible = true" class="form-item" v-for="item in meeting_counts_form">
              <el-row :gutter="80">
                <el-col :span="10">
                  <div class="form-item-title">{{item.name}}</div>
                </el-col>
                <el-col :span="14">
                  <div class="form-item-content">{{item.timeContent}}</div>
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
      :size="{width: 520 + 'px',height: 650 + 'px'}"
      @close="add_meeting_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建会议</h3>

          <div class="header_right">
            <div>{{add_meeting_form.currentDate}}</div>
          </div>

        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form :model="add_meeting_form" style="text-align: left" size="small" label-width="100px">

            <el-form-item label="会议主题">
              <el-input v-model="add_meeting_form.name" placeholder="请输入会议主题" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item label="会议室">
              <dropdown-list ref="dropdown1" :url="`${this.url}meeting/category`" code="1"
                             v-model="add_meeting_form.room_id"></dropdown-list>
              <!--<el-select v-model="add_meeting_form.meetingRoom" placeholder="请选择会议室" style="width: 320px">
                <el-option :value="1" label="会议室1"></el-option>
              </el-select>-->
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="openMeetingRoomOrType(1)">+</span>
            </el-form-item>

            <el-form-item label="会议类型">
              <dropdown-list ref="dropdown2" :url="`${this.url}meeting/category`" code="2"
                             v-model="add_meeting_form.meeting_type"></dropdown-list>
              <!--<el-select v-model="add_meeting_form.meetingType" placeholder="请选择会议类型" style="width: 320px">
                <el-option :value="1" label="会议类型1"></el-option>
              </el-select>-->
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="openMeetingRoomOrType(2)">+</span>
            </el-form-item>

            <el-form-item label="会议时间">
              <date-time-picker ref="meetingTime" :width="320" date-type="timerange"></date-time-picker>
            </el-form-item>

            <el-form-item label="主持人">
              <user-choose title="请选择主持人" v-model="add_meeting_form.presenter_id"></user-choose>
              <!--<el-input v-model="add_meeting_form.compere" placeholder="请输入主持人" style="width: 320px">
              </el-input>-->
            </el-form-item>

            <!--<el-form-item label="应到人数">
              <el-input v-model="add_meeting_form.counts" placeholder="请输入应到人数" style="width: 320px">
              </el-input>
            </el-form-item>-->

            <el-form-item label="会议提醒">
              <div class="form-item-content">
                会议开始前
                <el-input-number size="mini" :min="0" :max="23" style="width: 90px"
                                 v-model="add_meeting_form.remind_data.hour"></el-input-number>
                小时
                <el-input-number size="mini" :min="0" :max="59" style="width: 90px"
                                 v-model="add_meeting_form.remind_data.minute"></el-input-number>
                分钟提醒
                <!--                会议开始前<span class="span-input">3</span>小时<span class="span-input">20</span>分钟提醒-->
              </div>
            </el-form-item>

            <el-form-item label="选择人员">
              <user-choose title="请选择人员" v-model="add_meeting_form.participants"></user-choose>
              <!--              <el-input @focus="organSearch(item)" v-model="showName.staff" placeholder="请选择人员" readonly></el-input>-->
            </el-form-item>

            <el-form-item align="center" label="上传附件">
              <lj-upload v-model="add_meeting_form.attachment" size="40"
                         style="position: absolute; top: -12px;"></lj-upload>
              <!--              <div class="icons-upload"></div>-->
            </el-form-item>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="addNewMeeting">提交</el-button>
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
            <div @click="viewMeetingRoomOrType(1)" class="right-tip">查看会议室</div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveMeetingRoomOrType(1)">保存</el-button>
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

            <div v-for="item in view_meeting_room_data" class="meeting-room-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">{{item.name}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red" @click="deleteMeetingRoomOrType(item,1)"></span>
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
            <div @click="viewMeetingRoomOrType(2)" class="right-tip">查看会议类型</div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveMeetingRoomOrType(2)">保存</el-button>
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
            <div v-for="item in view_meeting_type_data" class="meeting-type-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">{{item.name}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icons-delete-red" @click="deleteMeetingRoomOrType(item,2)"></span>
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


    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

  </div>
</template>

<script>
  import utils from '../../../utils/myUtils';
  import MenuList from '../../common/menuList.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import DateTimePicker from '../../common/lightweightComponents/datetimepicker';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import WorkInfo from '../components/work-info';
  import DropdownList from '../../common/lightweightComponents/dropdown-list';
  import UserChoose from '../../common/lightweightComponents/UserChoose';
  import LjUpload from '../../common/lightweightComponents/lj-upload';
  import _ from "lodash";
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      MenuList,
      LjDialog,
      DateTimePicker,
      StaffOrgan,
      WorkInfo,
      UserChoose,
      DropdownList,
      LjUpload,
    },
    data() {
      return {
        humanResource,
        resourceDepart,

        url: globalConfig.humanResource_server,

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
            title: '事件占有率:',
            value: [
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title: '十佳萌新:',
            value: [
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title: '十佳老司机:',
            value: [
              {value: 500, name: '一般'},
              {value: 300, name: '特殊'},
              {value: 200, name: '紧急'}
            ]
          },
          {
            title: '赏善令:',
            value: [
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

        //chooseTab: null,//tab切换
        visibleStatus: false,//弹出部门

        dateValue: new Date(),
        weekList: ['一', '二', '三', '四', '五', '六', '日'],
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        daysList: [],
        monthContent: '',

        /*dialog 群组*/
        //会议详情
        meeting_detail_dialog_visible: false,
        meeting_detail_form: {
          name: '乐伽周期会',//开会主题
          applyPerson: '张三',//申请人
          meetingRoom: '大会议室',//会议室
          compere: '李四',//主持人
          //arrival: '19/19',//应到/实到
          remind_data: {
            hours: 0,
            minutes: 0
          },
          participant: [
            {
              id: '1',
              name: '张三'
            },
            {
              id: '2',
              name: '李四'
            }
          ],//参加人员
          attachment: {},//上传附件
          //feedback: '',//反馈
        },

        //会议个数dialog
        meeting_counts_dialog_visible: false,
        meeting_counts_form: [],


        //新建会议
        currentSelectionDate: '',
        add_meeting_dialog_visible: false,
        add_meeting_form: {//会议form表单
          currentDate: '',
          name: '',//会议主题--会议名称
          room_id: '',//会议室id
          meeting_type: '',//会议类型id
          //meetingTime:'',//会议时间
          start_time: '',//会议开始时间
          end_time: '',//会议开始时间
          presenter_id: [],//主持人id数组
          //counts:'',//应到人数
          //meetingTips:{},//会议提醒
          remind_data: {
            minute: 0,
            hour: 1,
          },
          participants: [],//参会人员数组
          attachment: [],//附件id
        },


        //添加会议室dialog
        add_meeting_room_dialog_visible: false,
        add_meeting_room_form: {
          meetingRoom: '',//会议室
        },

        //查看会议室dialog
        view_meeting_room_dialog_visible: false,
        view_meeting_room_data: [],//data


        //添加会议类型dialog
        add_meeting_type_dialog_visible: false,
        add_meeting_type_form: {
          meetingType: '',//会议类型
        },

        //查看会议类型dialog
        view_meeting_type_dialog_visible: false,
        view_meeting_type_data: [],
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
      //获取当前选取月份会议详情
      getCurrentSelectMonthMeetingCounts() {
        this.meeting_counts_dialog_visible = true;
        let startDate = utils.formatDate(this.dateValue, 'yyyy-MM-01 00:00:00');
        let endDate = this.lastTimeOfMonth(this.dateValue);
        //this.dateValue;
        this.$http.get(`${this.url}/meeting/meeting?date[]=${startDate}&date[]=${endDate}`).then(res => {
          debugger
          if (res.code.endsWith('0')) {
            this.meeting_counts_form = _.forEach(res.data.data, (value) => {
              value.timeContent = `${utils.formatDate(value.start_time, 'MM-dd hh:mm')} - ${utils.formatDate(value.end_time, 'hh:mm')}`;
              return value;
            });
          }
        });
      },

      //添加新会议
      addNewMeeting() {
        let curDate = this.currentSelectionDate.datetime;
        let params = {
          ...this.add_meeting_form,
          start_time: `${curDate} ${this.$refs.meetingTime.startTime}:00`,
          end_time: `${curDate} ${this.$refs.meetingTime.endTime}:00`,
        };
        delete params['currentDate'];
        this.$http.post(`${this.url}/meeting/meeting`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: '添加会议成功',
            });
            this.add_meeting_dialog_visible = false;
            this.initDaysList(this.dateValue);
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: '添加会议失败',
            });
          }
        });
      },

      showAddNewMeetingDialog(item) {

        debugger
        this.add_meeting_form.currentDate = utils.formatDate(item.datetime, 'MM月dd日');
        //this.add_meeting_form = [];
        this.currentSelectionDate = item;
        //item.datetime  '2019-04-05'
        this.add_meeting_dialog_visible = true;
      },
      //打开会议相关
      openMeetingRoomOrType(type) {//type = 1 添加会议室    type = 2 添加会议类型
        if (type == 1) {//会议室
          this.add_meeting_room_dialog_visible = true;
        } else if (type == 2) { //会议类型
          this.add_meeting_type_dialog_visible = true;
        }
      },
      //保存会议类型相关
      saveMeetingRoomOrType(type) {
        let name;
        if (type == 1) {//会议室
          this.add_meeting_room_dialog_visible = true;
          name = this.add_meeting_room_form.meetingRoom;
        } else if (type == 2) { //会议类型
          this.add_meeting_type_dialog_visible = true;
          name = this.add_meeting_type_form.meetingType;
        }
        if (name) {
          let params = {name, type};
          this.$http.post(`${this.url}/meeting/category`, params).then(res => {
            if (res.code.endsWith('0')) {
              this.$LjNotify('success', {
                title: '成功',
                message: '添加成功',
              });
              this.$refs[`dropdown${type}`].update();
              this.add_meeting_room_dialog_visible = false;
              this.add_meeting_type_dialog_visible = false;
              this.add_meeting_room_form.meetingRoom = '';
              this.add_meeting_type_form.meetingType = '';
            } else {
              this.$LjNotify('error', {
                title: '失败',
                message: '添加失败'
              });
            }
          });
        }
      },
      //查看会议相关
      viewMeetingRoomOrType(type) {
        if (type == 1) {
          this.view_meeting_room_dialog_visible = true;
        } else if (type == 2) {
          this.view_meeting_type_dialog_visible = true;
        }

        let params = {type}
        this.$http.get(`${this.url}/meeting/category`, params).then(res => {
          if (res.code.endsWith('0')) {
            if (type == 1) {
              this.view_meeting_room_data = res.data.data;
            } else if (type == 2) {
              this.view_meeting_type_data = res.data.data;
            }
          }
        });
      },
      //删除会议类型相关
      deleteMeetingRoomOrType(item, type) {
        if (item && item.id) {
          this.$LjConfirm({icon: 'delete'}).then(() => {
            this.$http.delete(`${this.url}/meeting/category/${item.id}`).then(res => {
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: '删除成功',
                });
                this.viewMeetingRoomOrType(type);
                this.$refs[`dropdown${type}`].update();
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: '删除失败',
                });
              }
            });
          })
        }
      },

      handleChangeDate(id) {

      },
      //取消会议
      cancelMeeting(item, index, todoListIndex) {
        debugger
        //console.log(this.daysList);
        this.$LjConfirm({content: '确定要取消吗？'}).then(res => {
          /*let params = {...item};
          params.status = 2;*/
          let params = {
            status: 2
          };
          this.$http.put(`${this.url}/meeting/meeting/${item.id}/status`, params).then(res => {
            debugger
            if (res.code.endsWith('0')) {
              this.$LjNotify('success', {
                title: '成功',
                message: '取消成功',
              });
              this.initDaysList(this.timeValue);
              //this.daysList[index].todoList.splice(todoListIndex, 1);
            } else {
              this.$LjNotify('error', {
                title: '失败',
                message: '取消失败',
              });
            }
          });


        });
        //this.initDaysList();//重新渲染数据
      },

      //处理会议点击事件 打开会议详情表单
      openMeetingDialog(value) {
        debugger

        this.meeting_detail_dialog_visible = true;

        this.$http.get(`${this.url}/meeting/meeting/${value.id}`).then(res => {
          if (res.code.endsWith('0')) {
            debugger
            let item = res.data;
            let applyPerson = _.find(item.users, {'user_id': item.user_id});//申请人
            let compere =
              this.meeting_detail_form = {
                name: item.name,//会议名称
                applyPerson: applyPerson,//申请人
                meetingRoom: item.room?.name,//会议室
                remind_data: item.remind_data,//提醒时间

                attachment: item.attachment,//附件
              };
          }
        });


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
          });
          //处理数据
          let startTime = utils.formatDate(daysList[0].datetime, 'yyyy-MM-dd hh:mm:ss');
          let endTime = utils.formatDate(daysList[daysList.length - 1].datetime, 'yyyy-MM-dd hh:mm:ss');
          let params = {data: [startTime, endTime]};

          let tempData = [];

          this.$http.get(`${this.url}/meeting/meeting`, params).then(res => {
            if (res.code.endsWith('0')) {
              tempData = res.data.data;
              //let mStatus = [];//盛放当天所有会议状态
              _.forEach(tempData, (value) => {
                let curData = utils.formatDate(value.start_time);
                let mIdx = _.findIndex(daysList, (o) => {
                  return o.datetime == curData;
                });
                if (mIdx !== -1) {
                  let sObj = {
                    ...value,
                    content: `${utils.formatDate(value.start_time, 'hh:mm')}-${utils.formatDate(value.end_time, 'hh:mm')} ${value.name}`
                  };
                  //mStatus.push(sObj.status);
                  debugger
                  daysList[mIdx].todoType = sObj.status > (daysList[mIdx].todoType || 0) ? sObj.status : (daysList[mIdx].todoType || 0);
                  daysList[mIdx].todoList.push(sObj);
                }
                //console.log(curData);
              });
              this.daysList = daysList;
              /*tempData.forEach((item,index)=> {
                let data = utils.formatDate(item.created_at);

              })*/
            }
          });

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
            //todoList.length>0?: '3',
            todoType: 0,//严重程度 用来区分时间线颜色
            todoList: [
              /*{
                id: 1,
                content: '09:00-11:00 周会',
                status: 0
              }, {
                id: 2,
                content: '09:00-11:00 周会',
                status: 1
              },
              {
                id: 3,
                content: '09:00-11:00 周会',
                status: 2
              },*/
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
            datetime: this.getDateTimeByDay(date, i, 0),
            today: curDay == i && this.getCurrentMonth() == this.getCurrentMonth(date),
            type: 'cur',
            todoType: 0,//严重程度 用来区分时间线颜色
            todoList: [],
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
            todoType: 0,//严重程度 用来区分时间线颜色
            todoList: [],
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
      },


      //某月最后一天时间
      lastTimeOfMonth(datetime) {
        let startDate = new Date(datetime);
        startDate.setDate(1); //第一天

        let endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1)
        endDate.setDate(0);

        let date = endDate;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = '23';
        let minute = '59';
        let second = '59';
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ":" + second;
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
        @include discussPoliticsImg('ckfj.png', 'theme1')
      }
    }
  }
</style>
