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
          <div class="icons add" @click="new_train_visible = true"><b>+</b></div>
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

      <!--课程培训-->
      <div class="main-container" :class="{'subject-train' : activeName === 2}">
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

      <!--考试设置-->
      <div class="main-container exam-container"
           :class="{'exam-setting': activeName === 2}">
        <div class="content flex-center">
          <div class="guidance">
            <div class="subject items-center"
                 v-for="tmp in exam_guide" :key="tmp.id"
                 @click="is_exam_guide = tmp.id"
                 :class="{'isGuidance': is_exam_guide === tmp.id}"
            >
              <div class="title flex-center">
                <span class="writingMode">{{ tmp.val }}</span>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="contain flex">
            <div class="exam-paper flex-center">
              <div v-for="item in exam_library" :key="item.id">
                <div class="writingMode">
                  {{ item.name }}
                </div>
                <div class="writingMode">
                  {{ item.type }}
                </div>
              </div>
            </div>
            <div class="exam-control flex-center">
              <div>
                <span class="writingMode" @click="new_exam_library = true">新建题库</span>
              </div>
              <div>
                <span class="writingMode">更多</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="train_management">
        <!--培训管理-->
        <lj-dialog
          :visible="train_management_visible"
          :size="{width: 650 + 'px',height: 640 + 'px'}"
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
                <el-input v-model="add_params.lecturer" placeholder="请输入讲师名称" size="small"
                          style="width: 200px"></el-input>
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
              <el-button size="mini" type="danger">提交</el-button>
              <el-button size="mini" type="info" @click="edit_train_visible = false">取消</el-button>
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
              <el-table-column label="时间" prop="time" align="center"></el-table-column>
              <el-table-column label="讲师" prop="lecturer" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="dialog_footer">
            <el-button size="mini" type="info" @click="more_visible = false">取消</el-button>
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
            <el-button type="info" size="mini" @click="train_detail_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--新建培训-->
      <lj-dialog
        :visible="new_train_visible"
        :size="{width: 520 + 'px',height: 670 + 'px'}"
        @close="new_train_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>新建培训</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="new_train_params" style="text-align: left" size="small" label-width="100px">
              <el-form-item label="培训类型">
                <el-select v-model="new_train_params.train_type" placeholder="请选择培训类型" style="width: 320px">
                  <el-option :value="1" label="入职培训"></el-option>
                </el-select>
                <span class="btn_add" @click="train_type_visible = true">+</span>
              </el-form-item>
              <el-form-item label="培训名称">
                <el-select v-model="new_train_params.train_name" placeholder="请选择培训名称" style="width: 320px">
                  <el-option :value="1" label="入职培训"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="培训地点">
                <el-select v-model="new_train_params.train_place" placeholder="请选择培训地点" style="width: 320px">
                  <el-option :value="1" label="入职培训"></el-option>
                </el-select>
                <span class="btn_add">+</span>
              </el-form-item>
              <el-form-item label="培训时间">
                <el-date-picker v-model="new_train_params.train_time" placeholder="请选择培训时间"
                                style="width: 320px"></el-date-picker>
              </el-form-item>
              <el-form-item label="讲师">
                <el-select v-model="new_train_params.train_lecturer" style="width: 320px"></el-select>
              </el-form-item>
              <el-form-item label="参会人员">
                <el-input v-model="new_train_params.train_people" placeholder="请选择参会人员" style="width: 320px"></el-input>
              </el-form-item>
              <el-form-item label="培训提醒">
                培训开始前
                <el-input style="width: 60px" v-model="new_train_params.train_notify_hour"></el-input>
                小时
                <el-input style="width: 60px" v-model="new_train_params.train_notify_minutes"></el-input>
                分钟提醒
              </el-form-item>
              <el-form-item label="上传课件"></el-form-item>
              <el-form-item label="添加试卷"></el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="small" type="danger">提交</el-button>
            <el-button size="small" type="info" @click="new_train_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--添加培训类型-->
      <lj-dialog
        :visible="train_type_visible"
        :size="{width: 520 + 'px',height: 400 + 'px'}"
        @close="train_type_visible = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>添加培训类型</h3>
            <div class="header_right">
              <div class="btn_add">+</div>
            </div>
          </div>
          <div class="dialog_main borderNone">
            <el-form :model="train_type_params" size="small" label-width="110px" class="showPadding">
              <el-form-item label="培训类型">
                <el-input v-model="train_type_params.train_type" placeholder="请输入培训类型"></el-input>
              </el-form-item>
              <el-form-item label="培训地点">
                <el-input v-model="train_type_params.train_place" placeholder="请输入培训地点"></el-input>
              </el-form-item>
              <el-form-item label="培训名称/讲师">
                <p style="margin-bottom: 15px">
                  <el-input style="width: 150px" v-model="train_type_params.train_name"
                            placeholder="请输入培训名称"></el-input>
                  <el-input style="width: 150px" v-model="train_type_params.train_lecturer"
                            placeholder="讲师姓名"></el-input>
                </p>
                <p>
                  <el-input style="width: 150px" v-model="train_type_params.train_name"
                            placeholder="请输入培训名称"></el-input>
                  <el-input style="width: 150px" v-model="train_type_params.train_lecturer"
                            placeholder="讲师姓名"></el-input>
                </p>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="small" type="danger">提交</el-button>
            <el-button size="small" type="info" @click="train_type_visible = false">取消</el-button>
          </div>
        </div>
      </lj-dialog>

      <!--新建题库-->
      <lj-dialog
        :visible="new_exam_library"
        :size="{width: 400 + 'px',height: 320 + 'px'}"
        @close="new_exam_library = false"
      >
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>新建题库</h3>
          </div>
          <div class="dialog_main">
            <el-form :model="new_exam_form" size="mini" class="showPadding" label-width="80px">
              <el-form-item label="试卷类型">
                <el-select
                  v-model="new_exam_form.paper_type"
                  placeholder="请选择试卷类型">
                  <el-option :value="1" label="入职考试"></el-option>
                  <el-option :value="2" label="加薪考试"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试卷名称">
                <el-input v-model="new_exam_form.paper_name" placeholder="请输入试卷名称"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button size="mini" type="danger">确定</el-button>
            <el-button size="mini" type="info" @click="new_exam_library = false">取消</el-button>
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
        //新建题库
        new_exam_library: false,
        new_exam_form: {
          paper_type: '',
          paper_name: ''
        },

        selects: [
          {id: 1, title: '排班'},
          {id: 2, title: '考勤'},
          {id: 3, title: '培训'},
          {id: 4, title: '薪资'}
        ], //模块列表
        chooseTab: 3, //当前选中模块

        activeName: 2,
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
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
          {name: '文职入职培训', lecturer: '林依依'},
        ],

        more_list: [
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
          {name: '文职入职培训', time: '2019-01-20', lecturer: '林依依'},
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

        //新建培训
        new_train_visible: false,
        new_train_params: {
          train_type: '',
          train_name: '',
          train_place: '',
          train_time: '',
          train_lecturer: '',
          train_people: '',
          train_notify_hour: '00',
          train_notify_minutes: '05'
        },

        //添加培训类型
        train_type_visible: false,
        train_type_params: {
          train_type: '',
          train_name: '',
          train_lecturer: '',
          train_place: ''
        },

        //考试guide
        is_exam_guide: 1,
        exam_guide: [
          {id: 1, val: '题库管理'},
          {id: 2, val: '考试管理'}
        ],

        //题库
        exam_library: [
          {id: 1, name: '文职入职测试', type: '入职考试'},
          {id: 2, name: '文职入职测试', type: '入职考试'},
          {id: 3, name: '客服话术培训测试', type: '入职考试'},
          {id: 4, name: '文职入职测试', type: '入职考试'},
          {id: 5, name: '文职入职测试', type: '入职考试'},
          {id: 6, name: '文职入职测试', type: '入职考试'},
          {id: 7, name: '文职入职测试', type: '入职考试'},
          {id: 8, name: '文职入职测试', type: '入职考试'},
        ]
      }
    },
    mounted() {
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
        .exam-container {
          .content {
            @include militaryImg('ksszbj.png', 'theme1');
            .exam-control {
              > div {
                @include militaryImg('btn_hui.png', 'theme1');
                &:hover {
                  @include militaryImg('btn_hong.png', 'theme1');
                }
              }
            }
          }
        }
      }
    }
  }
</style>
