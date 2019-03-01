<template>
    <div id="lj_subject" class="lj_subject" v-if="subject_visible" @click.self="subject_visible = false">
      <div>
        <div class="container">
          <div class="close" @click="handleCloseSubject"></div>
          <h3>科目</h3>
          <div class="subject_main">
            <div class="subject_breadcrumb">
              <h5 @click="handleSearchAll">所有科目</h5>
              <div>
                <span v-for="(item,key) in choose_subject" @click="handleLocation(item,key)">
                  <span v-if="choose_subject.length > 1 && key !== 0">/</span>
                  {{ item.title }}
                </span>
              </div>
            </div>
            <div v-if="subject_list.length > 0" class="subject_detail scroll_bar">
              <div v-for="(item,key) in subject_list" class="flex">
                <div>
                  <el-radio
                    v-model="current_choose"
                    :key="item.key"
                    :label="item.id"
                    @change="handleChangeRadio(key)"
                  >{{ item.title }}</el-radio>
                </div>
                <div>
                  <span class="sub_icon"></span>
                  <span @click="handleGetNext(item)">下级</span>
                </div>
              </div>
            </div>
            <div v-else class="txt_center">暂无科目数据</div>
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
              choose_subject: [],
              subject_list: [],
              current_id: 0,
              current_choose: 0,
              current_tier: 1
            }
        },
        mounted() {
          this.getSubjectList('all');
        },
        watch: {},
        computed: {},
        methods: {
          handleLocation(item,key) {
            console.log(item,key);
            this.choose_subject.splice(key + 1);
            console.log(this.choose_subject);
            this.current_id = item.id;
            if (this.current_tier > 1) {
              this.getSubjectList('children');
            } else {
              this.getSubjectList('all');
            }
          },
          handleChangeRadio(key) {
            if (this.current_tier <= 1) {
              this.choose_subject.push(this.subject_list[key]);
            } else {
              this.choose_subject[this.current_tier - 1] = this.subject_list[key];
            }
          },
          handleGetNext(item) {
            this.choose_subject[this.current_tier - 1] = item;
            this.current_tier ++ ;
            this.current_id = item.id;
            this.getSubjectList('children');
          },
          handleSearchAll() {
            this.choose_subject = [];
            this.current_id = 0;
            this.current_choose = 0;
            this.current_tier = 1;
            this.getSubjectList();
          },
          getSubjectList(type = 'all') {
            this.$http.get(globalConfig.temporary_server + `subject/subject_tree`,{id: this.current_id}).then(res => {
              if (res.code === 200) {
                if (type === 'all') {
                  this.subject_list = res.data.data;
                } else if (type === 'children') {
                  this.subject_list = res.data.data.children;
                }
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
