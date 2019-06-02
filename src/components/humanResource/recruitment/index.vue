<template>
  <div id="recruitment">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click="visibleStatus = true">
            <b>...</b>
          </p>
          <h1>招聘管理</h1>
          <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <el-button type="success" size="small" @click="handleSearchInterview" style="margin-right: 20px">查看面试人数
          </el-button>
          <el-button size="small" type="warning" v-if="chooseTab === 2" @click="ms_add_visible = true">添加面试人</el-button>
          <el-button size="small" type="success" v-if="chooseTab === 2" style="margin-right: 10px"
                     @click="msg_add_visible = true">添加面试官
          </el-button>
          <el-button size="small" type="success" v-if="chooseTab === 2" style="margin-right: 10px"
                     @click="handleOpenLookOffer">查看面试官
          </el-button>
          <div class="icons add" v-if="chooseTab === 1" @click="mb_add_visible = true"><b>+</b></div>
          <div class="icons search" @click="handleOpenSearch"></div>
        </div>
      </div>

      <div class="recruitment_main">
        <part-one
          v-if="chooseTab === 1"
          :add-modules="mb_add_visible"
          @close="mb_add_visible = false"
          :search-data="allSearch[chooseTab - 1]"
        ></part-one>
        <part-two
          v-if="chooseTab === 2"
          :add-interviewer-visible="ms_add_visible"
          @closeMs="ms_add_visible = false"
          :add-offer-visible="msg_add_visible"
          @closeMsg="msg_add_visible = false"
          :search-data="allSearch[chooseTab - 1]"
        ></part-two>
        <part-three v-if="chooseTab === 3" :search-data="allSearch[chooseTab - 1]"></part-three>
        <part-four v-if="chooseTab === 4" :search-data="allSearch[chooseTab - 1]"></part-four>
      </div>

      <!--高级搜索-->
      <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

      <!--模块入口-->
      <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true"
                @close="visibleStatus = false"></MenuList>

      <!--今日面试人数-->
      <lj-dialog
        :visible="today_interview_visible"
        :size="{width: 650 + 'px',height: 600 + 'px'}"
        @close="today_interview_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>今日面试人列表</h3>
          </div>
          <div class="dialog_main">
            <el-table
              :data="interview_list"
              height="400px"
            >
              <el-table-column label="部门" prop="depart.name" align="center"></el-table-column>
              <el-table-column label="岗位" prop="position.name" align="center" min-width="100px"></el-table-column>
              <el-table-column label="姓名" prop="name" align="center"></el-table-column>
              <el-table-column label="面试时间" prop="interview_time" align="center" min-width="130px"></el-table-column>
              <el-table-column label="信息录入" align="center">
                <template slot-scope="scope">
                  <el-button plain type="success" size="mini" @click="handleCreateCode(scope.row)">生成</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="dialog_footer"></div>
        </div>
      </lj-dialog>

      <!--二维码-->
      <lj-dialog
        :visible="code_detail_visible"
        :size="{width: 300 + 'px',height: 300 + 'px'}"
        @close="code_detail_visible = false"
      >
        <div class="dialog_container">
          <img :src="code_address" alt="code">
        </div>
      </lj-dialog>

      <!--查看面试官-->
      <lj-dialog
        :visible="office_visible"
        :size="{width: 650 + 'px',height: 600 + 'px'}"
        @close="office_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>查看面试官</h3>
          </div>
          <div class="dialog_main">
            <el-table
              :data="office_data"
              :default-sort="{prop: 'org.name', order: 'descending'}"
            >
              <el-table-column show-overflow-tooltip label="岗位" prop="position.name" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip label="部门" prop="org.name" align="center"></el-table-column>
              <el-table-column show-overflow-tooltip label="面试官" align="center" min-width="120px">
                <template slot-scope="scope">
                  <span v-for="(item,idx) in scope.row.interviewer">{{ item.real_name }}<a
                    v-if="idx !== scope.row.interviewer.length - 1">/</a></span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip label="创建人" prop="creator.real_name"
                               align="center"></el-table-column>
              <el-table-column show-overflow-tooltip label="创建时间" prop="created_at" align="center"></el-table-column>
              <el-table-column label="编辑">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleEditOffer(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="mini" @click="office_visible = false">关闭</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--编辑面试官-->
      <lj-dialog
        :visible="edit_offer_visible"
        :size="{width: 500 + 'px',height: 600 + 'px'}"
        @close="handleCancelEdit"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>编辑面试官</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form label-width="120px">
              <el-form-item label="部门">
                <el-input v-model="edit_offer.depart" disabled @focus="depart_visible = true"></el-input>
              </el-form-item>
              <el-form-item label="岗位">
                <el-input v-model="edit_offer.position_name" disabled @focus="position_visible = true"></el-input>
              </el-form-item>
              <el-form-item label="面试官一">
                <user-choose num="1" title="请选择" v-model="edit_offer.interviewer_first_id"></user-choose>
              </el-form-item>
              <el-form-item label="面试官二">
                <user-choose num="1" title="请选择" v-model="edit_offer.interviewer_second_id"></user-choose>
              </el-form-item>
              <el-form-item label="面试官三">
                <user-choose num="1" title="请选择" v-model="edit_offer.interviewer_third_id"></user-choose>
              </el-form-item>
              <el-form-item label="试卷">
                <dropdown-list v-model="edit_offer.paper_id" :url="`${this.url}train/exam`"
                               :params="{type:1}"></dropdown-list>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="handleSubmitEditOffer">确定</el-button>
            <el-button type="info" size="small" @click="handleCancelEdit">取消</el-button>
          </div>
        </div>
      </lj-dialog>


      <!--面板数据-->
      <!--<div class="panel-info flex-center">
        <nav class="panel-btn"><i class="el-icon-arrow-left"></i></nav>
        <ul class="date_change">
          <li v-for="tmp in date_change_list" :key="tmp.id" @click="handleChangeDate(tmp.id)" :class="{'mark_li': isActive === tmp.id}">{{ tmp.val }}</li>
        </ul>
        <div>
          <div id="chart1"></div>
        </div>
        <div>
          <div id="chart2"></div>
        </div>
        <div>
          <div id="chart3"></div>
        </div>
        <div>
          <div id="chart4"></div>
        </div>
        <div></div>
      </div>-->

      <work-info></work-info>

    </div>
  </div>
</template>

<script>
  import WorkInfo from './components/workInfo/work-info';
  import SearchHigh from '../../common/searchHigh.vue';
  import PartOne from './components/part_one/index.vue'; //募兵行列
  import PartTwo from './components/part_two/index.vue'; //分取科士
  import PartThree from './components/part_three/index.vue'; //殿试会师
  import PartFour from './components/part_four/index.vue'; //榜上有名
  import MenuList from '../../common/menuList.vue';
  import {humanResource} from '../../../assets/js/allModuleList.js';
  import {recruitmentSearchList} from '../../../assets/js/allSearchData.js';


  export default {
    name: "index",
    components: {SearchHigh, PartOne, PartTwo, PartThree, PartFour, MenuList, WorkInfo},
    data() {
      return {
        url: globalConfig.humanResource_server,


        date_change_list: [
          {id: 1, val: '当日'},
          {id: 2, val: '本周'},
          {id: 3, val: '本月'},
        ],
        isActive: 1,

        //编辑面试官
        edit_offer_visible: false,
        edit_offer: {
          interviewer_first_id: '',
          interviewer_second_id: '',
          interviewer_third_id: '',
          interviewer_first: '',
          interviewer_second: '',
          interviewer_third: '',
          org_id: '',
          paper_id: '',
          position_id: '',
          user_id: '',
          depart: '',
          position_name: '',
        },
        currentRow: '',
        interview_type: '',


        //查看面试官
        office_visible: false,
        office_data: [],
        office_count: 0,

        recruitmentSearchList,
        //今日面试人数
        today_interview_visible: false,
        interview_list: [],
        interview_count: 0,
        params: {
          position_id: '',
          interviewer_id: '',
          interview_time: '',
          name: '',
          page: 1,
          limit: 12
        },
        allSearch: [
          {
            search: '',
            org_id: [],
            position_id: []
          },
          {
            search: '',
            org_id: [],
            position_id: [],
            platform: '',
          },
          {
            search: '',
            org_id: [],
            position_id: [],
            platform: '',
          },
          {
            search: '',
            org_id: [],
            position_id: [],
            platform: '',
          }
        ],
        humanResource,
        visibleStatus: false,

        //导航
        selects: [
          {id: 1, title: '人员需求'},
          {id: 2, title: '预约面试'},
          {id: 3, title: '已约面试'},
          {id: 4, title: '预约入职'}
        ], //模块列表
        chooseTab: 1, //当前选中模块
        is_hide_nav_container: true,

        //搜索
        showSearch: false,
        searchData: [],

        //募兵行列
        mb_add_visible: false,

        //添加面试人
        ms_add_visible: false,

        //添加面试官
        msg_add_visible: false,

        //  二维码地址
        code_address: '',
        code_detail_visible: false,

        //时间周期
        time_type: [
          {id: 1, val: '当日'},
          {id: 2, val: '本周'},
          {id: 3, val: '本月'},
        ],
        current_time: 1
      }
    },
    mounted() {
      this.handleHttp('各部门面试通过率');
    },
    watch: {},
    computed: {},
    methods: {
      handleHttp(way) {
        this.$http.post('http://47.101.210.105:8083/interview_detail', {way}).then(res => {
          console.log(res);
        })
      },
      handleChangeDate(id) {
        this.isActive = id;
      },
      handleCancelEdit() {
        this.edit_offer = {
          interviewer_first_id: '',
          interviewer_second_id: '',
          interviewer_third_id: '',
          org_id: '',
          paper_id: '',
          position_id: '',
          user_id: '',
        };
        this.edit_offer_visible = false;
      },
      handleSubmitEditOffer() {
        let interviewers = _.filter([...this.edit_offer.interviewer_first_id, ...this.edit_offer.interviewer_second_id, ...this.edit_offer.interviewer_third_id], (o) => {
          return o
        });
        if (_.uniq(interviewers).length != interviewers.length) {
          this.$LjMessage('warning', {title: '警告', msg: '不可选择相同的面试官'});
          return;
        }
        this.$http.put(`${this.url}recruitment/interviewers/${this.currentRow.id}`, this.edit_offer).then(res => {
          console.log(res);
          if (res.code === '20030') {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg
            });
            this.handleCancelEdit();
            this.handleOpenLookOffer();
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleEditOffer(row) {
        this.currentRow = row;
        this.edit_offer.interviewer_first_id = [row.interviewer_first_id];
        this.edit_offer.interviewer_second_id = [row.interviewer_second_id];
        this.edit_offer.interviewer_third_id = [row.interviewer_third_id];
        this.edit_offer.interviewer_first = row.interviewer[0] ? row.interviewer[0].real_name : '';
        this.edit_offer.interviewer_second = row.interviewer[1] ? row.interviewer[1].real_name : '';
        this.edit_offer.interviewer_third = row.interviewer[2] ? row.interviewer[2].real_name : '';
        this.edit_offer.depart = row.org ? row.org.name : '';
        this.edit_offer.org_id = row.org_id;
        this.edit_offer.position_name = row.position ? row.position.name : '';
        this.edit_offer.position_id = row.position_id;
        this.edit_offer.paper_id = row.paper_id;
        this.edit_offer_visible = true;
      },
      handleOpenLookOffer() {
        this.$http.get(this.url + 'recruitment/interviewers').then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.office_data = res.data.data;
            this.office_count = res.data.count;
            this.office_visible = true;
          } else {
            this.office_data = [];
            this.office_count = 0;
            this.$LjNotify('warning', {
              title: '警告',
              message: '获取面试官列表失败'
            })
          }
        });
      },
      handleCheckTimeType(id) {
        this.current_time = id;
      },
      handleOpenSearch() {
        this.searchData = recruitmentSearchList[this.chooseTab];
        this.showSearch = true;
      },
      handleCreateCode(row) {
        this.$http.put(`${this.url}recruitment/interviewer_process/get_qrcode/${row.id}`, {
          id: row.id,
          position_id: row.depart.id
        }).then(res => {
          if (res.code === '20000') {
            this.code_address = res.data;
            this.code_detail_visible = true;
          } else {
            this.code_address = '';
            this.$LjNotify('warning', {
              title: '失败',
              message: '获取失败'
            });
            return false;
          }
        });
      },
      handleSearchInterview() {
        this.$http.get(this.url + 'recruitment/interviewer_process/intervieweeListForFront').then(res => {
          console.log(res);
          if (res.code === '20000') {
            this.interview_list = res.data.data;
            this.interview_count = res.data.count;
          } else {
            this.interview_list = [];
            this.interview_count = 0;
          }
          this.today_interview_visible = true;
        });
      },
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$store.dispatch('route_animation');
      },
      //关闭搜索
      hiddenModule(val, item, search) {
        if (val !== 'close') {
          for (let key in this.allSearch[this.chooseTab - 1]) {
            this.allSearch[this.chooseTab - 1][key] = val[key];
          }
        }
        this.showSearch = false;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/recruitment/index.scss";

  @mixin recruitmentImg($m, $n) {
    $url: '../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #recruitment {
      height: 100%;

      > div {
        height: 100%;

        .recruitment_main {
          width: 100%;
          height: calc(100% - 90px);
        }

        .nav_container {

        }
      }
    }
  }

  #theme_name.theme2 {
    #recruitment {

    }
  }

  #theme_name.theme3 {
    #recruitment {

    }
  }

  #theme_name.theme4 {
    #recruitment {

    }
  }
</style>
