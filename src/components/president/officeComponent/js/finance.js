//亏损量
optionFolder ={
  grid: { //距离容器边界间距
    top: 30,
    left: 15,
    right: 15,
    bottom: 60,
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      animation: false
    },
    backgroundColor:'rgba(0,255,255,0.2)',
    padding:8,
    formatter: "{b} <br/>{a} : {c}",
    // formatter: "{b} <br/>{a} : {c} ({d}%)",
    // formatter: function (params) {
    //   return params;
    // },
  },
  xAxis: [{
    type: 'category',
    boundaryGap : false,
    data: [],
    splitLine: {
      show:false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color:"#6B7298",
      fontSize:10
    },
  }],
  yAxis: [{
    name : '',
    type: 'value',
    nameTextStyle:{
      color:'#6B7298',
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color:'#6B7298',
        width:0.5,
      }
    },
    // scale: true
  }],
  series: [{
    name:'亏损量',
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    areaStyle: {},
    smooth: false,
    symbolSize:8,
    // symbol: 'none',  //去掉点的
    color: '',
    itemStyle: {
      normal: {
        lineStyle: {
          color: "#00FFFF",
        }
      }
    },
  }]
};


//盈亏比
optionIncomeSpend = {
  grid: {
    top:5,
    left:10,
    right:10,
    bottom: 30
  },
  tooltip : {
    trigger: 'axis',
    backgroundColor:'rgba(0,255,255,0.2)',
    padding:8,
    axisPointer: {
      type: 'cross',
      // animation: true,
      label: {
        backgroundColor: 'rgba(0,255,255,0.2)'
      }
    }
  },
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : [
        '2009/9/1', '2009/9/2', '2009/9/3', '2009/9/4', '2009/9/5', '2009/9/6', '2009/9/7',
      ],
      //   .map(function (str) {
      //   return str.replace(' ', '\n')
      // })
      splitLine: {
        show:false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color:"#6B7298",
        fontSize:10
      },
    }
  ],
  yAxis: [
    {
      name: '',
      type: 'value',
      boundaryGap : false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color:'#6B7298',
          width:0.5,
        }
      },
    },
    {
      name: '',
      boundaryGap : false,
      type: 'value',
      inverse: true,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color:'#6B7298',
          width:0.5,
        }
      },
    }
  ],
  series: [
    {
      name:'收入',
      type:'line',
      animation: false,
      areaStyle: {},
      smooth: true,
      symbol: 'none',  //去掉点的
      lineStyle: {
        width: 1
      },
      // markArea: {
      //   silent: true,
      //   data: [[{
      //     xAxis: '2009/9/4'
      //   }, {
      //     xAxis: '2009/9/7'
      //   }]]
      // },
      data:[
        100,900,500,600,700,200,2000
      ]
    },
    {
      name:'支出',
      type:'line',
      yAxisIndex:1,
      animation: false,
      areaStyle: {},
      smooth: true,
      symbol: 'none',  //去掉点的
      lineStyle: {
        width: 1
      },
      // markArea: {
      //   silent: true,
      //   data: [[{
      //     xAxis: '2009/9/1'
      //   }, {
      //     xAxis: '2009/9/3'
      //   }]]
      // },
      data: [10,80,40,500,20,50,88,100]
    }
  ]
};
