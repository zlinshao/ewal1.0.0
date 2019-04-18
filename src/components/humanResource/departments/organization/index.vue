<template>
  <div id="organization">
    <div>
      <p>南京乐伽商业管理有限公司</p>
      <div class="organ-tree scroll_bar">
        <div class="strt-wrap flex-center" id="strtWrap" ref="strtWrap" @mousedown="handleDragOrgan">
          <div class="strt-block" v-show="top_position.length > 0">
            <div class="strt-part">
              <span class="strt-name">总裁办</span>
              <div class="line-v"><span></span></div>
              <div class="strt-block">
                <div class="strt-part" v-for="(item,index) in top_position">
                  <span class="line-h line-h-r" v-if="index === 0"></span>
                  <span class="line-h line-h-l" v-else-if="index === top_position.length - 1"></span>
                  <span class="line-h line-h-c" v-else></span>
                  <div class="line-v"><span></span></div>
                  <span class="strt-name" @click="handleTopGetDepart(item,index)">
                    <img :src="item.users && item.users.length > 0 && item.users[0].avatar" alt="">
                    {{ item.users && item.users.length > 0 && item.users[0].name }}
                  </span>
                  <div class="line-v" v-if="next_depart[index] && next_depart[index].length > 0"><span></span></div>
                  <div class="strt-block" v-show="next_depart[index] && next_depart[index].length > 0">
                    <div class="strt-part" v-for="(next_depart_item,idx) in next_depart[index]">
                      <span class="line-h line-h-r" v-if="idx === 0"></span>
                      <span class="line-h line-h-l" v-else-if="idx === next_depart[index].length - 1"></span>
                      <span v-else class="line-h line-h-c"></span>
                      <div class="line-v"><span></span></div>
                      <div class="strt-info" @click="handleGetChildDepart(next_depart_item,idx,index)">
                        <p>{{ next_depart_item.name }}</p>
                        <p>{{ next_depart_item.leader && next_depart_item.leader.name }}</p>
                      </div>
                      <div class="line-v" v-if="child_depart[index][idx] && child_depart[index][idx].length > 0"><span></span></div>
                      <div class="strt-block" v-show="child_depart[index][idx] && child_depart[index][idx].length > 0">
                        <div class="strt-part" v-for="(child_depart_item,child_idx) in child_depart[index][idx]">
                          <span class="line-h line-h-r" v-if="child_idx === 0"></span>
                          <span class="line-h line-h-l" v-else-if="child_idx === child_depart[index][idx].length - 1"></span>
                          <span v-else class="line-h line-h-c"></span>
                          <div class="line-v"><span></span></div>
                          <div class="strt-name strt-name-mini">
                            {{ child_depart_item.name }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--<div class="strt-part">-->
                  <!--<span class="line-h line-h-r"></span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<span class="strt-name">CEO姜千</span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<div class="strt-block">-->
                    <!--<div class="strt-part">-->
                      <!--<span class="strt-name">总裁助理</span>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="strt-part">-->
                  <!--<span class="line-h line-h-c"></span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<span class="strt-name">COO周燕涛</span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<div class="strt-block">-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h line-h-r"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>研发中心</p>-->
                        <!--<p>李一一</p>-->
                      <!--</div>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-block">-->
                        <!--<div class="strt-part">-->
                          <!--<div class="line-h line-h-r"></div>-->
                          <!--<div class="line-v"><span></span></div>-->
                          <!--<span class="strt-name strt-name-mini">开发</span>-->
                          <!--<div class="line-v"><span></span></div>-->
                          <!--<div class="strt-block">-->
                            <!--<div class="strt-part">-->
                              <!--<span class="line-h line-h-c"></span>-->
                              <!--<div class="primary-name">-->
                                <!--<span>冯宝宝</span>-->
                                <!--<span>冯宝宝</span>-->
                                <!--<span>冯宝宝</span>-->
                                <!--<span>冯宝宝</span>-->
                                <!--<span>冯宝宝</span>-->
                                <!--<span>冯宝宝</span>-->
                                <!--<span>冯宝宝</span>-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</div>-->
                        <!--</div>-->
                        <!--<div class="strt-part">-->
                          <!--<div class="line-h line-h-c"></div>-->
                          <!--<div class="line-v"><span></span></div>-->
                          <!--<span class="strt-name strt-name-mini">UI</span>-->
                        <!--</div>-->
                        <!--<div class="strt-part">-->
                          <!--<div class="line-h line-h-c"></div>-->
                          <!--<div class="line-v"><span></span></div>-->
                          <!--<span class="strt-name strt-name-mini">测试</span>-->
                        <!--</div>-->
                        <!--<div class="strt-part">-->
                          <!--<div class="line-h line-h-c"></div>-->
                          <!--<div class="line-v"><span></span></div>-->
                          <!--<span class="strt-name strt-name-mini">web前端</span>-->
                        <!--</div>-->
                        <!--<div class="strt-part">-->
                          <!--<div class="line-h line-h-l"></div>-->
                          <!--<div class="line-v"><span></span></div>-->
                          <!--<span class="strt-name strt-name-mini">PHP后端</span>-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h line-h-c"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>财务中心</p>-->
                        <!--<p>张楚岚</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h line-h-c"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>运维中心</p>-->
                        <!--<p>林东方</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h line-h-c"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>人力资源中心</p>-->
                        <!--<p>凌云</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h line-h-c"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>行政中心</p>-->
                        <!--<p>冯宝宝</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h line-h-l"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>稽查中心</p>-->
                        <!--<p>徐三</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="strt-part">-->
                  <!--<span class="line-h line-h-c"></span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<span class="strt-name">CMO施昆</span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<div class="strt-block">-->
                    <!--<div class="strt-part">-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<div class="strt-info">-->
                        <!--<p>营销中心</p>-->
                        <!--<p>林东方</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="strt-part">-->
                  <!--<span class="line-h line-h-l"></span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<span class="strt-name">CQO夏云翔</span>-->
                  <!--<div class="line-v"><span></span></div>-->
                  <!--<div class="strt-block">-->
                    <!--<div class="strt-part">-->
                      <!--<span class="line-h"></span>-->
                      <!--<div class="line-v"><span></span></div>-->
                      <!--<span class="strt-name">营销中心</span>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
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
        top_position: [],
        next_depart: {

        },
        child_depart: {

        }
      }
    },
    mounted() {
      this.getTopPosition();
    },
    watch: {},
    computed: {},
    methods: {
      //获取下级部门
      handleGetChildDepart(next_depart,idx,index) {
        this.$http.get('organization/organization',{
          parent_id: next_depart.id
        }).then(res => {
          if (res.code === '20000') {
            this.child_depart[index] = Object.assign({},this.child_depart,{
              [idx]: res.data.data
            })
          } else {
            this.child_depart[index] = Object.assign({},this.child_depart,{
              [idx]: []
            })
          }
          console.log(this.child_depart);
          debugger;
        })
      },
      //获取领导管辖的部门
      handleTopGetDepart(item,index) {
        this.child_depart = Object.assign({},this.child_depart,{
          [index]: {}
        });
        console.log(this.child_depart);
        this.$http.get('organization/organization',{
          position_id: [item.id]
        }).then(res => {
          if (res.code === '20000') {
            this.next_depart = Object.assign({},this.next_depart,{
              [index] : res.data.data
            })
          } else {
            this.next_depart = Object.assign({},this.next_depart,{
              [index] : []
            })
          }
        });
        console.log(this.next_depart);
      },
      //获取顶级领导列表
      getTopPosition() {
        this.$http.get('organization/position',{
          page: 1,
          limit: 999,
          is_top: 1
        }).then(res => {
          if (res.code === '20000') {
            this.top_position = res.data.data;
            for (var i = 0;i<this.top_position.length;i++) {
              this.handleTopGetDepart(this.top_position[i],i);
            }
          } else {
            this.top_position = [];
          }
        })
      },
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
