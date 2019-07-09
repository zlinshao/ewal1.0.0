<template>
  <div id="name_shower">
    <div class="name-list-container">
      <div v-for="item in nameList" :key="item.id" class="name-item">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "name-shower",
    props: {
      type: {
        default: 'org',
      },
      ids: {
        type: Array,
        default() {
          return []
        }
      },
    },
    watch:{
      ids:{
        handler(val,oldVal) {
          if(val&&val.length>0) {
            this.getNameList();
          }
        },
        immediate: true,
      },
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        nameList: [
          /*{
            id: 1,
            name: '研发部',
          },
          {
            id: 2,
            name: '产品不',
          },
          {
            id: 3,
            name: '市场部',
          }*/
        ],
      }
    },
    methods: {
      getNameList() {
        if (this.type == 'org') {
          this.getOrgNameList();
        }
        if(this.type=='user') {
          this.getUserNameList();
        }
      },

      getUserNameList() {
        if (!this.ids || this.ids.length == 0) {
          return;
        }
        let params = {
          user_id: this.ids,
          staff:1,
          limit:1000,
        };
        this.$http.get(`${this.url}staff/user`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.nameList = res.data.data;
          }
        });
      },

      getOrgNameList() {
        if (!this.ids || this.ids.length == 0) {
          return;
        }
        let params = {
          org_id: this.ids,
          is_enable: 1,
        };
        this.$http.get(`${this.url}organization/organization`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.nameList = res.data.data;
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

  @import "../../../assets/scss/common/lightweightComponents/NameShower";

  @mixin NameShowerImg($m, $n) {
    $url: '../../../assets/image/common/lightweightComponents/NameShower/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #name_shower {

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
