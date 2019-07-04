<template>
  <div id="slider">
    <div v-if="!single" class="window" :style="{width: width+'px',height: height+'px'}" @mouseover="stop" @mouseleave="play">
      <ul class="container" :style="containerStyle">
        <li>
          <div v-if="sliders[sliders.length-1]&&sliders[sliders.length - 1].info.ext.includes('video')"
               class="video-container" :style="{width: width+'px',height: height+'px'}">
            <video @click.self="videoControl" ref="videoDom" style="width: 100%; height:100%; object-fit: fill">
              <source :src="sliders[sliders.length - 1].uri" type="video/mp4">
              <source :src="sliders[sliders.length - 1].uri" type="video/ogg">
              不支持的格式
            </video>
            <div v-if="isShowPlayBtn" class="play-container">
              <div @click.self="audioPlay($event)" class="play"></div>
            </div>
          </div>
          <img v-if="sliders[sliders.length-1]&&sliders[sliders.length - 1].info.ext.includes('image')"
               :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].uri" alt="">
        </li>
        <li v-for="(item, index) in sliders" :key="index">
          <img :style="{width:imgWidth+'px',height: height+'px'}" v-if="item.info.ext.includes('image')" :src="item.uri"
               alt="">
          <div v-if="item.info.ext.includes('video')" class="video-container"
               :style="{width: width+'px',height: height+'px'}">
            <video @click.self="videoControl" ref="videoDom" style="width: 100%; height:100%; object-fit: fill">
              <source id="mp4_src" :src="item.uri" type="video/mp4">
              <source id="ogg_src" :src="item.uri" type="video/ogg">
              <source :src="item.uri" type="video/webm"/>
              <source :src="item.uri" type="audio/ogg"/>
              <source :src="item.uri" type="audio/mpeg"/>

              不支持的格式
            </video>
            <div v-if="isShowPlayBtn" class="play-container">
              <div @click.self="audioPlay($event)" class="play"></div>
            </div>
          </div>
        </li>
        <li>
          <img v-if="sliders[0] && sliders[0].info.ext.includes('image')" :style="{width:imgWidth+'px'}"
               :src="sliders[0].uri" alt="">
          <div v-if="sliders[0] && sliders[0].info.ext.includes('video')" class="video-container"
               :style="{width: width+'px',height: height+'px'}">
            <video @click.self="videoControl" ref="videoDom" style="width: 100%; height:100%; object-fit: fill">
              <source :src="sliders[0].uri" type="video/mp4">
              <source :src="sliders[0].uri" type="video/ogg">
              不支持的格式
            </video>
            <div v-if="isShowPlayBtn" class="play-container">
              <div @click.self="audioPlay($event)" class="play"></div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="sliders.length>1" class="direction">
        <li class="left" @click="move(imgWidth, 1, speed)">
          <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff"
                  d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"/>
          </svg>
        </li>
        <li class="right" @click="move(imgWidth, -1, speed)">
          <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff"
                  d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"/>
          </svg>
        </li>
      </ul>
      <ul v-if="sliders.length>1" class="dots">
        <li v-for="(dot, i) in sliders" :key="i"
            :class="{dotted: i === (currentIndex-1)}"
            @click=jump(i+1)
        >
        </li>
      </ul>
    </div>


    <div v-if="single" :style="size" class="window" @mouseover="stop" @mouseleave="play">
      <ul class="container" :style="size">
        <li :style="size" v-for="(item, index) in sliders" :key="index">
          <img :style="size" v-if="item.info.ext.includes('image')" :src="item.uri"
               alt="">
          <div v-if="item.info.ext.includes('video')" class="video-container"
               :style="size">
            <video @click.self="videoControl" ref="videoDom" style="width: 100%; height:100%; object-fit: fill">
              <source :src="item.uri" type="video/mp4">
              <source :src="item.uri" type="video/ogg">
              <source :src="item.uri" type="video/webm"/>
              <source :src="item.uri" type="audio/ogg"/>
              <source :src="item.uri" type="audio/mpeg"/>
              不支持的格式
            </video>
            <div v-if="isShowPlayBtn" class="play-container">
              <div @click.self.stop="audioPlay($event)" class="play"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ImgSlider',
    props: {
      initialSpeed: {
        type: Number,
        default: 30
      },
      initialInterval: {
        type: Number,
        default: 3
      },
      initialIndex: {
        default:1,
      },
      width: {
        type: [Number, String],
        default: 600,
      },
      height: {
        type: [Number],
        default: 400,
      },
      size: {
        default() {
          return {
            width:'600px',
            height:'400px',
          }
        }
      },
      arr: {
        type: Array,
        //default: () => [],
      },
      ids: {
        type: Array
      },
      single: {
        default:false,
      }
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        sliders: [
          /*{
            "id": 123,
            "name": "lejia7f87dea5d2f218312028484e56211173.jpg",
            "display_name": "lejia7f87dea5d2f218312028484e56211173.jpg",
            "raw_name": "lejia7f87dea5d2f218312028484e56211173.jpg",
            "info": {
              "ext": "image\/jpeg",
              "host": "static.lejias.cn",
              "mime": "image\/jpeg",
              "size": 51251,
              "bucket": "lejia-test"
            },
            "currentPlace": null,
            "user_id": null,
            "uri": "http:\/\/static.lejias.cn\/lejia7f87dea5d2f218312028484e56211173.jpg",
            "created_at": "2019-03-21 11:32:02",
            "updated_at": "2019-03-21 11:32:02",
            "deleted_at": null
          },
          {
            "id": 213,
            "name": "lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
            "display_name": "lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
            "raw_name": "lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
            "info": {
              "ext": "image\/jpeg",
              "host": "static.lejias.cn",
              "mime": "image\/jpeg",
              "size": 400542,
              "bucket": "lejia-test"
            },
            "currentPlace": null,
            "user_id": null,
            "uri": "http:\/\/static.lejias.cn\/lejia18ff9bc0af300e4337ca5d9fa228b57b.JPG",
            "created_at": "2019-03-21 20:04:42",
            "updated_at": "2019-03-21 20:04:42",
            "deleted_at": null
          },
          {
            "id": 21321,
            "name": "o_1calcge7f1j2939h13l81hj339go.png",
            "display_name": "色相饱和度1.png",
            "raw_name": "色相饱和度1.png",
            "info": {
              "ext": "image\/png",
              "host": "http:\/\/s.lejias.cn\/",
              "mime": "image\/png",
              "size": 453155,
              "bucket": "lejia-prod"
            },
            "currentPlace": "null",
            "user_id": 462,
            "uri": "http:\/\/s.lejias.cn\/o_1calcge7f1j2939h13l81hj339go.png",
            "created_at": "2018-04-09 22:21:13",
            "updated_at": "2018-04-09 22:21:13",
            "deleted_at": null
          },
          {
            "id": 4224740,
            "name": "lejia1ff3335618ba4653810a3e91a1e87abe.mp4",
            "display_name": "lejia1ff3335618ba4653810a3e91a1e87abe.mp4",
            "raw_name": "lejia1ff3335618ba4653810a3e91a1e87abe.mp4",
            "info": {
              "ext": "video",
              "host": "static.lejias.cn",
              "mime": "video",
              "size": 243104,
              "bucket": "lejia-test"
            },
            "currentPlace": null,
            "user_id": null,
            "uri": "http:\/\/static.lejias.cn\/lejia1ff3335618ba4653810a3e91a1e87abe.mp4",
            "created_at": "2019-04-03 18:30:12",
            "updated_at": "2019-04-03 18:30:12",
            "deleted_at": null
          }*/
        ],

        /*sliders: [
          {
            img: 'http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658'
          },
          {
            img: 'http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658'
          },
          {
            video: 'http://www.w3school.com.cn/i/movie.mp4'
          },
          {
            img: 'http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658'
          },
          {
            video: 'http://www.w3school.com.cn/i/movie.mp4'
          },
          {
            img: 'http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658'
          },
          {
            img: 'http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658'
          },
        ],*/
        imgWidth: 0,
        currentIndex: 1,
        distance: 0,
        transitionEnd: true,
        speed: this.initialSpeed,
        isShowPlayBtn: true,
      }
    },
    watch: {
      ids: {
        handler(val, oldVal) {
          if (val) {
            this.getPictureUrl(val);
          }
        },
        immediate: true,
      },

      arr: {
        handler(val, oldVal) {
          if (val) {
            this.sliders = val;
          }
        },
        immediate: true,
      },
      width: {
        handler(val, oldVal) {
          val = parseInt(val);
          this.imgWidth = val;
          this.distance = -val;
        },
        immediate: true
      },
      initialIndex: {
        handler(val,oldVal) {
          this.jump(val);
        },
        immediate: true,
      },
    },
    computed: {
      containerStyle() {
        return {
          transform: `translate3d(${this.distance}px, 0, 0)`
        }
      },
      interval() {
        return this.initialInterval * 1000
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      //获取图片
      getPictureUrl(val) {
        let params = {"id": val};
        this.$http.post(`${this.url}public/pic`, params).then(res => {

          if (res.code.endsWith('0')) {
            this.sliders = res.data;
          }
        }).catch();
      },


      init() {
        this.play()
        window.onblur = function () {
          this.stop()
        }.bind(this)
        window.onfocus = function () {
          this.play()
        }.bind(this)
      },
      move(offset, direction, speed) {
        let _this = this;
        if (!this.transitionEnd) return
        this.transitionEnd = false
        direction === -1 ? this.currentIndex += offset / this.imgWidth : this.currentIndex -= offset / this.imgWidth
        if (this.currentIndex > _this.sliders.length) this.currentIndex = 1;
        if (this.currentIndex < 1) this.currentIndex = _this.sliders.length;

        const destination = this.distance + offset * direction
        this.animate(destination, direction, speed)
      },
      animate(des, direc, speed) {
        let _this = this;
        if (this.temp) {
          window.clearInterval(this.temp);
          this.temp = null;
        }
        this.temp = window.setInterval(() => {
          if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
            this.distance += speed * direc
          } else {
            this.transitionEnd = true
            window.clearInterval(this.temp)
            this.distance = des
            if (des < -_this.imgWidth * _this.sliders.length) this.distance = -_this.imgWidth
            if (des > -_this.imgWidth) this.distance = -_this.imgWidth * _this.sliders.length
          }
        }, 20)
      },
      jump(index) {
        const direction = index - this.currentIndex >= 0 ? -1 : 1;
        const offset = Math.abs(index - this.currentIndex) * this.imgWidth;
        const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed;
        this.move(offset, direction, jumpSpeed)
      },
      play() {
        if(this.sliders.length<=1) return;
        if (this.timer) {
          window.clearInterval(this.timer)
          this.timer = null
        }
        this.timer = window.setInterval(() => {
          this.move(this.imgWidth, -1, this.speed)
        }, this.interval)
      },
      stop() {
        window.clearInterval(this.timer)
        this.timer = null
      },

      audioPlay(e) {
        let _this = this;
        _this.isShowPlayBtn = false;
        let myAudio = e.target.parentElement.parentElement.getElementsByTagName('video')[0];
        myAudio.play();
        _this.stop();
        myAudio.onended = function () {
          _this.isShowPlayBtn = true;
          _this.play();
        }
        this.$emit('played');
      },
      videoControl() {
        this.isShowPlayBtn = !this.isShowPlayBtn;
        document.querySelectorAll('video').forEach((item) => {
          item.pause();
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common/lightweightComponents/ImgSlider/index";

  /*@import "../../../../assets/scss/humanResource/repository/borrowReceive/index.scss";*/
  @mixin sliderImg($m, $n) {
    $url: '../../../assets/image/common/lightweightComponents/imgslider/' + $n + '/' + $m;
    @include bgImage($url);
  }
  #slider {
    width: 100%;
    height: 100%;
    .window {
      width: 100%;
      height: 100%;
    }
  }

  .video-container {
    width: 100%;
    height: 100%;
    position: relative;

    .play-container {
      top: 0;
      left: 0;
      position: absolute;
      @include flex('flex-center');
      width: 100%;
      height: 100%;

      .play {
        width: 70px;
        height: 70px;
        @include sliderImg('5.png', 'theme1');

        &:hover {
          @include sliderImg('3.png', 'theme1');
        }

        cursor: pointer;
      }
    }
  }


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ol, ul {
    list-style: none;
  }

  #slider {
    text-align: center;
  }

  .window {
    position: relative;
    width: 600px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
  }

  .container {
    display: flex;
    position: absolute;
  }

  .left, .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 50%;
    cursor: pointer;
  }

  .left {
    left: 3%;
    padding-left: 12px;
    padding-top: 10px;
  }

  .right {
    right: 3%;
    padding-right: 12px;
    padding-top: 10px;
  }

  img {
    user-select: none;
  }

  .dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .dots li {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 0 3px;
    border: 1px solid white;
    border-radius: 50%;
    background-color: #333;
    cursor: pointer;
  }

  .dots .dotted {
    background-color: orange;
  }
</style>
