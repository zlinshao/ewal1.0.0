<template>
  <div id="gathering">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>收款</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons home_icon"></div>
        <div class="icons add"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
        <el-table-column
          v-for="(item,key) in btn_group"
          :key="key"
          :label="item.val"
          align="center">
          <template slot-scope="scope">
            <el-button style="width: 80px" size="mini" :type="item.type" plain @click="handleClickBtn(item.key)">{{ item.val }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="100"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--应收入账-->
    <lj-dialog
      :visible="receive_visible"
      :size="{width: 500 + 'px',height: 600 + 'px'}"
      @close="receive_visible = false">
      <div class="dialog_container">
        <div class="dialog_header flex">
          <h3>应收入账</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="receive_form" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_come"></i>
                  </b>
                  <span>款项来源</span>
                </div>
                <div class="item_content">
                  <span>情缘雅居10-102</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>账户</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="receive_form.subject_name">
                    <el-option label="中介费" value="1"></el-option>
                    <el-option label="租房房租" value="2"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_subject"></i>
                  </b>
                  <span>款项科目</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="receive_form.subject_name">
                    <el-option label="中介费" value="1"></el-option>
                    <el-option label="租房房租" value="2"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_money"></i>
                  </b>
                  <span>应收金额</span>
                </div>
                <div class="item_content">
                  <span>2500.00</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item >
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_case"></i>
                  </b>
                  <span>实收金额</span>
                </div>
                <div class="item_content">
                  <el-input v-model="receive_form.money"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_payTime"></i>
                  </b>
                  <span>付款时间</span>
                </div>
                <div class="item_content">
                  <el-date-picker
                    class="all_width"
                    v-model="receive_form.pay_time"
                    placeholder="请选择付款时间"
                    type="datetime"
                  ></el-date-picker>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注</span>
                </div>
                <div class="item_content">
                  <el-input
                    v-model="receive_form.mark"
                    type="textarea"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer flex-center">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="normal" @click="receive_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--跟进记录-->
    <lj-dialog
      :visible="record_visible"
      :size="'small'"
      @close="record_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>跟进记录</h3>
        </div>
        <div class="dialog_main">
          <div class="address">情缘雅居10-102</div>
          <div class="record">
            <el-table
              :data="record_data"
            >
              <el-table-column label="跟进时间" prop=""></el-table-column>
              <el-table-column label="跟进发起人" prop=""></el-table-column>
              <el-table-column label="当前跟进人" prop=""></el-table-column>
              <el-table-column label="跟进类型" prop=""></el-table-column>
              <el-table-column label="跟进状态" prop=""></el-table-column>
              <el-table-column label="款项名目" prop=""></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--备注列表-->
    <lj-dialog
      :visible="mark_visible"
      :size="'small'"
      @close="mark_visible = false">
      <div class="dialog_container">
        <div class="dialog_header flex">
          <h3>备注列表</h3>
          <span class="add_mark" @click="new_mark_visible = true">+</span>
        </div>
        <div class="dialog_main">
          <div class="address">情缘雅居10-102</div>
          <div class="record">
            <el-table
              :data="mark_data"
            >
              <el-table-column label="备注时间" prop=""></el-table-column>
              <el-table-column label="备注内容" prop=""></el-table-column>
              <el-table-column label="备注人" prop=""></el-table-column>
              <el-table-column label="备注类型" prop=""></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="dialog_footer">
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,prev,pager,next"
            ></el-pagination>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--新增备注-->
    <lj-dialog
      :visible="new_mark_visible"
      :size="{width: 500 + 'px' ,height: 400 + 'px'}"
      @close="new_mark_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增备注</h3>
        </div>
        <div class="dialog_main">
          <el-form :mode="new_mark" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注内容</span>
                </div>
                <div class="item_content">
                  <el-input type="textarea" v-model="new_mark.content" :rows="4"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_mark"></i>
                  </b>
                  <span>备注类型</span>
                </div>
                <div class="item_content items-start">
                  <el-button>工单</el-button>
                  <el-button>维修单</el-button>
                  <el-button>贴条</el-button>
                  <el-button>贴条</el-button>
                  <el-button>贴条</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--登记收款-->
    <lj-dialog
      :visible="register_visible"
      :size="{width: 500 + 'px',height: 400 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>登记记录</h3>
        </div>
        <div class="dialog_main">
          <el-form :model="register_from" size="mini">
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_come"></i>
                  </b>
                  <span>选择图片</span>
                </div>
                <div class="item_content">
                  <span>...</span>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>选择账户</span>
                </div>
                <div class="item_content">
                  <el-select class="all_width" v-model="register_from.account">
                    <el-option value="1" label="2104023483209"></el-option>
                    <el-option value="1" label="2104023483209"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>收款金额</span>
                </div>
                <div class="item_content">
                  <el-input v-model="register_from.money"></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="form_item_container">
                <div class="item_label">
                  <b class="item_icons">
                    <i class="icon_account"></i>
                  </b>
                  <span>收款时间</span>
                </div>
                <div class="item_content">
                  <el-date-picker
                    class="all_width"
                    v-model="register_from.time"
                    typ="timetype"
                  ></el-date-picker>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger">迁移</el-button>
          <el-button size="mini" @click="register_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import FinMenuList from '../components/finMenuList.vue';

  export default {
    name: "",
    components: {SearchHigh,LjDialog,FinMenuList},
    data() {
      return {
        showFinMenuList: false,
        receive_visible: false, //应收入账
        record_visible: false, //跟进记录
        mark_visible: false, //备注列表
        new_mark_visible: false, //新增备注
        register_visible: false, //登记收款
        register_size: '',
        register_from: {
          img: '',
          account: '',
          money: '2000.00',
          time: ''
        },
        new_mark: {
          content: '',
          type: ''
        },
        showSearch: false,
        chooseTab: 1,
        selects: [
          {
            id: 1,
            title: '定金',
          },
          {
            id: 2,
            title: '尾款',
          },
          {
            id: 3,
            title: '房款',
          },
          {
            id: 4,
            title: '其他收款'
          }
        ],
        tableData: [
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'},
          {gather_time: '2019-02-10',subject_name: '情缘雅居10-102',receive_subject: '房款',balance: '10000',receive: '2000',residue: '8000',polishing_time: '2019-02-27',status: '待入账',detail: '巴拉巴拉'}
        ],
        showData: {
          gather_time: '收款时间',
          subject_name: '款项名目',
          receive_subject: '应收科目',
          balance: '应收余额',
          receive: '实收金额',
          residue: '剩余金额',
          polishing_time: '补齐时间',
          status: '状态',
          detail: '明细详情'
        },
        btn_group: [
          {val: '跟进列表',key: 'record',type: 'success'},
          {val: '备注列表',key: 'mark',type: 'danger'},
          {val: '详情',key: 'info_detail',type: 'primary'},
          {val: '登记收款',key: 'register',type: 'warning'},
          {val: '应收入账',key: 'should_receive',type: 'success'}
        ],
        searchData: {
          status: 'gathering',
          data: [],
        },
        chooseRowIds: [],
        receive_form: {
          account_num: '1',
          subject_name: '1',
          money: '',
          pay_time: '',
          mark: '',
        },
        record_data: [],
        mark_data: []
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      handleClickBtn(key) {
        console.log(key);
        if (key === 'should_receive') {
          this.receive_visible = true;
        }
        if (key === 'record') {
          this.record_visible = true;
        }
        if (key === 'mark') {
          this.mark_visible = true;
        }
        if (key === 'register') {
          this.register_size = 'mini';
          this.register_visible = true;
        }
      },
      changeTabs(id) {
        this.chooseTab = id;
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      // 高级搜索
      highSearch() {
        this.showSearch = true;
        this.searchData.data = [
          {
            keyType: 'date',
            title: '出生日期',
            placeholder: '请选择日期',
            keyName: 'date3',
            dataType: '',
          },
          {
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'radio',
            dataType: '',
            value: [
              {
                id: 12,
                title: '特级',
              },
              {
                id: 13,
                title: '紧急',
              },
              {
                id: 14,
                title: '重要',
              },
              {
                id: 15,
                title: '一般',
              }
            ],
          },
          {
            keyType: 'check',
            title: '状态',
            keyName: 'check',
            dataType: [],
            value: [
              {
                id: 22,
                title: '已完成',
              },
              {
                id: 23,
                title: '未完成',
              },
            ],
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
          {
            keyType: 'organ',
            title: '部门',
            placeholder: '请选择部门',
            keyName: 'organ',
            dataType: '',
          },
        ];
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/finance/gatherring/index.scss";

  @mixin financeImg($m,$n) {
    $url: '../../../assets/image/finance/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #gathering {
      > div {
        .listTopRight {
          .home_icon {
            @include financeImg('yinhanglius.png', 'theme1');
          }
        }
      }
    }
  }
</style>
