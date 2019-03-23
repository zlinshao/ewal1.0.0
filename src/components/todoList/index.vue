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
        <!--<div class="todo-list-container-top">
          <div v-for="(item,index) in todo_list_container_top" @click="container_checked = (item.id)"
               class="todo-list-item"
               :class="{'checked':container_checked==item.id}">
            <div class="todo-list-item-title">{{item.title}}</div>

            <div v-for="(value,key) in item" v-if="!(key=='id'||key=='title'||key=='onClick')" class="todo-list-item-content">
            <i :class="'todo-list-item-content-icon-'+key"></i>
              {{value}}
            </div>

          </div>
        </div>
        <div class="todo-list-container-bottom">
          <div v-for="(item,index) in todo_list_container_bottom" @click="container_checked = (item.id)"
               class="todo-list-item"
               :class="{'checked':container_checked==item.id}">
            <div class="todo-list-item-title">{{item.title}}</div>
            <div v-for="(value,key) in item" v-if="!(key=='id'||key=='title'||key=='onClick')" class="todo-list-item-content">
              <i :class="'todo-list-item-content-icon-'+key"></i>
              {{value}}
            </div>
          </div>
        </div>-->
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
        checked: 1,//选择哪个toolbar
        container_checked: -1,//选择哪个列表数据容器,
        todo_list_container_arr: [],
      }
    },
    methods: {
      trigger(val) {
        console.log(val);
      }
    }
  }
</script>

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
