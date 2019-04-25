<template>
  <div id="see_house">
    <div>
      <lj-dialog
        :visible="see_house_visible"
        :size="{width: 650 + 'px',height: 700 + 'px'}"
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
                    <el-form-item label="房屋名称">
                      <el-input v-model="collect_form.community_name" placeholder="点击选择" readonly @focus="handleOpenHouseFilter('collect','office')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="门牌号">
                      <div class="flex-center">
                        <el-input v-model="collect_d1" placeholder="幢" style="margin-right: 5px"></el-input>
                        <el-input v-model="collect_d2" placeholder="单元" style="margin-right: 5px"></el-input>
                        <el-input v-model="collect_d3" placeholder="号"></el-input>
                      </div>
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
                      <div class="flex-center">
                        <el-input v-model="collect_t1" placeholder="室" style="margin-right: 5px"></el-input>
                        <el-input v-model="collect_t2" placeholder="厅" style="margin-right: 5px"></el-input>
                        <el-input v-model="collect_t3" placeholder="厨" style="margin-right: 5px"></el-input>
                        <el-input v-model="collect_t4" placeholder="卫"></el-input>
                      </div>
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
                      <el-select v-model="collect_form.property_type" placeholder="请选择">
                        <el-option :value="11" label="住宅"></el-option>
                        <el-option :value="12" label="公寓"></el-option>
                        <el-option :value="13" label="酒店公寓"></el-option>
                        <el-option :value="14" label="商住两用"></el-option>
                        <el-option :value="15" label="平房"></el-option>
                        <el-option :value="16" label="别墅"></el-option>
                      </el-select>
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
                        <el-input v-model="collect_form.floors" placeholder="所在楼层"></el-input>
                        <a style="margin: 0 5px">-</a>
                        <el-input v-model="collect_form.floor" placeholder="总楼层"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="朝向">
                      <div class="flex">
                        <p class="radioSelection" @click="chooseChaoType(tmp)" :class="{'highChoose': tmp.id === choose_chao}"
                           v-for="tmp in chao_list">
                          {{ tmp.val }}
                        </p>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主带看人">
                      <el-input v-model="collect_form.primary_name" placeholder="请输入" readonly @focus="handleOpenStaff('collect_primary')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="带看人">
                      <el-input v-model="collect_form.take_name" placeholder="请输入" readonly @focus="handleOpenStaff('collect')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-show="current_see_type === 2">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="带看时间">
                      <el-date-picker type="datetime" v-model="rent_form.take_time" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="带看地址">
                      <el-input v-model="rent_form.house_name" placeholder="请选择" readonly @focus="handleOpenHouseFilter('rent','house')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户姓名">
                      <el-input v-model="rent_form.customer_name" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话">
                      <el-input v-model="rent_form.contact_phone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主带看人">
                      <el-input v-model="rent_form.primary_name" readonly placeholder="请选择" @focus="handleOpenStaff('rent_primary')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="带看人">
                      <el-input v-model="rent_form.take_name" readonly placeholder="请选择" @focus="handleOpenStaff('rent')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
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
                      <el-input v-model="fix_form.receive_name" placeholder="请选择" readonly @focus="handleOpenStaff('fix')"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上传图片">
                      <Upload :file="fix_file" @success="handleGetFile"></Upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div v-show="current_see_type === 4">
                <el-form label-width="80px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="保洁房屋">
                        <el-input v-model="clear_form.house_name" placeholder="请选择" readonly @focus="handleOpenHouseFilter('clear','house')"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="保洁时间">
                        <el-date-picker type="datetime" v-model="clear_form.cleaning_time" placeholder="请选择" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="保洁原因">
                        <el-input v-model="clear_form.cleaning_reason" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="上传图片">
                        <Upload :file="clear_file" @success="handleGetFile"></Upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="保修方">
                    <div class="flex">
                      <p class="radioSelection" @click="chooseClearType(tmp)" :class="{'highChoose': tmp.id === choose_clear}"
                         v-for="tmp in clear_type">
                        {{ tmp.val }}
                      </p>
                    </div>
                  </el-form-item>
                  <el-form-item label="处理人">
                    <el-input v-model="clear_form.receive_name" readonly @focus="handleOpenStaff('clear')"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="current_see_type === 5">
                <el-form label-width="80px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="任务名称">
                        <el-input v-model="other_form.task_name" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="任务内容">
                        <el-input v-model="other_form.content" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="处理人">
                        <el-input v-model="other_form.receiver_name" placeholder="请输入" readonly @focus="handleOpenStaff('other')"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="上传图片">
                        <Upload :file="other_file" @success="handleGetFile"></Upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" @click="handleSubmitTask">确定</el-button>
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
  import Upload from '../../../common/upload.vue';

  export default {
    name: "index",
    components: { LjDialog ,StaffOrgan,HouseFilter,Upload },
    data() {
      return {
        server: globalConfig.market_server,
        //文件上传
        fix_file: {
          keyName: 'fix_form',
          setFile: [],
          size: {
            width: '50px',
            height: '50px'
          }
        },
        clear_file: {
          keyName: 'clear_form',
          setFile: [],
          size: {
            width: '50px',
            height: '50px'
          }
        },
        other_file: {
          keyName: 'other_form',
          setFile: [],
          size: {
            width: '50px',
            height: '50px'
          }
        },
        //选择房屋小区
        house_filter_visible: false,
        filter_type: '',
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
        collect_d1: '',
        collect_d2: '',
        collect_d3: '',
        collect_t1: '',
        collect_t2: '',
        collect_t3: '',
        collect_t4: '',
        collect_form: {
          community_id: '',
          community_name: '',
          door_address: '',
          customer_name: '',
          contact_phone: '',
          property_type: '',
          house_type: '',
          area: '',
          decorate: '',
          direction: {
            id: '',
            name: ''
          },
          floors: '',
          floor: '',
          take_peoples: '',
          take_name: '',
          primary: '',
          primary_name: '',
        },
        chao_list: [
          {id: 1,val: '东'},
          {id: 2,val: '西'},
          {id: 3,val: '南'},
          {id: 4,val: '北'},
        ],
        choose_chao: '',
        //租房带看
        rent_form: {
          house_name: '',
          house_id: [],
          customer_name: '',
          contact_phone: '',
          take_time: '',
          take_peoples: '',
          take_name: '',
          primary: '',
          primary_name: ''
        },
        //维修
        fix_form: {
          house_id: '',
          house_name: '',
          repair_time: '',
          repair_item: '',
          receive_id: '',
          receive_name: '',
          repair_type: '',
          album: [],
        },
        fix_type: [
          {id: 1,val: '自己维修'},
          {id: 2,val: '第三方维修'}
        ],
        choose_fix: '',
        clear_type: [
          {id: 1,val: '自己维修'},
          {id: 2,val: '第三方维修'}
        ],
        choose_clear: '',
        //保洁
        clear_form: {
          house_id: '',
          house_name: '',
          album: [],
          cleaning_time: '',
          cleaning_reason: '',
          cleaning_type: '',
          receive_id: '',
          receive_name: ''
        },
        //其他
        other_form: {
          receiver_name: '',
          receiver_id: '',
          content: '',
          album: [],
          task_name: '',
        },
        staff_visible: false,
        staff_type: ''
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
      chooseChaoType(tmp) {
        this.choose_chao = tmp.id;
        this.collect_form.direction.id = tmp.id;
        this.collect_form.direction.name = tmp.val;
      },
      //重置表单
      handleResetForm(form) {
        if (!form) {
          return false;
        }
        for (var key in form) {
          if (typeof form[key] === 'string' || typeof form[key] === 'number') {
            form[key] = '';
          }
          if (form[key] instanceof Array) {
            form[key] = [];
          }
          if (form[key] instanceof Object) {
            this.handleResetForm(form[key]);
          }
        }
      },
      //文件上传
      handleGetFile(val) {
        switch (val[0]) {
          case 'fix_form':
            this.fix_form.album = val[1];
            break;
          case 'clear_form':
            this.clear_form.album = val[1];
            break;
          case 'other_form':
            this.other_form.album = val[1];
            break;
        }
      },
      successCallback(res,callback) {
        if (res.code === 200) {
          this.$LjNotify('success',{
            title: '成功',
            message: res.message
          });
          callback();
        } else {
          this.$LjNotify('warning',{
            title: '失败',
            message: res.message
          })
        }
      },
      fixHttp(fix_form) {
        this.$http.post(this.server + 'v1.0/market/task/HouseRepair',fix_form).then(res => {
          this.successCallback(res,() => {
            this.$store.dispatch('switch_see_house',false);
          });
        })
      },
      clearHttp(clear_form) {
        this.$http.post(this.server + 'v1.0/market/task/HouseCleaning',clear_form).then(res => {
          this.successCallback(res,() => {
            this.$store.dispatch('switch_see_house',false);
          })
        })
      },
      rentHttp(rent_form) {
        this.$http.post(this.server + 'v1.0/market/task/RentTakeLook',rent_form).then(res => {
          this.successCallback(res,() => {
            this.$store.dispatch('switch_see_house',false);
          })
        })
      },
      collectHttp(collect_form) {
        this.$http.post(this.server + 'v1.0/market/task/CollectTakeLook',collect_form).then(res => {
          this.successCallback(res,() => {
            this.$store.dispatch('switch_see_house',false);
          })
        })
      },
      otherHttp(other_form) {
        this.$http.post(this.server + 'v1.0/market/task/OthersTask',other_form).then(res => {
          this.successCallback(res,() => {
            this.$store.dispatch('switch_see_house',false);
          })
        })
      },
      handleSubmitTask() {
        switch (this.current_see_type) {
          case 1:
            this.collect_form.door_address = [];
            this.collect_form.door_address.push(this.collect_d1,this.collect_d2,this.collect_d3,);
            this.collect_form.house_type = [];
            this.collect_form.house_type.push(this.collect_t1,this.collect_t2,this.collect_t3,this.collect_t4,);
            this.collectHttp(this.collect_form);
            break;
          case 2:
            this.rentHttp(this.rent_form);
            break;
          case 3:
            this.fixHttp(this.fix_form);
            break;
          case 4:
            this.clearHttp(this.clear_form);
            break;
          case 5:
            this.otherHttp(this.other_form);
            break;
        }
      },
      handleOpenStaff(type) {
        this.staff_type = type;
        this.staff_visible = true;
      },
      handleOpenHouseFilter(idx,type) {
        this.filter_type = type;
        this.filter_idx = idx;
        this.house_filter_visible = true;
      },
      handleGetFilter(val) {
        if (val !== 'close') {
          var res = JSON.parse(JSON.stringify(val));
          switch (this.filter_idx) {
            case 'fix':
              this.fix_form.house_id = res.length > 0 && res[0].house_id;
              this.fix_form.house_name = res.length > 0 && res[0].house_name;
              break;
            case 'clear':
              this.clear_form.house_id = res.length > 0 && res[0].house_id;
              this.clear_form.house_name = res.length > 0 && res[0].house_name;
              break;
            case 'rent':
              this.rent_form.house_id.push(res[0].house_id);
              this.rent_form.house_name = res.length > 0 && res[0].house_name;
              break;
            case 'collect':
              this.collect_form.community_id = res[0].house_id;
              this.collect_form.community_name = res[0].house_name;
              break;
          }
        }
        this.house_filter_visible = false;
      },
      chooseFixType(tmp) {
        this.choose_fix = tmp.id;
        this.fix_form.repair_type = tmp.id;
      },
      chooseClearType(tmp) {
        this.choose_clear = tmp.id;
        this.clear_form.cleaning_type = tmp.id;
      },
      handleGetStaff(id,name) {
        if (id !== 'close') {
          switch (this.staff_type) {
            case 'collect':
              this.collect_form.take_peoples = id;
              this.collect_form.take_name = name;
              break;
            case 'collect_primary':
              this.collect_form.primary = id[0];
              this.collect_form.primary_name = name;
              break;
            case 'fix':
              this.fix_form.receive_id = id;
              this.fix_form.receive_name = name;
              break;
            case 'clear':
              this.clear_form.receive_id = id;
              this.clear_form.receive_name = name;
              break;
            case 'rent':
              this.rent_form.take_name = name;
              this.rent_form.take_peoples = id;
              break;
            case 'rent_primary':
              this.rent_form.primary = id[0];
              this.rent_form.primary_name = name;
              break;
            case 'other':
              this.other_form.receiver_id = id[0];
              this.other_form.receiver_name = name;
              break;
          }
        }
        this.staff_visible = false;
      },
      chooseSeeType(tmp) {
        this.current_see_type = tmp.id;
      },
      handleCloseSeeHouse() {
        switch (this.current_see_type) {
          case 1:
            this.collect_d1 = this.collect_d2 = this.collect_d3 = '';
            this.collect_t1 = this.collect_t2 = this.collect_t3 = this.collect_t4 = '';
            this.choose_chao = '';
            this.$resetForm(this.collect_form);
            break;
          case 2:
            this.$resetForm(this.rent_form);
            break;
          case 3:
            this.choose_fix = '';
            this.$resetForm(this.fix_form);
            break;
          case 4:
            this.choose_clear = '';
            this.$resetForm(this.clear_form);
            break;
          case 5:
            this.$resetForm(this.other_form);
            break;
        }
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
