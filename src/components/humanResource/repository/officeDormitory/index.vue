<template>
  <div id="officeDormitory">
    <div class="main-nav">
      <span
        v-for="(item,index) in active"
        :key="index"
        :class="{'isActive': item.id === activeIndex}"
        @click="changeTab(index)"
      >{{item.val}}</span>
    </div>

    <!-- 办公室管理列表页 -->
    <div class="office-container" v-if="activeIndex == 0" :key="0">
      <el-table
        highlight-current-row
        header-row-class-name="tableHeader"
        height="670px"
        :data="officeList"
        @row-click="handle_office"
        @row-dblclick="dblclick_office"
      >
        <el-table-column align="center" width="60">
          <template>
            <div class="operation-box">
              <a class="sangedian">
                <span></span>
                <span></span>
                <span></span>
              </a>
              <ul class="erji">
                <li>取消办公室</li>
                <li>变更信息</li>
              </ul>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="房屋地址" align="center" prop="house_name"></el-table-column>
        <el-table-column label="小区地址" align="center" prop="village_name"></el-table-column>
        <el-table-column label="房型" align="center" prop="house_feature"></el-table-column>
        <el-table-column label="面积" align="center" prop="area"></el-table-column>
        <el-table-column label="装修" align="center" prop="decoration"></el-table-column>
        <el-table-column label="房屋类型" align="center" prop="house_identity"></el-table-column>
        <el-table-column label="照片" align="center">
          <template slot-scope="scope">
            <div @click="showPictureList(scope.row)" class="photo-img"></div>
          </template>
        </el-table-column>
        <el-table-column label="收房价格" align="center" prop="suggest_price"></el-table-column>
        <el-table-column label="人均价格" align="center" prop="average_price"></el-table-column>
        <el-table-column label="部门人数" align="center" prop="office_num"></el-table-column>
        <el-table-column
          label="办公室类型"
          align="center"
          prop="office_type"
          :formatter="format_office_type"
        ></el-table-column>
        <el-table-column label="开始时间" align="center" prop="start_at"></el-table-column>
        <el-table-column label="结束时间" align="center" prop="end_at"></el-table-column>
        <el-table-column label="片区经理" align="center" prop="leader_name"></el-table-column>
      </el-table>
    </div>

    <!-- 办公室的高级搜索选项 -->
    <searchHigh
      class="searchOffice"
      :module="searchOffice_visiable"
      :show-data="officeSearchData"
      @close="closeSearchOffice"
    ></searchHigh>

    <!-- 宿舍管理列表页 -->
    <div class="dormitory-container" v-if="activeIndex == 1" :key="1">
      <el-table
        highlight-current-row
        header-row-class-name="tableHeader"
        height="670px"
        :data="dormitoryList"
        @row-click="handle_dormitory"
        @row-dblclick="dblclick_dormitory"
      >
        <el-table-column align="center" width="60">
          <template>
            <div class="operation-box">
              <a class="sangedian">
                <span></span>
                <span></span>
                <span></span>
              </a>
              <ul class="erji">
                <li>添加入住人员</li>
                <li>取消宿舍</li>
                <li>变更信息</li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="房屋地址" align="center" prop="house_name"></el-table-column>
        <el-table-column label="小区地址" align="center" prop="village_name"></el-table-column>
        <el-table-column label="房型" align="center" prop="house_feature"></el-table-column>
        <el-table-column label="面积" align="center" prop="area"></el-table-column>
        <el-table-column label="装修" align="center" prop="decoration"></el-table-column>
        <el-table-column label="房屋类型" align="center" prop="house_identity"></el-table-column>
        <el-table-column label="照片" align="center">
          <template slot-scope="scope">
            <div @click="showPictureList(scope.row)" class="photo-img"></div>
          </template>
        </el-table-column>
        <el-table-column label="收房价格" align="center" prop="suggest_price"></el-table-column>
        <el-table-column label="人均价格" align="center" prop="average_price"></el-table-column>
        <el-table-column label="当前入住人数" align="center" prop="live_num">
          <template slot-scope="scope_live_num">
            <div
              class="live_num"
              @click="getGuest(scope_live_num.row.id,scope_live_num.row.house_id)"
            >{{scope_live_num.row.live_num}}</div>
          </template>
        </el-table-column>
        <el-table-column label="剩余床位" align="center" prop="last_bed"></el-table-column>
        <el-table-column label="开始时间" align="center" prop="start_at"></el-table-column>
        <el-table-column label="结束时间" align="center" prop="end_at"></el-table-column>
        <el-table-column label="片区经理" align="center" prop="leader_name"></el-table-column>
        <el-table-column label="部门" align="center" prop="depart_name"></el-table-column>
      </el-table>
    </div>

    <!-- 宿舍的高级搜索选项 -->
    <searchHigh
      class="searchDormitory"
      :module="searchDormitory_visiable"
      :show-data="DormitorySearchData"
      @close="closeSearchDormitory"
    ></searchHigh>

    <!-- 下方滑动展示区域 -->
    <!-- <div id="workInfo">
      <div class="tip-icon"></div>
      <div class="info_container">
        <div class="period_info">
          <div class="period_info_left">
            <div class="event_info">
              <p>各部分办公室成本占比：</p>
              <div id="events_charts" style="width: 238px;height: 238px; margin-top: 19px;"></div>
            </div>
            <div class="event_info">
              <p>各片区办公室成本：</p>
              <div id="attend_charts" style="width: 238px;height: 238px; margin-top: 19px;"></div>
            </div>
            <div class="event_info">
              <p>各部分宿舍成本占比：</p>
              <div id="attend_charts" style="width: 238px;height: 238px; margin-top: 19px;"></div>
            </div>
            <div class="event_info">
              <p>各片区宿舍成本：</p>
              <div id="attend_charts" style="width: 238px;height: 238px; margin-top: 19px;"></div>
            </div>
          </div>

          <div class="period_info_right">
            <div class="work_info">
              <p>办公室</p>
              <p>宿舍</p>
            </div>
          </div>
        </div>
        <ul class="period_change">
          <li
            v-for="(item, index) in period"
            :key="index"
            :class="{'mark_li': item.id === periodChoosed}"
            @click="changePeriod(index)"
          >{{item.val}}</li>
        </ul>
      </div>
    </div>-->

    <!-- 分页,普通搜索-->
    <div class="page flex-center" :key="'comoonSearch'" v-if="!isHighSearch">
      <el-pagination
        :total="commonPages.total"
        layout="total,jumper,prev,pager,next"
        :current-page="commonPages.page"
        :page-size="commonPages.limit"
        @current-change="current_change_common"
      ></el-pagination>
    </div>

    <!-- 分页,高级搜索-->
    <div class="page flex-center" :key="'highSearch'" v-if="isHighSearch">
      <el-pagination
        :total="highPages.total"
        layout="total,jumper,prev,pager,next"
        :current-page="highPages.page"
        :page-size="highPages.limit"
        @current-change="current_change_high"
      ></el-pagination>
    </div>

    <!-- 新增办公室 -->
    <lj-dialog
      :visible="addOffice_visiable"
      :size="{width: 580 + 'px',height: 581 + 'px'}"
      @close="closeOfficeVisiable()"
      class="addOffice"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增办公室</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="110px" :model="addOffice_form">
            <el-form-item label="请选择房屋">
              <house-community :style="{width:100+'%'}" @getHouseIdName="getHouseId_add_office"></house-community>
            </el-form-item>
            <el-form-item label="办公室类型">
              <div class="items-center iconInput">
                <el-select placeholder="请选择" v-model="addOffice_form.office_type">
                  <el-option label="临时" value="1"></el-option>
                  <el-option label="正式" value="2"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="部门">
              <org-choose title="请选择部门" v-model="addOffice_form.depart_id"></org-choose>
            </el-form-item>
            <el-form-item label="部门人数">
              <el-input v-model="addOffice_form.office_num" value="25"></el-input>
            </el-form-item>
            <el-form-item label="领导">
              <user-choose title="请选择人员" v-model="addOffice_form.leader_id" num="1"></user-choose>
            </el-form-item>
            <el-form-item label="开始时间">
              <div class="items-center iconInput">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="addOffice_form.start_at"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="备注">
              <div class="items-center iconInput">
                <el-input type="textarea" :rows="3" v-model="addOffice_form.remarks"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="addOffice_fun">确定</el-button>
          <el-button type="info" size="small" @click="closeOfficeVisiable()">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 办公室记录 -->
    <lj-dialog
      :visible="officeRecord_visiable"
      :size="{width: 1041 + 'px',height: 900 + 'px'}"
      @close="officeRecord_visiable = false"
      class="officeRecore"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>办公室记录</h3>
          <div>
            <span>审批编号: {{rowData.id}}</span>
            <span>申请人: {{rowData.applicant.name}}</span>
            <span>申请时间: {{rowData.created_at}}</span>
          </div>
        </div>
        <ul class="basicInfo">
          <li>
            <span>房屋地址</span>
            {{rowData.house_name}}
          </li>
          <li>
            <span>办公室类型</span>
            {{rowData.office_type===1?"临时":"正式"}}
          </li>
          <li>
            <span>小区地址</span>
            {{rowData.village_name}}
          </li>
          <li>
            <span>片区经理</span>
            {{rowData.leader_name}}
          </li>
          <li>
            <span>房型</span>
            {{rowData.house_feature}}
          </li>
          <li>
            <span>部门</span>
            {{rowData.depart_name}}
          </li>
        </ul>
        <div class="dialog_body">
          <el-timeline>
            <el-timeline-item v-for="(operator, index) in rowData.operator_log" :key="index">
              <!-- <el-timeline-item> -->
              <div class="timeLines-detail-box">
                <div class="txt">
                  <p>{{operator.operate_time}} {{operator.operator_name}}</p>
                  <p>开始时间:{{operator.operate_content.start_at}} {{operator.operate_content.content}}</p>
                  <p>备注：{{operator.remarks}}</p>
                </div>
                <div class="merge" @click="officeRecordMerge_fun(operator,rowData.id)">修改</div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="officeRecord_visiable = false">确定</el-button>
          <el-button type="info" size="small" @click="officeRecord_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 办公室记录中的修改 -->
    <lj-dialog
      :visible="officeRecordMerge_visiable"
      :size="{width: 570 + 'px',height: 379 + 'px'}"
      @close="officeRecordMerge_visiable = false"
      class="officeRecordMerge"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>变更办公室信息</h3>
        </div>
        <div class="dialog_body">
          <el-form ref="officeRecordMerge_form" :model="officeRecordMerge_form" label-width="80px">
            <el-form-item label="开始时间" v-if="officeRecordMerge_form.start_at">
              <el-date-picker
                v-model="officeRecordMerge_form.start_at"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="取消时间" v-if="officeRecordMerge_form.end_at">
              <el-date-picker
                v-model="officeRecordMerge_form.end_at"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="officeRecordMerge_form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="officeRecordMerge_fun_confirm">确定</el-button>
          <el-button type="info" size="small" @click="officeRecordMerge_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 取消办公室 -->
    <lj-dialog
      :visible="cancelOffice_visiable"
      :size="{width: 570 + 'px',height: 431 + 'px'}"
      @close="cancelOffice_visiable = false"
      class="cancelOffice"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>取消办公室</h3>
        </div>
        <div class="dialog_body">
          <el-form ref="cancelOffice_form" :model="cancelOffice_form" label-width="80px">
            <el-form-item label="房屋地址">
              <el-input readonly v-model="cancelOffice_form.house_name"></el-input>
            </el-form-item>
            <el-form-item label="取消时间">
              <el-date-picker
                v-model="cancelOffice_form.end_at"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="cancelOffice_form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="cancelOffice_fun">确定</el-button>
          <el-button type="info" size="small" @click="cancelOffice_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 变更办公室信息 -->
    <lj-dialog
      :visible="changeOfficeInfo_visiable"
      :size="{width: 580 + 'px',height: 581 + 'px'}"
      @close="changeOfficeInfo_visiable = false"
      class="changeOfficeInfo"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>变更办公室</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="110px" :model="changeOfficeInfo_form">
            <el-form-item label="请选择房屋">
              <!-- <house-community :style="{width:100+'%'}" @getHouseIdName="getHouseId_change_office"></house-community> -->
              <el-input v-model="changeOfficeInfo_form.house_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="办公室类型">
              <div class="items-center iconInput">
                <el-select placeholder="请选择" v-model="changeOfficeInfo_form.office_type">
                  <el-option label="临时" value="1"></el-option>
                  <el-option label="正式" value="2"></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="部门">
              <org-choose title="请选择部门" v-model="changeOfficeInfo_form.depart_id"></org-choose>
            </el-form-item>
            <el-form-item label="部门人数">
              <el-input v-model="changeOfficeInfo_form.office_num"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <div class="items-center iconInput">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="changeOfficeInfo_form.start_time"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="备注">
              <div class="items-center iconInput">
                <el-input type="textarea" :rows="3" v-model="changeOfficeInfo_form.remarks"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="changeOfficeInfo_fun">确定</el-button>
          <el-button type="info" size="small" @click="changeOfficeInfo_visiable=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 新增宿舍 -->
    <lj-dialog
      :visible="addDormitory_visiable"
      :size="{width: 580 + 'px',height: 532 + 'px'}"
      @close="closeDomitoryVisiable()"
      class="addDormitory"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增宿舍</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="100px" :model="addDormitory_form">
            <el-form-item label="请选择房屋">
              <house-community :style="{width:100+'%'}" @getHouseIdName="getHouseId_add_domitory"></house-community>
            </el-form-item>
            <el-form-item label="总床位">
              <div class="items-center iconInput">
                <el-input v-model="addDormitory_form.bed_num" value="11"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="部门">
              <org-choose title="请选择部门" v-model="addDormitory_form.depart_id"></org-choose>
            </el-form-item>
            <el-form-item label="片区经理">
              <user-choose title="请选择人员" v-model="addDormitory_form.leader_id" num="1"></user-choose>
            </el-form-item>
            <el-form-item label="开始时间">
              <div class="items-center iconInput">
                <el-date-picker type="date" placeholder="选择日期" v-model="addDormitory_form.start_at" value-format="yyyy-MM-dd"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="备注">
              <div class="items-center iconInput">
                <el-input type="textarea" :rows="3" v-model="addDormitory_form.remarks"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="addDormitory_fun">确定</el-button>
          <el-button type="info" size="small" @click="closeDomitoryVisiable()">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 取消宿舍 -->
    <lj-dialog
      :visible="cancel_dormitory_visiable"
      :size="{width: 570 + 'px',height: 431 + 'px'}"
      @close="cancel_dormitory_visiable = false"
      class="cancelDormitory"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>取消宿舍</h3>
        </div>
        <div class="dialog_body">
          <el-form ref="cancelDormitory_form" :model="cancelDormitory_form" label-width="100px">
            <el-form-item label="房屋地址">
              <el-input placeholder="获取的房屋地址" readonly v-model="cancelDormitory_form.house_name"></el-input>
            </el-form-item>
            <el-form-item label="当前入住人数">
              <el-input placeholder="获取的入住人数" readonly v-model="cancelDormitory_form.live_num"></el-input>
            </el-form-item>
            <el-form-item label="取消时间">
              <el-date-picker
                v-model="cancelDormitory_form.end_at"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="cancelDormitory_form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="cancelDormitory_fun">确定</el-button>
          <el-button type="info" size="small" @click="cancel_dormitory_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 宿舍记录 -->
    <lj-dialog
      :visible="dormitoryRecord_visiable"
      :size="{width: 1041 + 'px',height: 900 + 'px'}"
      @close="dormitoryRecord_visiable = false"
      class="dormitoryRecord"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>宿舍记录</h3>
          <div>
            <span>审批编号: {{rowData.id}}</span>
            <span>申请人: {{rowData.applicant.name}}</span>
            <span>申请时间: {{rowData.created_at}}</span>
          </div>
        </div>
        <ul class="basicInfo">
          <li>
            <span>房屋地址</span>
            {{rowData.house_name}}
          </li>
          <li>
            <span>当前入住人数</span>
            {{rowData.live_num}}
          </li>
          <li>
            <span>小区地址</span>
            {{rowData.village_name}}
          </li>
          <li>
            <span>剩余床位数</span>
            {{rowData.last_bed}}
          </li>
          <li>
            <span>房型</span>
            {{rowData.house_feature}}
          </li>
          <li>
            <span>片区经理</span>
            {{rowData.leader_name}}
          </li>
        </ul>
        <div class="dialog_body">
          <el-timeline>
            <el-timeline-item v-for="(operator, index) in rowData.operator_log" :key="index">
              <!-- <el-timeline-item> -->
              <div class="timeLines-detail-box">
                <div class="txt">
                  <p>{{operator.operate_time}} {{operator.operator_name}}</p>
                  <p>开始时间：{{operator.operate_content.start_at}} {{operator.operate_content.content}}</p>
                  <p>备注：{{operator.remarks}}</p>
                </div>
                <div class="merge" @click="dormitoryRecordMerge_fun(operator,rowData.id)">修改</div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="dormitoryRecord_visiable = false">确定</el-button>
          <el-button type="info" size="small" @click="dormitoryRecord_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 宿舍记录中的修改 -->
    <lj-dialog
      :visible="dormitoryRecordMerge_visiable"
      :size="{width: 570 + 'px',height: 379 + 'px'}"
      @close="dormitoryRecordMerge_visiable = false"
      class="dormitoryRecordMerge"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>变更宿舍信息</h3>
        </div>
        <div class="dialog_body">
          <el-form
            ref="dormitoryRecordMerge_form"
            :model="dormitoryRecordMerge_form"
            label-width="80px"
          >
            <el-form-item label="开始时间" v-if="dormitoryRecordMerge_form.start_at">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.start_at"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="取消时间" v-if="dormitoryRecordMerge_form.end_at">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.end_at"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="入住时间" v-if="dormitoryRecordMerge_form.live_time">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.live_time"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="离宿时间" v-if="dormitoryRecordMerge_form.out_time">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.out_time"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dormitoryRecordMerge_form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="dormitoryRecordMerge_fun_confirm">确定</el-button>
          <el-button type="info" size="small" @click="dormitoryRecordMerge_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 添加宿舍入住人员 -->
    <lj-dialog
      :visible="add_dormitory_member_visiable"
      :size="{width: 580 + 'px',height: 581 + 'px'}"
      @close="add_dormitory_member_visiable = false"
      class="cancelDormitory"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加宿舍入住人员</h3>
        </div>
        <div class="dialog_body">
          <el-form
            ref="add_dormitory_member_form"
            :model="add_dormitory_member_form"
            label-width="100px"
          >
            <el-form-item label="房屋地址">
              <el-input readonly v-model="add_dormitory_member_form.house_name"></el-input>
            </el-form-item>
            <el-form-item label="当前入住人数">
              <el-input readonly v-model="add_dormitory_member_form.live_num"></el-input>
            </el-form-item>
            <el-form-item label="剩余床位">
              <el-input readonly v-model="add_dormitory_member_form.last_bed"></el-input>
            </el-form-item>
            <el-form-item label="人员姓名">
              <user-choose title="请选择人员" v-model="add_dormitory_member_form.guest_ids" width="420"></user-choose>
            </el-form-item>
            <el-form-item label="入住时间">
              <el-date-picker
                v-model="add_dormitory_member_form.live_time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="add_dormitory_member_form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="add_dormitory_member_fun">确定</el-button>
          <el-button type="info" size="small" @click="add_dormitory_member_visiable = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 变更宿舍信息 -->
    <lj-dialog
      :visible="changeDormitoryInfo_visiable"
      :size="{width: 580 + 'px',height: 581 + 'px'}"
      @close="changeDormitoryInfo_visiable = false"
      class="changeDormitoryInfo"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>变更宿舍</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="110px" :model="changeDormitoryInfo_form">
            <el-form-item label="请选择房屋">
              <house-community
                :style="{width:100+'%'}"
                @getHouseIdName="getHouseId_change_domitory"
              ></house-community>
            </el-form-item>
            <el-form-item label="总床位数">
              <el-input v-model="changeDormitoryInfo_form.bed_num" value="25"></el-input>
            </el-form-item>
            <el-form-item label="片区经理">
              <user-choose title="请选择人员" v-model="changeDormitoryInfo_form.leader_id" num="1"></user-choose>
            </el-form-item>
            <el-form-item label="备注">
              <div class="items-center iconInput">
                <el-input type="textarea" :rows="3" v-model="changeDormitoryInfo_form.remarks"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="changeDormitoryInfo_fun">确定</el-button>
          <el-button type="info" size="small" @click="changeDormitoryInfo_visiable=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 宿舍入住人员详情 -->
    <lj-dialog
      :visible="dormitory_member_list_visiable"
      :size="{width: 883 + 'px',height: 722 + 'px'}"
      @close="dormitory_member_list_visiable = false"
      class="dormitory_member_list"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>入住人员</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <ul class="title">
            <li>姓名</li>
            <li>审批编号</li>
            <li>开始时间</li>
            <li>操作</li>
          </ul>
          <dl>
            <dd v-for="(guest,index) in guestList.list" :key="index">
              <span>{{guest.guest_name}}</span>
              <span>{{guest.id}}</span>
              <span>{{guest.live_time}}</span>
              <span>
                <el-button type="danger" plain size="small" @click="guestLeave(guest)">离宿</el-button>
              </span>
            </dd>
          </dl>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="dormitory_member_list_visiable=false">确定</el-button>
          <el-button type="info" size="small" @click="dormitory_member_list_visiable=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 确认离宿操作 -->
    <lj-dialog
      :visible="dormitory_member_leave_visiable"
      :size="{width: 570 + 'px',height: 431 + 'px'}"
      @close="dormitory_member_leave_visiable = false"
      class="dormitory_member_leave"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>离宿</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form
            ref="dormitory_member_leave_form"
            :model="dormitory_member_leave_form"
            label-width="80px"
          >
            <el-form-item label="人员姓名">
              <el-input type="text" readonly v-model="dormitory_member_leave_form.guest_name"></el-input>
            </el-form-item>
            <el-form-item label="离宿时间">
              <el-date-picker
                v-model="dormitory_member_leave_form.out_time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dormitory_member_leave_form.remarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="guestLeave_confirm">确定</el-button>
          <el-button type="info" size="small" @click="dormitory_member_leave_visiable=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <lj-dialog
      :visible="imgSlider_visiable"
      :size="{width: 700 + 'px',height: 400 + 'px'}"
      @close="imgSlider_visiable = false"
      class="imgSlider"
    >
      <imgSlider :arr="imgData"></imgSlider>
    </lj-dialog>
  </div>
</template>

<script>
import LjDialog from "../../../common/lj-dialog.vue";
import imgSlider from "../../../common/lightweightComponents/ImgSlider.vue";
import LjUpload from "../../../common/lightweightComponents/lj-upload.vue";
import UserChoose from "../../../common/lightweightComponents/UserChoose";
import OrgChoose from "../../../common/lightweightComponents/OrgChoose";
import searchHigh from "../../../common/searchHigh.vue";
import { constants } from "os";
import {
  officeHightSearch,
  dormitoryHightSearch
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
  props: {
    addOffice_visiable: {
      type: Boolean,
      required: true
    },
    addDormitory_visiable: {
      type: Boolean,
      required: true
    },
    searchOffice_visiable: {
      type: Boolean,
      required: true
    },
    searchDormitory_visiable: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      url: globalConfig.market_server,
      activeIndex: 0,
      active: [{ id: 0, val: "办公室管理" }, { id: 1, val: "宿舍管理" }],
      period: [
        { id: 0, val: "当日" },
        { id: 1, val: "本周" },
        { id: 2, val: "本月" }
      ],
      // 新增办公室的表单
      addOffice_form: {
        house_type: 1, //房屋类型（办公室还是宿舍）
        house_id: "", //房屋id
        office_type: "", //办公室类型
        operate_type: 1, //操作类型
        depart_id: "", //部门id
        office_num: "", //部门人数
        start_at: "", //开始时间
        remarks: "", //备注
        leader_id:""
      },
      // 新增宿舍的表单
      addDormitory_form: {
        house_type: 2,
        house_id: "",
        leader_id: "", //负责人id
        bed_num: "", //床位
        start_at: "",
        remarks: "",
        operate_type: 1,
        depart_id:""
      },
      // 办公室列表的数据
      officeList: [],
      // 宿舍列表的数据
      dormitoryList: [],
      // 控制取消办公室模态框显示
      cancelOffice_visiable: false,
      // 取消办公室的表单信息
      cancelOffice_form: {
        end_at: "",
        remarks: "",
        house_name: "",
        id: ""
      },
      // 控制取消宿舍的模态框显示
      cancel_dormitory_visiable: false,
      // 取消宿舍的表单信息
      cancelDormitory_form: {
        id: "",
        end_at: "",
        remarks: ""
      },
      // 控制添加宿舍人员模态框显示
      add_dormitory_member_visiable: false,
      // 添加宿舍人员的表单
      add_dormitory_member_form: {},
      // 控制更改办公室信息模态框显示
      changeOfficeInfo_visiable: false,
      // 更改办公室信息的表单
      changeOfficeInfo_form: {
        // house_type: 1, //房屋类型（办公室还是宿舍）
        house_id: "", //房屋id
        id: "",
        office_type: "", //办公室类型
        // operate_type: 1, //操作类型
        depart_id: "", //部门id
        leader_id: "",
        office_num: "", //部门人数
        start_time: "", //开始时间
        remarks: "" //备注
      },
      // 控制更改宿舍信息的模态框显示
      changeDormitoryInfo_visiable: false,
      // 修改宿舍信息的表单
      changeDormitoryInfo_form: {
        house_id: "",
        bed_num: "",
        leader_id: "",
        remarks: "",
        id: ""
      },
      // 控制办公室记录模态框显示
      officeRecord_visiable: false,
      // 控制办公室记录中的修改
      officeRecordMerge_visiable: false,
      // 办公室记录中的修改的表单数据
      officeRecordMerge_form: {
        start_at: "",
        end_at: "",
        id: "",
        remarks: ""
      },
      // 控制宿舍记录 模态框的显示
      dormitoryRecord_visiable: false,
      // 控制宿舍记录中的修改
      dormitoryRecordMerge_visiable: false,
      dormitoryRecordMerge_form: {
        start_at: "",
        end_at: "",
        id: "",
        remarks: "",
        live_time: "", //入住时间
        out_time: "" //离宿时间
      },
      // 控制宿舍入住人员详情模态框的显示
      dormitory_member_list_visiable: false,
      // 控制确认离宿模态框显示
      dormitory_member_leave_visiable: false,
      // 确认离开宿的表单
      dormitory_member_leave_form: {
        house_id: "",
        guest_ids: [],
        out_time: "",
        remarks: ""
      },
      // 办公室高级搜索的表单
      officeSearchData: officeHightSearch,
      // 宿舍高级搜索的表单
      DormitorySearchData: dormitoryHightSearch,
      // 控制图表
      showCharts: false,
      // 图标分类
      periodChoosed: 0,
      // 分页信息
      commonPages: {
        page: 1,
        limit: 8,
        total: 0
      },
      highPages: {
        page: 1,
        limit: 8,
        total: 0
      },
      isHighSearch: false,
      // 具体一行的数据
      rowData: {
        applicant:{
          name:""
        }
      },
      // 控制图片模态框显示
      imgSlider_visiable: false,
      // 图片的数据
      imgData: {},
      // 入住人员数据
      guestList: {}
    };
  },
  mounted() {
    this.$emit("officeDormitoryChoose", this.activeIndex);
    this.getOfficeList_fun();
  },
  watch: {
    activeIndex() {
      this.$emit("officeDormitoryChoose", this.activeIndex);
    }
  },
  methods: {
    changeTab: function(index) {
      this.activeIndex = index;
      // 切换的时候重置分页
      this.commonPages = {
        page: 1,
        limit: 8,
        total: 0
      };
      this.highPages = {
        page: 1,
        limit: 8,
        total: 0
      };
      if (index === 0) {
        this.getOfficeList_fun();
      } else if (index === 1) {
        this.getDormitoryList_fun();
      }
    },
    changePeriod: function(index) {
      this.periodChoosed = index;
    },
    closeOfficeVisiable: function() {
      this.$emit("closeAddOffice", false);
    },
    closeDomitoryVisiable: function() {
      this.$emit("closeAddDormitory", false);
    },
    // 办公室高级搜索事件
    closeSearchOffice: function(val) {
      this.$emit("closeSearchOffice", false);
      // 判断返回的是不是数据对象
      if (typeof val === "object") {
        let searchData = JSON.parse(JSON.stringify(val));
        // 如果选择了开始/结束事件,对时间格式进行调整
        if ("start_at" in searchData) {
          searchData.end_at = searchData.start_at[1];
          searchData.start_at = searchData.start_at[0];
        }
        // 如果筛选了领导
        if ("leader_id" in searchData) {
          searchData.leader_id = searchData.leader_id[0];
        }
        // 如果筛选了部门
        if ("depart_id" in searchData) {
          searchData.depart_id = searchData.depart_id[0];
        }
        // console.log(searchData);
        if (Object.keys(searchData).length > 0) {
          // 有数据就执行高级搜索
          this.getOfficeList_fun(searchData);
          this.isHighSearch = true;
        } else {
          this.isHighSearch = false;
          this.getOfficeList_fun();
        }
      }
    },
    // 宿舍高级搜索事件
    closeSearchDormitory: function(val) {
      this.$emit("closeSearchDormitory", false);
      // 判断返回的是不是数据对象
      if (typeof val === "object") {
        let searchData = JSON.parse(JSON.stringify(val));
        // 如果选择了开始/结束事件,对时间格式进行调整
        if ("start_at" in searchData) {
          searchData.end_at = searchData.start_at[1];
          searchData.start_at = searchData.start_at[0];
        }
        // 如果筛选了领导
        if ("leader_id" in searchData) {
          searchData.leader_id = searchData.leader_id[0];
        }
        // 如果筛选了部门
        if ("depart_id" in searchData) {
          searchData.depart_id = searchData.depart_id[0];
        }
        // console.log(searchData);
        if (Object.keys(searchData).length > 0) {
          // 有数据就执行高级搜索
          this.getDormitoryList_fun(searchData);
          this.isHighSearch = true;
        } else {
          this.isHighSearch = false;
          this.getDormitoryList_fun();
        }
      }
    },
    // 新增办公室
    addOffice_fun() {
      let data=JSON.parse(JSON.stringify(this.addOffice_form))
      data.depart_id=data.depart_id[0];
      data.leader_id=data.leader_id[0];
      console.log("新增办公室", data);
      this.$http
        .post(`${this.url}/v1.0/market/dormitory/add`, data)
        .then(res => {
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 新增宿舍
    addDormitory_fun() {
      console.log("新增宿舍", this.addDormitory_form);
      // 将宿舍leader_Id数组类型设为int类型
      if (this.addDormitory_form.leader_id.length > 0) {
        this.addDormitory_form.leader_id = this.addDormitory_form.leader_id[0];
      }
      if (this.addDormitory_form.depart_id.length > 0) {
        this.addDormitory_form.depart_id = this.addDormitory_form.depart_id[0];
      }
      this.$http
        .post(`${this.url}/v1.0/market/dormitory/add`, this.addDormitory_form)
        .then(res => {
          console.log(res);
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              this.getDormitoryList_fun();
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 新增办公室获取组件的id
    getHouseId_add_office(val) {
      this.addOffice_form.house_id = val.house_id;
    },
    // 办公室的列表获取
    getOfficeList_fun(searchData = {}) {
      this.showLoading(true);
      // 判断有没有高级搜索的
      let data = {};
      if (arguments.length === 0) {
        data = {
          house_type: 1,
          page: this.commonPages.page,
          limit: this.commonPages.limit
        };
      } else {
        data = Object.assign(
          {},
          {
            house_type: 1,
            page: this.highPages.page,
            limit: this.highPages.limit
          },
          searchData
        );
      }
      this.$http
        .get(`${this.url}/v1.0/market/dormitory/list`, data)
        .then(res => {
          console.log("办公室列表", res.data);
          if (this.isHighSearch) {
            this.highPages.total = res.data.count;
          } else {
            this.commonPages.total = res.data.count;
          }
          // 渲染具体数据
          this.officeList = res.data.data;
          this.showLoading(false);
        });
    },
    // 宿舍的列表获取
    getDormitoryList_fun(searchData = {}) {
      this.showLoading(true);
      // 判断有没有高级搜索的
      let data = {};
      if (arguments.length === 0) {
        data = {
          house_type: 2,
          page: this.commonPages.page,
          limit: this.commonPages.limit
        };
      } else {
        data = Object.assign(
          {},
          {
            house_type: 2,
            page: this.highPages.page,
            limit: this.highPages.limit
          },
          searchData
        );
      }
      this.$http
        .get(`${this.url}/v1.0/market/dormitory/list`, data)
        .then(res => {
          console.log("宿舍列表", res.data);
          if (this.isHighSearch) {
            this.highPages.total = res.data.count;
          } else {
            this.commonPages.total = res.data.count;
          }
          // 渲染具体数据
          this.dormitoryList = res.data.data;
          this.showLoading(false);
        });
    },
    // 变更办公室信息获取组件id
    getHouseId_change_office(val) {
      this.changeOfficeInfo_form.house_id = val.house_id;
    },
    // 新增宿舍获取组件的id
    getHouseId_add_domitory(val) {
      this.addDormitory_form.house_id = val.house_id;
    },
    // 变更宿舍获取组件的id
    getHouseId_change_domitory(val) {
      this.changeDormitoryInfo_form.house_id = val.house_id;
    },
    // 取消办公室
    cancelOffice_fun() {
      this.$http
        .post(
          `${this.url}/v1.0/market/dormitory/delete`,
          this.cancelOffice_form
        )
        .then(res => {
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              // 关闭模态框
              this.cancelOffice_visiable = false;
              // 更新数据
              this.getOfficeList_fun();
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 变更办公室信息
    changeOfficeInfo_fun() {
      let data=JSON.parse(JSON.stringify(this.changeOfficeInfo_form));
      data.depart_id=data.depart_id[0];
      console.log("变更办公室信息", data);
      this.$http
        .post(
          `${this.url}/v1.0/market/dormitory/houseUpdate`,
          data
        )
        .then(res => {
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              // 关闭模态框
              this.changeOfficeInfo_visiable = false;
              // 重置表单
              this.changeOfficeInfo_form = {};
              // 更新数据
              this.getOfficeList_fun();
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 变更宿舍信息
    changeDormitoryInfo_fun() {
      if ("leader_id" in this.changeDormitoryInfo_form) {
        this.changeDormitoryInfo_form.leader_id = this.changeDormitoryInfo_form.leader_id[0];
      }
      console.log("变更宿舍信息", this.changeDormitoryInfo_form);
      this.$http
        .post(
          `${this.url}/v1.0/market/dormitory/houseUpdate`,
          this.changeDormitoryInfo_form
        )
        .then(res => {
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              // 关闭模态框
              this.changeDormitoryInfo_visiable = false;
              // 重置表单
              this.changeDormitoryInfo_form = {};
              // 更新数据
              this.getDormitoryList_fun();
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 办公室记录修改
    officeRecordMerge_fun(operator, id) {
      this.officeRecordMerge_visiable = true;
      this.officeRecordMerge_form.content = operator.operate_content.content;
      this.officeRecordMerge_form.end_at = operator.operate_content.end_at;
      this.officeRecordMerge_form.start_at = operator.operate_content.start_at;
      this.officeRecordMerge_form.id = id;
      // console.log(this.officeRecordMerge_form);
    },
    // 办公室记录确认修改
    officeRecordMerge_fun_confirm() {
      this.$http
        .post(
          `${this.url}/v1.0/market/dormitory/remarks`,
          this.officeRecordMerge_form
        )
        .then(res => {
          switch (res.success) {
            case true:
              this.officeRecordMerge_visiable = false;
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 宿舍记录修改
    dormitoryRecordMerge_fun(operator, id) {
      console.log(operator);
      this.dormitoryRecordMerge_visiable = true;
      this.dormitoryRecordMerge_form.content = operator.operate_content.content;
      this.dormitoryRecordMerge_form.end_at = operator.operate_content.end_at;
      this.dormitoryRecordMerge_form.start_at =
        operator.operate_content.start_at;
      this.dormitoryRecordMerge_form.live_time =
        operator.operate_content.live_time;
      this.dormitoryRecordMerge_form.out_time =
        operator.operate_content.out_time;
      this.dormitoryRecordMerge_form.id = id;
      // console.log(this.dormitoryRecordMerge_form);
    },
    // 宿舍记录确认修改
    dormitoryRecordMerge_fun_confirm() {
      this.$http
        .post(
          `${this.url}/v1.0/market/dormitory/remarks`,
          this.dormitoryRecordMerge_form
        )
        .then(res => {
          switch (res.success) {
            case true:
              this.dormitoryRecordMerge_visiable = false;
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 取消宿舍
    cancelDormitory_fun() {
      console.log("取消宿舍", this.cancelDormitory_form);
      this.$http
        .post(
          `${this.url}/v1.0/market/dormitory/delete`,
          this.cancelDormitory_form
        )
        .then(res => {
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              // 关闭模态框
              this.cancel_dormitory_visiable = false;
              // 更新数据
              this.getDormitoryList_fun();
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 添加宿舍入住人员
    add_dormitory_member_fun() {
      let data = Object.assign({}, this.add_dormitory_member_form, {
        operate_type: 2
      });
      console.log("添加宿舍入住人员", data);
      this.$http
        .post(`${this.url}/v1.0/market/dormitory/addGuest`, data)
        .then(res => {
          switch (res.success) {
            case true:
              this.$LjMessage("success", {
                title: "成功",
                msg: res.message
              });
              // 关闭模态框
              this.add_dormitory_member_visiable = false;
              // 更新数据
              this.getDormitoryList_fun();
              // 重置表单
              this.add_dormitory_member_form = {};
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 处理办公室管理数据列表的点击事件
    // 根据event来判断具体事件
    handle_office(row, column, event) {
      console.log(row);
      if (event.target.innerText === "取消办公室") {
        // 显示
        this.cancelOffice_visiable = true;
        // 写入取消办公是的表单数据
        this.cancelOffice_form.id = row.id;
        this.cancelOffice_form.house_name = row.house_name;
        this.cancelOffice_form.end_at = row.end_at;
      } else if (event.target.innerText === "变更信息") {
        this.changeOfficeInfo_visiable = true;
        this.changeOfficeInfo_form.house_id = row.house_id;
        this.changeOfficeInfo_form.house_name = row.house_name;
        this.changeOfficeInfo_form.id = row.id;
        this.changeOfficeInfo_form.office_type = row.office_type.toString();
        this.changeOfficeInfo_form.depart_id = [row.depart_id];
        this.changeOfficeInfo_form.leader_id = row.leader_id;
        this.changeOfficeInfo_form.office_num = row.office_num;
        this.changeOfficeInfo_form.remarks = row.remarks;
        this.changeOfficeInfo_form.start_time = row.start_at;
      }
    },
    // 办公室双击
    dblclick_office(row) {
      // 办公室记录
      this.officeRecord_visiable = true;
      this.rowData = JSON.parse(JSON.stringify(row));
      // 获取申请人信息
      // this.$http
      //   .get(`${this.url}/v1.0/market/dormitory/detail`, { id: row.id })
      //   .then(res => {
      //     switch (res.success) {
      //       case true:
      //         this.rowData.applicant=res.data.applicant;
      //         break;
      //       default:
      //         this.$LjMessage("error", {
      //           title: "失败",
      //           msg: res.message
      //         });
      //         break;
      //     }
      //   });
    },
    // 处理宿舍的点击事件
    handle_dormitory(row, column, event) {
      if (event.target.innerText === "添加入住人员") {
        console.log("添加入住人员");
        this.add_dormitory_member_visiable = true;
        this.add_dormitory_member_form.house_name = row.house_name;
        this.add_dormitory_member_form.house_id = row.house_id;
        this.add_dormitory_member_form.live_num = row.live_num;
        this.add_dormitory_member_form.last_bed = row.last_bed;
      } else if (event.target.innerText === "取消宿舍") {
        console.log("取消宿舍");
        this.cancel_dormitory_visiable = true;
        this.cancelDormitory_form.house_name = row.house_name;
        this.cancelDormitory_form.live_num = row.live_num;
        this.cancelDormitory_form.id = row.id;
        this.cancelDormitory_form.end_at = row.end_at;
      } else if (event.target.innerText === "变更信息") {
        console.log("变更信息");
        this.changeDormitoryInfo_visiable = true;
        this.changeDormitoryInfo_form.id = row.id;
      }
    },
    // 宿舍双击
    dblclick_dormitory(row) {
      console.log("宿舍记录");
      this.dormitoryRecord_visiable = true;
      this.rowData = JSON.parse(JSON.stringify(row));
    },
    // 格式化办公室类型
    format_office_type(row, column, cellValue, index) {
      switch (cellValue) {
        case 1:
          return "临时";
          break;
        case 2:
          return "正式";
          break;
      }
    },
    // 显示具体的图片
    showPictureList(row) {
      this.$http
        .get(`${this.url}/v1.0/market/dormitory/detail`, { id: row.id })
        .then(res => {
          switch (res.success) {
            case true:
              this.imgData = Object.values(res.data.album);
              // 如果有图
              if (this.imgData.length > 0) {
                this.imgSlider_visiable = true;
              } else {
                // 如果没图
                this.$LjMessage("error", {
                  title: "失败",
                  msg: "暂无图片"
                });
              }
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 获取入住人员列表
    getGuest(id, house_id) {
      // 显示入住人员详情
      this.dormitory_member_list_visiable = true;
      this.$http
        .get(`${this.url}/v1.0/market/dormitory/detail`, { id: id })
        .then(res => {
          switch (res.success) {
            case true:
              this.$set(this.guestList, "list", res.data.guest);
              this.guestList.house_id = house_id;
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 员工离开宿舍
    guestLeave(guest) {
      this.dormitory_member_leave_visiable = true;
      this.dormitory_member_leave_form.guest_name = guest.guest_name;
      this.dormitory_member_leave_form.house_id = this.guestList.house_id;
      this.dormitory_member_leave_form.guest_ids = [guest.guest_id];
    },
    // 确认离开宿舍
    guestLeave_confirm() {
      let data = Object.assign(
        {},
        {
          operate_type: 3
        },
        this.dormitory_member_leave_form
      );
      // console.log(data);
      this.$http
        .post(`${this.url}/v1.0/market/dormitory/deleteGuest`, data)
        .then(res => {
          console.log(res);
          switch (res.success) {
            case true:
              this.dormitory_member_leave_visiable = false;
              break;
            default:
              this.$LjMessage("error", {
                title: "失败",
                msg: res.message
              });
              break;
          }
        });
    },
    // 非高级搜索分页事件
    current_change_common(page) {
      switch (this.activeIndex) {
        case 0:
          // 办公室
          this.commonPages.page = page;
          this.getOfficeList_fun();
          break;
        case 1:
          // 宿舍
          this.commonPages.page = page;
          this.getDormitoryList_fun();
          break;
      }
    },
    // 高级搜索分页事件
    current_change_high(page) {
      switch (this.activeIndex) {
        case 0:
          // 办公室
          this.highPages.page = page;
          this.getOfficeList_fun();
          break;
        case 1:
          // 宿舍
          this.highPages.page = page;
          this.getDormitoryList_fun();
          break;
      }
    }
  }
};
</script>

<style lang="scss">
#theme_name.theme1 {
  #officeDormitory {
    .el-table__body .el-table__row td:nth-child(1) .cell {
      overflow: initial;
    }
    .el-table__body-wrapper {
      overflow: initial;
    }
  }
  .el-form-item__label {
    color: #d5d5d8;
  }
}
</style>

<style scoped lang="scss">
@import "../../../../assets/scss/humanResource/repository/officeDormitory/index.scss";
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
@mixin officeImg($m, $n) {
  $url: "../../../../assets/image/humanResource/repository/officeDormitory/" +
    $n + "/" + $m;
  @include bgImage($url);
}
#theme_name.theme1 {
  #officeDormitory {
    .main-nav {
      .isActive {
        @include childrenImg("teji.png", "theme1");
      }
    }
    #workInfo {
      .tip-icon {
        @include officeImg("shouqi.png", "theme1");
      }
    }
    .operation-box {
      ul.erji {
        li:hover {
          @include officeImg("qxbgs.png", "theme1");
        }
      }
    }
    .office-container,
    .dormitory-container {
      .photo-img {
        @include childrenImg2("tp.png", "theme1");
      }
    }
  }
}

#theme_name.theme2 {
  #officeDormitory {
  }
}

#theme_name.theme3 {
  #officeDormitory {
  }
}

#theme_name.theme4 {
  #officeDormitory {
  }
}
</style>
