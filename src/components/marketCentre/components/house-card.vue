<template>
    <div id="houseCard">
      <div>
        <div class="photo">
          <div class="btn">...</div>
          <div class="bg"></div>
          <img src="./swipe4.jpg" alt="">
        </div>
        <div class="info">
          <span class="address">东方兰园12-304</span>
          <div class="text">
            <p><b class="type_icon"></b>{{ house_info.type }}</p>
            <p><b class="info_icon"></b>{{ house_info.info }}</p>
            <p><b class="price_icon"></b>{{ house_info.price }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
              house_info: {
                type: '两室1厅1卫',
                info: '空置120天/剩余3月',
                price: '建议2600元/月 3月付'
              }
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
  @import "../../../assets/scss/marketCentre/components/house-card.scss";
  @mixin marketCentreImg ($m,$n) {
    $url: '../../../assets/image/marketCentre/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #houseCard {
    > div {
      .photo {
        .bg {
          @include marketCentreImg('bk.png','theme1');
        }
        .btn {
          @include radius(50%);
          background-color: $color0C0;
        }
      }
      .info {
        .address {
          font-family: 'jingDianXingShu';
        }
        .text {
          > p {
            b{
              @include radius(50%);
            }
            .type_icon {
              @include marketCentreImg('hx.png','theme1');
            }
            .info_icon {
              @include marketCentreImg('sj.png','theme1');
            }
            .price_icon {
              @include marketCentreImg('jg.png','theme1');
            }
          }
        }
      }
    }
  }
</style>
