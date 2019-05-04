<template>
  <div id="departments">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="moduleList">
          <b>...</b>
        </p>
        <h1 @click="myUtils.emptyPic(photo)">人资规划</h1>
        <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
        </h2>
      </div>
      <div class="items-center listTopRight">
        <!--<div class="icons dimission" v-if="chooseTab === 3"></div>-->
        <div class="buttons button1" style="font-weight: bold" @click="showSetForm" v-if="chooseTab === 3">设置报表</div>
        <div class="buttons button2" style="font-weight: bold" v-if="chooseTab === 3" @click="handleExportInfo">导出报表</div>
        <el-tooltip content="新增部门" placement="bottom" :visible-arrow="false">
          <div class="icons add" @click="showAddModule(chooseTab)" v-show="chooseTab === 2"><b>+</b></div>
        </el-tooltip>
        <div class="icons search" @click="highSearch(chooseTab)" v-show="chooseTab !== 2 && chooseTab !== 1"></div>
      </div>
    </div>

    <!--组织架构-->
    <div v-if="chooseTab === 1">
      <Organization></Organization>
    </div>

    <!--部门管理-->
    <div class="departList" v-if="chooseTab === 2">
      <div class="items-start mainList" :class="{'mainListHover': routeAnimation}">
        <p v-for="item in departList" @click="handleOpenDepartDetail(item)">
          <span class="writingMode" :title="item.name">
            {{item.name}}
          </span>
          <a class="control flex-center">
            <a class="pointer">...</a>
            <b @click.stop="handleOpenEditDepart(item)">编辑</b>
            <b @click.stop="handleDelDepart(item)">删除</b>
          </a>
        </p>
      </div>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            :total="departCount"
            :current-page="params.page"
            :page-size="params.limit"
            layout="total,jumper,prev,pager,next"
            @current-change="handleChangePage"
          >
          </el-pagination>
        </div>
      </footer>

      <!--部门详情-->
      <div class="depart-detail" :class="{'show-depart-detail': show_depart_detail}">
        <div class="depart_nav">
          <span @click="handleGetCurrentDepart(tmp,idx)" v-for="(tmp,idx) in nav_depart">{{ tmp.name }} <a v-if="idx !== nav_depart.length - 1">/</a></span>
        </div>

        <div class="depart-detail-main flex-center">
          <div class="depart-left flex-center">
            <p @click="handleCloseDepartDetail">
              <span class="writingMode">
                {{ current_depart && current_depart.name }}
              </span>
              <a class="control flex-center">
                <a class="pointer">...</a>
                <b @click.stop="handleOpenEditDepart(current_depart)">编辑</b>
                <b @click.stop="handleDelDepart(current_depart)">删除</b>
              </a>
            </p>
          </div>
          <div class="depart-right">
            <div class="depart-btn flex">
              <span @click="handleCheckStaffPost(tmp)" v-for="tmp in control_btn" :class="{'choose-span': current_btn === tmp.id}">{{ tmp.val }}</span>
            </div>
            <div class="depart-staff">
              <!--下级部门列表-->
              <div class="depart_list flex">
                <!--<div class="next_btn" :class="{'show_next_btn': is_next}"><i class="el-icon-arrow-right"></i></div>-->
                <!--鼠标移入判断是否有下级部门不合理-->
                <div class="next_btn"><i class="el-icon-arrow-right" style="visibility: hidden"></i></div>
                <div class="list flex scroll_bar" v-if="next_depart.length > 0">
                  <div class="writingMode" style="text-align: left;padding-top: 15px" v-for="depart in next_depart" @click="handleInnerNextDepart(depart)">{{ depart.name }}</div>
                  <!--不合理-->
                  <!--<div @mouseover="handleConfirmNext(depart)" class="writingMode" v-for="depart in next_depart" @click="handleInnerNextDepart(depart)">{{ depart.name }}</div>-->
                </div>
                <div v-else class="items-center">
                  <span>暂无下级部门</span>
                </div>
              </div>

              <!--人员列表-->
              <div class="staff_list">
                <!--管理部门/员工管理-->
                <DepartManage :check-info="check_info" :module="departModule" :info="departInfo" @close="departModule = false"></DepartManage>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--员工名册-->
    <div v-show="chooseTab === 3">
      <StaffRoster :searchVal="searchFruit3" :export-data="export_data" :export-info="exportInfo" :search-params="staff_params"></StaffRoster>
    </div>

    <!--离职管理-->
    <div v-if="chooseTab === 4">
      <LeaveJob :searchVal="searchFruit4"></LeaveJob>
    </div>

    <!--权限管理-->
    <div v-if="chooseTab === 5" style="padding: 0 30px;background-color: #F9F9F9" class="scroll_bar">
      <!--系统-->
      <div style="height: 800px">
        <div style="padding: 10px 0;margin-bottom: 30px">
          <p style="font-weight: bold;font-size: 20px;color: #757580;margin: 10px 0">系统</p>
          <div style="padding: 20px;background-color: white">
            <div style="text-align: right">
              <div class="btn_square_add" @click="add_system_visible = true"><b>+</b></div>
            </div>
            <el-table
              :data="system_list"
              height="370px"
              @row-click="handleClickSystem"
              highlight-current-row
            >
              <el-table-column label="ID" prop="id" align="center"></el-table-column>
              <el-table-column label="系统标识" prop="sign" align="center"></el-table-column>
              <el-table-column label="系统名称" prop="name" align="center"></el-table-column>
              <el-table-column label="系统描述" prop="description" align="center"></el-table-column>
              <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip placement="left" :visible-arrow="false">
                    <div class="flex control-btn" slot="content">
                      <!--<el-button type="success" size="mini" plain @click="handleOpenAddModule(scope.row)">新增模块</el-button>-->
                      <!--<el-button type="warning" size="mini" plain @click="handleOpenEdit('system',scope.row)">编辑</el-button>-->
                      <!--<el-button type="danger" size="mini" plain @click="handleDelControl('system',scope.row)">删除</el-button>-->
                      <span @click="handleOpenAddModule(scope.row)">新增模块</span>
                      <span @click="handleOpenEdit('system',scope.row)">编辑</span>
                      <span @click="handleDelControl('system',scope.row)">删除</span>
                    </div>
                    <span class="table_control writingMode">···</span>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :total="system_count"
              layout="total,prev,pager,next"
              :current-page="power_params.page"
              :page-size="power_params.limit"
              @current-change="handleChangeSystemPage"
              style="text-align: right;margin-top: 10px"
            ></el-pagination>
          </div>
          <div>
            <p style="font-weight: bold;font-size: 20px;color: #757580;margin: 10px 0">模块</p>
            <div style="background-color: white;padding: 20px">
              <el-table
                :data="module_list"
                @row-click="handleClickModule"
                height="370px"
                highlight-current-row
              >
                <el-table-column label="ID" prop="id" align="center"></el-table-column>
                <el-table-column label="模块标识" prop="sign" align="center"></el-table-column>
                <el-table-column label="模块名称" prop="name" align="center"></el-table-column>
                <el-table-column label="模块描述" prop="description" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <!--<el-button type="success" size="mini" plain @click="handleOpenAddPower(scope.row)">新增权限</el-button>-->
                    <!--<el-button type="warning" size="mini" plain @click="handleOpenEdit('module',scope.row)">编辑</el-button>-->
                    <!--<el-button type="danger" size="mini" plain @click="handleDelControl('system',scope.row)">删除</el-button>-->
                    <el-tooltip placement="left" :visible-arrow="false">
                      <div class="flex control-btn" slot="content">
                        <span @click="handleOpenAddPower(scope.row)">新增权限</span>
                        <span @click="handleOpenEdit('module',scope.row)">编辑</span>
                        <span @click="handleDelControl('system',scope.row)">删除</span>
                      </div>
                      <span class="table_control writingMode">···</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :total="module_count"
                layout="total,prev,pager,next"
                :current-page="module_params.page"
                :page-size="module_params.limit"
                @current-change="handleChangeModulePage"
                style="text-align: right;margin-top: 10px"
              ></el-pagination>
            </div>
          </div>
          <div>
            <p style="font-weight: bold;font-size: 20px;color: #757580;margin: 10px 0">权限</p>
            <div style="background-color: white;padding: 20px">
              <el-table :data="power_list" height="370px" @row-click="handleClickPower" highlight-current-row>
                <el-table-column label="ID" prop="id" align="center"></el-table-column>
                <el-table-column label="权限标示" prop="sign" align="center"></el-table-column>
                <el-table-column label="权限名称" prop="name" align="center"></el-table-column>
                <el-table-column label="权限描述" prop="description" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <!--<el-button type="success" size="mini" plain @click="handleOpenAddField(scope.row)">添加字段权限</el-button>-->
                    <!--<el-button type="warning" size="mini" plain @click="handleOpenEdit('power',scope.row)">编辑</el-button>-->
                    <!--<el-button type="danger" size="mini" plain @click="handleDelControl('power',scope.row)">删除</el-button>-->
                    <el-tooltip placement="left" :visible-arrow="false">
                      <div class="flex control-btn" slot="content">
                        <span @click="handleOpenAddField(scope.row)">添加字段权限</span>
                        <span @click="handleOpenEdit('power',scope.row)">编辑</span>
                        <span @click="handleDelControl('power',scope.row)">删除</span>
                      </div>
                      <span class="table_control writingMode">···</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :total="power_count"
                layout="total,prev,pager,next"
                :current-page="bottom_params.page"
                :page-size="bottom_params.limit"
                @current-change="handleChangePowerPage"
                style="text-align: right;margin-top: 10px"
              ></el-pagination>
            </div>
          </div>
          <div>
            <p style="font-weight: bold;font-size: 20px;color: #757580;margin: 10px 0">字段</p>
            <div style="background-color: white;padding: 20px">
              <el-table :data="field_list" height="370px" highlight-current-row>
                <el-table-column label="项目名称" prop="app_name" align="center"></el-table-column>
                <el-table-column label="控制器全称" prop="controller" align="center"></el-table-column>
                <el-table-column label="方法名称" prop="method" align="center"></el-table-column>
                <el-table-column label="权限字段标识" prop="sign" align="center"></el-table-column>
                <el-table-column label="权限字段名称" prop="name" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <!--<el-button type="warning" size="mini" plain @click="handleOpenEditField(scope.row)">编辑</el-button>-->
                    <!--<el-button type="danger" size="mini" plain @click="handleOpenDelField(scope.row)">删除</el-button>-->
                    <el-tooltip placement="left" :visible-arrow="false">
                      <div class="flex control-btn" slot="content">
                        <span @click="handleOpenEditField(scope.row)">编辑</span>
                        <span @click="handleOpenDelField('power',scope.row)">删除</span>
                      </div>
                      <span class="table_control writingMode">···</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :total="field_count"
                layout="total,prev,pager,next"
                :current-page="permission_params.page"
                :page-size="permission_params.limit"
                @current-change="handleChangePermissionPage"
                style="text-align: right;margin-top: 10px"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--新增部门-->
    <lj-dialog :visible="depart_visible" :size="lj_size" @close="depart_visible = false">
      <div class="dialog_container">
        <div class="items-bet dialog_header">
          <h3>{{ is_edit_depart ? '编辑部门' : '添加部门'}}</h3>
        </div>
        <div class="dialog_main flex-center borderNone">
          <el-form :model="departForm" ref="departForm" label-width="120px" class="depart_visible">
            <el-form-item label="部门名称">
              <el-input v-model="departForm.name" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
              <div class="items-center iconInput">
                <el-input v-model="departForm.parent" readonly @focus="chooseDepart = true"></el-input>
                <p class="icons organization"></p>
              </div>
            </el-form-item>
            <el-form-item label="部门负责人">
              <div class="items-center iconInput">
                <el-input v-model="departForm.leader" placeholder="必填" readonly @focus="organModule = true"></el-input>
                <p class="icons user"></p>
              </div>
            </el-form-item>
            <el-form-item label="部门负责岗位">
              <el-input v-model="departForm.position" placeholder="选填" @focus="post_visible = true" readonly></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddDepart">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddDepart">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--设置表单-->
    <SetForms :module="SetFormVisible" :data="setFormData" @close="SetFormVisible = false" @remove="handleRemoveItem" @submit="handleSubmitForm"></SetForms>

    <!--模块入口-->
    <MenuList :list="humanResource" :module="visibleStatus" :backdrop="true" @close="visibleStatus = false"></MenuList>

    <!--高级搜索-->
    <SearchHigh :module="showSearch" :showData="searchData" @close="hiddenModule"></SearchHigh>

    <!--组织架构选人-->
    <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>

    <!--部门选择-->
    <DepartOrgan :module="chooseDepart" @close="handleGetDepart"></DepartOrgan>

    <!--确定删除部门-->
    <lj-dialog :visible="del_depart_visible" :size="{width: 400 + 'px',height: 250 + 'px'}">
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确定</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该部门吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitDel">确定</el-button>
          <el-button type="info" size="small" @click="del_depart_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--确定删除-->
    <lj-dialog
      :visible="confirm_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="confirm_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确定</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该条权限吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleConfirmDel">确定</el-button>
          <el-button type="info" size="small" @click="confirm_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--编辑模块-->
    <lj-dialog
      :visible="edit_module_visible"
      :size="{width: 500 + 'px',height: 550 + 'px'}"
      @close="handleCancelEdit"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>编辑</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="名称">
              <el-input v-model="edit_module_form.name"></el-input>
            </el-form-item>
            <el-form-item label="父级模块" v-show="edit_type === 'power'">
              <el-select v-model="edit_module_form.system_id">
                <el-option v-for="item in edit_current_list" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父级模块" v-show="edit_type === 'module'">
              <el-select v-model="edit_module_form.parent_id" disabled>
                <el-option v-for="item in edit_current_list" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="edit_module_form.description"></el-input>
            </el-form-item>
            <el-form-item label="权限类型" v-show="edit_type === 'power'">
              <el-select v-model="edit_module_form.type" @change="handlechange">
                <el-option value="index" label="index"></el-option>
                <el-option value="read" label="read"></el-option>
                <el-option value="add" label="add"></el-option>
                <el-option value="update" label="update"></el-option>
                <el-option value="delete" label="delete"></el-option>
                <el-option value="other" label="other"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitEdit">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelEdit">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增模块-->
    <lj-dialog
      :visible="new_module_visible"
      :size="{width: 450 + 'px',height: 450 + 'px'}"
      @close="handleCancelAddModule"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增模块</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="模块名称">
              <el-input v-model="new_module_form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模块标示">
              <el-input v-model="new_module_form.sign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模块描述">
              <el-input v-model="new_module_form.description" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddModule">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddModule">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增权限-->
    <lj-dialog
      :visible="new_power_visible"
      :size="{width: 400 + 'px',height: 500 + 'px'}"
      @close="handleCancelAddPower"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>新增权限</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="权限名称">
              <el-input v-model="new_power_form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限标示">
              <el-input v-model="new_power_form.sign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限描述">
              <el-input v-model="new_power_form.description" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限类型">
              <el-select v-model="new_power_form.type">
                <el-option value="index" label="index"></el-option>
                <el-option value="read" label="read"></el-option>
                <el-option value="add" label="add"></el-option>
                <el-option value="update" label="update"></el-option>
                <el-option value="delete" label="delete"></el-option>
                <el-option value="other" label="other"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddPower">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddPower">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--新增字段权限-->
    <lj-dialog
      :visible="new_field_visible"
      :size="{width: 450 + 'px',height: 550 + 'px'}"
      @close=""
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{ is_edit_field ? '修改权限字段' : '新增权限字段'}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px">
            <el-form-item label="项目名称">
              <el-input v-model="field_form.app_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="控制器全称">
              <el-input v-model="field_form.controller" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="方法名称">
              <el-input v-model="field_form.method" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限字段标识">
              <el-input v-model="field_form.sign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权限字段名称">
              <el-input v-model="field_form.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitOk">确定</el-button>
          <el-button type="info" size="small" @click="handleCancel">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--删除字段-->
    <lj-dialog
      :visible="del_field_visible"
      :size="{width: 400 + 'px',height: 250 + 'px'}"
      @close="del_field_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>确定</h3>
        </div>
        <div class="dialog_main">
          <div class="unUse-txt">确定删除该字段权限吗？</div>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitDelField">确定</el-button>
          <el-button type="info" size="small" @click="del_field_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加系统-->
    <lj-dialog
      :visible="add_system_visible"
      :size="{width: 450 + 'px',height: 450 + 'px'}"
      @close="handleCancelAddSys"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加系统</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form label-width="120px" :model="system_form">
            <el-form-item label="系统模块名称">
              <el-input v-model="system_form.name"></el-input>
            </el-form-item>
            <el-form-item label="模块标识">
              <el-input v-model="system_form.sign"></el-input>
            </el-form-item>
            <el-form-item label="模块描述">
              <el-input v-model="system_form.description" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button type="danger" size="small" @click="handleSubmitAddSys">确定</el-button>
          <el-button type="info" size="small" @click="handleCancelAddSys">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--岗位-->
    <PostOrgan :module="post_visible" @close="handleGetPost"></PostOrgan>
  </div>
</template>

<script>
  import DepartManage from './components/departManage.vue';
  import Organization from './organization/index.vue';
  import SetForms from './components/setForms.vue';//设置表单
  import StaffRoster from './staffRoster/index.vue';//员工名册
  import LeaveJob from './leaveJob/index.vue';//离职管理
  import SearchHigh from '../../common/searchHigh.vue';
  import ljDialog from '../../common/lj-dialog.vue';
  import StaffOrgan from '../../common/staffOrgan.vue';
  import MenuList from '../../common/menuList.vue';
  import Upload from '../../common/upload.vue';
  import DepartOrgan from '../../common/departOrgan.vue'
  import {staffBookSearch, LeaveJobSearch} from '../../../assets/js/allSearchData.js';
  import {humanResource, resourceDepart} from '../../../assets/js/allModuleList.js';
  import PostOrgan from '../../common/postOrgan.vue';

  export default {
    name: "index",
    components: {
      SetForms,
      DepartManage,
      StaffRoster,
      LeaveJob,
      MenuList,
      ljDialog,
      SearchHigh,
      Upload,
      StaffOrgan,
      Organization,
      DepartOrgan,
      PostOrgan
    },
    data() {
      return {
        post_visible: false,

        //新部门管理
        show_depart_detail: false,
        control_btn: [
          {id: 1,val: '人员管理'},
          {id: 2,val: '职位管理'},
        ],
        current_btn: 1,
        current_depart: '', //当前部门
        next_depart: [],
        next_depart_params: {
          page: 1,
          limit: 999,
          parent_id: ''
        },
        nav_depart: [],
        is_next: true,

        departModule: false,//部门管理/员工管理
        departInfo: '',
        check_info: '',

        //导出
        export_data: [],
        //添加系统
        add_system_visible: false,
        system_form: {
          name: '',
          sign: '',
          description: '',
          parent_id: null,
        },

        //权限字段管理
        field_list: [],
        field_count: 0,
        permission_params: {
          page: 1,
          limit: 5,
          permission_id: ''
        },
        new_field_visible: false,
        current_field: '',
        field_form: {
          permission_id: '',
          app_name: '',
          controller: '',
          method: '',
          sign: '',
          name: ''
        },
        is_edit_field: false,
        del_field_visible: false,

        //新增模块
        new_module_visible: false,
        new_module_form: {
          name: '',
          sign: '',
          description: '',
          parent_id: '',
        },
        //新增权限
        new_power_visible: false,
        new_power_form: {
          name: '',
          sign: '',
          description: '',
          type: '',
          system_id: '',
        },
        //编辑模块
        edit_module_visible: false,
        edit_module_form: {
          name: '',
          description: '',
          parent_id: '',
          parent: '',
          type: '',
          system_id: ''
        },
        edit_type: '',
        edit_current_list: [],
        edit_row: '',

        //确定删除
        confirm_visible: false,
        confirm_type: '',
        confirm_row: '',

        //权限管理
        power_params: {
          search: '',
          parent_id: '',
          is_permissions: '',
          page: 1,
          limit: 5
        },
        //模块参数
        module_params: {
          search: '',
          parent_id: '',
          is_permissions: '',
          page: 1,
          limit: 5
        },
        system_list: [],
        system_count: 0,
        module_list: [],
        module_count: 0,

        bottom_params: {
          search: '',
          system_id: '',
          type: '',
          page: 1,
          limit: 5
        },
        power_list: [],
        power_count: 0,

        del_depart_visible: false,
        del_depart: '',
        is_edit_depart: false,
        edit_depart: '',

        departList: [], //部门列表
        departCount: 0,
        params: {
          page: 1,
          limit: 7,
          parent_id: 1
        },
        chooseDepart: false,

        staffBookSearch,
        LeaveJobSearch,
        humanResource,
        resourceDepart,
        chooseTab: 2,//tab切换
        selects: [
          {
            id: 1,
            title: '组织结构图',
          },
          {
            id: 2,
            title: '部门管理',
          },
          {
            id: 3,
            title: '员工名册',
          },
          {
            id: 4,
            title: '离职管理',
          },
          {
            id: 5,
            title: '权限管理'
          }
        ],//tab切换

        organModule: false,//组织架构

        setFormData: {},
        SetFormVisible: false,//设置表单

        depart_visible: false,//新增部门
        lj_size: {},//新增部门
        departForm: {
          name: '',
          leader: '',
          leader_id: [],
          parent_id: [1],
          parent: '南京乐伽商业管理有限公司',
          position: '',
          position_id: ''
        },//新增部门
        visibleStatus: false,//弹出部门

        showSearch: false,//高级搜索
        searchData: {},//搜索项
        searchFruit3: {},//搜索结果
        searchFruit4: {},//搜索结果

        staff_params: {
          is_on_job: '',
          is_enable: '',
        },
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],//部门人员
        value: '',

        //导出报表
        exportInfo: '',

        //记录当前点击的row
        current_system: '',
        current_module: '',
        current_power: '',
        current_promisstion: '',
      }
    },
    mounted() {
      this.getDepartList();
      this.getPowerList();
    },
    watch: {},
    computed: {
      routeAnimation() {
        return this.$store.state.app.routeAnimation;
      },
    },
    methods: {
      handleChangePermissionPage(page) {
        this.permission_params.page = page;
        let id = this.current_power && this.current_power.id;
        this.getFieldList(id);
      },
      handleChangePowerPage(page) {
        this.bottom_params.page = page;
        let id = this.current_module && this.current_module.id || 0;
        this.getPowerBottomList(id);
      },
      handleChangeModulePage(page) {
        this.module_params.page = page;
        let id = this.current_system ? this.current_system.id : 0;
        this.getModuleList(id);
      },
      handleChangeSystemPage(page) {
        this.power_params.page = page;
        this.getPowerList();
      },
      handlechange(val) {
        this.edit_module_form.type = val;
      },
      handleGetPost(id,name) {
        if (id !== 'close') {
          this.departForm.position = name;
          this.departForm.position_id = id[0];
        }
        this.post_visible = false;
      },
      //新部门管理
      //切换人员管理/职位管理
      handleCheckStaffPost(tmp) {
        this.current_btn = tmp.id;
        this.check_info = tmp;
      },
      //部门列表打开部门详情
      handleOpenDepartDetail(item) {
        this.departForm.parent = item.name;
        this.departForm.parent_id = [];
        this.departForm.parent_id.push(item.id);
        this.current_depart = item;
        this.nav_depart = [];
        this.nav_depart.push(item);
        this.departModule = true;
        this.departInfo = item;
        this.getNextDepart(item);
        this.show_depart_detail = true;
      },
      //关闭部门详情
      handleCloseDepartDetail() {
        this.current_btn = 1;
        this.check_info = '';
        this.departModule = false;
        this.show_depart_detail = false;
        this.departForm.parent_id = [1];
        this.departForm.parent = '南京乐伽商业管理有限公司';
      },
      // 部门管理 搜索下级部门
      getNextDepart(val,next) {
        this.next_depart_params.parent_id = val.id;
        this.$http.get('organization/organization',this.next_depart_params).then(res => {
          if (res.code === '20000') {
            this.next_depart = res.data.data;
            if (next) {
              this.nav_depart.push(val);
            }
          } else {
            if (!next) {
              this.next_depart = [];
            }
          }
        })
      },
      //子部门点击获取子部门
      handleInnerNextDepart(item) {
        this.is_next = true;
        this.getNextDepart(item,'next');
        this.departInfo = item;
      },
      //判断是否有下级部门
      handleConfirmNext(depart) {
        this.$http.get('organization/organization',{
          page: 1,
          limit: 999,
          parent_id: depart.id
        }).then(res => {
          if (res.code === '20000') {
            if (res.data.data.length > 0) {
              this.is_next = false;
            } else {
              this.is_next = true;
            }
          } else {
            this.is_next = true;
          }
        })
      },
      //点击导航菜单
      handleGetCurrentDepart(item,idx) {
        this.departInfo = item;
        this.getNextDepart(item);
        this.nav_depart.splice(idx + 1);
      },
      //取消添加系统
      handleCancelAddSys() {
        this.add_system_visible = false;
        for (var key in this.system_form) {
          this.system_form[key] = '';
        }
        this.system_form.parent_id = null;
      },
      //添加系统
      handleSubmitAddSys() {
        this.$http.post('organization/system',this.system_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAddSys();
            this.getPowerList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleSubmitForm() {
        this.export_data = this.setFormData;
      },
      handleRemoveItem(item,index) {
        this.setFormData.splice(index,1);
      },
      handleOpenDelField(type,row) {
        this.current_field = row;
        this.del_field_visible = true;
      },
      handleSubmitDelField() {
        this.$http.delete(`organization/permission_field/${this.current_field.id}`).then(res => {
          if (res.code === '20040') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.getFieldList(this.current_power.id);
            this.del_field_visible = false;
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleOpenEditField(row) {
        this.current_field = row;
        for (var key in this.field_form) {
          this.field_form[key] = row[key];
        }
        this.is_edit_field = true;
        this.new_field_visible = true;
      },
      handleCancel() {
        for (var key in this.field_form) {
          this.field_form[key] = '';
        }
        this.is_edit_field = false;
        this.new_field_visible = false;
      },
      handleSubmitOk() {
        if (this.is_edit_field) {
          this.$http.put(`organization/permission_field/${this.current_field.id}`,this.field_form).then(res => {
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.handleCancel();
              this.getFieldList(this.current_power.id);
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          });
          return false;
        }
        this.$http.post('organization/permission_field',this.field_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancel();
            this.getFieldList(this.current_power.id);
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      handleOpenAddField(row) {
        this.current_field = row;
        this.field_form.permission_id = row.id;
        this.new_field_visible = true;
      },
      handleClickPower(row) {
        this.current_power = row;
        this.getFieldList(row.id);
      },
      getFieldList(permission_id) {
        this.permission_params.permission_id = permission_id;
        this.$http.get('organization/permission_field',this.permission_params).then(res => {
          if (res.code === '20000') {
            this.field_list = res.data.data;
            this.field_count = res.data.count;
          } else {
            this.field_count = 0;
            this.field_list = [];
          }
        })
      },
      handleOpenAddPower(row) {
        this.current_module = row;
        this.new_power_form.system_id = row.id;
        this.new_power_visible = true;
      },
      handleSubmitAddPower(){
        this.$http.post('organization/permission',this.new_power_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAddPower();
            let id = this.current_module && this.current_module.id || 0;
            this.getPowerBottomList(id);
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            });
          }
        })
      },
      handleCancelAddPower() {
        for (var key in this.new_power_form) {
          this.new_power_form[key] = '';
        }
        this.new_power_visible = false;
      },
      handleSubmitAddModule() {
        this.$http.post('organization/system',this.new_module_form).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.handleCancelAddModule();
            this.getPowerList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            });
          }
        })
      },
      handleCancelAddModule() {
        for (var key in this.new_module_form) {
          this.new_module_form[key] = '';
        }
        this.new_module_visible = false;
      },
      handleOpenAddModule(row) {
        this.new_module_form.parent_id = row.id;
        this.new_module_visible = true;
      },
      handleSubmitEdit() {
        if (this.edit_type === 'system' || this.edit_type === 'module') {
          this.$http.put(`organization/system/${this.edit_row.id}`,this.edit_module_form).then(res => {
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getPowerList();
              this.handleCancelEdit();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              });
            }
          })
        }else {
          this.$http.put(`organization/permission/${this.edit_row.id}`,this.edit_module_form).then(res => {
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getPowerList();
              this.handleCancelEdit();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              });
            }
          })
        }
      },
      handleCancelEdit() {
        this.edit_module_form = {
          name: '',
          description: '',
          parent_id: [],
          parent: '',
          system_id: ''
        };
        this.edit_module_visible = false;
      },
      handleOpenEdit(type,row) {
        this.edit_row = row;
        this.edit_type = type;
        if (type === 'module') {
          this.edit_current_list = this.system_list
        }
        if (type === 'power') {
          this.edit_current_list = this.module_list;
        }
        this.edit_module_form.system_id = Number(row.system_id) || '';
        this.edit_module_form.description = row.description;
        this.edit_module_form.name = row.name;
        this.edit_module_form.parent_id = row.parent_id || 0;
        this.edit_module_form.parent = row.parent && row.parent.name || '';
        this.edit_module_form.type = row.type;
        this.edit_module_visible = true;
      },
      handleConfirmDel() {
        if (this.confirm_type === 'system') {
          this.$http.delete(`organization/system/${this.confirm_row.id}`).then(res => {
            if (res.code === '20040') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getPowerList();
              this.confirm_visible = false;
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        } else {
          this.$http.delete(`organization/permission/${this.confirm_row.id}`).then(res => {
            if (res.code === '20040') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.confirm_visible = false;
              this.getPowerList();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          })
        }
      },
      handleDelControl(type,row) {
        this.confirm_row = row;
        this.confirm_type = type;
        this.confirm_visible = true;
      },
      getPowerBottomList(id) {
        this.bottom_params.system_id = id;
        this.$http.get('organization/permission',this.bottom_params).then(res => {
          if (res.code === '20000') {
            this.power_list = res.data.data;
            this.power_count = res.data.count;
            this.getFieldList(res.data.data[0].id);
          } else {
            this.power_count = 0;
            this.power_list = [];
          }
        })
      },
      handleClickModule(row) {
        this.current_module = row;
        this.field_list = [];
        this.power_list = [];
        this.getPowerBottomList(row.id);
      },
      handleClickSystem(row) {
        this.current_system = row;
        this.module_list = [];
        this.power_list = [];
        this.field_list = [];
        this.getModuleList(row.id);
      },
      getModuleList(id) {
        this.module_params.parent_id = id;
        this.$http.get('organization/system',this.module_params).then(res => {
          if (res.code === '20000') {
            this.module_list = res.data.data;
            this.module_count = res.data.count;
            this.getPowerBottomList(res.data.data[0].id);
          } else {
            this.module_count = 0;
            this.module_list = [];
          }
        })
      },
      //权限管理
      getPowerList() {
        this.power_params.parent_id = '';
        this.module_list = [];
        this.module_count = 0;
        this.power_list = [];
        this.power_count = 0;
        this.field_list = [];
        this.field_count = 0;
        this.$http.get('organization/system',this.power_params).then(res => {
          if (res.code === '20000') {
            this.system_list = res.data.data;
            this.system_count = res.data.count;
            this.getModuleList(res.data.data[0].id);
          } else {
            this.system_count = 0;
            this.system_list = [];
          }
        })
      },
      //导出报表
      handleExportInfo() {
        this.exportInfo += this.chooseTab;
      },
      handleOpenEditDepart(item) {
        console.log(item);
        this.edit_depart = item;
        this.departForm.name = item.name;
        this.departForm.leader = item.leader && item.leader.name || '';
        this.departForm.leader_id.push(item.leader_id);
        this.departForm.parent = item.parent_org && item.parent_org.name || '';
        this.departForm.parent_id = [];
        this.departForm.parent_id.push(item.parent_id);
        this.is_edit_depart = true;
        this.lj_size = {
          width: '510px',
          height: '550px',
        };
        this.depart_visible = true;
      },
      handleSubmitDel() {
        this.$http.delete(`organization/organization/${this.del_depart.id}`).then(res => {
          if (res.code === '20040') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.del_depart_visible = false;
            this.show_depart_detail = false;
            this.getDepartList();
          } else {
            this.$LjNotify('warning',{
              title: '失败',
              message: res.msg
            })
          }
        })
      },
      //删除部门
      handleDelDepart(item) {
        this.del_depart = item;
        this.del_depart_visible = true;
      },
      //取消添加部门
      handleCancelAddDepart() {
       this.departForm = {
         name: '',
         leader: '',
         leader_id: [],
         parent_id: [],
         parent: ''
       };
       if (!this.show_depart_detail) {
         this.departForm.parent_id = [1];
         this.departForm.parent = '南京乐伽商业管理有限公司';
       }
       if (this.show_depart_detail) {
         this.departForm.parent_id = [];
         this.departForm.parent_id.push(this.current_depart.id);
         this.departForm.parent = this.current_depart.name;
       }
       this.is_edit_depart = false;
       this.depart_visible = false;
      },
      //确定添加部门
      handleSubmitAddDepart() {
        if (this.is_edit_depart) {
          this.$http.put(`organization/organization/${this.edit_depart.id}`,this.departForm).then(res => {
            if (res.code === '20030') {
              this.$LjNotify('success',{
                title: '成功',
                message: res.msg
              });
              this.getDepartList();
              this.handleCancelAddDepart();
            } else {
              this.$LjNotify('warning',{
                title: '失败',
                message: res.msg
              })
            }
          });
          return false;
        }
        this.$http.post('organization/organization',this.departForm).then(res => {
          if (res.code === '20010') {
            this.$LjNotify('success',{
              title: '成功',
              message: res.msg
            });
            this.getDepartList();
            if (this.show_depart_detail) {
              this.getNextDepart({id: this.departForm.parent_id});
            }
            this.handleCancelAddDepart();
          } else {
            this.$LjNotify('warning',{
              title: '警告',
              message: res.msg
            })
          }
        })
      },
      handleGetDepart(id,name) {
        this.chooseDepart = false;
        if (id !== 'close') {
          this.departForm.parent_id = id;
          this.departForm.parent = name;
        }
      },
      handleChangePage(page) {
        this.params.page = page;
        this.getDepartList();
      },
      // tab切换
      changeTabs(id) {
        this.departModule = false;
        this.show_depart_detail = false;
        this.chooseTab = id;
        this.$nextTick(function () {
          switch (id) {
            case 3:
              this.searchFruit3 = this.handleSearch(this.staffBookSearch);
              break;
            case 5:
              this.getPowerList();
          }
        });
        this.$store.dispatch('route_animation');
      },
      // 部门管理列表
      getDepartList() {
        this.$http.get('organization/organization',this.params).then(res => {
          if (res.code === '20000') {
            this.departList = res.data.data;
            this.departCount = res.data.count;
          }
        })
      },
      // 新增部门
      showAddModule(val) {
        switch (val) {
          case 2:
            this.depart_visible = true;
            this.lj_size = {
              width: '510px',
              height: '550px',
            };
            break;
        }
      },
      // 高级搜索
      highSearch(val) {
        this.showSearch = true;
        switch (val) {
          case 3:
            this.searchData = this.staffBookSearch;
            break;
          case 4:
            this.searchData = this.LeaveJobSearch;
            break;
        }
      },
      // 确认搜索
      hiddenModule(val) {
        this.showSearch = false;
        if (val !== 'close') {
          switch (this.chooseTab) {
            case 3:
              this.searchFruit3 = val;
              break;
            case 4:
              this.searchFruit4 = val;
              break;
          }
        }
      },
      showSetForm() {
        this.SetFormVisible = true;
        this.setFormData = [
          { key: 'staff.internship_number',val: '实习协议',isBtn: true},
          { key: 'name',val: '姓名'},
          { key: 'position',val: '岗位',isArray: true,showKey: 'name'},
          { key: 'gender',val: '性别',info:{1: '女',0: '男'}},
          { key: 'staff.origin_addr',val: '籍贯'},
          { key: 'staff.political_status',val: '政治面貌',info: {1: '群众',2: '团员',3: '党员',4: '其他'}},
          { key: 'staff.birthday',val: '出生年月'},
          { key: 'staff.city',val: '城市'},
          { key: 'staff.origin_addr',val: '家庭住址'},
          { key: 'phone',val: '联系方式'},
          { key: 'staff.id_num',val: '身份证'},
          { key: 'staff.emergency_call',val: '紧急联系人'},
          { key: 'staff.household_register',val: '户口性质',info: {0: '农村',1: '城市'}},
          { key: 'staff.national',val: '民族'},
          { key: 'staff.marital_fertility_status',val: '婚育情况',info: {1: '未婚', 2: '已婚未育',3: '已婚已育'}},
          { key: 'staff.education',val: '学历',info: {1: '高中及以下',2: '大专',3: '本科', 4: '本科及以上', 5: '其他'}},
          { key: 'staff.school',val: '毕业院校'},
          { key: 'staff.graduation_time',val: '毕业时间'},
          { key: 'staff.major',val: '专业'},
          { key: 'staff.position_level',val: '职级',info: {1: 'P1',2: ' P2',3: 'P3',4: 'P4',5: 'P5',6: 'P6', 7: 'P7'}},
          { key: 'staff.enroll',val: '入职时间'},
          { key: 'staff.bank_num',val: '银行卡号'},
          { key: 'staff.account_name',val: '户主'},
          { key: 'staff.account_bank',val: '开户行'},
          { key: 'staff.contract_number',val: '劳务合同',isBtn: true},
          { key: 'staff.leave_proof_number',val: '上家单位离职证明',isBtn: true},
          { key: 'staff.commitment_number',val: '入职承诺书',isBtn: true},
          { key: 'staff.employ_proof_number',val: '在职证明',isBtn: true},
          { key: 'staff.income_proof_number',val: '收入证明',isBtn: true},
          { key: 'staff.notice_number',val: '入职须知',isBtn: true},
          { key: 'staff.secret_number',val: '保密协议编号',isBtn: true},
          { key: 'staff.insurance_prohibit_number',val: '大学生无法缴纳社保知晓书',isBtn: true},
        ];
      },
      moduleList() {
        this.visibleStatus = !this.visibleStatus;
        this.$store.dispatch('route_animation');
      },
      hiddenOrgan(val,name) {
        this.organModule = false;
        if (val !== 'close') {
          this.departForm.leader_id = val;
          this.departForm.leader = name;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/humanResource/departments/index.scss";

  @mixin departmentsImg($m, $n) {
    $url: '../../../assets/image/humanResource/departments/' + $n + '/' + $m;
    @include bgImage($url);
  }

  @mixin commonImg($m, $n) {
    $url: '../../../assets/image/common/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #departments {
      .table_control {
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size: 34px;
        color: #F4AF40;
        cursor: pointer;
        border-radius: 3px;
        text-align: center;
        &:hover {
          background-color: #F4AF40;
          color: white;
        }
      }
      .departList {
        .mainList {
          p {
            @include departmentsImg('departmentshui.png', 'theme1');
            &:hover {
              @include departmentsImg('departmentshong.png', 'theme1');
            }
          }
        }
        .depart-detail {
          background-color: $color9F9;
          .depart_nav {
            span {
              color: $colorE33;
              a {
                color: #999999;
                margin: 0 10px;
              }
            }
          }
          .depart-detail-main {
            .depart-left {
              p {
                @include departmentsImg('departmentshui.png', 'theme1');
                &:hover {
                  @include departmentsImg('departmentshong.png', 'theme1');
                }
              }
            }
            .depart-right {
              .depart-btn {
                span {
                  @include departmentsImg('huidikuang.png','theme1');
                }
                .choose-span {
                  @include departmentsImg('hongdikuang.png','theme1');
                  color: white;
                }
              }
            }
          }
        }
      }
      .dialog_container {
        .dialog_main {
          .iconInput {
            .organization {
              @include commonImg('zuzhijiagou.png', 'theme1');
            }
            .user {
              @include commonImg('yonghu.png', 'theme1');
            }
          }
        }
      }
    }
  }

  #theme_name.theme2 {
    #departments {

    }
  }

  #theme_name.theme3 {
    #departments {

    }
  }

  #theme_name.theme4 {
    #departments {

    }
  }
</style>
