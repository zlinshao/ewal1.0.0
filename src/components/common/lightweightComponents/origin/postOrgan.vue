<template>
  <div id="postOrgan">
    <lj-dialog
      :visible.sync="lj_visible"
      :size="'small'"
      @close="handleCloseLjDialog">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>选择岗位</h3>
          <div class="clear-all" @click="clearAll">清空</div>
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
                  <p class="line-clamp1">{{item.name}}<b>(部门)</b></p>
                  <p class="lowerLevel" @click="clickDepart(item)">
                    <i class="el-icon-share"></i>下级
                  </p>
                </li>
                <li v-for="item in dutyList" class="items-bet">
                  <p class="line-clamp1" @click="getPositionList(item.id)">{{item.name}}<b>(职位)</b></p>
                </li>
                <li v-for="item in positionList" class="flex staff" v-if="positionList.length > 0"
                    :class="{'checkStaff': checkedPosition.includes(item.id)}">
                  <div class="items-center" @click="checkPosition(item)">
                    <h3></h3>
                    <h5>
                      <span class="staffName">
                        {{item.name}}<b>(岗位)</b>
                      </span>
                    </h5>
                  </div>
                </li>
              </ul>
              <div>
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
                <div v-for="(item,index) in choosePosition" class="lists">
                  <h4>
                    <i class="el-icon-remove" @click="removeStaff(index)"></i>
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
  import ljDialog from '../../lj-dialog.vue';

  export default {
    name: "post-organ",
    components: {ljDialog},
    //props: ['module', 'organData'],
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
        url: globalConfig.organ_server,
        hr_url: globalConfig.humanResource_server,
        lj_visible: false,
        fullLoading: false,
        configure: {},
        search: '',
        crumbs: [
          {
            id: this.$storage.get('user_info').company_info?.id || 1,
            name: this.$storage.get('user_info').company_info?.name || '乐伽商业管理有限公司',
          },
        ],
        departList: [],
        dutyList: [],//职位列表
        positionList: [],//岗位列表
        checkedPosition: [],//左侧选中人员ID
        choosePosition: [],//选中人员列表

        paramsDuty: {
          search: '',
          org_id: '',
          page: 1,
          limit: 999,
        },
        paramsPosition: {
          search: '',
          duty_id: '',
          page: 1,
          limit: 999,
        }
      }
    },
    mounted() {
      //this.getList();
    },
    activated() {
    },
    watch: {
      initial: {
        handler(val, oldVal) {
          if (val && !oldVal) {
            let params = {
              limit: 1000,
              id: val,
            };
            this.$http.get(`${this.hr_url}organization/position`, params).then(res => {
              if (res.code.endsWith('0')) {
                let result = res.data.data;
                _.forEach(this.initial, (o) => {
                  let curUser = _.find(result, {id: o});
                  if (curUser) {
                    this.choosePosition.push(curUser);
                  }
                });
                this.choosePosition = _.uniqBy(this.choosePosition, 'id');
              }
            });
          }
          if(val&&val.length===0) {
            this.choosePosition = [];
            this.checkedPosition = [];
          }
        },
        immediate: true,
      },

      choosePosition: {
        handler(val, oldVal) {
          if (val && val.length > 0) {
            this.checkedPosition = _.map(val, 'id');
          }
        },
      },

      module(val) {
        this.lj_visible = val;
      },
      organData: {
        handler(val, oldVal) {
          this.configure.num = val ? (val.num ? val.num : '') : '';
        },
        deep: true,
        immediate:true,
      },
      lj_visible: {
        handler(val, oldVal) {
          if(val) {
            this.crumbs= [
              {
                id: this.$storage.get('user_info').company_info?.id || 1,
                name: this.$storage.get('user_info').company_info?.name || '乐伽商业管理有限公司',
              },
            ];
            this.getList();
          }
        }
      },
    },
    computed: {},
    methods: {

      //清空
      clearAll() {
        this.choosePosition = [];
        this.checkedPosition = [];
      },

      // 部门
      getList(org = this.$storage.get('user_info').company_info?.company_id) {
        this.departList = [];
        this.dutyList = [];
        this.positionList = [];
        this.fullLoading = true;
        return new Promise(resolve => {
          this.$http.getOrganization(org).then(res => {
            if (res.code === '20000') {
              this.departList = res.data.data;
            }
            resolve(true);
            // 职位
            this.paramsDuty.org_id = org;
            this.$http.getDuty(this.paramsDuty).then(res => {
              this.fullLoading = false;
              if (res.code === '20000') {
                this.dutyList = res.data.data;
              }
            });
          });
        })
      },
      // 岗位
      getPositionList(id) {
        this.positionList = [];
        this.fullLoading = true;
        this.paramsPosition.duty_id = id;
        this.$http.getPosition(this.paramsPosition).then(res => {
          this.fullLoading = false;
          if (res.code === '20000') {
            this.positionList = res.data.data;
          }
        });
      },
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      // 确认
      staffInfo() {
        let names = [], ids = [], str = '';
        for (let item of this.choosePosition) {
          ids.push(item.id);
          names.push(item.name);
        }
        str = names.join(',');
        this.$emit('close', ids, str, this.choosePosition);
      },
      // 右侧删除已选
      removeStaff(index) {
        this.checkedPosition.splice(index, 1);
        this.choosePosition.splice(index, 1);
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
      // 选岗位
      checkPosition(item) {
        let position = this.checkedPosition;
        if (position.length === this.configure.num) {
          console.log('最多选择' + this.configure.num + '个');
          return;
        }
        if (position.length) {
          if (position.includes(item.id)) {
            let index = position.indexOf(item.id);
            this.checkedPosition.splice(index, 1);
            this.choosePosition.splice(index, 1);
          } else {
            this.checkedPosition.push(item.id);
            this.choosePosition.push(item);
          }
        } else {
          this.checkedPosition.push(item.id);
          this.choosePosition.push(item);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/common/postOrgan.scss";

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
