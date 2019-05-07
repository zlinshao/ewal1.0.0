<template>
  <div id="train" class="train ">

    <div class="main-nav">
          <span
            v-for="item in active"
            :key="item.id"
            :class="{'isActive': item.id === activeName}"
            @click="activeName = item.id"
          >{{ item.val }}</span>
    </div>

    <!--课程培训-->
    <course-train v-if="activeName==1"></course-train>

    <!--考试设置-->
    <exam-setting v-if="activeName==2"></exam-setting>

  </div>
</template>

<script>

  import CourseTrain from './courseTrain';//课程培训
  import ExamSetting from './examSetting';//考试设置


  export default {
    name: "train",
    components: {
      CourseTrain,
      ExamSetting,
    },
    data() {
      return {
        url:globalConfig.humanResource_server,
        activeName: 1,
        active: [
          {id: 1, val: '课程培训'},
          {id: 2, val: '考试设置'},
        ],
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {

      // tab切换
      changeTabs(id) {
        this.chooseTab = id;
        this.$store.dispatch('route_animation');
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          console.log(val);
        }
      },
    },
  }
</script>

<style lang="scss">
  #train {
    .library-info {
      .exam-type {
        .train-radio-style {
          .el-radio {
            display: inline-block;
          }
        }
      }
    }
  }
</style>


<style scoped lang="scss">
  @import "../../../assets/scss/leJiaCollege/train/index.scss";

  @mixin militaryImg($m,$n) {
    $url: '../../../assets/image/humanResource/militaryOrganization/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
      #train {
        .main-nav {
          .isActive {
            @include militaryImg('teji.png', 'theme1');
          }
        }
      }
  }


</style>
