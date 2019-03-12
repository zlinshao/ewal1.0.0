<template>
  <div id="staffFiles">
    <lj-dialog :visible="files_visible" :size="files_size" @close="files_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>员工档案</h3>
        </div>
        <div class="dialog_main staffFiles space-column
">
          <div class="filesTop">
            <div class="items-center">
              <div>
                <h4 class="name">发货德萨克</h4>
                <h4>花费多少</h4>
              </div>
              <p>
                <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
                <b></b>
                <i></i>
              </p>
            </div>
          </div>
          <div class="flex filesMain">
            <div class="mainLeft">
              <p @click="filesInfo('info')" :class="{'hover': filesStatus === 'info'}">基本信息</p>
              <p @click="filesInfo('grow')" :class="{'hover': filesStatus === 'grow'}">成长轨迹</p>
            </div>
            <div class="justify-around mainRight scroll_bar" v-if="filesStatus === 'info'">
              <div v-for="key in 3" class="info">
                <div v-for="item in 27" class="items-center">
                  <label>紧急联系方式</label>
                  <span>南京建邺区白龙江东街22号</span>
                </div>
              </div>
              <b></b>
            </div>
            <div class="items-center mainRight" v-if="filesStatus === 'grow'">
              <div class="grow" :style="{'backgroundPosition': num[index]}" v-for="(item,index) in dates">
                <div :class="[(index%2 === 0) ? 'tops' :  'bottoms']">
                  <p><i></i>{{item}}<i></i></p>
                  <span><i></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from '../../../common/lj-dialog.vue';

  export default {
    name: "staff-files",
    components: {ljDialog},
    props: ['module'],
    data() {
      return {
        files_visible: false,
        files_size: {},
        filesStatus: 'grow',
        dates: ['【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】', '【2018年8月24日 入职】'],
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.files_visible = val;
        this.files_size = {
          width: '1600px',
          height: '800px',
        };
      },
      files_visible(val) {
        if (!val) {
          this.$emit('close', 'close');
        }
      }
    },
    computed: {
      num() {
        let aaa = 100 / (this.dates.length - 1), bbb = ['0 0'], ccc = 0;
        for (let i = 0, l = this.dates.length - 1; i < l; i++) {
          let ddd = '';
          ccc = ccc + aaa;
          ddd = ccc + '% 0';
          bbb.push(ddd);
        }
        return bbb
      }
    },
    methods: {
      filesInfo(val) {
        this.filesStatus = val;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/recruitment/components/staffFiles.scss";

  @mixin filesImg($m, $n) {
    $url: '../../../../assets/image/humanResource/recruitment/components/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #staffFiles {
      .dialog_container {
        .staffFiles {
          .filesTop {
            p {
              b {
                @include filesImg('nan.png', 'theme1');
              }
              i {
                @include filesImg('nv.png', 'theme1');
              }
            }
          }
          .filesMain {
            .mainLeft {
              p {
                @include filesImg('huidikuang.png', 'theme1');
              }
              .hover {
                @include filesImg('hongdikuang.png', 'theme1');
              }
            }
            .mainRight {
              b {
                @include bgImage("../../../../assets/image/common/theme1/xiugai.png");
              }
              .grow {
                background: url("../../../../assets/image/humanResource/recruitment/components/theme1/liuxian.png") no-repeat scroll;
              }
            }
          }
        }
      }
    }
  }

  #theme_name.theme1 {
    #staffFiles {

    }
  }
</style>
