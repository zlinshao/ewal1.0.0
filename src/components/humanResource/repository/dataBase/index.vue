<template>
  <div id="dataBase">
    <div class="addAll" @click="add()" v-if="activeIndex == 1 || (activeIndex == 2 && contractNumberChoosed !== 0) || (activeIndex == 3 && contractNumberEditChoosed == 1)"><b>+</b></div>
    <div class="icons search" @click="search()" v-if="(activeIndex == 2 && contractNumberChoosed == 0) || (activeIndex ==3 && contractNumberEditChoosed ==1)"></div>
    <div class="main-nav">
      <div class="dataBase-left">
        <span
          v-for="(item,index) in active"
          :key="index"
          :class="{'isActive': item.id === activeIndex}"
          @click="changeTab(index)"
          >{{item.val}}</span>
      </div>
      <div class="dataBase-right" v-if="activeIndex === 2">
        <span
          v-for="(item,index) in contractNumberChoose"
          :key="index"
          :class="{'isActive': item.id === contractNumberChoosed}"
          @click="chooseContartType(index)"
          >{{item.val}}</span>
      </div>
      <div class="dataBase-right" v-if="activeIndex === 3">
        <span
          v-for="(item,index) in contractNumberEditChoose"
          :key="index"
          :class="{'isActive': item.id === contractNumberEditChoosed}"
          @click="chooseContartEditType(index)"
          >{{item.val}}</span>
      </div>
    </div>
    <div class="dataBase-container">
      <!-- 片区异动交接单 -->
      <el-table :data="areaChangeOrder" v-if="activeIndex === 0" highlight-current-row header-row-class-name="tableHeader"
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
      <!-- 采购合同 -->
      <el-table v-if="activeIndex === 1" highlight-current-row header-row-class-name="tableHeader" style="width: 100%"
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
      <!-- 合同编号 -->
      <div v-if="activeIndex === 2" class="contractNumber">
        <!-- 汇总 -->
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
        <!-- 领取 -->
        <div v-if="contractNumberChoosed === 1">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractReceiveList">
            <el-table-column label="领取时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name">
              <template slot-scope="scope">
                <div @click="contractReceive_visible = true">{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="领取合同数(收)" align="center"></el-table-column>
            <el-table-column label="领取合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="modifyReceive(scope.row)">修改</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <!-- 作废 -->
        <div v-if="contractNumberChoosed === 2">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractCancelList">
            <el-table-column label="作废时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name">
              <template slot-scope="scope">
                <div @click="contractCancel_visible = true">{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="作废合同数(收)" align="center"></el-table-column>
            <el-table-column label="作废合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="modifyCancel(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <!-- 上缴 -->
        <div v-if="contractNumberChoosed === 3">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractHandinList">
            <el-table-column label="上缴时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name">
              <template slot-scope="scope">
                <div @click="contractHandin_visible = true">{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="上缴合同数(收)" align="center"></el-table-column>
            <el-table-column label="上缴合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="modifyHandin(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
        <!-- 丢失 -->
        <div v-if="contractNumberChoosed === 4">
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="660px" :data="contractLoseList">
            <el-table-column label="丢失时间" align="center"></el-table-column>
            <el-table-column label="部门" align="center"></el-table-column>
            <el-table-column label="姓名" align="center" prop="name">
              <template slot-scope="scope">
                <div @click="contractLose_visible = true">{{scope.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="丢失合同数(收)" align="center"></el-table-column>
            <el-table-column label="丢失合同数(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="modifyLose(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page flex-center">
            <el-pagination :total="250" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
          </div>
        </div>
      </div>
      <!-- 合同编号管理 -->
      <div v-if="activeIndex === 3" class="contractNumberEdit">
        <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" v-if="contractNumberEditChoosed === 0" :data="contractManageListTotal">
          <el-table-column label="城市" align="center" prop="city">
            <template slot-scope="scope">
              <div @click="numberManageTotal_visible = true">{{scope.row.city}}</div>
            </template>
          </el-table-column>
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
    <footer class="flex-center bottomPage" v-if="activeIndex !==2">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="currentPage" :page-size="10"></el-pagination>
      </div>
    </footer>
    <!-- 添加合同 -->
    <lj-dialog :visible="addContract_visiable" :size="{width: 580 + 'px',height: 700 + 'px'}" @close="addContract_visiable = false">
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
          <el-button type="info" size="small" @click="addContract_visiable = false">取消</el-button>
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
          <div>
            <div class="title">
              <h3>领用人</h3>
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领用人</h3>
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领用人</h3>
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
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
    <!-- 领取修改 -->
    <lj-dialog :visible="receiveModify_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="receiveModify_visible = false" class="receiveModify">
      <div class="dialogHeader">
        <p>领取合同修改</p>
      </div>
      <div class="dialogBody scroll_bar">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>领用人</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>权志龙</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="operateInfo">
          <p>操作信息（取消勾选则不再选择）</p>
        </div>
        <div class="operateDetail">
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
          <div class="right_title">
            <div class="words">租房合同</div>
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
        </div>
        <div class="basicTitle">
          <p>剩余合同</p>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 领取合同-创建任务 -->
    <lj-dialog :visible="receiveMission_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="receiveMission_visible = false" class="receiveMission">
      <div class="dialogHeader">
        <p>创建任务</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>领用人</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>权志龙</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="version">
          <h3>版本号</h3>
          <div>
            <div></div>
          </div>
        </div>
        <div class="basicTitle">
          <p>操作信息</p>
        </div>
        <div class="operateDetail">
          <div class="addOperate">
            <div>领取合同数(收) <el-input></el-input></div>
            <div style="padding-left:30px;">合同编号<el-input></el-input></div>
            <div>到<el-input></el-input><div class="addIcon"></div></div>
          </div>
          <div></div>
          <div class="addOperate">
            <div>领取合同数(租) <el-input></el-input></div>
            <div style="padding-left:30px;">合同编号<el-input></el-input></div>
            <div>到<el-input></el-input><div class="addIcon"></div></div>
          </div>
          <div></div>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
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
          <div>
            <div class="title">
              <h3>领用人</h3>
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领用人</h3>
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领用人</h3>
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
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
    <!-- 作废修改 -->
    <lj-dialog :visible="cancelModify_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="cancelModify_visible = false" class="receiveModify">
     <div class="dialogHeader">
        <p>作废合同修改</p>
      </div>
      <div class="dialogBody scroll_bar">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>领用人</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>权志龙</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="operateInfo">
          <p>操作信息（取消勾选则不再选择）</p>
        </div>
        <div class="operateDetail">
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
          <div class="right_title">
            <div class="words">租房合同</div>
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
        </div>
        <div class="basicTitle">
          <p>剩余合同</p>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 作废创建任务 -->
    <lj-dialog :visible="cancelMission_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="cancelMission_visible = false" class="cancelMission">
      <div class="dialogHeader">
        <p>创建任务</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>领用人</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>权志龙</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="basicTitle">
          <p>操作信息</p>
        </div>
        <div class="operateDetail">
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
          <div class="right_title">
            <div class="words">租房合同</div>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 上缴 -->
    <lj-dialog :visible="contractHandin_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="contractHandin_visible = false" class="handinDialog">
      <div class="dialogHeader">
        <p>上缴合同详情</p>
      </div>
      <div class="dialogBody scroll_bar">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>上缴人</h3>
              <h3>上缴时间</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>所属部门</h3>
              <h3>操作时间</h3>
            </div>
            <div class="value">
              <h3>南京一区</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>操作人</h3>
            </div>
            <div class="value">
              <h3>南京</h3>
              <h3>权志龙</h3>
            </div>
          </div>
        </div>
        <div class="receivedTitle">
          <p>已上缴收房合同</p>
        </div>
        <div class="receivedDetail">
          <div>
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
            <button>审核</button>
          </div>
          <div>
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
            <button>审核</button>
          </div>
          <div>
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
            <button>审核</button>
          </div>
        </div>
        <div class="rentTitle">
          <p>已上缴租房合同</p>
        </div>
        <div class="receivedDetail">
          <div>
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
            <button>审核</button>
          </div>
          <div>
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
            <button>审核</button>
          </div>
          <div>
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
            <button>审核</button>
          </div>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 上缴确认 -->
    <lj-dialog :visible="handinConfirm_visible" :size="{width: 471 + 'px',height: 368 + 'px'}" @close="handinConfirm_visible = false">
      上缴确认
    </lj-dialog>
    <!-- 上缴修改 -->
    <lj-dialog :visible="haninModify_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="haninModify_visible = false" class="handinModify">
      <div class="dialogHeader">
        <p>上缴修改</p>
      </div>
      <div class="dialogBody scroll_bar">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>领用人</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>权志龙</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="operateInfo">
          <p>操作信息（请勾选）</p>
        </div>
        <div class="operateDetail">
          <div class="right_title">
            <div class="words">收房合同上缴</div>
            <div class="arrow"></div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="right_title">
            <div class="words">租房合同上缴</div>
            <div class="arrow"></div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
        </div>
        <div class="basicTitle">
          <p>剩余合同</p>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 上缴创建任务 -->
    <lj-dialog :visible="handinMission_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="handinMission_visible = false" class="cancelMission">
      <div class="dialogHeader">
        <p>创建任务</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetailContent">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>报备时间</h3>
            </div>
            <div class="valueR">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
              </el-date-picker>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>报备人</h3>
            </div>
            <div class="valueS">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <user-choose></user-choose>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>合同类型</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
        </div>
        <div class="basicTitle">
          <p>操作信息</p>
        </div>
        <div class="operatorDetail">
          <div class="right_title">
            <div class="words">收房合同上缴</div>
            <div class="arrow"></div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="right_title">
            <div class="words">租房合同上缴</div>
            <div class="arrow"></div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
          <div class="receiveHose">
            <div class="contractNumber">LJGYSF01001656</div>
            <div class="address">
              <div class="title">地址</div>
              <div class="detail">南京市建邺区艺树家工场19楼</div>
            </div>
            <div class="content">
              <div class="selector"></div>
              <div class="seletion">交接单</div>
              <div class="selector"></div>
              <div class="seletion">收据</div>
              <div class="selector"></div>
              <div class="seletion">钥匙</div>
            </div>
          </div>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
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
          <div>
            <div class="title">
              <h3>丢失人</h3>
              <h3>丢失时间</h3>
            </div>
            <div class="value">
              <h3>权志龙</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>丢失部门</h3>
              <h3>操作时间</h3>
            </div>
            <div class="value">
              <h3>南京一区</h3>
              <h3>2019-04-04 12:20:20</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>操作人</h3>
            </div>
            <div class="value">
              <h3>南京</h3>
              <h3>权志龙</h3>
            </div>
          </div>
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
    <!-- 丢失修改 -->
    <lj-dialog :visible="loseModify_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="loseModify_visible = false" class="receiveModify">
      <div class="dialogHeader">
        <p>丢失合同修改</p>
      </div>
      <div class="dialogBody scroll_bar">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetail">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>领用人</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>权志龙</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>领取日期</h3>
            </div>
            <div class="value">
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
            </el-date-picker>
            </div>
          </div>
        </div>
        <div class="operateInfo">
          <p>操作信息（取消勾选则不再选择）</p>
        </div>
        <div class="operateDetail">
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
          <div class="right_title">
            <div class="words">租房合同</div>
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
        </div>
        <div class="basicTitle">
          <p>剩余合同</p>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 丢失创建任务 -->
    <lj-dialog :visible="loseMission_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="loseMission_visible = false" class="cancelMission">
      <div class="dialogHeader">
        <p>创建任务</p>
      </div>
      <div class="dialogBody">
        <div class="basicTitle">
          <p>基本信息</p>
        </div>
        <div class="basicDetailContent">
          <div>
            <div class="title">
              <h3>任务类型</h3>
              <h3>报备时间</h3>
            </div>
            <div class="valueR">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                align="right">
              </el-date-picker>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>报备人</h3>
            </div>
            <div class="valueS">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <user-choose></user-choose>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>合同类型</h3>
              <h3>所属部门</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择">
                <el-option size="mini">
                </el-option>
              </el-select>
              <h3>南京一区</h3>
            </div>
          </div>
        </div>
        <div class="basicTitle">
          <p>操作信息</p>
        </div>
        <div class="operateDetail">
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
          <div class="right_title">
            <div class="words">租房合同</div>
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
      <div class="dialog_footer">
        <el-button type="danger">确定</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </lj-dialog>
    <!-- 编号管理合同总数 -->
    <lj-dialog :visible="numberManageTotal_visible" :size="{width: 1700 + 'px',height: 900 + 'px'}" @close="numberManageTotal_visible = false" class="numberManageTotal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>总合同数</h3>
        </div>
        <div class="dialog_main">
          <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
              <div>城市</div>南京
            </div>
            <div class="items-center listTopRight">
              <div class="icons add" @click="numberManageAddF_visible = true"><b>+</b></div>
            </div>
          </div>
          <el-table highlight-current-row header-row-class-name="tableHeader" style="width: 100%" height="570px" :data="numberManageDialogTable">
            <el-table-column label="入库时间" align="center"></el-table-column>
            <el-table-column label="数量(收)" align="center"></el-table-column>
            <el-table-column label="数量(租)" align="center"></el-table-column>
            <el-table-column label="操作人" align="center" prop="name"></el-table-column>
            <el-table-column label="现剩余(收)" align="center"></el-table-column>
            <el-table-column label="现剩余(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <button class="contractNumberButton" @click="numberManageModify_visible=true">修改</button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page flex-center common-page">
            <el-pagination :current-page="1" :page-size="6" :total="20" layout="total,jumper,prev,pager,next">
            </el-pagination>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small">确定</el-button>
            <el-button type="info" size="small">取消</el-button>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!-- 编号管理1新增 -->
    <lj-dialog :visible="numberManageAddF_visible" :size="{width: 680 + 'px',height: 404 + 'px'}" @close="numberManageAddF_visible = false" class="numberManageAddF">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
          <h4>操作人：当前登录人 操作时间：当前日期</h4>
        </div>
        <div class="dialog_main">
          <div class="left">
            <div class="title">
              <h3>城市</h3>
              <h3>数量(收)</h3>
              <h3>数量(租)</h3>
            </div>
            <div class="value">
              <el-select v-model="process_id" placeholder="请选择">
                <el-option>
                </el-option>
              </el-select>
              <el-input placeholder="请输入"></el-input>
              <el-input placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <h3>现剩余：</h3>
              <h3>现剩余：</h3>
            </div>
            <div class="value">
              <h3>10</h3>
              <h3>10</h3>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
            <el-button type="danger" size="small">确定</el-button>
            <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!-- 编号管理修改 -->
    <lj-dialog :visible="numberManageModify_visible" :size="{width: 680 + 'px',height: 404 + 'px'}" @close="numberManageModify_visible = false" class="numberManageAddF">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
          <h4>操作人：当前登录人 操作时间：当前日期</h4>
        </div>
        <div class="dialog_main">
          <div class="left">
            <div class="title">
              <h3>城市</h3>
              <h3>数量(收)</h3>
              <h3>数量(租)</h3>
            </div>
            <div class="value">
              <el-select v-model="process_id" placeholder="请选择">
                <el-option>
                </el-option>
              </el-select>
              <el-input placeholder="请输入"></el-input>
              <el-input placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <h3>现剩余：</h3>
              <h3>现剩余：</h3>
            </div>
            <div class="value">
              <h3>10</h3>
              <h3>10</h3>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
            <el-button type="danger" size="small">确定</el-button>
            <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!-- 编号管理2新增 -->
    <lj-dialog :visible="numberManageAddS_visible" :size="{width: 680 + 'px',height: 404 + 'px'}" @close="numberManageAddS_visible = false" class="numberManageAddS">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
          <h4>操作人：当前登录人 操作时间：当前日期</h4>
        </div>
        <div class="dialog_main">
          <div class="title">
            <h3>操作对象</h3>
            <h3>所在部门</h3>
            <h3>设置上限</h3>
          </div>
          <div class="value">
            <user-choose title="请选择"></user-choose>
            <h3>南京一区</h3>
            <el-input placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="dialog_footer">
            <el-button type="danger" size="small">确定</el-button>
            <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
import LjDialog from '../../../common/lj-dialog.vue';
import LjUpload from '../../../common/lightweightComponents/lj-upload.vue';
import UserChoose from '../../../common/lightweightComponents/UserChoose';
import OrgChoose from '../../../common/lightweightComponents/OrgChoose';
export default {
  name: "index",
  components: {
    LjDialog,
    LjUpload,
    UserChoose,
    OrgChoose,
  },
  data() {
    return {
      url: globalConfig.humanResource_server,
      activeIndex: 0,
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
      addContract_visiable: false,//添加合同
      contractCollect_visible: false,//汇总
      distribute_visible: false,//分配
      contractReceive_visible: false,//领取
      receiveModify_visible: false,//领取修改
      receiveMission_visible: false,//领取新建任务
      contractCancel_visible: false,//作废
      cancelModify_visible: false,//作废修改
      cancelMission_visible: false,//作废创建任务
      contractHandin_visible: false,//上缴
      handinConfirm_visible: false,//上缴确认
      haninModify_visible: false,//上缴修改
      handinMission_visible: false,//上缴创建任务
      contractLose_visible: false,//丢失
      loseModify_visible: false,//丢失修改
      loseMission_visible: false,//丢失创建任务
      numberManageTotal_visible: false,//合同编号管理总数
      numberManageAddF_visible: false,//合同编号管理新增1
      numberManageModify_visible: false,//合同编号管理修改
      numberManageAddS_visible: false,//合同编号管理新增2
      contractNumberEditChoosed: 0,
      contractNumberChoosed: 0,
      areaChangeOrder: [],
      contractList: [],
      contractRequisition: '',
      contractManageListTotal:[
        {city: "南京"}
      ],
      numberManageDialogTable: [
        {name: "张三"}
      ],
      //添加合同参数
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
      //汇总弹框选项
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
      this.activeIndex = index
      if (index === 0) {
        this.getAreaChangeOrder()
      } 
      else  if(index === 1){
        this.getContractList()
      }
      else  if(index === 2){
        this.getContractList()
      }
      else{
        this.getContractList()
      }
    },
    //获取异动交接单
    getAreaChangeOrder: function () {

    },
    //获取合同列表
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
    //添加按钮
    add: function() {
      if(this.activeIndex == 1) {
        this.addContract_visiable = true
      }
      else if(this.activeIndex == 2){
        if(this.contractNumberChoosed == 1){
          this.receiveMission_visible = true
        }
        else if(this.contractNumberChoosed == 2){
          this.cancelMission_visible = true
        }
        else if(this.contractNumberChoosed == 3){
          this.handinMission_visible = true
        }
        else if(this.contractNumberChoosed == 4){
          this.loseMission_visible = true
        }
      }
      else if(this.activeIndex ==3){
        if(this.contractNumberEditChoosed == 1){
          this.numberManageAddS_visible = true
        }
      }
    },
    search: function() {
      console.log(1)
    },
    //获取添加合同参数
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
    
    //添加合同
    addContract: function (chooseTab) {
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
            this.addContract_visiable = false
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
    },
    modifyReceive: function(row) {
      this.receiveModify_visible = true
    },
    modifyCancel: function(row) {
      this.cancelModify_visible = true
    },
    modifyHandin: function(row) {
      this.haninModify_visible = true
    },
    modifyLose: function(row) {
      this.loseModify_visible = true
    }
  }
}
</script>
<style lang="scss">
.contractNumberButton{
  width:96px;
  height:30px;
  background:rgba(245,250,255,1);
  border-radius:4px;
  border:1px solid rgba(12,102,255,1);
  font-size:14px;
  font-family:MicrosoftYaHei;
  color:rgba(12,102,255,1);
  line-height:19px;
  letter-spacing:2px;
}
</style>

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
    .receiveModify{
      .dialogBody{
        .operateDetail{
          .right_title{
            .arrow{
              @include childrenImg('zs.png', 'theme1');
            }
          }
        }
      }
    }
    .receiveMission{
      .dialogBody{
        .operateDetail{
          .addOperate{
            >div{
              .addIcon{
                @include childrenImg('tianjia.png', 'theme1');
              }
            }
          }
        }
      }
    }
    .cancelMission {
      .dialogBody {
        .operateDetail {
          .right_title{
            .arrow{
              @include childrenImg('zs.png', 'theme1');
            }
          }
        }
        .operatorDetail {
          .right_title{
            .arrow{
              @include childrenImg('zs.png', 'theme1');
            }
          }
        }
      }
    }
    .handinModify{
      .dialogBody{
        .operateDetail{
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
