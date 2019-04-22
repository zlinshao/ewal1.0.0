<template>
    <div id="performance">
      <div>
        <!--头部-->
        <div class="listTopCss items-bet">
          <div class="items-center listTopLeft">
            <p class="flex-center">
              <b @click="show_market = true">...</b>
            </p>
            <h1>业绩工资</h1>
            <h2 class="items-center">
            <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
              {{item.title}}<i></i>
            </span>
            </h2>
          </div>
          <div class="items-center listTopRight">
            <el-button type="success" size="mini" style="width: 80px;margin-right: 20px" plain>导出</el-button>
            <div class="icons search"></div>
          </div>
        </div>

        <!--业绩总览-->
        <div class="performance_all flex-center">
          <div class="per1"></div>
          <div class="per2"></div>
          <div class="content flex-center">
            <div class="contain flex-center">
              <div>
                <p><a>15</a>/套</p>
                <p>收房数</p>
              </div>
              <div>
                <p><a>357</a>/套</p>
                <p>租房数</p>
              </div>
              <div>
                <p><a>357.472.84792429</a></p>
                <p>实际业绩</p>
              </div>
              <div>
                <p><a>90.4234</a></p>
                <p>溢出业绩</p>
              </div>
            </div>
          </div>
        </div>
        <!--表格中部-->
        <div class="mainListTable" :style="{'height': this.mainListHeight(100) + 'px','marginTop': 0}">
          <el-table
            :data="performance_list"
            :height="this.mainListHeight(130) + 'px'"
          >
            <el-table-column label="业绩月份" prop="a"></el-table-column>
            <el-table-column label="姓名" prop="b"></el-table-column>
            <el-table-column label="收房套数" prop="c"></el-table-column>
            <el-table-column label="租房套数" prop="d"></el-table-column>
            <el-table-column label="实际业绩" prop="e"></el-table-column>
            <el-table-column label="溢出业绩" prop="f"></el-table-column>
            <el-table-column label="开单人" prop="g"></el-table-column>
            <el-table-column label="负责人" prop="h"></el-table-column>
            <el-table-column label="所属部门" prop="i"></el-table-column>
          </el-table>
        </div>

        <footer class="flex-center bottomPage">
          <div class="develop flex-center">
            <i class="el-icon-d-arrow-right"></i>
          </div>
          <div class="page">
            <el-pagination
              :total="1000"
              layout="total,jumper,prev,pager,next"
              :current-page="params.page"
              :page-size="params.limit"
              @current-change="handleChangePage">
            </el-pagination>
          </div>
        </footer>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
              show_market: false,
              selects: [
                {
                  id: 1,
                  title: '业绩'
                },
                {
                  id: 2,
                  title: '收益'
                },
              ],
              chooseTab: 1,
              params: {
                page: 1,
                limit: 30
              },
              performance_list: [
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
                {a: '2019-01-01',b: '仙缘雅居',c: 32,d: 100,e: 10000,f: 3000,g: '冯宝宝',h: '张楚岚',i: '仙林组'},
              ]
            }
        },
        mounted() {
        },
        watch: {},
        computed: {},
        methods: {
          changeTabs (id) {
            this.chooseTab = id;
          },
          handleChangePage(page) {
            this.params.page = page;
          },
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/performance/index.scss";

  @mixin perImage($m,$n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #performance {
      .per1 {
        @include perImage('per1.png','theme1');
      }
      .per2 {
        @include perImage('per2.png','theme1');
      }
    }
  }
</style>
