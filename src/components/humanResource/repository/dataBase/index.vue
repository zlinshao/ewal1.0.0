<template>
  <div id="dataBase">
    <div class="main-nav">
      <div class="dataBase-left">
        <span
          v-for="(item,index) in active"
          :key="index"
          :class="{'isActive': item.id === activeName}"
          @click="changeTab(index)"
          >{{item.val}}</span>
      </div>
      <div class="dataBase-right" v-if="activeName === 2">
        <span
          v-for="(item,index) in contractNumberChoose"
          :key="index"
          :class="{'isActive': item.id === contractNumberChoosed}"
          @click="chooseContartType(index)"
          >{{item.val}}</span>
      </div>
      <div class="dataBase-right" v-if="activeName === 3">
        <span
          v-for="(item,index) in contractNumberEditChoose"
          :key="index"
          :class="{'isActive': item.id === contractNumberEditChoosed}"
          @click="chooseContartEditType(index)"
          >{{item.val}}</span>
      </div>
    </div>
    <div class="dataBase-container">
      <el-table :data="areaChangeOrder" v-if="activeName === 0" highlight-current-row header-row-class-name="tableHeader"
        style="width: 100%">
        <el-table-column label="审批编号" align="center"></el-table-column>
        <el-table-column label="审批名称" align="center"></el-table-column>
        <el-table-column label="上传时间" align="center"></el-table-column>
        <el-table-column label="申请人" align="center"></el-table-column>
        <el-table-column label="所属部门" align="center"></el-table-column>
        <el-table-column label="接收人" align="center"></el-table-column>
        <el-table-column label="证明人" align="center"></el-table-column>
        <el-table-column label="电子资料" align="center"></el-table-column>
      </el-table>
      <el-table v-if="activeName === 1" highlight-current-row header-row-class-name="tableHeader" style="width: 100%"
        :data="contractList">
        <el-table-column prop="process_id" label="审批编号" align="center"></el-table-column>
        <el-table-column prop="title" label="采购申请" align="center"></el-table-column>
        <el-table-column prop="source" label="供应商" align="center"></el-table-column>
        <el-table-column prop="start_time" label="签订时间" align="center"></el-table-column>
        <el-table-column prop="end_time" label="合同到期时间" align="center"></el-table-column>
        <el-table-column prop="signUser" label="签订人" align="center"></el-table-column>
        <el-table-column prop="department" label="所属部门" align="center"></el-table-column>
        <el-table-column prop="electronicData" label="电子资料" align="center"></el-table-column>
      </el-table>
      <div v-if="activeName === 2" class="contractNumber">
        <div class="contractNumberTop" v-if="contractNumberChoosed === 0">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" :data="contractCollectList" height="400px">
            <el-table-column label="姓名" align="center"  prop="name">
              <template slot-scope="scope">
                <div @click="contractCollect_visible =true">{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="剩余合同数(收)" align="center"></el-table-column>
            <el-table-column label="剩余合同数(租)" align="center"></el-table-column>
            <el-table-column label="已领取合同数(收)" align="center"></el-table-column>
            <el-table-column label="已领取合同数(租)" align="center"></el-table-column>
            <el-table-column label="已作废合同数(收)" align="center"></el-table-column>
            <el-table-column label="已作废合同数(租)" align="center"></el-table-column>
            <el-table-column label="已上缴合同数(收)" align="center"></el-table-column>
            <el-table-column label="已上缴合同数(租)" align="center"></el-table-column>
            <el-table-column label="已丢失合同数(收)" align="center"></el-table-column>
            <el-table-column label="已丢失合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="distribute(scope.row)">分配</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <div class="contractNumberBottom" v-if="contractNumberChoosed === 0">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%">
            <el-table-column label="城市" align="center"></el-table-column>
            <el-table-column label="合同总数(收)" align="center"></el-table-column>
            <el-table-column label="电子" align="center"></el-table-column>
            <el-table-column label="纸质" align="center"></el-table-column>
            <el-table-column label="合同总数(租)" align="center"></el-table-column>
            <el-table-column label="电子" align="center"></el-table-column>
            <el-table-column label="纸质" align="center"></el-table-column>
            <el-table-column label="剩余合同数(收)" align="center"></el-table-column>
            <el-table-column label="剩余缴合同数(租)" align="center"></el-table-column>
          </el-table>
        </div>
        <div v-if="contractNumberChoosed === 1">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractReceiveList" @row-click="contractReceive_visible = true">
            <el-table-column label="领取时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name"></el-table-column>
            <el-table-column label="领取合同数(收)" align="center"></el-table-column>
            <el-table-column label="领取合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center"></el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <div v-if="contractNumberChoosed === 2">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractCancelList"  @row-click="contractCancel_visible = true">
            <el-table-column label="作废时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name"></el-table-column>
            <el-table-column label="作废合同数(收)" align="center"></el-table-column>
            <el-table-column label="作废合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center"></el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <div v-if="contractNumberChoosed === 3">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractHandinList"  @row-click="contractHandin_visible = true">
            <el-table-column label="上缴时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name"></el-table-column>
            <el-table-column label="上缴合同数(收)" align="center"></el-table-column>
            <el-table-column label="上缴合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center"></el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <div v-if="contractNumberChoosed === 4">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractLoseList"  @row-click="contractLose_visible = true">
            <el-table-column label="丢失时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name"></el-table-column>
            <el-table-column label="丢失合同数(收)" align="center"></el-table-column>
            <el-table-column label="丢失合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center"></el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
      </div>
      <div v-if="activeName === 3" class="contractNumberEdit">
        <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" v-if="contractNumberEditChoosed === 0">
          <el-table-column label="城市" align="center"></el-table-column>
          <el-table-column label="合同总数(收)" align="center"></el-table-column>
          <el-table-column label="电子" align="center"></el-table-column>
          <el-table-column label="纸质" align="center"></el-table-column>
          <el-table-column label="合同总数(租)" align="center"></el-table-column>
          <el-table-column label="电子" align="center"></el-table-column>
          <el-table-column label="纸质" align="center"></el-table-column>
          <el-table-column label="剩余合同数(收)" align="center"></el-table-column>
          <el-table-column label="剩余合同数(租)" align="center"></el-table-column>
        </el-table>
        <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" v-if="contractNumberEditChoosed === 1">
          <el-table-column label="操作对象" align="center"></el-table-column>
          <el-table-column label="部门" align="center"></el-table-column>
          <el-table-column label="领取上限(收/租)" align="center"></el-table-column>
          <el-table-column label="操作人" align="center"></el-table-column>
          <el-table-column label="操作时间" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <footer class="flex-center bottomPage" v-if="activeName !==2">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="currentPage" :page-size="10"></el-pagination>
      </div>
    </footer>
    <!-- 添加合同 -->
    <lj-dialog :visible="addContract_visiable" :size="{width: 580 + 'px',height: 700 + 'px'}" @close="closeAddContrat()">
      <div class="dialog_container">
        <div class="dialog_header">
          添加采购合同
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="120px" class="depart_visible">
            <el-form-item label="采购申请">
              <div class="items-center iconInput">
                <el-select v-model="process_id" placeholder="请选择">
                  <el-option v-for="(item, index) in approvalDetail" :key="index" :label="item.title" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="供应商">
              <div class="items-center iconInput">
                <el-select v-model="supplierId" placeholder="请选择">
                  <el-option v-for="(item, index) in supplierDetail" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="签订时间">
              <div class="items-center iconInput">
                <el-date-picker v-model="signTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="合同到期时间">
              <div class="items-center iconInput">
                <el-date-picker v-model="expireTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="签订人">
              <div class="items-center iconInput">
                <user-choose title="请选择人员" v-model="signerId"></user-choose>
              </div>
            </el-form-item>
            <el-form-item label="合同照片">
              <lj-upload :max-size="5" v-model="contractImg"></lj-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="addContract()">确定</el-button>
          <el-button type="info" size="small" @click="closeAddContrat()">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!-- 汇总 -->
    <lj-dialog :visible="contractCollect_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="contractCollect_visible = false" class="collectDialog">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>合同汇总详情</h3>
        </div>
        <div class="dialog_body">
          <div class="main_left">
            <div class="fenlei" @click="contractGatherF()" :class="contractGatherChoosed == 1? 'contractGatherChoosed':'contractGatherChoosedF'"><p>分类</p><p>详情</p></div>
            <div class="all" @click="contractGatherS()" :class="contractGatherChoosed == 2? 'contractGatherChoosed':'contractGatherChoosedF'"><p>全部</p><p>详情</p></div>
          </div>
          <div class="main_right">
            <div class="right_title">
              <div class="words">合同信息</div>
              <div class="arrow"></div>
            </div>
            <el-table highlight-current-row header-row-class-name="tableHeader" v-if="contractGatherChoosed == 1">
              <el-table-column type="expand"></el-table-column>
              <el-table-column label="历史领取日期" align="center"></el-table-column>
              <el-table-column label="剩余未缴收房合同(LJSF)" align="center"></el-table-column>
              <el-table-column label="剩余未缴租房合同(LJZF)" align="center"></el-table-column>
            </el-table>
            <div class="right_body" v-if="contractGatherChoosed == 2">
              <div class="right_body_header">
                <h3 :class="remainingUnpaidChoosed == 1? 'remainingUnpaidChoosed': ''" @click="remainingUnpaidChooseF()">剩余未缴收房合同(LJSF)</h3>
                <h3 :class="remainingUnpaidChoosed == 2? 'remainingUnpaidChoosed': ''" @click="remainingUnpaidChooseS()" style="margin-left:60px;" >剩余未缴租房合同(LJZF)</h3>
              </div>
              <div class="right_body_main">
                <div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div>
                <div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div>
                <div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div>
                <div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div><div>JDAFJKDAFDSA</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!-- 分配 -->
    <lj-dialog :visible="distribute_visible" :size="{width: 1253 + 'px',height: 849 + 'px'}" @close="distribute_visible = false" class="distributeDialog">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>分配</h3>
        </div>
        <div class="dialog_body">
          <div class="body_header">
            <el-form label-width="120px" :inline="true">
              <el-form-item label="姓名">
                <div style="background:rgba(240,240,240,1);width:350px;height:40px;">
                  权志龙
                </div>
              </el-form-item>
              <el-form-item label="分配人">
                <user-choose></user-choose>
              </el-form-item>
            </el-form>
          </div>
          <div class="body_main">
            <div class="right_title">
              <div class="words">收房合同</div>
              <div class="arrow"></div>
            </div>
            <div class="body_detail">
              <div>
                <div class="selector"></div>
                <div class="content">FDSJKLFDSA</div>
              </div>
              <div>
                <div class="selector"></div>
                <div class="content">FDSJKLFDSA</div>
              </div>
              <div>
                <div class="selector"></div>
                <div class="content">FDSJKLFDSA</div>
              </div>
              <div>
                <div class="selector"></div>
                <div class="content">FDSJKLFDSA</div>
              </div>
            </div>
            <div class="right_title" style="margin-top: 69px;">
              <div class="words">租房合同</div>
              <div class="arrow"></div>
            </div>
            <div class="body_detail">
              <div>
                <div class="selector"></div>
                <div class="content">FDSJKLFDSA</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!-- 领取 -->
    <lj-dialog :visible="contractReceive_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="contractReceive_visible = false" class="receiveDialog">
      <div class="dialogHeader">
        <p>领取合同详情</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="receivedTitle">
          <p>已领取收房合同</p>
        </div>
        <div class="receivedDetail">
          <p>GFDASFDAFDSA</p>
        </div>
        <div class="rentTitle">
          <p>已领取租房合同</p>
        </div>
        <div class="rentDetail">
          <p>FDASDFGAFDFD</p>
        </div>
        <div class="otherTitle">
          <p>其他</p>
        </div>
        <div class="otherDetail">
          <div class="otherDetailTop">
            <p>截图</p>
            <img src="" alt="sss">
          </div>
          <div class="otherDetailBottom">
            <p class="bottomTitle">备注</p>
            <p class="bottomDetail">这里是备注文字这里是备注文字这里是备注文字</p>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!-- 作废 -->
    <lj-dialog :visible="contractCancel_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="contractCancel_visible = false" class="receiveDialog">
      <div class="dialogHeader">
        <p>作废合同详情</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="receivedTitle">
          <p>已作废收房合同</p>
        </div>
        <div class="receivedDetail">
          <p>GFDASFDAFDSA</p>
        </div>
        <div class="rentTitle">
          <p>已作废租房合同</p>
        </div>
        <div class="rentDetail">
          <p>FDASDFGAFDFD</p>
        </div>
        <div class="otherTitle">
          <p>其他</p>
        </div>
        <div class="otherDetail">
          <div class="otherDetailTop">
            <p>截图</p>
            <img src="" alt="sss">
          </div>
          <div class="otherDetailBottom">
            <p class="bottomTitle">备注</p>
            <p class="bottomDetail">这里是备注文字这里是备注文字这里是备注文字</p>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!-- 上缴 -->
    <lj-dialog :visible="contractHandin_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="contractHandin_visible = false">
    </lj-dialog>
    <!-- 上缴确认 -->
    <lj-dialog :visible="handinConfirm_visible" :size="{width: 471 + 'px',height: 368 + 'px'}" @close="handinConfirm_visible = false">
      上缴确认
    </lj-dialog>
    <!-- 丢失 -->
    <lj-dialog :visible="contractLose_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="contractLose_visible = false" class="receiveDialog">
      <div class="dialogHeader">
        <p>丢失合同详情</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="receivedTitle">
          <p>已丢失收房合同</p>
        </div>
        <div class="receivedDetail">
          <p>GFDASFDAFDSA</p>
        </div>
        <div class="rentTitle">
          <p>已丢失租房合同</p>
        </div>
        <div class="rentDetail">
          <p>FDASDFGAFDFD</p>
        </div>
        <div class="otherTitle">
          <p>其他</p>
        </div>
        <div class="otherDetail">
          <div class="otherDetailTop">
            <p>截图</p>
            <img src="" alt="sss">
          </div>
          <div class="otherDetailBottom">
            <p class="bottomTitle">备注</p>
            <p class="bottomDetail">这里是备注文字这里是备注文字这里是备注文字</p>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!-- 编号管理合同总数 -->
    <lj-dialog :visible="numberManageTotal_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="numberManageTotal_visible = false">
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload.vue';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  export default {
    name: "index",
    props: ["addContract_visiable"],
    components: {
      LjDialog,
      LjUpload,
      UserChoose
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        activeName: 0,
        active: [
          {id: 0, val: '片区异动交接单'},
          {id: 1, val: '采购合同'},
          {id: 2, val: '合同编号'},
          {id: 3, val: '合同编号管理'},
        ],
        contractNumberChoose: [
          {id: 0, val: '汇总'},
          {id: 1, val: '领取'},
          {id: 2, val: '作废'},
          {id: 3, val: '上缴'},
          {id: 4, val: '丢失'},
        ],
        contractNumberEditChoose: [
          {id: 0, val: '总合同数'},
          {id: 1, val: '总合同领取上限'},
        ],
        total: 0,
        currentPage: 1,
        contractCollect_visible: false,
        distribute_visible: false,
        contractReceive_visible: false,
        contractCancel_visible: false,
        contractHandin_visible: false,
        handinConfirm_visible: false,
        contractLose_visible: false,
        numberManageTotal_visible: false,
        contractNumberEditChoosed: 0,
        contractNumberChoosed: 0,
        areaChangeOrder: [],
        contractList: [],
        contractRequisition: '',
        supplierDetail: [],
        supplierId: 0,
        signTime: new Date(),
        expireTime: '',
        signerId: [],
        contractImg: [],
        approvalDetail:[],
        process_id: 0,
        approvalTitle: '',
        contractCollectList: [
          {
            name: "张三",
          }
        ],//合同汇总
        contractReceiveList: [
          {
            name: "张三",
          }
        ],//合同编号领取
        contractCancelList: [
          {
            name: "张三",
          }
        ],//合同编号作废
        contractHandinList: [
          {
            name: "张三",
          }
        ],//合同编号上缴
        contractLoseList: [
          {
            name: "张三",
          }
        ],//合同编号丢失
        contractGatherChoosed: 1,
        remainingUnpaidChoosed:1,
      }
    },
    mounted () {
      this.getAreaChangeOrder();
      this.getApprovalDetail();
    },
    methods: {
      changeTab: function (index) {
        this.activeName = index
        if (index === 0) {
          this.getAreaChangeOrder()
        } else {
        this.getContractList()
        }
      },
      getAreaChangeOrder: function () {

      },
      getContractList: function () {
        this.contractList = []
        let param = {
          page: this.currentPage,
          limit: 10
        }
        this.$http.get(`${this.url}eam/contract`, param).then(res => {
          if (res.code === '20000') {
            this.total = res.data.count
            for (var i = 0; i < res.data.data.length; i++) {
              let department = ''
              for (var j = 0; j < res.data.data[i].user.org.length; j++) {
                department = department + res.data.data[i].user.org[j].name + '-'
              }
              let obj = {
                process_id: res.data.data[i].process_id,
                title: res.data.data[i].title,
                source: res.data.data[i].source.name,
                start_time: res.data.data[i].start_time,
                end_time: res.data.data[i].end_time,
                signUser: res.data.data[i].user.name,
                department: department.substring(0, department.length - 1),
                electronicData: res.data.data[i].attachment
              }
              this.contractList.push(obj)
            }
          }
        })
      },
      addContract (chooseTab) {
        for (let i = 0; i < this.approvalDetail.length; i++) {
          if (this.process_id == this.approvalDetail[i].id) {
            this.approvalTitle = this.approvalDetail[i].title
          }
        }
        let param = {
          process_id: this.process_id,
          start_time: this.signTime,
          end_time: this.expireTime,
          source_id: this.supplierId,
          user_id: this.signerId[0],
          attachment: this.contractImg,
          title: this.approvalTitle
        }
        if (param.process_id == -1) {
          this.$LjNotify('error', {
            title: '失败',
            message: '请选择采购申请',
          });
        }
        if (param.source_id == -1) {
          this.$LjNotify('error', {
            title: '失败',
            message: '请选择供应商',
          });
        }
        if (param.start_time == '') {
          this.$LjNotify('error', {
            title: '失败',
            message: '请选择签订时间',
          });
        }
        if (param.user_id == -1) {
          this.$LjNotify('error', {
            title: '失败',
            message: '请选择签订人',
          });
        }
        else {
          this.$http.post(`${this.url}eam/contract`, param).then(res => {
            this.$LjMessageEasy(res, () => {
              this.getContractList();
              this.$emit('changeAddContrat', false)
            });
            this.contractRequisition = ''
            this.supplierId = 0
            this.signTime = new Date()
            this.expireTime = ''
            this.signerId = 0
            this.contractImg = []
          })
        }
      },
      closeAddContrat: function () {
        this.$emit('changeAddContrat', false)
      },
      getApprovalDetail: function () {
        this.$http.get(`${this.url}eam/storage/process`).then(res => {
          if (res.code == "20000") {
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = {
                id: res.data.data[i].id,
                title: res.data.data[i].title
              }
              this.approvalDetail.push(obj)
            }
          }
        })
        this.$http.get(`${this.url}eam/category`).then(res => {
          if (res.code == "20000") {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].type == 5) {
                let obj = {
                  id: res.data.data[i].id,
                  name: res.data.data[i].name
                }
                this.supplierDetail.push(obj)
              }
            }
          }
        })
      },
      chooseContartType: function(index) {
        this.contractNumberChoosed = index
      },
      chooseContartEditType: function(index) {
        this.contractNumberEditChoosed = index
      },
      distribute: function(row) {
        this.distribute_visible = true
      },
      contractGatherF: function() {
        this.contractGatherChoosed = 1
      },
      contractGatherS: function() {
        this.contractGatherChoosed = 2
      },
      remainingUnpaidChooseF: function() {
        this.remainingUnpaidChoosed = 1
      },
      remainingUnpaidChooseS: function() {
        this.remainingUnpaidChoosed = 2
      }
    }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/humanResource/repository/dataBase/index.scss";

@mixin childrenImg($m, $n) {
  $url: "../../../../assets/image/humanResource/repository/dataBase/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1{
  #dataBase {
    .main-nav {
      .dataBase-left{
        .isActive {
          @include childrenImg('teji.png', 'theme1');
        }
      }
      .dataBase-right{
        .isActive {
          @include childrenImg('xbx.png', 'theme1');
        }
      }
    }
    .collectDialog{
      .dialog_container{
        .dialog_body{
          .main_left{
            .contractGatherChoosed{
              @include childrenImg('sxxq.png', 'theme1');
            }
            .contractGatherChoosedF{
              @include childrenImg('wpxq.png', 'theme1');
            }
          }
          .main_right{
            .right_title{
              .arrow{
                @include childrenImg('zs.png', 'theme1');
              }
            }
          }
        }
      }
    }
    .distributeDialog{
      .dialog_body{
        .body_main{
          .right_title{
            .arrow{
              @include childrenImg('zs.png', 'theme1');
            }
          }
        }
      }
    }
  }
}

#theme_name.theme2 {
  #dataBase {
  }
}

#theme_name.theme3 {
  #dataBase {
  }
}

#theme_name.theme4 {
  #dataBase {
  }
}
</style>
