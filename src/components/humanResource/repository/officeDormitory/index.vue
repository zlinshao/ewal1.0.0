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
    <div class="office-container" v-if="activeIndex == 0">
      <el-table
        highlight-current-row
        header-row-class-name="tableHeader"
        height="670px"
        :data="officeList"
        @row-click="handle_office"
      >
        <el-table-column align="center" width="60">
          <template slot-scope="scope">
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
        <el-table-column label="照片" align="center" prop=""></el-table-column>
        <el-table-column label="收房价格" align="center" prop="suggest_price"></el-table-column>
        <el-table-column label="人均价格" align="center" prop="average_price"></el-table-column>
        <el-table-column label="部门人数" align="center" prop="office_num"></el-table-column>
        <el-table-column label="办公室类型" align="center" prop="office_type"></el-table-column>
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
    <div class="dormitory-container" v-if="activeIndex == 1">
      <el-table
        highlight-current-row
        header-row-class-name="tableHeader"
        height="670px"
        :data="dormitoryList"
        @row-click="handle_dormitory"
      >
        <el-table-column align="center" width="60">
          <template slot-scope="scope">
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
        <el-table-column label="房屋地址" align="center" prop="housrAddress"></el-table-column>
        <el-table-column label="小区地址" align="center" prop="communityAddress"></el-table-column>
        <el-table-column label="房型" align="center" prop="houseType"></el-table-column>
        <el-table-column label="面积" align="center" prop="area"></el-table-column>
        <el-table-column label="装修" align="center" prop="decorate"></el-table-column>
        <el-table-column label="房屋类型" align="center" prop="buildingType"></el-table-column>
        <el-table-column label="照片" align="center" prop="photo"></el-table-column>
        <el-table-column label="收房价格" align="center" prop="housePrice"></el-table-column>
        <el-table-column label="人均价格" align="center" prop="perPersonPrice"></el-table-column>
        <el-table-column label="当前入住人数" align="center" prop></el-table-column>
        <el-table-column label="剩余床位" align="center" prop></el-table-column>
        <el-table-column label="开始时间" align="center" prop="startTime"></el-table-column>
        <el-table-column label="结束时间" align="center" prop="endTime"></el-table-column>
        <el-table-column label="片区经理" align="center" prop="areaManager"></el-table-column>
        <el-table-column label="部门" align="center" prop></el-table-column>
      </el-table>
    </div>

    <!-- 下方滑动展示区域 -->
    <div id="workInfo">
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
    </div>

    <!-- 分页,两个分类共用一个分页 -->
    <div class="page flex-center">
      <el-pagination
        :total="pages.total"
        layout="total,jumper,prev,pager,next"
        :current-page="pages.page"
        :page-size="pages.limit"
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
            <span>审批编号: 00001</span>
            <span>申请人: 张三</span>
            <span>申请时间: 2019-04-01</span>
          </div>
        </div>
        <ul class="basicInfo">
          <li>
            <span>房屋地址</span>范德萨发达
          </li>
          <li>
            <span>办公室类型</span>豆腐干地方
          </li>
          <li>
            <span>小区地址</span>公司的故事
          </li>
          <li>
            <span>片区经理</span>的风格
          </li>
          <li>
            <span>房型</span>重新
          </li>
          <li>
            <span>部门</span>梵蒂冈地方
          </li>
        </ul>
        <div class="dialog_body">
          <el-timeline>
            <!-- <el-timeline-item v-for="(activity, index) in timeLines" :key="index"> -->
            <el-timeline-item>
              <div class="timeLines-detail-box">
                <div class="txt">
                  <p>2019-04-01 张一</p>
                  <p>开始时间：2019-04-01 创建办公室</p>
                  <p>备注：123456</p>
                </div>
                <div class="merge" @click="officeRecordMerge_visiable=true">修改</div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
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
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="officeRecordMerge_form.starttime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="取消时间">
              <el-date-picker
                v-model="officeRecordMerge_form.canceltime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="officeRecordMerge_form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
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
              <el-input readonly placeholder="获取的房屋地址"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
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
              <house-community :style="{width:100+'%'}" @getHouseIdName="getHouseId_change_office"></house-community>
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
              <el-input v-model="changeOfficeInfo_form.office_num" value="25"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <div class="items-center iconInput">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="changeOfficeInfo_form.start_at"
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
            <el-form-item label="片区经理">
              <user-choose title="请选择人员" v-model="addDormitory_form.leader_id" num="1"></user-choose>
            </el-form-item>
            <el-form-item label="开始时间">
              <div class="items-center iconInput">
                <el-date-picker type="date" placeholder="选择日期" v-model="addDormitory_form.start_at"></el-date-picker>
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
              <el-input placeholder="获取的房屋地址" readonly></el-input>
            </el-form-item>
            <el-form-item label="当前入住人数">
              <el-input placeholder="获取的入住人数" readonly></el-input>
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
            <span>审批编号: 00001</span>
            <span>申请人: 张三</span>
            <span>申请时间: 2019-04-01</span>
          </div>
        </div>
        <ul class="basicInfo">
          <li>
            <span>房屋地址</span>范德萨发达
          </li>
          <li>
            <span>当前入住人数</span>3
          </li>
          <li>
            <span>小区地址</span>公司的故事
          </li>
          <li>
            <span>剩余床位数</span>1
          </li>
          <li>
            <span>房型</span>重新
          </li>
          <li>
            <span>片区经理</span>自诩大多数的
          </li>
        </ul>
        <div class="dialog_body">
          <el-timeline>
            <!-- <el-timeline-item v-for="(activity, index) in timeLines" :key="index"> -->
            <el-timeline-item>
              <div class="timeLines-detail-box">
                <div class="txt">
                  <p>2019-04-01 张一</p>
                  <p>开始时间：2019-04-01 创建宿舍</p>
                  <p>备注：123456</p>
                </div>
                <div class="merge" @click="dormitoryRecordMerge_visiable=true">修改</div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
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
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.starttime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="取消时间">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.canceltime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="入住时间">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.ruzhu"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="离宿时间">
              <el-date-picker
                v-model="dormitoryRecordMerge_form.lisultime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dormitoryRecordMerge_form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
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
              <el-input placeholder="获取的房屋地址" readonly></el-input>
            </el-form-item>
            <el-form-item label="当前入住人数">
              <el-input placeholder="获取的入住人数" readonly></el-input>
            </el-form-item>
            <el-form-item label="取消时间">
              <el-date-picker
                v-model="add_dormitory_member_form.end_at"
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
            <dd>
              <span>反对犯得上</span>
              <span>756756</span>
              <span>2019.4.76</span>
              <span>
                <el-button type="danger" plain size="small">离宿</el-button>
              </span>
            </dd>
          </dl>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="changeDormitoryInfo_fun">确定</el-button>
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
              <el-input type="text" readonly v-model="dormitory_member_leave_form.name"></el-input>
            </el-form-item>
            <el-form-item label="离宿时间">
              <el-date-picker
                v-model="dormitory_member_leave_form.lisultime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dormitory_member_leave_form.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="dormitory_member_leave_fun">确定</el-button>
          <el-button type="info" size="small" @click="dormitory_member_leave_visiable=false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 宿舍的高级搜索选项 -->
    <searchHigh
      class="searchDormitory"
      :module="searchDormitory_visiable"
      :show-data="DormitorySearchData"
      @close="closeSearchDormitory"
    ></searchHigh>
  </div>
</template>

<script>
import LjDialog from "../../../common/lj-dialog.vue";
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
    searchHigh
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
        remarks: "" //备注
      },
      // 新增宿舍的表单
      addDormitory_form: {
        house_type: 2,
        house_id: "",
        leader_id: "", //负责人id
        bed_num: "", //床位
        start_at: "",
        remarks: "",
        operate_type: 1
      },
      // 办公室详情的数据
      officeList: [
        // {
        //   housrAddress: "1",
        //   communityAddress: "2",
        //   houseType: "3",
        //   area: "4",
        //   decorate: "5",
        //   buildingType: "5",
        //   photo: "6",
        //   housePrice: "7",
        //   perPersonPrice: "8",
        //   departmentPersonNum: "9",
        //   officeType: "10",
        //   startTime: "11",
        //   endTime: "12",
        //   areaManager: "13"
        // },
        // {
        //   housrAddress: "32131",
        //   communityAddress: "656",
        //   houseType: "787",
        //   area: "fd54",
        //   decorate: "bv87",
        //   buildingType: "g3",
        //   photo: "6fdgf",
        //   housePrice: "776575gfd",
        //   perPersonPrice: "8dfsad",
        //   departmentPersonNum: "9fdsfsd",
        //   officeType: "10fdgd",
        //   startTime: "11edas",
        //   endTime: "12dasdag",
        //   areaManager: "13jh"
        // }
      ],
      // 宿舍详情的数据
      dormitoryList: [
        {
          housrAddress: "1",
          communityAddress: "2",
          houseType: "3",
          area: "4",
          decorate: "5",
          buildingType: "5",
          photo: "6",
          housePrice: "7",
          perPersonPrice: "8",
          departmentPersonNum: "9",
          officeType: "10",
          startTime: "11",
          endTime: "12",
          areaManager: "13"
        },
        {
          housrAddress: "32131",
          communityAddress: "656",
          houseType: "787",
          area: "fd54",
          decorate: "bv87",
          buildingType: "g3",
          photo: "6fdgf",
          housePrice: "776575gfd",
          perPersonPrice: "8dfsad",
          departmentPersonNum: "9fdsfsd",
          officeType: "10fdgd",
          startTime: "11edas",
          endTime: "12dasdag",
          areaManager: "13jh"
        }
      ],
      // 控制取消办公室显示
      cancelOffice_visiable: false,
      // 取消办公室的表单信息
      cancelOffice_form: {
        operate_type: 4,
        id: "", //根据列表传入
        house_type: "", //根据列表传入,也可以写死
        end_at: "",
        remarks: ""
      },
      // 取消宿舍的显示
      cancel_dormitory_visiable: false,
      // 取消宿舍的表单信息
      cancelDormitory_form: {
        id: "",
        end_at: "",
        remarks: ""
      },
      // 控制添加宿舍人员显示
      add_dormitory_member_visiable: false,
      // 控制添加宿舍人员的表单
      add_dormitory_member_form: {},
      // 控制更改办公室信息显示
      changeOfficeInfo_visiable: false,
      // 更改办公室信息的表单
      changeOfficeInfo_form: {
        house_type: 1, //房屋类型（办公室还是宿舍）
        house_id: "", //房屋id
        office_type: "", //办公室类型
        operate_type: 1, //操作类型
        depart_id: "", //部门id
        office_num: "", //部门人数
        start_at: "", //开始时间
        remarks: "" //备注
      },
      // 控制更改宿舍信息的修改显示
      changeDormitoryInfo_visiable: false,
      changeDormitoryInfo_form: {
        house_id: "",
        bed_num: "",
        leader_id: "",
        remarks: ""
      },
      // 控制办公室记录
      officeRecord_visiable: false,
      // 控制办公室记录中的修改
      officeRecordMerge_visiable: false,
      // 办公室记录中的修改的表单数据
      officeRecordMerge_form: {
        starttime: "",
        canceltime: "",
        desc: ""
      },
      // 控制宿舍记录的显示
      dormitoryRecord_visiable: false,
      // 控制宿舍记录中的修改
      dormitoryRecordMerge_visiable: false,
      dormitoryRecordMerge_form: {
        starttime: "",
        canceltime: "",
        desc: ""
      },
      // 控制宿舍入住人员详情的显示
      dormitory_member_list_visiable: false,
      // 控制确认离宿显示
      dormitory_member_leave_visiable: false,
      dormitory_member_leave_form: {},
      // 办公室高级搜索的表单
      // searchOffice_form: {
      //   where: "",
      //   leader_id: "",
      //   depart_id: "",
      //   priceMin: "",
      //   priceMax: "",
      //   start_time: "",
      //   end_time: "",
      //   type: ""
      // },
      officeSearchData: officeHightSearch,
      // 宿舍高级搜索的data
      DormitorySearchData: dormitoryHightSearch,
      showCharts: false,
      periodChoosed: 0,
      // 分页信息
      pages: {
        page: 1,
        limit: 8,
        total: 20
      },
      // 时间线的数据
      timeLines: [
        {
          //   "id": 231,
          //   "operator_id": 2876,
          //   "operator_name": "刘钦崇",
          //   "depart_name": "南京三区一组",
          //   "depart_id": 453,
          //   "operate_content": "{\"guests\": [], \"content\": \"添加人员\"}",
          //   "dorm_id": 147,
          //   "operate_time": "2018-11-15",
          //   "operate_type": 2,
          //   "remarks": "阿斯蒂芬",
          //   "deleted_at": null
          // },
          // {
          //   "id": 232,
          //   "operator_id": 2876,
          //   "operator_name": "刘钦崇",
          //   "depart_name": "南京三区一组",
          //   "depart_id": 453,
          //   "operate_content": "{\"content\": \"更新宿舍\"}",
          //   "dorm_id": 147,
          //   "operate_time": "2018-11-15",
          //   "operate_type": 5,
          //   "remarks": "发多少",
          //   "deleted_at": null
        }
      ]
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
    closeSearchOffice: function(val) {
      console.log(val);
      this.$emit("closeSearchOffice", false);
    },
    closeSearchDormitory: function(val) {
      console.log(val);
      this.$emit("closeSearchDormitory", false);
    },
    // 新增办公室
    addOffice_fun() {
      console.log("新增办公室", this.addOffice_form);
      this.$http
        .post(`${this.url}/v1.0/market/dormitory/add`, this.addOffice_form)
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
      this.addDormitory_form.leader_id = this.addDormitory_form.leader_id[0];
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
    getOfficeList_fun() {
      let data = {
        house_type:1,
        page:this.pages.page,
        limit:this.pages.limit
      };
      this.$http.get(`${this.url}/v1.0/market/dormitory/list`,data).then(res => {
        console.log("办公室列表", res.data);
        // 设置页数
        this.pages.total=res.data.count;
        // 渲染具体数据
        this.officeList=res.data.data;
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
      console.log(val);
      this.changeDormitoryInfo_form.house_id = val.house_id;
    },
    // 取消办公室
    cancelOffice_fun() {
      console.log("取消办公室", this.cancelOffice_form);
    },
    // 变更办公室信息
    changeOfficeInfo_fun() {
      console.log("变更办公室信息", this.changeOfficeInfo_form);
    },
    // 变更宿舍信息
    changeDormitoryInfo_fun() {
      console.log("变更宿舍信息", this.changeDormitoryInfo_form);
    },
    // 取消宿舍
    cancelDormitory_fun() {
      console.log("取消宿舍", this.cancelDormitory_form);
    },
    // 添加宿舍入住人员
    add_dormitory_member_fun() {
      console.log("添加宿舍入住人员", this.add_dormitory_member_form);
    },
    // 确认离开操作
    dormitory_member_leave_fun() {
      console.log("确认离宿操作");
    },
    // 办公室高级搜索事件
    officeSearch_fun() {
      console.log(this.officeSearchData);
    },
    // 处理办公室管理数据列表的点击事件
    // 根据event来判断具体事件
    handle_office(row, column, event) {
      // console.log(event)
      if (event.target.innerText === "取消办公室") {
        console.log("取消办公室");
        this.cancelOffice_visiable = true;
      } else if (event.target.innerText === "变更信息") {
        console.log("变更信息");
        this.changeOfficeInfo_visiable = true;
      } else {
        // 办公室记录
        console.log("办公室记录");
        this.officeRecord_visiable = true;
      }
    },
    // 处理宿舍的点击事件
    handle_dormitory(row, column, event) {
      if (event.target.innerText === "添加入住人员") {
        console.log("添加入住人员");
        this.add_dormitory_member_visiable = true;
      } else if (event.target.innerText === "取消宿舍") {
        console.log("取消宿舍");
        this.cancel_dormitory_visiable = true;
      } else if (event.target.innerText === "变更信息") {
        console.log("变更信息");
        this.changeDormitoryInfo_visiable = true;
      } else {
        console.log("宿舍记录");
        this.dormitoryRecord_visiable = true;
      }
    }
  }
};
</script>

<style lang="scss">
#theme_name.theme1 {
  #officeDormitory {
    .el-table__body .el-table__row .cell {
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
