<template>
    <div id="customer">
        <lj-dialog :visible="lj_visible" :size="{width: 760 + 'px',height: 800 + 'px'}"
                   @close="handleCloseLjDialog">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>选择客户</h3>
                </div>

                <div class="dialog_main changeChoose" :style="{'height': this.mainListHeight() + 'px'}">
                    <div class="borderNone">
                        <el-form :inline="true">
                            <el-form-item>
                                <el-input placeholder="请输入关键字" style="width:600px" v-model="params.search"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="search" size="small">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="customer-tab">
                        <span><i v-for="item in cate" :class="chooseTab===item.val?'active':''" @click="selects(item.val)">{{item.title}}</i></span>
                    </div>
                    <el-table
                            :data="tableData"
                            highlight-current-row
                            header-row-class-name="tableHeader"
                            :row-class-name="tableRowClassName"
                            @cell-click="tableClickRow"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">

                        <el-table-column type="selection" width="40"></el-table-column>
                        <el-table-column prop="create_time" label="客户身份" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="address" label="房屋地址" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="customer_name" label="客户姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="contact" label="客户手机号" show-overflow-tooltip align="center"></el-table-column>
                        <!--<el-table-column prop="account_type" label="客户汇款方式" show-overflow-tooltip align="center"></el-table-column>-->
                        <el-table-column label="账号" prop="account_num" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column label="状态" prop="" align="center" width="80">
                            <template slot-scope="scope">
                                <span>{{ scope.row.status === 1 ? '待处理' : '正常'}}</span>
                            </template>
                        </el-table-column>
                    </el-table>



                </div>
                <div class="dialog_footer">
                    <!--分页-->
                    <div class="dialog_footer">
                        <div class="page">
                            <el-pagination
                                    :total="count"
                                    layout="total,jumper,prev,pager,next"
                                    :current-page="params.page"
                                    :page-size="params.limit"
                                    @current-change="handleChangePage"
                            >
                            </el-pagination>
                        </div>
                    </div>
                    <el-button type="danger" size="small" @click="handleConfirmOk">确定</el-button>
                </div>
            </div>
        </lj-dialog>
    </div>
</template>

<script>
    import ljDialog from './lj-dialog.vue';
    export default {
        name: "customer",
        components:{
            ljDialog,
        },
        props:['module'],
        data(){
            return{
                lj_visible: false,
                tableData:[],
                count:0,
                params:{
                  page:1,
                  limit:7,
                  search:''
                },
                chooseTab:1,
                multipleSelection:[],
                current_row:'',
                cate:[
                    {
                        title:'房东',
                        val:1,
                    },
                    {
                        title:'租客',
                        val:2,
                    },
                ],
                url:'customer_collect',//客户url
                identity:1,//客户身份1房东2租客

            }
        },
        mounted() {
            this.getDataLists();
        },
        watch:{
            module(val) {
                this.lj_visible = val;
            },
        },
        methods:{
            selects(id){
              this.chooseTab=id;
              this.params.search='';
              this.current_row = '';
              this.identity = id;
              if(id===2){
                  this.url = 'customer_renter';
                  this.getDataLists();

              }else {
                  this.url = 'customer_collect';
                  this.getDataLists();
              }
            },
            getCustomer(){

            },
            tableRowClassName(){

            },
            tableClickRow(){

            },
            search(){//查询
              this.getDataLists();
            },
            handleSelectionChange(val){//选项
                this.multipleSelection = val;
                this.current_row=val[0];
            },
            handleConfirmOk(){//确认
                this.lj_visible = false;
                let customer ={
                    name:this.current_row.customer_name,
                    id:this.current_row.id,
                    identity:this.identity,
                };
                this.$emit('close',customer);
            },
            handleCloseLjDialog(){//关闭
                this.$emit('close', 'close');
            },
            handleChangePage(page){//分页
              this.params.page=page;
              this.getDataLists();
            },
            getDataLists() {//列表
                // this.showLoading(true);
                this.$http.get(globalConfig.temporary_server + this.url, this.params).then(res => {
                    if (res.code === 200) {
                        // this.showLoading(false);
                        this.tableData = res.data.data.sort(
                            function (a, b) {
                                return a.id - b.id
                            }
                        );
                        this.count = res.data.count;

                    } else {
                        this.tableData = [];
                        this.count = 0;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
        }

    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/common/customer.scss";

    @mixin customerImg($m,$n) {
        $url: '../../assets/image/finance/' + $n + '/' + $m;
        @include bgImage($url);
    }
    .customer-tab{
        margin-bottom: 20px;
        span{
            display: block;
            display: flex;
            flex-direction: row;
            align-items: center;
            i{
                display: block;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-style: normal;
                cursor: pointer;
                @include customerImg('yiyuedu.png','theme1');

            }
            .active{
                @include customerImg('weiyuedu.png','theme1');
                color: #ffffff;
            }


        }
    }

</style>