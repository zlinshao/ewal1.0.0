<template>
  <div id="intellectualPropertyProtection">
    <div>
      <div class="listTopCss items-bet">
        <div class="items-center listTopLeft">
          <h2>知识产权保护</h2>
        </div>
        <div class="items-center listTopRight">
          <div class="icons add"><b>+</b></div>
        </div>
      </div>
      <div id='patentMenu'>
        <MenuList :list="intellectualPropertyProtection" :module="true"></MenuList>
      </div>
      <div id='patentLine'></div>
    </div>
  </div>
</template>

<script>
  import MenuList from '../common/menuList.vue';
  // import {intellectualPropertyProtection} from '../../assets/js/allModuleList.js';
  export default {
    name: "index",
    components: {MenuList},
    data() {
      return {
        url: globalConfig.intellectualPropertyProtection,
        intellectualPropertyProtection: {
          type: 'intellectualPropertyProtection',
          data: []
        },
      }
    },
    mounted() {
      this.getMenuList();
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      getMenuList: function () {
        this.$http.get(`${this.url}/api/knowledge/classify`).then(res => {
          if (res.status===200) {
            this.intellectualPropertyProtection.data = [
                                                            {
                                                              id: res.data.data[0].id,
                                                              url: 'enterpriseCertificate',
                                                              title: res.data.data[0].name
                                                            },
                                                            {
                                                              id: res.data.data[1].id,
                                                              url: 'patent',
                                                              title: res.data.data[1].name
                                                            },
                                                            {
                                                              id: res.data.data[2].id,
                                                              url: 'copyright',
                                                              title: res.data.data[2].name
                                                            },
                                                            {
                                                              id: res.data.data[3].id,
                                                              url: 'brand',
                                                              title: res.data.data[3].name
                                                            }
                                                        ]
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/intellectualPropertyProtection/index.scss";

  @mixin serviceImg($m, $n) {
    $url: '../../assets/image/intellectualPropertyProtection/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #intellectualPropertyProtection {
      #patentMenu{
        @include serviceImg('shan.png','theme1');
      }
      #patentLine{
        @include serviceImg('liuxian.png','theme1');
      }
    }
  }

  #theme_name.theme2 {
    #intellectualPropertyProtection {

    }
  }

  #theme_name.theme3 {
    #intellectualPropertyProtection {

    }
  }

  #theme_name.theme4 {
    #intellectualPropertyProtection {

    }
  }
</style>
