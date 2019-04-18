<template>
  <div id="patent">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <h2>知识产权保护</h2>
          <h2 class="items-center">
            <span v-for="(item,index) in intellectualPropertyProtection.data" @click="changeTabs(item)" class="items-column" :key="index"
                  :class="{'chooseTab': chooseTab === index}">
              {{item.title}}<i></i>
            </span>
          </h2>
        </div>
        <div class="items-center listTopRight" @click="addPatent()">
          <div class="icons add"><b>+</b></div>
        </div>
      </div>
      <div class='patentContainer'>
        <div v-for="(item, index) in patentList" :key="index" class='patentList'>
          <div @click="showPatent(index)">
            <h1>{{item.department}}</h1>
            ...............................
            <h2></h2>
            <h3>{{item.name}}</h3>
          </div>
          <span>
            <span @click="editPatent(index)">编辑 </span>/<span @click="removePatent(index)"> 删除</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 展示专利 -->

    
    <el-dialog :visible.sync="show_visible" :show-close="false" custom-class="imgDialog">
      <img :src="patentUrl"/>
    </el-dialog>
    

    <!-- 添加专利 -->
    <lj-dialog :visible="add_visible" :size="{width: 540 + 'px',height: 560 + 'px'}"
                   @close="add_visible = false">
      <div class="dialog_container">
        <div class="dialog_main flex-center borderNone">
          <el-form label-width="120px" class="depart_visible">
            <el-form-item label="所属部门">
              <div class="items-center iconInput">
                <org-choose title="请选择部门" v-model="patentAddDetail.org_id"></org-choose>
              </div>
            </el-form-item>
            <el-form-item label="专利名称">
              <div class="items-center iconInput">
                <el-input placeholder="请输入" v-model="patentAddDetail.name"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="可见范围">
              <org-choose title="请选择可见范围" v-model="patentAddDetail.permission"></org-choose>
            </el-form-item>
            <el-form-item label="添加文件">
              <lj-upload v-model="patentAddDetail.flie_id"></lj-upload>
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
    <lj-dialog :visible="edit_visible" :size="{width: 540 + 'px',height: 560 + 'px'}"
                   @close="edit_visible = false">
      <div class="dialog_container">
          <div class="dialog_main flex-center borderNone">
          <el-form label-width="120px" class="depart_visible">
            <el-form-item label="所属部门">
              <org-choose title="请选择部门" v-model="patentEditDetail.org_id"></org-choose>
            </el-form-item>
            <el-form-item label="专利名称">
              <div class="items-center iconInput">
                <el-input placeholder="请输入" v-model="patentEditDetail.name"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="可见范围">
              <org-choose title="请选择可见范围" v-model="patentEditDetail.permission"></org-choose>
            </el-form-item>
            <el-form-item label="编辑文件">
              <lj-upload v-model="patentEdit_file_id"></lj-upload>
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
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
      <div class="dialog_container">
          <div class="dialog_main">
              <div class="unUse-txt">确定删除该专利文件吗？</div>
          </div>
          <div class="dialog_footer">
              <el-button type="danger" size="small" @click="delOk">确定</el-button>
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
  import {intellectualPropertyProtection} from '../../../assets/js/allModuleList.js';
  export default {
    name: "index",
    components:{
       LjDialog,
       OrgChoose,
       LjUpload
    },
    data() {
      return {
        url: globalConfig.intellectualPropertyProtection,
        intellectualPropertyProtection,
        show_visible: false,
        add_visible: false,
        edit_visible: false,
        delete_visible: false,
        editIndex: 0,
        deleteIndex: 0,
        patentUrl: '',
        chooseTab: 2,
        patentList: [],
        patentAddDetail: {
          name: '',
          org_id: 0,
          flie_id: '',
          permission: 0
        },
        patentEdit_file_id: [],
        patentEditDetail: {
          id: 0,
          name: '',
          org_id: 0,
          flie_id: '',
          permission: 0
        },
        patenteDelId:0,
      }
    },
    mounted() {
      this.getPatentList();
    },
    watch: {},
    computed: {
      // patentName: function(){
      //   var patentNameHead = []
      //   var patentNameFoot = [] 
      //   for(var i = 0; i < this.patentList.length; i++){
      //     patentNameHead[i] = this.patentList[i].name.split(' ')[0]
      //     patentNameFoot[i] = this.patentList[i].name.split(' ')[1]
      //   }
      //   var patentNameTemp = {
      //     patentNameHead:patentNameHead,
      //     patentNameFoot:patentNameFoot
      //   }
      //   return patentNameTemp
      // }
    },
    methods: {
      getPatentList: function() {
        let params = {
          classify_id: 3,
          all: 1
        }
        this.$http.get(`${this.url}/api/knowledge/patent`,params).then(res => {
          if (res.status===200) {
            this.patentList = [];
            for(var i = 0; i < res.data.data.length; i++){
              console.log(res.data)
              let obj ={
                id: res.data.data[i].id,
                name: res.data.data[i].name,
                org_id:res.data.data[i].org_id,
                department: res.data.data[i].org_id.name,
                file_id: res.data.data[i].file_id[0],
                fileUrl: res.data.data[i].file_id[0].uri
              }
              this.patentList.push(obj);
            }
          }
        })
      },
      showPatent: function(index) {
        this.show_visible = true;
        this.patentUrl = this.patentList[index].fileUrl;
      },
      addPatent: function () {
        this.add_visible = true
      },
      editPatent: function(index) {
        this.edit_visible = true;
        this.editIndex = index;
        this.patentEditDetail.id = this.patentList[index].id
        this.patentEditDetail.name = this.patentList[index].name,
        this.patentEditDetail.org_id = this.patentList[index].org_id,
        this.patentEditDetail.idpermission = 0
        
      },
      removePatent: function(index) {
        this.delete_visible = true;
        this.deleteIndex = index;
        this.patenteDelId = this.patentList[index].id
      },
      addOk: function() {
        let params = {
          name: this.patentAddDetail.name,
          classify_id: 3,
          file_id: this.patentAddDetail.flie_id[0],
          org_id: this.patentAddDetail.org_id[0],
          permission: { 
                        org_id: [this.patentAddDetail.permission[0]]
                      }
        } 
        this.$http.post(`${this.url}/api/knowledge/patent`,params).then(res => {
          if (res.status===200) {
            this.add_visible = false
            this.getPatentList();
          }
        })
      },
      editOk: function() {
        let params = {
          id: this.patentEditDetail.id,
          name: this.patentEditDetail.name,
          classify_id: 3,
          file_id: this.patentEdit_file_id[0],
          org_id: this.patentEditDetail.org_id[0],
          permission: { 
                        org_id: this.patentEditDetail.permission
                      }
        } 
       
        this.$http.put(`${this.url}/api/knowledge/patent/${params.id}`,params).then(res => {
          if (res.status===200) {
            this.edit_visible = false
            this.getPatentList();
          }
        })
      },
      delOk: function() {
        let params = {
          id: this.patenteDelId
        } 
        this.$http.delete(`${this.url}/api/knowledge/patent/${params.id}`,params).then(res => {
          if (res.status===200) {
            this.delete_visible = false
            this.getPatentList();
          }
        })
      },
      changeTabs: function(item) {
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
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../assets/scss/intellectualPropertyProtection/patent/index.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../../assets/image/intellectualPropertyProtection/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #patent {
      div{
        .patentContainer{
          .patentList{
            div{
              @include serviceImg('quan.png','theme1');
              &:hover {
                @include serviceImg('quan-.png','theme1');
              }
            }
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
