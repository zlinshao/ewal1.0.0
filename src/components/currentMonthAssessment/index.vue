<template>
  <div id="currentMonthAssessment">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <h2>本月考核</h2>
      </div>
      <div class="items-center listTopRight">
        <div class="daochu"></div>
        <div class="icons search" @click="highSearch()"></div>
      </div>
    </div>
    <div class="currentMonthAssessmentContainer">
      <div class="containerTop">
        <button>KPI确认</button>
        <div></div>
        <h2>全选</h2>
      </div>
      <el-table highlight-current-row header-row-class-name="tableHeader" :data='allData' height="650px">
          <el-table-column align="right" type="selection">
          </el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="部门" align="center" prop='department'></el-table-column>
          <el-table-column v-for="(item,index) in days" :key="index" :label="item.toString()" align="center" width="40px"></el-table-column>
          <el-table-column label="发送状态" align="center" prop='sendStatus' :filters="[{ text: '未发送', value: '未发送' }, { text: '发送失败', value: '发送失败' }, { text: '已发送', value: '已发送' }]">
            <template slot-scope="scope">
              <el-button plain type="primary" size="small" v-if="scope.row.sendStatus=== '未发送'" @click="sendTodoList = true">{{scope.row.sendStatus}}</el-button>
              <el-button plain type="danger" size="small" v-if="scope.row.sendStatus=== '发送失败'" @click="kpi_detail_visible = true">{{scope.row.sendStatus}}</el-button>
              <el-button plain type="success" size="small" v-if="scope.row.sendStatus=== '已发送'">{{scope.row.sendStatus}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="确认状态" align="center" prop='sendStatus' :filters="[{ text: '未确认', value: '未确认' }, { text: '有异议', value: '有异议' }, { text: '已确认', value: '已确认' }]">
            <template slot-scope="scope">
              <el-button plain size="small" v-if="scope.row.confirmStatus=== '未确认'">{{scope.row.confirmStatus}}</el-button>
              <el-button plain type="success" size="small" v-if="scope.row.confirmStatus=== '有异议'">{{scope.row.confirmStatus}}</el-button>
              <el-button plain type="danger" size="small" v-if="scope.row.confirmStatus=== '已确认'">{{scope.row.confirmStatus}}</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="page flex-center">
      <el-pagination :total="50" layout="total,jumper,prev,pager,next" :current-page="1" :page-size="10"></el-pagination>
    </div>

    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule()"></SearchHigh>
    
    <el-dialog
      :visible.sync="sendTodoList"
      :show-close="false"
      width="400px"
      top="300px"
      center>
      <span class="flex-center">月度KPI统计将发送至对应员工待办</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger">确定</el-button>
        <el-button size="small" type="info">取消</el-button>
      </span>
    </el-dialog>
    <lj-dialog
        :visible="kpi_detail_visible"
        :size="{width: 800 + 'px',height: 700 + 'px'}"
        @close="handleCloseKpiDetail"
      >
        <div class="dialog_container borderNone">
          <div class="dialog_header">
            <div class="listTopCss items-bet">
              <div class="items-center listTopLeft">
                <img :src="imgUrl"/>
                <div>
                  <h3 class="personName">张艺兴</h3>
                  <h3 class="timeInfo">苏州吴江组</h3>
                </div>
              </div>
              <div class="items-right listTopRight">
                <div>
                  <h3 class="personName">KPI总得分<span>8分</span></h3>
                  <h3 class="timeInfo">2019-02-21</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog_main">
            <el-table highlight-current-row header-row-class-name="tableHeader">
              <el-table-column label="考核项" align="center"></el-table-column>
              <el-table-column label="指标值" align="center"></el-table-column>
              <el-table-column label="得分" align="center"></el-table-column>
              <el-table-column label="发送状态" align="center" prop='sendStatus'>
                <template slot-scope="scope">
                  <el-button plain type="success" size="small">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="dialog_footer">
            <el-button size="mini" type="danger" @click="kpi_modify_visible=true">确定</el-button>
            <el-button size="mini" type="info">取消</el-button>
          </div>
        </div>
    </lj-dialog>
    <lj-dialog
        :visible="kpi_modify_visible"
        :size="{width: 600 + 'px',height: 500 + 'px'}"
        @close="handleCloseKpiModify"
      >
        <div class="dialog_container borderNone">
          <div class="dialog_header">
            <h3>修改</h3>
          </div>
          <div class="dialog_main">
            <el-form ref="form"  label-width="80px">
              <el-form-item label="考核项">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="原始得分">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="现得分">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="修改原因">
                <el-input  type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="mini" type="danger">确定</el-button>
            <el-button size="mini" type="info">取消</el-button>
          </div>
        </div>
    </lj-dialog>
  </div>
</template>

<script>
  import SearchHigh from '../common/searchHigh.vue';
  import ljDialog from '../common/lj-dialog';
  export default {
    name: "index",
    components:{
      SearchHigh,
      ljDialog
    },
    data() {
      return {
        showSearch: false,
        searchData: {
          status: 'assessmentSearchList',
          keywords: 'search',
          data: [
            {
              keyType: 'radio',
              title: '发送状态',
              keyName: 'sendStatus',
              dataType: [],
              value: [
                { id: 1, title: '未发送' },
                { id: 2, title: '已发送' }
              ]
            },
            {
              keyType: 'radio',
              title: '确认状态',
              keyName: 'confirmStatus',
              dataType: [],
              value: [
                { id: 1, title: '未确认' },
                { id: 2, title: '已确认' },
                { id: 3, title: '有异议' }
              ]
            }
          ]
        },
        sendTodoList: false,
        kpi_detail_visible: false,
        kpi_modify_visible: false,
        imgUrl: require('../../assets/image/todoList/components/humanResource/theme1/rili.png'),
        allData: [
          {
            name: '张艺兴',
            department: '苏州吴江组',
            score: [8,7,6,5,4,3,2,1,9,0,9,8,7,6,5,4,3,2,1,0,9,8,7,4,6,5,3,2,1,0],
            sendStatus: '未发送',
            confirmStatus: '未确认'
          },
          {
            name: '张艺兴',
            department: '苏州吴江组',
            score: [8,7,6,5,4,3,2,1,9,0,9,8,7,6,5,4,3,2,1,0,9,8,7,4,6,5,3,2,1,0],
            sendStatus: '发送失败',
            confirmStatus: '有异议'
          },
          {
            name: '张艺兴',
            department: '苏州吴江组',
            score: [9,8,7,6,5,4,3,2,1,0,9,8,7,6,5,4,3,2,1,0,9,8,7,4,6,5,3,2,1,0],
            sendStatus: '已发送',
            confirmStatus: '已确认'
          },
        ]
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      days: function(){
        var day =  []
        var year = new Date().getFullYear()
        var month = new Date().getMonth()
        for(var i =0; i< new Date(year,month+1,0).getDate();i++){
          day[i] = i+1
        }
        return day
      }
    },
    methods: {
      highSearch: function() {
        this.showSearch = true
      },
      hiddenModule: function() {
        this.showSearch = false
      },
      handleCloseKpiDetail: function() {
        this.kpi_detail_visible = false
      },
      handleCloseKpiModify: function() {
        this.kpi_modify_visible = false
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/currentMonthAssessment/index.scss";

  @mixin currentMonthAssessmentImg($m, $n) {
    $url: '../../assets/image/currentMonthAssessment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #currentMonthAssessment {
      .listTopRight{
        .daochu{
          @include currentMonthAssessmentImg('daochu.png','theme1')
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
