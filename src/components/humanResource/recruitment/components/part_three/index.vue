<template>
  <div id="part_three">
    <div>
      <div class="container flex-center">
        <div class="content">
          <div class="content_header">
            <h3>web前端工程师</h3>
          </div>
          <div>
            <el-table
              :data="tableList"
              highlight-current-row
              :row-class-name="tableChooseRow"
              @cell-click="tableClickRow"
              @row-dblclick="tableDblClick"
              header-row-class-name="tableHeader"
            >
              <el-table-column label="姓名" prop="name" align="center"></el-table-column>
              <el-table-column label="来源" prop="come" align="center">
                <template slot-scope="scope">
                  <span>{{ platform[scope.row.platform - 1] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="result" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="page bottom_page">
            <el-pagination
              :total="tableCount"
              layout="total,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
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
              <div class="look_btn" @click="hide_resume = false"><span class="btn_look"></span>查看简历及答案</div>
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
                <span>{{ interview_form.offer }}</span>
              </el-form-item>
              <el-form-item label="面试结果">
                <span>{{ interview_form.res }}</span>
              </el-form-item>
              <el-form-item label="面试评价">
                <span>{{ interview_form.comment }}</span>
              </el-form-item>
              <el-form-item label="面试结果" v-if="is_edit">
                <el-input v-model="interview_form.res_1" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="更改原因" v-if="is_edit">
                <el-input v-model="interview_form.cause" type="textarea" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer" v-if="is_edit">
            <el-button size="small" type="danger">确定</el-button>
            <el-button size="small" type="info" @click="handleCloseInterview">取消</el-button>
          </div>
          <div class="dialog_footer" v-else>
            <el-button type="danger" size="small" @click="is_edit = true">修改面试结果</el-button>
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
          <div>文职入职测试</div>
          <div>
            本次考试得分 <span>85分</span>
          </div>
        </div>
        <div class="content">
          ...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: { LjDialog },
    data() {
      return {
        params: {
          page: 1,
          limit: 12
        },
        tableList: [],
        tableCount: 0,
        chooseRowIds: [], //图标点击
        platform: ['智联招聘', '前程无忧', '58同城', 'BOSS直聘', '猎聘网', '首席信才', '德胜人才', '校园招聘会', '社会招聘会', '推荐', '其他',],

        //查看面试结果
        interview_res_visible: false,
        is_edit: false,
        interview_form: {
          position: 'web前端工程师',
          name: '冯宝宝',
          come: 'boss直聘',
          interview_time: '2019-02-11',
          offer: '张琳琳',
          res: '优秀，可以',
          comment: '可以考虑录取',
          res_1: '',
          cause: '',
        },

        //按钮
        btn_group: [
          {id: 1,val: '试卷'},
          {id: 2,val: '简历'}
        ],
        is_sel: 1,
        hide_resume: true

      }
    },
    mounted() {
      this.getInterviewResList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      //面试结果列表
      getInterviewResList() {
        this.$http.get('recruitment/interviewer_process/resultList',{
          params: this.params
        }).then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.tableList = res.data.data;
            this.tableCount = res.data.count;
          } else {
            this.tableList = [];
            this.tableCount = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleCheck(id) {
        this.is_sel = id;
      },
      handleCloseInterview() {
        this.is_edit = false;
        this.interview_res_visible = false;
      },
      tableDblClick(row) {
        console.log(row);
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
