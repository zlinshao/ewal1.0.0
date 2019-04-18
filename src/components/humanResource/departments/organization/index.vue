<template>
  <div id="organization">
    <div>
      <p>南京乐伽商业管理有限公司</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tree',
    components: {},
    data() {
      return {
        url: globalConfig.server,
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      handleDragOrgan(e) {
        let organ = this.$refs['strtWrap']; //获取目标元素
        let disX = e.clientX - organ.offsetLeft;
        let disY = e.clientY  - organ.offsetTop;
        document.onmousemove = (e) => {
          let left = e.clientX - disX;
          let top = e.clientY - disY;

          // this.positionX = top;
          // this.positionY = left;

          organ.style.left = left + 'px';
          organ.style.top = top + 'px';
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/departments/organization/index.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #organization {

    }
  }

  #theme_name.theme2 {
    #organization {

    }
  }

  #theme_name.theme3 {
    #organization {

    }
  }

  #theme_name.theme4 {
    #organization {

    }
  }
</style>
