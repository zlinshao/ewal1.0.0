<template>
  <!--资料补齐-->
  <lj-dialog :visible="data_polishing_visible" :size="{width: 550 + 'px',height: 600 + 'px'}" @close="handleCancelPolishing">
    <div class="dialog_container">
      <div class="dialog_header">
        <h3>补齐资料</h3>
      </div>
      <div class="dialog_main borderNone">
        <el-form label-width="80px" class="showPadding">
          <el-form-item label="房产证号">
            <el-input v-model="property_number" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="丘号">
            <el-input v-model="mound_number" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item :label="selfLabel(idx)" v-for="(tmp,idx) in polishing_params" :key="idx">
            <Upload :file="upload_file[idx]" @success="handleGetFile"></Upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog_footer">
        <el-button type="danger" size="small" @click="handleConfirmPolishing">确定</el-button>
        <el-button type="info" size="small" @click="handleCancelPolishing">取消</el-button>
      </div>
    </div>
  </lj-dialog>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import Upload from '../../common/upload.vue';
export default {
  name: 'index',
  components: { LjDialog, Upload },
  props: ['data_polishing_visible', 'currentRow'],
  data () {
    return {
      polishing_params: {},
      upload_file: {
      },
      property_number: '',
      mound_number: ''
    }
  },
  methods: {
    handleCancelPolishing () {

      this.polishing_params = {};
      this.mound_number = '';
      this.property_number = '';
      this.upload_file = {};

      this.$emit('closeFilling', false)
    },
    handleConfirmPolishing () {
      var form = new FormData();
      form.append('complete_content', this.polishing_params);
      form.append('property_number', this.property_number);
      form.append('mound_number', this.mound_number);
      this.$http.post(this.market_server + `v1.0/market/contract/${this.chooseTab}/${this.currentRow.contract_id}`, form).then(res => {
        if (res.code === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.message
          });
          this.handleCancelPolishing();
          this.getContractList();
        } else {
          this.$LjNotify('warning', {
            title: '失败',
            message: res.message
          })
        }
      })
      this.handleCancelPolishing()
    },
    handleGetFile () {      if (item !== 'close') {
        this.polishing_params[item[0]] = item[1];
      }    }
  }
}
</script>
