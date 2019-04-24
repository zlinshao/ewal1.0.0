<template>
  <div id="see_house">
    <div>
      <lj-dialog
        :visible="see_house_visible"
        :size="{width: 650 + 'px',height: 660 + 'px'}"
        @close="handleCloseSeeHouse"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>新建任务 <a style="font-size: 14px;color: #cf2e33">(全部必填)</a></h3>
          </div>
          <div class="dialog_main">
            <el-form label-width="80px" class="borderNone">
              <el-form-item label="任务类型">
                <div class="flex">
                  <p class="radioSelection" @click="chooseSeeType(tmp)" :class="{'highChoose': tmp.id === current_see_type}"
                     v-for="tmp in see_type">
                    {{ tmp.val }}
                  </p>
                </div>
              </el-form-item>
              <div v-show="current_see_type === 1">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="小区名称">
                      <el-input v-model="collect_form.community_name" placeholder="点击选择" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="门牌号">
                      <el-input v-model="collect_form.door_address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="客户姓名">
                      <el-input v-model="collect_form.customer_name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话">
                      <el-input v-model="collect_form.contact_phone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="户型">
                      <el-input v-model="collect_form.house_type" placeholder="点击选择" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="面积">
                      <el-input v-model="collect_form.area" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="房屋类型">
                      <el-input v-model="collect_form.house_type" placeholder="点击选择" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="装修">
                      <el-select v-model="collect_form.decorate" placeholder="请输入">
                        <el-option :value="405" label="毛坯"></el-option>
                        <el-option :value="406" label="简装"></el-option>
                        <el-option :value="407" label="精装"></el-option>
                        <el-option :value="408" label="豪装"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="楼层">
                      <div class="flex-center">
                        <el-input v-model="collect_form.floors" placeholder="请输入"></el-input>
                        <a style="margin: 0 5px">-</a>
                        <el-input v-model="collect_form.floor" placeholder="请输入"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="朝向">
                      <el-input v-model="collect_form.decorate" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="带看人">
                  <el-input v-model="collect_form.take_name" placeholder="请输入" readonly @focus="staff_visible = true"></el-input>
                </el-form-item>
              </div>
              <div v-show="current_see_type === 2">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="带看时间">
                      <el-date-picker v-model="rent_form.take_time" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="带看地址">
                      <el-input v-model="rent_form.house_name" placeholder="请选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户姓名">
                      <el-input v-model="rent_form.customer_name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话">
                      <el-input v-model="rent_form.customer_phone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="带看人">
                  <el-input v-model="rent_form.take_name" readonly placeholder="请选择"></el-input>
                </el-form-item>
              </div>
              <div v-show="current_see_type === 3">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="维修房屋">
                      <el-input v-model="fix_form.house_name" placeholder="请选择" readonly @focus="handleOpenHouseFilter('fix','house')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="维修时间">
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="fix_form.repair_time" placeholder="请选择"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="维修内容">
                  <el-input v-model="fix_form.repair_item" type="textarea" :rows="6" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="维修方">
                  <div class="flex">
                    <p class="radioSelection" @click="chooseFixType(tmp)" :class="{'highChoose': tmp.id === choose_fix}"
                       v-for="tmp in fix_type">
                      {{ tmp.val }}
                    </p>
                  </div>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="处理人">
                      <el-input v-model="fix_form.receive_name" placeholder="请选择" readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上传图片">

                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger">确定</el-button>
            <el-button type="info" @click="handleCloseSeeHouse">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <StaffOrgan :module="staff_visible" @close="handleGetStaff"></StaffOrgan>

      <!--房屋小区选择-->
      <HouseFilter :visible="house_filter_visible" :only-choose="filter_type" @close="handleGetFilter"></HouseFilter>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import StaffOrgan from '../../../common/staffOrgan.vue';
  import HouseFilter from '../../../marketCentre/components/house-filter.vue';

  export default {
    name: "index",
    components: { LjDialog ,StaffOrgan,HouseFilter },
    data() {
      return {
        //选择房屋小区
        house_filter_visible: false,
        filter_type: 'house',
        filter_idx: '',

        see_type: [
          {id: 1,val: '收房带看'},
          {id: 2,val: '租房带看'},
          {id: 3,val: '维修'},
          {id: 4,val: '保洁'},
          {id: 5,val: '其他'},
        ],
        current_see_type: 1,
        //收房带看
        collect_form: {
          community_name: '',
          door_address: '',
          customer_name: '',
          contact_phone: '',
          house_type: '',
          area: '',
          decorate: '',
          direction: '',
          floors: '',
          floor: '',
          take_peoples: '',
          take_name: ''
        },
        //租房带看
        rent_form: {
          house_name: '',
          house_id: '',
          customer_name: '',
          customer_phone: '',
          take_time: '',
          take_peoples: '',
          take_name: '',
          primary: ''
        },
        //维修
        fix_form: {
          house_id: '',
          house_name: '',
          repair_time: '',
          repair_item: '',
          receive_id: '',
          receive_name: '',
          repair_type: 1,
        },
        fix_type: [
          {id: 1,val: '自己维修'},
          {id: 2,val: '第三方维修'}
        ],
        choose_fix: 1,
        //保洁
        clear_form: {

        },
        //其他
        other_form: {

        },
        staff_visible: false,
      }
    },
    mounted() {},
    watch: {},
    computed: {
      see_house_visible() {
        return this.$store.state.market_service.see_house_visible;
      },
    },
    methods: {
      handleOpenHouseFilter(idx,type) {
        this.filter_type = type;
        this.filter_idx = idx;
        this.house_filter_visible = true;
      },
      handleGetFilter(val,type) {
        if (val !== 'close') {
          switch (this.filter_idx) {
            case 'fix':
              this.fix_form.house_id = val[0].id;
              this.fix_form.house_name = val[0].name;
              break;
          }
        }
        this.house_filter_visible = false;
      },
      chooseFixType(tmp) {
        this.choose_fix = tmp.id;
        this.fix_form.repair_type = tmp.id;
      },
      handleGetStaff(id,name) {
        if (id !== 'close') {
          this.collect_form.take_peoples = id;
          this.collect_form.take_name = name;
        }
        this.staff_visible = false;
      },
      chooseSeeType(tmp) {
        this.current_see_type = tmp.id;
      },
      handleCloseSeeHouse() {
        this.$store.dispatch('switch_see_house',false);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/common.scss";
  #see_house {
    .highChoose {
      background-color: #FFEAEA;
      color: $colorE33;
    }
  }
</style>
