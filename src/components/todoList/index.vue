<template>
  <div id="theme_name">   <!--为了正常显示lj-dialog的css样式-->
    <div id="todo_list" :class="{'todo-list': todo_list_visible}">
      <div class="pendant-container">
        <div class="pendant">
          <div class="horizontal"></div>
          <div class="todo-list-title">待办事项</div>
          <div class="item-list">
            <div class="item-detail" @click="checked=(index+1)" :class="{'checked':checked==(index+1)}"
                 v-for="(item,index) in todo_list_toolbar">
              <span v-if="item.tipCount">{{item.tipCount}}</span>
              <i :class="{'multi-font':item.content.length>3}">{{item.content}}</i>
            </div>
          </div>
          <div class="search-bar">
            <div class="search-bar-item icons-category"></div>
            <div class="search-bar-item icons-add"></div>
            <div class="search-bar-item icons-search"></div>
          </div>
        </div>
      </div>
      <div class="todo-list-container">
        <!--渲染todo_list数据   可优化//todo-->
        <div :class="{'todo-list-container-top':listIndex==0,'todo-list-container-bottom':listIndex==1}"
             v-for="(listItem,listIndex) in todo_list_container_arr">
          <div v-for="(item,index) in todo_list_container_arr[listIndex]" @click="container_checked = (item.id);todoListVisibleTrigger(item.onClick)"
               class="todo-list-item">
            <div class="todo-list-item-title">{{item.title}}</div>
            <div v-for="(value,key) in item" v-if="!(key=='id'||key=='title'||key=='onClick')"
                 class="todo-list-item-content">
              <i :class="'todo-list-item-content-icon-'+key"></i>
              {{value}}
            </div>
          </div>
        </div>

      </div>
      <footer class="flex-center common-page">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.page"
            :page-size="params.limit"
            :total="counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>

      <interview-dialog></interview-dialog>
    </div>
  </div>

</template>

<script>
  import interviewDialog from './components/humanResource/interviewDialog';

  export default {
    name: "index",
    components: {
      interviewDialog
    },
    computed: {
      todo_list_visible() {
        return this.$store.state.todo.todo_list_visible;
      },
      todo_list_toolbar() {
        return this.$store.state.todo.todo_list_toolbar;
      },
      todo_list_container() {
        return this.$store.state.todo.todo_list_container;
      }
    },
    watch: {
      todo_list_container: {
        handler(val, oldVal) {
          //console.log(val, oldVal);
          this.todo_list_container_arr[0] = val.slice(0, 5);
          this.todo_list_container_arr[1] = val.slice(5);
        },
        //deep:true,
        immediate: true//第一次绑定也执行
      },
    },
    data() {
      return {
        counts: 1000,
        params: {
          search: '',
          page: 1,
          limit: 30,
          org_id: '',
          position_id: '',
        },



        checked: 1,//选择哪个toolbar
        container_checked: -1,//选择哪个列表数据容器,
        todo_list_container_arr: [],
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        console.log(`当前页: ${val}`);
      },
      trigger(val) {
        console.log(val);
      }
    }
  }
</script>
<!--<style lang="scss">
  #todo_list {
    footer.common-page {
      .el-input__inner {
        border: 1px solid #CF2E33 !important;
      }
    }
  }
</style>-->
<style scoped lang="scss">
  @import "../../assets/scss/todoList/index.scss";

  @mixin todoListImg($m,$n) {
    $url: '../../assets/image/todoList/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #todo_list {

    .pendant {
      .item-list {
        .item-detail {
          @include todoListImg('dbw.png', 'theme1');

          &.checked {
            @include todoListImg('dbx.png', 'theme1');
          }
        }
      }

      .search-bar {
        .search-bar-item {
          &.icons-category {
            @include todoListImg('gx.png', 'theme1');
          }

          &.icons-add {
            @include todoListImg('tj.png', 'theme1');
          }

          &.icons-search {
            @include todoListImg('ss.png', 'theme1');
          }
        }
      }
    }

    .todo-list-container {
      .todo-list-item {
        @include todoListImg('bjw.png', 'theme1');

        &:hover {
          @include todoListImg('xzbj.png', 'theme1');

          .todo-list-item-content {
            .todo-list-item-content-icon-date {
              @include todoListImg('sjx.png', 'theme1');
            }

            .todo-list-item-content-icon-user {
              @include todoListImg('ryx.png', 'theme1');
            }

            .todo-list-item-content-icon-location {
              @include todoListImg('dzx.png', 'theme1');
            }

            .todo-list-item-content-icon-tip {
              @include todoListImg('txx.png', 'theme1');
            }

            .todo-list-item-content-icon-money {
              @include todoListImg('jqx.png', 'theme1');
            }

            .todo-list-item-content-icon-project {
              @include todoListImg('xmx.png', 'theme1');
            }
          }
        }

        .todo-list-item-content {
          .todo-list-item-content-icon-date {
            @include todoListImg('sjw.png', 'theme1');
          }

          .todo-list-item-content-icon-user {
            @include todoListImg('ryw.png', 'theme1');
          }

          .todo-list-item-content-icon-location {
            @include todoListImg('dzw.png', 'theme1');
          }

          .todo-list-item-content-icon-tip {
            @include todoListImg('txw.png', 'theme1');
          }

          .todo-list-item-content-icon-money {
            @include todoListImg('jqw.png', 'theme1');
          }

          .todo-list-item-content-icon-project {
            @include todoListImg('xmw.png', 'theme1');
          }
        }
      }
    }

  }

</style>
