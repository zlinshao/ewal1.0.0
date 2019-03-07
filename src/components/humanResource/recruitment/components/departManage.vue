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
              <span @click="chooseManage(1)" :class="{'hover': tabsManage === 1}">员工管理</span>
              <span @click="chooseManage(2)" :class="{'hover': tabsManage === 2}">职位管理</span>
            </div>
            <h2 class="add">
              <b>+</b>
            </h2>
          </div>
          <div class="scroll_bar staffManage" id="scroll-body" v-if="tabsManage === 1"
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
          <div class="scroll_bar orgManage" v-if="tabsManage === 2">
            <div v-for="item in 30">
              <p>
                <span class="writingMode">符合都看傻了废话说多</span>
              </p>
            </div>
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
        depart_visible: false,
        lj_size: {},
        tabsManage: 1,
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
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/recruitment/components/departManage.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/recruitment/departManage/' + $n + '/' + $m;
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
