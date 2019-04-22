<template>
  <div id="work_log">
    <div class="work-log-container">
      <div class="work-log-container-left scroll_bar">
        <div class="work-log-toolbar">
          <div v-for="(item,index) in toolbarList" :key="index" @click="switchToolbar(item.id)" :class="{checked:toolbarChoosed==item.id}"
               class="work-log-toolbar-item">{{item.name}}
          </div>
        </div>
        <div class="work-log-input-list scroll_bar">
          <div class="work-log-input-list-container">
            <div v-for="(item, index) in inputList[inputIndexName]" :key="index" class="work-log-input-list-item">
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
                上传附件:
                <lj-upload style="display: inline-block;margin-left: 30px" v-model="file_info"></lj-upload>
              </div>
              <div class="footer-user-choose">
                通知人:
                <user-choose title="请选择发送人员" style="margin-left: 30px" v-model="conformUser"></user-choose>
              </div>

              <div class="footer-button">
                <el-button style="width:100px" size="small" type="danger" @click="submitWorkLog()">提交</el-button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div class="work-log-container-right">
        <div class="timeline-container">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12 12:24:52" placement="top">
              <h3>今日完成工作:</h3>
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
        file_info: [],
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
        conformUser: [],
        inputIndexName: 'day',
        inputList: {
          day: [
            {
              id: 1,
              name: '今日完成工作',
              textarea: '',
            },
            {
              id: 2,
              name: '未完成工作',
              textarea: '',
            },
            {
              id: 3,
              name: '需协调工作',
              textarea: '',
            },
            {
              id: 4,
              name: '备注',
              textarea: '',
            },
          ],
          week: [
            {
              id: 1,
              name: '本周完成工作',
              textarea: '',
            },
            {
              id: 2,
              name: '本周工作总结',
              textarea: '',
            },
            {
              id: 3,
              name: '下周工作计划',
              textarea: '',
            },
            {
              id: 4,
              name: '需协调与帮助',
              textarea: '',
            },
            {
              id: 5,
              name: '备注',
              textarea: '',
            },
          ],
          month: [
            {
              id: 1,
              name: '本月完成工作',
              textarea: '',
            },
            {
              id: 2,
              name: '本月工作总结',
              textarea: '',
            },
            {
              id: 3,
              name: '下月工作计划',
              textarea: '',
            },
            {
              id: 4,
              name: '需协调与帮助',
              textarea: '',
            },
            {
              id: 5,
              name: '备注',
              textarea: '',
            },
          ],
          achievement_daily: [//业绩日报
            {
              id: 1,
              name: '今日营业额',
              textarea: '',
            },
            {
              id: 2,
              name: '今日客户数',
              textarea: '',
            },
            {
              id: 3,
              name: '月累计营业额',
              textarea: '',
            },
            {
              id: 4,
              name: '本月业绩目标',
              textarea: '',
            },
            {
              id: 5,
              name: '今日思考',
              textarea: '',
            },
            {
              id: 6,
              name: '备注',
              textarea: '',
            },
          ]
        },
      }
    },
    methods: {
      switchToolbar: function(index) {
        this.toolbarChoosed = index;
        switch (index) {
          case 1:
            this.inputIndexName = 'day';
            break;
          case 2:
            this.inputIndexName = 'week';
            break;
          case 3:
            this.inputIndexName = 'month';
            break;
          case 4:
            this.inputIndexName = 'achievement_daily';
            break;
        }
      },
      submitWorkLog: function() {
        let params = {
          type: this.inputIndexName,
        }
        switch (this.inputIndexName) {
          case 'day':
            params.log_info = { 
                                complete_work: this.inputList.day[0].textarea,
                                uncompleted_work: this.inputList.day[1].textarea,
                                coordinate_work: this.inputList.day[2].textarea,
                                ps: this.inputList.day[3].textarea
            }
            break;
          case 'week':
            params.log_info = {
                                complete_work: this.inputList.week[0].textarea,
                                work_summary: this.inputList.week[1].textarea,
                                work_plan: this.inputList.week[2].textarea,
                                coordinate_work: this.inputList.week[3].textarea,
                                ps: this.inputList.week[4].textarea
            }
            break;
          case 'month':
            params.log_info = {
                                complete_work: this.inputList.month[0].textarea,
                                work_summary: this.inputList.month[1].textarea,
                                work_plan: this.inputList.month[2].textarea,
                                coordinate_work: this.inputList.month[3].textarea,
                                ps: this.inputList.month[4].textarea
            }
            break;
          case 'achievement_daily':
            params.log_info = {
                                business_volume: this.inputList.achievement_daily[0].textarea,
                                customer_number: this.inputList.achievement_daily[0].textarea,
                                month_total_business_volume: this.inputList.achievement_daily[0].textarea,
                                month_target: this.inputList.achievement_daily[0].textarea,
                                cogitate: this.inputList.achievement_daily[0].textarea,
                                ps: this.inputList.achievement_daily[0].textarea
            }
            break;
        }
        if(this.file_info.length > 0) {
          params.file_info = this.file_info
        }
        if(this.conformUser.length > 0) {
          params.choose_ids = this.conformUser
        }
        if(this.inputIndexName !== 'achievement_daily' && params.log_info.complete_work !== '') {
          this.$http.post(`${this.url}/staff/log`,params).then(res => {
            this.$LjMessageEasy(res);
          })
        }else if(this.inputIndexName == 'achievement_daily'){
          this.$http.post(`${this.url}/staff/log`,params).then(res => {
            this.$LjMessageEasy(res);
          })
        }else{
          let res = {
            code: '-1',
            msg: '请输入已完成工作'
          }
          this.$LjMessageEasy(res);
        }
      }
    },
  }
</script>


<style lang="scss">
  #work_log {
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
        h3 {
          font-family: MicrosoftYaHei-Bold;
          font-weight: bold;
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          color: #686874;
        }
      }
    }
  }

</style>


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
