<template>
  <div id="part_two">
    <div>
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="tableList"
          :height="this.mainListHeight(30) + 'px'"
          highlight-current-row
          :row-class-name="tableChooseRow"
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
          <el-table-column label="已通知面试官" prop="offer" align="center"></el-table-column>
          <el-table-column label="简历" prop="" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" plain>查看简历</el-button>
            </template>
          </el-table-column>
          <el-table-column label="取消面试" prop="" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleOpenCancel(scope.row)">取消面试</el-button>
            </template>
          </el-table-column>
          <el-table-column label="修改" prop="" align="center">
            <template slot-scope="scope">
              <span class="btn_edit" @click="handleOpenEdit(scope.row)"></span>
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
        :visible="add_interviewer_visible"
        :size="{width: 450 + 'px',height: 520 + 'px'}"
        @close="handleCloseAddInterviewer"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>添加面试人</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="add_interviewer_form" size="small" label-width="100px">
              <el-form-item label="岗位">
                <el-input v-model="add_interviewer_form.position"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="add_interviewer_form.name"></el-input>
              </el-form-item>
              <el-form-item label="来源">
                <el-select v-model="add_interviewer_form.platform">
                  <el-option v-for="(item,index) in platform" :value="index + 1" :label="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试官">
                <el-input v-model="add_interviewer_form.interviewer"></el-input>
              </el-form-item>
              <el-form-item label="预约面试时间">
                <el-date-picker
                  v-model="add_interviewer_form.interview_time"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择面试时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传简历">
                <Upload :file="upload_form"></Upload>
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
            <div class="unUse-txt">确定发送面试任务给张琳琳吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="send_msg_offer = false">完成</el-button>
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
                <el-input v-model="add_msg_form.position"></el-input>
              </el-form-item>
              <el-form-item label="部门">
                <el-input v-model="add_msg_form.depart"></el-input>
              </el-form-item>
              <el-form-item label="面试官">
                <el-input v-model="add_msg_form.offer1" style="margin-bottom: 20px"></el-input>
                <el-input v-model="add_msg_form.offer2" style="margin-bottom: 20px"></el-input>
                <el-input v-model="add_msg_form.offer3"></el-input>
              </el-form-item>
              <el-form-item label="上传试卷">

              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="add_msg_visible = false">确定</el-button>
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
          <div class="dialog_main">
            <el-form v-model="add_interviewer_form" size="small" label-width="80px">
              <el-form-item label="岗位名称">
                <el-input v-model="add_interviewer_form.position"></el-input>
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
  import LjDialog from '../../../../common/lj-dialog.vue';
  import Upload from '../../../../common/upload.vue';

  export default {
    name: "index",
    components: { LjDialog ,Upload},
    props: [ 'addInterviewerVisible' ,'addOfferVisible'],
    data() {
      return {
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
          position: 'Android开发工程师',
          position_id: 124,

          name: '',
          platform: '',

          interviewer: '张琳琳',
          interviewer_id: 3320,

          interview_time: '',
          resume_id: [],
        },
        upload_form: {
          keyName: 'resume_id',
          setFile: [],
        },
        //修改面试人信息
        edit_interviewee_visible: false,
        currentRow: '',

        send_msg_offer: false,
        platform: ['智联招聘', '前程无忧', '58同城', 'BOSS直聘', '猎聘网', '首席信才', '德胜人才', '校园招聘会', '社会招聘会', '推荐', '其他',],

        //添加面试官
        add_msg_visible: false,
        add_msg_form: {
          position: '',
          depart: '',
          offer1: '',
          offer2: '',
          offer3: '',
          paper: ''
        },
        //取消面试
        cancel_interviewee_visible: false
      }
    },
    mounted() {
      this.getIntervieweeList();
    },
    activated() {
    },
    watch: {
      addInterviewerVisible(val) {
        this.add_interviewer_visible = val;
      },
      addOfferVisible(val) {
        this.add_msg_visible = val;
      },
    },
    computed: {},
    methods: {
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
          this.$LjNotify('warning',{
            title: '失败',
            message: res.msg
          })
        }
      },
      //提交修改
      handleSubmitEdit() {
        this.$http.put(`recruitment/interviewees/${this.currentRow.id}`,this.add_interviewer_form).then(res => {
          console.log(res);
        })
      },
      handleOpenEdit(row) {
        this.currentRow = row;
        this.add_interviewer_form.name = row.name;
        this.add_interviewer_form.interview_time = row.interview_time;
        this.add_interviewer_form.platform = row.platform;
        this.edit_interviewee_visible = true;
      },
      //取消修改面试人信息
      handleCancelEditInterviewee() {
        this.currentRow = '';
        this.add_interviewer_form.name = '';
        this.add_interviewer_form.interview_time = '';
        this.add_interviewer_form.platform = '';
        this.edit_interviewee_visible = false;
      },
      //获取面试人列表
      getIntervieweeList() {
        this.showLoading(true);
        this.$http.get('recruitment/interviewer_process/reservationList',{
          params: this.params
        }).then(res => {
          console.log(res);
          if (res.code === "20000") {
            this.tableList = res.data.data;
            this.tableCount = res.data.count;
          } else {
            this.tableList = [];
            this.tableCount = 0;
          }
          setTimeout(() => {
            this.showLoading(false);
          },1000)
        }).catch(err => {
          console.log(err);
        });
      },
      //关闭添加面试官
      handleCloseAddMsg() {
        this.add_msg_visible = false;
        this.$emit('closeMsg');
      },
      //关闭添加面试人
      handleCloseAddInterviewer() {
        this.add_interviewer_visible = false;
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
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
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
