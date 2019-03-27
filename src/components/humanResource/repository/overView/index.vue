<template>
  <div id="overView">
    <div class="mainListTable" :style="{'height': this.mainListHeight() + 'px'}">
      <el-table
        :data="tableData"
        highlight-current-row
        :height="this.mainListHeight(30) + 'px'"
        :row-class-name="tableChooseRow"
        @cell-click="tableClickRow"
        @row-dblclick="tableDblClick"
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
            <a @click="borrow_table_visible = true">{{scope.row.borrowReceiveCounts}}</a>
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
            <a @click="repair_table_visible = true">{{scope.row.repairCounts}}</a>
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
            <a @click="useless_table_visible = true">{{scope.row.uselessCounts}}</a>
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
            @current-change="handleCurrentChange"
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
      :visible="borrow_table_visible"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
      @close="borrow_table_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>LGD显示器 借/领用详情</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="borrowData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(borrowShowData)" :key="item"
              align="center"
              :prop="item"
              :label="borrowShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
          <el-button size="small" type="info" @click="borrow_table_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--维修表格详情-->
    <lj-dialog
      :visible="repair_table_visible"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
      @close="repair_table_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>LGD显示器 维修详情</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="repairData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(repairShowData)" :key="item"
              align="center"
              :prop="item"
              :label="repairShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
          <el-button size="small" type="info" @click="repair_table_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--报废表格详情-->
    <lj-dialog
      :visible="useless_table_visible"
      :size="{width: 900 + 'px',height: 700 + 'px'}"
      @close="useless_table_visible = false"
    >
      <div class="dialog_container">
        <div class="dialog_header">
          <h3>LGD显示器 报废详情</h3>
          <div class="header_right">
            <!--<el-button size="mini" type="primary" plain>增加</el-button>-->
            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="uselessData"
            highlight-current-row
            :height="this.mainListHeight(430) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(uselessShowData)" :key="item"
              align="center"
              :prop="item"
              :label="uselessShowData[item]">
            </el-table-column>
          </el-table>
          <footer class="flex-center common-page">
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
          <el-button size="small" type="info" @click="useless_table_visible = false">取消</el-button>
        </div>
      </div>
    </lj-dialog>


    <!--入库-->
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
          <el-form :model="in_repository_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item label="物品">
              <div class="items-center iconInput choose-goods" @click="getGoodsList" style="width: 320px">
                <!--<el-input v-model="in_repository_form.goods" placeholder="请选择物品" style="width: 300px">
                </el-input>-->
                <dropdown-list ref="categoryDropdown2" width="300" :url="`${this.url}eam/category`" title="请选择物品" code="2"
                               v-model="in_repository_form.goods"></dropdown-list>
                <p class="choose-goods-icon"></p>
              </div>
              <span class="btn_add" style="position: absolute;right: 13px;top: 3px;"
                    @click="add_goods_form_visible = true">+</span>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="in_repository_form.goods" placeholder="请输入数量" style="width: 320px">
              </el-input>
            </el-form-item>
            <el-form-item label="存放位置">

              <el-select v-model="in_repository_form.department" placeholder="存储类型" style="width: 120px">
                <el-option :value="'user'" label="人员"></el-option>
                <el-option :value="'org'" label="部门"></el-option>
              </el-select>
              <el-input style="width: 200px" v-model="in_repository_form.location" @focus="staffModule = true" @click="staffModule = true" placeholder="请选择部门"></el-input>
              <!--<el-select v-model="in_repository_form.location" placeholder="请选择部门" style="width: 195px">
                <el-option :value="1" label="选择部门1"></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item label="采购人">
              <el-select v-model="in_repository_form.purchasePerson" placeholder="请输入采购人" style="width: 320px">
                <el-option :value="1" label="采购人1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单价">
              <el-input v-model="in_repository_form.price" placeholder="请输入单价" style="width: 320px">
              </el-input>
            </el-form-item>
            <el-form-item label="总价">
              <el-input v-model="in_repository_form.totalPrice" placeholder="请输入总价" style="width: 320px">
              </el-input>
            </el-form-item>
            <el-form-item label="采购源">
              <dropdown-list ref="categoryDropdown5" :url="`${this.url}eam/category`" title="必选" code="5"
                             v-model="add_goods_form.resource"></dropdown-list>
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
      <div class="dialog_container">
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
            :height="this.mainListHeight(300) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'40px'}"
            style="width: 100%">
            <!--<el-table-column
              type="selection"
              width="55">
            </el-table-column>-->
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
          <el-form :model="add_goods_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item label="分类" required>
              <dropdown-list ref="categoryDropdown1" :url="`${this.url}eam/category`" title="必选" code="1"
                             v-model="add_goods_form.classify"></dropdown-list>
              <span class="btn_add" @click="addCategory(1)">+</span>
            </el-form-item>
            <el-form-item label="品牌" required>
              <dropdown-list ref="categoryDropdown2" :url="`${this.url}eam/category`" title="必选" code="3"
                             v-model="add_goods_form.brand"></dropdown-list>
              <span class="btn_add" @click="addCategory(3)">+</span>
            </el-form-item>

            <el-form-item label="名称" required>
              <el-input v-model="add_goods_form.name" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item label="单位" required>
              <dropdown-list ref="categoryDropdown4" :url="`${this.url}eam/category`" title="必选" code="4"
                             v-model="add_goods_form.unit"></dropdown-list>
              <span class="btn_add" @click="addCategory(4)">+</span>
            </el-form-item>

            <el-form-item label="预警数量" required>
              <el-input v-model="add_goods_form.counts" placeholder="必填" style="width: 320px">
              </el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input type="textarea" v-model="add_goods_form.remark" placeholder="请填写备注" style="width: 320px">
              </el-input>
            </el-form-item>


          </el-form>
        </div>
        <div class="dialog_footer">
          <el-button size="small" type="danger" @click="saveGoods">提交</el-button>
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
          <el-form :model="add_goods_form" style="text-align: left" size="small" label-width="100px">
            <el-form-item :label="add_category_form_tip.label">
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
              <input placeholder="搜索物品名称/品牌" type="text"/>
            </div>

            <!--<div class="icon-add"><b>+</b></div>-->
          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="inRepositoryData"
            highlight-current-row
            :height="this.mainListHeight(200) + 'px'"
            :row-class-name="tableChooseRow"
            @cell-click="tableClickRow"
            header-row-class-name="tableHeader"
            :row-style="{height:'62px'}"
            style="width: 100%">
            <el-table-column
              v-for="item in Object.keys(inRepositoryShowData)" :key="item"
              align="center"
              :prop="item"
              :label="inRepositoryShowData[item]">
            </el-table-column>
            <el-table-column
              key="qrCode"
              align="center"
              prop="qrCode"
              label="二维码">
              <template slot-scope="scope">
                <div @click="qr_code_table_visible = true" class="qr-code"></div>
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
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-size="params.limit"
                :total="counts"
                layout="total,jumper,prev,pager,next">
              </el-pagination>
            </div>
          </footer>
        </div>
      </div>
    </lj-dialog>


    <!--二维码table-->
    <lj-dialog
      :visible="qr_code_table_visible"
      :size="{width: 850 + 'px',height: 800 + 'px'}"
      @close="qr_code_table_visible = false"
    >
      <div class="dialog_container repository-overview">
        <div class="dialog_header">
          <h3>LG-显示器</h3>
          <div class="header_right">

          </div>
        </div>
        <div class="dialog_main borderNone">
          <el-table
            :data="qrCodeData"
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
                <div @click="is_show_qr_code = true" class="qr-code" style="margin-left: 170px"></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </lj-dialog>


    <!--</lj-dialog-img>-->
    <lj-dialog-img :visible.sync="is_show_qr_code">
      <div class="qr-container">
        <div class="qr-code-large"></div>
        <div>201903191059</div>
      </div>

    </lj-dialog-img>



    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
    <DepartOrgan :module="departModule" :organData="organData" @close="hiddenOrgan"></DepartOrgan>

  </div>
</template>

<script>
  import LjDialog from '../../../common/lj-dialog.vue';
  //import DropdownList from '../../components/dropdown-list';
  import StaffOrgan from '../../../common/staffOrgan.vue'
  import DepartOrgan from '../../../common/departOrgan.vue'
  import DropdownList from '../../../common/lightweightComponents/dropdown-list';
  import LjDialogImg from '../components/lj-dialog-img';//用于显示二维码图片


  export default {
    name: "index",
    props: ['searchVal', 'in_repository_visible'],
    components: {
      LjDialog,
      LjDialogImg,
      DropdownList,
      StaffOrgan,
      DepartOrgan
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        checkList: [],


        staffModule: false,
        departModule: false,
        postModule: false,
        organData: {},// 组织架构配置 选择数量 num
        organKey: '',





        tableData: [],
        counts: 0,
        params: {
          search: '',
          page: 1,
          limit: 30,
        },
        chooseRowIds: [],

        goodsParams: {
          search: '',
          page: 1,
          limit: 8,
        },
        goodsCounts: 0,
        goodsChooseRowIds: [],

        currentTable: '',
        tableSettingData: {
          repository: {
            counts: 0,
            params: {
              search: '',
              page: 1,
              limit: 10,
            },
            chooseRowIds: [],
            currentSelection: {}//当前选择行
          },
          goods: {
            counts: 0,
            params: {
              search: '',
              page: 1,
              limit: 8,
            },
            chooseRowIds: [],
            currentSelection: {}//当前选择行
          },
        },

        /*
            *表单群组  begin
        */

        //借/领用表单
        borrow_table_visible: false,//借/领用form表单控制
        borrowData: [],//借/领用表格数据
        borrowShowData: {
          department: '部门',
          name: '姓名',
          applyType: '申请类型',
          applyTime: '申请日期',
          takeTime: '领用日期',
          returnTime: '归还日期'
        },

        //维修表单
        repair_table_visible: false,//维修form表单控制
        repairData: [],//维修表格数据
        repairShowData: {
          department: '部门',
          name: '姓名',
          repairId: '维修编号',
          repairCost: '维修费用',
          settlement: '结算方式',
        },

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
        in_repository_form: {//入库form表单
          goods: '',
          counts: '',//数量
          department: '',//部门
          location: '',
          purchasePerson: '',
          price: '',//单价
          totalPrice: '',//总价
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

        //二维码table
        qr_code_table_visible: false,
        qrCodeData: [],//二维码table数据

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
          //console.log(val,oldVal);
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
        debugger
        this.in_repository_form = {
          goods:'',
        };

        let params = {
          category_id:5,
          number:16,
          unit_price:3000,
          total_price:36000,
          source_id:6,
          purchaser_id:289,
          location_type:'user',
          location_id:[289],
          /*picture: [
            21321,
            3421,
            3211
          ]*/
        };

        this.$http.post(`${this.url}eam/storage`,params).then(res=> {
          debugger
          console.log(res);
          if(res.code=='20020') {
            this.$LjNotify()
          }
        });
      },




      // 关闭 选择人员
      hiddenOrgan(ids, names, arr) {
        this.departModule = false;
        this.staffModule = false;
        this.postModule = false;
        if (ids !== 'close') {
          this.params[this.organKey] = ids;
          this.showName[this.organKey] = names;
        }
      },


      //选择物品后将名字渲染到入库表单的选择物品字段上
      chooseGoods() {
        debugger
        //console.log(this.tableSettingData[this.currentTable].currentSelection);
        let id = this.tableSettingData[this.currentTable].currentSelection?.id||'';
        if(id) {
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


      getGoodsList() {
        this.choose_goods_table_visible = true;
        this.currentTable = 'goods';
        this.chooseGoodsData = [];
        let params = {type: 2, ...this.tableSettingData[this.currentTable].params};
        this.$http.get(this.url + 'eam/category', params).then(res => {
          if (res.code == '20000') {
            for (let item of res.data.data) {
              //console.log(item);
              //debugger
              let obj = {
                id: item.id,
                name: item.name,
                classify: item?.parent?.name || '',
                brand: item?.brand?.name || '',
                unit: item?.unit?.name || '',
                counts: item?.warning_number || 0
              }
              this.chooseGoodsData.push(obj)
            }
          }
          this.tableSettingData[this.currentTable].counts = res.data.count;
        })
      },


      saveGoods() {
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
          //debugger
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
          console.log(res);
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
      },


      getRepositoryList() {
        this.currentTable = 'repository';
        this.$http.get(this.url + 'eam/eam', this.tableSettingData[this.currentTable].params).then(res => {
          //debugger
          if (res.code == '20000') {
            for (let item of res.data.data) {
              //console.log(item);
              let obj = {
                id: item.id,
                name: item.goods.name,
                totalCounts: parseInt(item.number) || '',//总数量
                stockCounts: parseInt(item.now_number),//库存数量
                borrowReceiveCounts: `${parseInt(item.receive_number)}/${parseInt(item.borrow_number)}`,
                repairCounts: parseInt(item.repair_number),
                uselessCounts: parseInt(item.scrap_number),
                status: parseInt(item.number) > parseInt(item.goods.warning_number) ? '正常' : '预警',
              }
              this.tableData.push(obj)
            }
          }

          this.tableSettingData[this.currentTable].counts = res.data.count;
        })
      },

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
        //console.log(this.tableData);
        this.counts = 1000;*/


        //借/领用表格数据初始化
        //borrowData
        for (let i = 0; i < 9; i++) {
          let obj = {
            id: i + 1,
            department: '研发部',
            name: '张三',
            applyType: '借用',
            applyTime: '2019-03-18',
            takeTime: '2019-03-25',
            returnTime: '2020-02-06'
          }
          this.borrowData.push(obj)
        }

        //维修表格数据初始化
        //repairData
        for (let i = 0; i < 3; i++) {
          let obj = {
            id: i + 1,
            department: '研发部',
            name: '赵四',
            repairId: '20190318155908',
            repairCost: '500',
            settlement: '工资扣除',
          }
          this.repairData.push(obj)
        }


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
        for (let i = 0; i < 8; i++) {
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
        }

        //二维码table数据初始化
        //qrCodeData
        for (let i = 0; i < 7; i++) {
          let obj = {
            id: i + 1,
            repairId: '20190319091956',
            qrCode: '二维码',
          }
          this.qrCodeData.push(obj)
        }


      },


      // 当前点击
      tableClickRow(row) {
        this.tableSettingData[this.currentTable].currentSelection = row;
        let ids = this.tableSettingData[this.currentTable].chooseRowIds;
        ids.push(row.id);
        this.ids = this.myUtils.arrayWeight(ids);
      },

      //表格某一行双击
      tableDblClick(row) {
        console.log(row);
        this.in_repository_table_visible = true;
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.tableSettingData[this.currentTable].chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {

        this.tableSettingData[this.currentTable].params.page = val;
        switch (this.currentTable) {
          case 'repository':
            this.getRepositoryList();
            break;
          case 'goods':
            this.getGoodsList();
            break;
          default:
            break;
        }
        //this.getRepositoryList();
        //console.log(`当前页: ${val}`);
      },


      /*// 当前点击
      tableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },

      //表格某一行双击
      tableDblClick(row) {
        console.log(row);
        this.in_repository_table_visible = true;
      },
      // 点击过
      tableChooseRow({row, rowIndex}) {
        return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page = val;
        this.getRepositoryList();
        //console.log(`当前页: ${val}`);
      },*/


      /*goodsTableClickRow(row) {
        let ids = this.chooseRowIds;
        ids.push(row.id);
        this.chooseRowIds = this.myUtils.arrayWeight(ids);
      },
      goodsHandleCurrentChange(val) {
        this.goodsParams.page = val;
        this.getGoodsList();
        //console.log(`当前页: ${val}`);
      },
      goodsHandleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      // 点击过
      goodsTableChooseRow({row, rowIndex}) {
        return this.goodsChooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
      },*/
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
