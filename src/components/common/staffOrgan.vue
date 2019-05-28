<template>
  <div id="staffOrgan">
    <lj-dialog
      :visible="lj_visible"
      :size="'small'"
      @close="handleCloseLjDialog">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>选择人员</h3>
          <div class="items-center borderNone">
            <el-input type="text" clearable size="small" v-model="search" placeholder="请输入需要搜索的人员"></el-input>
            <span class="search" style="margin-left: 10px" @click="handleSearchStaff"></span>
            <!--<ul style="position: absolute;top: 30px;left: 0;right: 28px;">-->
            <!--<li class="items-bet">-->
            <!--<b>发货的是</b>-->
            <!--<span>发的还是卡了</span>-->
            <!--</li>-->
            <!--</ul>-->
          </div>
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
              <ul v-if="departList.length > 0 || staffList.length > 0">
                <li v-for="item in departList" class="items-bet">
                  <p class="line-clamp1">{{item.name}}</p>
                  <p class="lowerLevel" @click="clickDepart(item)">
                    <i class="el-icon-share"></i>下级
                  </p>
                </li>
                <li v-for="item in staffList" class="flex staff"
                    :class="{'checkStaff': checkedStaff.includes(item.id)}">
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
                  <div v-if="staffList.length < 1 && !fullLoading">无相关数据</div>
                </div>
              </div>
            </div>
          </div>
          <div class="justify-bet chooseStaff">
            <div>
              <label>已选&nbsp;：</label>
              <div class="scroll_bar flex">
                <div v-for="(item,index) in chooseStaff" class="lists">
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
    name: "staff-organ",
    components: {ljDialog},
    props: ['module', 'organData'],
    data() {
      return {
        url: globalConfig.humanResource_server,
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
        departList: [],//左侧部门
        staffList: [],//左侧人员
        checkedStaff: [],//左侧选中人员ID
        chooseStaff: [],//右侧 选中人员列表
      }
    },
    mounted() {
      //this.getList();
    },
    activated() {
    },
    watch: {
      module(val) {
        this.lj_visible = val;
      },
      search(val) {
        this.searchStaff('', val);
      },
      organData: {
        handler(val, oldVal) {
          this.configure.num = val ? (val.num ? val.num : '') : '';
        },
        deep: true,
        immediate: true
      },
      lj_visible: {
        handler(val, oldVal) {
          if(val) {
            this.getList();
          }
        }
      }
    },
    computed: {},
    methods: {
      handleSearchStaff() {
        this.searchStaff('',this.search);
      },
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      // 确认
      staffInfo() {
        let names = [], ids = [], str = '';
        for (let item of this.chooseStaff) {
          ids.push(item.id);
          names.push(item.name);
        }
        str = names.join(',');
        this.$emit('close', ids, str, this.chooseStaff);
      },
      // 右侧删除已选
      removeStaff(index) {
        this.checkedStaff.splice(index, 1);
        this.chooseStaff.splice(index, 1);
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
      // 部门
      getList(org = 1) {
        this.departList = [];
        this.staffList = [];
        this.fullLoading = true;
        return new Promise(resolve => {
          this.$http.getOrganization(org).then(res => {
            if (res.code === '20000') {
              this.departList = res.data.data;
            }
            this.searchStaff(org);
          });
          resolve(true)
        })
      },
      // 部门人员
      searchStaff(org, val = '') {
        this.$http.get(this.url + 'staff/user', {
          org_id: org,
          search: val,
        }).then(res => {
          this.fullLoading = false;
          if (res.code === '20000') {
            this.staffList = res.data.data;
          }
        })
      },
      // 选人
      checkStaff(item) {
        let staff = this.checkedStaff;
        if (staff.length === this.configure.num) {
          console.log('最多选择' + this.configure.num + '个');
          return;
        }
        if (staff.length) {
          if (staff.includes(item.id)) {
            let index = staff.indexOf(item.id);
            this.checkedStaff.splice(index, 1);
            this.chooseStaff.splice(index, 1);
          } else {
            this.checkedStaff.push(item.id);
            this.chooseStaff.push(item);
          }
        } else {
          this.checkedStaff.push(item.id);
          this.chooseStaff.push(item);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common/staffOrgan.scss";

  @mixin organImg($m, $n) {
    $url: '../../assets/image/staffOrgan/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffOrgan {
      .dialog_container {
        .dialog_header {
          .search {
            @include bgImage('../../assets/image/common/theme1/search.png');
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #staffOrgan {

    }
  }

  #theme_name.theme3 {
    #staffOrgan {

    }
  }

  #theme_name.theme4 {
    #staffOrgan {

    }
  }
</style>
