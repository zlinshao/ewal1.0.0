<template>
  <div id="organization">
    <tree-item
      :item="treeData">
    </tree-item>
  </div>
</template>

<script>
  import TreeItem from './tree.vue'

  export default {
    name: 'tree',
    components: {TreeItem},
    data() {
      return {
        url: globalConfig.server,
        treeData: {
          name: 'My Tree',
          children: [
            {name: 'hello1'},
            {name: 'wat1'},
            {
              name: 'child folder',
              children: [
                {
                  name: 'child folder',
                  children: [
                    {name: 'hello3'},
                    {name: 'wat3'}
                  ]
                },
                {name: 'hello2'},
                {name: 'wat2'},
                {
                  name: 'child folder',
                  children: [
                    {name: 'hello3'},
                    {name: 'wat3'}
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {},
    computed: {},
    methods: {
      // makeFolder: function (item) {
      //   this.set(item, 'children', []);
      //   this.addItem(item);
      // },
      // addItem: function (item) {
      //   item.children.push({
      //     name: 'new stuff'
      //   })
      // }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/recruitment/organization/index.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/recruitment/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #organization {

    }
  }

  #theme_name.theme2 {
    #organization {

    }
  }

  #theme_name.theme3 {
    #organization {

    }
  }

  #theme_name.theme4 {
    #organization {

    }
  }
</style>
