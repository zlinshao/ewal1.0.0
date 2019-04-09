<template>
  <div id="dataBase">
    资料库
  </div>
</template>

<script>
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';
  import LjDialog from '../../../common/lj-dialog.vue';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjDialogImg from '../components/lj-dialog-img';//用于显示二维码图片
  import OrgChoose from '../../../common/lightweightComponents/OrgChoose';
  import UserChoose from "../../../common/lightweightComponents/UserChoose";


  export default {
    name: "index",
    props: ['searchVal', 'in_repository_visible'],
    components: {
      UserChoose,
      LjDialog,
      LjDialogImg,
      DropdownList,
      OrgChoose
    },
    data() {
      return {

        rules: {
          inRepositoryRules: {
            goods: [
              {required: true, message: '请选择物品', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            counts: [
              {type:'number',required: true, message: '请输入数量且只能为数字', trigger: 'blur'},
            ],
            location: [
              {required: true, message: '不能为空', trigger: 'change'},
            ],
            purchasePerson: [
              {required: true, message: '不能为空', trigger: 'change'},
            ],
            price: [
              {type:'number',required: true, message: '请输入价格且只能为数字', trigger: 'blur'},
            ],
            totalPrice: [
              {type:'number',required: true, message: '请输入价格且只能为数字', trigger: 'blur'},
            ],
            resource: [
              {type:'number',required: true, message: '请输入价格采购源', trigger: 'blur'},
            ],
          },
          addGoods: {
            classify: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            brand: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            unit: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            counts: [
              {type:'number',required: true, message: '请输入数量且只能为数字', trigger: 'blur'},
            ],
          },
          addCategory: {
            name: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
          },
        },


        DROPDOWN_CONSTANT,
        url: globalConfig.humanResource_server,

        //tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
        },
        //chooseRowIds: [],


        currentTable: '',
        tableSettingData: {
          repository: {//入库
            counts: 0,
            params: {
              search: '',
              page: 1,
              limit: 5,
            },
            tableData: [],
            chooseRowIds: [],
            currentSelection: {}//当前选择行
          },
          goods: {//物品
            counts: 0,
            params: {
              search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行,
            multiSelection: [],//多选行
            isShowMulti: false,//是否显示多选
          },
          borrowReceive: {//领/借用
            counts: 5,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//借/领用form表单控制
            table_dialog_title: '',
            tableData: [],//借/领用表格数据
            tableShowData: {
              department: '部门',
              name: '姓名',
              applyType: '申请类型',
              applyTime: '申请日期',
              takeTime: '领用日期',
              returnTime: '归还日期'
            },

          },
          repair: {//维修
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行
            that: this,

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              department: '部门',
              name: '姓名',
              //repairId: '维修编号',
              repairCost: '维修费用',
              settlement: '结算方式',
            },

          },
          useless: {//报废
            counts: 5,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              department: '部门',
              name: '姓名',
              goods_number: '报废编号',
              responsiblePerson: '任责人',
              repair_price: '维修费用',
              payment_type: '结算方式',
            },
          },
          inRepository: {//入库详情列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,
              init() {
                this.page = 1;
                this.limit = 5;
              }
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              name: '物品名',
              count: '数量',
              price: '单价',
              totalPrice: '总价',
              location: '存放位置',
              purchasePerson: '采购人',
              resource: '采购源',
              inRepositoryTime: '入库时间',
              //qrCode:'二维码',
              //remark:'备注',
            },
            searchParams: '',//入库详情table dialog中的模糊搜索
          },
          qrCode: {//二維碼详情列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            form: {//二维码表单
              form_dialog_visible: false,
              formData: {
                id: '',
                repairId: '',//维修编号
                qrCode: ''
              }
            }
          },
        },

        formSettingData: {
          inRepository: {
            placeholder: '请选择人员',
          }
        },

        /*
            *表单群组  begin
        */

        //借/领用表单
        /*tableSettingData.borrowReceive.table_dialog_visible: false,//借/领用form表单控制
        borrowData: [],//借/领用表格数据
        borrowShowData: {
          department: '部门',
          name: '姓名',
          applyType: '申请类型',
          applyTime: '申请日期',
          takeTime: '领用日期',
          returnTime: '归还日期'
        },*/

        //维修表单
        /*tableSettingData.repair.table_dialog_visible: false,//维修form表单控制
        repairData: [],//维修表格数据
        repairShowData: {
          department: '部门',
          name: '姓名',
          repairId: '维修编号',
          repairCost: '维修费用',
          settlement: '结算方式',
        },*/

        //报废表单
        useless_table_visible: false,//报废form表单控制
        uselessData: [],//报废表单数据
        uselessShowData: {
          department: '部门',
          name: '姓名',
          uselessId: '报废编号',
          responsiblePerson: '任责人',
          repairCost: '维修费用',
          settlement: '结算方式',
        },

        /*
            *表单群组  end
        */

        /*
        *  表单群组  begin
        * */


        //入库form
        in_repository: false,
        in_repository_placeholder: '请选择人员',
        in_repository_form: {//入库form表单
          goods: '',
          counts: '',//数量
          department: 'user',//部门
          location: '',
          purchasePerson: '',
          price: '',//单价
          totalPrice: '',//总价
          resource: '',//采购源
          remark: '',//备注
        },

        //选择物品table
        choose_goods_table_visible: false,
        chooseGoodsData: [],//选择物品表单数据
        chooseGoodsShowData: {
          classify: '分类',//分类
          name: '名称',//名称
          brand: '品牌',//品牌
          unit: '单位',//单位
          counts: '预警数量',//预警数量
        },

        //添加物品
        add_goods_form_visible: false,
        add_goods_form: {
          classify: '',//分类
          brand: '',//品牌
          name: '',//名称
          unit: '',//单位
          counts: '',//预警数量
          remark: '',//备注
        },

        //添加目录结构
        add_category_visible: false,
        add_category_form: {
          name: '',
          type: 1,
        },
        add_category_form_tip: {
          title: '添加分类',
          label: "分类名称",
        },


        //入库详情
        in_repository_table_visible: false,
        inRepositoryData: [],//选择物品table数据
        inRepositoryShowData: {
          name: '物品名',
          count: '数量',
          price: '单价',
          totalPrice: '总价',
          location: '存放位置',
          purchasePerson: '采购人',
          resource: '采购源',
          inRepositoryTime: '入库时间',
          //qrCode:'二维码',
          //remark:'备注',
        },

        /*//二维码table
        qr_code_table_visible: false,
        qrCodeData: [],//二维码table数据*/

        //显示二维码
        is_show_qr_code: false,
        /*
        *  表单群组  end
        * */

      }
    },
    mounted() {
      this.getRepositoryList();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getRepositoryList();
        },
        deep: true
      },
      in_repository_visible: {
        handler(val, oldVal) {
          this.in_repository = !this.in_repository;
        },
        //deep:true,
        //immediate:true//第一次绑定也执行
      },

    },
    computed: {},
    methods: {

      //入库表单提交
      inRepository() {

        this.$refs['inRepositoryForm'].validate((valid) => {
          if (valid) {//成功
            let params = {
              category_id: this.in_repository_form.goods,
              number: this.in_repository_form.counts,
              unit_price: this.in_repository_form.price,
              total_price: this.in_repository_form.totalPrice,
              source_id: this.in_repository_form.resource,
              purchaser_id: this.in_repository_form.purchasePerson.join(),
              location_type: this.in_repository_form.department,
              location_id: this.in_repository_form.location,
              remark: this.in_repository_form.remark,
            };
            let urls = `${this.url}eam/storage`;
            this.$http.post(urls, params).then(res => {
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: '添加成功',
                });
                this.in_repository = false;
                this.getRepositoryList();
              }
              else {
                this.$LjNotify('error',{
                  title:'失败',
                  message:res.msg,
                });
              }
            });
          }
        });
      },


      //选择物品后将名字渲染到入库表单的选择物品字段上
      chooseGoods() {
        let id = this.tableSettingData[this.currentTable].currentSelection?.id || '';
        if (id) {
          this.in_repository_form.goods = id;
          this.choose_goods_table_visible = false;
          this.tableSettingData[this.currentTable].currentSelection = {};
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: '请选择一件物品',
          });
        }
      },

      //删除物品
      async deleteGoods() {
        this.$LjConfirm().then(async () => {
          let goodsList = this.tableSettingData['goods']?.multiSelection;
          if (goodsList && goodsList.length > 0) {
            for (let item of goodsList) {
              await this.$http.delete(`${this.url}eam/category/${item.id}`).then(res => {
                if (res.code == '20040') {
                  this.$LjNotify('success', {
                    title: '成功',
                    message: '删除成功'
                  });
                }
                this.$refs.categoryDropdown2.update();//更新
              }).catch(err => {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg
                });
              });
            }
            this.tableSettingData.goods.isShowMulti = false
            await this.getGoodsList();
          }
        });

      },


      async getGoodsList() {
        this.choose_goods_table_visible = true;
        this.currentTable = 'goods';
        this.chooseGoodsData = [];
        let params = {type: 2, ...this.tableSettingData[this.currentTable].params};
        await this.$http.get(this.url + 'eam/category', params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                name: item.id + item.name,
                classify: item?.parent?.name || '',
                brand: item?.brand?.name || '',
                unit: item?.unit?.name || '',
                counts: item?.warning_number || 0
              }
              this.chooseGoodsData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }

        })
      },


      saveGoods() {
        this.$refs['addGoodsForm'].validate((valid) => {
          if (valid) {//成功
            let params = {
              name: this.add_goods_form.name,
              parent_id: this.add_goods_form.classify,
              type: 2,
              brand_id: this.add_goods_form.brand,
              unit_id: this.add_goods_form.unit,
              warning_number: this.add_goods_form.counts,
              remarks: this.add_goods_form.remark
            };
            this.$http.post(`${this.url}eam/category`, params).then(res => {
              if (res.code == '20010') {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                });
                this.add_goods_form_visible = false;
                this.add_goods_form = {};
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                });
              }
              this.$refs.categoryDropdown2.update();//更新
            });
          }
        });
      },

      //添加category
      addCategory(index) {
        this.add_category_visible = true;
        switch (index) {
          case 1:
            this.add_category_form.type = 1;//
            this.add_category_form_tip.title = '添加分类';
            this.add_category_form_tip.label = '分类名称';
            break;
          case 3:
            this.add_category_form.type = 3;//
            this.add_category_form_tip.title = '添加品牌';
            this.add_category_form_tip.label = '品牌名称';
            break;
          case 4:
            this.add_category_form.type = 4;//
            this.add_category_form_tip.title = '添加单位';
            this.add_category_form_tip.label = '单位名称';
            break;
          case 5:
            this.add_category_form.type = 5;//
            this.add_category_form_tip.title = '添加采购源';
            this.add_category_form_tip.label = '采购源';
            break;

        }
      },

      //保存( 分类-1 品牌-3 单位-4 采购源-5 )的目录
      saveCategory() {
        //addCategoryForm
        this.$refs['addCategoryForm'].validate((valid) => {
          if (valid) {//成功
            this.$http.post(this.url + 'eam/category', this.add_category_form).then(res => {
              if (res.code == '20010') {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                  //subMessage: res.msg,
                });
                this.add_category_visible = false;
                this.$refs['categoryDropdown' + this.add_category_form.type].update();
                this.add_category_form = {};
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                  //subMessage: res.msg,
                });
              }
            });
          }
        });
      },


      getRepositoryList() {
        this.currentTable = 'repository';
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(this.url + 'eam/eam', this.tableSettingData[this.currentTable].params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                category_id: item?.category_id || '-',
                name: item?.goods?.name || '-',
                totalCounts: parseInt(item?.number) || '-',//总数量
                stockCounts: parseInt(item?.now_number),//库存数量
                borrowReceiveCounts: `${parseInt(item?.receive_number)}/${parseInt(item?.borrow_number)}`,
                repairCounts: parseInt(item?.repair_number),
                uselessCounts: parseInt(item?.scrap_number),
                //status: parseInt(item?.number) - parseInt(item?.goods?.warning_number) > 10 ? '正常' : '预警',
                //status: parseInt(item?.number) > 10 ? '正常' : '预警',
                status: parseInt(item?.number),
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取领/借表格详情
      getBorrowReceiveList(item) {
        this.tableSettingData.borrowReceive.table_dialog_visible = true;
        this.currentTable = 'borrowReceive';
        this.tableSettingData[this.currentTable].table_dialog_title = item.name;
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(this.url + `eam/eam/${item.category_id}/records`, this.tableSettingData[this.currentTable].params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                department: item?.user?.org[0]?.name || '-',
                name: item?.user?.name || '',
                applyType: item?.goods?.type == '1' ? '领用' : '借用',
                applyTime: item?.process?.apply_time || '-',
                takeTime: item?.receive_time || '-',
                returnTime: item?.return_date || '-',
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取维修表格详情
      getRepairList(item) {
        this.currentTable = 'repair';
        this.tableSettingData.repair.table_dialog_visible = true;
        this.tableSettingData[this.currentTable].table_dialog_title = item.name;
        this.tableSettingData[this.currentTable].tableData = [];
        let params = {...this.tableSettingData[this.currentTable].params, ...{goods_status: 3}};
        this.$http.get(this.url + `eam/eam/${item.category_id}/records`, params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                department: item?.user?.org[0]?.name || '',
                name: item?.user?.name || '',
                repairCost: item?.repair_price,
                settlement: item?.payment_type == 1 ? '现金结算' : '工资扣款',
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取报废表格详情
      getUselessList(item) {
        debugger
        this.currentTable = 'useless';
        this.tableSettingData[this.currentTable].table_dialog_visible = true;
        this.tableSettingData[this.currentTable].table_dialog_title = item.name;
        this.tableSettingData[this.currentTable].tableData = [];
        let params = {...this.tableSettingData[this.currentTable].params, ...{goods_status: 4}};
        this.$http.get(this.url + `eam/eam/${item.category_id}/records`, params).then(res => {

          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                department: item?.user?.org[0]?.name || '-',
                name: item?.user?.name || '-',
                goods_number: item.goods_number || '-',
                responsiblePerson: item.process?.responsible?.responsible_info?.name || '-',//任责人
                repair_price: item?.process?.responsible?.repair_price || 0,//维修费用
                payment_type: DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.PAYMENT[item.process?.responsible?.payment_type || 0],
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取入库详情table表格数据
      getInRepositoryList(categoryId, searchParams) {
        this.currentTable = 'inRepository';
        this.tableSettingData[this.currentTable].tableData = [];
        if (searchParams) this.tableSettingData[this.currentTable].params.init();
        let params = {category_id: categoryId, search: searchParams};
        let finalParams = {...params, ...this.tableSettingData[this.currentTable].params};
        this.$http.get(`${this.url}eam/storage`, finalParams).then(res => {
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id || '-',
                name: item.goods?.name || '-',
                count: item.number || 0,
                price: item.unit_price || 0,
                totalPrice: item.total_price || 0,
                location: item.location?.location?.name || '-',
                purchasePerson: item?.purchaser?.name || '-',
                resource: item.source?.name || '-',
                inRepositoryTime: item.created_at || '-',
                remark: item.remark || '-'
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        });
      },

      //获取二维码列表table表格数据
      getQrCodeList(inRepoId) {
        this.currentTable = 'qrCode';
        this.tableSettingData.qrCode.table_dialog_visible = true
        this.tableSettingData[this.currentTable].tableData = [];
        //let params = {category_id:categoryId};
        //let finalParams = {...params,...this.tableSettingData[this.currentTable].params};
        this.$http.get(`${this.url}eam/storage/${inRepoId}/qrcode`).then(res => {
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id || Date.now(),
                repairId: item?.goods_number || '-',
                qrCode: item?.img?.replace('/\\', '')
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            //this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        });
      },

      showQrCode(row) {
        this.tableSettingData.qrCode.form.form_dialog_visible = true;
        this.tableSettingData.qrCode.form.formData.qrCode = row.qrCode;
        this.tableSettingData.qrCode.form.formData.goods_number = row.repairId;//维修编号

      },

      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },


      // 当前点击
      tableClickRow(row,currentTable) {
        this.tableSettingData[currentTable].currentSelection = row;
        let ids = this.tableSettingData[currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);
      },

      //表格某一行双击 ->特指 inRepository表格  即入库详情列表表格
      tableDblClick(row) {
        let categoryId = row.category_id;//物品编号 通过物品编号获取所有的入库记录
        this.tableSettingData[this.currentTable].currentSelection = row;
        this.getInRepositoryList(categoryId);
        this.in_repository_table_visible = true;
      },
      //table多选时触发的事件
      handleSelectionChange(val) {
        switch (this.currentTable) {
          case 'repository':
            break;
          case 'goods':
            this.tableSettingData[this.currentTable].multiSelection = val;
            break;
          default:
            break;
        }
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.tableSettingData[this.currentTable].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val, type) {
        if (type) {
          this.currentTable = type;
        }
        this.tableSettingData[this.currentTable].params.page = val;
        switch (this.currentTable) {
          case 'repository':
            this.getRepositoryList();
            break;
          case 'goods':
            this.getGoodsList();
            break;
          case 'inRepository':
            let categoryId = this.tableSettingData[this.currentTable].currentSelection.category_id;
            this.getInRepositoryList(categoryId);
            break;
          default:
            break;
        }
      },

    },

  }
</script>


<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/repository/overView/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/repository/overView/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #overView {

      .dialog_container {
        .choose-goods-icon {
          @include childrenImg('xz.png', 'theme1')
        }
      }

      .qr-code {
        @include childrenImg('ewm.png', 'theme1')
      }

      .qr-container {
        .qr-code-large {
          @include childrenImg('ewm.png', 'theme1')
        }

      }

    }
  }

  #theme_name.theme2 {
    #overView {

    }
  }

  #theme_name.theme3 {
    #overView {

    }
  }

  #theme_name.theme4 {
    #overView {

    }
  }
</style>
