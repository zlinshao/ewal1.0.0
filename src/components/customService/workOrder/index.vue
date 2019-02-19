<template>
  <div id="workOrder">
    <div class="orderTop items-bet">
      <div class="items-center orderTopLeft">
        <p class="flex-center" @click="customModule">
          <b>...</b>
        </p>
        <h1>工单</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeList(item.id)" class="items-column"
                :class="{'chooseList': chooseList === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center orderTopRight">
        <p class="flex-center"><b>+</b></p>
        <p @click="highSearch"></p>
      </div>
    </div>
    <div class="orderList">
      <el-table
        :data="tableData"
        height="100%"
        header-row-class-name="tableHead"
        style="width: 100%">
        <el-table-column
          align="center"
          label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['status' + scope.row.status]">
              <p>{{statuss[scope.row.status]}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in Object.keys(showData)" :key="item"
          align="center"
          :prop="item"
          :label="showData[item]">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        chooseList: 1,
        selects: [
          {
            id: 1,
            title: '待处理',
          },
          {
            id: 2,
            title: '跟进中',
          },
          {
            id: 3,
            title: '已完成',
          }
        ],
        statuss: {
          1: '特急',
          2: '紧急',
          3: '重要',
          4: '一般',
        },
        showData: {
          date: '日期',
          name: '姓名',
          address: '地址',
        },
        tableData: [
          {
            status: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            status: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            status: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            status: 4,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
        ]
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // tab切换
      changeList(id) {
        this.chooseList = id;
      },
      // 高级搜索
      highSearch() {

      },
      // 客服入口
      customModule() {

      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/customService/workOrder/index.scss";

  @mixin workOrderImg($m, $n) {
    $url: '../../../assets/image/customService/workOrder/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #workOrder {
      .orderTop {
        .orderTopRight {
          p:last-of-type {
            @include bgImage('../../../assets/image/customService/theme1/search.png');
          }
        }
      }
      .orderList {
        .status1 {
          p {
            color: $colorFFF;
            @include workOrderImg('teji.png', 'theme1');
          }
        }
        .status2 {
          p {
            color: #FFAD0D;
            @include workOrderImg('jinji.png', 'theme1');
          }
        }
        .status3 {
          p {
            color: #0C66FF;
            @include workOrderImg('zhongyao.png', 'theme1');
          }
        }
        .status4 {
          p {
            color: $color874;
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #workOrder {

    }
  }

  #theme_name.theme3 {
    #workOrder {

    }
  }

  #theme_name.theme4 {
    #workOrder {

    }
  }
</style>
