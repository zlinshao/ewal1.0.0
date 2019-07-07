<!--公司管理-->
<template>
  <div id="company">
    <div class="mainListTable"  :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-dblclick="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%">
        <div v-for="(item,index) in table_column" :key="index">
          <el-table-column v-if="item.key!='id'" :min-width="item.width" show-overflow-tooltip :label="item.val" :prop="item.key" :align="'center'"></el-table-column>
        </div>
        <el-table-column min-width="50" label="操作" align="'center'">
               <template slot-scope="scope">
              <el-button id='active-danger' plain size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
               </template>
          </el-table-column>
      </el-table>
      <!-- 确定删除 -->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete' />
      <!--新增、编辑公司-->
      <lj-dialog
              :visible="companyVisible"
              :size="{width: 600 + 'px',height: 800 + 'px'}"
              @close="companyVisible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>修改公司</h3>
          </div>
          <div class="dialog_main">
            <el-form size="small" style="text-align: left">
              <!-- <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">公司id</div>
                  <el-input v-model="companyDeatil.org_id"></el-input>
                </div>
              </el-form-item> -->
              <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">公司名称</div>
                  <el-input v-model="companyDeatil.name"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">公司链接</div>
                  <el-input v-model="companyDeatil.company_url"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">corpid</div>
                  <el-input v-model="companyDeatil.corp_id"></el-input>
                </div>
              </el-form-item>
           
             <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">agentid</div>
                  <el-input v-model="companyDeatil.agent_id"></el-input>
                </div>
              </el-form-item>
             <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">appid</div>
                  <el-input v-model="companyDeatil.app_id"></el-input>
                </div>
              </el-form-item>
              <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">appsecret</div>
                  <el-input v-model="companyDeatil.app_secret"></el-input>
                </div>
              </el-form-item>
             <el-form-item class="item_margin">
                <div class="flex" style="width: 80%">
                  <div style="width: 150px;text-align: right">公司配置文件</div>
                  <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 10}" v-model="companyDeatil.env"></el-input>
                </div>
              </el-form-item>
               </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleAddOrUpdateCompany">确定</el-button>
            <el-button type="info" size="small" @click="companyVisible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
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
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog';
  import DeleteDialog from '../../components/delete-dialog';
  export default {
    name: "index",
    props: ['searchVal','searchParams','isfresh'],
    components: {LjDialog, DeleteDialog},
    data() {
      return {
        url:globalConfig.humanResource_server,
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        companyVisible: false,
        delete_visible: false,
        table_column: [
          { key: 'id',val: 'id', width: "60px"},
          // { key: 'org_id',val: '公司id', width: "60px"},
          { key: 'envs',val: '公司配置文件',width: "150px"},
          { key: 'name',val: '公司名称', width: "60px"},
          { key: 'url',val: '公司链接',width: "80px"},
          { key: 'corp_id',val: 'corpid',width: "150px"},
          { key: 'agent_id',val: 'agentid',width: "150px"},
          { key: 'app_id',val: 'appid',width: "150px"},
          { key: 'app_secret',val: 'appsecret',width: "150px"},
          { key: 'created_at',val: '创建时间',width: "150px"},
        ],
        companyDeatil: {
          corp_id: '',
          org_id: '',
          name: '',
          company_url: '',
          agent_id: '',
          app_id: '',
          app_secret: '',
          env: '',
        },
        params: {
          search: '',
          page: 1,
          limit: 10,
        },
        //员工详情
        staff_detail_info: '',
        random_key: '',
        currentRow: ''
      }
    },
    mounted() {
      this.getStaffList();
    },
    activated() {
    },
    watch: {
      searchParams: {
        handler(val) {
          this.params = Object.assign({},this.params,val);
          this.getStaffList();
        },
        deep: true
      },
      isfresh: {
        handler(val, oldVal) {
         if(oldVal!==val && val){
          this.getStaffList();
         }
        },
        deep: true
      },
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getStaffList();
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      //获取公司列表
      getStaffList() {
        if(!this.validatePermission('Company-Management')) return;
        this.showLoading(true);
        this.params.limit=10;
        this.$http.get(this.url+'organization/company', this.params).then(res => {
          this.showLoading(false)
          if(res.code.endsWith('0')) {
            // res.data.data.forEach((item,index)=> {
            //   if(!item.is_on_job&&!item.is_enable) {
            //     item.on_job_status = 1;
            //   }else {
            //     item.on_job_status = 2;
            //   }
            // });
            this.tableData = res.data.data;
            this.counts = res.data.count;
          }else{
              this.tableData=[];
              this.counts=0;
          }

        })
      },
      //获取当前公司详情
      async getStaffDetail(id) {
        if(!this.validatePermission('Company-Management')) return;
        this.$http.get(`${this.url}organization/company/${id}`).then(res => {
          if (res.code === '20000') {
            this.companyDeatil = res.data;
            this.companyVisible = true;
          } else {
            this.companyDeatil = '';
            this.$LjNotify('warning',{
              title: '警告',
              message: '获取公司详情失败'
            });
            return false;
          }
        })
      },
      handleAddOrUpdateCompany(){
          // console.log('this.companyDeatil',this.companyDeatil);
          if(!this.validatePermission('Company-Management')) return;
          if(this.companyDeatil.name){
            this.$http.put(`${this.url}organization/company/${this.companyDeatil.id}`,this.companyDeatil).then(res => {
              
                if (res.code === '20000') {
                    this.$LjNotify('success',{
                        title: '成功',
                        message: res.msg
                    });
                     this.companyVisible = false;
                    this.getStaffList();
                }else {
                    this.$LjNotify('warning',{
                        title: '失败',
                        message: res.msg
                    });
                    return false;
                }
            }).catch(err => {
                console.log(err);
            })
          }else {
             this.$LjNotify('warning',{
                        title: '警告',
                        message: '公司名称必填'
                    });
          }
        },
        // 删除
    handleDeleteRow (row) {
      this.currentRow = row
      this.delete_visible = true
    },
    //关闭删除
    handleCloseDelete (val) {
      if (val) { //确定删除
        this.$http.delete(`${this.url}organization/company/${this.currentRow.id}`).then(res => {
          if (res.code === '20000') {
             this.$LjNotify('success', {
            title: '提示',
            message: '删除成功'
          });
            this.delete_visible = false
            this.getStaffList()
          }else {
             this.$LjNotify('warning', {
            title: '提示',
            message: res.msg
          });
          }
        })
      } else {
        this.currentRow = null
        this.delete_visible = false
      }

    },
      // 当前点击
      tableClickRow(row) {
        //let ids = this.chooseRowIds;
        //ids.push(row.id);
        //this.chooseRowIds = this.myUtils.arrayWeight(ids);
        this.getStaffDetail(row.id);
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
        this.getStaffList();
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/company/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/company/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #company {
      .labour_contract {
        width: 38%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 30px;
        text-align: center;
        border: 5px solid #444444;
        border-radius: 8px;
        background-color: white;
        .item_margin {
          margin-bottom: 55px;
        }
        > div {
          padding: 20px;
          height: 1200px;
        }
      }
      .hide_labour_contract {
        top: -1920px;
        right: -1920px;
      }
    }
  }

  #theme_name.theme2 {
    #company {

    }
  }

  #theme_name.theme3 {
    #company {

    }
  }

  #theme_name.theme4 {
    #company {

    }
  }
</style>
