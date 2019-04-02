<template>
  <div id="departments">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1 @click="myUtils.emptyPic(photo)">三省六部</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="searchTerm" v-if="chooseTab === 3">
          <el-radio-group v-model="checkList" @change="handleChangeParams">
            <el-row :gutter="10">
              <el-col :span="4">
                <el-radio :label="0">全部</el-radio>
              </el-col>
              <el-col :span="5">
                <el-radio :label="1">离职员工</el-radio>
              </el-col>
              <el-col :span="5">
                <el-radio :label="2">在职员工</el-radio>
              </el-col>
              <el-col :span="5">
                <el-radio :label="3">禁用员工</el-radio>
              </el-col>
              <el-col :span="5">
                <el-radio :label="4">非禁用员工</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </div>
        <div class="icons dimission" v-if="chooseTab === 3"></div>
        <div class="buttons button1" @click="showSetForm" v-if="chooseTab === 3 || chooseTab === 4">设置报表</div>
        <div class="buttons button2" v-if="chooseTab === 3 || chooseTab === 4" @click="handleExportInfo">导出报表</div>
        <div class="icons add" @click="showAddModule(chooseTab)" v-show="chooseTab === 2"><b>+</b></div>
        <div class="icons search" @click="highSearch(chooseTab)" v-show="chooseTab !== 2"></div>
      </div>
    </div>

    <!--组织架构-->
    <div v-if="chooseTab === 1">
      <Organization></Organization>
    </div>

    <!--部门管理-->
    <div class="departList" v-if="chooseTab === 2">
      <div class="items-start mainList" :class="{'mainListHover': routeAnimation}">
        <p v-for="item in departList" @click="showDepartManage(item)">
          <span class="writingMode" :title="item.name">
            {{item.name}}
          </span>
          <a class="control flex-center">
            <i class="el-icon-delete" @click.self.stop="handleDelDepart(item)"></i>
            <i class="el-icon-edit" @click.self.stop="handleOpenEditDepart(item)"></i>
            <i class="el-icon-back" @click.self.stop="handleOpenBackParent(item)"></i>
            <i class="el-icon-view" @click.self.stop="handleOpenLookInfo(item)"></i>
          </a>
        </p>
      </div>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="departCount"
            :current-page="params.page"
            :page-size="params.limit"
            layout="total,jumper,prev,pager,next"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--员工名册-->
    <div v-show="chooseTab === 3">
      <StaffRoster :searchVal="searchFruit3" :export-info="exportInfo" :search-params="staff_params"></StaffRoster>
    </div>

    <!--离职管理-->
    <div v-if="chooseTab === 4">
      <LeaveJob :export-info="exportInfo"></LeaveJob>
    </div>

    <!--权限管理-->
    <div v-if="chooseTab === 5" style="padding: 0 30px;">
      <!--系统-->
      <div style="padding: 10px 0;margin-bottom: 30px">
        <el-card>
          <el-table
            :data="system_list"
            height="400px"
            @row-click="handleClickSystem"
          >
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="系统标识" prop="sign" align="center"></el-table-column>
            <el-table-column label="系统名称" prop="name" align="center"></el-table-column>
            <el-table-column label="系统描述" prop="description" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="handleOpenAddModule(scope.row)">新增模块</el-button>
                <el-button type="warning" size="mini" @click="handleOpenEdit('system',scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelControl('system',scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card style="margin: 20px auto">
          <el-table
            :data="module_list"
            @row-click="handleClickModule"
          >
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="系统标识" prop="sign" align="center"></el-table-column>
            <el-table-column label="系统名称" prop="name" align="center"></el-table-column>
            <el-table-column label="系统描述" prop="description" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="mini" @click="handleOpenAddPower(scope.row)">新增权限</el-button>
                <el-button type="warning" size="mini" @click="handleOpenEdit('module',scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelControl('system',scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card>
          <el-table :data="power_list" height="400px">
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="权限标示" prop="sign" align="center"></el-table-column>
            <el-table-column label="权限名称" prop="name" align="center"></el-table-column>
            <el-table-column label="权限描述" prop="description" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="warning" size="mini" @click="handleOpenEdit('power',scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelControl('power',scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>

    <!--新增部门-->
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>{{ is_edit_depart ? '编辑部门' : '添加部门'}}</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible">
            <el-form-item label="部门名称" required>
              <el-input v-model="departForm.name"></el-input>
            </el-form-item>
            <el-form-item label="上级部门" required>
              <div class="items-center iconInput">
                <el-input v-model="departForm.parent" readonly @focus="chooseDepart = true"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="部门负责人" required>
              <div class="items-center iconInput">
                <el-input v-model="departForm.leader" readonly @focus="organModule = true"></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddDepart">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddDepart">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--设置表单-->
    <SetForms :module="SetFormVisible" :data="setFormData" @close="SetFormVisible = false"></SetForms>

    <!--管理部门/员工管理-->
    <DepartManage :module="departModule" :info="departInfo" @close="departModule = false"></DepartManage>

    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--组织架构选人-->
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>

    <!--部门选择-->
    <DepartOrgan :module="chooseDepart" @close="handleGetDepart"></DepartOrgan>

    <!--确定删除部门-->
    <lj-dialog :visible="del_depart_visible" :size="{width: 400 + 'px',height: 250 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确定</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该部门吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitDel">确定</el-button>
          <el-button type="info" size="small" @click="del_depart_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--确定删除-->
    <lj-dialog
      :visible="confirm_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="confirm_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确定</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该条权限吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmDel">确定</el-button>
          <el-button type="info" size="small" @click="confirm_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--编辑模块-->
    <lj-dialog
      :visible="edit_module_visible"
      :size="{width: 500 + 'px',height: 550 + 'px'}"
      @close="handleCancelEdit"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="名称">
              <el-input v-model="edit_module_form.name"></el-input>
            </el-form-item>
            <el-form-item label="父级模块">
              <el-select v-model="edit_module_form.parent_id" :disabled="edit_type === 'system'">
                <el-option v-for="item in edit_current_list" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="edit_module_form.description"></el-input>
            </el-form-item>
            <el-form-item label="权限类型" v-if="edit_type === 'power'">
              <el-select v-model="edit_module_form.type">
                <el-option value="index" label="index"></el-option>
                <el-option value="read" label="read"></el-option>
                <el-option value="add" label="add"></el-option>
                <el-option value="update" label="update"></el-option>
                <el-option value="delete" label="delete"></el-option>
                <el-option value="other" label="other"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitEdit">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelEdit">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增模块-->
    <lj-dialog
      :visible="new_module_visible"
      :size="{width: 400 + 'px',height: 450 + 'px'}"
      @close="handleCancelAddModule"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增模块</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="模块名称">
              <el-input v-model="new_module_form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模块标示">
              <el-input v-model="new_module_form.sign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模块描述">
              <el-input v-model="new_module_form.description" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddModule">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddModule">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增权限-->
    <lj-dialog
      :visible="new_power_visible"
      :size="{width: 400 + 'px',height: 500 + 'px'}"
      @close="handleCancelAddPower"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增权限</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="权限名称">
              <el-input v-model="new_power_form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限标示">
              <el-input v-model="new_power_form.sign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限描述">
              <el-input v-model="new_power_form.description" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限类型">
              <el-select v-model="new_power_form.type">
                <el-option value="index" label="index"></el-option>
                <el-option value="read" label="read"></el-option>
                <el-option value="add" label="add"></el-option>
                <el-option value="update" label="update"></el-option>
                <el-option value="delete" label="delete"></el-option>
                <el-option value="other" label="other"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddPower">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddPower">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import DepartManage from './components/departManage.vue';
  import Organization from './organization/index.vue';
  import SetForms from './components/setForms.vue';//设置表单
  import StaffRoster from './staffRoster/index.vue';//员工名册
  import LeaveJob from './leaveJob/index.vue';//离职管理
  import SearchHigh from '../../common/searchHigh.vue';
  import ljDialog from '../../common/lj-dialog.vue';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import DepartOrgan from '../../common/departOrgan.vue'
  import {staffBookSearch, LeaveJobSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: {
      SetForms,
      DepartManage,
      StaffRoster,
      LeaveJob,
      MenuList,
      ljDialog,
      SearchHigh,
      Upload,
      StaffOrgan,
      Organization,
      DepartOrgan
    },
    data() {
      return {
        //新增模块
        new_module_visible: false,
        new_module_form: {
          name: '',
          sign: '',
          description: '',
          parent_id: '',
        },
        //新增权限
        new_power_visible: false,
        new_power_form: {
          name: '',
          sign: '',
          description: '',
          type: '',
          system_id: '',
        },
        //编辑模块
        edit_module_visible: false,
        edit_module_form: {
          name: '',
          description: '',
          parent_id: '',
          parent: '',
          type: '',
          system_id: ''
        },
        edit_type: '',
        edit_current_list: [],
        edit_row: '',

        //确定删除
        confirm_visible: false,
        confirm_type: '',
        confirm_row: '',

        //权限管理
        power_params: {
          search: '',
          parent_id: '',
          is_permissions: '',
          limit: 999
        },
        system_list: [],
        module_list: [],

        bottom_params: {
          search: '',
          system_id: '',
          type: '',
          limit: 999
        },
        power_list: [],

        del_depart_visible: false,
        del_depart: '',
        is_edit_depart: false,
        edit_depart: '',

        departList: [], //部门列表
        departCount: 0,
        params: {
          page: 1,
          limit: 7,
          parent_id: 1
        },
        chooseDepart: false,

        staffBookSearch,
        LeaveJobSearch,
        humanResource,
        resourceDepart,
        chooseTab: 2,//tab切换
        selects: [
          {
            id: 1,
            title: '组织结构图',
          },
          {
            id: 2,
            title: '部门管理',
          },
          {
            id: 3,
            title: '员工名册',
          },
          {
            id: 4,
            title: '离职管理',
          },
          {
            id: 5,
            title: '权限管理'
          }
        ],//tab切换

        organModule: false,//组织架构

        setFormData: {},
        SetFormVisible: false,//设置表单

        departModule: false,//部门管理/员工管理
        departInfo: '',

        depart_visible: false,//新增部门
        lj_size: {},//新增部门
        departForm: {
          name: '',
          leader: '',
          leader_id: [],
          parent_id: [1],
          parent: ''
        },//新增部门
        visibleStatus: false,//弹出部门

        showSearch: false,//高级搜索
        searchData: {},//搜索项
        searchFruit3: {},//搜索结果
        searchFruit4: {},//搜索结果

        checkList: [],//离职员工
        staff_params: {
          is_on_job: '',
          is_enable: '',
        },
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],//部门人员
        value: '',

        //导出报表
        exportInfo: ''
      }
    },
    mounted() {
      this.getDepartList();
      this.getPowerList();
    },
    watch: {},
    computed: {
      routeAnimation() {
        return this.$store.state.app.routeAnimation;
      },
    },
    methods: {
      handleOpenAddPower(row) {
        this.new_power_form.system_id = row.id;
        this.new_power_visible = true;
      },
      handleSubmitAddPower(){
        this.$http.post('organization/permission',this.new_power_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAddPower();
            this.getPowerList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            });
          }
        })
      },
      handleCancelAddPower() {
        for (var key in this.new_power_form) {
          this.new_power_form[key] = '';
        }
        this.new_power_visible = false;
      },
      handleSubmitAddModule() {
        this.$http.post('organization/system',this.new_module_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAddModule();
            this.getPowerList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            });
          }
        })
      },
      handleCancelAddModule() {
        for (var key in this.new_module_form) {
          this.new_module_form[key] = '';
        }
        this.new_module_visible = false;
      },
      handleOpenAddModule(row) {
        this.new_module_form.parent_id = row.id;
        this.new_module_visible = true;
      },
      handleSubmitEdit() {
        if (this.edit_type === 'system' || this.edit_type === 'module') {
          this.$http.put(`organization/system/${this.edit_row.id}`,this.edit_module_form).then(res => {
            console.log(res);
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getPowerList();
              this.handleCancelEdit();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              });
            }
          })
        }else {
          this.$http.put(`organization/permission/${this.edit_row.id}`,this.edit_module_form).then(res => {
            console.log(res);
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getPowerList();
              this.handleCancelEdit();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              });
            }
          })
        }
      },
      handleCancelEdit() {
        this.edit_module_form = {
          name: '',
          description: '',
          parent_id: '',
          parent: '',
          system_id: ''
        };
        this.edit_module_visible = false;
      },
      handleOpenEdit(type,row) {
        console.log(row);
        this.edit_row = row;
        this.edit_type = type;
        if (type === 'module') {
          this.edit_current_list = this.system_list
        }
        if (type === 'power') {
          this.edit_current_list = this.module_list;
        }
        this.edit_module_form.system_id = row.system_id || '';
        this.edit_module_form.description = row.description;
        this.edit_module_form.name = row.name;
        this.edit_module_form.parent_id = row.parent_id || 0;
        this.edit_module_form.parent = row.parent && row.parent.name || '';
        this.edit_module_visible = true;
      },
      handleConfirmDel() {
        if (this.confirm_type === 'system') {
          this.$http.delete(`organization/system/${this.confirm_row.id}`).then(res => {
            console.log(res);
            if (res.code === '20040') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getPowerList();
              this.confirm_visible = false;
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        } else {
          this.$http.delete(`organization/permission/${this.confirm_row.id}`).then(res => {
            if (res.code === '20040') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.confirm_visible = false;

            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        }
      },
      handleDelControl(type,row) {
        this.confirm_row = row;
        this.confirm_type = type;
        this.confirm_visible = true;
      },
      getPowerBottomList(id) {
        this.bottom_params.system_id = id;
        this.$http.get('organization/permission',this.bottom_params).then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.power_list = res.data.data;
          } else {
            this.power_list = [];
          }
        })
      },
      handleClickModule(row) {
        this.getPowerBottomList(row.id);
      },
      handleClickSystem(row) {
        this.getModuleList(row.id);
      },
      getModuleList(id) {
        this.power_params.parent_id = id;
        this.$http.get('organization/system',this.power_params).then(res => {
          if (res.code === '20000') {
            this.module_list = res.data.data;
            this.getPowerBottomList(res.data.data[0].id);
          } else {
            this.module_list = [];
          }
        })
      },
      //权限管理
      getPowerList() {
        this.power_params.parent_id = '';
        this.$http.get('organization/system',this.power_params).then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.system_list = res.data.data;
            this.getModuleList(res.data.data[0].id);
          } else {
            this.system_list = [];
          }
        })
      },
      //导出报表
      handleExportInfo() {
        this.exportInfo = this.chooseTab;
      },
      handleOpenLookInfo(val) {
        this.departModule = true;
        this.departInfo = val;
      },
      //返回上级
      handleOpenBackParent(item) {
        this.params.parent_id = item.parent_org && item.parent_org.parent_id || 1;
        this.getDepartList();
      },
      handleOpenEditDepart(item) {
        this.edit_depart = item;
        this.departForm.name = item.name;
        this.departForm.leader = item.leader && item.leader.name || '';
        this.departForm.leader_id = item.leader_id;
        this.departForm.parent = item.parent_org && item.parent_org.name || '';
        this.departForm.parent_id = item.parent_id;
        this.is_edit_depart = true;
        this.lj_size = {
          width: '510px',
          height: '450px',
        };
        this.depart_visible = true;
      },
      handleSubmitDel() {
        this.$http.delete(`organization/organization/${this.del_depart.id}`).then(res => {
          if (res.code === '20040') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.del_depart_visible = false;
            this.getDepartList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      //删除部门
      handleDelDepart(item) {
        this.del_depart = item;
        this.del_depart_visible = true;
      },
      //更改params
      handleChangeParams(val) {
        this.staff_params = {
          is_on_job: '',
          is_enable: ''
        };
        if (val === 0) {
          this.staff_params = {
            is_on_job: '',
            is_enable: ''
          };
        }
        if (val === 1 || val === 2) {
          this.staff_params.is_on_job = val - 1;
        } else if(val === 3 || val === 4 ){
          this.staff_params.is_enable = val - 3;
        }
      },
      //取消添加部门
      handleCancelAddDepart() {
       this.departForm = {
         name: '',
         leader: '',
         leader_id: [],
         parent_id: [1],
         parent: ''
       };
       this.is_edit_depart = false;
       this.depart_visible = false;
      },
      //确定添加部门
      handleSubmitAddDepart() {
        if (this.is_edit_depart) {
          this.$http.put(`organization/organization/${this.edit_depart.id}`,this.departForm).then(res => {
            this.getDepartList();
            this.handleCancelAddDepart();
          });
          return false;
        }
        this.$http.post('organization/organization',this.departForm).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.getDepartList();
          } else {
            this.$LjNotify('warning',{
              title: '警告',
              message: res.msg
            })
          }
          this.handleCancelAddDepart();
        })
      },
      handleGetDepart(val,name) {
        this.chooseDepart = false;
        if (val !== 'close') {
          this.departForm.parent_id = val;
          this.departForm.parent = name;
        }
      },
      handleChangePage(page) {
        this.params.page = page;
        this.getDepartList();
      },
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$nextTick(function () {
          switch (id) {
            case 3:
              this.searchFruit3 = this.handleSearch(this.staffBookSearch);
              break;
            case 5:
              this.getPowerList();
          }
        });
        this.$store.dispatch('route_animation');
      },
      // 部门管理列表
      getDepartList(val) {
        this.$http.get('organization/organization',this.params).then(res => {
          if (res.code === '20000') {
            this.departList = res.data.data;
            this.departCount = res.data.count;
          }
        })
      },
      // 新增部门
      showAddModule(val) {
        switch (val) {
          case 2:
            this.depart_visible = true;
            this.lj_size = {
              width: '510px',
              height: '450px',
            };
            break;
        }
      },
      // 部门管理
      showDepartManage(val) {
        this.params.parent_id = val.id;
        this.getDepartList(val);
      },
      // 高级搜索
      highSearch(val) {
        this.showSearch = true;
        switch (val) {
          case 3:
            this.searchData = this.staffBookSearch;
            break;
          case 4:
            this.searchData = this.LeaveJobSearch;
            break;
        }
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          switch (this.chooseTab) {
            case 3:
              this.searchFruit3 = val;
              break;
            case 4:
              this.searchFruit4 = val;
              break;
          }
        }
      },
      showSetForm() {
        this.SetFormVisible = true;
        this.setFormData = {
          name: '姓名',
          date1: '部门',
          date2: '面貌',
          date3: '民族',
          date4: '出生日期',
          date5: '身份证号',
          date6: '城市',
          date7: '户口性质',
          date8: '婚育情况',
          date9: '家庭住址',
          date10: '联系方式',
          date11: '紧急联系人',
          phone: '电话',
        };
      },
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
      hiddenOrgan(val,name) {
        this.organModule = false;
        if (val !== 'close') {
          this.departForm.leader_id = val;
          this.departForm.leader = name;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/departments/index.scss";

  @mixin departmentsImg($m, $n) {
    $url: '../../../assets/image/humanResource/departments/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin commonImg($m, $n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #departments {
      .departList {
        .mainList {
          p {
            @include departmentsImg('departmentshui.png', 'theme1');
            &:hover {
              @include departmentsImg('departmentshong.png', 'theme1');
            }
          }
        }
      }
      .dialog_container {
        .dialog_main {
          .iconInput {
            .organization {
              @include commonImg('zuzhijiagou.png', 'theme1');
            }
            .user {
              @include commonImg('yonghu.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #departments {

    }
  }

  #theme_name.theme3 {
    #departments {

    }
  }

  #theme_name.theme4 {
    #departments {

    }
  }
</style>
