<template>
    <div class="dialog_container">
        <div class="dialog_header">
            <h3>{{current_row===''?'新增': '编辑'}}</h3>
        </div>
        <div class="dialog_main">
            <el-form :model="form" size="mini" ref="formData">
                <el-row type="flex" class="row-bg" justify="space-between" style="flex-wrap: wrap">

                    <el-form-item v-for="(item,index) in lordForm.slice(0,4)" :key="'lord1'+index" :prop="item.prop">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>{{item.label}}</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-input :placeholder="item.placeholder" v-model="form[item.prop]"
                                          :disabled="is_disabled" @focus="clickCallback(item.label)"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-for="(item,index) in lordForm.slice(4,10)" :key="'lord2'+index" :prop="item.prop">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>{{item.label}}</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-input :placeholder="item.placeholder" v-model="form[item.prop]" :type="item.type"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-for="(item,index) in lordForm.slice(12,15)" :key="'lord'+index" :prop="item.prop">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>{{item.label}}</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-date-picker
                                        v-model="form[item.prop]" type="date" :placeholder="item.placeholder">
                                </el-date-picker>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="pay_types_val">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>付款方式</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <keep-alive>
                                    <el-select placeholder="请选择" v-model="form.pay_types_val">
                                        <el-option label="月付" value="1"></el-option>
                                        <el-option label="双月付" value="2"></el-option>
                                        <el-option label="季付" value="3"></el-option>
                                        <el-option label="半年付" value="4"></el-option>
                                        <el-option label="年付" value="5"></el-option>
                                    </el-select>
                                </keep-alive>

                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="prices_val">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>月单价</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-input placeholder="请选择" v-model="form.prices_val" type="number"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="account_type">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>账户类型</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-select placeholder="请选择" v-model="form.account_type">
                                    <el-option v-for="item in Object.keys(cate)" :label="cate[item]" :value="item"
                                               :key="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="account_bank">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>开户银行</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-select placeholder="请选择银行" v-model="form.account_bank">
                                    <el-option v-for="item in banks" :label="item" :value="item"
                                               :key="item"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="rental_subject">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>房租科目</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-input placeholder="请选择" v-model="form.rental_subject"
                                          @focus="handleOpenSubject('subject_rent')"></el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="deposit_subject">
                        <div class="form_item_container">
                            <div class="item_label">
                                <b class="item_icons">
                                    <i class="icon_account"></i>
                                </b>
                                <span>押金科目</span>
                            </div>
                            <div class="item_content" style="width: 230px">
                                <el-input placeholder="请选择" v-model="form.deposit_subject"
                                          @focus="handleOpenSubject('subject_deposit')"></el-input>
                            </div>
                        </div>
                    </el-form-item>

                </el-row>
            </el-form>
        </div>
        <div class="dialog_footer">
            <el-button type="danger" size="small" @click="postLordEditData()">确定</el-button>
            <el-button type="info" size="small" @click="edit_visible = false;current_row = ''">取消</el-button>
        </div>

        <lj-subject :visible="subject_visible" @close="subject_visible = false"
                    @confirm="handleConfirmSubject"></lj-subject>

        <StaffOrgan :module="organModule" @close="hiddenOrgan"></StaffOrgan>
    </div>

</template>

<script>
    import LjSubject from '../../../common/lj-subject.vue';
    import StaffOrgan from '../../../common/staffOrgan.vue';

    export default {
        name: "lordForm",
        props: ['formData', 'current_row', 'edit_visible'],
        components: {
            LjSubject,
            StaffOrgan
        },
        data() {
            return {
                organModule: false,//组织架构
                form: this.formData,
                row: this.current_row,
                lordForm: [//表单字段
                    {
                        label: "签约人",
                        prop: "operatorName",
                        type: "",
                        placeholder: "请输入签约人",
                    },
                    {
                        label: "所属部门",
                        prop: "departmentName",
                        type: "",
                        placeholder: "请输入所属部门",
                    },
                    {
                        label: "负责人",
                        prop: "leaderName",
                        type: "",
                        placeholder: "请输入负责人",
                    },
                    {
                        label: "房屋地址",
                        prop: "address",
                        type: "",
                        placeholder: "请输入房屋地址",
                    },
                    {
                        label: "客户姓名",
                        prop: "customer_name",
                        type: "text",
                        placeholder: "请输入客户姓名",
                    },
                    {
                        label: "手机号",
                        prop: "contact",
                        type: "number",
                        placeholder: "请输入手机号",
                    },

                    {
                        label: "收房月数",
                        prop: "months",
                        type: "number",
                        placeholder: "请输入收房月数",
                    },
                    {
                        label: "押金",
                        prop: "deposit",
                        type: "number",
                        placeholder: "请输入押金",
                    },
                    {
                        label: "保修期",
                        prop: "warrenty",
                        type: "number",
                        placeholder: "请输入保修期",
                    },
                    {
                        label: "中介费",
                        prop: "medi_cost",
                        type: "number",
                        placeholder: "请输入中介费",
                    },
                    {
                        label: "付款方式",
                        prop: "pay_types",
                        type: "",
                        placeholder: "请输入付款方式",
                    },
                    {
                        label: "月单价",
                        prop: "months",
                        type: "number",
                        placeholder: "请输入月单价",
                    },
                    {
                        label: "待签约",
                        prop: "deal_date",
                        type: "",
                        placeholder: "请输入待签约时间",
                    },
                    {
                        label: "一次打款",
                        prop: "first_pay_date",
                        type: "",
                        placeholder: "请输入第一次打房租日期",
                    },
                    {
                        label: "二次打款",
                        prop: "second_pay_date",
                        type: "",
                        placeholder: "请输入第二次打房租日期",
                    },

                    {
                        label: "账户类型",
                        prop: "account_type",
                        type: "",
                        placeholder: "请输入账户类型",
                    },
                    {
                        label: "开户银行",
                        prop: "account_bank",
                        type: "",
                        placeholder: "请输入开户银行",
                    },
                    {
                        label: "收款人",
                        prop: "account_owner",
                        type: "",
                        placeholder: "请输入收款人",
                    },
                    {
                        label: "支行",
                        prop: "account_subbank",
                        type: "",
                        placeholder: "请输入支行",
                    },
                    {
                        label: "押金科目",
                        prop: "deposit_subject",
                        type: "",
                        placeholder: "请输入押金科目",
                    },
                    {
                        label: "房租科目",
                        prop: "rental_subject",
                        type: "",
                        placeholder: "请输入房租科目",
                    },
                ],
                subject_visible: false,
                which_subject: '',
                new_subject_visible: false,
                subject_deposit: {
                    parent_id: '',
                    title: '',
                    er_type: '',
                    remark: '',
                    parent_name: '',
                    subject_code: ''
                },
                subject_rent: {
                    parent_id: '',
                    title: '',
                    er_type: '',
                    remark: '',
                    parent_name: '',
                    subject_code: ''
                },
                move_visible: false,
                move_subject: {
                    initial: '',
                    parent_id: '',
                    title: ''
                },
                cate: {
                    "1": "银行卡",
                    "2": "支付宝",
                    "3": "微信",
                    "4": "银行卡(数据来自房管中心)"
                },
                types: [
                    {title: "月付", value: 1},
                    {title: "半月份", value: 2},
                    {title: "季付", value: 3},
                    {title: "半年付", value: 4},
                    {title: "年付", value: 5}
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

                customer_id: '',

                formParams: {
                    "staff_id": "",
                    "department_id": "",
                    "leader_id": "",
                    "customer_name": "",
                    "contact": "",
                    "house_id": "",
                    "months": "",
                    "prices": [],
                    "pay_types": [],
                    "deposit": "",
                    "medi_cost": "",
                    "warrenty": "",
                    "deal_date": "",
                    "first_pay_date": "",
                    "second_pay_date": "",
                    "remark": "",
                    "account_type": "",
                    "account_owner": "",
                    "account_subbank": "",
                    "account_bank": "",
                    "account_num": "",
                    "subject_id": {
                        "rental": "",
                        "deposit": ""
                    },
                    "v3_contract_id": "",
                },
                rulesForm: [
                    {}
                ]


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
            form: {
                handler(val) {
                    console.log(val)
                },
                deep: true
            },

        },
        methods: {
            clickCallback(label) {
                if (label === "签约人") {
                    this.organModule = true;
                }
                if (label === "所属部门") {
                    this.organModule = true;
                }
                if (label === "负责人") {
                    this.organModule = true;
                }

            },
            hiddenOrgan(val) {
                this.organModule = false;
                if (val !== 'close') {
                    console.log(val);
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
            handleOpenSubject(which) {
                this.which_subject = which;
                this.subject_visible = true;
            },
            //确认科目
            handleConfirmSubject(val) {
                if (this.which_subject === 'move_subject') {
                    this.move_subject.parent_id = val.id;
                    this.move_subject.title = val.title;
                }
                if (this.which_subject === 'subject_deposit') {
                    this.subject_deposit.parent_name = val.title;
                    this.subject_deposit.parent_id = val.id;
                    this.form.subject_id.deposit = val.id;
                    this.form.deposit_subject = val.title;

                }
                if (this.which_subject === 'subject_rent') {
                    this.subject_rent.parent_name = val.title;
                    this.subject_rent.parent_id = val.id;
                    this.form.subject_id.rental = val.id;
                    this.form.rental_subject = val.title;
                }
            },

            //编辑确认
            postLordEditData() {
                for(let item of Object.keys(this.formParams)){
                    this.formParams[item] = this.form[item];
                }
                console.log(this.formParams);
                console.log(this.row.id);
                if (this.row.id) {
                    this.$http.put(globalConfig.temporary_server + 'customer_collect/' + this.row.id, this.formParams).then(res => {
                        this.callbackSuccess(res);
                        this.$emit("updateList",false)

                    })
                }

            },
        },
    }
</script>

<style scoped>

</style>
