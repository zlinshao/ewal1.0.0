<template>
  <div id="personal_center">
    <div class="personal-center-container">
      <div class="container-left">
        <div class="container-left-up">
          <div class="personal-info">
            <div class="personal-info-photo">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg">
            </div>
            <div class="personal-info-name">
              张三
              <div class="personal-info-badge"><span>P2</span></div>
            </div>
            <div v-show="workType==1" class="personal-info-status" @click="triggerEditWorkStatus" :title="workStatus">
              {{workStatus}}
            </div>
            <div v-show="workType==2" class="personal-info-status" :title="workStatus">
              <el-input ref="workStatusRef" size="small" @blur="triggerBlurWorkStatus" v-model="workStatusEditContent" style="width: 160px"></el-input>
            </div>
          </div>
          <div class="personal-group-button">
            <div class="personal-group-button-container">
              <div @click="routerLink('/personalCenter/myFavorite')" class="group-button-item" title="我的收藏">
                <div class="group-button-item-icon icon-collect"></div>
                <div class="group-button-item-content">我的收藏</div>
              </div>
              <div @click="routerLink('/personalCenter/myResponse')" class="group-button-item" title="我的回复">
                <div class="group-button-item-icon icon-message"></div>
                <div class="group-button-item-content">我的回复</div>
              </div>
              <div @click="routerLink('/personalCenter/subLog')" class="group-button-item" title="下属日志">
                <div class="group-button-item-icon icon-log"></div>
                <div class="group-button-item-content">下属日志</div>
              </div>
            </div>

          </div>
          <div class="hr-horizontal"></div>
        </div>
        <div class="container-left-down">
          <ul>

            <li @click="checkedId=item.id" v-for="item of navbarList" :class="{checked:item.id==checkedId}">
              <router-link :to="'/personalCenter/'+item.router">
                <div class="li-item">
                  <i class="li-item-icon" :class="[item.icon]"></i>
                  <span class="li-item-content">
                  {{item.name}}
                </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: "index",
    data() {
      return {
        url: globalConfig.humanResource_server,

        checkedId: 1,
        navbarList: [
          {
            id: 1,
            icon: 'icon-check',
            name: '我的考勤',
            router: 'myAttendance',
          },
          {
            id: 2,
            icon: 'icon-track',
            name: '成长轨迹',
            router: 'growthProcess',
          },
          {
            id: 3,
            icon: 'icon-log-gray',
            name: '工作日志',
            router: 'workLog',
          },
          {
            id: 4,
            icon: 'icon-kpi',
            name: '我的KPI',
            router: 'myKPI',
          },
        ],

        workStatus:'',//工作状态文本
        workStatusEditContent:'',
        workType:1,//1为查看 2为编辑  点击1时为编辑状态 blur后提交接口 变为查看状态
      }
    },
    mounted() {
      //this.$router.push('/personalCenter/myAttendance');
      this.getWorkStatus();
    },
    methods: {
      triggerEditWorkStatus() {
        this.workType = 2;
        this.workStatusEditContent=this.workStatus;
        this.$nextTick(()=> {
          this.$refs['workStatusRef'].focus();
          if(this.workStatus=='请输入工作状态') {
            this.workStatusEditContent = '';
          }
        });
      },

      triggerBlurWorkStatus() {
        this.workType=1;
        if(this.workStatusEditContent==this.workStatus) {return;}
        let params = {
          user_id:289,
          work_status:this.workStatusEditContent,
        };
        this.$http.post(`${this.url}staff/user/saveWorkStatus`,params).then(res=> {
          this.$LjMessageEasy(res,()=> {
            this.workStatus = this.workStatusEditContent;
            if(!this.workStatus) {
              this.workStatus = '请输入工作状态';
            }
          });
        });
      },


      //获取工作状态
      getWorkStatus() {
        let params = {
          user_id:289,
        };
        this.$http.get(`${this.url}staff/user/getWorkStatus`,params).then(res=> {
          if(res.code.endsWith('0')) {
            this.workStatus = res.data.work_status;
            if(!this.workStatus) {
              this.workStatus = '请输入工作状态';
            }
          }
        });
      },
    },
  }
</script>


<style lang="scss">
  #personal_center {
    .personal-info-status {
      input {
        font-size: 16px;
        padding: 0;
      }
    }
  }

</style>

<style scoped lang="scss">
  @import '../../assets/scss/personalCenter/index.scss';

  @mixin personalCenterImg($m, $n) {
    $url: '../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name {
    #personal_center {

    }
  }

  #theme_name.theme1 {
    #personal_center {
      .personal-center-container {
        .container-left {
          .personal-info-badge {
            @include personalCenterImg('fill_1.png', 'theme1');
          }
          .icon-collect {
            @include personalCenterImg('shoucang.png', 'theme1');
          }
          .icon-message {
            @include personalCenterImg('huifu.png', 'theme1');
          }
          .icon-log {
            @include personalCenterImg('rizhi.png', 'theme1');
          }
          .icon-check {
            @include personalCenterImg('kaoqin.png', 'theme1');
          }
          .icon-track {
            @include personalCenterImg('guiji.png', 'theme1');
          }
          .icon-log-gray {
            @include personalCenterImg('gongzuorizhi.png', 'theme1');
          }
          .icon-kpi {
            @include personalCenterImg('kpi.png', 'theme1');
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
