<template>
  <div id="work_log">
    <div class="work-log-container">
      <div class="work-log-container-left scroll_bar">
        <div class="work-log-toolbar">
          <div v-for="item in toolbarList" @click="toolbarChoosed=item.id" :class="{checked:toolbarChoosed==item.id}"
               class="work-log-toolbar-item">{{item.name}}
          </div>
        </div>
        <div class="work-log-input-list scroll_bar">
          <div class="work-log-input-list-container">
            <div v-for="item in inputList" class="work-log-input-list-item">
              <div class="work-log-input-list-item-tip">
                {{item.name}}
              </div>
              <div class="work-log-input-list-item-content">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入文字"
                  v-model="item.textarea">
                </el-input>
              </div>
            </div>
            <div class="work-log-input-list-item-footer">
              <div class="footer-upload">
                上传附件:<lj-upload style="display: inline-block;margin-left: 30px"></lj-upload>
              </div>
              <div class="footer-user-choose">
                通知人:<user-choose title="请选择发送人员" style="margin-left: 30px"></user-choose>
              </div>

              <div class="footer-button">
                <el-button style="width:100px" size="small" type="danger">提交</el-button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div class="work-log-container-right"></div>
    </div>
  </div>
</template>

<script>
  import UserChoose from '@/components/common/lightweightComponents/UserChoose';
  import LjUpload from '@/components/common/lightweightComponents/lj-upload.vue';

  export default {
    name: "workLog",
    components: {
      LjUpload,
      UserChoose,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,

        toolbarChoosed: 1,
        toolbarList: [
          {
            id: 1,
            name: '日报'
          },
          {
            id: 2,
            name: '周报'
          },
          {
            id: 3,
            name: '月报'
          },
          {
            id: 4,
            name: '业绩日报'
          },
        ],
        textarea:'',

        inputList:[
          {
            id:1,
            name:'今日完成工作',
            textarea:'',
          },
          {
            id:2,
            name:'未完成工作',
            textarea:'',
          },
          {
            id:3,
            name:'需协调工作',
            textarea:'',
          },
          {
            id:4,
            name:'备注',
            textarea:'',
          },
        ],
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/workLog/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #work_log {
      .work-log-container {
        .work-log-container-left {
          .work-log-toolbar {
            .work-log-toolbar-item {
              @include personalCenterImg('toolbar_gray.png', 'theme1');
              &.checked {
                @include personalCenterImg('toolbar_red.png', 'theme1');
              }
            }
          }
        }
        .work-log-container-right {
        }
      }
    }
  }

  #theme_name.theme2 {
    #work_log {

    }
  }

  #theme_name.theme3 {
    #work_log {

    }
  }

  #theme_name.theme4 {
    #work_log {

    }
  }


</style>
