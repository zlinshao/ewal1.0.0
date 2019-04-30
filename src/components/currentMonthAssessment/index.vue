<template>
  <div id="currentMonthAssessment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <h2>本月考核</h2>
      </div>
      <div class="items-center listTopRight">
        <div class="daochu"></div>
        <div class="icons search" @click="showHighSearch()"></div>
      </div>
    </div>
    <div class="currentMonthAssessmentContainer changeChoose">
      <div class="containerTop">
        <button @click="sendKpi()">KPI确认</button>
        <div></div>
        <h2 @click="selectAll()">全选</h2>
      </div>
      <el-table highlight-current-row header-row-class-name="tableHeader" :data="kpiList" height="650px" ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="姓名" align="center" prop="name"></el-table-column>
        <el-table-column label="部门" align="center" prop='department'></el-table-column>
        <el-table-column v-for="(item,index) in days" :key="index" :label="item.toString()" :prop="item.toString()"
          align="center" width="40px">
          <template slot-scope="scope">
            <div @click="showKpiDetail(scope.row,item)" :class="scope.row.objectionDay.indexOf(item) !== -1?'is_appeal':''">{{
              scope.row[item.toString()]}}</div>
            <!-- <div @click="showKpiDetail(scope.row,item)">{{ scope.row[item.toString()]}}</div> -->
          </template>
        </el-table-column>
        <el-table-column label="发送状态" align="center" prop='sendStatus'>
          <template slot-scope="scope">
            <el-button plain type="primary" size="small" v-if="scope.row.sendStatus=== 0">未发送</el-button>
            <el-button plain type="danger" size="small" v-if="scope.row.sendStatus=== 2">发送失败</el-button>
            <el-button plain type="success" size="small" v-if="scope.row.sendStatus=== 1">已发送</el-button>
          </template>
        </el-table-column>
        <el-table-column label="确认状态" align="center" prop='confirmStatus'>
          <template slot-scope="scope">
            <el-button plain size="small" background="rgba(10,31,68,1)" v-if="scope.row.confirmStatus=== 0">未确认</el-button>
            <el-button plain type="success" size="small" v-if="scope.row.confirmStatus=== 2">有异议</el-button>
            <el-button plain type="danger" size="small" v-if="scope.row.confirmStatus=== 1">已确认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page flex-center">
      <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="currentPage" :page-size="9"></el-pagination>
    </div>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule()"></SearchHigh>

    <el-dialog :visible.sync="sendTodoList" :show-close="false" width="400px" top="300px" center>
      <span class="flex-center">月度KPI统计将发送至对应员工待办</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="confirmSendKpi()">确定</el-button>
        <el-button size="small" type="info" @click="sendTodoList = false">取消</el-button>
      </span>
    </el-dialog>
    <lj-dialog :visible="kpi_detail_visible" :size="{width: 800 + 'px',height: 700 + 'px'}" @close="kpi_detail_visible = false">
      <div class="dialog_container borderNone">
        <div class="dialog_header">
          <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
              <img :src="imgUrl" />
              <div>
                <h3 class="personName">{{staffName}}</h3>
                <h3 class="timeInfo">{{staffDepartment}}</h3>
              </div>
            </div>
            <div class="items-right listTopRight">
              <div>
                <h3 class="personName">KPI总得分<span>{{fullScore}}分</span></h3>
                <h3 class="timeInfo">{{date}}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_main">
          <el-table highlight-current-row header-row-class-name="tableHeader" :data="kpiDetail">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-card>{{ scope.row.kpi_comment[0].content }}</el-card>
              </template>
            </el-table-column>

            <el-table-column label="考核项" align="center" prop="standardName"></el-table-column>
            <el-table-column label="指标值" align="center" prop="full_mark"></el-table-column>
            <el-table-column label="得分" align="center" prop="actual_score"></el-table-column>
            <el-table-column label="状态" align="center" prop="is_appeal">
              <template slot-scope="scope" v-if="scope.row.is_appeal == 1">
                <el-button plain type="danger" size="small">有异议</el-button>
              </template>
            </el-table-column>

            <el-table-column align="center" prop='sendStatus'>
              <template slot-scope="scope">
                <el-button plain type="success" size="small" @click="modifyKpi(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="confirmKpi()">确定</el-button>
          <el-button size="mini" type="info" @click="kpi_detail_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <lj-dialog :visible="kpi_modify_visible" :size="{width: 600 + 'px',height: 500 + 'px'}" @close="kpi_modify_visible = false">
      <div class="dialog_container borderNone">
        <div class="dialog_header">
          <h3>修改</h3>
        </div>
        <div class="dialog_main">
          <el-form ref="form" label-width="80px">
            <el-form-item label="考核项">
              <div>{{standardName}}</div>
            </el-form-item>
            <el-form-item label="原始得分">
              <div>{{oldScore}}</div>
            </el-form-item>
            <el-form-item label="现得分">
              <el-input v-model="currentScore"></el-input>
            </el-form-item>
            <el-form-item label="修改原因">
              <el-input type="textarea" v-model="modifyReason"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="mini" type="danger" @click="modifyConfirm()">确定</el-button>
          <el-button size="mini" type="info" @click="kpi_modify_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
import SearchHigh from '../common/searchHigh.vue';
import ljDialog from '../common/lj-dialog';
import { currentMonthAssessmentSearch } from "../../assets/js/allSearchData.js"
export default {
  name: "index",
  components: {
    SearchHigh,
    ljDialog
  },
  data () {
    return {
      currentMonthAssessmentSearch,
      url: globalConfig.kpi,
      showSearch: false,
      total: 0,
      currentPage: 1,
      searchData: {},
      sendTodoList: false,
      kpi_detail_visible: false,
      kpi_modify_visible: false,
      imgUrl: '',
      staffName: '',
      staffDepartment: '',
      fullScore: 0,
      date: "",
      standardName: '',
      oldScore: 0,
      currentScore: 0,
      standarId: 0,
      month_day_id: 0,
      modifyReason: '',
      kpiList: [],
      kpiDetail: [],
      row: {},
      item: 0,
      multipleSelection: [],
      getKpiListParam: {}
    }
  },
  mounted () {
    this.getKpiList();
  },
  computed: {
    days: function getPreMonthDate () {
      let times = new Date();
      let Y = times.getFullYear();
      let M = times.getMonth();
      let dateArr = [];
      if (M == 0 || M == 1 || M == 3 || M == 5 || M == 7 || M == 8 || M == 10 || M == 12) {
        for (let i = 1; i <= 31; i++) {
          dateArr[i - 1] = i;
        }
      }
      else if (M == 4 || M == 6 || M == 9 || M == 11) {
        for (let i = 1; i <= 30; i++) {
          dateArr[i - 1] = i;
        }
      }
      else {
        if (((Y % 4) == 0) && ((Y % 100) != 0) || ((Y % 400) == 0)) {
          for (let i = 1; i <= 29; i++) {
            dateArr[i - 1] = i;
          }
        } else {
          for (let i = 1; i <= 28; i++) {
            dateArr[i - 1] = i;
          }
        }
      }
      return dateArr
    }
  },
  watch: {
    currentPage () {
      this.getKpiList();
    }
  },
  methods: {
    getKpiList: function () {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      if (month == 0) {
        month = 12;
        year = year - 1
      }


      this.getKpiListParam.month = new Date(`${year}-${month}`)
      this.getKpiListParam.page = this.currentPage
      this.getKpiListParam.limit = 9
      this.kpiList = []
      this.$http.get(`${this.url}/kpi/month_day`, this.getKpiListParam).then(res => {
        if (res.status == 200) {
          this.total = res.data.length
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              id: res.data[i].id,
              staff_id: res.data[i].staff_id,
              month: res.data[i].month,
              name: res.data[i].staff_name.name,
              department: res.data[i].org_name.name,
              sendStatus: res.data[i].send_status,
              confirmStatus: res.data[i].result
            }
            this.handleKpi(obj, res.data[i].kpi)
            let objection_date = res.data[i].objection_date ? res.data[i].objection_date : []
            let objectionDay = []
            if (objection_date.length > 0) {
              for (let j = 0; j < objection_date.length; j++) {
                let strday = objection_date[j].split("-")[2].substring(0, 1) == '0' ? objection_date[j].split("-")[2].substring(1) : objection_date[j].split("-")[2]
                let intday = Number(strday)
                objectionDay.push(intday)
              }
            }
            obj.objectionDay = objectionDay
            this.kpiList.push(obj)
          }
        }
      })
    },
    showKpiDetail: function (row, day) {
      this.row = row
      this.item = day
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      if (month == 0) {
        month = 12;
        year = (year - 1).toString()
      } else {
        year = year.toString()
      }
      if (month.toString().length == 1) {
        month = "0" + month.toString();
      } else {
        month = month.toString()
      }
      if (day.toString().length == 1) {
        day = "0" + day.toString();
      } else {
        day = day.toString();
      }
      this.staffName = row.name
      this.staffDepartment = row.department
      let param = {
        staff_id: row.staff_id,
        checked_at: new Date(`${year}-${month}-${day}`),
        month_day_id: row.id
      }
      this.date = `${year}-${month}-${day}`
      this.$http.get(`${this.url}/kpi`, param).then(res => {
        this.kpiDetail = []
        if (res.status == 200) {
          this.imgUrl = res.extend.avatar
          for (var i = 0; i < res.data.length; i++) {
            let obj = {
              id: res.data[i].id,
              standardName: res.data[i].standard.name,
              full_mark: res.data[i].standard.full_mark,
              actual_score: res.data[i].actual_score,
              is_appeal: res.data[i].is_appeal,
              kpi_comment: res.data[i].kpi_comment
            }
            this.kpiDetail.push(obj)
          }
          this.fullScore = 0
          for (var j = 0; j < this.kpiDetail.length; j++) {
            this.fullScore += this.kpiDetail[j].actual_score
          }
          this.month_day_id = res.extend.month_day_id
          this.kpi_detail_visible = true
        }
      })
    },
    modifyKpi: function (row) {
      this.standardName = row.standardName
      this.oldScore = row.actual_score
      this.currentScore = 0
      this.standarId = row.id
      this.kpi_modify_visible = true
    },
    modifyConfirm: function () {
      let param = {
        month_day_id: this.month_day_id,
        actual_score: this.currentScore,
        remarks: this.modifyReason
      }
      this.$http.put(`${this.url}/kpi/${this.standarId}`, param).then(res => {
        if (res.status == 200) {
          this.kpi_modify_visible = false
          this.showKpiDetail(this.row, this.item)
        }
      })
    },
    confirmKpi: function () {
      this.getKpiList();
      this.kpi_detail_visible = false
    },
    handleSelectionChange (row) {
      this.multipleSelection = row;
    },
    selectAll: function () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    sendKpi: function () {
      if (this.multipleSelection.length > 0) {
        this.sendTodoList = true
      } else {
        this.$LjNotify('error', {
          title: '失败',
          message: '请选择发送员工',
        });
      }
    },
    confirmSendKpi: function () {
      let param = {
        send_ids: []
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        param.send_ids.push(this.multipleSelection[i].id)
      }
      this.$http.post(`${this.url}/kpi/send`, param).then(res => {
        if (res.status == 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: '发送成功',
          });
          this.kpiList = []
          this.getKpiList();
        }
      })
      this.sendTodoList = false
    },
    handleKpi: function (obj, kpi) {
      for (var i = 0; i < kpi.length; i++) {
        let time = kpi[i].checked_at.toString()
        let strTime = time.substring(time.length - 2)
        if (strTime.substring(0, 1) == '0') {
          strTime = strTime.substring(1)
        }
        let intTime = parseInt(strTime)
        for (var j = 0; j < this.days.length; j++) {
          if (intTime == this.days[j]) {
            obj[strTime] = kpi[i].staff_score
          }
        }
      }
    },
    showHighSearch: function () {
      this.showSearch = true
      this.searchData = this.currentMonthAssessmentSearch
    },
    hiddenModule: function (val) {
      this.showSearch = false
      if (val !== 'close') {
        if (val.sendStatus !== "") {
          this.getKpiListParam.send_status = val.sendStatus
        } else {
          delete this.getKpiListParam.send_status
        }
        if (val.confirmStatus !== "") {
          this.getKpiListParam.result = val.confirmStatus
        }
        else {
          delete this.getKpiListParam.result
        }
        this.getKpiList();
      }
    }
  },
}
</script>

<style>
.is_appeal {
  color: red;
}
</style>


<style lang="scss" scoped>
@import "../../assets/scss/currentMonthAssessment/index.scss";

@mixin currentMonthAssessmentImg($m, $n) {
  $url: "../../assets/image/currentMonthAssessment/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #currentMonthAssessment {
    .listTopRight {
      .daochu {
        @include currentMonthAssessmentImg("daochu.png", "theme1");
      }
    }
  }
}

#theme_name.theme2 {
  #currentMonthAssessment {
  }
}

#theme_name.theme3 {
  #currentMonthAssessment {
  }
}

#theme_name.theme4 {
  #currentMonthAssessment {
  }
}
</style>
