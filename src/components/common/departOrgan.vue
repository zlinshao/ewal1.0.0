<template>
  <div id="departOrgan">
    <lj-dialog
      :visible="depart_visible"
      :size="depart_size"
      @close="handleCloseLjDialog">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>部门选择</h3>
        </div>
        <div class="dialog_main">
          <p class="choose-title">
            <span v-for="(tmp,idx) in choose_list" @click="handleLocationDepart(tmp,idx)">{{ tmp.name }}&nbsp;<a v-if="idx !== choose_list.length - 1">/</a>&nbsp;</span>
          </p>
          <div class="scroll_bar">
            <div style="height: 500px">
              <div class="changeChoose" v-if="departList.length > 0">
                <el-checkbox-group v-model="checkList" :max="configure.num">
                  <div v-for="item in departList" class="flex checkbox-container">
                    <el-checkbox :label="item.id" :key="item.id"
                                 class="checkboxBottom">{{item.name}}
                    </el-checkbox>
                    <span @click="handleGetNextDepart(item)"><i class="el-icon-share"></i>下级</span>
                  </div>
                </el-checkbox-group>
              </div>
              <div
                class="flex-center"
                v-loading="fullLoading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255, 255, 255, 0)" v-else>
                <div v-if="departList.length < 1 && !fullLoading">无相关数据</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="departInfo">确定</el-button>
          <!-- <el-button type="info" size="small" @click="depart_visible = false">取消</el-button> -->
          <el-button type="info" size="small" @click="handleCloseLjDialog">取消</el-button>
          <el-button type="info" size="small" @click="handleResetLjDialog">重置</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from './lj-dialog.vue';

  export default {
    name: "depart-organ",
    components: {ljDialog},
    props: ['module', 'organData'],
    data() {
      return {
        depart_visible: false,
        fullLoading: false,
        depart_size: {},
        departList: [],
        configure: {},
        checkList: [],
        choose_list: [
          {name: '南京乐伽商业管理有限公司',id: 1},
        ],
      }
    },
    mounted() {
      //this.getList();
    },
    activated() {
    },
    watch: {
      module(val) {
        this.depart_visible = val;
        this.depart_size = {
          width: '650px',
          height: '800px'
        }
      },
      depart_visible(val) {
        if (!val) {
          this.$emit('close', 'close');
        }
      },
      organData: {
        handler(val, oldVal) {
          this.configure.num = val ? (val.num ? val.num : Infinity) : Infinity;
          this.checkList = val ? (val.arr ? val.arr : []) : [];
        },
        deep: true,
        immediate: true
      },
      depart_visible: {
        handler(val, oldVal) {
          if(val) {
            this.getList();
          }
        }
      }
    },
    computed: {},
    methods: {
      //定位部门
      handleLocationDepart(tmp,idx) {
        // console.log(tmp,idx);
        this.getList(tmp.id);
        if (idx === 0) {
          this.choose_list.splice(1);
        } else {
          this.choose_list.splice(idx);
        }
      },
      //下级部门
      handleGetNextDepart(item) {
        this.checkList = [];
        this.choose_list.push(item);
        this.getList(item.id);
      },
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      handleResetLjDialog() {
        this.checkList = [];
        this.$emit('close', 'close', 'reset');
      },
      getList(org = 1) {
        this.departList = [];
        this.fullLoading = true;
        this.$http.getOrganization(org).then(res => {
          this.fullLoading = false;
          if (res.code === '20000') {
            this.departList = res.data.data;
          }
        });
      },
      departInfo() {
        let names = [], arr = [], str = '';
        for (let item of this.checkList) {
          for (let key of this.departList) {
            if (item === key.id) {
              arr.push(key);
              names.push(key.name);
            }
          }

        }
        str = names.join(',');
        this.$emit('close', this.checkList, str, arr);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common/departOrgan.scss";

  @mixin organImg($m, $n) {
    $url: '../../assets/image/departOrgan/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #departOrgan {

    }
  }

  #theme_name.theme2 {
    #departOrgan {

    }
  }

  #theme_name.theme3 {
    #departOrgan {

    }
  }

  #theme_name.theme4 {
    #departOrgan {

    }
  }
</style>
