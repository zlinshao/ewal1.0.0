<template>
  <div id="attence" class="attence">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <!--<div class="icons add" @click="new_train_visible = true"><b>+</b></div>-->
        <div v-if="chooseTab==1" style="display: inline-flex;justify-content: flex-end">
          <month-choose v-model="monthValue"></month-choose>
          <!--          <el-button>导入报表</el-button>-->
          <button-upload v-if="$storage.get('VALIDATE_PERMISSION')['Month-Summary-Import']"></button-upload>
        </div>
        <div v-if="chooseTab==2" style="display: inline-block;width:230px;margin-right: 0">
          <year-choose v-model="yearValue"></year-choose>
        </div>
      </div>

    </div>
    <div class="main-nav">

      <div class="nav-left">
        <span
          v-for="item in chooseTabs"
          :key="item.id"
          :class="{'isActive': item.id === chooseTab}"
          @click="changeTabs(item)"
        >{{ item.val }}</span>
      </div>
      <div v-if="chooseTab==1" class="nav-right changeChoose">
        <!--<span style="color: #0BB07B;" v-if="tableSettingData.attence.isShowMultiSelection==false"
              @click="tableSettingData.attence.isShowMultiSelection = true">选择</span>

        <span class="button-all-close" v-if="tableSettingData.attence.isShowMultiSelection">
          <span @click="toggleSelection(tableSettingData.attence.tableData)">全选/</span>
          <span @click="tableSettingData.attence.isShowMultiSelection = false">取消</span>
        </span>-->
        <el-checkbox v-model="tableSettingData.attence.isLeave">离职员工</el-checkbox>
        <org-choose num="1" width="200" title="请选择部门" v-model="tableSettingData.attence.departmentId"></org-choose>
        <span v-if="$storage.get('VALIDATE_PERMISSION')['Attendance-Confirmation-Form-Add']" @click="confirmAttence" class="colorE33">生成考勤确认表</span>
      </div>
      <div v-if="chooseTab==2" class="nav-right">
        <org-choose width="140" v-model="tableSettingData.confirm.departmentId" title="请选择部门"></org-choose>
      </div>
    </div>
    <div v-if="chooseTab==1" class="attence-container">
      <div class="attence-table">
        <div class="mainListTable changeChoose" :style="{'height': '100%'}">
          <el-table
            ref="multipleTable"
            :data="tableSettingData.attence.tableData"
            :border="true"
            @selection-change="handleSelectionChange"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            @row-dblclick="tableDblClick($event,'attence')"
            header-row-class-name="tableHeader"
            :row-style="{height:'60px'}"
            style="width: 100%;height: 100%">
            <el-table-column
              :selectable='isDisabled'
              v-if="tableSettingData.attence.isShowMultiSelection"
              type="selection"
              width="50" align="center">
            </el-table-column>
            <el-table-column
              key="name"
              align="center"
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              key="department"
              align="center"
              width="160"
              prop="department"
              label="部门">
            </el-table-column>
            <el-table-column
              key="post"
              align="center"
              prop="post"
              label="岗位">
            </el-table-column>
            <el-table-column
              key="attRest"
              align="center"
              width="120"
              prop="attRest"
              label="出勤统计">
              <template slot-scope="scope">
                <span style="cursor: pointer" @click="showAttRest(scope.row)"
                      class="colorE33">{{scope.row.attRest}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              label="出勤班次">
              <el-table-column
                key="network"
                align="center"
                prop="network"
                width="100"
                label="网络">
              </el-table-column>
              <el-table-column
                key="civil"
                align="center"
                prop="civil"
                width="100"
                label="文职">
              </el-table-column>
              <el-table-column
                key="early"
                align="center"
                prop="early"
                width="100"
                label="早班">
              </el-table-column>
              <el-table-column
                key="last"
                align="center"
                prop="last"
                width="100"
                label="晚班">
              </el-table-column>

            </el-table-column>
            <el-table-column
              key="lack"
              align="center"
              prop="lack"
              width="110"
              label="迟到缺卡次数">
            </el-table-column>
            <el-table-column
              key="kuanggong"
              align="center"
              prop="kuanggong"
              label="旷工天数">
            </el-table-column>
            <el-table-column
              key="chuchai"
              align="center"
              prop="chuchai"
              label="出差天数">
            </el-table-column>
            <el-table-column
              key="gongchu"
              align="center"
              prop="gongchu"
              label="公出时长">
            </el-table-column>
            <!--<el-table-column
              key="qingjia"
              align="center"
              prop="qingjia"
              label="请假时长">
            </el-table-column>-->
            <el-table-column
              key="jiaban"
              align="center"
              prop="jiaban"
              label="加班统计">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              width="150"
              key="remarks"
              align="center"
              prop="remarks"
              label="备注">
            </el-table-column>
            <el-table-column
              key="status"
              align="center"
              prop="status"
              width="110"
              label="考勤确认结果">
              <template slot-scope="scope">
                <div class="table-operate"
                     :class="[scope.row.status==1?'no-send':'send']">
                  {{scope.row.status===0?'未确认':scope.row.status===1?'已确认':'-'}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="attence-pagination flex-center">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange($event,'attence')"
            :current-page="tableSettingData.attence.params.page"
            :page-size="tableSettingData.attence.params.limit"
            :total="tableSettingData.attence.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="chooseTab==2" class="confirm-container">
      <div class="confirm-table">
        <div class="mainListTable changeChoose" :style="{'height': '100%'}">
          <el-table
            :data="tableSettingData.confirm.tableData"
            :border="true"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            @row-dblclick="tableDblClick($event,'confirm')"
            header-row-class-name="tableHeader"
            :row-style="{height:'80px'}"
            style="width: 100%;height: 100%">
            <el-table-column
              key="department"
              align="center"
              width="160"
              prop="department"
              label="">
            </el-table-column>
            <el-table-column
              v-for="item in Object.keys(tableSettingData.confirm.showData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.confirm.showData[item]">
              <template slot-scope="scope" id="templadd" style="height: 100%">
                <!--                <div>{{scope.row[item]}}</div>-->
                <!--                <div style="width: 100%;height: 60px;background-color: red;"></div>-->
                <div @click="sendAttenceResult(scope.row[item])" v-if="Object.keys(scope.row[item]).length>0"
                     class="icon-pdf">
                  <div v-if="scope.row[item].is_send==0" class="icon-no-send"></div>
                  <div v-if="scope.row[item].is_send==1" class="icon-sent"></div>
                </div>
                <div v-else>-</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="confirm-pagination flex-center">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange($event,'confirm')"
            :current-page="tableSettingData.confirm.params.page"
            :page-size="tableSettingData.confirm.params.limit"
            :total="tableSettingData.confirm.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </div>
    </div>

    <lj-dialog
      :size="{width:'70%',height:'95%'}"
      :visible.sync="tableSettingData.attence.table_dialog_visible">
      <div class="att-rest-container">
        <div class="container-top">详情</div>
        <div class="container-middle">
          <div class="middle-item bg-default"
               @click="tableSettingData.attence.table_dialog_choose_tab=item.id"
               :class="{checked:tableSettingData.attence.table_dialog_choose_tab==item.id}"
               v-for="item in tableSettingData.attence.table_dialog_tabs">
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="container-bottom">
          <div v-if="tableSettingData.attence.table_dialog_choose_tab==1" class="container-bottom-tab1 scroll_bar">
            <div class="bottom-tip">{{monthContent}}
              出勤天数：{{tableSettingData.attence.formData.attendance_day}}，休息天数：{{tableSettingData.attence.formData.rest_day}}
            </div>
            <div class="bottom-calendar">
              <calendar lang="en" :datetime="monthValue">
                <div :slot="'slot'+item.id" v-for="item in daysList"
                     class="calendar-days-item" :class="{rest:item.week==0||item.week==6,current:item.today}"
                >
                  <div class="days-item-content-container"
                       :class="{colorE33:item.attendance_data&&item.attendance_data!=='正常'&&!item.today}">
                    <span class="days-item-content-date">{{item.date}}</span>
                    <span style="font-size: 13px" v-if="item.attendance_data">{{item.attendance_data}}</span>

                  </div>
                  <!--<div>{{item.datetime}}</div>-->
                </div>
              </calendar>
            </div>
            <div class="bottom-other">
              <div class="container-bottom-other">
                <div class="bottom-tip">{{monthContent}} 请假统计：{{tableSettingData.attence.formData.vacate_count}}</div>
                <div class="bottom-container">

                  <div class="check-record-container">

                    <div v-for="item in vacateList" class="check-record-item">
                      <div class="check-record-item-top">
                        <span>{{item.tip}}</span></div>
                      <div class="check-record-item-bottom">
                        <span>{{item.value}}</span></div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          <div v-if="tableSettingData.attence.table_dialog_choose_tab==2" class="container-bottom-tab2">
            <div class="bottom-tip">{{monthContent}} 迟到/缺卡次数：{{tableSettingData.attence.formData.lack}}</div>
            <div class="bottom-container">

              <div class="check-record-container">

                <div v-for="item in attendanceList" class="check-record-item">
                  <div class="check-record-item-top">
                    <span>{{item.tip}}</span></div>
                  <div class="check-record-item-bottom">
                    <span>{{item.value}}</span></div>
                </div>
              </div>

            </div>
          </div>

          <div v-if="tableSettingData.attence.table_dialog_choose_tab==3" class="container-bottom-tab3">
            <div class="bottom-tip">{{monthContent}} 加班统计：{{tableSettingData.attence.formData.jiaban}}</div>
            <div class="bottom-container">

              <div class="check-record-container">

                <div class="check-record-item">
                  <div class="check-record-item-top">
                    <span style="font-weight: 700">加班-审批单统计</span></div>
                  <div class="check-record-item-bottom">
                    <span>{{tableSettingData.attence.formData.jiaban_data1}}</span></div>
                </div>
                <div class="check-record-item">
                  <div class="check-record-item-top">
                    <div class="th-top" style="font-weight: 700">加班时长-按加班规则计算</div>
                    <div class="th-bottom">
                      <div>工作日加班</div>
                      <div>节假日加班</div>
                    </div>
                  </div>
                  <div class="check-record-item-bottom">
                    <div>{{tableSettingData.attence.formData.jiaban_data2}}</div>
                    <div>{{tableSettingData.attence.formData.jiaban_data3}}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  import mixins from '@/assets/js/mixins/calendar.js';
  import Calendar from '../../../common/lightweightComponents/Calendar/index';
  import MonthChoose from '../../../common/lightweightComponents/Calendar/MonthChoose/index';
  import YearChoose from '../../../common/lightweightComponents/Calendar/YearChoose/index';
  import ButtonUpload from '../../../common/lightweightComponents/ButtonUpload';

  export default {
    name: "attence",
    components: {
      MonthChoose,
      YearChoose,
      Calendar,
      ButtonUpload,
    },
    mixins: [mixins],
    data() {
      return {
        url: globalConfig.humanResource_server,

        attendanceList: [
          {
            id: 1,
            tip: '迟到次数',
            value: '-',
          },
          {
            id: 2,
            tip: '严重迟到次数',
            value: '-',
          },
          {
            id: 3,
            tip: '上班缺卡次数',
            value: '-',
          },
          {
            id: 4,
            tip: '下班缺卡次数',
            value: '-',
          },
        ],
        vacateList: [
          {
            id: 1,
            tip: '事假',
            value: '-',
          },
          {
            id: 2,
            tip: '病假',
            value: '-',
          },
          {
            id: 3,
            tip: '年假',
            value: '-',
          },
          {
            id: 4,
            tip: '调休',
            value: '-',
          },
          {
            id: 5,
            tip: '婚假',
            value: '-',
          },
          {
            id: 6,
            tip: '产假',
            value: '-',
          },
          {
            id: 7,
            tip: '陪产假',
            value: '-',
          },
          {
            id: 8,
            tip: '丧假',
            value: '-',
          },
        ],

        currentTable: 'attence',
        tableSettingData: {
          attence: {
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 8,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            departmentId: [],
            isShowMultiSelection: false,//是否显示多选框
            multipleSelection: [],
            isLeave: false,//是否离职  true离职 false在职


            table_dialog_visible: false,//form表单控制
            table_dialog_choose_tab: 1,
            table_dialog_tabs: [
              {
                id: 1,
                name: '出勤统计',
              },
              {
                id: 2,
                name: '迟到/缺卡次数',
              },
              {
                id: 3,
                name: '加班统计',
              }
            ],
            tableData: [],//表格数据
            /*showData: {
              name: '姓名',
              department: '部门',
              post: '岗位',
              attRest: '出勤/休息天数',
              wednesday: '出勤班次',
              thursday: '迟到缺卡次数',
              friday: '矿工天数',
              saturday: '出差天数',
              weekday: '公出时长',
              leave: '请假时长',
              workOvertime: '加班统计',
              operate: '考勤确认结果',

            },*/
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
          confirm: {
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行
            departmentId: [],
            table_dialog_visible: false,//form表单控制
            table_dialog_choose_tab: 1,
            table_dialog_tabs: [
              {
                id: 1,
                name: '出勤统计',
              },
              {
                id: 2,
                name: '迟到/缺卡次数',
              },
              {
                id: 3,
                name: '加班统计',
              }
            ],
            tableData: [],//表格数据
            showData: {
              //department: '',
              january: '1月',
              february: '2月',
              march: '3月',
              april: '4月',
              may: '5月',
              june: '6月',
              july: '7月',
              august: '8月',
              september: '9月',
              october: '10月',
              november: '11月',
              december: '12月',

            },
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
        },

        chooseTab: 1,
        chooseTabs: [
          {id: 1, val: '月度汇总'},
          {id: 2, val: '考勤确认表'},
        ],
        monthValue: new Date(),
        monthContent: '',
        yearValue: new Date(),
        daysList: [],


        monthNameList: [
          {
            id: 1,
            name: 'january',
          },
          {
            id: 2,
            name: 'february',
          },
          {
            id: 3,
            name: 'march',
          },
          {
            id: 4,
            name: 'april',
          },
          {
            id: 5,
            name: 'may',
          },
          {
            id: 6,
            name: 'june',
          },
          {
            id: 7,
            name: 'july',
          },
          {
            id: 8,
            name: 'august',
          },
          {
            id: 9,
            name: 'september',
          },
          {
            id: 10,
            name: 'october',
          },
          {
            id: 11,
            name: 'november',
          },
          {
            id: 12,
            name: 'december',
          },
        ],
      }
    },
    watch: {
      monthValue: {
        handler(val, oldVal) {
          if (val) {
            this.getAttenceList(true);
            this.monthContent = this.myUtils.formatDate(val, 'yyyy-MM');
          }
        },
        immediate: true,
      },
      'tableSettingData.attence.departmentId': {
        handler(val, oldVal) {
          if (val && val.length > 0) {
            this.getAttenceList(true);
          }
        },
      },
      'tableSettingData.attence.isLeave': {
        handler(val, oldVal) {
          this.getAttenceList(true);
        },
      },


      yearValue: {
        handler(val, oldVal) {
          if (val) {
            this.getAttenceConfirmList(true);
            //this.yearContent = this.myUtils.formatDate(val, 'yyyy');
          }
        },
        immediate: true,
      },
      'tableSettingData.confirm.departmentId': {
        handler(val, oldVal) {
          if (val) {
            this.getAttenceConfirmList(true);
          }
        },
      },

      //getAttenceConfirmList
    },
    methods: {
      changeTabs(item) {
        this.chooseTab = item.id;
        if (this.chooseTab == 2) {
          this.getAttenceConfirmList();
        }
      },

      /*
       *  description: 获取考勤列表
       *  params: isOrigin 是否初始化页码  默认false 不初始化
      **/
      getAttenceList(isOrigin = false) {
        if(!this.validatePermission('Month-Summary')) return;
        if (isOrigin) {
          this.tableSettingData.attence.params.page = 1;
        }
        this.showLoading(true);
        this.tableSettingData.attence.tableData = [];
        let params = {
          is_on_job: this.tableSettingData.attence.isLeave ? 1 : 0,
          date: this.monthValue,
          ...this.tableSettingData.attence.params,
          org_id: this.tableSettingData.attence.departmentId[0] || null,
        };
        this.$http.get(`${this.url}attendance/attendance`, params).then(res => {
          this.showLoading(false);
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              //console.log(item);
              let mAttRest = `${item.attendance[0]?.attendance_day || '-'}/${item.attendance[0]?.rest_day || '-'}`;
              let late_count = Number(item.attendance[0]?.late_day || 0);//迟到次数
              let s_late_count = Number(item.attendance[0]?.seriousLate_count || 0);//严重迟到次数
              let on_work_count = Number(item.attendance[0]?.not_signed_count[0] || 0);//上班缺卡次数
              let off_work_count = Number(item.attendance[0]?.not_signed_count[1] || 0);//下班缺卡次数

              let shijia = Number(item.attendance[0]?.vacate_data[0] || 0);//事假
              let bingjia = Number(item.attendance[0]?.vacate_data[1] || 0);
              let nianjia = Number(item.attendance[0]?.vacate_data[2] || 0);
              let tiaoxiu = Number(item.attendance[0]?.vacate_data[3] || 0);
              let hunjia = Number(item.attendance[0]?.vacate_data[4] || 0);
              let chanjia = Number(item.attendance[0]?.vacate_data[5] || 0);
              let peichanjia = Number(item.attendance[0]?.vacate_data[6] || 0);
              let sangjia = Number(item.attendance[0]?.vacate_data[7] || 0);

              let obj = {
                id: item.id,//人id
                name: item.name || '-',//姓名
                //department: item.org[0]?.name || '-',//部门
                department: _.find(item.org,{id:this.tableSettingData.attence.departmentId[0]})?.name || item.org[0]?.name || '-',
                post: item.position[0]?.name || '-',//岗位
                // attRest: `${item.attendance[0]?.attendance_day || '-'}/${item.attendance[0]?.rest_day || '-'}`,
                attendance_day: item.attendance[0]?.attendance_day || '-',//出勤天数
                rest_day: item.attendance[0]?.rest_day || '-',//休息天数
                attRest: mAttRest,
                network: item.attendance[0]?.attendance_classes[0] || '-',
                civil: item.attendance[0]?.attendance_classes[1] || '-',
                early: item.attendance[0]?.attendance_classes[2] || '-',
                last: item.attendance[0]?.attendance_classes[3] || '-',
                lack: (late_count + s_late_count + on_work_count + off_work_count) || '-',//迟到缺卡次数

                late_count: late_count || '-',//迟到次数
                s_late_count: s_late_count || '-',//严重迟到次数
                on_work_count: on_work_count || '-',//上班缺卡次数
                off_work_count: off_work_count || '-',//下班缺卡次数

                kuanggong: item.attendance[0]?.absenteeism_day || '-',//旷工天数
                chuchai: item.attendance[0]?.business_day || '-',//出差天数
                gongchu: item.attendance[0]?.out_time || '-',//公出时长
                //qingjia: '-',//请假时长
                jiaban: item.attendance[0]?.overtime_day || '-',//加班统计

                jiaban_data1: item.attendance[0]?.overtime_data[0] || '-',
                jiaban_data2: item.attendance[0]?.overtime_data[1] || '-',
                jiaban_data3: item.attendance[0]?.overtime_data[2] || '-',

                vacate_count: (shijia + bingjia + nianjia + tiaoxiu + hunjia + chanjia + peichanjia + sangjia) || '-',
                shijia: shijia || '-',
                bingjia: bingjia || '-',
                nianjia: nianjia || '-',
                tiaoxiu: tiaoxiu || '-',
                hunjia: hunjia || '-',
                chanjia: chanjia || '-',
                peichanjia: peichanjia || '-',
                sangjia: sangjia || '-',

                status: item.attendance[0]?.is_confirm === 0 ? 0 : (item.attendance[0]?.is_confirm || 2),//考勤确认结果
                attendance: item.attendance,
                remarks: item.attendance[0]?.remarks || '-',
              };
              this.tableSettingData.attence.tableData.push(obj);
            }
            this.tableSettingData.attence.counts = res.data.count;
          }
        });
      },

      //显示详情弹窗
      showAttRest(row) {
        this.tableSettingData.attence.formData = row;
        this.tableSettingData.attence.table_dialog_visible = true;
        this.initDaysList(this.monthValue);
        this.attendanceList = [
          {
            id: 1,
            tip: '迟到次数',
            value: this.tableSettingData.attence.formData.late_count,
          },
          {
            id: 2,
            tip: '严重迟到次数',
            value: this.tableSettingData.attence.formData.s_late_count,
          },
          {
            id: 3,
            tip: '上班缺卡次数',
            value: this.tableSettingData.attence.formData.on_work_count,
          },
          {
            id: 4,
            tip: '下班缺卡次数',
            value: this.tableSettingData.attence.formData.off_work_count,
          },
        ];
        this.vacateList = [
          {
            id: 1,
            tip: '事假',
            value: this.tableSettingData.attence.formData.shijia,
          },
          {
            id: 2,
            tip: '病假',
            value: this.tableSettingData.attence.formData.bingjia,
          },
          {
            id: 3,
            tip: '年假',
            value: this.tableSettingData.attence.formData.nianjia,
          },
          {
            id: 4,
            tip: '调休',
            value: this.tableSettingData.attence.formData.tiaoxiu,
          },
          {
            id: 5,
            tip: '婚假',
            value: this.tableSettingData.attence.formData.hunjia,
          },
          {
            id: 6,
            tip: '产假',
            value: this.tableSettingData.attence.formData.chanjia,
          },
          {
            id: 7,
            tip: '陪产假',
            value: this.tableSettingData.attence.formData.peichanjia,
          },
          {
            id: 8,
            tip: '丧假',
            value: this.tableSettingData.attence.formData.sangjia,
          },
        ];
      },

      initDaysList(date) {
        if (date) {
          let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
          daysList.forEach((item, index) => {
            item.id = ++index;
          });
          //处理数据
          let itemList = this.tableSettingData.attence.formData.attendance[0]?.attendance_data;
          let curMonthDaysList = _.filter(daysList, (o) => {
            return o.type == 'cur';
          });
          if (itemList && itemList.length > 0) {
            _.forEach(itemList, (o, index) => {
              curMonthDaysList[index].attendance_data = o;
            });
          }
          let preNextMonthDaysList = _.remove(daysList, (o) => {
            return o.type !== 'cur';
          });
          let newDaysList = _.concat(preNextMonthDaysList, curMonthDaysList);
          newDaysList = _.sortBy(newDaysList, ['id']);
          //console.log(newDaysList);
          this.daysList = newDaysList;

        } else {
          this.daysList = [];
        }
      },

      /*//发送通知
      sendResult(row) {
        if (row.status === 1) {
          this.$LjConfirm({icon: 'warning', content: '月度统计表将发送至对应员工待办中'}).then(() => {
            alert('发送成功');
            console.log('发送成功');
          });
        }
      },*/

      //考勤确认
      confirmAttence() {
        let org_id = this.tableSettingData.attence.departmentId;
        if (org_id.length === 0) {
          this.$LjMessage('warning', {
            title: '警告',
            msg: '未选择部门'
          });
          return;
        }
        this.$LjConfirm({icon: 'warning', content: '将生成考勤确认表'}).then(() => {
          let params = {
            org_id: org_id[0],
            month: this.myUtils.formatDate(this.monthValue, 'yyyy-MM'),
          };
          this.showLoading2(true);
          this.$http.post(`${this.url}staff/e_contract/generate_confirm`, params).then(res => {
            this.showLoading2(false);
            this.$LjMessageEasy(res);
          });
        });
      },

      //获取考勤确认表
      getAttenceConfirmList() {
        if(!this.validatePermission('Month-Summary')) return;
        this.showLoading(true);
        this.tableSettingData['confirm'].tableData = [];
        let params = {
          date: this.myUtils.formatDate(this.yearValue, 'yyyy'),
          org_id: this.tableSettingData.confirm.departmentId,
        };

        this.$http.get(`${this.url}attendance/attendance/get_confirm`, params).then(res => {
          this.showLoading(false);
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                department: item.org?.name || '-',
              };
              for (let subItem of this.monthNameList) {
                let result = _.find(item.data, (o) => {
                  let oMonth = Number(this.myUtils.formatDate(o.month, 'MM'));
                  return oMonth == subItem.id;
                });
                obj[subItem.name] = result || {};
              }
              this.tableSettingData['confirm'].tableData.push(obj);
            }
            this.tableSettingData['confirm'].counts = res.data.count;
          }
        });
      },

      //发送考勤确认单
      sendAttenceResult(item) {
        if(!this.validatePermission('Attendance-Confirmation-Sent')) return;

        if (item.is_send) {
          return;
        }
        this.$LjConfirm({
          icon: 'warning',
          content: '考勤确认单将发送到指定部门下',
        }).then(() => {
          let params = {
            date: item.month,
            org_id: item.org_id,
          };
          this.$http.get(`${this.url}attendance/attendance/todo`, params).then(res => {
            this.$LjMessageEasy(res, () => {
              this.getAttenceConfirmList();
            });
          });
        });
      },


      /*initData() {
        for (let i = 0; i < 6; i++) {
          let obj = {
            department: '人力资源中心',
            january: {},
            february: {},
            march: {},
            april: {},
            may: {},
            june: {},
            july: {},
            august: {},
            september: {},
            october: {},
            november: {},
            december: {},
          };
          this.tableSettingData.confirm.tableData.push(obj);
        }
        this.tableSettingData.confirm.counts = 10;
      },*/


      //全选切换
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            if (row.status !== 2) {
              this.$refs.multipleTable.toggleRowSelection(row);
            }

          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      isDisabled(row, index) {
        if (row.status == 2) {
          return 0;
        } else {
          return 1;
        }
      },

      handleSizeChange() {
      },

      handleSelectionChange(val) {
        this.tableSettingData.attence.multipleSelection = val;
      },


      // 当前点击
      tableClickRow(row) {
        /*this.tableSettingData[this.currentTable].currentSelection = row;
        let ids = this.tableSettingData[this.currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);*/
      },
      //表格某一行双击
      tableDblClick(row, currentTable) {
        /*if (currentTable) {
          switch (currentTable) {
            case 'attence':
              this.tableSettingData[currentTable].table_dialog_visible = true;
              this.tableSettingData[currentTable].formData = row;
              this.tableSettingData[currentTable].currentSelection = row;
              this.getItemsDetailList();
              break;
          }
        }*/
      },

      // 点击过
      tableChooseRow({row, rowIndex}) {
        //return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val, currentTable) {
        switch (currentTable) {
          case 'attence':
            this.tableSettingData[currentTable].params.page = val;
            this.getAttenceList();
            break;
          case 'confirm':
            this.tableSettingData[currentTable].params.page = val;
            this.getAttenceConfirmList();
            break;
          default :
            break;
        }
      }
    },
    mounted() {
      //this.initData();
    },
  }
</script>


<style lang="scss">
  #attence {

    .main-nav {
      .nav-right {
        .el-checkbox {
          font-size: 20px;

          .el-checkbox__inner {
            width: 20px;
            height: 20px;
          }

          .el-checkbox__label {
            font-size: 16px;
          }
        }
      }
    }

    .attence-container {
      .el-table__header th {
        padding: 0;
        height: 40px;
        border-top: 1px solid #EBEEF5;
      }

      .el-table--border {
        //border: none !important;
        //border-left: ;
        border: none;
        //border-top: 1px solid #EBEEF5;
        //border-left: 1px solid #EBEEF5;
        /*border-left: none;
        border-bottom: none;
        border-right: none;*/
      }

      .el-table-column--selection {
        border-left: 1px solid #EBEEF5;
      }

      .el-table--border::after, .el-table--group::after {
        height: 0%;
      }

      .tableHeader {
        th:nth-child(1) {
          border-left: 1px solid #EBEEF5;
        }

        .el-table-column--selection {
          border-left: none !important;
          border-bottom: none !important;
          border-top: none !important;

          > div {
            display: none;
          }
        }
      }

      .el-table__body {
        tbody {
          .el-table__row {
            td:nth-child(1) {
              border-left: 1px solid #EBEEF5;
            }
          }

          .el-table-column--selection {
            border-left: none !important;
            border-bottom: none !important;
          }
        }
      }

      /*.el-table__header {
        .el-table-column--selection {
          visibility: hidden !important;
        }
      }*/
      .el-table__header {
        .cell {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .el-table__header, .el-table__body {
        .el-checkbox {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
      }
    }

    .confirm-container {
      /*.el-table__header th {
        padding: 0;
        height: 40px;
      }*/


      .tableHeader {
        th:nth-child(1) {
          border-left: 1px solid #EBEEF5;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" style="stroke:rgb(228,228,228);stroke-width:1"/></svg>');
        }
      }

      .el-table__body {
        tbody {
          .el-table__row {
            .cell {
              overflow: auto !important;
              height: 60px;
            }

            td:nth-child(1) {
              border-left: 1px solid #EBEEF5;
            }
          }
        }
      }

      .el-table--border {
        border: none;
        border-top: 1px solid #EBEEF5;
      }

      .el-table-column--selection {
        border-left: 1px solid #EBEEF5;
      }

      .el-table--border::after, .el-table--group::after {
        height: 0%;
      }

      .el-table__header, .el-table__body {
        .cell {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .el-table__header, .el-table__body {
        //border-left: 1px solid #EBEEF5;
        .el-checkbox {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
      }
    }

    /*.el-checkbox {
      display: flex!important;
      justify-content: center!important;
      align-items: center!important;
    }*/
  }
</style>


<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/attence/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #attence {
      .main-nav {
        .isActive {
          @include militaryImg('teji.png', 'theme1');
          color: white;
        }
      }

      .confirm-container {
        .icon-pdf {
          @include militaryImg('s.png', 'theme1');

          &:hover {
            @include militaryImg('t.png', 'theme1');

            .icon-sent {
              @include militaryImg('yifasong.png', 'theme1');
            }
          }

          .icon-no-send {
            @include militaryImg('fasong.png', 'theme1');
          }

          .icon-sent {
            @include militaryImg('yidu_copy.png', 'theme1');
          }

        }
      }

      #lj_dialog {
        .att-rest-container {
          .bg-default {
            @include militaryImg('q.png', 'theme1');

            &.checked {
              @include militaryImg('p.png', 'theme1');
            }
          }
        }
      }


    }
  }

  #theme_name.theme2 {
    #attence {

    }
  }

  #theme_name.theme3 {
    #attence {

    }
  }

  #theme_name.theme4 {
    #attence {

    }
  }

</style>
