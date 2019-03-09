<template>
  <div id="militaryOrganization" class="militaryOrganization">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center">
            <b>...</b>
          </p>
          <h1>排兵布阵</h1>
          <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
          </h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons add"><b>+</b></div>
          <div class="icons search"></div>
        </div>
      </div>
      <div class="main-nav">
          <span
            v-for="item in active"
            :key="item.id"
            :class="{'isActive': item.id === activeName}"
            @click="activeName = item.id"
          >{{ item.val }}</span>
      </div>
      <div class="main-container">
        <div class="content flex">
          <div class="left-guide flex-center">
            <div
              v-for="tmp in left_guide"
              :key="tmp.id"
              class="flex-center"
              :class="{'is-choose-guide': left_guide_choose === tmp.id}"
              @click="left_guide_choose = tmp.id"
            >
              <span>{{ tmp.val }}</span>
            </div>
          </div>
          <div class="right-content flex-center">
            <div class="list"
                 v-for="item in train_list"
                 :key="item.id"
                 :class="{'trainActive': isTrain === item.id}"
                 @click="isTrain = item.id"
            >
              <div class="content-top">
                <span>{{ item.title }}</span>
                <div>
                  <span class="writingMode">{{ item.time }}</span>
                  <span class="writingMode">{{ item.name }}</span>
                </div>
              </div>
              <div class="content-bottom">
                <span class="writingMode">{{ item.lecturer }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="guidance">
          <div class="subject items-center"
               v-for="tmp in guidance" :key="tmp.id"
               @click="handleClickTrainManagement(tmp.id)"
               :class="{'isGuidance': isGuidance === tmp.id}"
          >
            <div class="title flex-center">
              <span class="writingMode">{{ tmp.val }}</span>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>

      <div class="train_management">
        <!--培训管理-->
        <lj-dialog
          :visible="train_management_visible"
          :size="{width: 500 + 'px',height: 600 + 'px'}"
          @close="train_management_visible = false"
        >
          <div class="dialog_container">
            <div class="dialog_header">
              <h3>培训管理</h3>
              <div class="icons add"><b>+</b></div>
            </div>
            <div class="dialog_main">

            </div>
            <div class="dialog_footer">
              <el-button size="mini" @click="train_management_visible = false">取消</el-button>
            </div>
          </div>
        </lj-dialog>
      </div>

      <!--更多弹框-->
      <lj-dialog
        :visible="more_visible"
        :size="{width: 500 + 'px',height: 600 + 'px'}"
        @close="more_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>入职培训列表</h3>
          </div>
          <div class="dialog_main">
            <el-table
              :data="more_list"
              height="400px"
            >
              <el-table-column label="培训名称" prop="name" align="center"></el-table-column>
              <el-table-column label="时间" prop="time" align="center" ></el-table-column>
              <el-table-column label="讲师" prop="lecturer" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="dialog_footer">
            <el-button size="mini" @click="more_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>
    </div>
  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';

  export default {
    name: "index",
    components: {LjDialog},
    data() {
      return {
        selects: [
          {id: 1, title: '排班'},
          {id: 2, title: '考勤'},
          {id: 3, title: '培训'},
          {id: 4, title: '薪资'}
        ], //模块列表
        chooseTab: 3, //当前选中模块

        activeName: 1,
        active: [
          {id: 1, val: '课程培训'},
          {id: 2, val: '考试设置'},
        ],

        guidance: [ //右边向导
          {id: 1, val: '培训管理'},
          {id: 2, val: '更多'}
        ],
        isGuidance: 1,

        left_guide: [
          {id: 1, val: '入职培训'},
          {id: 2, val: '技能培训'},
        ],
        left_guide_choose: 1,

        train_list: [
          {
            id: 1,
            title: '一',
            name: '文职培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 2,
            title: '二',
            name: '文职培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 3,
            title: '三',
            name: '业务员培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 4,
            title: '四',
            name: '操作培训',
            time: '2019/01/02',
            lecturer: '林依依'
          },
          {
            id: 5,
            title: '五',
            name: '入职培训',
            time: '2019/01/02',
            lecturer: '林东方'
          }
        ],
        isTrain: 1,

        train_management_visible: false,

        more_list: [
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
          {name: '文职入职培训',time: '2019-01-20',lecturer: '林依依'},
        ],
        more_visible: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      //打开培训管理
      handleClickTrainManagement(id) {
        this.isGuidance = id;
        if (id === 2) {
          this.more_visible = true;
        } else {
          this.train_management_visible = true;
        }
      },
      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$store.dispatch('route_animation');
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/militaryOrganization/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .militaryOrganization {
      > div {
        .main-nav {
          .isActive {
            @include militaryImg('teji.png', 'theme1');
            color: white;
          }
        }
        .main-container {
          .guidance {
            .isGuidance {
              .title {
                border: 1px solid $colorE33;
                > span {
                  border: 1px solid $colorE33;
                  color: $colorE33;
                }
              }
              .line {
                background-color: $colorE33;
              }
            }
          }
          .content {
            .left-guide {
              > div {
                @include militaryImg('rzpxw.png', 'theme1');
              }
              .is-choose-guide {
                @include militaryImg('rzpxx(1).png', 'theme1');
                color: white;
              }
            }
            .right-content {
              .trainActive {
                .content-top {
                  > span {
                    color: white;
                    &:before {
                      background-color: $colorE33;
                    }
                  }
                  > div {
                    > span {
                      color: $colorE33;
                    }
                  }
                }
                .content-bottom {
                  > span {
                    color: $colorE33;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
