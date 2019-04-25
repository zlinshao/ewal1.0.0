<template>
    <div id="market-menu-list" class="market-menu-list" :class="{'show_market' : show_Market}">
      <div class="container">
        <div class="content">
          <div class="btn"></div>
          <div class="light"></div>
          <div class="desk"></div>
          <div class="goods flex-center">
            <div class="goods_container flex-center" v-for="tmp in market_list" @click="handleRouterTo(tmp.url)">
              <span class="writingMode header" :class="[ 'bg-' + tmp.id ]">{{ tmp.title }}</span>
              <span class="footer"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow" v-if="show_shadow" @click="handleClose"></div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['showMarket','showShadow'],
        data() {
            return {
              show_Market: false,
              show_shadow: false,
              market_list: [
                {
                  title: '合同管理',
                  url: '/contractManagement',
                  id: 1
                },
                {
                  title: '客户管理',
                  url: '/customerManagement',
                  id: 2
                },
                {
                  title: '房源管理',
                  url: '/houseManagement',
                  id: 3
                },
                {
                  title: '工资业绩',
                  url: '/performance',
                  id: 4
                }
              ]
            }
        },
        mounted() { },
        activated() {
        },
        watch: {
          showMarket(val) {
            this.show_Market = val;
          },
          showShadow(val) {
            this.show_shadow = val;
          }
        },
        computed: {},
        methods: {
          handleRouterTo(url) {
            if (url === this.$route.path ) {
              this.show_Market = false;
              this.show_shadow = false;
              this.$emit('close');
            } else {
              this.routerLink(url);
            }
          },
          handleClose() {
            this.show_shadow = false;
            this.show_Market = false;
            this.$emit('close');
          }
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/marketCentre/components/market-menu-list.scss";

  @mixin marketCentreImg ($m,$n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  .market-menu-list {
    .container {
      .content {
        .light {
          @include marketCentreImg('deng.png','theme1');
        }
        .btn {
          @include marketCentreImg('btn.png','theme1');
        }
        .desk {
          @include marketCentreImg('zhuozi.png','theme1');
        }
        .goods {
          .goods_container {
            flex-direction: column;
            .header {
              font-family: 'jingDianXingShu';
            }
            @for $i from 1 to 5 {
              .bg-#{$i} {
                @include marketCentreImg('wh-' + $i + '.png','theme1');
                background-size: contain;
              }
            }
            .footer {
              @include marketCentreImg('xuanzhongdizuo.png','theme1');
              background-size: contain;
            }
            &:hover {
              @for $i from 1 to 5 {
                .bg-#{$i} {
                  @include marketCentreImg('wk-' + $i + '.png','theme1');
                  background-size: contain;
                  color: white;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
