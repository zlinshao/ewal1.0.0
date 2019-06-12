<template>
  <div id="new-village">
    <lj-dialog :visible="new_village_visible" :size="{width: 1200 + 'px',height: 850 + 'px'}"
               @close="handleCloseAddVillage">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ new_village_form.village_name }}</h3>
        </div>
        <div class="dialog_main">
          <VillageContainer village="基本信息">
            <el-form label-width="80px" class="onlyBg" ref="newVillageFormRef" :rules="rules.newVillage"
                     :model="new_village_form">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="省">
                    <el-select v-model="new_village_form.province" placeholder="请选择" @change="handleChangeProvince">
                      <el-option v-for="item in province_list" :key="item.id" :value="item.province_id"
                                 :label="item.province_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="市">
                    <el-select v-model="new_village_form.city" placeholder="请选择" @change="handleChangeCity">
                      <el-option v-for="item in city_list" :key="item.city_name" :value="item.city_id"
                                 :label="item.city_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="区/县">
                    <el-select v-model="new_village_form.area" placeholder="请选择" @change="handleChangeArea">
                      <el-option v-for="item in area_list" :key="item.area_name" :value="item.area_id"
                                 :label="item.area_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="街道">
                    <el-select v-model="new_village_form.region" placeholder="请选择">
                      <el-option v-for="item in region_list" :key="item.region_id" :value="item.region_id"
                                 :label="item.region_name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="小区地址">
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
                  <el-form-item label="小区定位">
                    <el-select v-model="new_village_form.position">
                      <el-option :value="1" label="郊区"></el-option>
                      <el-option :value="2" label="城区"></el-option>
                      <el-option :value="3" label="城中心"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="建筑年代">
                    <el-date-picker format="yyyy" type="year"  value-format="yyyy" placeholder="请输入"
                                    v-model="new_village_form.built_year"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="总栋数">
                    <el-input placeholder="请输入"
                                     v-model.number="new_village_form.total_buildings"></el-input>
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
                    <el-input placeholder="请输入"
                                     v-model.number="new_village_form.total_houses"></el-input>
                    <!--<el-input-number :controls="false" :min="0" :max="1000" placeholder="请输入"
                                     v-model.number="new_village_form.total_houses"></el-input-number>-->
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="物业费">
                    <el-input placeholder="请输入" v-model="new_village_form.property_fee"></el-input>
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
                <lj-upload v-model="new_village_form.album.village_photo"></lj-upload>
              </el-form-item>
              <el-form-item label="房屋照片">
                <lj-upload v-model="new_village_form.album.home_photo"></lj-upload>
              </el-form-item>
              <el-form-item label="调研报告">
                <lj-upload v-model="new_village_form.album.files"></lj-upload>
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
  import VillageContainer from './village-container.vue';

  export default {
    name: "index",
    props: ['module', 'editInfo'],
    components: {VillageContainer},
    data() {
      return {
        rules: {
          newVillage: {},
        },


        is_edit: false,


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
          position: '',
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
          album: {
            home_photo: [],
            files: [],
            village_photo: []
          },
        },
        //高德地图api
        map: null,
        autoComplete: null,
        marker: null,

        //  编辑小区
        edit_village_info: '',
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
      editInfo: {
        handler(val) {
          if (val) {
            this.edit_village_info = val;
            this.is_edit = true;
            this.handleInitialVillage(val);
            this.$nextTick(() => {
              this.handleMarkerMap([val.longitude, val.latitude], {poi: {name: val.village_name}});
            })
          }
        },
        deep: true
      },
      new_village_visible: {
        handler(val, oldVal) {
          this.address_params = {
            province: '',
            city: '',
            area: ''
          };
        },
        immediate: true,
      },
    },
    computed: {},
    methods: {
      //标记
      handleMarkerMap(position, info) {
        let that = this;
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: position, //初始化地图中心点
          zoom: 13
        });
        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(5, -20)});
        let marker = new AMap.Marker({
          position,
          map: that.map
        });
        marker.content = info.poi.name;
        marker.on('click', markerClick);
        marker.emit('click', {target: marker});
        this.map.add(marker);

        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(that.map, e.target.getPosition());
        }
      },
      //初始化编辑小区
      handleInitialVillage(village) {
        for (let key in this.new_village_form) {
          this.new_village_form[key] = village[key] || '';
        }
        this.new_village_form.album = village.album ? village.album : {
          home_photo: [],
          files: [],
          village_photo: []
        };
        this.new_village_form.province = village.province && parseInt(village.province.province_id);
        this.new_village_form.city = village.city && parseInt(village.city.city_id);
        this.new_village_form.area = village.area && parseInt(village.area.area_id);
        this.new_village_form.region = village.region && parseInt(village.region.region_id);
        let province = village.province && village.province.province_id;
        let city = village.city && village.city.city_id;
        let area = village.area && village.area.area_id;
        this.$http.get(this.server + '/v1.0/city/address', {
          province
        }).then(res => {
          if (res.code === 200) {
            this.city_list = res.data;
            for (let i = 0; i < this.city_list.length; i++) {
              this.city_list[i].city_id = Number(this.city_list[i].city_id);
            }
            this.$http.get(this.server + '/v1.0/city/address', {
              province,
              city
            }).then(res => {
              if (res.code === 200) {
                this.area_list = res.data;
                for (let i = 0; i < this.area_list.length; i++) {
                  this.area_list[i].area_id = Number(this.area_list[i].area_id);
                }
                this.$http.get(this.server + '/v1.0/city/address', {
                  province,
                  city,
                  area
                }).then(res => {
                  if (res.code === 200) {
                    this.region_list = res.data;
                    for (let i = 0; i < this.region_list.length; i++) {
                      this.region_list[i].region_id = Number(this.region_list[i].region_id);
                    }
                  } else {
                    this.region_list = [];
                  }
                })
              } else {
                this.area_list = [];
              }
            })
          } else {
            this.city_list = []
          }
        });
      },

      /*验证添加小区*/
      validateForm() {
        let msg = null;
        if(isNaN(this.new_village_form.total_buildings)||!this.new_village_form.total_buildings) {
          msg = '总栋数只能为数字';
        }
        if(isNaN(this.new_village_form.total_houses||!this.new_village_form.total_houses)) {
          msg = '房屋总数只能为数字';
        }
        if(msg) {
          this.$LjMessage('warning',{title:'警告',msg:msg});
          return false;
        }
        return true;
      },

      //确定添加
      handleConfirmAddVillage() {
        if(!this.validateForm()) return;

        if (this.is_edit) {
          this.$http.patch(this.server + `v1.0/market/community/${this.edit_village_info.id}`, this.new_village_form).then(res => {
            if (res.code === 200) {
              this.$LjNotify('success', {
                title: '成功',
                message: res.message
              });
              this.handleCloseAddVillage('ok');
            } else {
              this.$LjNotify('warning', {
                title: '失败',
                message: res.message
              })
            }
          });
          return false;
        }
        this.$http.post(this.server + 'v1.0/market/community', this.new_village_form).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.message
            });
            this.handleCloseAddVillage('ok');
          } else {
            this.$LjNotify('warning', {
              title: '失败',
              message: res.message
            });
          }
        })
      },
      //初始化地图
      handleInitialMap() {
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [118.78, 32.07], //初始化地图中心点
          zoom: 13
        });
        AMap.plugin('AMap.Autocomplete', () => {
          //实例化Autocomplete
          let autoOptions = {
            province: '江苏省',
            city: '南京市',
            input: 'tipInput'
          };
          this.autoComplete = new AMap.Autocomplete(autoOptions);
          AMap.event.addListener(this.autoComplete, "select", (info) => {
            this.new_village_form.longitude = info.poi.location.R;
            this.new_village_form.latitude = info.poi.location.Q;
            this.new_village_form.village_name = info.poi.name;
            this.handleMarkerMap([info.poi.location.R, info.poi.location.Q], info);
          });
        });
      },
      handleChangeArea(val) {
        this.new_village_form.region = '';
        this.address_params.area = val;
        this.getAddressList('region');
      },
      handleChangeCity(val) {
        this.new_village_form.area = '';
        this.new_village_form.region = '';
        this.address_params.area = '';
        this.address_params.city = val;
        this.address_params.province = this.editInfo.province.province_id;
        this.getAddressList('area');
      },
      handleChangeProvince(val) {
        this.new_village_form.city = '';
        this.new_village_form.area = '';
        this.new_village_form.region = '';
        this.address_params.city = '';
        this.address_params.area = '';
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
                for (let i = 0; i < this.province_list.length; i++) {
                  this.province_list[i].province_id = Number(this.province_list[i].province_id);
                }
                break;
              case 'city':
                this.city_list = res.data;
                for (let i = 0; i < this.city_list.length; i++) {
                  this.city_list[i].city_id = Number(this.city_list[i].city_id);
                }
                break;
              case 'area':
                this.area_list = res.data;
                for (let i = 0; i < this.area_list.length; i++) {
                  this.area_list[i].area_id = Number(this.area_list[i].area_id);
                }
                break;
              case 'region':
                this.region_list = res.data;
                for (let i = 0; i < this.region_list.length; i++) {
                  this.region_list[i].region_id = Number(this.region_list[i].region_id);
                }
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
      handleCloseAddVillage(type) {
        this.new_village_visible = false;
        this.edit_village_info = '';
        this.is_edit = false;
        for (let key in this.new_village_form) {
          this.new_village_form[key] = '';
        }
        this.new_village_form.album = {
          home_photo: [],
          files: [],
          village_photo: []
        };
        this.$emit('close', type);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/customService/village/components/new-village.scss";
</style>
