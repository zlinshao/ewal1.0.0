<template>
  <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
    <div id="excellentStaff">
      <div class="staff_info" ref='viewBox'>
        <div class="staff_list_info">
          <div class="staff_box" v-for="(item,index) in staffData">
            <div class="flex-center" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
              <div class="img-modal" v-if="seen&&index===current">
                <span @click="routerLink(staffDetailUrl,item.id)"></span>
                <span @click="withdraw_visible = true;current_id = item.id"></span>
              </div>
              <img v-for="(ter,inx) in item.cover" :src="ter.uri" alt="" :key="inx">
              <p>
                <span v-for="(ters,inxd) in item.user_id.org" :key="inxd">{{ters.name}}</span>
                <span>{{item.user_id.name}}</span>
              </p>
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

      <!--撤下优秀员工-->
      <lj-dialog :visible="withdraw_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="withdraw_visible = false">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>撤下</h3>
          </div>
          <div class="dialog_main">
            <div class="unUse-txt">确定撤下该优秀员工吗？</div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="withdraw">确定</el-button>
            <el-button type="info" size="small" @click="withdraw_visible = false;current_id = ''">取消
            </el-button>
          </div>
        </div>
      </lj-dialog>

      <!--新增-->
      <lj-dialog :visible="add_visible" :size="{width:1200 + 'px' ,height: 800 + 'px'}" @close="cancelAddStatus">
        <div class="dialog_container">
          <div class="dialog_header">
            <h3>新增优秀员工</h3>
          </div>
          <div class="dialog_main borderNone">
            <div>
              <el-form v-model="form" label-width="100px">
                <el-form-item label="员工姓名">
                  <el-input v-model="form.name" @focus="staffModule=true"></el-input>
                </el-form-item>
                <el-form-item label="员工照片">
                  <lj-upload v-model="form.file_info" size="40" style="position: absolute; top: -12px;"></lj-upload>
                </el-form-item>
                <el-form-item label="员工介绍">
                  <lj-editor :editorContent="form.content" @changeContent="getContentChange"></lj-editor>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="dialog_footer">
            <el-button type="danger" size="small" @click="confirmAdd">确定</el-button>
            <el-button type="info" size="small" @close="cancelAddStatus">取消</el-button>
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
import LjEditor from '../../../../common/lj-editor.vue';

export default {
  name: "excellentStaff",
  components: {
    LjDialog,
    LjEditor,
    LjUpload,
    StaffOrgan
  },
  props: ['add_status', 'choose_type'],
  data () {
    return {
      staffModule: false,//员工
      params: {//查询参数
        search: '',
        offset: 1,
      },
      current: '',//当前
      seen: false,//显隐
      staffDetailUrl: 'staffDetail',
      withdraw_visible: false,//撤下
      visible: false,
      current_id: '',
      staffData: [],
      count: 0,
      form: {
        name: '',
        content: '',
        file_info: '',
        user_id: '',
      },
      add_visible: false,//新增
      addForm: {

      },
      chooseTab: '',
    }
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
    },
  },
  mounted () {
    this.getDataLists();
    // this.$refs.viewBox.addEventListener('scroll', this.throttle(this.setpage, 200), false);
  },
  methods: {
    hiddenStaff (ids, names, arr) {//获取员工信息
      this.staffModule = false;
      if (ids !== 'close') {
        this.form.name = names;
        this.form.user_id = ids[0];
      }
    },
    cancelAddStatus () {//取消
      this.add_visible = false;
      this.current_id = '';
      this.$emit('cancelAdd', this.add_visible)
    },
    confirmAdd () {//新增优秀员工
      let paramsForm = {
        user_id: this.form.user_id,
        content: this.form.content,
        cover: this.form.file_info[0],
      }
      this.$http.post(globalConfig.newMedia_sever + '/api/humanity/excellent', paramsForm).then(res => {
        if (res.status === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.add_visible = false;
          this.getDataLists();
          this.$emit('cancelAdd', this.add_visible);
        }
      })
    },
    handleChangePage (page) {
      this.params.offset = page;
      this.getDataLists();
    },
    getDataLists () {//加载列表
      this.$http.get(globalConfig.newMedia_sever + '/api/humanity/excellent', this.params).then(res => {
        if (res.status === 200) {
          this.staffData = res.data;
          this.count = res.data.length;
        }
      })
    },
    // throttle(fn, delay, atleast) {
    //     /**函数节流方法
    //      @param Function fn 延时调用函数
    //      @param Number dalay 延迟多长时间
    //      @param Number atleast 至少多长时间触发一次
    //      @return Function 延迟执行的方法
    //      */
    //     let timer = null;
    //     let previous = null;
    //     return function () {
    //         var now = +new Date();
    //         if (!previous) previous = now;
    //         if (atleast && now - previous > atleast) {
    //             fn();
    //             // 重置上一次开始时间为本次结束时间
    //             previous = now;
    //             clearTimeout(timer);
    //         } else {
    //             clearTimeout(timer);
    //             timer = setTimeout(function () {
    //                 fn();
    //                 previous = null;
    //             }, delay);
    //         }
    //     }
    // },
    // setpage() {
    //     if (this.nomore && !this.loaded) return;//到达底部不再执行
    //     if (this.$refs.viewBox.scrollTop + this.$refs.viewBox.offsetHeight + 20 >= this.$refs.viewBox.scrollHeight) {
    //         // this.loadingTip = true;  //loading提示语
    //         this.showLoading(true);
    //         this.params.page +=1;
    //         this.$http.get(globalConfig.newMedia_sever + '/api/humanity/excellent', this.params).then(res => {
    //                 let arr = res.data.data;
    //                 if (arr.length === 0) {
    //                     //some tips
    //                     this.loaded = false;
    //                     this.nomore = true;//没有更多
    //                     return
    //                 }
    //                 this.staffData = [...this.staffData, ...arr];
    //                 this.showLoading(false);
    //             }
    //         ).catch(err => {
    //             console.log(err)
    //         })
    //     }
    // },

    onMousteIn: function (index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function (index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    },
    //撤下
    withdraw () {
      this.$http.delete(globalConfig.newMedia_sever + '/api/humanity/excellent/' + this.current_id).then(res => {
        if (res.status === 200) {
          this.$LjNotify('success', {
            title: '成功',
            message: res.msg,
            subMessage: '',
          });
          this.withdraw_visible = false;
          this.getDataLists();

        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: res.msg,
            subMessage: '',
          });
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/excellentStaff.scss";
@mixin starImg($n, $m) {
  $url: "../../../../../assets/image/newMedia/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #excellentStaff {
    .staff_info {
      @include starImg("theme1", "background_2.png");

      .staff_list_top {
        @include starImg("theme1", "yxyg_dashang.png");
      }

      .staff_list_info {
        .staff_box {
          .staff_box_info {
            > div {
              .img-modal {
                span:nth-child(1) {
                  @include starImg("theme1", "staff_bianji.png");
                }

                span:nth-child(2) {
                  @include starImg("theme1", "staff_shanchu.png");
                }
              }

              @include starImg("theme1", "youxiu_grey.png");

              &:hover {
                @include starImg("theme1", "youxiu_red.png");
              }
            }
          }
        }
      }
    }
  }
}
</style>