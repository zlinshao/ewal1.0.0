<template>
  <div id="borrowReceive">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableSettingData.borrowReceive.tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        @row-dblclick="tableDblClick($event,'borrowReceive')"
        header-row-class-name="tableHeader"
        :row-style="{height:'70px'}"
        style="width: 100%">
        <!--<el-table-column-->
        <!--v-for="item in Object.keys(showData)" :key="item"-->
        <!--align="center"-->
        <!--:prop="item"-->
        <!--:label="showData[item]">-->
        <!--</el-table-column>-->

        <el-table-column
          key="approvalId"
          align="center"
          prop="approvalId"
          label="审批编号">
        </el-table-column>


        <el-table-column
          key="counts"
          align="center"
          prop="counts"
          label="领/借数量">
        </el-table-column>

        <el-table-column
          key="applyType"
          align="center"
          prop="applyType"
          label="申请类型">
        </el-table-column>

        <el-table-column
          key="applyPerson"
          align="center"
          prop="applyPerson"
          label="申请人">
        </el-table-column>

        <el-table-column
          key="department"
          align="center"
          prop="department"
          label="部门">
        </el-table-column>

        <el-table-column
          key="applyTime"
          align="center"
          prop="applyTime"
          label="申请日期">
        </el-table-column>

        <el-table-column
          key="applyStatus"
          align="center"
          prop="applyStatus"
          label="申请状态">
          <template slot-scope="scope">
            <div v-if="scope.row.applyStatus=='待通知'" slot="reference" class="name-wrapper">
              <el-tag @click="setPerson(scope.row)" size="medium">{{ scope.row.applyStatus }}</el-tag>
            </div>
            <div v-else>{{scope.row.applyStatus}}</div>
          </template>
        </el-table-column>


        <el-table-column
          key="goodsStatus"
          align="center"
          prop="goodsStatus"
          label="物品状态">

        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableSettingData.borrowReceive.params.page"
            :page-size="tableSettingData.borrowReceive.params.limit"
            :total="tableSettingData.borrowReceive.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>


    <!--待通知form-->
    <lj-dialog
      :visible="is_notify_visible"
      :size="{width: 450 + 'px',height: 260 + 'px'}"
      @close="is_notify_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <span class="notify-size">待通知</span>
        </div>
        <div class="dialog_main borderNone notify-borrow-receive">
          <el-form :model="is_notify_form" style="text-align: left" size="small" label-width="160px">
            <el-form-item label="是否发送领取通知给">
              <user-choose title="请选择人员" v-model="is_notify_form.user_id" width="200" num="1"></user-choose>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="sendReceiveNotify">确定</el-button>
          <el-button size="small" type="info" @click="is_notify_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--借用领用详情table-->
    <lj-dialog
      :visible="tableSettingData.borrowReceive.table_dialog_visible"
      :size="{width: 1550 + 'px',height: 700 + 'px'}"
      @close="tableSettingData.borrowReceive.table_dialog_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>{{tableSettingData.borrowReceive.formData.approvalId}} 详情</h3>
          <div class="header_right">

            <div class="detail-container">
              <div class="detail-item">
                <span>审批编号</span>
                <span>{{tableSettingData.borrowReceive.formData.approvalId}}</span>
              </div>
              <div class="detail-item">
                <span>申请人</span>
                <span>{{tableSettingData.borrowReceive.formData.applyPerson}}</span>
              </div>
              <div class="detail-item">
                <span>部门</span>
                <span>{{tableSettingData.borrowReceive.formData.department}}</span>
              </div>
              <div class="detail-item">
                <span>申请类型</span>
                <span>{{tableSettingData.borrowReceive.formData.applyType}}</span>
              </div>
              <div class="detail-item">
                <span>申请日期</span>
                <span>{{tableSettingData.borrowReceive.formData.applyTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-sidebar">
          <div @click="getItemsDetailList" :class="chooseDetailTabs==1?'sidebar-bg-checked':'sidebar-bg'">
            <span>事项详情</span>
          </div>
          <div @click="getGoodsDetailList()"
               :class="chooseDetailTabs==2?'sidebar-bg-checked':'sidebar-bg'">
            <span>物品详情</span>
          </div>
        </div>
        <div v-if="chooseDetailTabs == 1" class="event-detail dialog_main borderNone">
          <el-table
            :data="tableSettingData.items.tableData"
            highlight-current-row
            :height="this.mainListHeight(240) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(tableSettingData.items.tableShowData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.items.tableShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page" style="bottom: 150px">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableSettingData.items.params.page"
                :page-size="tableSettingData.items.params.limit"
                :total="tableSettingData.items.counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
          <div class="detail-bottom-container">
            <div class="detail-bottom">
              <div class="detail-item" style="position: relative">
                <span style="position: absolute;right: 95px">照片/视频</span>
                <!--                <div @click="tableSettingData.items.photo_table_dialog_visible = true" class="icons tp"></div>-->
                <div @click="tableSettingData.items.is_show_photo_detail_dialog = true" class="icons tp"></div>
              </div>
              <div class="detail-item total-price">
                <span>总费用</span>
                <input type="text" disabled :value="tableSettingData.borrowReceive.formData.repairPrice"></input>
                <span class="tip">元</span>
              </div>
              <div class="detail-item select-list">
                <span>任责人</span>
                <select disabled>
                  <option value="1">{{tableSettingData.borrowReceive.formData.responsibleType}}</option>
                </select>
                <select disabled>
                  <option value="1">{{tableSettingData.borrowReceive.formData.responsibleName}}</option>
                </select>
              </div>
              <div class="detail-item">
                <span>付款方式</span>
                <select disabled>
                  <option value="1">{{tableSettingData.borrowReceive.formData.costType}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div v-if="chooseDetailTabs == 2" id="goods_detail" class="goods-detail dialog_main borderNone">
          <div class="search-toolbar">
            <div v-show="!tableSettingData.goods.showSaveCancel">
              <div>
                <el-tag @click="batchSetReturnDate" size="medium">批量设置归还日期
                </el-tag>
              </div>

              <div>
                <el-tag @click="batchSetReceivePerson" size="medium">
                  批量设置领取人
                </el-tag>
              </div>

              <div>
                <el-tag @click="modifyDetail" size="medium">修改详情</el-tag>
              </div>
            </div>

            <div v-show="tableSettingData.goods.showSaveCancel" class="button-group">
              <div
                @click="btnCancel">
                取消
              </div>
              <div
                @click="btnSave">
                保存
              </div>
              <!--批量设置归还日期-->
              <div v-show="tableSettingData.goods.batchSetReturnDate" style="width: 160px">
                <el-date-picker
                  size="mini"
                  format="yyyy-MM-dd"
                  v-model="tableSettingData.goods.batchReturnDate"
                  placeholder="点击选择归还日期"
                  type="date">
                </el-date-picker>
              </div>
              <!--批量设置领取人-->
              <div class="batch-set-receive-person" v-show="tableSettingData.goods.batchSetUser" style="width: 170px">
                <!--<el-input
                  size="mini"
                  placeholder="点击选择领取人/部门">
                </el-input>
                <div class="icons-ry"></div>-->
                <div class="batch-user" :class="{editable:tableSettingData.goods.batchSetReturnDate}">
                  <user-choose title="请设置领取人" num="1" width="200"
                               v-model="tableSettingData.goods.batchUser"></user-choose>
                </div>
              </div>

            </div>


          </div>
          <el-table
            :data="tableSettingData.goods.tableData"
            highlight-current-row
            :height="this.mainListHeight(280) + 'px'"
            :row-class-name="tableChooseRow"
            @selection-change="handleSelectionChange"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <!--<el-table-column-->
            <!--v-for="item in Object.keys(goodsDetailShowData)" :key="item"-->
            <!--align="center"-->
            <!--:prop="item"-->
            <!--:label="goodsDetailShowData[item]">-->
            <!--</el-table-column>-->
            <el-table-column v-if="tableSettingData.goods.is_show_selection"
                             type="selection"
                             width="55">
            </el-table-column>
            <el-table-column
              key="name"
              align="center"
              prop="name"
              label="物品名称">
            </el-table-column>

            <el-table-column
              key="status"
              align="center"
              min-width="120px"
              prop="status"
              label="领/还状态">
              <template slot-scope="scope">
                <div :class="{editable:tableSettingData.goods.modifyAll}">
                  <dropdown-list :disabled="!tableSettingData.goods.modifyAll" width="120"
                                 :json-arr="DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RECEIVE_RETURN_STATUS"
                                 v-model="scope.row.status"></dropdown-list>
                </div>

              </template>
            </el-table-column>

            <el-table-column
              key="receive_time"
              align="center"
              prop="receive_time"
              label="领取日期">
            </el-table-column>

            <el-table-column
              width="140px"
              key="goods_number"
              align="center"
              prop="goods_number"
              label="物品编号">
            </el-table-column>

            <el-table-column
              key="goods_status"
              align="center"
              min-width="100px"
              prop="goods_status"
              label="物品状态">
              <template slot-scope="scope">
                <div :class="{editable:tableSettingData.goods.modifyAll}">
                  <dropdown-list :disabled="!tableSettingData.goods.modifyAll" width="100"
                                 :json-arr="DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.GOODS_STATUS"
                                 v-model="scope.row.goods_status"></dropdown-list>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              key="picture"
              align="center"
              prop="picture"
              label="物品照片">
              <template slot-scope="scope">
                <div :class="{'edit-no':!tableSettingData.goods.modifyAll}">
                  <div @click="showPictureList" class="photo-img"></div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              key="repair_price"
              align="center"
              width="140px"
              prop="repair_price"
              label="维修费用">
              <template slot-scope="scope">
                <div :class="{editable:tableSettingData.goods.modifyAll}">
                  <el-input :disabled="!tableSettingData.goods.modifyAll" clearable
                            v-model="scope.row.repair_price"></el-input>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              key="scrap_price"
              align="center"
              width="140px"
              prop="scrap_price"
              label="报废费用">
              <template slot-scope="scope">
                <div :class="{editable:tableSettingData.goods.modifyAll}">
                  <el-input align="center" :disabled="!tableSettingData.goods.modifyAll" clearable
                            v-model="scope.row.scrap_price"></el-input>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              key="username"
              align="center"
              width="140px"
              prop="username"
              label="领取人">
              <template slot-scope="scope">
                <div :class="{editable:tableSettingData.goods.modifyAll}">
                  <!--                  <div v-if="!tableSettingData.goods.modifyAll">{{scope.row.username}}</div>-->
                  <user-choose :disabled="!tableSettingData.goods.modifyAll" num="1" width="140" title="请选择人员"
                               v-model="scope.row.receive_user_id"></user-choose>
                </div>


              </template>
            </el-table-column>

            <el-table-column
              key="return_date"
              align="center"
              min-width="160px"
              prop="return_date"
              label="归还日期">
              <template slot-scope="scope">
                <div :class="{editable:tableSettingData.goods.modifyAll}">
                  <el-date-picker format="yyyy-MM-dd" :disabled="!tableSettingData.goods.modifyAll" style="width: 160px"
                                  v-model="scope.row.return_date" type="date"></el-date-picker>
                </div>


              </template>
            </el-table-column>

          </el-table>
          <footer class="flex-center common-page" style="bottom: 50px">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange($event,'goods')"
                :current-page="tableSettingData.goods.params.page"
                :page-size="tableSettingData.goods.params.limit"
                :total="tableSettingData.goods.counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>


      </div>
    </lj-dialog>

    <!--照片table-->
    <!--<lj-dialog
      :visible="tableSettingData.items.photo_table_dialog_visible"
      :size="{width: 850 + 'px',height: 800 + 'px'}"
      @close="tableSettingData.items.photo_table_dialog_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>照片/视频</h3>
          <div class="header_right">

          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.items.tableData"
            highlight-current-row
            :height="this.mainListHeight(200) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              key="receive_time"
              align="center"
              prop="receive_time"
              label="领取日期">
            </el-table-column>
            <el-table-column
              key="photo"
              align="center"
              prop="photo"
              label="领取照片">
              <template slot-scope="scope">
                <div @click="tableSettingData.items.is_show_photo_detail_dialog = true" class="photo-img" style="margin-left: 165px"></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </lj-dialog>-->


    <!--事项详情中图片展示dialog-->
    <lj-dialog
      :visible="tableSettingData.items.is_show_photo_detail_dialog"
      :size="{width: 700 + 'px',height: 550 + 'px'}"
      @close="tableSettingData.items.is_show_photo_detail_dialog = false"
    >
      <div class="dialog_container borrow-receive-dialog">
        <div class="dialog_header">
          <span class="notify-size">物品图片</span>
        </div>
        <div class="dialog_main  borrow-receive-img-dialog">
          <img-slider :ids="tableSettingData.borrowReceive.formData.receive_picture"></img-slider>
        </div>

      </div>
    </lj-dialog>


    <!--图片dialog-->
    <lj-dialog
      :visible="tableSettingData.goods.form.photo.is_show_photo_dialog"
      :size="{width: 650 + 'px',height: 350 + 'px'}"
      @close="tableSettingData.goods.form.photo.is_show_photo_dialog = false"
    >
      <div class="dialog_container borrow-receive-dialog">
        <div class="dialog_header">
          <!--          {{form}}-->
          <span class="notify-size">物品图片</span>
        </div>
        <div class="dialog_main  borrow-receive-img-dialog">
          <div class="repair-img-container">
            <lj-upload title="维修图片"
                       v-model="tableSettingData.goods.form.photo.formData.picture.repair_pic"></lj-upload>
            <lj-upload title="报废图片"
                       v-model="tableSettingData.goods.form.photo.formData.picture.scrap_pic"></lj-upload>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="savePictureList">确定</el-button>
          <el-button size="small" type="info" @click="tableSettingData.goods.form.photo.is_show_photo_dialog = false">
            取消
          </el-button>
        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import _ from 'lodash';
  import utils from '../../../../utils/myUtils';
  import LjDialog from '../../../common/lj-dialog.vue';
  //import Upload from '../../../common/upload.vue';
  import ImgSlider from '../../../common/lightweightComponents/ImgSlider';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import LjDialogImg from '../components/lj-dialog-img';//用于显示图片
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';


  export default {
    name: "index",
    props: ['searchVal', 'in_repository_visible'],
    components: {
      LjDialog,
      LjDialogImg,
      //Upload,
      LjUpload,
      DropdownList,
      UserChoose,
      ImgSlider,
    },
    data() {
      return {
        DROPDOWN_CONSTANT,
        url: globalConfig.humanResource_server,
        //checkList: [],

        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
          org_id: '',
          position_id: '',
        },

        currentTable: '',
        tableSettingData: {
          borrowReceive: {//借/领table列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            tableShowData: {},
            searchParams: '',// dialog中的模糊搜索
          },
          items: {
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            tableShowData: {
              name: '物品名称',//物品名称
              count_num: '申领数量',//申领数量
              unclaimed_num: '待领数量',//待领数量
            },
            searchParams: '',// dialog中的模糊搜索

            //photo_table_dialog_visible: false,
            is_show_photo_detail_dialog: false,
            photo_detail_arr: [21321, 213, 4224740],//要显示的图片数组
          },
          photo: {},//照片
          goods: {//物品详情列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,

            },
            init() {
              this.params.page = 1;
              this.params.limit = 5;
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//table表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData: {},//详情表格数据
            tableShowData: {},
            searchParams: '',// dialog中的模糊搜索

            form: {
              photo: {
                is_show_photo_dialog: false,//是否显示图片
                formData: {
                  picture: {
                    repair_pic: [],
                    scrap_pic: [],
                  }
                }
              }
            },

            showSaveCancel: false,
            modifyAll: false,//修改详情
            batchSetUser: false,//批量设置领取人
            batchSetReturnDate: false,//批量设置归还日期
            is_show_selection: false,//是否显示多选框

            multipleSelection: [],
            batchUser: [],
            batchReturnDate: '',
          },
        },

        /*
            *表单群组  begin
        */

        is_notify_visible: false,
        is_notify_form: {
          user_id: 0,//要发送人的姓名
          id: 0,//流程id
        },

        chooseDetailTabs: 1,//1事项详情 2物品详情
        /*
            *表单群组  end
        */


      }
    },
    mounted() {
      this.getBorrowReceiveList();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
        },
        deep: true
      },
      in_repository_visible: {
        handler(val, oldVal) {
          this.in_repository = !this.in_repository;
        },
      },
    },
    computed: {},
    methods: {

      //发送领取通知
      sendReceiveNotify() {
        let id = this.is_notify_form.id;
        let user_id = this.is_notify_form.user_id;
        if(user_id.constructor==Array) {
          user_id = user_id[0];
        }
        let params = {user_id: user_id};
        this.$http.get(`${this.url}/eam/process/${id}/todo`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: '发送成功',
            });
            this.is_notify_visible = false;
            this.getBorrowReceiveList();
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: '发送失败',
            });
          }
        });
      },

      setPerson(row) {
        console.log(row);
        this.is_notify_visible = true;
        this.is_notify_form.user_id = row.user_id;
        this.is_notify_form.id = row.id;//流程id
      },

      //获取借用领用详情list
      getBorrowReceiveList() {
        this.currentTable = 'borrowReceive';
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(this.url + 'eam/process', this.tableSettingData[this.currentTable].params).then(res => {
          console.log(res);
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                approvalId: item.process_number || '-',//审批编号
                counts: item.number || 0,//领/借数量
                applyType: item.type == 1 ? '领用' : '借用',//申请类型
                applyPerson: item.user?.name || '-',//申请人
                department: item.user?.org[0]?.name || '-',//部门
                applyTime: item.apply_time || '-',//申请日期
                //applyStatus: DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RECEIVE_RETURN_STATUS[item.apply_status],//申请状态
                applyStatus: _.find(DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RECEIVE_RETURN_STATUS, (o)=> {return o.id==item.apply_status})?.name || '-',//申请状态
                //goodsStatus: DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.GOODS_STATUS[item.goods_status],//物品状态
                goodsStatus: _.find(DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.GOODS_STATUS, (o)=> {return o.id==item.goods_status})?.name || '-',//物品状态
                repairPrice: item.repair_price || 0,//维修总费用
                scrapPrice: item.scrap_price || 0,//报废总费用
                //responsibleType: DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RESPONSIBLE[item.responsible?.type] || '-',//任责人类型
                responsibleType: _.find(DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.RESPONSIBLE, (o)=> {return o.id==item.responsible?.type})?.name || '-',//任责人类型
                responsibleName: item.responsible?.responsible_info?.name || '-',//任责人
                //costType: item.responsible?.payment_type||0//付款类型-结算方式
                //costType: DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.PAYMENT[item.responsible?.payment_type || 0],//付款类型-结算方式
                costType: _.find(DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.PAYMENT, (o)=> {return o.id==item.responsible?.payment_type})?.name || '-',//付款类型-结算方式
                receive_picture: item.receive_picture || [],
                user_id: item.user_id,
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取事项详情list
      getItemsDetailList() {
        let ids = this.tableSettingData.borrowReceive.currentSelection.id;
        this.currentTable = 'items';
        this.chooseDetailTabs = 1;
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(`${this.url}/eam/process/${ids}/collection`, this.tableSettingData[this.currentTable].params).then(res => {
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                name: item.goods?.name || '-',//物品名称
                count_num: item.count_num || 0,//总数量
                unclaimed_num: item.unclaimed_num || 0,//待领数量
                receive_time: item.receive_time || '-',//领取时间
                picture: item.picture,//图片
              }
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        });
      },

      //获取物品详情list
      getGoodsDetailList() {
        let ids = this.tableSettingData.borrowReceive.currentSelection.id;
        this.chooseDetailTabs = 2;
        this.currentTable = 'goods';
        this.tableSettingData[this.currentTable].tableData = [];//清空上次数据
        this.$http.get(`${this.url}eam/process/${ids}/goods`, this.tableSettingData[this.currentTable].params).then(res => {
          console.log(res);
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,//物品id
                name: item.goods?.name || '',//物品名称
                status: item.status || 0,//领还状态
                category_id: item.category_id || 0,//物品id
                receive_time: utils.formatDate(item.receive_time) || '-',//领取日期
                goods_number: item.goods_number || '-',//物品编号
                goods_status: item.goods_status || 0,//物品状态
                picture: item.picture,//图片
                repair_price: item.repair_price || 0,//维修费用
                scrap_price: item.scrap_price || 0,//报废费用
                username: item.user?.name || '-',//领取人name
                receive_user_id: item.user_id,//领取人id
                return_date: item.return_date,//归还日期
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },


      //打开照片dialog
      showPictureList() {
        let _this = this;
        setTimeout(() => {
          //let shorts = this.tableSettingData.goods.form.photo;
          _this.tableSettingData.goods.form.photo.is_show_photo_dialog = true;
          _this.tableSettingData.goods.form.photo.formData = this.tableSettingData.goods.currentSelection;
        }, 100);
      },

      //保存照片
      savePictureList() {
        let ids = this.tableSettingData.borrowReceive.currentSelection.id;
        let form = this.tableSettingData.goods.form.photo.formData;
        let params = {
          goods: [form]
        }
        this.$http.put(`${this.url}/eam/process/${ids}`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: '添加照片成功',
            });
            this.tableSettingData.goods.form.photo.is_show_photo_dialog = false;
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: '添加照片失败',
            })
          }
        });
      },

      //修改详情
      modifyDetail() {
        //this.is_show_selection = true;
        let control = this.tableSettingData.goods;
        control.modifyAll = true;
        control.showSaveCancel = true;
      },

      btnCancel() {
        let control = this.tableSettingData.goods;
        control.showSaveCancel = false;
        control.is_show_selection = false;
        control.modifyAll = false;
        control.batchSetUser = false;
        control.batchSetReturnDate = false;
        control.multipleSelection = [];
        control.batchUser = [];
        control.batchReturnDate = '';
      },

      //保存
      btnSave() {
        debugger
        //is_show_selection = false;batch_set_return_time_visible = false;batch_set_receive_person_visible = false
        let ids = this.tableSettingData.borrowReceive.currentSelection.id;
        let control = this.tableSettingData.goods;
        if (control.modifyAll) {//批量修改
          let postArr = this.tableSettingData.goods.tableData;//要修改的数据
          for (let item of postArr) {
            delete item['receive_time'];
            debugger
            item['receive_user_id'] = item['receive_user_id'].constructor === Array ? item['receive_user_id'][0] : item['receive_user_id'];
            debugger
            item['return_date'] = utils.formatDate(item['return_date']);
            // item['return_date'] =item['return_date']?utils.formatDate(item['return_date']):item['return_date'];
            let params = {goods: [item]};
            this.$http.put(`${this.url}/eam/process/${ids}`, params).then(res => {
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg
                });
                control.showSaveCancel = false;
                control.modifyAll = false;
              }
            });
          }
        }
        if (control.batchSetUser) {
          if (!control.batchUser || control.batchUser.length == 0) {
            this.$LjMessage('warning', {
              title: '警告',
              msg: '请设置领取人',
            });
            return;
          }
          let multiRows = control.multipleSelection;
          if(!multiRows || multiRows.length==0) {
            this.$LjMessage('warning',{
              title:'警告',
              msg:'请至少选择一项',
            });
            return;
          }
          if (multiRows&&multiRows.length>0) {
            for (let myItem of multiRows) {
              myItem['receive_user_id'] = control.batchUser[0];
              let params = {goods: [myItem]};
              this.$http.put(`${this.url}/eam/process/${ids}`, params).then(res => {
                if (res.code.endsWith('0')) {
                  this.$LjNotify('success', {
                    title: '成功',
                    message: '修改成功'
                  });
                  control.showSaveCancel = false;
                  control.batchSetUser = false;
                  control.is_show_selection = false;
                }
              });
            }
          }
        }
        if (control.batchSetReturnDate) {
          if (!control.batchReturnDate) {
            this.$LjNotify('error', {
              title: '失败',
              message: '请设置归还日期',
            });
            return;
          }
          let returnDateMultiRows = control.multipleSelection;
          if (returnDateMultiRows) {
            for (let returnDateItem of returnDateMultiRows) {
              returnDateItem['return_date'] = utils.formatDate(control.batchReturnDate);
              let params = {goods: [returnDateItem]};
              this.$http.put(`${this.url}/eam/process/${ids}`, params).then(res => {
                if (res.code.endsWith('0')) {
                  this.$LjNotify('success', {
                    title: '成功',
                    message: '修改成功'
                  });
                  control.showSaveCancel = false;
                  control.batchSetReturnDate = false;
                  control.is_show_selection = false;
                }
              });
            }
          }
        }

      },

      //批量设置领取人
      batchSetReceivePerson() {
        let control = this.tableSettingData.goods;
        control.showSaveCancel = true;
        control.batchSetUser = true;
        control.is_show_selection = true;

        //this.is_show_selection = true;
        //this.batch_set_receive_person_visible = true
      },

      //批量设置归还日期
      batchSetReturnDate() {
        let control = this.tableSettingData.goods;
        control.showSaveCancel = true;
        control.batchSetReturnDate = true;
        control.is_show_selection = true;
      },


      handleSelectionChange(row) {
        this.tableSettingData.goods.multipleSelection = row;
      },


      // 当前点击
      tableClickRow(row) {
        this.tableSettingData[this.currentTable].currentSelection = row;
        let ids = this.tableSettingData[this.currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row, currentTable) {
        if (currentTable) {
          switch (currentTable) {
            case 'borrowReceive':
              this.tableSettingData[currentTable].table_dialog_visible = true;
              this.tableSettingData[currentTable].formData = row;
              this.tableSettingData[currentTable].currentSelection = row;
              this.getItemsDetailList();
              break;
          }
        }
      },

      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val, currentTable) {
        switch (currentTable) {
          case 'borrowReceive':
            this.params.page = val;
            this.getBorrowReceiveList();
            break;
          case 'goods':
            this.tableSettingData[currentTable].params.page = val;
            this.getGoodsDetailList();
            break;
          default :
            break;
        }
      }
    },
  }
</script>

<style lang="scss">
  #theme_name.theme1 .el-table tbody tr.current-row td #userChoose {
    color: #000000 !important;
  }

  #theme_name.theme1 .el-table tbody tr:hover td #userChoose {
    color: #000000 !important;
  }

  .goods-detail {
    .el-input__inner {
      text-align: center !important;
      //height: 30px !important;
    }

    .button-group {
      .el-input {
        display: inline-block;
      }

      .el-input__inner {
        border: 1px solid #ccc !important;
        //height: 30px !important;
      }

      .batch-user {
        .el-input__inner {
          border: none;
          height: 30px !important;
          background-color: #F9F9F9;
        }
      }

    }

    #userChoose .el-table tbody tr.current-row td {
      color: #000 !important;
    }
  }

  #goods_detail {

    .edit-no {
      pointer-events: none;
      cursor: not-allowed !important;
    }

    .editable {
      .el-input__inner {
        background-color: #F9F9F9 !important;
      }
    }
  }
</style>


<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/repository/borrowReceive/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/repository/borrowReceive/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #borrowReceive {
      .photo-img {
        @include childrenImg('tp.png', 'theme1')
      }

      .dialog_container {
        .goods-detail {
          .icons-ry {
            @include childrenImg('ry.png', 'theme1')
          }
        }

        .detail-bottom {
          .detail-item {

            .tp {
              @include childrenImg('tp.png', 'theme1')
            }
          }

        }

        .dialog-sidebar {
          .sidebar-bg-checked {
            @include childrenImg('sxxq.png', 'theme1')
          }

          .sidebar-bg {
            @include childrenImg('wpxq.png', 'theme1')
          }
        }

        //图片dialog
        .borrow-receive-img-dialog {
          .icons-img {
            @include childrenImg('tp.png', 'theme1')
          }

          .icons-add {
            @include childrenImg('tj.png', 'theme1')
          }
        }
      }

      /*.photo-img {
        @include childrenImg('celw.png', 'theme1')
      }

      .photo-container {
        .photo-img-large {
          @include childrenImg('celw.png', 'theme1')
        }

      }*/

    }
  }

  #theme_name.theme2 {
    #borrowReceive {

    }
  }

  #theme_name.theme3 {
    #borrowReceive {

    }
  }

  #theme_name.theme4 {
    #borrowReceive {

    }
  }
</style>
