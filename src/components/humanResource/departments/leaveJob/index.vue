<template>
  <div id="leaveJob">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        :default-sort="{prop: 'staff.enroll',order: 'descending'}"
        style="width: 100%">
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="岗位" prop="position" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.position && scope.row.position.length > 0">
              <span v-for="(item,idx) in scope.row.position">{{ item.name }}<a v-if="idx !== scope.row.position.length - 1">;</a></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="入职时间" prop="staff.enroll" align="center"></el-table-column>
        <el-table-column label="离职时间" prop="staff.dismiss_time" align="center"></el-table-column>
        <el-table-column label="离职操作时间" prop="is_on_job" align="center" min-width="120px"></el-table-column>
        <el-table-column label="禁用操作时间" prop="is_enable" align="center" min-width="120px"></el-table-column>
        <el-table-column label="联系方式" prop="phone" align="center"></el-table-column>
        <el-table-column label="离职类型" prop="staff.dismiss_reason" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.staff && scope.row.staff.dismiss_reason && scope.row.staff.dismiss_reason.dismiss_type && scope.row.staff.dismiss_reason.dismiss_type === 1">主动离职</span>
            <span v-else-if="scope.row.staff && scope.row.staff.dismiss_reason && scope.row.staff.dismiss_reason.dismiss_type && scope.row.staff.dismiss_reason.dismiss_type === 2">旷工离职</span>
            <span v-else-if="scope.row.staff && scope.row.staff.dismiss_reason && scope.row.staff.dismiss_reason.dismiss_type && scope.row.staff.dismiss_reason.dismiss_type === 2">劝退</span>
            <span v-else>开除</span>
          </template>
        </el-table-column>
        <el-table-column label="离职备注" prop="staff.dismiss_reason.dismiss_mess" show-overflow-tooltip align="center" min-width="230px"></el-table-column>
        <el-table-column label="离职交接单" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLookResignation(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="离职短信" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.staff && scope.row.staff.send_info && scope.row.staff.send_info.dimission_sms === 1">已发送</span>
            <el-button type="text" @click="handleControlMsg(scope.row,'sms')" style="color: #D33E43" v-else>发送</el-button>
          </template>
        </el-table-column>
        <el-table-column label="离职群消息" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.staff && scope.row.staff.send_info && scope.row.staff.send_info.dimission_group === 1">已发送</span>
            <el-button type="text" @click="handleControlMsg(scope.row,'announcement')" style="color: #D33E43" v-else>发送</el-button>
          </template>
        </el-table-column>
        <el-table-column label="离职证明" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleLeaveProof(scope.row)" v-if="scope.row.staff && scope.row.staff.leave_proof_number">查看</el-button>
            <el-button type="text" @click="handleLeaveProof(scope.row)" style="color: #D33E43" v-else>发送</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="second-entry">
              <el-button type="text" @click="openSecondEntryDialog(scope.row)">复职</el-button>
            </div>

          </template>
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

      <lj-dialog
        :visible="look_info_visible"
        :size="{width: 700 + 'px',height: 400 + 'px'}"
        @close="handleCloseLookInfo"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>查看信息</h3>
          </div>
          <div class="dialog_main">

          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleCloseLookInfo">确定</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--确定发送-->
      <lj-dialog
        :visible="confirm_visible"
        :size="{width: 400 + 'px',height: 250 + 'px'}"
        @close="confirm_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>确定</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定发送吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleConfirmSend">确定</el-button>
            <el-button type="info" size="small" @click="confirm_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>


      <!--二次入职dialog-->
      <lj-dialog
        :visible.sync="second_entry_dialog_visible"
        :size="{width: 450 + 'px',height: 500 + 'px'}"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>复职</h3>
          </div>
          <div class="dialog_main flex-center">
            <el-form ref="secondEntryFormRef" :model="second_entry_form" :rules="rules.second_entry" label-width="80px">
              <el-form-item label="岗位" prop="position_id" required>
                <post-choose size="mini" title="必选" width="220" num="1" v-model="second_entry_form.position_id"></post-choose>
              </el-form-item>
              <el-form-item label="部门">
                <org-choose size="mini" title="自动获取" :disabled="true" width="220" v-model="second_entry_form.org_id"></org-choose>
              </el-form-item>
              <el-form-item label="入职等级">
                <dropdown-list v-model="second_entry_form.level"
                               width="220" size="mini" :clearable="false"
                               :json-arr="DROPDOWN_CONSTANT.ENTRY_LEVEL"></dropdown-list>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone" required>
                <el-input size="mini" placeholder="必填" width="220" v-model="second_entry_form.phone"></el-input>
              </el-form-item>
            </el-form>

          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="confirmSecondEntry(false)">复职</el-button>
            <el-button type="danger" size="small" @click="confirmSecondEntry(true)">复职并发送消息通知</el-button>
            <el-button type="info" size="small" @click="second_entry_dialog_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    name: "index",
    props: ['searchVal'],
    data() {
      return {
        rules: {
          second_entry: {
            position_id: [{required: true, message: '请选择岗位', trigger: 'blur'}],
            phone: [{required: true, message: '请输入手机号', trigger: 'blur'},{min:11,max:11,message:'请输入11位手机号码',trigger:'blur'}],
          },
        },


        url:globalConfig.humanResource_server,
        confirm_visible: false,
        confirm_type: '',
        confirm_row: '',

        checkList: [],
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 36,
          org_id: '',
          position_id: '',
          is_on_job: 1,
        },

        look_info: [],
        look_info_visible: false,

        currentSelection:null,

        /*二次入职dialog显示隐藏*/
        second_entry_dialog_visible:false,
        /*二次入职职级*/
        //second_entry_position_level:1,
        /*二次入职表单*/
        second_entry_form:{
          org_id:[],
          position_id:[],
          phone:null,
          level: 1,
        },
      }
    },
    mounted() {
      this.getStaffList();
    },
    activated() {
    },
    watch: {
      searchVal: {
        handler(val) {
          this.params = Object.assign({},this.params,val);
          this.getStaffList();
        },
        deep: true
      },
      'second_entry_form.position_id': {//自动获取部门
        handler(val,oldVal) {
          if(val.constructor===Array&&val.length==1) {//选取岗位了
            let id = val[0];
            this.$http.get(`${this.url}organization/position/${id}`).then(res=> {
              if(res.code.endsWith('0')) {
                this.second_entry_form.org_id = [res.data.duty?.org_id];
                console.log(this.second_entry_form.org_id);
              }
            });
          }
        },
        immediate:true,
      },
    },
    computed: {},
    methods: {
      handleConfirmSend() {
        const row = this.confirm_row;
        const where = this.confirm_type;
        let type = where === 'sms' ? ['dimission_sms'] : ['dimission'];
        if (row.staff && row.staff.send_info && row.staff.send_info.forward_group === 1) {
          return false;
        } else {
          this.$http.get(`${this.url}staff/user/${row.id}/sendinfo`,{
            type
          }).then(res => {
            if (res.code === '20000') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.confirm_visible = false;
              this.getStaffList();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        }
      },
      /*查看或发送离职证明*/
      handleLeaveProof(row) {
        //查看离职证明
        if (row.staff && row.staff.leave_proof_number) {
          if(!this.VALIDATE_PERMISSION['Dimission-Certificate-Read']) {
            this.$LjMessageNoPermission();
            return;
          }
          window.open(`${this.url}staff/e_contract/show/${row.staff.leave_proof_number}`);
        } else {//发送离职证明
          if(!this.VALIDATE_PERMISSION['Dimission-Certificate-Send']) {
            this.$LjMessageNoPermission();
            return;
          }
          this.$http.get(`${this.url}staff/user/${row.id}/sendinfo`,{
            type: ['leave_proof_send']
          }).then(res => {
            if (res.code === '20000') {
              this.$LjNotify('dimission_sms',{
                title: '成功',
                message: res.msg
              });
              this.getStaffList();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        }
      },
      //打开离职短信或离职群消息
      handleControlMsg(row,where) {
        if(where =='sms') {//离职短信权限验证
          if(!this.VALIDATE_PERMISSION['Dimission-Message-Send']) {
            this.$LjMessageNoPermission();
            return;
          }
        }else if(where =='announcement') {//离职群消息权限验证
          if(!this.VALIDATE_PERMISSION['Dimission-News-Send']) {
            this.$LjMessageNoPermission();
            return;
          }
        }
        if (row.staff && row.staff.send_info && row.staff.send_info.forward_group === 1) {
          this.$LjMessage('success',{
            title: '提示',
            msg: '已发送'
          });
          return false;
        } else {
          this.confirm_row = row;
          this.confirm_type = where;
          this.confirm_visible = true;
        }
      },
      handleCloseLookInfo() {
        this.look_info = [];
        this.look_info_visible = false;
      },
      /*查看离职交接单*/
      handleLookResignation(row) {
        if(!this.VALIDATE_PERMISSION['Delivery-Recept-Read']) {
          this.$LjMessageNoPermission();
          return;
        }
        console.log(row);
      },
      /*获取离职列表*/
      getStaffList() {
        this.showLoading(true);
        this.$http.get(this.url+'staff/user', this.params).then(res => {
          this.showLoading(false);
          if (Number(res.code)%10 ===0){
            this.tableData = res.data.data;
            this.counts = res.data.count;
          } else {
            this.tableData=[];
            this.counts=0;
          }
        })
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getStaffList();
        console.log(`当前页: ${val}`);
      },
      /*打开二次入职*/
      openSecondEntryDialog(row) {
        if(!this.VALIDATE_PERMISSION['User-Second_Entry']) {
          this.$LjMessageNoPermission();
          return;
        }

        this.currentSelection = _.cloneDeep(row);
        this.second_entry_form.position_id = [row.position[0]?.id||null];
        this.second_entry_form.phone = row.phone;
        this.second_entry_dialog_visible  = true;
      },
      /*确定入职 isSendMessage为true时发送复职消息*/
      confirmSecondEntry(isSendMessage = false) {

        this.$refs['secondEntryFormRef'].validate(valid=> {
          if(valid) {
            this.$LjConfirm({content:`确定复职${this.currentSelection.name}吗？`}).then(()=> {
              let id = this.currentSelection.id;
              let params = {
                type:"second_entry",
                enroll:this.myUtils.formatDate(new Date()),
                ...this.second_entry_form
                //position_level:this.second_entry_form.position_level
              };
              if(isSendMessage) {
                params.message="second_entry";
              }
              this.$http.put(`${this.url}staff/user/${id}`,params).then(res=> {
                this.second_entry_dialog_visible=false;
                this.$LjMessageEasy(res,()=> {
                  this.getStaffList();
                });
              });
            });
          }
        });
      },
    },
  }
</script>
<style lang="scss">
  #leaveJob {
    .second-entry {
      .el-button {
        color: #0BB07B;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/leaveJob/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/scss/humanResource/leaveJob/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #leaveJob {

    }
  }

  #theme_name.theme2 {
    #leaveJob {

    }
  }

  #theme_name.theme3 {
    #leaveJob {

    }
  }

  #theme_name.theme4 {
    #leaveJob {

    }
  }
</style>
