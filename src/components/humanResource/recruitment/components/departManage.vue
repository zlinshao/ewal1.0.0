<template>
  <div id="departManage">
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{tabsManage === 'staff' ? '新增员工' : '新建职位'}}</h3>
        </div>
        <div class="dialog_main space-column departPosition">
          <div class="items-bet mainTop">
            <div class="items-bet">
              <span @click="chooseManage('staff')" :class="{'hover': tabsManage === 'staff'}">员工管理</span>
              <span @click="chooseManage('position')" :class="{'hover': tabsManage === 'position'}">职位管理</span>
            </div>
            <h2 class="add" @click="add(tabsManage)">
              <b>+</b>
            </h2>
          </div>
          <div class="scroll_bar staffManage" id="scroll-body" v-if="tabsManage === 'staff'" @click="checkOverflow()">
            <div v-for="item in 40">
              <div class="items-center" @click="reviseStaff(item)">
                <p>
                  <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
                </p>
                <div>
                  <h4>法国电视</h4>
                  <h5>范德萨发生</h5>
                </div>
              </div>
              <h5 class="operate" :class="[operatePos?'right':'left']" v-show="staffId === item">
                <span v-for="label in operateList" @click="operateModule(label.type)">{{label.label}}</span>
                <b v-if="!operatePos"></b>
                <i v-if="operatePos"></i>
              </h5>
            </div>
          </div>
          <div class="scroll_bar orgManage" v-if="tabsManage === 'position'">
            <div v-for="item in 30">
              <p @click="positionVisible = true;position_size = 'small'">
                <span class="writingMode">符合都看傻了废话说多</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!--新增员工/新建职位=======================================================================================-->
    <lj-dialog :visible="addStaffVisible" :size="staff_size" @close="addStaffVisible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>{{tabsManage === 'staff' ? '新增员工' : '新建职位'}}</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <!--员工-->
          <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible"
                   v-if="tabsManage === 'staff'">
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
                <p class="icons position"></p>
              </div>
            </el-form-item>
            <el-form-item label="部门负责人" required>
              <div class="items-center iconInput">
                <el-input v-model="departForm.leader"></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
          </el-form>
          <!--职位-->
          <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible" v-else>
            <el-form-item label="职位名称" required>
              <el-input v-model="departForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" required>
              <div class="items-center iconInput">
                <el-input v-model="departForm.depart"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="关联岗位" required>
              <div class="multi-input">
                <div class="first">
                  <el-input v-model="departForm.leader"></el-input>
                  <label @click="addStation">+</label>
                </div>
                <el-input v-model="departForm.leader"></el-input>
              </div>
              <div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footerBtn">
          <div class="danger">确认</div>
          <div class="default">取消</div>
        </div>
      </div>
    </lj-dialog>
    <!--权限管理===============================================================================================-->
    <lj-dialog :visible="powerVisible" :size="power_size" @close="powerVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>权限</h3>
        </div>
        <div class="dialog_main powerContent space-column">
          <div class="powerHead items-bet">
            <div class="inputLabel">
              <h4>权限类型</h4>
              <el-select :popper-class="'appTheme' + themeName" placeholder="请选择" v-model="power">
                <el-option label="收入" :value="1"></el-option>
                <el-option label="支出" :value="2"></el-option>
                <el-option label="混合" :value="3"></el-option>
              </el-select>
            </div>
            <i class="el-icon-edit-outline"></i>
          </div>
          <div class="powerTabs">
            <el-tabs v-model="powerName" @tab-click="handleClick">
              <el-tab-pane :label="item.tabName" :name="item.status" v-for="(item,index) in powerNames" :key="index">
                <p class="childPower">
                  <span :class="{'hover':powerChildName === key.name}" v-for="key in item.value"
                        @click="handleName(key.name)">{{key.name}}</span>
                </p>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="flex powerMain scroll_bar">
            <div>
              <el-checkbox v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
            </div>
            <div v-for="item in Object.keys(powerList)">
              <el-checkbox-group v-model="checkList" @change="handleCheck">
                <el-checkbox v-for="key in powerList[item]" :label="key.id" :key="key.id">
                  {{key.label}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="dialog_footer footerBtn right">
          <div class="danger">确定</div>
          <div class="default">取消</div>
        </div>
      </div>
    </lj-dialog>
    <!--岗位管理===============================================================================================-->
    <lj-dialog :visible="positionVisible" :size="position_size" @close="positionVisible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>产品</h3>
        </div>
        <div class="dialog_main positionContent space-column">
          <div class="items-bet mainTop">
            <div class="items-bet">
              <span @click="chooseManage('staff')" :class="{'hover': tabsManage === 'staff'}">员工管理</span>
              <span @click="chooseManage('position')" :class="{'hover': tabsManage === 'position'}">职位管理</span>
            </div>
            <h2 class="add" @click="add(tabsManage)">
              <b>+</b>
            </h2>
          </div>
          <div style="height: 100%">
            1
          </div>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue'

  export default {
    name: "depart-manage",
    props: ['module'],
    components: {ljDialog},
    data() {
      return {
        addStaffVisible: '',
        departForm: {},

        depart_visible: false,
        lj_size: '',
        staff_size: {},
        tabsManage: 'staff',
        staffId: '',

        operatePos: false,//编辑total
        operateList: [
          {
            type: 'power',
            label: '权限',
          }, {
            type: 'power',
            label: '禁用',
          }, {
            type: 'power',
            label: '修改',
          }, {
            type: 'power',
            label: '离职',
          }
        ],//人员编辑项

        powerVisible: false, //权限
        power_size: {},
        power: '',
        powerName: '1',//部门
        powerChildName: '三省六部',//部门模块
        powerNames: [
          {
            tabName: '人力资源',
            status: '1',
            value: [{
              name: '三省六部',
            }, {
              name: '招兵买马',
            }, {
              name: '排兵布阵',
            }, {
              name: '赏罚分明',
            }, {
              name: '奏事议政',
            }, {
              name: '内务库房',
            }]
          },
          {
            tabName: '财务中心',
            status: '2',
            value: [{
              name: '收款',
            }, {
              name: '科目',
            }, {
              name: '流水',
            }, {
              name: '入账',
            }]
          }
        ],
        powerList: {
          power1: [{
            id: 1,
            label: '查看组织架构'
          }, {
            id: 2,
            label: '查看员工档案'
          }, {
            id: 3,
            label: '查看成长轨迹'
          }, {
            id: 4,
            label: '查看离职短信'
          }, {
            id: 5,
            label: '查看离职交接单'
          }, {
            id: 6,
            label: '查看员工名册'
          }],
          power2: [{
            id: 11,
            label: '查看组织架构'
          }, {
            id: 21,
            label: '查看员工档案'
          }, {
            id: 31,
            label: '查看成长轨迹'
          }, {
            id: 41,
            label: '查看离职短信'
          }, {
            id: 51,
            label: '查看离职交接单'
          }, {
            id: 61,
            label: '查看员工名册'
          }],
          power3: [{
            id: 12,
            label: '查看组织架构'
          }, {
            id: 22,
            label: '查看员工档案'
          }, {
            id: 32,
            label: '查看成长轨迹'
          }, {
            id: 42,
            label: '查看离职短信'
          }, {
            id: 52,
            label: '查看离职交接单'
          }, {
            id: 62,
            label: '查看员工名册'
          }],
          power4: [{
            id: 13,
            label: '查看组织架构'
          }, {
            id: 23,
            label: '查看员工档案'
          }, {
            id: 33,
            label: '查看成长轨迹'
          }, {
            id: 43,
            label: '查看离职短信'
          }, {
            id: 53,
            label: '查看离职交接单'
          }, {
            id: 63,
            label: '查看员工名册'
          }],
          power5: [{
            id: 16,
            label: '查看组织架构'
          }, {
            id: 26,
            label: '查看员工档案'
          }, {
            id: 36,
            label: '查看成长轨迹'
          }, {
            id: 46,
            label: '查看离职短信'
          }, {
            id: 56,
            label: '查看离职交接单'
          }, {
            id: 66,
            label: '查看员工名册'
          }],
        },
        checkList: [],
        checkAll: false,

        positionVisible: false,
        position_size: '',
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.depart_visible = val;
        this.lj_size = 'large'
      },
      depart_visible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {
      themeName() {
        return this.$store.state.app.themeName;
      }
    },
    methods: {
      // 超出部分 反方向显示
      checkOverflow() {
        let obj = document.getElementById("scroll-body");
        this.operatePos = false;
        this.$nextTick(function () {
          this.operatePos = obj.offsetHeight - obj.clientHeight > 0;
        })
      },
      // 员工/部门 切换
      chooseManage(val) {
        this.tabsManage = val;
      },
      reviseStaff(val) {
        if (this.staffId === val) {
          this.staffId = ''
        } else {
          this.staffId = val;
        }
      },
      // 新增关联岗位
      addStation() {

      },
      // 操作
      operateModule(val) {
        switch (val) {
          case 'power':
            this.powerVisible = true;
            this.power_size = {
              width: '1600px',
              height: '800px',
            };
            break;
        }
      },
      // 新增 员工/部门
      add(val) {
        this.addStaffVisible = true;
        switch (val) {
          case 'staff':
            this.staff_size = {
              width: '540px',
              height: '500px',
            };
            break;
          case 'position':
            this.staff_size = {
              width: '510px',
              height: '480px',
            };
            break;
        }
      },
      // 权限切换
      handleClick(val) {

      },
      // 权限子集切换
      handleName(val) {
        this.powerChildName = val;
      },
      // 权限复选
      handleCheck(value) {
        let checkCount = value.length;
        let list = this.powerList;
        let count = 0;
        for (let item of  Object.keys(list)) {
          count = count + item.length;
        }
        this.checkAll = checkCount === count;
      },
      // 全选
      handleCheckAll(val) {
        if (val) {
          this.checkList = [];
          let list = this.powerList;
          for (let item of Object.keys(list)) {
            for (let key of list[item]) {
              this.checkList.push(key.id);
            }
          }
        } else {
          this.checkList = [];
        }
      },
      // 岗位管理
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/recruitment/components/departManage.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/recruitment/departManage/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin commonImg($m, $n) {
    $url: '../../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #departManage {
      .dialog_container {
        .dialog_main {
          .mainTop {
            span {
              @include organImg('huidi.png', 'theme1');
            }
            .hover {
              @include organImg('hongdi.png', 'theme1');
            }
          }
          .iconInput {
            .organization {
              @include commonImg('zuzhijiagou.png', 'theme1');
            }
            .position {
              @include commonImg('zhiwei.png', 'theme1');
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
    #departManage {

    }
  }

  #theme_name.theme3 {
    #departManage {

    }
  }

  #theme_name.theme4 {
    #departManage {

    }
  }
</style>
