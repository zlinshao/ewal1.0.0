<template>
  <div class="goods-apply-dialog">
    <lj-dialog :visible.sync="goods_dialog_visible"
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
          <h3>物品领/借用</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="dialog-top">

            <el-form ref="purchaseForm1" :rules="goods_form_rule" :model="goods_form"
                     style="text-align: left" size="small" label-width="100px">

              <el-form-item required prop="apply_type" label="类别">
                <el-select placeholder="请选择类别" style="width: 650px;"
                           v-model="goods_form.apply_type">
                  <el-option v-for="(item,index) in goods_category_options"
                             :key="index"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item required prop="date" label="申请日期">
                <div class="items-center" style="width: 650px">
                  <el-date-picker v-model="goods_form.date" type="date"
                                  placeholder="请选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>

              <el-form-item required prop="reason" label="物品用途">
                <el-input type="textarea" style="width: 650px"
                          v-model="goods_form.reason"
                          :autosize="{ minRows: 2, maxRows: 14}"
                          placeholder="请输入物品用途">
                </el-input>
              </el-form-item>

              <el-form-item class="purchase-priority" align="center" label="紧急程度">
                <el-radio-group v-model="goods_form.priority">
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
                <span class="btn_add" style="position: absolute;right: 0px;top: 0px; background-color: #D2D2D2;"
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
              </el-form>
            </div>
            <div class="purchase-line"></div>

            <el-form :model="goods_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-form-item label="总数量">
                <span v-if="goods_form_number">{{goods_form.number}}</span>
              </el-form-item>
            </el-form>

            <div class="purchase-line"></div>

            <el-form :model="goods_form"
                     style="text-align: left" size="small" label-width="100px">
              <el-form-item align="center" label="添加附件">
                <lj-upload v-model="goods_form.attachment" size="40"
                           style="position: absolute; top: -12px;">
                </lj-upload>
              </el-form-item>
            </el-form>

            <div class="purchase-approval-process">
              <!--          流程组件-->
              <ApprovalProcess :user_info="user_info"
                               :type="goods_form.type"
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
      type: "receive_borrow",
      apply_type: null,
      // 申请日期
      date: '',
      // 物品用途
      reason: null,
      number: null,
      // 附件
      attachment: [],
      priority: 50
    }
  }

  export default {
    name: "GoodsDialog",
    props: ['user_info_all', 'size', 'addUrl'],
    components: {
      ApprovalProcess
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        goods_dialog_visible: false,
        isLoading: false,
        goods_form: createEmpty(),
        // 类别
        goods_category_options: [
          {
            id: 1,
            name: '借用'
          },
          {
            id: 2,
            name: '领用'
          }
        ],
        goods_form_rule: {
          apply_type: [
            {required: true, message: '请选择类别', trigger: ['blur', 'change']}
          ],
          date: [
            {required: true, message: '请选择申请日期', trigger: ['blur', 'change']}
          ],
          reason: [
            {required: true, message: '请输入物品用途', trigger: ['blur', 'change']},
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
          ]
        },
        // 明细
        detail: [
          {
            category_id: null,
            name: null,
            number: null
          }
        ],
        // 用户信息
        user_info: null
      }
    },
    computed: {
      goods_form_number() {
        return this.goods_form.number ? true : false
      }
    },
    watch: {
      detail: {
        handler(newValue, oldValue) {
          this.handleTotalNumberPrice(newValue)
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      open() {
        this.goods_dialog_visible = true
      },
      reset() {
        this.goods_form = createEmpty()
        this.detail = [
          {
            category_id: null,
            name: null,
            number: null
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
                      this.goods_form.date = this.myUtils.formatDate(this.goods_form.date, 'yyyy-MM-dd');
                      this.goods_form.detail = this.detail
                      let {apply_type, date, reason, number} = this.goods_form
                      let apply_name = _.find(this.goods_category_options, {id: apply_type})?.name
                      let detail = this.detail.map((item, index) => {
                        return [
                          {key: '物品类别', value: item.category_name},
                          {key: '名称', value: item.name},
                          {key: '数量', value: item.number}
                        ]
                      })
                      let data = {
                        ...this.goods_form,
                        more_data: [
                          {key: '类别', value: apply_name},
                          {key: '申请日期', value: date},
                          {key: '物品用途', value: reason}
                        ],
                        detail_info: detail,
                        total_number_price: [
                          {key: '总数量', value: number}
                        ]
                      }
                      this.showLoading2(true)
                      this.$http.post(this.addUrl, data)
                        .then(res => {
                          this.showLoading2(false)
                          this.$LjMessageEasy(res, () => {
                            this.goods_dialog_visible = false;
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
        this.goods_dialog_visible = false
        this.reset()
      },
      /**明细 */
      handleDetailInfo(index) {
        let item = {
          category_id: null,
          name: null,
          number: null
        }

        if (index == 0) {
          this.detail.push(item)
          return
        }
        this.$delete(this.detail, index)
      },
      /**计算总数 */
      handleTotalNumberPrice(detail) {
        this.goods_form.number = detail
          .reduce((sum, item) => {
            return sum + item.number
          }, 0)
      },
      /**校验明细表单*/
      validateDetail() {
        return Promise.all(
          this.detail.map((item, index) => {
            return this.$refs["detailForm" + index][0]
              .validate();
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
  @import "../../../../assets/scss/approval/commponents/goodsDialog.scss";
</style>

