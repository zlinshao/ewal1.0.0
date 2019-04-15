<template>
  <div id="new-village">
    <lj-dialog
      :visible="new_village_visible"
      :size="{width: 1200 + 'px',height: 850 + 'px'}"
      @close="handleCloseAddVillage"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ new_village_form.village_name }}</h3>
        </div>
        <div class="dialog_main">
          <VillageContainer village="基本信息">
            <el-form label-width="80px" class="borderNone">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="省">
                    <el-select v-model="new_village_form.province" placeholder="请选择" @change="handleChangeProvince">
                      <el-option v-for="(item,idx) in province_list" :key="idx" :value="item.province_id"
                                 :label="item.province_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="市">
                    <el-select v-model="new_village_form.city" placeholder="请选择" @change="handleChangeCity">
                      <el-option v-for="(item,idx) in city_list" :key="idx" :value="item.city_id"
                                 :label="item.city_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="区/县">
                    <el-select v-model="new_village_form.area" placeholder="请选择" @change="handleChangeArea">
                      <el-option v-for="(item,idx) in area_list" :key="idx" :value="item.area_id"
                                 :label="item.area_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="街道">
                    <el-select v-model="new_village_form.region" placeholder="请选择">
                      <el-option v-for="(item,idx) in region_list" :key="idx" :value="item.region_id"
                                 :label="item.region_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="街道地址">
                <el-input v-model="new_village_form.address" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="小区名称">
                <el-input id="tipInput" placeholder="请输入" v-model="new_village_form.village_name"></el-input>
              </el-form-item>
              <el-form-item label="小区别名">
                <el-input placeholder="请输入" v-model="new_village_form.village_alias"></el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="建筑年代">
                    <el-date-picker value-format="yyyy" placeholder="请输入"
                                    v-model="new_village_form.built_year"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="总栋数">
                    <el-input placeholder="请输入" type="number" v-model="new_village_form.total_buildings"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="房屋类型">
                    <el-select placeholder="请输入" v-model="new_village_form.property_type">
                      <el-option v-for="(item,idx) in house_type_list" :key="idx" :value="item.id"
                                 :label="item.val"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="房屋总数">
                    <el-input placeholder="请输入" type="number" v-model="new_village_form.total_houses"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="物业费">
                    <el-input placeholder="请输入" type="number" v-model="new_village_form.property_fee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="物业电话">
                    <el-input placeholder="请输入" v-model="new_village_form.property_phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="物业公司">
                    <el-input placeholder="请输入" v-model="new_village_form.property_com"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="小区详情">
                <el-input placeholder="请输入" v-model="new_village_form.content"></el-input>
              </el-form-item>
              <el-form-item label="周边信息">
                <el-input placeholder="请输入" v-model="new_village_form.peripheral_info"></el-input>
              </el-form-item>
              <el-form-item label="地铁路线">
                <el-input placeholder="请输入" v-model="new_village_form.subway_road"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input placeholder="请输入" type="textarea" :row="8" v-model="new_village_form.remark"></el-input>
              </el-form-item>
              <el-form-item label="小区照片">
                <Upload :file="pic_upload.village_photo" @success="handleGetUploadFile"></Upload>
              </el-form-item>
              <el-form-item label="房屋照片">
                <Upload :file="pic_upload.home_photo" @success="handleGetUploadFile"></Upload>
              </el-form-item>
              <el-form-item label="调研报告">
                <Upload :file="pic_upload.files" @success="handleGetUploadFile"></Upload>
              </el-form-item>
            </el-form>
          </VillageContainer>
          <VillageContainer village="全站大数据房源匹配">
            <div id="container"></div>
          </VillageContainer>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmAddVillage">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseAddVillage">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>
<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import VillageContainer from './village-container.vue';
  import Upload from '../../../common/upload.vue';

  export default {
    name: "index",
    props: ['module'],
    components: {LjDialog, VillageContainer,Upload},
    data() {
      return {

        pic_upload: {
          village_photo: {
            keyName: 'village_photo',
            setFile: [],
            size: {
              width: '50px',
              height: '50px'
            }
          },
          home_photo: {
            keyName: 'home_photo',
            setFile: [],
            size: {
              width: '50px',
              height: '50px'
            }
          },
          files: {
            keyName: 'files',
            setFile: [],
            size: {
              width: '50px',
              height: '50px'
            }
          }
        },

        server: globalConfig.market_server,
        new_village_visible: false,
        province_list: [],
        city_list: [],
        area_list: [],
        region_list: [],
        house_type_list: [
          {id: 11, val: '住宅'},
          {id: 12, val: '公寓'},
          {id: 13, val: '酒店公寓'},
          {id: 14, val: '商住两用'},
          {id: 15, val: '平房'},
          {id: 16, val: '别墅'},
        ],
        address_params: {
          province: '',
          city: '',
          area: ''
        },
        new_village_form: {
          province: '',
          city: '',
          area: '',
          address: '',
          region: '',
          village_name: '',
          village_alias: '',
          total_buildings: '',
          property_type: '',
          total_houses: '',
          property_fee: '',
          property_phone: '',
          property_com: '',
          content: '',
          remark: '',
          peripheral_info: '',
          subway_road: '',
          built_year: '',
          longitude: '',
          latitude: '',
          album: {},
        },
        //高德地图api
        map: null,
        autoComplete: null,
        marker: null,
      }
    },
    watch: {
      module: {
        handler(val) {
          if (val) {
            this.getAddressList('province');
            this.$nextTick(() => {
              this.handleInitialMap();
            })
          }
          this.new_village_visible = val;
        },
        immediate: true,
        deep: true
      },
    },
    computed: {

    },
    methods: {
      //获取上传文件
      handleGetUploadFile(file) {
        if (file !== 'close') {
          this.new_village_form.album[file[0]] = file[1];
        }
      },
      //确定添加
      handleConfirmAddVillage() {
        console.log(this.new_village_form);
        this.$http.post(this.server + 'v1.0/market/community',this.new_village_form).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$LjNotify('success',{
              title: '成功',
              message: res.message
            });
            this.handleCloseAddVillage();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.message
            });
          }
        })
      },
      //标记
      handleMarkerMap(position) {
        this.marker = new AMap.Marker({
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position,
          map: this.map
        });
        this.marker.setMap(this.map);
      },
      //初始化地图
      handleInitialMap() {
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [118.78 , 32.07], //初始化地图中心点
          zoom: 13
        });
        AMap.plugin('AMap.Autocomplete',() => {
          //实例化Autocomplete
          var autoOptions = {
            province: '江苏省',
            city: '南京市',
            input: 'tipInput'
          };
          this.autoComplete = new AMap.Autocomplete(autoOptions);
          AMap.event.addListener(this.autoComplete,"select",(info) => {
            console.log(info);
            this.new_village_form.longitude = info.poi.location.R;
            this.new_village_form.latitude = info.poi.location.Q;
            this.handleMarkerMap([info.poi.location.R,info.poi.location.Q]);
          });
        });
      },
      handleChangeArea(val) {
        this.new_village_form.region = '';
        this.address_params.area = val;
        this.getAddressList('region');
      },
      handleChangeCity(val) {
        console.log(val);
        this.new_village_form.area = '';
        this.new_village_form.region = '';
        this.address_params.city = val;
        this.getAddressList('area');
      },
      handleChangeProvince(val) {
        this.new_village_form.city = '';
        this.new_village_form.area = '';
        this.new_village_form.region = '';
        this.address_params.province = val;
        this.getAddressList('city');
      },
      //获取省
      getAddressList(type) {
        this.$http.get(this.server + '/v1.0/city/address', this.address_params).then(res => {
          if (res.code === 200) {
            switch (type) {
              case 'province':
                this.province_list = res.data;
                break;
              case 'city':
                this.city_list = res.data;
                break;
              case 'area':
                this.area_list = res.data;
                break;
              case 'region':
                this.region_list = res.data;
                break;
            }
          } else {
            switch (type) {
              case 'province':
                this.province_list = [];
                break;
              case 'city':
                this.city_list = [];
                break;
              case 'area':
                this.area_list = [];
                break;
              case 'region':
                this.region_list = [];
                break;
            }
          }
        })
      },
      //关闭添加小区
      handleCloseAddVillage() {
        this.new_village_visible = false;
        this.$emit('close');
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/customService/village/components/new-village.scss";

</style>
