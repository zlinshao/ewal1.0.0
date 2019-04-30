<template>
  <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
    <div id="birthday">
      <div class="birthday_info">
        <div class="today_birthday justify-center">
          <div class="today_birthday_list">
            <div class="birthday_box flex-center" v-for="(item,index) in todayBirthday">
              <div class="birthday_box_info" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                <div class="">
                  <img :src="item.avatar" alt="">
                  <div class="delete-icon" v-if="seen&&index===current" @click="delete_visible=true;current_id=item.id"></div>
                </div>
                <div class="user-info">
                  <span class="writingMode">{{item.department_name}}</span>
                  <span class="writingMode">{{item.name}}</span>
                </div>
              </div>

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
          <el-pagination :total="count" layout="total,jumper,prev,pager,next" :current-page="params.offset" :page-size="params.limit"
            @current-change="handleChangePage">
          </el-pagination>
        </div>
      </footer>

      <!--删除寿星信息-->
      <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="delete_visible = false">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>删除</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定删除这条寿星信息吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="delOk">确定</el-button>
            <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消
            </el-button>
          </div>
        </div>
      </lj-dialog>

      <lj-dialog :visible="add_visible" :size="{width: 400 + 'px',height: 400 + 'px'}" @close="cancelAddStatus">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>新增寿星</h3>
          </div>
          <div class="dialog_main borderNone">
            <el-form v-model="form" label-width="80px">
              <el-form-item label="寿星姓名">
                <el-input v-model="form.name" @focus="staffModule=true"></el-input>
              </el-form-item>
              <el-form-item label="寿星类型" prop="birthday_type">
                <el-select placeholder="请选择" v-model="form.birthday_type">
                  <el-option label="今日寿星" value='day'></el-option>
                  <el-option label="本月寿星" value='month'></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="寿星照片">
                <lj-upload v-model="form.file_info" size="40" style="position: absolute; top: -12px;"></lj-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="submit">确定</el-button>
            <el-button type="info" size="small" @click="cancelAddStatus">取消
            </el-button>
          </div>
        </div>
      </lj-dialog>
      <StaffOrgan :module="staffModule" @close="hiddenStaff"></StaffOrgan>
    </div>
  </div>

</template>

<script>
import LjDialog from '../../../../common/lj-dialog.vue';
import LjUpload from '../../../../common/lightweightComponents/lj-upload';
import StaffOrgan from '../../../../common/staffOrgan.vue';

export default {
  name: "birthday",
  components: {
    LjDialog,
    LjUpload,
    StaffOrgan
  },
  props: ['add_status', 'choose_type'],
  data () {
    return {
      delete_visible: false,
      add_visible: false,//新增
      staffModule: false,//员工
      current: '',//当前
      seen: false,//显隐
      current_id: '',

      params: {//查询参数
        search: '',
        offset: 1,
        limit: 10,
      },
      count: 0,
      todayBirthday: [],
      form: {
        name: '',
        user_id: '',
        birthday_type: '',
        file_info: [],
      },
      loaded: true,
      nomore: false,


    }
  },
  mounted () {
    this.getDataLists();
  },
  watch: {
    add_status: {
      handler (val) {
        this.add_visible = val;
      }, deep: true

    },
    choose_type: {
      handler (val) {
        this.chooseTab = val;
      }, deep: true
    }
  },

  methods: {

    handleChangePage (page) {//分页
      this.params.offset = page;
      this.getDataLists();
    },
    cancelAddStatus () {//取消
      this.add_visible = false;
      this.current_id = '';
      this.$emit('cancelAdd', this.add_visible)
    },

    onMousteIn: function (index) {//鼠标移入
      this.seen = true;
      this.current = index;
    },
    onMousteOut: function (index) {//鼠标移出
      this.seen = false;
      this.current = null;
    },
    hiddenStaff (ids, names, arr) {//获取员工信息
      this.staffModule = false;
      if (ids !== 'close') {
        this.form.name = names;
        this.form.user_id = ids[0];
      }
    },
    del (id, index) {//删除弹框
      this.delete_visible = true;
      this.current_id = id;
    },
    delOk () {//确认删除
      this.$http.delete(globalConfig.newMedia_sever + '/api/humanity/birthday/' + this.current_id).then(res => {
        if (res.status === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.getDataLists();
          this.delete_visible = false;
          this.current_id = ''
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      })
    },
    getDataLists () {//获取列表
      this.$http.get(globalConfig.newMedia_sever + '/api/humanity/birthday', this.params).then(res => {
        if (res.status === 200) {
          let birthdayData = res.data.data;
          this.count = res.data.total;
          let list = [];
          for (let item of birthdayData) {
            list.push({
              name: item.user_id ?.name,
              avatar: item.cover[0] ?.uri,
              department_name: item.user_id ?.org[0] ?.name,
              id: item.id
            })
          }
          this.todayBirthday = list;
          console.log(this.todayBirthday)
        }
      })
    },

    submit () {//提交表单
      let paramsForm = {
        user_id: this.form.user_id,
        birthday_type: this.form.birthday_type,
        cover: this.form.file_info[0],
      };

      this.$http.post(globalConfig.newMedia_sever + '/api/humanity/birthday', paramsForm).then(res => {
        if (res.status === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.add_visible = false;
          this.current_id = '';

          this.form.user_id = '';
          this.form.birthday_type = '';
          this.form.file_info = [];
          this.form.name = '';

          this.$emit('cancelAdd', this.add_visible);
          this.getDataLists();

        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
          this.add_visible = false;
          this.current_id = '';

          this.form.user_id = '';
          this.form.birthday_type = '';
          this.form.file_info = [];
          this.form.name = '';

          this.$emit('cancelAdd', this.add_visible);
        }
      })
    },

  }
}
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/birthday.scss";

@mixin starImg($n, $m) {
  $url: "../../../../../assets/image/newMedia/" + $m + "/" + $n;
  @include bgImage($url);
}

#theme_name.theme1 {
  #birthday {
    .birthday_info {
      .today_birthday {
        .today_birthday_list {
          .birthday_box {
            .birthday_box_info {
              > div {
                > img {
                }

                .delete-icon {
                  @include starImg("staff_shanchu.png", "theme1");
                }
              }

              .user-info {
                span {
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