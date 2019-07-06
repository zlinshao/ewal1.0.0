//基本信息
baseInfo = [
  {name:'ID',key:'InstanceId'},
  {name:'所在可用区',key:'ZoneId'},
  {name:'名称',key:'InstanceName'},
  {name:'描述',key:'Description'},
  {name:'地域',key:'Region'},
  {name:'实例规格',key:'InstanceType'},
  {name:'镜像ID',key:'ImageId'},
  {name:'密钥对名称',key:'KeyPairName'},
  {name:'RAM角色',key:'RamRole'},
  {name:'集群ID',key:'ClusterId'},
];

  //付费信息
  payInfo = [
  {name:'付费方式',key:'InstanceChargeType'},
  {name:'停止模式',key:'StopModul'},
  {name:'到期时间',key:'ExpiredTime'},
  {name:'自动续费（续费周期）',key:'StoppedMode'},
  {name:'创建时间',key:'CreationTime'},
  {name:'自动释放时间',key:'AutoReleaseTime'},
];

  //配置信息
  configInfo = [
  {name:'CPU',key:'Cpu'},
  {name:'内存',key:'Memory'},
  {name:'实例类型',key:'IoOptimized'},
  {name:'操作系统',key:'OSName'},
  {name:'弹性网卡',key:'NetworkInterfaceId'},
  {name:'公网IP',key:'IpAddress'},
  {name:'弹性公网IP',key:'ElasticPublicIp'},
  {name:'私有IP',key:'PrimaryIpAddress'},
  {name:'带宽计费方式',key:'InternetChargeType'},
  {name:'当前使用带宽',key:'InternetMaxBandwidthOut'},
  {name:'专有网络',key:'VpcId'},
  {name:'虚拟交换机',key:'VSwitchId'},
];



  //右边第一栏右边的数据
statusRight = [
  {name:'网络类型',key:'InstanceNetworkType'},
  {name:'付费方式',key:'InstanceChargeType'},
  {name:'到期时间',key:'ExpiredTime'},
];

  //CPU
optionCpu = {
  grid: { //距离容器边界间距
    top: "20px",
      left: "20px",
      right: "20px",
      bottom: "50px",
      containLabel: true,
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLabel: {  // X轴字体颜色设置
      textStyle: {
        color: '#6B7298',
        fontSize: 12,
      },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false
    },
  }],
    yAxis: [{
    type: 'value',
    axisTick: {show: false},
    min: 0,
    max: 100,
    // interval: 20,
    axisLabel: {
      formatter: '{value}',
      textStyle: {
        color: '#6B7298',  // Y轴字体颜色设置
        fontSize: 12,
      }
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed', //设置Y轴刻度为虚线
        color: '#6B7298'
      }
    },
  }],
  dataZoom: [{
    type: 'slider',
    height: 15,
    start: 0,
    end: 20
  }],
    series: [{
    data: [],
    type: 'line',
    areaStyle: {},
    smooth: true,
    symbol: 'none',  //去掉点的
    color:''
  }
  ]
};

//网络
optionInter = {
  grid: { //距离容器边界间距
    top: "20px",
      left: "20px",
      right: "20px",
      bottom: "50px",
      containLabel: true,
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLabel: {  // X轴字体颜色设置
      textStyle: {
        color: '#6B7298',
        fontSize: 12,
      },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false
    },
  }],
    yAxis: [{
    type: 'value',
    axisTick: {show: false},
    min: 0,
    axisLabel: {
      formatter: '{value}',
      textStyle: {
        color: '#6B7298',  // Y轴字体颜色设置
        fontSize: 12,
      }
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed', //设置Y轴刻度为虚线
        color: '#6B7298'
      }
    },
  }],
  dataZoom: [{
    type: 'slider',
    height: 15,
    start: 0,
    end: 20
  }],
    series: [
    {
      data: [],
      type: 'line',
      areaStyle: {},
      smooth: true,
      symbol: 'none',  //去掉点的
      color: ''
    },
    {
      data: [],
      type: 'line',
      areaStyle: {},
      smooth: true,
      symbol: 'none',  //去掉点的
      color: ''
    }
  ]
};
