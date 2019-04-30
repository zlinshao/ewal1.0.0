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
    <div class="office-container" v-if="activeIndex == 0">
      <el-table highlight-current-row header-row-class-name="tableHeader" height="670px" :data="officeList">
          <el-table-column label="住房地址" align="center" prop="housrAddress"></el-table-column>
          <el-table-column label="小区地址" align="center" prop="communityAddress"></el-table-column>
          <el-table-column label="房型" align="center" prop="houseType"></el-table-column>
          <el-table-column label="面积" align="center" prop="area"></el-table-column>
          <el-table-column label="装修" align="center" prop="decorate"></el-table-column>
          <el-table-column label="房屋类型" align="center" prop="buildingType"></el-table-column>
          <el-table-column label="照片" align="center" prop="photo"></el-table-column>
          <el-table-column label="收房价格" align="center" prop="housePrice"></el-table-column>
          <el-table-column label="人均价格" align="center" prop="perPersonPrice"></el-table-column>
          <el-table-column label="部门人数" align="center" prop="departmentPersonNum"></el-table-column>
          <el-table-column label="办公室类型" align="center" prop="officeType"></el-table-column>
          <el-table-column label="开始时间" align="center" prop="startTime"></el-table-column>
          <el-table-column label="结束时间" align="center" prop="endTime"></el-table-column>
          <el-table-column label="片区经理" align="center" prop="areaManager"></el-table-column>
      </el-table>
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
            <li v-for="(item, index) in period" :key="index" :class="{'mark_li': item.id === periodChoosed}" @click="changePeriod(index)">{{item.val}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="dormitory-container" v-if="activeIndex == 1">
      <el-table highlight-current-row header-row-class-name="tableHeader" height="670px">
          <el-table-column label="房屋地址" align="center"></el-table-column>
          <el-table-column label="小区地址" align="center"></el-table-column>
          <el-table-column label="房型" align="center"></el-table-column>
          <el-table-column label="面积" align="center"></el-table-column>
          <el-table-column label="装修" align="center"></el-table-column>
          <el-table-column label="房屋类型" align="center"></el-table-column>
          <el-table-column label="照片" align="center"></el-table-column>
          <el-table-column label="收房价格" align="center"></el-table-column>
          <el-table-column label="人均价格" align="center"></el-table-column>
          <el-table-column label="当前入住人数" align="center"></el-table-column>
          <el-table-column label="剩余床位" align="center"></el-table-column>
          <el-table-column label="开始时间" align="center"></el-table-column>
          <el-table-column label="结束时间" align="center"></el-table-column>
          <el-table-column label="片区经理" align="center"></el-table-column>
          <el-table-column label="部门" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="page flex-center">
      <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="currentPage" :page-size="10"></el-pagination>
    </div>
    <lj-dialog :visible="addOffice_visiable" :size="{width: 580 + 'px',height: 581 + 'px'}" @close="closeOfficeVisiable()">
      <div class="dialog_container">
        <div class="dialog_header">
            新增办公室
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small" @click="closeOfficeVisiable()">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <lj-dialog :visible="addDormitory_visiable" :size="{width: 580 + 'px',height: 532 + 'px'}" @close="closeDomitoryVisiable()">
      <div class="dialog_container">
        <div class="dialog_header">
          新增宿舍
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small">确定</el-button>
          <el-button type="info" size="small" @click="closeDomitoryVisiable()">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import LjUpload from '../../../common/lightweightComponents/lj-upload.vue';
  import UserChoose from '../../../common/lightweightComponents/UserChoose';
  export default {
    name: "index",
    components: {
      LjDialog,
      LjUpload,
      UserChoose,
    },
    props: ['addOffice_visiable','addDormitory_visiable'],
    data() {
      return {
        activeIndex: 0,
        active: [
          {id: 0, val: '办公室管理'},
          {id: 1, val: '宿舍管理'}
        ],
        period: [
                {id: 0,val: '当日'},
                {id: 1,val: '本周'},
                {id: 2,val: '本月'},
        ],
        officeList: [
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
          }
        ],
        showCharts: false,
        periodChoosed: 0,
        currentPage: 1,
        total: 20,
      }
    },
    mounted(){
      this.$emit('officeDormitoryChoose',this.activeIndex)
    },
    watch: {
      activeIndex() {
        this.$emit('officeDormitoryChoose',this.activeIndex)
      }
    },
    methods: {
      changeTab: function(index) {
        this.activeIndex = index
      },
      changePeriod: function(index) {
        this.periodChoosed = index
      },
      closeOfficeVisiable: function() {
        this.$emit('closeAddOffice',false)
      },
      closeDomitoryVisiable: function() {
        this.$emit('closeAddDormitory',false)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/repository/officeDormitory/index.scss";
  @mixin childrenImg($m,$n) {
    $url: '../../../../assets/image/humanResource/repository/dataBase/' + $n + '/' + $m;
    @include bgImage($url);
  }
  @mixin officeImg($m,$n) {
    $url: '../../../../assets/image/humanResource/repository/officeDormitory/' + $n + '/' + $m;
    @include bgImage($url);
  }
  #theme_name.theme1{
    #officeDormitory {
      .main-nav {
        .isActive {
          @include childrenImg('teji.png', 'theme1');
        }
      }
      .office-container{
        #workInfo{
          .tip-icon{
            @include officeImg('shouqi.png', 'theme1');
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
