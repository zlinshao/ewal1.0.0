<template>
  <div id="courseTrain" class="main-container">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <div class="icons add" @click="showNewTrainDialog"><b>+</b></div>
      </div>
    </div>

    <div class="content flex">
      <div class="left-guide">
        <i @click="handleIconClick('up')" v-if="(left_guide_index!=0&&left_guide_index!=1)&&left_guide_all_list.length!=2" class="icon-btn-up"></i>

        <div
          v-for="item in left_guide.slice(0,2)"
          :key="item.id"
          class="flex-center left-block"
          :class="{'is-choose-guide': left_guide_choose === item.id}"
          @click="left_guide_choose = item.id"
          :title="item.name"
        >
          <span>{{ item.name.slice(0,4) }}</span>
        </div>

        <i @click="handleIconClick('down')" v-if="(left_guide_index!=left_guide_all_list.length&&left_guide_index!=left_guide_all_list.length-1)&&left_guide_all_list.length!=2" class="icon-btn-down"></i>

      </div>
      <div class="right-content flex-center">

        <div class="list"
             v-for="(item,index) in tableSettingData['jobTrain'].tableData.slice(0,5)"
             :key="item.id"
             :class="{'trainActive': isTrain === item.id}"
             @click="showTrainDetail(item.id)">
          <div class="content-top">
            <span>{{ upperNumberList[index] }}</span>
            <div>
              <span class="writingMode">{{ item.time }}</span>
              <span class="writingMode">{{ item.name }}</span>
            </div>
          </div>
          <div class="content-bottom">
            <span class="writingMode">{{ item.lecturer }}</span>
          </div>
        </div>

      </div>
    </div>
    <div class="guidance">
      <div class="subject items-center"
           v-for="item in guidance" :key="item.id"
           @click="handleClickTrainManagement(item.id)"
           :class="{'isGuidance': isGuidance === item.id}"
      >
        <div class="title flex-center">
          <span class="writingMode">{{ item.name }}</span>
        </div>
        <div class="line"></div>
      </div>
    </div>


    <!--新建培训-->
    <lj-dialog
      :visible="new_train_dialog_visible"
      :size="{width: 520 + 'px',height: 670 + 'px'}"
      @close="new_train_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建培训</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form ref="addTrainFormRef" :model="new_train_form" :rules="rules.addTrain" style="text-align: left"
                   size="small" label-width="100px">
            <el-form-item required prop="meeting_type" label="培训类型">
              <dropdown-list :cache="false" title="必选" ref="dropdown1" :url="`${this.url}meeting/category`"
                             code="3"
                             v-model="new_train_form.meeting_type"></dropdown-list>
              <!--              <span class="btn_add" @click="train_type_dialog_visible = true">+</span>-->
            </el-form-item>
            <el-form-item required prop="name" label="培训名称">
              <el-input v-model="new_train_form.name" placeholder="必填" style="width: 320px"></el-input>
            </el-form-item>
            <el-form-item required prop="room_id" label="培训地点">
              <dropdown-list title="必选" ref="dropdown2" :url="`${this.url}meeting/category`" code="1"
                             v-model="new_train_form.room_id"></dropdown-list>
              <!--              <span class="btn_add">+</span>-->
            </el-form-item>
            <el-form-item required prop="train_time" label="培训时间">
              <el-date-picker
                format="yyyy-MM-dd HH:mm"
                style="width: 320px"
                v-model="new_train_form.train_time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item required prop="presenter_id" label="讲师">
              <user-choose num="1" title="必选" v-model="new_train_form.presenter_id"></user-choose>
              <!--              <el-select v-model="new_train_form.train_lecturer" style="width: 320px"></el-select>-->
            </el-form-item>
            <el-form-item required prop="participants" label="参会人员">
              <user-choose title="必选" v-model="new_train_form.participants"></user-choose>
              <!--              <el-input v-model="new_train_form.train_people" placeholder="请选择参会人员" style="width: 320px"></el-input>-->
            </el-form-item>
            <el-form-item label="培训提醒">
              <div class="form-item-content">
                会议开始前
                <el-input-number size="mini" :min="0" :max="23" style="width: 90px"
                                 v-model="new_train_form.remind_data.hour"></el-input-number>
                小时
                <el-input-number size="mini" :min="0" :max="59" style="width: 90px"
                                 v-model="new_train_form.remind_data.minute"></el-input-number>
                分钟提醒
              </div>
            </el-form-item>
            <el-form-item label="上传课件">
              <lj-upload style="position: absolute;top: -12px;" size="40" :max-size="5"
                         v-model="new_train_form.attachment"></lj-upload>
            </el-form-item>
            <el-form-item prop="exam_id" required label="添加试卷">
              <el-select v-model="new_train_form.exam_id">
                <el-option label="试卷1" value="208"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitAddTrain">提交</el-button>
          <el-button size="small" type="info" @click="new_train_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <div class="train_management">
      <!--培训类型列表对话框-->
      <lj-dialog
        :visible.sync="train_management_dialog_visible"
        :size="{width: 650 + 'px',height: 640 + 'px'}"
      >
        <div class="dialog_container">
          <div class="dialog_header flex">
            <h3>培训类型</h3>
            <div class="icons add" @click="showAddTrainTypeDialog"><b>+</b></div>
          </div>
          <div class="dialog_main">
            <el-table
              header-row-class-name="tableHeader"
              :data="train_type_list"
              height="400px"
            >
              <el-table-column prop="name" label="培训名称" align="center"></el-table-column>
              <el-table-column  width="130px" label="操作" align="center">
                <template slot-scope="scope">
                  <span class="edit_btn" @click="editTrainType(scope.row)">编辑</span>
                  <span class="delete_btn" @click="deleteTrainType(scope.row)">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="dialog_footer">
            <el-button size="small" @click="train_management_dialog_visible = false" type="danger">确定</el-button>
            <!--            <el-button size="small" @click="train_management_dialog_visible = false" type="info">取消</el-button>-->
          </div>
        </div>
      </lj-dialog>


      <!--添加培训类型-->
      <lj-dialog
        :visible.sync="train_type_dialog_visible"
        :size="{width: 420 + 'px',height: 300 + 'px'}"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>{{train_type_type==1?'新增':'编辑'}}培训类型</h3>
            <!--<div class="header_right">
              <div class="btn_add">+</div>
            </div>-->
          </div>
          <div class="dialog_main borderNone">
            <el-form ref="addTrainTypeFormRef" :rules="rules.addTrainType" :model="add_train_type_form" size="small"
                     label-width="100px">
              <el-form-item prop="name" required label="培训类型">
                <el-input style="width: 220px" v-model="add_train_type_form.name" placeholder="必填"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button v-if="train_type_type==1" size="small" type="danger" @click="submitAddTrainType">提交</el-button>
            <el-button v-if="train_type_type==2" size="small" type="danger" @click="submitEditTrainType">提交</el-button>
            <el-button size="small" type="info" @click="train_type_dialog_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>


    </div>

    <!--更多弹框 培训列表-->
    <lj-dialog
      :visible.sync="train_list_dialog_visible"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>入职培训列表</h3>
        </div>
        <div class="dialog_main">
          <el-table
            header-row-class-name="tableHeader"
            :data="tableSettingData.jobTrain.tableData"
            @row-dblclick="tableDblClick($event);"
            height="400px"
          >
            <el-table-column label="培训名称" prop="name" align="center"></el-table-column>
            <el-table-column label="时间" prop="time" align="center"></el-table-column>
            <el-table-column label="讲师" prop="lecturer" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="flex-center">
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange($event,'jobTrain')"
              :current-page="tableSettingData.jobTrain.params.page"
              :page-size="tableSettingData.jobTrain.params.limit"
              :total="tableSettingData.jobTrain.counts"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="train_list_dialog_visible = false">确定</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--培训详情-->
    <lj-dialog
      :visible.sync="train_detail_dialog_visible"
      :size="{width: 800 + 'px',height: 680 + 'px'}"
      @close="handleTrainDetail"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{train_detail_form.name}}</h3>
          <!--<div class="header_right">
            <el-button size="mini" type="primary" plain>查看考试情况</el-button>
          </div>-->
        </div>
        <div class="dialog_main train-detail-form">
          <el-form size="mini" label-width="100px" class="train_detail">
            <el-form-item label="培训类型">
              <span>{{train_detail_form.train_type_name}}</span>
            </el-form-item>
            <el-form-item label="培训名称">
              <span>{{train_detail_form.name}}</span>
            </el-form-item>
            <el-form-item label="培训地点">
              <span>{{train_detail_form.train_location}}</span>
            </el-form-item>
            <el-form-item label="讲师">
              <span>{{train_detail_form.presenter}}</span>
            </el-form-item>
            <el-form-item label="参会人员">
              <span><user-list :ids="train_detail_form.participants" :mini="true"></user-list></span>
            </el-form-item>
            <el-form-item label="培训提醒">
              <span>培训开始前{{train_detail_form.remind_data.hour}}小时{{train_detail_form.remind_data.minute}}分钟提醒</span>
            </el-form-item>
            <el-form-item label="查看附件">
              <lj-upload :disabled="true" :data="train_detail_form.attachment"></lj-upload>
            </el-form-item>
            <el-form-item label="查看试卷">
              <span></span>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini" @click="handleTrainDetail">确定</el-button>
        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import _ from 'lodash';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import LjDialog from '../../../common/lj-dialog.vue';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import UserList from '../../../common/lightweightComponents/UserList';

  export default {
    name: "courseTrain",
    components: {
      LjDialog,
      DropdownList,
      UserChoose,
      LjUpload,
      UserList,
    },
    data() {
      return {
        rules: {
          addTrain: {
            name: [
              {required: true, message: '请输入培训名称', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
            room_id: [
              {required: true, message: '请选择培训地点', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],

            train_time: [
              {required: true, message: '请选择培训时间', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],

            meeting_type: [
              {required: true, message: '请选择培训类型', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            presenter_id: [
              {required: true, message: '请选择讲师', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            participants: [
              {required: true, message: '请选择参会人员', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            exam_id: [
              {required: true, message: '请选择试卷', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],


          },
          addTrainType: {
            name: [
              {required: true, message: '请输入培训类型', trigger: 'blur'},
            ],
          },
        },

        url: globalConfig.humanResource_server,


        tableSettingData: {
          jobTrain: {
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

            isShowMultiSelection: false,//是否显示多选框
            multipleSelection: [],


            table_dialog_visible: false,//form表单控制
            table_dialog_choose_tab: 1,
            tableData: [],//表格数据
            formData: {},//详情表格数据
            searchParams: '',// dialog中的模糊搜索
          },
        },

        guidance: [ //右边向导
          {id: 1, name: '培训类型'},
          {id: 2, name: '更多'}
        ],
        isGuidance: 1,

        left_guide: [
          /*{id: 1, name: '入职培训'},
          {id: 2, name: '技能培训'},*/
        ],
        left_guide_all_list: [],//所有培训类型列表
        left_guide_choose: 1,
        left_guide_index: 0,

        isTrain: 1,
        upperNumberList: ['一', '二', '三', '四', '五', '六', '七'],

        //培训详情
        train_detail_dialog_visible: false,

        train_management_dialog_visible: false,
        //培训类型列表
        train_type_list: [],
        //培训类型列表对话框
        train_list_dialog_visible: false,


        //新建培训
        new_train_dialog_visible: false,
        //新建培训表单字段
        new_train_form: {

          name: '',//名称
          room_id: '',//地点id
          meeting_type: '',//培训类型id
          train_time: '',//培训时间
          start_time: '',//开始时间
          end_time: '',//结束时间
          presenter_id: [],//主持人id数组
          //counts:'',//应到人数
          //meetingTips:{},//会议提醒
          remind_data: {
            minute: 0,
            hour: 1,
          },
          participants: [],//参会人员数组
          attachment: [],//附件id数组
          exam_id: '',//试卷id
        },

        //培训详情表单
        train_detail_form: {
          train_type_name: '',//培训类型名称
          name: '',//培训名称
          train_location: '',//培训地点
          time: '',//培训时间
          presenter: '',//讲师
          participants: [],//应到人员数组
          remind_data: {
            minute: 0,
            hour: 0,
          },
          attachment: [],//附件id数组
        },

        //添加培训类型
        train_type_type: 1, //1为新增培训类型 2为编辑培训类型
        train_type_dialog_visible: false,
        add_train_type_form: {
          name: '',
        },
      }
    },
    mounted() {
      //this.getTrainList();
      this.getTrainTypeList();
    },
    watch: {
      left_guide_all_list: {
        handler(val, oldVal) {
          if (val && val.length > 0) {
            this.left_guide = val.slice(0, 2);
            this.left_guide_choose = val[0]?.id;
            this.left_guide_index = 0;
          }
        },
        immediate: true,
      },
      left_guide_choose: {
        handler(val,oldVal) {
          if(val) {
            this.getTrainList();
          }
        },
        immediate:true,
      },
    },
    methods: {
      handleIconClick(direction = 'up') {
        if (direction == 'up') {
          if(this.left_guide_index==0) {
            return;
          }
          let obj = _.find(this.left_guide, {id: this.left_guide_choose});
          let index = _.findIndex(this.left_guide, obj);
          if (index == 1) {
            this.left_guide_choose = this.left_guide[0].id;
          } else {
            //处理换数据
            this.left_guide_index--;
            if(this.left_guide_index%2==1) {
              this.left_guide_index--;
            }
            this.left_guide = this.left_guide_all_list.slice(this.left_guide_index, this.left_guide_index + 2);
            this.left_guide_choose = this.left_guide[0].id;
          }

          /*console.log('***');
          console.log(this.left_guide_all_list.length);
          console.log(this.left_guide_index);
          console.log('***');*/
        }
        else {//往下
          if(this.left_guide_all_list.length<this.left_guide_index+2) {
            return;
          }
          //v-if="left_guide_all_list.length>left_guide_index+2"
          let obj = _.find(this.left_guide, {id: this.left_guide_choose});
          let index = _.findIndex(this.left_guide, obj);
          if (index == 0) {
            this.left_guide_choose = this.left_guide[1].id;
          } else {
            //处理换数据
            //this.left_guide_index++;
            this.left_guide = this.left_guide_all_list.slice(this.left_guide_index, this.left_guide_index + 2);
            this.left_guide_choose = this.left_guide[1].id;
          }
          this.left_guide_index++;
          /*console.log('***');
          console.log(this.left_guide_all_list.length);
          console.log(this.left_guide_index);
          console.log('***');*/
        }

        //this.getTrainList();
      },

      //显示新增培训对话框
      showNewTrainDialog() {
        this.new_train_dialog_visible = true;
      },


      //提交新增培训结果
      submitAddTrain() {
        this.$refs['addTrainFormRef'].validate((valid) => {
          if (valid) {

            let params = {
              ...this.new_train_form,
              start_time: this.myUtils.formatDate(this.new_train_form.train_time[0], 'yyyy-MM-dd hh:mm:ss'),
              end_time: this.myUtils.formatDate(this.new_train_form.train_time[1], 'yyyy-MM-dd hh:mm:ss'),
            };
            this.$http.post(`${this.url}meeting/meeting`, params).then(res => {
              this.$LjMessageEasy(res, () => {
                this.new_train_dialog_visible = false;
                this.getTrainList();
              });
            });
          }
        });
      },

      //显示添加培训类型对话框
      showAddTrainTypeDialog() {
        this.train_type_type = 1;
        this.add_train_type_form = {
          name: '',
        };
        this.train_type_dialog_visible = true;

      },

      //提交添加培训类型=>
      submitAddTrainType() {
        this.$refs['addTrainTypeFormRef'].validate((valid) => {
          if (valid) {
            let params = {
              type: 3,
              ...this.add_train_type_form
            };
            this.$http.post(`${this.url}meeting/category`, params).then(res => {
              this.$LjMessageEasy(res, () => {
                this.train_type_dialog_visible = false;
                this.getTrainTypeList();
              });
            });
          }
        });
      },

      //提交编辑培训类型=>
      submitEditTrainType() {
        this.$refs['addTrainTypeFormRef'].validate((valid) => {
          if (valid) {
            let params = {
              ...this.add_train_type_form
            };
            this.$http.put(`${this.url}meeting/category/${params.id}`, params).then(res => {
              this.$LjMessageEasy(res, () => {
                this.train_type_dialog_visible = false;
                this.getTrainTypeList();
              });
            });
          }
        });
      },

      //删除培训类型
      deleteTrainType(row) {
        this.$LjConfirm({
          icon: 'delete',
        }).then(() => {
          this.$http.delete(`${this.url}meeting/category/${row.id}`).then(res => {
            this.$LjMessageEasy(res, () => {
              this.getTrainTypeList();
            });
          });
        });
      },

      //获取培训类型列表
      getTrainTypeList() {
        let params = {
          type: 3
        };
        this.$http.get(`${this.url}meeting/category`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.train_type_list = res.data.data;
            this.left_guide_all_list = res.data.data;
          }
        });
      },

      //获取培训列表
      async getTrainList() {//meetingType为会议类型
        let params = {
          type: 3
        };
        if(this.left_guide_choose) {
          params.meeting_type = this.left_guide_choose;
        }
        await this.$http.get(`${this.url}meeting/meeting`, params).then(res => {
          this.tableSettingData['jobTrain'].tableData = [];
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                name: item.name || '-',//培训名称
                //time: `${this.myUtils.formatDate(item.start_time||'','yyyy-MM-dd hh:mm')}`,
                time: `${this.myUtils.formatDate(item.start_time || '', 'yyyy-MM-dd hh:mm')}-${this.myUtils.formatDate(item.end_time, 'hh:mm')}`,
                lecturer: _.map(item.presenter || [], 'user.name').join(','),//主持人
              };
              this.tableSettingData['jobTrain'].tableData.push(obj);
            }
            this.tableSettingData['jobTrain'].counts = res.data.count;
          }
        });
      },

      //显示某个培训详情
      showTrainDetail(id) {
        this.isTrain = id;
        this.train_detail_dialog_visible = true;
        this.$http.get(`${this.url}meeting/meeting/${id}`).then(res => {
          if (res.code.endsWith('0')) {
            let item = res.data;
            this.train_detail_form = {
              train_type_name: item.type?.name || '-',//培训类型名称
              name: item.name || '-',//培训名称
              train_location: item.room?.name || '-',//培训地点
              time: `${this.myUtils.formatDate(item.start_time || '', 'yyyy-MM-dd hh:mm')}-${this.myUtils.formatDate(item.end_time, 'hh:mm')}`,//培训时间
              presenter: _.map(item.presenter || [], 'user.name').join(','),//讲师
              participants: _.map(item.participant || [], 'user.id'),//应到人员数组
              remind_data: item.remind_data,
              attachment: item.attachment || [],//附件id数组
            };
            console.log(this.train_detail_form)
          }
        });
      },

      //处理培训详情页面关闭后的事件  防止元素抖动
      handleTrainDetail() {
        this.train_detail_dialog_visible = false;
        this.train_detail_form = {
          train_type_name: '',//培训类型名称
          name: '',//培训名称
          train_location: '',//培训地点
          time: '',//培训时间
          presenter: '',//讲师
          participants: [],//应到人员数组
          remind_data: {
            minute: 0,
            hour: 0,
          },
          attachment: [],//附件id数组
        };
      },


      //打开编辑培训类型对话框
      editTrainType(row) {
        this.train_type_type = 2;
        this.train_type_dialog_visible = true;
        this.add_train_type_form = _.cloneDeep(row);
      },
      //打开页面右侧 2个 按钮所触发的显示页面
      handleClickTrainManagement(id) {
        this.isGuidance = id;
        if (id === 2) {
          this.train_list_dialog_visible = true;//打开更多
          this.getTrainList();//获取培训列表
        } else {//打开培训类型
          this.train_management_dialog_visible = true;
          this.getTrainTypeList();
        }
      },


      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val, currentTable) {
        switch (currentTable) {
          case 'jobTrain':
            this.tableSettingData[currentTable].params.page = val;
            this.getTrainList();
            break;
          default :
            break;
        }
      },


      tableDblClick(row) {
        this.showTrainDetail(row.id);
      },
    },
  }
</script>


<style lang="scss">
  .train-detail-form {
    .el-form-item__label {
      color: rgba(104, 104, 116, .5);
    }
  }
</style>


<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/train/courseTrain.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .militaryOrganization {
      .train {

        .main-container {
          .guidance {
            .isGuidance {
              .title {
                border: 1px solid $colorE33;

                > span {
                  border: 1px solid $colorE33;
                  color: $colorE33;
                }
              }

              .line {
                background-color: $colorE33;
              }
            }
          }

          .content {
            .left-guide {
              .icon-btn-up {
                @include militaryImg('xiaw.png', 'theme1');

                &:hover {
                  @include militaryImg('xia.png', 'theme1');
                }
              }

              .icon-btn-down {
                @include militaryImg('xiaw.png', 'theme1');

                &:hover {
                  @include militaryImg('xia.png', 'theme1');
                }
              }


              .left-block {
                @include militaryImg('rzpxw.png', 'theme1');
              }

              .is-choose-guide {
                @include militaryImg('rzpxx(1).png', 'theme1');
                color: white;
              }
            }

            .right-content {
              .trainActive, .list:hover {
                .content-top {
                  > span {
                    color: white;

                    &:before {
                      background-color: $colorE33;
                    }
                  }

                  > div {
                    > span {
                      color: $colorE33;
                    }
                  }
                }

                .content-bottom {
                  > span {
                    color: $colorE33;
                  }
                }
              }
            }
          }
        }

      }
    }
  }

</style>
