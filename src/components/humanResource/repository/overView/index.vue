<template>
  <div id="overView">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableSettingData.repository.tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        @row-dblclick="currentTable='inRepository';tableDblClick($event);"
        header-row-class-name="tableHeader"
        :row-style="{height:'70px'}"
        style="width: 100%">

        <el-table-column
          key="name"
          align="center"
          prop="name"
          label="物品名称">
        </el-table-column>


        <el-table-column
          key="totalCounts"
          align="center"
          prop="totalCounts"
          label="总数量">
        </el-table-column>

        <el-table-column
          key="stockCounts"
          align="center"
          prop="stockCounts"
          label="库存数量">
        </el-table-column>

        <el-table-column
          key="borrowReceiveCounts"
          align="center"
          prop="borrowReceiveCounts"
          label="领/借数量">
          <template slot-scope="scope">
            <a @click="getBorrowReceiveList(scope.row)">{{scope.row.borrowReceiveCounts}}</a>
            <!--<div slot="reference" class="name-wrapper">-->
            <!--<el-tag size="medium">{{ scope.row.borrowCounts }}</el-tag>-->
            <!--</div>-->
          </template>
        </el-table-column>

        <el-table-column
          key="repairCounts"
          align="center"
          prop="repairCounts"
          label="维修数量">
          <template slot-scope="scope">
            <a @click="getRepairList(scope.row)">{{scope.row.repairCounts}}</a>
            <!--<div slot="reference" class="name-wrapper">-->
            <!--<el-tag size="medium">{{ scope.row.repairCounts }}</el-tag>-->
            <!--</div>-->
          </template>
        </el-table-column>

        <el-table-column
          key="uselessCounts"
          align="center"
          prop="uselessCounts"
          label="报废数量">
          <template slot-scope="scope">
            <a @click="getUselessList(scope.row)">{{scope.row.uselessCounts}}</a>
            <!--<div slot="reference" class="name-wrapper">-->
            <!--<el-tag size="medium">{{ scope.row.uselessCounts }}</el-tag>-->
            <!--</div>-->
          </template>
        </el-table-column>

        <el-table-column
          key="status"
          align="center"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status>=1">{{scope.row.status>=10?'正常':'预警'}}</span>
            <span class="font-red" v-if="scope.row.status<1">预警</span>
            <!--            <a @click="getUselessList(scope.row)">{{scope.row.uselessCounts}}</a>-->
            <!--<div slot="reference" class="name-wrapper">-->
            <!--<el-tag size="medium">{{ scope.row.uselessCounts }}</el-tag>-->
            <!--</div>-->
          </template>
        </el-table-column>

        <!--<el-table-column-->
        <!--align="center"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->

        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <footer class="flex-center bottomPage">
        <div class="develop flex-center">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange($event,'repository')"
            :current-page="tableSettingData.repository.params.page"
            :page-size="tableSettingData.repository.params.limit"
            :total="tableSettingData.repository.counts"
            layout="total,jumper,prev,pager,next">
          </el-pagination>
        </div>
      </footer>
    </div>

    <!--借/领用表格详情-->
    <lj-dialog
      :visible="tableSettingData.borrowReceive.table_dialog_visible"
      :size="{width: 1150 + 'px',height: 750 + 'px'}"
      @close="tableSettingData.borrowReceive.table_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{tableSettingData.borrowReceive.table_dialog_title}} 借/领用详情</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.borrowReceive.tableData"
            highlight-current-row
            :height="this.mainListHeight(250) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(tableSettingData.borrowReceive.tableShowData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.borrowReceive.tableShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange($event,'borrowReceive')"
                :current-page="tableSettingData['borrowReceive'].params.page"
                :page-size="tableSettingData['borrowReceive'].params.limit"
                :total="tableSettingData['borrowReceive'].counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="tableSettingData.borrowReceive.table_dialog_visible = false">
            确定
          </el-button>
          <el-button size="small" type="info" @click="tableSettingData.borrowReceive.table_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>


    <!--维修表格详情-->
    <lj-dialog
      :visible="tableSettingData.repair.table_dialog_visible"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
      @close="tableSettingData.repair.table_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{tableSettingData.borrowReceive.table_dialog_title}} 维修详情</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.repair.tableData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(tableSettingData.repair.tableShowData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.repair.tableShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange($event,'repair')"
                :current-page="tableSettingData.repair.params.page"
                :page-size="tableSettingData.repair.params.limit"
                :total="tableSettingData.repair.counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="tableSettingData.repair.table_dialog_visible = false">确定
          </el-button>
          <el-button size="small" type="info" @click="tableSettingData.repair.table_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>


    <!--报废表格详情-->
    <lj-dialog
      :visible="tableSettingData.useless.table_dialog_visible"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
      @close="tableSettingData.useless.table_dialog_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{tableSettingData.borrowReceive.table_dialog_title}} 报废详情</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.useless.tableData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(tableSettingData.useless.tableShowData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.useless.tableShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange($event,'useless')"
                :current-page="params.page"
                :page-size="params.limit"
                :total="counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>

        <div class="dialog_footer">
          <el-button size="small" type="danger">确定</el-button>
          <el-button size="small" type="info" @click="tableSettingData.useless.table_dialog_visible = false">取消
          </el-button>
        </div>
      </div>
    </lj-dialog>


    <!--入库表单-->
    <lj-dialog
      :visible="in_repository"
      :size="{width: 520 + 'px',height: 670 + 'px'}"
      @close="in_repository = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>入库</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form ref="inRepositoryForm" :rules="rules.inRepositoryRules" :model="in_repository_form" style="text-align: left" size="small"
                   label-width="100px">
            <el-form-item prop="goods" label="物品">
              <div class="items-center iconInput choose-goods" @click="getGoodsList" style="width: 320px">
                <!--<el-input v-model="in_repository_form.goods" placeholder="请选择物品" style="width: 300px">
                </el-input>-->
                <dropdown-list ref="categoryDropdown2" width="300" :url="`${this.url}eam/category`" title="请选择物品"
                               code="2"
                               v-model="in_repository_form.goods"></dropdown-list>
                <p class="choose-goods-icon"></p>
              </div>
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="add_goods_form_visible = true;">+</span>
            </el-form-item>
            <el-form-item prop="counts" label="数量">
              <el-input v-model.number="in_repository_form.counts" placeholder="请输入数量" style="width: 320px">
              </el-input>
            </el-form-item>
            <el-form-item prop="location" label="存放位置">
              <el-select v-model="in_repository_form.department"
                         placeholder="存储类型" style="width: 120px;display: inline-block">
                <el-option :value="'user'" label="人员"></el-option>
                <el-option :value="'org'" label="部门"></el-option>
              </el-select>
              <user-choose v-if="in_repository_form.department==='user'" v-model="in_repository_form.location"
                           width="196" num="1" title="请选择人员"></user-choose>
              <org-choose v-if="in_repository_form.department==='org'" v-model="in_repository_form.location" width="196"
                          num="1" title="请选择部门"></org-choose>
              <!--<el-select @change="handleInRepositorySelectionChange" v-model="in_repository_form.department" placeholder="存储类型" style="width: 120px">
                <el-option :value="'user'" label="人员"></el-option>
                <el-option :value="'org'" label="部门"></el-option>
              </el-select>
              <el-input style="width: 200px" v-model="in_repository_form.location" @focus="in_repository_form.department=='user'?staffModule=true:departModule=true"
                         :placeholder="in_repository_placeholder"></el-input>-->
            </el-form-item>
            <el-form-item prop="purchasePerson" label="采购人">
              <user-choose v-model="in_repository_form.purchasePerson" num="1" title="请选择采购人"></user-choose>
              <!--<el-select v-model="in_repository_form.purchasePerson" placeholder="请输入采购人" style="width: 320px">
                <el-option :value="1" label="采购人1"></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item prop="price" label="单价">
              <el-input v-model.number="in_repository_form.price" placeholder="请输入单价" style="width: 320px">
              </el-input>
            </el-form-item>
            <el-form-item prop="totalPrice" required label="总价">
              <el-input v-model.number="in_repository_form.totalPrice" placeholder="请输入总价" style="width: 320px">
              </el-input>
            </el-form-item>
            <el-form-item prop="resource" required label="采购源">
              <dropdown-list ref="categoryDropdown5" :url="`${this.url}eam/category`" title="必选" code="5"
                             v-model="in_repository_form.resource"></dropdown-list>
              <!--<el-input v-model="in_repository_form.resource" placeholder="请选择采购源" style="width: 320px">
              </el-input>-->
              <span class="btn_add" @click="addCategory(5)">+</span>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="in_repository_form.remark" placeholder="请输入备注" style="width: 320px">
              </el-input>
            </el-form-item>

            <!--<el-form-item label="上传课件"></el-form-item>-->
            <!--<el-form-item label="添加试卷"></el-form-item>-->
          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="inRepository">提交</el-button>
          <el-button size="small" type="info" @click="in_repository = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--选择物品表格详情-->
    <lj-dialog
      :visible="choose_goods_table_visible"
      :size="{width: 900 + 'px',height: 800 + 'px'}"
      @close="choose_goods_table_visible = false"
    >
      <div class="dialog_container choose-goods-table-detail">
        <div class="dialog_header">
          <h3>选择物品</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="chooseGoodsData"
            highlight-current-row
            @selection-change="handleSelectionChange"
            :height="this.mainListHeight(300) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-if="tableSettingData.goods.isShowMulti"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              v-for="item in Object.keys(chooseGoodsShowData)" :key="item"
              align="center"
              :prop="item"
              :label="chooseGoodsShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableSettingData.goods.params.page"
                :page-size="tableSettingData.goods.params.limit"
                :total="tableSettingData.goods.counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>

        <div class="close-btn-container">
          <el-button v-if="!tableSettingData.goods.isShowMulti" size="small" type="danger"
                     @click="tableSettingData.goods.isShowMulti = true;">删除
          </el-button>
          <el-button v-if="tableSettingData.goods.isShowMulti" size="small" type="primary" @click="deleteGoods">确认
          </el-button>
          <el-button v-if="tableSettingData.goods.isShowMulti" size="small" type="info"
                     @click="tableSettingData.goods.isShowMulti=false">取消
          </el-button>
        </div>


        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="chooseGoods">确定</el-button>
          <el-button size="small" type="info" @click="choose_goods_table_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加物品-->
    <lj-dialog
      :visible="add_goods_form_visible"
      :size="{width: 550 + 'px',height: 600 + 'px'}"
      @close="add_goods_form_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>添加物品</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form ref="addGoodsForm" :rules="rules.addGoods" :model="add_goods_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item prop="classify" label="分类" required>


              <dropdown-list ref="categoryDropdown1" :url="`${this.url}eam/category`" title="必选" :params="{'type':'1'}"
                             v-model="add_goods_form.classify"></dropdown-list>


              <!--              <dropdown-list ref="categoryDropdown1" :url="`${this.url}eam/category`" title="必选" code="1"-->
              <!--                             v-model="add_goods_form.classify"></dropdown-list>-->
              <span class="btn_add" @click="addCategory(1)">+</span>
            </el-form-item>
            <el-form-item prop="brand" label="品牌" required>
              <dropdown-list ref="categoryDropdown3" :url="`${this.url}eam/category`" title="必选" code="3"
                             v-model="add_goods_form.brand"></dropdown-list>
              <span class="btn_add" @click="addCategory(3)">+</span>
            </el-form-item>

            <el-form-item prop="name" label="名称" required>
              <el-input v-model="add_goods_form.name" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item prop="unit" label="单位" required>
              <dropdown-list ref="categoryDropdown4" :url="`${this.url}eam/category`" title="必选" code="4"
                             v-model="add_goods_form.unit"></dropdown-list>
              <span class="btn_add" @click="addCategory(4)">+</span>
            </el-form-item>

            <el-form-item prop="counts" label="预警数量" required>
              <el-input v-model.number="add_goods_form.counts" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input type="textarea" v-model="add_goods_form.remark" placeholder="请填写备注" style="width: 320px">
              </el-input>
            </el-form-item>


          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveGoods('addGoodsForm')">提交</el-button>
          <el-button size="small" type="info" @click="add_goods_form_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>

    <!--添加目录dialog-->
    <lj-dialog
      :visible="add_category_visible"
      :size="{width: 550 + 'px',height: 300 + 'px'}"
      @close="add_category_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>{{add_category_form_tip.title}}</h3>
        </div>
        <div class="dialog_main borderNone">
          <el-form ref="addCategoryForm" :rules="rules.addCategory" :model="add_goods_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item prop="name" required :label="add_category_form_tip.label">
              <el-input v-model="add_category_form.name" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button @click="saveCategory" size="small" type="danger">保存</el-button>
          <el-button size="small" type="info" @click="add_category_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--入库详情table-->
    <lj-dialog
      :visible="in_repository_table_visible"
      :size="{width: 1150 + 'px',height: 800 + 'px'}"
      @close="in_repository_table_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>入库详情</h3>
          <div class="header_right">
            <!--<el-input type="primary" size="small" ></el-input>-->
            <!--<div class="lj-header-search">-->
            <!--<i class="el-icon-search" style="position: absolute; top: 7px; right: 195px;"></i>-->
            <!--<input placeholder="搜索物品名称/品牌" type="text" style="border: 1px solid #ccc; border-radius:20px;width: 220px;height: 28px;padding: 2px 12px 2px 32px;" />-->
            <!--</div>-->
            <div class="lj-header-search">
              <i class="el-icon-search"></i>
              <input
                v-model="tableSettingData.inRepository.searchParams"
                @keydown.enter="getInRepositoryList(tableSettingData.inRepository.currentSelection.category_id,tableSettingData.inRepository.searchParams)"
                placeholder="搜索采购人" type="text"/>
            </div>

            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.inRepository.tableData"
            highlight-current-row
            :height="this.mainListHeight(200) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(tableSettingData.inRepository.tableShowData)" :key="item"
              align="center"
              :prop="item"
              :label="tableSettingData.inRepository.tableShowData[item]">
            </el-table-column>
            <el-table-column
              key="qrCode"
              align="center"
              prop="qrCode"
              label="二维码">
              <template slot-scope="scope">
                <div @click="getQrCodeList(scope.row.id)" class="qr-code"></div>
              </template>
            </el-table-column>
            <el-table-column
              key="remark"
              align="center"
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page" style="bottom: 30px">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange($event,'inRepository')"
                :current-page="tableSettingData.inRepository.params.page"
                :page-size="tableSettingData.inRepository.params.limit"
                :total="tableSettingData.inRepository.counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>
      </div>
    </lj-dialog>


    <!--二维码table-->
    <lj-dialog
      :visible="tableSettingData.qrCode.table_dialog_visible"
      :size="{width: 850 + 'px',height: 800 + 'px'}"
      @close="tableSettingData.qrCode.table_dialog_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>LG-显示器</h3>
          <div class="header_right">

          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="tableSettingData.qrCode.tableData"
            highlight-current-row
            :height="this.mainListHeight(200) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              key="repairId"
              align="center"
              prop="repairId"
              label="维修编号">
            </el-table-column>
            <el-table-column
              key="qrCode"
              align="center"
              prop="qrCode"
              label="二维码">
              <template slot-scope="scope">
                <div @click="showQrCode(scope.row)" class="qr-code" style="margin-left: 170px">
                  <!--                  <img :src="scope.row.qrCode" alt="">-->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </lj-dialog>


    <!--</lj-dialog-img>-->
    <lj-dialog-img :visible.sync="tableSettingData.qrCode.form.form_dialog_visible">
      <div class="qr-container">
        <div class="qr-code-large">
          <img :src="tableSettingData.qrCode.form.formData.qrCode" alt="">
        </div>
        <div>{{tableSettingData.qrCode.form.formData.goods_number}}</div>
      </div>

    </lj-dialog-img>


  </div>
</template>

<script>
  import {DROPDOWN_CONSTANT} from '@/assets/js/allConstantData';
  import LjDialog from '../../../common/lj-dialog.vue';
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjDialogImg from '../components/lj-dialog-img';//用于显示二维码图片
  import OrgChoose from '../../../common/lightweightComponents/OrgChoose';
  import UserChoose from "../../../common/lightweightComponents/UserChoose";


  export default {
    name: "index",
    props: ['searchVal', 'in_repository_visible'],
    components: {
      UserChoose,
      LjDialog,
      LjDialogImg,
      DropdownList,
      OrgChoose
    },
    data() {
      return {

        rules: {
          inRepositoryRules: {
            goods: [
              {required: true, message: '请选择物品', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            counts: [
              {type:'number',required: true, message: '请输入数量且只能为数字', trigger: 'blur'},
            ],
            location: [
              {required: true, message: '不能为空', trigger: 'change'},
            ],
            purchasePerson: [
              {required: true, message: '不能为空', trigger: 'change'},
            ],
            price: [
              {type:'number',required: true, message: '请输入价格且只能为数字', trigger: 'blur'},
            ],
            totalPrice: [
              {type:'number',required: true, message: '请输入价格且只能为数字', trigger: 'blur'},
            ],
            resource: [
              {type:'number',required: true, message: '请输入价格采购源', trigger: 'blur'},
            ],
          },
          addGoods: {
            classify: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            brand: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            unit: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
            counts: [
              {type:'number',required: true, message: '请输入数量且只能为数字', trigger: 'blur'},
            ],
          },
          addCategory: {
            name: [
              {required: true, message: '不能为空', trigger: 'blur'},
              //{min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
          },
        },


        DROPDOWN_CONSTANT,
        url: globalConfig.humanResource_server,

        //tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
        },
        //chooseRowIds: [],


        currentTable: '',
        tableSettingData: {
          repository: {//入库
            counts: 0,
            params: {
              search: '',
              page: 1,
              limit: 5,
            },
            tableData: [],
            chooseRowIds: [],
            currentSelection: {}//当前选择行
          },
          goods: {//物品
            counts: 0,
            params: {
              search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行,
            multiSelection: [],//多选行
            isShowMulti: false,//是否显示多选
          },
          borrowReceive: {//领/借用
            counts: 5,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//借/领用form表单控制
            table_dialog_title: '',
            tableData: [],//借/领用表格数据
            tableShowData: {
              department: '部门',
              name: '姓名',
              applyType: '申请类型',
              applyTime: '申请日期',
              takeTime: '领用日期',
              returnTime: '归还日期'
            },

          },
          repair: {//维修
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行
            that: this,

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              department: '部门',
              name: '姓名',
              //repairId: '维修编号',
              repairCost: '维修费用',
              settlement: '结算方式',
            },

          },
          useless: {//报废
            counts: 5,
            params: {
              //search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              department: '部门',
              name: '姓名',
              goods_number: '报废编号',
              responsiblePerson: '任责人',
              repair_price: '维修费用',
              payment_type: '结算方式',
            },
          },
          inRepository: {//入库详情列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,
              init() {
                this.page = 1;
                this.limit = 5;
              }
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            tableShowData: {
              name: '物品名',
              count: '数量',
              price: '单价',
              totalPrice: '总价',
              location: '存放位置',
              purchasePerson: '采购人',
              resource: '采购源',
              inRepositoryTime: '入库时间',
              //qrCode:'二维码',
              //remark:'备注',
            },
            searchParams: '',//入库详情table dialog中的模糊搜索
          },
          qrCode: {//二維碼详情列表
            counts: 0,
            params: {
              //search: '',
              page: 1,
              limit: 5,
            },
            chooseRowIds: [],
            currentSelection: {},//当前选择行

            table_dialog_visible: false,//form表单控制
            table_dialog_title: '',
            tableData: [],//表格数据
            form: {//二维码表单
              form_dialog_visible: false,
              formData: {
                id: '',
                repairId: '',//维修编号
                qrCode: ''
              }
            }
          },
        },

        formSettingData: {
          inRepository: {
            placeholder: '请选择人员',
          }
        },

        /*
            *表单群组  begin
        */

        //借/领用表单
        /*tableSettingData.borrowReceive.table_dialog_visible: false,//借/领用form表单控制
        borrowData: [],//借/领用表格数据
        borrowShowData: {
          department: '部门',
          name: '姓名',
          applyType: '申请类型',
          applyTime: '申请日期',
          takeTime: '领用日期',
          returnTime: '归还日期'
        },*/

        //维修表单
        /*tableSettingData.repair.table_dialog_visible: false,//维修form表单控制
        repairData: [],//维修表格数据
        repairShowData: {
          department: '部门',
          name: '姓名',
          repairId: '维修编号',
          repairCost: '维修费用',
          settlement: '结算方式',
        },*/

        //报废表单
        useless_table_visible: false,//报废form表单控制
        uselessData: [],//报废表单数据
        uselessShowData: {
          department: '部门',
          name: '姓名',
          uselessId: '报废编号',
          responsiblePerson: '任责人',
          repairCost: '维修费用',
          settlement: '结算方式',
        },

        /*
            *表单群组  end
        */

        /*
        *  表单群组  begin
        * */


        //入库form
        in_repository: false,
        in_repository_placeholder: '请选择人员',
        in_repository_form: {//入库form表单
          goods: '',
          counts: '',//数量
          department: 'user',//部门
          location: '',
          purchasePerson: '',
          price: '',//单价
          totalPrice: '',//总价
          resource: '',//采购源
          remark: '',//备注
        },

        //选择物品table
        choose_goods_table_visible: false,
        chooseGoodsData: [],//选择物品表单数据
        chooseGoodsShowData: {
          classify: '分类',//分类
          name: '名称',//名称
          brand: '品牌',//品牌
          unit: '单位',//单位
          counts: '预警数量',//预警数量
        },

        //添加物品
        add_goods_form_visible: false,
        add_goods_form: {
          classify: '',//分类
          brand: '',//品牌
          name: '',//名称
          unit: '',//单位
          counts: '',//预警数量
          remark: '',//备注
        },

        //添加目录结构
        add_category_visible: false,
        add_category_form: {
          name: '',
          type: 1,
        },
        add_category_form_tip: {
          title: '添加分类',
          label: "分类名称",
        },


        //入库详情
        in_repository_table_visible: false,
        inRepositoryData: [],//选择物品table数据
        inRepositoryShowData: {
          name: '物品名',
          count: '数量',
          price: '单价',
          totalPrice: '总价',
          location: '存放位置',
          purchasePerson: '采购人',
          resource: '采购源',
          inRepositoryTime: '入库时间',
          //qrCode:'二维码',
          //remark:'备注',
        },

        /*//二维码table
        qr_code_table_visible: false,
        qrCodeData: [],//二维码table数据*/

        //显示二维码
        is_show_qr_code: false,
        /*
        *  表单群组  end
        * */

      }
    },
    mounted() {
      this.initData();
      this.getRepositoryList();
    },
    activated() {
    },
    watch: {
      searchVal: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          this.params = val;
          this.getRepositoryList();
        },
        deep: true
      },
      in_repository_visible: {
        handler(val, oldVal) {
          this.in_repository = !this.in_repository;
        },
        //deep:true,
        //immediate:true//第一次绑定也执行
      },

    },
    computed: {},
    methods: {

      //入库表单提交
      inRepository() {

        this.$refs['inRepositoryForm'].validate((valid) => {
          if (valid) {//成功
            let params = {
              category_id: this.in_repository_form.goods,
              number: this.in_repository_form.counts,
              unit_price: this.in_repository_form.price,
              total_price: this.in_repository_form.totalPrice,
              source_id: this.in_repository_form.resource,
              purchaser_id: this.in_repository_form.purchasePerson.join(),
              location_type: this.in_repository_form.department,
              location_id: this.in_repository_form.location,
              remark: this.in_repository_form.remark,
            };
            let urls = `${this.url}eam/storage`;
            this.$http.post(urls, params).then(res => {
              if (res.code.endsWith('0')) {
                this.$LjNotify('success', {
                  title: '成功',
                  message: '添加成功',
                });
                this.in_repository = false;
                this.getRepositoryList();
              }
            });
          }
        });
      },


      //选择物品后将名字渲染到入库表单的选择物品字段上
      chooseGoods() {
        let id = this.tableSettingData[this.currentTable].currentSelection?.id || '';
        if (id) {
          this.in_repository_form.goods = id;
          this.choose_goods_table_visible = false;
          this.tableSettingData[this.currentTable].currentSelection = {};
        } else {
          this.$LjNotify('error', {
            title: '失败',
            message: '请选择一件物品',
          });
        }
      },

      //删除物品
      async deleteGoods() {
        this.$LjConfirm().then(async () => {
          let goodsList = this.tableSettingData['goods']?.multiSelection;
          if (goodsList && goodsList.length > 0) {
            for (let item of goodsList) {
              await this.$http.delete(`${this.url}eam/category/${item.id}`).then(res => {
                if (res.code == '20040') {
                  this.$LjNotify('success', {
                    title: '成功',
                    message: '删除成功'
                  });
                }
                this.$refs.categoryDropdown2.update();//更新
              }).catch(err => {
                this.$LjNotify('error', {
                  title: '失败',
                  message: '删除失败'
                });
              });
            }
            this.tableSettingData.goods.isShowMulti = false
            await this.getGoodsList();
          }
        });

      },


      async getGoodsList() {
        this.choose_goods_table_visible = true;
        this.currentTable = 'goods';
        this.chooseGoodsData = [];
        let params = {type: 2, ...this.tableSettingData[this.currentTable].params};
        await this.$http.get(this.url + 'eam/category', params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                name: item.id + item.name,
                classify: item?.parent?.name || '',
                brand: item?.brand?.name || '',
                unit: item?.unit?.name || '',
                counts: item?.warning_number || 0
              }
              this.chooseGoodsData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }

        })
      },


      saveGoods() {
        this.$refs['addGoodsForm'].validate((valid) => {
          if (valid) {//成功
            let params = {
              name: this.add_goods_form.name,
              parent_id: this.add_goods_form.classify,
              type: 2,
              brand_id: this.add_goods_form.brand,
              unit_id: this.add_goods_form.unit,
              warning_number: this.add_goods_form.counts,
              remarks: this.add_goods_form.remark
            };
            this.$http.post(`${this.url}eam/category`, params).then(res => {
              if (res.code == '20010') {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                });
                this.add_goods_form_visible = false;
                this.add_goods_form = {};
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                });
              }
              this.$refs.categoryDropdown2.update();//更新
            });
          }
        });
      },

      //添加category
      addCategory(index) {
        this.add_category_visible = true;
        switch (index) {
          case 1:
            this.add_category_form.type = 1;//
            this.add_category_form_tip.title = '添加分类';
            this.add_category_form_tip.label = '分类名称';
            break;
          case 3:
            this.add_category_form.type = 3;//
            this.add_category_form_tip.title = '添加品牌';
            this.add_category_form_tip.label = '品牌名称';
            break;
          case 4:
            this.add_category_form.type = 4;//
            this.add_category_form_tip.title = '添加单位';
            this.add_category_form_tip.label = '单位名称';
            break;
          case 5:
            this.add_category_form.type = 5;//
            this.add_category_form_tip.title = '添加采购源';
            this.add_category_form_tip.label = '采购源';
            break;

        }
      },

      //保存( 分类-1 品牌-3 单位-4 采购源-5 )的目录
      saveCategory() {
        //addCategoryForm
        this.$refs['addCategoryForm'].validate((valid) => {
          if (valid) {//成功
            this.$http.post(this.url + 'eam/category', this.add_category_form).then(res => {
              if (res.code == '20010') {
                this.$LjNotify('success', {
                  title: '成功',
                  message: res.msg,
                  //subMessage: res.msg,
                });
                this.add_category_visible = false;
                this.$refs['categoryDropdown' + this.add_category_form.type].update();
                this.add_category_form = {};
              } else {
                this.$LjNotify('error', {
                  title: '失败',
                  message: res.msg,
                  //subMessage: res.msg,
                });
              }
            });
          }
        });
      },


      getRepositoryList() {
        this.currentTable = 'repository';
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(this.url + 'eam/eam', this.tableSettingData[this.currentTable].params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                category_id: item?.category_id || '-',
                name: item?.goods?.name || '-',
                totalCounts: parseInt(item?.number) || '-',//总数量
                stockCounts: parseInt(item?.now_number),//库存数量
                borrowReceiveCounts: `${parseInt(item?.receive_number)}/${parseInt(item?.borrow_number)}`,
                repairCounts: parseInt(item?.repair_number),
                uselessCounts: parseInt(item?.scrap_number),
                //status: parseInt(item?.number) - parseInt(item?.goods?.warning_number) > 10 ? '正常' : '预警',
                //status: parseInt(item?.number) > 10 ? '正常' : '预警',
                status: parseInt(item?.number),
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取领/借表格详情
      getBorrowReceiveList(item) {
        this.tableSettingData.borrowReceive.table_dialog_visible = true;
        this.currentTable = 'borrowReceive';
        this.tableSettingData[this.currentTable].table_dialog_title = item.name;
        this.tableSettingData[this.currentTable].tableData = [];
        this.$http.get(this.url + `eam/eam/${item.category_id}/records`, this.tableSettingData[this.currentTable].params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                department: item?.user?.org[0]?.name || '-',
                name: item?.user?.name || '',
                applyType: item?.goods?.type == '1' ? '领用' : '借用',
                applyTime: item?.process?.apply_time || '-',
                takeTime: item?.receive_time || '-',
                returnTime: item?.return_date || '-',
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取维修表格详情
      getRepairList(item) {
        this.currentTable = 'repair';
        this.tableSettingData.repair.table_dialog_visible = true;
        this.tableSettingData[this.currentTable].table_dialog_title = item.name;
        this.tableSettingData[this.currentTable].tableData = [];
        let params = {...this.tableSettingData[this.currentTable].params, ...{goods_status: 3}};
        this.$http.get(this.url + `eam/eam/${item.category_id}/records`, params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                department: item?.user?.org[0]?.name || '',
                name: item?.user?.name || '',
                repairCost: item?.repair_price,
                settlement: item?.payment_type == 1 ? '现金结算' : '工资扣款',
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取报废表格详情
      getUselessList(item) {
        debugger
        this.currentTable = 'useless';
        this.tableSettingData[this.currentTable].table_dialog_visible = true;
        this.tableSettingData[this.currentTable].table_dialog_title = item.name;
        this.tableSettingData[this.currentTable].tableData = [];
        let params = {...this.tableSettingData[this.currentTable].params, ...{goods_status: 4}};
        this.$http.get(this.url + `eam/eam/${item.category_id}/records`, params).then(res => {

          if (res.code == '20000') {
            for (let item of res.data.data) {
              let obj = {
                id: item.id,
                department: item?.user?.org[0]?.name || '-',
                name: item?.user?.name || '-',
                goods_number: item.goods_number || '-',
                responsiblePerson: item.process?.responsible?.responsible_info?.name || '-',//任责人
                repair_price: item?.process?.responsible?.repair_price || 0,//维修费用
                payment_type: DROPDOWN_CONSTANT.ASSETS_MANAGEMENT.GOODS_DETAIL.PAYMENT[item.process?.responsible?.payment_type || 0],
              }
              this.tableSettingData[this.currentTable].tableData.push(obj)
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        })
      },

      //获取入库详情table表格数据
      getInRepositoryList(categoryId, searchParams) {
        this.currentTable = 'inRepository';
        this.tableSettingData[this.currentTable].tableData = [];
        if (searchParams) this.tableSettingData[this.currentTable].params.init();
        let params = {category_id: categoryId, search: searchParams};
        let finalParams = {...params, ...this.tableSettingData[this.currentTable].params};
        this.$http.get(`${this.url}eam/storage`, finalParams).then(res => {
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id || '-',
                name: item.goods?.name || '-',
                count: item.number || 0,
                price: item.unit_price || 0,
                totalPrice: item.total_price || 0,
                location: item.location?.location?.name || '-',
                purchasePerson: item?.purchaser?.name || '-',
                resource: item.source?.name || '-',
                inRepositoryTime: item.created_at || '-',
                remark: item.remark || '-'
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        });
      },

      //获取二维码列表table表格数据
      getQrCodeList(inRepoId) {
        this.currentTable = 'qrCode';
        this.tableSettingData.qrCode.table_dialog_visible = true
        this.tableSettingData[this.currentTable].tableData = [];
        //let params = {category_id:categoryId};
        //let finalParams = {...params,...this.tableSettingData[this.currentTable].params};
        this.$http.get(`${this.url}eam/storage/${inRepoId}/qrcode`).then(res => {
          if (res.code.endsWith('0')) {
            for (let item of res.data.data) {
              let obj = {
                id: item.id || Date.now(),
                repairId: item?.goods_number || '-',
                qrCode: item?.img?.replace('/\\', '')
              };
              this.tableSettingData[this.currentTable].tableData.push(obj);
            }
            //this.tableSettingData[this.currentTable].counts = res.data.count;
          }
        });
      },

      showQrCode(row) {
        this.tableSettingData.qrCode.form.form_dialog_visible = true;
        this.tableSettingData.qrCode.form.formData.qrCode = row.qrCode;
        this.tableSettingData.qrCode.form.formData.goods_number = row.repairId;//维修编号

      },


      /*demo() {
      },
*/
      handleChangeDate(id) {

      },
      handleCloseMenu() {
        //this.show_market = false;
      },


      initData() {
        //库房总览表格
        /*const nameArr = ['LG-显示器', 'BenQ-显示器', '美帝良心想-显示器', '苹果-显示器', '三星-显示器', '现代-显示器', '宏基-显示器', 'HP-显示器', '小米-显示器'];
        for (let i = 0; i < nameArr.length; i++) {
          let obj = {
            id: i + 1,
            name: nameArr[i],
            totalCounts: 10 + i,
            stockCounts: 6 + i,
            borrowReceiveCounts: 6,
            repairCounts: '4',
            uselessCounts: '1',
            status: '预警',
          }
          this.tableData.push(obj)
        }
        this.counts = 1000;*/


        //借/领用表格数据初始化
        //borrowData
        /*for (let i = 0; i < 8; i++) {
          let obj = {
            id: i + 1,
            department: '研发部',
            name: '张三',
            applyType: '借用',
            applyTime: '2019-03-18',
            takeTime: '2019-03-25',
            returnTime: '2020-02-06'
          }
          this.tableSettingData.borrowReceive.tableData.push(obj)
        }*/

        //维修表格数据初始化
        //repairData
        /*for (let i = 0; i < 3; i++) {
          let obj = {
            id: i + 1,
            department: '研发部',
            name: '赵四',
            repairId: '20190318155908',
            repairCost: '500',
            settlement: '工资扣除',
          }
          this.tableSettingData.repair.tableData.push(obj)
        }*/


        //报废表格数据初始化
        //repairData
        for (let i = 0; i < 3; i++) {
          let obj = {
            id: i + 1,
            department: '研发部',
            name: '赵四',
            uselessId: '20190318155908',
            responsiblePerson: '赵铁柱',
            repairCost: '500',
            settlement: '工资扣除',
          }
          this.uselessData.push(obj)
        }


        //选择物品表格数据初始化
        //chooseGoodsData
        /*for (let i = 0; i < 6; i++) {
          let obj = {
            id: i + 1,
            classify: '显示器',//分类
            name: 'LG-显示器',//名称
            brand: 'LG',//品牌
            unit: '台',//单位
            counts: '3',//预警数量
          }
          this.chooseGoodsData.push(obj)
        }*/

        //入库详情表格数据初始化
        /*for (let i = 0; i < 8; i++) {
          let obj = {
            id: i + 1,
            name: '张三',
            count: 20 + i,
            price: 34,
            totalPrice: 35,
            location: '南京一组',
            purchasePerson: '赵四',
            resource: '南京建邺',
            inRepositoryTime: '20190318',
            qrCode: '二维码',
            remark: '备注备注',
          }
          this.inRepositoryData.push(obj)
        }*/

        //二维码table数据初始化
        //qrCodeData
        /*for (let i = 0; i < 7; i++) {
          let obj = {
            id: i + 1,
            repairId: '20190319091956',
            qrCode: '二维码',
          }
          this.qrCodeData.push(obj)
        }*/


      },


      // 当前点击
      tableClickRow(row) {
        this.tableSettingData[this.currentTable].currentSelection = row;
        let ids = this.tableSettingData[this.currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);
      },

      //表格某一行双击 ->特指 inRepository表格  即入库详情列表表格
      tableDblClick(row) {
        let categoryId = row.category_id;//物品编号 通过物品编号获取所有的入库记录
        this.tableSettingData[this.currentTable].currentSelection = row;
        this.getInRepositoryList(categoryId);
        this.in_repository_table_visible = true;
      },
      //table多选时触发的事件
      handleSelectionChange(val) {
        switch (this.currentTable) {
          case 'repository':
            break;
          case 'goods':
            this.tableSettingData[this.currentTable].multiSelection = val;
            break;
          default:
            break;
        }
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.tableSettingData[this.currentTable].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val, type) {
        if (type) {
          this.currentTable = type;
        }
        this.tableSettingData[this.currentTable].params.page = val;
        switch (this.currentTable) {
          case 'repository':
            this.getRepositoryList();
            break;
          case 'goods':
            this.getGoodsList();
            break;
          case 'inRepository':
            let categoryId = this.tableSettingData[this.currentTable].currentSelection.category_id;
            this.getInRepositoryList(categoryId);
            break;
          default:
            break;
        }
      },

    },

  }
</script>


<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/repository/overView/index.scss";

  @mixin childrenImg($m, $n) {
    $url: '../../../../assets/image/humanResource/repository/overView/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #overView {

      .dialog_container {
        .choose-goods-icon {
          @include childrenImg('xz.png', 'theme1')
        }
      }

      .qr-code {
        @include childrenImg('ewm.png', 'theme1')
      }

      .qr-container {
        .qr-code-large {
          @include childrenImg('ewm.png', 'theme1')
        }

      }

    }
  }

  #theme_name.theme2 {
    #overView {

    }
  }

  #theme_name.theme3 {
    #overView {

    }
  }

  #theme_name.theme4 {
    #overView {

    }
  }
</style>
