<template>
  <div id="dataBase">
    <div
      class="addAll"
      @click="add"
      v-if="activeIndex == 1 || (activeIndex == 2 && contractNumberChoosed !== 0) || (activeIndex == 3 && contractNumberEditChoosed == 1)"
    >
      <b>+</b>
    </div>
    <div
      class="icons search"
      @click="search"
      v-if="(activeIndex == 2 && contractNumberChoosed == 0) || activeIndex==0||(activeIndex==3&&contractNumberEditChoosed==1)"
    ></div>
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
      <el-table
        :data="areaChangeOrder"
        v-if="activeIndex === 0"
        highlight-current-row
        header-row-class-name="tableHeader"
        style="width: 100%"
        :key="activeIndex"
      >
        <el-table-column prop="id" label="审批编号" align="center"></el-table-column>
        <el-table-column label="审批名称" align="center">
          <template slot-scope="scope">{{scope.row.type=="personal_change"?"个人异动":"离职交接"}}</template>
        </el-table-column>
        <el-table-column prop="created_at" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="user.name" label="申请人" align="center"></el-table-column>
        <el-table-column prop="org[0].name" label="所属部门" align="center"></el-table-column>
        <el-table-column prop="data.handover_id.name" label="接收人" align="center"></el-table-column>
        <el-table-column prop label="证明人" align="center"></el-table-column>
        <el-table-column label="电子资料" align="center">
          <template slot-scope="scope">
            <div class="photo-img" @click="getPhotoList(scope.row)"></div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 片区异动交接单的高级搜索 -->
      <searchHigh
        class="searchAreaChangeOrder"
        :module="searchAreaChangeOrder_visiable"
        :show-data="searchAreaChangeOrder_data"
        @close="closeSearchAreaChangeOrder"
      ></searchHigh>

      <!-- 采购合同 -->
      <el-table
        v-if="activeIndex === 1"
        highlight-current-row
        header-row-class-name="tableHeader"
        style="width: 100%"
        :data="contractList"
        :key="activeIndex"
      >
        <el-table-column prop="process_id" label="审批编号" align="center"></el-table-column>
        <el-table-column prop="title" label="采购申请" align="center"></el-table-column>
        <el-table-column prop="source" label="供应商" align="center"></el-table-column>
        <el-table-column prop="start_time" label="签订时间" align="center"></el-table-column>
        <el-table-column prop="end_time" label="合同到期时间" align="center"></el-table-column>
        <el-table-column prop="signUser" label="签订人" align="center"></el-table-column>
        <el-table-column prop="department" label="所属部门" align="center"></el-table-column>
        <el-table-column label="电子资料" align="center">
          <template slot-scope="scope">
            <div class="photo-img" @click="getPhotoList(scope.row)"></div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加采购合同 -->
      <lj-dialog
        :visible="addContract_visiable"
        :size="{width: 580 + 'px',height: 620 + 'px'}"
        @close="addContract_visiable = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>添加采购合同</h3>
          </div>
          <div class="dialog_main flex-center borderNone">
            <el-form label-width="120px" class="depart_visible" :model="addContract_form">
              <el-form-item label="采购申请">
                <div class="items-center iconInput">
                  <el-select v-model="addContract_form.process_id" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in approvalDetail"
                      :key="index"
                      :label="item.title"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="供应商">
                <div class="items-center iconInput">
                  <el-select v-model="addContract_form.source_id" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in supplierDetail"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="签订时间">
                <div class="items-center iconInput">
                  <el-date-picker
                    v-model="addContract_form.start_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="合同到期时间">
                <div class="items-center iconInput">
                  <el-date-picker
                    v-model="addContract_form.end_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="签订人">
                <div class="items-center iconInput">
                  <user-choose num="1" title="请选择人员" v-model="addContract_form.user_id"></user-choose>
                </div>
              </el-form-item>
              <el-form-item label="合同照片">
                <lj-upload :max-size="5" v-model="addContract_form.attachment"></lj-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="addContract">确定</el-button>
            <el-button type="info" size="small" @click="addContract_visiable = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!-- 合同编号 -->
      <div v-if="activeIndex === 2" class="contractNumber">
        <!-- 汇总上部分 -->
        <div class="contractNumberTop" v-if="contractNumberChoosed === 0">
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            style="width: 100%"
            :data="contractCollectList"
            height="400px"
            @row-dblclick="showCollectDetail"
          >
            <el-table-column label="姓名" align="center" prop="simple_staff.real_name"></el-table-column>
            <el-table-column label="剩余合同数(收)" align="center" prop="collect_count"></el-table-column>
            <el-table-column label="剩余合同数(租)" align="center" prop="rent_count"></el-table-column>
            <el-table-column label="已领取合同数(收)" align="center" prop="collect_apply"></el-table-column>
            <el-table-column label="已领取合同数(租)" align="center" prop="rent_apply"></el-table-column>
            <el-table-column label="已作废合同数(收)" align="center" prop="collect_invalidate"></el-table-column>
            <el-table-column label="已作废合同数(租)" align="center" prop="rent_invalidate"></el-table-column>
            <el-table-column label="已上缴合同数(收)" align="center" prop="collect_handin"></el-table-column>
            <el-table-column label="已上缴合同数(租)" align="center" prop="rent_handin"></el-table-column>
            <el-table-column label="已丢失合同数(收)" align="center" prop="collect_loss"></el-table-column>
            <el-table-column label="已丢失合同数(租)" align="center" prop="rent_loss"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="distribute(scope.row)" type="primary" plain>分配</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page" align="right">
            <!-- 汇总的普通分页 -->
            <el-pagination
              :total="commonPages_huizong.total"
              layout="total,jumper,prev,pager,next"
              :current-page="commonPages_huizong.page"
              v-if="!isHighSearch_huizong"
              :page-size="commonPages_huizong.limit"
              @current-change="changePages_huizong_common"
            ></el-pagination>
            <!-- 汇总的高级搜索分页 -->
            <el-pagination
              :total="searchPages_huizong.total"
              layout="total,jumper,prev,pager,next"
              :current-page="searchPages_huizong.page"
              v-if="isHighSearch_huizong"
              :page-size="searchPages_huizong.limit"
              @current-change="changePages_huizong_search"
            ></el-pagination>
          </div>
        </div>
        <!-- 汇总下部分 -->
        <div class="contractNumberBottom" v-if="contractNumberChoosed === 0">
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            :data="bottomTable"
            height="300px"
            :border="true"
          >
            <el-table-column label="城市" align="center" prop="city_name"></el-table-column>
            <el-table-column label="合同总数(收)" align="center" prop="collect_sum"></el-table-column>
            <el-table-column label="电子" align="center"></el-table-column>
            <el-table-column label="纸质" align="center"></el-table-column>
            <el-table-column label="合同总数(租)" align="center" prop="rent_sum"></el-table-column>
            <el-table-column label="电子" align="center"></el-table-column>
            <el-table-column label="纸质" align="center"></el-table-column>
            <el-table-column label="剩余合同数(收)" align="center" prop="collect_remain"></el-table-column>
            <el-table-column label="剩余缴合同数(租)" align="center" prop="rent_remain"></el-table-column>
          </el-table>
        </div>
        <!-- 合同编号中汇总的高级搜索 -->
        <searchHigh
          class="searchContractNumber"
          :module="searchContractNumber_visiable"
          :show-data="searchContractNumber_data"
          @close="closeSearchContractNumber"
        ></searchHigh>
        <!-- 领取 -->
        <div v-if="contractNumberChoosed === 1">
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            style="width: 100%"
            height="660px"
            :data="contractReceiveList"
            @row-dblclick="showReceiveDetail"
          >
            <el-table-column label="领取时间" align="center" prop="report_time"></el-table-column>
            <el-table-column label="部门" align="center" prop="department_name"></el-table-column>
            <el-table-column label="姓名" align="center" prop="staff_name"></el-table-column>
            <el-table-column label="领取合同数(收)" align="center" prop="collect_contracts_count"></el-table-column>
            <el-table-column label="领取合同数(租)" align="center" prop="rent_contracts_count"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="modifyReceive(scope.row)" plain>修改</el-button>
                <el-button type="danger" @click="deleteReceive(scope.row)" plain class="red">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 作废 -->
        <div v-if="contractNumberChoosed === 2">
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            style="width: 100%"
            height="660px"
            :data="contractCancelList"
            @row-dblclick="showCancelDetail"
          >
            <el-table-column label="作废时间" align="center" prop="report_time"></el-table-column>
            <el-table-column label="部门" align="center" prop="department_name"></el-table-column>
            <el-table-column label="姓名" align="center" prop="staff_name"></el-table-column>
            <el-table-column label="作废合同数(收)" align="center" prop="collect_contracts_count"></el-table-column>
            <el-table-column label="作废合同数(租)" align="center" prop="rent_contracts_count"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="modifyCancel(scope.row)" plain>修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 上缴 -->
        <div v-if="contractNumberChoosed === 3">
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            style="width: 100%"
            height="660px"
            :data="contractHandinList"
            @row-dblclick="showHandintDetail"
          >
            <el-table-column label="上缴时间" align="center" prop="report_time"></el-table-column>
            <el-table-column label="部门" align="center" prop="department_name"></el-table-column>
            <el-table-column label="姓名" align="center" prop="staff_name"></el-table-column>
            <el-table-column label="上缴合同数(收)" align="center" prop="collect_contracts_count"></el-table-column>
            <el-table-column label="上缴合同数(租)" align="center" prop="rent_contracts_count"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="modifyHandin(scope.row)" plain type="primary">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 丢失 -->
        <div v-if="contractNumberChoosed === 4">
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            style="width: 100%"
            height="660px"
            :data="contractLoseList"
            @row-dblclick="showLoseDetail"
          >
            <el-table-column label="丢失时间" align="center" prop="report_time"></el-table-column>
            <el-table-column label="部门" align="center" prop="department_name"></el-table-column>
            <el-table-column label="姓名" align="center" prop="staff_name"></el-table-column>
            <el-table-column label="丢失合同数(收)" align="center" prop="collect_contracts_count"></el-table-column>
            <el-table-column label="丢失合同数(租)" align="center" prop="rent_contracts_count"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="modifyLose(scope.row)" plain>修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 合同编号管理 -->
      <div v-if="activeIndex === 3" class="contractNumberEdit">
        <!-- 总合同数 -->
        <el-table
          highlight-current-row
          header-row-class-name="tableHeader"
          :data="bottomTable"
          :border="true"
          v-if="contractNumberEditChoosed === 0"
          @row-dblclick="numberManageTotal_fun"
        >
          <el-table-column label="城市" align="center" prop="city_name"></el-table-column>
          <el-table-column label="合同总数(收)" align="center" prop="collect_sum"></el-table-column>
          <el-table-column label="电子" align="center"></el-table-column>
          <el-table-column label="纸质" align="center"></el-table-column>
          <el-table-column label="合同总数(租)" align="center" prop="rent_sum"></el-table-column>
          <el-table-column label="电子" align="center"></el-table-column>
          <el-table-column label="纸质" align="center"></el-table-column>
          <el-table-column label="剩余合同数(收)" align="center" prop="collect_remain"></el-table-column>
          <el-table-column label="剩余缴合同数(租)" align="center" prop="rent_remain"></el-table-column>
        </el-table>
        <!-- 总合同领取上限 -->
        <el-table
          highlight-current-row
          header-row-class-name="tableHeader"
          style="width: 100%"
          v-if="contractNumberEditChoosed === 1"
          :data="htlqsxList"
        >
          <el-table-column prop="simple_staff.real_name" label="操作对象" align="center"></el-table-column>
          <el-table-column prop="name" label="部门" align="center"></el-table-column>
          <el-table-column prop="max_count" label="领取上限(收/租)" align="center"></el-table-column>
          <el-table-column prop="operator.real_name" label="操作人" align="center"></el-table-column>
          <el-table-column prop="operate_time" label="操作时间" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 合同编号管理的高级搜索 -->
      <searchHigh
        class="searchContractNumberEdit"
        :module="searchContractNumberEdit_visiable"
        :show-data="searchContractNumberEdit_data"
        @close="closeSearchContractNumberEdit"
      ></searchHigh>
    </div>

    <!-- 汇总详情 -->
    <lj-dialog
      :visible="contractCollect_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="contractCollect_visible = false"
      class="collectDialog"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>合同汇总详情</h3>
        </div>
        <div class="dialog_body">
          <div class="main_left">
            <div
              class="fenlei"
              @click="contractGatherF"
              :class="contractGatherChoosed == 1? 'contractGatherChoosed':'contractGatherChoosedF'"
            >
              <p>分类</p>
              <p>详情</p>
            </div>
            <div
              class="all"
              @click="contractGatherS"
              :class="contractGatherChoosed == 2? 'contractGatherChoosed':'contractGatherChoosedF'"
            >
              <p>全部</p>
              <p>详情</p>
            </div>
          </div>
          <div class="main_right">
            <div class="right_title">
              <div class="words">合同信息</div>
              <div class="arrow"></div>
            </div>
            <div class="right_body2" v-if="contractGatherChoosed == 1">
              <ul class="title">
                <li>历史领取日期</li>
                <li>剩余未缴收房合同（LJSF)</li>
                <li>剩余未缴租房合同(LJZF)</li>
              </ul>
              <div class="main">
                <el-collapse accordion v-if="hz_detail.length>0">
                  <el-collapse-item v-for="(item,index) in hz_detail" :key="index">
                    <template slot="title">
                      <div>{{item.report_time}}</div>
                      <div>{{item.collect.length+item.collect_allocated.length}}</div>
                      <div>{{item.rent.length+item.rent_allocated.length}}</div>
                    </template>
                    <div class="body">
                      <div class="body_header">
                        <h3
                          :class="remainingUnpaidChoosed == 1? 'remainingUnpaidChoosed': ''"
                          @click="remainingUnpaidChooseF"
                        >剩余未缴收房合同(LJSF)</h3>
                        <h3
                          :class="remainingUnpaidChoosed == 2? 'remainingUnpaidChoosed': ''"
                          @click="remainingUnpaidChooseS"
                        >剩余未缴租房合同(LJZF)</h3>
                      </div>
                      <div class="body_body">
                        <ul v-if="remainingUnpaidChoosed == 1">
                          <li v-for="sf in item.collect" :key="sf">{{sf}}</li>
                          <li
                            v-for="sf_collect_allocated in item.collect_allocated"
                            :key="sf_collect_allocated"
                          >{{sf_collect_allocated}}</li>
                        </ul>
                        <ul v-if="remainingUnpaidChoosed == 2">
                          <li v-for="zf in item.rent" :key="zf">{{zf}}</li>
                          <li
                            v-for="zf_allocated in item.rent_allocated"
                            :key="zf_allocated"
                          >{{zf_allocated}}</li>
                        </ul>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>

            <div class="right_body" v-if="contractGatherChoosed == 2">
              <div class="right_body_header">
                <h3
                  :class="remainingUnpaidChoosed == 1? 'remainingUnpaidChoosed': ''"
                  @click="remainingUnpaidChooseF"
                >剩余未缴收房合同(LJSF)</h3>
                <h3
                  :class="remainingUnpaidChoosed == 2? 'remainingUnpaidChoosed': ''"
                  @click="remainingUnpaidChooseS"
                  style="margin-left:60px;"
                >剩余未缴租房合同(LJZF)</h3>
              </div>
              <div class="right_body_main">
                <div v-if="remainingUnpaidChoosed == 1">
                  <p v-for="(item,index) in hz_detail" :key="index">
                    <span v-for="sf in item.collect" :key="sf">{{sf}}</span>
                    <span
                      v-for="sf_allocated in item.collect_allocated"
                      :key="sf_allocated"
                    >{{sf_allocated}}</span>
                  </p>
                </div>
                <div v-if="remainingUnpaidChoosed == 2">
                  <p v-for="(item,index) in hz_detail" :key="index">
                    <span v-for="zf in item.rent" :key="zf">{{zf}}</span>
                    <span
                      v-for="zf_allocated in item.rent_allocated"
                      :key="zf_allocated"
                    >{{zf_allocated}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="contractCollect_visible = false">确定</el-button>
          <el-button type="info" size="small" @click="contractCollect_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 汇总分配 -->
    <lj-dialog
      :visible="distribute_visible"
      :size="{width: 1253 + 'px',height: 849 + 'px'}"
      @close="distribute_visible = false"
      class="distributeDialog"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>汇总分配</h3>
        </div>
        <div class="dialog_body">
          <el-form label-width="140px" :inline="true">
            <div class="form_header">
              <el-form-item label="姓名">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{distribute_form.simple_staff?distribute_form.simple_staff.real_name:""}}</div>
              </el-form-item>
              <el-form-item label="分配人">
                <user-choose v-model="distribute_form.fp_id" :num="1"></user-choose>
              </el-form-item>
            </div>
            <div class="form_body">
              <el-form-item>
                <template slot="label">
                  <b>收房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="distribute_form.checkList_sf">
                  <el-checkbox
                    v-for="(val,key) in distribute_form.collects"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <b>租房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="distribute_form.checkList_zf">
                  <el-checkbox v-for="(val,key) in distribute_form.rents" :key="key" :label="val"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="distribute_submit">确定</el-button>
          <el-button type="info" size="small" @click="distribute_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 领取合同详情 -->
    <lj-dialog
      :visible="contractReceive_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="contractReceive_visible = false"
      class="receiveDialog"
    >
      <div class="dialogContainer">
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
                <h3>{{receiveBasiclInfo.simple_staff?receiveBasiclInfo.simple_staff.real_name:""}}</h3>
                <h3>{{receiveBasiclInfo.report_time}}</h3>
              </div>
            </div>
            <div>
              <div class="title">
                <h3>部门</h3>
                <h3>操作时间</h3>
              </div>
              <div class="value">
                <h3>{{receiveBasiclInfo.department}}</h3>
                <h3>{{receiveBasiclInfo.report_time}}</h3>
              </div>
            </div>
            <div>
              <div class="title">
                <h3>城市</h3>
                <h3>操作人</h3>
              </div>
              <div class="value">
                <h3>{{receiveBasiclInfo.city_name}}</h3>
                <h3>{{receiveBasiclInfo.operator?receiveBasiclInfo.operator.real_name:""}}</h3>
              </div>
            </div>
          </div>
          <div class="receivedTitle">
            <p>已领取收房合同</p>
          </div>
          <div class="receivedDetail">
            <p v-for="item in receiveBasiclInfo.collects" :key="item">{{item}}</p>
          </div>
          <div class="rentTitle">
            <p>已领取租房合同</p>
          </div>
          <div class="rentDetail">
            <p v-for="item in receiveBasiclInfo.rents" :key="item">{{item}}</p>
          </div>
          <div class="otherTitle">
            <p>其他</p>
          </div>
          <div class="otherDetail">
            <div class="otherDetailTop">
              <p>截图</p>
              <img :src="item.uri" v-for="item in receiveBasiclInfo.screenshot" :key="item" />
            </div>
            <div class="otherDetailBottom">
              <p class="bottomTitle">备注</p>
              <p
                class="bottomDetail"
                v-for="item in receiveBasiclInfo.remarks"
                :key="item"
              >{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!-- 领取合同修改 -->
    <lj-dialog
      :visible="receiveModify_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="receiveModify_visible = false"
      class="receiveModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>领取合同修改</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form label-width="140px" :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input readonly v-model="receiveBasiclInfo_change.mission_type"></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-input readonly v-model="receiveBasiclInfo_change.city_name"></el-input>
              </el-form-item>
              <el-form-item label="领取日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  readonly
                  v-model="receiveBasiclInfo_change.report_time"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="领用人">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{receiveBasiclInfo_change.simple_staff?receiveBasiclInfo_change.simple_staff.real_name:""}}</div>
              </el-form-item>
              <el-form-item label="所属部门">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{receiveBasiclInfo_change.department}}</div>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_body">
              <el-form-item>
                <template slot="label">
                  <b>收房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="receiveBasiclInfo_change.checkList_sf">
                  <el-checkbox
                    v-for="(val,key) in receiveBasiclInfo_change.collects"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <b>租房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="receiveBasiclInfo_change.checkList_zf">
                  <el-checkbox
                    v-for="(val,key) in receiveBasiclInfo_change.rents"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <h4 align="left">剩余合同</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="receiveBasiclInfo_change.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="receiveBasiclInfo_change.remarks"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="modifyReceive_submit">确定</el-button>
          <el-button type="info" @click="receiveModify_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 领取合同-创建任务 -->
    <lj-dialog
      :visible="receiveMission_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="receiveMission_visible = false"
      class="receiveMission"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>创建任务</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form label-width="140px" :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input v-model="receiveAdd_form.misson_type" readonly></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-select
                  v-model="receiveAdd_form.city_code"
                  @change="getReceiveAddInfo(receiveAdd_form)"
                >
                  <el-option
                    v-for="(city,index) in cityList"
                    :key="index"
                    :label="city.dictionary_name"
                    :value="city.variable.city_code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="领取日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="receiveAdd_form.report_time"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="领用人">
                <UserChoose :num="1" v-model="receiveAdd_form.staff_id"></UserChoose>
              </el-form-item>
              <el-form-item label="所属部门">
                <OrgChoose v-model="receiveAdd_form.department_id"></OrgChoose>
              </el-form-item>
              <el-form-item label="版本号">
                <el-radio-group
                  v-model="receiveAdd_form.version"
                  @change="getReceiveAddInfo(receiveAdd_form)"
                >
                  <el-radio label="1">1-LJ</el-radio>
                  <el-radio label="2">2-LJGY</el-radio>
                  <el-radio label="3">3-lC</el-radio>
                  <el-radio label="4">4-LP</el-radio>
                  <el-radio label="5">5-LQ</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_main">
              <div class="shou">
                <el-form-item label="领取合同数（收）">
                  <el-input type="input" placeholder="请输入" v-model="receiveAdd_form.collect_amount"></el-input>
                </el-form-item>
                <el-form-item label="合同编号">
                  <el-input
                    type="input"
                    placeholder="请输入"
                    v-model="receiveAdd_form.collect_start"
                    @change="getReceiveAddInfo_end(receiveAdd_form)"
                  ></el-input>
                </el-form-item>
                <el-form-item label="到">
                  <el-input type="input" v-model="receiveAdd_form.collect_end" readonly></el-input>
                </el-form-item>
                <el-form-item
                  label="合同编号（自选）"
                  v-for="(item,index) in receiveAdd_form.collect_extra"
                  :key="index"
                >
                  <el-input type="input" v-model="item.value"></el-input>
                  <div class="reduceIcon el-icon-remove" @click="reduceCollect_extra(index)"></div>
                </el-form-item>
                <div class="addIcon" @click="receiveAdd_form.collect_extra.push({value:''})"></div>
              </div>
              <div class="zu">
                <el-form-item label="领取合同数（租）">
                  <el-input type="input" placeholder="请输入" v-model="receiveAdd_form.rent_amount"></el-input>
                </el-form-item>
                <el-form-item label="合同编号">
                  <el-input
                    type="input"
                    placeholder="请输入"
                    v-model="receiveAdd_form.rent_start"
                    @change="getReceiveAddInfo_end(receiveAdd_form)"
                  ></el-input>
                </el-form-item>
                <el-form-item label="到">
                  <el-input type="input" v-model="receiveAdd_form.rent_end" readonly></el-input>
                </el-form-item>
                <el-form-item
                  label="合同编号（自选）"
                  v-for="(item,index) in receiveAdd_form.rent_extra"
                  :key="index"
                >
                  <el-input type="input" v-model="item.value"></el-input>
                  <div class="reduceIcon el-icon-remove" @click="reduceRent_extra(index)"></div>
                </el-form-item>
                <div class="addIcon" @click="receiveAdd_form.rent_extra.push({value:''})"></div>
              </div>
            </div>
            <h4 align="left">其他</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="receiveAdd_form.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="receiveAdd_form.remark"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="receiveAdd_submit">确定</el-button>
          <el-button type="info" @click="receiveMission_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 作废详情 -->
    <lj-dialog
      :visible="contractCancel_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="contractCancel_visible = false"
      class="receiveDialog"
    >
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
              <h3>{{cancelBasiclInfo.simple_staff?cancelBasiclInfo.simple_staff.real_name: ''}}</h3>
              <h3>{{cancelBasiclInfo.report_time}}</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>部门</h3>
              <h3>操作时间</h3>
            </div>
            <div class="value">
              <h3>{{cancelBasiclInfo.department}}</h3>
              <h3>{{cancelBasiclInfo.report_time}}</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>操作人</h3>
            </div>
            <div class="value">
              <h3>{{cancelBasiclInfo.city_name}}</h3>
              <h3>{{cancelBasiclInfo.operator?cancelBasiclInfo.operator.real_name: ''}}</h3>
            </div>
          </div>
        </div>
        <div class="receivedTitle">
          <p>已作废收房合同</p>
        </div>
        <div class="receivedDetail">
          <p v-for="item in cancelBasiclInfo.collects" :key="item">{{item}}</p>
        </div>
        <div class="rentTitle">
          <p>已作废租房合同</p>
        </div>
        <div class="rentDetail">
          <p v-for="item in cancelBasiclInfo.rents" :key="item">{{item}}</p>
        </div>
        <div class="otherTitle">
          <p>其他</p>
        </div>
        <div class="otherDetail">
          <div class="otherDetailTop">
            <p>截图</p>
            <img :src="item.uri" v-for="item in cancelBasiclInfo.screenshot" :key="item" />
          </div>
          <div class="otherDetailBottom">
            <p class="bottomTitle">备注</p>
            <p
              class="bottomDetail"
              v-for="item in cancelBasiclInfo.remarks"
              :key="item"
            >{{item.content}}</p>
          </div>
        </div>
      </div>
    </lj-dialog>
    <!-- 作废修改 -->
    <lj-dialog
      :visible="cancelModify_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="cancelModify_visible = false"
      class="receiveModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>作废合同修改</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form label-width="140px" :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input readonly v-model="cancelBasiclInfo_change.mission_type"></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-input readonly v-model="cancelBasiclInfo_change.city_name"></el-input>
              </el-form-item>
              <el-form-item label="领取日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  readonly
                  v-model="cancelBasiclInfo_change.report_time"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="领用人">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{cancelBasiclInfo_change.simple_staff?cancelBasiclInfo_change.simple_staff.real_name:""}}</div>
              </el-form-item>
              <el-form-item label="所属部门">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{cancelBasiclInfo_change.department}}</div>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_body">
              <el-form-item>
                <template slot="label">
                  <b>收房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="cancelBasiclInfo_change.checkList_sf">
                  <el-checkbox
                    v-for="(val,key) in cancelBasiclInfo_change.collects"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <b>租房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="cancelBasiclInfo_change.checkList_zf">
                  <el-checkbox
                    v-for="(val,key) in cancelBasiclInfo_change.rents"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <h4 align="left">剩余合同</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="cancelBasiclInfo_change.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="cancelBasiclInfo_change.remarks"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="cancelModify_submit">确定</el-button>
          <el-button type="info" @click="cancelModify_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 作废创建任务 -->
    <lj-dialog
      :visible="cancelMission_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="cancelMission_visible = false"
      class="receiveModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>作废合同新增</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form label-width="140px" :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input readonly v-model="cancelBasiclInfo_add.mission_type"></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-select v-model="cancelBasiclInfo_add.city_code">
                  <el-option
                    v-for="(city,index) in cityList"
                    :key="index"
                    :label="city.dictionary_name"
                    :value="city.variable.city_code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="领取日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="cancelBasiclInfo_add.report_time"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="领用人">
                <UserChoose v-model="cancelBasiclInfo_add.staff_id" :num="1"></UserChoose>
              </el-form-item>
              <el-form-item label="所属部门">
                <OrgChoose v-model="cancelBasiclInfo_add.department_id" :num="1"></OrgChoose>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_body">
              <el-form-item>
                <template slot="label">
                  <b>收房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="cancelBasiclInfo_add.checkList_sf">
                  <el-checkbox
                    v-for="(val,key) in cancelBasiclInfo_add.collects"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <b>租房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="cancelBasiclInfo_add.checkList_zf">
                  <el-checkbox
                    v-for="(val,key) in cancelBasiclInfo_add.rents"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <h4 align="left">剩余合同</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="cancelBasiclInfo_add.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="cancelBasiclInfo_add.remark"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="cancleAdd_submit">确定</el-button>
          <el-button type="info" @click="cancelMission_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 上缴详情 -->
    <lj-dialog
      :visible="contractHandin_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="contractHandin_visible = false"
      class="handinDialog"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>上缴合同详情</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <ul>
                <li>
                  <span>上缴人</span>
                  {{handinBasiclInfo.simple_staff.real_name}}
                </li>
                <li>
                  <span>所属部门</span>
                  {{handinBasiclInfo.department}}
                </li>
                <li>
                  <span>城市</span>
                  {{handinBasiclInfo.city_name}}
                </li>
                <li>
                  <span>上缴时间</span>
                  {{handinBasiclInfo.report_time}}
                </li>
                <li>
                  <span>操作时间</span>
                  {{handinBasiclInfo.report_time}}
                </li>
                <li>
                  <span>操作人</span>
                  {{handinBasiclInfo.operator.real_name}}
                </li>
              </ul>
            </div>
            <h4 align="left">已上缴收房合同</h4>
            <div class="form_box">
              <div class="sf">
                <div class="select_box">
                  <div class="ht_box" v-for="(val,key) in handinBasiclInfo.collects" :key="key">
                    <p>{{val}}</p>
                    <el-form-item label="地址">
                      <el-input :value="handinBasiclInfo.address[key]" readonly></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox disabled label="交接单" :checked="handinBasiclInfo.handover[key]"></el-checkbox>
                      <el-checkbox disabled label="收据" :checked="handinBasiclInfo.receipt[key]"></el-checkbox>
                      <el-checkbox disabled label="钥匙" :checked="handinBasiclInfo.key[key]"></el-checkbox>
                    </el-form-item>
                    <b
                      class="review-time"
                      v-if="handinBasiclInfo.passed[key]"
                    >{{handinBasiclInfo.passed[key]}}</b>
                    <el-button type="primary" plain @click="handinConfirm_fun(val,key)" v-else>审核</el-button>
                  </div>
                </div>
              </div>
            </div>
            <h4 align="left">已上缴租房合同</h4>
            <div class="form_box">
              <div class="zf">
                <div class="select_box">
                  <div class="ht_box" v-for="(val,key) in handinBasiclInfo.rents" :key="key">
                    <p>{{val}}</p>
                    <el-form-item label="地址">
                      <el-input :value="handinBasiclInfo.address[key]" readonly></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox disabled label="交接单" :checked="handinBasiclInfo.handover[key]"></el-checkbox>
                      <el-checkbox disabled label="收据" :checked="handinBasiclInfo.receipt[key]"></el-checkbox>
                      <el-checkbox disabled label="钥匙" :checked="handinBasiclInfo.key[key]"></el-checkbox>
                    </el-form-item>
                    <b
                      class="review-time"
                      v-if="handinBasiclInfo.passed[key]"
                    >{{handinBasiclInfo.passed[key]}}</b>
                    <el-button type="primary" plain @click="handinConfirm_fun(val,key)" v-else>审核</el-button>
                  </div>
                </div>
              </div>
            </div>
            <h4 align="left">其他</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <div class="photo-img" @click="getPhoto(handinBasiclInfo.screenshot)"></div>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="handinBasiclInfo.remarks_new" readonly></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="contractHandin_visible=false">确定</el-button>
          <el-button type="info" @click="contractHandin_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 上缴确认 -->
    <lj-dialog
      :visible="handinConfirm_visible"
      :size="{width: 471 + 'px',height: 368 + 'px'}"
      @close="handinConfirm_visible = false"
      class="handinConfirm"
    >
      <div class="dialogContainer">
        <div class="dialog_header">
          <i class="el-icon-warning-outline"></i>
          <p>警告</p>
        </div>
        <div class="dialog_body">
          <p>您确定将{{handin_id.val}}这条合同通过审核吗?</p>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="handinConfirm_sh">确定</el-button>
          <el-button type="info" @click="handinConfirm_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 上缴修改 -->
    <lj-dialog
      :visible="haninModify_visible"
      :size="{width: 1700 + 'px',height: 901 + 'px'}"
      @close="haninModify_visible = false"
      class="handinModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>上缴合同修改</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <!-- <el-select disabled v-model="handinBasiclInfo_change.misson_type">
                  <el-option></el-option>
                </el-select>-->
                <el-input v-model="handinBasiclInfo_change.misson_type" readonly></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <!-- <el-select disabled v-model="handinBasiclInfo_change.city_name">
                  <el-option></el-option>
                </el-select>-->
                <el-input v-model="handinBasiclInfo_change.city_name" readonly></el-input>
              </el-form-item>
              <el-form-item label="合同类型">
                <!-- <el-select disabled v-model="handinBasiclInfo_change.contract_type">
                  <el-option></el-option>
                </el-select>-->
                <el-input v-model="handinBasiclInfo_change.contract_type_name" readonly></el-input>
              </el-form-item>
              <el-form-item label="报备日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="handinBasiclInfo_change.report_time"
                  disabled
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="报备人">
                <!-- <el-select disabled v-model="handinBasiclInfo_change.simple_staff.real_name">
                  <el-option></el-option>
                </el-select>-->
                <el-input v-model="handinBasiclInfo_change.simple_staff.real_name" readonly></el-input>
              </el-form-item>
              <el-form-item label="所属部门">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{handinBasiclInfo_change.department}}</div>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_box">
              <div class="sf">
                <div class="title">
                  <b>收房合同上缴</b>
                  <span class="arrow"></span>
                </div>
                <div class="select_box">
                  <div
                    class="ht_box"
                    v-for="(val,key) in handinBasiclInfo_change.collects"
                    :key="key"
                  >
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_change.choosed[key]">{{val}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="地址" label-width="40">
                      <el-input v-model="handinBasiclInfo_change.address[key]"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_change.handover[key]">交接单</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_change.receipt[key]">收据</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_change.key[key]">钥匙</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="zf">
                <div class="title">
                  <b>租房合同上缴</b>
                  <span class="arrow"></span>
                </div>
                <div class="select_box">
                  <div class="ht_box" v-for="(val,key) in handinBasiclInfo_change.rents" :key="key">
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_change.choosed[key]">{{val}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="地址">
                      <el-input v-model="handinBasiclInfo_change.address[key]"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_change.handover[key]">交接单</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_change.receipt[key]">收据</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_change.key[key]">钥匙</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <h4 align="left">其他</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="handinBasiclInfo_change.file_info"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="handinBasiclInfo_change.remarks_new"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="modifyHandin_submit">确定</el-button>
          <el-button type="info" @click="haninModify_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 上缴创建任务 -->
    <lj-dialog
      :visible="handinMission_visible"
      :size="{width: 1700 + 'px',height: 901 + 'px'}"
      @close="handinMission_visible = false"
      class="handinModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>创建任务</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input v-model="handinBasiclInfo_create.misson_type" readonly></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-select v-model="handinBasiclInfo_create.city_code">
                  <el-option
                    v-for="(city,index) in cityList"
                    :key="index"
                    :label="city.dictionary_name"
                    :value="city.variable.city_code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="合同类型">
                <el-select v-model="handinBasiclInfo_create.contract_type">
                  <el-option
                    v-for="(ht,index) in contractTypeList"
                    :key="index"
                    :label="ht.dictionary_name"
                    :value="ht.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="报备日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="handinBasiclInfo_create.report_time"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="报备人">
                <UserChoose :num="1" v-model="handinBasiclInfo_create.staff_id"></UserChoose>
              </el-form-item>
              <el-form-item label="所属部门">
                <org-choose title="请选择部门" v-model="handinBasiclInfo_create.department_id"></org-choose>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_box">
              <div class="sf">
                <div class="title">
                  <b>收房合同上缴</b>
                  <span class="arrow"></span>
                </div>
                <div class="select_box">
                  <div
                    class="ht_box"
                    v-for="(val,key) in handinBasiclInfo_create.collects"
                    :key="key"
                  >
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_create.choosed[key]">{{val}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="地址" label-width="40">
                      <el-input v-model="handinBasiclInfo_create.address[key]"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_create.handover[key]">交接单</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_create.receipt[key]">收据</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_create.key[key]">钥匙</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="zf">
                <div class="title">
                  <b>租房合同上缴</b>
                  <span class="arrow"></span>
                </div>
                <div class="select_box">
                  <div class="ht_box" v-for="(val,key) in handinBasiclInfo_create.rents" :key="key">
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_create.choosed[key]">{{val}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="地址">
                      <el-input v-model="handinBasiclInfo_create.address[key]"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="handinBasiclInfo_create.handover[key]">交接单</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_create.receipt[key]">收据</el-checkbox>
                      <el-checkbox v-model="handinBasiclInfo_create.key[key]">钥匙</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <h4 align="left">其他</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="handinBasiclInfo_create.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="handinBasiclInfo_create.remark"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="handinMission_submit">确定</el-button>
          <el-button type="info" @click="handinMission_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 丢失详情 -->
    <lj-dialog
      :visible="contractLose_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="contractLose_visible = false"
      class="receiveDialog"
    >
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
              <h3>{{loseSimplereal_name}}</h3>
              <h3>{{loseBasiclInfo.report_time}}</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>丢失部门</h3>
              <h3>操作时间</h3>
            </div>
            <div class="value">
              <h3>{{loseBasiclInfo.department}}</h3>
              <h3>{{loseBasiclInfo.report_time}}</h3>
            </div>
          </div>
          <div>
            <div class="title">
              <h3>城市</h3>
              <h3>操作人</h3>
            </div>
            <div class="value">
              <h3>{{loseBasiclInfo.city_name}}</h3>
              <h3>{{loseBasiclInfo.operator?loseBasiclInfo.operator.real_name:""}}</h3>
            </div>
          </div>
        </div>
        <div class="receivedTitle">
          <p>已丢失收房合同</p>
        </div>
        <div class="receivedDetail">
          <p v-for="item in loseBasiclInfo.collects" :key="item">{{item}}</p>
        </div>
        <div class="rentTitle">
          <p>已丢失租房合同</p>
        </div>
        <div class="rentDetail">
          <p v-for="item in loseBasiclInfo.rents" :key="item">{{item}}</p>
        </div>
        <div class="otherTitle">
          <p>其他</p>
        </div>
        <div class="otherDetail">
          <div class="otherDetailTop">
            <p>截图</p>
            <img :src="item.uri" v-for="item in loseBasiclInfo.screenshot" :key="item" />
          </div>
          <div class="otherDetailBottom">
            <p class="bottomTitle">备注</p>
            <p
              class="bottomDetail"
              v-for="item in loseBasiclInfo.remarks"
              :key="item"
            >{{item.content}}</p>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!-- 丢失修改 -->
    <lj-dialog
      :visible="loseModify_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="loseModify_visible = false"
      class="receiveModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>丢失合同修改</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form label-width="140px" :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input readonly v-model="loseBasiclInfo_change.mission_type"></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-input readonly v-model="loseBasiclInfo_change.city_name"></el-input>
              </el-form-item>
              <el-form-item label="领取日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  readonly
                  v-model="loseBasiclInfo_change.report_time"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="领用人">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{loseBasiclInfo_change.simple_staff?loseBasiclInfo_change.simple_staff.real_name:""}}</div>
              </el-form-item>
              <el-form-item label="所属部门">
                <div
                  style="background:rgba(240,240,240,1);width:350px;height:40px; padding:0 20px;"
                >{{loseBasiclInfo_change.department}}</div>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_body">
              <el-form-item>
                <template slot="label">
                  <b>收房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="loseBasiclInfo_change.checkList_sf">
                  <el-checkbox
                    v-for="(val,key) in loseBasiclInfo_change.collects"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <b>租房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="loseBasiclInfo_change.checkList_zf">
                  <el-checkbox
                    v-for="(val,key) in loseBasiclInfo_change.rents"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <h4 align="left">剩余合同</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="loseBasiclInfo_change.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="loseBasiclInfo_change.remarks"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="loseModify_submit">确定</el-button>
          <el-button type="info" @click="loseModify_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 丢失创建任务 -->
    <lj-dialog
      :visible="loseMission_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="loseMission_visible = false"
      class="receiveModify"
    >
      <div class="dialogContainer">
        <div class="dialogHeader">
          <p>丢失合同新增</p>
        </div>
        <div class="dialog_body scroll_bar">
          <el-form label-width="140px" :inline="true">
            <h4 align="left">基本信息</h4>
            <div class="form_header">
              <el-form-item label="任务类型">
                <el-input readonly v-model="loseBasiclInfo_create.mission_type"></el-input>
              </el-form-item>
              <el-form-item label="城市">
                <el-select v-model="loseBasiclInfo_create.city_code">
                  <el-option
                    v-for="(city,index) in cityList"
                    :key="index"
                    :label="city.dictionary_name"
                    :value="city.variable.city_code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="领取日期">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="loseBasiclInfo_create.report_time"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="领用人">
                <UserChoose v-model="loseBasiclInfo_create.staff_id" :num="1"></UserChoose>
              </el-form-item>
              <el-form-item label="所属部门">
                <OrgChoose v-model="loseBasiclInfo_create.department_id" :num="1"></OrgChoose>
              </el-form-item>
            </div>
            <h4 align="left">操作信息</h4>
            <div class="form_body">
              <el-form-item>
                <template slot="label">
                  <b>收房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="loseBasiclInfo_create.checkList_sf">
                  <el-checkbox
                    v-for="(val,key) in loseBasiclInfo_create.collects"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <template slot="label">
                  <b>租房合同</b>
                  <span class="arrow"></span>
                </template>
                <el-checkbox-group v-model="loseBasiclInfo_create.checkList_zf">
                  <el-checkbox
                    v-for="(val,key) in loseBasiclInfo_create.rents"
                    :key="key"
                    :label="val"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <h4 align="left">剩余合同</h4>
            <div class="form_footer" align="left">
              <el-form-item label="截图">
                <lj-upload v-model="loseBasiclInfo_create.screenshot"></lj-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="loseBasiclInfo_create.remark"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" @click="loseMission_submit">确定</el-button>
          <el-button type="info" @click="loseMission_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 合同编号管理/详情 -->
    <lj-dialog
      :visible="numberManageTotal_visible"
      :size="{width: 1700 + 'px',height: 900 + 'px'}"
      @close="numberManageTotal_visible = false"
      class="numberManageTotal"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>总合同数</h3>
        </div>
        <div class="dialog_main">
          <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
              <div class="city">
                城市
                <span>{{numberManageDialogTable.length>0?numberManageDialogTable[0].city_name:" "}}</span>
              </div>
            </div>
            <div class="items-center listTopRight">
              <div class="icons add" @click="numberManageAddF_visible=true">
                <b>+</b>
              </div>
            </div>
          </div>
          <el-table
            highlight-current-row
            header-row-class-name="tableHeader"
            style="width: 100%"
            height="570px"
            :data="numberManageDialogTable"
          >
            <el-table-column prop="created_at" label="入库时间" align="center"></el-table-column>
            <el-table-column prop="collect_amount" label="数量(收)" align="center"></el-table-column>
            <el-table-column prop="rent_amount" label="数量(租)" align="center"></el-table-column>
            <el-table-column prop="operator.real_name" label="操作人" align="center"></el-table-column>
            <el-table-column prop="collect_remain" label="现剩余(收)" align="center"></el-table-column>
            <el-table-column prop="rent_remain" label="现剩余(租)" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  class="contractNumberButton"
                  @click="openNumberManageModify(scope.row)"
                  type="primary"
                  plain
                  v-if="scope.$index==0"
                >修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page flex-center common-page">
            <el-pagination
              :current-page="pages_ht_zong.page"
              :page-size="pages_ht_zong.limit"
              :total="pages_ht_zong.total"
              layout="total,jumper,prev,pager,next"
              @current-change="changePages_ht_zong"
            ></el-pagination>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="numberManageTotal_visible=false">确定</el-button>
            <el-button type="info" size="small" @click="numberManageTotal_visible=false">取消</el-button>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!-- 总合同数新增 -->
    <lj-dialog
      :visible="numberManageAddF_visible"
      :size="{width: 680 + 'px',height: 404 + 'px'}"
      @close="numberManageAddF_visible = false"
      class="numberManageAddF"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
          <h4>操作人：{{numberManageAdd_form.operate_name.name}} 操作时间：{{numberManageAdd_form.operate_time}}</h4>
        </div>
        <div class="dialog_main">
          <div class="left">
            <div class="title">
              <h3>城市</h3>
              <h3>数量(收)</h3>
              <h3>数量(租)</h3>
            </div>
            <div class="value">
              <el-select
                placeholder="请选择"
                v-model="numberManageAdd_form.city_code"
                @change="remainder_ht"
              >
                <el-option
                  v-for="(city,index) in cityList"
                  :key="index"
                  :label="city.dictionary_name"
                  :value="city.variable.city_code"
                ></el-option>
              </el-select>
              <el-input placeholder="请输入" v-model="numberManageAdd_form.collect_amount"></el-input>
              <el-input placeholder="请输入" v-model="numberManageAdd_form.rent_amount"></el-input>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <h3>现剩余：</h3>
              <h3>现剩余：</h3>
            </div>
            <div class="value">
              <h3>{{numberManageAdd_form.collect_remain}}</h3>
              <h3>{{numberManageAdd_form.rent_remain}}</h3>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="numberManageAddF_fun">确定</el-button>
          <el-button type="info" size="small" @click="numberManageAddF_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 总合同数修改 -->
    <lj-dialog
      :visible="numberManageModify_visible"
      :size="{width: 680 + 'px',height: 404 + 'px'}"
      @close="numberManageModify_visible = false"
      class="numberManageAddF"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>修改</h3>
          <h4>操作人：{{numberManageMerge_form.operate_name.name}} 操作时间：{{numberManageMerge_form.operate_time}}</h4>
        </div>
        <div class="dialog_main">
          <div class="left">
            <div class="title">
              <h3>城市</h3>
              <h3>数量(收)</h3>
              <h3>数量(租)</h3>
            </div>
            <div class="value">
              <el-select placeholder="请选择" v-model="numberManageMerge_form.city_code" disabled>
                <!-- <el-option
                  v-for="(city,index) in cityList"
                  :key="index"
                  :label="city.dictionary_name"
                  :value="city.variable.city_code"
                ></el-option>-->
              </el-select>
              <el-input placeholder="请输入" v-model="numberManageMerge_form.collect_amount"></el-input>
              <el-input placeholder="请输入" v-model="numberManageMerge_form.rent_amount"></el-input>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <h3>现剩余：</h3>
              <h3>现剩余：</h3>
            </div>
            <div class="value">
              <h3>{{numberManageMerge_form.collect_remain}}</h3>
              <h3>{{numberManageMerge_form.rent_remain}}</h3>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="numberManageMergeF_fun">确定</el-button>
          <el-button type="info" size="small" @click="numberManageModify_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 编号管理总合同领取上限新增 -->
    <lj-dialog
      :visible="numberManageAddS_visible"
      :size="{width: 680 + 'px',height: 404 + 'px'}"
      @close="numberManageAddS_visible = false"
      class="numberManageAddS"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增</h3>
          <h4>操作人：{{numberManageAddS_form.operate_name.name}} 操作时间：{{numberManageAddS_form.operate_time}}</h4>
        </div>
        <div class="dialog_main">
          <div class="title">
            <h3>操作对象</h3>
            <!-- <h3>所在部门</h3> -->
            <h3>设置上限</h3>
          </div>
          <div class="value">
            <user-choose title="请选择" v-model="numberManageAddS_form.staff_ids" :num="1"></user-choose>
            <!-- <h3>南京一区</h3> -->
            <el-input placeholder="请输入" v-model="numberManageAddS_form.max_count"></el-input>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="numberManageAddS_fun">确定</el-button>
          <el-button type="info" size="small" @click="numberManageAddS_visible=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 普通分页(除去合同编号下的汇总) -->
    <footer
      class="flex-center bottomPage"
      v-if="(activeIndex !==2&&!isHighSearch)||activeIndex ===2&&contractNumberChoosed!==0"
    >
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination
          :total="commonPages.total"
          layout="total,jumper,prev,pager,next"
          :current-page="commonPages.page"
          :page-size="commonPages.limit"
          @current-change="changePages_common"
        ></el-pagination>
      </div>
    </footer>

    <!-- 搜索分页（除去合同编号下的汇总） -->
    <footer class="flex-center bottomPage" v-if="(activeIndex !==2&&isHighSearch)">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination
          :total="searchPages.total"
          layout="total,jumper,prev,pager,next"
          :current-page="searchPages.page"
          :page-size="searchPages.limit"
          @current-change="changePages_search"
        ></el-pagination>
      </div>
    </footer>

    <!-- 图片轮播 -->
    <lj-dialog
      :visible="imgSlider_visiable"
      @close="imgSlider_visiable = false"
      class="imgSlider"
      :size="{width: 680 + 'px',height: 404 + 'px'}"
    >
      <imgSlider :ids="imgData"></imgSlider>
    </lj-dialog>
  </div>
</template>

<script>
import LjDialog from "../../../common/lj-dialog.vue";
import LjUpload from "../../../common/lightweightComponents/lj-upload.vue";
import UserChoose from "../../../common/lightweightComponents/UserChoose";
import OrgChoose from "../../../common/lightweightComponents/OrgChoose";
import searchHigh from "../../../common/searchHigh.vue";
import imgSlider from "../../../common/lightweightComponents/ImgSlider.vue";
import {
  areaChangeOrderHighSearch,
  contractNumberHighSearch,
  contractNumberEditHighSearch
} from "../../../../assets/js/allSearchData.js";
export default {
  name: "index",
  components: {
    LjDialog,
    LjUpload,
    UserChoose,
    OrgChoose,
    searchHigh,
    imgSlider
  },
  data() {
    return {
      url: globalConfig.humanResource_server,
      activeIndex: 0,
      active: [
        { id: 0, val: "片区异动交接单" },
        { id: 1, val: "采购合同" },
        { id: 2, val: "合同编号" },
        { id: 3, val: "合同编号管理" }
      ],
      contractNumberChoose: [
        { id: 0, val: "汇总" },
        { id: 1, val: "领取" },
        { id: 2, val: "作废" },
        { id: 3, val: "上缴" },
        { id: 4, val: "丢失" }
      ],
      contractNumberEditChoose: [
        { id: 0, val: "总合同数" },
        { id: 1, val: "总合同领取上限" }
      ],
      // 片区异动交接单的高级搜索显示
      searchAreaChangeOrder_visiable: false,
      // 片区异动交接单的数据
      searchAreaChangeOrder_data: areaChangeOrderHighSearch,
      // 添加采购合同的表单
      addContract_form: {
        process_id: "", //采购的审批id，调接口
        title: "", //采购审批标题，调接口
        source_id: "", //供应商id，调接口
        start_time: "", //签订时间
        end_time: "", //合同结束日期
        user_id: "", //签订人id
        attachment: [] //合同照片
      },
      //添加采购合同调接口的数据
      supplierDetail: [], //供应商列表
      approvalDetail: [], //合同审批id
      // 非搜索分页
      commonPages: {
        limit: 10,
        page: 1,
        total: 0
      },
      // 搜索分页
      searchPages: {
        limit: 10,
        page: 1,
        total: 0
      },
      // 汇总非搜索分页
      commonPages_huizong: {
        limit: 10,
        page: 1,
        total: 0
      },
      // 汇总搜索分页
      searchPages_huizong: {
        limit: 10,
        page: 1,
        total: 0
      },
      // 合同编号管理/总合同数详情的分页
      pages_ht_zong: {
        limit: 10,
        page: 1,
        total: 0
      },
      // 是否是高级搜索
      isHighSearch: false,
      // 汇总页是否是高级搜索
      isHighSearch_huizong: false,
      // 合同编号的高级搜索模态框
      searchContractNumber_visiable: false,
      searchContractNumber_data: contractNumberHighSearch,
      // 合同编号管理的高级搜索
      searchContractNumberEdit_visiable: false,
      searchContractNumberEdit_data: contractNumberEditHighSearch,
      // 图片轮播的显示隐藏
      imgSlider_visiable: false,
      // 图片轮播的数据(id)
      imgData: [],
      // 汇总的搜索数据
      searchData_huizong: {},
      // total: 0,
      // currentPage: 1,
      cityList: [], //城市列表
      addContract_visiable: false, //添加采购合同
      contractCollect_visible: false, //汇总详情模态框
      distribute_visible: false, //分配
      contractReceive_visible: false, //领取
      receiveModify_visible: false, //领取修改
      receiveMission_visible: false, //领取新建任务
      contractCancel_visible: false, //作废
      cancelModify_visible: false, //作废修改
      cancelMission_visible: false, //作废创建任务
      contractHandin_visible: false, //上缴
      handinConfirm_visible: false, //上缴确认
      haninModify_visible: false, //上缴修改
      handinMission_visible: false, //上缴创建任务
      contractLose_visible: false, //丢失
      loseModify_visible: false, //丢失修改
      loseMission_visible: false, //丢失创建任务
      numberManageTotal_visible: false, //合同编号管理总数
      numberManageAddF_visible: false, //合同编号管理新增1
      numberManageModify_visible: false, //合同编号管理修改
      numberManageAddS_visible: false, //合同编号管理新增2
      collectFenlei: [], //汇总详情分类详情table
      totalCollectArray: [], //汇总详情全部列表1
      totalRentArray: [], //汇总详情全部列表2
      //领取详情基本信息
      receiveBasiclInfo: {
        // simple_staff: {},
        // department: "",
        // city_name: "",
        // report_time: "",
        // operator: {},
        // screenshot: [],
        // remarks: [],
        // mission_type: "领取",
        // checkList_sf: [],
        // checkList_zf: [],
        // rents: {},
        // collects: {}
      },
      // 领取详情修改
      receiveBasiclInfo_change: {},
      //作废详情基本信息
      cancelBasiclInfo: [],
      // 作废信息修改
      cancelBasiclInfo_change: {},
      // 作废合同新增
      cancelBasiclInfo_add: {
        mission_type: "作废",
        city_code: "",
        report_time: "",
        staff_id: "",
        department_id: "",
        checkList_sf: [],
        checkList_zf: [],
        collects: [],
        rents: [],
        screenshot: [],
        remark: "",
        noDataShow: true
      },
      distributeReceiveList: [{ name: "fdsfs" }], //分配收房合同列表
      distributeRentList: [], //分配租房合同列表
      // 上缴详情
      handinBasiclInfo: {
        simple_staff: "",
        department: "",
        city_name: "",
        report_time: "",
        operator: {},
        receipt: {},
        handover: {},
        key: {},
        address: {},
        remarks_new: "",
        screenshot: [],
        passed: []
      },
      // 上缴确认的id
      handin_id: {
        val: "",
        key: ""
      },
      // 上缴修改
      handinBasiclInfo_change: {
        simple_staff: "",
        department: "",
        city_name: "",
        report_time: "",
        operator: {},
        receipt: {},
        handover: {},
        key: {},
        address: {},
        remarks_new: "",
        screenshot: [],
        passed: [],
        choosed: [],
        file_info: [],
        contract_type: "",
        contract_type_name: "",
        misson_type: "",
        change_id: ""
      },
      // 上缴新增
      handinBasiclInfo_create: {
        misson_type: "上缴",
        city_code: "",
        contract_type: "",
        report_time: "",
        staff_id: [],
        department_id: "",
        remark: "",
        screenshot: [],
        noDataShow: true,
        collects: [],
        rents: [],
        choosed: {},
        address: {},
        receipt: {},
        handover: {},
        key: {}
      },
      // 丢失新增
      loseBasiclInfo_create: {
        mission_type: "丢失",
        city_code: "",
        report_time: "",
        staff_id: "",
        department_id: "",
        checkList_sf: [],
        checkList_zf: [],
        collects: [],
        rents: [],
        screenshot: [],
        remark: "",
        noDataShow: true
      },
      loseBasiclInfo: [], //丢失详情基本信息
      // 丢失信息修改
      loseBasiclInfo_change: {},
      loseSimplereal_name: "", //丢失详情丢失人
      loseSimpleopetator_name: "", //丢失详情操作人
      selectedCity: "", //选择器绑定的城市code
      misssionType: "", //选择器绑定的任务类型
      timePicker: "", //时间选择器绑定的时间1
      modifyName: "", //修改时显示的人名
      modifyDepartment: "", //修改时部门
      operateReceive: [], //操作详情收房
      operateRent: [], //操作详情租房
      modifyRemark: "",
      receiveModifyParam: {},
      contractNumberEditChoosed: 0,
      contractNumberChoosed: 0,
      //片区异动交接单数据
      areaChangeOrder: [],
      // 电子资料数据
      dianziziliao_data: [],
      //采购合同列表数据
      contractList: [],
      // contractManageListTotal: [{ city: "南京" }],
      // 合同编号管理的详情
      numberManageDialogTable: [],
      //合同汇总列表上部分
      contractCollectList: [],
      //合同汇总列表底部
      bottomTable: [],
      //合同编号领取
      contractReceiveList: [],
      contractCancelList: [], //合同编号作废
      contractHandinList: [], //合同编号上缴
      contractLoseList: [], //合同编号丢失
      //汇总详情弹框选项
      //1是分类详情/2是全部详情
      contractGatherChoosed: 1,
      // 1是剩余未缴收房/2是剩余未缴租房
      remainingUnpaidChoosed: 1,
      // 汇总分配的具体数据
      distribute_form: {},
      // 创建任务的收房合同上缴循环数据
      sf_create: [],
      numberManageAdd_form: {
        city_code: "",
        operate_name: this.$storage.get("user_info"),
        operate_time: this.getDate(),
        collect_remain: "", //收的现剩余
        rent_remain: "", //租的现剩余
        collect_amount: "", //数量收
        rent_amount: "" //数量租
      },
      numberManageMerge_form: {
        city_code: "",
        operate_name: this.$storage.get("user_info"),
        operate_time: this.getDate(),
        collect_remain: "", //收的现剩余
        rent_remain: "", //租的现剩余
        collect_amount: "", //数量收
        rent_amount: "", //数量租
        id: ""
      },
      numberManageTotalListRowData: {}, //合同编号管理总合同数的row数据
      // 合同领取上限的列表
      htlqsxList: [],
      // 合同领取上限的搜索数据
      searchData_htlqsx: {},
      // 合同领取上线新增的表单
      numberManageAddS_form: {
        operate_name: this.$storage.get("user_info"),
        operate_time: this.getDate(),
        max_count: "",
        staff_ids: []
      },
      // 片区异动的搜索数据
      searchData_areaChange: {},
      // 合同类型的数据
      contract_type: {
        108: "公司",
        109: "中介",
        110: "个人"
      },
      // 合同类型的列表
      contractTypeList: [],
      // 汇总详情
      hz_detail: {},
      // 合同编号领取添加的表单
      receiveAdd_form: {
        misson_type: "上缴",
        version: "1",
        city_code: "",
        report_time: "",
        staff_id: "",
        department_id: "",
        remark: "",
        screenshot: [],
        collect_amount: "", //领取合同数(收)
        collect_start: "",
        collect_end: "",
        rent_amount: "", //领取合同数(租)
        rent_start: "",
        rent_end: "",
        // 自选的租房合同编号数组
        rent_extra: [
          {
            value: ""
          }
        ],
        // 自选的收房编号数组
        collect_extra: [
          {
            value: ""
          }
        ]
      }
    };
  },
  mounted() {
    this.getAreaChangeOrder();
    this.getApprovalDetail();
    this.getCityList();
    this.getContractTypeList();
  },
  methods: {
    //左边菜单切换
    changeTab(index) {
      this.activeIndex = index;
      // 重置所有分页
      this.resetAllPages();
      switch (index) {
        case 0:
          // 片区异动交接单
          this.getAreaChangeOrder();
          break;
        case 1:
          // 采购合同
          this.getContractList();
          break;
        case 2:
          this.contractNumberChoosed = 0;
          // 合同编号
          this.getContractCollectList();
          this.getBottomTable();
          break;
        case 3:
          // 合同编号管理
          this.contractNumberEditChoosed = 0;
          this.getBottomTable();
          break;
      }
    },
    //合同编号菜单切换
    chooseContartType(index) {
      this.contractNumberChoosed = index;
      this.resetAllPages();
      switch (index) {
        case 0:
          // 汇总
          this.getContractCollectList();
          this.getBottomTable();
          break;
        case 1:
          // 领取
          this.getContractReceiveList();
          break;
        case 2:
          // 作废
          this.getContractCancelList();
          break;
        case 3:
          // 上缴
          this.getContractHandinList();
          break;
        case 4:
          // 丢失
          this.getContractLoseList();
          break;
      }
    },
    //合同编号管理菜单切换
    chooseContartEditType(index) {
      this.contractNumberEditChoosed = index;
      this.resetAllPages();
      switch (index) {
        case 0:
          this.getBottomTable();
          break;
        case 1:
          this.getHtlqsxList();
          break;
      }
    },
    //点击添加按钮处理函数
    add() {
      switch (this.activeIndex) {
        // 采购合同下
        case 1:
          // 添加采购合同显示
          this.addContract_visiable = true;
          break;
        // 合同编号下
        case 2:
          if (this.contractNumberChoosed == 1) {
            // 领取合同创建任务
            this.receiveMission_visible = true;
          } else if (this.contractNumberChoosed == 2) {
            this.cancelMission_visible = true;
          } else if (this.contractNumberChoosed == 3) {
            this.handinMission_visible = true;
          } else if (this.contractNumberChoosed == 4) {
            this.loseMission_visible = true;
          }
          break;
        // 合同编号管理下
        case 3:
          if (this.contractNumberEditChoosed == 1) {
            this.numberManageAddS_visible = true;
          }
          break;
      }
    },
    // 点击高级搜索按钮事件处理
    search() {
      switch (this.activeIndex) {
        case 0:
          // 片区异动交接单时
          this.searchAreaChangeOrder_visiable = true;
          break;
        case 2:
          // 合同编号的时候
          this.searchContractNumber_visiable = true;
          break;
        case 3:
          this.searchContractNumberEdit_visiable = true;
      }
    },
    //获取城市列表
    getCityList() {
      this.$http.get(`${this.url}contract/dict?type[]=city`).then(res => {
        if (res.code === "20000") {
          for (let i = 0; i < res.data.city.length; i++) {
            this.cityList.push(res.data.city[i]);
          }
          // console.log("城市列表", this.cityList);
        }
      });
    },
    //获取合同类型列表
    getContractTypeList() {
      this.$http
        .get(`${this.url}contract/dict?type[]=contract_type`)
        .then(res => {
          if (res.code === "20000") {
            this.contractTypeList = res.data.contract_type;
            console.log("合同类型", this.contractTypeList);
          }
        });
    },
    //获取片区异动交接单列表
    getAreaChangeOrder(searchData) {
      this.areaChangeOrder = [];
      let data;
      switch (arguments.length) {
        // 非高级搜索
        case 0:
          data = this.commonPages;
          break;
        // 高级搜索
        case 1:
          data = Object.assign({}, this.searchPages, searchData);
          break;
      }
      // console.log(data);
      this.$http
        .get(`${this.url}process/process/handover_list`, data)
        .then(res => {
          if (res.code === "20000") {
            // console.log("片区异动列表", res.data);
            switch (arguments.length) {
              case 0:
                this.commonPages.total = res.data.count;
                break;
              case 1:
                this.searchPages.total = res.data.count;
                break;
            }
            this.areaChangeOrder = res.data.data;
          }
          // 如果没数据，初始化分页
          else {
            this.commonPages.total = 0;
            this.commonPages.page = 1;
            this.searchPages.total = 0;
            this.searchPages.page = 1;
          }
        });
    },
    //获取采购合同列表
    getContractList() {
      this.contractList = [];
      let param = {
        page: this.commonPages.page,
        limit: this.commonPages.limit
      };
      this.$http.get(`${this.url}eam/contract`, param).then(res => {
        if (res.code === "20000") {
          this.commonPages.total = res.data.count;
          // console.log("采购合同列表",res.data)
          // 处理数据，主要是为了循环获取所属部门
          for (var i = 0; i < res.data.data.length; i++) {
            let department = "";
            for (var j = 0; j < res.data.data[i].user.org.length; j++) {
              department = department + res.data.data[i].user.org[j].name + "-";
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
            };
            this.contractList.push(obj);
          }
        }
      });
    },
    //获取添加采购合同的参数（mounted调用）
    getApprovalDetail() {
      // 获取采购审批列表
      this.$http.get(`${this.url}eam/storage/process`).then(res => {
        if (res.code == "20000") {
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = {
              // 采购审批id
              id: res.data.data[i].id,
              // 采购审批的标题
              title: res.data.data[i].title
            };
            this.approvalDetail.push(obj);
          }
          // console.log("采购审批的列表", this.approvalDetail);
        }
      });
      // 获取供应商列表的数据
      this.$http.get(`${this.url}eam/category`).then(res => {
        if (res.code == "20000") {
          for (let i = 0; i < res.data.data.length; i++) {
            // type==5是合同的供应商
            if (res.data.data[i].type == 5) {
              let obj = {
                id: res.data.data[i].id,
                name: res.data.data[i].name
              };
              this.supplierDetail.push(obj);
            }
          }
          // console.log("供应商数据列表", this.supplierDetail);
        }
      });
    },
    //添加采购合同
    addContract() {
      if (this.addContract_form.process_id == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择采购申请"
        });
        return;
      }
      if (this.addContract_form.source_id == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择供应商"
        });
        return;
      }
      if (this.addContract_form.start_time == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择签订时间"
        });
        return;
      }
      if (this.addContract_form.user_id == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择签订人"
        });
        return;
      }
      // 根据选择的采购申请获取采购审批标题
      for (let i = 0; i < this.approvalDetail.length; i++) {
        if (this.addContract_form.process_id == this.approvalDetail[i].id) {
          this.addContract_form.title = this.approvalDetail[i].title;
        }
      }
      let data = JSON.parse(JSON.stringify(this.addContract_form));
      data.user_id = data.user_id[0];
      this.$http.post(`${this.url}eam/contract`, data).then(res => {
        switch (res.code) {
          case "20010":
            this.$LjNotify("success", {
              title: "成功",
              message: "添加成功"
            });
            // 更新列表
            this.getContractList();
            // 关闭添加采购合同模态框
            this.addContract_visiable = false;
            // 重置添加表单
            this.addContract_form = {
              process_id: "", //采购的审批id，调接口
              title: "", //采购审批标题，调接口
              source_id: "", //供应商id，调接口
              start_time: "", //签订时间
              end_time: "", //合同结束日期
              user_id: "", //签订人id
              attachment: [] //合同照片
            };
            break;
          default:
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg
            });
            break;
        }
      });
    },
    //获取合同编号汇总上部分列表
    getContractCollectList(searchData) {
      this.contractCollectList = [];
      let data;
      switch (arguments.length) {
        // 非高级搜索
        case 0:
          data = this.commonPages_huizong;
          break;
        // 高级搜索
        case 1:
          data = Object.assign({}, this.searchPages_huizong, searchData);
          break;
      }
      // console.log(data);
      this.$http.get(`${this.url}contract/mission`, data).then(res => {
        if (res.code === "20000") {
          // console.log(res.data)
          switch (arguments.length) {
            case 0:
              this.commonPages_huizong.total = res.data.count;
              break;
            case 1:
              this.searchPages_huizong.total = res.data.count;
              break;
          }
          for (let i = 0; i < res.data.data.length; i++) {
            this.contractCollectList.push(res.data.data[i]);
          }
        }
        // 如果没数据，初始化分页
        else {
          this.commonPages_huizong.total = 0;
          this.commonPages_huizong.page = 1;
          this.searchPages_huizong.total = 0;
          this.searchPages_huizong.page = 1;
        }
      });
    },
    //获取合同编号汇总下部分列表
    getBottomTable() {
      this.bottomTable = [];
      this.$http.get(`${this.url}contract/reserve`).then(res => {
        if (res.code === "20000") {
          console.log(res.data);
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = res.data.data[i];
            for (let j = 0; j < this.cityList.length; j++) {
              if (obj.city_code == this.cityList[j].variable.city_code) {
                obj.city_name = this.cityList[j].dictionary_name;
              }
            }
            this.bottomTable.push(obj);
          }
          // console.log(this.bottomTable)
        }
      });
    },
    //获取合同编号领取列表
    getContractReceiveList() {
      this.contractReceiveList = [];
      let data = this.commonPages;
      this.$http.get(`${this.url}contract/apply`, data).then(res => {
        if (res.code === "20000") {
          this.contractReceiveList = res.data.data;
          this.commonPages.total = res.data.count;
          // console.log(this.contractReceiveList);
        }
      });
    },
    //获取合同编号作废列表
    getContractCancelList() {
      this.contractCancelList = [];
      let data = this.commonPages;
      this.$http.get(`${this.url}contract/invalidate`, data).then(res => {
        if (res.code === "20000") {
          this.contractCancelList = res.data.data;
          this.commonPages.total = res.data.count;
        }
      });
    },
    //获取合同编号上缴列表
    getContractHandinList() {
      this.contractHandinList = [];
      let data = this.commonPages;
      this.$http.get(`${this.url}contract/handin`, data).then(res => {
        if (res.code === "20000") {
          // console.log("上缴列表", res.data.data);
          this.contractHandinList = res.data.data;
          this.commonPages.total = res.data.count;
        }
      });
    },
    //获取合同编号丢失列表
    getContractLoseList() {
      this.contractLoseList = [];
      let data = this.commonPages;
      this.$http.get(`${this.url}contract/loss`, data).then(res => {
        if (res.code === "20000") {
          this.contractLoseList = res.data.data;
          this.commonPages.total = res.data.count;
        }
      });
    },
    //汇总详情
    showCollectDetail(row) {
      this.hz_detail = [];
      this.$http
        .get(`${this.url}contract/mission/${row.staff_id}`)
        .then(res => {
          console.log(res);
          if (res.code === "20000") {
            this.hz_detail = res.data.data;
          }
          this.contractCollect_visible = true;
        });
    },
    //合同编号领取详情
    showReceiveDetail(row) {
      return this.$http.get(`${this.url}contract/apply/${row.id}`).then(res => {
        if (res.code === "20000") {
          this.receiveBasiclInfo = res.data.full;
          this.receiveBasiclInfo.rents = res.data.full.rents;
          this.receiveBasiclInfo.collects = res.data.full.collects;
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              this.receiveBasiclInfo.city_code ==
              this.cityList[j].variable.city_code
            ) {
              this.receiveBasiclInfo.city_name = this.cityList[
                j
              ].dictionary_name;
            }
          }
          this.receiveBasiclInfo.department = res.data.department.name;
          console.log(this.receiveBasiclInfo);
        }
        this.contractReceive_visible = true;
      });
    },
    //作废详情
    showCancelDetail(row) {
      this.$http.get(`${this.url}contract/invalidate/${row.id}`).then(res => {
        if (res.code === "20010") {
          this.cancelBasiclInfo = res.data.full;
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              this.cancelBasiclInfo.city_code ==
              this.cityList[j].variable.city_code
            ) {
              this.cancelBasiclInfo.city_name = this.cityList[
                j
              ].dictionary_name;
            }
          }
          this.cancelBasiclInfo.department = res.data.department.name;
        }
      });
      this.contractCancel_visible = true;
    },
    //上缴的详情
    showHandintDetail(row) {
      this.contractHandin_visible = true;
      this.$http.get(`${this.url}contract/handin/${row.id}`).then(res => {
        if (res.code === "20010") {
          // console.log("上缴详情", res);
          this.handinBasiclInfo = res.data.full;
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              this.handinBasiclInfo.city_code ==
              this.cityList[j].variable.city_code
            ) {
              this.handinBasiclInfo.city_name = this.cityList[
                j
              ].dictionary_name;
            }
          }
          // 写部门名
          this.handinBasiclInfo.department = res.data.department.name;
          // 写具体的上缴情况
          this.handinBasiclInfo.key = res.data.key;
          this.handinBasiclInfo.handover = res.data.handover;
          this.handinBasiclInfo.receipt = res.data.receipt;
          this.handinBasiclInfo.address = res.data.address;
          this.handinBasiclInfo.screenshot = res.data.full.screenshot;
          this.handinBasiclInfo.passed = res.data.passed;
          // 如果有备注，就将备注的content赋给remarks_new
          if (this.handinBasiclInfo.remarks.length > 0) {
            this.handinBasiclInfo.remarks_new = this.handinBasiclInfo.remarks;
            [0].content;
          }
          // console.log(this.handinBasiclInfo);
        }
      });
    },
    //丢失详情
    showLoseDetail(row) {
      this.contractLose_visible = true;
      this.$http.get(`${this.url}contract/loss/${row.id}`).then(res => {
        if (res.code === "20010") {
          this.loseBasiclInfo = res.data.full;
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              this.loseBasiclInfo.city_code ==
              this.cityList[j].variable.city_code
            ) {
              this.loseBasiclInfo.city_name = this.cityList[j].dictionary_name;
            }
          }
          // this.loseSimplereal_name = res.data.full.simple_staff.real_name;
          // this.loseSimpleopetator_name = res.data.full.operator
          //   ? res.data.full.operator.real_name
          //   : "";
          this.loseBasiclInfo.department = res.data.department.name;
        }
      });
    },
    //汇总分配
    distribute(row) {
      this.$http.get(`${this.url}contract/staff/${row.staff_id}`).then(res => {
        let obj = this.distribute_form;
        if (res.code === "20000") {
          // 写收房合同
          this.$set(obj, "collects", res.data.collect);
          // 写收租房合同
          this.$set(obj, "rents", res.data.rents);
          // 写选择的收/租房合同数组
          this.$set(obj, "checkList_sf", []);
          this.$set(obj, "checkList_zf", []);
          // 写名字
          this.$set(obj, "simple_staff", row.simple_staff);
          // 初始化分配人id
          this.$set(obj, "fp_id", "");
          this.distribute_visible = true;
        }
        if (res.code === "20001") {
          this.$LjNotify("error", {
            title: "失败",
            message: res.msg
          });
        }
      });
    },
    // 汇总分配确认
    distribute_submit() {
      console.log(this.distribute_form);
      let obj = this.distribute_form;
      if (obj.fp_id === "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择分配人"
        });
        return;
      }
      // 遍历收租房选择数组,取得key
      let candidate = [];
      obj.checkList_sf.forEach(item => {
        for (let key in obj.collects) {
          if (obj.collects[key] == item) {
            candidate.push(key);
          }
        }
      });
      obj.checkList_zf.forEach(item => {
        for (let key in obj.rents) {
          if (obj.rents[key] == item) {
            candidate.push(key);
          }
        }
      });
      let data = {
        candidate: candidate
      };
      this.$http
        .post(`${this.url}/contract/allocate/${obj.fp_id}`, data)
        .then(res => {
          if (res.code === "20010") {
            this.$LjNotify("success", {
              title: "成功",
              message: res.msg
            });
          } else {
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg
            });
          }
        });
    },
    contractGatherF() {
      this.contractGatherChoosed = 1;
    },
    contractGatherS() {
      this.contractGatherChoosed = 2;
    },
    remainingUnpaidChooseF() {
      this.remainingUnpaidChoosed = 1;
    },
    remainingUnpaidChooseS() {
      this.remainingUnpaidChoosed = 2;
    },
    // 合同编号领取修改详情
    modifyReceive(row) {
      let obj = this.receiveBasiclInfo_change;
      // 先调详情
      this.$http.get(`${this.url}contract/apply/${row.id}`).then(res => {
        if (res.code === "20000") {
          console.log(res);
          // 写任务类型
          this.$set(obj, "mission_type", "领取");
          // 写城市名
          for (let j = 0; j < this.cityList.length; j++) {
            if (res.data.city_code == this.cityList[j].variable.city_code) {
              this.$set(obj, "city_name", this.cityList[j].dictionary_name);
            }
          }
          // 写城市id
          this.$set(obj, "city_code", res.data.city_code);
          // 写列表的id
          this.$set(obj, "row_id", row.id);
          // 写日期
          this.$set(obj, "report_time", res.data.full.report_time);
          // 写领用人
          this.$set(obj, "simple_staff", res.data.full.simple_staff);
          // 写部门
          this.$set(obj, "department", res.data.department.name);
          this.$set(obj, "department_id", res.data.department.id);
          // 写收房合同
          this.$set(obj, "collects", res.data.full.collects);
          // 写收租房合同
          this.$set(obj, "rents", res.data.full.rents);
          // 写选择的收/租房合同数组
          this.$set(obj, "checkList_sf", []);
          this.$set(obj, "checkList_zf", []);
          // 写备注
          try {
            this.$set(obj, "remarks", res.data.full.remarks[0].content);
          } catch (err) {}
          // 写上传的截图
          this.$set(obj, "screenshot", []);
        }
        this.receiveModify_visible = true;
      });
    },
    // 合同编号领取修改详情确定
    modifyReceive_submit() {
      let obj = this.receiveBasiclInfo_change;
      // 遍历收租房选择数组,取得key
      let candidate = [];
      obj.checkList_sf.forEach(item => {
        for (let key in obj.collects) {
          if (obj.collects[key] == item) {
            candidate.push(key);
          }
        }
      });
      obj.checkList_zf.forEach(item => {
        for (let key in obj.rents) {
          if (obj.rents[key] == item) {
            candidate.push(key);
          }
        }
      });
      let data = {
        city_code: obj.city_code,
        department_id: obj.department_id,
        remark: obj.remarks,
        report_time: obj.report_time,
        screenshot: obj.screenshot,
        staff_id: obj.simple_staff.id,
        candidate: candidate
      };
      this.$http
        .put(`${this.url}contract/apply/${obj.row_id}`, data)
        .then(res => {
          if (res.code === "20010") {
            this.$LjNotify("success", {
              title: "成功",
              message: "修改成功"
            });
            this.receiveModify_visible = false;
          } else {
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg
            });
          }
        });
    },
    // 合同编号作废修改详情
    modifyCancel(row) {
      let obj = this.cancelBasiclInfo_change;
      // 先调详情
      this.$http.get(`${this.url}contract/invalidate/${row.id}`).then(res => {
        if (res.code === "20010") {
          console.log(res);
          // 写任务类型
          this.$set(obj, "mission_type", "领取");
          // 写城市名
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              res.data.full.city_code == this.cityList[j].variable.city_code
            ) {
              this.$set(obj, "city_name", this.cityList[j].dictionary_name);
            }
          }
          // 写城市id
          this.$set(obj, "city_code", res.data.full.city_code);
          // 写列表的id
          this.$set(obj, "row_id", row.id);
          // 写日期
          this.$set(obj, "report_time", res.data.full.report_time);
          // 写领用人
          this.$set(obj, "simple_staff", res.data.full.simple_staff);
          // 写部门
          this.$set(obj, "department", res.data.department.name);
          this.$set(obj, "department_id", res.data.department.id);
          // 写收房合同
          this.$set(obj, "collects", res.data.full.collects);
          // 写收租房合同
          this.$set(obj, "rents", res.data.full.rents);
          // 写选择的收/租房合同数组
          this.$set(obj, "checkList_sf", []);
          this.$set(obj, "checkList_zf", []);
          // 写备注
          try {
            this.$set(obj, "remarks", res.data.full.remarks[0].content);
          } catch (err) {}
          // 写上传的截图
          this.$set(obj, "screenshot", []);
        }
        this.cancelModify_visible = true;
      });
    },
    // 合同编号作废修改详情确认
    cancelModify_submit() {
      let obj = this.cancelBasiclInfo_change;
      // 遍历收租房选择数组,取得key
      let candidate = [];
      obj.checkList_sf.forEach(item => {
        for (let key in obj.collects) {
          if (obj.collects[key] == item) {
            candidate.push(key);
          }
        }
      });
      obj.checkList_zf.forEach(item => {
        for (let key in obj.rents) {
          if (obj.rents[key] == item) {
            candidate.push(key);
          }
        }
      });
      let data = {
        city_code: obj.city_code,
        department_id: obj.department_id,
        remark: obj.remarks,
        report_time: obj.report_time,
        screenshot: obj.screenshot,
        staff_id: obj.simple_staff.id,
        candidate: candidate
      };
      this.$http
        .put(`${this.url}contract/invalidate/${obj.row_id}`, data)
        .then(res => {
          if (res.code === "20000") {
            this.$LjNotify("success", {
              title: "成功",
              message: "修改成功"
            });
            this.cancelModify_visible = false;
          } else {
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg
            });
          }
        });
    },
    // 上缴修改
    modifyHandin(row) {
      this.haninModify_visible = true;
      this.$http.get(`${this.url}contract/handin/${row.id}`).then(res => {
        if (res.code === "20010") {
          // console.log("上缴详情", res);
          this.handinBasiclInfo_change = res.data.full;
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              this.handinBasiclInfo_change.city_code ==
              this.cityList[j].variable.city_code
            ) {
              this.handinBasiclInfo_change.city_name = this.cityList[
                j
              ].dictionary_name;
            }
          }
          // 写id
          this.handinBasiclInfo_change.change_id = row.id;
          // 写部门名
          this.handinBasiclInfo_change.department = res.data.department.name;
          // 写具体的上缴情况
          this.$set(this.handinBasiclInfo_change, "key", res.data.key);
          this.$set(
            this.handinBasiclInfo_change,
            "handover",
            res.data.handover
          );
          this.$set(this.handinBasiclInfo_change, "receipt", res.data.receipt);
          this.$set(this.handinBasiclInfo_change, "address", res.data.address);
          this.handinBasiclInfo_change.screenshot = res.data.full.screenshot;
          this.handinBasiclInfo_change.passed = res.data.passed;
          this.handinBasiclInfo_change.misson_type = "上缴";
          // 获取对应的合同类型名称
          this.handinBasiclInfo_change.contract_type_name = this.contract_type[
            res.data.contract_type
          ];
          this.handinBasiclInfo_change.contract_type = res.data.contract_type;
          // 如果有备注，就将备注的content赋给remarks_new
          if (this.handinBasiclInfo_change.remarks.length > 0) {
            this.handinBasiclInfo_change.remarks_new = this.handinBasiclInfo_change.remarks[0].content;
          }
          // 复制一个对象，里面存收/租房的key，用于选择时候用
          this.$set(
            this.handinBasiclInfo_change,
            "choosed",
            res.data.contractNumber
          );
          let keyArr = Object.keys(this.handinBasiclInfo_change.choosed);
          keyArr.forEach(item => {
            this.handinBasiclInfo_change.choosed[item] = false;
          });
          // console.log(this.handinBasiclInfo_change);
        }
      });
    },
    // 上缴确定
    modifyHandin_submit() {
      // console.log(this.handinBasiclInfo_change);
      let obj = this.handinBasiclInfo_change;
      let candidate = {};
      for (let key in obj.choosed) {
        if (obj.choosed[key]) {
          let num = 0;
          // 只选了交接单
          if (obj.handover[key] && !obj.receipt[key] && !obj.key[key]) {
            num = 1;
          }
          if (!obj.handover[key] && obj.receipt[key] && !obj.key[key]) {
            num = 2;
          }
          if (!obj.handover[key] && !obj.receipt[key] && obj.key[key]) {
            num = 3;
          }
          if (obj.handover[key] && obj.receipt[key] && !obj.key[key]) {
            num = 4;
          }
          if (obj.handover[key] && !obj.receipt[key] && obj.key[key]) {
            num = 5;
          }
          if (!obj.handover[key] && obj.receipt[key] && obj.key[key]) {
            num = 6;
          }
          if (obj.handover[key] && obj.receipt[key] && obj.key[key]) {
            num = 7;
          }
          candidate = Object.assign(
            {},
            {
              [key]: {
                address: obj.address[key],
                proof: num
              }
            }
          );
        }
      }
      let data = {
        id: obj.change_id,
        city_code: obj.city_code,
        report_time: obj.report_time,
        staff_id: obj.staff_id,
        department_id: obj.department_id,
        remark: obj.remarks_new,
        screenshot: obj.screenshot,
        candidate: candidate,
        contract_type: obj.contract_type
      };
      this.$http
        .put(`${this.url}contract/handin/${data.id}`, data)
        .then(res => {
          if (res.code === "20010") {
            this.haninModify_visible = false;
            this.$LjNotify("success", {
              title: "成功",
              message: "修改成功"
            });
          }
        });
    },
    // 上缴创建确定
    handinMission_submit() {
      let obj = this.handinBasiclInfo_create;
      if (!obj.city_code) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择城市"
        });
        return;
      }
      if (!obj.report_time) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择时间"
        });
        return;
      }
      if (obj.staff_id.length == 0) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择报备人"
        });
        return;
      }
      if (obj.department_id.length == 0) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择部门"
        });
        return;
      }
      if (!obj.contract_type) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择合同类型"
        });
        return;
      }
      let candidate = {};
      for (let key in obj.choosed) {
        if (obj.choosed[key]) {
          let num = 0;
          // 只选了交接单
          if (obj.handover[key] && !obj.receipt[key] && !obj.key[key]) {
            num = 1;
          }
          if (!obj.handover[key] && obj.receipt[key] && !obj.key[key]) {
            num = 2;
          }
          if (!obj.handover[key] && !obj.receipt[key] && obj.key[key]) {
            num = 3;
          }
          if (obj.handover[key] && obj.receipt[key] && !obj.key[key]) {
            num = 4;
          }
          if (obj.handover[key] && !obj.receipt[key] && obj.key[key]) {
            num = 5;
          }
          if (!obj.handover[key] && obj.receipt[key] && obj.key[key]) {
            num = 6;
          }
          if (obj.handover[key] && obj.receipt[key] && obj.key[key]) {
            num = 7;
          }
          candidate = Object.assign(
            {},
            {
              [key]: {
                address: obj.address[key],
                proof: num
              }
            }
          );
        }
      }
      let data = {
        city_code: obj.city_code,
        report_time: obj.report_time,
        staff_id: obj.staff_id[0],
        department_id: obj.department_id[0],
        remark: obj.remark,
        screenshot: obj.screenshot,
        candidate: candidate,
        contract_type: obj.contract_type
      };
      // console.log(data);
      this.$http.post(`${this.url}contract/handin`, data).then(res => {
        if (res.code === "20010") {
          this.$LjNotify("success", {
            title: "成功",
            message: "新增成功"
          });
          this.handinMission_visible = false;
          this.getContractHandinList();
        } else {
          this.$LjNotify("error", {
            title: "失败",
            message: res.msg
          });
        }
      });
    },
    // 丢失创建确认
    loseMission_submit() {
      let obj = this.loseBasiclInfo_create;
      // 遍历收租房选择数组,取得key
      let candidate = [];
      obj.checkList_sf.forEach(item => {
        for (let key in obj.collects) {
          if (obj.collects[key] == item) {
            candidate.push(key);
          }
        }
      });
      obj.checkList_zf.forEach(item => {
        for (let key in obj.rents) {
          if (obj.rents[key] == item) {
            candidate.push(key);
          }
        }
      });
      let data = {
        city_code: obj.city_code,
        department_id: obj.department_id[0],
        remark: obj.remark,
        report_time: obj.report_time,
        screenshot: obj.screenshot,
        staff_id: obj.staff_id[0],
        candidate: candidate
      };
      // console.log(data)
      this.$http.post(`${this.url}contract/loss`, data).then(res => {
        if (res.code === "20010") {
          this.$LjNotify("success", {
            title: "成功",
            message: "新增成功"
          });
          this.loseMission_visible = false;
        } else {
          this.$LjNotify("error", {
            title: "失败",
            message: res.msg
          });
        }
      });
    },
    // 合同编号丢失修改详情
    modifyLose(row) {
      let obj = this.loseBasiclInfo_change;
      // 先调详情
      this.$http.get(`${this.url}contract/loss/${row.id}`).then(res => {
        if (res.code === "20010") {
          console.log(res);
          // 写任务类型
          this.$set(obj, "mission_type", "领取");
          // 写城市名
          for (let j = 0; j < this.cityList.length; j++) {
            if (
              res.data.full.city_code == this.cityList[j].variable.city_code
            ) {
              this.$set(obj, "city_name", this.cityList[j].dictionary_name);
            }
          }
          // 写城市id
          this.$set(obj, "city_code", res.data.full.city_code);
          // 写列表的id
          this.$set(obj, "row_id", row.id);
          // 写日期
          this.$set(obj, "report_time", res.data.full.report_time);
          // 写领用人
          this.$set(obj, "simple_staff", res.data.full.simple_staff);
          // 写部门
          this.$set(obj, "department", res.data.department.name);
          this.$set(obj, "department_id", res.data.department.id);
          // 写收房合同
          this.$set(obj, "collects", res.data.full.collects);
          // 写收租房合同
          this.$set(obj, "rents", res.data.full.rents);
          // 写选择的收/租房合同数组
          this.$set(obj, "checkList_sf", []);
          this.$set(obj, "checkList_zf", []);
          // 写备注
          try {
            this.$set(obj, "remarks", res.data.full.remarks[0].content);
          } catch (err) {}
          // 写上传的截图
          this.$set(obj, "screenshot", []);
        }
        this.loseModify_visible = true;
      });
    },
    // 合同编号丢失修改详情确认
    loseModify_submit() {
      let obj = this.loseBasiclInfo_change;
      // 遍历收租房选择数组,取得key
      let candidate = [];
      obj.checkList_sf.forEach(item => {
        for (let key in obj.collects) {
          if (obj.collects[key] == item) {
            candidate.push(key);
          }
        }
      });
      obj.checkList_zf.forEach(item => {
        for (let key in obj.rents) {
          if (obj.rents[key] == item) {
            candidate.push(key);
          }
        }
      });
      let data = {
        city_code: obj.city_code,
        department_id: obj.department_id,
        remark: obj.remarks,
        report_time: obj.report_time,
        screenshot: obj.screenshot,
        staff_id: obj.simple_staff.id,
        candidate: candidate
      };
      this.$http
        .put(`${this.url}contract/loss/${obj.row_id}`, data)
        .then(res => {
          if (res.code === "20030") {
            this.$LjNotify("success", {
              title: "成功",
              message: "修改成功"
            });
            this.loseModify_visible = false;
          } else {
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg
            });
          }
        });
    },
    // 合同编号领取删除
    deleteReceive(row) {
      this.$http
        .post(`${this.url}contract/apply/delete/${row.id}`)
        .then(res => {
          if (res.code == 20010) {
            this.$LjNotify("success", {
              title: "成功",
              message: "删除成功"
            });
            this.getContractReceiveList();
          } else {
            this.$LjNotify("error", {
              title: "失败",
              message: res.msg
            });
          }
        });
    },
    // 合同编号领取添加
    receiveAdd_submit() {
      // console.log(this.receiveAdd_form);
      let obj = this.receiveAdd_form;
      let collect_extra = obj.collect_extra.map(item => {
        return item.value;
      });
      let rent_extra = obj.rent_extra.map(item => {
        return item.value;
      });
      let data = {
        city_code: obj.city_code,
        report_time: obj.report_time,
        staff_id: obj.staff_id[0],
        collect_amount: obj.collect_amount,
        collect_start: obj.collect_start,
        collect_end: obj.collect_end,
        collect_extra: collect_extra,
        department_id: obj.department_id[0],
        version: obj.version,
        screenshot: obj.screenshot,
        rent_start: obj.rent_start,
        rent_end: obj.rent_end,
        rent_amount: obj.rent_amount,
        rent_extra: rent_extra,
        remark: obj.remark
      };
      console.log(data);
      this.$http.post(`${this.url}contract/apply`, data).then(res => {
        if (res.code === "20010") {
          this.$LjNotify("success", {
            title: "成功",
            message: res.msg
          });
          this.receiveMission_visible = false;
          this.getContractReceiveList();
        } else {
          this.$LjNotify("error", {
            title: "失败",
            message: res.msg
          });
        }
      });
    },
    // 根据城市和版本号获取合同编号
    async getReceiveAddInfo(obj) {
      if (obj.city_code != "") {
        await this.$http
          .get(
            `${this.url}contract/max/${obj.city_code}?version=${obj.version}`
          )
          .then(res => {
            if (res.code === "20000") {
              obj.collect_start = res.data.collect;
              obj.rent_start = res.data.rent;
            }
          });
        this.getReceiveAddInfo_end(obj);
      }
    },
    // 根据城市和版本号获取合同的结束编号
    getReceiveAddInfo_end(obj) {
      if (obj.collect_start != "") {
        this.$http
          .get(`${this.url}contract/end?start=${obj.collect_start}&count=`)
          .then(res => {
            obj.collect_end = res.data;
          });
      }
      if (obj.rent_start != "") {
        this.$http
          .get(`${this.url}contract/end?start=${obj.rent_start}&count=`)
          .then(res => {
            obj.rent_end = res.data;
          });
      }
    },
    // 新增作废合同
    cancleAdd_submit() {
      let obj = this.cancelBasiclInfo_add;
      // 遍历收租房选择数组,取得key
      let candidate = [];
      obj.checkList_sf.forEach(item => {
        for (let key in obj.collects) {
          if (obj.collects[key] == item) {
            candidate.push(key);
          }
        }
      });
      obj.checkList_zf.forEach(item => {
        for (let key in obj.rents) {
          if (obj.rents[key] == item) {
            candidate.push(key);
          }
        }
      });
      let data = {
        city_code: obj.city_code,
        department_id: obj.department_id[0],
        remark: obj.remark,
        report_time: obj.report_time,
        screenshot: obj.screenshot,
        staff_id: obj.staff_id[0],
        candidate: candidate
      };
      // console.log(data)
      this.$http.post(`${this.url}contract/invalidate`, data).then(res => {
        if (res.code === "20000") {
          this.$LjNotify("success", {
            title: "成功",
            message: "新增成功"
          });
          this.cancelMission_visible = false;
        } else {
          this.$LjNotify("error", {
            title: "失败",
            message: res.msg
          });
        }
      });
    },
    // 获取电子资料
    getPhotoList(row) {
      // console.log("获取row的电子资料", row);
      // 采购合同的电子信息
      if ("electronicData" in row) {
        let len = row.electronicData.length;
        if (len > 0) {
          this.imgData = row.electronicData;
          this.imgSlider_visiable = true;
        } else if (len === 0) {
          this.$LjNotify("error", {
            title: "失败",
            message: "暂无图片"
          });
        }
      }
      // 片区异动的电子信息
      if ("handover_info" in row) {
        try {
          let url = row.handover_info.view_url;
          window.open(url);
        } catch (err) {
          this.$LjNotify("error", {
            title: "失败",
            message: "暂无图片"
          });
        }
      }
    },
    // 获取非表格中的电子信息
    getPhoto(screenshot) {
      if (screenshot.length > 0) {
        let idArr = [];
        screenshot.forEach(item => {
          idArr.push(item.id);
        });
        this.imgData = idArr;
        this.imgSlider_visiable = true;
      } else {
        this.$LjNotify("error", {
          title: "失败",
          message: "暂无图片"
        });
      }
    },
    // 片区异动交接单的开始高级搜索事件
    closeSearchAreaChangeOrder(val) {
      this.searchAreaChangeOrder_visiable = false;
      if (typeof val === "object") {
        let searchData = JSON.parse(JSON.stringify(val));
        // 如果筛选了部门
        if ("org_id" in searchData) {
          searchData.org_id = searchData.org_id[0];
        }
        // 如果筛选了类型
        if ("type" in searchData) {
          if (searchData.type == 1) {
            searchData.type = "personal_change";
          } else if (searchData.type == 2) {
            searchData.type = "dimission";
          }
        }
        // console.log("片区异动高级搜索", searchData);
        this.searchData_areaChange = searchData;
        if (Object.keys(searchData).length > 0) {
          // 有数据就执行高级搜索
          this.isHighSearch = true;
          this.getAreaChangeOrder(searchData);
        } else {
          this.isHighSearch = false;
          this.getAreaChangeOrder();
        }
      }
    },
    // 汇总的高级搜索
    closeSearchContractNumber(val) {
      this.searchContractNumber_visiable = false;
      if (typeof val === "object") {
        let searchData = JSON.parse(JSON.stringify(val));
        // 如果选择了时间范围,对时间格式进行调整
        if ("start" in searchData) {
          searchData.end = searchData.start[1];
          searchData.start = searchData.start[0];
        }
        // 如果筛选了人员
        if ("staff_id" in searchData) {
          searchData.staff_id = searchData.staff_id[0];
        }
        // 如果筛选了部门
        if ("department_id" in searchData) {
          searchData.department_id = searchData.department_id[0];
        }
        this.searchData_huizong = searchData;
        if (Object.keys(searchData).length > 0) {
          // 有数据就执行高级搜索
          this.isHighSearch_huizong = true;
          this.getContractCollectList(searchData);
        } else {
          this.isHighSearch_huizong = false;
          this.getContractCollectList();
        }
      }
    },
    closeSearchContractNumberEdit(val) {
      this.searchContractNumberEdit_visiable = false;
      if (typeof val === "object") {
        let searchData = JSON.parse(JSON.stringify(val));
        // 如果筛选了部门
        // if ("department_id" in searchData) {
        //   searchData.department_id = searchData.department_id[0];
        // }
        // 如果筛选了人员
        if ("follow_id" in searchData) {
          searchData.follow_id = searchData.follow_id[0];
        }
        this.searchData_htlqsx = searchData;
        if (Object.keys(searchData).length > 0) {
          // 有数据就执行高级搜索
          this.isHighSearch = true;
          this.getHtlqsxList(searchData);
        } else {
          this.isHighSearch = false;
          this.getHtlqsxList();
        }
      }
    },
    // 普通分页事件
    changePages_common(val) {
      this.commonPages.page = val;
      if (this.activeIndex === 0) {
        // 片区异动交接单分页
        this.getAreaChangeOrder();
        return;
      }
      if (this.activeIndex === 1) {
        // 采购合同的分页
        this.getContractList();
        return;
      }
      if (this.activeIndex === 2 && this.contractNumberChoosed === 1) {
        // 合同编号的领取
        this.getContractReceiveList();
        return;
      }
      if (this.activeIndex === 2 && this.contractNumberChoosed === 2) {
        // 合同编号的作废
        this.getContractCancelList();
        return;
      }
      if (this.activeIndex === 2 && this.contractNumberChoosed === 3) {
        // 合同编号的上缴
        this.getContractHandinList();
        return;
      }
      if (this.activeIndex === 2 && this.contractNumberChoosed === 4) {
        // 合同编号的丢失
        this.getContractLoseList();
        return;
      }
      if (this.activeIndex === 3 && this.contractNumberEditChoosed === 1) {
        // 总合同领取上限
        this.getHtlqsxList();
        return;
      }
    },
    // 搜索分页事件
    changePages_search(val) {
      this.searchPages.page = val;
      if (this.activeIndex === 0) {
        // 片区异动交接单分页
        this.getAreaChangeOrder(this.searchData_areaChange);
        return;
      }
      if (this.activeIndex === 3 && this.contractNumberEditChoosed === 1) {
        // 总合同领取上限
        this.getHtlqsxList(this.searchData_htlqsx);
        return;
      }
    },
    // 汇总的普通分页事件
    changePages_huizong_common(val) {
      this.commonPages_huizong.page = val;
      this.getContractCollectList();
    },
    // 汇总的搜索分页事件
    changePages_huizong_search(val) {
      this.searchPages_huizong.page = val;
      this.getContractCollectList(this.searchData_huizong);
    },
    // 合同总数详情的分页事件
    changePages_ht_zong(val) {
      this.pages_ht_zong.page = val;
      this.numberManageTotal_fun();
    },
    // 删除租房合同编号（自选）事件
    reduceRent_extra(index) {
      let len = this.receiveAdd_form.rent_extra.length;
      if (len > 0 && len != 1) {
        this.receiveAdd_form.rent_extra.splice(index, 1);
      }
    },
    // 删除收房合同编号（自选）事件
    reduceCollect_extra(index) {
      let len = this.receiveAdd_form.collect_extra.length;
      if (len > 0 && len != 1) {
        this.receiveAdd_form.collect_extra.splice(index, 1);
      }
    },
    // 上缴合同详情审核
    handinConfirm_fun(val, key) {
      this.handinConfirm_visible = true;
      this.handin_id.val = val;
      this.handin_id.key = key;
    },
    // 上缴合同审核确定
    handinConfirm_sh() {
      this.$http
        .put(`${this.url}contract/handin/pass/${this.handin_id.key}`)
        .then(res => {
          if (res.code == "20010") {
            this.handinConfirm_visible = false;
            this.$LjNotify("success", {
              title: "成功",
              message: res.msg
            });
            // 更改本地数据
            this.$set(
              this.handinBasiclInfo.passed,
              this.handin_id.key,
              this.getDataTimeNow()
            );
          }
        });
    },
    // 重置所有分页
    resetAllPages() {
      // 非搜索分页
      this.commonPages = {
        limit: 10,
        page: 1,
        total: 0
      };
      // 搜索分页
      this.searchPages = {
        limit: 10,
        page: 1,
        total: 0
      };
      // 汇总非搜索分页
      this.commonPages_huizong = {
        limit: 10,
        page: 1,
        total: 0
      };
      // 汇总搜索分页
      this.searchPages_huizong = {
        limit: 10,
        page: 1,
        total: 0
      };
    },
    // 合同编号管理/合同总数详情
    numberManageTotal_fun(row) {
      this.numberManageTotal_visible = true;
      this.numberManageTotalListRowData = row;
      this.getNumberManageTotalList();
    },
    // 获取合同总数详情列表
    getNumberManageTotalList() {
      this.numberManageDialogTable = [];
      this.$http
        .get(
          `${this.url}contract/reserve/detail/${this.numberManageTotalListRowData.city_code}`,
          this.pages_ht_zong
        )
        .then(res => {
          if (res.code === "20000") {
            for (let i = 0; i < res.data.data.length; i++) {
              let obj = res.data.data[i];
              for (let j = 0; j < this.cityList.length; j++) {
                if (obj.city_code == this.cityList[j].variable.city_code) {
                  obj.city_name = this.cityList[j].dictionary_name;
                }
              }
              this.numberManageDialogTable.push(obj);
            }
            // console.log(this.numberManageDialogTable)
            this.pages_ht_zong.total = res.data.count;
          }
        });
    },
    // 合同编号管理/合同总数详情/新增
    numberManageAddF_fun() {
      if (this.numberManageAdd_form.collect_amount == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请输入数量（收）"
        });
        return;
      }
      if (this.numberManageAdd_form.rent_amount == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请输入数量（租）"
        });
        return;
      }
      this.$http
        .post(`${this.url}contract/reserve`, this.numberManageAdd_form)
        .then(res => {
          if (res.code === "20010") {
            if (res.data) {
              this.$LjNotify("success", {
                title: "成功",
                message: "新增成功"
              });
              this.numberManageAddF_visible = false;
              this.numberManageAdd_form.city_code = "";
              this.numberManageAdd_form.collect_remain = "";
              this.numberManageAdd_form.rent_remain = "";
              this.numberManageAdd_form.rent_amount = "";
              this.getNumberManageTotalList();
            }
          }
        });
    },
    // 合同编号管理/合同总数详情/修改
    numberManageMergeF_fun() {
      if (this.numberManageMerge_form.collect_amount == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请输入数量（收）"
        });
        return;
      }
      if (this.numberManageMerge_form.rent_amount == "") {
        this.$LjNotify("error", {
          title: "失败",
          message: "请输入数量（租）"
        });
        return;
      }
      this.$http
        .put(`${this.url}contract/reserve/${this.numberManageMerge_form.id}`, {
          collect_amount: this.numberManageMerge_form.collect_amount,
          rent_amount: this.numberManageMerge_form.rent_amount
        })
        .then(res => {
          if (res.code === "20030") {
            if (res.data) {
              this.$LjNotify("success", {
                title: "成功",
                message: "修改成功"
              });
              this.numberManageModify_visible = false;
              this.numberManageMerge_form.city_code = "";
              this.numberManageMerge_form.collect_remain = "";
              this.numberManageMerge_form.rent_remain = "";
              this.numberManageMerge_form.collect_amount = "";
              this.numberManageMerge_form.rent_amount = "";
              this.numberManageMerge_form.id = "";
              this.getNumberManageTotalList();
            }
          }
        });
    },
    // 获取城市总合同数的现在剩余合同书
    remainder_ht() {
      this.$http
        .get(
          `${this.url}contract/reserve/remain/${this.numberManageAdd_form.city_code}`
        )
        .then(res => {
          if (res.code === "20000") {
            this.numberManageAdd_form.collect_remain = res.data.collect_remain;
            this.numberManageAdd_form.rent_remain = res.data.rent_remain;
          }
        });
    },
    // 合同总数的修改
    openNumberManageModify(row) {
      this.numberManageModify_visible = true;
      this.numberManageMerge_form.city_code = row.city_code;
      this.numberManageMerge_form.collect_amount = row.collect_amount;
      this.numberManageMerge_form.rent_amount = row.rent_amount;
      this.numberManageMerge_form.collect_remain = row.collect_remain;
      this.numberManageMerge_form.rent_remain = row.rent_remain;
      this.numberManageMerge_form.id = row.id;
    },
    // 获取当前日期
    getDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m < 10 ? (m = "0" + m) : (m = m);
      let d = date.getDate();
      d < 10 ? (d = "0" + d) : (d = d);
      return y.toString() + "-" + m.toString() + "-" + d.toString();
    },
    // 获取当前日期时间
    getDataTimeNow() {
      let nowstr = new Date();
      let datenow =
        nowstr.getFullYear() +
        "-" +
        (nowstr.getMonth() + 1 < 10 ? "0" : "") +
        (nowstr.getMonth() + 1) +
        "-" +
        (nowstr.getDate() < 10 ? "0" : "") +
        nowstr.getDate() +
        " " +
        (nowstr.getHours() < 10 ? "0" : "") +
        nowstr.getHours() +
        ":" +
        (nowstr.getMinutes() < 10 ? "0" : "") +
        nowstr.getMinutes() +
        ":" +
        (nowstr.getSeconds() < 10 ? "0" : "") +
        nowstr.getSeconds();
      return datenow;
    },
    // 获取总合同领取上线的列表
    getHtlqsxList(searchData) {
      this.htlqsxList = [];
      let data;
      switch (arguments.length) {
        // 非高级搜索
        case 0:
          data = this.commonPages;
          break;
        // 高级搜索
        case 1:
          data = Object.assign({}, this.searchPages, searchData);
          break;
      }
      // console.log(data);
      this.$http.get(`${this.url}contract/policy`, data).then(res => {
        if (res.code === "20000") {
          console.log(res.data);
          switch (arguments.length) {
            case 0:
              this.commonPages.total = res.data.count;
              break;
            case 1:
              this.searchPages.total = res.data.count;
              break;
          }
          this.htlqsxList = res.data.data;
        }
        // 如果没数据，初始化分页
        // else {
        //   this.commonPages.total = 0;
        //   this.commonPages.page = 1;
        //   this.searchPages.total = 0;
        //   this.searchPages.page = 1;
        // }
      });
    },
    // 新增合同领取上限
    numberManageAddS_fun() {
      let data = {
        staff_ids: this.numberManageAddS_form.staff_ids,
        max_count: parseInt(this.numberManageAddS_form.max_count)
      };
      if (data.staff_ids.length == 0) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请选择人员"
        });
        return;
      }
      if (
        typeof data.max_count != "number" ||
        data.max_count.toString() === "NaN"
      ) {
        this.$LjNotify("error", {
          title: "失败",
          message: "请输入正确的上限"
        });
        return;
      }
      this.$http.post(`${this.url}contract/policy`, data).then(res => {
        if (res.code === "20010") {
          if (res.data) {
            this.$LjNotify("success", {
              title: "成功",
              message: "新增成功"
            });
            this.numberManageAddS_visible = false;
            this.getHtlqsxList();
            // 清表单
            this.numberManageAddS_form.max_count = "";
            this.numberManageAddS_form.staff_ids = "";
          }
        }
      });
    }
  },
  watch: {
    // 上缴创建任务,根据选择的人调出列表
    "handinBasiclInfo_create.staff_id"(val, oldVal) {
      let obj = this.handinBasiclInfo_create;
      this.$http.get(`${this.url}contract/staff/${val}?search=`).then(res => {
        // console.log(res);
        if (res.code === "20000") {
          obj.noDataShow = false;
          obj.collects = res.data.collect;
          obj.rents = res.data.rent;
          let collectsAndRents = Object.assign(
            {},
            res.data.collect,
            res.data.rents
          );
          // 初始化选择的文件对象
          let choosed = JSON.parse(JSON.stringify(collectsAndRents));
          for (const key in choosed) {
            choosed[key] = false;
          }
          // 初始化地址
          let address = JSON.parse(JSON.stringify(collectsAndRents));
          for (const key in address) {
            address[key] = "";
          }
          // 初始化选择的文件/交接/收据/钥匙
          let receipt = JSON.parse(JSON.stringify(choosed));
          let key = JSON.parse(JSON.stringify(choosed));
          // 添加到表单对象
          this.$set(obj, "choosed", choosed);
          this.$set(obj, "address", address);
          this.$set(obj, "receipt", receipt);
          this.$set(obj, "key", key);
        } else {
          obj.noDataShow = true;
          obj.collects = [];
          obj.rents = [];
        }
      });
    },
    // 丢失创建任务,根据选择的人调出列表
    "loseBasiclInfo_create.staff_id"(val, oldVal) {
      let obj = this.loseBasiclInfo_create;
      this.$http.get(`${this.url}contract/staff/${val}?search=`).then(res => {
        if (res.code === "20000") {
          obj.noDataShow = false;
          obj.collects = res.data.collect;
          obj.rents = res.data.rent;
        } else {
          obj.noDataShow = true;
          obj.collects = [];
          obj.rents = [];
        }
      });
    },
    // 作废创建任务,根据选择人调出合同列表
    "cancelBasiclInfo_add.staff_id"(val, oldVal) {
      let obj = this.cancelBasiclInfo_add;
      this.$http.get(`${this.url}contract/staff/${val}?search=`).then(res => {
        if (res.code === "20000") {
          obj.noDataShow = false;
          obj.collects = res.data.collect;
          obj.rents = res.data.rent;
        } else {
          obj.noDataShow = true;
          obj.collects = [];
          obj.rents = [];
        }
      });
    }
  }
};
</script>
<style lang="scss">
#theme_name.theme1 {
  #dataBase {
    .dianziziliao {
      .lj_container {
        padding: 35px 64px !important;
      }
    }
    .form_body {
      .el-form-item__content {
        display: block;
      }
      .el-checkbox__inner {
        border-radius: 50%;
        &::after {
          border: none;
          width: 0;
          height: 0;
          content: none;
        }
      }
    }
    .form_footer .el-form-item {
      display: block !important;
    }
    .form_header {
      .el-form-item__label {
        text-align: center;
      }
      .el-radio {
        display: inline-block;
      }
    }
    .el-button.red {
      background: #fff8f8;
      &:hover,
      &:focus {
        background: #f56c6c;
        color: white;
      }
    }
    .form_box {
      .el-input__inner {
        border: 1px solid #efefef;
        width: 740px;
      }
      .el-checkbox__inner {
        border-radius: 50%;
        &::after {
          border: none;
          width: 0;
          height: 0;
          content: none;
        }
      }
      .el-radio__label {
        line-height: 40px;
      }
      .el-radio__inner {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
    }
  }
}
</style>

<style scoped lang="scss">
@import "../../../../assets/scss/humanResource/repository/dataBase/index.scss";

@mixin childrenImg($m, $n) {
  $url: "../../../../assets/image/humanResource/repository/dataBase/" + $n + "/" +
    $m;
  @include bgImage($url);
}
@mixin childrenImg2($m, $n) {
  $url: "../../../../assets/image/humanResource/repository/borrowReceive/" + $n +
    "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #dataBase {
    .main-nav {
      .dataBase-left {
        .isActive {
          @include childrenImg("teji.png", "theme1");
        }
      }
      .dataBase-right {
        .isActive {
          @include childrenImg("xbx.png", "theme1");
        }
      }
    }
    .collectDialog {
      .dialog_container {
        .dialog_body {
          .main_left {
            .contractGatherChoosed {
              @include childrenImg("sxxq.png", "theme1");
            }
            .contractGatherChoosedF {
              @include childrenImg("wpxq.png", "theme1");
            }
          }
          .main_right {
            background: white;
            .right_title {
              .arrow {
                @include childrenImg("zs.png", "theme1");
              }
            }
          }
        }
      }
    }
    .distributeDialog {
      .dialog_body {
        .arrow {
          @include childrenImg("zs.png", "theme1");
        }
      }
    }
    .receiveModify {
      .arrow {
        @include childrenImg("zs.png", "theme1");
      }
    }
    .receiveMission {
      .addIcon {
        @include childrenImg("tianjia.png", "theme1");
      }
      .reduceIcon {
        @include childrenImg("tianjia.png", "theme1");
      }
    }
    .cancelMission {
      .arrow {
        @include childrenImg("zs.png", "theme1");
      }
      .dialogBody {
        .operateDetail {
        }
        .operatorDetail {
          .right_title {
            .arrow {
              @include childrenImg("zs.png", "theme1");
            }
          }
        }
      }
    }
    .handinModify {
      .dialogBody {
        .operateDetail {
          .right_title {
            .arrow {
              @include childrenImg("zs.png", "theme1");
            }
          }
        }
      }
    }
    .photo-img {
      @include childrenImg2("tp.png", "theme1");
    }
    .dianziziliao {
      .img {
        @include childrenImg2("tp.png", "theme1");
      }
    }
    // 上缴创建任务和丢失创建任务
    .shangjiao_create {
      .arrow {
        @include childrenImg("zs.png", "theme1");
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
