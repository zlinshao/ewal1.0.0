<template>
  <div id="miantenance">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>维修保洁</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column" :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <el-button type="warning" plain @click='chosenTag_status(7)' :class="[tag_status ==7?'active-warning':'']">维修</el-button>
        <el-button type="primary" plain @click='chosenTag_status(8)' :class="[tag_status==8?'active-primary':'']">保洁</el-button>
        <div class="icons add" @click='addOrder'><b>+</b></div>
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

    <MenuList :list="customService" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>
    <!-- 催办 -->
    <LjDialog :visible="urgedDeal_visible" :size="{width: 480 + 'px',height: 340 + 'px'}" @close="handleCloseUrgedDeal">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>建立催办</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal" v-if='currentRow'>
          <el-form label-width="80px">
            <el-form-item label="发送对象">
              <el-input @focus="organSearch('cuiban')" readonly v-model="urgedDeal.personName" :placeholder="currentRow.operate_user_name"></el-input>
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
    <!-- 转交 -->
    <LjDialog :visible="transfer_visible" :size="{width: 480 + 'px',height: 340 + 'px'}" @close="handleCloseTranfer(false)">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>转交</h3>
        </div>
        <div class="dialog_main borderNone urgedDeal" v-if='currentRow'>
          <el-form label-width="80px">
            <el-form-item label="转交对象">
              <el-input @focus="organSearch('transfer')" readonly v-model="transfer.personName" placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item label="转交原因">
              <el-input v-model="transfer.note" type="textarea" placeholder="请输入" :row="10"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleCloseTranfer(true)">确定</el-button>
          <el-button type="info" size="small" @click="handleCloseTranfer(false)">取消</el-button>
        </div>
      </div>
    </LjDialog>

    <!--新增跟进记录-->
    <LjDialog :visible="followRecord_visible" :size="{width: 960 + 'px',height: 640 + 'px'}" @close="handleCloseAddNewRecord">
      <div class="dialog_container followRecord">
        <div class="dialog_header">
          <h3>新增跟进记录</h3>
        </div>
        <div class="dialog_main">
          <el-form label-width='100px'>
            <el-row :gutter="20" width='100%'>
              <el-col :span="8">
                <el-form-item label="工单状态">
                  <el-radio v-model='followRecord_info.folow_status' label="337">跟进中</el-radio>
                  <el-radio v-model='followRecord_info.folow_status' label="338">已完成</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='followRecord_info.folow_status == 338'>
              <el-col :span="8">
                <el-form-item label="维修金额">
                  <el-input placeholder="请填写" v-model='followRecord_info.pay_all_money'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='followRecord_info.folow_status == 337'>
              <el-col :span="8">
                <el-form-item label="紧急程度">
                  <el-select v-model="followRecord_info.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='followRecord_info.folow_status == 338' v-for='(item,index) in pay_method'
              :key='"follow" + index'>
              <el-col :span="8">
                <el-form-item label="认责人">
                  <el-select v-model="item.type" placeholder="请选择" @change="chosenComplaintsType">
                    <el-option v-for="(exp,idex) in complainedType" :key="exp.value" :label="exp.label" :value="exp.value"
                      :disabled="complainedTypeDisable.indexOf(exp.value) > -1">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="organSearch('complained',index)" v-model='item.name' readonly placeholder="请选择"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="认责金额" class='record_money'>
                  <el-input placeholder="请填写" v-model='item.money'></el-input>
                  <i class='icons icon_add' v-if='index== 0' @click='addComplaintsType'></i>
                  <i class='icons icon_del' v-else @click="delComplaintsType(index)"></i>
                </el-form-item>

              </el-col>
            </el-row>
            <el-row :gutter="20" width='100%' v-if='followRecord_info.folow_status == 338'>
              <el-col :span="8">
                <el-form-item label="实际支付人">
                  <el-select v-model="followRecord_info.payer_type" placeholder="请选择">
                    <el-option v-for="(exp,idex) in complainedType" :key="exp.value" :label="exp.label" :value="exp.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input @focus="organSearch('payer')" readonly placeholder="业务员" v-model='followRecord_info.payer'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="跟进记录">
                  <el-input placeholder="请填写" type='textarea' v-model='followRecord_info.content'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :gutter="20" width='100%'>
                <el-form-item label="上传图片">
                  <Ljupload size='40' v-model='followRecord_info.ablum'></Ljupload>
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
    <!--新增跟进记录 认责人选择-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
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
    <!--维修详情-->
    <LjDialog :visible="detail_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseDetail">
      <div class="dialog_container dialog_detail">
        <div class="dialog_header">
          <h3>维修工单</h3>
        </div>
        <div class="dialog_main">
          <div class="back_info scroll_bar" v-if='detail_form && detail_visible'>
            <el-row :gutter="20">
              <el-col :span='14'>
                <p class='detail_tit'>工单详情</p>
                <el-form label-width='80px'>
                  <el-form-item label='创建时间'>
                    <el-input v-model="detail_form.data.create_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='房屋地址'>
                    <el-input v-model="detail_form.data.house_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='维修方'>
                    <el-input :value="detail_form.data.send_order_type == 1 ? '内部保修':'外部保修'" type="text" disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label='处理人'>
                    <el-input v-model="detail_form.data.operate_user_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='部门'>
                    <el-input v-model="detail_form.data.operate_org_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='回复电话'>
                    <el-input v-model="detail_form.data.replay_phone" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='紧急程度'>
                    <el-input v-model="detail_form.data.emergency_name" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='截止时间'>
                    <el-input v-model="detail_form.data.next_follow_time" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='工单内容' style='width:100%;'>
                    <el-input v-model="detail_form.data.content" type="text" disabled> </el-input>
                  </el-form-item>
                  <el-form-item label='照片' style='width:100%;'>
                    <div style="width: 90%;text-align: left">
                      <img v-for="tmp in detail_form.data.album.image_pic" :key="tmp.id" data-magnify="" data-caption="图片查看器"
                        :data-src="tmp.uri" :src="tmp.uri" style="width: 70px;height: 70px;margin-right: 15px" v-if="tmp.uri">
                    </div>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span='10'>
                <div class='detail_tit'>
                  <span>工单详情</span>
                  <b @click='handleAddRecord'>+</b>
                </div>
                <div class='detail_box scroll_bar'>
                  <div class="content flex" v-for='follow in detail_form.record' :key='follow.payper' v-if='detail_form.record'>
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
          <el-button type="danger" size="small" @click="handleEnd">结束</el-button>
        </div>
      </div>
    </LjDialog>
    <!--新建工单-->
    <LjDialog :visible="addOrder_visible" :size="{width: 1200 + 'px',height: 800 + 'px'}" @close="handleCloseOrder">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新建维修单</h3>
        </div>
        <div class="dialog_main addOrder_dialog">
          <div class="back_info scroll_bar">
            <el-row :gutter="10">
              <el-col :span='6'>
                <p class='el-col-p'><i class='icon house_name'></i>房屋地址</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder_form.house_name' disabled></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon type'></i><span>类型</span></p>
                <div class='input_box'>
                  <el-radio v-model="createOrder_form.type" label="7">维修</el-radio>
                  <el-radio v-model="createOrder_form.type" label="8">保洁</el-radio>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon post'></i><span>派单至</span></p>
                <div class='input_box'>
                  <el-select placeholder="请选择" v-model='createOrder_form.send_order_type'>
                    <el-option label="内部保修" value="1"> </el-option>
                    <el-option label="外部保修" value="2"> </el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon handler'></i><span>处理人</span></p>
                <div class='input_box'>
                  <el-input @focus="organSearch('add')" readonly v-model="createOrder_form.operate_user_name"></el-input
                    placeholder="请选择">
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon org'></i><span>部门</span></p>
                <div class='input_box'>
                  <el-input @focus="departSearch" readonly v-model="createOrder_form.operate_org_name" placeholder="请选择"></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon phone'></i><span>回复电话</span></p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model='createOrder_form.replay_phone'></el-input>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon endTime'></i><span>截止时间</span></p>
                <div class='input_box'>
                  <el-date-picker v-model="createOrder_form.expected_finish_time" value-format="yyyy-MM-dd" align="right"
                    type="date" placeholder="填写跟进时间">
                  </el-date-picker>
                </div>
              </el-col>

              <el-col :span="6">
                <p class='el-col-p'><i class='icon status'></i><span>紧急时间</span></p>
                <div class='input_box'>
                  <el-select v-model="createOrder_form.emergency" placeholder="请选择">
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="紧急" value="2"></el-option>
                    <el-option label="特急" value="3"></el-option>
                    <el-option label="重要" value="4"></el-option>
                  </el-select>
                </div>
              </el-col>

              <el-col :span='6'>
                <p class='el-col-p'><i class='icon content'></i>内容</p>
                <div class='input_box'>
                  <el-input placeholder="请填写" v-model="createOrder_form.content"></el-input>
                </div>
              </el-col>

              <el-col :span='18'>
                <p class='el-col-p el-col-p1'><i class='icon upload'></i>上传图片</p>
                <Ljupload size='40' v-model='createOrder_form.album'></Ljupload>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span='2' class='el-col-box'>
                <div :class='{"el-box":true,"el-box-active":addOrderChosen == option.id}' v-for='option in addOrderChosen_options'
                  @click='chosenOptions(option.id)'>
                  <p>{{option.title}}</p>
                </div>
              </el-col>
              <el-col :span='22' class='el-col-content'>
                <div class='info_search' v-if='addOrderChosen == 1'>
                  <i class='icon'></i>
                  <div class='el-input'>
                    <input type="text" placeholder="地址/合同编号/手机号/客户姓名" class="el-input__inner" v-model="customer_search"
                      v-on:keyup.enter='addOrder_search'>
                  </div>
                </div>
                <!--客户信息-->
                <div class='custmer_info' v-if='addOrderChosen == 1'>
                  <div class='nothing' v-if='customer_info.dataCount == 0'>
                    <div class="nothing_img"></div>
                    <p class='nothing_words'>这里什么都没有哦~</p>
                  </div>
                  <div class='order_content_boxes' v-else>
                    <div class='custmer_content' v-for='info in customer_info.data' :key='info.id'>
                      <el-radio v-model="current_customer" :label="info" @change="changeCustmInfo">
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
                            <span class='content_tit'>{{info.phone|| '--'}}</span>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </div>
                  </div>
                  <el-pagination @current-change="handleCustomerChange" :current-page="customer_info.page" layout="total,  prev, pager, next, jumper"
                    :total="customer_info.dataCount" v-if='customer_info.dataCount > 0'>
                  </el-pagination>
                </div>

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

    <!--确定删除-->
    <DeleteDialog :delete_visible='delete_visible' @close='handleCloseDelete'></DeleteDialog>
    <!--确定增加-->
    <AddDialog :add_visible='add_visible' @close='handleCloseAdd'></AddDialog>

    <!--选择人员-->
    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>

    <!--选择部门-->
    <DepartOrgan :module="departModule" :organData="departData" @close="hiddenDepart"></DepartOrgan>
  </div>
</template>

<script>
import SearchHigh from '../../common/searchHigh.vue'
import MenuList from '../../common/menuList.vue';
import StaffOrgan from '../../common/staffOrgan';
import DepartOrgan from '../../common/departOrgan';
import Ljupload from '../../common/lightweightComponents/lj-upload'
import { maintenanceSearch } from '../../../assets/js/allSearchData.js';
import { customService } from '../../../assets/js/allModuleList.js';
import LjDialog from '../../common/lj-dialog.vue';
import DeleteDialog from '../components/delete-dialog';
import AddDialog from '../components/add-dialog';
export default {
  name: "index",
  components: { SearchHigh, MenuList, LjDialog, StaffOrgan, DepartOrgan, Ljupload, DeleteDialog, AddDialog },
  data () {
    return {
      maintenanceSearch,
      customService,
      visibleStatus: false,
      tableData: [], // 工单列表
      tableDateCount: 0, // 工单列表count
      currentRow: null, // 当前查看的row
      currentPage: 1, //分页
      urgedDeal_visible: false, //催办
      urgedDeal: {
        note: '',
        person: [],
        personName: ''
      },
      transfer_visible: false, // 转交
      transfer: {
        note: '',
        person: [],
        personName: ''
      },
      //删除row
      delete_visible: false,
      // 增加
      add_visible: false,
      showSearch: false,
      searchData: {},
      staffModule: false,//显示人员选择
      organData: { //最多选择几个人
        num: 1
      },
      departModule: false, //部门选择
      departData: {
        num: 1,
      },
      addOrderChosen: 1,
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
      addOrder_visible: false, // 新建工单
      customer_search: '', // 模糊搜索
      customer_info: {  // 用户信息
        page: 1,
        dataCount: 0,
        data: []
      },
      current_customer: null,  // 当前选择的客户
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
      createOrder_form: { //创建工单
        house_name: '',
        type: '',
        send_order_type: '',
        operate_user_id: '',
        operate_user_name: '',
        operate_org_id: '',
        operate_org_name: '',
        replay_phone: '',
        expected_finish_time: '',
        emergency: '',
        content: '',
        album: ''
      },
      currentStaff_method: '',
      // 工单详情
      detail_visible: false,
      detail_form: null,
      staffModule: false,//显示人员选择
      organData: {
        num: 1
      },
      sureEnding_visible: false,  // 确定结束
      sureEnding_check: null,
      tag_status: 7, // 7是维修 8是保洁
      chooseTab: 336, // 336待处理 337处理中 338已完成
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
      // 工单列表高级搜索
      params: {
        search: '',
        create_time: [],
        finish_time: [],
        operate_user_id: '',
        operate_org_id: '',
        emergency: '',
      },
      followRecord_visible: false,
      followRecord_info: { // 新增记录
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
        ablum: [] // 上传图片
      },
      pay_method: [
        {
          type: '',
          name: '',
          money: null
        }
      ], // 认责人
      currentStaff_index: 0,
      complainedType: [ // 认责人
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
      complainedTypeDisable: [],
      market_server: globalConfig.market_server,
    }
  },
  mounted () {
    this.getDateList();
  },
  activated () {
  },
  computed: {},
  methods: {
    // 创建新工单
    addComplaintsType () {
      this.followRecord_info.reimburse.push({
        type: '',
        money: ''
      })
    },
    delComplaintsType (index) {
      this.followRecord_info.reimburse.splice(index, 1)
    },
    addRecordFun (par) {
      if (par) {
        let params = this.followRecord_info,
          pay_method = [];
        if (params.folow_status == 338 && this.pay_method[0].type) {
          this.pay_method.forEach(el => {
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
          this.followRecord_visible = false;
          this.sureEnding_visible = false
        })
      } else {
        this.followRecord_visible = false;
      }

      this.followRecord_info = {
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
      }
      this.pay_method = [
        {
          type: '',
          name: '',
          money: ''
        }
      ]// 认责人  
    },
    //工单表格数据初始化
    getDateList () {
      this.showLoading(true);
      let params = {
        type: this.tag_status,
        page: this.currentPage,
        limit: 10,
        follow_status: this.chooseTab,
        search: this.params.search,
        create_time: this.params.create_time,
        finish_time: this.params.finish_time,
        operate_user_id: this.params.operate_user_id,
        operate_org_id: this.params.operate_org_id,
        emergency: this.params.emergency
      }
      this.$http.get(`${this.market_server}v1.0/csd/work_order`, params).then(res => {
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
            this.getDateList()
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
          this.currentRow = null
          this.delete_visible = true
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.delete_visible = false
            this.getDateList()
          }
        })
      }

    },
    //确定新增
    handleAddNewRecord () {
      this.followRecord_visible = false
      this.currentMethod = 'addRecord'
      if (this.followRecord_info.folow_status == 337) {
        this.add_visible = true
      } else {
        this.sureEnding_visible = true
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
      this.add_visible = false
      this.currentMethod = null
    },
    // tab切换
    changeTabs (id) {
      if (this.chooseTab !== id) {
        this.chooseTab = id;
        this.getDateList()
      }
    },
    chosenTag_status (id) {
      if (this.tag_status != id) {
        this.tag_status = id
        this.getDateList()
      }
    },
    // add 工单
    addOrder () {
      this.addOrder_visible = true
    },
    chosenOptions (id) {
      if (this.addOrderChosen != id) {
        this.addOrderChosen = id
        id == 2 && this.history_search() // 历史工单
        id == 3 && this.temporary_search() // 来电
      }
    },
    changeCustmInfo (val) { // 选择用户
      this.createOrder_form.house_name = val.house_name || '--'
      this.createOrder_form.replay_phone = val.replay_phone || ''
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
    },
    // 模糊搜索 用户
    addOrder_search () {
      let params = {
        search: this.customer_search,
        limit: 5,
        page: this.customer_info.page
      }
      this.$http.get(this.market_server + `v1.0/market/customer/orderCustomer`, params).then(res => {
        if (res.code === 200) {
          this.customer_info.dataCount = res.data.count
          this.customer_info.data = res.data.data
        }
      })
    },
    // 历史工单搜索
    history_search () {
      if (this.current_customer) {
        let history = {
          type: 0,
          page: this.history_info.page,
          limit: 5,
          search: this.current_customer.contract_num,
        }
        this.$http.get(`${this.market_server}v1.0/csd/work_order/history`, history).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.history_info.data = res.data.data
            this.history_info.dataCount = res.data.all_count
          }
        })
      }

    },
    // 来电记录
    temporary_search () {
      if (this.current_customer) {
        let temporary = {
          type: -1,
          page: this.temporaryRecord.page,
          limit: 5,
          search: this.current_customer.contract_num,
        }
        this.$http.get(`${this.market_server}v1.0/csd/work_order/temporaryRecord`, temporary).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.temporaryRecord.data = res.data.data
            this.temporaryRecord.dataCount = res.data.all_count
          }
        })
      }
    },
    // 用户列表分页
    handleCustomerChange (val) {
      this.customer_info.page = val
      this.addOrder_search()
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
    handleCloseOrder () {
      this.addOrder_visible = false
      // 将用户列表清空
      this.customer_info = {
        page: 1,
        dataCount: 0,
        data: []
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
      this.customer_search = ''
      this.current_customer = null
    },
    // 关闭新增工单
    handleCloseAddOrder () {
      if (!this.current_customer) {
        this.$LjNotify('warning', {
          title: '提示',
          message: '数据未填写'
        });
        return
      }

      this.addOrder_visible = false
      this.add_visible = true
      this.currentMethod = 'created'
    },
    createOrderFun (isCreate) {
      if (isCreate) {
        let order = this.createOrder_form;
        order.house_id = this.current_customer.house_id
        order.house_name = this.current_customer.house_name
        order.contract_id = this.current_customer.contract_id
        order.contract_type = this.current_customer.contract_type
        order.type_name = this.createOrder_form.type == 7 ? "维修" : "保洁"

        this.$http.post(`${this.market_server}v1.0/csd/work_order/ServiceOrder`, order).then(res => {
          this.$LjNotify('warning', {
            title: '提示',
            message: res.message
          });
          if (res.code === 200) {
            this.handleCloseOrder()
            this.getDateList()
          }
        })
      } else {
        this.handleCloseOrder()
      }
    },
    //新增跟进记录
    handleAddRecord () {
      this.detail_visible = false
      this.followRecord_visible = true
    },
    //选择人员
    organSearch (par, idex) {
      this.staffModule = true
      this.currentStaff_method = par
      if (par == 'complained') {
        this.currentStaff_index = idex
      }
    },
    // 关闭 选择人员
    hiddenOrgan (ids, names, arr) {
      this.staffModule = false;
      if (ids !== 'close') {
        if (this.currentStaff_method == 'add') {  // 创建工单 选择处理人
          this.createOrder_form.operate_user_name = names
          this.createOrder_form.operate_user_id = ids

        }
        if (this.currentStaff_method == 'cuiban') {  // 催办 选择处理人
          this.urgedDeal.personName = names
          this.urgedDeal.person = ids
        }
        if (this.currentStaff_method == 'transfer') {  // 转交
          this.transfer.personName = names
          this.transfer.person = ids
        }

        if (this.currentStaff_method == 'complained') {
          this.$set(this.pay_method[this.currentStaff_index], 'name', names)
          this.$set(this.pay_method[this.currentStaff_index], 'id', ids)
        }

        if (this.currentStaff_method == 'payer') {
          this.followRecord_info.payer = names
          this.followRecord_info.payer_id = ids
        }
        this.currentStaff_method = ''
        this.currentStaff_index = 0
      }
    },
    //选择 部门
    departSearch () {
      this.departModule = true
    },
    // 关闭 部门
    hiddenDepart (ids, str, arr) {
      this.departModule = false
      if (ids != 'close') {
        this.createOrder_form.operate_org_name = str
        this.createOrder_form.operate_org_id = ids
      }
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
            this.getDateList()
          }
        })

      } else {
        this.sureEnding_visible = false
        this.currentRow = null
        this.detail_form = null
      }
    },
    handleCloseAddNewRecord () {
      this.followRecord_visible = false
      this.detail_form = null
      this.followRecord_info = {
        folow_status: 1, // 工单状态
        emergency: '', // 紧急程度
        payer_type: '', // 实际支付人 type
        payer_id: '', // 实际支付人id
        payer: '', // 实际支付人
        pay_all_money: '', //维修金额
        content: '', // 跟进内容
        ablum: [] // 上传图片
      }
      this.pay_method = [
        {
          type: '',
          name: '',
          money: ''
        }
      ] // 认责人
    },
    // 查看详情
    tableDblClick (row) {
      this.currentRow = row
      this.$http.get(this.market_server + `v1.0/csd/work_order/ServiceDetail/${row.id}`).then(res => {
        if (res.code === 200) {

          this.detail_form = {
            data: res.data.order_data,
            record: res.data.follow_data
          }
          console.log(this.detail_form)
          this.detail_visible = true;
        }
      })
    },
    // 关闭详情
    handleCloseDetail () {
      this.detail_visible = false
    },
    // 转交
    handleTransfer () {
      this.detail_visible = false
      this.transfer_visible = true
    },
    handleCloseTranfer (transfer) {
      if (transfer) {
        let option = {
          work_order_id: this.currentRow.id,
          operate_user_id: this.transfer.person[0],
          operate_user_name: this.transfer.personName,
          content: this.transfer.note
        }

        this.$http.post(`${this.market_server}v1.0/csd/work_order/tranfer`, option).then(res => {
          this.$LjNotify('success', {
            title: '提示',
            message: res.message
          });

          if (res.code === 200) {
            this.transfer_visible = false
            this.currentRow = null
            this.getDateList()
          }
        })
      } else {
        this.transfer_visible = false
        this.currentRow = null
      }
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

    handleCurrentChange (val) {
      this.currentPage = val
      this.getDateList()
    },
    // 高级搜索
    highSearch () {
      this.showSearch = true;
      this.searchData = maintenanceSearch;
    },
    // 确认搜索
    hiddenModule (val) {
      this.showSearch = false;
      if (val !== 'close') {
        this.currentPage = 1
        this.params = val
        this.getDateList()
      }
    },
    // 客服入口
    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },
    // 选择认责人类型
    chosenComplaintsType (val) {
      this.complainedTypeDisable = []
      this.pay_method.forEach(el => {
        this.complainedTypeDisable.push(el.type)
      })
    },
  },
}
</script>

<style lang="scss">
@import "../../../assets/scss/customService/maintenance/index.scss";
</style>
