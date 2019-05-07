<template>
  <div id="customService" ref="customService" :style="mainHeight">
    <MenuList :list="customService" :module="true" :title="top_title"></MenuList>
    <work-info @change="handleChangeDate">
      <template v-slot:left>
        <div></div>
      </template>
      <template v-slot:center>
        <div></div>
      </template>
      <template v-slot:right>
        <div>

        </div>
      </template>
    </work-info>
  </div>
</template>

<script>
  import MenuList from '../common/menuList.vue';
  import WorkInfo from '../common/work-info.vue';
  import {customService} from '../../assets/js/allModuleList.js';

  export default {
    name: "index",
    components: { MenuList,WorkInfo },
    data() {
      return {
        top_title: '',
        customService,
        show_menu_list: false,
        mainHeight: {
          height: 0
        },

        params: {
          uid: 289,
          diff: 1
        }
      }
    },
    mounted() {
      this.show_menu_list = true;
      this.top_title = '客服中心';
      var top = this.$refs['customService'].offsetTop;
      this.mainHeight.height = window.innerHeight - top + 'px';
      this.handleGetInfo();
    },
    watch: {},
    computed: {},
    methods: {
      handleGetInfo() {
        this.$http.get(globalConfig.market_server + 'v1.0/csd/home/dashboard',this.params).then(res => {
          console.log(res);
        })
      },
      handleChangeDate(id) {
        switch (id) {
          case 1:
            this.params.diff = 1;
            break;
          case 2:
            this.params.diff = 7;
            break;
          case 3:
            this.params.diff = 30;
            break;
        }
        this.handleGetInfo();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/customService/index.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #customService {
      background-color: white;
    }
  }

  #theme_name.theme2 {
    #customService {

    }
  }

  #theme_name.theme3 {
    #customService {

    }
  }

  #theme_name.theme4 {
    #customService {

    }
  }
</style>
