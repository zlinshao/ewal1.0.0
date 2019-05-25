<template>
  <div id='HousingDue'>
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>房屋到期</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="chosenType(item.id)" class="items-column" :class="{'chooseTab': tabType === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button id='active-warning' @click='changeTab(1)' :class="[chooseTab==1?'el-button-active':'']">收房</el-button>
        <el-button id='active-primary' @click='changeTab(2)' :class="[chooseTab==2?'el-button-active':'']">租房</el-button>
        <div></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">

      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableClickRow"
        header-row-class-name="tableHeader" style="width: 100%" :key='"table"+ tabType'>

        <el-table-column align="center" label="标记" v-if='tabType == 2'>
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.tag_status]">
              <p v-if='scope.row.tag_status'>{{scope.row.tag_status == 1 ? "续租":"退租"}}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="到期时间" align="center" width='180px'>
          <template slot-scope="scope">
            <span>{{scope.row.end_at || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合同编号" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.contract_number || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.house_name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="chooseTab == 1 ?'房东姓名':'租客姓名'" align="center">
          <template slot-scope="scope">
            <span v-if='scope.row.customer_info'>{{scope.row.customer_info[0].name || '--'}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">
            <span v-if='scope.row.customer_info'>{{scope.row.customer_info[0].phone || '--'}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column :label="chooseTab == 1 ? '收房价格':'出租价格'" align="center">
          <template slot-scope="scope">
            <p class="content" v-if="scope.row.month_price &&scope.row.month_price.length > 0">
              <span v-for="(item,key) in scope.row.month_price" :key="key"> {{ item.price }}元 {{
                item.period }}个月</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="付款方式" align="center">
          <template slot-scope="scope">
            <p v-if='scope.row.pay_way&& scope.row.pay_way.length >0'>
              <span v-for='(item,key) in scope.row.pay_way'>{{item.pay_way_str? item.pay_way_str :'押'+ item.pay_way_bet
                + '付'+ item.pay_way}}</span>
            </p>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="开单人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sign_user.name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.org_leader.name || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sign_org.name || '--'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType == 1' width='300'>
          <template slot-scope="scope" align='left'>
            <el-button type="success" plain size="mini" @click.stop="addOrEditHousingTag(scope.row,1)">添加标记</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType ==2' width='300'>
          <template slot-scope="scope" align='left'>
            <div style='display:flex;justify-content:flex-start;align-items:center;'>
              <el-button id='active-warning' size="mini" @click.stop="readhousingTag(scope.row)">查看标记</el-button>
              <el-button id='active-primary' size="mini" @click.stop="addOrEditHousingTag(scope.row,2)">修改标记</el-button>
              <el-button id='active-success' size="mini" @click.stop="postHelp(scope.row)" v-if='scope.row.is_send == 0'>发送代办</el-button>
              <el-button id='active-success' size="mini" @click.stop="urgedDealWith(scope.row)" v-if='scope.row.is_send == 1'>催办</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-if='tabType == 4' width='300'>
          <template slot-scope="scope" align='left'>
            <el-button id='active-success' size="mini" @click.stop="addOrEditHousingTag(scope.row,1)">添加标记</el-button>
            <el-button id='active-success' size="mini" @click.stop="urgedDealWith(scope.row)">催办</el-button>
          </template>
        </el-table-column>
      </el-table>

      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="params.page" :page-size="params.limit"
            :total="tableDateCount" layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <!--menu-->
    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--合同详情-->
    <contractDetail :visible="contract_detail_visible" :moduleData='currentRow' :chooseTab='chooseTab' :showFooter='false'
      :disabled='true' :showData='false' :showRelated='true' @close="handleCloseDetail" />

    <!-- 添加 修改标记 -->
    <lj-dialog :visible.sync="mark_visible" :size="{width: 490 + 'px',height: 500 + 'px'}" @close="handleCancelMark">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{tagType == 1 ? "添加标记":"修改标记"}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="mark_form" label-width="80px">
            <el-form-item label="标记类型">
              <div class="items-center">
                <p class="radioSelection" @click="chooseMarkRadio(item)" :class="{'highChoose': mark_form.tag_status === item.id}"
                  v-for="item in mark_status">
                  {{ item.val }}
                </p>
              </div>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="mark_form.appointment_time" type="datetime"
                placeholder="请选择"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="mark_form.remark" type="textarea" placeholder="请输入" :row="6"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
              <lj-upload size="50" style="position: absolute;top: -13px" v-model='mark_form.album'></lj-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button id='active-danger' class='el-button-active' size="small" @click="handleSubmitMark">确定</el-button>
          <el-button id='active-info' class='el-button-active' size="small" @click="handleCancelMark">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 查看标记 -->
    <lj-dialog :visible.sync="backInfo_visible" :size="{width: 994 + 'px',height: 690 + 'px'}" @close="handleCloseLookBackInfo">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>标记记录</h3>
          <div class="header_tit" @click='backInfo_addhousingTag'>
            修改标记
          </div>
        </div>
        <div class="dialog_main edit-markup detail_dialog">
          <div class="back_info scroll_bar">
            <div class="content flex" v-for="(item,key) in backInfo">
              <div class='detail_dialog_left'>
                <p>{{ item.operater.name }}</p>
                <p>{{ item.created_at}}</p>
              </div>
              <div class="detail_dialog_center">
                <div class="circle"></div>
              </div>
              <div class='detail_dialog_right'>
                <p>{{ item.tag_status == 1 ? "续租" : "退租" }}</p>
                <p>{{item.remark}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button id='active-danger' size="small" class='el-button-active' @click="handleCloseLookBackInfo">确定</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 催办 -->
    <lj-dialog :visible="urgedDeal_visible" :size="{width: 670 + 'px',height: 370 + 'px'}" @close="handleCloseUrgedDeal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>建立催办</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal">
          <el-form label-width="80px">
            <el-form-item label="备注信息">
              <el-input v-model="urgedDeal_note" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button id='active-danger' class='el-button-active' size="small" @click="handleUrgedDeal">确定</el-button>
          <el-button id='active-info' class='el-button-active' size="small" @click="handleCloseUrgedDeal">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue';
import MenuList from '../../common/menuList.vue';
import { housingDueSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import contractDetail from '../components/contract_detail'

export default {
  name: 'index',
  components: {
    SearchHigh,
    MenuList,
    contractDetail
  },
  data () {
    return {
      customService,
      visibleStatus: false, // 客服
      selects: [
        {
          id: 1,
          title: '待标记'
        },
        {
          id: 2,
          title: '已标记'
        },
        {
          id: 3,
          title: '已完成'
        },
        {
          id: 4,
          title: '超期'
        }
      ],
      chooseTab: 1,
      tabType: 1,
      showSearch: false,
      searchData: {
        status: 'housingDue',
        data: [],
      },
      tableData: [],
      tableDateCount: 0,
      //合同详情
      contract_detail_visible: false,
      // getList 参数
      params: {
        is_mark: 2,
        is_overdue: 0,
        is_complete: 0,
        page: 1,
        limit: 10,
        search: '',
        tag_status: '',
        sign_user_id: '',
        sign_org_id: '',
        end_at_min: '',
        end_at_max: '',
      },
      // 添加标记 1 修改标记2
      tagType: 1,
      // 添加标记
      mark_visible: false,
      mark_form: {
        tag_status: 1,
        appointment_time: null,
        remark: null,
        album: [],
      },

      mark_status: [
        { id: 1, val: '续租' },
        { id: 2, val: '退租' },
      ],

      // 回访记录
      backInfo_visible: false,
      backInfo: [],
      // 催办
      urgedDeal_visible: false,
      urgedDeal_note: null,
      // 当前点击的row
      currentRow: null,
      market_server: globalConfig.market_server,
      payArr: ['水费', '电费', '燃气费', '物业费', '网络费', '其他'],
      currentMethod: '',
    }
  },
  created () {
    this.formateParams()
  },
  methods: {
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    formateParams () {
      this.params.is_mark = 0
      this.params.is_overdue = 0
      this.params.is_complete = 0
      if (this.tabType == 1) {
        this.params.is_mark = 2
      } else {
        this.params.is_mark = 1
        if (this.tabType == 3) {
          this.params.is_complete = 1
        }
        if (this.tabType == 4) {
          this.params.is_overdue = 1
        }
      }
      this.getDateList()
    },
    getDateList () {
      this.showLoading(true);
      this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}`, this.params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDateCount = res.data.count;
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
        }
        this.showLoading(false);
      })
    },
    //切换
    chosenType (id) {
      if (this.tabType !== id) {
        this.tabType = id
        this.formateParams()
      }
    },
    // 收房 租房
    changeTab (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id
        this.formateParams()
      }
    },
    //高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = housingDueSearch;
    },
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.params.page = 1
        this.params.search = val.search
        this.params.tag_status = val.tag_status
        this.params.sign_user_id = val.openPer[0] || ''
        this.params.sign_org_id = val.handler[0] || ''
        this.params.end_at_min = val.date1[0] || ''
        this.params.end_at_max = val.date1[1] || ''
        this.getDateList()
      }
    },
    //合同详情
    tableClickRow (row) {
      this.currentRow = row
      this.contract_detail_visible = true
    },
    // 关闭合同详情
    handleCloseDetail () {
      this.contract_detail_visible = false
      this.currentRow = null
    },

    // 添加标记or编辑标记
    addOrEditHousingTag (row, type) {
      this.tagType = type
      this.currentRow = row
      this.mark_visible = true;

      if(type==2) {//修改标记
        let tag_id = row.tag_id;
        if(!tag_id) return;
        this.$http.get(`${this.market_server}v1.0/market/contract/tagdetail/${tag_id}`).then(res=> {
          if(res.code.toString().endsWith('0')) {
            this.mark_form = res.data;
          }
        });
      }

    },
    // close 添加标记
    handleCancelMark () {
      this.mark_form = {
        tag_status: null,
        appointment_time: null,
        remark: null,
        album: [],
      }
      if (this.currentMethod != 'seeRecord') {
        this.currentRow = null
      } else {
        this.backInfo_visible = true
      }
      this.mark_visible = false;
    },
    // 标记类型
    chooseMarkRadio (item) {
      this.mark_form.tag_status = item.id;
    },
    validation_mark_form () {
      let { tag_status, appointment_time, remark, album } = this.mark_form;
      if (!tag_status) {
        return '标记类型未选择'
      }
      if (!appointment_time) {
        return '预约时间未选择'
      }

      return null
    },
    // 标记上传
    handleSubmitMark () {
      let warn = this.validation_mark_form()
      if (warn) {
        this.$LjNotify('warning', {
          title: '提示',
          message: warn
        });
        return
      }

      if (this.tagType == 1) {
        console.log('22')
        this.$http.post(this.market_server + `v1.0/market/contract/tag/${this.chooseTab}/${this.currentRow.contract_id}`, this.mark_form).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.message
            });
            this.handleCancelMark();
            this.getDateList();
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.message
            })
          }
        })
      }
      if (this.tagType == 2) {
        this.$http.put(this.market_server + `v1.0/market/contract/tag/${this.currentRow.tag_id}`, this.mark_form).then(res => {
          if (res.code === 200) {

            this.handleCancelMark();
            if (this.currentMethod == 'seeRecord') {
              this.getHousingRecord(this.currentRow.tag_id)
            } else {
              this.getDateList();
              this.$LjNotify('success', {
                title: '修改成功',
                message: ''
              });
            }
          } else {
            this.$LjNotify('warning', {
              title: '修改失败',
              message: ''
            })
          }
        })
      }

    },
    // 查看标记
    readhousingTag (row) {
      this.currentRow = row;
      this.backInfo_visible = true;
      this.getHousingRecord(row.tag_id)
    },
    getHousingRecord (id) {
      this.$http.get(this.market_server + `v1.0/market/contract/tag/${id}`).then(res => {
        if (res.code === 200) {
          this.backInfo = res.data.data

        } else {
          this.$LjNotify('warning', {
            title: '警告',
            message: '暂无标记信息'
          })
        }
      })
    },
    // 关闭 标记查看
    handleCloseLookBackInfo () {
      this.currentRow = null;
      this.backInfo = [];
      this.backInfo_visible = false;
      this.currentMethod = ''
    },
    // 查看标记中 修改标记
    backInfo_addhousingTag () {
      this.currentMethod = 'seeRecord'
      this.addOrEditHousingTag(this.currentRow, 2)
      // this.backInfo = '';
      // this.backInfo_visible = false;
    },
    // 发送代办
    postHelp (row) {
      if (row.is_send != 0) {
        return
      }
      let params = {
        house_id: row.house_id,
        contract_id: row.contract_id,
        contract_type: this.chooseTab,
        task_type: row.tag_status,
        tag_id: row.tag_id
      }

      this.$http.post(this.market_server + `v1.0/market/contract/send-task`, params).then(res => {
        if (res.code === 200) {
          this.handleCloseUrgedDeal()
          this.$LjNotify('success', {
            title: '提示',
            message: '代办发送成功'
          });
          this.getDateList()
        } else {
          this.$LjNotify('warning', {
            title: '提示',
            message: '代办发送失败'
          });
        }
      })
    },
    // 催办
    urgedDealWith (row) {
      this.currentRow = row
      this.urgedDeal_visible = true
    },
    // 确定催办
    handleUrgedDeal () {
      if (!this.urgedDeal_note) {
        this.$LjNotify('warning', {
          title: '提示',
          message: '备注信息未填写'
        });
        return
      }

      let params = {
        sign_user_id: '',
        content: this.urgedDeal_note
      }
      this.$http.post(this.market_server + `v1.0/message/send-urgent`, params).then(res => {
        if (res.code === 200) {
          this.handleCloseUrgedDeal()
          this.$LjNotify('success', {
            title: '提示',
            message: '建立催办成功'
          });
          this.urgedDeal_note = null
          this.getDateList()
        } else {
          this.$LjNotify('warning', {
            title: '提示',
            message: '建立催办失败'
          });
        }

      })
    },
    // 取消催办
    handleCloseUrgedDeal () {
      this.currentRow = null
      this.urgedDeal_visible = false
    },
    //footer
    handleCurrentChange (val) {
      this.params.page = val
      this.getDateList()
    },

  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/housingDue/index.scss";

#HousingDue {
  .dialog_footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.opactiy {
  opacity: 0;
}
</style>


