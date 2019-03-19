<template>
  <div id="postOrgan">
    <lj-dialog
      :visible="lj_visible"
      :size="'small'"
      @close="handleCloseLjDialog">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>选择职位</h3>
        </div>
        <div class="justify-bet dialog_main">
          <div class="flex depart">
            <div class="crumbs">
              <span v-for="(item,index) in crumbs" @click="crumbsList(item.id)"
                    :class="{'colorChoose': index !== crumbs.length - 1}">
                {{item.name}}<b v-if="index !== crumbs.length - 1">&nbsp;/&nbsp;</b>
              </span>
            </div>
            <div class="scroll_bar organList">
              <ul v-if="departList.length > 0 || dutyList.length > 0">
                <li v-for="item in departList" class="items-bet">
                  <p class="line-clamp1">{{item.name}}</p>
                  <p class="lowerLevel" @click="clickDepart(item)">
                    <i class="el-icon-share"></i>下级
                  </p>
                </li>
                <li v-for="item in dutyList" class="flex staff"
                    :class="{'checkStaff': checkedDuty.includes(item.id)}">
                  <div class="items-center" @click="checkStaff(item)">
                    <h3></h3>
                    <h4>
                      <img :src="item.avatar" v-if="item.avatar">
                      <img
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg"
                        v-else>
                    </h4>
                    <h5>
                      <span class="staffName">{{item.name}}</span>
                      <span v-for="key in item.org">
                        {{key.name}}&nbsp;
                      </span>
                    </h5>
                  </div>
                </li>
              </ul>
              <div v-else>
                <div
                  class="flex-center"
                  v-loading="fullLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0)">
                  <div v-if="dutyList.length < 1 && !fullLoading">无相关数据</div>
                </div>
              </div>
            </div>
          </div>
          <div class="justify-bet chooseStaff">
            <div>
              <label>已选&nbsp;：</label>
              <div class="scroll_bar flex">
                <div v-for="(item,index) in chooseDuty" class="lists">
                  <h4>
                    <i class="el-icon-remove" @click="removeStaff(index)"></i>
                    <img :src="item.avatar" v-if="item.avatar">
                    <img
                      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552912676050&di=fd46be51272d18ea8ffc89e2956a8d4c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F8d64400852949b685670d52be88910a57e2e1542.jpg"
                      v-else>
                  </h4>
                  <p>{{item.name}}</p>
                </div>
              </div>
            </div>
            <footer class="dialog_footer">
              <el-button type="danger" size="small" @click="staffInfo">确定</el-button>
              <el-button type="info" size="small" @click="handleCloseLjDialog">取消</el-button>
            </footer>
          </div>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import ljDialog from './lj-dialog.vue';

  export default {
    name: "post-organ",
    components: {ljDialog},
    props: ['module', 'organData'],
    data() {
      return {
        url: globalConfig.organ_server,
        lj_visible: false,
        fullLoading: false,
        configure: {
          num: '',
        },
        search: '',
        crumbs: [
          {
            id: 1,
            name: '乐伽商业管理有限公司',
          },
        ],
        departList: [],
        dutyList: [],//当前部门人员
        checkedDuty: [],//左侧选中人员ID
        chooseDuty: [],//选中人员列表
        params: {
          search: '',
          org_id: '',
          page: 1,
          limit: 999,
        }
      }
    },
    mounted() {
      this.getList();
    },
    activated() {
    },
    watch: {
      module(val) {
        this.lj_visible = val;
      },
      organData: {
        handler(val, oldVal) {

        },
        deep: true
      }
    },
    computed: {},
    methods: {
      // 部门
      getList(org = 1) {
        this.departList = [];
        this.fullLoading = true;
        return new Promise(resolve => {
          this.$http.getOrganization(org).then(res => {
            this.fullLoading = false;
            if (res.code === '20000') {
              this.departList = res.data.data;
            }
            this.params.org_id = org;
            this.$http.getDuty(this.params).then(res => {

            });
          });
          resolve(true);
        })
      },
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      // 确认
      staffInfo() {
        let names = [], ids = [], str = '';
        for (let item of this.chooseDuty) {
          ids.push(item.id);
          names.push(item.name);
        }
        str = names.join(',');
        this.$emit('close', ids, str, this.chooseDuty);
      },
      // 右侧删除已选
      removeStaff(index) {
        this.checkedDuty.splice(index, 1);
        this.chooseDuty.splice(index, 1);
      },
      // 下级事件
      clickDepart(val) {
        this.getList(val.id).then(_ => {
          this.crumbs.push(val);
        });
      },
      // 面包屑
      crumbsList(val) {
        let crumbs = this.crumbs;
        crumbs.forEach((res, index) => {
          if (res.id === val) {
            if (crumbs[crumbs.length - 1].id !== val) {
              this.getList(val).then(_ => {
                crumbs.splice(index + 1, crumbs.length - 1);
              });
            }
          }
        });
      },
      // 选人
      checkStaff(item) {
        let staff = this.checkedDuty;
        if (staff.length === this.configure.num) {
          console.log('最多选择' + this.configure.num + '个');
          return;
        }
        if (staff.length) {
          if (staff.includes(item.id)) {
            let index = staff.indexOf(item.id);
            this.checkedDuty.splice(index, 1);
            this.chooseDuty.splice(index, 1);
          } else {
            this.checkedDuty.push(item.id);
            this.chooseDuty.push(item);
          }
        } else {
          this.checkedDuty.push(item.id);
          this.chooseDuty.push(item);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common/postOrgan.scss";

  #theme_name.theme1 {
    #postOrgan {

    }
  }

  #theme_name.theme2 {
    #postOrgan {

    }
  }

  #theme_name.theme3 {
    #postOrgan {

    }
  }

  #theme_name.theme4 {
    #postOrgan {

    }
  }
</style>
