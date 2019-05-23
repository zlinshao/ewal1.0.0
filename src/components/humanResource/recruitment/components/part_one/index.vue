<!--人员需求-->
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
          <el-table-column label="岗位" prop="position.name" align="center"></el-table-column>
          <el-table-column label="部门" prop="org.name" align="center"></el-table-column>
          <el-table-column label="所需人数" prop="number" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.number.min }} ~ {{ scope.row.number.max }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄范围" prop="year" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.year.min }} ~ {{ scope.row.year.max }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" prop="gender" align="center">
            <template slot-scope="scope">
              <span>{{ gender[scope.row.gender - 1]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="薪资范围" prop="salary" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.salary.min }} ~ {{ scope.row.salary.max }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工作经验" prop="experience" align="center">
            <template slot-scope="scope">
              <span>{{ experience[scope.row.experience - 1]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" prop="education" align="center">
            <template slot-scope="scope">
              <span>{{ education[scope.row.education - 1]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位职责" prop="content" align="center"></el-table-column>
          <el-table-column label="需求发布状态" prop="publish_status" align="center"></el-table-column>
          <el-table-column label="招聘状态" prop="status" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">已结束招聘</span>
              <span v-else>正在招聘中</span>
            </template>
          </el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="soldiersCount"
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
        :size="{width: 550 + 'px',height: 850 + 'px'}"
        @close="handleCancelAddMb"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>{{is_control === 'add' ? '添加人员需求' : is_control === 'look' ? '查看人员信息' : '编辑人员需求'}}</h3>
            <div class="header_right" v-if="is_control === 'look'">
              <div v-if="dblCurrentRow.status!=1" class="btn_edit" @click="is_control = 'edit'"></div>
            </div>
          </div>
          <div class="dialog_main borderNone">
            <el-form ref="newUserFormRef" :disabled="is_control === 'look'" :model="control_mb_form" :rules="control_mb_form_rules"
                     label-width="80px" style="width: 90%;margin: 0 auto" size="small">
              <el-form-item label="部门" prop="org_id" required>
                <org-choose width="360" title="请选择" :show-icon="false" v-model="control_mb_form.org_id"></org-choose>
                <!--<el-input v-model="control_mb_form.depart" placeholder="请选择" readonly @focus="depart_visible = true"></el-input>-->
              </el-form-item>
              <el-form-item label="岗位" prop="position_id" required>
                <post-choose width="360" title="请选择" :show-icon="false" v-model="control_mb_form.position_id"></post-choose>
                <!--<el-input v-model="control_mb_form.position" placeholder="请选择" readonly @focus="position_visible = true"></el-input>-->
              </el-form-item>
              <el-form-item label="所需人数" prop="number">
                <el-input-number :controls="false" :min="1" :max="10" v-model.number="control_mb_form.number.min"
                                 style="width: 49%" placeholder="请输入至少需求人数"></el-input-number>
                <el-input-number :controls="false" :min="1" :max="10" v-model.number="control_mb_form.number.max"
                                 style="width: 49%" placeholder="请输入至多需求人数"></el-input-number>
              </el-form-item>
              <el-form-item label="年龄范围" prop="year">
                <el-input-number :controls="false" :min="16" :max="100" v-model.number="control_mb_form.year.min"
                                 style="width: 49%" placeholder="请输入年龄最小值"></el-input-number>
                <el-input-number :controls="false" :min="18" :max="100" v-model.number="control_mb_form.year.max"
                                 style="width: 49%" placeholder="请输入年龄最大值"></el-input-number>
              </el-form-item>
              <el-form-item label="性别" prop="gender" required>
                <el-select v-model="control_mb_form.gender">
                  <el-option v-for="(item,index) in gender" :value="index + 1" :label="item" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="薪资范围" prop="salary">
                <!--<el-input v-model="control_mb_form.salary.min"
                                 style="width: 49%" placeholder="请输入薪资最小值(必填)"></el-input>
                <el-input  v-model="control_mb_form.salary.max"
                                 style="width: 49%" placeholder="请输入薪资最大值(必填)"></el-input>-->
                <el-input-number :controls="false" :min="1000" :max="1000000" v-model.number="control_mb_form.salary.min"
                                 style="width: 49%" placeholder="请输入薪资最小值(必填)"></el-input-number>
                <el-input-number :controls="false" :min="1000" :max="1000000" v-model.number="control_mb_form.salary.max"
                                 style="width: 49%" placeholder="请输入薪资最大值(必填)"></el-input-number>
              </el-form-item>
              <el-form-item label="工作经验" prop="experience" required>
                <el-select v-model="control_mb_form.experience">
                  <el-option v-for="(item,index) in experience" :value="index + 1" :label="item"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历" prop="education" required>
                <el-select v-model="control_mb_form.education">
                  <el-option v-for="(item,index) in education" :value="index + 1" :label="item"
                             :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位职责" prop="content">
                <el-input v-model="control_mb_form.content" type="textarea" :autosize="{ minRows: 2, maxRows: 14}" placeholder="必填(300字以内)"></el-input>
              </el-form-item>
              <el-form-item label="招聘状态" prop="publish_status">
                <el-input v-model="control_mb_form.publish_status" type="textarea" :autosize="{ minRows: 2, maxRows: 14}" placeholder="必填(300字以内)"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer" v-if="is_control === 'add'">
            <el-button size="small" type="danger" @click="handleAddSoldiers">确定</el-button>
            <el-button size="small" type="info" @click="handleCancelAddMb">取消</el-button>
          </div>
          <div class="dialog_footer" v-if="is_control === 'look'">
            <el-button si ze="small" type="danger" @click="stop_need_visible = true" v-if="dblCurrentRow.status === 0">
              结束招聘该岗位
            </el-button>
            <el-button size="small" type="info" v-if="dblCurrentRow.status === 1">已结束招聘该岗位</el-button>
          </div>
          <div class="dialog_footer" v-if="is_control === 'edit'">
            <el-button size="small" type="danger" @click="handleUpdateSoldiers">确定</el-button>
            <el-button size="small" type="info" @click="handleCancelAddMb">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--结束招聘确定-->
      <lj-dialog
        :visible="stop_need_visible"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="stop_need_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定结束该招聘需求吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleStopNeed">确定</el-button>
            <el-button type="info" size="small" @click="stop_need_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

<!--      &lt;!&ndash;岗位&ndash;&gt;-->
<!--      <postOrgan :module="position_visible" @close="handleSelPosition"></postOrgan>-->

<!--      &lt;!&ndash;部门&ndash;&gt;-->
<!--      <departOrgan :module="depart_visible" @close="handleSelDepart"></departOrgan>-->
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import LjDialog from '../../../../common/lj-dialog.vue';
  import postOrgan from '../../../../common/postOrgan.vue';
  import departOrgan from '../../../../common/departOrgan.vue';
  import OrgChoose from '../../../../common/lightweightComponents/OrgChoose';
  import PostChoose from '../../../../common/lightweightComponents/PostChoose';

  export default {
    name: "index",
    props: ['addModules', 'searchData'],
    components: {LjDialog, postOrgan, departOrgan, OrgChoose, PostChoose},
    data() {
      return {
        control_mb_form_rules: {
          org_id: [
            {required: true, message: '请选择部门', trigger: ['blur','change']},
          ],
          position_id: [
            {required: true, message: '请选择岗位', trigger: ['blur','change']},
            // {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          gender: [
            {required:true, message: '请选择性别',trigger:['blur','change']},
          ],
          experience: [
            {required:true, message: '请选择工作经验',trigger:['blur','change']},
          ],
          education: [
            {required:true, message: '请选择学历',trigger:['blur','change']},
          ],
          /*salary: [
            {required:true, message: '请输入薪资范围',trigger:['blur','change']},
            {min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: ['blur','change']}
          ],*/
          content: [
            {message: '请输入岗位职责',trigger:['blur','change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],
          publish_status: [
            {message: '请输入招聘状态',trigger:['blur','change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ],

        },


        // //部门
        // depart_visible: false,
        // //岗位
        // position_visible: false,

        //需求列表
        soldiersData: [],
        soldiersCount: 0,
        gender: ['限男', '限女', '男优先', '女优先', '不限'],
        experience: ['1年', '1-3年', '3-5年', '5-10年', '10年以上', '不限'],
        education: ['高中及以上', '大专及以上', '本科及以上', '不限'],
        params: {
          page: 1,
          limit: 12
        },
        chooseRowIds: [], //图标点击
        dblCurrentRow: '',

        //查看人员需求信息或编辑或添加
        is_control: 'add', //look // edit
        control_info_visible: false,
        control_mb_form: {
          depart: '',
          org_id: [],
          position: '',
          position_id: '',
          number: {
            min: null,
            max: null
          },
          year: {
            min: null,
            max: null
          },
          gender: '',
          salary: {
            min: '',
            max: ''
          },
          experience: '',
          education: '',
          content: '',
          publish_status: '',
        },

        //结束招聘确定
        stop_need_visible: false
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
      searchData: {
        handler(val) {
          this.params = Object.assign(this.params, {}, val);
          this.getSoldiersList();
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      /*handleSelPosition(id, name) {
        if (id !== 'close') {
          this.control_mb_form.position = name;
          this.control_mb_form.position_id = id;
        }
        this.position_visible = false;
      },
      handleSelDepart(id, name) {
        if (id !== 'close') {
          console.log(id, name);
          this.control_mb_form.depart = name;
          this.control_mb_form.org_id = id;
        }
        this.depart_visible = false;
      },*/
      //停止招聘
      handleStopNeed() {
        this.$http.get(`recruitment/staff_needs/stop/${this.dblCurrentRow.id}`).then(res => {
          console.log(res);
          if (res.code === '20030') {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg
            });
            this.getSoldiersList();
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.msg
            });
          }
          this.stop_need_visible = false;
          this.handleCancelAddMb();
        }).catch(err => {
          console.log(err);
        })
      },

      validateNumberBetween() {
        /*let personNeedMin = this.control_mb_form.number.min;
        let personNeedMax = this.control_mb_form.number.max;
        let yearMin = this.control_mb_form.year.min;
        let yearMax = this.control_mb_form.year.max;
        let salaryMin = this.control_mb_form.salary.min;
        let salaryMax = this.control_mb_form.salary.max;
        compare(this.control_mb_form.number);
        compare(this.control_mb_form.year);
        compare(this.control_mb_form.salary);*/
        if(compare(this.control_mb_form.number,this,'number')&&compare(this.control_mb_form.year,this,'year')) {
          return true;
        }
        return false;
        function compare({min,max},_this,type) {
          /*switch (type) {
            case 'number':
              if(min>=1&&min)
              break;
            case 'year':
              break;
          }*/

          if(min>max) {
            _this.$LjMessage('warning',{title:'警告',msg:'最小值比最大值大'});
            return false;
          }
          return true;
        }

      },

      //更新添加人员需求
      handleUpdateSoldiers() {
        if(!this.validateNumberBetween()) return;
        this.$refs['newUserFormRef'].validate(valid=> {
          if(valid) {
            this.$http.put(`recruitment/staff_needs/${this.dblCurrentRow.id}`, this.control_mb_form).then(res => {
              this.$LjMessageEasy(res,()=> {
                this.getSoldiersList();
              });
              this.handleCancelAddMb();
            });
          }
        });
      },
      //确定添加人员需求
      handleAddSoldiers() {
        if(!this.validateNumberBetween()) return;
        this.$refs['newUserFormRef'].validate(valid=> {
          if(valid) {
            this.$http.post('recruitment/staff_needs', this.control_mb_form).then(res => {
              this.$LjMessageEasy(res,()=> {
                this.getSoldiersList();
                this.handleCancelAddMb();
              });
            });
          }
        })

      },
      //获取人员需求列表
      getSoldiersList() {
        this.showLoading(true);
        this.$http.get('recruitment/staff_needs', this.params).then(res => {
          if (res.code === '20000') {
            this.soldiersData = res.data.data;
            this.soldiersCount = res.data.count;
          } else {
            this.soldiersData = [];
            this.soldiersCount = 0;
          }
          setTimeout(() => {
            this.showLoading(false);
          }, 1000)
        }).catch(err => {
          console.log(err);
        });
      },
      //表格某一行双击
      tableDblClick(row) {
        this.dblCurrentRow = row;
        this.control_mb_form.content = row.content;
        this.control_mb_form.salary = row.salary;
        this.control_mb_form.year = row.year;
        this.control_mb_form.education = row.education;
        this.control_mb_form.number = row.number;
        this.control_mb_form.gender = row.gender;
        this.control_mb_form.experience = row.experience;
        this.control_mb_form.publish_status = row.publish_status;
        this.control_mb_form.org_id = row.org_id;
        this.control_mb_form.depart = row.org.name;
        this.control_mb_form.position = row.position.name;
        this.control_mb_form.position_id = row.position_id;
        this.is_control = 'look';
        this.control_info_visible = true;
      },

      //取消添加人员
      handleCancelAddMb() {
        this.is_control = 'add';
        this.control_mb_form = {
          depart: '',
          position: '',

          org_id: '',
          position_id: '',
          number: {
            min: '',
            max: ''
          },
          year: {
            min: '',
            max: ''
          },
          gender: '',
          salary: {
            min: '',
            max: ''
          },
          experience: '',
          education: '',
          content: '',
          status: ''
        };
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
        // let ids = _.map(this.soldiersData,'id');
        let ids = _(this.soldiersData).filter({status: 1}).map('id');
        return ids.includes(row.id) ? 'tableChooseRow' : '';
      },
      //分页
      handleChangePage(page) {
        this.params.page = page;
        this.getSoldiersList();
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../assets/scss/humanResource/recruitment/components/part_one.scss";

  @mixin part_one_img($m,$n) {
    $url: '../../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #part_one {
      > div {
        .btn_edit {
          display: inline-block;
          width: 25px;
          height: 25px;
          cursor: pointer;
          @include part_one_img('edit.png', 'theme1');
        }
      }
    }
  }

</style>
