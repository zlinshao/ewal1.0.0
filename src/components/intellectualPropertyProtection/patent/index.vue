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
        <div class="items-center listTopRight">
          <div class="icons add"><b>+</b></div>
        </div>
      </div>
      <div class='patentContainer'>
        <div v-for="(item, index) in patentList" :key="index" class='patentList'>
          <div>
            <h1>{{item.department}}</h1>
            ...............................
            <h2>{{patentName.patentNameHead[index]}}</h2>
            <h3>{{patentName.patentNameFoot[index]}}</h3>
          </div>
          <span>
            <span @click="editPatent(index)">编辑 </span>/<span @click="removePatent(index)"> 删除</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {intellectualPropertyProtection} from '../../../assets/js/allModuleList.js';
  export default {
    name: "index",
    data() {
      return {
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
      editPatent: function(index) {
        console.log(index)
      },
      removePatent: function(index) {
        console.log(index)
      }
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
