<template>
  <div id="part_one">
    <div>
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
        <el-table
          :data="soldiersData"
          :height="this.mainListHeight(30) + 'px'"
          highlight-current-row
          :row-class-name="tableChooseRow"
          @cell-click="tableClickRow"
          @row-dblclick="tableDblClick"
          header-row-class-name="tableHeader"
          style="width: 100%">
          <el-table-column label="岗位" prop="position" align="center"></el-table-column>
          <el-table-column label="部门" prop="depart" align="center"></el-table-column>
          <el-table-column label="职位" prop="duty" align="center"></el-table-column>
          <el-table-column label="所需人数" prop="num" align="center"></el-table-column>
          <el-table-column label="年龄范围" prop="age" align="center"></el-table-column>
          <el-table-column label="性别" prop="sex" align="center"></el-table-column>
          <el-table-column label="薪资范围" prop="salary" align="center"></el-table-column>
          <el-table-column label="工作经验" prop="experience" align="center"></el-table-column>
          <el-table-column label="学历" prop="edu" align="center"></el-table-column>
          <el-table-column label="岗位职责" prop="desc" align="center"></el-table-column>
          <el-table-column label="招聘状态" prop="status" align="center"></el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="1000"
              :current-page="params.page"
              :page-size="params.limit"
              layout="total,jumper,prev,pager,next"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>

      <!--添加人员需求-->
      <lj-dialog
        :visible="control_info_visible"
        :size="{width: 550 + 'px',height: 750 + 'px'}"
        @close="handleCancelAddMb"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>{{is_control === 'add' ? '添加人员需求' : is_control === 'look' ? '查看人员信息' : '编辑人员需求'}}</h3>
            <div class="header_right" v-if="is_control === 'look'">
              <div class="btn_add" @click="is_control = 'edit'">+</div>
            </div>
          </div>
          <div class="dialog_main borderNone">
            <el-form :disabled="is_control === 'look'" :model="control_mb_form" :rules="control_mb_form_rules" label-width="80px" style="width: 90%;margin: 0 auto" size="small">
              <el-form-item label="部门" prop="depart">
                <el-input v-model="control_mb_form.depart"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="depart">
                <el-input v-model="control_mb_form.duty"></el-input>
              </el-form-item>
              <el-form-item label="岗位" prop="depart">
                <el-input v-model="control_mb_form.position"></el-input>
              </el-form-item>
              <el-form-item label="所需人数" prop="depart">
                <el-input v-model="control_mb_form.num"></el-input>
              </el-form-item>
              <el-form-item label="年龄范围" prop="depart">
                <el-input v-model="control_mb_form.age"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="depart">
                <el-input v-model="control_mb_form.sex"></el-input>
              </el-form-item>
              <el-form-item label="薪资范围" prop="depart">
                <el-input v-model="control_mb_form.salary"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="depart">
                <el-input v-model="control_mb_form.edu"></el-input>
              </el-form-item>
              <el-form-item label="岗位职责" prop="desc">
                <el-input v-model="control_mb_form.desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="招聘状态" prop="desc">
                <el-input v-model="control_mb_form.status" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer" v-if="is_control === 'add'">
            <el-button size="small" type="danger">确定</el-button>
            <el-button size="small" type="info" @click="handleCancelAddMb">取消</el-button>
          </div>
          <div class="dialog_footer" v-if="is_control === 'look'">
            <el-button size="small" type="danger">结束招聘该岗位</el-button>
          </div>
          <div class="dialog_footer" v-if="is_control === 'edit'">
            <el-button size="small" type="danger">确定</el-button>
            <el-button size="small" type="info" @click="handleCancelAddMb">取消</el-button>
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
    props: ['addModules'],
    components: { LjDialog },
    data() {
      return {
        soldiersData: [
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
          {
            position: 'web前端开发工程师',
            depart: '研发部',
            duty: 'web前端',
            num: '3~5人',
            age: '18~35岁',
            sex: '男优先',
            salary: '5K~50k',
            experience: '3年',
            edu: '本科',
            desc: '参与研发公司系统',
            status: '已上传招聘网站'
          },
        ],
        params: {
          page: 1,
          limit: 12
        },
        chooseRowIds: [], //图标点击

        //查看人员需求信息或编辑或添加
        is_control: 'add', //look // edit
        control_info_visible: false,
        control_mb_form: {
          depart: '',
          position: '',
          duty: '',
          num: '',
          age: '',
          sex: '',
          salary: '',
          experience: '',
          edu: '',
          desc: '',
          status: ''
        },
        control_mb_form_rules: {
          depart:[
            {required: true,message: '请选择部门',trigger: 'blur'},
          ]
        },

      }
    },
    mounted() {
      this.getSoldiersList();
    },
    activated() {
    },
    watch: {
      addModules(val) {
        this.control_info_visible = val;
      },
    },
    computed: {},
    methods: {
      //获取人员需求列表
      getSoldiersList() {
        this.$http.get('recruitment/staff_needs',this.params).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      },
      //表格某一行双击
      tableDblClick(row) {
        console.log(row);
        for (var key in this.control_mb_form) {
          this.control_mb_form[key] = row[key];
        }
        this.is_control = 'look';
        this.control_info_visible = true;
      },

      //取消添加人员
      handleCancelAddMb() {
        this.is_control = 'add';
        this.control_info_visible = false;
        this.$emit('close');
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
      //分页
      handleChangePage(page) {
        this.params.page = page;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_one.scss";

  @mixin part_three_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_one {
      > div {

      }
    }
  }

</style>
