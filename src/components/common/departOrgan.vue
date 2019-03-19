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
        <div class="dialog_main changeChoose scroll_bar">
          <el-checkbox-group v-model="checkList" :max="configure.num">
            <el-checkbox v-for="item in departList" :label="item.id" :key="item.id"
                         class="checkboxBottom">{{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="departInfo">确定</el-button>
          <el-button type="info" size="small" @click="depart_visible = false">取消</el-button>
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
        depart_size: {},
        departList: [],
        configure: {},
        checkList: [],
      }
    },
    mounted() {
      this.getList();
    },
    activated() {
    },
    watch: {
      module(val) {
        this.depart_visible = val;
        this.depart_size = {
          width: '600px',
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
          this.configure.num = val ? (val.num ? val.num : '') : '';
          this.checkList = val ? (val.arr ? val.arr : []) : [];
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      getList(org = 1) {
        this.departList = [];
        this.fullLoading = true;
        this.$http.getOrganization(org).then(res => {
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
