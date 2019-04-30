defineReports = {
  1: {
    slither0: [
      {
        label: '产权地址',
        placeholder: '必填 请输入',
        keyName: 'house_address',
        keyValue: '',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '门锁类型',
        placeholder: '必填 请选择',
        keyName: 'lock_type',
        keyValue: '',
        type: 'picker'
      },
      {
        label: '衣柜',
        placeholder: '必填 请选择',
        keyName: 'wardrobe',
        keyValue: '',
        type: 'picker'
      },
      {
        label: '持有证件',
        placeholder: '必填 请填入',
        keyName: 'holding_documents_type',
        keyValue: '',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '产权证号',
        placeholder: '必填 请填入',
        keyName: 'property_right_card_number',
        keyValue: '',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '丘权号',
        placeholder: '必填 请填入',
        keyName: 'qiu_quan_number',
        keyValue: '',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '户型',
        placeholder: '必填 选择',
        keyName: 'house_type',
        keyValue: [],
        type: 'picker',
        childType: '',
        children: [
          {
            placeholder: '-室',
            keyName: 'room',
            keyValue: 0
          },
          {
            placeholder: '-厅',
            keyName: 'ting',
            keyValue: 0
          },
          {
            placeholder: '-卫',
            keyName: 'wei',
            keyValue: 0
          }
        ]
      },
      {
        label: '燃气灶',
        placeholder: '必填 请填入',
        keyName: 'gas_stove',
        keyValue: 0,
        type: 'input',
        typeStatus: 'input'
      },
      {
        label: '空调',
        placeholder: '必填 请填入',
        keyName: 'air_condition',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '面积',
        placeholder: '请填写',
        keyName: 'area',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '洗衣机',
        placeholder: '请填写',
        keyName: 'wash_machine',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '电视',
        placeholder: '请填写',
        keyName: 'television',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '装修',
        placeholder: '必填',
        keyName: 'decorate',
        keyValue: '',
        // keyValue: {
        //   id: '',
        //   name: ''
        // },
        valueStatus: 'obj',
        type: 'picker'
      },
      {
        label: '微波炉',
        keyName: 'microwave',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '衣架',
        keyName: 'clothe_rack',
        keyValue: 0,
        type: 'input',
        status: 'number'
      },
      {
        label: '房屋类型',
        placeholder: '请选择',
        keyName: 'property_type',
        // keyValue: {
        //   id: '',
        //   name: ''
        // },
        keyValue: '',
        valueStatus: 'obj',
        type: 'picker'
      },
      {
        label: '冰箱',
        keyName: 'fridge',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '沙发',
        keyName: 'sofa',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '朝向',
        placeholder: '请选择',
        keyName: 'direction',
        // keyValue: {
        //   id: '',
        //   name: ''
        // },
        keyValue: '',
        valueStatus: 'obj',
        type: 'picker'
      },
      {
        label: '油烟机',
        keyName: 'hood',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '椅子',
        keyName: 'chair',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '楼层',
        placeholder: '必填',
        keyName: 'floors',
        keyValue: '1',
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '热水器',
        keyName: 'water_heater',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '床和床垫的情况',
        placeholder: '必填 请选择',
        keyName: 'bed',
        keyValue: '0',
        type: 'picker'
      },
      {
        label: '物业电话',
        keyName: 'property_phone',
        keyValue: '',
        type: 'input',
        typeStatus: 'input'
      },
      {
        label: '餐桌',
        keyName: 'dining_table',
        keyValue: 0,
        type: 'input',
        typeStatus: 'number'
      },
      {
        label: '卫生情况',
        placeholder: '必填 请选择',
        keyName: 'is_clean',
        keyValue: '',
        type: 'radio'
      },
      {
        label: '物业费',
        placeholder: '必填',
        keyName: 'property_fee',
        keyValue: '',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '是否有天然气',
        placeholder: '必填 请选择',
        keyName: 'has_gas',
        keyValue: '',
        type: 'radio'
      },
      {
        label: '家电是否补齐',
        placeholder: '必填 请选择',
        keyName: 'is_fill',
        keyValue: '',
        type: 'radio'
      },
      {
        label: '是否有暖气',
        keyName: 'has_heater',
        keyValue: '',
        type: 'radio'
      },
      {
        label: '窗帘情况',
        placeholder: '必填 请选择',
        keyName: 'curtain',
        keyValue: '',
        type: 'picker'
      },
      {
        label: '结束时间',
        keyName: 'end_date',
        keyValue: '',
        type: 'picktimer',
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '备注',
        keyName: 'remark',
        keyValue: '',
        type: 'input',
        typeStatus: 'textarea',
        formSpan: 24
      },
      {
        label: '其它问题',
        keyName: 'other_remark',
        keyValue: '',
        type: 'input',
        typeStatus: 'textarea',
        formSpan: 24
      },
      {
        label: '房屋影像',
        keyName: 'ablum',
        keyValue: [],
        type: 'upload'
      }
    ],
    slither1: [
      {
        label: '签约时间',
        keyName: 'sign_date',
        keyValue: '',
        type: 'picktimer',
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '是否渠道',
        keyName: 'is_agency',
        keyValue: '',
        type: 'radio'
      },
      {
        label: '第一次付款时间',
        keyName: 'pay_first_date',
        keyValue: '',
        type: 'picktimer',
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '合同开始时间',
        keyName: 'begin_date',
        keyValue: '',
        type: 'picktimer',
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '渠道费',
        keyName: 'agency_price',
        keyValue: '',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '第二次付款时间',
        placeholder: '必填 请选择',
        keyName: 'pay_second_date',
        keyValue: '',
        type: 'picktimer',
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '合同结束时间',
        placeholder: '必填 请选择',
        keyName: 'end_date',
        keyValue: '',
        type: 'picktimer',
        format: 'yyyy 年 MM 月 dd 日'
      },
      {
        label: '是否是电子合同',
        placeholder: '必填 请选择',
        keyName: 'is_electronic_contract',
        keyValue: '0',
        type: 'radio'
      },
      {
        label: '签约时长',
        placeholder: '请输入',
        keyName: 'month',
        keyValue: 0,
        type: 'input',
        status: 'text'
      },
      {
        label: '月单价',
        keyName: 'month_unit_price',
        keyValue: 0,
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '合同编号',
        keyName: 'contract_number',
        keyValue: 'LJSHE',
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '空置期天数',
        keyName: 'vacancy',
        keyValue: 0,
        type: 'input',
        typeStatus: 'text'
      },
      {
        label: '付款方式',
        placeholder: '请输入',
        keyName: 'pay_way',
        keyValue: '',
        type: 'picker'
      },
      {
        label: '备注条款',
        placeholder: '请输入',
        keyName: 'remark_terms',
        keyValue: '',
        type: 'input',
        typeStatus: 'textarea',
        formSpan: 24
      }
    ],
    slither2: [
      {
        label: '开户名',
        placeholder: '必填 请输入',
        keyName: 'account_name',
        keyValue: '',
        typeStatus: 'text',
        type: 'input'
      },
      {
        label: '开户行',
        placeholder: '必填 请输入',
        keyName: 'bank',
        keyValue: '',
        typeStatus: 'text',
        type: 'input'
      },
      {
        label: '与房东关系',
        placeholder: '必填 请输入',
        keyName: 'relationship',
        keyValue: '',
        typeStatus: 'text',
        type: 'input'
      },
      {
        label: '卡号',
        placeholder: '必填 请输入',
        keyName: 'account',
        keyValue: '',
        typeStatus: 'text',
        type: 'input'
      },
      {
        label: '支行',
        placeholder: '必填 请输入',
        keyName: 'subbranch',
        keyValue: '',
        typeStatus: 'text',
        type: 'input'
      }
    ],
    slither3: [
      {
        keyName: 'subsidiary_customer',
        keyValue: [],
        button: '增加',
        type: 'change', // 会增加 删减客户
        formSpan: 8,
        childType: {},
        children: [
          [
            {
              label: '客户姓名',
              placeholder: '必填 请输入',
              keyName: 'customer_name',
              keyValue: '',
              typeStatus: 'text',
              type: 'input'
            },
            {
              label: '手机号码',
              placeholder: '必填 请输入',
              keyName: 'contact_phone',
              keyValue: '',
              typeStatus: 'text',
              type: 'input'
            },
            {
              label: '证件类型',
              placeholder: '必填 请输入',
              keyName: 'card_type',
              keyValue: '',
              type: 'picker'
            },
            {
              label: '证件号',
              placeholder: '必填 请输入',
              keyName: 'card_id',
              keyValue: '',
              typeStatus: 'text',
              type: 'input'
            }
          ]
        ]
      }
    ]
  }
}
