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
            <el-autocomplete
              :fetch-suggestions="queryUser"
              @select="handleSelect"
              type="text" clearable @keydown.enter="handleSearchStaff" size="small" v-model="search"
              placeholder="请输入需要搜索的人员"></el-autocomplete>
            <!--<span class="search" style="margin-left: 10px" @click="handleSearchStaff"></span>-->
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
                        src="../../../../assets/image/no_avatar.png"
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
              <div class="user-toolbar"><label>已选&nbsp;：</label><label @click="clearAll" class="clear-all">清空</label></div>

              <div class="scroll_bar flex">
                <div v-for="(item,index) in chooseStaff" class="lists">
                  <h4>
                    <i class="el-icon-remove" @click="removeStaff(index,item)"></i>
                    <img :src="item.avatar" v-if="item.avatar">
                    <img
                      src="../../../../assets/image/no_avatar.png"
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
  import _ from 'lodash';
  import ljDialog from '../../lj-dialog.vue';

  export default {
    name: "staff-organ",
    components: {ljDialog},
    props: {
      module: {},
      organData: {},
      initial: {
        default() {
          return [];
        }
      },
    },
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
        userInfoList: [],//远程搜索人员数组
        restaurants: [],
      }
    },
    mounted() {
      this.getList();
    },
    activated() {
    },
    watch: {
      lj_visible: {
        handler(val, oldVal) {
          if (!val) {
            this.$emit('close', 'close');
          }else {
            if(!this.initial || (this.initial&&this.initial.length==0)) {
              this.checkList = [];
            }
          }
        }
      },
      initial: {
        handler(val, oldVal) {
          if (val && !oldVal) {
            let params = {
              limit: 1000,
              user_id: val,
              staff: 1,
            };
            this.$http.get(`${this.url}staff/user`, params).then(res => {
              if (res.code.endsWith('0')) {
                let result = res.data.data;
                _.forEach(this.initial, (o) => {
                  let curUser = _.find(result, {id: o});
                  if (curUser) {
                    this.chooseStaff.push(curUser);
                  }
                });
                this.chooseStaff = _.uniqBy(this.chooseStaff, 'id');
              }
            });
          }

          if(val&&val.length===0) {
            this.checkedStaff = [];//左侧选中人员ID
            this.chooseStaff = [];//右侧 选中人员列表
          }
        },
        immediate: true,
      },

      module(val) {
        this.lj_visible = val;
      },
      search(val) {
        //this.searchStaff('', val);
      },
      organData: {
        handler(val, oldVal) {
          this.configure.num = val ? (val.num ? val.num : '') : '';
        },
        deep: true,
        immediate: true
      },
      chooseStaff: {
        handler(val, oldVal) {
          if (val && val.length > 0) {
            this.checkedStaff = _.map(val, 'id');
          }
        },
        immediate: true,
      },
    },
    computed: {},
    methods: {
      //清空
      clearAll() {
        this.checkedStaff = [];
        this.chooseStaff = [];
      },



      handleSearchStaff() {
        this.searchStaff('', this.search);
      },
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },

      // 右侧删除已选
      removeStaff(index, item) {
        /*this.checkedStaff.splice(index, 1);
        this.chooseStaff.splice(index, 1);*/
        //debugger
        this.checkedStaff = _.remove(this.checkedStaff, (o) => {
          return o != item.id
        });
        this.chooseStaff = _.remove(this.chooseStaff, (o) => {
          return o.id !== item.id;
        });
        /*this.checkedStaff = _.pull(this.checkedStaff,item.id);
        this.chooseStaff = _.pullAllBy(this.chooseStaff,{id:item.id},'id');*/
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

      async searchStaffReturn(org, val = '') {
       return await this.$http.get(this.url + 'staff/user', {
          org_id: org,
          search: val,
        });
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

      //远程搜索用户信息
      async queryUser(queryString, callback) {
        let returnData = await this.searchStaffReturn('',queryString);
        let results = [];
        if(returnData.code.endsWith('0')) {
          results = returnData.data.data;
        }

        results.forEach((item,index)=> {
          let positionName = '';
          if(item.position&&item.position.constructor===Array&&item.position.length==1) {
            positionName = item.position[0].name;
          }
          item.value = `${item.name}(${positionName||'暂无职位信息'})`;
        });
        callback(results);
      },
      handleSelect(item) {
        this.checkStaff(item);
      }


    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/common/staffOrgan.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/staffOrgan/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #staffOrgan {
      .dialog_container {
        .dialog_header {
          .search {
            @include bgImage('../../../../assets/image/common/theme1/search.png');
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
