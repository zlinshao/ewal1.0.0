<template>
  <div id="growth_process" class="scroll_bar">
    <div class="m-container">
      <div class="bg-container"></div>
      <div v-for="item in growthList" class="m-container-item"
           :style="{width:growthList.length<5?`${100/growthList.length}%`:`20%`}">
        <div class="m-container-item-decorate">
          <span class="m-container-item-decorate-circle"></span>
        </div>
        <div title="点击查看详情" @click="showDialogDetail" class="m-container-item-content">
          <span class="red-circle"></span>
          【{{item.content}}】
          <span class="red-circle"></span>
        </div>
      </div>
    </div>


    <lj-dialog :size="{width: '50%',height: '80%'}" :visible.sync="dialog_visible">
      <div id="dialog_timeline" class="dialog_container">
        <div class="dialog_header">
          <h3>详情</h3>
        </div>
        <div class="timeline-container">
          <el-timeline>
            <el-timeline-item color="#CF2E33" timestamp="2018/4/12 12:24:52" placement="top">
              <p>由张晓莲（员工关系组-基础人事专员）为您办理了入职手续，入职部门：研发中心</p>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <p>由张晓莲（员工关系组-基础人事专员）为您办理了入职办理了入职办理了入职办理了入职手续，入职部门：研发中心，入职岗位：测试，等级：实习</p>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <p>由张晓莲（员工关系组-基础人事专员）为您办理了入职手续，入职部门：研发中心</p>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '@/components/common/lj-dialog.vue';

  export default {
    name: "growthProcess",
    components: {
      LjDialog,
    },
    data() {
      return {
        growthList: [
          {
            content: '2019年3月11日入职',
          },
          {
            content: '2019年4月11日离职',
          },
          {
            content: '2019年5月11日入职',
          },
          {
            content: '2019年4月11日离职',
          },
          {
            content: '2019年5月11日入职',
          },
          {
            content: '2019年4月11日离职',
          },
          {
            content: '2019年5月11日入职',
          },
          {
            content: '2019年4月11日离职',
          },
          {
            content: '2019年5月11日入职',
          },
          {
            content: '2019年4月11日离职',
          },
          {
            content: '2019年5月11日入职',
          },
          {
            content: '2019年4月11日离职',
          },
          {
            content: '2019年5月11日入职',
          },


        ],

        dialog_visible: false,
      }
    },
    methods: {
      showDialogDetail() {
        this.dialog_visible = true;
      },
    },
  }
</script>


<style lang="scss">
  #growth_process {
    #dialog_timeline {
      .timeline-container {
        .el-timeline-item__wrapper {
          text-align: left;
          .el-timeline-item__timestamp {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            height: 35px;
            //line-height: 35px;
            font-size: 16px;
            //color: #CF2E33;
            color: #686874;
            font-family: MicrosoftYaHei-Bold;
            font-weight: 700;
          }
          p {

          }
        }
      }
    }
  }

</style>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/growthProcess/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #growth_process {
      @include personalCenterImg('beijing.png', 'theme1');
    }

    .m-container {
      .bg-container {
        @include personalCenterImg('liuxian.png', 'theme1');
      }
    }
  }

  #theme_name.theme2 {
    #growth_process {

    }
  }

  #theme_name.theme3 {
    #growth_process {

    }
  }

  #theme_name.theme4 {
    #growth_process {

    }
  }
</style>
