<template>
  <div id="customer">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>客户管理</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="landLordData"
        :height="this.mainListHeight(30) + 'px'"
      >
        <el-table-column label="生成时间" prop="create_time" align="center"></el-table-column>
        <el-table-column label="房屋地址" prop="address" align="center"></el-table-column>
        <el-table-column label="客户姓名" prop="customer_name" align="center"></el-table-column>
        <el-table-column label="手机号" prop="contact" align="center"></el-table-column>
        <el-table-column label="收房月数" prop="months" align="center"></el-table-column>
        <el-table-column label="付款方式" prop="" align="center"></el-table-column>
        <el-table-column label="月单价" prop="prices" align="center"></el-table-column>
        <el-table-column label="待签约日期" prop="" align="center"></el-table-column>
        <el-table-column label="第一次打房租日期" prop="first_pay_date" align="center"></el-table-column>
        <el-table-column label="客户付款方式" prop="" align="center"></el-table-column>
        <el-table-column label="账号" prop="account_num" align="center"></el-table-column>
        <el-table-column label="签约人" prop="" align="center"></el-table-column>
        <el-table-column label="状态" prop="" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" align="center">
          <template slot-scope="scope">
            <el-button type="danger" plain size="mini" @click="handleDeleteLand(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="landLordCount"
            layout="total,jumper,prev,pager,next"
            :current-page="params.page"
            :page-size="params.limit"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>
    </div>


    <!--删除-->
    <lj-dialog
      :visible="delete_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="delete_visible = false"
    >
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

  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: {LjDialog},
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
        landLordData: [],
        landLordCount: 0,

        showFinMenuList: false,

        selects: [
          {
            id: 1,
            title: '房东',
          },
          {
            id: 2,
            title: '租客',
          }
        ],
        chooseTab: 1,

        delete_visible: false,

        current_row: '',
      }
    },
    mounted() {
      this.getLandlordList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      callbackSuccess(res) {
        if (res.code === 200) {
          this.$notify.success({
            title: '成功',
            message: res.msg
          });
          this.getLandlordList();
        } else {
          this.$notify.warning({
            title: '失败',
            message: res.msg
          })
        }
      },
      handleOkDel() {
        this.$http.delete(globalConfig.temporary_server + `customer_collect/delete/${this.current_row.id}`).then(res => {
          this.callbackSuccess(res);
          this.delete_visible = false;
          this.current_row = '';
        }).catch(err => {
          console.log(err);
        })
      },
      handleDeleteLand(row) {
        this.current_row = row;
        this.delete_visible = true;
      },
      handleChangePage(page) {
        this.params.page = page;
        this.getLandlordList();
      },
      getLandlordList() {
        this.$http.get(globalConfig.temporary_server + 'customer_collect', this.params).then(res => {
          if (res.code === 200) {
            this.landLordData = res.data.data;
            this.landLordCount = res.data.count;
          } else {
            this.landLordData = [];
            this.landLordCount = 0;
          }
        }).catch(err => {
          console.log(err);
        })
      },

      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
      },
      highSearch() {

      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
