<template>
  <div id="user_list">
    <div class="user-list-container">
      <div v-if="!mini" v-for="item in userList" class="user-item">
        <div v-if="item.img" class="user-item-left">
          <img :src="item.img">
        </div>
        <div v-if="!item.img" class="user-item-left bg-img">
        </div>
        <div class="user-item-right">
          <div :title="item.name" class="user-name">{{item.name}}</div>
          <div :title="item.post" class="user-post">{{substringPlugin(item.post,8)}}</div>
        </div>
      </div>
      <div v-if="mini" v-for="item in userList" class="user-item-mini">
        <div v-if="item.img" class="user-item-mini-top">
          <img :src="item.img">
        </div>
        <div v-if="!item.img" class="user-item-mini-top bg-img">
        </div>
        <div class="user-item-mini-bottom">
          <div :title="item.name" class="user-name" :style="{color: color}">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import HeadIcon from '../../../assets/image/common/lightweightComponents/UserList/theme1/touxiang.png';

  export default {
    name: "user-list",
    props:{
      ids:{
        type: Array,
        default() {
          return [];
        }
      },
      mini: {
        type:Boolean,
        default: false,
      },
      color: {
        type:String,
        default:'#686874',
      },
      clear: {
        type:Boolean,
        default:false,
      },
    },
    data() {
      return {
        url:globalConfig.humanResource_server,

        userList:[],
      }
    },
    mounted() {
      //this.getUserList();
    },
    watch: {
      ids: {
        handler(val,oldVal) {
          this.getUserList();
          /*if(val&&val.length>0) {
            this.getUserList();
          }*/
         },
        //immediate:true,
      },
      clear: {
        handler(val, oldVal) {
          if(val) {
            this.userList = [];
          }
        }
      },
    },
    methods: {
      getUserList() {
        this.userList = [];
        if(this.ids.length==0) return;
        let params = {
          limit:1000,
          user_id:this.ids,
          //user_id:[211,289,3604,3623,3590,3589],
          staff:1
        };
        this.$http.get(`${this.url}staff/user`,params).then(res=> {
          if(res.code.endsWith('0')) {
            for(let item of res.data.data) {
              let obj = {
                name: item.name||'-',
                img: item.avatar,
                post:item.position[0]?.name||'-',
              };
              this.userList.push(obj);
            }
          } else {
            console.log('UserList组件->获取人员信息失败...');
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common/lightweightComponents/UserList";
  @mixin UserListImg($m, $n) {
    $url: '../../../assets/image/common/lightweightComponents/UserList/' + $n + '/' + $m;
    @include bgImage($url);
  }
  #theme_name {
    #user_list {
      .bg-img {
        @include UserListImg('touxiang.png','theme1');
      }
    }
  }

  #theme_name.theme1 {
    #user_list {

    }
  }

  #theme_name.theme2 {
    #user_list {

    }
  }

  #theme_name.theme3 {
    #user_list {

    }
  }

  #theme_name.theme4 {
    #user_list {

    }
  }
</style>
