<!--预约面试-->
<template>
  <div id="part_two">
    <div>
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="tableList"
          :height="this.mainListHeight(30) + 'px'"
          :row-class-name="tableChooseRow"
          highlight-current-row
          @cell-click="tableClickRow"
          header-row-class-name="tableHeader"
          style="width: 100%"
        >
          <el-table-column label="岗位名称" prop="position.name" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="来源" prop="come" align="center">
            <template slot-scope="scope">
              <span>{{ platform[scope.row.platform - 1] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约面试时间" prop="interview_time" align="center"></el-table-column>
          <el-table-column label="已通知面试官" prop="interviewer.name" align="center"></el-table-column>
          <el-table-column label="简历" prop="" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" plain @click="handleLookOffer(scope.row)">查看简历</el-button>
            </template>
          </el-table-column>
          <el-table-column label="取消面试" prop="" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.interviewee_status===4">面试已取消</span>
              <el-button v-else size="mini" type="danger" plain @click="handleOpenCancel(scope.row)">取消面试</el-button>
            </template>
          </el-table-column>
          <el-table-column label="修改" prop="" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.interviewee_status===4" class="btn_edit"></span>
              <span v-else class="btn_edit" @click="handleOpenEdit(scope.row)"></span>
            </template>
          </el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="tableCount"
              :current-page="params.page"
              :page-size="params.limit"
              layout="total,jumper,prev,pager,next"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>

      <!--添加面试人-->
      <lj-dialog
        :visible.sync="add_interviewer_visible"
        :size="{width: 450 + 'px',height: 550 + 'px'}"
        @close="handleCloseAddInterviewer"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>添加面试人</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="add_interviewer_form" size="small" label-width="100px">
              <el-form-item label="岗位">
                <el-select v-model="add_interviewer_form.position_id" placeholder="请选择" @change="handleGetOffer">
                  <el-option v-for="(tmp,idx) in position_list" :value="tmp.position_id" :label="tmp.position.name" :key="idx"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="add_interviewer_form.name" placeholder="请选择"></el-input>
              </el-form-item>
              <el-form-item label="来源">
                <el-select v-model="add_interviewer_form.platform">
                  <el-option v-for="(item,index) in platform" :value="index + 1" :label="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试官">
                <el-select v-model="add_interviewer_form.interviewer_id" :disabled="!interview_list" @change="handleChangeInterview">
                  <el-option v-for="(item,index) in interview_list.interviewer" :key="index" :value="item.id" :label="item.real_name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约面试时间">
                <el-date-picker
                  v-model="add_interviewer_form.interview_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择面试时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传简历">
                <Upload :file="upload_form" @success="handleGetFile"></Upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="send_msg_offer = true">发送面试任务</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--确认发给面试人-->
      <lj-dialog
        :visible="send_msg_offer"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="send_msg_offer = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定发送面试任务给 <a style="color: black;font-weight: bold">{{ selected_interview }}</a>并添加该面试人员吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmAddOffer">完成</el-button>
            <el-button type="info" size="small" @click="send_msg_offer = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--添加面试官-->
      <lj-dialog
        :visible="add_msg_visible"
        :size="{width: 450 + 'px',height: 550 + 'px'}"
        @close="handleCloseAddMsg"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>设置面试官</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="add_msg_form" label-width="80px" size="small">
              <el-form-item label="岗位">
                <post-choose title="请选择" width="310" num="1" v-model="add_msg_form.position_id"></post-choose>
              </el-form-item>
              <el-form-item label="部门">
                <org-choose title="自动获取" width="310" :disabled="true" num="1" v-model="add_msg_form.org_id"></org-choose>
              </el-form-item>
              <el-form-item label="面试官">
                <user-choose title="请选择" width="310" num="1" v-model="add_msg_form.interviewer_first_id"></user-choose>
                <user-choose title="请选择" style="margin-top: 10px" width="310" num="1" v-model="add_msg_form.interviewer_second_id"></user-choose>
                <user-choose title="请选择" style="margin-top: 10px" width="310" num="1" v-model="add_msg_form.interviewer_third_id"></user-choose>
              </el-form-item>
              <el-form-item label="添加试卷">
                <el-select v-model="add_msg_form.paper_id" clearable>
                  <el-option v-for="item in paper" :value="item.id" :label="item.name" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleAddOffer">确定</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--修改面试人信息-->
      <lj-dialog
        :visible="edit_interviewee_visible"
        :size="{width: 400 + 'px',height: 450 + 'px'}"
        @close="handleCancelEditInterviewee"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>修改</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form v-model="add_interviewer_form" size="small" label-width="80px">
              <el-form-item label="岗位名称">
                <el-input v-model="add_interviewer_form.position" disabled></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="add_interviewer_form.name"></el-input>
              </el-form-item>
              <el-form-item label="来源">
                <el-select v-model="add_interviewer_form.platform">
                  <el-option v-for="(item,index) in platform" :value="index + 1" :label="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约时间">
                <el-date-picker
                  v-model="add_interviewer_form.interview_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择预约面试时间"
                ></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleSubmitEdit">提交</el-button>
            <el-button type="info" size="small" @click="handleCancelEditInterviewee">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--取消面试确定-->
      <lj-dialog
        :visible="cancel_interviewee_visible"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="cancel_interviewee_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定取消该场面试吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleOkCancelInterview">确定</el-button>
            <el-button type="info" size="small" @click="cancel_interviewee_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import LjDialog from '../../../../common/lj-dialog.vue';
  import Upload from '../../../../common/upload.vue';
  import UserChoose from '../../../../common/lightweightComponents/UserChoose';
  import OrgChoose from '../../../../common/lightweightComponents/OrgChoose';
  import PostChoose from '../../../../common/lightweightComponents/PostChoose';

  export default {
    name: "index",
    components: { LjDialog ,Upload,UserChoose, OrgChoose, PostChoose},
    props: [ 'addInterviewerVisible' ,'addOfferVisible','searchData'],
    data() {
      return {
        url:globalConfig.humanResource_server,

        tableList: [],
        tableCount:0 ,
        params: {
          page: 1,
          limit: 12
        },
        chooseRowIds: [],

        //添加面试人
        add_interviewer_visible: false,
        add_interviewer_form: {
          position: '',
          position_id: [],

          name: '',
          platform: '',

          interviewer: '',
          interviewer_id: '',

          interview_time: '',
          resume_id: [],
        },
        upload_form: {
          keyName: 'resume_id',
          setFile: [],
          size: {
            width: '50px',
            height: '50px'
          }
        },
        //修改面试人信息
        edit_interviewee_visible: false,
        currentRow: '',

        send_msg_offer: false,
        platform: ['智联招聘', '前程无忧', '58同城', 'BOSS直聘', '猎聘网', '首席信才', '德胜人才', '校园招聘会', '社会招聘会', '推荐', '其他',],

        //添加面试官
        add_msg_visible: false,
        add_msg_form: {
          org_id: '',
          org_name: '',

          position: '',
          position_id: [],

          interviewer_first_id: [],
          interviewer_second_id: [],
          interviewer_third_id: [],

          offer1: '',
          offer2: '',
          offer3: '',

          paper_id: '',
        },
        //取消面试
        cancel_interviewee_visible: false,
        is_paper: '',
        is_staff: '',

        //岗位获取面试官
        interview_list: [],
        selected_interview: '',

        //试卷
        paper: [],

        //需求岗位列表
        position_list: []
      }
    },
    mounted() {
      this.getIntervieweeList();
      this.getPapers();
    },
    activated() {
    },
    watch: {
      addInterviewerVisible(val) {
        this.add_interviewer_visible = val;
        this.is_paper = 'interview';
        if (val) {
          this.getPositionList();
        }
      },
      addOfferVisible(val) {
        this.add_msg_visible = val;
        this.is_paper = 'offer';
      },
      searchData: {
        handler(val) {
          console.log(val);
          this.params = Object.assign(this.params,{},val);
          this.getIntervieweeList();
        },
        deep: true
      },
      'add_msg_form.position_id': {//自动获取部门
        handler(val,oldVal) {
          if(val.constructor===Array&&val.length==1) {//选取岗位了
            let id = val[0];
            this.$http.get(`${this.url}organization/position/${id}`).then(res=> {
              if(res.code.endsWith('0')) {
                this.add_msg_form.org_id = [res.data.duty?.org_id];
              }
            });
          }
        },
        immediate:true
      },
    },
    computed: {},
    methods: {
      getPositionList() {
        this.$http.get('recruitment/staff_needs/position/get').then(res => {
          if (res.code === '20030') {
            this.position_list = res.data;
          } else {
            this.position_list = [];
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getPapers() {
        this.$http.get('train/exam?type=1').then(res => {
          if (res.code === '20000') {
            this.paper = res.data.data;
          } else {
            this.paper = [];
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleLookOffer(row) {
        this.$http.get(`recruitment/interviewees/get_resume_url/${row.interviewee_id}`).then(res => {
          if (res.code === '20020') {
            if (res.data.url) {
                window.open(res.data.url);
            } else {
              this.$LjNotify('warning',{
                title: '警告',
                message: '暂无路径'
              })
            }
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: '获取失败'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleChangeInterview(val) {
        this.interview_list.interviewer.map((item) => {
          if (val === item.id) {
            this.selected_interview = item.real_name;
          }
        })
      },
      handleConfirmAddOffer() {
        this.$http.post('recruitment/interviewees',this.add_interviewer_form).then(res => {
          this.handleSuccessCallback(res,'20010');
          if (res.code === '20010') {
            this.send_msg_offer=false;
            this.handleCloseAddInterviewer();
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleAddOffer() {
        let interviewers  = _.filter([...this.add_msg_form.interviewer_first_id,...this.add_msg_form.interviewer_second_id,...this.add_msg_form.interviewer_third_id],(o)=> {return o});
        if(_.uniq(interviewers).length!=interviewers.length) {
          this.$LjMessage('warning',{title:'警告',msg:'不可选择相同的面试官'});
          return;
        }

        this.$http.post('recruitment/interviewers',this.add_msg_form).then(res => {
          this.handleSuccessCallback(res,'20010');
          if (res.code === '20010') {
            this.handleCloseAddMsg();
          }
        });
      },
     /* handleGetStaff(id,name) {
        if (id !== 'close') {
          if (this.is_staff === 'first') {
            this.add_msg_form.interviewer_first_id = id;
            this.add_msg_form.offer1 = name;
          }
          if (this.is_staff === 'second') {
            this.add_msg_form.interviewer_second_id = id;
            this.add_msg_form.offer2 = name;
          }
          if (this.is_staff === 'third') {
            this.add_msg_form.interviewer_third_id = id;
            this.add_msg_form.offer3 = name;
          }
        }
        this.staff_visible = false;
      },*/
      handleGetDepart(id,name) {
        if (id !== 'close') {
          this.add_msg_form.org_name = name;
          this.add_msg_form.org_id = id;
        }
        this.depart_visible = false;
      },
      handleGetFile(val){
        if (val !== 'close') {
          if (this.is_paper === 'offer') {
            this.add_msg_form.paper_id = val[1];
          }
          if (this.is_paper === 'interview') {
            this.add_interviewer_form.resume_id = val[1];
          }
        }
      },
      handleGetOffer(id) {
        this.interview_list = [];
        this.$http.get('recruitment/interviewers',{
          position_id: id
        }).then(res => {
          if (res.code === '20000') {
            this.interview_list = res.data.data[0];
          } else {
            this.interview_list = [];
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleSelPosition(id,name) {
        this.add_msg_form.position = name;
        this.add_msg_form.position_id = id;
        this.position_visible = false;
      },
      handleOpenCancel(row) {
        this.currentRow = row;
        this.cancel_interviewee_visible = true;
      },
      handleOkCancelInterview() {
        this.$http.get(`recruitment/interviewees/cancel_interview/${this.currentRow.id}`).then(res => {
          this.handleSuccessCallback(res,'20030');
          this.cancel_interviewee_visible = false;
        })
      },
      handleSuccessCallback(res,code) {
        if (res.code === code) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
          this.getIntervieweeList();
        } else {
          this.send_msg_offer = false;
          this.$LjNotify('warning',{
            title: '失败',
            message: res.msg
          })
        }
      },
      //提交修改
      handleSubmitEdit() {
        this.$http.put(`recruitment/interviewees/${this.currentRow.id}`,this.add_interviewer_form).then(res => {
          this.handleSuccessCallback(res,'20010');
          this.handleCancelEditInterviewee();
        })
      },
      handleOpenEdit(row) {
        this.currentRow = row;
        this.add_interviewer_form.name = row.name;
        this.add_interviewer_form.position = row.position.name;
        this.add_interviewer_form.position_id.push(row.position.id);
        this.add_interviewer_form.interview_time = row.interview_time;
        this.add_interviewer_form.platform = row.platform;
        this.edit_interviewee_visible = true;
      },
      //取消修改面试人信息
      handleCancelEditInterviewee() {
        this.currentRow = '';
        this.add_interviewer_form.name = '';
        this.add_interviewer_form.interview_time = '';
        this.add_interviewer_form.position_id = [];
        this.add_interviewer_form.position = '';
        this.add_interviewer_form.platform = '';
        this.edit_interviewee_visible = false;
      },
      //获取面试人列表
      getIntervieweeList() {
        this.showLoading(true);
        this.$http.get('recruitment/interviewer_process/reservationList',this.params).then(res => {
          this.showLoading(false);
          if (res.code === "20000") {
            this.tableList = res.data.data;
            this.tableCount = res.data.count;
          } else {
            this.tableList = [];
            this.tableCount = 0;
          }
        });
      },
      //关闭添加面试官
      handleCloseAddMsg() {
        for (let key in this.add_msg_form) {
          this.add_msg_form[key] = '';
        }
        this.add_msg_visible = false;
        this.is_paper = '';
        this.is_staff = '';
        this.$emit('closeMsg');
      },
      //关闭添加面试人
      handleCloseAddInterviewer() {
        for (let key in this.add_interviewer_form) {
          this.add_interviewer_form[key] = '';
        }
        this.add_interviewer_form.position_id = [];
        this.add_interviewer_form.position = '';
        this.interview_list.interviewer = [];
        this.$emit('closeMs');
      },
      //分页
      handleChangePage(page) {
        this.params.page = page;
        this.getIntervieweeList();
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        // return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
          let ids = _(this.tableList).filter({interviewee_status: 4}).map('id');
          return ids.includes(row.id) ? 'tableChooseRow' : '';
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_two.scss";

  @mixin part_two_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_two {
      height: 100%;
      > div {
        width: 100%;
        height: 100%;
        .btn_edit {
          display: inline-block;
          width: 25px;
          height: 25px;
          cursor: pointer;
          @include part_two_img('edit.png','theme1');
        }
      }
    }
  }

</style>
