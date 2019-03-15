<template>
  <div id="president">
    <!--<div class="items-center" :class="{'hhhhhhhh': hhhh}">-->
    <!--<p :class="['p' + item]" v-for="item in 9">帅</p>-->
    <!--</div>-->
    <!--<div @click="hhhh = true">发的发顺丰撒</div>-->
    <!--<div @click="hhhh = false">ffffff</div>-->
    <div v-for="item in jjjjjj">
      {{item.label}}:{{item.keyVal}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        hhhh: false,
        res: [
          {
            label: '姓名',
            keyName: 'name',
            keyVal: '',
          },
          {
            label: '姓名1',
            keyName: 'name1',
            keyVal: '',
          },
          {
            label: '所属部门',
            keyName: 'depart',
            keyVal: [],
          },
          {
            label: '所属部门1',
            keyName: 'depart1',
            keyVal: [],
          },
          {
            label: '所属部门2',
            keyName: 'depart2',
            keyVal: {},
          },
          {
            label: '负责人',
            keyName: 'leader',
            keyVal: {},
          },
          {
            label: '负责人1',
            keyName: 'leader1',
            keyVal: {},
          },
          {
            label: '负责人2',
            keyName: 'leader2',
            keyVal: {},
          },
        ],
        datas: {
          name: '粉红色打开',
          name1: null,
          depart: [{
            name: '南京一区一组'
          }],
          depart1: null,
          depart2: 'null',
          leader: {name: '符合贷款'},
          leader1: undefined,
          leader2: 'undefined',
        },
        jjjjjj: [],
      }
    },
    mounted() {
      this.jjjjjj = this.filterData(this.res, this.datas);
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      filterData(custom, getData) {
        let data = this.jsonData(custom);
        let dataType = [null, undefined, 'null', 'undefined'];
        for (let item of data) {
          if (!dataType.includes(getData[item.keyName])) {
            item.keyVal = getData[item.keyName];
          }else{
            item.keyName = item.keyVal;
          }
        }
        return data;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/index/index.scss";

  #president1 {
    div {
      position: relative;
      height: 300px;
      padding: 0 100px;
      justify-content: space-around;
      p {
        background-color: #CF2E33;
        height: 100%;
        color: #FFFFFF;
        padding: 30px 20px;
        opacity: 0;
        transform: translateX(-1920px);
        transition: all .3s;
      }
    }
    .hhhhhhhh {
      p {
        opacity: 1;
        transform: translateX(0);
      }
      .p9 {
        transition-delay: .1s;
      }
      .p8 {
        transition-delay: .2s;
      }
      .p7 {
        transition-delay: .3s;
      }
      .p6 {
        transition-delay: .4s;
      }
      .p5 {
        transition-delay: .5s;
      }
      .p4 {
        transition-delay: .6s;
      }
      .p3 {
        transition-delay: .7s;
      }
      .p2 {
        transition-delay: .8s;
      }
      .p1 {
        transition-delay: .9s;
      }
    }
  }
</style>
