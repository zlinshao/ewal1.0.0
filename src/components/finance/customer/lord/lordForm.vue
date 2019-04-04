<template>
    <div class="dialog_container">
        <div class="dialog_header">
            <h3>{{current_row===''?'新增': '编辑'}}</h3>
        </div>
        <div class="dialog_main">
            <el-form :model="formData" size="mini" ref="formData" :rules="rulesForm" label-width="150px">
                <el-row>
                    <el-col :span="8">
                        <div class="">
                            <el-form-item label="签约人">
                                <el-input v-model="formData.operator" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门">
                                <el-input v-model="formData.department" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人">
                                <el-input v-model="formData.leader" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="客户姓名">
                                <el-input v-model="formData.customer_name" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="客户手机号">
                                <el-input v-model="formData.contact" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="房屋地址">
                                <el-input v-model="formData.address" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="收房月数">
                                <el-input v-model="formData.months" style="width: 200px" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="押金">
                                <el-input v-model="formData.deposit" style="width: 200px" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="签约日期">
                                <el-date-picker
                                        v-model="formData.deal_date" type="date" placeholder="" style="width: 200px">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="第一次打房租日期">
                                <el-date-picker
                                        v-model="formData.first_pay_date" type="date" placeholder=""
                                        style="width: 200px">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="第二次打房租日期">
                                <el-date-picker
                                        v-model="formData.second_pay_date" type="date" placeholder=""
                                        style="width: 200px">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="formData.remark" style="width: 200px"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="" style="width: 100%">
                            <el-form-item label="付款周期一"><el-button size="mini"  type="danger" @click="addPrices" style="cursor: pointer;position: absolute;right:-50px;top:0;">添加更多</el-button></el-form-item>
                            <div v-for="(item,index) in prices" :key="item.key" style="width: 100%;display: flex;flex-direction: column;justify-content: center" >
                                <el-form-item label="起止时间" >
                                    <el-date-picker
                                            v-model="item.times"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            style="width: 200px">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="付款周期" >
                                    <el-input v-model="item.pay_way" style="width: 200px" type="number"></el-input>
                                </el-form-item>
                                <el-form-item label="月单价" >
                                    <el-input v-model="item.pay_way" style="width: 200px" type="number"></el-input>
                                </el-form-item>
                                <el-form-item label="付款方式" style="position: relative">
                                    <el-select placeholder="请选择付款方式" v-model="item.pay_way" style="width: 200px;">
                                        <el-option v-for="item in payTypes" :label="item.val" :value="item.id"
                                                   :key="item"></el-option>
                                    </el-select>
                                    <!--<el-button size="mini"  type="danger" @click="addPrices" style="cursor: pointer;position: absolute;right:-50px;top:0;">删除</el-button>-->
                                </el-form-item>

                            </div>

                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="">
                            <el-form-item label="账户类型" prop="account_type">
                                <el-select placeholder="请选择" v-model="formData.account_type" style="width: 200px">
                                    <el-option v-for="item in Object.keys(cate)" :label="cate[item]" :value="item"
                                               :key="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="账户所属人">
                                <el-input v-model="formData.account_owner" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="开户银行" prop="account_bank">
                                <el-select placeholder="请选择银行" v-model="formData.account_bank" style="width: 200px">
                                    <el-option v-for="item in banks" :label="item" :value="item"
                                               :key="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="支行">
                                <el-input v-model="formData.account_subbank" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input v-model="formData.account_num" style="width: 200px"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>

                </el-row>
            </el-form>
        </div>
        <div class="dialog_footer">
            <el-button type="danger" size="small" @click="postLordEditData('formData')">确定</el-button>
            <el-button type="info" size="small" @click="edit_visible = false;current_row = ''">取消</el-button>
        </div>

        <StaffOrgan :module="staffModule" @close="hiddenStaff"></StaffOrgan>
        <DepartOrgan :module="departModule" @close="hiddenDepart"></DepartOrgan>
        <PostOrgan :module="postModule" @close="hiddenPost"></PostOrgan>
    </div>

</template>

<script>
    import StaffOrgan from '../../../common/staffOrgan.vue';
    import DepartOrgan from '../../../common/departOrgan.vue';
    import PostOrgan from '../../../common/postOrgan.vue';

    export default {
        name: "lordForm",
        props: ['formData', 'current_row', 'edit_visible'],
        components: {
            StaffOrgan,
            DepartOrgan,
            PostOrgan
        },
        data() {
            return {
                postModule: false,//岗位
                departModule: false,//部门
                staffModule: false,//员工
                form: '',//回显参数
                row: this.current_row,
                cate: {
                    "1": "银行卡",
                    "2": "支付宝",
                    "3": "微信",
                    "4": "银行卡(数据来自房管中心)"
                },
                payTypes:[
                    {id:1,val:'月付'} ,
                    {id:2,val:'双月付'} ,
                    {id:3,val:'季付'} ,
                    {id:4,val:'半年付'} ,
                    {id:5,val:'年付'} ,
                ],
                banks: [
                    "未知银行",
                    "中国工商银行",
                    "中国农业银行",
                    "中国银行",
                    "中国建设银行",
                    "交通银行",
                    "中信银行",
                    "中国光大银行",
                    "华夏银行",
                    "中国民生银行",
                    "广发银行",
                    "深圳发展银行",
                    "招商银行",
                    "兴业银行",
                    "上海浦东发展银行",
                    "恒丰银行",
                    "浙商银行",
                    "渤海银行",
                    "中国邮政储蓄银行",
                    "南京银行",
                    "江苏省紫金农商银行",
                    "农村合作信用社",
                    "安徽省农村信用社联合社",
                    "平安银行",
                    "江苏银行",
                    "苏州银行",
                    "广州银行",
                    "宁波银行",
                    "上海银行",
                    "北京银行",
                    "杭州银行",
                    "衢州银行",
                    "农村商业银行",
                    "浙江省农村信用社联合社杭州联合银行",
                    "浙江稠州银行",
                    "徽商银行",
                    "台州银行",
                    "浙江银行",
                    "重庆农村商业银行",
                    "浙江泰隆商业银行",
                    "上海农商银行",
                    "重庆银行",
                    "西安银行",
                    "昆山农商银行",
                    "昆仑银行",
                    "陕西农村信用合作社联合社",
                    "成都银行",
                    "江苏省信用社联合社",
                    "重庆三峡银行",
                    "江苏农村信用社联合社",
                    "江苏东吴农村商业银行",
                    "厦门银行",
                    "浙江民泰商业银行",
                    "江西银行",
                    "中原银行"
                ],
                formParams: {},
                rulesForm: {
                    staff_id: [
                        {required: true, message: '请选择签约人', trigger: 'change'},
                    ],
                    department_id: [
                        {required: true, message: '请选择所属部门', trigger: 'change'},
                    ],
                    leader_id: [
                        {required: true, message: '请选择负责人', trigger: 'change'},
                    ],
                    house_id: [
                        {required: true, message: '请选择房屋地址', trigger: 'change'},
                    ],
                    customer_name: [
                        {required: true, message: '请输入客户姓名', trigger: 'blur'},
                    ],
                    contact: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                    ],
                    months: [
                        {required: true, message: '请输入收房月数', trigger: 'blur'},
                    ],
                    deposit: [
                        {required: true, message: '请输入押金', trigger: 'blur'},
                    ],

                    deal_date: [
                        {required: true, message: '请选择待签约日期', trigger: 'change'},
                    ],
                    first_pay_date: [
                        {required: true, message: '请选择待一次打款日期', trigger: 'change'},
                    ],
                    second_pay_date: [
                        {required: true, message: '请选择待二次打款日期', trigger: 'change'},
                    ],
                    account_type: [
                        {required: true, message: '请选择账户类型', trigger: 'change'},
                    ],
                    account_bank: [
                        {required: true, message: '请选择开户银行', trigger: 'change'},
                    ],
                    account_owner: [
                        {required: true, message: '请输入收款人', trigger: 'blur'},
                    ],
                    account_subbank: [
                        {required: true, message: '请输入支行名称', trigger: 'blur'},
                    ],
                    account_num: [
                        {required: true, message: '请输入支行名称', trigger: 'blur'},
                    ],
                    remark: [
                        {required: true, message: '请选择押金科目', trigger: 'change'},
                    ],

                },

                // 付款周期,月单价
                prices: [
                    {
                        "period": "12",//付款周期
                        "pay_way": "3",//付款方式
                        "end_date": "2021-03-15",
                        "begin_date": "2020-03-15",
                        "month_unit_price": "3100",//月单价
                        'times':['2021-03-15','2020-03-15']
                    },
                ],

                times: [],


            }
        },
        watch: {
            formData: {
                handler(val) {
                    this.form = val;
                    console.log(val)
                },
                deep: true,
            }
        },
        mounted() {
        },
        computed: {
            is_disabled() {
                if (this.row) {
                    return true
                } else {
                    return false
                }
            }
        },
        watch: {
            formData: {
                handler(val) {
                    console.log(val)
                },
                deep: true
            },

        },
        methods: {
            //增加付款周期
            addPrices(){
                this.prices.push({
                    period:'',
                    pay_way:'',
                    end_date:'',
                    begin_date:'',
                    month_unit_price:'',
                    key: Date.now(),
                })
            },
            // 组织部门
            hiddenDepart(ids, names, arr) {
                console.log(ids, names, arr);
                this.departModule = false;
                if (ids !== 'close') {
                    this.form.departmentName = names;
                    this.form.department_id = ids;
                    this.form.leaderName = arr[0].leader.name;
                    this.form.leader_id = arr[0].leader_id;
                }
            },
            //员工
            hiddenStaff(ids, names, arr) {
                this.staffModule = false;
                console.log(ids, names, arr);
                if (ids !== 'close') {
                    this.form.staffName = names;
                    this.form.staff_id = ids[0];
                }
            },
            // 岗位
            hiddenPost(ids, names, arr) {
                this.postModule = false;
            },
            clickCallback(val) {
                if (val === "签约人") {
                    this.staffModule = true;
                }
                if (val === "所属部门") {
                    this.departModule = true;
                }
                if (val === "负责人") {
                    this.staffModule = false;
                }
            },
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                } else {
                    this.$LjNotify('error', {
                        title: '失败',
                        message: res.msg,
                        subMessage: '',
                    });
                }
            },

            //编辑确认
            postLordEditData(formName) {
                for (let item of Object.keys(this.formParams)) {
                    this.formParams[item] = this.form[item];
                }
                console.log(this.formParams);
                console.log(this.row.id);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.put(globalConfig.temporary_server + 'customer_collect/' + this.row.id, this.formParams).then(res => {
                            this.callbackSuccess(res);
                            this.$emit("updateList", false)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
        },
    }
</script>

<style scoped>

</style>
