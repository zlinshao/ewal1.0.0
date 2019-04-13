<template>
  <div id="salary" class="salary">
    <div class="listTopCss">
      <div class="search-toolbar listTopRight">
        <!--<div class="icons add" @click="new_train_visible = true"><b>+</b></div>-->
      </div>
    </div>
    <div class="main-nav">
          <span
            v-for="item in active"
            :key="item.id"
            :class="{'isActive': item.id === activeName}"
            @click="activeName = item.id"
          >{{ item.val }}</span>
    </div>
    <div style="background-color: white;" class="salary-container">
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        activeName: 1,
        active: [
          {id: 1, val: '月度汇总'},
          {id: 2, val: '考勤确认表'},
        ],
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/scss/humanResource/militaryOrganization/salary/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin salaryImg($m,$n) {
    $url: '../../../../assets/image/humanResource/militaryOrganization/salary/' + $n + '/' + $m;
    @include bgImage($url);
  }

  .militaryOrganization {
    .salary {
      .main-nav {
        .isActive {
          @include militaryImg('teji.png', 'theme1');
          color: white;
        }
      }


      .salary-container {

        .content {
          @include salaryImg('gztbeijingtu.png', 'theme1');

          .left {
            @include salaryImg('sywzbgzw.png', 'theme1');
          }

          .right {
            @include salaryImg('syywygzx.png', 'theme1');
          }
        }
      }
    }
  }


</style>
