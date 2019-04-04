<template>
  <div id="repository_dialog_list" class="repository-dialog" style="position: absolute">
    <!--领取通知详情-->
    <lj-dialog
      :visible="repository_visible"
      :size="{width: 1000 + 'px',height: 700 + 'px'}"
      @close="repositoryHandler"
    >
      <div class="dialog_container receive-notify">
        <div class="dialog_header">
          <h3>{{formData.process_number}} 领取通知</h3>
          <div class="notify-date-time">{{formData.apply_time}}</div>
          <div class="header_right">
            <div class="detail-container">
              <div class="detail-item">
                <span>审批编号</span>
                <span>{{formData.process_number}}</span>
              </div>
              <div class="detail-item">
                <span>申请人</span>
                <span>{{formData.username}}</span>
              </div>
              <div class="detail-item">
                <span>部门</span>
                <span>{{formData.department}}</span>
              </div>
              <div class="detail-item">
                <span>申请类型</span>
                <span>{{formData.apply_type}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.receive.tableData"
            highlight-current-row
            :height="this.mainListHeight(450) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(tableSettingData.receive.tableShowData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.receive.tableShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page" style="bottom: 200px">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange($event,'receive')"
                :current-page="tableSettingData.receive.params.page"
                :page-size="tableSettingData.receive.params.limit"
                :total="tableSettingData.receive.counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>

        </div>

        <div class="left-bottom">
          <div class="items-center">
            <div>领取状态</div>
            <dropdown-list size="mini" v-model="submitTableData.receive_status" width="100"></dropdown-list>
          </div>
          <div class="items-center">
            <div>上传照片</div>
            <lj-upload size="40" v-model="submitTableData.picture"></lj-upload>
          </div>
        </div>


        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submit">确定</el-button>
          <el-button size="small" type="info" @click="repositoryHandler">取消</el-button>
        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';

  export default {
    name: "repositoryDialog",
    components: {
      LjUpload,
      ljDialog,
      DropdownList,
    },
    computed: {
      repository_visible() {
        return this.$store.state.todo.humanResource_repository_visible;
      },
      todo_list_current_selection() {
        return this.$store.state.todo.todo_list_current_selection;
      },
    },
    watch: {
      repository_visible: {
        handler(val,oldVal) {
          if(val) {
            this.getFormData();
            this.getItemsDetailList();
          }
        },
        immediate: true,
      },
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        //repository_visible: false,
        currentTable:'',
        tableSettingData: {
          receive: {//报废
            counts: 5,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              // department: '部门',
              name: '物品名称',
              count_num:'总数量',
              unclaimed_num:'待领数量',
              /*goods_number: '报废编号',
              responsiblePerson: '任责人',
              repair_price: '维修费用',
              payment_type: '结算方式',*/
            },
          },
        },
        formData:{
          process_number:'',//审批编号
          username:'',//申请人
          department:'',//部门
          apply_type:'',//申请类型
          apply_time:'',//申请时间
        },

        submitTableData: {
          receive_status:'',
          picture:'',
        },
        //tableData: [],
      }
    },
    methods: {
      //提交
      submit() {
        alert('提交成功');
        this.repositoryHandler();
      },



      repositoryHandler() {
        this.$store.dispatch('change_humanResource_repository_visible');
      },

      //获取对话框表单数据
      getFormData() {
        let ids = this.todo_list_current_selection.id;
        this.$http.get(`${this.url}/eam/process/${ids}`).then(res=> {
          if(res.code.endsWith('0')) {
            let item = res.data;
           this.formData = {
             process_number: item.process_number||'-',
             username:item.user?.name,
             department: item.user?.org[0]?.name||'-',
             apply_type: item.type==1?'领取':'借用',
             apply_time: item.apply_time||'-',
           };
          }
        });
      },

      getItemsDetailList() {
        let ids = this.todo_list_current_selection.id;
        this.currentTable = 'receive';
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(`${this.url}/eam/process/${ids}/collection`,this.tableSettingData[this.currentTable].params).then(res=> {
          if(res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                name: item.goods?.name||'-',//物品名称
                count_num: item.count_num||0,//总数量
                unclaimed_num: item.unclaimed_num||0,//待领数量
                receive_time: item.receive_time||'-',//领取时间
              }
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        });
      },


      // 当前点击
      tableClickRow(row) {
        this.tableSettingData['receive'].currentSelection = row;
        let ids = this.tableSettingData['receive'].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);
      },

      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.tableSettingData['receive'].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val, type) {
        /*if (type) {
          this.currentTable = type;
        }*/
        this.tableSettingData['receive'].params.page = val;
      },
    }
  }
</script>


<style scoped lang="scss">
  @import "../../../../assets/scss/todoList/components/humanResource/repositoryDialog/index";

</style>
