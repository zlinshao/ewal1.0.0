<template>
  <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
    <div id="leJiaStars">
      <div class="star_list">
        <div class="star" v-for="(item,index) in starList" :key="index">
          <div class="starTop">
            <div class="frame">
              <img :src="item.star_id.avatar" @dblclick="edit(item)">
              <div class="issue" @click="issueStar(item)">{{item.is_open ==1? '发布中':'发布'}}</div>
            </div>
          </div>
          <div class="starBottom">
            <a>{{item.star_id &&item.star_id.org ? item.star_id.org[0].name : ''}}</a><a>{{item.star_id ?item.star_id.name : ''}}</a>
          </div>
        </div>
      </div>
      <lj-dialog :visible="detail_visible" :size="{width:1200 + 'px' ,height: 800 + 'px'}" @close="detail_visible=false;currentRecord=null">
      <div class="star_info">
        <div class="star_info_left" style="width:270px">
          <div class="star_info_title writingMode flex-center"><span>乐伽之星</span></div>
          <div class="star_info_avatar"><img :src="starInfo.avatar"></div>
          <div class="star_info_name writingMode flex-center"><span>{{starInfo.name}}</span></div>
          <div class="star_info_department writingMode flex-center"><span>{{starInfo.org &&starInfo.org.length?starInfo.org[0].name:''}}</span></div>
        </div>
        <div class="star_info_right flex-center">
          <div class="main_info scroll_bar">
            <h5 class="edit_icon justify-end" v-if="currentRecord ? true : false" @click="add_visible=true;detail_visible=false;currentRecord=null"><span></span>编辑</h5>
            <h3>{{starInfo.title}}</h3>
             <div v-html="starInfo.content"></div>
            <!-- <p>{{}}</p> -->
            <div class="justify-bet">
            </div>
          </div>
        </div>
      </div>
       </lj-dialog>
    </div>
    <footer class="flex-center bottomPage">
      <div class="develop flex-center">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="page">
        <el-pagination :total="total" layout="total,jumper,prev,pager,next" :current-page="params.page" :page-size="params.limit" @current-change="handleChangePage">
        </el-pagination>
      </div>
    </footer>
    <!--新增-->
    <lj-dialog :visible="add_visible" :size="{width:1200 + 'px' ,height: 800 + 'px'}" @close="cancelAddStatus">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>乐伽之星</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form v-model="form" label-width="80px">
            <el-form-item label="姓名">
              <user-choose width='1060' v-model="form.userid"></user-choose>
            </el-form-item>
             <!-- <el-form-item label="标题">
              <el-input width='700' v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="封面图">
              <lj-upload size="50"  v-model="form.file_info"></lj-upload>
            </el-form-item> -->
            <el-form-item label="文章内容">
              <div class="item_content">
                <lj-editor :editorContent="form.content" @changeContent="getContentChange"></lj-editor>
              </div>
            </el-form-item>
          </el-form>
        </div>
       
        <div class="dialog_footer">
          <el-button size="small" type="warning" @click="showDetail">预览</el-button>
          <el-button size="small" type="danger" @click="postReceivable_tag">发布</el-button>
          <el-button size="small" type="info" @click="cancelAddStatus">取消</el-button>
        </div>
      </div>
    </lj-dialog>
    <lj-dialog :visible="issue_visible" :size="{width:600 + 'px' ,height: 365 + 'px'}" @close="issue_visible = false" class="issueLejiaStar">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>发布</h3>
        </div>
        <div class="dialog_main borderNone">
          <div class="issueCon">
            <p>发布此篇乐伽之星会自动撤下当前已</p>
            <p>发布的乐伽之星，是否继续发布？</p>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="issueConfirm()">确定</el-button>
          <el-button size="small" type="info" @click="issue_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>

</template>

<script>
import LjDialog from '../../../../common/lj-dialog.vue';
import LjEditor from '../../../../common/lj-editor.vue';
import LjUpload from '../../../../common/lightweightComponents/lj-upload.vue';
import UserChoose from '../../../../common/lightweightComponents/UserChoose';
export default {
  name: "leJiaStars",
  components: {
    LjDialog,
    LjEditor,
    UserChoose,
    LjUpload
  },
  props: ['add_status', 'choose_type'],
  data () {
    return {
      visible: false,
      detail_visible: false,
      form: {
        userid: [],
        content: '',
        title: '',
        file_info: []
      },
      params: {
        offset: 1,
        limit: 8
      },
      total:0,
      starList:[],
      starInfo: {},
      defaultMsg: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      currentRecord: {},
      add_visible: false,
      issue_visible:false,
      selectItem: {},
    }
  },
  mounted () {
    this.getLeJiaStarList();
  },
  watch:{
    add_status: {
      handler (val) {
        this.add_visible = val;
      }, deep: true
    },
  },
  
  methods: {
    edit (item) {
      this.currentRecord=item;
      this.starInfo.avatar = item && item.star_id ? item.star_id.avatar : '';
      this.starInfo.name = item && item.star_id ? item.star_id.name : '';
      this.starInfo.org = item && item.star_id ? item.star_id.org : '';
      this.starInfo.content =item.content;
       this.starInfo.title =item.title;
        // this.starInfo.content =item.cover;
      this.detail_visible = true;
      this.form.content=item.content;
      this.form.userid=[item.userid];
    },
    cancelAddStatus () {//取消
      this.add_visible = false;
       this.form={};
      this.$emit('cancelAdd', this.add_visible)
    },
    // 预览
    showDetail(){
       this.currentRecord=null;
      if(this.form.userid && this.form.content){
      this.$http.get(globalConfig.humanResource_server + 'staff/user/'+this.form.userid).then(res => {
          if (res.code === '20020') {
            this.starInfo = res.data;
            this.starInfo.content =this.form.content;
          }
        });
       this.detail_visible=true;
      }else {
         this.$LjNotify('warning', {
            title: '提示',
            message: '有条目未填写',
          });
      }
    },
    //获取乐伽之星
    getLeJiaStarInfo () {
      this.$http.get(globalConfig.newMedia_sever + '/api/humanity/star').then(res => {
        if (res.status === 200) {
          this.starInfo = res.data;
        }
      })
    },
    //发布
    postReceivable_tag(){
      console.log('this.form.', this.form)
      let param = {
        star_id: this.form.userid[0],
        content: this.form.content,
        title: this.form.title,
        cover: this.form.file_info
      }
      if(param.star_id == undefined|| this.form.userid.length<0){
        this.$LjNotify('error', {
            title: '失败',
            message: '人员不能为空且只能选一个',
          });
      }else if(param.content == ''){
        this.$LjNotify('error', {
            title: '失败',
            message: '内容不能为空',
          });
      } else{
        this.$http.post(globalConfig.newMedia_sever + '/api/humanity/star',param).then(res => {
          if (res.status === 200) {
            this.add_visible = false
            this.$emit('cancelAdd', this.add_visible)
            this.getLeJiaStarList();
          }
        })
      }
    },
    //获取乐加之星列表
    getLeJiaStarList(){
      this.starList = []
      this.$http.post(globalConfig.newMedia_sever + '/api/humanity/star/history',this.params).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          for(let i = 0;i<res.data.data.length;i++){
            this.starList.push(res.data.data[i])
          }
        }
      })
    },
    handleChangePage(page){
      this.params.offset = page
      this.getLeJiaStarList()
    },
    issueStar(item){
      if(item.is_open !== 1){
        this.issue_visible = true
        this.selectItem = item
      }
    },
    issueConfirm(){
      let param = {
        id: this.selectItem.id,
      }
      this.$http.post(globalConfig.newMedia_sever + '/api/humanity/star/open/'+`${param.id}`,param).then(res => {
          if(res.status == 200){
            this.$LjNotify('success', {
            title: '发布成功',
            message: '发布成功',
          });
          this.issue_visible = false
          this.getLeJiaStarList()
        }
      })
    },
    getContentChange (val) {
      console.log('val', val);
      this.form.content = val;
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/newMedia/back/lejiaHumanity/components/leJiaStars.scss";

@mixin starImg($n, $m) {
  $url: "../../../../../assets/image/newMedia/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #leJiaStars {
    .star_list{
      .star{
        .starTop{
          .frame{
            @include starImg("theme1", "ljzx1.png");
            &:hover{
              @include starImg("theme1", "ljzx2.png");
            }
          }
        }
      }
    }
    .star_info {
      @include starImg("theme1", "lejiazhixingdi.png");

      .star_info_left {
        @include starImg("theme1", "biaoqian.png");

        .star_info_title {
          @include starImg("theme1", "yin.png");
        }
      }

      .star_info_right {
        .main_info {
          h5 {
            span {
              @include starImg("theme1", "bianji_copy2.png");
            }
          }

          > div {
            span {
            }
          }
        }
      }
    }
  }
}
</style>