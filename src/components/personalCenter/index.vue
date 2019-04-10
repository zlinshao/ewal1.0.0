<template>
    <div id="personal_center">
      <div class="personal-center-container">
        <div class="container-left">
          <div class="container-left-up">
            <div class="personal-info">
              <div class="personal-info-photo"></div>
              <div class="personal-info-name">
                张三
                <div class="personal-info-badge">P2</div>
              </div>
              <div class="personal-info-status">
                的说法十分艰苦拉萨sadSadfas sadf
              </div>
            </div>
            <div class="personal-group-button"></div>
          </div>
          <div class="container-left-down"></div>
        </div>
        <div class="container-right">
          <div class="calendar"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
  @import '../../assets/scss/personalCenter/index.scss';

  @mixin personalCenterImg($m, $n) {
    $url: '../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }
  #theme_name {
    #personalCenter {

    }
  }

  #theme_name.theme1 {
    #personal_center {
      .personal-center-container {
        .container-left {
          .personal-info-badge {
            @include personalCenterImg('fill_1.png','theme1');
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #personal_center {

    }
  }

  #theme_name.theme3 {
    #personal_center {

    }
  }

  #theme_name.theme4 {
    #personal_center {

    }
  }
</style>
