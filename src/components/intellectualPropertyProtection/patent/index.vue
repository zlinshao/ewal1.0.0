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
          <div @click="showPatent()">
            <h1>{{item.department}}</h1>
            ...............................
            <h2>{{patentName.patentNameHead[index]}}</h2>
            <h3>{{patentName.patentNameFoot[index]}}</h3>
          </div>
          <span>
            <span @click="editPatent()">编辑 </span>/<span @click="removePatent()"> 删除</span>
          </span>
        </div>
      </div>
    </div>
    <lj-dialog :visible="show_visible" :size="{width: 595 + 'px',height: 821 + 'px'}"
                   @close="show_visible = false">
    </lj-dialog>
    <lj-dialog :visible="add_visible" :size="{width: 540 + 'px',height: 560 + 'px'}"
                   @close="add_visible = false">
           <div class="dialog_container">
              <div class="dialog_main flex-center borderNone">
                <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible">
                  <el-form-item label="所属部门">
                    <div class="items-center iconInput">
                      <el-input placeholder="请选择"></el-input>
                      <p class="icons organization"></p>
                    </div>
                  </el-form-item>
                  <el-form-item label="专利名称">
                    <div class="items-center iconInput">
                      <el-input placeholder="请输入"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="可见范围">
                    <div class="items-center iconInput">
                      <el-input placeholder="必选"></el-input>
                      <p class="icons organization"></p>
                    </div>
                  </el-form-item>
                  <el-form-item label="添加文件">
                    <i class="el-icon-plus"></i>
                  </el-form-item>
                </el-form>
              </div>
              <div class="dialog_footer">
                  <el-button type="danger" size="small" @click="addOk">确定</el-button>
                  <el-button type="info" size="small" @click="add_visible = false;current_id = ''">取消</el-button>
              </div>
            </div>
    </lj-dialog>
    <lj-dialog :visible="edit_visible" :size="{width: 540 + 'px',height: 560 + 'px'}"
                   @close="edit_visible = false">
           <div class="dialog_container">
                <div class="dialog_main flex-center borderNone">
                <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible">
                  <el-form-item label="所属部门">
                    <div class="items-center iconInput">
                      <el-input placeholder="请选择"></el-input>
                      <p class="icons organization"></p>
                    </div>
                  </el-form-item>
                  <el-form-item label="专利名称">
                    <div class="items-center iconInput">
                      <el-input placeholder="请输入"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="可见范围">
                    <div class="items-center iconInput">
                      <el-input placeholder="必选"></el-input>
                      <p class="icons organization"></p>
                    </div>
                  </el-form-item>
                  <el-form-item label="编辑文件">
                    <i class="el-icon-plus"></i>
                  </el-form-item>
                </el-form>
              </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="editOk">确定</el-button>
                    <el-button type="info" size="small" @click="edit_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
    </lj-dialog>
    <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
           <div class="dialog_container">
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该专利文件吗？</div>
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
  import {intellectualPropertyProtection} from '../../../assets/js/allModuleList.js';
  export default {
    name: "index",
    components:{
       LjDialog
    },
    data() {
      return {
        show_visible: false,
        add_visible: false,
        edit_visible: false,
        delete_visible: false,
        intellectualPropertyProtection,
        chooseTab:1,
        patentList:[
          {
            department: '研发部',
            name: 'EWALL1.0 代码规范专利'
          },
          {
            department: '研发部',
            name: 'EWALL1.0 代码规范专利'
          },
          {
            department: '研发部',
            name: 'EWALL1.0 代码规范专利'
          },
          {
            department: '研发部',
            name: 'EWALL1.0 代码规范专利'
          },
          {
            department: '研发部',
            name: 'EWALL1.0 代码规范专利'
          },
          {
            department: '研发部',
            name: 'EWALL1.0 代码规范专利'
          }
        ]
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {
      patentName: function(){
        var patentNameHead = []
        var patentNameFoot = []
        for(var i = 0; i < this.patentList.length; i++){
          patentNameHead[i] = this.patentList[i].name.split(' ')[0]
          patentNameFoot[i] = this.patentList[i].name.split(' ')[1]
        }
        var patentNameTemp = {
          patentNameHead:patentNameHead,
          patentNameFoot:patentNameFoot
        }
        return patentNameTemp
      }
    },
    methods: {
      changeTabs: function(item) {
        this.routerLink(item.url);
      },
      showPatent: function() {
        this.show_visible = true
      },
      addPatent: function () {
        this.add_visible = true
      },
      editPatent: function() {
        this.edit_visible = true
      },
      removePatent: function() {
        this.delete_visible = true
      },
      addOk: function() {
        this.add_visible = false
      },
      editOk: function() {
        this.edit_visible = false
      },
      delOk: function() {
        this.delete_visible = false
      },
    }
  }
</script>

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
