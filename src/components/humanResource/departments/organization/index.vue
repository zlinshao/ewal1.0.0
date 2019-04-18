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
                      <div class="strt-info">
                        <p>研发中心</p>
                        <p>李一一</p>
                      </div>
                      <div class="line-v"><span></span></div>
                      <div class="strt-block">
                        <div class="strt-part">
                          <div class="line-h line-h-r"></div>
                          <div class="line-v"><span></span></div>
                          <span class="strt-name strt-name-mini">开发</span>
                          <div class="line-v"><span></span></div>
                          <div class="strt-block">
                            <div class="strt-part">
                              <span class="line-h line-h-c"></span>
                              <div class="primary-name">
                                <span>冯宝宝</span>
                                <span>冯宝宝</span>
                                <span>冯宝宝</span>
                                <span>冯宝宝</span>
                                <span>冯宝宝</span>
                                <span>冯宝宝</span>
                                <span>冯宝宝</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="strt-part">
                          <div class="line-h line-h-c"></div>
                          <div class="line-v"><span></span></div>
                          <span class="strt-name strt-name-mini">UI</span>
                        </div>
                        <div class="strt-part">
                          <div class="line-h line-h-c"></div>
                          <div class="line-v"><span></span></div>
                          <span class="strt-name strt-name-mini">测试</span>
                        </div>
                        <div class="strt-part">
                          <div class="line-h line-h-c"></div>
                          <div class="line-v"><span></span></div>
                          <span class="strt-name strt-name-mini">web前端</span>
                        </div>
                        <div class="strt-part">
                          <div class="line-h line-h-l"></div>
                          <div class="line-v"><span></span></div>
                          <span class="strt-name strt-name-mini">PHP后端</span>
                        </div>
                      </div>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-info">
                        <p>财务中心</p>
                        <p>张楚岚</p>
                      </div>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-info">
                        <p>运维中心</p>
                        <p>林东方</p>
                      </div>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-info">
                        <p>人力资源中心</p>
                        <p>凌云</p>
                      </div>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-info">
                        <p>行政中心</p>
                        <p>冯宝宝</p>
                      </div>
                    </div>
                    <div class="strt-part">
                      <span class="line-h line-h-l"></span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-info">
                        <p>稽查中心</p>
                        <p>徐三</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="strt-part">
                  <span class="line-h line-h-c"></span>
                  <div class="line-v"><span></span></div>
                  <span class="strt-name">CMO施昆</span>
                  <div class="line-v"><span></span></div>
                  <div class="strt-block">
                    <div class="strt-part">
                      <div class="line-v"><span></span></div>
                      <div class="strt-info">
                        <p>营销中心</p>
                        <p>林东方</p>
                      </div>
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
