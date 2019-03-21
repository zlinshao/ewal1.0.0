<template>
    <div id="customerList">
        <el-form :inline="true"  class="demo-form-inline">

            <el-form-item label="客户类型">
                <el-select  placeholder="请选择客户类型" size="mini" v-model="customer_type">
                    <el-option v-for="(item,index) in types" :label="item.title"  :value = "item.val" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-input  placeholder="请输入查询内容" size="mini" v-model="customer_keywords"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getCustomerLists(customer_type)" size="mini">查询</el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table
                :data="tableData"
                highlight-current-row
                header-row-class-name="tableHeader"
                :row-class-name="tableChooseRow"
                @cell-click="tableClickRow"
                style="width: 100%">
            <el-table-column label="客户身份" prop="" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.identity === 1 ? '业主' : '租客'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    v-for="(item,index) in tableHeaderData"
                    :label="item.title" :key="index"
                    :prop="item.prop"
                    align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "customerLists",
        data(){
            return{
                params: {
                    search: '',
                    startRange: '',
                    endRange: '',
                    page: 1,
                    limit: 12,
                    department_ids: '',
                    export: '',
                },
                customer_type:1,
                customer_keywords:'',
                customer:{
                    customer_id:'',//点击行客户id
                    customer_name:'',//客户名称
                    address:'',//地址
                    identity:'',//身份
                },
                chooseRowIds: [],
                types:[
                    {title:"房东",val:1},
                    {title:"租客",val:2}
                ],
                tableHeaderData:[
                    {title:"客户名称",prop:"customer_name",width:"80"},
                    {title:"房屋地址",prop:"address",width:"80"},
                    {title:"账户",prop:"account_owner",width:"120"},
                    {title:"账号",prop:"account_num",width:"80"},
                    {title:"备注",prop:"remark",width:"80"},
                ],
                tableData:[],
            }
        },
        mounted(){
            this.getCustomerLists();
            this.tableData = this.tableData1;
        },
        methods:{
            // 当前点击
            tableClickRow(row, event, column) {
                let ids = this.chooseRowIds;
                ids.push(row.id);
                this.chooseRowIds = this.myUtils.arrayWeight(ids);
                for(let item of Object.keys(this.customer)){
                    this.customer[item] = row[item];
                }
                this.customer.customer_id = row.id;

                this.$emit("getCustomer",this.customer);
            },
            // 点击过
            tableChooseRow({row, rowIndex}) {
                return this.chooseRowIds.includes(row.id) ? 'tableChooseRow' : '';
            },
            //获取客户列表
            getCustomerLists(type){
                if(type===1){
                    this.$http.post(globalConfig.temporary_server + 'customer_collect', this.params).then(res => {
                        if(res.code===200){
                            this.tableData = res.data.data;
                        }
                    }).catch(err => {
                        console.log(err);
                    });

                }else if(type===2){
                    this.$http.post(globalConfig.temporary_server + 'customer_renter', this.params).then(res => {
                        if(res.code===200){
                            this.tableData = res.data.data;
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }else {
                    this.tableData = '';
                }
            },
        }
    }
</script>

<style scoped>

</style>
