<template>
  <div>
    <LjDialog :visible="visible" :size="{width: 900 + 'px',height: 600 + 'px'}" @close="handleCloseAddNewRecord">
      <div class="dialog_container followRecord">
        <div class="dialog_header">
          <h3>新增跟进记录</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='80px'>
            <el-row :gutter="10" width='100%'>
              <el-col :span="11">
                <el-form-item label="工单状态">
                  <el-radio v-model="followRecord.folow_status" value="跟进中" label='337'>跟进中</el-radio>
                  <el-radio v-model="followRecord.folow_status" value="已完成" label='338'>已完成</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="投诉有效性" v-if="followRecord.folow_status == 338 && moduleData.type_name=='投诉'">
                  <el-radio v-model="followRecord.emergency" label="1">有效</el-radio>
                  <el-radio v-model="followRecord.emergency" label="2">无效</el-radio>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" width='100%' v-if='followRecord.folow_status == 338'>
              <el-col :span="7">
                <el-form-item label="维修金额">
                  <el-input placeholder="请填写" v-model='followRecord.pay_all_money'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" width='100%' v-if='followRecord.folow_status == 337'>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <el-select v-model="followRecord.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" width='100%' v-if='followRecord.folow_status == 338' v-for='(com,index) in followRecord.pay_method'
              :key='"comp"+index' class='record_money'>
              <el-col :span="8">
                <el-form-item label="认责人">
                  <el-select placeholder="请选择" v-model='com.type'>
                    <el-option v-for='label in complainedType' :key='label.label' :value='label.value' :label="label.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="handlerOrgan(index)" readonly v-model="com.name" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="认责金额">
                  <el-input placeholder="请填写" v-model='com.money'></el-input>
                </el-form-item>

                <i class='icons icon_add' v-if='index == 0' @click='addComplaintsType'></i>
                <i class='icons icon_del' v-else @click="delComplaintsType(index)"></i>
              </el-col>
            </el-row>
            <el-row :gutter="10" width='100%' v-if='followRecord.folow_status == 338'>
              <el-col :span="8">
                <el-form-item label="实际支付">
                  <el-select v-model="followRecord.payer_type" placeholder="请选择">
                    <el-option v-for="(exp,idex) in complainedType" :key="exp.value" :label="exp.label" :value="exp.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="handlerOrgan('payer')" readonly placeholder="业务员" v-model='followRecord.payer'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="部门">
                  <OrgChoose v-model='followRecord.payer_org_id'></OrgChoose>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" width='100%'>
              <el-col :span="23" :gutter="20" width='100%'>
                <el-form-item label="跟进记录">
                  <el-input placeholder="请填写" type='textarea' v-model="followRecord.content"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" width='100%'>
              <el-col :span="23">
                <el-form-item label="上传图片">
                  <Ljupload size='40' v-model='followRecord.album'></Ljupload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button id='active-danger' class='el-button-active' size="small" @click="handleAddNewRecord">确定</el-button>
          <el-button id='active-info' size="small" @click="handleCloseAddNewRecord">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan" />
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import Ljupload from '../../common/lightweightComponents/lj-upload';
import StaffOrgan from '../../common/staffOrgan.vue'
import OrgChoose from '../../common/lightweightComponents/OrgChoose';
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog,
    Ljupload,
    StaffOrgan,
    OrgChoose
  },
  data () {
    return {
      followRecord: {
        folow_status: null,
        emergency: '',
        content: '',
        payer: '',
        pay_method: [
          {
            id: '',
            type: '',
            name: '',
            money: ''
          }
        ],
        payer_org_name: '',
        payer_org_id: [],
        album: []
      },

      complainedType: [ // 认责人类型
        {
          label: '业务员',
          value: 1
        },
        {
          label: '片区经理',
          value: 2
        },
        {
          label: '房东',
          value: 3
        },
        {
          label: '现租客',
          value: 4
        },
        {
          label: '公司',
          value: 5
        },
        {
          label: '前租客',
          value: 6
        }
      ],
      staffModule: false, // 选择人员
      organData: {
        num: 1
      },
      departModule: false, //部门选择
      departData: {
        num: 1,
      },
      department_id: [],
      currentIndex: 0,
    }
  },
  methods: {
    addComplaintsType () {
      this.followRecord.pay_method.push({
        id: '',
        type: '',
        name: '',
        money: ''
      })
    },
    delComplaintsType (index) {
      this.followRecord.pay_method.splice(index, 1)
    },
    handlerOrgan (index) {
      this.staffModule = true
      this.currentIndex = index
    },
    departSearch () {
      this.departModule = true
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        if (this.currentIndex == 'payer') {
          this.followRecord.payer = names
          if (names) {
            this.getOrganDepart(ids[0])
          } else {
            this.followRecord.payer_org_name = ''
            this.followRecord.payer_org_id = []
          }

        } else {
          this.followRecord.pay_method[this.currentIndex].name = names
          this.followRecord.pay_method[this.currentIndex].id = ids
        }
        this.currentIndex = 0
      }
    },
    getOrganDepart (ids) {
      this.$http.get(`staff/user/${ids}`).then(res => {
        if (res.code == 20020) {
          let data = res.data.org[0]
          this.followRecord.payer_org_name = data.name
          this.followRecord.payer_org_id = [data.pivot.org_id]
        }
      })
    },

    checkRecord () {
      if (!this.followRecord.folow_status) {
        return '工单类型未选择'
      }
      if (this.followRecord.folow_status == 337) {
        if (!this.followRecord.emergency) return '紧急程度未选择'
      } else {
        for (let i = 0; i < this.followRecord.pay_method.length; i++) {
          let ele = this.followRecord.pay_method[i]
          if (!ele.type) return '认责人未选择'
          if (!ele.name) return '认责人姓名未填写'
          if (!ele.money) return '认责金额未填写'
        }

        if (!this.followRecord.payer_type) return '实际支付未填写'
        if (!this.followRecord.payer) return '实际支付人姓名未填写'
        if (!this.followRecord.payer_org_name) return '部门未填写'

      }

      if (!this.followRecord.content) {
        return '跟进记录未填写'
      }
      return null
    },
    // 新增记录
    handleAddNewRecord () {
      let warn = this.checkRecord()
      if (warn) {
        this.$LjNotify('warning', {
          title: '提示',
          message: warn
        });
        return
      }

      this.$emit('close', {
        isCreate: false,
        createdType: this.followRecord.folow_status == 337 ? "doing" : "finish",
        content: this.followRecord
      })
      this.clearInfo()
    },
    // 取消
    handleCloseAddNewRecord () {
      this.$emit('close', {
        isCreate: false,
        createdType: null,
        content: {}
      })
      this.clearInfo()
    },
    clearInfo () {
      this.followRecord = {
        folow_status: '',
        emergency: '',
        content: '',
        pay_method: [
          {
            id: '',
            type: '',
            name: '',
            money: ''
          }
        ],
        album: []
      }
    }
  }
}
</script>

