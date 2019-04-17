<template>
  <div id="workOrder">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>工单</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click='createOrder_visible = true'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableDblClick"
        header-row-class-name="tableHeader" style="width: 100%" :key='"orderTable"+chooseTab'>
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.emergency]">
              <p>{{scope.row.emergency_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop='create_time'></el-table-column>
        <el-table-column align="center" label="工单编号" prop='num'></el-table-column>
        <el-table-column align="center" label="类型" prop='type_name'></el-table-column>
        <el-table-column align="center" label="地址" prop='house_name'></el-table-column>
        <el-table-column align="center" label="内容" prop='content'></el-table-column>
        <el-table-column align="center" label="截止时间" prop='finish_time'></el-table-column>
        <el-table-column align="center" label="处理人" prop='operate_user_name'></el-table-column>
        <el-table-column align="center" label="创建人" prop='create_name'></el-table-column>
        <el-table-column align="center" label="部门" prop='org_name'></el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" v-if='chooseTab != 338' @click='handleCuiBan(scope.row)'>催办</el-button>
            <el-button type="warning" plain size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableDateCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh> -

    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--确定删除-->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete'></DeleteDialog>
    <!-- 催办 -->
    <LjDialog :visible="urgedDeal_visible" :size="{width: 480 + 'px',height: 340 + 'px'}" @close="handleCloseUrgedDeal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>建立催办</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal" v-if='currentRow'>
          <el-form label-width="80px">
            <el-form-item label="发送对象">
              <el-input @focus="handlerOrgan" readonly v-model="urgedDeal.personName" :placeholder="currentRow.operate_user_name + ',' + currentRow.create_name"></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="urgedDeal.note" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseUrgedDeal(true)">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseUrgedDeal">取消</el-button>
        </div>
      </div>
    </LjDialog>

    <!--新建工单-->
    <LjDialog :visible="createOrder_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseAddOrder">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建维修单</h3>
        </div>
        <div class="dialog_main addOrder_dialog">
          <div class="back_info scroll_bar">
            <el-row :gutter="10">
              <el-col :span='8'>
                <p class='el-col-p'><i class='icon house_name'></i>房屋地址</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder.house_name'></el-input>
                </div>
              </el-col>

              <el-col :span="8">
                <p class='el-col-p'><i class='icon type'></i><span>类型</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.type" placeholder="请选择">
                    <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="8">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerDepart" readonly v-model="createOrder.org"></el-input>
                </div>
              </el-col>

              <el-col :span="8">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder.mobile'></el-input>
                </div>
              </el-col>

              <el-col :span="8">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan" readonly v-model="createOrder.handler"></el-input>
                </div>
              </el-col>

              <el-col :span="8">
                <p class='el-col-p'><i class='icon status'></i><span>紧急程度</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.status" placeholder="请选择">
                    <el-option label="特急" value="特急"></el-option>
                    <el-option label="紧急" value="紧急"></el-option>
                    <el-option label="重要" value="重要"></el-option>
                    <el-option label="一般" value="一般"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="8">
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder.endTime" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择日期">
                    <!-- :picker-options="createOrder.pickerOptions" -->
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span='8'>
                <p class='el-col-p'><i class='icon content'></i>工单内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="createOrder.content"></el-input>
                </div>
              </el-col>

              <el-col :span='8'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='createOrder.imgList'></Ljupload>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span='2' class='el-col-box'>
                <div :class='{"el-box":true,"el-box-active":addOrderChosen == option.id}' v-for='option in addOrderChosen_options'
                  @click='chosenOptions(option.id)'>
                  <p>{{option.title}}</p>
                </div>
              </el-col>
              <el-col :span='22' class='el-col-content'>
                <div class='info_search'>
                  <i class='icon'></i>
                  <el-input placeholder="地址/合同编号/手机号/客户姓名" v-model="custm_info_search"></el-input>
                </div>
                <!--客户信息-->
                <div class='custmer_info' v-if='addOrderChosen == 1'>
                  <div class='nothing' v-if='custm_info.length == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='custmer_content' v-if='custm_info.length >= 0' v-for='info in custm_info' :key='info.id'>
                    <el-radio v-model="current_cust" :label="info" @change="changeCustmInfo">
                      <el-row width='100%'>
                        <el-col :span='7'>
                          <span class='tit'>房屋地址</span>
                          <span class='content_tit'>{{info.house_name}}</span>
                        </el-col>
                        <el-col :span='5'>
                          <span class='tit'>合同编号</span>
                          <span class='content_tit'>{{info.contract_num}}</span>
                        </el-col>
                        <el-col :span='3'>
                          <span class='tit'>姓名</span>
                          <span class='content_tit'>{{info.username}}</span>
                        </el-col>
                        <el-col :span='3'>
                          <span class='tit'>性质</span>
                          <span class='content_tit'>{{info.type}}</span>
                        </el-col>
                        <el-col :span='5'>
                          <span class='tit'>电话</span>
                          <span class='content_tit'>{{info.phone}}</span>
                        </el-col>
                      </el-row>
                    </el-radio>
                  </div>
                  <div class='ending' v-if='custm_info.length >= 0'>
                    <div class='ending_img'></div>
                    我也是有底线的~
                  </div>
                </div>

                <!--历史工单-->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 2'>
                  <div class='nothing' v-if='historyOrder.length == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content' v-for='i in 3'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          洗衣机坏了
                        </p>
                        <span class='status1'>已完成</span>
                      </div>
                      <div class='order_content_box'>
                        <p class='order_title2'>
                          <span>维修工单</span>
                          2019.1.22
                        </p>
                        <span>报销金额</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCurrentChange" :current-page="historyOrder_current" layout="total,  prev, pager, next, jumper"
                    :total="historyOrder.length" v-if='historyOrder.length > 0'>
                  </el-pagination>
                </div>
                <!--来电记录-->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 3'>
                  <div class='nothing' v-if='historyPhone.length == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content  order_content2' v-for='i in 3'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          洗衣机坏了
                        </p>
                        <span class='status1'>已完成</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCurrentChange" :current-page="historyOrder_current" layout="total,  prev, pager, next, jumper"
                    :total="historyOrder.length" v-if='historyPhone.length > 0'>
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseAddOrder(true)">新增</el-button>
          <el-button type="info" size="small" @click="handleCloseAddOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart"></DepartOrgan>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import { workOrderSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import DeleteDialog from '../components/delete-dialog';
import LjDialog from '../../common/lj-dialog.vue';
import StaffOrgan from '../../common/staffOrgan.vue'
import DepartOrgan from '../../common/departOrgan';
import Ljupload from '../../common/lightweightComponents/lj-upload'

export default {
  name: "index",
  components: { SearchHigh, MenuList, DeleteDialog, LjDialog, StaffOrgan, DepartOrgan, Ljupload },
  data () {
    return {
      customService,
      visibleStatus: false,



      currentTable: 'workOrder',
      tableSettingData: {
        workOrder: {//工单
          counts: 1,
          params: {
            search: '',
            page: 1,
            limit: 10,
          },
          showData: {
            createTime: '创建时间',
            workOrderId: '工单编号',
            type: '类型',
            address: '地址',
            content: '内容',
            endTime: '截至时间',
            handler: '处理人',
            createUser: '创建人',
            department: '部门',
          },
          tableData: [],
          status: {
            1: '特急',
            2: '紧急',
            3: '重要',
            4: '一般',
          },
          chooseRowIds: [],
          currentSelection: {}//当前选择行
        },
        goods: {
          counts: 0,
          params: {
            search: '',
            page: 1,
            limit: 8,
          },
          chooseRowIds: [],
          currentSelection: {},//当前选择行,
          multiSelection: [],//多选行
          isShowMulti: false,//是否显示多选
          createOrder_visible: false, // 创建工单
        },
      },

      chooseRowIds: [],

      showSearch: false,
      searchData: {
        status: 'workOrder',
        data: [],
      },


      market_server: globalConfig.market_server,
      //当前页
      currentPage: 1,
      chooseTab: 336,
      selects: [
        {
          id: 336,
          title: '待处理',
        },
        {
          id: 337,
          title: '跟进中',
        },
        {
          id: 338,
          title: '已完成',
        }
      ],
      //tableList
      tableData: [],
      tableDateCount: 0,
      currentRow: null,
      //删除row
      delete_visible: false,
      //催办
      urgedDeal_visible: false,
      urgedDeal: {
        note: '',
        person: [],
        personName: ''
      },
      staffModule: false, // 选择人员
      organData: {
        num: ''
      },
      createOrder_visible: false, //创建新工单
      createOrder: {
        house_name: '',
        type: '',
        post: '',
        handler: '',
        org: '',
        mobile: '',
        endTime: '',
        status: '',
        content: '',
        imgList: [],
      },
      departModule: false, //部门选择
      departData: {
        num: 1,
      },
      addOrderChosen: 1,
      addOrderChosen_options: [
        {
          title: '客户信息',
          id: 1
        }, {
          title: '历史工单',
          id: 2
        }, {
          title: '来电记录',
          id: 3
        }
      ],
      orderType: [{
        label: '保洁',
        value: 23
      }],
      custm_info_search: '',
      custm_info: [
        {
          id: '451',
          house_name: '东南花园1-2-102',
          contract_num: 'LJGDS2545222',
          username: '沙发上',
          type: '租客',
          phone: 15203224511
        }, {
          id: '453',
          house_name: '东南花园1-2-104',
          contract_num: 'LJGDS2545224',
          username: '沙发上',
          type: '租客',
          phone: 15203224511
        }
      ],
      current_cust: '',
      historyOrder: [
        {
          content: '洗衣机换了，需要维修',
        }
      ],
      historyOrder_current: 1,
      historyPhone: [{}, {}],
      historyOrder_current: 1,
    }
  },
  mounted () {
    this.getDataList();
  },
  activated () {
  },
  watch: {},
  computed: {},
  methods: {
    getDataList () {
      this.showLoading(true);
      let params = {
        type: 1,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab
      }
      this.$http.get(this.market_server + `v1.0/csd/work_order`, params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDateCount = res.data.all_count;
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
        }
        this.showLoading(false);
      })
    },
    // 切换 待处理 跟进中 已完成
    changeTabs (id) {
      if (this.chooseTab != id) {
        this.chooseTab = id;
        this.getDataList()
      }
    },
    // 双击 详情
    tableDblClick (row) {
      console.log(row);
      //this.in_workOrder_table_visible = true;
    },
    // 催办
    handleCuiBan (row) {
      this.urgedDeal_visible = true
      this.currentRow = row
    },
    // 关闭催办
    handleCloseUrgedDeal (params) {
      if (params) {
        let option = {
          work_order_id: this.currentRow.id,
          user: this.urgedDeal.person,
          content: this.urgedDeal.note
        }
        this.$http.post(`${this.market_server}v1.0/csd/work_order/notice`, option).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.getDataList()
          }
        })
      }
      this.urgedDeal_visible = false
      this.urgedDeal_note = null
      this.currentRow = null
    },
    // 删除
    handleDeleteRow (row) {
      this.currentRow = row
      this.delete_visible = true
    },
    //关闭删除
    handleCloseDelete (val) {
      if (val) { //确定删除
        this.$http.delete(`${this.market_server}v1.0/csd/work_order/delete/${this.currentRow.id}`).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.getDataList()
          }
        })
      }
      this.currentRow = null
      this.delete_visible = true
    },
    handlerOrgan () {
      this.staffModule = true
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        this.urgedDeal.personName = names
        this.urgedDeal.person = ids
      }
    },
    handlerDepart () {
      this.departModule = true
    },
    // 关闭 选择部门
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (ids != 'close') {
        console.log(ids, names, arr)
      }
    },
    // 创建新工单
    handleCloseAddOrder (params) {

    },
    chosenOptions (id) {
      if (this.addOrderChosen != id) {
        this.addOrderChosen = id
      }
    },
    changeCustmInfo (val) {
      this.addOrder_options.house_name = val.house_name
    },
    handleCurrentChange () { },
    // 分页
    handleCurrentChange (val) {
      //this.getRepositoryList();
      //console.log(`当前页: ${val}`);
    },

    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = workOrderSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.currentPage = 1;
        if (val == 'reset') { // 重置
          this.getDataList()
        } else {

        }
      }
    },
    // 高级搜索
    highSearch () {
      this.$http.get(`${this.market_server}v1.0/csd/work_order`, params).then(res => {
        this.$LjNotify('success', {
          title: '提示',
          message: res.message
        });
        if (res.code === 200) {
          this.getDataList()
        }
      })
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    }
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/workOrder/index.scss";

@mixin workOrderImg($m, $n) {
  $url: "../../../assets/image/customService/workOrder/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #workOrder {
    .mainListTable {
      .status1 {
        p {
          color: $colorFFF;
          @include workOrderImg("teji.png", "theme1");
        }
      }
      .status2 {
        p {
          color: #ffad0d;
          @include workOrderImg("jinji.png", "theme1");
        }
      }
      .status3 {
        p {
          color: #0c66ff;
          @include workOrderImg("zhongyao.png", "theme1");
        }
      }
    }
  }
}

#theme_name.theme2 {
  #workOrder {
  }
}

#theme_name.theme3 {
  #workOrder {
  }
}

#theme_name.theme4 {
  #workOrder {
  }
}
</style>
