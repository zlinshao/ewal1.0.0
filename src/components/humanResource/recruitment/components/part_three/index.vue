<!--已约面试-->
<template>
  <div id="part_three">
    <div>
      <div class="container flex-center">
        <div class="content">
          <div class="content_header">
            <h3></h3>
          </div>
          <div>
            <el-table
              :data="tableList"
              highlight-current-row
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick"
              header-row-class-name="tableHeader"
            >
              <el-table-column label="姓名" prop="name" align="center"></el-table-column>
              <el-table-column label="来源" prop="platform" align="center"> </el-table-column>
              <el-table-column label="状态" prop="result" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="page bottom_page">
            <el-pagination
              :total="tableCount"
              layout="total,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage"
              style="text-align: center"
            ></el-pagination>
          </div>
        </div>
      </div>

      <!--双击弹框-->
      <lj-dialog
        :visible="interview_res_visible"
        :size="{width: 500 + 'px',height: 670 + 'px'}"
        @close="interview_res_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>{{ is_edit ? '修改面试结果' : '查看面试结果'}}</h3>
            <div class="header_right">
              <div class="look_btn" @click="handleLookDetailInfo"><span class="btn_look"></span>查看入职登记信息</div>
            </div>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="interview_form" size="small" label-width="80px" class="showPadding">
              <el-form-item label="岗位">
                <span>{{ interview_form.position }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ interview_form.name }}</span>
              </el-form-item>
              <el-form-item label="来源">
                <span>{{ interview_form.come }}</span>
              </el-form-item>
              <el-form-item label="面试时间">
                <span>{{ interview_form.interview_time }}</span>
              </el-form-item>
              <el-form-item label="面试官">
                <span>{{ interview_form.interviewer.name }}</span>
              </el-form-item>
              <el-form-item label="面试结果">
                <span>{{ interview_form.result }}</span>
              </el-form-item>
              <el-form-item label="面试评价">
                <span>{{ interview_form.comment }}</span>
              </el-form-item>
              <el-form-item label="面试结果" v-if="is_edit">
                <el-select v-model="interview_form.interview_result" placeholder="请输入">
                  <el-option v-for="item in interview_res" :value="item.key" :label="item.val" :key="item.key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="更改原因" v-if="is_edit">
                <el-input v-model="interview_form.change_result" type="textarea" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer" v-if="is_edit">
            <el-button size="small" type="danger" @click="handleSubmitChangeInterview">确定</el-button>
            <el-button size="small" type="info" @click="handleCloseInterview">取消</el-button>
          </div>
          <div class="dialog_footer" v-else>
            <el-button type="danger" v-if="VALIDATE_PERMISSION['Finished-Audition-Edit']" size="small" @click="is_edit = true">修改面试结果</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--查看试卷和简历-->
      <div class="paper_resume" :class="{'hide_resume': hide_resume}">
        <!--按钮组-->
        <div class="btn_group">
          <div
            v-for="tmp in btn_group"
            :key="tmp.id"
            :class="{'is_select': tmp.id === is_sel}"
            @click="handleCheck(tmp.id)">{{ tmp.val }}</div>
        </div>

        <!--内容-->
        <div class="top_title flex">
          <!--<div>文职入职测试</div>-->
          <!--<div>-->
            <!--本次考试得分 <span>85分</span>-->
          <!--</div>-->
        </div>
        <div class="content">
          <div class="base_info flex">
            <div class="writingMode">基本信息</div>
            <div>
              <el-form size="small" label-width="100px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="应聘职位:">
                      <span>{{ info.position && info.position.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="籍贯:">
                      <span>{{ info.birthplace || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="婚育情况:">
                      <span>{{ info.married_status_type || '/' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="到岗时间:">
                      <span>{{ info.arrive_time || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期:">
                      <span>{{ info.birthday || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="通信地址:">
                      <span>{{ info.contact_address || '/' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="有无犯罪史:">
                      <span>{{ info.crime_history_type || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="期待薪资:">
                      <span>{{ info.real_salary }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="政治面貌:">
                      <span>{{ info.political_status_type	 || '/' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="户口属地:">
                      <span>{{ info.registered_residence || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名:">
                      <span>{{ info.name }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机:">
                      <span>{{ info.phone	 || '/' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="邮箱:">
                      <span>{{ info.e_mail || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别:">
                      <span>{{ info.gender_type }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份证:">
                      <span>{{ info.ID_number	 || '/' }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="英语等级:">
                      <span>{{ info.english_level_type	 || '/' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族:">
                      <span>{{ info.national_type }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="edu_info flex">
            <div class="writingMode">学历信息</div>
            <div v-if="info.education_history && info.education_history.length > 0">
              <el-form label-width="120px" size="small" v-for="item in info.education_history" :key="item.id">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="起止时间:">
                      <span>{{ item.start_time }} ~ {{ item.end_time }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校名称:">
                      <span>{{ item.school || '/'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业:">
                      <span>{{ item.major || '/'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="学历:">
                      <span>{{ item.education || '/'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学习形式:">
                      <span>{{ item.learning_ways || '/'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="work_info flex">
            <div class="writingMode">工作履历</div>
            <div v-if="info.work_history && info.work_history.length > 0">
                <el-form label-width="120px" size="small" v-for="item in info.work_history" :key="item.id">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="起止时间:">
                        <span>{{ item.start_time }} ~ {{ item.end_time }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="工作单位:">
                        <span>{{ item.work_place || '/'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="职务:">
                        <span>{{ item.position || '/'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="月薪:">
                        <span>{{ item.salary || '/'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证明人:">
                        <span>{{ item.witness || '/'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="证明人电话:">
                        <span>{{ item.witness_phone || '/'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import LjDialog from '../../../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: { LjDialog },
    props: ['searchData'],
    data() {
      return {

        url:globalConfig.humanResource_server,

        params: {
          page: 1,
          limit: 6
        },
        tableList: [],
        tableCount: 0,
        chooseRowIds: [], //图标点击
        platform: ['智联招聘', '前程无忧', '58同城', 'BOSS直聘', '猎聘网', '首席信才', '德胜人才', '校园招聘会', '社会招聘会', '推荐', '其他',],

        //查看面试结果
        interview_res_visible: false,
        is_edit: false,
        interview_form: {
          position: '',
          name: '',
          come: '',
          interview_time: '',
          comment: '',
          result: '',
          change_result: '',
          interviewer: '',
        },
        currentRow: '',

        //按钮
        btn_group: [
          // {id: 1,val: '试卷'},
          {id: 1,val: '简历'}
        ],
        is_sel: 1,
        hide_resume: true,

        //应聘者详细信息
        info: '',
        base_info: [
          {
            label: '应聘职位:',
            key: 'position.name'
          },
          {
            label: '籍贯',
            key: 'birthplace'
          },
          {
            label: '婚育情况',
            key: 'crime_history_type'
          }
        ],
        interview_res: [
          {
            key: 0,
            val: '未通过'
          },
          {
            key: 1,
            val: '通过'
          },
          {
            key: 2,
            val: '进入二轮面试'
          },
          {
            key: 3,
            val: '通过待定'
          },
        ]
      }
    },
    mounted() {
      this.getInterviewResList();
    },
    activated() {
    },
    watch: {
      searchData: {
        handler(val) {
          console.log(val);
          this.params = Object.assign(this.params,{},val);
          this.getInterviewResList();
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      handleLookDetailInfo() {
        this.$http.get(`${this.url}recruitment/interviewees/get_info/${this.currentRow.interviewee_id}`).then(res => {
          console.log(res);
          if (res.code === '20030') {
            this.info = res.data;
            this.hide_resume = false;
          } else {
            this.info = '';
            this.$LjNotify('warning',{
              title: '警告',
              message: '获取信息失败'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleChangePage(page) {
        this.params.page = page;
        this.getInterviewResList();
      },
      //确定修改面试结果
      handleSubmitChangeInterview() {
        let params = {
          interview_result: this.interview_form.interview_result,
          change_result: this.interview_form.change_result
        };
        let result = this.interview_form.result;

        //if(this.interview_res[params.interview_result]==result) {
        if(_.find(this.interview_res,{key:params.interview_result}).val==result) {
          this.$LjMessage('warning',{title:'警告',msg:'不可修改为原值'});
          return;
        }

        this.$http.put(`${this.url}recruitment/interviewers/edit_result/${this.currentRow.id}`,params).then(res => {
          if (res.code === '20030') {
            this.$LjNotify('success',{
              title: '成功',
              message: '修改成功'
            });
            this.handleCloseInterview();
            this.getInterviewResList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        });
      },
      //面试结果列表
      getInterviewResList() {
        if(!this.VALIDATE_PERMISSION['Invited-Audition-Select']) {
          this.$LjMessageNoPermission();
          return;
        }
        this.$http.get(this.url+'recruitment/interviewer_process/resultList',this.params).then(res => {
          if (res.code === '20000') {
            this.tableList = res.data.data;
            this.tableCount = res.data.count;
          } else {
            this.tableList = [];
            this.tableCount = 0;
          }
        });
      },
      handleCheck(id) {
        this.is_sel = id;
        this.hide_resume = true;
      },
      handleCloseInterview() {
        for (var key in this.interview_form) {
          this.interview_form[key] = '';
        }
        this.is_edit = false;
        this.interview_res_visible = false;
      },
      tableDblClick(row) {
        this.currentRow = row;
        this.interview_form.position = row.position.name;
        this.interview_form.name = row.name;
        this.interview_form.come = row.platform;
        this.interview_form.interview_time = row.interview_time;
        this.interview_form.result = row.result;
        this.interview_form.comment = row.interview_comment;
        this.interview_form.interviewer = row.interviewer;
        this.interview_res_visible = true;
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
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_three.scss";

  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_three {
      > div {
        .container {
          @include part_three_img('ksszbj.png', 'theme1');
        }
        .look_btn {
          color: $colorE33;
          font-size: 14px;
          cursor: pointer;
        }
        .bottom_page {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }

</style>
