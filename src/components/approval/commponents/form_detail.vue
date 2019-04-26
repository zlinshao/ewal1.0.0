<template>
  <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
    <div class='dialog_container' id='form_detail'>
      <div class='dialog_header'>仙居雅苑</div>
      <div class='dialog_main'>

        <el-form label-width='120px' v-for='(form,slither,index) in defineReport' :key='slither' v-if='visible && formData'>

          <VillageContainer :village="titleTips[index]">
            <!-- 付款信息 循环 row -->
            <el-row :gutter='10' v-if='titleTips[index]=="付款信息"'>
              <el-col :span='8' v-if='titleTips[index]=="客户信息"'>
                <el-form-item v-for='(cell,cellIndex) in form' :key='cell.keyName' :label='cell.label'>
                  <el-input :type='cell.type' v-model='formData[cell.keyName]' :placeholder='cell.num || cell.placeholder' />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter='10'>
              <el-col :span='cell.formSpan ? cell.formSpan : formSpan' v-for='(cell,cellIndex) in form' :key='cell.keyName'>

                <!-- 可增加或者减少 -->
                <el-form-item :label='child.label' v-for='(child,child_index) in cell.children' :key='child_index' v-if='cell.status == "changeCount"'>
                  <el-input :type='child.type' v-model='formData[cell.keyName][cellIndex][child.keyName]' :placeholder='child.placeholder' />
                </el-form-item>

                <!-- 按钮 -->
                <div v-if='cell.button' class='button_box'>
                  <i class='icons icons_add' @click='changeCount(cell.keyName,cell.children)'></i>
                  <span>{{cell.button}}</span>
                </div>

                <el-form-item :label='cell.label' v-else-if='cell.status != "changeCount"'>

                  <template v-if='cell.status== "radio"'>
                    <el-radio v-model="formData[cell.keyName]" :label="dict_index" v-for='(dict,dict_index) in dicties[cell.keyName]'
                      :key='dict_index'>{{dict}}</el-radio>
                  </template>

                  <!-- 多个选择checkbox -->
                  <template v-if='cell.status== "checkbox"&& cell.children'>
                    <el-select v-model="formData[cell.keyName][child_index]" :placeholder="child.placeholder" v-for='(child,child_index) in cell.children'
                      :key='child_index' class='more_checkbox'>
                      <el-option v-for='(item,idx) in dicties[cell.keyName]["value_"+child_index]' :key="idx" :label="item"
                        :value="idx" />
                    </el-select>
                  </template>

                  <template v-if='cell.status== "checkbox" && !cell.children'>
                    <el-select v-model="formData[cell.keyName]" :placeholder="cell.placeholder">
                      <el-option v-for='(item,idx) in dicties[cell.keyName]' :key="idx" :label="item" :value='idx' />
                    </el-select>
                  </template>

                  <template v-if='cell.status== "picktimer"'>
                    <el-date-picker v-model="formData[cell.keyName]" type="date" :placeholder="cell.placeholder"
                      :format="cell.format" />
                  </template>

                  <template v-if='cell.status == "input"'>
                    <!--多个input-->
                    <div class='input_box' v-for='(child,child_index) in cell.children' :key='child_index' v-if='cell.children'>
                      <el-input :type='cell.type' v-model='formData[cell.keyName][child_index][child.keyName]'
                        :placeholder='child.placeholder' />
                      <span>{{child.spanLabel}}</span>
                    </div>

                    <el-input :type='cell.type' v-model='formData[cell.keyName]' :placeholder='cell.num || cell.placeholder'
                      v-if='!cell.children' />
                  </template>

                  <template v-if='cell.status == "upload"'>
                    <Ljupload size='40' v-model='formData[cell.keyName]'></Ljupload>
                  </template>
                </el-form-item>

              </el-col>

            </el-row>
          </VillageContainer>

        </el-form>

      </div>
      <div class='dialog_footer'>
        <el-button type="danger" size="small" @click='handlerSure'>确定</el-button>
        <el-button type="info" size="small">取消</el-button>
      </div>
    </div>
  </LjDialog>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import VillageContainer from '../../customService/village/components/village-container.vue';
import Ljupload from '../../common/lightweightComponents/lj-upload'
export default {
  props: ['visible'],
  components: {
    LjDialog,
    VillageContainer,
    Ljupload
  },
  data () {
    return {
      formSpan: 8,
      formData: null,
      dicties,
      defineReport,
      titleTips: ['房屋信息', '合同信息', '付款信息', '客户信息'],
      market_server: globalConfig.market_server,
    }
  },
  created () {
    this.resetForm()
  },
  methods: {
    resetForm () {
      let formData = {}
      for (let label in this.defineReport) {
        let form = this.defineReport[label]
        form.forEach(item => {
          if (!item.keyName) return
          formData[item.keyName] = item.keyType
          if (item.children) {
            let newval = {}
            item.children.forEach(child => {
              newval[child.keyName] = child.keyType
            })
            formData[item.keyName].push(newval)
          }
        })
      }
      this.formData = formData
      console.log(this.formData)
    },
    changeCount (keyName, item) {
      this.formData[keyName].push(item[0])
    },
    handleClose () { },
    handlerSure () {
      console.log(this.formData)
    }
  }
}
</script>


<style lang="scss">
@import "../../../assets/scss/common.scss";

@mixin confirmImg($m, $n) {
  $url: "../../../assets/image/approval/" + $n + "/" + $m;
  @include bgImage($url);
}

#form_detail {
  .el-form-item {
    display: flex;
    .el-form-item__label {
      color: #b0b0b0;
    }
    .el-form-item__content {
      flex: 1;
      margin-left: 10px !important;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // .el-input,
      .el-input__inner {
        background: #f9f9f9;
      }
      input {
        border: none;
      }
      // 一行多个小的checkbox
      .more_checkbox {
        .el-input__inner {
          padding: 0 5px;
        }
      }
      .input_box {
        display: flex;
      }
    }
  }
  .button_box {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    .icons {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .icons_add {
      @include confirmImg("tianjia.png", "theme1");
    }
    .icons_del {
      @include confirmImg("shanchu.png", "theme1");
    }
    span {
      font-size: 14px;
      color: #cf2e33;
      font-family: "jingdianxingshu";
      margin-left: 10px;
    }
  }
  .dialog_footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
