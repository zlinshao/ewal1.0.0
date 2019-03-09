<template>
  <div id="customer">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>客户管理</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center">
        <p class="status-icon" v-for="item in statusIcon">
          <span style="margin-left: 16px"><i
            :style="{'background-color':item.iconColor}"></i><span>{{item.iconText}}</span></span>
        </p>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click="addLord"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <!--房东列表-->
      <div class="lord">
        <el-table
          :data="lordDataLists"
          :height="this.mainListHeight(30) + 'px'"
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>

          <el-table-column label="前缀" align="center">
            <template slot-scope="scope">
              <div class="statusBar flex-center">
                <span style="background-color: #14e731;"></span>
                <span style="background-color: #e6a23c;"></span>
                <span style="background-color: #f56c6c;"></span>
                <span style="background-color: #409eff;"></span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            v-for="(col,index) in lordLabelList"
            :key="index"
            :prop="col.prop" :label="col.label">
          </el-table-column>

          <el-table-column label="状态" prop="" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" prop="" align="center" width="500">
            <template slot-scope="scope">
              <el-button type="info" plain size="small" @click="handleDetailsLord(scope.row,scope.$index)"
                         icon="el-icon-view">详情
              </el-button>
              <el-button type="primary" plain size="small" @click="handleEditLord(scope.row,scope.$index)"
                         icon="el-icon-edit">编辑
              </el-button>
              <!--<el-button type="success" plain size="small" @click="handleMarkLord(scope.row)" icon="el-icon-location">恢复重复标记</el-button>-->
              <el-button type="warning" plain size="small" @click="handleProcessLord(scope.row)" icon="el-icon-info">
                生成待处理项
              </el-button>
              <!--<el-button type="info" plain size="small" @click="handlePayDate(scope.row)" icon="el-icon-document">生成付款周期</el-button>-->
              <el-button type="danger" plain size="small" @click="handleDeleteLord(scope.row)" icon="el-icon-delete">
                删除
              </el-button>
            </template>

          </el-table-column>
        </el-table>
        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="lordDataCount"
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>

    </div>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>

    <!--详情-->
    <lj-dialog :visible="details_visible" :size="{width: 1200 + 'px',height: 600 + 'px'}"
               @close="details_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>详情</h3>
        </div>
        <div class="dialog_main">
          <el-row :gutter="20" style="width: 100%">
            <el-col :span="15" :offset="1">
              <h3 class="justify-start" style="margin-bottom: 20px">基础信息</h3>
              <div class="justify-bet" style="flex-wrap: wrap">
                <div class="" style="width:45%;padding: 10px 0;text-align: left" v-for="item in detailLabel">
                  <span class="tablelabel">{{item.label}}</span>
                  <span>{{lordDataDetail[item.prop]}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="7" :offset="1">
              <h3 class="justify-start" style="margin-bottom: 20px">客户账户信息</h3>
              <div class="justify-bet" style="flex-wrap: wrap">
                <div class="" style="width:90%;padding: 10px 0;text-align: left" v-for="item in detailLabel2">
                  <span class="tablelabel">{{item.label}}</span>
                  <span>{{lordDataDetail[item.prop]}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </lj-dialog>

    <!--删除-->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该房东信息吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" plain size="small" @click="handleOkDel">确定</el-button>
          <el-button size="small" plain @click="delete_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--编辑-->
    <lj-dialog :visible="edit_visible" :size="{width: 1200 + 'px',height: 600 + 'px'}" @close="edit_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width="80px">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="7">
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="签约人">
                  <el-input size="small"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="账户类型">
                  <el-select placeholder="请选择活动区域">
                    <el-option label="银行卡" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="3"></el-option>
                    <el-option label="存折" value="4"></el-option>
                    <el-option label="现金" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收款人">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">

                </el-form-item>
                <el-form-item label="支行">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="账户">
                  <el-input size="small"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="房租科目">
                  <el-input size="small"></el-input>
                </el-form-item>
                <el-form-item label="押金科目">
                  <el-input size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--<el-form  class="flex-center items-start" label-width="140px">-->
            <!--<el-row :gutter="20" style="width: 100%">-->
              <!--<el-col :span="8">-->
                <!--<h4 class="justify-start" style="margin-bottom: 20px">基本信息</h4>-->
                <!--<div>-->
                  <!--<el-form-item label="签约人">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="所属部门">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="负责人">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="客户姓名">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="客户手机号">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="房屋地址">-->
                    <!--<el-input v-model="" size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="收房月数">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="付款方式">-->
                    <!--<el-select  placeholder="请选择活动区域" label-width="140px">-->
                      <!--<el-option label="区域一" value="1"></el-option>-->
                      <!--<el-option label="区域二" value="2"></el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="">-->
                    <!--<el-checkbox>付款方式不唯一</el-checkbox>-->
                  <!--</el-form-item>-->

                  <!--<el-form-item label="月单价" label-width="140px">-->
                    <!--<el-input-number  controls-position="right" :min="1" :max="100"></el-input-number>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="第一年" label-width="140px">-->
                    <!--<el-input-number  controls-position="right" :min="1" :max="100"></el-input-number>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="第二年" label-width="140px">-->
                    <!--<el-input-number  controls-position="right" :min="1" :max="100"></el-input-number>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="">-->
                    <!--<el-checkbox>付款方式不唯一</el-checkbox>-->
                  <!--</el-form-item>-->

                  <!--<el-form-item label="押金">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="保修期">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="中介费">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="待签约日期">-->
                    <!--<el-date-picker-->

                      <!--type="date"-->
                      <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="第一次房租日期">-->
                    <!--<el-date-picker-->

                      <!--type="date"-->
                      <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="第二次房租日期">-->
                    <!--<el-date-picker-->

                      <!--type="date"-->
                      <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                  <!--</el-form-item>-->

                <!--</div>-->

              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<h4 class="justify-start" style="margin-bottom: 20px">客户信息</h4>-->
                <!--<div>-->
                  <!--<el-form-item label="账户类型">-->
                    <!--<el-select  placeholder="请选择活动区域">-->
                      <!--<el-option label="银行卡" value="1"></el-option>-->
                      <!--<el-option label="支付宝" value="2"></el-option>-->
                      <!--<el-option label="微信" value="3"></el-option>-->
                      <!--<el-option label="存折" value="4"></el-option>-->
                      <!--<el-option label="现金" value="5"></el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="收款人">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="开户银行">-->
                    <!--<el-select  placeholder="请选择活动区域">-->
                      <!--<el-option label="银行卡" value="1"></el-option>-->
                      <!--<el-option label="支付宝" value="2"></el-option>-->
                      <!--<el-option label="微信" value="3"></el-option>-->
                      <!--<el-option label="存折" value="4"></el-option>-->
                      <!--<el-option label="现金" value="5"></el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="支行">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="账户">-->
                    <!--<el-input  size="small"></el-input>-->
                  <!--</el-form-item>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<h4 class="justify-start" style="margin-bottom: 20px">账户信息</h4>-->
                <!--<div>-->
                  <!--<el-form-item label="房租科目">-->
                    <!--<el-input  size="small" ></el-input>-->
                  <!--</el-form-item>-->
                  <!--<el-form-item label="押金科目">-->
                    <!--<el-input  size="small" ></el-input>-->
                  <!--</el-form-item>-->
                <!--</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-form>-->

        </div>
        <div class="dialog_footer">
          <el-button type="danger" plain size="small" >确定</el-button>
          <el-button size="small" plain @click="edit_visible = false;current_row = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--科目-->
    <lj-subject :visible="subject_visible" @close="subject_visible = false"
                @confirm="handleConfirmSubject"></lj-subject>
    <!--搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>


  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';
  import LjSubject from '../../common/lj-subject.vue';
  import {customerSearch} from '../../../assets/js/allSearchData';
  import SearchHigh from '../../common/searchHigh.vue';

  export default {
    name: "index",
    components: {
      LjDialog,
      FinMenuList,
      LjSubject,
      SearchHigh
    },
    data() {
      return {
        customerSearch,

        params: {
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: '',
          export: '',
        },
        statusIcon: [
          {iconColor: "#14e731", iconText: "手机"},
          {iconColor: "#e6a23c", iconText: "姓名"},
          {iconColor: "#f56c6c", iconText: "地址"},
          {iconColor: "#409eff", iconText: "待处理项"}
        ],
        showFinMenuList: false,
        selects: [{id: 1, title: '房东', url: 'lord'}, {id: 2, title: '租客', url: 'renter'}],
        chooseTab: 1,
        current_row: '',

        add_visible: false,
        details_visible: false,
        edit_visible: false,
        delete_visible: false,

        showSearch: false,
        searchData: {},

        subject_visible: false,
        which_subject: '',
        new_subject_visible: false,
        new_subject: {
          parent_id: '',
          title: '',
          er_type: '',
          remark: '',
          parent_name: '',
          subject_code: ''
        },
        move_visible: false,
        move_subject: {
          initial: '',
          parent_id: '',
          title: ''
        },

        lordDataCount: 0,
        lordDataLists: [],
        lordLabelList: [
          {prop: "create_time", label: "生成时间"},
          {prop: "address", label: "房屋地址"},
          {prop: "customer_name", label: "客户姓名"},
          {prop: "contact", label: "手机号"},
          {prop: "months", label: "收房月数"},
          {prop: "pay_types", label: "付款方式"},
          {prop: "prices", label: "月单价"},
          {prop: "deal_date", label: "待签约日期"},
          {prop: "first_pay_date", label: "第一次打房租日期"},
          {prop: "pay_types", label: "客户付款方式"},
          {prop: "account_bank", label: "账号"},
          {prop: "staff.name", label: "签约人"},
        ],
        lordDataDetail: {},
        lordDetailFromList: {},

        detailLabel: [
          {label: "客户姓名:", prop: "customer_name"},
          {label: "客户联系方式:", prop: "contact"},
          {label: "房屋地址:", prop: "address"},
          {label: "租房月数:", prop: "months"},
          {label: "付款方式:", prop: "payType"},
          {label: "月单价:", prop: "prices[0]"},
          {label: "待签约日期:", prop: "deal_date"},
          {label: "空置期:", prop: "freeze"},
          {label: "第一次打房租日期:", prop: "first_pay_date"},
          {label: "第二次打房租日期:", prop: "second_pay_date"},
          {label: "负责人:", prop: "leader.name"},
          {label: "所属部门:", prop: "department.name"},
          {label: "操作人:", prop: "operator.name"},
          {label: "签约人:", prop: "staff.name"},
          {label: "科目:", prop: "deposit_subject"},
          {label: "备注:", prop: "remark"},
        ],
        detailLabel2: [
          {label: "汇款方式:", prop: "account_type"},
          {label: "汇款人姓名:", prop: "account_owner"},
          {label: "开户行:", prop: "account_bank"},
          {label: "支行:", prop: "account_subbank"},
          {label: "账号:", prop: "account_num"},
        ],
        el_form_item: [
          {label: "签约人", prop: "staff.name", type: "text"},
          {label: "所属部门", prop: "department.name", type: "text"},
          {label: "负责人", prop: "leader.name", type: "text"},
          {label: "客户姓名", prop: "customer_name", type: "text"},
          {label: "客户手机号", prop: "contact", type: "text"},
          {label: "房屋地址", prop: "address", type: "text"},
        ],

        lordDataIds: [],

        lordDataStatus: [],


      }
    },
    mounted() {
      this.getLordList();
    },
    activated() {
    },
    watch: {},
    computed: {

    },
    methods: {
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$notify.success({
            title: '成功',
            message: res.msg
          });
          this.getLordList();
        } else {
          this.$notify.warning({
            title: '失败',
            message: res.msg
          })
        }
      },
      handleChangePage(page) {
        this.params.page = page;
        this.getLordList();
      },
      // tab切换
      changeTabs(id, url) {
        this.chooseTab = id;
        // this.currentView = url;
      },
      //新增
      addLord() {
        this.edit_visible = true;

      },
      //详情
      handleDetailsLord(row, index) {
        this.current_row = row;
        this.details_visible = true;

        this.lordDetailFromList = this.lordDataLists[0];
        this.getLordDetail(this.current_row.id);
        this.lordDataDetail = Object.assign(this.lordDataDetail, this.lordDetailFromList)
      },
      //获取详情
      getLordDetail(id) {
        this.$http.get(globalConfig.temporary_server + 'customer_collect/' + id, {}).then(res => {
          if (res.code == 200) {
            this.lordDataDetail.warrenty = res.data.data.warrenty;
            this.lordDataDetail.deal_date = res.data.data.deal_date;
            this.lordDataDetail.deposit_subject = res.data.data.deposit_subject;
            this.lordDataDetail.payType = res.data.data.payType;

          }
        })
      },
      //标记
      // handleMarkLord() {
      //   this.$http.post(globalConfig.temporary_server + 'customer_lord_repeat/is_ignore/' + row.id, {}).then(res => {
      //     if (res.code == 200) {
      //       this.$notify.success({
      //         title: '成功',
      //         message: res.msg
      //       });
      //     }
      //   })
      //
      // },
      //处理项
      handleProcessLord(row) {
        this.$http.post(globalConfig.temporary_server + 'customer_collect/pending/' + row.id, {}).then(res => {
          if (res.code == 200) {
            this.$notify.success({
              title: '成功',
              message: res.msg
            });
          }
        })
      },
      //搜索
      highSearch() {
        this.showSearch = true;
        this.searchData = customerSearch;
      },
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          this.params.er_type = val.er_type;
          this.getLordList();
        }
      },
      //编辑
      handleEditLord(row, index) {
        this.current_row = row;
        this.edit_visible = true;
      },
      //删除
      handleOkDel() {
        this.$http.delete(globalConfig.temporary_server + `customer_renter/delete/${this.current_row.id}`).then(res => {
          this.callbackSuccess(res);
          this.delete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
      handleDeleteLord(row) {
        this.current_row = row;
        this.delete_visible = true;
      },

      //获取lord列表
      getLordList() {
        this.$http.get(globalConfig.temporary_server + 'customer_collect', this.params).then(res => {
          if (res.code === 200) {
            this.lordDataLists = res.data.data;
            // console.log(JSON.stringify(this.lordDataLists));
            this.lordDataCount = res.data.count;
            for (const item of this.lordDataLists) {
              this.lordDataIds.push(item.id)
            }
            //获取lord状态
            this.$http.get(globalConfig.temporary_server + 'customer_lord_repeat', {id: this.lordDataIds}).then(res => {
              if (res.code == 200) {
                this.lordDataStatus = res.data.data;
                console.log(JSON.stringify(this.lordDataStatus));

              }
            })
          } else {
            this.lordDataLists = [];
            this.lordDataCount = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //换页
      handleChangePage(page) {
        this.params.page = page;
        this.getLordList();
      },
      //科目
      handleOpenSubject(which) {
        this.which_subject = which;
        this.subject_visible = true;
      },
      //确认科目
      handleConfirmSubject(val) {
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'new_subject') {
          this.new_subject.parent_name = val.title;
          this.new_subject.parent_id = val.id;
        }
      },
      //生成付款周期
      // handlePayDate(row){
      //   this.$http.get(globalConfig.temporary_server + 'account_payable/generate/' + row.id, {}).then(res => {
      //     if (res.code == 200) {
      //       this.lordDataDetail.warrenty = res.data.data.warrenty;
      //       this.lordDataDetail.deal_date = res.data.data.deal_date;
      //       this.lordDataDetail.deposit_subject = res.data.data.deposit_subject;
      //       this.lordDataDetail.payType = res.data.data.payType;
      //
      //     }
      //   })
      // }

    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/finance/customer/index.scss";

  #theme_name.theme1 {
    #customer {
      .statusBar {
        span {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }

    }
  }

  #theme_name.theme2 {
    #customer {

    }
  }

  #theme_name.theme3 {
    #customer {

    }
  }

  #theme_name.theme4 {
    #customer {

    }
  }
</style>
