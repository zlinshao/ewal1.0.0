<template>
  <div id='contract_detail_approval'>
    <LjDialog :visible="visible" :size="{width: 1300 + 'px',height: 800 + 'px'}" @close="handleClose">
      <div class='dialog_container' v-if='visible && formatData'>
        <div class='dialog_header'>
          <h3>{{allDetail.house_address}}</h3>
          <!--<p>查看审核记录</p>-->
        </div>
        <div
          style="width: 90%;"
          v-loading="vLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0)">
        </div>
        <div class="dialog_main" v-if="!vLoading">
          <ul class="slither">
            <li></li>
            <li>
              <div>
                <h1>报备类型</h1><span>{{allDetail.bulletin_name}}</span>
              </div>
            </li>
            <li>
              <div>
                <h1>状态</h1><span>{{allDetail.name}}</span>
              </div>
            </li>
            <li>
              <div>
                <h1>处理人</h1><span>{{allDetail.assignee_name}}</span>
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
                    <div :class="key" v-else>
                      {{val}}
                    </div>
                  </div>
                </div>
                <span :class="key" v-else>{{formatData[key]}}</span>
              </div>
            </li>
          </ul>
          <ul class="related">
            <li class="title">
              <p></p>
              <span class="writingMode">相关信息</span>
            </li>
            <li>
              <div>
                <div>同类型房源市场价2500-3000元</div>
                <div>该小区曾违约5套房</div>
                <div>该小区已有房源1000套,未出租500套</div>
                <div>该业务员通过率30%</div>
                <div>该报备价格已超出房源最低价300元,请谨</div>
              </div>
            </li>
            <li>
              <div>
                <div>收房价格：</div>
                <div>3室精装均价4500元</div>
                <div>2室精装均价3500元</div>
                <div>2室简装均价2500元</div>
              </div>
            </li>
          </ul>
          <div class='float-btn'>
            <div @click.stop='changeBtn_type'>
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
          <div v-for="item in 100">
            <div class="commentTop">
              <p>程咬金-大唐官府</p>
              <span>2019-01-22 10:00:00</span>
            </div>
            <div class="commentText">
              <div>发货的色卡符合开绿灯撒</div>
              <h1>
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
                <img src="http://p.qlogo.cn/bizmail/TS1DO8GPlAzOtrtIWicqPd6SVURcN7e2rqmhABvQdh9nXCuAbCkzpQw/0" alt="">
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
          <lj-upload size="50" v-model="comment_info.attachments"></lj-upload>
          <p>
            <el-button size="mini" type="info" @click="closeComment">清空</el-button>
            <el-button size="mini" type="danger" @click="postComment">发送</el-button>
          </p>
        </div>
        <!--        <div class='comments_list'>-->
        <!--          <div class='comment_cell' v-for='item in record_list' :key='item.id'>-->
        <!--            <div class='comment_cell_header'>-->
        <!--              <span class='span1'>{{item.title}}</span>-->
        <!--              <span class='span2'>{{item.time}}</span>-->
        <!--            </div>-->
        <!--            <div class='comment_cell_words'>{{item.content.message}}</div>-->
        <!--            <Ljupload size='30' v-model="item.content.attachments" disabled=true :download='false'></Ljupload>-->
        <!--            <div class='comment_border'></div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class='comments_footer'>-->
        <!--          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="comment_info.message">-->
        <!--          </el-input>-->
        <!--          &lt;!&ndash; 上传图片 &ndash;&gt;-->
        <!--          <p class='postTit'>发送图片</p>-->
        <!--          <div class='img_box'>-->
        <!--            <Ljupload size='30' v-model='comment_info.attachments'></Ljupload>-->
        <!--          </div>-->
        <!--          <div class='post' @click='postComment'>-->
        <!--            <i class='post_icons'></i>-->
        <!--            发送-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </LjDialog>

    <!--    &lt;!&ndash;审核&ndash;&gt;-->
    <!--    <LjDialog :visible="record_show_visible" :size="{width: 720 + 'px',height: 480 + 'px'}" @close="handleCloseRecord">-->
    <!--      <div class='dialog_container'>-->
    <!--        <div class='dialog_header'>-->
    <!--          <h3>审核记录</h3>-->
    <!--        </div>-->
    <!--        <div class='dialog_main record_dialog'>-->
    <!--          <div class='record_cell' v-for='(item,index) in approval_list' :key='index'>-->
    <!--            <div class='record_cell_left'>-->
    <!--              <div class='record_status'>-->
    <!--                <div class='circle circle1' v-if='item.name =="评论"'></div>-->
    <!--                <div class='circle circle2' v-else-if='item.name =="报备"'></div>-->
    <!--                <img v-else></img>-->
    <!--              </div>-->

    <!--              <div class='record_cell_mess'>-->
    <!--                <p class='record_person'>-->
    <!--                  {{item.userId}}-->
    <!--                  <span class='agree' v-if='item.name=="审批"'>{{item.result ? ('已' + item.result) : ''}}</span>-->
    <!--                  <span class='agree transfer' v-if='item.name == "转交"'>已转交</span>-->
    <!--                  <span v-if='item.name =="评论"'>做了评论</span>-->
    <!--                  <span v-else-if='item.name =="报备"'>修改了报备</span>-->
    <!--                </p>-->
    <!--                &lt;!&ndash; 评论 &ndash;&gt;-->
    <!--                <template v-if='item.name =="评论"'>-->
    <!--                  <p class='record_message'>{{JSON.parse(item.result).message}}</p>-->
    <!--                  <Ljupload size='40' :value='JSON.parse(item.result).attachments' :download="false"-->
    <!--                            disabled="false"></Ljupload>-->
    <!--                </template>-->

    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class='record_time'>-->
    <!--              <p class='record_uptime'>{{item.time}}</p>-->
    <!--              <p class='fre_time' v-if='item.name=="审批"'>耗时{{item.duration | formDataMin}}min</p>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </LjDialog>-->
    <!--    &lt;!&ndash; 拒绝 &ndash;&gt;-->
    <!--    <LjDialog :visible='reject_visible' :size='{width:600+"px",height:400+"px"}' @close='handleCloseReject(false)'>-->
    <!--      <div class='dialog_container'>-->
    <!--        <div class='dialog_header'>-->
    <!--          <h3>拒绝</h3>-->
    <!--        </div>-->
    <!--        <div class="dialog_main borderNone urgedDeal">-->
    <!--          <el-form label-width="80px">-->
    <!--            <el-form-item label="备注">-->
    <!--              <el-input v-model="reject_mark" type="textarea" placeholder="请输入" :row="10"></el-input>-->
    <!--            </el-form-item>-->
    <!--          </el-form>-->
    <!--        </div>-->
    <!--        <div class="dialog_footer">-->
    <!--          <el-button type="danger" size="small" @click="handleCloseReject(true)">确定</el-button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </LjDialog>-->

    <!--    <FormDetail :visible='show_form_visible' :moduleData='formatData'/>-->
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
        drawSlither: {},//自定义报备数据
        titleTips: [],//详情标题
        formatData: {},//获取详情数据
        bulletin_type: '',//报备类型
        allBulletin: {},//报备原数据
        changeFormData: {},//附属房东变化
        operates: {},
        allDetail: {},
        comment_show_visible: false,//评论模态框
        // 评论内容
        comment_info: {
          message: '',
          attachments: []
        },

        record_show_visible: false,
        show_form_visible: false,
        reject_visible: false, // 拒绝弹框
        reject_mark: null, // 拒绝理由
        relateions: {},
        record_list: [], // 评论信息
        approval_list: [], //审核记录
      }
    },
    watch: {
      moduleData: {
        handler(val) {
          if (val) {
            this.vLoading = true;
            this.fullLoading = false;
            this.allDetail = val;
            this.bulletin_type = val.bulletin_type;
            this.getOperates(val);
            this.getStaffInfo(val.assignee).then(res => {
              this.allDetail.assignee_name = res;
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
          this.$http.get(`${this.hr_server}staff/user/${id}`).then(res => {
            if (res.code.endsWith('0')) {
              resolve(res.data.name);
            } else {
              this.$LjNotify('error', {
                title: '警告',
                message: res.msg
              });
            }
          })
        })
      },
      // 报备类型
      divisionBulletinType(type, num) {
        let data, title;
        switch (type) {
          case 'bulletin_collect_basic':
            title = ['房屋信息', '物品信息', '客户信息', '合同信息'];
            data = this.jsonData(defineCollectReport);
            break;
          case 'bulletin_rent_basic':
            title = ['客户信息', '合同信息'];
            data = this.jsonData(defineRentReport);
            data.slither0 = defineNewRentReport.concat(data.slither0);
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
          case 'supplement_lord_time'://补充协议
            data = {};
            title = ['补充协议'];
            data.slither0 = this.jsonData(defineSupplyAgreement[num - 1]);
            break;
        }
        return {data, title}
      },
      // 处理相关显示数据
      handleData(val, type) {
        this.drawSlither = {};
        let bulletinData = this.divisionBulletinType(type, val.pact_type = 1);
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
          this.vLoading = false;
          if (res.code === 200) {
            this.formatData = res.data.content;
            this.handleDetail(res.data.content);
            this.getVillageRelatedParams(this.formatData, type)
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
        console.log(this.formatData)

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
        this.comment_show_visible = !this.comment_show_visible;
        if (this.comment_show_visible) {
          this.record_list = [];
          this.$http.get(`${this.approval_sever}history/process-instances/${this.allDetail.process_id}/comments`).then(res => {
            for (let item of res) {
              if (res.content) {
                this.getStaffInfo(item.author).then(res => {
                  item.author_name = res;
                  this.record_list.push(item);
                });
              }
            }
          })
        }
      },
      // 清空评论内容
      closeComment() {
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
            this.closeComment();
          }
        })
      },

      handleRecord() {
        this.$http.get(`${this.approval_sever}history/process-instances/${this.moduleData.id}/log`).then(res => {
          console.log(res);
          this.approval_list = res
        }).catch(e => {
          this.approval_list = []
        });
        this.record_show_visible = true
      },
      handleCloseRecord() {
        this.record_show_visible = false
      },
      handleBuff() { // 暂缓
        let params = {
          'action': this.moduleData.suspended ? "activate" : "suspend"
        };
        this.$http.put(`${this.approval_sever}runtime/process-instances/${this.moduleData.rootProcessInstanceId}`, params).then(res => {
          if (this.status_type == 2) {
            this.$LjNotify('success', {
              title: this.moduleData.suspended ? "激活成功" : "暂缓成功",
              message: ''
            });
            this.$emit('changeData')
          }
          this.moduleData.suspended = !this.moduleData.suspended
        })
      },
      handleRewrite() { // 修改
        this.show_form_visible = true
      },
      handleReject() { // 拒绝
        this.AggreeAndReject('拒绝')
      },
      handleCloseReject(isSure) {
        if (isSure) {

        }
        this.reject_mark = null;
        this.reject_visible = false;
      },
      handleAggree() { // 同意
        this.AggreeAndReject('同意')
      },
      AggreeAndReject(tit) {
        if (this.type == 3 && this.moduleData.suspended) {
          this.handleBuff()
        }
        let params = {
          "action": "complete",
          "variables": []
        }
        if (tit != '已读') {
          let outcome = this.moduleData.outcome;
          let outcomeOptions = JSON.parse(outcome).outcomeOptions;
          let isReject = null;
          for (let item of outcomeOptions) {
            if (item.title = tit) {
              isReject = item.action
            }
          }
          params = {
            "action": "complete",
            "variables": [
              {
                "name": JSON.parse(outcome).variableName,
                "value": isReject
              }
            ]
          }
        }
        this.$http.post(`${this.approval_sever}runtime/tasks/${this.moduleData.id}`, params).then(res => {
          this.$emit('changeData')
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
                  @include flex('items-center');
                  flex-wrap: wrap;

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

    #contract_detail_approval1 {
      // 表格设置
      .dialog_main {
        @include scroll;
        overflow-x: hidden;

        .el-form {
          border-radius: 4px;
          // padding: 16px 0 16px 30px;
          position: relative;

          .seeRecord {
            width: 110px;
            height: 30px;
            position: absolute;
            right: 140px;
            top: 20px;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            z-index: 9;
          }

          .dialog_tit {
            position: absolute;
            top: 0;
            left: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .dialog_tit_img {
              width: 20px;
              height: 60px;
            }

            p {
              padding-top: 10px;
              writing-mode: vertical-rl;
              font-size: 14px;
              font-family: "jingdianxingshu";
            }
          }

          .house_video {
            img {
              width: 50px;
              height: 50px;
            }
          }
        }

        .el-form + .el-form {
          margin-top: 20px;
        }

        .float-btn {
          position: fixed;
          top: 180px;
          right: 60px;

          .h1 {
            width: 60px;
            height: 60px;
            @include confirmImg("pinglun.png", "theme1");
          }

          p {
            margin-top: 3px;
            font-size: 10px;
            text-align: center;
          }
        }
      }

      .record_dialog {
        padding: 30px;

        .record_cell {
          display: flex;
          align-items: flex-start;
          height: 130px;
          position: relative;

          .record_cell_left {
            flex: 1;
            display: flex;

            .record_status {
              height: 40px;
              width: 40px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }

              .circle {
                width: 10px;
                height: 10px;
                border-radius: 50%;
              }
            }

            .record_cell_mess {
              margin-left: 20px;

              .record_person {
                font-size: 12px;
                text-align: left;

                .agree {
                  display: inline-block;
                  width: 50px;
                  height: 24px;
                  text-align: center;
                  line-height: 24px;
                }

                span {
                  font-size: 12px;
                }
              }

              .record_message {
                text-align: left;
                margin-top: 10px;
                font-size: 12px;
                font-family: "jingdianxingshu";
              }
            }
          }

          .record_time {
            width: 140px;

            .record_uptime {
              white-space: nowrap;
              font-size: 12px;
            }

            .fre_time {
              font-size: 12px;
              margin-top: 10px;
            }
          }
        }

        .record_cell + .record_cell {
          &::before {
            content: "";
            position: absolute;
            left: 20px;
            top: -80px;
            width: 1px;
            height: 60px;
            border-left: 1px dashed #dfdfdf;
          }
        }
      }

      .dialog_footer {
        display: flex;
        justify-content: flex-end;
      }

      // 拒绝
      .urgedDeal {
        background: #fff;
        padding: 10px 0;
      }

      // 评论
      .comments_box {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 160px;
        width: 350px;
        background: #fff;
        padding: 30px;
        z-index: 12;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 5px 5px 0px rgba(229, 229, 229, 1);
        border-radius: 4px;
        @include transform(scale(0));
        @include transOrigin(50%);
        @include transition(all 0.4s linear);
        opacity: 0;

        &.comments_box_active {
          @include transOrigin(50%);
          @include transition(all 0.4s linear);
          @include transform(scale(1));
          opacity: 1;
        }

        .comments_list {
          flex: 1;
          padding-bottom: 20px;
          @include scroll;
          overflow-x: hidden;

          .comment_cell {
            .comment_cell_header {
              display: flex;
              justify-content: space-between;
              align-content: center;
              height: 40px;

              span {
                line-height: 40px;
                font-size: 14px;
              }
            }

            .comment_cell_words {
              font-size: 10px;
              font-weight: 700;
              text-align: left;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            .comment_border {
              margin-top: 15px;
            }
          }
        }

        .comments_footer {
          height: 180px;

          .postTit {
            font-size: 14px;
            color: #b0b0b0;
            text-align: left;
            padding-left: 8px;
          }

          .img_box {
            height: 50px;
            padding-left: 8px;
            @include scroll;
            overflow: hidden;
            overflow-y: scroll;
          }

          .post {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 14px;
            padding-right: 10px;
            margin-top: 6px;

            .post_icons {
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-right: 12px;
            }
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
  #contract_detail_approval1 {
    z-index: 100;

    .lj_dialog > .flex-center {
      top: 0 !important;
    }
  }

  #theme_name7 {
    #contract_detail_approval {
      // 表格设置
      .dialog_main {
        .el-form {
          .el-form-item {
            margin-bottom: 0;

            .el-form-item__label,
            .el-form-item__content {
              display: flex;

              align-items: center;
              // height: 30px;
              font-family: "Microsoft YaHei";
            }

            .el-form-item__label {
              text-align: right;
              justify-content: flex-end;
            }

            .el-form-item__content {
              text-align: left;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;

              .more_checkbox {
                display: flex;

                .el-select {
                  flex: 1;
                }

                .el-input__inner {
                  padding: 0 5px;
                }
              }
            }

            .el-date-editor--date {
              input {
                border: none;
              }
            }
          }

          .house_video {
            height: 50px;

            .el-form-item__label,
            .el-form-item__content {
              line-height: 50px;
              height: 50px;
            }
          }

          .message_box {
            .message_form {
              .el-form-item__label {
                height: 20px;
                position: relative;

                &:after {
                  content: "";
                  width: 6px;
                  height: 6px;
                  background: #b0b0b0;
                  border-radius: 50%;
                  position: absolute;
                  top: 7px;
                  right: 15px;
                }
              }

              .el-form-item__content {
                line-height: 20px;
                max-height: 40px;
                overflow: hidden;
              }
            }

            .message_form + .message_form {
              margin-top: 10px;
            }

            .message_con {
              text-align: left;

              div {
                color: #e79699;
              }
            }

            .message_price {
              text-align: left;

              div {
                white-space: nowrap;
                font-size: 14px;
                font-weight: 700;
                color: #686874;
              }
            }
          }
        }
      }

      .comments_box {
        .el-textarea__inner {
          border: none;
          height: 60px;
        }
      }

      // 拒绝
      .urgedDeal {
        .el-textarea__inner {
          border: none;
          height: 170px;
        }
      }
    }
  }

  #theme_name.theme17 {
    #contract_detail_approval {
      // 表格设置
      .dialog_main {
        .el-form {
          background: #fff;

          .el-form-item {
            .el-form-item__label {
              color: #b0b0b0;
            }

            .el-form-item__content {
              color: #686874;
            }
          }

          .el-button--primary.is-plain {
            background: #fff;
            border-color: #0c66ff;
            color: #0c66ff;
          }
        }
      }
    }
  }
</style>
