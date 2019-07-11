<template>
  <div class="purchase-apply-dialog">
    <lj-dialog :visible.sync="apply_dialog_visible"
               :size="{width:'1300px',height:'800px'}"
               @close="cancelDialog">
      <div v-show="isLoading"
           style="width: 90%;height: 100%;"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(255, 255, 255, 0)">
      </div>

      <div v-show="!isLoading" class="dialog_container">
        <div class="dialog_header">
          <h3>采购申请</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">

            <el-form ref="purchaseForm1" :rules="purchase_form_rule" :model="purchase_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-form-item required prop="date" label="采购日期">
                <div class="items-center iconInput" style="width: 650px">
                  <el-date-picker v-model="purchase_form.date" type="date"
                                  placeholder="请选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>

              <el-form-item required prop="procurement_id" label="采购人">
                <user-choose ref="userChoose" v-model="purchase_form.procurement_id" num="1"
                             width="650"></user-choose>
              </el-form-item>

              <el-form-item label="所属部门">
                <el-input disabled v-model="purchase_form.procurement_org" placeholder="自动获取"
                          style="width: 650px">
                </el-input>
              </el-form-item>

              <el-form-item required prop="reason" label="采购原因">
                <el-input type="textarea" style="width: 650px"
                          v-model="purchase_form.reason"
                          :autosize="{ minRows: 2, maxRows: 14}"
                          placeholder="请输入采购原因">
                </el-input>
              </el-form-item>

              <el-form-item class="purchase-priority" align="center" label="紧急程度">
                <el-radio-group v-model="purchase_form.priority">
                  <el-radio :label="50">正常</el-radio>
                  <el-radio :label="60">重要</el-radio>
                  <el-radio :label="70">紧急</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <div class="purchase-line"></div>

            <div class="detail-content" v-for="(detail_item,index) in detail">
              <div class="detail-title">
                <span class="detail-title-text">明细{{index+1}}</span>
                <span class="btn_add" style="position: absolute;right: 0px;top: 0px;"
                      v-if="index==0"
                      @click="handleDetailInfo(index)">+</span>
                <span class="btn_add"
                      style="position: absolute;right: 0px;top: 0px; background-color: #D2D2D2;"
                      v-if="index>0"
                      @click="handleDetailInfo(index)">-</span>
              </div>
              <el-form :ref="'detailForm'+index" :rules="detailForm_rule" :model="detail[index]"
                       style="text-align: left" size="small" label-width="100px">
                <el-form-item prop="category_id" label="物品类别">
                  <dropdown-list ref="categoryDropdown1" width='650'
                                 :url="`${url}eam/category`"
                                 :params="{'type':'1'}"
                                 title="请选择物品类别"
                                 @name-change="detail[index].category_name = $event"
                                 v-model="detail[index].category_id">
                  </dropdown-list>
                </el-form-item>

                <el-form-item prop="name" label="名称">
                  <el-input placeholder="请输入名称" style="width: 650px"
                            v-model="detail[index].name">
                  </el-input>
                </el-form-item>

                <el-form-item prop="number" label="数量">
                  <el-input placeholder="请输入数量" style="width: 650px"
                            v-model.number="detail[index].number">
                  </el-input>
                </el-form-item>

                <el-form-item prop="unit_price" label="总价">
                  <el-input placeholder="请输入总价" style="width: 650px"
                            v-model="detail[index].unit_price">
                  </el-input>
                </el-form-item>

                <el-form-item prop="source_key" label="采购源">
                  <el-select placeholder="请选择采购源" style="width: 650px;"
                             v-model="detail[index].source_key">
                    <el-option v-for="(item,index) in goods_source_options"
                               :key="index"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>

            <div class="purchase-line"></div>

            <el-form :model="purchase_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-form-item label="总数量">
                <span v-if="purchase_form_number">{{purchase_form.number}}</span>
              </el-form-item>

              <el-form-item label="总价">
                <span v-if="purchase_form_total_price">{{purchase_form.total_price}}</span>
              </el-form-item>
            </el-form>

            <div class="purchase-line"></div>

            <el-form :model="purchase_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-form-item align="center" label="添加附件">
                <lj-upload v-model="purchase_form.attachment" size="40"
                           style="position: absolute; top: -12px;">
                </lj-upload>
              </el-form-item>
            </el-form>

            <div class="purchase-approval-process">
              <!--          流程组件-->
              <ApprovalProcess :user_info="user_info"
                               :type="purchase_form.type"
                               @is-show-loading="isLoading = $event">
              </ApprovalProcess>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="submitDialog">提交</el-button>
          <el-button size="small" type="info" @click="cancelDialog">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ApprovalProcess from '../ApprovalProcess';

  /**初始化数据 */
  function createEmpty() {
    return {
      type: "procurement",
      // 申请日期
      date: '',
      // 申请原因
      reason: null,
      procurement_id: null,
      procurement_org: null,
      number: null,
      total_price: null,
      // 附件
      attachment: [],
      priority: 50
    }
  }

  var validatorPass1 = (rule, value, callback) => {
    let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请保留两位小数'))
    }
  }

  export default {
    name: "PurchaseApply",
    props: ['user_info_all', 'size', 'addUrl'],
    components: {
      ApprovalProcess
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        apply_dialog_visible: false,
        isLoading: true,
        purchase_form: createEmpty(),
        // 物品类别
        goods_category_options: [],
        // 采购源
        goods_source_options: [
          {
            id: 1,
            name: '淘宝'
          },
          {
            id: 2,
            name: '京东'
          },
          {
            id: 3,
            name: '小米商城'
          },
          {
            id: 4,
            name: '市场'
          }
        ],
        purchase_form_rule: {
          date: [
            {required: true, message: '请选择采购日期', trigger: ['blur', 'change']}
          ],
          procurement_id: [
            {required: true, message: '请选择采购人员', trigger: ['blur', 'change']}
          ],
          reason: [
            {required: true, message: '请输入采购原因', trigger: ['blur', 'change']},
            {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
          ]
        },
        detailForm_rule: {
          category_id: [
            {required: true, message: '请选择物品种类', trigger: ['blur', 'change']}
          ],
          name: [
            {required: true, message: '请输入名称', trigger: ['blur', 'change']}
          ],
          number: [
            {required: true, message: '请输入数量', trigger: ['blur', 'change']}
          ],
          unit_price: [
            {required: true, message: '请输入总价', trigger: ['blur', 'change']},
            {validator: validatorPass1, trigger: ['blur', 'change']}
          ],
          source_key: [
            {required: true, message: '请输入采购源', trigger: ['blur', 'change']}
          ]
        },
        // 明细
        detail: [
          {
            category_id: null,
            name: null,
            number: null,
            unit_price: null,
            source_key: null,
            source_id: {
              id: null,
              name: null
            }
          }
        ],
        // 用户信息
        user_info: null
      }
    },
    computed: {
      purchase_form_number() {
        return this.purchase_form.number ? true : false
      },

      purchase_form_total_price() {
        return this.purchase_form.total_price ? true : false
      },

    },
    watch: {
      detail: {
        handler(newValue, oldValue) {
          this.handleTotalNumberPrice(newValue)
        },
        immediate: true,
        deep: true
      },
      'purchase_form.procurement_id': {
        handler(newValue, oldValue) {
          this.handleProcurementOrg(newValue)
        }
      }
    },
    methods: {
      open() {
        this.apply_dialog_visible = true
      },
      reset() {
        this.purchase_form = createEmpty()
        this.detail = [
          {
            category_id: null,
            name: null,
            number: null,
            unit_price: null,
            source_key: null,
            source_id: {
              id: null,
              name: null
            }
          }
        ]
      },
      submitDialog() {
        /**校验 */
        this.$refs.purchaseForm1
          .validate(valid => {
            if (valid) {
              this.validateDetail()
                .then(result => {
                    if (result) {
                      this.detail.map((item, index) => {
                        item.source_id = _.find(this.goods_source_options, {id: item.source_key})
                      })

                      this.purchase_form.procurement_id = this.purchase_form.procurement_id[0]
                      this.purchase_form.date = this.myUtils.formatDate(this.purchase_form.date, 'yyyy-MM-dd');
                      this.purchase_form.detail = this.detail
                      let {date, procurement_org, reason, number, total_price} = this.purchase_form
                      let detail = this.detail.map((item, index) => {
                        return [
                          {key: '物品类别', value: item.category_name},
                          {key: '名称', value: item.name},
                          {key: '数量', value: item.number},
                          {key: '总价', value: item.unit_price},
                          {key: '采购源', value: item.source_id.name},
                        ]
                      })

                      let data = {
                        ...this.purchase_form,
                        more_data: [
                          {key: '采购日期', value: date},
                          {key: '采购人员', value: this.$refs.userChoose.user_name.join(' ')},
                          {key: '所属部门', value: procurement_org},
                          {key: '采购原因', value: reason}
                        ],
                        detail_info: detail,
                        total_number_price: [
                          {key: '总数量', value: number},
                          {key: '总价', value: total_price}
                        ]
                      }
                      this.showLoading2(true)
                      this.$http.post(this.addUrl, data)
                        .then(res => {
                          this.showLoading2(false)
                          this.$LjMessageEasy(res, () => {
                            this.apply_dialog_visible = false;
                            this.reset()
                          })
                        })
                    }
                  }
                )
            } else {
              return false
            }
          })
      },
      cancelDialog() {
        this.apply_dialog_visible = false
        this.reset()
      },
      /**明细 */
      handleDetailInfo(index) {
        let item = {
          category_id: null,
          name: null,
          number: null,
          unit_price: null,
          source_id: {
            id: null,
            name: null
          }
        }
        if (index == 0) {
          this.detail.push(item)
          return
        }
        this.$delete(this.detail, index)
      },
      /**计算总数总价 */
      handleTotalNumberPrice(detail) {
        this.purchase_form.number = 0
        this.purchase_form.total_price = 0
        detail.forEach(item => {
          this.purchase_form.number += item.number
          this.purchase_form.total_price += item.unit_price
        })
      },
      /**获取采购人员信息 */
      handleProcurementOrg(procurement_id) {
        this.$http.getUserInfoById(procurement_id)
          .then(userInfo => {
            if (userInfo) {
              let {org} = userInfo
              this.purchase_form.procurement_org = org[0].name
            }
          })
      },
      /**校验明细表单*/
      validateDetail() {
        return Promise.all(
          this.detail.map((item, index) => {
            return this.$refs["detailForm" + index][0].validate();
          })
        )
          .then(() => true)
          .catch(e => {
            return false;
          });
      },
      /**获取个人信息 */
      getUserInfo() {
        this.user_info = {
          name: this.user_info_all.name,
          org: this.user_info_all.org[0].name,
          user_id: this.user_info_all.id,
          org_id: this.user_info_all.org[0].id,
        }
      }
    },
    created() {
      this.getUserInfo()
    }
  }
</script>

<style lang="scss">
  #theme_name.theme1 {
    #approval {
      .purchase-priority {
        .el-form-item__content {
          text-align: left;

          .el-radio {
            display: inline-block;
          }
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  @import "../../../../assets/scss/approval/commponents/purchaseDialog.scss";
</style>
