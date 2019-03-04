<template>
  <div id="staffOrgan">
    <lj-dialog
      :visible="lj_visible"
      :size="lj_size"
      @close="handleCloseLjDialog">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <span>选择人员</span>
          <span class="search"></span>
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
              <ul v-if="departList.length > 0">
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
                      <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
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
                    <img src="https://www.wsm.cn/uploads/allimg/161212/37-161212102446.jpg">
                  </h4>
                  <p>{{item.name}}</p>
                </div>
              </div>
            </div>
            <footer class="justify-center">
              <div class="danger" @click="staffInfo">确认</div>
              <div class="default" @click="handleCloseLjDialog">取消</div>
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
    props: ['module'],
    data() {
      return {
        url: globalConfig.organ_server,
        fullLoading: false,
        crumbs: [
          {
            id: 1,
            name: '乐伽商业管理有限公司',
          },
        ],
        departList: [],//左侧部门
        staffList: [],//当前部门人员
        checkedStaff: [],//左侧选中人员ID
        chooseStaff: [],//选中人员列表
        lj_visible: false,
        lj_size: 'small',
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
      }
    },
    computed: {},
    methods: {
      handleCloseLjDialog() {
        this.$emit('close', 'close');
      },
      // 确认
      staffInfo() {
        this.$emit('close', this.chooseStaff);
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
      // 更新数据
      getList(val = 1) {
        this.departList = [];
        this.staffList = [];
        this.fullLoading = true;
        return new Promise((resolve, reject) => {
          this.$http.get(this.url + 'organization/organization', {
            parent_id: val
          }).then(res => {
            this.fullLoading = false;
            resolve(true);
            if (res.code === '20000') {
              this.departList = res.data.data;
              this.$http.get(this.url + 'staff/user', {
                org_id: val
              }).then(res => {
                if (res.code === '20000') {
                  this.staffList = res.data.data;
                }
              })
            }
          })
        });
      },
      // 选人
      checkStaff(item) {
        let staff = this.checkedStaff;
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
            width: 30px;
            height: 30px;
            cursor: pointer;
            @include bgImage('../../assets/image/common/theme1/search.png');
          }
        }
        .dialog_main {
          margin: 10px;
          overflow: hidden;
          .colorChoose {
            cursor: pointer;
            color: $colorE33;
          }
          h4 {
            width: 50px;
            height: 50px;
            img {
              @include radius(50%);
            }
          }
          > div {
            width: 100%;
            @include radius(6px);
            background-color: $colorFFF;
            text-align: left;
          }
          /*左侧*/
          .depart {
            flex-direction: column;
            padding-bottom: 10px;
            .crumbs {
              padding: 20px 30px 30px;
            }
            .organList {
              height: 100%;
              padding: 0 30px;
              ul {
                li {
                  padding: 15px 0;
                  &:hover {
                    color: $colorE33;
                  }
                  p {
                    cursor: pointer;
                  }
                  .lowerLevel {
                    text-align: right;
                    padding-right: 10px;
                    min-width: 100px;
                  }
                  h4 {
                    margin: 0 10px;
                  }
                  h5 {
                    .staffName {
                      display: block;
                    }
                    font-size: 16px;
                    text-align: left;
                    span + span {
                      font-size: 14px;
                      margin-top: 5px;
                      color: #C3C3C7;
                    }
                  }
                }
                .staff {
                  &:hover {
                    color: $colorE33;
                    h5 {
                      span + span {
                        color: $colorE33;
                      }
                    }
                  }
                  h3 {
                    width: 20px;
                    height: 20px;
                    @include radius(50%);
                    border: 1px solid $colorFDF;
                  }
                  padding: 10px 0;
                  div {
                    cursor: pointer;
                  }
                }
                .checkStaff {
                  color: $colorE33;
                  h5 {
                    span + span {
                      color: $colorE33;
                    }
                  }
                  h3 {
                    background-color: $colorE33;
                    border: 1px solid $colorE33;
                  }
                }
              }
            }
          }
          /*右侧*/
          .chooseStaff {
            flex-direction: column;
            margin-left: 20px;
            padding: 20px 30px 0;
            > div {
              > label {
                padding-bottom: 20px;
                display: block;
              }
              height: 80%;
              > div {
                max-height: 100%;
                flex-wrap: wrap;
                .lists {
                  text-align: center;
                  width: 20%;
                  margin-top: 20px;
                  h4 {
                    position: relative;
                    margin: 0 auto;
                    i {
                      font-size: 18px;
                      color: $colorE33;
                      position: absolute;
                      top: -6px;
                      right: 0;
                      cursor: pointer;
                    }
                  }
                  p {
                    margin-top: 6px;
                  }
                }
              }
            }
            footer {
              div {
                width: 110px;
                height: 40px;
                line-height: 40px;
                cursor: pointer;
                text-align: center;
                @include radius(6px);
                &:hover {
                  opacity: .8;
                }
              }
              .danger {
                margin-right: 20px;
                color: $colorFFF;
                background-color: $colorE33;
              }
              .default {
                background-color: $colorFDF;
              }
            }
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
