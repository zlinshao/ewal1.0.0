<template>
  <div>
    <div id="riskDetails" v-if="this.$route.query.pre_name!='公司内部规定'">
      <div>
        <div class="listTopCss items-bet">
          <div class="items-center listTopLeft">
            <h1>{{this.$route.query.pre_name}}</h1>
          </div>
        </div>
        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
          <div class="InternalRegulations-info">
            <div class="right-info flex-center">
              <div class="scroll_bar">
                <template v-if='classify_document.length >0'>
                  <div v-for="(item,index) in classify_document" class="right-info-list flex-center">
                    <div class="right-info-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                      <p class="flex-center">
                        <span v-show="seen&&index===current">
                          <i @click.stop="openEdit(item)">编辑</i>
                          <i @click.stop="openDel(item)">删除</i>
                        </span>
                        <a class="word_icon" @click="openFile(item.file_id[0].uri)">
                        </a>

                      </p>
                      <p><span>{{item.name}}</span></p>
                      <p><span>{{item.created_at}}</span></p>
                    </div>
                  </div>
                </template>
                <!-- <p class='nothing_mess' v-else style='width:100%;text-align:center;font-size:14px;color:#999;'>暂无数据</p> -->
              </div>
              <div class="bg-img">{{classify_document.length ==0?'暂无数据':''}}</div>
            </div>
            <div class="add-icons" @click="openAdd"><span>+</span></div>
          </div>
        </div>
      </div>

    </div>
    <div id="InternalRegulations" v-if="this.$route.query.pre_name==='公司内部规定'">
      <div>
        <div class="listTopCss items-bet">
          <div class="items-center listTopLeft">
            <h1>公司内部规定</h1>
          </div>
        </div>
        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
          <div class="InternalRegulations-info">
            <div class="left-info">
              <div class="scroll_bar" style="padding-left: 30px;">
                <p v-for="(item,index) in fileData" @click="selects(item.id)" :class="chooseTab===item.id?'activeTab':''"  :key="item.id">
                  <span class="flex-center"><i>{{index+1}}</i></span>
                  <span><i>{{item.name}}</i></span>
                </p>
              </div>
            </div>
            <div class="right-info flex-center">
              <div class="scroll_bar">
                <template v-if='classify_document.length >0'>
                  <div v-for="(item,index) in classify_document" class="right-info-list flex-center" :key="index">
                    <div class="right-info-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                      <p class="flex-center">
                        <span v-show="seen&&index===current">
                          <i @click.stop="openEdit(item)">编辑</i>
                          <i @click.stop="openDel(item)">删除</i>
                        </span>
                        <a class="word_icon" @click="openFile(item.file_id[0].uri)"></a>

                      </p>
                      <p><span>{{item.name}}</span></p>
                      <p><span>{{item.created_at}}</span></p>
                    </div>
                  </div>
                </template>
                <!-- <p class='nothing_mess' v-else style='width:100%;text-align:center;font-size:14px;color:#999;'>暂无数据</p> -->
              </div>
              <div class="bg-img" style='width:100%;text-align:center;font-size:14px;color:#999;'>{{classify_document.length==
                0?'暂无数据':''}}</div>
            </div>
            <div class="add-icons" @click="openAdd"><span>+</span></div>
          </div>
        </div>
      </div>
    </div>

    <DepartOrgan :module="departModule" :organData="organData" @close="hiddenOrgan"></DepartOrgan>
    <!--新增-->
    <lj-dialog :visible="add_visible" :size="{width: 450 + 'px' ,height:450 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{current_item===''?'新增文件':'编辑文件'}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="80px" v-model="form">
            <el-form-item label="所属部门">
              <el-input :readonly='true' placeholder="请选择" v-model="form.org_name" @focus="openDepart(1)"></el-input>
            </el-form-item>
            <el-form-item label="文件名称">
              <el-input placeholder="请选择" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="添加文件">
              <lj-upload v-model="form.file_info" size="40" style="position: absolute; top: -12px;"></lj-upload>
            </el-form-item>
            <el-form-item label="可见范围">
              <el-input :readonly='true' placeholder="请选择" v-model="form.permission_name" @focus="openDepart(2)"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="confirm">确定</el-button>
          <el-button size="small" type="info" @click="add_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <!--删除讲师-->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>删除</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该文件吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="delOk">确定</el-button>
          <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>

</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import DepartOrgan from '../../common/departOrgan.vue';
import LjUpload from '../../common/lightweightComponents/lj-upload';

export default {
  name: "InternalRegulations",
  components: {
    LjDialog,
    DepartOrgan,
    LjUpload
  },
  data () {
    return {
      add_visible: false,
      delete_visible: false,
      departModule: false,//部门
      organData: {},// 组织架构配置 选择数量 num
      seen: true,
      current: '',
      chooseTab: 1,
      fileData: [],
      classify_document: [],//分类文件列表
      form: {
        classify_id: '',//上一级分类id
        file_id: '',//七牛云文件id
        permission_name: '',//权限名称
        org_id: '',//所属部门
        org_name: '',//部门名称
        permission_org_id: [],//
        // user_id:[],//用户
        file_info: [],
        name: '',
      },
      open_type: '',
      pre_id: '',
      current_item: '',
      // pre_data: '',
    }
  },
  watch: {
    "$route.path": "getPath",
    "$route": 'getRoute',
  },
  // beforeRouteLeave(to, from, next) {
  //     if(from.path ==='/riskManagementDetail'){
  //         next({name : '三级列表页' , params : {'id':'跳页成功，还可以传递参数'}})
  //     }
  // },


  mounted () {
    this.pre_id = this.$route.query.pre_id;
    this.getDataLists();
    if (this.$route.query.pre_name === '公司内部规定') {
      this.pre_id = 63;
      this.chooseTab = 63;
      this.getTabList();
    }
    // this.pre_data = this.$route.query.pre_data;
  },
  methods: {
    getPath () {

    },
    selects (id) {
      this.chooseTab = id;
      this.pre_id = id;
      this.getDataLists();
    },
    getTabList () {//一级目录
      this.fileData = [];
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify", { parent_id: 60 }).then(res => {
        if (res.status === 200) {
          this.fileData = res.data.data;
        }
      })
    },

    openDepart (val) {
      this.departModule = true;
      this.open_type = val;
    },
    openAdd () {
      this.add_visible = true;
      this.current_item = '';
      for (let item of Object.keys(this.form)) {
        this.form[item] = ''
      }
    },
    openFile (val) {
      window.open(val);
    },
    hiddenOrgan (ids, names, arr) {//获取部门数据
      this.departModule = false;
      if (ids !== 'close') {
        if (this.open_type === 1) {
          this.form.org_name = names;
          this.form.org_id = ids[0];
        } else if (this.open_type === 2) {
          this.form.permission_org_id = ids;
          this.form.permission_name = names;
        }
      }
    },
    getDataLists () {//文件列表
      this.$http.get(globalConfig.risk_sever + "/api/risk/classify_document", { classify_id: this.pre_id }).then(res => {
        if (res.status === 200) {
          this.classify_document = res.data.data;
        }
      })
    },
    openEdit (row) {
      this.add_visible = true;
      this.current_item = row;
      if (row) {
        this.form.org_name = this.current_item.org_id.name;
        this.form.org_id = this.current_item.org_id.id;
        this.form.name = this.current_item.name;
        // this.form.file_info  = this.current_item.file_id;
        let ids = [];
        ids.push(row.org_id.id);
        this.form.permission_org_id = ids;
        this.form.permission_name = this.current_item.org_id.name;
        // this.form.file_id  = this.current_item.file_id[0].id;
        this.form.file_info = [];
        this.form.file_info.push(this.current_item.file_id[0].id);
      }
    },
    checkoutConfirm () {
      if (!this.form.org_name) {
        return '所属部门未选择'
      }
      if (!this.form.name) {
        return '文件名称未填写'
      }
      if (this.form.file_info.length == 0) {
        return '文件未添加'
      }
      if (!this.form.permission_name && this.form.permission_name.length == 0) {
        return '可见范围未选择'
      }
      return null
    },
    confirm () {
      let warn = this.checkoutConfirm()
      if (warn) {
        this.$LjNotify('warning', {
          title: warn,
          message: ''
        });
        return
      }

      let paramsForm = {
        classify_id: this.pre_id,//上级分类id
        file_id: this.form.file_info[0],//附件id
        permission: {
          org_id: this.form.permission_org_id,
          user_id: [],
        },//权限ids
        org_id: this.form.org_id,//部门ids
        name: this.form.name,//文件名
      };
      if (this.current_item) {
        this.$http.put(globalConfig.risk_sever + "/api/risk/classify_document/" + this.current_item.id, paramsForm).then(res => {
          if (res.status === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
            this.add_visible = false;
            this.getDataLists();
            this.current_item = '';
            for (let item of Object.keys(this.form)) {
              this.form[item] = ''
            }
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
            this.current_item = '';
            for (let item of Object.keys(this.form)) {
              this.form[item] = ''
            }
          }
        })
      } else if (this.current_item === '') {
        this.$http.post(globalConfig.risk_sever + "/api/risk/classify_document", paramsForm).then(res => {
          if (res.status === 200) {
            this.$LjNotify('success', {
              title: '成功',
              message: res.msg,
              subMessage: '',
            });
            this.add_visible = false;
            this.getDataLists();
            this.current_item = '';
            for (let item of Object.keys(this.form)) {
              this.form[item] = ''
            }
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
              subMessage: '',
            });
          }
        })
      }
    },
    openDel (row) {
      this.delete_visible = true;
      this.current_item = row;
    },
    delOk () {//删除
      this.$http.delete(globalConfig.risk_sever + "/api/risk/classify_document/" + this.current_item.id).then(res => {
        if (res.status === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getDataLists();
          this.delete_visible = false;
          this.current_item = '';
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      })
    },
    //鼠标移入
    onMousteIn: function (index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    //鼠标移出
    onMousteOut: function (index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    },


  },
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/riskManagement/common/index.scss";

@mixin riskManagementImg($m, $n) {
  $url: "../../../assets/image/riskManagement/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #riskDetails {
    .activeTab {
      span:first-child {
        i {
          color: #ffffff;
        }

        background: #cf2e33;
      }

      span:last-child {
        i {
          color: #cf2e33;
        }
      }
    }

    > div {
      .mainList {
        .InternalRegulations-info {
          .left-info {
            div {
              span {
                i {
                }

                i:first-child {
                }
              }
            }
          }

          .right-info {
            > div {
              .right-info-list {
                .right-info-box {
                  .word_icon {
                    @include riskManagementImg("word_icon.png", "theme1");
                  }

                  p {
                  }

                  p:first-child {
                    &:hover {
                    }

                    span {
                      i {
                        cursor: pointer;
                        &:hover {
                          @include riskManagementImg("xzgj.png", "theme1");
                        }
                      }
                    }
                  }

                  p:last-child {
                  }
                }
              }
            }

            .bg-img {
              @include riskManagementImg("diwen.png", "theme1");
            }
          }
        }
      }
    }
  }

  #InternalRegulations {
    .activeTab {
      span:first-child {
        i {
          color: #ffffff;
        }

        background: #cf2e33;
      }

      span:last-child {
        i {
          color: #cf2e33;
        }
      }
    }

    > div {
      .mainList {
        .InternalRegulations-info {
          .left-info {
            div {
              span {
                i {
                }

                i:first-child {
                }
              }
            }
          }

          .right-info {
            > div {
              .right-info-list {
                .right-info-box {
                  .word_icon {
                    @include riskManagementImg("word_icon.png", "theme1");
                  }

                  p {
                  }

                  p:first-child {
                    &:hover {
                    }

                    span {
                      i {
                        cursor: pointer;
                        &:hover {
                          @include riskManagementImg("xzgj.png", "theme1");
                        }
                      }
                    }
                  }

                  p:last-child {
                  }
                }
              }
            }

            .bg-img {
              @include riskManagementImg("diwen.png", "theme1");
            }
          }
        }
      }
    }
  }
}
</style>