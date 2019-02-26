<template>
    <div id="houseCard">
      <div :style="{'height' : content_height + 'px'}">
        <div class="content scroll_bar" @scroll="handleScroll">
          <div class="flex cards">
            <div v-for="item in house_info" :key="item.id" class="justify-center">
              <div class="card" :class="['card_trans-' + item.id]" @dblclick.prevent="handleOpenCard(item)">
                <div class="photo">
                  <div class="picture">
                    <img class="picture" :src="item.url" alt="...">
                  </div>
                  <div class="bg">
                    <div class="btn" @click.stop="handleOpenControl(item.id)">...</div>
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
                <div class="control flex-center" @click.stop="" :class="{'show_control' : show_control === item.id }">
                  <span v-for="tmp in tip_btn" :key="tmp.id" @click.stop="is_tip = tmp.id" :class="{'tip_btn': is_tip === tmp.id }">{{ tmp.val }}</span>
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
              show_control: 0,
              content_height: window.innerHeight - 171,
              house_info: [],
              tip_btn: [
                {id: 1,val: '跟进'},
                {id: 2,val: '上传'},
                {id: 3,val: '标价'},
                {id: 4,val: '评分'},
                {id: 5,val: '标记'},
                {id: 6,val: '密码'}
              ],
              is_tip: 0
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
          handleOpenCard(item) {
            this.$emit('open',item);
          },
          handleScroll() {
            this.$emit('close');
          },
          handleOpenControl(id) {
            this.show_control = id;
            this.is_tip = 0;
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
                @include radius( 0 0 50px 50px);
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
            .tip_btn {
              @include marketCentreImg('xzgj.png','theme1');
              background-size: contain;
              padding: 4px 20px;
              color: $colorE33;
            }
          }
        }
      }
    }
  }
</style>
