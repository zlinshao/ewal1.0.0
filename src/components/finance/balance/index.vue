<template>
  <div id="balance">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>结算</h1>
        <h2 class="items-center">
          <span
            v-for="item in selects"
            @click="changeTabs(item.id,item.settle_type)"
            class="items-column"
            :class="{'chooseTab': chooseTab === item.id}"
          >
            {{item.title}}
            <i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <!--<el-tooltip content="新增" placement="bottom" :visible-arrow="false">
          <div class="icons add" @click="new_subject_visible = true"><b>+</b></div>
        </el-tooltip>-->
        <el-tooltip content="高级搜索" placement="bottom" :visible-arrow="false">
          <div class="icons search" @click="highSearch"></div>
        </el-tooltip>
        <!-- <div class="icons add" @click="new_subject_visible = true"><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>-->
      </div>
    </div>

    <div class="mainListTable changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="balanceData"
        :height="this.mainListHeight(30) + 'px'"
        highlight-current-row
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        header-row-class-name="tableHeader"
        style="width: 100%"
      >
        <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
        <el-table-column
          label="交接单编号"
          :prop="this.params.settle_type===''?'reimburse_id':'handover_id'"
          align="center"
        ></el-table-column>
        <el-table-column label="地址" prop="address" align="center"></el-table-column>
        <el-table-column label="结算费用组成" prop="fee_merge" align="center" min-width="150"></el-table-column>
        <el-table-column label="账户信息" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{scope.row.account_num ? scope.row.account_bank : ''}} {{scope.row.account_num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="this.params.settle_type===''?'角色':'姓名'"
          prop="address"
          align="center"
        ></el-table-column>
        <el-table-column label="发起人" prop="staff" align="center"></el-table-column>
        <el-table-column label="发起部门" prop="org.name" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status===1?'#CF2E33':'#0C66FF'}"
            >{{scope.row.status===1?'未生成款项':'已生成款项'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="count"
            :current-page="params.page"
            :page-size="params.limit"
            layout="total,jumper,prev,pager,next"
            @current-change="handleChangePage"
          ></el-pagination>
        </div>
      </footer>
    </div>

    <FinMenuList :module="showFinMenuList" @close="showFinMenuList = false"></FinMenuList>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>
    <!--结算单详情-->
    <lj-dialog
      :visible="detail_visible"
      :size="{width: 1200 + 'px',height: 780 + 'px'}"
      @close="detialDialogClose"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{this.params.settle_type===''?'报销单详情':'结算单详情'}}</h3>
        </div>
        <div class="dialog_main borderBgColor">
          <div class="balance-detail">
            <div class="balance-detail-title">
              <span
                v-for="(item,index) in tabs"
                @click="selectTabs(item.id)"
                :class="selectTab===item.id?'activeTab':''"
              >{{item.title}}</span>
            </div>

            <!-- 图片、评论-->
            <div class="balance-detail-info">
              <!--   <div v-if="false" class="tab">
                            <el-form ref="form" :model="form" label-width="80px" class="balance-detail-form">
                                <div class="balance-detail-form-info" :class="selectTab===2?'activeBorder':''">
                                    <div class="img-wall">
                                        <div class="balance-detail-img" v-for="(item,index) in imgData">
                                            <img :src="item" alt="" :key="index">
                                        </div>
                                    </div>
                                </div>
                                <div class="balance-detail-form-info" :class="selectTab===3?'activeBorder':''">
                                <el-form-item label="备注">
                                    <el-input v-model="form.remark" @change="getReimburseRemark" type="textarea" :rows="14"></el-input>
                                </el-form-item>
                                </div>
                                <div class="balance-detail-form-info" :class="selectTab===4?'activeBorder':''">
                                    <el-form-item label="评论">
                                        <el-input v-model="form.contentMessage" @change="getProcessInstances" type="textarea" :rows="14"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
              </div>-->

              <!-- 款项明细-selectTab为1-->
              <div v-if="selectTab===1" class="tab8">
                <el-table
                  height="410"
                  style="width:100%"
                  :data="balanceDataDetail"
                  highlight-current-row
                  header-row-class-name="tableHeader"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column label="项目" prop="fee_name" align="center"></el-table-column>
                  <el-table-column label="金额" prop="amount_initial" align="center"></el-table-column>
                  <el-table-column label="状态" prop="type" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.type===1?'应收':'应付'}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="是否平账" prop="in_pair" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.in_pair===1?'是':'否'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间" prop="create_time" align="center"></el-table-column>
                  <el-table-column label="备注" prop="remark" align="center"></el-table-column>
                  <el-table-column label="照片" prop="urls" align="center" v-if="params.settle_type===''">
                      <template slot-scope="scope">
                        <!-- <lj-upload  :size="{width:'25px',height:'25px'}" :limit-esay="['image']"  :disabled="true"  :download="false" v-model="scope.row.album"></lj-upload> -->
                      <img :src="require('../../../assets/image/no_avatar.png')"  style="width:25px" @click="lookImgsClick(scope.row)">
                    </template>
                    </el-table-column>
                  <el-table-column
                    label="操作"
                    prop="data"
                    align="center"
                    v-if="this.params.settle_type===''"
                  >
                    <template slot-scope="scope">
                      <el-button
                        :type="scope.row.is_result===1?'info':'danger'"
                        size="mini"
                        @click="openAddFee(scope.row)"
                        :disabled="scope.row.is_result===1"
                      >{{scope.row.is_result===1?'已生成结果':'未生成结果'}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page">
                  <el-pagination
                    :total="feeCount"
                    layout="total,jumper,prev,pager,next"
                    :current-page="feeParams.page"
                    :page-size="feeParams.limit"
                    @current-change="handleChangeFeePage"
                  ></el-pagination>
                </div>
              </div>
             
              <!-- 备注列表selectTab为3-->
              <div v-if="selectTab===3" class="tab8">
                <div class="dialog_header flex">
                  <h3>备注</h3>
                  <span class="add_mark" @click="new_remark_dialog_visible = true;new_mark={}">+</span>
                </div>
                <div class="dialog_main">
                  <div class="address">{{current_row.address}}</div>
                  <div class="record">
                    <el-table :data="remarkTabelData">
                      <el-table-column label="备注时间" prop="create_time" align="center"></el-table-column>
                      <el-table-column label="备注内容" prop="content" align="center" width="200"></el-table-column>
                      <el-table-column label="备注人" prop="operator" align="center"></el-table-column>
                    </el-table>
                  </div>
                  <div class="page">
                    <el-pagination
                      :total="remarkCount"
                      layout="total,jumper,prev,pager,next"
                      :current-page="remarkPageParams.page"
                      :page-size="remarkPageParams.limit"
                      @current-change="handleChangeRemarkPage"
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <!-- 图片和评论展示 -->
              <div class="Imgs_comments"  v-if="selectTab===2 || selectTab===4"  >
                <!-- 图片 selectTab为2-->
                <div  class="imgs" :class="{activeImgsComments: selectTab!=2}" v-if="params.settle_type != ''">
                  <h3>照片</h3>
                  <div class="img-wall">
                    <span class="balance-detail-img" v-for="(item,index) in imgData">
                      <img :src="item" alt :key="index">
                    </span>
                  </div>
                </div>
                <!-- 评论-selectTab为4-->
                <div class="comments"  :class="{activeImgsComments: selectTab!=4, isCenterComments: params.settle_type==''}">
                  <div class="comments_list">
                    <div class="add_btn">
                        <h3>评论</h3>
                        <span class="add_mark_comment" @click="comments_dialog_visible = true;new_comments={}">+</span>
                    </div>
                    <div  class="comment_content">
                      <div v-for="(items,index) in commentsData" class="comment_item">
                        <div class="comment_basic_info">
                          <!-- 当登陆人没有头像选择本地的默认图片 -->
                          <img :src="$storage.get('user_info').avatar ? $storage.get('user_info').avatar:require('../../../assets/image/no_avatar.png')" alt="">
                          <div class="operter_date">
                            <span>{{$storage.get("user_info").name,}}</span>
                            <span>{{items.time}}</span>
                          </div>
                        </div>
                        <div class="comment_content_info">
                          <p>{{items.content.message}} </p>
                          <div class="comments_img_video">
                            <span  class="img_video_item" v-for="(item,i) in items.content.attachmentBody" v-if='items.content.attachmentBody||items.content.attachmentBody.length!=0'>
                                <span v-if="item && item.info">
                                    <span v-if="item.info.mime =='image'" ><img   :src="item.uri" alt :key="i"></span>
                                    <span v-if="item.info.mime =='video'" ><video :src="item.uri" controls="controls"></video></span>
                                </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer" v-if="current_row.status===1">
          <el-button type="danger" size="small" @click="pass_visible=true">通过</el-button>
          <el-button type="info" size="small" @click="detail_visible = false;current_row = ''">驳回</el-button>
        </div>
      </div>
    </lj-dialog>



    <!--报销费用项-->
    <lj-dialog
      :visible="add_fee_visible"
      :size="{width: 600 + 'px',height: 700 + 'px'}"
      @close="add_fee_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{current_row.fee_name}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <div style="width: 80%;margin: 0 auto">
            <el-form :model="addForm" label-width="100px">
              <div>
                <el-form-item label="时间">
                  <el-date-picker
                    v-model="addForm.time"
                    type="datetimerange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="合计">
                  <el-input
                    placeholder="请输入"
                    v-model="current_row.amount_initial"
                    disabled
                    type="number"
                  ></el-input>
                </el-form-item>
              </div>

              <div
                v-for="(item,index) in fee_data_result"
                :key="item.key"
                style="border-top: 1px dashed #999999;"
              >
                <el-form-item label="开始时间">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="item.fee_start"
                    type="date"
                    placeholder="请输入"
                    :disabled="current_row.is_result===1"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="item.fee_end"
                    type="date"
                    placeholder="请输入"
                    :disabled="current_row.is_result===1"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="客户类型">
                  <el-select
                    v-model="item.duty_type"
                    :disabled="current_row.is_result===1"
                    @change="handleDutyChange(item.duty_type)"
                  >
                    <el-option
                      v-for="(cont,dex) in types"
                      :label="cont.title"
                      :value="cont.id"
                      :key="dex"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="客户姓名">
                  <el-input
                    placeholder="请输入"
                    v-model="item.duty_name"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>

                <el-form-item label="上次底数(峰)" v-if="current_row.fee_name==='电费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.last_degree"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="上次底数"
                  v-if="current_row.fee_name==='水费'||current_row.fee_name==='燃气费'"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="item.last_degree"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="本次底数"
                  v-if="current_row.fee_name==='水费'||current_row.fee_name==='燃气费'"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="item.now_degree"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="单价()" v-if="current_row.fee_name==='电费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.unit_price"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="上次底数(谷)" v-if="current_row.fee_name==='电费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.last_valley_degree"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="本次底数" v-if="current_row.fee_name==='电费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.now_valley_degree"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="单价()"
                  v-if="current_row.fee_name==='电费'||current_row.fee_name==='水费'||current_row.fee_name==='燃气费'"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="item.vally_unit_price"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="滞纳金"
                  v-if="current_row.fee_name==='电费'||current_row.fee_name==='水费'||current_row.fee_name==='燃气费'"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="item.late_payment"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>

                <el-form-item label="公摊水费" v-if="current_row.fee_name==='物业费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.public_water_amount"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="公摊电费" v-if="current_row.fee_name==='物业费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.public_ele_amount"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="物业费" v-if="current_row.fee_name==='物业费'">
                  <el-input
                    placeholder="请输入"
                    v-model="item.late_payment"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>

                <el-form-item label="其他">
                  <el-input
                    placeholder="请输入"
                    v-model="item.other_payment"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input
                    placeholder="请输入"
                    v-model="item.total_amount"
                    type="number"
                    :disabled="current_row.is_result===1"
                  ></el-input>
                  <i
                    class="form-reduce-icon"
                    @click="reduceFormData(index)"
                    v-if="current_row.is_result!=1"
                  ></i>
                </el-form-item>
                <!--<el-form-item label="备注">-->
                <!--<el-input placeholder="请输入" v-model="item.remark" type="textarea" :rows="4"></el-input>-->
                <!--<i class="form-reduce-icon" @click="reduceFormData(index)"></i>-->
                <!--</el-form-item>-->
              </div>
            </el-form>
          </div>
        </div>
        <div class="dialog_footer" v-if="current_row.is_result!=1">
          <el-button type="warning" size="small" @click="addFormData">添加</el-button>
          <el-button type="danger" size="small" @click="handleOkAdd()">确定</el-button>
          <el-button type="info" size="small" @click="add_fee_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--通过-->
    <lj-dialog
      :visible="pass_visible"
      :size="{width: 400 + 'px',height: 300 + 'px'}"
      @close="pass_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>通过</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="80px">
            <el-form-item label="付款时间">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="pay_date"
                type="date"
                placeholder="请输入"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleOkPass">确定</el-button>
          <el-button type="info" size="small" @click="pass_visible = false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--结算单详情页的新增备注模态框-->
    <lj-dialog
      :visible.sync="new_remark_dialog_visible"
      :size="{width: 600 + 'px' ,height: 420 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增备注</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="address" style="margin-bottom: 40px">{{current_row.address}}</div>
          <el-form :mode="new_mark" label-width="80px">
            <el-form-item label="备注内容">
                <div class="textareaBg">
                    <el-input type="textarea" v-model="new_mark.content" :rows="4"></el-input>
                </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="addNewRemark">确定</el-button>
          <el-button size="small" @click="new_remark_dialog_visible=false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>

     <!--结算单详情页的新增评论模态框-->
    <lj-dialog
      :visible.sync="comments_dialog_visible"
      :size="{width: 600 + 'px' ,height: 420 + 'px'}"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增评论</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="address" style="margin-bottom: 40px">{{current_row.address}}</div>
          <el-form :mode="new_comments" label-width="80px">
            <el-form-item label="评论内容">
              <div class="textareaBg">
                  <el-input
                style="background-color: #ffffff"
                type="textarea"
                v-model="new_comments.message"
                :rows="4"
              ></el-input>
              </div>
              
            </el-form-item>
            <el-form-item align="center" label="上传附件">
                <div class="upload_imgVideo">
                    <lj-upload
                        v-model="new_comments.attachments"
                        size="50"
                        :limit-esay="['video','image']"
                        class="upload-offset"
                    ></lj-upload>
                </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="addNewProcessFun">确定</el-button>
          <el-button size="small" @click="comments_dialog_visible=false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!-- 报销单详情==》款项明细==》照片-->
      <lj-dialog
      :visible.sync="reimbursePhotosVisible"
      :size="{width: 800 + 'px' ,height: 500 + 'px'}"
    >
       <lj-upload  :size="{width:'50px',height:'50px'}" :limit-esay="['image']"  :disabled="true"  :download="false" v-model="reimburseAlbumPhotos"></lj-upload>
    </lj-dialog>


    <StaffOrgan :module="staffModule" @close="hiddenStaff"></StaffOrgan>
    <DepartOrgan :module="departModule" @close="hiddenDepart"></DepartOrgan>
    <customer :module="customerModule" @close="hiddenCustomer"></customer>
    
  </div>
</template>

<script>
import SearchHigh from "../../common/searchHigh.vue";
import LjDialog from "../../common/lj-dialog.vue";
import FinMenuList from "../components/finMenuList.vue";
import Customer from "../../common/customer.vue";
import StaffOrgan from "../../common/staffOrgan.vue";
import DepartOrgan from "../../common/departOrgan.vue";
import axios from "axios";

export default {
  name: "index",
  components: {
    SearchHigh,
    FinMenuList,
    LjDialog,
    Customer,
    StaffOrgan,
    DepartOrgan
  },
  data() {
    return {
      params: {
        search: "",
        page: 1,
        limit: 12,
        settle_type: 2
      },
      customerModule: false, //房东，租客
      staffModule: false, //员工
      departModule: false, //部门
      pass_visible: false, //通过
      add_fee_visible: false, //费用新增
      check_visible: false, //查看
      balanceDataDetail: [], //结算单、报销单详情列表
      form: {
        remark: ""
      },
      addForm: {
        time: [], //报销单费用时间
        reimburse_data: [] //认责费用时间
      },
      types: [
        {
          id: 1,
          title: "房东"
        },
        {
          id: 2,
          title: "租客"
        },
        {
          id: 3,
          title: "员工"
        },
        {
          id: 6,
          title: "部门"
        },
        {
          id: 11,
          title: "公司"
        }
      ],
      tabs: [],
      tabs1:[
        {
          id: 1,
          title: "款项明细"
        },
        {
          id: 3,
          title: "备注"
        },
        {
          id: 2,
          title: "照片"
        },
        {
          id: 4,
          title: "评论"
        }
      ],
       tabs2:[
        {
          id: 1,
          title: "款项明细"
        },
        {
          id: 3,
          title: "备注"
        },
        {
          id: 4,
          title: "评论"
        }
      ],

      selectTab: 1,
      detail_visible: false,
      count: 0,
      balanceData: [],
      chooseTab: 1,
      selects: [
        {
          id: 1,
          title: "收房交接",
          settle_type: 2
        },
        {
          id: 2,
          title: "租房退租",
          settle_type: 4
        },
        {
          id: 3,
          title: "收房退租",
          settle_type: 6
        },
        {
          id: 4,
          title: "租房入住",
          settle_type: 8
        },
        {
          id: 5,
          title: "报销交接",
          settle_type: 10
        }
      ],
      showFinMenuList: false,

      showSearch: false,
      searchData: {},
      currentRow: {},
      multipleSelection: [], //多选
      action_visible: false, //操作栏
      current_row: {},

      feeFormData: {
        reimburse_fee_id: 44, //报销单费用id
        start_at: "2019-04-25", //报销单费用开始时间
        end_at: "2019-05-25", //报销单费用结束时间
        fee_data_result: [
          //报销单费用认责
          {
            fee_start: "2019-04-25", //认责费用开始时间
            fee_end: "2019-05-01", //认责费用结束时间
            duty_type: "2", //认责方类型 : 1 房东 2 租客 3 未知 6 片区费用 11 公司
            duty_name: "官方电话根据", //认责房名称
            total_amount: "100", //合计金额
            is_degree: 1, //是否以度数计算
            last_degree: 250, //上次度数(电费时表示为波峰)
            now_degree: 350, //本次度数(电费时表示为波峰)
            last_valley_degree: 0, //上次波谷度数(电费时才有)
            now_valley_degree: 0, //本次波谷度数(电费时才有)
            unit_price: 1, //度数单价(电费时为波峰单价)
            vally_unit_price: 0, //电费时才有,波谷度数单价
            late_payment: 0, //滞纳金(电费时为波峰滞纳金)
            other_payment: 0, //其他费用(电费时为波峰其他费用)
            vally_late_payment: 0, //波谷电费滞纳金(电费才有)
            vally_other_payment: 0, //波谷电费其他费用(电费才有)
            public_ele_amount: 0, //公摊电费(物业费才有)
            public_water_amount: 0 //公摊水费(物业费才有)
          }
        ]
      },

      fee_data_result: [
        {
          fee_start: "", //认责费用开始时间
          fee_end: "", //认责费用结束时间
          duty_type: "", //认责方类型 : 1 房东 2 租客 3 未知 6 片区费用 11 公司
          duty_name: "", //认责房名称
          total_amount: "", //合计金额
          is_degree: 1, //是否以度数计算
          last_degree: "", //上次度数(电费时表示为波峰)
          now_degree: "", //本次度数(电费时表示为波峰)
          last_valley_degree: "", //上次波谷度数(电费时才有)
          now_valley_degree: "", //本次波谷度数(电费时才有)
          unit_price: "", //度数单价(电费时为波峰单价)
          vally_unit_price: "", //电费时才有,波谷度数单价
          late_payment: "", //滞纳金(电费时为波峰滞纳金)
          other_payment: "", //其他费用(电费时为波峰其他费用)
          vally_late_payment: "", //波谷电费滞纳金(电费才有)
          vally_other_payment: "", //波谷电费其他费用(电费才有)
          public_ele_amount: "", //公摊电费(物业费才有)
          public_water_amount: "" //公摊水费(物业费才有)
        }
      ],
      feeCount: 0,
      feeParams: {
        search: "",
        page: 1,
        limit: 12
      },

      balance_id: "",
      pay_date: "", //通过 付款时间
      imgData: [],
      commonModuleData: {
        //共用组件数据
      },
      // 结算详情页的备注
      remarkTabelData: [], //备注列表
      new_remark_dialog_visible: false, //新增备注的模态框是否展示
      new_mark: {
        content: ""
      }, //新增的备注内容
      remarkCount: 0, //总条数
      remarkPageParams: {
        page: 1,
        limit: 5
      },
      // 结算详情页的评论
      commentsData: [], //评论列表
      comments_dialog_visible: false, //新增评论的模态框是否展示
      new_comments: {
        message: "",
        attachments: []
      }, //新增的评论内容
      reimbursePhotosVisible:false, ///报销款项明细的图片展示弹框
      reimburseAlbumPhotos:[], //报销款项明细列表的图片
      
    };
  },
  mounted() {
    this.getBalanceDataLists();  //结算单列表
  },
  activated() {},
  watch: {
    multipleSelection: {
      handler(val) {},
      deep: true
    },
    action_visible: {
      handler(val) {},
      deep: true
    }
  },
  computed: {},
  methods: {
    handleDutyChange(type) {
      if (type === 1 || type === 2) {
        this.customerModule = true;
      } else if (type === 3) {
        this.staffModule = true;
      } else if (type === 6) {
        this.departModule = true;
      } else if (type === 11) {
      }
    },
    //获取员工信息
    hiddenStaff(ids, names, arr) {
      this.staffModule = false;
      if (ids !== "close") {
        this.commonModuleData.staff_name = names;
        this.commonModuleData.staff_id = ids[0];
      }
    },
    //获取部门信息
    hiddenDepart(ids, names, arr) {
      this.departModule = false;
      if (ids !== "close") {
        this.commonModuleData.department_id = ids[0];
        this.commonModuleData.leader_name = arr[0].leader.name;
        this.commonModuleData.leader_id = arr[0].leader_id;
        this.commonModuleData.department_name = names;
      }
    },
    hiddenCustomer(val) {
      //获取客户
      this.customerModule = false;
      this.commonModuleData.customer_name = val.name;
      this.commonModuleData.customer_identity = val.identity;
      this.commonModuleData.customer_id = val.id;
    },
    /**
     * 首页列表
     */
    getBalanceDataLists() {
      //结算单列表
      this.showLoading(true);
      this.$http
        .get(globalConfig.temporary_server + "customer_settle", this.params)
        .then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.balanceData = res.data.data;
            this.count = res.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getReimburseDataLists() {
      //报销单列表
      this.showLoading(true);
      this.$http
        .get(globalConfig.temporary_server + "customer_reimburse", this.params)
        .then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.balanceData = res.data.data;
            this.count = res.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeTabs(id, type) {
      // 首页tab切换
      this.chooseTab = id;
      this.params.settle_type = type;
      this.balanceData = [];
      this.params.page = 1;
      this.tabs=this.tabs1;
      if (type === 10) {
        this.getReimburseDataLists();  //报销单列表
        this.params.settle_type = "";   //空表示切换报销
        this.tabs=this.tabs2;
      } else {
        this.getBalanceDataLists();    //结算单列表
      }
    },
    tableClickRow(row) {
      // 当前点击列表项
      this.detail_visible = true;
      this.current_row = row;
      this.balance_id = row.id;
      this.selectTab=1;  //默认展示款项明细列表
      if (this.params.settle_type === "") {
        this.getReimburseDetails();   //报销单款项明细列表
      } else {
        this.getBalanceDetails();  //结算单款项明细列表
      }
    },
    selectTabs(id) { //详情页tab切换
      this.selectTab = id;
      if (id === 3) { //备注
        this.getDetailRemarkListFun();
        // this.getReimburseRemark();
      } else if (id === 4) { //评论
        this.getProcessListFun();
      }
    },

    // getReimburseRemark() { //添加报销单备注信息
    //     this.$http.put(globalConfig.temporary_server + 'customer_reimburse/reimburse_remark/' + this.balance_id, {
    //         remark: this.form.remark
    //     }).then(res => {
    //         this.showLoading(false);
    //         if (res.code === 200) {
    //             this.getReimburseDetails();
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     })

    // },

    // getProcessInstances() { //添加报销单评论信息
    //     let params = {
    //         author: this.$storage.get('user_info').id,
    //         content: {
    //             message: this.form.contentMessage,
    //             attachments: []
    //         },
    //         saveProcessInstanceId: true
    //     }
    //     this.$http.post(`${globalConfig.approval_sever}history/process-instances/${this.current_row.flow_id}/comments`, params).then(res => {
    //         this.showLoading(false);
    //         // debugger
    //         // console.log(res)
    //         if (res.status === 201) {
    //             this.form.contentMessage = res.content.message;
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // },

    handleOkAdd() {
      //报销单详情编辑提交
      let paramsForm = {
        reimburse_fee_id: this.current_row.id, //报销单费用id
        start_at: this.addForm.time === null ? "" : this.addForm.time[0], //报销单费用开始时间
        end_at: this.addForm.time === null ? "" : this.addForm.time[1], //报销单费用开始时间,//报销单费用结束时间
        fee_data_result: this.fee_data_result
      };
      this.$http
        .post(
          globalConfig.temporary_server + "customer_reimburse/reimburse_fee",
          paramsForm
        )
        .then(res => {
          if (res.code === 200) {
            this.$LjNotify("success", {
              title: "成功",
              message: res.msg,
              subMessage: ""
            });
            this.add_fee_visible = false;
            this.getReimburseDetails();
          } else {
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg,
              subMessage: ""
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleOkPass() {
      //通过操作
      if (this.params.settle_type === "") {
        //报销单通过
        this.$http
          .post(
            globalConfig.temporary_server +
              "customer_reimburse/reimburse_funds/" +
              this.balance_id,
            {
              pay_date: this.pay_date
            }
          )
          .then(res => {
            if (res.code === 200) {
              this.$LjNotify("success", {
                title: "成功",
                message: res.msg,
                subMessage: ""
              });
              this.pass_visible = false;
              this.detail_visible = false;
              this.getReimburseDataLists();
            } else {
              this.$LjNotify("error", {
                title: "失败",
                message: res.msg,
                subMessage: ""
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //结算单通过
        this.$http
          .post(globalConfig.temporary_server + "customer_settle/fund", {
            pay_date: this.pay_date,
            settle_id: this.balance_id
          })
          .then(res => {
            if (res.code === 200) {
              this.$LjNotify("success", {
                title: "成功",
                message: res.msg,
                subMessage: ""
              });
              this.pass_visible = false;
              this.detail_visible = false;
              this.getBalanceDataLists();
            } else {
              this.$LjNotify("error", {
                title: "失败",
                message: res.msg,
                subMessage: ""
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    openAddFee(row) {
      //报销费用详情展开
      this.add_fee_visible = true;
      this.current_row = row;
      this.getReimburseFeeResult(row);
    },
    getReimburseFeeResult(row) {
      //获取报销费已生成结果详情
      let paramsForm = {
        reimburse_fee_id: row.id
      };
      this.$http
        .get(
          globalConfig.temporary_server +
            "customer_reimburse/reimburse_fee_result",
          paramsForm
        )
        .then(res => {
          this.showLoading(false);

          if (res.code === 200) {
            this.fee_data_result = res.data.data;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    openAddFee(row) {
      //报销费用详情展开
      this.add_fee_visible = true;
      this.current_row = row;
    },
    addFormData() {
      //添加多个表单
      this.fee_data_result.push({
        fee_start: "", //认责费用开始时间
        fee_end: "", //认责费用结束时间
        duty_type: "", //认责方类型 : 1 房东 2 租客 3 未知 6 片区费用 11 公司
        duty_name: "", //认责房名称
        total_amount: "", //合计金额
        is_degree: "", //是否以度数计算
        last_degree: "", //上次度数(电费时表示为波峰)
        now_degree: "", //本次度数(电费时表示为波峰)
        last_valley_degree: "", //上次波谷度数(电费时才有)
        now_valley_degree: "", //本次波谷度数(电费时才有)
        unit_price: "", //度数单价(电费时为波峰单价)
        vally_unit_price: "", //电费时才有,波谷度数单价
        late_payment: "", //滞纳金(电费时为波峰滞纳金)
        other_payment: "", //其他费用(电费时为波峰其他费用)
        vally_late_payment: "", //波谷电费滞纳金(电费才有)
        vally_other_payment: "", //波谷电费其他费用(电费才有)
        public_ele_amount: "", //公摊电费(物业费才有)
        public_water_amount: "", //公摊水费(物业费才有)
        key: Date.now()
      });
    },
    reduceFormData(index) {
      //减少表单
      var i = this.fee_data_result.length;
      if (i <= 1) {
        this.$LjNotify("error", {
          title: "提示",
          message: "请至少保留一项",
          subMessage: ""
        });
      } else {
        this.fee_data_result.splice(index, 1);
      }
    },

    handleSelectionChange(val) {
      // 多选
      this.multipleSelection = val;
      console.log(val);
    },
    handleChangePage(page) {
      //表单首页分页
      this.params.page = page;
      if (this.params.settle_type === "") {
        this.getReimburseDataLists();
      } else {
        this.getBalanceDataLists();
      }
    },

     tableChooseRow({ row, rowIndex }) {
      // 点击过
    },
    highSearch() {
      // 高级搜索
      this.showSearch = true;
      // this.searchData = subjectSearch;
    },

    hiddenModule(val) {
      // 确认搜索
      this.showSearch = false;
      if (val !== "close") {
        // this.params.er_type = val.er_type;
        // this.getSubjectList();
      }
    },


    /**
     * 款项明细列表
     */
    getReimburseDetails() {
      //报销单款项明细列表
      this.$http
        .get(
          globalConfig.temporary_server +
            "customer_reimburse/reimburse_fee/" +
            this.balance_id,
          this.feeParams
        )
        .then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.balanceDataDetail = res.data.data;
            this.feeCount = res.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBalanceDetails() {
      //结算单款项明细列表
      this.$http
        .get(
          globalConfig.temporary_server +
            "customer_settle/settle_fee/" +
            this.balance_id,
          this.feeParams
        )
        .then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.balanceDataDetail = res.data.data;
            this.feeCount = res.data.count;
            //结算图片(lili)
            this.imgData = res.data.urls;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChangeFeePage(page) {
      //报销单详情列表分页
      this.feeParams.page = page;
      if(this.params.settle_type===''){
        this.getReimburseDetails();
      }else{
        this.getBalanceDetails();
      }
    },
    // 报销单详情列表的照片查看事件
    lookImgsClick(item){
      this.reimbursePhotosVisible=true;
      this.reimburseAlbumPhotos=item.album;
    },


     /**
     * 详情页面的评论(每个页面的评论接口都一致)
     ***/
    // 评论的内容回显(lili)
    getProcessListFun() {
       this.commentsData=[];  //清空数据
      axios.get(
          `${globalConfig.approval_sever}history/process-instances/${
            this.current_row.flow_id
          }/comments`
        )
        .then(res => {
          this.showLoading(false);
          if (res.status == 200) {
            this.commentsData = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 新增评论（lili）
    addNewProcessFun() {
      let params = {
        author: this.$storage.get("user_info").id,
        content: this.new_comments,
        saveProcessInstanceId: true
      };
      axios
        .post(
          `${globalConfig.approval_sever}history/process-instances/${
            this.current_row.flow_id
          }/comments`,
          params
        )
        .then(res => {
          this.showLoading(false);
          if (res.status == 201) {
            this.comments_dialog_visible = false;
            this.getProcessListFun();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * 详情页面的备注列表，每个页面的备注接口不一样
     ***/
    // 备注列表的获取（lili）
    getDetailRemarkListFun() {
      let interfaceName='';
      this.remarkTabelData=[];  //清空数据
     if(this.chooseTab== 5){  //报销单备注列表接口
        interfaceName='customer_reimburse';  
      }else{                 //结算单备注列表接口
        interfaceName='customer_settle';    
      }
      this.$http
        .get(
          globalConfig.temporary_server +interfaceName+
            "/remark/" +
            this.balance_id,
          this.remarkPageParams
        )
        .then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.remarkTabelData = res.data.data;
            this.remarkCount = res.data.count; //总条数
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 备注分页
    handleChangeRemarkPage(page) {
      this.remarkPageParams.page = page;
      this.getDetailRemarkListFun();
    },

    // 新增备注(lili)
    addNewRemark() {
       let interfaceName=''
      if(this.chooseTab== 5){  //报销单备注接口
        interfaceName='customer_reimburse';  
      }else{          //结算单备注新增接口
        interfaceName='customer_settle';    
      }
      this.$http
        .post(
          globalConfig.temporary_server +interfaceName+
            "/remark/" +
            this.balance_id,
          this.new_mark
        )
        .then(res => {
          this.showLoading(false);
          if (res.code === 200) {
            this.new_remark_dialog_visible = false;
            this.getDetailRemarkListFun();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //结算单、报销单详情弹框关闭事件
    detialDialogClose(){
      this.detail_visible=false;
      // 备注列表的分页初始化
      this.remarkPageParams.page = 1;
      this.remarkPageParams.limit = 5;
    }

   
  }
};
</script>

<style lang="scss">
#balance {
  .textareaBg{
    .el-textarea__inner {
      background-color: #fff !important;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "../../../assets/scss/finance/balance/index.scss";
@mixin balanceImg($m, $n) {
  $url: "../../../assets/image/finance/" + $n + "/" + $m;
  @include bgImage($url);
}

@mixin lj_dialogImg($m, $n) {
  $url: "../../../assets/image/components/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #balance {
    .balance-detail {
      .balance-detail-title {
        span {
          @include balanceImg("yiyuedu.png", "theme1");
        }
        .activeTab {
          @include balanceImg("weiyuedu.png", "theme1");
          color: #ffffff;
        }
      }
    }
    .check-box {
      .check-box-list {
        .check-box-info {
          @include lj_dialogImg("shu.png", "theme1");
        }
      }
    }
    .form-reduce-icon {
      @include balanceImg("error.png", "theme1");
    }
  }
}

#theme_name.theme2 {
  #balance {
  }
}

#theme_name.theme3 {
  #balance {
  }
}

#theme_name.theme4 {
  #balance {
  }
}
</style>