<template>
  <div id="videoLearning">
    <div class="video-lists">
      <div class="video-list-info" v-for="(item,index) in dataList">
        <div class="video-box" @mouseleave="onMouseOut()" @mouseenter="onMouseIn(index)"
        >
          <div class="video-box-top justify-end items-bet" v-show="is_show&&index===current">
                        <span><i @click.stop="detail(item)">详情</i><i @click.stop="edit(item)">编辑</i><i
                          @click.stop="del(item)">删除</i></span>
          </div>
          <div class="video-box-middle">
            <div class="video-border">
              <div></div>
            </div>
            <div class="video-inner">
              <div>
                <img-slider :arr="item.file_id" :single="true"
                            @played="addVideoPlayCount(item.id)"
                            :size="{width:'100%',height:'100%'}"></img-slider>
              </div>
            </div>
          </div>
          <div class="video-box-bottom justify-bet">
            <span>{{item.name}}</span>
            <span>{{item.created_at}}</span>
            <span><i class="view"></i><i>{{item.click}}</i></span>
          </div>
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

    <!--编辑视频or增加视频-->
    <lj-dialog :visible.sync="visible" :size="{width: 440 + 'px',height: 400 + 'px'}">
      <div class="dialog_container borderNone">
        <div class="dialog_header">
          <h3>{{flag===1?'编辑视频':flag===2?'增加视频':flag===3?'视频详情':''}}</h3>
        </div>
        <div class="dialog_main">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
            <el-form-item label="视频名称" prop="name" required>
              <el-input placeholder="必填" v-model="form.name" size="small" :disabled="flag===3"></el-input>
            </el-form-item>
            <el-form-item label="可见岗位" prop="position" required>
              <post-choose title="必选" width="300" v-model="form.position" :disabled="flag===3"></post-choose>
            </el-form-item>

            <el-form-item label="视频附件" prop="file_info" required>
              <lj-upload class="upload-offset" :disabled="flag===3" :limit-easy="['video']" v-model="form.file_info"
                         :max-size="1024" :num="1" size="40" :download="false"></lj-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" v-if="flag===1||flag===2" size="small" @click="submit(flag)">确定</el-button>
          <el-button type="info" v-if="flag===1||flag===2" size="small"
                     @click="visible = false;current_id = ''">取消
          </el-button>
          <el-button type="danger" v-if="flag===3" size="small" @click="visible = false;current_item = ''">关闭
          </el-button>
        </div>
      </div>
    </lj-dialog>

  </div>
</template>

<script>
  import {leJiaCollegeMenu} from '../../../assets/js/allModuleList.js';
  import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';

  export default {
    name: "videoLearning",
    components: {
      ImgSlider
    },
    data() {
      return {

        rules: {
          name: [
            {required: true, message: '请输入视频名称', trigger: ['blur', 'change']},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请选择可见岗位', trigger: ['blur', 'change']},
          ],
          file_info: [
            {required: true, message: '请选择视频附件', trigger: ['blur', 'change']},
          ],
        },

        url: globalConfig.leJiaCollege_server,
        leJiaCollegeMenu,
        count: 0,
        flag: 1,
        showFinMenuList: false,
        is_show: true,
        visible: false,
        chooseTab: 3,
        current: '',
        current_item: '',
        form: {
          name: '',
          file_info: [],//视频的七牛云文件数组
          position: '',//岗位id数组
          file_id: '',//视频的七牛云文件id
        },
        params: {//查询参数
          search: '',
          startRange: '',
          endRange: '',
          offset: 1,
          limit: 8,
          department_ids: '',
          export: '',
          all: 1
        },
        dataList: [],
      }
    },
    mounted() {
      this.getDataList();
    },
    created() {
      this.$bus.on('add', this.getVal)
    },
    beforeDestroy() {
      this.$bus.off('add', this.getVal);
    },
    methods: {
      //增加视频点击量
      addVideoPlayCount(id) {
        this.$http.post(`${this.url}api/video/study/click/${id}`);
      },

      //详情
      detail(row) {
        for (let item of Object.keys(this.form)) {
          this.form[item] = '';
        }
        this.current_item = row;
        this.flag = 3;
        this.visible = true;
        this.$http.get(this.url + '/api/video/study/' + this.current_item.id).then(res => {
          if (res.status === 200) {
            let result = res.data;
            let position_arr = result.position;
            let file_arr = result.file_id;
            let position_arr_ids = [];
            let file_arr_ids = [];
            for (let item of position_arr) {//权限ids
              position_arr_ids.push(item.id);
            }
            for (let item of file_arr) {//文件ids
              file_arr_ids.push(item.id)
            }
            this.form.position = position_arr_ids;
            this.form.file_id = file_arr_ids;
            this.form.file_info = file_arr_ids;
            this.form.name = result.name;
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
          this.getDataList();
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
        this.getDataList();
      },
      //新增弹窗
      getVal(val) {
        this.visible = val;
        this.current_item = '';
        this.flag = 2;
        for (let item of Object.keys(this.form)) {
          this.form[item] = '';
        }
      },
      //编辑弹出
      edit(row) {
        for (let item of Object.keys(this.form)) {
          this.form[item] = '';
        }
        this.visible = true;
        this.flag = 1;
        this.current_item = row;
        this.$http.get(this.url + '/api/video/study/' + this.current_item.id).then(res => {
          if (res.status === 200) {
            let result = res.data;
            let position_arr = result.position;
            let file_arr = result.file_id;
            let position_arr_ids = [];
            let file_arr_ids = [];
            for (let item of position_arr) {//权限ids
              position_arr_ids.push(item.id);
            }
            for (let item of file_arr) {//文件ids
              file_arr_ids.push(item.id)
            }
            this.form.position = position_arr_ids;
            this.form.file_id = file_arr_ids;
            this.form.file_info = file_arr_ids;
            this.form.name = result.name;
          }
        })
      },
      //提交
      submit(type) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            let paramsForm = {
              name: this.form.name,
              file_id: this.form.file_info[0],
              position: this.form.position
            };
            if (type === 1) {
              this.$http.put(this.url + '/api/video/study/' + this.current_item.id, paramsForm).then(res => {
                this.callbackSuccess(res);
              })
            } else if (type === 2) {
              this.$http.post(this.url + '/api/video/study', paramsForm).then(res => {
                this.callbackSuccess(res);
              })
            }
            this.visible = false;
            this.current_item = '';
          }
        });
      },

      //删除
      del(row) {
        this.$LjConfirm({icon: 'delete', content: '确定删除该视频吗？'}).then(() => {
          this.$http.delete(this.url + '/api/video/study/' + row.id,).then(res => {
            this.$LjNotifyEasy(res,()=> {
              this.getDataList();
            });
          })
        });
      },

      //获取视频列表
      getDataList() {
        this.dataList = [];
        this.showLoading(true);
        this.$http.get(this.url + '/api/video/study', this.params).then(res => {
          this.showLoading(false);
          if (res.status === 200) {
            this.dataList = res.data.data;
            this.count = res.data.total;
          } else {
            this.dataList = [];
            this.count = 0;
          }
        })
      },

      onMouseIn(index) {
        this.is_show = true; //鼠标移入显示
        this.current = index;
      },

      onMouseOut() {
        this.is_show = false; //鼠标移出隐藏
        this.current = null;
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/leJiaCollege/videoLearning/index.scss";

  @mixin leJiaCollegeImg($n, $m) {
    $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #videoLearning {
      .video-lists {
        .video-list-info {
          .video-box {
            .video-box-top {
              span {
                i {
                  &:hover {
                    @include leJiaCollegeImg('theme1', 'huidi2.png');
                  }
                }
              }
            }

            .video-box-middle {
              &:hover {
                + div {
                  span {
                    color: #CF2E33
                  }
                }
              }

              .video-border {
                > div {
                  @include leJiaCollegeImg('theme1', 'video-border-grey.png');

                  &:hover {
                    @include leJiaCollegeImg('theme1', 'video-border-red.png');

                    + div {
                      div {
                        span {
                          @include leJiaCollegeImg('theme1', 'hover-red.png');
                        }
                      }
                    }
                  }
                }
              }

              .video-inner {
                div {
                  span {
                    @include leJiaCollegeImg('theme1', 'defalut-grey.png');
                  }
                }
              }
            }

            .video-box-bottom {
              span:nth-child(3) {
                .view {
                  @include leJiaCollegeImg('theme1', 'ico_yueduliang.png');
                }
              }
            }
          }
        }
      }
    }
  }
</style>
