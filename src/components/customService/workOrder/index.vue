<template>
  <div id="workOrder">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>工单</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <div class="icons add" @click='createOrder_visible = true'><b>+</b></div>
        <div class="icons search" @click="highSearch"></div>
      </div>
    </div>
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table :data="tableData" :height="this.mainListHeight(30) + 'px'" highlight-current-row @row-dblclick="tableDblClick"
        header-row-class-name="tableHeader" style="width: 100%" :key='"orderTable"+chooseTab'>
        <el-table-column align="center" label="紧急程度">
          <template slot-scope="scope">
            <div class="status" :class="['emergency' + scope.row.emergency]">
              <p>{{scope.row.emergency_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop='create_time'></el-table-column>
        <el-table-column align="center" label="工单编号" prop='num'></el-table-column>
        <el-table-column align="center" label="类型" prop='type_name'></el-table-column>
        <el-table-column align="center" label="地址" prop='house_name'></el-table-column>
        <el-table-column align="center" label="内容" prop='content'></el-table-column>
        <el-table-column align="center" label="截止时间" prop='finish_time'></el-table-column>
        <el-table-column align="center" label="处理人" prop='operate_user_name'></el-table-column>
        <el-table-column align="center" label="创建人" prop='create_name'></el-table-column>
        <el-table-column align="center" label="部门" prop='org_name'></el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" v-if='chooseTab != 338' @click='handleCuiBan(scope.row)'>催办</el-button>
            <el-button type="warning" plain size="mini" @click='handleDeleteRow(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="tableDateCount"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <MenuList :list="customService" :module="visibleStatus" :backdrop=true @close="visibleStatus = false"></MenuList>

    <!--确定删除-->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete'></DeleteDialog>
    <!--确定增加-->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd'></AddDialog>
    <!-- 催办 -->
    <LjDialog :visible="urgedDeal_visible" :size="{width: 480 + 'px',height: 340 + 'px'}" @close="handleCloseUrgedDeal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>建立催办</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal" v-if='currentRow'>
          <el-form label-width="80px">
            <el-form-item label="发送对象">
              <el-input @focus="handlerOrgan('cuiban')" readonly v-model="urgedDeal.personName" :placeholder="currentRow.create_name 
              || currentRow.operate_user_name"></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="urgedDeal.note" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseUrgedDeal(true)">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseUrgedDeal">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!--确定结束-->
    <LjDialog :visible="sureEnding_visible" :size="{width: 480 + 'px',height: 320 + 'px'}" @close="handleCloseSure(false)">
      <div class="dialog_container end_dialog">
        <div class="dialog_main">
          <h3>确定结束吗?</h3>
          <el-checkbox v-model='sureEnding_check' v-if='sureEnding_visible'>
            公司员工({{detail_form.payer || '/'}}-{{detail_form.payer_org_name ||'/'}})已支付维修费用,结束后系统进入报销流程
          </el-checkbox>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseSure(true)">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseSure(false)">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!--新建工单-->
    <LjDialog :visible="createOrder_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseOrder">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建工单</h3>
        </div>
        <div class="dialog_main addOrder_dialog">
          <div class="back_info scroll_bar">
            <el-row :gutter="10">
              <el-col :span='createOrder_span'>
                <p class='el-col-p'><i class='icon house_name'></i>房屋地址</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder.house_name'></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon type'></i><span>工单类型</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.type" placeholder="请选择">
                    <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 699'>
                <p class='el-col-p'><i class='icon comtype'></i><span>投诉类型</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.complain_type" placeholder="请选择">
                    <el-option v-for="item in complaintsType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 699'>
                <p class='el-col-p'><i class='icon tsqd'></i><span>投诉渠道</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.complain_channel" placeholder="请选择">
                    <el-option v-for="item in complaintsChannels" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 699'>
                <p class='el-col-p'><i class='icon handler'></i><span>被投诉人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan('complained_user')" readonly v-model="createOrder.complained_user.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 1'>
                <p class='el-col-p'><i class='icon handler'></i><span>报销人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan('reimburse_user')" readonly v-model="createOrder.reimburse_user.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerOrgan('operate_user')" readonly v-model="createOrder.operate_user.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="handlerDepart('operate_org')" readonly v-model="createOrder.operate_org.name"></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model.tel='createOrder.replay_phone'></el-input>
                </div>
              </el-col>

              <el-col :span="createOrder_span">
                <p class='el-col-p'><i class='icon status'></i><span>紧急程度</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type != 1'>
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder.next_follow_time" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择跟进时间"></el-date-picker>
                </div>
              </el-col>

              <el-col :span='createOrder_span'>
                <p class='el-col-p'><i class='icon content'></i>工单内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="createOrder.content"></el-input>
                </div>
              </el-col>

              <el-col :span='12' v-for='(item,index) in createOrder.reimburse' :key='"feiyong" + index' v-if='createOrder.type == 1'>
                <el-row :gutter="8" class='feiyong'>
                  <el-col :span="12">
                    <p class='el-col-p'><i class='icon comtype'></i><span>报销类型</span></p>
                    <div class='input_box'>
                      <el-select v-model="item.type" placeholder="请选择" @change="chosenComplaintsType">
                        <el-option v-for="(exp,idex) in expenseType" :key="exp.value" :label="exp.label" :value="exp.value"
                          :disabled="expenseTypeDisable.indexOf(exp.value) > -1">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <p class='el-col-p'><i class='icon commoney'></i><span>报销金额</span></p>
                    <div class='input_box'>
                      <el-input v-model="item.money" placeholder="请输入"></el-input>
                      <i class='icons icon_add' v-if='index== 0' @click='addComplaintsType'></i>
                      <i class='icons icon_del' v-else @click="delComplaintsType(index)"></i>
                    </div>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="createOrder_span" v-if='createOrder.type == 1'>
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder.next_follow_time" value-format="yyyy-MM-dd" align="right" type="date"
                    placeholder="选择跟进时间">
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span='createOrder_span'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='createOrder.album'></Ljupload>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span='2' class='el-col-box'>
                <div :class='{"el-box":true,"el-box-active":addOrderChosen == option.id}' v-for='option in addOrderChosen_options'
                  @click='chosenOptions(option.id)' :key='option.id'>
                  <p>{{option.title}}</p>
                </div>
              </el-col>
              <el-col :span='22' class='el-col-content'>
                <div class='content-top' v-if='addOrderChosen == 1'>
                  <div class='info_search'>
                    <i class='icon'></i>
                    <div class='el-input'>
                      <input type="text" placeholder="地址/合同编号/手机号/客户姓名" class="el-input__inner" v-model="customer_search"
                        v-on:keyup.enter='addOrder_search'>
                    </div>

                  </div>
                  <ul v-if='show_Contract_Detail'>
                    <li v-for='item in seeRecord' :key='item.label' :class="[seeRecord_status == item.value ?'active_record':'']"
                      @click='chosenActiveRecord(item.value)'>{{item.label}}</li>
                  </ul>
                </div>
                <!--客户信息-->
                <div class='custmer_info' v-if='addOrderChosen == 1 && !customer_info.contract_Detail'>
                  <div class='nothing' v-if='customer_info.count == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='custmer_content' v-for='info in customer_info.data' :key='info.id'>
                      <el-radio v-model="chosenCustomer" :label="info" @change="changeCustmInfo">
                        <el-row width='100%'>
                          <el-col :span='7'>
                            <span class='tit'>房屋地址</span>
                            <span class='content_tit'>{{info.house_name || '--'}}</span>
                          </el-col>
                          <el-col :span='5'>
                            <span class='tit'>合同编号</span>
                            <span class='content_tit'>{{info.contract_id || '--'}}</span>
                          </el-col>
                          <el-col :span='3'>
                            <span class='tit'>姓名</span>
                            <span class='content_tit'>{{info.name || '--'}}</span>
                          </el-col>
                          <el-col :span='3'>
                            <span class='tit'>性质</span>
                            <span class='content_tit'>{{info.customer_type || '--'}}</span>
                          </el-col>
                          <el-col :span='5'>
                            <span class='tit'>电话</span>
                            <span class='content_tit'>{{info.phone || '--'}}</span>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCustomerChange" :current-page="customer_info.page" layout="total,  prev, pager, next, jumper"
                    :total="customer_info.count" v-if='customer_info.count > 0'>
                  </el-pagination>
                </div>

                <!-- 合同信息 -->
                <el-row :gutter="10" class='detail_contract' v-if='addOrderChosen == 1 &&show_Contract_Detail'>
                  <el-col :span="6" class='detail_col el-border' v-if='show_Contract_Detail'>
                    <h5>客户信息</h5>
                    <div class='detail_col_box detail_col_box2' width='100%' v-for='info in customer_info.contract_Detail.customer_info'
                      :key='info.phone'>
                      <div>
                        <span class='tit'>姓名</span>
                        <span class="content_tit">{{info.name|| '--'}}</span>
                      </div>
                      <div>
                        <span class='tit'>性别</span>
                        <span class="content_tit">{{info.sex == 1 ? "男":"女"}}</span>
                      </div>
                      <div>
                        <span class='tit'>性质</span>
                        <span class="content_tit">{{createOrder.chooseTab == 1 ? "房东":"租客"}}</span>
                      </div>
                      <div>
                        <span class='tit'>手机号</span>
                        <span class="content_tit">{{info.phone || '--'}}</span>
                      </div>
                      <div>
                        <span class='tit'>身份证号</span>
                        <span class="content_tit">{{info.idcard || '--'}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span='12' class='detail_col el-border'>
                    <h5>合同信息</h5>
                    <el-row :gutter="10" class='detail_col_box'>
                      <el-col :span='12'>
                        <div>
                          <span class='tit'>签约人</span>
                          <span class="content_tit">{{customer_info.contract_Detail.sign_user || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>负责人</span>
                          <span class="content_tit">{{customer_info.contract_Detail.org_leader || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>合同编号</span>
                          <span class="content_tit">{{customer_info.contract_Detail.contract_number || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>签约时间</span>
                          <span class="content_tit">{{customer_info.contract_Detail.sign_at || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>合约时长</span>
                          <span class="content_tit">{{customer_info.contract_Detail.sign_month.moth_to_year || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>合同照片</span>
                          <p class='content_tit'>
                            <img :src="img.uri" alt="" v-for='img in customer_info.contract_Detail.album.photo' :key='img.id'
                              data-magnify="" data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span='12'>
                        <div>
                          <span class='tit'>部门</span>
                          <span class="content_tit">{{customer_info.contract_Detail.sign_org || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>付款方式</span>
                          <span class="content_tit">{{customer_info.contract_Detail.pay_way || '--'}}</span>
                        </div>
                        <div>
                          <span class='tit'>收费价格</span>
                          <span class="content_tit">{{customer_info.contract_Detail.month_price[0].price || '--' +
                            "元"}}</span>
                        </div>
                        <div>
                          <span class='tit'>合同状态</span>
                          <span class="content_tit">{{customer_info.contract_Detail | contractStatusFormate}}</span>
                        </div>
                        <div>
                          <span class='tit'>回访状态</span>
                          <span class="content_tit">{{customer_info.contract_Detail.is_connect ?'已回访':'未回访'}}</span>
                        </div>
                        <div>
                          <span class='tit'>其他附件</span>
                          <div class='content_tit content_album'>
                            <div v-for='(item,key) in customer_info.contract_Detail.album' class='imgs_box' v-if='key !="photo"'>
                              <p>{{dataAblum[key]}}</p>
                              <div v-if='item'>
                                <img :src="img.uri" alt="" v-for='img in item' :key='img.id' data-magnify=""
                                  data-caption="图片查看器" :data-src="img.uri" v-if='img.uri'>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span='6' class='detail_col'>
                    <h5>房屋信息</h5>
                    <div>
                      <span class='tit'>房屋地址</span>
                      <span class="content_tit">{{customer_info.contract_Detail.house_extension&&customer_info.contract_Detail.house_extension.address
                        || '--'}}</span>
                    </div>
                  </el-col>
                  <el-col :span='6' class='detail_col' v-if='customer_info.contract_Detail.is_agency == 1 && customer_info.contract_Detail.agency_info'>
                    <h5>中介信息</h5>
                    <div class='detail_col_box  detail_col_box2'>
                      <div>
                        <span class='tit'>中介名称</span>
                        <span class="content_tit">{{customer_info.contract_Detail.agency_info&&customer_info.contract_Detail.agency_info.agency_name
                          || '--' }}</span>
                      </div>
                      <div>
                        <span class='tit'>中介价格</span>
                        <span class="content_tit">{{customer_info.contract_Detail.agency_info&&customer_info.contract_Detail.agency_info.agency_price_now
                          || '--' +
                          "元"}}</span>
                      </div>
                      <div>
                        <span class='tit'>中介姓名</span>
                        <span class="content_tit">{{customer_info.contract_Detail.agency_info&&customer_info.contract_Detail.agency_info.agency_user_name
                          || '--'}}</span>
                      </div>
                      <div>
                        <span class='tit'>中介电话</span>
                        <span class="content_tit">{{customer_info.contract_Detail.agency_info&&customer_info.contract_Detail.agency_info.agency_phone
                          || '--'}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <!--历史工单-->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 2'>
                  <div class='nothing' v-if='history_info.dataCount == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content' v-for='history in history_info.data' :key='history.id'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          {{history.content}}
                        </p>
                        <span class='status1'>{{history.follow_name}}</span>
                      </div>
                      <div class='order_content_box'>
                        <p class='order_title2'>
                          <span>{{history.type_name}}工单</span>
                          {{history.next_follow_time}}
                        </p>
                        <span v-if='history.type == 697 && history.follow_status == 338'>报销金额 {{'￥'+
                          history.reimburse_money}}</span>
                        <span v-else-if='history.type == 697 && history.follow_status == 338'>已结束维修</span>
                        <span v-else-if='history.follow_status != 338'>处理中</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleHistoryChange" :current-page="history_info.page" layout="total,  prev, pager, next, jumper"
                    :total="history_info.dataCount" v-if='history_info.dataCount > 0'>
                  </el-pagination>
                </div>
                <!--来电记录-->
                <div class='custmer_info custmer_info1' v-if='addOrderChosen == 3'>
                  <div class='nothing' v-if='temporaryRecord.dataCount == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='order_content  order_content2' v-for='temp in temporaryRecord.data' :key='temp.id'>
                      <div class='order_content_box'>
                        <p class='order_title1'>
                          <span>工单内容</span>
                          {{temp.content}}
                        </p>
                        <span class='status1'>{{temp.follow_time}}</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="handleTemporayChange" :current-page="temporaryRecord.page" layout="total,  prev, pager, next, jumper"
                    :total="temporaryRecord.dataCount" v-if='temporaryRecord.dataCount > 0'>
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseAddOrder">新增</el-button>
          <el-button type="info" size="small" @click="handleCloseOrder">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!--工单详情-->
    <LjDialog :visible="detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container dialog_detail" v-if='detail_visible&&detail_form'>
        <div class="dialog_header">
          <h3>{{ orderTypeObj[detail_form.type] || "普通"}}工单</h3>
        </div>
        <div class="dialog_main">
          <div class="back_info scroll_bar">
            <el-row :gutter="20">
              <el-col :span='14'>
                <p class='detail_tit'>工单详情</p>
                <!-- 报销工单 -->
                <el-form label-width='80px' v-if='detail_form.type == 1'>
                  <el-form-item label='创建时间'>
                    <el-input v-model="detail_form.create_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='房屋地址'>
                    <el-input v-model="detail_form.house_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='回复电话'>
                    <el-input v-model="detail_form.replay_phone" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='紧急程度'>
                    <el-input v-model="detail_form.emergency_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <!-- 水费 -->
                  <el-form-item label='报销类型' v-if='detail_form.reimburse_water'>
                    <el-input v-model="detail_form.reimburse_water" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='报销金额' v-if='detail_form.reimburse_water'>
                    <el-input v-model="detail_form.reimburse_water_money" type="text" disabled> </el-input>
                  </el-form-item>
                  <!-- 电费 -->
                  <el-form-item label='报销类型' v-if='detail_form.reimburse_electricity'>
                    <el-input v-model="detail_form.reimburse_electricity" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='报销金额' v-if='detail_form.reimburse_electricity'>
                    <el-input v-model="detail_form.reimburse_electricity_money" type="text" disabled> </el-input>
                  </el-form-item>
                  <!-- 燃气费 -->
                  <el-form-item label='报销类型' v-if='detail_form.reimburse_gas'>
                    <el-input v-model="detail_form.reimburse_gas" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='报销金额' v-if='detail_form.reimburse_gas'>
                    <el-input v-model="detail_form.reimburse_gas_money" type="text" disabled> </el-input>
                  </el-form-item>
                  <!-- 物业费 -->
                  <el-form-item label='报销类型' v-if="detail_form.reimburse_property">
                    <el-input v-model="detail_form.reimburse_property" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='报销金额' v-if="detail_form.reimburse_property">
                    <el-input v-model="detail_form.reimburse_property_money" type="text" disabled> </el-input>
                  </el-form-item>
                  <!-- 维修费 -->
                  <el-form-item label='报销类型' v-if="detail_form.reimburse_service">
                    <el-input v-model="detail_form.reimburse_service" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='报销金额' v-if="detail_form.reimburse_service">
                    <el-input v-model="detail_form.reimburse_service" type="text" disabled> </el-input>
                  </el-form-item>
                  <!-- 其他 -->
                  <el-form-item label='报销类型' v-if="detail_form.reimburse_other">
                    <el-input v-model="detail_form.reimburse_other" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='报销金额' v-if="detail_form.reimburse_other">
                    <el-input v-model="detail_form.reimburse_other" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='处理人'>
                    <el-input v-model="detail_form.reimburse_property" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='部门'>
                    <el-input v-model="detail_form.reimburse_property_money" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='截止时间'>
                    <el-input v-model="detail_form.finish_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='工单内容' style='width:100%;'>
                    <el-input v-model="detail_form.content" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='照片' style='width:100%;'>
                    <div style="width: 90%;text-align: left">
                      <img v-for="tmp in detail_form.imagic" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                        :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                    </div>
                  </el-form-item>
                </el-form>
                <!-- 投诉工单 -->
                <el-form label-width='80px' v-if='detail_form.type == 699'>
                  <el-form-item label='创建时间'>
                    <el-input v-model="detail_form.create_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='房屋地址'>
                    <el-input v-model="detail_form.house_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='投诉类型'>
                    <el-input v-model="detail_form.type_of_complaint" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='投诉渠道'>
                    <el-input v-model="detail_form.channel_of_complaint" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='被投诉人'>
                    <el-input v-model="detail_form.complained_user_id" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='回复电话'>
                    <el-input v-model="detail_form.replay_phone" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='紧急程度'>
                    <el-input v-model="detail_form.emergency_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='处理人'>
                    <el-input v-model="detail_form.operate_user_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='部门'>
                    <el-input v-model="detail_form.operate_org_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='截止时间'>
                    <el-input v-model="detail_form.finish_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='工单内容' style='width:100%;'>
                    <el-input v-model="detail_form.content" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='照片' style='width:100%;'>
                    <div style="width: 90%;text-align: left">
                      <img v-for="tmp in detail_form.imagic" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                        :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                    </div>
                  </el-form-item>
                </el-form>
                <!-- 普通工单 -->
                <el-form label-width='80px' v-else>
                  <el-form-item label='创建时间'>
                    <el-input v-model="detail_form.create_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='房屋地址'>
                    <el-input v-model="detail_form.house_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='回复电话'>
                    <el-input v-model="detail_form.replay_phone" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='紧急程度'>
                    <el-input v-model="detail_form.emergency_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='处理人'>
                    <el-input v-model="detail_form.operate_user_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='部门'>
                    <el-input v-model="detail_form.operate_org_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='截止时间'>
                    <el-input v-model="detail_form.finish_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='工单内容' style='width:100%;'>
                    <el-input v-model="detail_form.content" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='照片' style='width:100%;'>
                    <div style="width: 90%;text-align: left">
                      <img v-for="tmp in detail_form.imagic" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                        :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                    </div>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span='10'>
                <div class='detail_tit'>
                  <span>跟进进度</span>
                  <b @click='handleAddRecord' v-if='detail_form.type == 699'>+</b>
                </div>
                <div class='detail_box scroll_bar'>
                  <div class="content flex" v-for='follow in detail_form.follow_data' :key='follow.payper' v-if='detail_form.follow_data'>
                    <div class='detail_dialog_left'>
                      <p>{{follow.create_name}}</p>
                      <p>{{follow.next_follow_time}}</p>
                    </div>
                    <div class="detail_dialog_center">
                      <div class="circle"></div>
                    </div>
                    <div class='detail_dialog_right'>
                      <p>{{follow.follow_status_name || '暂无'}}</p>
                      <p>{{follow.content}}</p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog_footer">
          <el-button type="info" size="small" @click="handleTransfer">转交</el-button>
          <el-button type="info" size="small" @click="handleNotice">通知</el-button>
          <el-button type="danger" size="small" @click="handleEnd" v-if='selects!=338'>结束</el-button>
        </div>
      </div>
    </LjDialog>
    <!--新增跟进记录-->
    <LjDialog :visible="followRecord_visible" :size="{width: 720 + 'px',height: 480 + 'px'}" @close="handleCloseAddNewRecord">
      <div class="dialog_container followRecord">
        <div class="dialog_header">
          <h3>新增跟进记录</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='80px'>
            <el-row :gutter="10" width='100%'>
              <el-col :span="12">
                <el-form-item label="工单状态">
                  <el-radio v-model="followRecord.type" label="1">跟进中</el-radio>
                  <el-radio v-model="followRecord.type" label="2">已完成</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if='chooseTab !== 338 && followRecord.type == 2'>
                <el-form-item label="投诉有效性">
                  <el-radio v-model="followRecord.emergency" label="1">有效</el-radio>
                  <el-radio v-model="followRecord.emergency" label="2">无效</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='followRecord.type == 1'>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <el-select v-model="followRecord.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='chooseTab !==338 && followRecord.type == 2' v-for='(com,index) in followRecord.pay_method'
              :key='"comp"+index'>
              <el-col :span="8">
                <el-form-item label="认责人">
                  <el-select placeholder="请选择" v-model='com.type'>
                    <el-option v-for='label in complainedType' :key='label.label' :value='label.value' :label="label.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="handlerOrgan('add_record_renze',index)" readonly v-model="com.name" placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="认责金额" class='record_money'>
                  <el-input placeholder="请填写" v-model='com.money'></el-input>
                  <i class='icons icon_add' v-if='index == 0' @click='addComplaintsType'></i>
                  <i class='icons icon_del' v-else @click="delComplaintsType(index)"></i>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%'>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="跟进记录">
                  <el-input placeholder="请填写" type='textarea' v-model="followRecord.note"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="上传图片">
                  <Ljupload size='40' v-model='followRecord.album'></Ljupload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleAddNewRecord">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseAddNewRecord">取消</el-button>
        </div>
      </div>
    </LjDialog>
    <!-- 人员选择 -->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart"></DepartOrgan>
    <!-- 财务记录 -->
    <ljDialog :visible='financial_visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseFinancial'>
      <div class="dialog_container recordList">
        <div class="dialog_header">
          <h3>财务记录</h3>
        </div>
        <div class='dialog_main'>
          <el-table :data="financial.table" height="480px" highlight-current-row header-row-class-name="tableHeader"
            style="width: 100%" v-if='financial.table_count > 0'>
            <el-table-column key="应付时间" align="center" prop="time" label="应付时间"></el-table-column>
            <el-table-column key="实付时间" align="center" prop="real_time" label="实付时间"></el-table-column>
            <el-table-column key="应付金额" align="center" prop="money" label="应付金额"></el-table-column>
            <el-table-column key="实付金额" align="center" label="实付金额">
              <template slot-scope="scope">
                <span>{{scope.row.real_money}}</span>
                <el-tooltip class="item" effect="light" :content="scope.row.real_money" placement="right">
                  <i class='warn_icon'></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <p v-else>暂无数据</p>
          <el-pagination @current-change="handleFinancialCurrentPage" :current-page="financial.page" layout="total,  prev, pager, next, jumper"
            :total="financial.table_count" v-if='financial.table_count > 0'>
          </el-pagination>
        </div>
      </div>
    </ljDialog>
    <!-- 报销记录 -->
    <ljDialog :visible='expense_visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseExpense'>
      <div class="dialog_container recordList">
        <div class="dialog_header">
          <h3>财务记录</h3>
        </div>
        <div class='dialog_main'>
          <el-table :data="expense.table" height="480px" highlight-current-row header-row-class-name="tableHeader"
            style="width: 100%">
            <el-table-column key="创建时间" align="center" prop="time" label="应付时间"></el-table-column>
            <el-table-column key="结算时间" align="center" prop="real_time" label="实付时间"></el-table-column>
            <el-table-column key="报销金额" align="center" prop="money" label="应付金额"></el-table-column>
            <el-table-column key="实付金额" align="center" label="实付金额">
              <template slot-scope="scope">
                <span>{{scope.row.real_money}}</span>
                <el-tooltip class="item" effect="light" :content="scope.row.real_money" placement="right">
                  <i class='warn_icon'></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination @current-change="handleExpenseCurrentPage" :current-page="expense.page" layout="total,  prev, pager, next, jumper"
            :total="expense.table_count">
          </el-pagination>
        </div>
      </div>
    </ljDialog>
    <!-- 回访记录 -->
    <lj-dialog :visible="record_visible" :size="{width: 720 + 'px',height: 680 + 'px'}" @close="handleCloserecord">
      <div class="dialog_container detail_dialog">
        <div class="dialog_header">
          <h3>回访记录</h3>
        </div>
        <div class='dialog_main'>
          <ul v-if='temporaryRecord.dataCount> 0'>
            <li v-for='item in  temporaryRecord.data'>
              <div class='detail_dialog_left'>
                <p>{{item.add_user || '----'}}</p>
                <p>{{item.time}}</p>
              </div>
              <div class="detail_dialog_center">

                <div class='circle'></div>
              </div>
              <div class='detail_dialog_right' v-if='item.is_connect== 0'>
                <p>未接通</p>
              </div>
              <div class='detail_dialog_right' v-else>
                <p class='detail_dialog_note'>{{item.remark}}</p>
                <el-rate class='detail_dialog_rato' v-model="item.star" disabled score-template="{value}">
                </el-rate>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </lj-dialog>
    <!-- 退租记录 -->
    <ljDialog :visible='without_visible' :size="{width: 720 + 'px',height: 680 + 'px'}" @close='handkeCloseWithout'>
      <div class="dialog_container recordList">
        <div class="dialog_header">
          <h3>退租记录</h3>
        </div>
        <div class='dialog_main'>
          <el-table :data="without.table" height="480px" highlight-current-row header-row-class-name="tableHeader"
            style="width: 100%">
            <el-table-column key="退租时间" align="center" prop="time" label="退租时间"></el-table-column>
            <el-table-column key="退房时间" align="center" prop="real_time" label="退租时间"></el-table-column>
            <el-table-column key="退款金额" align="center" label="退租时间">
              <template slot-scope="scope">
                <span>{{scope.row.real_money}}</span>
                <el-tooltip class="item" effect="light" :content="scope.row.real_money" placement="right">
                  <i class='warn_icon'></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination @current-change="handleWithoutCurrentPage" :current-page="without.page" layout="total,  prev, pager, next, jumper"
            :total="without.table_count">
          </el-pagination>
        </div>
      </div>
    </ljDialog>
    <!-- 转交 -->
    <TransferDialog :visible='transfer_visible' :data="currentRow" @close='handleCloseTranfer' />
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import { workOrderSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import DeleteDialog from '../components/delete-dialog';
import AddDialog from '../components/add-dialog';
import TransferDialog from '../components/transfer-dialog';
import LjDialog from '../../common/lj-dialog.vue';
import StaffOrgan from '../../common/staffOrgan.vue'
import DepartOrgan from '../../common/departOrgan';
import Ljupload from '../../common/lightweightComponents/lj-upload'

export default {
  name: "index",
  components: { SearchHigh, MenuList, DeleteDialog, AddDialog, LjDialog, StaffOrgan, DepartOrgan, Ljupload, TransferDialog },
  data () {
    return {
      customService,
      visibleStatus: false,
      showSearch: false, // 显示高级搜索
      searchData: { // 高级搜索参数
        status: 'workOrder',
        data: []
      },
      searchParams: {  //高级搜索
        create_time: [],
        department: [],
        emergency: '',
        end_time: [],
        search: '',
        staff: [],
        type: ''
      },
      currentPage: 1,//当前页
      chooseTab: 336, //待处理 跟进中 已完成
      selects: [
        {
          id: 336,
          title: '待处理',
        },
        {
          id: 337,
          title: '跟进中',
        },
        {
          id: 338,
          title: '已完成',
        }
      ],
      market_server: globalConfig.market_server,

      //tableList
      tableData: [],
      tableDateCount: 0,
      currentRow: null,
      orderTypeObj: {
        1: '报销',
        2: '核实信息',
        3: '催缴',
        4: '续租',
        5: '调房',
        6: '退租',
        697: '报修',
        698: '转租',
        699: '投诉',
        700: '其他'
      },
      //删除row
      delete_visible: false,
      // 增加
      add_visible: false,
      //催办
      urgedDeal_visible: false,
      urgedDeal: {
        note: '',
        person: [],
        personName: ''
      },
      //创建新工单
      createOrder_visible: false,
      createOrder_span: 8,
      createOrder: {
        house_id: '',
        house_name: '', //房屋名称
        type: '',  // 工单类型
        operate_user: { // 处理人
          id: '',
          name: '',
        },
        operate_org: { // 处理部门 
          id: '',
          name: ''
        },
        replay_phone: '', // 回复电话
        emergency: '', // 紧急程度
        next_follow_time: '', //跟进时间
        content: '', // 工单内容
        album: [], //上传图片
        complain_type: '', // 投诉类型
        complain_channel: '', //投诉渠道
        complained_user: { // 被投诉人
          id: '',
          name: ''
        },
        reimburse_user: { //报销人
          id: '',
          name: ''
        },
        reimburse: [ //报销明细
          {
            type: '',
            money: '',
            disable: [false, false, false, false, false],
          }
        ]
      },
      departModule: false, //部门选择
      departData: {
        dataType: '',
        num: 1,
      },
      staffModule: false, // 选择人员
      organData: {
        num: 1
      },
      currentStaff: '',//当前选择人员的对象
      currentOrg: '',//当前选择部门的对象

      addOrderChosen: 1,  // 新建工单 客户信息 历史工单 来电记录
      addOrderChosen_options: [
        {
          title: '客户信息',
          id: 1
        }, {
          title: '历史工单',
          id: 2
        }, {
          title: '来电记录',
          id: 3
        }
      ],
      orderType: [
        {
          label: '报销',
          value: 1
        },
        {
          label: '核实信息',
          value: 2
        },
        {
          label: '催缴',
          value: 3
        },
        {
          label: '续租',
          value: 4
        },
        {
          label: '调房',
          value: 5
        },
        {
          label: '退租',
          value: 6
        },
        {
          label: '报修',
          value: 697
        },
        {
          label: '转租',
          value: 698
        },
        {
          label: '投诉',
          value: 699
        },
        {
          label: '其他',
          value: 700
        }
      ],
      expenseType: [
        {
          label: '水费',
          value: 1,
        },
        {
          label: '电费',
          value: 2
        },
        {
          label: '燃气',
          value: 3
        },
        {
          label: '物业费',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      expenseTypeDisable: [],
      complaintsType: [
        {
          label: 'A类原则性投诉',
          value: 1
        },
        {
          label: 'B类重大投诉',
          value: 2
        },
        {
          label: 'C类一般性投诉(被动)',
          value: 3
        },
        {
          label: 'D类一般性投诉(主动)',
          value: 4
        },
      ],
      complaintsChannels: [
        {
          label: '400客服',
          value: 1
        },
        {
          label: '回访',
          value: 2
        },
        {
          label: '微信',
          value: 3
        },
        {
          label: '微博',
          value: 4
        },
        {
          label: '贴吧',
          value: 5
        }
      ],

      customer_search: '', // 新建工单模糊搜索
      customer_info: {
        page: 1,
        limit: 5,
        count: 0,
        data: [],
        contract_Detail: null
      },
      show_Contract_Detail: false,
      chosenCustomer: null,
      history_info: { //历史工单
        page: 1,
        dataCount: 0,
        data: []
      },
      temporaryRecord: {  // 来电记录
        page: 1,
        dataCount: 0,
        data: []
      },
      // 工单详情
      detail_visible: false,
      detail_form: null,
      //新增跟进记录
      followRecord_visible: false,
      followRecord: {
        type: '',
        emergency: '',
        note: '',
        pay_method: [
          {
            id: '',
            type: '',
            name: '',
            money: ''
          }
        ],
        album: []
      },
      complainedType: [
        {
          label: '业务员',
          value: 0
        },
        {
          label: '片区经理',
          value: 1
        },
        {
          label: '房东',
          value: 2
        },
        {
          label: '现租客',
          value: 3
        },
        {
          label: '公司',
          value: 4
        },
        {
          label: '前租客',
          value: 5
        }
      ],
      currentMethod: null, //记录当前操作
      financial_visible: false, // 财务记录
      financial: {
        page: 1,
        table_count: 1,
        table: [
          {
            time: '2019.1.22',
            real_time: '2019.1.22',
            money: '300',
            real_money: '300'
          }
        ]
      },
      expense_visible: false,
      expense: {
        page: 1,
        table_count: 1,
        table: [
          {
            time: '2019.1.22',
            real_time: '2019.1.22',
            money: '300',
            real_money: '300'
          }
        ]
      },
      record_visible: false,
      record_table: [],
      without_visible: false,
      without: {
        page: 1,
        count: 1,
        table: [
          {
            time: '2019.1.22',
            real_time: '2019.1.22',
            money: '300',
            real_money: '300'
          }
        ]
      },
      dataAblum: {
        identity_photo: '证件照片',
        bank_photo: '银行卡照片',
        photo: '合同照片',
        water_photo: '水表照片',
        electricity_photo: '电表',
        gas_photo: '气表照片',
        checkin_photo: '交接单照片',
        auth_photo: '委托书照片',
        deposit_photo: '押金照片',
        promise: '承诺书照片',
        property_photo: '房产证',
        water_card_photo: '水卡',
        electricity_card_photo: '电卡',
        gas_card_photo: '气卡'
      },
      transfer_visible: false,
      sureEnding_visible: false,
      sureEnding_check: null,
      seeRecord: [
        {
          label: '回访记录',
          value: 1,
        },
        {
          label: '财务记录',
          value: 2,
        }, {
          label: '退租记录',
          value: 3,
        }, {
          label: '报销记录',
          value: 4,
        }
      ],
      seeRecord_status: 0,
      currentIndex: null
    }
  },
  mounted () {
    this.getDataList();
  },
  activated () {
  },
  filters: {
    contractStatusFormate (item) {
      const { start_at, end_at, end_real_at, end_type } = item
      let startAt = new Date(start_at).getTime(),
        endAt = new Date(end_at).getTime(),
        nowAt = new Date().getTime();
      if (startAt > nowAt) {
        return '未生效'
      }
      if (startAt <= nowAt && endAt > nowAt && !end_real_at) {
        return '生效中'
      }
      if (endAt >= nowAt && !end_real_at) {
        return '已过期'
      }
      if (end_real_at || end_type) {
        return '已终止'
      }
      // 未生效：  start_at 大于当前日期
      // 生效中： start_at 小于当前日期 并且 end_at 大于当前日期，并且 end_real_at 为null
      // 过期：    end_at 小于当前日期，并且 end_real_at 为null
      // 结束：    end_real_at  不为null 或者 end_type 不为 null
    }
  },
  watch: {
    createOrder: {
      handler (newVal) {
        if (newVal.type == 699 || newVal.type == 1) {
          this.createOrder_span = 6
        } else {
          this.createOrder_span = 8
        }
      },
      deep: true
    },
  },
  computed: {},
  methods: {
    // 用户信息分页
    handleCustomerChange (val) {
      this.customer_info.page = val
      this.addOrder_search()
    },
    handleCloseAddOrder () {
      console.log(this.chosenCustomer)
      if (!this.chosenCustomer) {
        this.$LjNotify('warning', {
          title: '提示',
          message: '数据未填写'
        });
        return
      }

      this.createOrder_visible = false
      this.add_visible = true
      this.currentMethod = 'created'
    },
    // 取消新增
    handleCloseOrder () {
      this.createOrder_visible = false
      this.add_visible = false
      this.show_Contract_Detail = false
      this.chosenCustomer = null
      this.seeRecord_status = 0
      // 将用户列表清空
      this.customer_info = {
        page: 1,
        dataCount: 0,
        data: [],
        contract_Detail: null
      }
      this.history_info = {
        page: 1,
        dataCount: 0,
        data: []
      }
      this.temporaryRecord = {
        page: 1,
        dataCount: 0,
        data: []
      }
      this.createOrder = {
        house_id: '',
        house_name: '', //房屋名称
        type: '',  // 工单类型
        operate_user: { // 处理人
          id: '',
          name: '',
        },
        operate_org: { // 处理部门 
          id: '',
          name: ''
        },
        replay_phone: '', // 回复电话
        emergency: '', // 紧急程度
        next_follow_time: '', //跟进时间
        content: '', // 工单内容
        album: [], //上传图片
        complain_type: '', // 投诉类型
        complain_channel: '', //投诉渠道
        complained_user: { // 被投诉人
          id: '',
          name: ''
        },
        reimburse_user: { //报销人
          id: '',
          name: ''
        },
        reimburse: [ //报销明细
          {
            type: '',
            money: '',
            disable: [false, false, false, false, false],
          }
        ]
      },
        this.customer_search = ''
    },
    // 选择报销类型
    chosenComplaintsType (val) {
      this.expenseTypeDisable = []
      this.createOrder.reimburse.forEach(el => {
        this.expenseTypeDisable.push(el.type)
      })
    },
    getDataList () {
      this.showLoading(true);
      let params = {
        type: this.searchParams.type || 0,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab,
        search: this.searchParams.search,
        create_time: this.searchParams.create_time,
        finish_time: this.searchParams.end_time,
        operate_user_id: this.searchParams.staff,
        operate_org_id: this.searchParams.department,
        emergency: this.searchParams.emergency,
      }

      this.$http.get(this.market_server + `v1.0/csd/work_order`, params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.tableDateCount = res.data.all_count;
        } else {
          this.tableData = [];
          this.tableDateCount = 0;
        }
        this.showLoading(false);
      })
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = workOrderSearch
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.currentPage = 1;
        this.searchParams = val
        this.getDataList()
      }
    },
    // 切换 待处理 跟进中 已完成
    changeTabs (id) {
      if (this.chooseTab != id) {
        this.chooseTab = id;
        this.getDataList()
      }
    },
    // 催办
    handleCuiBan (row) {
      this.urgedDeal_visible = true
      this.currentRow = row
    },
    // 关闭催办
    handleCloseUrgedDeal (params) {
      if (params) {
        let option = {
          work_order_id: this.currentRow.id,
          user: this.urgedDeal.person,
          content: this.urgedDeal.note
        }
        this.$http.post(`${this.market_server}v1.0/csd/work_order/notice`, option).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.getDataList()
          }
        })
      }
      this.urgedDeal_visible = false
      this.urgedDeal = {
        note: null,
        person: null,
        personName: null
      }
      this.currentRow = null
    },
    // 删除
    handleDeleteRow (row) {
      this.currentRow = row
      this.delete_visible = true
    },
    //关闭删除
    handleCloseDelete (val) {
      if (val) { //确定删除
        this.$http.delete(`${this.market_server}v1.0/csd/work_order/delete/${this.currentRow.id}`).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.delete_visible = false
            this.getDataList()
          }
        })
      } else {
        this.currentRow = null
        this.delete_visible = false
      }

    },
    handlerOrgan (params, index) {
      this.staffModule = true
      this.currentStaff = params
      this.currentIndex = index || 0
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        if (this.currentStaff == 'cuiban') {
          this.urgedDeal.personName = names
          this.urgedDeal.person = ids
        } else if (this.currentStaff == 'add_record_renze') {
          this.followRecord.pay_method[this.currentIndex].name = names
          this.followRecord.pay_method[this.currentIndex].id = ids
        } else {
          this.createOrder[this.currentStaff] = {
            name: names,
            id: ids
          }
        }
        this.currentIndex = 0
        this.currentStaff = ''
      }
    },
    handlerDepart (params) {
      this.departModule = true
      this.currentOrg = params
    },
    // 关闭 选择部门
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (ids != 'close') {
        this.createOrder[this.currentOrg] = {
          name: str,
          id: ids
        }
        this.currentOrg = ''
      }
    },
    // 创建新工单
    addComplaintsType () {
      this.createOrder.reimburse.push({
        type: '',
        money: ''
      })
    },
    delComplaintsType (index) {
      this.createOrder.complaintsType.splice(index, 1)
    },
    // 新建工单 客户信息 历史工单 来电记录
    chosenOptions (id) {
      if (this.addOrderChosen != id) {
        this.addOrderChosen = id
        id == 2 && this.history_search() // 历史工单
        id == 3 && this.temporary_search() // 来电
      }
    },
    // 查看记录
    chosenActiveRecord (val) {
      this.seeRecord_status = val
      if (val == 1) { //回访
        this.record_visible = true
        this.temporary_search()
      }
      if (val == 2) { // 财务
        this.financial_visible = true
      }
      if (val == 3) { // 退租
        this.without_visible = true
      }
      if (val == 4) { // 报销
        this.expense_visible = true

      }
    },
    // 历史工单搜索
    history_search () {
      if (this.chosenCustomer) {
        let history = {
          type: 0,
          page: this.history_info.page,
          limit: 5,
          search: this.chosenCustomer.contract_num,
        }
        this.$http.get(`${this.market_server}v1.0/csd/work_order/history`, history).then(res => {
          if (res.code === 200) {
            this.history_info.data = res.data.data
            this.history_info.dataCount = res.data.all_count
          }
        })
      }

    },
    // 来电记录
    temporary_search () {
      if (this.chosenCustomer) {
        this.$http.get(`${this.market_server}v1.0/csd/revisit/${this.chosenCustomer.contract_type}/${this.chosenCustomer.contract_id}`).then(res => {
          if (res.code === 200) {
            this.temporaryRecord.data = res.data.data
            this.temporaryRecord.dataCount = res.data.all_count
          }
        })
      }
    },
    // 模糊搜索
    addOrder_search () {
      this.customer_info.chosenCustomer = null
      this.customer_info.contract_Detail = null
      this.show_Contract_Detail = false
      let params = {
        type: 3,
        search: this.customer_search,
        limit: 5,
        page: this.customer_info.page
      }
      this.$http.get(this.market_server + `v1.0/market/customer/orderCustomer`, params).then(res => {
        if (res.code === 200) {
          this.customer_info.data = res.data.data
          this.customer_info.count = res.data.count
        }
      })
    },
    // 历史工单分页
    handleHistoryChange (val) {
      this.history_info.page = val
      this.history_search()
    },
    // 来电记录 分页
    handleTemporayChange (val) {
      this.temporaryRecord.page = val
      this.temporary_search()
    },
    changeCustmInfo (val) {
      this.createOrder.house_id = val.house_id
      this.createOrder.house_name = val.house_name
      this.createOrder.chooseTab = val.contract_type
      this.$http.get(this.market_server + `v1.0/market/contract/${val.contract_type}/${val.contract_id}`).then(res => {
        if (res.code === 200) {
          this.customer_info.contract_Detail = res.data
          this.show_Contract_Detail = true
        }
      })

    },
    // tbale 分页
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDataList()
    },
    // 双击 详情
    tableDblClick (row) {
      //判断工单类型
      this.currentRow = row
      this.$http.get(this.market_server + `v1.0/csd/work_order/ServiceDetail/${row.id}`).then(res => {
        if (res.code === 200) {
          this.detail_form = res.data.order_data
          this.detail_form.follow_data = res.data.follow_data
          this.detail_visible = true;
        }
      })

    },
    handleCloseDetail () {
      this.detail_visible = false;
      this.currentRow = null
      this.detail_form = null
    },
    // 转交
    handleTransfer () {
      this.detail_visible = false
      this.transfer_visible = true
    },
    handleCloseTranfer (transfer) {
      this.transfer_visible = !transfer
    },
    // 通知
    handleNotice () {
      this.detail_visible = false
      this.handleCuiBan(this.currentRow)
    },
    //结束
    handleEnd () {
      this.detail_visible = false
      this.sureEnding_visible = true
    },
    handleCloseSure (isSure) {
      if (isSure) {

        // 跟进工单中的结束
        if (this.currentMethod == 'addRecord') {
          this.addRecordFun(isSure)
          return
        }
        // sureEnding_check
        let option = {
          work_order_id: this.currentRow.id,
          payer_all_money: this.currentRow.payer_all_money || 0,
          flag: this.sureEnding_check ? 1 : 0
        }

        this.$http.post(`${this.market_server}v1.0/csd/work_order/finish`, option).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });

          if (res.code === 200) {
            this.sureEnding_visible = false
            this.currentRow = null
            this.detail_form = null
            this.sureEnding_check = null
            this.getDataList()
          }
        })

      } else {
        this.sureEnding_visible = false
        this.currentRow = null
        this.detail_form = null
      }
    },
    handleAddRecord () {
      this.followRecord_visible = true
      this.detail_visible = false
    },

    // 新增记录
    handleAddNewRecord () {
      this.followRecord_visible = false
      this.currentMethod = 'addRecord'
      if (this.followRecord.folow_status == 337) {
        this.add_visible = true
      } else {
        this.sureEnding_visible = true
      }
    },
    addRecordFun (par) {
      if (par) {
        let params = this.followRecord,
          pay_method = [];
        if (params.type == 2) {
          params.pay_method.forEach(el => {
            pay_method.push([el.type || '', el.name || '', el.money || ''])
          });
        }
        params.pay_method = pay_method
        params.work_order_id = this.currentRow.id

        this.$http.post(`${this.market_server}v1.0/csd/work_order/follow`, params).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });

          this.add_visible = false
        })
      } else {
        this.add_visible = false
      }

      this.followRecord = {
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
        pay_method: [
          {            type: '',
            name: '',
            money: ''          }
        ]
      }
    },
    //确认添加
    handleCloseAdd (params) {
      if (this.currentMethod == 'addRecord') {
        this.addRecordFun(params)
      }

      if (this.currentMethod == 'created') {
        this.createOrderFun(params)
      }

      this.currentMethod = null
    },
    createOrderFun (isCreate) {
      if (isCreate) {
        let order = {
          house_id: this.chosenCustomer.house_id,
          house_name: this.chosenCustomer.house_name,
          contract_id: this.chosenCustomer.contract_id,
          contract_num: this.chosenCustomer.contract_num,
          contract_type: this.chosenCustomer.contract_type,
          type: this.createOrder.type,
          album: this.createOrder.album,
          content: this.createOrder.content,
          operate_user_id: this.createOrder.operate_user.id,
          operate_user_name: this.createOrder.operate_user.name,
          operate_org_id: this.createOrder.operate_org.id,
          replay_phone: this.createOrder.replay_phone,
          emergency: this.createOrder.emergency,
          complained_user_name: this.createOrder.complained_user.name,
          complained_user_id: this.createOrder.complained_user.id,
          complain_type: this.createOrder.complain_type,
          type_of_complaint: this.createOrder.complain_channel,
          next_follow_time: this.createOrder.next_follow_time,
        }
        console.log(this.createOrder)

        this.$http.post(`${this.market_server}v1.0/csd/work_order`, order).then(res => {
          this.$LjNotify('warning', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.handleCloseOrder()
            this.getDataList()
          }
        })
      } else {
        this.handleCloseOrder()
      }
    },
    handleCloseAddNewRecord () {
      this.followRecord_visible = false
      this.detail_form = null
      this.followRecord = {
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
        ablum: [],// 上传图片
        pay_method: [
          {            type: '',
            name: '',
            money: ''          }
        ]
      }
    },
    addComplaintsType () {
      this.followRecord.pay_method.push({
        id: '',
        type: '',
        name: '',
        money: ''
      })
    },
    delComplaintsType (index) {
      this.followRecord.pay_method.splice(index, 1)
    },

    // 财务记录 换页
    handleFinancialCurrentPage (val) {
      this.financial.page = val
    },
    // 财务记录 关闭
    handkeCloseFinancial () {
      this.financial_visible = false
      this.expense.page = 1
    },
    // 报销记录 换页
    handleExpenseCurrentPage (val) {
      this.expense.page = val
    },
    // 报销记录 关闭
    handkeCloseExpense () {
      this.expense_visible = false
      this.expense.page = 1
    },
    //  回访记录 关闭
    handleCloserecord () {
      this.record_visible = false
      this.record_table = []
    },
    // 退租记录 换页
    handleWithoutCurrentPage (val) {
      this.without.page = val
    },
    //  退租记录 关闭
    handkeCloseWithout () {
      this.without_visible = false
      this.without.page = 1
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    }
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/workOrder/index.scss";

@mixin workOrderImg($m, $n) {
  $url: "../../../assets/image/customService/workOrder/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name.theme1 {
  #workOrder {
    .mainListTable {
      .status1 {
        p {
          color: $colorFFF;
          @include workOrderImg("teji.png", "theme1");
        }
      }
      .status2 {
        p {
          color: #ffad0d;
          @include workOrderImg("jinji.png", "theme1");
        }
      }
      .status3 {
        p {
          color: #0c66ff;
          @include workOrderImg("zhongyao.png", "theme1");
        }
      }
    }
  }
}

#theme_name.theme2 {
  #workOrder {
  }
}

#theme_name.theme3 {
  #workOrder {
  }
}

#theme_name.theme4 {
  #workOrder {
  }
}
</style>
