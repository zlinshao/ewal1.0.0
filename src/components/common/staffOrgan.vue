<template>
  <div id="staffOrgan">
    <lj-dialog
      :visible="lj_visible"
      :size="lj_size"
      @close="handleCloseLjDialog">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <span>选择人员</span>
          <span class="search"></span>
        </div>
        <div class="justify-bet dialog_main">
          <div>1</div>
          <div>2</div>
        </div>
        <div class="dialog_footer">2</div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from './lj-dialog.vue';

  export default {
    name: "staff-organ",
    components: {ljDialog},
    props: ['module'],
    data() {
      return {
        lj_visible: false,
        lj_size: 'small',
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        console.log(val);
        this.lj_visible = val;
      }
    },
    computed: {},
    methods: {
      handleCloseLjDialog() {

      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common/staffOrgan.scss";

  @mixin organImg($m, $n) {
    $url: '../../assets/image/staffOrgan/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffOrgan {
      .dialog_container {
        .dialog_header {
          .search {
            width: 30px;
            height: 30px;
            cursor: pointer;
            @include bgImage('../../assets/image/common/theme1/search.png');
          }
        }
        .dialog_main {
          height: 100%;
          > div {
            width: 100%;
            height: 100%;
            border: 1px solid $colorE33;
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #staffOrgan {

    }
  }

  #theme_name.theme3 {
    #staffOrgan {

    }
  }

  #theme_name.theme4 {
    #staffOrgan {

    }
  }
</style>
