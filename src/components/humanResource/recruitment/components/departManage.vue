<template>
  <div id="departManage">
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <span>部门管理</span>
        </div>
        <div class="dialog_main bet-column">
          <div class="items-bet mainTop">
            <div class="items-bet">
              <span @click="chooseManage('staff')" :class="{'hover': tabsManage === 'staff'}">员工管理</span>
              <span @click="chooseManage('position')" :class="{'hover': tabsManage === 'position'}">职位管理</span>
            </div>
            <h2 class="add" @click="add(tabsManage)">
              <b>+</b>
            </h2>
          </div>
          <div class="scroll_bar staffManage" id="scroll-body" v-if="tabsManage === 'staff'"
               @click="checkOverflow()">
            <div class="items-center" v-for="item in 40" @click="reviseStaff(item)">
              <p>
                <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
              </p>
              <div>
                <h4>法国电视</h4>
                <h5>范德萨发生</h5>
              </div>
              <h5 class="operate" :class="[operatePos?'right':'left']" v-show="staffId === item">
                <span>权限</span>
                <span>禁用</span>
                <span>修改</span>
                <span>离职</span>
                <b v-if="!operatePos"></b>
                <i v-if="operatePos"></i>
              </h5>
            </div>
          </div>
          <div class="scroll_bar orgManage" v-if="tabsManage === 'position'">
            <div v-for="item in 30">
              <p>
                <span class="writingMode">符合都看傻了废话说多</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!--=======================================================================================================-->
    <lj-dialog :visible="addStaffVisible" :size="staff_size" @close="addStaffVisible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <span>{{tabsManage === 'staff' ? '新增员工' : '新建职位'}}</span>
        </div>
        <div class="dialog_main flex-center borderNone">
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
        operatePos: false,
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
    computed: {},
    methods: {
      checkOverflow() {
        let obj = document.getElementById("scroll-body");
        this.operatePos = false;
        this.$nextTick(function () {
          this.operatePos = obj.offsetHeight - obj.clientHeight > 0;
        })
      },
      chooseManage(val) {
        this.tabsManage = val;
      },
      reviseStaff(val) {
        if (this.staffId === val) {
          this.staffId = '';
          return;
        }
        this.staffId = val;
      },
      addStation() {

      },
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
          .depart_visible {
            width: 88%;
            height: 100%;
            padding: 30px 0 20px;
            @include flex('bet-column');
            .multi-input {
              > div + div {
                margin-top: 20px;
              }
              .first {
                @include flex('items-center');
                label {
                  min-width: 30px;
                  height: 30px;
                  color: #CF2E33;
                  border: 1px solid #CF2E33;
                  border-radius: 50%;
                  line-height: 24px;
                  font-size: 30px;
                  margin-left: 15px;
                  cursor: pointer
                }
              }
            }
          }
        }
        .footerBtn {
          margin-bottom: 40px;
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
