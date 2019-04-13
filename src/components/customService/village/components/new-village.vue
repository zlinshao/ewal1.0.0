<template>
  <div id="new-village">
    <lj-dialog
      :visible="new_village_visible"
      :size="{width: 1200 + 'px',height: 850 + 'px'}"
      @close="handleCloseAddVillage"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>仙居雅苑</h3>
        </div>
        <div class="dialog_main">
          <VillageContainer :village="t1">
            <el-form label-width="80px" class="borderNone">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="省">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="市">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="区/县">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="小区名称">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="街道地址">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="小区别名">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="6"><el-form-item label="建筑年代">
                  <el-select placeholder="请输入"></el-select>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="总栋数">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="房屋类型">
                  <el-select placeholder="请输入"></el-select>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="房屋总数">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="物业费">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="物业电话">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="物业公司">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-form-item label="小区详情">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="周边信息">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="地铁信息">
                <el-input placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input placeholder="请输入" type="textarea" :row="8"></el-input>
              </el-form-item>
            </el-form>
          </VillageContainer>
          <VillageContainer :village="t2"></VillageContainer>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="click">确定</el-button>
          <el-button type="info" size="small">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  import VillageContainer from './village-container.vue';

  export default {
    name: "index",
    props: ['module'],
    components: { LjDialog ,VillageContainer},
    data() {
      return {
        t1: '',
        t2: '',
        new_village_visible: false,
        new_village_form: {

        },
      }
    },
    mounted() {},
    watch: {
      module(val) {
        console.log(val);
        if (val) {
          this.t1 = '基本信息';
          this.t2 = '全站大数据房源匹配';
        }
        this.new_village_visible = val;
      },
    },
    computed: {},
    methods: {
      click() {
        this.t1 = '基本信息';
        this.t2 = '全站大数据房源匹配';
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
