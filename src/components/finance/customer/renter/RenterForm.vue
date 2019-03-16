<template>
  <div class="dialog_container">
    <div class="dialog_header">
      <h3>{{current_row===''?'新增': '编辑'}}</h3>
    </div>
    <div class="dialog_main">
      <el-form :model="form" size="mini" ref="formData">
        <el-row type="flex" class="row-bg" justify="space-between" style="flex-wrap: wrap">

          <el-form-item v-for="(item,index) in lordForm.slice(0,10)" :key="index" :prop="item.prop">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>{{item.label}}</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-input  :placeholder="item.placeholder" v-model="form[item.prop]"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-for="(item,index) in lordForm.slice(12,15)" :key="'lord'+index" :prop="item.prop">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>{{item.label}}</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-date-picker
                  v-model="form[item.prop]" type="date" :placeholder="item.placeholder">
                </el-date-picker>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="pay_types_val">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>付款方式</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-select placeholder="请选择" v-model="form.pay_types_val">
                  <el-option v-for="item in Object.keys(payTypes)" :label="payTypes[parseInt(item)]" :value="parseInt(item)" :key="item"></el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="prices_val">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>月单价</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-input  placeholder="请选择" v-model="form.prices_val" type="number"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="account_type">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>账户类型</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-select placeholder="请选择" v-model="form.account_type">
                  <el-option v-for="item in Object.keys(cate)" :label="cate[item]" :value="item" :key="item"></el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="account_bank">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>开户银行</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-select placeholder="请选择银行" v-model="form.account_bank">
                  <el-option v-for="item in banks" :label="item" :value="item" :key="item"></el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="rental_subject">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>房租科目</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-input  placeholder="请选择" v-model="form.rental_subject" @focus="handleOpenSubject('subject_rent')"></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="deposit_subject">
            <div class="form_item_container">
              <div class="item_label">
                <b class="item_icons">
                  <i class="icon_account"></i>
                </b>
                <span>押金科目</span>
              </div>
              <div class="item_content" style="width: 220px">
                <el-input  placeholder="请选择" v-model="form.deposit_subject" @focus="handleOpenSubject('subject_deposit')" ></el-input>
              </div>
            </div>
          </el-form-item>

        </el-row>
      </el-form>
    </div>
    <div class="dialog_footer">
      <el-button type="danger"  size="small" @click="postLordEditData('formData',lord_id)">确定</el-button>
      <el-button type="info" size="small"  @click="edit_visible = false;current_row = ''">取消</el-button>
    </div>

    <lj-subject :visible="subject_visible" @close="subject_visible = false"
                @confirm="handleConfirmSubject"></lj-subject>
  </div>

</template>

<script>
  import LjSubject from '../../../common/lj-subject.vue';
  export default {
    name: "renterForm",
    props:['formData','current_row'],
    components:{
      LjSubject,
    },
    data(){
      return{
        form:this.formData,
        lordForm:[
          {
            label:"签约人",
            prop:"operatorName",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"所属部门",
            prop:"departmentName",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"负责人",
            prop:"customer_name",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"客户姓名",
            prop:"customer_name",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"手机号",
            prop:"contact",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"房屋地址",
            prop:"address",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"租房月数",
            prop:"months",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"押金",
            prop:"deposit",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"保修期",
            prop:"warrenty",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"中介费",
            prop:"medi_cost",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"付款方式",
            prop:"pay_types",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"月单价",
            prop:"months",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"待签约",
            prop:"deal_date",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"一次打款",
            prop:"first_pay_date",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"二次打款",
            prop:"second_pay_date",
            type:"",
            placeholder:"请输入"
          },

          {
            label:"账户类型",
            prop:"account_type",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"开户银行",
            prop:"account_bank",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"收款人",
            prop:"account_owner",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"支行",
            prop:"account_subbank",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"押金科目",
            prop:"deposit_subject",
            type:"",
            placeholder:"请输入"
          },
          {
            label:"房租科目",
            prop:"rental_subject",
            type:"",
            placeholder:"请输入"
          },

        ],
        subject_visible: false,
        which_subject: '',
        new_subject_visible: false,

        subject_deposit: {
          parent_id: '',
          title: '',
          er_type: '',
          remark: '',
          parent_name: '',
          subject_code: ''
        },
        subject_rent: {
          parent_id: '',
          title: '',
          er_type: '',
          remark: '',
          parent_name: '',
          subject_code: ''
        },

        move_visible: false,
        move_subject: {
          initial: '',
          parent_id: '',
          title: ''
        },
        cate: {
          "1": "银行卡",
          "2": "支付宝",
          "3": "微信",
          "4": "银行卡(数据来自房管中心)"
        },
        payTypes: {
          "1": "月付",
          "2": "半月份",
          "3": "季付",
          "4": "半年付",
          "5": "年付",
        },
        banks: [
          "未知银行",
          "中国工商银行",
          "中国农业银行",
          "中国银行",
          "中国建设银行",
          "交通银行",
          "中信银行",
          "中国光大银行",
          "华夏银行",
          "中国民生银行",
          "广发银行",
          "深圳发展银行",
          "招商银行",
          "兴业银行",
          "上海浦东发展银行",
          "恒丰银行",
          "浙商银行",
          "渤海银行",
          "中国邮政储蓄银行",
          "南京银行",
          "江苏省紫金农商银行",
          "农村合作信用社",
          "安徽省农村信用社联合社",
          "平安银行",
          "江苏银行",
          "苏州银行",
          "广州银行",
          "宁波银行",
          "上海银行",
          "北京银行",
          "杭州银行",
          "衢州银行",
          "农村商业银行",
          "浙江省农村信用社联合社杭州联合银行",
          "浙江稠州银行",
          "徽商银行",
          "台州银行",
          "浙江银行",
          "重庆农村商业银行",
          "浙江泰隆商业银行",
          "上海农商银行",
          "重庆银行",
          "西安银行",
          "昆山农商银行",
          "昆仑银行",
          "陕西农村信用合作社联合社",
          "成都银行",
          "江苏省信用社联合社",
          "重庆三峡银行",
          "江苏农村信用社联合社",
          "江苏东吴农村商业银行",
          "厦门银行",
          "浙江民泰商业银行",
          "江西银行",
          "中原银行"
        ]

      }
    },
    watch:{
      form:{
        handler(val){
          console.log(val)
        },
        deep:true
      }
    },
    methods:{
      handleOpenSubject(which) {
        this.which_subject = which;
        this.subject_visible = true;
      },
      //确认科目
      handleConfirmSubject(val) {
        if (this.which_subject === 'move_subject') {
          this.move_subject.parent_id = val.id;
          this.move_subject.title = val.title;
        }
        if (this.which_subject === 'subject_deposit') {
          this.subject_deposit.parent_name = val.title;
          this.subject_deposit.parent_id = val.id;
          this.form.subject_id.deposit = val.id;
          this.form.deposit_subject = val.title;

        }
        if (this.which_subject === 'subject_rent') {
          this.subject_rent.parent_name = val.title;
          this.subject_rent.parent_id = val.id;
          this.form.subject_id.rental = val.id;
          this.form.rental_subject = val.title;
        }
      },

      // //提交编辑
      postLordEditData(data, id) {
        console.log(data);
        console.log(id);
        // let form_data = this.$refs['formData'].$el;
        // this.$refs[form].validate((valid) => {
        // if(){
        this.$http.put(globalConfig.temporary_server + 'customer_renter/' + id, this.form).then(res => {
          this.callbackSuccess(res);

        })
        // }
        // })
      },

    },
  }
</script>

<style scoped>

</style>
