<template>
  <div id="customService">
    <div class="menu_list flex-center">
      <div class="menu_contain" v-for="(item,key) in menu_list">
        <span class="writingMode" :key="key" @click="routerLink(item.url)">{{ item.title }}</span>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        menu_list: [
          {
            title: '工单',
            url: '/customService/workOrder'
          },
          {
            title: '回访',
            url: ''
          },
          {
            title: '到期',
            url: ''
          },
          {
            title: '资料',
            url: ''
          },
          {
            title: '合同',
            url: ''
          },
          {
            title: '客户',
            url: ''
          },
          {
            title: '客服',
            url: ''
          },
          {
            title: '房屋',
            url: ''
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
    methods: {},
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/customService/index.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../assets/image/customService/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #customService {
      .menu_list{
        .menu_contain{
          span {
            @include serviceImg('huidi.png','theme1');
            &:hover{
              @include serviceImg('hongdi.png','theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #customService {

    }
  }

  #theme_name.theme3 {
    #customService {

    }
  }

  #theme_name.theme4 {
    #customService {

    }
  }
</style>
