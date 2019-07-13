<template>
  <transition name="fade">
    <div id="lj_loading" v-show="loading" class="loading-theme" :style="{'top':top+'px','left':left+'px','width':width+'px','height':height+'px'}">
      <div class="loading-modal">
        <div class="loading-modal-container">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>


  export default {
    name: "LjLoading",
    data() {
      return {
        loading: false,
        el:null,
        top:0,
        left:0,
        width:0,
        height:0,
      };
    },
    methods: {
      load() {
        this.loading = true;
      },
    },
    created() {
      let parent = document.querySelector(this.el);
      this.top = parent.offsetTop;
      this.left = parent.offsetLeft;
      this.width = parent.offsetWidth;
      this.height = parent.offsetHeight;
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/common/lightweightComponents/loading/index";

  @mixin notifyImg($m, $n) {
    $url: '../../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #lj_loading {
    .loading-modal-container {
      @include notifyImg('loading2.png','theme1');
    }
  }
</style>
