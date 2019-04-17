<template>
  <div id="notice">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <div class="icons-font" @click="showPublishNoticeDialog"><b>发公告</b></div>
        <!--<div class="icons add" @click="publish_notice_dialog_visible = true"><b>+</b></div>-->
      </div>

    </div>


    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        @row-dblclick="tableDblClick"
        :row-style="{height:'70px'}"
        style="width: 100%">
        <!--<el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>-->

        <el-table-column
          key="title"
          align="center"
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          key="status"
          align="center"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <div>未读<span style="color: #0C66FF;cursor: pointer">{{scope.row.unread_people}}人</span>/共{{scope.row.all_people}}人
            </div>
          </template>
        </el-table-column>
        <el-table-column
          key="send_at"
          align="center"
          prop="send_at"
          label="发布时间">
        </el-table-column>

        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain>编辑再发布</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>


    <!--发布公告form表单-->
    <lj-dialog
      :visible.sync="publish_notice_dialog_visible"
      :size="{width: 530 + 'px',height: 650 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>公告</h3>

          <div class="header_right">
            <div>{{publish_notice_form.currentDate}}</div>
          </div>

        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form ref="publishNoticeForm" :rules="rules.publishNotice" :model="publish_notice_form"
                   style="text-align: left"
                   size="small" label-width="100px">

            <el-form-item required prop="type_id" label="公告类型">
              <dropdown-list ref="dropdown1" :url="`${this.url}announcement/announcement_type`"
                             v-model="publish_notice_form.type_id"></dropdown-list>
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="showNoticeTypeDialog"
              >+</span>
            </el-form-item>

            <el-form-item required prop="title" label="标题">
              <el-input v-model="publish_notice_form.title" placeholder="请输入标题" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item required prop="content" label="正文">
              <el-input type="textarea" v-model="publish_notice_form.content" placeholder="请输入正文" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item align="center" label="附件">
              <lj-upload v-model="publish_notice_form.file_info" size="40"
                         style="position: absolute; top: -12px;"></lj-upload>
            </el-form-item>

            <el-form-item required prop="send_scope" label="发送范围">
              <org-choose title="请选择发送范围" v-model="publish_notice_form.send_scope.org_id"></org-choose>
            </el-form-item>

            <div v-for="(item,index) in publish_notice_form.sanction_info" :key="index">

              <el-form-item required
                            :prop="'sanction_info.'+index+'.sanction_type'"
                            :rules="{required: true, message: '请选择类型', trigger: 'blur'}"
                            label="类型">
                <dropdown-list :json-arr="DROPDOWN_CONSTANT.NOTICEQUESTIONNAIRE.PUBLISHNOTICE.TYPE"
                               title="请选择类型"
                               v-model="publish_notice_form.sanction_info[index].sanction_type"></dropdown-list>
                <span v-if="index==0" class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                      @click="handleSanctionInfo(index)"
                >+</span>
                <span v-if="index>=1" class="btn_add"
                      @click="handleSanctionInfo(index)"
                      style="position: absolute;right: 13px;top: 3px;background-color: #D2D2D2;"
                >-</span>
              </el-form-item>

              <el-form-item required :prop="'sanction_info.'+index+'.money'"
                            :rules="{required: true, message: '请输入奖罚金额', trigger: 'blur'}"
                            label="奖罚金额">
                <el-input v-model="publish_notice_form.sanction_info[index].money" placeholder="请输入奖罚金额"
                          style="width: 320px">
                </el-input>
              </el-form-item>

              <el-form-item required :prop="'sanction_info.'+index+'.user_id'"
                            :rules="{required: true, message: '请选择责任人', trigger: 'blur'}"
                            label="责任人">
                <user-choose title="请选择责任人" v-model="publish_notice_form.sanction_info[index].user_id"></user-choose>
              </el-form-item>
            </div>


          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="publishNotice">发布
          </el-button>
          <el-button size="small" type="danger" @click="publish_notice_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加公告类型-->
    <lj-dialog
      :visible="add_notice_type_dialog_visible"
      :size="{width: 500 + 'px',height: 300 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加公告类型</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-room-container">
          <el-form ref="addNoticeTypeForm" :rules="rules.noticeType" :model="add_notice_type_form"
                   style="text-align: left" size="small" label-width="100px">
            <el-form-item required prop="name" label="公告类型">
              <el-input v-model="add_notice_type_form.name" placeholder="必填" style="width: 300px">
              </el-input>
            </el-form-item>
            <!--<div @click="viewMeetingRoomOrType(1)" class="right-tip">查看会议室</div>-->
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveNoticeType">保存</el-button>
          <el-button size="small" type="info" @click="add_notice_type_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--兑换规则-->
    <lj-dialog
      :visible="exchange_rules"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
      @close="exchange_rules = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>兑换规则</h3>
          <div class="header_right" @click="exchangeRulesFormHandler">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <div class="icon-add"><b>+</b></div>
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="exchangeRulesData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            @row-dblclick="exchangeTableDblClick"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(exchangeRulesShowData)" :key="item"
              align="center"
              :prop="item"
              :label="exchangeRulesShowData[item]">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">

              </template>
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="params.limit"
                :total="counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info" @click="reward_order = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--兑换规则form-->
    <lj-dialog
      :visible="exchange_rules_form_visible"
      :size="{width: 400 + 'px',height: 450 + 'px'}"
      @close="exchange_rules_form_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{exchange_rules_form_title}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="exchange_rules_form" label-width="80px" style="width: 80%">


            <el-form-item label="兑换类型">
              <div class="items-center iconInput">
                <el-select v-model="exchange_rules_form.exchangeType" placeholder="请选择兑换类型">
                  <el-option value="1" label="兑换类型1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="兑换额">
              <el-input v-model="exchange_rules_form.exchangeBonus" placeholder="请输入兑换额度">
              </el-input>
            </el-form-item>
            <el-form-item label="兑换物品">
              <div class="items-center iconInput">
                <el-select v-model="exchange_rules_form.exchangeObject" placeholder="请选择兑换物品">
                  <el-option value="1" label="兑换物品1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="状态">
              <div class="items-center iconInput">
                <el-select v-model="exchange_rules_form.exchangeStatus" placeholder="请选择状态">
                  <el-option value="1" label="状态1"></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="exchange_rules_form_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--赏善令-->
    <lj-dialog
      :visible="reward_order"
      :size="{width: 600 + 'px',height: 650 + 'px'}"
      @close="reward_order = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>赏善令</h3>
          <!--<div class="header_right">-->
          <!--<el-button size="mini" type="primary" plain>新增</el-button>-->
          <!--</div>-->
        </div>
        <div class="dialog_main borderNone">
          <el-form :model="reward_order_form" label-width="80px" style="width: 80%">
            <el-form-item label="姓名">
              <el-input v-model="reward_order_form.name" placeholder="选择人员自动获取"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="reward_order_form.department" placeholder="选择人员自动获取">
              </el-input>
            </el-form-item>
            <el-form-item label="岗位">
              <el-input v-model="reward_order_form.station" placeholder="选择人员自动获取">
              </el-input>
            </el-form-item>

            <el-form-item label="事件">
              <div class="items-center iconInput">
                <el-select v-model="reward_order_form.event" placeholder="请选择事件">
                  <el-option :value="1" label="事件1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="奖励类型">
              <div class="items-center iconInput">
                <el-select v-model="reward_order_form.reward_type" placeholder="请选择奖励类型">
                  <el-option :value="1" label="奖励1"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="奖额">
              <el-input v-model="reward_order_form.bonus" placeholder="请填写奖励金额">
              </el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="reward_order_form.remark" placeholder="请填写备注">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger">提交</el-button>
          <el-button size="small" type="info" @click="reward_order = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import _ from 'lodash';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  import OrgChoose from '../../../common/lightweightComponents/OrgChoose';
  import LjDialog from '../../../common/lj-dialog.vue';
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';

  export default {
    name: "index",
    props: ['searchVal', 'reward_order_visible', 'exchange_rules_visible'],
    components: {
      LjDialog,
      UserChoose,
      OrgChoose,
      LjUpload,
      DropdownList,
    },
    data() {
      return {
        rules: {
          publishNotice: {

            type_id: [
              {required: true, message: '请选择公告类型', trigger: 'blur'},
            ],

            title: [
              {required: true, message: '请输入标题', trigger: 'blur'},
            ],
            content: [
              {required: true, message: '请输入正文', trigger: 'blur'},
            ],

            send_scope: [
              {required: true, message: '请选择发送范围', trigger: 'blur'},
            ],

            sanction_type: [
              {required: true, message: '请选择类型', trigger: 'blur'},
            ],

            money: [
              {required: true, message: '请输入奖罚金额', trigger: 'blur'},
            ],

            user_id: [
              {required: true, message: '请选择责任人', trigger: 'blur'},
            ],
          },
          noticeType: {
            name: [
              {required: true, message: '请输入公告类型', trigger: 'blur'},
            ],
          },
        },


        url: globalConfig.humanResource_server,
        DROPDOWN_CONSTANT,
        checkList: [],
        showData: {
          title: '标题',
          status: '状态',
          //no_read:500,
          //total:1000,
          publish_time: '发布时间',
          /*name: '姓名',
          department: '岗位',
          station: '部门',
          event: '事件',
          bonus: '奖励',
          remark: '备注',*/
        },
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 3,
        },

        publish_notice_dialog_visible: false,//发布公告对话框
        publish_notice_form: {
          type_id: null,//公告类型id
          title: '',//标题
          content: '',//正文
          file_info: [],
          send_scope: {
            org_id: [],
          },
          sanction_info: [
            {
              user_id: [],
              sanction_type: null,
              money: '',
              pay_type:null,
              pay_status:1
            }
          ],

        },

        add_notice_type_dialog_visible: false,
        add_notice_type_form: {
          name: '',//公告类型名称
        },


        //乐伽dialog
        //赏善令
        reward_order: false,
        reward_order_form: {
          name: '',//姓名
          department: '',//部门,
          station: '',//岗位
          event: '',//事件
          reward_type: '',//奖励类型
          bonus: '',//奖额
          remark: '',//备注
        },

        //兑换规则
        exchange_rules: false,
        exchange_rules_form_title: '新增兑换规则',
        exchangeRulesData: [],
        exchangeRulesShowData: {
          exchangeType: '兑换类型',
          exchangeBonus: '兑换额',
          exchangeObject: '兑换物品',
          exchangeStatus: '状态',
        },

        exchange_rules_form_visible: false,//兑换规则form表单显示隐藏控制
        exchange_rules_form: {
          exchangeType: '',//兑换类型
          exchangeBonus: '',//兑换额
          exchangeObject: '',//兑换物品
          exchangeStatus: '',//状态
        }


        // work_info: [
        //   {work: '平均在线时长', val: '8 h'},
        //   {work: '平均处理用时', val: '30 min'},
        //   {work: '当日处理事件数', val: '16 件'},
        //   {work: '本周处理事件数', val: '35 件'},
        // ],
        // event_data: [
        //   {value: 500, name: '一般'},
        //   {value: 300, name: '特殊'},
        //   {value: 200, name: '紧急'},
        // ],
        // attend_data: []
      }
    },
    mounted() {
      this.getNoticeList();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getRewardUpList();
        },
        deep: true
      },
      reward_order_visible: {
        handler(val, oldVal) {
          console.log(val, oldVal);
          this.reward_order = !this.reward_order;
          this.reward_order_form = {};
        },
        //deep:true,
        //immediate:true//第一次绑定也执行
      },
      exchange_rules_visible: {
        handler(val, oldVal) {
          console.log(val, oldVal);
          this.exchange_rules = !this.exchange_rules;
        },
      }
    },
    computed: {},
    methods: {

      //获取公告列表
      getNoticeList() {
        let params = {
          all:1,
          ...this.params
        };
        this.$http.get(`${this.url}announcement/announcement`,params).then(res=> {
          if(res.code.endsWith('0')) {
            this.tableData = res.data.data;
            this.counts = res.data.count;
          }
        });
      },


      //显示发公告对话框
      showPublishNoticeDialog() {
        this.publish_notice_dialog_visible = true;
      },

      //发布公告
      publishNotice() {
        this.$refs['publishNoticeForm'].validate(valid => {
          if (valid) {
            /*debugger
            console.log(this.publish_notice_form);*/
            let params = {
              ...this.publish_notice_form
            };
            console.log(params);
            debugger
            this.$http.post(`${this.url}announcement/announcement`,params).then(res=> {
              debugger
              if(res.code.endsWith('0')) {
                this.$LjNotify('success',{
                  title:'成功',
                  message:res.msg,
                })
              }else {
                this.$LjNotify('error',{
                  title:'失败',
                  message:res.msg,
                })
              }
            });
          }
        });

      },


      //显示公告类型dialog
      showNoticeTypeDialog() {
        this.add_notice_type_dialog_visible = true;
      },

      //保存公告类型
      saveNoticeType() {
        this.$refs['addNoticeTypeForm'].validate(valid => {
          if (valid) {
            let params = {
              ...this.add_notice_type_form
            };
            this.$http.post(`${this.url}announcement/announcement_type`, params).then(res => {
              debugger
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: '新增成功',
                });
                this.$refs['dropdown1'].update();
                this.add_notice_type_dialog_visible = false;
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                });
              }
            });
          }
        });

      },

      //添加或删除奖罚信息
      handleSanctionInfo(idx) {
        debugger
        if (idx == 0) {
          this.publish_notice_form.sanction_info.push(
            {
              user_id: [],
              sanction_type: null,
              money: '',
              pay_type:null,
              pay_status:1
            });
        } else {
          this.publish_notice_form.sanction_info.splice(idx, 1);
          //_.pullAt(this.publish_notice_form.sanction_info,[idx]);
        }
      },


      exchangeRulesFormHandler() {
        this.exchange_rules_form_visible = true;
        this.exchange_rules_form = {};
        this.exchange_rules_form_title = "新增兑换规则";
      },


      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },


      initData() {
        //扬善表格
        for (let i = 0; i < 9; i++) {
          let obj = {
            id: i + 1,
            title: '这是一个标题',
            status: '未读300人/共1000人',
            publish_time: '2019-04-17',
            no_read: 500,
            total: 1000,
            /*name: '张三',
            station:'工程师',
            department:'研发部',
            event:'攻城时因穿铠甲',
            bonus:'200金币',
            remark:'锁血打小怪掉金币',*/
          }
          this.tableData.push(obj)
        }
        //console.log(this.tableData);
        this.counts = 1000;


        //兑换规则表格
        //exchangeRulesData
        for (let i = 0; i < 9; i++) {
          let obj = {
            id: i + 1,
            exchangeType: '兑换类型1',//兑换类型
            exchangeBonus: '300',//兑换额
            exchangeObject: '物品1',//兑换物品
            exchangeStatus: '状态1',//状态
          }
          this.exchangeRulesData.push(obj)
        }
      },

      getRewardUpList() {
        this.$http.get(this.url + 'aa/xxx', this.params).then(res => {
          this.tableData = res.data.data;
          this.counts = res.data.count;
        })
      },
      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row) {
        console.log(row);
        this.reward_order = true;
        this.reward_order_form = {
          name: '张三',
          station: '工程师',
          department: '研发部',
          event: '攻城时因穿铠甲',
          bonus: '200金币',
          remark: '锁血打小怪掉金币',
        };
      },
      //兑换规则表格某一行双击
      exchangeTableDblClick(row) {
        this.exchange_rules_form_visible = true;
        this.exchange_rules_form_title = "编辑兑换规则";
        this.exchange_rules_form = {
          name: '张三',
          exchangeType: '1',//兑换类型
          exchangeBonus: '300',//兑换额
          exchangeObject: '1',//兑换物品
          exchangeStatus: '1',//状态
        };
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getNoticeList();
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/noticeQuestionnaire/notice/index.scss";
  /*@import "../../../../assets/scss/currency";*/

  @mixin nqImg($m, $n) {
    $url: '../../../../assets/image/humanResource/noticeQuestionnaire/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #notice {

      .listTopRight {
        .icons-font {
          @include nqImg('fabang.png', 'theme1');
        }
      }

      footer.common-page {
        height: 100px;
        width: 100%;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 100px;
        //background-color: $color2F2;
        z-index: 6;
        .develop {
          position: absolute;
          top: -30px;
          width: 80px;
          cursor: pointer;
          height: 30px;
          opacity: 1;
          border-radius: 10px 10px 0 0;
          background-color: $color2F2;

        }
      }
    }
  }

  #theme_name.theme2 {
    #notice {

    }
  }

  #theme_name.theme3 {
    #notice {

    }
  }

  #theme_name.theme4 {
    #notice {

    }
  }
</style>
