<template>
  <div id="industryDynamic">
    <div class="lists">
      <div class="list-info flex-center" v-for="(item,index) in dataLists" @click="details(item.id)">
        <div class="list-info-box">
          <span>{{item.title}}</span>
          <span>{{item.content}}</span>
          <span><i @click.stop="edit(item.id,index)">编辑</i><i @click.stop="del(item.id,index)">删除</i></span>
        </div>
      </div>
    </div>
    <!--分页-->
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination
          :total="count"
          layout="total,jumper,prev,pager,next"
          :current-page="params.offset"
          :page-size="params.limit"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </div>
    </footer>

    <!--编辑行业动态-->
    <lj-dialog
      :visible="visible"
      :size="{width: 500 + 'px' ,height: 550 + 'px'}"
      @close="visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{current===1?'编辑行业动态':current===2?'新增行业动态':current===3?'详情':''}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="80px" :model="form" :rules="rules" ref="form">
            <el-form-item label="标题" prop="title" required>
              <el-input v-model="form.title" placeholder="请输入标题" :disabled="current===3"></el-input>
            </el-form-item>
            <el-form-item label="动态内容" prop="content" required>
              <el-input v-model="form.content" type="textarea" :rows="12"
                        placeholder="请输入动态内容" :disabled="current===3"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button v-if="current===1||current===2" type="danger" size="small" @click="submit(current)">确定</el-button>
          <el-button v-if="current===1||current===2" type="info" size="small" @click="visible = false;current_id = ''">
            取消
          </el-button>
          <el-button v-if="current===3" type="danger" size="small" @click="visible = false;current_id = '';">关闭
          </el-button>
        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  export default {
    name: "industryDynamic",
    data() {
      return {

        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: ['blur', 'change']},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: ['blur', 'change']},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ],
        },

        url:globalConfig.leJiaCollege_server,

        count: 0,
        visible: false,
        is_add: false,
        is_disabled: false,
        is_check: false,
        current: '',
        current_id: '',
        current_item: '',
        params: {//查询参数
          search: '',
          startRange: '',
          endRange: '',
          offset: 1,
          limit: 6,
          department_ids: '',
          export: '',
        },
        dataLists: [],

        form: {
          id: '',
          title: '',
          content: '',
        },
      }
    },
    mounted() {
      this.getIndustryList();
    },
    created() {
      this.$bus.on('add', this.getData)
    },
    beforeDestroy() {
      this.$bus.off('add', this.getData);
    },
    methods: {
      details(id) {
        this.visible = true;
        this.current = 3;
        this.$http.get(globalConfig.leJiaCollege_server + '/api/trade/dynamic/' + id).then(res => {
          if (res.status === 200) {
            this.form = res.data;
          }
        })
      },
      callbackSuccess(res) {
        if (res.status === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getIndustryList();
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      },
      //换页
      handleChangePage(page) {
        this.params.offset = page;
        this.getIndustryList();

      },
      //获取bus值
      getData(val) {
        this.visible = val;//新增弹出显示
        this.current = 2;
        console.log(Object.keys(this.form));
        for (let item of Object.keys(this.form)) {
          this.form[item] = '';
        }
      },
      //编辑弹框
      edit(id, index) {
        this.visible = true;
        this.current = 1;
        this.current_id = id;
        for (let item of Object.keys(this.form)) {
          this.form[item] = this.dataLists[index][item];
        }
      },
      //删除弹窗
      del(id) {
        this.$LjConfirm({icon:'delete',content:'确定删除这条行业动态吗？'}).then(()=> {
          this.current_id = id;
          this.$http.delete(globalConfig.leJiaCollege_server + '/api/trade/dynamic/' + this.current_id).then(res => {
            this.callbackSuccess(res);
          })
        })
      },
      //获取列表
      getIndustryList() {
        this.showLoading(true);
        this.$http.get(globalConfig.leJiaCollege_server + '/api/trade/dynamic', this.params).then(res => {
          this.showLoading(false);
          if (res.status === 200) {
            this.dataLists = res.data.data;
            this.count = res.data.total;
          } else {
            this.dataLists = [];
            this.count = 0;
          }
        })
      },
      //提交表单
      submit(type) {

        this.$refs['form'].validate(valid=> {
          if(valid) {
            if (type === 1) {//编辑
              this.$http.put(globalConfig.leJiaCollege_server + '/api/trade/dynamic/' + this.current_id, this.form).then(res => {
                this.callbackSuccess(res);
                this.visible = false;
              })
            } else if (type === 2) {//新增
              this.$http.post(globalConfig.leJiaCollege_server + '/api/trade/dynamic', this.form).then(res => {
                this.callbackSuccess(res);
                this.visible = false;
              })
            }
          }
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/leJiaCollege/industryDynamic/index.scss";

  @mixin leJiaCollegeImg($n, $m) {
    $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #industryDynamic {
      > div {
        .list-info {
          .list-info-box {
            @include leJiaCollegeImg('theme1', 'notice-border-grey.png');

            &:hover {
              @include leJiaCollegeImg('theme1', 'notice-border-red.png')
            }

            span {
              i {
                @include leJiaCollegeImg('theme1', 'btn-grey.png');

                &:hover {
                  @include leJiaCollegeImg('theme1', 'btn-red.png');
                }
              }
            }
          }
        }
      }
    }
  }


</style>
