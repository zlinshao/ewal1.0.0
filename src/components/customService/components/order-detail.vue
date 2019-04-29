<template>
  <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
    <div class="dialog_container dialog_detail" v-if='visible && detail_form'>
      <div class="dialog_header">
        <h3>{{ detail_form.type_name|| "普通"}}工单</h3>
      </div>
      <div class="dialog_main">
        <div class="back_info scroll_bar">
          <el-row :gutter="20">
            <el-col :span='14'>
              <p class='detail_tit'>工单详情</p>
              <el-form label-width='80px'>
                <el-form-item label='创建时间'>
                  <el-input v-model="detail_form.create_time" type="text" disabled> </el-input>
                </el-form-item>
                <el-form-item label='房屋地址'>
                  <el-input v-model="detail_form.house_name" type="text" disabled> </el-input>
                </el-form-item>

                <el-form-item label='维修方' v-if='detail_form.type == 7'>
                  <el-input :value="detail_form.send_order_type == 1 ? '内部保修':'外部保修'" type="text" disabled>
                  </el-input>
                </el-form-item>

                <template v-if='detail_form.type == 1'>
                  <el-form-item v-for='item in Object.keys(reimburse_type)' :key='item' :label='reimburse_type[item]'
                    v-if='detail_form[item] && detail_form[item]!="0.00"'>
                    <el-input v-model="detail_form[item]" type="text" disabled> </el-input>
                  </el-form-item>
                </template>

                <template v-if='detail_form.type == 699'>
                  <el-form-item v-for='item in Object.keys(complaint_type)' :key='item' :label='complaint_type[item]'>
                    <el-input v-model="detail_form[item]" type="text" disabled> </el-input>
                  </el-form-item>
                </template>

                <el-form-item v-for='item in Object.keys(default_type)' :key='item' :label='default_type[item]'>
                  <el-input v-model="detail_form[item]" type="text" disabled> </el-input>
                </el-form-item>

                <el-form-item label='照片' style='width:100%;'>
                  <div style="width: 90%;text-align: left">
                    <img v-for="tmp in detail_form.imagic" :key="tmp.id" data-magnify="" data-caption="图片查看器" :data-src="tmp.uri"
                      :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                  </div>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span='10'>
              <div class='detail_tit'>
                <span>跟进进度</span>
                <b @click='handleAddRecord'>+</b>
              </div>
              <div class='detail_box scroll_bar'>
                <div class="content flex" v-for='follow in follow_data' :key='follow.next_follow_time' v-if='follow_data'>
                  <div class='detail_dialog_left'>
                    <p>{{follow.create_name}}</p>
                    <p>{{follow.next_follow_time}}</p>
                  </div>
                  <div class="detail_dialog_center">
                    <div class="circle"></div>
                  </div>
                  <div class='detail_dialog_right'>
                    <p>{{follow.follow_status_name || '暂无'}}</p>
                    <p>{{follow.content}}</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="dialog_footer">
        <el-button type="info" size="small" @click="handleTransfer">转交</el-button>
        <el-button type="info" size="small" @click="handleNotice">通知</el-button>
        <el-button type="danger" size="small" @click="handleEnd" v-if='moduleData.chosenTag!=338'>结束</el-button>
      </div>
    </div>
  </LjDialog>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  props: ['visible', 'moduleData', 'change'], // id
  components: {
    LjDialog
  },
  data () {
    return {
      reimburse_type: {
        reimburse_water: '报销类型',
        reimburse_water_money: '报销金额',
        reimburse_water: '报销类型', // 水费
        reimburse_water_money: '报销金额',
        reimburse_electricity: '报销类型', //   电费
        reimburse_electricity_money: '报销金额',
        reimburse_gas: '报销类型', //  燃气费
        reimburse_gas_money: '报销金额',
        reimburse_property: '报销类型', //  物业费
        reimburse_property_money: '报销金额',
        reimburse_service: '报销类型', //  维修费
        reimburse_service_money: '报销金额',
        reimburse_other: '报销类型', //  其他
        reimburse_other_money: '报销金额',
      },
      complaint_type: {
        type_of_complaint: '投诉类型',
        channel_of_complaint: '投诉渠道',
        complained_user_id: '被投诉人',
      },
      default_type: {
        replay_phone: '回复电话',
        emergency_name: '紧急程度',
        reimburse_property: '处理人',
        reimburse_property_money: '部门',
        finish_time: '截止时间',
        content: '工单内容'
      },
      currentType: null,
      currentRow: null,
      detail_form: null,
      follow_data: null,
      transfer_visible: false,
      market_server: globalConfig.market_server,
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getDetail()
      }
    },
    moduleData (val) {
      this.currentRow = val.currentRow
    },
    change (val) { //detail 数据发生改变
      if (val) {
        this.getDetail()
      }
    }
  },
  methods: {
    getOrder_type (type) {
      this.currentType = this.order_type[type] || this.order_type[11]
      return this.currentType
    },
    handleCloseDetail () {
      this.$emit('close', {
        type: 'close',
        detail: null
      })
    },
    getDetail () {
      this.$http.get(this.market_server + `v1.0/csd/work_order/ServiceDetail/${this.moduleData.currentId}`).then(res => {
        if (res.code === 200) {
          this.detail_form = res.data.order_data
          this.follow_data = res.data.follow_data
          this.detail_visible = true;
          this.$emit('changDetail', false)
        }
      })
    },
    handleTransfer () {
      this.$emit('close', {
        type: '转交',
        detail: null
      })
    },
    handleNotice () {
      this.$emit('close', {
        type: '通知',
        detail: null
      })
    },
    handleEnd () {
      this.$emit('close', {
        type: '结束',
        detail: this.detail_form
      })
    },
    handleAddRecord () {
      this.$emit('close', {
        type: '新增跟进',
        close: false,
        detail: this.detail_form
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/common.scss";
</style>
