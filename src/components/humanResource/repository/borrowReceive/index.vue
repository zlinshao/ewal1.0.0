<template>
  <div id="borrowReceive">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
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
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
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
        <div class="dialog_main borderNone">
          <el-form :model="is_notify_form" style="text-align: left" size="small" label-width="160px">
            <el-form-item label="是否发送领取通知给">

              <div class="items-center iconInput">
                <el-input v-model="is_notify_form.name"></el-input>
                <div class="icons user"></div>
              </div>
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
      :size="{width: 1150 + 'px',height: 700 + 'px'}"
      @close="borrow_receive_table_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>编号SP00012 详情</h3>
          <div class="header_right">

            <div class="detail-container">
              <div class="detail-item">
                <span>审批编号</span>
                <span>SP00012</span>
              </div>
              <div class="detail-item">
                <span>申请人</span>
                <span>张无极</span>
              </div>
              <div class="detail-item">
                <span>部门</span>
                <span>研发中心-开发</span>
              </div>
              <div class="detail-item">
                <span>申请类型</span>
                <span>借用</span>
              </div>
              <div class="detail-item">
                <span>申请日期</span>
                <span>2019-01-12</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-sidebar">
          <div class="sidebar-top">
            <span>事项详情</span>
          </div>
          <div class="sidebar-bottom">
            <span class="gray">物品详情</span>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="borrowReceiveData"
            highlight-current-row
            :height="this.mainListHeight(240) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(borrowReceiveShowData)" :key="item"
              align="center"
              :prop="item"
              :label="borrowReceiveShowData[item]">
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
                <input type="text" disabled value="2000"></input>
                <span class="tip">元</span>
              </div>
              <div class="detail-item">
                <span>任责人</span>
                <select disabled>
                  <option value="1">个人</option>
                </select>
                <select disabled>
                  <option value="1">员工</option>
                </select>
              </div>
              <div class="detail-item" >
                <span>付款方式</span>
                <select disabled>
                  <option value="1">工资扣除</option>
                </select>
              </div>
            </div>
          </div>

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
                <div @click="is_show_photo = true" class="photo-img" style="margin-left: 140px"></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </lj-dialog>






















    //是否显示图片
    <lj-dialog-img v-model="is_show_photo">
      <div class="photo-container">
        <div class="photo-img-large"></div>
        <div>201903191059</div>
      </div>

    </lj-dialog-img>


  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjDialogImg from '../components/lj-dialog-img';//用于显示图片


  export default {
    name: "index",
    props: ['searchVal', 'in_repository_visible'],
    components: {
      LjDialog,
      LjDialogImg
    },
    data() {
      return {
        url: globalConfig.organ_server,
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

        /*
            *表单群组  begin
        */

        is_notify_visible: false,
        is_notify_form: {
          name: '张三丰',//要发送人的姓名
        },
        //借/领用详情table
        borrow_receive_table_visible: false,
        borrowReceiveData: [],
        borrowReceiveShowData: {
          goodsName: '物品名称',//物品名称
          applyCounts: '申领数量',//申领数量
          receiveCounts: '代领数量',//代领数量
        },

        //照片table
        photo_table_visible: false,
        photoData:[],//照片table数据

        is_show_photo: false,//是否显示图片



        /*
            *表单群组  end
        */

        /*
        *  表单群组  begin
        * */



        /*
        *  表单群组  end
        * */

      }
    },
    mounted() {
      this.initData();
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


      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },


      initData() {
        //借用领用表格

        for (let i = 0; i < 9; i++) {
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
          this.tableData.push(obj)
        }
        //console.log(this.tableData);
        this.counts = 1000;

        //borrowReceiveData
        //借领用详情table数据初始化
        for (let i = 0; i < 5; i++) {
          let as = Math.random() * 10 > 3 ? "待通知" : Math.random() * 10 > 6 ? "待领取" : "部分领取";
          let obj = {
            id: i + 1,
            goodsName: 'LG-显示器',//物品名称
            applyCounts: '20',//申领数量
            receiveCounts: '15',//代领数量
          }
          this.borrowReceiveData.push(obj)
        }

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

      getRewardUpList() {
        this.$http.get(this.url + 'borrowReceive/xxx', this.params).then(res => {
          this.tableData = res.data.data;
          this.counts = res.data.count;
        })
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row) {
        //console.log(row);
        this.borrow_receive_table_visible = true;
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
        this.getRewardUpList();
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
        .detail-bottom {
          .detail-item {

            .tp {
              @include childrenImg('tp.png','theme1')
            }
          }

        }

      .dialog-sidebar {
        .sidebar-top {
          @include childrenImg('sxxq.png','theme1')
        }
        .sidebar-bottom {
          @include childrenImg('wpxq.png','theme1')
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
