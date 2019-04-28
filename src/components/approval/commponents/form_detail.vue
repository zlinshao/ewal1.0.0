<template>
  <div>
    <LjDialog :visible="visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container' id='form_detail' v-if='visible && moduleData'>
        <div class='dialog_header'>{{formData.house_address}}</div>
        <div class='dialog_main' id='form_dialog'>

          <el-form label-width='120px' v-for='(form,slither,index) in defineReport' :key='slither'>
            <VillageContainer :village="titleTips[index]">
              <!-- 付款信息 循环 row -->
              <el-row :gutter='10' v-if='titleTips[index]=="付款信息"'>
                <el-col :span='8' v-for='(cell,cellIndex) in form' :key='cell.keyName'>
                  <el-form-item :label='cell.label'>
                    <el-input :type='cell.type' v-model='formData[cell.keyName]' :placeholder='cell.num || cell.placeholder' />
                  </el-form-item>
                </el-col>
                <el-col :span='8'>
                  <div class='button_box'>
                    <!-- <i class='icons icons_add'></i> -->
                    <!-- <i class='icons icons_del' v-else></i> -->
                    <!-- <span>{{child_index==0?"增加":"删除"}}</span> -->
                  </div>
                </el-col>
              </el-row>
              <template v-else>
                <!-- 可增加或者减少 -->
                <el-row :gutter='10' v-for='(cell,cellIndex) in form' :key='cell.keyName' v-if='cell.type == "change"'>
                  <el-col :span='cell.formSpan || formSpan' v-for='(child,child_index) in cell.children' :key='child_index'>
                    <el-form-item :label='col.label' v-for='(col,col_index) in child' :key='col_index'>
                      <el-input :type='col.typeStatus' v-model='formData[cell.keyName][child_index][col.keyName]'
                        :placeholder='col.placeholder' v-if='col.type=="input"' />

                      <el-select v-model="formData[cell.keyName][child_index][col.keyName]" :placeholder="col.placeholder"
                        v-if='col.type=="picker"'>
                        <el-option v-for='(item,item_idx) in dicties[col.keyName]' :key="item_idx" :value='item_idx'
                          :label="item"></el-option>
                      </el-select>
                    </el-form-item>

                    <div class='button_box'>
                      <i class='icons icons_add' v-if='child_index==0' @click='changeAddCount(cell.keyName,slither,cellIndex,child)'></i>
                      <i class='icons icons_del' v-else @click='changeDelCount(cell.keyName,slither,cellIndex,child_index)'></i>
                      <span>{{child_index==0?"增加":"删除"}}</span>
                    </div>
                  </el-col>
                </el-row>

                <!-- 正常表单 -->
                <el-row :gutter='10' v-if='form.type != "change"'>
                  <el-col :span='cell.formSpan || formSpan' v-for='(cell,cellIndex) in form' :key='cell.keyName'>
                    <el-form-item :label='cell.label'>

                      <template v-if='cell.type== "radio"'>
                        <el-radio v-model="formData[cell.keyName]" v-for='(dict,dict_index) in dicties[cell.keyName]'
                          :key='dict_index' :value='dict_index' :label="dict" />
                      </template>

                      <!-- 多个选择checkbox -->
                      <template v-if='cell.type== "picker"'>
                        <div v-if='cell.children' class='more_checkbox'>
                          <el-select v-model="formData[cell.keyName][child_index]" :placeholder="child.placeholder"
                            v-for='(child,child_index) in cell.children' :key='child_index'>
                            <el-option v-for='(item,item_idx) in dicties[cell.keyName]["value_"+child_index]' :key="item_idx"
                              :value='item_idx' :label="item"></el-option>
                          </el-select>
                        </div>

                        <el-select v-model="formData[cell.keyName]" :placeholder="cell.placeholder" @change='changeSelect(cell.keyName,dicties[cell.keyName],$event)'
                          v-else>
                          <el-option v-for='(item,item_idx) in dicties[cell.keyName]' :key="item_idx" :value='item_idx'
                            :label="item"></el-option>
                        </el-select>
                      </template>

                      <template v-if='cell.type== "picktimer"'>
                        <el-date-picker v-model="formData[cell.keyName]" type="date" :placeholder="cell.placeholder"
                          :format="cell.format" />
                      </template>

                      <template v-if='cell.type == "input"'>
                        <div class='input_box' v-for='(child,child_index) in cell.children' :key='child_index' v-if='cell.children'>
                          <el-input :type='cell.type' v-model='formData[cell.keyName][child_index][child.keyName]'
                            :placeholder='child.placeholder' />
                          <span>{{child.spanLabel}}</span>
                        </div>

                        <el-input :type='cell.type' v-model='formData[cell.keyName]' :placeholder='cell.num || cell.placeholder'
                          v-if='!cell.children' />
                      </template>

                      <template v-if='cell.type == "upload"'>
                        <Ljupload size='40' v-model='formData[cell.keyName]'></Ljupload>
                      </template>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </VillageContainer>
          </el-form>

        </div>
        <div class='dialog_footer'>
          <el-button type="danger" size="small" @click='handlerSure'>确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </LjDialog>

  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import VillageContainer from '../../customService/village/components/village-container.vue';
import Ljupload from '../../common/lightweightComponents/lj-upload'

export default {
  props: ['visible', 'moduleData'],
  components: {
    LjDialog,
    VillageContainer,
    Ljupload,

  },
  data () {
    return {
      formSpan: 8,
      formData: null,
      copyFormData: null,
      dicties,
      defineReports: JSON.parse(JSON.stringify(defineReport)),
      titleTip: {
        1: ['房屋信息', '合同信息', '付款信息', '客户信息'],
      },
      disabled: false,
      type: 1,
      market_server: globalConfig.market_server,
    }
  },
  watch: {
    moduleData (val) {
      if (val) {
        this.getDetailForm()
      }
    }
  },
  computed: {
    defineReport () {
      return this.defineReports[this.type]
    },
    titleTips () {
      return this.titleTip[this.type]
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    resetForm () {
      let formData = {}
      for (let label in this.defineReport) {
        let form = this.defineReport[label]
        form.forEach(item => {
          if (!item.keyName) return
          formData[item.keyName] = item.keyValue

          if (item.children) {
            let isArr = ((typeof item.childType) == 'object'),
              children = isArr ? item.children[0] : item.children,
              newVal = {};
            children.forEach(child => {
              if (isArr) {
                newVal[child.keyName] = child.keyValue
              } else {
                formData[item.keyName].push(child.keyValue)
              }
            })

            if (isArr) {
              formData[item.keyName].push(newVal)
            }
          }

        })
      }
      this.formData = formData
    },
    changeAddCount (keyName, slither, index, child) { // 添加keyname  index 和 approval中的children
      this.formData[keyName].push(JSON.parse(JSON.stringify(this.formData[keyName][0])))
      this.defineReport[slither][index].children.push(child)
    },
    changeDelCount (keyName, slither, cellIndex, childIndex) {
      this.formData[keyName].splice(childIndex, 1)
      this.defineReport[slither][cellIndex].children.splice(childIndex, 1)
    },
    handleClose () { },
    handlerSure () {
      console.log(this.formData)
    },
    getDetailForm () {
      let content = JSON.parse(JSON.stringify(this.moduleData));
      this.copyFormData = JSON.parse(JSON.stringify(content))
      for (let item in this.formData) {
        if (typeof content[item] == 'object') {
          if (content[item].id) {
            this.formData[item] = content[item].id
          } else if (typeof content[item] != typeof this.formData[item]) {
            this.formData[item] = content[item].join(';')
          } else {
            this.formData[item] = content[item]
          }
        } else {
          this.formData[item] = content[item]
        }
      }
      console.log(this.formData)
    },
    changeSelect (keyName, dicties, $val) {
      this.copyFormData[keyName] = {
        id: $val,
        name: dicties[$val]
      }
      console.log(this.copyFormData)
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
#theme_name {
  #form_detail {
    #form_dialog {
      .el-col {
        .el-form-item {
          display: flex;
          height: 30px;
          margin-bottom: 10px;
          .el-form-item__label {
            color: #b0b0b0;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .el-form-item__content {
            flex: 1;
            height: 30px;
            margin-left: 10px !important;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            // .el-input,
            .el-input__inner {
              height: 30px;
              background: #f9f9f9;
            }
            input {
              border: none;
            }
            // 一行多个小的checkbox
            .more_checkbox {
              display: flex;
              .el-select {
                flex: 1;
              }
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
    }
  }
}
</style>
