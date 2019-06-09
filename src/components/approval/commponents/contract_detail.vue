<template>
  <div id='contract_detail_approval'>
    <LjDialog :visible="visible" :size="{width: 1300 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div
        v-if="vLoading"
        style="width: 90%;height: 100%;"
        v-loading="vLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)">
      </div>
      <div class='dialog_container' v-if='visible && formatData && !vLoading'>
        <div class='dialog_header'>
          <h3>{{allDetail.house_address}}</h3>
          <!--<p>查看审核记录</p>-->
        </div>

        <div class="dialog_main">
          <ul class="slither">
            <li></li>
            <li v-for="item in Object.keys(bulletinSlither)">
              <div>
                <h1>{{bulletinSlither[item]}}</h1><span>{{allDetail[item]}}</span>
              </div>
            </li>
          </ul>
          <ul v-for="(item,index) in Object.keys(drawSlither)" v-if="item !== 'slither'" class="slither">
            <li class="title">
              <p></p>
              <span class="writingMode">{{titleTips[index]}}</span>
            </li>
            <li v-for="key in Object.keys(drawSlither[item])" v-if="formatData[key]">
              <div>
                <h1>{{drawSlither[item][key]}}</h1>
                <div v-if="Array.isArray(formatData[key])">
                  <div v-for="(val,idx) in formatData[key]" class="upload">
                      <span v-if="val.uri">
                        <!--图片-->
                        <!--@click="$bigPhoto(formatData[key],val.uri)"-->
                        <img :src="val.uri" :alt="val.uri" v-if="val.info.ext.includes('image')">
                        <!--视频-->
                        <!--@click="videoPlay($event)" 播放事件-->
                        <img src="../../../assets/image/file/video.png"
                             v-else-if="val.info.ext.includes('video')" :alt="val.uri">
                        <!--其它类型-->
                        <img src="../../../assets/image/file/xls.png" :alt="val.uri"
                             v-else-if="val.info.ext.includes('xls')">
                        <img src="../../../assets/image/file/doc.png" :alt="val.uri"
                             v-else-if="val.info.ext.includes('doc')">
                        <img src="../../../assets/image/file/txt.png" :alt="val.uri"
                             v-else-if="val.info.ext.includes('text')">
                        <img src="../../../assets/image/file/pdf.png" :alt="val.uri"
                             v-else-if="val.info.ext.includes('pdf')">
                        <img src="../../../assets/image/file/file.png" :alt="val.uri" v-else>
                      </span>
                    <div v-else-if="val.period">
                      <h4 :class="[idx !== 0?'h4':'']">
                        {{val.begin_date}}至{{val.end_date}}<br>
                        {{val.pay_way}}：{{val.month_unit_price}}元
                      </h4>
                    </div>
                    <div v-else-if="changeFormData[key]" class="keyName">
                      <h3 :class="[idx !== 0?'h3':'']" v-if="formatData[key].length > 1">
                        {{changeFormData[key]['keyName']}}{{(myUtils.DX(idx+1))}}
                      </h3>
                      <h2 v-for="name of Object.keys(changeFormData[key])" v-if="name !== 'keyName' && val[name]">
                        {{changeFormData[key][name]}}：{{val[name]}}
                      </h2>
                    </div>
                    <div v-else-if="val.money_sep">
                      <h4 :class="[idx !== 0?'h4':'']">
                        {{val.remittance_account + ':' + val.money_sep + '元'}}
                      </h4>
                    </div>
                    <div :class="key" v-else>{{val}}</div>
                  </div>
                </div>
                <span :class="key" v-else>{{formatData[key]}}</span>
              </div>
            </li>
          </ul>
          <ul class="related"
              v-if="bulletin_type === 'bulletin_collect_basic' || bulletin_type === 'bulletin_rent_basic'">
            <li class="title">
              <p></p>
              <span class="writingMode">相关信息</span>
            </li>
            <li>
              <div>
                <div>同类型房源市场价2500-3000元</div>
                <div>该小区已有房源1000套,未出租500套</div>
              </div>
            </li>
            <li>
              <div>
                <div>链家推荐：</div>
                <div v-if="Object.keys(relatedInfoL).length">
                  <div v-for="item of Object.keys(relatedInfoL)">{{relatedInfoL[item]}}</div>
                </div>
                <div v-else>暂无推荐</div>
              </div>
            </li>
            <li>
              <div>
                <div>系统推荐：</div>
                <div v-if="Object.keys(relatedInfo).length">
                  <div v-for="item of Object.keys(relatedInfo)">{{relatedInfo[item]}}</div>
                </div>
                <div v-else>暂无推荐</div>
              </div>
            </li>
          </ul>
          <div class='float-btn'>
            <div @click.stop='comment_show_visible = !comment_show_visible'>
              <h1></h1>
              <p>评论信息</p>
            </div>
          </div>
        </div>
        <!-- 我审批的 暂不处理  已通过或者已拒绝 无操作 -->
        <div class="dialog_footer">
          <el-button
            v-if="status_type == 2 || status_type == 4"
            :key="btn.action"
            size="mini"
            type="danger"
            :loading="fullLoading"
            @click="confirmApproval(btn,operates.variableName)"
            v-for="btn in operates.outcomeOptions">
            {{btn.title}}
          </el-button>
          <el-button
            v-if="status_type == 2"
            size="mini"
            type="danger"
            :loading="fullLoading"
            @click="confirmApproval({action:true},'suspend')">
            暂不处理
          </el-button>
          <el-button size="mini" type="info" @click="handleClose()">取消</el-button>
        </div>
      </div>
      <!-- 评论 -->
      <div v-if="comment_show_visible" class="comments">
        <div class="historyComments">
          <div v-for="item in comment_list">
            <div class="commentTop">
              <p>{{item.author_name}}-{{item.department}}</p>
              <span>{{item.time}}</span>
            </div>
            <div class="commentText">
              <div>{{item.content.message}}</div>
              <h1>
                <img v-for="pic in item.content.attachmentBody" :src="pic.uri" alt="">
              </h1>
            </div>
          </div>
        </div>
        <div class="inputText">
          <h1></h1>
          <div class="textarea">
            <el-input
              type="textarea"
              :row="6"
              placeholder="请输入内容"
              v-model="comment_info.message">
            </el-input>
          </div>
          <lj-upload ref="closeComment" size="50" v-model="comment_info.attachments"></lj-upload>
          <p>
            <el-button size="mini" type="info" @click="closeComment">清空</el-button>
            <el-button size="mini" type="danger" @click="postComment">发送</el-button>
          </p>
        </div>
      </div>
    </LjDialog>

    <!--<FormDetail :visible='show_form_visible' :moduleData='formatData'/>-->
  </div>
</template>

<script>
  import LjDialog from '../../common/lj-dialog.vue';
  import VillageContainer from './village-container.vue';
  import FormDetail from './form_detail.vue'

  export default {
    props: ['visible', 'moduleData', 'status_type'],
    components: {
      LjDialog,
      VillageContainer,
      FormDetail
    },
    data() {
      return {
        approval_sever: globalConfig.approval_sever,
        market_server: globalConfig.market_server,
        hr_server: globalConfig.humanResource_server,
        vLoading: true,
        fullLoading: false,
        bulletinSlither: {
          name: '状态',
          bulletin_name: '报备类型',
          assignee_name: '处理人',
        },
        drawSlither: {},//自定义报备数据
        titleTips: [],//详情标题
        formatData: {},//获取详情数据
        bulletin_type: '',//报备类型
        allBulletin: {},//报备原数据
        changeFormData: {},//附属房东变化
        relatedInfo: {},
        relatedInfoL: {},//链家推荐
        operates: {},
        allDetail: {},
        comment_show_visible: false,//评论模态框
        // 评论内容
        comment_info: {
          message: '',
          attachments: []
        },
        comment_list: [],//评论记录

        approval_list: [], //审核记录
      }
    },
    watch: {
      comment_show_visible(val) {
        if (val) {
          this.changeBtn_type();
        }
      },
      moduleData: {
        handler(val) {
          console.log(val);
          if (val) {
            this.vLoading = true;
            this.fullLoading = false;
            this.allDetail = val;
            this.bulletin_type = val.bulletin_type;
            this.getOperates(val);
            this.getStaffInfo([val.assignee]).then(res => {
              this.allDetail.assignee_name = res[0].name;
            });
            this.handleData(val, val.bulletin_type);
            this.getDetailForm(val.bm_detail_request_url);
          }
        },
        deeper: true
      }
    },
    methods: {
      // 按钮配置
      getOperates(detail) {
        if (!detail.outcome) return;
        this.operates = JSON.parse(detail.outcome || '{}');
      },
      // 获取员工信息
      getStaffInfo(id) {
        return new Promise((resolve, reject) => {
          let params = {
            limit: 1000,
            user_id: id,
            staff: 1,
          };
          this.$http.get(`${this.hr_server}staff/user`, params).then(res => {
            if (res.code.endsWith('0')) {
              resolve(res.data.data);
            } else {
              let data = [{name: '******'}];
              resolve(data)
            }
          })
        })
      },
      // 报备类型
      divisionBulletinType(type, val) {
        let data, title;
        switch (type) {
          case 'bulletin_collect_basic':
            title = ['房屋信息', '物品信息', '客户信息', '合同信息'];
            data = this.jsonData(defineCollectReport);
            this.villageRelation(val, val.ctl_detail_request_url);
            break;
          case 'bulletin_rent_basic':
            title = ['客户信息', '合同信息'];
            data = this.jsonData(defineRentReport);
            data.slither0 = defineNewRentReport.concat(data.slither0);
            this.villageRelation(val, val.rtl_detail_request_url);
            break;
          case 'bulletin_agency':
            title = ['渠道费报备'];
            data = this.jsonData(defineAgencyReport);
            break;
          case 'bulletin_retainage':
            title = ['尾款报备'];
            data = this.jsonData(defineRetainageReport);
            break;
          case 'bulletin_change'://调租
            title = ['客户信息', '合同信息'];
            data = this.jsonData(defineChangeReport);
            break;
          case 'bulletin_rent_trans'://转租
            title = ['客户信息', '合同信息'];
            data = this.jsonData(defineRentReport);
            data.slither0 = defineSubletReport.concat(data.slither0);
            break;
          case 'bulletin_special'://特殊事项
            title = ['特殊事项报备'];
            data = this.jsonData(defineSpecialReport);
            break;
          case 'bulletin_checkout'://退租
            title = ['客厅', '厨房/阳台/卫生间', '主卧', '次卧', '费用交接'];
            data = this.jsonData(defineCheckoutReport);
            break;
          case 'supplement_lord_time': //延长收房时长
          case 'supplement_lord_change_bank': //房东跟还银行卡
          case 'supplement_lord_change_price': //调整收房价格
          case 'supplement_renter_time': //租客延长租期
            data = {};
            title = ['补充协议'];
            switch (type) {
              case 'supplement_lord_time':
                data.slither0 = this.jsonData(defineSupplyAgreement[1]);
                break;
              case 'supplement_lord_change_bank':
                data.slither0 = this.jsonData(defineSupplyAgreement[2]);
                break;
              case 'supplement_lord_change_price':
                data.slither0 = this.jsonData(defineSupplyAgreement[3]);
                break;
              case 'supplement_renter_time':
                data.slither0 = this.jsonData(defineSupplyAgreement[4]);
                break;
            }
            break;
        }
        return {data, title}
      },
      villageRelation(val, url) {
        this.relatedInfo = {};
        this.$http.get(url).then(res => {
          let data = res.data.content;
          let params = {
            hall: data.house_info && data.house_info.hall || 0,
            area: data.house_info && data.house_info.area || 0,
            city: data.house_info && data.house_info.city_name || '',
            village: data.community_info && data.community_info.village_name || '',
          };
          this.$http.post('http://47.101.210.105:8084/get_price_section', params).then(result => {
            if (!result.lejia_error) {
              let obj = {};
              for (let house of Object.keys(result.lejia)) {
                for (let area of Object.keys(result.lejia[house])) {
                  for (let price of Object.keys(result.lejia[house][area])) {
                    let money = result.lejia[house][area][price], p;
                    if (money.min_price == money.max_price) {
                      p = money.min_price + '元';
                    } else {
                      p = money.min_price + '-' + money.max_price + '元';
                    }
                    obj[price] = area + house + '平米' + price + '均价' + p;
                  }
                }
              }
              this.relatedInfo = Object.assign({}, obj)
            }
            if (!result.lianjia_error) {
              let obj = {};
              for (let house of Object.keys(result.lianjia)) {
                for (let area of Object.keys(result.lianjia[house])) {
                  for (let price of Object.keys(result.lianjia[house][area])) {
                    let money = result.lianjia[house][area][price], p;
                    if (money.min_price == money.max_price) {
                      p = money.min_price + '元';
                    } else {
                      p = money.min_price + '-' + money.max_price + '元';
                    }
                    obj[price] = area + house + '平米' + price + '均价' + p;
                  }
                }
              }
              this.relatedInfoL = Object.assign({}, obj)
            }
          })
        });
      },
      // 处理相关显示数据
      handleData(val, type) {
        this.drawSlither = {};
        let bulletinData = this.divisionBulletinType(type, val);
        let data = this.jsonData(bulletinData.data);
        this.allBulletin = data;
        this.titleTips = bulletinData.title;
        this.objInt = this.objIntArray(bulletinData.data);
        let obj = {};
        for (let val of Object.keys(data)) {
          obj[val] = {};
          for (let item of data[val]) {
            if (item.picker === 'upload') {
              for (let pic of item.photos) {
                obj[val][pic.keyName] = pic.label;
              }
            } else if (item.showList) {
              obj[val][item.keyName] = item.label;
              for (let list of item.showList) {
                obj[val][list.keyName] = list.label;
              }
            } else {
              if (item.keyName) {
                obj[val][item.keyName] = item.label;
              }
            }
          }
        }
        this.drawSlither = obj;
      },
      // 详情接口
      getDetailForm(url, type) {
        this.$http.get(url).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.vLoading = false;
            this.formatData = res.data.content;
            this.handleDetail(res.data.content);
            this.getVillageRelatedParams(this.formatData, type);
          } else {
            this.$LjNotify('error', {
              title: '提示',
              message: res.message,
            });
          }
        })
      },
      // 获取小区 相关信息
      getVillageRelatedParams(data, type) {
        let params = {};
        if (type === 'bulletin_collect_basic') {//收房
          params = {
            community_id: data.community.id,	//小区id
            staff_id: data.staff_id,	//签约人
            room: data.house_type[0],	//户型
            is_collect: 1
          }
        }
        if (type === 'bulletin_rent_basic') {//租房
          params = {
            staff_id: data.staff_id,	//签约人
            contract_id: data.contract_id,//合同id
            begin_date: data.begin_date,//开始时间
            price: data.deposit,//月单价
            is_collect: 2
          }
        }
        this.getVillageRelated(params);
      },
      // 获取小区 相关信息 接口
      getVillageRelated(params) {
        this.$http.get(`${this.market_server}V1.0/market/helper/related`, params).then(res => {
          if (res.code === 200) {
            let data = res.data;
            data.house_type_price = (data.house_type_price[0] || 0) + '-' + (data.house_type_price[1] || 0);
            data.noReason = data.break_a_contract_count - (data.customer_break_contract_count || 0) - (data.company_break_contract_count || 0);
            this.relateions = data;
          }
        })
      },
      // 数据转换文本
      handleDetail(res) {
        for (let item of Object.keys(res)) {
          switch (item) {
            case 'house_id':
              this.formatData.house_id = res.address;
              break;
            case 'house_address':
              this.formatData.house_id = res.house_address;
              break;
            case 'door_address'://门牌地址
              let door = this.jsonData(res[item]);
              door[0] = door[0] ? door[0] + '-' : '';
              door[1] = door[1] ? door[1] + '-' : '';
              door[2] = door[2] ? door[2] : '';
              this.formatData[item] = door.join('');
              break;
            case 'community':
              this.formatData[item] = res[item].village_name;
              break;
            case 'house_type'://户型
              let house = this.jsonData(res[item]);
              house[0] = house[0] ? house[0] + '室' : '';
              house[1] = house[1] ? house[1] + '厅' : '';
              house[2] = house[2] ? house[2] + '卫' : '';
              this.formatData[item] = house.join('');
              break;
            case 'decorate'://装修
            case 'property_type'://房屋类型
            case 'direction'://朝向
              this.formatData[item] = res[item].name;
              break;
            case 'floors':
              this.formatData.floors = res.floor + ' / ' + res.floors;
              break;
            case 'month':
              if (res.day) {
                this.formatData.month = res.month + '个月' + res.day + '天';
              } else {
                this.formatData.month = res.month + '个月';
              }
              break;
            case 'non_landlord_fee'://非房东费用
              let names = [];
              for (let name of this.formatData[item]) {
                names.push(dicties[item][name])
              }
              this.formatData[item] = names.join(',');
              break;
            case 'remark_terms'://备注条款
              let terms = [];
              for (let name of res[item]) {
                terms.push(name + '、' + dicties[item][name]);
              }
              this.formatData[item] = terms;
              break;
            case 'subsidiary_customer'://附属房东
              if (res[item]) {
                let customer = ['customer_sex', 'card_type', 'contact_way'];
                this.changeHandle(res, item, customer, this.drawSlither, this.formatData);
                this.customerDomShow(item);
              }
              break;
            case 'period_price_way_arr'://付款方式变化
              let pay_way = ['pay_way'];
              this.changeHandle(res, item, pay_way, this.drawSlither, this.formatData);
              break;
            default:
              if (this.objInt.includes(item)) {
                let num = this.myUtils.isNum(res[item]) ? Number(res[item]) : (res[item] || '');
                this.formatData[item] = dicties[item][num];
              }
              break;
          }
        }
        if (res.album) {
          for (let pic of Object.keys(res.album)) {
            this.formatData[pic] = res.album[pic];
          }
        }
      },
      // 所有单选 字段
      objIntArray(data) {
        let arr = [];
        for (let item of Object.keys(data)) {
          for (let key of data[item]) {
            if (key.status === 'objInt') {
              arr.push(key.keyName);
            }
          }
        }
        return arr;
      },
      // 变化数据 预填数据处理
      changeHandle(res, item, val, all, data) {
        for (let slither of Object.keys(all)) {
          for (let list of Object.keys(all[slither])) {
            if (all[slither][list].keyName === item) {
              for (let i = 1; i < res[item].length; i++) {
                all[slither][list].children.push(all[slither][list].children[0]);
              }
            }
          }
        }
        data[item] = this.jsonData(res[item]);
        res[item].forEach((key, idx) => {
          for (let key of val) {
            data[item][idx][key] = dicties[key][res[item][idx][key]];
          }
        });
      },
      // 附属房东 dom 显示
      customerDomShow(item) {
        for (let cus of Object.keys(this.allBulletin)) {
          for (let child of this.allBulletin[cus]) {
            if (child.keyName === item) {
              this.changeFormData[item] = {};
              let children = this.jsonData(child.children[0]);
              this.changeFormData[item]['keyName'] = child.label;
              for (let sub of children) {
                this.changeFormData[item][sub.keyName] = sub.label;
              }
            }
          }
        }
      },
      // 审核
      confirmApproval(action = {}, name = '') {
        this.fullLoading = true;
        let postData = {};
        postData.action = 'complete';
        postData.variables = [{
          name: name,
          value: action.action,
        }];
        if (name === 'suspend') {//暂不处理
          this.$http.put(`${this.approval_sever}runtime/process-instances/${this.allDetail.process_id}`, {action: name}).then(res => {
            this.fullLoading = false;
            if (199 < res.httpCode < 300) {
              this.$LjNotify('success', {
                title: '审核状态',
                message: '暂缓成功！'
              });
              this.handleClose('success');
              this.$emit('changeData', 'success');
            } else {
              this.$LjNotify('error', {
                title: '审核状态',
                message: '暂缓失败！'
              });
            }
          }).catch(err => {
            this.fullLoading = false;
          })
        } else {//通过 拒绝
          this.$http.post(`${this.approval_sever}runtime/tasks/${this.allDetail.task_id}`, postData).then(res => {
            this.fullLoading = false;
            if (199 < res.httpCode < 300) {
              this.$LjNotify('success', {
                title: '审核状态',
                message: '审核成功！'
              });
              this.handleClose('success');
              this.$emit('changeData', 'success');
            }
          }).catch(err => {
            this.fullLoading = false;
          });
        }
      },
      // 关闭模态框
      handleClose(status = 'close') {
        this.$emit('changeData', status)
      },
      // 评论弹窗
      changeBtn_type() {
        this.$http.get(`${this.approval_sever}history/process-instances/${this.allDetail.process_id}/comments`).then(res => {
          let ids = [];
          for (let item of res) {
            if (item.content) {
              ids.push(item.author);
            }
          }
          if (ids.length) {
            this.handlerComments(res, ids);
          }
        })
      },
      handlerComments(value, ids) {
        let staff = Array.from(new Set(ids));
        let arr = [], obj = {};
        this.getStaffInfo(staff).then(res => {
          for (let names of res) {
            obj.name = names.name;
            obj.id = names.id;
            if (names.org && names.org.length) {
              obj.department = names.org[0].name;
            } else {
              obj.department = '******';
            }
            arr.push(obj);
          }
          this.comment_list = [];
          for (let item of arr) {
            for (let val of value) {
              if (val.author == item.id) {
                val.author_name = item.name;
                val.department = item.department;
                this.comment_list.push(val);
              }
            }
          }
        });
      },
      // 清空评论内容
      closeComment() {
        this.$refs['closeComment'].reset();
        this.comment_info.message = '';
        this.comment_info.attachments = [];
      },
      // 发送评论
      postComment() {
        if (!this.comment_info.message) {
          this.$LjNotify('warning', {
            title: '警告',
            message: '评论内容不得为空'
          });
          return
        }
        let params = {
          author: this.$storage.get('user_info').id,
          content: this.comment_info,
          saveProcessInstanceId: true
        };
        this.$http.post(`${this.approval_sever}history/process-instances/${this.allDetail.process_id}/comments`, params).then(res => {
          if (100 < res.httpCode < 300) {
            this.$LjNotify('success', {
              title: '评论',
              message: '评论成功！'
            });
            this.changeBtn_type();
            this.closeComment();
          }
        })
      },
      // 审核历史
      handleRecord() {
        this.$http.get(`${this.approval_sever}history/process-instances/${this.allDetail.process_id}/log`).then(res => {
          this.approval_list = res;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/common.scss";

  @mixin confirmImg($m, $n) {
    $url: "../../../assets/image/approval/" + $n + "/" + $m;
    @include bgImage($url);
  }

  #theme_name {
    #contract_detail_approval {
      .dialog_container {
        .dialog_header {
          @include flex('items-bet');

          p {
            cursor: pointer;
            font-size: 14px;
            color: #0C66FF;
            padding: 6px 10px;
            background: rgba(245, 250, 255, 1);
            border-radius: 4px;
            border: 1px solid #0C66FF;
          }
        }

        .dialog_main {
          /*评论*/
          .float-btn {
            position: fixed;
            top: 180px;
            right: 60px;

            h1 {
              width: 60px;
              height: 60px;
              @include radius(6px);
              @include confirmImg("pinglun_dianji.png", "theme1");
            }

            p {
              margin-top: 3px;
              font-size: 10px;
              text-align: center;
            }
          }

          ul + ul {
            margin-top: 30px;
          }

          ul {
            position: relative;
            background-color: #FFFFFF;
            padding: 30px 30px 20px 60px;
            @include radius(6px);
            @include flex();
            flex-wrap: wrap;

            .title {
              position: absolute;
              top: 0;
              left: 20px;
              color: #CF2E33;

              p {
                width: 30px;
                height: 60px;
                @include confirmImg("mokuai.png", "theme1");
              }

              span {
                font-family: 'jingdianxingshu';
                padding-top: 6px;
              }
            }

            .remark_terms {
              font-size: 13px;
              color: #E79699;
            }
          }

          .slither {
            li + li {
              margin-bottom: 15px;
              width: 33.33%;
              text-align: left;

              > div {
                @include flex();

                h1, h2, h3, h4, h5, h6, span {
                  font-weight: normal;
                  font-size: 13px;
                }

                h1 {
                  text-align: right;
                  min-width: 120px;
                  max-width: 120px;
                  color: #B0B0B0;
                  padding-right: 10px;
                }

                > div {
                  @include flex('items-center');
                  flex-wrap: wrap;
                  width: 100%;
                }
              }

              .keyName {
                margin-bottom: 10px;
              }

              h3 {
                color: #000;
                margin-bottom: 6px;
              }

              .upload {
                @include flex();

                span {

                  img {
                    width: 45px;
                    height: 45px;
                    @include radius(6px);
                    margin: 0 6px 6px 0;
                  }
                }
              }
            }
          }

          .related {
            @include flex('justify-around');
            min-height: 180px;

            li + li {
              font-size: 14px;
              text-align: left;
              min-width: 33.33%;
              max-width: 33.33%;
              @include flex('justify-center');

              > div {
                div {
                  margin-bottom: 6px;
                }
              }
            }
          }
        }

        .dialog_footer {
          button {
            margin: 0 6px;
          }

          @include flex();
          flex-direction: row-reverse;
        }
      }

      .comments {
        position: fixed;
        top: 0;
        right: 130px;
        width: 360px;
        height: 800px;
        @include radius(6px);
        background-color: #FFFFFF;
        border: 1px solid #F2F2F2;
        @include flex('bet-column');

        .historyComments {
          padding: 20px;
          text-align: left;
          height: 100%;
          @include scroll;
          font-size: 14px;

          > div {
            width: 100%;
            margin-bottom: 20px;
          }

          .commentTop {
            @include flex('items-bet');

            p {
              color: #686874;
            }

            span {
              color: #B0B0B0;
            }
          }

          .commentText {
            margin-top: 10px;

            div {
              color: #000;
            }

            h1 {
              @include flex('items-center');
              flex-wrap: wrap;

              img {
                width: 40px;
                height: 40px;
                @include radius(6px);
                margin: 6px 6px 0 0;
              }
            }
          }
        }

        .inputText {
          h1 {
            border-top: 2px solid #F2F2F2;
          }

          .textarea {
            height: 100px;
          }

          #lj_upload {
            padding: 0 10px;
          }

          p {
            text-align: right;
            padding: 12px;
          }
        }
      }
    }
  }

  #theme_name.theme1 {
    #contract_detail_approval {
      .dialog_main {
        .el-form {
          .dialog_tit {
            .dialog_tit_img {
              @include confirmImg("mokuai.png", "theme1");
            }

            p {
              color: #cf2e33;
            }
          }
        }

        .float-btn {
          .float_box {
            .float_box_con {
              @include confirmImg("pinglun.png", "theme1");
            }

            .float_box_rew {
              @include confirmImg("baobei.png", "theme1");
            }

            p {
              color: #dddddd;
            }
          }

          .float_box_active {
            .float_box_con {
              @include confirmImg("pinglun_dianji.png", "theme1");
            }

            .float_box_rew {
              @include confirmImg("baobei_dianji.png", "theme1");
            }

            p {
              color: #cf2e33;
            }
          }
        }
      }

      .comments_box {
        .comment_cell {
          .comment_cel_header {
            .span1 {
              color: #686874;
            }

            .span2 {
              color: #b0b0b0;
            }
          }

          .comment_cell_words {
            color: #000;
          }

          .comment_border {
            border: 1px solid #f9f9f9;
            height: 2px;
          }
        }

        .comments_footer {
          border: 1px solid #f2f2f2;
          border-radius: 8px;

          .post_icons {
            @include confirmImg("fasong.png", "theme1");
          }

          .post {
            color: #cf2e33;
          }
        }
      }

      .record_dialog {
        background: #fff;

        .record_status {
          .circle1 {
            background: #cf2e33;
          }

          .circle2 {
            background: #ffad0d;
          }
        }

        .record_cell_mess {
          .record_person {
            color: #b0b0b0;

            .agree {
              background: #eafcf7;
              color: #099a71;
            }

            .transfer {
              background: #f5faff;
              color: #0a59ec;
            }
          }

          .record_message {
            color: #333;
          }
        }

        .record_time {
          p {
            color: #b0b0b0;
          }

          .fre_time {
            color: #686874;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  #contract_detail_approval {
    .comments {
      .el-textarea {
        height: 100%;
      }

      textarea {
        height: 100%;
        border: none;
      }
    }
  }
</style>
