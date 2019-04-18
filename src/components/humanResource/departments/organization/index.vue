<template>
  <div id="organization">
    <div>
      <p>南京乐伽商业管理有限公司</p>
      <div class="organ-tree scroll_bar">
        <div class="strt-wrap flex-center" id="strtWrap" ref="strtWrap" @mousedown="handleDragOrgan">
          <div class="strt-block">
            <div class="strt-part">
              <span class="strt-name">总裁办</span>
              <div class="line-v"><span></span></div>
              <div class="strt-block">
                <div class="strt-part">
                  <span class="line-h line-h-r"></span>
                  <div class="line-v"><span></span></div>
                  <span class="strt-name">CEO姜千</span>
                  <div class="line-v"><span></span></div>
                  <div class="strt-block">
                    <div class="strt-part">
                      <span class="strt-name">总裁助理</span>
                    </div>
                  </div>
                  <span class="common-part common-r"></span>
                </div>
                <div class="strt-part">
                  <span class="line-h line-h-c"></span>
                  <div class="line-v"><span></span></div>
                  <span class="strt-name">COO周燕涛</span>
                  <div class="line-v"><span></span></div>
                  <div class="strt-block">
                    <div class="strt-part">
                      <span class="line-h line-h-r"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-info">研发中心</span>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-info">财务中心</span>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-info">运维中心</span>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-info">人力资源中心</span>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-info">行政中心</span>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-l"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-info">稽查中心</span>
                    </div>
                  </div>
                  <div class="common-part common-l">
                    <div class="line-v"><span></span></div>
                    <div class="line-v"><span></span></div>
                    <div class="line-v"><span></span></div>
                    <div class="line-v"><span></span></div>
                  </div>
                </div>
                <div class="strt-part">
                  <span class="line-h line-h-c"></span>
                  <div class="line-v"><span></span></div>
                  <span class="strt-name">CMO施昆</span>
                  <div class="line-v"><span></span></div>
                  <div class="strt-block">
                    <div class="strt-part">
                      <span class="line-h line-h-r"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-name">财务中心</span>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-name">研发中心</span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-part">
                        <div class="line-v"><span></span></div>
                        <span class="strt-info">研发总监</span>
                      </div>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-l"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-name">稽查中心</span>
                    </div>
                  </div>
                </div>
                <div class="strt-part">
                  <span class="line-h line-h-l"></span>
                  <div class="line-v"><span></span></div>
                  <span class="strt-name">CQO夏云翔</span>
                  <div class="line-v"><span></span></div>
                  <div class="strt-block">
                    <div class="strt-part">
                      <span class="line-h"></span>
                      <div class="line-v"><span></span></div>
                      <span class="strt-name">营销中心</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
