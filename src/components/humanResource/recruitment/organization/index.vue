<template>
  <div id="organization">
    <ul id="demo" >
        <tree-item
          class="item"
          :item="treeData"
          @make-folder="makeFolder"
          @add-item="addItem">
        </tree-item>
    </ul>
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
            { name: 'hello' },
            { name: 'wat' },
            {
              name: 'child folder',
              children: [
                {
                  name: 'child folder',
                  children: [
                    { name: 'hello' },
                    { name: 'wat' }
                  ]
                },
                { name: 'hello' },
                { name: 'wat' },
                {
                  name: 'child folder',
                  children: [
                    { name: 'hello' },
                    { name: 'wat' }
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
      makeFolder: function (item) {
        Vue.set(item, 'children', []);
        this.addItem(item)
      },
      addItem: function (item) {
        item.children.push({
          name: 'new stuff'
        })
      }
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
