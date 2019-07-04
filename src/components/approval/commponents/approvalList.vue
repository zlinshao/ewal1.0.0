<template>
  <div id="approval_list">
    <!--    上面按钮-->
    <div class="top-btn">
      <!--      左侧页签-->
      <div class="left-text">
        <el-tabs v-model="activeName" @tab-click="clickTabs(activeName)">
          <el-tab-pane v-for="(item,index) in tabsData" :key="index"
                       :name="item.name">
            <span slot="label">
              <el-badge :value="item.number" :hidden="true">
                {{item.label}}
              </el-badge>
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--      右侧按钮-->
      <div class="right-btn">
        <!--        <div class="click-btn"-->
        <!--             v-for="(btn,index) in btnData" :key="index"-->
        <!--             @click="clickRightBtn(btn)">-->
        <!--          <div :class="['icon','icon-'+ btn.btn_icon]"></div>-->
        <!--          <p class="text">{{btn.btn_text}}</p>-->
        <!--        </div>-->
        <div class="search-btn">
          <i class='icons icons_search'></i>
        </div>
      </div>
    </div>
    <!--    下面列表-->
    <div class="main-list">
      <div class="mainListTable changeChoose" :style="{'height': mainListHeight(130) + 'px'}">
        <el-table :data="table_data"
                  @row-dblclick="handleClickRow"
                  style="width: 100%"
                  header-row-class-name="tableHeader"
                  :height="mainListHeight(30) + 'px'"
                  class="hover-table">
          <!--          <el-table-column type="selection" width="55"></el-table-column>-->

          <!--          仅在 我审批的 存在-->
          <el-table-column label="紧急程度" align="center" width="90px" v-if="tabKey==2">
            <template slot-scope="{row}">
              <div
                :class="['degree-item',row.priority === '重要'?'major-item':row.priority === '紧急'?'urgent-item':'']">
                {{row.priority}}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="title" label="审批标题" align="center"></el-table-column>

          <el-table-column prop="code" label="审批编号" align="center"></el-table-column>

          <el-table-column prop="applicant" label="申请人" align="center"></el-table-column>

          <el-table-column prop="dateStart" label="发起时间" align="center"></el-table-column>

          <el-table-column prop="dateEnd" label="结束时间" align="center"></el-table-column>

          <el-table-column label="状态" align="center">
            <template slot-scope="{row}">
              <span class="status-item check-item">{{row.status}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" v-if="popoverBtnData.length > 0">
            <template slot-scope="{ row }">
              <el-tooltip placement="top-end" :visible-arrow="false">
                <div class="flex control-btn" slot="content">
                  <span class="option-btn"
                        v-for="(popoverBtn,index) in popoverBtnData" :key="index"
                        @click="operatePopover(row,popoverBtn)">{{popoverBtn.btn_text}}</span>
                </div>
                <span class="table-control writingMode">···</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination layout="total,jumper,prev,pager,next"
                           :total="page_info.page_total"
                           :page-size="page_info.page_size"
                           :current-page="page_info.page_current"
                           @current-change="handleChangePage">
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>

    <ProcessDetails ref="processDetails" :detailUrl="detailUrl" :processUrl="processUrl" :row="row"></ProcessDetails>

    <TransferDialog ref="transferDialog" :row="row"></TransferDialog>
  </div>
</template>

<script>
  import ProcessDetails from './ProcessDetails'
  import TransferDialog from './transferDialog';

  export default {
    name: "approvalList",
    components: {
      ProcessDetails,
      TransferDialog
    },
    props: ['tabsData', 'tabKey'],
    watch: {
      tabKey(newValue, oldValue) {
        this.getApprovalList(newValue, this.activeName, 1)
      },
      activeName(newValue, oldValue) {
        this.getApprovalList(this.tabKey, newValue, 1)
      }
    },
    computed: {
      table_data() {
        return this.online_list.map(row => {
          return {
            ...row,
            priority: row.priority === 50 ? '正常' : row.priority === 60 ? '重要' : '紧急',
            title: _.find(row.variables, {name: 'title'})?.value,
            code: row.processInstanceId ? row.processInstanceId : row.id ? row.id : '',
            applicant: _.find(row.variables, {name: 'bulletin_staff_name'})?.value,
            dateStart: row.startTime ? row.startTime : row.createTime ? row.createTime : '',
            dateEnd: row.endTime ? row.endTime : '/',
            status: row.status ? row.status.toString() : row.name ? row.name : ''
          };
        });
      }
    },
    // provide() {
    //   return {
    //     row: null
    //   }
    // },
    data() {
      return {
        row: {},
        urlConfig: globalConfig.approval_sever,
        urlApi: null,
        operateApi: null,
        params: {},
        operateParams: {},
        user_id: null,
        /**详情请求地址 */
        detailUrl: null,
        /**流程请求地址 */
        processUrl: null,
        /**左侧标签 */
        activeName: '',
        /**右侧按钮 */
        rightBtnInfo: {
          // 待审批
          pending: [
            {
              btn_text: '批量提交',
              btn_icon: 'pltj',
              btn_key: 'batchSubmit'
            },
            {
              btn_text: '批量转交',
              btn_icon: 'plzj',
              btn_key: 'batchTransfer'
            }
          ],
          // 已审批
          approved: [
            {
              btn_text: '批量删除',
              btn_icon: 'plsc',
              btn_key: 'batchDelete'
            }
          ],
          // 未完成
          undone: [
            {
              btn_text: '批量催办',
              btn_icon: 'plcb',
              btn_key: 'batchUrgent'
            },
            {
              btn_text: '批量撤回',
              btn_icon: 'plch',
              btn_key: 'batchRecall'
            }
          ],
          // 未读
          unread: [
            {
              btn_text: '批量已读',
              btn_icon: 'plyd',
              btn_key: 'batchRead'
            },
            {
              btn_text: '批量删除',
              btn_icon: 'plsc',
              btn_key: 'batchDelete'
            }
          ],
          // 已读
          read: [
            {
              btn_text: '批量删除',
              btn_icon: 'plsc',
              btn_key: 'batchDelete'
            }
          ]
        },
        btnData: null,
        /**悬浮按钮 */
        popoverBtnInfo: {
          // 待审批
          pending: [
            {
              btn_text: '提交',
              btn_key: 'submit'
            },
            {
              btn_text: '转交',
              btn_key: 'transfer'
            },
            {
              btn_text: '拒绝',
              btn_key: 'refuse'
            }
          ],
          // 已审批
          approved: [
            // {
            //   btn_text: '查看',
            //   btn_key: 'view'
            // },
            // {
            //   btn_text: '删除',
            //   btn_key: 'delete'
            // }
          ],
          // 未完成
          undone: [
            {
              btn_text: '催办',
              btn_key: 'urgent'
            },
            {
              btn_text: '撤回',
              btn_key: 'recall'
            }
            // ,
            // {
            //   btn_text: '删除',
            //   btn_key: 'delete'
            // }
          ],
          // 未读
          unread: [
            {
              btn_text: '已读',
              btn_key: 'read'
            },
            {
              btn_text: '删除',
              btn_key: 'delete'
            }
          ],
          // 已读
          read: [
            {
              btn_text: '删除',
              btn_key: 'delete'
            }
          ]
        },
        popoverBtnData: [],
        /**列表数据 */
        online_list: [],
        /**分页数据 */
        page_info: {
          page_total: null,
          page_current: 1,
          page_size: 9
        },
      }
    },
    methods: {
      /**切换左侧页签 */
      clickTabs(activeName) {
        //切换右侧按钮
        this.btnData = this.rightBtnInfo[activeName] ? this.rightBtnInfo[activeName] : []

        //切换悬浮按钮
        this.popoverBtnData = this.popoverBtnInfo[activeName] ? this.popoverBtnInfo[activeName] : []
      },
      /**点击右侧按钮 */
      clickRightBtn(btn) {
        // this.tabKey
        // this.activeName
        // btn.btnKey

      },
      handleClickRow(row) {
        this.row = row
        this.detailUrl = _.find(row.variables, {name: "detail_request_url"})?.value
        this.processUrl = globalConfig.approval_sever + 'history/process-instances/' + row.code + '/log'
        this.$nextTick(() => {
          this.$refs.processDetails.open()
        })
      },
      handleChangePage(val) {
        this.page_info.page_current = val
        this.getApprovalList(this.tabKey, this.activeName, this.page_info.page_current)
      },
      /**悬浮按钮操作 */
      operatePopover(row, btn) {
        this.row = row
        /**转交 */
        if (btn.btn_key === 'transfer') {
          this.$nextTick(() => {
            this.$refs.transferDialog.open()
          })
        }
        /**其他 */
        this.operateApiHandle(row, btn.btn_key)
        this.operateParamsHandle(row, btn.btn_key)
        let url = this.operateApi
        let params = this.operateParams['params' + btn.btn_key]
        this.showLoading(true)
        this.$http.post(url, params)
          .then(res => {
            this.showLoading(false)
            console.log(res)
            // if (res.httpCode === 200) {
            //
            // }
          })
      },
      /**获取列表数据接口配置 */
      /**接口配置 */
      apiHandle(tabKey, activeName) {
        switch (tabKey) {
          case 2://我审批的
            /**列表接口 */
            this.urlApi = activeName === 'approved' ? 'history/tasks' : 'runtime/tasks';
            break;
          case 3://我发起的
            switch (activeName) {
              case 'undone': //未完成
                this.urlApi = 'runtime/process-instances';
                break;
              case 'completed': //已完成
                this.urlApi = 'history/process-instances';
                break;
            }
            break;
          case 4://抄送我的
            if (activeName === 'unread') {
              this.urlApi = 'runtime/tasks';
            } else {
              this.urlApi = 'history/tasks';
            }
            break;
          case 5://暂不处理
            this.urlApi = 'runtime/process-instances';
            break;
        }
      },
      /**参数配置 */
      paramsHandle(tabKey, activeName, page_current) {
        switch (tabKey) {
          case 2: //我审批的
            /**列表接口参数*/
            this.params['params' + tabKey] = {
              page: page_current,
              size: this.page_info.page_size,
              category: 'approval',
              finished: activeName === 'approved' ? true : false,
              active: true,
              tenantId: 'hr',
              // assignee: this.user_id
            }
            break;
          case 3://我发起的
            this.params['params' + tabKey] = {
              page: page_current,
              size: this.page_info.page_size,
              finished: activeName === 'undone' ? false : true,
              taskCategory: 'approval',
              tenantId: 'hr',
              taskOwner: this.user_id
            }
            break;
          case 4://抄送我的
            this.params['params' + tabKey] = {
              page: page_current,
              size: this.page_info.page_size,
              finished: activeName === 'unread' ? false : true,
              category: 'cc',
              tenantId: 'hr',
              assignee: this.user_id
            }
            break;
          case 5://暂不处理
            this.params['params' + tabKey] = {
              page: page_current,
              size: this.page_info.page_size,
              tenantId: 'hr',
              suspended: true,
              taskAssignee: this.user_id
            }
            break;
        }
      },
      /**获取审批列表 */
      getApprovalList(tabKey, activeName, page_current) {
        this.apiHandle(tabKey, activeName)
        this.paramsHandle(tabKey, activeName, page_current)
        let url = this.urlConfig + this.urlApi
        let params = this.params['params' + tabKey]
        this.showLoading2(true)
        this.$http.get(url, params)
          .then(res => {
            this.showLoading2(false)
            if (res.httpCode === 200) {
              let {data, total} = res
              this.online_list = data
              this.page_info.page_total = total
            }
          })
      },

      /**列表数据操作接口配置 */
      /**参数配置 */
      operateParamsHandle(row, btnType) {
        debugger
        let variables = _.find(row.variables, {name: 'outcome'})?.value
        switch (btnType) {
          case 'submit' || 'refuse': // 提交 或 拒绝
            /**列表接口参数*/
            this.operateParams['params' + btnType] = {
              action: 'complete',
              variables: [
                {
                  name: variables.variableName,
                  value: btnType === 'submit' ? true : false
                }
              ]
            }
            break;
          case 'urgent'://催办
            this.operateParams['params' + btnType] = {
              action: 'urge',
            }
            break;
          case 'recall'://撤回
            this.operateParams['params' + btnType] = {
              deleteReason: '撤回'
            }
            break;
        }
      },
      /**接口配置 */
      operateApiHandle(row, btnType) {
        switch (btnType) {
          case 'submit' || 'refuse':
            this.operateApi = this.urlConfig + 'runtime/tasks' + row.id
            break;
          case 'urgent':
            this.operateApi = this.urlConfig + 'runtime/tasks' + row.taskInfo[0].id
            break;
          case 'recall':
            this.operateApi = this.urlConfig + 'runtime/process-instances' + row.id
            break;
        }
      },

      /**初始化数据 */
      initData() {
        //获取个人信息
        this.user_id = this.$storage.get('user_info').id
        // 当前激活页签
        if (this.tabsData.length != 0) {
          this.activeName = this.tabsData[0].name
          this.clickTabs(this.activeName)
        } else {
          this.activeName = ''
          this.btnData = []
        }
      }
    },
    created() {
      this.initData()
      this.getApprovalList(this.tabKey, this.activeName, this.page_info.page_current)
    }
  }
</script>
<style lang="scss">
  .hover-table {
    .el-table__row {
      cursor: pointer;
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../assets/scss/approval/commponents/approvalList.scss";

  @mixin confirmImg($m, $n) {
    $url: '../../../assets/image/approval/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #approval {
      #approval_list {
        $icons: pltj, plzj, plsc, plcb, plch, plyd;
        @each $icon in $icons {
          .icon-#{$icon} {
            @include confirmImg('#{$icon}.png', 'theme1')
          }
        }
        /*右边搜索图标*/
        .icons_search {
          @include confirmImg('sousuo.png', 'theme1')
        }

        .main-list {
          .urgent-item {
            color: rgba(255, 173, 13, 1);
            @include confirmImg('jj.png', 'theme1')
          }

          .major-item {
            color: rgba(12, 102, 255, 1);
            @include confirmImg('zy.png', 'theme1')
          }
        }

      }
    }
  }
</style>
