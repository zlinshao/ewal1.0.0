<template>
  <div id="lord">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="renterLists"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>

        <el-table-column label="前缀" align="center">
          <template slot-scope="scope">
            <div class="statusBar flex-center">
              <span v-if="renterStatusList[scope.$index].is_contact===1" style="background-color: #14e731;"></span>
              <span v-if="renterStatusList[scope.$index].is_name===1" style="background-color: #e6a23c;"></span>
              <span v-if="renterStatusList[scope.$index].is_address===2" style="background-color: #f56c6c;"></span>
              <span v-if="renterStatusList[scope.$index].suppress_dup===0" style="background-color: #409eff;"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in Object.keys(renterLabel)"
          :label="renterLabel[item]" :key="item"
          :prop="item"
          align="center">
        </el-table-column>

        <el-table-column label="状态" prop="" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="" align="center" width="500">
          <template slot-scope="scope">
            <el-button type="success" plain size="small" @click="handleDetailsLord(scope.row,scope.$index)"
                       icon="el-icon-view">详情
            </el-button>
            <el-button type="primary" plain size="small" @click="handleEditLord(scope.row,scope.$index)"
                       icon="el-icon-edit">编辑
            </el-button>
            <el-button type="warning" plain size="small" @click="handleProcessLord(scope.row)" icon="el-icon-info">
              生成待处理项
            </el-button>
            <el-button type="danger" plain size="small" @click="handleDeleteLord(scope.row)" icon="el-icon-delete">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="renterCount"
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
</template>

<script>

  import LjDialog from '../../../common/lj-dialog.vue';
  import LjSubject from '../../../common/lj-subject.vue';

  export default {
    name: "index",
    components: {LjDialog,LjSubject},
    data() {
      return {
        params: {
          search: '',
          startRange: '',
          endRange: '',
          page: 1,
          limit: 12,
          department_ids: '',
          export: '',
        },
        delete_visible:false,//删除
        edit_visible:false,//编辑
        details_visible:false,//详情

        renterLists:[],
        renterLabel:{
          "create_time":"生成时间",
          "address":"房屋地址",
          "customer_name":"客户姓名",
          "contact":"客户手机号",
          "months":"租房月数",
          "pay_types":"付款方式",
          "prices":"月单价",
          // "prices":"租房类型",
          // "prices":"租房状态",
          "deal_date":"待签约日期",
        },
        renterCount:0,
        renterIds:[],
        renterStatus:{
          is_address:1,
          is_contact:2,
          is_name:1,
          suppress_dup:0
        },
        renterStatusList:[
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
          { address: "新月饭店4-4-4", contact: "18949949837", create_time: "2019-02-21 18:05:20", customer_name: "嬴政", delete_time: null, id: 16314, is_address: 2, is_contact: 1, is_name: 2, suppress_dup: 0, update_time: "2019-02-21 18:05:20"},
        ],



      }
    },
    mounted() {
      this.getRenterList();

    },
    activated() {

    },
    watch: {

    },
    created(){

    },
    computed: {

    },
    methods: {
      handleChangePage(page) {
        this.params.page = page;
        this.getRenterList();
      },
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$LjNotify('success',{
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getRenterList();
        } else {
          this.$LjNotify('error',{
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },
      getRenterList() {
        this.showLoading(true);
        this.$http.get(globalConfig.temporary_server + 'customer_renter', this.params).then(res => {
          if (res.code === 200) {
            this.showLoading(false);
            this.renterLists = JSON.parse(JSON.stringify(res.data.data));
            this.renterCount = res.data.count;
          } else {
            this.renterLists = [];
            this.renterCount = 0;
          }
        }).then(()=>{
          for (let item of this.renterLists) {
            this.renterIds.push(item.id)
          }
          this.$http.get(globalConfig.temporary_server + 'customer_renter_repeat', {id: this.renterIds}).then(res => {
            if (res.code === 200) {
                  // console.log(res.data.data);
                  // this.renterStatusList = res.data.data;
                  // console.log(this.renterStatusList);


            }
          })
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/finance/customer/index.scss";

  #theme_name.theme1 {
    #customer {
      .statusBar {
        span {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-left: 4px;
        }
      }

    }
  }
</style>
