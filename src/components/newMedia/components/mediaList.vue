<template>
  <div id="newMediaList">
    <div :class="{'dialogVisible': dialogVisible}" @click="dialogVisible = false"></div>
    <div class="list flex-center" :class="{'backdrop': dialogVisible}">
      <div class="justify-around">
        <div v-for="item in newMedia.data" @click="moduleRouter(item.url)">
          <p>
            <span class="writingMode">{{item.title}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {newMedia} from '../../../assets/js/allModuleList.js'

  export default {
    name: "mediaList",
    props: ['module'],
    data() {
      return {
        newMedia,
        dialogVisible: false,
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.dialogVisible = val;
      },
      dialogVisible(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {},
    methods: {
      moduleRouter(url) {
        this.routerLink(url);
        this.$emit('close');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/newMedia/components/mediaList.scss";

  @mixin finMenuImg($m, $n) {
    $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    .list {
      height: 500px;
      position: fixed;
      top: 80px;
      left: -100%;
      width: 100%;
      z-index: 12;
      background-color: $colorFFF;
      border-color: transparent;
      @include transition(all .5s);


      > div {
        width: 100%;
        padding: 0 20%;
        height: 500px;
        @include finMenuImg('di.png', 'theme1');
        div {
          @include flex('flex-center');
          width: 100%;
          padding-top: 10%;
          p {
            position: relative;
            cursor: pointer;
            @include flex('flex-center');
            width: 100px;
            height: 240px;
            @include finMenuImg('weikuan1_copy.png', 'theme1');
            &:hover {
              @include finMenuImg('dingjin_copy.png', 'theme1');
              color: #CF2E33;
            }
            span {
              position: absolute;
              position: absolute;
              left: 50%;
              top:54%;
              transform: translate(-50%,-20%);
              @include flex('flex-center');
              font-size: 26px;
              font-family: 'jingDianXingShu';
            }
          }
        }
        div:nth-child(1), div:nth-child(2), div:nth-child(3) {
          p {
            margin-right: 10px;
          }
        }
      }
    }
    .backdrop {
      left: 0;
    }
  }

  #theme_name.theme1 {
    #newMediaList {

    }
  }

  #theme_name.theme2 {
    #newMediaList {

    }
  }

  #theme_name.theme3 {
    #newMediaList {

    }
  }

  #theme_name.theme4 {
    #newMediaList {

    }
  }
</style>
