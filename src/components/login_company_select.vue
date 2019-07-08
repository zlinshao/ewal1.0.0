<template>
  <div id="login_company_select">
    <div>
      <div class="marble"></div>
      <div class="tower"></div>
      <div class="black"></div>
      <ul>
        <li v-for="(company,index) in companyInfo" :key="index" @click="companyClick(company)">
          <div class="img" :class="'common'+[index]"></div>
          <div class="txt">{{company.companyName}} </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      companyInfo: [
        {
          companyName: "天津励诚管理有限公司",
          url: globalConfig.url1
        },
        {
          companyName: "佛山励天管理有限公司",
          url: globalConfig.url2
        },
        {
          companyName: "南京乐伽商业管理有限公司",
          url: globalConfig.url3
        }
      ]
    };
  },
  methods: {
    companyClick(company) {
      window.open(`${company.url}index?companyName=${company.companyName}`, '_blank');
    }
    // showFun(index) {
    //   this.$set(this.companyInfo[index], "textShow", true);
    // },
    // hideFun(index) {
    //   this.$set(this.companyInfo[index], "textShow", false);
    // }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/loginCompanySelect/index.scss";

@mixin loginImg($m, $n) {
  $url: "../assets/image/loginCompanySelect/" + $n + "/" + $m;
  @include bgImage($url);
}

// @mixin formIcon($n) {
//   @each $animal in yonghu, mima, yanzhengma {
//     .#{$animal} {
//       i {
//         @include loginImg("#{$animal}.png", $n);
//       }
//     }
//   }
// }
#theme_name.theme1 {
  #login_company_select {
    > div {
      @include loginImg("bitmap_copy2.png", "theme1");
      .marble {
        @include loginImg("bitmap_copy.png", "theme1");
      }
      .tower {
        @include loginImg("fenzu.png", "theme1");
      }
      ul {
        li {
          .common0 {
            @include loginImg("lchs.png", "theme1");
          }
          .common1 {
            @include loginImg("lqhsd.png", "theme1");
          }
          .common2 {
            @include loginImg("ljhsd.png", "theme1");
          }
          &:hover {
            top:-70px;
            .common0 {
              @include loginImg("lchhs.png", "theme1");
            }
            .common1 {
              @include loginImg("lqhhs.png", "theme1");
            }
            .common2 {
              @include loginImg("ljhhsd.png", "theme1");
            }
            .txt{
                opacity: 1;
                top:157px;
            }
          }
        }
      }
    }
  }
}
</style>

