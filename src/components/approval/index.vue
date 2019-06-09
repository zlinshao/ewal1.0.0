<template>
  <div id="theme_name" class='theme1'>
    <div id='approval' :class="{'approval':message_visible}">
      <div class="header">
        <!--全部 我审批的 暂不处理 抄送我的-->
        <div class='header_methods'>
          <div :class='["methods_box",item.value == status_type ?"methods_box_active":""]' v-for='item in status_types'
               :key='item.value' @click='status_type = item.value'>{{item.tit}}
          </div>
        </div>

        <div class='header_right'>
          <p class='ele_p gua' @click='change_receive_type'>
            <i :class='["icons",isreceive ? "receive_icons":"gua_icons"]'></i>
            {{isreceive ? "挂起":"接收"}}
          </p>
          <div class="margin">
            <p :class='["ele_p",receive_check_name.length >0?"receive_span":""]' @click.stop='setReceiveType'>
              {{ receive_check_name.length == 0 ? "接收类型" : receive_check_name.join('-') }}</p>

            <div class='receive_box' v-if='isreceive_visible'>
              <el-checkbox-group v-model="receive_check">
                <el-checkbox v-for='type in Object.keys(receive_type)' :key='type' :label="type">
                  {{receive_type[type]}}
                </el-checkbox>
              </el-checkbox-group>
              <div class="dialog_footer">
                <el-button type="danger" size="small" @click='handleChangeReceive'>确定</el-button>
                <el-button type="info" size="small" @click='handleCancelReceive'>取消</el-button>
              </div>
            </div>
          </div>
          <!-- 组长显示 -->
          <i class='icons icons_main' v-if='isCaputer' @click='handleSeeMain'></i>
          <i class='icons icons_search' @click='highSearch'></i>
        </div>
      </div>

      <div class="mainListTable" :style="{'height': mainListHeight(30) + 'px'}">
        <el-table :data="tableData['data' + status_type ]"
                  :height="mainListHeight(130) + 'px'"
                  highlight-current-row @row-dblclick="handleDbClick"
                  header-row-class-name="tableHeader"
                  :empty-text='tableStatus'
                  v-loading="tableLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)"
                  style="width: 100%">
          <el-table-column align="center" prop='bulletin_date' label="发起时间"></el-table-column>
          <el-table-column align="center" v-for="item in Object.keys(tableShow['table' + status_type])" :key='item'
                           :prop='item' :label="tableShow['table' + status_type][item]"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <p v-if="scope.row.status && scope.row.status[0]">{{scope.row.status[0]}}</p>
              <p>{{scope.row.name}}</p>
            </template>
          </el-table-column>
        </el-table>

        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="params['param'+ status_type].page"
              :page-size="params['param'+ status_type].size"
              :total="total['total'+ status_type]"
              layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
        </footer>
      </div>

      <!-- 搜索 -->
      <SearchHigh :module="showSearch" :showData="searchHigh" @close="hiddenModule"/>

      <!-- 控制面板 -->
      <ControlPanel :visible='controlPanel_visible' @close='hiddenControlPanel' :receive_type='receive_type'/>

      <!-- 详情 -->
      <ContractDetail :visible='contract_detail_visible' :moduleData='current_row' :status_type='status_type'
                      @changeData='handleChange'/>
      <!-- 拓展新盘详情 -->
      <DevelopNewDish :visible='develop_visible' :moduleData='current_row' @close='hiddenDevelopNew'/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import SearchHigh from '../common/searchHigh.vue'
  import ControlPanel from './commponents/controlPanel'
  import ContractDetail from './commponents/contract_detail'
  import DevelopNewDish from './commponents/developNewDish'
  import {receive_type} from '../../assets/js/approval/receive_type.js'

  export default {
    components: {
      SearchHigh, //高级搜索
      ControlPanel, // 控制面板
      ContractDetail, //详情
      DevelopNewDish,//新盘详情
    },
    data() {
      return {
        url: globalConfig.approval_sever,
        tableStatus: ' ',
        tableLoading: false,
        chosenTag: 1,
        isCaputer: true, // 当前登录人：组员 或者 组长

        urlApi: '', //数据请求
        status_type: 1, // 当前显示表格类型
        tableShow: {  // 表格数据显示
          table1: {
            bulletin_name: '报备类型',
            bulletin_staff_name: '报备人',
            house_address: '房屋地址',
          },
          table2: {
            bulletin_name: '报备类型',
            bulletin_staff_name: '报备人',
            house_address: '房屋地址',
          },
          table3: {
            bulletin_name: '报备类型',
            bulletin_staff_name: '报备人',
            house_address: '房屋地址',
            endTime: '完成时间',
          },
          table4: {
            bulletin_name: '报备类型',
            bulletin_staff_name: '报备人',
            house_address: '房屋地址',
          },
          table5: {
            bulletin_name: '报备类型',
            bulletin_staff_name: '报备人',
            house_address: '房屋地址',
          }
        },//表格显示字段
        status_types: [
          {
            tit: '全部',
            value: 1
          },
          {
            tit: '待审批的',
            value: 2
          },
          {
            tit: '已审批的',
            value: 3
          },
          {
            tit: '暂不处理',
            value: 4
          },
          {
            tit: '抄送我的',
            value: 5
          }
        ],//头部切换
        tableData: {
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
        },//获取数据
        total: {
          total1: 0,
          total2: 0,
          total3: 0,
          total4: 0,
          total5: 0
        },//总条数
        params: {
          param1: {},
          param2: {},
          param3: {},
          param4: {},
          param5: {}
        },//接口参数

        current_row: {},//报备详情
        contract_detail_visible: false, //报备详情

        isreceive: false, //是否接收
        isreceive_visible: false,  // 接收类型设置 显示隐藏
        receive_check: [], // 接收类型 选择
        receive_check_name: [],
        controlPanel_visible: false, // 控制面板 显示隐藏
        showSearch: false, // 高级搜索 显示隐藏
        searchHigh: {}, // 高级搜索 参数


        develop_visible: false, //新盘

        approval_type_list: [],//高级搜索审核类型
        receive_type: {},//接收类型
      }
    },
    async mounted() {
      await this.getApprovalTypeList();
      await this.getChoseApprovalTypeList();
    },
    computed: {
      message_visible() {
        return this.$store.state.approval.approval_message_visible
      },
    },
    watch: {
      status_type(val) { //类型切换
        this.getApprovalsList(val);
      },
      message_visible(val) {
        if (val) {
          this.getApprovalsList(1)
        }
        this.contract_detail_visible = false;

        this.isreceive_visible = false;
        this.showSearch = false;
        this.controlPanel_visible = false;
        this.develop_visible = false;
      }
    },
    methods: {
      // 页面数据请求
      getApprovalsList(val) {
        this.paramsHandle(val);  // 配置
        this.getApproval(this.urlApi, this.params['param' + val], val)     // 接口请求
      },
      // 配置
      paramsHandle(val) {
        this.params['param' + val] = {};
        switch (val) {
          case 1:
            this.urlApi = 'history/process-instances';
            this.params['param' + val] = {
              processDefinitionKey: 'MG-BulletinApproval',
            };
            break;
          case 2://待审批
          case 3://已审批
            this.params['param' + val] = {
              taskDefinitionKeyIn: approvalSearch.approvals1.join(','),
              category: 'approval',
              finished: false,
              active: true,
            };
            this.params['param' + val].finished = val === 3;
            this.urlApi = val === 3 ? 'history/tasks' : 'runtime/tasks';
            break;
          case 4://暂不处理
            this.urlApi = 'runtime/process-instances';
            this.params['param' + val].suspended = true;
            break;
          case 5:
            this.urlApi = 'runtime/tasks';
            this.params['param' + val].category = 'cc';
            break;
        }
      },
      // table 分页
      handleCurrentChange(page) {
        let val = this.status_type;
        this.params['param' + val].page = page;
        this.getApproval(this.urlApi, this.params['param' + val], val);
      },
      // 接口请求
      getApproval(url, val, tab) {//page分页
        this.tableData['data' + tab] = [];
        this.tableStatus = ' ';
        this.tableLoading = true;
        let params = {
          title: '',
          size: 24,
        };
        for (let key of Object.keys(val)) {
          params[key] = val[key]
        }
        this.$http.get(`${this.url}${url}`, params).then(res => {
          this.tableLoading = false;
          this.total['total' + tab] = 0;
          if (199 < res.httpCode < 300) {
            if (res.data.length) {
              this.tableData['data' + tab] = this.setFormatApproval(res.data, this.urlApi);
              this.total['total' + tab] = res.total;
            } else {
              this.tableStatus = '暂无相关数据';
            }
          } else {
            this.tableStatus = '暂无相关数据';
          }
        })
      },
      // 初始化数据
      setFormatApproval(data, url) {
        let arr = [];
        for (let item of data) {
          let obj = {};
          for (let key of item.variables) {
            obj[key.name] = key.value;
            if (key.name === 'signer') {
              if (key.value && key.value.length > 12) {
                if (JSON.parse(key.value)) {
                  obj.signer = JSON.parse(key.value);
                }
              }
            }
            if (key.name.includes('detail_request_url')) {
              if (key.name !== 'bm_detail_request_url') {
                obj.detail_request_url = key.value || '';
              } else {
                obj[key.name] = key.value || '';
              }
            }
            if (key.name === 'ewal_contract') {
              if (key.value) {
                let contract = JSON.parse(key.value);
                obj.contract_id = contract.v3_contract_id;
              }
            }
            if (key.name.includes('_approved')) {
              obj.approvedStatus = key.value || '';
            }
          }
          for (let key of Object.keys(item)) {
            if (key !== 'variables') {
              obj[key] = item[key]
            }
          }
          if (url && url.includes('process-instances')) {
            obj.process_id = item.id;
            if (item.taskInfo && item.taskInfo.length) {
              obj.task_id = item.taskInfo[0].id;
            } else {
              obj.task_id = '';
            }
          } else {
            obj.task_id = item.id;
            obj.process_id = item.processInstanceId;
          }
          obj.status = item.status || [];
          obj.root_id = item.rootProcessInstanceId;
          obj.taskDefinitionKey = item.taskDefinitionKey;
          arr.push(obj);
        }
        return arr;
      },

      // 详情
      handleDbClick(row) {
        this.current_row = {};
        let url = row.bm_detail_request_url;
        if (!url) {
          this.$LjMessage('warning', {title: '警告', msg: '详情获取失败！'});
          return;
        }
        this.current_row = row;
        this.contract_detail_visible = true
      },
      // 关闭审批
      // 审批
      handleChange(val) {
        this.contract_detail_visible = false;
        if (val !== 'close') {
          let type = this.status_type;
          this.getApproval(this.urlApi, this.params['param' + type], type)
        }
      },

      //获取已选择的审核类型
      async getChoseApprovalTypeList() {
        await axios.get(`${this.url}monitor/process-instances/${this.$storage.get('user_info').id}`).then(res => {
          if (res.status == 200) {
            let data = res.data;
            _.forEach(data, (o) => {
              this.receive_check.push(o.receiveType);
              this.receive_check_name.push(this.receive_type[o.receiveType]);
            });
          }
        });
      },

      /*获取高级搜索审核类型*/
      async getApprovalTypeList() {
        let params = {
          tenantId: 'market',
        };
        await axios.get(`${this.url}history/process-defintion-map`, {params: {tenantId: 'market'}}).then(res => {
          if (res.status == 200) {
            let data = res.data;
            _.forEach(data, (val, key) => {
              //console.log(val,key);
              if (!key || !val) {
                delete data[key];
                return;
              }
              let obj = {
                id: key,
                title: val
              };
              this.approval_type_list.push(obj);
            });
            this.receive_type = data;
          }
        });
      },
      // 高级搜索 显示
      highSearch() {
        this.searchHigh = {
          status: 'approval_leader',
          placeholder: '',
          keywords: 'title',
          data: [
            {
              keyType: 'dateRange',
              title: '开始时间',
              placeholder: '请选择日期',
              keyName: 'start_time',
              dataType: []
            },
            {
              keyType: 'dateRange',
              title: '结束时间',
              placeholder: '请选择日期',
              keyName: 'end_time',
              dataType: []
            },
            {
              keyType: 'radio',
              title: '审批类型',
              keyName: 'processDefinitionKey',
              dataType: '',
              value: this.approval_type_list
            },
            {
              keyType: 'depart',
              title: '部门',
              placeholder: '请选择部门',
              keyName: 'orgId',
              dataType: [],
              value: {
                num: 1,
                arr: ''
              }
            },
          ]
        };
        this.showSearch = true
      },
      // 高级搜索 确定
      hiddenModule(val) {
        if (val.orgId && val.orgId.length == 1) {//部门高级搜索
          val.orgId = val.orgId[0];
        }
        if (val.start_time && val.start_time.length == 2) {//开始时间区间
          val.startedAfter = val.start_time[0];
          val.startedBefore = val.start_time[1];
        }
        delete val['start_time'];

        if (val.end_time && val.end_time.length == 2) {//结束时间区间
          val.finishedAfter = val.end_time[0];
          val.finishedBefore = val.end_time[1];
        }
        delete val['end_time'];

        this.showSearch = false
        if (val != 'close') {
          this.params['param' + this.status_type] = val
          this.handleCurrentChange(1)
        }
      },
      // 接收 挂起
      change_receive_type() {
        this.isreceive = !this.isreceive;
        this.handleCheckType()
      },
      setReceiveType() {
        if (this.isreceive) {
          this.isreceive_visible = !this.isreceive_visible
        } else {
          this.$LjNotify('warning', {
            title: '提示',
            message: '挂起状态禁止设置接收类型'
          });
        }
      },
      handleCheckType() {
        let params = {
          "receiveTypeList": this.receive_check,
          "suspend": !this.isreceive
        };
        this.$http.post(`${this.url}monitor/process-instances/${this.$storage.get('user_info').id}`, params).then(res => {
          console.log(res)
        })
      },
      // 选择 接收类型
      handleChangeReceive() {
        this.isreceive_visible = false;
        this.receive_check_name = [];
        this.receive_check.forEach(ele => {
          this.receive_check_name.push(this.receive_type[ele])
        });
        this.handleCheckType()
      },
      // 取消 接收类型
      handleCancelReceive() {
        this.isreceive_visible = false;
        this.receive_check = []
      },
      // 组长 控制面板
      handleSeeMain() {
        this.controlPanel_visible = true
      },
      hiddenControlPanel() {
        this.controlPanel_visible = false
      },

      hiddenDevelopNew() {
        this.develop_visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/approval/index.scss";

  #theme_name {
    #approval {
      footer.bottomPage {
        background: #ffffff;
        width: auto;
        margin: 0 30px;
      }
    }
  }
</style>
<style lang="scss">
  #approval {
    .searchModule,
    .searchContent {
      top: 0 !important;
    }
  }
</style>


