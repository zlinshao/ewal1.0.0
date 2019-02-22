<template>
    <div id="houseCard">
      <div :style="{'height' : content_height + 'px'}">
        <div class="content scroll_bar flex">
          <div v-for="item in house_info" class="justify-center">
            <div class="card">
              <div class="photo">
                <img class="picture" src="./swipe4.jpg" alt="">
                <div class="bg">
                  <div class="btn">...</div>
                </div>
                <span class="mark" :class="{'marked' : item.mark}"></span>
              </div>
              <div class="info">
                <span class="address">{{ item.address }}</span>
                <div class="text">
                  <p><b class="type_icon"></b>{{ item.type }}</p>
                  <p><b class="info_icon"></b>{{ item.info }}</p>
                  <p><b class="price_icon"></b>{{ item.price }}</p>
                </div>
                <div class="notice_info flex-center">
                  <span class="notice_type">{{ item.notice_type }}</span>
                  <span :class="['notice-' + item.notice ]" class="notice"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="btn_show"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['houseSource'],
        data() {
            return {
              content_height: window.innerHeight-171,
              house_info: []
            }
        },
        mounted() {
        },
        activated() {
        },
        watch: {
          houseSource: {
            handler(val) {
              this.house_info = val;
            },
            deep: true
          }
        },
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
      overflow: hidden;
      .content {
        height: 100%;
        padding-top: 20px;
        .card {
          .photo {
            .bg {
              @include marketCentreImg('bk.png','theme1');
            }
            .btn {
              @include radius(50%);
              background-color: $color0C0;
              &:hover {
                background-color: $colorE33;
                color: white;
              }
            }
            .marked {
              @include marketCentreImg('zlc.png','theme1');
              background-size: contain;
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
            .notice_info {
              .notice-0 {
                @include marketCentreImg('hs.png','theme1');
                background-size: contain;
              };
              .notice-1 {
                @include marketCentreImg('cs.png','theme1');
                background-size: contain;
              };
              .notice-2 {
                @include marketCentreImg('hs.png','theme1');
                background-size: contain;
              };
              .notice-3 {
                @include marketCentreImg('hs.png','theme1');
                background-size: contain;
              }
            }
          }
        }
        .btn_show {
          @include marketCentreImg('shouqi.png','theme1');
          background-size: cover;
          background-color: $colorE33;
          border-radius: 8px 0 0 8px;
        }
      }
    }
  }
</style>
