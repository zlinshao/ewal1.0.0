<template>
  <div class="approval-list-dialog">
    <lj-dialog :visible.sync="approval_list_dialog_visible"
               :size="size"
               @close="cancelAddOffice">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{row.title}}</h3>
        </div>
        <div class="dialog_main borderNone">

          <div class="top-info">
            <el-row>
              <el-col :span="12">
                <span>处理人</span>
                <span>陈轶鸣</span>
              </el-col>
              <el-col :span="12">
                <span>部门</span>
                <span>研发中心</span>
              </el-col>
            </el-row>
          </div>

          <div class="main-info">
            <ProcessDetails></ProcessDetails>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="info" @click="cancelAddOffice">暂缓</el-button>
          <el-button size="small" type="info" @click="cancelAddOffice">转交</el-button>
          <el-button size="small" type="info" @click="cancelAddOffice">拒绝</el-button>
          <el-button size="small" type="danger" @click="submitAddOffice">同意</el-button>
        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';
  import LjUpload from '../../common/lightweightComponents/lj-upload';
  import ProcessDetails from './ProcessDetails';

  /**初始化数据 */
  function createEmpty() {
    return {
      title: '审批标题'
    }
  }

  export default {
    name: "AddOfficeDialog",
    components: {
      LjDialog,
      LjUpload,
      ProcessDetails
    },
    props: ['user_info_all', 'size', 'addUrl'],
    data() {
      return {
        url: globalConfig.market_server,
        approval_list_dialog_visible: false,
        row: createEmpty(),
      }
    },
    methods: {
      reset() {
        // this.approval_list_form = createEmpty()
        // this.$refs.addOfficeForm.clearValidate()
      },
      open() {
        this.approval_list_dialog_visible = true
      },
      /**获取个人信息 */
      // getUserInfo() {
      //   this.user_info = {
      //     name: this.user_info_all.name,
      //     org: this.user_info_all.org[0].name,
      //     user_id: this.user_info_all.id,
      //     org_id: this.user_info_all.org[0].id,
      //   }
      // },
      /**获取房屋详情 */
      // getHouseDetail(house_id) {
      //   this.$http.get(`${this.url}/v1.0/market/house/detail/${house_id}?from=hr`)
      //     .then(res => {
      //       if (res.code === 200) {
      //         this.roomType = res.data.hk
      //         this.rent = res.data.price
      //         this.org_leader = res.data.org_leader
      //       }
      //     })
      // },
      /**提交*/
      submitAddOffice() {
        /**校验房屋地址 */
        // if (!this.house_info.house_id) {
        //   this.$LjMessage('warning', {title: '警告', msg: `请选择申请地址`});
        //   return
        // }
        // this.$refs['addOfficeForm']
        //   .validate((valid) => {
        //     if (valid) {
        //       this.approval_list_form.date = this.myUtils.formatDate(this.approval_list_form.date, 'yyyy-MM-dd');
        //       let {house_type} = this.approval_list_form
        //       let data = {
        //         ...this.approval_list_form,
        //         // user_id: this.user_info.user_id,
        //         // org_id: this.user_info.org_id,
        //         house_data: [{
        //           house_type: house_type,
        //           house_info: this.house_info,
        //           leader_org: this.org_leader,
        //         }]
        //       }
        //       this.$http.post(this.addUrl, data)
        //         .then(res => {
        //           this.$LjMessageEasy(res, () => {
        //             this.approval_list_dialog_visible = false;
        //             this.reset()
        //           })
        //         })
        //     } else {
        //       return false
        //     }
        //   })
      },
      /**取消*/
      cancelAddOffice() {
        this.approval_list_dialog_visible = false;
        this.reset()
      }
    },
    created() {
      // this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/approval/commponents/approvalListDialog.scss";
</style>











