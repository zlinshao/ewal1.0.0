<template>
  <div id="newMedia" class="flex-center">
     <!-- <coming-soon></coming-soon> -->
    <div class="flex-center">
      <div class="mainList">
        <div class="list justify-bet">
          <div v-for="(item,index) in newMedia.data"
               :key="index"
               @click="routerLink(item.url)"
          >
            <p class="writingMode">{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {newMedia} from '../../assets/js/allModuleList.js'

    export default {
      name: "index",
      data(){
          return{
            newMedia,
          }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/newMedia/index.scss";
  @mixin newMediaImg($n, $m) {
    $url: '../../assets/image/newMedia/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #newMedia {
      > div {
      }
      .mainList {
        @include newMediaImg('theme1','di.png');
        >div {
        }
        .list{
          div{
           @include newMediaImg('theme1','weikuan1_copy.png');
            &:hover{
              @include newMediaImg('theme1','dingjin_copy.png');
            }
          }
        }

      }

    }

  }

</style>
