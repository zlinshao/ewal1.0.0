<template>
  <div id="borrowReceive">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableSettingData.borrowReceive.tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        @row-dblclick="tableDblClick"
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
              <el-tag @click="is_notify_visible = true" size="medium">{{ scope.row.applyStatus }}</el-tag>
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
              <user-choose title="请选择人员" v-model="is_notify_form.name" width="200" num="1"></user-choose>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info" @click="is_notify_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--借用领用详情table-->
    <lj-dialog
      :visible="borrow_receive_table_visible"
      :size="{width: 1250 + 'px',height: 700 + 'px'}"
      @close="borrow_receive_table_visible = false"
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
          <div @click="chooseDetailTabs = 1" :class="chooseDetailTabs==1?'sidebar-bg-checked':'sidebar-bg'">
            <span>事项详情</span>
          </div>
          <div @click="getGoodsDetailList(tableSettingData[currentTable].currentSelection)" :class="chooseDetailTabs==2?'sidebar-bg-checked':'sidebar-bg'">
            <span>物品详情</span>
          </div>
        </div>
        <div v-if="chooseDetailTabs == 1" class="event-detail dialog_main borderNone">
          <el-table
            :data="eventsDetailData"
            highlight-current-row
            :height="this.mainListHeight(240) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(eventsDetailShowData)" :key="item"
              align="center"
              :prop="item"
              :label="eventsDetailShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page" style="bottom: 150px">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="params.limit"
                :total="counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
          <div class="detail-bottom-container">
            <div class="detail-bottom">
              <div class="detail-item" style="position: relative">
                <span style="position: absolute;right: 95px">照片/视频</span>
                <div @click="photo_table_visible = true" class="icons tp"></div>
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

        <div v-if="chooseDetailTabs == 2" class="goods-detail dialog_main borderNone">
          <div class="search-toolbar">
            <div v-show="!is_show_selection">
              <div>
                <el-tag @click="is_show_selection = true; batch_set_return_time_visible = true" size="medium">批量设置归还日期
                </el-tag>
              </div>

              <div>
                <el-tag @click="is_show_selection = true;batch_set_receive_person_visible = true" size="medium">
                  批量设置领取人
                </el-tag>
              </div>

              <div>
                <el-tag @click="is_show_selection = true" size="medium">修改详情</el-tag>
              </div>
            </div>

            <div v-show="is_show_selection" class="button-group">
              <div
                @click="is_show_selection = false;batch_set_return_time_visible = false;batch_set_receive_person_visible =false;">
                取消
              </div>
              <div
                @click="is_show_selection = false;batch_set_return_time_visible = false;batch_set_receive_person_visible = false">
                保存
              </div>
              <!--批量设置归还日期-->
              <div v-show="batch_set_return_time_visible" style="width: 160px">
                <el-date-picker
                  size="mini"
                  placeholder="点击选择归还日期"
                  type="date">
                </el-date-picker>
              </div>
              <!--批量设置领取人-->
              <div class="batch-set-receive-person" v-show="batch_set_receive_person_visible" style="width: 170px">
                <el-input
                  size="mini"
                  placeholder="点击选择领取人/部门">
                </el-input>
                <div class="icons-ry"></div>
              </div>

            </div>


          </div>
          <el-table
            :data="tableSettingData.goods.tableData"
            highlight-current-row
            :height="this.mainListHeight(280) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <!--<el-table-column-->
            <!--v-for="item in Object.keys(goodsDetailShowData)" :key="item"-->
            <!--align="center"-->
            <!--:prop="item"-->
            <!--:label="goodsDetailShowData[item]">-->
            <!--</el-table-column>-->
            <el-table-column v-if="false"
                             type="selection"
                             width="55">
            </el-table-column>
            <el-table-column
              key="goodsName"
              align="center"
              prop="goodsName"
              label="物品名称">
            </el-table-column>

            <el-table-column
              key="borrowReceiveStatus"
              align="center"
              prop="borrowReceiveStatus"
              label="领/还状态">
            </el-table-column>

            <el-table-column
              key="receiveTime"
              align="center"
              prop="receiveTime"
              label="领取日期">
            </el-table-column>

            <el-table-column
              width="140px"
              key="goodsId"
              align="center"
              prop="goodsId"
              label="物品编号">
            </el-table-column>

            <el-table-column
              key="goodsStatus"
              align="center"
              prop="goodsStatus"
              label="物品状态">
            </el-table-column>

            <el-table-column
              key="goodsImg"
              align="center"
              prop="goodsImg"
              label="物品照片">
              <template slot-scope="scope">
                <div @click="showPictureList" class="photo-img"></div>
              </template>
            </el-table-column>

            <el-table-column
              key="repairCost"
              align="center"
              prop="repairCost"
              label="维修费用">
            </el-table-column>

            <el-table-column
              key="scrapCost"
              align="center"
              prop="scrapCost"
              label="报废费用">
            </el-table-column>

            <el-table-column
              key="receivePerson"
              align="center"
              prop="receivePerson"
              label="领取人">
            </el-table-column>

            <el-table-column
              key="returnTime"
              align="center"
              prop="returnTime"
              label="归还日期">
            </el-table-column>

          </el-table>
          <footer class="flex-center common-page" style="bottom: 50px">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
    <lj-dialog
      :visible="photo_table_visible"
      :size="{width: 850 + 'px',height: 800 + 'px'}"
      @close="photo_table_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>照片/视频</h3>
          <div class="header_right">

          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="photoData"
            highlight-current-row
            :height="this.mainListHeight(200) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              key="receiveTime"
              align="center"
              prop="receiveTime"
              label="领取日期">
            </el-table-column>
            <el-table-column
              key="photo"
              align="center"
              prop="photo"
              label="领取照片">
              <template slot-scope="scope">
                <div @click="is_show_photo_dialog = true" class="photo-img" style="margin-left: 165px"></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </lj-dialog>


    <!--//是否显示图片-->
    <!--<lj-dialog-img v-model="is_show_photo_dialog">-->
    <!--<div class="photo-container">-->
    <!--<div class="photo-img-large"></div>-->
    <!--<div>201903191059</div>-->
    <!--</div>-->

    <!--</lj-dialog-img>-->


    <!--图片dialog-->
    <lj-dialog
      :visible="is_show_photo_dialog"
      :size="{width: 450 + 'px',height: 350 + 'px'}"
      @close="is_show_photo_dialog = false"
    >
      <div class="dialog_container borrow-receive-dialog">
        <div class="dialog_header">
<!--          {{form}}-->
          <span class="notify-size">物品图片</span>
        </div>
        <div class="dialog_main  borrow-receive-img-dialog">
          <div class="repair-img-container" v-for="item in photo">
            <span>{{item.title}}</span>
            <Upload :file="item" @success="getImgIds"></Upload>
          </div>
          <!--<div class="repair-img-container">-->
          <!--<span>维修照片</span>-->
          <!--&lt;!&ndash;<div class="icons-img"></div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="icons-img"></div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="icons-add"></div>&ndash;&gt;-->
          <!--<Upload :file="item" @success="getImgIds"></Upload>-->
          <!--</div>-->
          <!--<div class="scrap-img-container">-->
          <!--<Upload :file="item" @success="getImgIds"></Upload>-->
          <!--&lt;!&ndash;<span>报废照片</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="icons-add"></div>&ndash;&gt;-->
          <!--</div>-->
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info" @click="is_show_photo_dialog = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import Upload from '../../../common/upload.vue';
  import LjDialogImg from '../components/lj-dialog-img';//用于显示图片
  import UserChoose from '../../../common/lightweightComponents/UserChoose';


  export default {
    name: "index",
    props: ['searchVal', 'in_repository_visible'],
    components: {
      LjDialog,
      LjDialogImg,
      Upload,
      UserChoose,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        checkList: [],

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
              init() {
                this.page = 1;
                this.limit = 5;
              }
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData:[],//详情表格数据
            tableShowData: {},
            searchParams: '',// dialog中的模糊搜索


            applyStatus: ['待通知', '待领取', '部分已领取', '已领取', '放弃领取', '待归还', '部分已归还', '已归还'],
            goodsStatus: ['无', '待维修', '维修中', '已维修', '报废'],
            responsible: ['','个人','部门','公司']
          },
          goods: {//物品详情列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,
              init() {
                this.page = 1;
                this.limit = 5;
              }
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            formData:[],//详情表格数据
            tableShowData: {},
            searchParams: '',// dialog中的模糊搜索


            applyStatus: ['待通知', '待领取', '部分已领取', '已领取', '放弃领取', '待归还', '部分已归还', '已归还'],
            goodsStatus: ['无', '待维修', '维修中', '已维修', '报废'],
            responsible: ['','个人','部门','公司']
          },
        },


        form: {
          photo1: [],
          photo2: [],
        },

        photo: [
          {
            title: '报备图片',
            keyName: 'photo1',
            setFile: [
              {
                "id": 123,
                "name": "lejia7f87dea5d2f218312028484e56211173.jpg",
                "display_name": "lejia7f87dea5d2f218312028484e56211173.jpg",
                "raw_name": "lejia7f87dea5d2f218312028484e56211173.jpg",
                "info": {
                  "ext": "image\/jpeg",
                  "host": "static.lejias.cn",
                  "mime": "image\/jpeg",
                  "size": 51251,
                  "bucket": "lejia-test"
                },
                "currentPlace": null,
                "user_id": null,
                "uri": "http:\/\/static.lejias.cn\/lejia7f87dea5d2f218312028484e56211173.jpg",
                "created_at": "2019-03-21 11:32:02",
                "updated_at": "2019-03-21 11:32:02",
                "deleted_at": null
              },
              {
                "id": 213,
                "name": "lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
                "display_name": "lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
                "raw_name": "lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
                "info": {
                  "ext": "image\/jpeg",
                  "host": "static.lejias.cn",
                  "mime": "image\/jpeg",
                  "size": 400542,
                  "bucket": "lejia-test"
                },
                "currentPlace": null,
                "user_id": null,
                "uri": "http:\/\/static.lejias.cn\/lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
                "created_at": "2019-03-21 20:04:42",
                "updated_at": "2019-03-21 20:04:42",
                "deleted_at": null
              }
            ],
            size: {
              width: '60px',
              height: '60px'
            }
          }, {
            title: '维修图片',
            keyName: 'photo2',
            setFile: [],
            size: {
              width: '60px',
              height: '60px'
            }
          }
        ],
        /*
            *表单群组  begin
        */

        is_notify_visible: false,
        is_notify_form: {
          name: '张三丰',//要发送人的姓名
        },

        chooseDetailTabs: 1,//1事项详情 2物品详情

        //借/领用详情table  -->1事项详情
        borrow_receive_table_visible: false,
        eventsDetailData: [],
        eventsDetailShowData: {
          goodsName: '物品名称',//物品名称
          applyCounts: '申领数量',//申领数量
          receiveCounts: '代领数量',//代领数量
        },

        //借/领用详情table  -->2物品详情
        goodsDetailData: [],

        is_show_selection: false,//是否显示多选框
        batch_set_return_time_visible: false,//批量设置归还日期
        batch_set_receive_person_visible: false,//批量设置领取人

        //照片table
        photo_table_visible: false,
        photoData: [],//照片table数据

        is_show_photo_dialog: false,//是否显示图片


        /*
            *表单群组  end
        */


      }
    },
    mounted() {
      this.initData();
      this.getBorrowReceiveList();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getRewardUpList();
        },
        deep: true
      },
      in_repository_visible: {
        handler(val, oldVal) {
          //console.log(val,oldVal);
          this.in_repository = !this.in_repository;
        },
        //deep:true,
        //immediate:true//第一次绑定也执行
      },
    },
    computed: {},
    methods: {
      getImgIds(val) {
        this.form[val[0]] = val[1];
        console.log(val);
      },
      initData() {
        //借用领用表格

       /* for (let i = 0; i < 9; i++) {
          let as = Math.random() * 10 > 3 ? "待通知" : Math.random() * 10 > 6 ? "待领取" : "部分领取";
          let obj = {
            id: i + 1,
            approvalId: 20190319 + i,
            counts: 10 + i,
            applyType: '领用',
            applyPerson: '张三',
            department: '部门',
            applyTime: '2019-03-19',
            applyStatus: as,
            goodsStatus: '部分维修'
          }
          this.tableSettingData.borrowReceive.tableData.push(obj)
        }
        //console.log(this.tableData);
        this.tableSettingData.borrowReceive.counts = 1000;*/

        //eventsDetailData
        //借领用详情table数据初始化 1事项详情
        for (let i = 0; i < 5; i++) {
          let obj = {
            id: i + 1,
            goodsName: 'LG-显示器',//物品名称
            applyCounts: '20',//申领数量
            receiveCounts: '15',//代领数量
          }
          this.eventsDetailData.push(obj)
        }

        /*//goodsDetailData
        //借领用详情table数据初始化 2物品详情
        for (let i = 0; i < 5; i++) {
          let obj = {
            id: i + 1,
            goodsName: 'LG-显示器',//物品名称
            borrowReceiveStatus: '待领取',//领/还状态
            receiveTime: '2019-03-20',//领取日期
            goodsId: '20190320100745',//物品编号
            goodsStatus: '无',//物品状态
            goodsImg: 'img',//物品照片
            repairCost: '无',//维修费用
            scrapCost: '无',//报废费用
            receivePerson: '张三',//领取人
            returnTime: '--',//归还日期
          }
          this.tableSettingData.goods.tableData.push(obj)
        }*/


        //photoData
        //照片表格数据初始化
        for (let i = 0; i < 7; i++) {
          let obj = {
            id: i + 1,
            receiveTime: '20190319091956',
            photo: '领取照片',
          }
          this.photoData.push(obj)
        }


      },

      getBorrowReceiveList() {
        this.currentTable = 'borrowReceive';
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
                applyStatus: this.tableSettingData[this.currentTable].applyStatus[item.apply_status],//申请状态
                goodsStatus: this.tableSettingData[this.currentTable].goodsStatus[item.goods_status],//物品状态
                repairPrice: item.repair_price||0,//维修总费用
                scrapPrice:item.scrap_price||0,//报废总费用
                responsibleType: this.tableSettingData[this.currentTable].responsible[item.responsible?.type],//任责人类型
                responsibleName: item.responsible?.name||'-',//任责人
                costType: item.costType||'-'//付款类型
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取事项详情list
      getItemsDetailList() {
        this.chooseDetailTabs = 1;
      },

      //获取物品详情list
      getGoodsDetailList(row) {
        debugger
        this.chooseDetailTabs = 2;
        this.currentTable = 'goods';
        this.$http.get(this.url + 'eam/process/'+row.id, this.tableSettingData[this.currentTable].params).then(res => {
          debugger
          console.log(res);
          if (res.code.endsWith('0')) {
            for (let item of res.data.goods_list) {
              //item = item.goods_list;
              let obj = {
                id: item.id,//物品id
                goodsName: item.goods?.name||'',//物品名称
                borrowReceiveStatus: this.tableSettingData.borrowReceive.applyStatus[item.status||0],//领还状态applyStatus
                receiveTime: item.receive_time||'-',//领取日期
                goodsId: item.goods_number||'-',//物品编号
                //goodsStatus:this.tableSettingData.borrowReceive.goodsStatus[item.status||0],
                goodsStatus:'尚无',
                goodsImg: item.picture,//图片
                repairCost: item.repair_cost||0,//维修费用
                scrapCost: item.scrap_cost||0,//报废费用
                receivePerson: item.user?.name||'-',//领取人
                returnTime: item.return_date||'-',//归还日期
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      showPictureList() {
        this.is_show_photo_dialog = true;

      },




      // 当前点击
      tableClickRow(row) {
        //debugger
        this.tableSettingData[this.currentTable].currentSelection = row;
        let ids = this.tableSettingData[this.currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row) {
        switch (this.currentTable) {
          case 'borrowReceive':
            this.borrow_receive_table_visible = true;
            this.tableSettingData[this.currentTable].formData = row;
            this.tableSettingData[this.currentTable].currentSelection = row;
            break;
        }

      },

      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getBorrowReceiveList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<!--<style>-->
<!--.ruzhu-mess .el-form-item__label{-->
<!--font-size:16px!important;-->
<!--}-->
<!--.zhuanye-mess .el-form-item__label,.zhuanye-mess .color-t{-->
<!--font-size:16px!important;-->
<!--color:#606266;-->
<!--}-->
<!--</style>-->

<style lang="scss">
  .goods-detail {
    .button-group {
      .el-input {
        display: inline-block;
      }

      .el-input__inner {
        border: 1px solid #ccc !important;
        //height: 30px !important;
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
