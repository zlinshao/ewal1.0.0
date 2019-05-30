<template>
    <div class="dialog_container">
        <div class="dialog_header">
            <h3>{{checkOrEdit.is_check===false?'编辑': '查看'}}</h3>
        </div>
        <div class="dialog_main borderNone">
            <el-form :model="formParams"  ref="formParams" :rules="rulesForm" label-width="150px">
                <el-row>
                    <el-col :span="8">
                        <div class="">
                            <el-form-item label="签约人">
                                <el-input v-model="commonModuleData.staff_name" style="width: 200px"
                                          @focus="clickCallback('签约人')" readonly :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门">
                                <el-input v-model="commonModuleData.department_name" style="width: 200px"
                                          @focus="clickCallback('所属部门')" readonly :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人">
                                <el-input v-model="commonModuleData.leader_name" style="width: 200px"
                                          readonly :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="客户姓名">
                                <el-input v-model="formParams.customer_name" style="width: 200px"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="客户手机号">
                                <el-input v-model="formParams.contact" style="width: 200px"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="房屋地址">
                                <el-input placeholder="请选择" v-model="formParams.address" @focus="clickCallback('地址')"
                                          style="width: 200px" :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="收房月数">
                                <el-input v-model="formParams.months" style="width: 200px" type="number"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="押金">
                                <el-input v-model="formParams.deposit" style="width: 200px" type="number"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="签约日期">
                                <el-date-picker
                                        v-model="formParams.deal_date"
                                        type="date" placeholder=""
                                        style="width: 200px"
                                        value-format="yyyy-MM-dd"
                                        :disabled="is_disabled">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="第一次打房租日期">
                                <el-date-picker
                                        v-model="formParams.first_pay_date" type="date" placeholder=""
                                        :disabled="is_disabled" value-format="yyyy-MM-dd"
                                        style="width: 200px">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="第二次打房租日期">
                                <el-date-picker
                                        v-model="formParams.second_pay_date" type="date" placeholder=""
                                        :disabled="is_disabled" value-format="yyyy-MM-dd"
                                        style="width: 200px">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="formParams.remark" style="width: 200px" :disabled="is_disabled"
                                          type="textarea" :rows="3"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="" style="width: 100%">
                            <el-form-item label="付款周期">
                                <el-button v-if="checkOrEdit.is_check===false" size="mini" type="danger"
                                           @click="addPrices"
                                           style="cursor: pointer;position: absolute;right:-50px;top:0;">添加
                                </el-button>
                            </el-form-item>
                            <div v-for="(item,index) in prices" :key="item.key"
                                 style="width: 100%;display: flex;flex-direction: column;justify-content: center">
                                <el-form-item label="开始时间">
                                    <el-date-picker :disabled="is_disabled"
                                                    v-model="item.begin_date"
                                                    style="width: 200px"
                                                    type="datetime"
                                                    value-format="yyyy-MM-dd"
                                                    placeholder="选择日期时间"
                                                    align="right">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="结束时间">
                                    <el-date-picker
                                            v-model="item.end_date"
                                            :disabled="is_disabled"
                                            style="width: 200px"
                                            type="datetime"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期时间"
                                            align="right">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="付款周期">
                                    <el-input v-model="item.period" style="width: 200px" type="number"
                                              :disabled="is_disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="月单价">
                                    <el-input v-model="item.price" style="width: 200px" type="text"
                                              :disabled="is_disabled"></el-input>
                                </el-form-item>
                                <el-form-item label="付款方式" style="position: relative">
                                    <el-select placeholder="请选择付款方式" v-model="item.pay_way" style="width: 200px;"
                                               :disabled="is_disabled">
                                        <el-option v-for="(item,index) in payTypes" :label="item.val" :value="item.id"
                                                   :key="index"></el-option>
                                    </el-select>
                                    <el-button size="mini" v-if="checkOrEdit.is_check===false"
                                               class="el-icon-circle-close-outline" type="danger"
                                               @click="reducePrices(index)"
                                               style="cursor: pointer;position: absolute;right:-50px;top:0;"></el-button>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="">
                            <el-form-item label="账户类型" prop="account_type">
                                <el-select placeholder="请选择" v-model="formParams.account_type" style="width: 200px"
                                           :disabled="is_disabled">
                                    <el-option v-for="item in Object.keys(cate)" :label="cate[item]" :value="item"
                                               :key="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="账户所属人">
                                <el-input v-model="formParams.account_owner" style="width: 200px"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="开户银行" prop="account_bank">
                                <el-select placeholder="请选择银行" v-model="formParams.account_bank" style="width: 200px"
                                           :disabled="is_disabled">
                                    <el-option v-for="item in banks" :label="item" :value="item"
                                               :key="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="支行">
                                <el-input v-model="formParams.account_subbank" style="width: 200px"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input v-model="formParams.account_num" style="width: 200px"
                                          :disabled="is_disabled"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>

                </el-row>
            </el-form>
        </div>
        <div class="dialog_footer" v-if="checkOrEdit.is_check===false">
            <el-button type="danger" size="small" @click="postLordEditData('formParams')">确定</el-button>
            <el-button type="info" size="small" @click="cancel">取消</el-button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "lordForm",
        props: ['initData', 'edit_visible', 'checkOrEdit',],
        components: {},
        data() {
            return {
                commonModule: {},
                commonModuleData: {
                    leader_name: '',
                    department_name: '',
                    staff_name: '',
                },
                is_disabled: false,//是否可编辑
                formData: {},//表单初始数据
                cate: {"1": "银行卡", "2": "支付宝", "3": "微信", "4": "银行卡(数据来自房管中心)"},
                payTypes: [
                    {id: "1", val: '月付'},
                    {id: "2", val: '双月付'},
                    {id: "3", val: '季付'},
                    {id: "4", val: '半年付'},
                    {id: "5", val: '年付'}
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
                formParams: {
                    staff_id: '',//签约人姓名
                    department_id: '',//部门id
                    leader_id: '',//部门领导id
                    customer_name: "",//客户姓名
                    contact: "",//联系方式
                    house_id: '',//房屋id
                    address: "",//房屋地址
                    months: "",//签约月数
                    prices: [],
                    deposit: "",//押金
                    deal_date: "",//签约日期
                    first_pay_date: "",//第一次打房租日期
                    second_pay_date: "",//第二次打房租日期
                    remark: "",//备注
                    account_type: '',//账户类型
                    account_owner: "",//账户所属人姓名
                    account_subbank: "",//支行
                    account_bank: '',//银行
                    account_num: "",//银行账户账号
                    // "v3_contract_id": "15698",//合同id
                },
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
                prices: [],
            }
        },
        mounted() {
            this.formData = this.initData;
            for (let item of Object.keys(this.formParams)) {
                this.formParams[item] = this.formData[item];
            }
            this.commonModuleData.leader_name = this.formData.leader.name;
            this.commonModuleData.department_name = this.formData.department.name;
            this.commonModuleData.staff_name = this.formData.staff.name;
            this.prices = this.formData.prices_raw;
            this.formParams.leader_id = this.formData.leader.id;

            //是否可编辑
            if (this.checkOrEdit.is_check === true) {
                this.is_disabled = true;
            } else {
                this.is_disabled = false;
            }
            //转换付款类型
            switch (this.formData.account_type) {
                case "银行卡":
                    this.formParams.account_type = "1";
                    break;
                case "支付宝":
                    this.formParams.rent_type = "2";
                    break;
                case "微信":
                    this.formParams.rent_type = "3";
                    break;
                case "银行卡(数据来自房管中心)":
                    this.formParams.rent_type = "4";
                    break;
            }
        },
        created() {
            this.$bus.on('moduleData', this.getModuleData);
            this.$bus.on('moduleDataStatus', this.getModuleDataStatus);
        },
        beforeDestroy() {
            this.$bus.off('moduleData', this.getModuleData);
            this.$bus.off('moduleDataStatus', this.getModuleDataStatus);
        },
        watch: {
            initData: {
                handler(val) {
                },
                deep: true
            },
            checkOrEdit: {
                handler(val) {
                    if (val.is_check === true) {
                        this.is_disabled = true
                    } else {
                        this.is_disabled = false
                    }
                },
                deep: true
            },
        },
        methods: {
            //获取部门组件的值
            getModuleData(val) {
                for (let item of Object.keys(this.commonModuleData)) {
                    this.commonModuleData[item] = val[item];
                }
                this.formParams.staff_id = val.staff_id;
                this.formParams.department_id = val.department_id;
                this.formParams.leader_id = val.leader_id;
                this.formParams.house_id = val.address_id[0];
                this.formParams.address = val.address_name;
            },
            //获取部门组件的状态
            getModuleDataStatus(val) {
                this.commonModule = val;
            },
            cancel() {
                this.$emit('cancel', false);
            },
            //增加付款周期
            addPrices() {
                this.prices.push({
                    period: '',
                    pay_way: '',
                    end_date: '',
                    begin_date: '',
                    price_str: '',
                    key: Date.now(),
                })
            },
            //减少付款周期
            reducePrices(index) {
                var i = this.prices.length;
                if (i <= 1) {
                    this.$LjNotify('error', {
                        title: '提示',
                        message: '请至少保留一项付款方式',
                        subMessage: '',
                    });
                } else {
                    this.prices.splice(index, 1);
                }
            },
            clickCallback(val) {
                switch (val) {
                    case "签约人":
                        this.commonModule.staffModule = true;
                        break;
                    case "所属部门":
                        this.commonModule.departModule = true;
                        break;
                    case "地址":
                        this.commonModule.house_filter_visible = true;
                        break;
                }
                this.$bus.emit('openCommonModule', this.commonModule);
            },
            callbackSuccess(res) {
                if (res.code === 200) {
                    this.$LjNotify('success', {
                        title: '成功',
                        message: res.msg,
                        subMessage: '',
                    });
                    this.$emit('editSuccess', false)
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
                this.formParams.prices = this.prices;
                console.log(this.formParams);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.put(globalConfig.temporary_server + 'customer_collect/' + this.formData.id, this.formParams).then(res => {
                            this.callbackSuccess(res);
                            this.formData = {};
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
