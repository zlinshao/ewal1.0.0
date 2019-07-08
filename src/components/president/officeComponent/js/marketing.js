//收房量,租房量
optionColletRent ={
  grid: { //距离容器边界间距
    top: 10,
    left: 0,
    right: 0,
    bottom: 10,
    containLabel: false,
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor:'rgba(0,255,255,0.2)',
    formatter: function (params) {
      return params;
    },
  },
  xAxis: [{
    type: 'category',
    // boundaryGap : true,
    data: [],
    show:false
  }],
    yAxis: [{
    type: 'value',
    show: false,
  }],
  series: [{
    data: [],
    type: 'line',
    areaStyle: {},
    smooth: true,
    symbol: 'none',  //去掉点的
    color: ''
  }]
};

//预警状态
optionPies = {
  title: { // 设置环形图中间部分的文字
    show: true,
    text:"",
    x: "center",
    y: "center",
    textStyle: {
      fontSize: "12",
      color: "#fff"
    }
  },
  color: ["#00CE28", "#FDC322","#EF600C","#F90505"], //手动设置每个图例的颜色
  tooltip: {
    trigger: 'item',
    backgroundColor:'rgba(0,255,255,0.2)',
    formatter: "{b}<br/>{a}:{d}%"
  },
  series: [
    {
      name:'',
      type:'pie',
      radius: ['70%', '80%'],
      label: {
        normal: {
          show: false,
        },
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[]
    }
  ]
};

//出租状态
optionRing = {
  title: {
    // 设置环形图中间部分的文字
    show: true,
    text: "",
    x: "center",
    y: "center",
    textStyle: {
      fontSize: "12",
      color: "#fff"
    }
  },
  color: [], //手动设置每个图例的颜色
  series: [
    {
      type: "pie",
      radius: ["85%", "100%"],
      // avoidLabelOverlap: true,
      // legendHoverLink:true,
      hoverAnimation: false,
      color: [{
        colorStops: [{
          offset: 0,
          color: ""    // 0% 处的颜色
        }, {
          offset: 1,
          color: ""   // 100% 处的颜色
        }],
        // globalCoord: false // 缺省为 false
      },'rgba(255,255,255,0.2)'],
      label: {
        normal: {
          show: true,
          position: "center",
          fontSize: 12,
          color:'',
          fontWeight: 'bold',
          formatter: '{c}%\n{b}' // {b}:数据名； {c}：数据值； {d}：百分比
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [ {
        value: '',
        name: name,
        label: {
          normal: {
            show: true
          }
        }
      },
        {
          value: '',
          name: '',
          label: {
            normal: {
              show: false
            }
          }
        }]
    }
  ]
};


// 性别(实心的饼图)
optionSolidPie= {
  tooltip: {
    trigger: 'item',
    backgroundColor:'rgba(0,255,255,0.2)',
    formatter: "{b}<br/>{a}:{d}%"
  },
  color: [],
  series: [
    {
      name:'',
      type:'pie',
      data:[],
      selectedMode: 'single',
      radius: [0, '80%'],
      label: {
        normal: {
          position: 'inner',
          formatter:"{d}%"
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },

    },
  ]
};



//出租率,周转率
optionRentChangee = {
  grid: { //距离容器边界间距
    top: "20px",
    left: "10px",
    right: "10px",
    bottom: "10px",
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor:'rgba(0,255,255,0.2)',
    formatter: function (params) {
      return params;
    },
  },
  xAxis: {
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
  },
  yAxis: [{
    type: 'value',
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
  }],
  series: [{
    data: [],
    type: 'line',
    smooth: true,
    symbol: 'none',  //去掉点的
    color: '#9ECD68'
  },{
    data: [],
    type: 'line',
    smooth: true,
    symbol: 'none',  //去掉点的
    color: '#337BFF'
  }]
};

//空置房源,实际业绩
optionHouseAchieve = {
  grid: {
    top: "10px",
    left: "20px",
    right: "20px",
    bottom: "20px",
    containLabel: true,
  },
  tooltip: {
    trigger: 'item',
    backgroundColor:'rgba(0,255,255,0.2)',
    padding:8,
    formatter: "{b} <br/>{a}:{c}"
  },
  xAxis: {
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
  },
  yAxis: {
    // type: 'value',
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
    scale: true
  },
  series: [{
    name:'',
    data: [],
    type: 'scatter',
    symbolSize:15,
    // symbolSize: function (data) {
    //   // return Math.sqrt(data[2]) / 5e2;
    //   // return Math.ceil(data[2] / 10);
    //   // return data[2] ;
    //   return data[2] / 10;
    //   // alert(data)
    // },
    itemStyle: {
      normal: {
        shadowBlur: 50,
        shadowOffsetY: 5,
        color: '#6DF1F0'
      }
    }
  }]
};


//学历统计,南丁格尔玫瑰图
optionRose = {
  title : {
    text: '',
    x:'left',
    textStyle:{
      color:'#33C8FF',
      fontSize:15,
    }
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)",
    backgroundColor:'rgba(0,255,255,0.2)',
    padding:8,
  },
  color: [],
  legend: {
    x : 'right',
    y : 'top',
    type:'scroll',
    orient:'vertical',
    icon: 'circle',
    align: 'left',
    textStyle: {
      color: [],

    },
    pageTextStyle:{
      color:'#33C8FF',
    },
    data:[],
  },
  calculable : true,
  series : [
    {
      name:'',
      type:'pie',
      radius : [20, 70],
      center : ['40%', '50%'],
      roseType : 'radius', //area radius
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      data:[]
    },
  ]
};

//入职,离职
optionEntryLeave = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false
    },
    backgroundColor:'rgba(0,255,255,0.2)',
    padding:8,
  },
  axisPointer: {
    link: {xAxisIndex: 'all'}
  },
  grid: [{
    left: 0,
    right: 0,
    top:0,
    height: '45%'
  }, {
    left: 0,
    right: 0,
    bottom:0,
    top: '55%',
    height: '45%'
  }],
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
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
        fontSize:12
      },
      data: []
    },
    {
      gridIndex: 1,
      type : 'category',
      boundaryGap : false,
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
        show: false,
      },
      data: [],
      position: 'top'
    }
  ],
  yAxis : [
    {
      name : '入职',
      type : 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed', //设置Y轴刻度为虚线
          color: '#6B7298',
          width:0.5,
        }
      },
    },
    {
      gridIndex: 1,
      name : '离职',
      type : 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed', //设置Y轴刻度为虚线
          color: '#6B7298',
          width:0.5,
        }
      },
      inverse: true
    }
  ],
  series : [
    {
      name:'入职',
      type:'line',
      areaStyle: {},
      smooth: true,
      symbol: 'none',  //去掉点的
      hoverAnimation: false,
      data: []
    },
    {
      name:'离职',
      type:'line',
      areaStyle: {},
      smooth: true,
      symbol: 'none',  //去掉点的
      xAxisIndex: 1,
      yAxisIndex: 1,
      hoverAnimation: false,
      data: []
    }
  ]
};
