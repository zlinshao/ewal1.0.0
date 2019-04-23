<template>
  <LjDialog :visible="visible" :size="{width: 600 + 'px',height: 600 + 'px'}" @close="handleClose" id='invalid_dailog'>
    <div class='dialog_container'>
      <div class='dialog_header'>
        <h3>作废重签</h3>
      </div>
      <div class="dialog_main" v-if='visible'>
        <el-checkbox-group v-model="invalidCheck" @change="handleChecked">
          <el-checkbox v-for="item in Object.keys(ablum)" :label="item" :key="item" class='checkbox'>
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
        <el-button type="danger" size="small" @click="handleAdd">确定</el-button>
        <el-button type="info" size="small" @click="handleClose">取消</el-button>
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
      }
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
      this.$emit('close', false)
      this.invalidCheck = []
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/common.scss";
#theme_name {
  #invalid_dailog {
    .checkbox {
      height: 80px;
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
          overflow-x: scroll;
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
      margin-top: 50px;
    }
  }
}

#theme_name.theme1 {
  #invalid_dailog {
  }
}
</style>

