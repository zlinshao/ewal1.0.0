<template>
    <div id="houseCard">
      <div :style="{'height' : content_height + 'px'}">
        <div class="content scroll_bar" @scroll.lazy="handleScroll">
          <div class="flex cards">
            <div v-for="item in house_info" class="justify-center">
              <div class="card">
                <div class="photo">
                  <div class="picture">
                    <img class="picture" :src="item.url" alt="...">
                  </div>
                  <div class="bg">
                    <div class="btn" @click="handleOpenControl(item.id)">...</div>
                    <div class="house_type">精装</div>
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
                <div class="control flex-center" :class="{'show_control' : show_control === item.id }">
                  <span>跟进</span>
                  <span>上传</span>
                  <span>标价</span>
                  <span>评分</span>
                  <span>标记</span>
                  <span>密码</span>
                  <div class="arrows"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination
              :total="100"
              layout="total,jumper,prev,pager,next"
            ></el-pagination>
          </div>
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
              show_control: 1,
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
        methods: {
          handleScroll() {
            this.$emit('close');
          },
          handleOpenControl(id) {
            this.show_control = id;
          }
        },
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
      .content {
        height: 100%;
        padding-top: 50px;
        .card {
          .photo {
            .bg {
              @include marketCentreImg('bk.png','theme1');
              .btn {
                @include radius(50%);
                background-color: $color0C0;
                &:hover {
                  background-color: $colorE33;
                  color: white;
                }
              }
              .house_type {
                color: white;
                font-family: 'jingDianXingShu';
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
              .notice-1 {
                @include marketCentreImg('hhs.png','theme1');
                background-size: contain;
              };
              .notice-2 {
                @include marketCentreImg('cs.png','theme1');
                background-size: contain;
              };
              .notice-3 {
                @include marketCentreImg('hs.png','theme1');
                background-size: contain;
              };
            }
          }
          .control {
            background-color: $color874;
            @include radius(5px);
            .arrows {
              background-color: $color874;
            }
          }
        }
      }
    }
  }
</style>
