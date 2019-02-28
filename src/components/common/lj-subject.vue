<template>
    <div id="lj_subject" class="lj_subject" v-if="subject_visible" @click.self="subject_visible = false">
      <div>
        <div class="container">
          <div class="close" @click="handleCloseSubject"></div>
          <h3>科目</h3>
          <div class="subject_main">
            <div class="subject_breadcrumb">
              <h5>所有科目</h5>
              <div>
                <span v-for="item in choose_subject">{{ item.val }}
                  <span>/</span>
                </span>
              </div>
            </div>
            <div class="subject_detail scroll_bar">
              <div v-for="item in subject_list" class="flex">
                <div>
                  <el-radio
                    v-model="current_choose"
                    :key="item.key"
                    :label="item.title"
                  ></el-radio>
                </div>
                <div>
                  <span class="sub_icon"></span>
                  <span>下级</span>
                </div>
              </div>
            </div>
          </div>
          <div class="subject_footer">
            <el-button size="small" type="danger">确定</el-button>
            <el-button size="small" @click="subject_visible = false">取消</el-button>
          </div>
          <div class="bg"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
              subject_visible: true,
              choose_subject: [
                {
                  id: 1,
                  val: '员工代缴'
                },
                {
                  id: 2,
                  val: '收房'
                },
                {
                  id: 3,
                  val: '租金'
                }
              ],
              subject_list: [],
              current_id: 0,
              current_choose: 0,
            }
        },
        mounted() {
          this.getSubjectList();
        },
        watch: {},
        computed: {},
        methods: {
          getSubjectList() {
            this.$http.get(globalConfig.temporary_server + `subject/subject_tree`,{
              params: {id: this.current_id}
            }).then(res => {
              console.log(res.data.data);
              if (res.code === 200) {
                this.subject_list = res.data.data;
              } else {
                this.subject_list = [];
              }
            }).catch(err => {
              console.log(err);
            })
          },
          handleCloseSubject() {
            this.subject_visible = false;
            this.$emit('close');
          }
        },
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/components/lj_subject.scss";

  @mixin subjectImg($m,$n) {
    $url: '../../assets/image/components/' + $n + '/' + $m;
    @include bgImage($url);
  };

  #theme_name {
    .lj_subject {
      > div {
        .container {
          .bg {
            @include subjectImg('shu.png','theme1');
          }
          .close {
            @include subjectImg('close.png','theme1');
          }
          .subject_main {
            .subject_detail {
              .sub_icon {
                @include subjectImg('fenzu.png','theme1');
                background-size: 55%;
              }
            }
          }
        }
      }
    }
  }
</style>
