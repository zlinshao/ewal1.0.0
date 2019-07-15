<template>
  <div id="work_log">
    <div class="work-log-container">
      <div class="work-log-container-left scroll_bar">
        <div class="work-log-toolbar">
          <div v-for="(item,index) in toolbarList" :key="index" @click="switchToolbar(item.id)"
               :class="{checked:toolbarChoosed==item.id}"
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
                <lj-upload style="display: inline-block;margin-left: 30px" size="50" v-model="file_info"></lj-upload>
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
        <div class="timeline-container scroll_bar">
          <el-timeline>
            <el-timeline-item :timestamp="item.time" placement="top" v-for="(item, index) in worklogList" :key="index">
              <el-collapse v-model="item.activeNames" accordion class="collapseContainer">
                <el-collapse-item name="1" class="collapseItem">
                  <h3 class="logTitle">今日完成工作:</h3>
                  <p>{{item.complete_work}}</p>
                  <p>备注：{{item.ps}}</p>
                  <div class="readAvatar">
                    <div class="read-icon" width="14px;" height="14px;"></div>
                    <h6>全部已读</h6>
                    <img :src="items" v-for="(items, index) in item.read_avatar" :key="index" height="40px" width="40px"
                         border-radius="20px"/>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "workLog",
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
        worklogList: [],
        activeNames: ["1"]
      }
    },
    mounted() {
      this.getWorklogList();
    },
    methods: {
      switchToolbar (index) {
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

      //重置表单
      resetForm() {
        this.file_info = [];
        this.conformUser = [];
        this.inputList= {
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
        }
      },
      //提交工作日志
      submitWorkLog () {
        let params = {
          type: this.inputIndexName,
        };
        switch (this.inputIndexName) {
          case 'day':
            params.log_info = {
              complete_work: this.inputList.day[0].textarea,
              uncompleted_work: this.inputList.day[1].textarea,
              coordinate_work: this.inputList.day[2].textarea,
              ps: this.inputList.day[3].textarea
            };
            break;
          case 'week':
            params.log_info = {
              complete_work: this.inputList.week[0].textarea,
              work_summary: this.inputList.week[1].textarea,
              work_plan: this.inputList.week[2].textarea,
              coordinate_work: this.inputList.week[3].textarea,
              ps: this.inputList.week[4].textarea
            };
            break;
          case 'month':
            params.log_info = {
              complete_work: this.inputList.month[0].textarea,
              work_summary: this.inputList.month[1].textarea,
              work_plan: this.inputList.month[2].textarea,
              coordinate_work: this.inputList.month[3].textarea,
              ps: this.inputList.month[4].textarea
            };
            break;
          case 'achievement_daily':
            params.log_info = {
              business_volume: this.inputList.achievement_daily[0].textarea,
              customer_number: this.inputList.achievement_daily[0].textarea,
              month_total_business_volume: this.inputList.achievement_daily[0].textarea,
              month_target: this.inputList.achievement_daily[0].textarea,
              cogitate: this.inputList.achievement_daily[0].textarea,
              ps: this.inputList.achievement_daily[0].textarea
            };
            break;
        }
        if (this.file_info.length > 0) {
          params.file_info = this.file_info;
        }
        if (this.conformUser.length > 0) {
          params.choose_ids = this.conformUser;
        }
        if (this.inputIndexName !== 'achievement_daily' && params.log_info.complete_work !== '') {
          this.$http.post(`${this.url}/staff/log`, params).then(res => {
            this.$LjMessageEasy(res, () => {
              this.getWorklogList();
              this.resetForm();
            })
          })
        } else if (this.inputIndexName == 'achievement_daily') {
          this.$http.post(`${this.url}/staff/log`, params).then(res => {
            this.$LjMessageEasy(res, () => {
              this.getWorklogList();
              this.resetForm();
            });
          })
        } else {
          let res = {
            code: '-1',
            msg: '请输入已完成工作',
          }
          this.$LjMessageEasy(res);
        }
      },
      getWorklogList () {
        let params = {
          type: "day",
          page: 1,
          limit: 7,
        };
        this.$http.get(`${this.url}/staff/log`, params).then(res => {
          if (res.code === "20000") {
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = {
                time: res.data.data[i].log_time.timeFormat.split(" ")[0],
                complete_work: res.data.data[i].log_info.complete_work,
                ps: res.data.data[i].log_info.complete_work,
                read_avatar: [],
                activeNames: ["1"],
              };
              if (res.data.data[i].read_data.length > 0) {
                for (let j = 0; j < res.data.data[i].read_data.length; j++) {
                  obj.read_avatar.push(res.data.data[i].read_data[j].avatar)
                }
              }
              this.worklogList.push(obj);
            }
          }
        })
      }
    }
  }
</script>


<style lang="scss">
  #work_log {
    .timeline-container {
      height: 100%;

      .el-timeline-item__wrapper {
        text-align: left;

        .el-timeline-item__timestamp {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          height: 35px;
          font-size: 16px;
          color: #686874;
          font-family: MicrosoftYaHei-Bold;
          font-weight: 700;
        }

        .collapseContainer {
          .collapseItem {
            .logTitle {
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              height: 26px;
              line-height: 26px;
              font-size: 14px;
              color: #686874;
            }

            .readAvatar {
              height: 40px;
              display: flex;
              justify-content: flex-start;

              h6 {
                display: flex;
                align-items: center;
                width: 52px;
                height: 40px;
                font-size: 12px;
                font-family: MicrosoftYaHei;
                color: rgba(104, 104, 116, 1);
                line-height: 26px;
              }

              > img {
                width: 40px;
                margin-left: 10px;
                border-radius: 20px;
              }
            }
          }
        }
      }
    }

    .el-collapse {
      border: none;
    }

    .el-collapse-item__header {
      border: none;
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
          .read-icon {
            @include personalCenterImg('yidu.png', 'theme1');
          }
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
