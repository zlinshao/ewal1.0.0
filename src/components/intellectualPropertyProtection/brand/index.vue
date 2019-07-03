<template>
  <div id="patent">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <p class="flex-center" @click="routerLink('/intellectualPropertyProtection');">
            <b>...</b>
          </p>
          <h2>知识产权保护</h2>
          <h2 class="items-center">
            <span v-for="(item,index) in intellectualPropertyProtection.data" @click="changeTabs(item)" class="items-column"
              :key="index" :class="{'chooseTab': chooseTab === index}">
              {{item.title}}<i></i>
            </span>
          </h2>
        </div>
        <div class="items-center listTopRight" @click="addPatent()">
          <div class="icons add"><b>+</b></div>
        </div>
      </div>
      <div class='patentContainer' v-if="showAllData">
        <div class="patentContainerLeft"></div>
        <div class="patentContainerMid">
          <div v-for="(item, index) in patentList" :key="index" class='patentList'>
            <div>
              <div @click="showPatent(index)" class="patentDetail">
                <h1 :title="item.departmentHeader">{{substringPlugin(item.departmentHeader,5)}}</h1>
<!--                <h1>{{item.departmentFooter}}</h1>-->
                ...............................
                <h3 :title="item.name">{{substringPlugin(item.name,11)}}</h3>
              </div>
              <a class="handleTrigger flex-center">
                <a class="handlePointer">...</a>
                <b @click="editPatent(index)" class="handlePatent">编辑 </b>
                <b @click="removePatent(index)" class="handlePatent"> 删除</b>
              </a>
            </div>
          </div>
        </div>
        <div class="patentContainerRight"></div>
      </div>
      <div v-if="showNoneData" class="noneDataShow">
        <div></div>
      </div>
      <div class="page flex-center common-page" v-if="showAllData">
        <el-pagination :current-page="currentPage" :page-size="6" :total="total" layout="total,jumper,prev,pager,next" @current-change="changeOffset">
        </el-pagination>
      </div>

    </div>

    <!-- 展示专利 -->
    <el-dialog :visible.sync="show_visible" :show-close="false" custom-class="imgDialog">
      <img :src="patentUrl" />
    </el-dialog>

    <!-- 添加专利 -->
    <lj-dialog :visible="add_visible" :size="{width: 540 + 'px',height: 560 + 'px'}" @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加商标</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="120px" class="depart_visible">
            <el-form-item label="所属部门">
              <div class="items-center iconInput">
                <org-choose title="请选择部门" num="1" v-model="patentAddDetail.org_id"></org-choose>
              </div>
            </el-form-item>
            <el-form-item label="商标名称">
              <div class="items-center iconInput">
                <el-input placeholder="请输入" v-model="patentAddDetail.name" class="patentInput"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="可见范围">
              <org-choose title="请选择可见范围" v-model="patentAddDetail.permission"></org-choose>
            </el-form-item>
            <el-form-item label="添加文件">
              <div class="patentUpload">
                <lj-upload :max-size="5" :limit-easy="['image']" v-model="patentAddDetail.file_id"></lj-upload>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="addOk">确定</el-button>
          <el-button type="info" size="small" @click="add_visible = false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 编辑专利 -->
    <lj-dialog :visible="edit_visible" :size="{width: 540 + 'px',height: 560 + 'px'}" @close="edit_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑商标</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="120px" class="depart_visible">
            <el-form-item label="所属部门">
              <org-choose title="请选择部门" v-model="patentEditDetail.org_id"></org-choose>
            </el-form-item>
            <el-form-item label="商标名称">
              <div class="items-center iconInput">
                <el-input placeholder="请输入" v-model="patentEditDetail.name" class="patentInput"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="可见范围">
              <org-choose title="请选择可见范围" v-model="patentEditDetail.permission"></org-choose>
            </el-form-item>
            <el-form-item label="编辑文件">
              <div class="patentUpload">
                <lj-upload :max-size="5" v-model="patentEditDetail.file_id" :limit-easy="['image']"></lj-upload>
              </div>  
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="editOk">确定</el-button>
          <el-button type="info" size="small" @click="edit_visible = false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!-- 删除专利 -->
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}" @close="delete_visible = false">
      <div class="dialog_container">
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该专利文件吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="removeOk">确定</el-button>
          <el-button type="info" size="small" @click="delete_visible = false;">取消</el-button>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
import LjDialog from '../../common/lj-dialog.vue';
import OrgChoose from '../../common/lightweightComponents/OrgChoose';
import LjUpload from '../../common/lightweightComponents/lj-upload.vue';
import { intellectualPropertyProtection } from '../../../assets/js/allModuleList.js';
export default {
  name: "index",
  components: {
    LjDialog,
    OrgChoose,
    LjUpload
  },
  data () {
    return {
      url: globalConfig.intellectualPropertyProtection,
      intellectualPropertyProtection,
      showAllData: false,
      showNoneData: false,
      show_visible: false,
      add_visible: false,
      edit_visible: false,
      delete_visible: false,
      patentUrl: '',
      chooseTab: 3,
      patentList: [],
      patentAddDetail: {
        name: '',
        org_id: 0,
        file_id: '',
        permission: 0
      },
      patentEditDetail: {
        id: 0,
        name: '',
        org_id: 0,
        file_id: '',
        permission: 0
      },
      patenteDelId: 0,
      currentPage: 1,
      total: 0,
    }
  },
  mounted () {
    this.getPatentList();
  },
  watch: {
    currentPage () {
      this.getPatentList()
    }
  },

  methods: {
    changeOffset(offset){
      this.currentPage=offset;
      this.getPatentList();
    },
    getPatentList: function () {
      let params = {
        classify_id: 4,
        all: 1,
        offset: this.currentPage,
        limit: 6
      }
      this.$http.get(`${this.url}/api/knowledge/classify_document`, params).then(res => {
        if (res.status === 200) {
          this.patentList = [];
          this.total = res.data.total
          for (var i = 0; i < res.data.data.length; i++) {
            let obj = {
              id: res.data.data[i].id,
              name: res.data.data[i].name,
              org_id: res.data.data[i].org_id.id,
              file_id: res.data.data[i].file_id[0].id,
              fileUrl: res.data.data[i].file_id[0].uri
            }
            obj.departmentHeader = res.data.data[i].org_id.name;
            this.patentList.push(obj);
          }
          if (this.patentList.length > 0) {
            this.showAllData = true;
            this.showNoneData = false;
          } else {
            this.showAllData = false;
            this.showNoneData = true;
          }
        }
      })
    },
    showPatent: function (index) {
      this.show_visible = true;
      this.patentUrl = this.patentList[index].fileUrl;
    },
    addPatent: function () {
      this.add_visible = true
      this.patentAddDetail.name = ''
      this.patentAddDetail.org_id = ''
      this.patentAddDetail.file_id = ''
      this.patentAddDetail.permission = ''
    },
    editPatent: function (index) {
      this.patentEditDetail.id = this.patentList[index].id;
      this.patentEditDetail.name = this.patentList[index].name;
      this.patentEditDetail.org_id = [this.patentList[index].org_id];
      this.patentEditDetail.file_id = [this.patentList[index].file_id];
      let params = {
        id: this.patentEditDetail.id
      }
      this.$http.get(`${this.url}/api/knowledge/classify_document/${this.patentEditDetail.id}`, params).then(res => {
        if (res.status === 200) {
          this.patentEditDetail.permission = res.data.permission.org_id
          this.edit_visible = true;
        }
      })
    },
    removePatent: function (index) {
      this.delete_visible = true;
      this.patenteDelId = this.patentList[index].id
    },
    addOk: function () {
      let params = {
        name: this.patentAddDetail.name,
        classify_id: 4,
        file_id: this.patentAddDetail.file_id,
        org_id: this.patentAddDetail.org_id[0],
        permission: {
          org_id: this.patentAddDetail.permission
        }
      }
      let nameRule=/^[\u4e00-\u9fa5a-z]+$/gi;
      if (!nameRule.test(params.name)) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请输入合法名称',
        });
      }
      else if (!params.org_id) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请选择部门',
        });
      }
      else if (params.permission.org_id==="") {
        this.$LjNotify('error', {
          title: '失败',
          message: '请选择可见范围',
        });
      }
      else if (params.file_id.length===0) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请上传文件',
        });
      }
      else if (params.file_id.length > 1) {
        this.$LjNotify('error', {
          title: '失败',
          message: '只能上传一个文件',
        });
      }

      else {
        this.$http.post(`${this.url}/api/knowledge/classify_document`, params).then(res => {
          if (res.status === 200) {
            this.add_visible = false
            this.getPatentList();
          }
        })
      }
    },
    editOk: function () {
      let params = {
        id: this.patentEditDetail.id,
        name: this.patentEditDetail.name,
        classify_id: 4,
        file_id: this.patentEditDetail.file_id,
        org_id: this.patentEditDetail.org_id[0],
        permission: {
          org_id: this.patentEditDetail.permission
        }
      }
      let nameRule=/^[\u4e00-\u9fa5a-z]+$/gi;
      if (!nameRule.test(params.name)) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请输入专利名称',
        });
      }
      else if (!params.org_id) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请选择部门',
        });
      }
      else if (params.permission.org_id.length===0) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请选择可见范围',
        });
      }
      else if (params.file_id.length===0) {
        this.$LjNotify('error', {
          title: '失败',
          message: '请上传文件',
        });
      }
      else if (params.file_id.length > 1) {
        this.$LjNotify('error', {
          title: '失败',
          message: '只能上传一个文件',
        });
      }
      else {
        this.$http.put(`${this.url}/api/knowledge/classify_document/${params.id}`, params).then(res => {
          if (res.status === 200) {
            this.edit_visible = false
            this.getPatentList();
          }
        })
      }
    },
    removeOk: function () {
      let params = {
        id: this.patenteDelId
      }
      this.$http.delete(`${this.url}/api/knowledge/classify_document/${params.id}`, params).then(res => {
        if (res.status === 200) {
          this.delete_visible = false
          this.getPatentList();
        }
      })
    },
    changeTabs: function (item) {
      this.routerLink(item.url);
    },
  }
}
</script>

<style lang="scss">
.imgDialog {
  .el-dialog__header {
    height: 0px;
    padding: 0px 0px 0px 0px !important;
    background: transparent;
    border: none;
  }
  .el-dialog__body {
    width: 100%;
    height: 821px;
    padding: 0px 0px 0px 0px !important;
        img{
      width:100%;
      height: auto;
      position: relative;
      top:50%;
      transform: translateY(-50%);
    }
  }
}
.patentUpload{
  margin-left: 10px;
}
.patentInput{
  .el-input__inner{
    color:rgba(0,0,0,1);
  }
}
</style>

<style lang="scss" scoped>
@import "../../../assets/scss/intellectualPropertyProtection/patent/index.scss";

@mixin serviceImg($m, $n) {
  $url: "../../../assets/image/intellectualPropertyProtection/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #patent {
    > div {
      .patentContainer {
        .patentContainerLeft {
          @include serviceImg("huawen.png", "theme1");
        }
        .patentContainerMid {
          .patentList {
            > div {
              .patentDetail {
                @include serviceImg("quan.png", "theme1");
              }
              &:hover {
                .patentDetail {
                  @include serviceImg("quan-.png", "theme1");
                }
              }
            }
          }
        }
        .patentContainerRight {
          @include serviceImg("huawen.png", "theme1");
        }
      }
      .noneDataShow {
        > div {
          @include serviceImg("zanwushuju.png", "theme1");
        }
      }
    }
  }
}

#theme_name.theme2 {
  #patent {
  }
}

#theme_name.theme3 {
  #patent {
  }
}

#theme_name.theme4 {
  #patent {
  }
}
</style>
