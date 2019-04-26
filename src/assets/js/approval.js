// {
// label: '房屋地址',// 标题
// placeholder: '必填 请选择',// placeholder
// readonly: 'readonly',// 只读 picker必须有值
// disabled: 'disabled',// 禁用
// keyName: 'house_address',// 字段名
// keyType: '',// 数据类型
//type: 'text',// input 类型
// date为正常日期选择  arr picker源数据为数组确定值为int  obj picker源数据为对象确定值为{id:'',name:''}格式 arrs多列选择确定值为[] objInt确定值为 int 弹窗内选择日期dateformSpan
// status: '',
// picker: 'searchVillage',// 是否显示在弹窗内 不存在为正常输入框 值为picker正常选择 searchVillage 搜索小区
// showForm: 'formatData',//picker 显示form 或 formatData
// prompts: '',//红色提示信息
// pickerRead: 'no', // 在弹窗内是否为readonly// 1房屋信息 2物品信息 3合同信息 4客户信息
// formSpan: '',// 预留字段
// },

// checkbox  picktime radio()

defineReport = {
  1: {
    slither0: [
      {
        label: '产权地址',
        placeholder: '必填 请输入',
        keyName: 'house_address',
        keyType: '',
        type: 'text',
        status: 'input',
        showForm: 'formatData'
      },
      {
        label: '门锁类型',
        placeholder: '必填 请选择',
        keyName: 'lock_type',
        keyType: '1',
        type: 'picker',
        status: 'checkbox',
        valueType: 'objInt',
        showForm: 'formatData'
      },
      {
        label: '衣柜',
        placeholder: '必填 请选择',
        keyName: 'wardrobe',
        keyType: '1',
        type: 'picker',
        status: 'checkbox',
        valueType: 'objInt',
        showForm: 'formatData'
      },
      {
        label: '持有证件',
        placeholder: '必填 请填入',
        keyName: 'holding_documents_type',
        keyType: '',
        type: 'text',
        status: 'input',
        showForm: 'formatData'
      },
      {
        label: '产权证号',
        placeholder: '必填 请填入',
        keyName: 'property_right_card_number',
        keyType: '',
        type: 'text',
        status: 'input',
        showForm: 'formatData'
      },
      {
        label: '丘权号',
        placeholder: '必填 请填入',
        keyName: 'qiu_quan_number',
        keyType: '',
        type: 'text',
        status: 'input',
        showForm: 'formatData'
      },
      {
        label: '户型',
        placeholder: '必填',
        keyName: 'house_type',
        keyType: [],
        type: 'picker',
        status: 'checkbox',
        showForm: 'formatData',
        children: [
          [
            {
              placeholder: '-室',
              keyName: 'room',
              keyType: 0
            },
            {
              placeholder: '-厅',
              keyName: 'ting',
              keyType: 0
            },
            {
              placeholder: '-卫',
              keyName: 'wei',
              keyType: 0
            }
          ]
        ] //picker 显示form 或 formatData
      },
      {
        label: '燃气灶',
        keyName: 'gas_stove',
        keyType: 1,
        type: 'number',
        status: 'input',
        num: 1,
        showForm: 'formateData'
      },
      {
        label: '空调',
        placeholder: '请填写',
        keyName: 'air_condition',
        keyType: 1,
        type: 'number',
        status: 'input',
        num: 1,
        showForm: 'formateData'
      },
      {
        label: '面积',
        placeholder: '请填写',
        keyName: 'area',
        keyType: 0,
        number: 0,
        status: 'input',
        type: 'number'
      },
      {
        label: '洗衣机',
        keyName: 'wash_machine',
        keyType: 1,
        type: 'number',
        status: 'input',
        num: 1,
        showForm: 'formateData'
      },
      {
        label: '电视',
        keyName: 'television',
        keyType: 1,
        num: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '装修',
        placeholder: '必填',
        keyName: 'decorate',
        keyType: '',
        type: 'text',
        status: 'input',
        showForm: 'formatData' //picker 显示form 或 formatData
      },
      {
        label: '微波炉',
        key: 'microwave',
        keyType: 1,
        num: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '衣架',
        keyName: 'clothe_rack',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '房屋类型',
        placeholder: '必填',
        disabled: 'disabled',
        keyName: 'property_type',
        keyType: '',
        type: 'text',
        status: 'checkbox',
        showForm: 'formatData' //picker 显示form 或 formatDat
      },
      {
        label: '冰箱',
        keyName: 'fridge',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '沙发',
        keyName: 'sofa',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '朝向',
        placeholder: '必填',
        disabled: 'disabled',
        keyName: 'direction',
        keyType: '1',
        type: 'text',
        status: 'checkbox',
        showForm: 'formatData' //picker 显示form 或 formatData
      },
      {
        label: '油烟机',
        keyName: 'hood',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '椅子',
        keyName: 'chair',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },

      {
        label: '楼层',
        placeholder: '必填',
        disabled: 'disabled',
        keyName: 'floors',
        keyType: '',
        type: 'text',
        status: 'input',
        showForm: 'formatData' //picker 显示form 或 formatData
      },
      {
        label: '热水器',
        keyName: 'water_heater',
        placeholder: '',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '床和床垫的情况',
        placeholder: '必填 请选择',
        readonly: 'readonly',
        keyName: 'bed',
        keyType: '1',
        type: 'text',
        status: 'checkbox',
        showForm: 'formatData', //picker 显示form 或 formatData
        picker: 'pickerArticle'
      },
      {
        label: '物业电话',
        disabled: 'disabled',
        placeholder: '必填',
        keyName: 'property_phone',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '餐桌',
        keyName: 'dining_table',
        num: 1,
        keyType: 1,
        type: 'number',
        status: 'input',
        showForm: 'formateData'
      },
      {
        label: '卫生情况',
        placeholder: '必填 请选择',
        readonly: 'readonly',
        keyName: 'is_clean',
        keyType: '1',
        type: 'text',
        status: 'radio',
        showForm: 'formatData', //picker 显示form 或 formatData
        picker: 'pickerArticle'
      },
      {
        label: '物业费',
        disabled: 'disabled',
        placeholder: '必填',
        keyName: 'property_fee',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '是否有天然气',
        placeholder: '必填 请选择',
        readonly: 'readonly',
        keyName: 'has_gas',
        keyType: 1,
        type: 'text',
        status: 'radio',
        showForm: 'formatData', //picker 显示form 或 formatData
        picker: 'pickerArticle'
      },
      {
        label: '家电是否补齐',
        placeholder: '必填 请选择',
        readonly: 'readonly',
        keyName: 'is_fill',
        keyType: 1,
        type: 'text',
        status: 'radio',
        showForm: 'formatData', //picker 显示form 或 formatData
        picker: 'pickerArticle'
      },
      {
        label: '是否有暖气',
        placeholder: '必填 请选择',
        readonly: 'readonly',
        keyName: 'has_heater',
        keyType: 1,
        type: 'text',
        status: 'radio',
        showForm: 'formatData', //picker 显示form 或 formatData
        picker: 'pickerArticle'
      },
      {
        label: '窗帘情况',
        placeholder: '必填 请选择',
        readonly: 'readonly',
        keyName: 'curtain',
        keyType: 1,
        type: 'text',
        status: 'checkbox',
        showForm: 'formatData', //picker 显示form 或 formatData
        picker: 'pickerArticle'
      },
      {
        label: '结束时间',
        placeholder: '必填',
        disabled: 'disabled',
        keyName: 'end_date',
        keyType: '',
        type: 'text',
        status: 'picktimer',
        picker: '',
        length: 1,
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '备注',
        placeholder: '请输入',
        keyName: 'remark',
        keyType: '',
        type: 'textarea',
        status: 'input',
        formSpan: 24
      },
      {
        label: '其它问题',
        placeholder: '请输入',
        keyName: 'other_remark',
        keyType: '',
        type: 'textarea',
        status: 'input',
        formSpan: 24
      },
      {
        label: '房屋影像',
        placeholder: '请输入',
        keyName: 'ablum',
        keyType: '',
        status: 'upload'
      }
    ],
    slither1: [
      {
        label: '签约时间',
        placeholder: '必填 请选择',
        keyName: 'sign_date',
        keyType: '',
        status: 'picktimer',
        picker: '',
        length: 1,
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '是否渠道',
        placeholder: '必填 请选择',
        keyName: 'is_agency',
        keyType: '',
        type: 'text',
        status: 'radio',
        showForm: 'formatData' //picker 显示form 或 formatData
      },
      {
        label: '第一次付款时间',
        placeholder: '必填 请选择',
        keyName: 'pay_first_date',
        keyType: '',
        status: 'picktimer',
        picker: '',
        length: 1,
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '合同开始时间',
        placeholder: '必填 请选择',
        keyName: 'begin_date',
        keyType: '',
        status: 'picktimer',
        picker: '',
        length: 1,
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '渠道费',
        placeholder: '请输入',
        keyName: 'agency_price',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '第二次付款时间',
        placeholder: '必填 请选择',
        keyName: 'pay_second_date',
        keyType: '',
        status: 'picktimer',
        picker: '',
        length: 1,
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '合同结束时间',
        placeholder: '必填 请选择',
        keyName: 'end_date',
        keyType: '',
        status: 'picktimer',
        picker: '',
        length: 1,
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '是否是电子合同',
        placeholder: '必填 请选择',
        keyName: 'is_electronic_contract',
        keyType: 1,
        type: 'text',
        status: 'radio',
        showForm: 'formatData' //picker 显示form 或 formatData
      },
      {
        label: '签约时长',
        placeholder: '请输入',
        keyName: 'month',
        keyType: 0,
        type: 'number',
        status: 'input'
        // children: [
        //   {
        //     placeholder: '必填',
        //     keyName: 'month',
        //     keyType: 0,
        //     spanLabel: '月'
        //   },
        //   {
        //     placeholder: '选填',
        //     keyName: 'day',
        //     keyType: 0,
        //     spanLabel: '天'
        //   }
        // ]
      },
      {
        label: '月单价',
        placeholder: '必填 月单价',
        keyName: 'month_unit_price',
        keyType: 0,
        type: 'number',
        status: 'input'
      },
      {
        label: '合同编号',
        placeholder: '必填 请填写',
        keyName: 'contract_number',
        keyType: 'LJSHE',
        type: 'text',
        status: 'input'
      },
      {
        label: '空置期天数',
        placeholder: '请输入',
        keyName: 'vacancy',
        keyType: 0,
        type: 'number',
        status: 'input'
      },
      {
        label: '付款方式',
        placeholder: '请输入',
        keyName: 'pay_way',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '备注条款',
        placeholder: '请输入',
        keyName: 'remark_terms',
        keyType: '',
        type: 'textarea',
        status: 'input',
        formSpan: 24
      }
    ],
    slither2: [
      {
        label: '开户名',
        placeholder: '必填 请输入',
        keyName: 'account_name',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '开户行',
        placeholder: '必填 请输入',
        keyName: 'bank',
        keyType: '',
        type: 'text',
        status: 'input',
        icon: 'bank'
      },
      {
        label: '与房东关系',
        placeholder: '必填 请输入',
        keyName: 'relationship',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '卡号',
        placeholder: '必填 请输入',
        keyName: 'account',
        keyType: '',
        type: 'text',
        status: 'input'
      },
      {
        label: '支行',
        placeholder: '请输入',
        keyName: 'subbranch',
        keyType: '',
        type: 'text',
        status: 'input'
      }
      // {
      //   keyName: null,
      //   picker: 'addCustomer',
      //   button: '增加房东'
      // }
    ],
    slither3: [
      {
        keyName: 'subsidiary_customer',
        keyType: [],
        button: '增加',
        status: 'changeCount', // 会增加 删减客户
        formSpan: 8,
        children: [
          [
            {
              label: '客户姓名',
              placeholder: '必填 请输入',
              keyName: 'customer_name',
              keyType: '',
              type: 'text',
              status: 'input'
            },
            {
              label: '手机号码',
              placeholder: '必填 请输入',
              keyName: 'contact_phone',
              keyType: '',
              type: 'text',
              status: 'input'
            },
            {
              label: '证件类型',
              placeholder: '必填 请选择',
              readonly: 'readonly',
              keyName: 'card_type',
              keyType: '',
              type: 'text',
              status: 'input',
              showForm: 'formatData', //picker 显示form 或 formatData
              picker: 'picker'
            },
            {
              label: '证件号',
              placeholder: '必填 请输入',
              keyName: 'card_id',
              keyType: '',
              type: 'text',
              status: 'input'
            }
          ]
        ]
      }
      // {
      //   label: '客户姓名',
      //   placeholder: '必填 请输入',
      //   keyName: 'customer_name',
      //   keyType: '',
      //   type: 'text',
      //   status: 'input',
      // },
      // {
      //   label: '手机号码',
      //   placeholder: '必填 请输入',
      //   keyName: 'contact_phone',
      //   keyType: '',
      //   type: 'text',
      //   status: 'input',
      // },
      // {
      //   label: '证件类型',
      //   placeholder: '必填 请选择',
      //   readonly: 'readonly',
      //   keyName: 'card_type',
      //   keyType: '',
      //   type: 'text',
      //   status: 'checkbox',
      //   showForm: 'formatData', //picker 显示form 或 formatData
      //   picker: 'picker',
      // },
      // {
      //   label: '证件号',
      //   placeholder: '必填 请输入',
      //   keyName: 'card_id',
      //   keyType: '',
      //   type: 'text',
      //   status: 'input',
      // }
    ]
  }
}
