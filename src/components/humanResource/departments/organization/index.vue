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
                    {{ item.name }} {{ item.users && item.users.length > 0 && item.users[0].name }}
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
                          <div class="strt-name strt-name-mini" @click="handleGetStaff(child_depart_item,child_idx,idx,index)">
                            {{ child_depart_item.name }}
                          </div>
                          <div class="line-v" v-show="staff_list[index][idx][child_idx] && staff_list[index][idx][child_idx].length >0"><span></span></div>
                          <div class="strt-block" v-show="staff_list[index][idx][child_idx] && staff_list[index][idx][child_idx].length >0">
                            <div class="strt-part" v-for="(staff_item,staff_idx) in staff_list[index][idx][child_idx]">
                              <span class="line-h line-h-r" v-if="staff_idx === 0"></span>
                              <span class="line-h line-h-l" v-else-if="staff_idx === staff_list[index][idx][child_idx].length - 1"></span>
                              <span class="line-h line-h-c" v-else></span>
                              <div class="line-v"><span></span></div>
                              <div class="strt-info-mini">{{ staff_item.name }}&nbsp;<a>{{ staff_item.position && staff_item.position.length > 0 && staff_item.position[0].name }}</a></div>
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

        },
        staff_list: {

        },
      }
    },
    mounted() {
      this.getTopPosition();
    },
    watch: {},
    computed: {},
    methods: {
      //获取部门下面的人
      handleGetStaff(child_depart,child_idx,idx,index) {
        console.log(child_depart,child_idx,idx,index);
        this.$http.get('staff/user',{
          page: 1,
          limit: 999,
          org_id: child_depart.id
        }).then(res => {
          if (res.code === '20000') {
            this.staff_list[index][idx] = Object.assign({},this.staff_list[index][idx],{
              [child_idx]: res.data.data
            })
          } else {
            this.staff_list[index][idx] = Object.assign({},this.staff_list[index][idx],{
              [child_idx]: []
            })
          }
          console.log(this.staff_list);
        })
      },
      //获取下级部门
      handleGetChildDepart(next_depart,idx,index) {
        this.staff_list[index] = Object.assign({},this.staff_list[index],{
          [idx]:{}
        });
        this.$http.get('organization/organization',{
          parent_id: next_depart.id
        }).then(res => {
          if (res.code === '20000') {
            this.child_depart[index] = Object.assign({},this.child_depart[index],{
              [idx]: res.data.data
            })
          } else {
            this.child_depart[index] = Object.assign({},this.child_depart[index],{
              [idx]: []
            })
          }
        })
      },
      //获取领导管辖的部门
      handleTopGetDepart(item,index) {
        this.child_depart = Object.assign({},this.child_depart,{
          [index]: {}
        });
        this.staff_list = Object.assign({},this.child_depart,{
          [index]: {}
        });
        this.$http.get('organization/organization',{
          position_id: [item.id]
        }).then(res => {
          if (res.code === '20000') {
            this.next_depart = Object.assign({},this.next_depart,{
              [index] : res.data.data
            });
            for (var key in this.next_depart) {
              for (var i =0;i<this.next_depart[key].length;i++) {
                this.handleGetChildDepart(this.next_depart[key][i],i,key);
              }
            }
          } else {
            this.next_depart = Object.assign({},this.next_depart,{
              [index] : []
            })
          }
        });
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
