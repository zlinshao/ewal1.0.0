<template>
  <LjDialog :visible="visible" :size="{width: 600 + 'px',height: 600 + 'px'}" @close="handleClose" id='invalid_dailog'>
    <div class='dialog_container'>
      <div class='dialog_header'>
        <h3>作废重签</h3>
      </div>
      <div class="dialog_main" v-if='visible'>
        <el-checkbox-group v-model="invalidCheck" @change="handleChecked">
          <el-checkbox v-for="(item,index) in Object.keys(ablum)" :label="index + 1" :key="item" class='checkbox'>
            <p class='tit'>
              <span>{{ablum[item]}}</span>
              <span v-if='item == "photo"'>(重新报备)</span>
            </p>
            <div v-if='moduleData.album' class='imgBox'>
              <img :src="img.uri" alt="" v-for='img in moduleData.album[item]' :key='img.id' data-magnify=""
                data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'>
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="dialog_footer">
        <el-button id='active-danger' class='el-button-active' size="small" @click="handleAdd">确定</el-button>
        <el-button id='active-info' size="small" @click="handleClose">取消</el-button>
      </div>
    </div>
  </LjDialog>
</template>
<script>
import LjDialog from '../../common/lj-dialog.vue';
export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog
  },
  data () {
    return {
      invalidCheck: [],
      ablum: {
        photo: '合同作废',
        auth_photo: '仅作废合同',
        checkin_photo: '交接单作废',
      },
      market_server: globalConfig.market_server,
    }
  },
  methods: {
    handleChecked (val) {
      console.log(val)
    },
    handleClose () {
      this.$emit('close', false)
      this.invalidCheck = []
    },
    handleAdd () {
      if (this.invalidCheck.length == 0) {
        this.$LjNotify('success', {
          title: '提示',
          message: '作废类型未选择'
        });
        return
      }
      let option = {
        obsolete_type: this.invalidCheck,
        contract_id: this.moduleData.contract_id,
        contract_type: this.moduleData.contract_type
      }
      this.$http.post(`${this.market_server}v1.0/market/contract/re-generate`, option).then(res => {
        let warn = null
        if (res.code === 200) {
          warn = '作废成功'
        } else {
          warn = '作废失败'
        }
        this.$emit('close', false)
        this.invalidCheck = []
        this.$LjNotify('success', {
          title: '提示',
          message: warn
        });

      })


    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";
#theme_name {
  #invalid_dailog {
    .dialog_main {
      overflow: hidden;
    }
    .checkbox {
      height: 100px;
      .el-checkbox__inner {
        border-radius: 50%;
      }
      .el-checkbox__label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .tit {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #686874;
          span + span {
            margin-top: 10px;
          }
        }
        .imgBox {
          height: 100px;
          width: 400px;
          overflow-x: scroll;
          display: flex;
          justify-content: flex-start;
          margin-left: 10px;
          @include scroll;
          img {
            width: 80px;
            height: 80px;
            border-radius: 8px;
          }
          img + img {
            margin-left: 20px;
          }
        }
      }
    }
    .checkbox + .checkbox {
      margin-top: 30px;
    }
  }
}

#theme_name.theme1 {
  #invalid_dailog {
  }
}
</style>

