<template>
  <div id="house-filter">
    <div>
      <lj-dialog :visible.sync="dialog_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="dialog_visible = false">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>请选择房屋地址</h3>
            <div class="header_right borderNone">
              <el-input style="width: 200px;" size="small" v-if="show_search"></el-input>
              <div class="search" @click="show_search = !show_search"></div>
            </div>
          </div>
          <div class="dialog_main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="地址" name="first">
                <div class="flex">
                  <div class="left_container changeChoose">
                    <div class="header_control flex">
                      <el-checkbox v-model="choose_all" label="1" @change="handleChooseAll">全选</el-checkbox>
                    </div>
                    <div class="house-address scroll_bar">
                      <div>
                        <el-checkbox-group v-model="house_choose" @change="handleChangeItem">
                          <div class="checkbox_item" v-for="(item,index) in house_resource">
                            <el-checkbox :label="index">{{ item.val }}</el-checkbox>
                          </div>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>
                  <div class="right_container">
                    <div class="header_control flex">
                      <div>已选:</div>
                      <div class="clear_all" @click="handleChooseAll(false)">清空</div>
                    </div>
                    <div class="house-address right_address scroll_bar">
                      <div>
                        <div class="checkbox_item flex" v-for="(house,idx) in house_choose_items">
                          <div class="choose_txt">{{ house.val }}</div>
                          <div class="delete_choose" @click="handleDeleteItem(house,idx)">－</div>
                        </div>
                      </div>
                    </div>
                    <!--底部按钮-->
                    <div class="footer_btn flex-center">
                      <el-button type="danger" size="small">确定</el-button>
                      <el-button type="info" size="small" @click="handleCancelChoose">取消</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="小区" name="second">
                <div class="flex">
                  <div class="left_container transparent_bg">
                    <div class="header_search">
                      <div class="control">
                        <div class="toggle_btn" @click="hide_header_search = !hide_header_search">
                          <i class="el-icon-arrow-up" v-if="hide_header_search"></i>
                          <i class="el-icon-arrow-down" v-else></i>
                        </div>
                      </div>
                      <div class="header_container borderNone changeChoose" :class="{'hide_header_container': hide_header_search}">
                        <div>
                          <p style="margin-bottom: 10px">房型</p>
                          <div class="items-center">
                            <p class="radioSelection" @click="handleChooseHouseType(tmp.id)"
                               :class="{'highChoose': house_config.type === tmp.id}"
                               v-for="tmp in house_type">
                              {{ tmp.val }}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p style="margin-bottom: 10px">厅</p>
                          <div class="items-center">
                            <p class="radioSelection" @click="handleChooseHouseOffice(tmp.id)"
                               :class="{'highChoose': house_config.office === tmp.id}"
                               v-for="tmp in house_office">
                              {{ tmp.val }}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p style="margin-bottom: 10px">面积</p>
                          <div class="flex" style="line-height: 30px">
                            <el-input style="width: 180px" size="small" v-model="house_config.area.min"></el-input><span style="margin-left: 5px">平米</span>
                            <a style="margin: 0 20px;color: #999999">至</a>
                            <el-input style="width: 180px" size="small" v-model="house_config.area.max"></el-input><span style="margin-left: 5px">平米</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="plot_container changeChoose scroll_bar">
                      <div>
                        <el-checkbox-group v-model="office_choose" @change="handleChooseOffice">
                          <div class="office_content" v-for="office in office_resource" :key="office.id">
                            <el-checkbox :label="office.id">
                              <div class="checkbox_content flex">
                                <div style="width: 200px">{{ office.val }}</div>
                                <div style="width: 150px">{{ office.city }}</div>
                                <div style="width: 100px;text-align: right">{{ office.num }}套</div>
                              </div>
                            </el-checkbox>
                          </div>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>
                  <div class="right_container">
                    <div class="header_control flex">
                      <div>已选:</div>
                      <div class="clear_all" @click="handleClearOffice">清空</div>
                    </div>
                    <div class="office_choose scroll_bar">
                      <div>
                        <div class="flex" v-for="(office,index) in show_office" :key="office.id">
                          <div style="width: 40%;text-align: left">{{ office.val }}</div>
                          <div style="width: 35%;text-align: left">{{ office.city }}</div>
                          <div style="width: 15%;text-align: left">{{ office.num }}套</div>
                          <div class="delete_choose" @click="handleDeleteOffice(index)">－</div>
                        </div>
                      </div>
                    </div>
                    <div class="footer_btn">
                      <el-button type="danger" size="small">确定</el-button>
                      <el-button type="info" size="small">取消</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="dialog_footer"></div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';
  export default {
    name: "index",
    components: { LjDialog },
    props: ['visible'],
    data() {
      return {
        dialog_visible: false,
        activeName: 'second',
        show_search: false,
        choose_all: '', //全选

        house_choose: [], //已选index
        house_choose_items: [],
        house_resource: [
          { id: 1, val: '仙居雅苑1-301'},
          { id: 2, val: '仙居雅苑1-302',city: '南京市建邺区高庙路'},
          { id: 3, val: '仙居雅苑1-303',city: '南京市建邺区高庙路'},
          { id: 4, val: '仙居雅苑1-304',city: '南京市建邺区高庙路'},
          { id: 5, val: '仙居雅苑1-305',city: '南京市建邺区高庙路'},
          { id: 6, val: '仙居雅苑1-306',city: '南京市建邺区高庙路'},
          { id: 7, val: '仙居雅苑1-307',city: '南京市建邺区高庙路'},
          { id: 8, val: '仙居雅苑1-308',city: '南京市建邺区高庙路'},
          { id: 9, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 10, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 11, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 12, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 13, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 14, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 15, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 16, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 17, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 18, val: '仙居雅苑1-309',city: '南京市建邺区高庙路'},
          { id: 19, val: '仙居雅苑1-319',city: '南京市建邺区高庙路'},
        ],
        hide_header_search: true, //隐藏搜索条件

        house_config: {
          type: 1,
          office: '',
          area: {
            min: '',
            max: ''
          }
        },
        house_type: [
          {id: 1,val: '一室'},
          {id: 2,val: '两室'},
          {id: 3,val: '三室'},
          {id: 4,val: '四室'},
          {id: 5,val: '以上'},
        ],
        house_office: [
          {id: 1,val: '一厅'},
          {id: 2,val: '两厅'},
          {id: 3,val: '三厅'},
          {id: 4,val: '以上'},
        ],

        office_resource: [
          {id: 1, val: '仙居雅苑小区1',num: 98,city: '南京市-建邺区-高庙路'},
          {id: 2, val: '时光澔韵',num: 918,city: '南京市-建邺区-高庙路'},
          {id: 3, val: '紫金华府',num: 98,city: '南京市建邺区高庙路'},
          {id: 4, val: '仙居雅苑小区2',num: 198,city: '南京市建邺区高庙路'},
          {id: 5, val: '仙居雅苑小区2',num: 980,city: '南京市建邺区高庙路'},
          {id: 6, val: '仙居雅苑小区2',num: 908,city: '南京市建邺区高庙路'},
          {id: 7, val: '仙居雅苑小区2',num: 918,city: '南京市建邺区高庙路'},
          {id: 8, val: '仙居雅苑小区2',num: 928,city: '南京市建邺区高庙路'},
          {id: 9, val: '仙居雅苑小区2',num: 938,city: '南京市建邺区高庙路'},
          {id: 10, val: '仙居雅苑小区2',num: 198,city: '南京市建邺区高庙路'},
          {id: 11, val: '仙居雅苑小区2',num: 298,city: '南京市建邺区高庙路'},
          {id: 12, val: '仙居雅苑小区2',num: 398,city: '南京市建邺区高庙路'},
          {id: 13, val: '仙居雅苑小区2',num: 398,city: '南京市建邺区高庙路'},
          {id: 14, val: '仙居雅苑小区2',num: 398,city: '南京市建邺区高庙路'},
          {id: 15, val: '仙居雅苑小区2',num: 398,city: '南京市建邺区高庙路'},
        ],
        office_choose: [], //已选择小区
        show_office: [],
      }
    },
    mounted() {},
    watch: {
      visible(val) {
        this.dialog_visible = val;
      },
    },
    computed: {},
    methods: {
      //清空小区
      handleClearOffice() {
        this.office_choose = [];
        this.show_office = [];
      },
      //删除小区
      handleDeleteOffice(index) {
        this.office_choose.splice(index,1);
        this.show_office.splice(index,1);
      },
      //选择小区
      handleChooseOffice(val) {
        this.show_office = [];
        for (var a =0;a<val.length;a ++) {
          this.show_office.push(this.office_resource[val[a] - 1]);
        }
      },
      //切换厅
      handleChooseHouseOffice(id) {
        this.house_config.office = id;
      },
      //选择房型
      handleChooseHouseType(id) {
        this.house_config.type = id;
      },
      //取消
      handleCancelChoose() {
        this.handleResetHouse();
        this.dialog_visible = false;
      },
      //删除一个
      handleDeleteItem(house,idx) {
        this.house_choose.splice(idx,1);
        this.house_choose_items.splice(idx,1);
        var house_len = this.house_resource.length;
        var choose_len = this.house_choose.length;
        this.choose_all = house_len === choose_len;
      },
      //全选
      handleChooseAll(val) {
        if (val) {
          var len = this.house_resource.length;
          this.house_choose_items = [];
          for (var i=0;i< len;i++) {
            this.house_choose.push(i);
            this.house_choose_items.push(this.house_resource[i]);
          }
        } else {
          this.house_choose = [];
          this.house_choose_items = [];
          this.choose_all = false;
        }
      },
      //选择item
      handleChangeItem(val) {
        this.house_choose_items = [];
        for (var k=0;k<val.length;k ++) {
          this.house_choose_items.push(this.house_resource[val[k]]);
        }
        var house_len = this.house_resource.length;
        var choose_len = this.house_choose.length;
        this.choose_all = house_len === choose_len;
      },
      handleResetHouse() {
        this.choose_all = false;
        this.house_choose_items.length = 0;
        this.house_choose = [];
      },
      handleCloseDialog() {
        this.dialog_visible = false;
        this.$emit('close');
      },
      handleClick(tab) {
        console.log(tab);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/components/house-filter.scss";

  #house-filter {

  }
</style>
