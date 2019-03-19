<template>
  <div id="part_four">
    <div class="flex-center">
      <div class="container flex-center">
        <div class="content">
          <el-table
            :data="tableList"
            highlight-current-row
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            style="width: 100%"
          >
            <el-table-column label="岗位" prop="position.name" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="来源" prop="plaform_name" align="center"></el-table-column>
            <el-table-column label="入职资料反馈" prop="info_status" align="center"></el-table-column>
            <el-table-column label="入职结果" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" plain @click="handleOpenEdit(scope.row)">{{ entry_feedback[scope.row.entry_feedback]}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="入职通知" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain>发送offer</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--编辑入职结果-->
      <lj-dialog
        :visible="edit_result_visible"
        :size="{width: 400 + 'px',height: 520 + 'px'}"
        @close="handleCancelEdit"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>编辑入职结果</h3>
          </div>
          <div class="dialog_main">
            <el-form :model="edit_result_form" size="small" label-width="80px">
              <el-form-item label="岗位">
                <span>{{ edit_result_form.position }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ edit_result_form.name }}</span>
              </el-form-item>
              <el-form-item label="来源">
                <span>{{ edit_result_form.platform }}</span>
              </el-form-item>
              <el-form-item label="入职资料">
                <span>{{ edit_result_form.info_status }}</span>
              </el-form-item>
              <el-form-item label="入职结果">
                <div class="changeChoose flex-center" style="margin-top: 10px">
                  <el-radio v-model="edit_result_form.entry_feedback" :label="1">同意</el-radio>
                  <el-radio v-model="edit_result_form.entry_feedback" :label="2">拒绝</el-radio>
                </div>
              </el-form-item>
              <el-form-item label="" v-if="edit_result_form.entry_feedback === 2">
                <el-select v-model="edit_result_form.unentry_reason" placeholder="请选择原因">
                  <el-option :value="1" label="上班路程远"></el-option>
                  <el-option :value="2" label="薪资低"></el-option>
                  <el-option :value="3" label="将入职其他公司"></el-option>
                  <el-option :value="4" label="暂不考虑离职"></el-option>
                  <el-option :value="5" label="过期未回复"></el-option>
                  <el-option :value="6" label="其他原因"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="small" type="danger" @click="handleOkEdit">确定</el-button>
            <el-button size="small" type="info" @click="handleCancelEdit">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: {LjDialog},
    data() {
      return {
        //表格信息
        tableList: [],
        chooseRowIds: [], //图标点击
        entry_feedback: ['未反馈', '同意入职', '拒绝入职'],

        // 编辑入职结果
        edit_result_visible: false,
        edit_result_form: {
          position: '',
          name: '',
          platform: '',
          info_status: '',
          entry_feedback: '',
          unentry_reason: ''
        },
        currentRow: ''
      }
    },
    mounted() {
      this.getTableList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleOkEdit() {
        if (this.edit_result_form.entry_feedback === 1) {

        } else if (this.edit_result_form.entry_feedback === 2) {
          this.$http.put(`recruitment/interviewer_process/entry_feedback/${this.currentRow.id}`,{
            params: {
              entry_feedback: this.edit_result_form.entry_feedback,
              unentry_reason: this.edit_result_form.unentry_reason
            }
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }
      },
      handleOpenEdit(row) {
        this.currentRow = row;
        this.edit_result_form.position = row.position.name;
        this.edit_result_form.name = row.name;
        this.edit_result_form.platform = row.plaform_name;
        this.edit_result_form.info_status = row.info_status;
        this.edit_result_visible = true;
      },
      handleCancelEdit() {
        this.edit_result_visible = false;
      },
      //获取表格数据
      getTableList() {
        this.$http.get('recruitment/interviewer_process/interviewedList').then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.tableList = res.data.data;
          } else {
            this.tableList = [];
          }
        }).catch(err => {
          console.log(err);
        })
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
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_four.scss";

  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_four {
      > div {
        .container {
          @include part_three_img('ksszbj.png', 'theme1');
        }
      }
    }
  }
</style>
