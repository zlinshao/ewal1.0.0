<template>
  <div id="initiate_approval">
    <div class="initiate-approval-box scroll_bar">
      <div class="module_list" v-for="moduleItem in initiateModuleList" :key="moduleItem.index">
        <div class="module_list-box">
          <!--      左侧模块-->
          <div class="left-module">
            <div class="module-icon module-icon-load"></div>
            <div class="module-title">{{moduleItem.module}}</div>
          </div>
          <!--      右侧清单-->
          <div class="right-list">
            <!--        单个子清单-->
            <div class="simple-list" v-for="item in moduleItem.Item" :key="item.itemIndex"
                 @click="openDialog(item)">

              <!--          左边图标-->
              <div :class="['simple-list-icon','icon-'+item.icon]"></div>

              <!--          右边信息-->
              <div>{{item.itemTitle}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    动态组件-->
    <component ref="dialog"
               v-if="dialog.component && user_info_all"
               :is="dialog.component"
               v-bind="dialog.props"
               :user_info_all="user_info_all"
               :size="size"
               :addUrl="addUrl"
    />
  </div>
</template>

<script>
  import TurnPositiveDialog from "./initiateApprovalDialog/TurnPositiveDialog";
  import GroupChange from "./initiateApprovalDialog/GroupChange";
  import PromotionDialog from "./initiateApprovalDialog/PromotionDialog";
  import LeaveDialog from "./initiateApprovalDialog/LeaveDialog";
  import Salary from "./initiateApprovalDialog/Salary";
  import AddOfficeDialog from "./initiateApprovalDialog/AddOfficeDialog";
  import ReduceOfficeDialog from "./initiateApprovalDialog/ReduceOfficeDialog";
  import StayDialog from "./initiateApprovalDialog/StayDialog";
  import AwayDialog from "./initiateApprovalDialog/AwayDialog";
  import PurchaseDialog from "./initiateApprovalDialog/PurchaseDialog";
  import GoodsDialog from "./initiateApprovalDialog/GoodsDialog";
  import SecretRoster from "./initiateApprovalDialog/SecretRoster";

  const dialogRequireContext = require.context(
    "./initiateApprovalDialog", // 搜索的文件夹
    true, // 是否搜索子目录
    /\.vue$/ //正则表达式
  );

  function getDialogsFromContext(context) {
    return context.keys().reduce((ret, key) => {
      const component = context(key);
      ret[key.slice(2, -4)] = component.default;
      return ret;
    }, {});
  }

  const Dialogs = getDialogsFromContext(dialogRequireContext);

  const {
    DemandDialog,
    TransferDialog,
    NoticeDialog,
    SecondEntry,
    SpecialPersonnel,
    CarLoan,
    UseChapter,
    WorkInstructions,
    updateUserInfo
  } = Dialogs;

  export default {
    name: "initiateApproval",
    // provide() {
    //   return {}
    // },
    data() {
      const url = globalConfig.humanResource_server
      return {
        url,
        addUrl: url + 'process/process',
        size: {
          width: '1400px',
          height: '800px'
        },
        // 模块清单
        initiateModuleList: [
          {
            index: 1,
            module: '人事',
            Item: [
              {
                itemIndex: 1,
                itemTitle: '人员需求审批',
                icon: 'ry',
                component: DemandDialog,
                props: {}
              },
              {
                itemIndex: 2,
                itemTitle: '个人异动/调岗',
                icon: 'gryd',
                component: TransferDialog,
                props: {}
              },
              {
                itemIndex: 3,
                itemTitle: '整组调岗/异动',
                icon: 'zzyd',
                component: GroupChange,
                props: {}
              },
              {
                itemIndex: 4,
                itemTitle: '转正申请',
                icon: 'zzsq',
                component: TurnPositiveDialog,
                props: {}
              },
              {
                itemIndex: 5,
                itemTitle: '文职晋升申请',
                icon: 'wzjs',
                component: PromotionDialog,
                props: {}
              },
              {
                itemIndex: 6,
                itemTitle: '离职审批',
                icon: 'lzsp',
                component: LeaveDialog,
                props: {}
              },
              {
                itemIndex: 7,
                itemTitle: '二次入职审批',
                icon: 'ecrz',
                component: SecondEntry,
                props: {}
              },
              {
                itemIndex: 8,
                itemTitle: '花名册使用审批',
                icon: 'hmc',
                component: SecretRoster,
                props: {
                  type: 'roster'
                }
              },
              {
                itemIndex: 9,
                itemTitle: '绝密花名册使用审批',
                icon: 'jmhmc',
                component: SecretRoster,
                props: {
                  type: 'secret_roster'
                }
              },
              {
                itemIndex: 10,
                itemTitle: '个人信息修改审批',
                icon: 'grxxxg',
                component: updateUserInfo,
                props: {}
              }
            ]
          },
          {
            index: 2,
            module: '人事专用',
            Item: [
              {
                itemIndex: 1,
                itemTitle: '人事专用',
                icon: 'rszy',
                component: SpecialPersonnel,
                props: {}
              },
              {
                itemIndex: 2,
                itemTitle: '还车贷专用申请',
                icon: 'hcdsp',
                component: CarLoan,
                props: {}
              },
              {
                itemIndex: 3,
                itemTitle: '薪资调整申请',
                icon: 'xztz',
                component: Salary,
                props: {}
              }
            ]
          },
          {
            index: 3,
            module: '公告',
            Item: [
              {
                itemIndex: 1,
                itemTitle: '公告审核审批',
                icon: 'ggsp',
                component: NoticeDialog,
                props: {}
              }
            ]
          },
          {
            index: 4,
            module: '行政',
            Item: [
              {
                itemIndex: 1,
                itemTitle: '用章申请',
                icon: 'yzsq',
                component: UseChapter,
                props: {}
              },
              {
                itemIndex: 2,
                itemTitle: '采购申请',
                icon: 'cgsq',
                component: PurchaseDialog,
                props: {}
              },
              {
                itemIndex: 3,
                itemTitle: '物品领/借用',
                icon: 'wpljy',
                component: GoodsDialog,
                props: {}
              },
              {
                itemIndex: 4,
                itemTitle: '增加办公室/宿舍申请',
                icon: 'zjbgs',
                component: AddOfficeDialog,
                props: {}
              },
              {
                itemIndex: 5,
                itemTitle: '减少办公室/宿舍申请',
                icon: 'jsbgs',
                component: ReduceOfficeDialog,
                props: {}
              },
              {
                itemIndex: 6,
                itemTitle: '住宿申请',
                icon: 'zssq',
                component: StayDialog,
                props: {}
              },
              {
                itemIndex: 7,
                itemTitle: '离宿申请',
                icon: 'lssq',
                component: AwayDialog,
                props: {}
              }
            ]
          },
          {
            index: 5,
            module: '其他',
            Item: [
              {
                itemIndex: 1,
                itemTitle: '工作指示',
                icon: 'gzqs',
                component: WorkInstructions,
                props: {}
              }
            ]
          }
        ],
        // 个人信息
        user_info_all: null,
        // 动态组件参数
        dialog: {
          component: null,
          props: null
        },
      }
    },

    methods: {
      /**校验字段大小 */
      compare({min, max}, _this, tip) {
        if (min > max) {
          _this.$LjMessage('warning', {title: '警告', msg: `${tip}最小值比最大值大`});
          return false;
        }
        return true;
      },

      /**获取个人信息 */
      getLoginUser() {
        let user_id = this.$storage.get('user_info').id
        return this.$http.get(`${this.url}staff/user/${user_id}?staff=0`)
          .then(res => {
            if (res.code == 20020) {
              this.user_info_all = res.data
            }
          })
      },
      /**打开对话框 */
      async openDialog(item) {
        this.dialog = {
          component: item.component,
          props: item.props
        };
        if (!this.user_info_all) {
          await this.getLoginUser()
        }
        this.$nextTick(() => {
          this.$refs.dialog.open();
        });
      }
    },
    created() {
      this.getLoginUser()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/approval/commponents/initiateApproval.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      .module_list {
        .module-icon-load {
          @include confirmImg('mokuai.png', 'theme1')
        }

        $icons: ry, gryd, zzyd, zzsq, lzsp, ecrz, hmc, jmhmc, grxxxg, wzjs, rszy, hcdsp, xztz, ggsp, yzsq, cgsq, wpljy, zjbgs, jsbgs, zssq, lssq, gzqs;
        @each $icon in $icons {
          .icon-#{$icon} {
            @include confirmImg('#{$icon}.png', 'theme1')
          }
        }
      }
    }
  }
</style>
