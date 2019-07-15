<template>
  <div id="postPlanning">

    <div id="menu" v-if="current_page===0">
      <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px','padding-left':0 }">
        <div class="menu-list flex-center">
                <span
                  v-for="(item,index) in selects"
                  class="flex-center"
                  @click="verticalListRouterDirect(item,index)"
                >
                    <i class="writingMode">{{item.title}}</i>
                </span>
        </div>


        <div class="right-tab">
          <div v-for="item in tabs"
               @click="rightListRouterDirect(item)">
                    <span>
                        <i class="writingMode">{{item.title}}</i>
                    </span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="mainList justify-bet" :style="{'height': this.mainListHeight(-9) + 'px'}" v-if="current_page===1">
      <div class="edit_btn">
        <span v-if="levelDataDetail.level!==8" @click="openEdit">编 辑</span>
      </div>

      <!--<div class="tab" v-if="tab===6">
        <div class="main-left">
          <div class="left-top">
            <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
            <div>
              <span>{{levelDataDetail.promote.level_standard}}</span>
              <span>{{levelDataDetail.promote.promote_direction}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
            <div>
              <span>{{levelDataDetail.down.level_standard}}</span>
              <span>{{levelDataDetail.down.substandard_measure}}</span>
            </div>
          </div>
        </div>

        <div class="main-middle flex-center">
          <div>
            <span>业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>
      <div class="tab" v-if="tab===5">
        <div class="main-left">
          <div class="left-top">
            <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
            <div>
              <span>{{levelDataDetail.promote.level_standard}}</span>
              <span>{{levelDataDetail.promote.promote_direction}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
            <div>
              <span>{{levelDataDetail.down.level_standard}}</span>
              <span>{{levelDataDetail.down.substandard_measure}}</span>
            </div>
          </div>
        </div>

        <div class="main-middle flex-center">
          <div>
            <span>业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>
      <div class="tab" v-if="tab===4">
        <div class="main-left">
          <div class="left-top">
            <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
            <div>
              <span>{{levelDataDetail.promote.level_standard}}</span>
              <span>{{levelDataDetail.promote.promote_direction}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
            <div>
              <span>{{levelDataDetail.down.level_standard}}</span>
              <span>{{levelDataDetail.down.substandard_measure}}</span>
            </div>
          </div>
        </div>

        <div class="main-middle flex-center">
          <div>
            <span>业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>
      <div class="tab" v-if="tab===3">
        <div class="main-left">
          <div class="left-top">
            <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
            <div>
              <span>{{levelDataDetail.promote.level_standard}}</span>
              <span>{{levelDataDetail.promote.promote_direction}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
            <div>
              <span>{{levelDataDetail.down.level_standard}}</span>
              <span>{{levelDataDetail.down.substandard_measure}}</span>
            </div>
          </div>
        </div>

        <div class="main-middle flex-center">
          <div>
            <span>业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>
      <div class="tab" v-if="tab===2">
        <div class="main-left">
          <div class="left-top">
            <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
            <div>
              <span>{{levelDataDetail.promote.level_standard}}</span>
              <span>{{levelDataDetail.promote.promote_direction}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
            <div>
              <span>{{levelDataDetail.down.level_standard}}</span>
              <span>{{levelDataDetail.down.substandard_measure}}</span>
            </div>
          </div>
        </div>

        <div class="main-middle flex-center">
          <div>
            <span>业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>-->
      <div class="tab" v-if="tab===1 || tab===2 || tab===3 || tab===4 || tab===5 || tab===6">
        <div class="main-left">
          <div class="left-top">
            <div class="flex-center"><span class="writingMode flex-center">职位晋升</span></div>
            <div>
              <span>{{levelDataDetail.promote.level_standard}}</span>
              <span>{{levelDataDetail.promote.promote_direction}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="flex-center"><span class="writingMode flex-center">职位贬罚</span></div>
            <div>
              <span>{{levelDataDetail.down.level_standard}}</span>
              <span>{{levelDataDetail.down.substandard_measure}}</span>
            </div>
          </div>
        </div>

        <div class="main-middle flex-center">
          <div>
            <span>业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>

      <div class="tab" v-if="tab===7">
        <div class="main-middle flex-center">
          <div>
            <span class="spacial-tab">业绩提成</span>
            <span>{{levelDataDetail.achievement_desc}}</span>
          </div>
        </div>
      </div>

      <div class="tab" v-if="tab===8">
        <div class="slogan">
          <span><i class="writingMode">共 创 未 来。</i></span>
          <span><i class="writingMode">携 手 并 进，</i></span>
        </div>
      </div>

      <div class="main-right">
        <div class="right-list">
          <span v-for="(item,index) in selects" :class="{'active':tab === item.id,'default': tab != item.id}"
                @click="selectTab(item.id,index)">{{item.title}}</span>
        </div>
      </div>
    </div>
    <!--新人训储备培训-->
    <div class="mainList justify-bet mainList-train" :style="{'height': this.mainListHeight(-9) + 'px'}"
         v-if="current_page===2">
      <div class="train_btn">
        <span v-for="item in tabSelects" @click="rightListRouterDirect(item)"
              :class="chooseTab === item.id ? 'chooseTab':'defaultTab'">
          <i class="writingMode">{{item.title}}</i>
        </span>
      </div>
      <div class="edit_btn">
        <span @click="openNewTraining">添 加</span>
        <span @click="openEditNewTraining">编 辑</span>
      </div>

      <!--培训-->
      <div class="train-box">
        <span :key="item.id" v-for="item in trainData"><i>{{item.title}}</i></span>
      </div>
    </div>
    <!--编辑-->
    <lj-dialog :visible.sync="edit_visible" :size="{width: 460 + 'px',height: 700 + 'px'}">
      <div class="dialog_container borderNone">
        <div class="dialog_header">
          <h3>{{'p'+levelDataDetail.level}}</h3>
        </div>
        <div class="dialog_main">
          <el-form ref="form" :model="levelDataDetail" label-width="68px">
            <p style="text-align: left;margin-bottom: 10px">业绩提成</p>
            <el-form-item label="" label-width="0px">
              <el-input v-model="levelDataDetail.achievement_desc" size="small" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <div v-if="levelDataDetail.level!==7">
              <p style="text-align: left;margin-bottom: 10px;margin-top: 10px">职位晋升</p>
              <el-form-item label="等级标准" style="margin-bottom: 0">
                <el-input v-model="levelDataDetail.promote.level_standard" size="small"></el-input>
              </el-form-item>
              <el-form-item label="晋升方向" style="margin-bottom: 0">
                <el-input v-model="levelDataDetail.promote.promote_direction" size="small"></el-input>
              </el-form-item>
              <p style="text-align: left;margin-bottom: 10px;margin-top: 10px">职位贬罚</p>
              <el-form-item label="等级标准" style="margin-bottom: 0">
                <el-input v-model="levelDataDetail.down.level_standard" size="small"></el-input>
              </el-form-item>
              <el-form-item label="未达措施" style="margin-bottom: 0">
                <el-input v-model="levelDataDetail.down.substandard_measure" size="small"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="submitLevel()">确定</el-button>
          <el-button type="info" size="small" @click="edit_visible = false;current_id = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
     <!--编辑培训列表dialog-->
    <lj-dialog :visible.sync="newTrainingEdit_visible" :size="{width: 460 + 'px',height: 550 + 'px'}">
      <div class="dialog_container borderNone">
        <div class="dialog_header">
          <h3>{{chooseTab===1?'新人训':'储备培训'}}</h3>
        </div>
        <div class="dialog_main">
          <el-form>
            <el-form-item v-for="(item,index) in trainData" :key="item.id">
              <el-input placeholder="请输入" v-model="item.title"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="editTrainList()">确定</el-button>
          <el-button type="info" size="small" @click="newTrainingEdit_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--新增培训-->
    <lj-dialog :visible.sync="newTraining_visible" :size="{width: 400 + 'px',height: 350 + 'px'}">
      <div class="dialog_container borderNone">
        <div class="dialog_header">
          <h3>{{'添加'+chooseTab===1?'新人训':'储备培训'}}</h3>
        </div>
        <div class="dialog_main">
          <el-form ref="newTrainFormRef" :model="form" :rules="rules.form">
            <el-form-item prop="title" required label="培训名称">
              <el-input placeholder="必填" v-model="form.title"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="submitNewTrain()">确定</el-button>
          <el-button type="info" size="small" @click="newTraining_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  export default {
    name: "postPlanningLists",
    data() {
      return {
        rules: {
          form: {
            title: [
              {required: true, message: '请输入培训名称', trigger: ['blur', 'change']},
              {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
            ],
          },
        },

        url:globalConfig.leJiaCollege_server,
        current_page:0,
        tab: 1,//p1-p7 tab
        edit_visible: false,
        chooseTab: 1,//chooseTab初始值 新人训1/储备培训2
        tabSelects: [
          {id: 1, title: '新人训'},
          {id: 2, title: '储备培训'},
        ],
        form: {
          title: ''
        },

        trainData: [],

        /*newTrainData: [
          {id: 1, title: '企业介绍及条例宣贯'},
          {id: 2, title: '薪酬计算及晋升'},
          {id: 3, title: '跑盘技巧及实际操作'},
          {id: 4, title: '合同填写规范'},
          {id: 5, title: '租房谈判技巧及渠道维护'},
        ],
        storeData: [
          {id: 1, title: '企业文化'},
          {id: 2, title: '财务实务'},
          {id: 3, title: '储备片区经理实务'},
          {id: 4, title: '初级管理技巧'},
          {id: 5, title: '客诉处理'},
        ],*/
        selects: [
          {id: 1, title: '市场专员'},
          {id: 2, title: '储备片区经理'},
          {id: 3, title: '片区经理'},
          {id: 4, title: '储备区域经理'},
          {id: 5, title: '区域经理'},
          {id: 6, title: '城市副总'},
          {id: 7, title: '城市总'},
          {id: 8, title: '合伙人'},
        ],
        tabs: [
          {id: 1, title: '新人训', url: 'newTraining', tab: 1},
          {id: 2, title: '储备培训', url: 'reserveTraining', tab: 2},
        ],

        levelData: [],
        levelDataDetail: {
          id:null,
          name:null,
          level:null,
          achievement_desc: '',//溢出业绩介绍
          down: {
            level_standard: '',//等级标准介绍
            substandard_measure: '',//未达措施介绍
          },
          promote: {
            level_standard: '',//等级标准介绍
            promote_direction: '',//晋升方向介绍
          }
        },
        newTraining_visible: false,//新人训储备培训 新增表单
        newTrainingEdit_visible: false,//新人训储备培训 编辑表单
      }
    },
    computed: {},
    mounted() {
      this.getDataList();
    },

    methods: {
      //打开等级编辑表单
      openEdit() {
        this.edit_visible = true;
      },
      //打开编辑培训列表表单
      openEditNewTraining() {
        this.newTrainingEdit_visible = true;
      },
      //打开新建培训表单
      openNewTraining() {
        this.newTraining_visible = true;
      },
      selectTab(val, index) {//切换menu
        this.tab = val;
        for (let item of Object.keys(this.levelDataDetail)) {
          this.levelDataDetail[item] = this.levelData[index][item];
        }
      },
      //提交编辑等级
      submitLevel() {
        let params = _.cloneDeep(this.levelDataDetail);
        let id = params.id;
        this.$http.put(`${this.url}api/position/level/${id}`,params).then(res=> {
          this.$LjNotifyEasy(res,()=> {
            this.edit_visible = false;
            this.getDataList();
          });
        });
      },

      //编辑培训文章列表
      editTrainList() {
        let params = {};
        let isReturn = false;
        _.forEach(this.trainData,(o)=> {
          params[o.id] = {title:o.title};
          if(o.title.length>10) {
            isReturn = true;
            return true;
          }
        });
        if(isReturn) {
          this.$LjMessage('warning',{title:'警告',msg:'长度在 1 到 10 个字符'});
          return;
        }
        this.$http.post(`${this.url}api/position/article/allUpdate`,params).then(res=> {
          this.$LjNotifyEasy(res,()=> {
            this.newTrainingEdit_visible = false;
          })
        });
      },

      //添加新的培训名称
      submitNewTrain() {
        this.$refs['newTrainFormRef'].validate(valid=> {
          if(valid) {
            let params = {
              type_id: this.chooseTab,
              content:'',
              title:this.form.title
            };
            this.$http.post(`${this.url}api/position/article`,params).then(res=> {
              this.$LjNotifyEasy(res,()=> {
                this.newTraining_visible = false;
                this.getTrainDataList();
              })
            })
          }
        });
      },

      //获取等级列表
      getDataList() {
        this.showLoading(true);
        this.$http.get(globalConfig.leJiaCollege_server + '/api/position/level', this.params).then(res => {
          this.showLoading(false);
          if (res.status === 200) {
            this.levelData = res.data.sort(
              function (a, b) {
                return a.id - b.id
              }
            );
          }
        })
      },
      //获取培训列表/  1新人训 2储备培训
      getTrainDataList() {
        let params = {
          type_id:this.chooseTab
        };
        this.$http.get(`${this.url}api/position/article`,params).then(res=> {
          if(res.status === 200) {
            this.trainData = res.data?.data;
          }
        });
      },
      //岗位规划首页跳转
      verticalListRouterDirect(item,index) {
        this.current_page = 1;
        this.tab = item.id;
        for (let item of Object.keys(this.levelDataDetail)) {
          this.levelDataDetail[item] = this.levelData[index][item];
        }
      },
      //右侧新人训/储备培训跳转
      rightListRouterDirect(item) {
        this.current_page = 2;
        this.chooseTab = item.id;
        this.getTrainDataList();
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/leJiaCollege/postPlanning/index.scss";

  @mixin leJiaCollegeImg($n, $m) {
    $url: "../../../assets/image/leJiaCollege/" + $n + "/" + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #postPlanning {

      .mainList {
        @include leJiaCollegeImg("theme1", "postPlanning-bg.png");

        .train_btn {
          span {
            &:hover {
              @include leJiaCollegeImg("theme1", "new-train-red.png");
            }
          }

          .chooseTab {
            @include leJiaCollegeImg("theme1", "new-train-red.png");
            color: #ffffff;
          }

          .defaultTab {
            @include leJiaCollegeImg("theme1", "new-train-grey.png");
          }
        }

        .train-box {
          span {
            @include leJiaCollegeImg("theme1", "new-train-tab-grey.png");

            &:hover {
              @include leJiaCollegeImg("theme1", "new-train-tab.png");
            }
          }
        }

        .right-list {
          span {
            &:hover {
              @include leJiaCollegeImg("theme1", "right-list-red.png");
            }
          }
        }

        .active {
          @include leJiaCollegeImg("theme1", "right-list-red.png");
          color: #ffffff;
          -webkit-transform: scale(1.5);
          -moz-transform: scale(1.5);
          -o-transform: scale(1.5);
          @include leJiaCollegeImg("theme1", "right-list-red.png");
        }

        .default {
          @include leJiaCollegeImg("theme1", "right-list-grey.png");
        }

        .main-left {
          .left-top,
          .left-bottom {
            div:nth-child(1) {
              span {
                @include leJiaCollegeImg("theme1", "tab-red.png");
              }
            }

            div:nth-child(2) {
            }

            i {
            }

            p {
            }
          }
        }

        .main-middle {
          div {
            @include leJiaCollegeImg("theme1", "text-border.png");

            .spacial-tab {
              @include leJiaCollegeImg("theme1", "spacial-tab.png");
            }
          }
        }
      }

      .mainList-train {
        @include leJiaCollegeImg("theme1", "train-bg.png");
      }
    }

    #menu{
      .mainList{
        @include leJiaCollegeImg('theme1','train-bg.png');
        .menu-list{
          @for $i from 1 through 8{
            span:nth-child(#{$i}){
              @include leJiaCollegeImg('theme1','post#{$i}.png');
              &:hover{
                @include leJiaCollegeImg('theme1','hoverpost#{$i}.png');
                color:#FFFFFF;
              }
            }
          }

        }
      }
    }
  }
</style>
