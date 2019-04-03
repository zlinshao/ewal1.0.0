<template>
  <div id="contractManagement">
    <div>
      <!--头部-->
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b @click="show_market = true;show_shadow = true">...</b>
          </p>
          <h1>合同管理</h1>
          <h2 class="items-center">
              <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                    :class="{'chooseTab': chooseTab === item.id}">
                {{item.title}}<i></i>
              </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons search" @click="handleOpenHigh"></div>
        </div>
      </div>
      <!--表格中部-->
      <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">

        <el-table
          height="780px"
          :data="contractList"
          @row-dblclick="handleGetDetail"
        >
          <el-table-column label="签约时间" prop="sign_at" align="center"></el-table-column>
          <el-table-column label="合同编号" prop="contract_number" align="center"></el-table-column>
          <el-table-column label="地址" prop="house_name" align="center"></el-table-column>
          <el-table-column label="合同性质" prop="type" align="center"></el-table-column>
          <!--<el-table-column label="所属公司" prop="" align="center"></el-table-column>-->
          <el-table-column label="收房价格" prop="month_price" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.month_price && scope.row.month_price.length > 0">
                <span v-for="(item,index) in scope.row.month_price">
                  {{ item.price }} 元 / {{ item.period }}月 <a v-if="index !== scope.row.month_price.length - 1">;</a>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="付款方式" prop="pay_way" align="center"></el-table-column>
          <el-table-column label="开单人" prop="sign_user" align="center"></el-table-column>
          <el-table-column label="负责人" prop="org_leader" align="center"></el-table-column>
          <el-table-column label="部门" prop="sign_org" align="center"></el-table-column>
          <el-table-column label="审核状态" prop="verify_status.name" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!--<el-button type="primary" plain size="mini">查看审核记录</el-button>-->
              <!--<el-button type="warning" plain size="mini" @click="handleLookBackInfo(scope.row)">查看回访记录</el-button>-->
              <div>
                <el-button type="success" plain size="mini" @click="handleOpenPolishing(scope.row)">补齐资料</el-button>
                <div class="control_container flex" :class="{'show_control_container': show_control === scope.row.contract_id}">
                  <span v-for="tmp in choose_list" :key="tmp.id" :class="{'choose': current_choose_control === tmp.id }" @click="handleClickSpan(tmp,scope.row)">{{ tmp.val }}</span>
                </div>
                <div class="writingMode point_btn" @click="handleShowControl(scope.row)">···</div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="contractCount"
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage"
            >
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>

    <SearchHigh :module="highVisible" :show-data="searchData" @close="handleCloseHigh"></SearchHigh>
    <MarketMenuList :show-market="show_market" :show-shadow="show_shadow" @close="handleCloseMenu"></MarketMenuList>

    <!--查看回访记录-->
    <LjDialog
      :visible="backInfo_visible"
      :size="{width: 600 + 'px',height: 500 + 'px'}"
      @close="handleCloseLookBackInfo"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ currentRow.house_name }}</h3>
          <div class="header_right">
            回访记录
          </div>
        </div>
        <div class="dialog_main">
          <div class="back_info scroll_bar">
            <div>
              <div class="content flex" v-for="(item,key) in backInfo">
                <div>
                  <a>{{ item.add_user }}</a><br>
                  <span>{{ item.time }}</span>
                </div>
                <div class="flex-center">
                  <div class="circle flex-center">
                    <a></a>
                  </div>
                  <div class="line" v-if="key !== backInfo.length -1"></div>
                </div>
                <div>
                  <a>{{ item.record }}</a><br>
                  <p v-if="item.star">
                    <el-rate v-model="item.star" disabled></el-rate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseLookBackInfo">确定</el-button>
        </div>
      </div>
    </LjDialog>

    <!--资料补齐-->
    <lj-dialog
      :visible="data_polishing_visible"
      :size="{width: 550 + 'px',height: 600 + 'px'}"
      @close="handleCancelPolishing"
    >
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

    <!--合同详情-->
    <lj-dialog
      :visible="contract_detail_visible"
      :size="{width: 1200 + 'px',height: 800 + 'px'}"
      @close=""
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>合同详情</h3>
          <div class="header_right">
            <span>
              {{ contractDetail.contract_number }}
            </span>
            <el-button type="danger" size="mini" @click="handleRewrite">作废重签</el-button>
          </div>
        </div>
        <div class="dialog_main">
          <p style="text-align: left">房屋地址</p>
          <div class="base_house_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="签约时间">
                    <span>{{ contractDetail.sign_at }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格">
                    <div v-if="contractDetail.month_price && contractDetail.month_price.length > 0">
                      <p v-for="(item,key) in contractDetail.month_price" :key="key">
                        {{ item.price }}元 {{ item.period }}个月
                      </p>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="签约时长">
                    <span>{{ contractDetail.sign_month && contractDetail.sign_month.moth_to_year }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="押金(元)">
                    <span>{{ contractDetail.deposit_payed }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="违约金"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式">
                    <span>{{ contractDetail.pay_way }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="打房租日期"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="空置期">
                    <span>{{ contractDetail.ready_days }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="房东承担费用"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可否装修"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可否添加物品"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否渠道"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司合同"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注条款"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开单人"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门"></el-form-item>
                </el-col>
              </el-row>
            </el-form>

            <div class="type">{{ currentRow.type }}</div>
          </div>

          <p style="text-align: left">收款账户</p>
          <div class="account_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="收款人"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账号"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="支行"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="与房东关系"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中国银行"></el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p style="text-align: left">签约人及产权人信息</p>
          <div class="have_info">
            <el-form label-width="120px">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="姓名"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名"></el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号"></el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <p style="text-align: left">附件信息</p>
          <div class="other_info">
            <div style="text-align: right">
              <el-button type="danger" size="mini" @click="handleOpenPolishing(currentRow)">补齐资料</el-button>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--作废重签-->
    <lj-dialog
      :visible="rewrite_visible"
      :size="{width: 400 + 'px',height: 300 + 'px'}"
      @close="handleCancelRewrite"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>作废重签</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width="80px">
            <el-form-item label="备注">
              <el-input v-model="rewrite_note" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="mini" @click="handleSubmitRewrite">确定</el-button>
          <el-button type="info" size="mini" @click="handleCancelRewrite">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加标记-->
    <lj-dialog
      :visible="add_mark_visible"
    ></lj-dialog>
  </div>
</template>

<script>
  import SearchHigh from '../../common/searchHigh.vue';
  import MarketMenuList from '../components/market-menu-list.vue';
  import LjDialog from '../../common/lj-dialog.vue';
  import Upload from '../../common/upload.vue';

  export default {
    name: "index",
    components: { SearchHigh,MarketMenuList,LjDialog,Upload},
    data() {
      return {
        //添加标记
        add_mark_visible: false,
        mark_form: {

        },

        show_control: '',
        current_choose_control: '',
        choose_list: [
          {id: 1,val: '审核记录'},
          {id: 2,val: '回访记录'},
          {id: 3,val: '添加标记'},
        ],

        //作废重签
        rewrite_visible: false,
        rewrite_note: '',

        //合同详情
        contract_detail_visible: false,
        contractDetail: '',

        //资料补齐
        upload_file: {

        },
        currentRow: '',
        data_polishing_visible: false,
        polishing_params: {},
        property_number: '',
        mound_number: '',
        polishing_data: [
          {
            identity_photo: '证件照片',
            bank_photo: '银行卡照片',
            photo: '合同照片',
            water_photo: '水表照片',
            electricity_photo: '电表照片',
            gas_photo: '气表照片',
            checkin_photo: '交接单照片',
            auth_photo: '委托书照片',
            deposit_photo: '押金照片',
            promise: '承诺书照片',
            property_photo: '房产证照片',
            water_card_photo: '水卡照片',
            electricity_card_photo: '电卡照片',
            gas_card_photo: '气卡照片',
          },
          {
            checkin_photo: '交接单照片',
            certificate_photo: '截图凭证',
            deposit_photo: '押金收条',
            identity_photo: '证件照片',
            photo: '合同照片',
            bank_photo: '银行卡照片',
            water_photo: '水表照片',
            electricity_photo: '电表照片',
            gas_photo: '气表照片'
          }
        ],
        //查看回访记录
        backInfo_visible: false,
        backInfo: [
          {
            uid: 1111,
            star: 4,
            time: '2019-02-01',
            record: '已回访',
            add_user: '张三'
          }
        ],

        show_market: false,
        show_shadow: false,

        market_server: globalConfig.market_server,
        selects: [
          {
            id: 1,
            title: '收房'
          },
          {
            id: 2,
            title: '租房'
          }
        ],
        chooseTab: 2,

        params: {
          page: 1,
          limit: 30,
          contract_type: 1,
          sign_date_min: '',
          sign_date_max: '',
          type: '',
          start_date_min: '',
          start_date_max: '',
          end_date_min: '',
          end_date_max: '',
          signer: '',
          org: '',
        },
        contractList: [],
        contractCount: 0,

        highVisible: false, //高级
        searchData: {
          status: 'contractManagement',
          keywords: 'search',
          data: []
        },
      }
    },
    mounted() {
      this.getContractList();
    },
    watch: {},
    computed: {},
    methods: {
      handleCloseLookBackInfo() {
        this.currentRow = '';
        this.backInfo_visible = false;
      },
      handleClickSpan(tmp,item) {
        this.current_choose_control = tmp.id;
        console.log(item);
        switch (tmp.id) {
          case 1:
            break;
          case 2:
            this.currentRow = item;
            this.backInfo_visible = true;
            // if (item.record) {
            //   this.backInfo = item.record;
            // } else {
            //   this.$LjNotify('warning',{
            //     title: '警告',
            //     message: '暂无回访信息'
            //   })
            // }
            break;
          case 3:
            break;
        }
      },
      handleShowControl(row) {
        console.log(row);
        this.show_control = row.contract_id;
      },
      handleSubmitRewrite() {
        this.$http.post(this.market_server + `v1.0/market/contract/e-contract-resign/${this.contractDetail.contract_number}`,{
          note: this.rewrite_note
        }).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelRewrite();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleCancelRewrite() {
        this.rewrite_note = '';
        this.rewrite_visible = false;
      },
      handleRewrite() {
        this.rewrite_visible = true;
      },
      //双击详情
      handleGetDetail(row) {
        this.currentRow = row;
        console.log(row,'row');
        this.$http.get(this.market_server + `v1.0/market/contract/${this.chooseTab}/${row.contract_id}`).then(res => {
          if (res.code === 200) {
            this.contractDetail = res.data;
            this.contract_detail_visible = true;
            console.log(this.contractDetail);
          } else {
            this.contractDetail = '';
          }
        })
      },
      handleConfirmPolishing() {
        var form = new FormData();
        form.append('complete_content',this.polishing_params);
        form.append('property_number',this.property_number);
        form.append('mound_number',this.mound_number);
        this.$http.post(this.market_server + `v1.0/market/contract/${this.chooseTab}/${this.currentRow.contract_id}`,form).then(res => {
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.handleCancelPolishing();
            this.getContractList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            })
          }
        })
      },
      //取消补齐
      handleCancelPolishing() {
        this.polishing_params = {};
        this.mound_number = '';
        this.property_number = '';
        this.upload_file = {};
        this.currentRow = '';
        this.data_polishing_visible = false;
      },
      handleGetFile(item) {
        if (item !== 'close') {
          this.polishing_params[item[0]] = item[1];
        }
      },
      selfLabel(idx) {
        return this.polishing_data[this.chooseTab - 1][idx];
      },
      handleOpenPolishing(row) {
        this.currentRow = row;
        if (row.needComplete && row.needComplete.length > 0) {
          var obj = {};
          var param = {};
          row.needComplete.map(item => {
            obj[item] = '';
            param[item] = {
              keyName: item,
              setFile: [],
              size: {
                width: '50px',
                height: '50px'
              }
            }
          });
          this.polishing_params = Object.assign({},this.polishing_params,obj);
          this.upload_file = Object.assign({},param);
          this.data_polishing_visible = true;
          console.log(this.upload_file);
        } else {
          this.$LjNotify('info',{
            title: '提示',
            message: "暂无需要补齐的资料"
          });
          return false;
        }
      },
      handleCloseMenu() {
        this.show_market = false;
        this.show_shadow = false;
      },
      //获取合同列表
      getContractList() {
        this.params.contract_type = this.chooseTab;
        this.showLoading(true);
        this.$http.get(this.market_server + 'v1.0/market/contract',this.params).then(res => {
          if (res.code === 200) {
            console.log(res.data.data);
            this.contractList = res.data.data;
            this.contractCount = res.data.count;
          } else {
            this.contractList = [];
            this.contractCount = 0;
          }
          this.showLoading(false);
        })
      },
      //打开高级
      handleOpenHigh() {
        this.searchData.data = [
          {
            keyType: 'dateRange',
            title: '签约时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '合同性质',
            keyName: 'type',
            dataType: '',
            value: this.chooseTab === 1 ? [
              {id: 1, title: '新收'},
              {id: 2, title: '续收'}
            ] : [
              {id: 1,title: '新租'},
              {id: 2,title: '转租'},
              {id: 3,title: '续租'},
              {id: 4,title: '未收先租'},
              {id: 5,title: '调租'},
            ]
          },
          {
            keyType: 'dateRange',
            title: '合同起始时间',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '合同起始时间',
            placeholder: '请选择日期',
            keyName: 'date3',
            dataType: [],
          },
          {
            keyType: 'staff',
            title: '开单人',
            placeholder: '请选择开单人',
            keyName: 'signer',
            dataType: '',
            value: {
              num: '',
            }
          }
        ];
        this.highVisible = true;
      },
      changeTabs(id) {
        this.chooseTab = id;
        this.getContractList();
      },
      handleChangePage(page) {
        this.params.page = page;
        this.getContractList();
      },

      //高级
      handleCloseHigh(val) {
        if (val !== 'close') {
          console.log(val);
          this.params.sign_date_min = val.date1[0] ? val.date1[0] : '';
          this.params.sign_date_max = val.date1[1] ? val.date1[1] : '';
          this.params.start_date_min = val.date2[0] ? val.date2[0] : '';
          this.params.start_date_max = val.date2[1] ? val.date2[1] : '';
          this.params.end_date_min = val.date3[0] ? val.date2[0] : '';
          this.params.end_date_max = val.date3[1] ? val.date2[1] : '';
          this.params.signer = val.signer[0] ? val.signer[0] : '';
          this.params.type = val.type;
          this.getContractList();
        }
        this.highVisible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/contractManagement/index.scss";

  @mixin contractManagementImg($m, $n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #contractManagement {
      > div {
        .control_container {
          .choose {
            @include bgImage('../../../assets/image/components/theme1/xzgj.png');
          }
        }
      }
    }
  }
</style>
