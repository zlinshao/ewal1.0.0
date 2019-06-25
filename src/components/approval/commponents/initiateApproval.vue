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
            <div class="simple-list" v-for="item in moduleItem.Item" :key="item.itemIndex">

              <!--          左边图标-->
              <div :class="['simple-list-icon','icon-'+item.icon]"></div>

              <!--          右边信息-->
              <div>{{item.itemTitle}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "initiateApproval",
    data() {
      return {
        // 模块清单
        initiateModuleList: [
          {
            index: 1,
            module: '人事',
            Item: [
              {
                itemIndex: 1,
                itemTitle: '人员需求审批',
                icon: 'ry'
              },
              {
                itemIndex: 2,
                itemTitle: '个人异动/调岗',
                icon: 'gryd'
              },
              {
                itemIndex: 3,
                itemTitle: '整组调岗/异动',
                icon: 'zzyd'
              },
              {
                itemIndex: 4,
                itemTitle: '转正申请',
                icon: 'zzsq'
              },
              {
                itemIndex: 5,
                itemTitle: '文职晋升申请',
                icon: 'wzjs'
              },
              {
                itemIndex: 6,
                itemTitle: '离职审批',
                icon: 'lzsp'
              },
              {
                itemIndex: 7,
                itemTitle: '二次入职审批',
                icon: 'ecrz'
              },
              {
                itemIndex: 8,
                itemTitle: '花名册使用审批',
                icon: 'hmc'
              },
              {
                itemIndex: 9,
                itemTitle: '绝密花名册使用审批',
                icon: 'jmhmc'
              },
              {
                itemIndex: 10,
                itemTitle: '个人信息修改审批',
                icon: 'grxxxg'
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
                icon: 'rszy'
              },
              {
                itemIndex: 2,
                itemTitle: '还车贷专用申请',
                icon: 'hcdsp'
              },
              {
                itemIndex: 3,
                itemTitle: '薪资调整申请',
                icon: 'xztz'
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
                icon: 'ggsp'
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
                icon: 'yzsq'
              },
              {
                itemIndex: 2,
                itemTitle: '采购申请',
                icon: 'cgsq'
              },
              {
                itemIndex: 3,
                itemTitle: '物品领/借用',
                icon: 'wpljy'
              },
              {
                itemIndex: 4,
                itemTitle: '增加办公室/宿舍申请',
                icon: 'zjbgs'
              },
              {
                itemIndex: 5,
                itemTitle: '减少办公室/宿舍申请',
                icon: 'jsbgs'
              },
              {
                itemIndex: 6,
                itemTitle: '住宿申请',
                icon: 'zssq'
              },
              {
                itemIndex: 7,
                itemTitle: '离宿申请',
                icon: 'lssq'
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
                icon: 'gzqs'
              }
            ]
          }
        ]
      }
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
