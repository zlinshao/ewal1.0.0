<template>
  <div id="todo_list" :class="{'todo-list': todo_list_visible}">
    <div class="pendant-container">
      <div class="pendant">
        <div class="horizontal"></div>
        <div class="todo-list-title">待办事项</div>
        <div class="item-list">
          <div class="item-detail" @click="checked=(index+1)" :class="{'checked':checked==(index+1)}" v-for="(item,index) in todo_list_toolbar">
            <span v-if="item.tipCount">{{item.tipCount}}</span>
            <i :class="{'multi-font':item.content.length>3}">{{item.content}}</i>
          </div>
        </div>
        <div class="search-bar">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    computed: {
      todo_list_visible() {
        return this.$store.state.app.todo_list_visible;
      },
      todo_list_toolbar() {
        return this.$store.state.app.todo_list_toolbar;
      }
    },
    data() {
      return {
        checked: 1,//选择哪个toolbar
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
    }
  }

</style>
