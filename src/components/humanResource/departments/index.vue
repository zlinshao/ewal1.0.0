<template>
  <div id="departments">
    <!--<Upload :file="photo1"></Upload>-->
    <!--<Upload :file="photo2"></Upload>-->

    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1 @click="organModule = true">三省六部</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="searchTerm" v-if="chooseTab === 3">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="1">离职员工</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="icons dimission" v-if="chooseTab === 3"></div>
        <div class="buttons button1" @click="showSetForm" v-if="chooseTab === 3 || chooseTab === 4">设置报表</div>
        <div class="buttons button2" v-if="chooseTab === 3 || chooseTab === 4">导出报表</div>
        <div class="icons add" @click="showAddModule(chooseTab)" v-show="chooseTab === 2"><b>+</b></div>
        <div class="icons search" @click="highSearch(chooseTab)" v-show="chooseTab !== 2"></div>
      </div>
    </div>

    <!--组织架构选人-->
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>

    <!--组织架构-->
    <div v-if="chooseTab === 1">
      <Organization></Organization>
    </div>

    <!--部门管理-->
    <div class="departList" v-if="chooseTab === 2">
      <div class="items-bet mainList" :class="{'mainListHover': routeAnimation}">
        <p v-for="item in resourceDepart.data" @click="showDepartManage(item)">
          <span class="writingMode">
            {{item.title}}
          </span>
        </p>
      </div>
    </div>

    <!--员工名册-->
    <div v-show="chooseTab === 3">
      <StaffRoster :searchVal="searchFruit3"></StaffRoster>
    </div>

    <!--离职管理-->
    <div v-if="chooseTab === 4">
      <LeaveJob></LeaveJob>
    </div>

    <!--新增部门-->
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>新增部门</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible">
            <el-form-item label="部门名称" required>
              <el-input v-model="departForm.name"></el-input>
            </el-form-item>
            <el-form-item label="上级部门" required>
              <div class="items-center iconInput">
                <el-input v-model="departForm.depart"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="部门负责人" required>
              <div class="items-center iconInput">
                <el-input v-model="departForm.leader"></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--设置表单-->
    <SetForms :module="SetFormVisible" :data="setFormData" @close="SetFormVisible = false"></SetForms>

    <!--管理部门/员工管理-->
    <DepartManage :module="departModule" @close="departModule = false"></DepartManage>

    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
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
      Organization
    },
    data() {
      return {
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
          }
        ],//tab切换

        organModule: false,//组织架构

        setFormData: {},
        SetFormVisible: false,//设置表单

        departModule: false,//部门管理/员工管理
        depart_visible: false,//新增部门
        lj_size: {},//新增部门
        departForm: {},//新增部门
        visibleStatus: false,//弹出部门

        showSearch: false,//高级搜索
        searchData: {},//搜索项
        searchFruit3: {},//搜索结果
        searchFruit4: {},//搜索结果

        checkList: '',//离职员工
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

        photo1: {
          keyName: 'photo1',
          setFile: [],
        },
        photo2: {
          keyName: 'photo2',
          setFile: [],
        },
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      routeAnimation() {
        return this.$store.state.app.routeAnimation;
      },
    },
    methods: {
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$nextTick(function () {
          switch (id) {
            case 3:
              this.searchFruit3 = this.handleSearch(this.staffBookSearch);
              break;
          }
        });
        this.$store.dispatch('route_animation');
      },
      // 部门管理列表
      getDepartList() {
        // this.$http.get(globalConfig.organ_server + 'organization/organization').then(res => {
        //   console.log(res)
        // })
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
        this.departModule = true;
        console.log(val);
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
      hiddenOrgan(val) {
        this.organModule = false;
        if (val !== 'close') {
          console.log(val);
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
