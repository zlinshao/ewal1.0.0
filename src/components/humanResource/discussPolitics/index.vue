<template>
  <div id="discussPolitics" class="discuss-politics">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1>会议管理</h1>
        <div class="date-value-container">
          <el-date-picker v-model="dateValue" type="month" placeholder="选择月">
          </el-date-picker>
        </div>
      </div>
    </div>

    <div class="main-container discuss-politics-container">
      <div class="calendar-container">
        <div class="container-left scroll_bar">
          <!--时间线-->
          <div class="timeline">
            <div class="timeline-bg"></div>
            <div @click="getCurrentSelectMonthMeetingCounts" class="monthTitle">
              <span title="本月会议数">{{monthContent}}</span>
            </div>
            <div class="eltimeline-container">
              <el-timeline>
                <el-timeline-item :key="index" :color="item.todoType==0?'#50E38F':item.todoType==1?'#FFDC75':'#FF7A3C'"
                  v-if="item.todoListTimeLine&&item.todoListTimeLine.length>0" v-for="(item,index) in daysList"
                  :timestamp="item.datetime" placement="top">
                  <el-card>
                    <div :class="{prev:item.type=='prev'}" class="timeline-item-container">
                      <div :class="{'cancel-status':contentItem.status==2,'finish-status':contentItem.status==1}" class="timeline-item-container-content-item"
                        @click="openMeetingDialog(contentItem)" :title="contentItem.content" v-for="(contentItem,contentItemIndex) in item.todoListTimeLine">
                        <div class="content-item-span">{{contentItem.content}}</div>
                        <div class="icon-list">
                          <span v-if="contentItem.status==0" title="取消" @click.stop="cancelMeeting(contentItem,index,contentItemIndex)"
                            class="icon15 icon-cancel"></span>
                          <span title="删除" @click.stop="deleteMeeting(contentItem,index,contentItemIndex)" class="icon15 icon-delete-red"></span>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>

          </div>
          <!--<div class="timeline">
            <el-timeline>
              <el-timeline-item
                :key="index"
                :color="item.todoType==0?'#50E38F':item.todoType==1?'#FFDC75':'#FF7A3C'"
                v-if="item.todoList&&item.todoList.length>0" v-for="(item,index) in daysList" :timestamp="item.datetime"
                placement="top">
                <el-card>
                  <div :class="{prev:item.type=='prev'}" class="timeline-item-container">
                    <div :class="{'cancel-status':contentItem.status==2}" class="timeline-item-container-content-item"
                         @click="openMeetingDialog(contentItem)"
                         :title="contentItem.content" v-for="(contentItem,contentItemIndex) in item.todoList">
                      {{contentItem.content}}
                      <div class="icon-list">
                        <span v-if="contentItem.status==0" title="取消"
                              @click.stop="cancelMeeting(contentItem,index,contentItemIndex)"
                              class="icon20 icon-cancel"></span>
                        <span title="删除"
                              @click.stop="deleteMeeting(contentItem,index,contentItemIndex)"
                              class="icon20 icon-delete"></span>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>-->
        </div>
        <div class="container-right scroll_bar">
          <div class="calendar-week">
            <div class="ui-container">
              <div v-for="(item,index) in weekList" class="calendar-week-item">
                <div class="calendar-week-item-container">
                  <span :class="{weekday:index>4}" class="week-item-date">{{item}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="calendar-day">
            <div class="ui-container">
              <div @click="showAddNewMeetingDialog(item)" v-for="item in daysList" class="calendar-day-item">
                <div class="calendar-day-item-container">
                  <div class="calendar-day-item-container-tip">
                    <el-badge :value="item.todoList.length>0?item.todoList.length:''" class="item">
                      <div :class="{'gray':item.type=='prev'||item.type=='next','current':item.today}" class="calendar-day-item-container-date">
                        {{item.date}}
                      </div>
                    </el-badge>
                  </div>
                  <div class="calendar-day-item-container-content">
                    <div @click.stop="openMeetingDialog(contentItem)" :class="[contentItem.status==0?'default':contentItem.status==1?'warning':'danger']"
                      :title="contentItem.content" v-for="(contentItem,index) in item.todoList" v-if="index<2">
                      {{contentItem.content}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!--会议详情 1.0 -->
    <!--<lj-dialog :visible="meeting_detail_dialog_visible"
               :size="{width: 800 + 'px',height: 800 + 'px'}"
               @close="meeting_detail_dialog_visible = false">
      <div class="dialog_container" style="margin: 20px 0 0 0">
        <div class="items-bet dialog_header">
          <h3>{{meeting_detail_form.meetingType}} {{meeting_detail_form.meetingTime}}</h3>

          <div class="header_right" style="height: 30px">
            <i title="编辑" v-if="meeting_detail_form.status==0" class="icon icon-edit"
               @click="showEditMeetingDialog"></i>
          </div>
        </div>
        <div class="dialog_main flex-center borderNone" style="margin: 20px 0 0 0">

          <div class="meeting_detail_form_container">
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议主题</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.name}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">申请人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.applyPerson}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议室</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.meetingRoom}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">主持人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.compere}}</div>
                </el-col>
              </el-row>
            </div>
            &lt;!&ndash;<div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">应到/实到</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content"><span class="form-item-content-span-red">19/19</span></div>
                </el-col>
              </el-row>
            </div>&ndash;&gt;
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议提醒</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    会议开始前<span
                    class="form-item-content-span-input">{{meeting_detail_form.remind_data.hour}}</span>小时<span
                    class="form-item-content-span-input">{{meeting_detail_form.remind_data.minute}}</span>分钟提醒
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">参加人员</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    {{meeting_detail_form.participant}}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">上传附件</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <lj-upload size="40" disabled="disabled" :data="meeting_detail_form.attachment"></lj-upload>
                    &lt;!&ndash;<div class="icon-upload"></div>&ndash;&gt;
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">反馈</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="60"
                              placeholder="请输入评论 限制60字" v-model="comment_content"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>

          </div>

        </div>
        <div class="dialog_footer" style="padding: 0;text-align: right">
          <div style="padding-right: 40px">
            <el-button type="primary" plain @click="publishComment(meeting_detail_form.id)">发布</el-button>
          </div>

        </div>

        <div class="comment-container">
          <hr style="width: 80%;background-color:#E5E5E5;height: 2px;border: none"/>
          <lj-comment :comment-list="comment_list" style="height: 350px;width: 80%;"></lj-comment>
        </div>

      </div>
    </lj-dialog>-->

    <!--会议详情1.1  -->
    <!--<lj-dialog :visible="meeting_detail_dialog_visible"
               :size="{width: 800 + 'px',height: 800 + 'px'}"
               @close="meeting_detail_dialog_visible = false">
      <div class="dialog_container scroll_bar meeting-detail-container">
        <div class="dialog_header" >
          <h3>{{meeting_detail_form.meetingType}} {{meeting_detail_form.meetingTime}}</h3>

          <div class="header_right" style="height: 30px">
            <i title="编辑" v-if="meeting_detail_form.status!=2" class="icon30 icon-edit"
               @click="showEditMeetingDialog"></i>
          </div>
        </div>
        <div class="borderNone" style="margin: 20px 0 0 0">

          <div class="meeting_detail_form_container">
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议主题</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.name}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">申请人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.applyPerson}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议室</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.meetingRoom}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">主持人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.compere}}</div>
                </el-col>
              </el-row>
            </div>
            &lt;!&ndash;<div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">应到/实到</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content"><span class="form-item-content-span-red">19/19</span></div>
                </el-col>
              </el-row>
            </div>&ndash;&gt;
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议提醒</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    会议开始前<span
                    class="form-item-content-span-input">{{meeting_detail_form.remind_data.hour}}</span>小时<span
                    class="form-item-content-span-input">{{meeting_detail_form.remind_data.minute}}</span>分钟提醒
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">参加人员</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    {{meeting_detail_form.participant}}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">附件</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <lj-upload size="40" disabled="disabled" :data="meeting_detail_form.attachment"></lj-upload>
                    &lt;!&ndash;<div class="icon-upload"></div>&ndash;&gt;
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">反馈</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="60"
                              placeholder="请输入评论 限制60字" v-model="comment_content"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>

          </div>

        </div>
        <div class="dialog_footer" style="padding: 0;text-align: right">
          <div style="padding-right: 40px">
            <el-button type="primary" plain @click="publishComment(meeting_detail_form.id)">发布</el-button>
          </div>

        </div>
        <div class="hr">
          <hr>
        </div>

        <lj-comment :comment-list="comment_list" style="width: 100%"></lj-comment>

      </div>
    </lj-dialog>-->

    <!--会议详情1.2  -->
    <lj-dialog :visible.sync="meeting_detail_dialog_visible" @close="meeting_summary_editable = false;meeting_detail_choose_id=1"
      :size="{width: 1100 + 'px',height: 700 + 'px'}">
      <div class="dialog_container scroll_bar meeting-detail-container-outer">
        <div class="dialog_header">
          <h3>{{meeting_detail_form.meetingType}} {{meeting_detail_form.meetingTime}}</h3>

          <div class="header_right" style="height: 30px">
            <i title="编辑" v-if="meeting_detail_form.status!=2 && !meeting_summary_editable" class="icon30 icon-edit"
              @click="showEditMeetingDialog"></i>
          </div>
        </div>
        <div class="meeting-detail-container" style="margin: 20px 0 0 0">

          <div v-if="meeting_detail_choose_id==1" class="meeting-detail-form-container">
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议主题</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.name}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">申请人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.applyPerson}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议室</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">{{meeting_detail_form.meetingRoom}}</div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">主持人</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <name-shower type="user" :ids="meeting_detail_form.presenter_id"></name-shower>
                    <!--                    {{meeting_detail_form.compere}}-->
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">会议提醒</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    会议开始前<span class="form-item-content-span-input">{{meeting_detail_form.remind_data.hour}}</span>小时<span
                      class="form-item-content-span-input">{{meeting_detail_form.remind_data.minute}}</span>分钟提醒
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">参加人员</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <name-shower type="user" :ids="meeting_detail_form.participant"></name-shower>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">参会人数</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    {{meeting_detail_form.participantCount}}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">备注</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    {{meeting_detail_form.remark}}
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="form-item">
              <el-row :gutter="40">
                <el-col :span="4">
                  <div class="form-item-title">附件</div>
                </el-col>
                <el-col :span="20">
                  <div class="form-item-content">
                    <lj-upload size="40" disabled="disabled" :data="meeting_detail_form.attachment"></lj-upload>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="meeting_detail_choose_id==2" class="meeting-detail-form-container">

            <el-form ref="meetingSummaryFormRef" :disabled="!meeting_summary_editable" :rules="rules.meetingSummary"
              :model="meeting_summary_form" style="text-align: left" size="small" label-width="140px">

              <el-form-item label="会议附件">
                <lj-upload :disabled="true" v-model="meeting_summary_form.meeting_file_id" size="40" style="position: absolute; top: -12px;"></lj-upload>
              </el-form-item>

              <el-form-item required prop="record" label="会议记录人">
                <user-choose width="700" size="mini" v-model="meeting_summary_form.record"></user-choose>
              </el-form-item>

              <el-form-item required prop="range" label="会议纪要查看范围">
                <user-choose width="700" size="mini" v-model="meeting_summary_form.range"></user-choose>
              </el-form-item>

              <el-form-item align="center" label="会议纪要附件">
                <lj-upload :disabled="!meeting_summary_editable" v-model="meeting_summary_form.attachment" size="40"
                  style="position: absolute; top: -12px;"></lj-upload>
              </el-form-item>

              <el-form-item label="会议纪要上传人">
                {{meeting_summary_form.uploader}}
              </el-form-item>
              <el-form-item label="上传时间">
                {{meeting_summary_form.upload_time}}
              </el-form-item>

            </el-form>

            <el-form ref="remainingFormRef" :model="meeting_remaining_form" style="text-align: left" :disabled="!meeting_summary_editable"
              size="small" label-width="140px">

              <div v-for="(item,index) in meeting_remaining_form.list" :key="index">

                <el-form-item required :prop="'list.'+index+'.question'" :rules="{required: true, message: '请输入遗留问题', trigger: ['blur','change']}"
                  label="遗留问题">
                  <el-input style="width: 700px" placeholder="必填" v-model="meeting_remaining_form.list[index].question"></el-input>
                  <span v-if="index==0 && meeting_summary_editable" class="btn_add" style="position: absolute;right: 60px;top: 3px;"
                    @click="handleRemainingInfo(index)">+</span>
                  <span v-if="index>=1 && meeting_summary_editable" class="btn_add" @click="handleRemainingInfo(index,item)"
                    style="position: absolute;right: 60px;top: 3px;background-color: #D2D2D2;">-</span>
                </el-form-item>

                <el-form-item required :prop="'list.'+index+'.follow_id'" :rules="{required: true, message: '请选择跟进人', trigger: ['blur','change']}"
                  label="跟进人">
                  <user-choose width="700" num="1" title="必选" v-model="meeting_remaining_form.list[index].follow_id"></user-choose>
                </el-form-item>

                <el-form-item required :prop="'list.'+index+'.result'" :rules="{required: true, message: '请输入跟进情况', trigger: ['blur','change']}"
                  label="跟进情况">
                  <el-input style="width: 700px" v-model="meeting_remaining_form.list[index].result" title="必填"></el-input>
                </el-form-item>

                <el-form-item label="遗留问题附件">
                  <lj-upload :disabled="!meeting_summary_editable" size="40" style="position: absolute;top: -14px;"
                    v-model="meeting_remaining_form.list[index].attachment"></lj-upload>
                </el-form-item>
              </div>

            </el-form>

          </div>
          <div class="meeting-detail-vertical-toolbar">
            <div v-for="item in meeting_detail_choose_list" :class="{checked:meeting_detail_choose_id==item.id}" @click="meeting_detail_choose_id=item.id;meeting_summary_editable = false"
              class="meeting-detail-toolbar-item">
              <span class="writingMode">{{item.name}}</span>
            </div>
          </div>

        </div>
        <div class="dialog_footer" style="padding: 0;text-align: right">
          <div style="padding-right: 40px">
            <el-button v-if="!meeting_summary_editable" type="danger" @click="meeting_detail_dialog_visible=false">确定
            </el-button>
            <el-button v-if="meeting_summary_editable" type="danger" @click="handleSaveSummaryAndRemaining">保存
            </el-button>
            <el-button v-if="meeting_summary_editable" type="danger" @click="meeting_summary_editable=false">取消
            </el-button>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--会议个数详情dialog  -->
    <lj-dialog :visible="meeting_counts_dialog_visible" :size="{width: 800 + 'px',height: 600 + 'px'}" @close="meeting_counts_dialog_visible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>本月会议数:{{meeting_counts_form.length}}</h3>
        </div>
        <div class="dialog_main flex-center borderNone">

          <div class="meeting-counts-container">

            <div @click="meeting_detail_dialog_visible = true" class="form-item" v-for="item in meeting_counts_form">
              <el-row :gutter="80">
                <el-col :span="10">
                  <div class="form-item-title">{{item.name}}</div>
                </el-col>
                <el-col :span="14">
                  <div class="form-item-content">{{item.timeContent}}</div>
                </el-col>
              </el-row>
            </div>

          </div>

        </div>
      </div>
    </lj-dialog>

    <!--新建会议-->
    <lj-dialog :visible="add_meeting_dialog_visible" :size="{width: 530 + 'px',height: 800 + 'px'}" @close="add_meeting_dialog_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{add_meeting_dialog_title_type==1?'新建会议':'编辑会议'}}</h3>

          <div class="header_right">
            <div>{{add_meeting_form.currentDate}}</div>
          </div>

        </div>
        <div class="dialog_main borderNone add-meeting-container">
          <el-form ref="addMeetingForm" :rules="rules.addMeeting" :model="add_meeting_form" style="text-align: left"
            size="small" label-width="100px">

            <el-form-item required prop="name" label="会议主题">
              <el-input v-model="add_meeting_form.name" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item required prop="room_id" label="会议室">
              <dropdown-list ref="dropdown1" title="必选" :url="`${this.url}meeting/category`" code="1" v-model="add_meeting_form.room_id"></dropdown-list>

              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;" @click="openMeetingRoomOrType(1)">+</span>
            </el-form-item>

            <el-form-item required prop="meeting_type" label="会议类型">
              <dropdown-list ref="dropdown2" title="必选" :url="`${this.url}meeting/category`" code="2" v-model="add_meeting_form.meeting_type"></dropdown-list>

              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;" @click="openMeetingRoomOrType(2)">+</span>
            </el-form-item>

            <el-form-item label="会议时间">
              <date-time-picker title="必选" :clearable="false" ref="meetingTime" :width="320" date-type="timerange"></date-time-picker>
            </el-form-item>

            <el-form-item required prop="presenter_id" label="主持人">
              <user-choose title="必选" v-model="add_meeting_form.presenter_id"></user-choose>
            </el-form-item>

            <!--<el-form-item label="应到人数">
              <el-input v-model="add_meeting_form.counts" placeholder="请输入应到人数" style="width: 320px">
              </el-input>
            </el-form-item>-->

            <el-form-item label="会议提醒">
              <div class="form-item-content">
                会议开始前
                <el-input-number size="mini" :min="0" :max="23" style="width: 90px" v-model="add_meeting_form.remind_data.hour"></el-input-number>
                小时
                <el-input-number size="mini" :min="0" :max="59" style="width: 90px" v-model="add_meeting_form.remind_data.minute"></el-input-number>
                分钟提醒
                <!--                会议开始前<span class="span-input">3</span>小时<span class="span-input">20</span>分钟提醒-->
              </div>
            </el-form-item>

            <el-form-item required prop="participants" label="选择人员">
              <user-choose title="必选" v-model="add_meeting_form.participants"></user-choose>
            </el-form-item>

            <el-form-item label="参会人数">
              <span>{{add_meeting_form.participants.length}}</span>
            </el-form-item>

            <el-form-item label="备注">
              <el-input type="textarea" v-model="add_meeting_form.remark" placeholder="请输入备注" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item align="center" label="上传附件">
              <lj-upload v-model="add_meeting_form.attachment" size="40" style="position: absolute; top: -12px;"></lj-upload>
            </el-form-item>

            <el-form-item align="center" label="会议通知">
              <el-checkbox v-model="add_meeting_form.is_send">发送会议通知</el-checkbox>
            </el-form-item>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button v-if="add_meeting_dialog_title_type==1" size="small" type="danger" @click="addNewMeeting">提交
          </el-button>
          <el-button v-if="add_meeting_dialog_title_type==2" size="small" type="danger" @click="editMeeting">提交
          </el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加会议室-->
    <lj-dialog :visible="add_meeting_room_dialog_visible" :size="{width: 500 + 'px',height: 300 + 'px'}" @close="add_meeting_room_dialog_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加会议室</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-room-container">
          <el-form ref="addMeetingRoomForm" :rules="rules.addMeetingRoom" :model="add_meeting_room_form" style="text-align: left"
            size="small" label-width="100px">
            <el-form-item required prop="meetingRoom" label="会议室名称">
              <el-input v-model="add_meeting_room_form.meetingRoom" placeholder="必填" style="width: 300px">
              </el-input>
            </el-form-item>
            <div @click="viewMeetingRoomOrType(1)" class="right-tip">查看会议室</div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveMeetingRoomOrType(1)">保存</el-button>
          <el-button size="small" type="info" @click="add_meeting_room_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--查看会议室dialog-->
    <lj-dialog :visible="view_meeting_room_dialog_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="view_meeting_room_dialog_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>会议室名称</h3>
        </div>
        <div class="dialog_main borderNone view-meeting-room-container">
          <div class="meeting-room-list">

            <div v-for="item in view_meeting_room_data" class="meeting-room-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">{{item.name}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icon-delete-red" @click="deleteMeetingRoomOrType(item,1)"></span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </lj-dialog>

    <!--添加会议类型-->
    <lj-dialog :visible="add_meeting_type_dialog_visible" :size="{width: 500 + 'px',height: 300 + 'px'}" @close="add_meeting_type_dialog_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加会议类型</h3>
        </div>
        <div class="dialog_main borderNone add-meeting-type-container">
          <el-form ref="addMeetingTypeForm" :rules="rules.addMeetingType" :model="add_meeting_type_form" style="text-align: left"
            size="small" label-width="100px">
            <el-form-item required prop='meetingType' label="类型名称">
              <el-input v-model="add_meeting_type_form.meetingType" placeholder="必填" style="width: 300px">
              </el-input>
            </el-form-item>
            <div @click="viewMeetingRoomOrType(2)" class="right-tip">查看会议类型</div>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveMeetingRoomOrType(2)">保存</el-button>
          <el-button size="small" type="info" @click="add_meeting_type_dialog_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--查看会议类型dialog-->
    <lj-dialog :visible="view_meeting_type_dialog_visible" :size="{width: 500 + 'px',height: 700 + 'px'}" @close="view_meeting_type_dialog_visible = false">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>会议类型名称</h3>
        </div>
        <div class="dialog_main borderNone view-meeting-type-container">
          <div class="meeting-type-list">
            <div v-for="item in view_meeting_type_data" class="meeting-type-row">
              <el-row>
                <el-col :span="12">
                  <div class="item-title">{{item.name}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="item-content">
                    <span class="icon-delete-red" @click="deleteMeetingRoomOrType(item,2)"></span>
                  </div>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>
      </div>
    </lj-dialog>

    <work-info :work-info="work_info" :event-data-list="event_data_list" @change="handleChangeDate"></work-info>

    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

  </div>
</template>

<script>
import utils from '../../../utils/myUtils';
import MenuList from '../../common/menuList.vue';
import LjDialog from '../../common/lj-dialog.vue';
import DateTimePicker from '../../common/lightweightComponents/datetimepicker';
import StaffOrgan from '../../common/staffOrgan.vue';
import WorkInfo from '../components/work-info';
import DropdownList from '../../common/lightweightComponents/dropdown-list';
import LjComment from '../../common/lightweightComponents/LjComment';
import UserChoose from '../../common/lightweightComponents/UserChoose';
import LjUpload from '../../common/lightweightComponents/lj-upload';
import NameShower from '../../common/lightweightComponents/NameShower';
import _ from "lodash";
import { humanResource, resourceDepart } from '../../../assets/js/allModuleList.js';

export default {
  name: "index",
  components: {
    MenuList,
    LjDialog,
    DateTimePicker,
    StaffOrgan,
    WorkInfo,
    UserChoose,
    DropdownList,
    LjUpload,
    LjComment,
    NameShower,
  },
  data () {
    return {

      rules: {
        addMeeting: {
          name: [
            { required: true, message: '请选择会议主题', trigger: ['blur', 'change'] },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          room_id: [
            { required: true, message: '请选择会议室', trigger: ['blur', 'change'] },
            //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          meeting_type: [
            { required: true, message: '请选择会议类型', trigger: ['blur', 'change'] },
            //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          presenter_id: [
            { required: true, message: '请选择主持人', trigger: ['blur', 'change'] },
            //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          participants: [
            { required: true, message: '请选择参会人员', trigger: ['blur', 'change'] },
            //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],

        },
        addMeetingRoom: {
          meetingRoom: [
            { required: true, message: '请选择会议室', trigger: ['blur', 'change'] },
          ],
        },
        addMeetingType: {
          meetingType: [
            { required: true, message: '请选择会议类型', trigger: ['blur', 'change'] },
          ],
        },
        meetingSummary: {
          record: [
            { required: true, message: '请选择会议记录人', trigger: ['blur', 'change'] },
          ],
          range: [
            { required: true, message: '请选择会议纪要查看范围', trigger: ['blur', 'change'] },
          ],
        },
      },


      humanResource,
      resourceDepart,

      url: globalConfig.humanResource_server,

      //侧滑栏数据
      show_market: false,
      work_info: [
        { work: '穿铠甲', val: '10' },
        { work: '攻下小城池', val: '6' },
        { work: '攻下大城池', val: '3' },
        { work: '攻下国家', val: '3' },
      ],

      event_data_list: [
        {
          title: '事件占有率:',
          value: [
            { value: 500, name: '一般' },
            { value: 300, name: '特殊' },
            { value: 200, name: '紧急' }
          ]
        },
        {
          title: '十佳萌新:',
          value: [
            { value: 500, name: '一般' },
            { value: 300, name: '特殊' },
            { value: 200, name: '紧急' }
          ]
        },
        {
          title: '十佳老司机:',
          value: [
            { value: 500, name: '一般' },
            { value: 300, name: '特殊' },
            { value: 200, name: '紧急' }
          ]
        },
        {
          title: '赏善令:',
          value: [
            { value: 500, name: '一般' },
            { value: 300, name: '特殊' },
            { value: 200, name: '紧急' }
          ]
        }
      ],
      event_data: [
        { value: 500, name: '一般' },
        { value: 300, name: '特殊' },
        { value: 200, name: '紧急' }
      ],

      //chooseTab: null,//tab切换
      visibleStatus: false,//弹出部门

      dateValue: new Date(),
      weekList: ['一', '二', '三', '四', '五', '六', '日'],
      monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      daysList: [],
      monthContent: '',

      /*dialog 群组*/



      //会议个数dialog
      meeting_counts_dialog_visible: false,
      meeting_counts_form: [],


      //新建会议
      currentSelectionDate: '',
      add_meeting_dialog_title_type: 1,
      add_meeting_dialog_visible: false,
      add_meeting_form: {//会议form表单
        currentDate: '',
        name: '',//会议主题--会议名称
        room_id: '',//会议室id
        meeting_type: '',//会议类型id
        //meetingTime:'',//会议时间
        start_time: '',//会议开始时间
        end_time: '',//会议结束时间
        presenter_id: [],//主持人id数组
        //counts:'',//应到人数
        //meetingTips:{},//会议提醒
        remind_data: {
          minute: 0,
          hour: 1,
        },
        participants: [],//参会人员数组
        attachment: [],//附件id
        remark: '',//备注
        is_send: false,
      },


      //会议详情
      meeting_detail_dialog_visible: false,
      meeting_detail_form: {
        name: '',//开会主题
        applyPerson: '',//申请人
        meetingRoom: '',//会议室
        compere: '',//主持人
        //arrival: '19/19',//应到/实到
        remind_data: {
          hour: 0,
          minute: 0
        },
        participant: [],//参加人员
        attachment: [],//上传附件
        is_send: false,//是否已经发送通知
        remark: '',//备注
      },
      comment_content: '',//评论内容
      comment_list: [],//评论列表

      meeting_detail_choose_id: 1,
      meeting_detail_choose_list: [
        {
          id: 1,
          name: '基本信息',
        },
        {
          id: 2,
          name: '会议纪要',
        }
      ],
      meeting_summary_editable: false,//会议纪要及历史遗留问题 是否可以编辑
      meeting_summary_form: {//会议纪要表单
        demo: '',
        record: [],//会议记录人
        range: [],//会议纪要查看范围
        attachment: [],//附件=》会议纪要文件
        meeting_file_id: [],//各个上传者上传的文件集合
        uploader: '',//上传者
        upload_time: '',//上传时间
      },
      meeting_remaining_form: {//历史遗留问题form表单
        list: [
          {
            follow_id: null,//跟进人id int类型
            question: '',//遗留问题
            attachment: [],//遗留问题附件
            result: '',//跟进情况
          }
        ],
      },

      //添加会议室dialog
      add_meeting_room_dialog_visible: false,
      add_meeting_room_form: {
        meetingRoom: '',//会议室
      },

      //查看会议室dialog
      view_meeting_room_dialog_visible: false,
      view_meeting_room_data: [],//data


      //添加会议类型dialog
      add_meeting_type_dialog_visible: false,
      add_meeting_type_form: {
        meetingType: '',//会议类型
      },

      //查看会议类型dialog
      view_meeting_type_dialog_visible: false,
      view_meeting_type_data: [],
    }
  },
  mounted () {
    //this.initDaysList(this.dateValue);
  },
  activated () {
  },
  watch: {
    dateValue: {
      handler () {
        this.initDaysList(this.dateValue);
      },
      immediate: true
    },
  },
  computed: {},
  methods: {
    //添加评论
    publishComment (meetingId) {
      debugger
      if (this.comment_content) {
        let params = {
          "content": this.comment_content,
          "parent_id": 0
        };
        this.$http.post(`${this.url}/meeting/meeting/${meetingId}/comments`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: '评论成功',
            });
            this.comment_content = '';
            this.getCommentList(meetingId);//获取评论当前会议id下的列表
          }
        });
      } else {
        this.$LjNotify('warning', {
          title: '警告',
          message: '请输入评论内容',
        });
      }
    },

    //获取评论列表
    getCommentList (meetingId) {
      this.comment_list = [];
      this.$http.get(`${this.url}meeting/meeting/${meetingId}/comments`).then(res => {
        if (res.code.endsWith('0')) {
          let arr = res.data.data;
          this.comment_list = _.map(arr, (item) => {
            return {
              id: item.id,//id
              name: item.user ?.name,//用户姓名
              comment: item.content,//评论
              photo: (item.user ?.avatar || '').replace('\\', ''),
              datetime: item.created_at,//评论时间
            }
          });
        }
      });
    },


    //获取当前选取月份会议详情列表
    getCurrentSelectMonthMeetingCounts () {
      this.meeting_counts_dialog_visible = true;
      this.meeting_counts_form = [];
      let startDate = utils.formatDate(this.dateValue, 'yyyy-MM-01 00:00:00');
      let endDate = this.lastTimeOfMonth(this.dateValue);
      let params = {
        date: [startDate, endDate]
      };
      // this.$http.get(`${this.url}/meeting/meeting?date[]=${startDate}&date[]=${endDate}`).then(res => {
      this.$http.get(`${this.url}/meeting/meeting`, params).then(res => {
        if (res.code.endsWith('0')) {
          this.meeting_counts_form = _.forEach(res.data.data, (value) => {
            value.timeContent = `${utils.formatDate(value.start_time, 'MM-dd hh:mm')} - ${utils.formatDate(value.end_time, 'hh:mm')}`;
            return value;
          });
        }
      });
    },

    //添加新会议
    addNewMeeting () {

      this.$refs['addMeetingForm'].validate((valid) => {
        if (valid) {//成功
          let curDate = this.currentSelectionDate.datetime;
          let params = {
            ...this.add_meeting_form,
            start_time: `${curDate} ${this.$refs.meetingTime.startTime}:00`,
            end_time: `${curDate} ${this.$refs.meetingTime.endTime}:00`,
          };
          delete params['currentDate'];
          this.$http.post(`${this.url}/meeting/meeting`, params).then(res => {
            this.$LjMessageEasy(res, () => {
              this.add_meeting_dialog_visible = false;
              this.initDaysList(this.dateValue);
            });
            return res;
          }).then(res => {
            if (this.add_meeting_form.is_send) {
              let id = res.data.id;
              this.$http.get(`${this.url}meeting/meeting/${id}/todo`).then(res2 => {
                this.$LjNotifyEasy(res2);
              });
            }
            //let id = res.data.id;
          });
        }
      });


    },

    //修改会议
    editMeeting () {

      this.$refs['addMeetingForm'].validate((valid) => {
        if (valid) {//成功
          let id = this.add_meeting_form.id;
          delete this.add_meeting_form['id'];
          debugger
          this.$http.put(`${this.url}/meeting/meeting/${id}`, this.add_meeting_form).then(res => {
            this.$LjMessageEasy(res, () => {
              this.add_meeting_dialog_visible = false;
              this.meeting_detail_dialog_visible = false;
            });
          });
        }
      });

    },

    //处理保存会议纪要及历史遗留问题
    handleSaveSummaryAndRemaining () {
      this.$refs['meetingSummaryFormRef'].validate(valid => {
        if (!valid) {
          return;
        }
      });
      this.$refs['remainingFormRef'].validate(valid => {
        if (!valid) {
          return;
        }
      });

      let meeting_id = this.meeting_detail_form.id;//会议id
      let params = {
        meeting_id,
        ...this.meeting_summary_form
      };
      debugger

      const promises = [];
      let promise1, promise2;
      if (params.id) {//修改
        promise1 = this.$http.put(`${this.url}meeting/minutes/${params.id}`, params).then(res => {
          return res;
          /*this.$LjMessageEasy(res,()=> {
            this.meeting_summary_editable = false;
          });*/
        });
      } else {
        promise1 = this.$http.post(`${this.url}meeting/minutes`, params).then(res => {//添加
          return res;
          /*this.$LjMessageEasy(res,()=> {
            this.meeting_summary_editable = false;
          });*/
        });
      }
      promises.push(promise1);

      let list = this.meeting_remaining_form.list;
      list.forEach(function (item, index) {
        item.meeting_id = meeting_id;
        item.follow_id = item.follow_id[0] || [];
      });
      promise2 = this.$http.put(`${this.url}meeting/question/${meeting_id}`, list).then(res => {
        return res;
      });
      promises.push(promise2);

      Promise.all(promises).then(([res, res2]) => {
        if (res.code.endsWith('0') && res2.code.endsWith('0')) {
          this.$LjMessage('success', {
            title: '成功',
            msg: '操作成功',
          });
          this.meeting_summary_editable = false;
        } else {
          this.$LjMessage('error', {
            title: '失败',
            msg: '操作失败',
          });
        }
      });


    },


    //显示修改会议dialog
    showEditMeetingDialog () {
      if (this.meeting_detail_choose_id == 2) {
        this.meeting_summary_editable = true;
        return;
      }

      let startTime = this.meeting_detail_form.start_time;
      let endTime = this.meeting_detail_form.end_time;
      debugger
      if (this.myUtils.judgeDateInRange(startTime, endTime)) {
        this.$LjMessage('warning', {
          title: '警告',
          msg: '当前会议正在进行,不允许修改',
        });
        return;
      }

      this.add_meeting_dialog_visible = true;
      this.add_meeting_dialog_title_type = 2;

      this.add_meeting_form = {//会议form表单
        id: this.meeting_detail_form.id,
        currentDate: `${utils.formatDate(this.meeting_detail_form.start_time, 'MM月dd日')}`,
        name: this.meeting_detail_form.name,//会议主题--会议名称
        room_id: this.meeting_detail_form.room_id,//会议室id
        meeting_type: this.meeting_detail_form.meeting_type,//会议类型id
        start_time: this.meeting_detail_form.start_time,//会议开始时间
        end_time: this.meeting_detail_form.end_time,//会议开始时间
        presenter_id: this.meeting_detail_form.presenter_id,//主持人id数组
        remind_data: this.meeting_detail_form.remind_data,
        participants: this.meeting_detail_form.participant,//参会人员数组
        attachment: _.map(this.meeting_detail_form.attachment, 'id'),//附件id
        remark: this.meeting_detail_form.remark,//备注
      };
      debugger
    },
    //新建会议打开dialog
    showAddNewMeetingDialog (item) {
      this.add_meeting_dialog_title_type = 1;
      this.add_meeting_form = {
        currentDate: '',
        name: '',//会议主题--会议名称
        room_id: '',//会议室id
        meeting_type: '',//会议类型id
        //meetingTime:'',//会议时间
        start_time: '',//会议开始时间
        end_time: '',//会议开始时间
        presenter_id: [],//主持人id数组
        //counts:'',//应到人数
        //meetingTips:{},//会议提醒
        remind_data: {
          minute: 0,
          hour: 1,
        },
        participants: [],//参会人员数组
        attachment: [],//附件id
        remark: '',
        is_send: false,
      };
      this.add_meeting_form.currentDate = utils.formatDate(item.datetime, 'MM月dd日');
      //this.add_meeting_form = [];
      this.currentSelectionDate = item;

      //item.datetime  '2019-04-05'
      this.add_meeting_dialog_visible = true;
    },
    //打开会议相关
    openMeetingRoomOrType (type) {//type = 1 添加会议室    type = 2 添加会议类型
      if (type == 1) {//会议室
        this.add_meeting_room_dialog_visible = true;
      } else if (type == 2) { //会议类型
        this.add_meeting_type_dialog_visible = true;
      }
    },
    //保存会议类型相关
    saveMeetingRoomOrType (type) {
      let name;
      debugger
      if (type == 1) {//会议室
        this.add_meeting_room_dialog_visible = true;
        name = this.add_meeting_room_form.meetingRoom;

        this.$refs['addMeetingRoomForm'].validate((valid) => {
          if (valid) {//成功
            if (name) {
              let params = { name, type };
              this.$http.post(`${this.url}/meeting/category`, params).then(res => {
                if (res.code.endsWith('0')) {
                  this.$LjNotify('success', {
                    title: '成功',
                    message: '添加成功',
                  });
                  this.$refs[`dropdown${type}`].update();
                  this.add_meeting_room_dialog_visible = false;
                  this.add_meeting_type_dialog_visible = false;
                  this.add_meeting_room_form.meetingRoom = '';
                  this.add_meeting_type_form.meetingType = '';
                } else {
                  this.$LjNotify('error', {
                    title: '失败',
                    message: res.msg
                  });
                }
              });
            }
          }
        });
      } else if (type == 2) { //会议类型
        this.add_meeting_type_dialog_visible = true;
        name = this.add_meeting_type_form.meetingType;
        this.$refs['addMeetingTypeForm'].validate((valid) => {
          if (valid) {//成功
            if (name) {
              let params = { name, type };
              this.$http.post(`${this.url}/meeting/category`, params).then(res => {
                if (res.code.endsWith('0')) {
                  this.$LjNotify('success', {
                    title: '成功',
                    message: '添加成功',
                  });
                  this.$refs[`dropdown${type}`].update();
                  this.add_meeting_room_dialog_visible = false;
                  this.add_meeting_type_dialog_visible = false;
                  this.add_meeting_room_form.meetingRoom = '';
                  this.add_meeting_type_form.meetingType = '';
                } else {
                  this.$LjNotify('error', {
                    title: '失败',
                    message: res.msg
                  });
                }
              });
            }
          }
        });
      }
    },
    //查看会议相关
    viewMeetingRoomOrType (type) {
      if (type == 1) {
        this.view_meeting_room_dialog_visible = true;
      } else if (type == 2) {
        this.view_meeting_type_dialog_visible = true;
      }

      let params = { type }
      this.$http.get(`${this.url}/meeting/category`, params).then(res => {
        if (res.code.endsWith('0')) {
          if (type == 1) {
            this.view_meeting_room_data = res.data.data;
          } else if (type == 2) {
            this.view_meeting_type_data = res.data.data;
          }
        }
      });
    },
    //删除会议类型相关
    deleteMeetingRoomOrType (item, type) {
      if (item && item.id) {
        this.$LjConfirm({ icon: 'delete' }).then(() => {
          this.$http.delete(`${this.url}/meeting/category/${item.id}`).then(res => {
            if (res.code.endsWith('0')) {
              this.$LjNotify('success', {
                title: '成功',
                message: '删除成功',
              });
              this.viewMeetingRoomOrType(type);
              this.$refs[`dropdown${type}`].update();
            } else {
              this.$LjNotify('error', {
                title: '失败',
                message: res.msg,
              });
            }
          });
        })
      }
    },

    handleChangeDate (id) {

    },

    //删除会议
    deleteMeeting (item, index, todoListIndex) {
      this.$LjConfirm({ content: '确定要删除会议吗？' }).then(res => {
        this.$http.delete(`${this.url}/meeting/meeting/${item.id}`).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: '删除成功',
            });
            this.initDaysList(this.dateValue);
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
            });
          }
        });
      });
    },

    //取消会议
    cancelMeeting (item, index, todoListIndex) {
      this.$LjConfirm({ content: '确定要取消会议吗？' }).then(res => {
        let params = {
          status: 2
        };
        this.$http.put(`${this.url}/meeting/meeting/${item.id}/status`, params).then(res => {
          if (res.code.endsWith('0')) {
            this.$LjNotify('success', {
              title: '成功',
              message: '取消成功',
            });
            this.initDaysList(this.dateValue);
            //this.daysList[index].todoList.splice(todoListIndex, 1);
          } else {
            this.$LjNotify('error', {
              title: '失败',
              message: res.msg,
            });
          }
        });
      });
    },

    //处理会议点击事件 打开会议详情表单
    openMeetingDialog (value) {
      console.log(value);
      this.meeting_detail_dialog_visible = true;
      this.meeting_detail_form = {//初始化表单
        remind_data: {
          hour: 0,
          minute: 0
        },
      };
      this.comment_content = '';
      this.$http.get(`${this.url}/meeting/meeting/${value.id}`).then(res => {
        if (res.code.endsWith('0')) {
          let item = res.data;
          //let applyPerson = _.find(item.users, {'user_id': item.user_id});//申请人
          let compere = _.map(item.presenter || [], 'user.name').join(',');
          let participant = _.map(item.participant || [], 'user.id');
          this.meeting_detail_form = {
            id: item.id,
            name: item.name,//会议名称
            applyPerson: item.user ?.name,//申请人
            meetingRoom: item.room ?.name,//会议室
            remind_data: item.remind_data,//提醒时间
            meetingType: item.type ?.name,//会议类型
            attachment: item.attachment,//附件
            //compere,//主持人
            presenter_id: _.map(item.presenter, 'user_id'),//主持人id数组
            participant,//参加人员
            participantCount: participant.length || 0,
            meetingTime: `${utils.formatDate(item.start_time, 'hh:mm')}-${utils.formatDate(item.end_time, 'hh:mm')}`,//会议时间
            status: item.status,//状态
            remark: item.remark || '',//备注


            start_time: value.start_time,
            end_time: value.end_time,
            room_id: value.room_id,
            meeting_type: value.meeting_type,
          };
        }
        return res;
      }).then(res => {
        this.meeting_summary_form = {
          record: [],//会议记录人
          range: [],//会议纪要查看范围
          attachment: [],//附件=》会议纪要文件
          meeting_file_id: [],//各个上传者上传的文件集合
          uploader: '',//上传者
          upload_time: '',//上传时间
        };
        this.meeting_remaining_form = {
          list: [
            {
              follow_id: null,//跟进人id int类型
              question: '',//遗留问题
              attachment: [],//遗留问题附件
              result: '',//跟进情况
            }
          ],
        };
        let meeting_id = res.data.id;
        this.$http.get(`${this.url}meeting/minutes/meeting/${meeting_id}`).then(res2 => {
          if (res2.code.endsWith('0')) {
            let item = res2.data;
            this.meeting_summary_form.id = item.id;
            this.meeting_summary_form.attachment = _.map(item.attachment, 'id');
            this.meeting_summary_form.range = _.cloneDeep(item.ranges || []);
            this.meeting_summary_form.record = _.cloneDeep(item.records || []);
            this.meeting_summary_form.uploader = item.user ?.name;
            this.meeting_summary_form.upload_time = item.created_at;
            //let meeting_file = _.map(item.meeting_file,'file_id');
            this.meeting_summary_form.meeting_file = item.meeting_file;
            this.meeting_summary_form.meeting_file_id = _(item.meeting_file).map('file_id').flattenDeep().uniq().value();
            delete this.meeting_summary_form.records;
            delete this.meeting_summary_form.ranges;

          }
        });
        let params2 = {
          meeting_id
        };
        this.$http.get(`${this.url}meeting/question`, params2).then(res => {
          if (res.code.endsWith('0')) {
            let mList = res.data.data;
            mList.forEach(function (value, index) {
              value.attachment = _.map(value.attachment, 'id');
              value.follow_id = [value.follow_id];
            });
            mList = _.sortBy(mList, 'id');
            this.meeting_remaining_form.list = mList;
          }
        });

      });

    },

    //添加或删除历史遗留问题
    handleRemainingInfo (idx, item) {
      if (idx == 0) {
        this.meeting_remaining_form.list.push(
          {
            follow_id: null,//跟进人id int类型
            question: '',//遗留问题
            attachment: [],//遗留问题附件
            result: '',//跟进情况
          });
      } else {
        if (item && item.id) {
          this.$LjConfirm({ content: '确认删除吗?' }).then(() => {
            this.$http.delete(`${this.url}meeting/question/${item.id}`).then(res => {
              this.$LjMessageEasy(res, () => {
                this.meeting_remaining_form.list.splice(idx, 1);
              });
            });
          });
        } else {
          this.meeting_remaining_form.list.splice(idx, 1);
        }
      }
    },


    moduleList () {
      this.visibleStatus = !this.visibleStatus;
      this.$store.dispatch('route_animation');
    },

    initDaysList (date) {
      if (date) {
        let daysList = [...this.getPrevMonthRestList(date), ...this.getCurrentMonthList(date), ...this.getNextMonthRestList(date)];
        daysList.forEach((item, index) => {
          item.id = ++index;
          item.todoListTimeLine = [];
        });
        //处理数据
        let startTime = utils.formatDate(daysList[0].datetime, 'yyyy-MM-dd hh:mm:ss');
        let endTime = utils.formatDate(daysList[daysList.length - 1].datetime, 'yyyy-MM-dd hh:mm:ss');
        let params = { data: [startTime, endTime] };

        let tempData = [];

        this.$http.get(`${this.url}/meeting/meeting`, params).then(res => {
          if (res.code.endsWith('0')) {
            tempData = res.data.data;
            //let mStatus = [];//盛放当天所有会议状态
            _.forEach(tempData, (value) => {
              let curData = utils.formatDate(value.start_time);
              let mIdx = _.findIndex(daysList, (o) => {
                return o.datetime == curData;
              });
              if (mIdx !== -1) {
                let sObj = {
                  ...value,
                  content: `${utils.formatDate(value.start_time, 'hh:mm')}-${utils.formatDate(value.end_time, 'hh:mm')} ${value.name}`
                };
                //mStatus.push(sObj.status);
                daysList[mIdx].todoType = sObj.status > (daysList[mIdx].todoType || 0) ? sObj.status : (daysList[mIdx].todoType || 0);
                if (sObj.status == 0 || sObj.status == 1) {
                  daysList[mIdx].todoList.push(sObj);
                }

                daysList[mIdx].todoListTimeLine.push(sObj);
              }
              //console.log(curData);
            });
            this.daysList = daysList;
            /*tempData.forEach((item,index)=> {
              let data = utils.formatDate(item.created_at);

            })*/
          }
        });

      } else {
        this.monthContent = '';
        this.daysList = [];
      }

    },


    /*下面为不需要业务的代码*/

    //获取date月当月天总数,参数二可获取其他月天总数(需传特定值)
    getDaysCount (date, setmonth = 0) {
      let curDate = new Date(date);
      /* 获取当前月份 */
      let curMonth = curDate.getMonth();
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1 + setmonth);
      /* 将日期设置为0 */
      curDate.setDate(0);
      /* 返回当月的天数 */
      return curDate.getDate();
    },
    //获取某月第一天是周几
    getCurrMonthFirstWeek (date) {
      let curDate = new Date(date);
      curDate.setDate(1);
      return curDate.getDay() || 7;
    },
    //获取某月最后一天是周几
    getCurrMonthLastWeek (date) {
      let curDate = new Date(date);
      curDate.setDate(this.getDaysCount(date));
      return curDate.getDay() || 7;
    },
    //获取上月存留日历几天-->日历页面前部灰色日期
    getPrevMonthRestList (date) {
      let arr = [];
      let lastMonthRest = this.getCurrMonthFirstWeek(date) - 1;//获取上月余几天
      let lastMonthCounts = this.getDaysCount(date, -1);
      for (let i = lastMonthCounts - lastMonthRest + 1; i <= lastMonthCounts; i++) {
        let obj = {
          datetime: this.getDateTimeByDay(date, i, -1),
          today: false,
          type: 'prev',//用来区分 上月本月下月字体颜色 本月黑 上下月灰
          //todoList.length>0?: '3',
          todoType: 0,//严重程度 用来区分时间线颜色
          todoList: [
            /*{
              id: 1,
              content: '09:00-11:00 周会',
              status: 0
            }, {
              id: 2,
              content: '09:00-11:00 周会',
              status: 1
            },
            {
              id: 3,
              content: '09:00-11:00 周会',
              status: 2
            },*/
          ],
          date: i
        };
        arr.push(obj);
      }
      return arr;
    },

    getCurrentMonthList (date) {
      let days = this.getDaysCount(date);
      let months = this.getCurrentMonth(date);
      this.monthContent = this.monthList[months - 1];
      let arr = [];
      let curDay = this.getCurrentDay();
      for (let i = 1; i <= days; i++) {
        let obj = {
          datetime: this.getDateTimeByDay(date, i, 0),
          today: curDay == i && this.getCurrentMonth() == this.getCurrentMonth(date),
          type: 'cur',
          todoType: 0,//严重程度 用来区分时间线颜色
          todoList: [],
          date: i
        };
        arr.push(obj);
      }
      return arr;
    },
    //获取当前时间下 今日几号
    getCurrentDay () {
      let date = new Date();
      let day = date.getDate();
      return day;
    },
    //获取当前时间下 几月  不传参默认当月
    getCurrentMonth (date = new Date()) {
      let curDate = new Date(date);
      let curMonth = curDate.getMonth() + 1;
      return curMonth;
    },

    //获取下月存留日历几天-->日历页面前部灰色日期
    getNextMonthRestList (date) {
      let arr = [];
      let nextMonthRest = 7 - this.getCurrMonthLastWeek(date);//获取下月余几天
      let nextMonthCounts = this.getDaysCount(date, 1);
      for (let i = 1; i <= nextMonthRest; i++) {
        let obj = {
          datetime: this.getDateTimeByDay(date, i, 1),
          today: false,
          todoType: 0,//严重程度 用来区分时间线颜色
          todoList: [],
          type: 'next',
          date: i
        };
        arr.push(obj);
      }
      return arr;
    },

    //通过当日几号和月份传入获取日期格式
    getDateTimeByDay (date, dayIndex, setMonth = 0) {
      let cDate = new Date(date);
      let curMonth = cDate.getMonth();
      cDate.setMonth(curMonth + setMonth);
      cDate.setDate(dayIndex);
      return this.formatDate(cDate, 'yyyy-MM-dd');
    },

    /**
     格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
     */
    formatDate (v, format) {
      if (!v) return "";
      let d = v;
      if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
          d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
          d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
      }
      let o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    },


    //某月最后一天时间
    lastTimeOfMonth (datetime) {
      let startDate = new Date(datetime);
      startDate.setDate(1); //第一天

      let endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1)
      endDate.setDate(0);

      let date = endDate;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = '23';
      let minute = '59';
      let second = '59';
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ":" + second;
    }
  },
}
</script>

<style lang="scss">
#discussPolitics {
  .calendar-day {
    .ui-container {
      .calendar-day-item-container {
        &:hover {
          sup {
            display: none !important;
          }
        }
      }
    }
  }

  .timeline {
    .el-card {
      background-color: transparent;
      border: none;
    }
  }
}
</style>

<style scoped lang="scss">
@import "../../../assets/scss/humanResource/discussPolitics/index";
//@import "../../../assets/scss/icon";

@mixin discussPoliticsImg($m, $n) {
  $url: "../../../assets/image/humanResource/discussPolitics/" + $n + "/" + $m;
  @include bgImage($url);
}

#theme_name {
  #discussPolitics {
    /*.icon-delete {
        @include discussPoliticsImg('shanchu.png', 'theme1');
      }

      .icon-delete-red {
        @include discussPoliticsImg('shanchu1.png', 'theme1');
      }

      .icon-upload {
        @include discussPoliticsImg('ckfj.png', 'theme1');
      }

      .icon-edit {
        @include discussPoliticsImg('bianji_2.png', 'theme1');
      }*/
  }
}

#theme_name.theme1 {
  #discussPolitics {
    @include discussPoliticsImg("di.png", "theme1");

    .icon-delete {
      @include discussPoliticsImg("shanchu.png", "theme1");
    }

    .icon-delete-red {
      @include discussPoliticsImg("shanchu1.png", "theme1");
    }

    .icon-upload {
      @include discussPoliticsImg("ckfj.png", "theme1");
    }

    .icon-cancel {
      @include discussPoliticsImg("xzquxiao.png", "theme1");
    }

    .icon-edit {
      @include discussPoliticsImg("bianji_2.png", "theme1");
    }

    .timeline {
      .timeline-bg {
        @include discussPoliticsImg("椭圆形.png", "theme1");
      }
    }

    .meeting-detail-toolbar-item {
      @include discussPoliticsImg("gd.png", "theme1");

      &.checked {
        @include discussPoliticsImg("xjtk.png", "theme1");
      }
    }
  }
}

#theme_name.theme2 {
  #discussPolitics {
  }
}

#theme_name.theme3 {
  #discussPolitics {
  }
}

#theme_name.theme4 {
  #discussPolitics {
  }
}
</style>
