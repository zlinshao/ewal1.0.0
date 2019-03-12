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
                 @click="isTrain = item.id;train_detail_visible = true"
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
          :size="{width: 650 + 'px',height: 600 + 'px'}"
          @close="train_management_visible = false"
        >
          <div class="dialog_container">
            <div class="dialog_header flex">
              <h3>培训管理</h3>
              <div class="icons add" @click="is_add = true"><b>+</b></div>
            </div>
            <div class="dialog_main">
              <el-table
                :data="train_management_list"
                height="400px"
              >
                <el-table-column prop="name" label="培训名称" align="center"></el-table-column>
                <el-table-column prop="lecturer" label="讲师" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <span class="edit_btn" @click="handleOpenEditTrain(scope.row)">编辑</span>
                    <span class="delete_btn" @click="del_visible = true">删除</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="new_train flex" v-show="is_add">
                <el-input v-model="add_params.name" placeholder="请输入培训名称" size="small" style="width: 200px"></el-input>
                <el-input v-model="add_params.lecturer" placeholder="请输入讲师名称" size="small" style="width: 200px"></el-input>
                <span @click="handleCancelAddTrain">删除</span>
              </div>
            </div>
            <div class="dialog_footer">
              <el-button size="small" @click="" v-show="is_add" type="danger">确定</el-button>
              <el-button size="small" @click="train_management_visible = false" type="info">取消</el-button>
            </div>
          </div>
        </lj-dialog>

        <!--编辑培训管理-->
        <lj-dialog
          :visible="edit_train_visible"
          :size="{width: 400 + 'px',height: 400 + 'px'}"
          @close="edit_train_visible = false"
        >
          <div class="dialog_container">
            <div class="dialog_header">
              <h3>编辑</h3>
            </div>
            <div class="dialog_main borderNone">
              <el-form :model="edit_train_params" size="mini" label-width="80px" class="showPadding">
                <el-form-item label="培训类型">
                  <el-input v-model="edit_train_params.train_type"></el-input>
                </el-form-item>
                <el-form-item label="培训名称">
                  <el-input v-model="edit_train_params.train_name"></el-input>
                </el-form-item>
                <el-form-item label="讲师">
                  <el-input v-model="edit_train_params.lecturer"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="edit_train_params.train_new_lecturer"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="dialog_footer">
              <el-button size="mini" type="danger" plain>提交</el-button>
              <el-button size="mini" plain @click="edit_train_visible = false">取消</el-button>
            </div>
          </div>
        </lj-dialog>

        <!--删除-->
        <lj-dialog
          :visible="del_visible"
          :size="{width: 400 + 'px',height: 350 + 'px'}"
          @close="del_visible = false"
        >
          <div class="dialog_container">
            <div class="dialog_header">
              <h3>确定</h3>
            </div>
            <div class="dialog_main">
              <div class="resIcon iconDelete"></div>
              <span class="unUse-txt">确定删除该培训课程吗?</span>
            </div>
            <div class="dialog_footer">
              <el-button type="danger" @click="del_visible = false">确定</el-button>
              <el-button type="info" @click="del_visible = false">取消</el-button>
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

      <!--培训详情-->
      <lj-dialog
        :visible="train_detail_visible"
        :size="{width: 500 + 'px',height: 580 + 'px'}"
        @close="train_detail_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>培训详情</h3>
            <div class="header_right">
              <el-button size="mini" type="primary" plain>查看考试情况</el-button>
            </div>
          </div>
          <div class="dialog_main">
            <el-form size="mini" label-width="100px" class="train_detail">
              <el-form-item label="培训类型">
                <span>入职培训</span>
              </el-form-item>
              <el-form-item label="培训名称">
                <span>业务员入职培训</span>
              </el-form-item>
              <el-form-item label="培训地点">
                <span>大会议室</span>
              </el-form-item>
              <el-form-item label="讲师">
                <span>2019.02.10 12:00-14:00</span>
              </el-form-item>
              <el-form-item label="参会人员">
                <span>林依依</span>
              </el-form-item>
              <el-form-item label="培训提醒">
                <span>培训开始前00小时05分钟提醒</span>
              </el-form-item>
              <el-form-item label="查看附件">
                <span>.</span>
              </el-form-item>
              <el-form-item label="查看试卷">
                <span>?</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="info" @click="train_detail_visible = false">取消</el-button>
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
        train_management_list: [
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
          {name: '文职入职培训',lecturer: '林依依'},
        ],

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
        ],
        more_visible: false,

        is_add: false, //添加培训管理
        add_params: {
          name: '',
          lecturer: ''
        },

        //编辑培训管理
        edit_train_visible: false,
        edit_train_params: {
          train_type: '',
          train_name: '',
          lecturer: '',
          train_new_lecturer: ''
        },

        //删除培训
        del_visible: false,

        //培训详情
        train_detail_visible: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      //打开编辑培训
      handleOpenEditTrain(row) {
        this.edit_train_params.lecturer = row.lecturer;
        this.edit_train_params.train_name = row.name;
        this.edit_train_visible = true;
      },
      handleCancelAddTrain() {
        this.add_params = {
          name: '',
          lecturer: ''
        };
        this.is_add = false;
      },
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
