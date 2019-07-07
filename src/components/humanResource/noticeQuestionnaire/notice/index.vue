<template>
  <div id="notice">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <!--        <div class="icons-font" @click="showPublishNoticeDialog"><b>发公告</b></div>-->
        <el-tooltip content="发公告" placement="top" :visible-arrow="false">
          <div v-if="$storage.get('VALIDATE_PERMISSION')['Bulletin-Add']" class="icons add" @click="showPublishNoticeDialog"><b>+</b></div>
        </el-tooltip>

        <!--<div class="icons add" @click="publish_notice_dialog_visible = true"><b>+</b></div>-->
      </div>

    </div>

    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
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
            <div>未读<span @click="showReadDialog(scope.row.id)" style="color: #0C66FF;cursor: pointer">{{scope.row.unread_people}}人</span>/共{{scope.row.all_people}}人
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
            <el-button v-if="$storage.get('VALIDATE_PERMISSION')['Bulletin-Update']" @click="editNotice(scope.row)" type="primary" size="mini" plain>编辑再发布</el-button>
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
      @close="initForm()"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{publish_notice_dialog_title}}</h3>

          <div class="header_right">
            <div>{{publish_notice_form.currentDate}}</div>
          </div>

        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form ref="publishNoticeForm" :rules="rules.publishNotice" :model="publish_notice_form"
                   style="text-align: left"
                   size="small" label-width="100px">

            <el-form-item required prop="type_id" label="公告类型">
              <dropdown-list ref="dropdown1" title="必选" :url="`${this.url}announcement/announcement_type`"
                             v-model="publish_notice_form.type_id"></dropdown-list>
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="showNoticeTypeDialog"
              >+</span>
            </el-form-item>

            <el-form-item required prop="title" label="标题">
              <el-input v-model="publish_notice_form.title" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item required prop="content" label="正文">
              <el-input type="textarea" v-model="publish_notice_form.content" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item align="center" label="附件">
              <lj-upload v-model="publish_notice_form.file_info" size="40"
                         style="position: absolute; top: -12px;"></lj-upload>
            </el-form-item>

            <el-form-item required prop="send_scope" label="发送范围">
              <org-choose title="必选" v-model="publish_notice_form.send_scope.org_id"></org-choose>
            </el-form-item>

            <div v-for="(item,index) in publish_notice_form.sanction_info" :key="index">
              <!--不带表单验证-->
              <el-form-item
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

              <el-form-item
                label="奖罚金额">
                <el-input v-model.number="publish_notice_form.sanction_info[index].money" placeholder="请输入奖惩金额"
                          style="width: 320px">
                </el-input>
              </el-form-item>

              <el-form-item
                label="责任人">
                <user-choose num="1" title="请选择责任人"
                             v-model="publish_notice_form.sanction_info[index].user_id"></user-choose>
              </el-form-item>
              <!--带表单验证-->
              <!--<el-form-item required
                            :prop="'sanction_info.'+index+'.sanction_type'"
                            :rules="{required: true, message: '请选择类型', trigger: 'blur'}"
                            label="类型">
                <dropdown-list :json-arr="DROPDOWN_CONSTANT.NOTICEQUESTIONNAIRE.PUBLISHNOTICE.TYPE"
                               title="必选"
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
                <el-input v-model="publish_notice_form.sanction_info[index].money" placeholder="必填"
                          style="width: 320px">
                </el-input>
              </el-form-item>

              <el-form-item required :prop="'sanction_info.'+index+'.user_id'"
                            :rules="{required: true, message: '请选择责任人', trigger: 'blur'}"
                            label="责任人">
                <user-choose num="1" title="必选"
                             v-model="publish_notice_form.sanction_info[index].user_id"></user-choose>
              </el-form-item>-->
            </div>


          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button v-if="publish_notice_dialog_title=='发布公告'" size="small" type="danger" @click="publishNotice">发布
          </el-button>
          <el-button v-if="publish_notice_dialog_title=='编辑公告'" size="small" type="danger"
                     @click="handleConfirmEditNotice">发布
          </el-button>
          <el-button size="small" type="danger" @click="publish_notice_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加公告类型-->
    <lj-dialog
      :visible.sync="add_notice_type_dialog_visible"
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


    <!--未读/已读人员列表-->
    <lj-dialog
      :visible.sync="read_dialog_visible"
      :size="{width:'60%',height: '90%'}">
      <div class="dialog_container read-dialog">
        <div class="dialog_header">
          <h3>{{read_dialog_title}}</h3>
        </div>
        <div class="dialog_main">
          <div class="read-toolbar">
            <div class="read-icon" @click="readChooseHandler(item.id)" :class="{checked:item.id==read_choose_tab}"
                 v-for="item in read_choose_list">
              <b>{{item.name}}</b>
            </div>
            <!--<div class="read-icon" @click="showNoReadList"><b>未读人员</b></div>
            <div class="read-icon" @click="showReadList"><b>已读人员</b></div>-->
          </div>
          <div class="read-container">
            <user-list :ids="userList_ids"></user-list>
          </div>
        </div>
      </div>
    </lj-dialog>


    <!--公告详情-->
    <lj-dialog
      :visible="notice_detail_dialog_visible"
      :size="{width: '60%',height: '90%'}"
      @close="notice_detail_dialog_visible = false"
    >
      <div class="dialog_container notice-detail-dialog">
        <div class="dialog_header">
          <h3>公告详情</h3>
          <!--<div class="header_right">-->
          <!--<el-button size="mini" type="primary" plain>新增</el-button>-->
          <!--</div>-->
        </div>
        <div class="dialog_main">
          <div class="notice-detail-container">
            <div class="notice-detail-list">
              <div class="form-item">
                <el-row :gutter="40">
                  <el-col :span="4">
                    <div class="form-item-title">公告类型</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="form-item-content">
                      <dropdown-list size="mini" width="140" :disabled="true"
                                     :url="`${this.url}announcement/announcement_type`"
                                     v-model="notice_detail_form.type_id"></dropdown-list>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="form-item">
                <el-row :gutter="40">
                  <el-col :span="4">
                    <div class="form-item-title">标题</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="form-item-content">{{notice_detail_form.title}}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="form-item">
                <el-row :gutter="40">
                  <el-col :span="4">
                    <div class="form-item-title">发布时间</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="form-item-content">{{notice_detail_form.send_at}}</div>
                  </el-col>
                </el-row>
              </div>
              <div class="form-item">
                <el-row :gutter="40">
                  <el-col :span="4">
                    <div class="form-item-title">正文</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="form-item-content">{{notice_detail_form.content}}</div>
                  </el-col>
                </el-row>
              </div>

              <div class="form-item">
                <el-row :gutter="40">
                  <el-col :span="4">
                    <div class="form-item-title">附件</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="form-item-content attachment-container">
                      <lj-upload size="40" disabled="disabled" :data="notice_detail_form.attachment"></lj-upload>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="form-item">
                <el-row :gutter="40">
                  <el-col :span="4">
                    <div class="form-item-title">发送范围</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="form-item-content">
                      <name-shower type="org" :ids="this.notice_detail_form.send_scope.org_id"></name-shower>
                    </div>
                  </el-col>
                </el-row>
              </div>

            </div>
          </div>
          <div class="notice-table-container scroll_bar">
            <div class="mainListTable">
              <el-table
                :data="notice_detail_table_data"
                highlight-current-row
                header-row-class-name="tableHeader"
                :row-style="{height:'50px'}"
                style="width: 100%">

                <el-table-column
                  key="name"
                  align="center"
                  prop="name"
                  label="责任人">
                </el-table-column>
                <el-table-column
                  key="type"
                  align="center"
                  prop="type"
                  label="类型">
                </el-table-column>
                <el-table-column
                  key="money"
                  align="center"
                  prop="money"
                  label="金额">
                </el-table-column>
                <el-table-column
                  key="pay_type"
                  align="center"
                  prop="pay_type"
                  label="缴纳方式">
                  <template slot-scope="scope">
                    <div v-if="scope.row.pay_type==1">工资扣款</div>
                    <div v-else>电子支付</div>
                  </template>
                </el-table-column>
                <el-table-column
                  key="pay_status"
                  align="center"
                  prop="pay_status"
                  label="缴纳状态">
                </el-table-column>

              </el-table>
            </div>
          </div>

        </div>
      </div>
    </lj-dialog>


  </div>
</template>

<script>
  import _ from 'lodash';
  import NameShower from '../../../common/lightweightComponents/NameShower';
  import UserList from '../../../common/lightweightComponents/UserList';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjUpload from '../../../common/lightweightComponents/lj-upload';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  import OrgChoose from '../../../common/lightweightComponents/OrgChoose';
  import LjDialog from '../../../common/lj-dialog.vue';
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';

  export default {
    name: "index",
    //props: ['searchVal'],
    components: {
      LjDialog,
      UserChoose,
      OrgChoose,
      LjUpload,
      DropdownList,
      UserList,
      NameShower,
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

        searchVal: null,

        url: globalConfig.humanResource_server,
        DROPDOWN_CONSTANT,
        checkList: [],
        chooseRowIds: [],
        tableData: [],
        counts: 0,
        params: {
          page: 1,
          limit: 8,
        },
        detailData: [],
        userList_ids: [],

        publish_notice_dialog_title: '发布公告',
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
              money: null,
              pay_type: null,
              pay_status: 1
            }
          ],
        },

        add_notice_type_dialog_visible: false,
        add_notice_type_form: {
          name: '',//公告类型名称
        },

        //已读 未读 列表对话框
        read_dialog_visible: false,
        read_dialog_title: '未读人员列表',

        read_choose_tab: 1,
        read_choose_list: [
          {
            id: 1,
            name: '未读人员',
          },
          {
            id: 2,
            name: '已读人员',
          }
        ],


        //公告详情
        notice_detail_dialog_visible: false,
        //公告详情form表单
        notice_detail_form: {
          type_id: '',//公告类型
          title: '',//标题
          send_at: '',//发布时间
          content: '',//正文
          attachment: [],
          send_scope: {
            org_id: [],
            user_id: [],
          },
        },
        //公告详情中的table奖惩数据
        notice_detail_table_data: [],
      }
    },
    mounted() {
      this.getNoticeList();
      let that = this;
      this.$bus.$on('noticeSearchVal', function (val) {
        that.getNoticeList(val);
      });
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          if (val) {
            this.getNoticeList(val);
          }

          //this.params = val;
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      //显示已读未读dialog对话框
      showReadDialog(id) {
        this.read_dialog_visible = true;
        this.detailData = [];
        this.userList_ids = [];
        this.read_choose_tab = 1;
        let params = {};
        this.$http.get(`${this.url}announcement/announcement/${id}`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.detailData = res.data;
            this.userList_ids = this.detailData?.unread_user_id || [];
          }
        });
      },

      readChooseHandler(id) {
        this.read_choose_tab = id;
        if (id == 2) {
          this.read_dialog_title = '已读人员列表';
          this.userList_ids = this.detailData?.read_user_id || [];
        } else {
          this.read_dialog_title = '未读人员列表';
          this.userList_ids = this.detailData?.unread_user_id || [];
        }
      },

      //获取公告列表
      getNoticeList(outerParams) {
        if(!this.validatePermission('Bulletin-Select')) return;
        this.showLoading(true);
        let params = {
          ...outerParams,
          all: 1,
          ...this.params
        };
        /*if(params.search) {
          params.title = params.search;
          //delete params.search;
        }*/
        this.$http.get(`${this.url}announcement/announcement`, params).then(res => {
          this.showLoading(false);
          this.tableData = [];
          if (res.code.endsWith('0')) {
            this.tableData = res.data.data;
            this.counts = res.data.count;
          }
        });
      },

      //显示发公告对话框
      showPublishNoticeDialog() {
        this.publish_notice_dialog_title = '发布公告';
        this.publish_notice_dialog_visible = true;
        this.initForm();
      },

      //初始化form表单
      initForm() {
        this.publish_notice_form = {
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
              money: null,
              pay_type: null,
              pay_status: 1
            }
          ],
        };
      },


      //发布公告
      publishNotice() {
        this.$refs['publishNoticeForm'].validate(valid => {
          if (valid) {
            let newForm = this.publish_notice_form;
            let isReturn = false;
            newForm.sanction_info = _.forEach(newForm.sanction_info, (o, index) => {
              if (o.user_id.constructor === Array) {
                o.user_id = o.user_id.join();
              }
              if (index != 0) {
                if (o.user_id && o.sanction_type && o.money) {
                  // debugger
                  //o.user_id = parseInt(o.user_id.join());
                } else {
                  isReturn = true;
                }
              } else {
                if (!o.user_id && !o.sanction_type && !o.money) {
                  delete newForm.sanction_info;
                } else if (o.user_id && o.sanction_type && o.money) {
                } else {
                  isReturn = true;
                }
                /*if((o.user_id==null||o.user_id?.length==0)&&o.money==null&&o.sanction_type==null) {
                  delete newForm.sanction_info;
                } else if(o.user_id) {

                }*/
              }

            });
            if (isReturn) {//没填全 return
              this.$LjMessage('warning', {
                title: '警告',
                msg: '奖惩信息有遗漏',
              });
              return;
            }
            if (newForm.sanction_info && newForm.sanction_info.length == 1) {
              if (!newForm.sanction_info[0].user_id || !newForm.sanction_info[0].money) {
                delete newForm.sanction_info;
              }
            }
            let params = {
              ...newForm
            };
            this.$http.post(`${this.url}announcement/announcement`, params).then(res => {
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                });
                this.publish_notice_dialog_visible = false;
                this.getNoticeList();
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                })
              }
            });
          }
        });

      },

      //编辑公告
      editNotice(row) {
        this.publish_notice_dialog_visible = true;
        this.publish_notice_dialog_title = '编辑公告';
        let id = row.id;
        this.$http.get(`${this.url}announcement/announcement/${id}`).then(res => {
          if (res.code.endsWith('0')) {
            let mData = res.data;
            _.forEach(mData.sanction_info, (o) => {
              o.user_id = [o.user_id];
            });
            if (!mData.sanction_info || mData.sanction_info.length == 0) {
              mData.sanction_info = [
                {
                  user_id: [],
                  sanction_type: null,
                  money: '',
                  pay_type: null,
                  pay_status: 1
                }
              ];
            }
            /*mData.sanction_info = _.forEach(mData.sanction_info,(o)=> {
              o.user_id = [parseInt(o.user_id)];
            });*/
            this.publish_notice_form = mData;
          }
        })
      },

      //提交编辑公告请求
      handleConfirmEditNotice() {
        this.$refs['publishNoticeForm'].validate(valid => {
          if (valid) {
            let newForm = this.publish_notice_form;
            /*newForm.sanction_info = _.forEach(newForm.sanction_info, (o) => {
              if (o.user_id.constructor == Array) {
                o.user_id = parseInt(o.user_id.join());
              }
            });*/
            _.forEach(newForm.sanction_info, (o) => {
              if (o.user_id.constructor === Array) {
                o.user_id = o.user_id.join();
              }
            });

            let isReturn = false;
            newForm.sanction_info = _.forEach(newForm.sanction_info, (o, index) => {
              if (o.user_id.constructor === Array) {
                o.user_id = o.user_id.join();
              }
              if (index != 0) {
                if (o.user_id && o.sanction_type && o.money) {
                  o.user_id = parseInt(o.user_id.join());
                } else {
                  isReturn = true;
                }
              } else {
                if (!o.user_id && !o.sanction_type && !o.money) {
                  delete newForm.sanction_info;
                } else if (o.user_id && o.sanction_type && o.money) {
                } else {
                  isReturn = true;
                }
                /*if((o.user_id==null||o.user_id?.length==0)&&o.money==null&&o.sanction_type==null) {
                  delete newForm.sanction_info;
                } else if(o.user_id) {

                }*/
              }

            });
            if (isReturn) {//没填全 return
              this.$LjMessage('warning', {
                title: '警告',
                msg: '奖惩信息有遗漏',
              });
              return;
            }
            if (newForm.sanction_info && newForm.sanction_info.length == 1) {
              if (!newForm.sanction_info[0].user_id || !newForm.sanction_info[0].money) {
                delete newForm.sanction_info;
              }
            }
            if (!newForm.sanction_info) {
              newForm.sanction_info = [];
            }

            let params = {
              ...newForm
            };
            this.$http.post(`${this.url}announcement/announcement/update`, params).then(res => {
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: '编辑成功'
                });
                this.publish_notice_dialog_visible = false;
                this.publish_notice_form = {
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
                      pay_type: null,
                      pay_status: 1
                    }
                  ],

                };
                this.getNoticeList();
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                });
              }
            });
          }
        })

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

      //显示公告详情
      getNoticeSingleForm(row) {
        this.notice_detail_dialog_visible = true;
        this.notice_detail_table_data = [];
        this.notice_detail_form = {
          type_id: '',//公告类型
          title: '',//标题
          send_at: '',//发布时间
          content: '',//正文
          attachment: [],
          send_scope: {
            org_id: [],
            user_id: [],
          },
        };
        let id = row.id;
        this.$http.get(`${this.url}announcement/announcement/${id}`).then(res => {
          if (res.code.endsWith('0')) {
            let item = res.data;
            this.notice_detail_form = {
              type_id: item.type_id,//公告类型
              title: item.title || '-',//标题
              send_at: item.send_at || '-',//发布时间
              content: item.content || '-',//正文
              attachment: item.file_detail || [],//附件
              send_scope: item.send_scope,
            };
            if (item.sanction_info && item.sanction_info.length > 0) {
              for (let subItem of item.sanction_info) {
                let obj = {
                  name: subItem.user_info?.name,
                  type: subItem.sanction_type == 1 ? '奖赏' : '处罚',
                  money: subItem.money || '-',
                  pay_type: subItem.pay_type || '-',
                  pay_status: subItem.pay_status == 2 ? '已缴纳' : '未缴纳',
                };
                this.notice_detail_table_data.push(obj);
              }
            }
          }
        })
      },

      //添加或删除奖罚信息
      handleSanctionInfo(idx) {
        if (idx == 0) {
          this.publish_notice_form.sanction_info.push(
            {
              user_id: [],
              sanction_type: null,
              money: '',
              pay_type: null,
              pay_status: 1
            });
        } else {
          this.publish_notice_form.sanction_info.splice(idx, 1);
          //_.pullAt(this.publish_notice_form.sanction_info,[idx]);
        }
      },

      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },


      // 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      //表格某一行双击
      tableDblClick(row) {
        //console.log(row);
        this.getNoticeSingleForm(row);

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
      .read-icon {
        @include nqImg('button_bg_gray.png', 'theme1');

        &.checked {
          @include nqImg('button_bg_red.png', 'theme1');
        }
      }

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
