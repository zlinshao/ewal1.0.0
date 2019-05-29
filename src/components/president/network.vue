<template>
  <div id="main-container">
    <div id="line"></div>
    <div id="main">
        <div class="left">
            <section class="time">
                <section class="timeLeft">
                    <clock></clock>
                </section>
                <section class="timeRight">
                    <strong>{{this.time1}}</strong>
                    <p>{{this.time}}</p>
                </section>
            </section>
            <section class="choose">
                <div>
                    <el-select v-model="value" placeholder="请选择" clearable @change="change">
                        <el-option
                        v-for="item in options"
                        :key="item.InstanceId"
                        :label="item.InstanceId"
                        :value="item.InstanceId"
                        >
                        </el-option>
                    </el-select>
                </div>
            </section>
            <div id="area">
                <div style="width:80%;height:38%">
                    <div style="width:90%;height:95%;margin:10px auto;position:relative;top:10px;">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">基本信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_11.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:100%;height:100%" class="info">
                                 <li>
                                     <span>ID</span>
                                     <span>{{ID}}</span>
                                 </li>
                                 <li>
                                     <span>所在可用区</span>
                                     <span>{{aviableArea}}</span>
                                 </li>
                                 <li>
                                     <span>名称</span>
                                     <span>{{name}}</span>
                                 </li>
                                 <li>
                                     <span>描述</span>
                                     <span>{{describe}}</span>
                                 </li>
                                 <li>
                                     <span>地域</span>
                                     <span>{{area}}</span>
                                 </li>
                                 <li>
                                     <span>实例规格</span>
                                     <span>{{size}}</span>
                                 </li>
                                 <li>
                                     <span>镜像ID</span>
                                     <span :title="image">{{image}}</span>
                                 </li>
                                 <li>
                                     <span>密钥对名称</span>
                                     <span>{{key}}</span>
                                 </li>
                                 <li>
                                     <span>RAM角色</span>
                                     <span>{{joke}}</span>
                                 </li>
                                 <li>
                                     <span>集群ID</span>
                                     <span>{{group}}</span>
                                 </li>
                                 <li>
                                     <span>标签</span>
                                     <span>{{title}}</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
                <div style="width:80%;height:26%;margin-top:10px;">
                    <div style="width:95%;height:30%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">配置信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_22.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:100%;height:100%" class="info">
                                 <li>
                                     <span>ID</span>
                                     <span>{{ID}}</span>
                                 </li>
                                 <li>
                                     <span>付费方式</span>
                                     <span>{{pay}}</span>
                                 </li>
                                 <li>
                                     <span>停止模式</span>
                                     <span>{{stop}}</span>
                                 </li>
                                 <li>
                                     <span>到期时间</span>
                                     <span>{{expireTime}}</span>
                                 </li>
                                 <li>
                                     <span>自动续费(续费周期)</span>
                                     <span>{{keepPay}}</span>
                                 </li>
                                 <li>
                                     <span>创建时间</span>
                                     <span>{{creatTime}}</span>
                                 </li>
                                 <li>
                                     <span>自动释放时间</span>
                                     <span>{{releaseTime}}</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
                <div style="width:80%;height:38%;margin-top:10px;">
                    <div style="width:95%;height:100%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">付费信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_33.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:100%;height:100%" class="info">
                                 <li>
                                     <span>CPU</span>
                                     <span>{{cpu}}</span>
                                 </li>
                                 <li>
                                     <span>内存</span>
                                     <span>{{ram}}</span>
                                 </li>
                                 <li>
                                     <span>实例类型</span>
                                     <span>{{type}}</span>
                                 </li>
                                 <li>
                                     <span>操作系统</span>
                                     <span>{{system}}</span>
                                 </li>
                                 <li>
                                     <span>弹性网卡</span>
                                     <span>{{NIC}}</span>
                                 </li>
                                 <li>
                                     <span>公网IP</span>
                                     <span>{{publicIp}}</span>
                                 </li>
                                 <li>
                                     <span>私有IP</span>
                                     <span>{{privateIp}}</span>
                                 </li>
                                 <li>
                                     <span>带宽计费方式</span>
                                     <span>{{BillingMode}}</span>
                                 </li>
                                 <li>
                                     <span>当前使用带宽</span>
                                     <span>{{bandwidth}}</span>
                                 </li>
                                 <li>
                                     <span>专有网络</span>
                                     <span>{{privateNet}}</span>
                                 </li>
                                 <li>
                                     <span>虚拟交换机</span>
                                     <span>{{Switch}}</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div>
                <!-- <div style="width:80%;height:26%;margin-top:10px;">
                    <div style="width:95%;height:100%;margin:0 auto">
                        <p style="display:flex;justify-content:space-between"><span style="display:inline-block">配置信息</span>
                         <span style="width:20px;height:20px;display:inline-block;"><img src="../../assets/image/president/pic_22.png" alt=""></span></p>
                         <section style="width:100%;margin:0 auto;height:89%;display:flex">
                             <ul style="width:100%;height:100%" class="info">
                                 <li>
                                     <span>ID</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>付费方式</span>
                                     <span>111</span>
                                 </li>
                                 <li>
                                     <span>停止模式</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>到期时间</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>自动续费(续费周期)</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>创建时间</span>
                                     <span>11</span>
                                 </li>
                                 <li>
                                     <span>自动释放时间</span>
                                     <span>11</span>
                                 </li>
                             </ul>
                         </section>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="right">
            <div class="top">
                <img src="../../assets/image/president/back.png" alt="" @click="back">
                <ul class="tableBar">
                    <li>
                        <router-link :to="{path: 'markting'}">
                            <img src="../../assets/image/president/shichang_00.png" alt="">
                        </router-link>
                    </li>
                    
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:20px;">
                                <router-link :to="{path: 'humanbing'}">
                                    <img src="../../assets/image/president/renshi_00.png" alt="" >
                                </router-link>
                            </div>
                        </li>
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:15px;">
                                <router-link :to="{path: 'fincene'}">
                                    <img src="../../assets/image/president/caiwu_00.png" alt="">
                                </router-link>
                            </div>
                        </li>
                        <li>
                            <span>.</span>
                            <div style="display:inline-block;margin-left:15px;">
                                <router-link :to="{path: 'network'}">
                                    <img src="../../assets/image/president/wangluo_11.png" alt="">
                                </router-link>
                            </div>
                        </li>
                </ul>
            </div>
            <div class="bottom">
                <div style="width:100%;height:30%;display:flex">
                    <div id="chooseArea">
                        <img src="../../assets/image/president/yunxing.png" alt="">
                        <section>
                            <div>
                                <p>
                                    <img src="../../assets/image/president/pic_4.png" alt="">
                                    <span>磁盘</span>
                                    <span style="left:130px!important">{{risk}}个</span>
                                </p>
                                <p>
                                    <img src="../../assets/image/president/pic_5.png" alt="">
                                    <span>快照</span>
                                    <span style="left:130px!important">{{photo}}个</span>
                                </p>
                                <p>
                                    <img src="../../assets/image/president/pic_6.png" alt="">
                                    <span>弹性公网IP</span>
                                    <span>{{publicIp}}</span>
                                </p>
                                <p>
                                    <img src="../../assets/image/president/pic_7.png" alt="">
                                    <span>弹性网卡</span>
                                    <span>{{NIC}}</span>
                                </p>
                                <p>
                                    <img src="" alt="">
                                    <span></span>
                                    <span></span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span>网络类型</span>
                                    <span>{{netType}}</span>
                                </p>
                                <p>
                                    <span>付费方式</span>
                                    <span>{{pay}}</span>
                                </p>
                                <p>
                                    <span>到期时间</span>
                                    <span>{{expireTime}}</span>
                                </p>
                            </div>
                        </section>
                    </div>
                    <div id="entry">
                        <section>
                            <div>
                                <div>
                                    <p>云盾状态</p>
                                    <img src="../../assets/image/president/yundun.png" alt="">
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>有异常</p>
                                    <img src="../../assets/image/president/yichang.png" alt="">
                                </div>
                            </div>
                        </section>
                        <section>
                            <div>
                                <div>
                                    <p>系统事件</p>
                                    <p>{{SystemEvent}}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>潜在风险安全组</p>
                                    <p>{{RiskGroup}}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div style="width:100%;height:76%" class="inner">
                    <div>
                        <div>监控信息</div>
                        <div>
                            <!-- <div>
                                <img src="../../assets/image/president/chakan.png" alt="" >
                                查看内存等更多指标
                            </div>
                            <div>
                                <img src="../../assets/image/president/shezhi.png" alt="" >
                                设置报警规则
                            </div> -->
                            <div>
                                <el-date-picker
                                v-model="value6"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div id="cpu">
                        <div class="use">
                            <div>CPU</div>
                            <div>
                                <span></span>
                                <span>cpu使用率(%)</span>
                            </div>
                        </div>
                        <div id="network"></div>
                    </div>
                    <div id="cpu">
                        <div class="innerNet">
                            <div>网络&nbsp;(外网)</div>
                            <div>
                                <span></span>
                                <span>出网bps</span>
                                <span></span>
                                <span>入网bps</span>
                            </div>
                        </div>
                        <div id="cunstomPie"></div>
                    </div>
                    <div id="cpu">
                        <div class="innerNet">
                            <div>网络&nbsp;(内网)</div>
                            <div>
                                <span></span>
                                <span>出网bps</span>
                                <span></span>
                                <span>入网bps</span>
                            </div>
                        </div>
                        <div id="showLeave"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Clock from "vue-clock2";
export default {
  components: { Clock },
  name: "index",
  data() {
    return {
      SystemEvent: '',
      RiskGroup: '',
      risk: '',
      photo: '',
      netType: '',
      publicIp: '',
      publicNet: '',
      ID: '',
      aviableArea: '',
      name: '',
      describe: '',
      area: '',
      size: '',
      image: '',
      key: '',
      joke: '',
      group: '',
      title: '',
      pay: '',
      stop: '',
      expireTime: '',
      keepPay: '',
      creatTime: '',
      releaseTime: '',
      cpu: '',
      ram: '',
      type: '',
      system: '',
      NIC: '',
      publicIp: '',
      privateIp: '',
      BillingMode: '',
      dateTime: '',
      StartTime: '',
      EndTime: '',
      bandwidth: '',
      privateNet: '',
      Switch: '',
      allUrl: globalConfig.network_sever,
      value6: '',
      value: '',
      options: [],
      cpuArr: [],
      internetTArr: [],
      internetRArr: [],
      intarnetTArr: [],
      intarnetRArr: [],
      weekDateData: ['00:00:00', '02:00:00', '04:00:00', '06:00:00', '08:00:00', '10:00:00', '12:00:00', '14:00:00', '16:00:00', '18:00:00', '20:00:00', '22:00:00', '24:00:00'],
      url: '../../assets/image/president/renshi_0.png',
      time: "",
      time1: "",
      date: "",
      cityData: [{city: '南京', sale: 112, num: 'NO.1'}, {city: '西安', sale: 112, num: 'NO.2'}, {city: '杭州', sale: 112, num: 'NO.3'}]
    };
  },
  mounted() {
    let d = new Date()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()
    if (month < 10) {
      month = '0' + month.toString()
    }
    if (date < 10) {
      date = '0' + date.toString()
    }
    let dateTime = d.getFullYear() + '-' + month + '-' + date; 
    this.StartTime = dateTime + ' ' + '00:00:00'
    this.EndTime = dateTime + ' ' + '23:59:59'
    console.log(this.StartTime, this.EndTime)
    this.getLangDate()
    // this.drawLine();
  },
  activated() {
    //   this.drawLine();
      this.getHost()
  },
  watch: {},
  computed: {},
  methods: {
    change() {
        this.getInfo()
    },
    getData() {
        let params = {
            InstanceId: this.value,
            StartTime: this.StartTime,
            EndTime: this.EndTime,
            Period: 3600,
        }
        this.$http.post(this.allUrl + "monitor", params).then(res => {
            // this.options = res.data.InstanceStatuses.InstanceStatus
            res.data.MonitorData.InstanceMonitorData.forEach((item) => {
                this.cpuArr.push(item.CPU)
                this.internetTArr.push(item.InternetTX)
                this.internetRArr.push(item.InternetRX)
                this.intarnetTArr.push(item.IntranetTX)
                this.intarnetRArr.push(item.IntranetRX)
            })
            // this.value = res.data.InstanceStatuses.InstanceStatus[0].InstanceId
      }).then(() => {
          this.drawLine()
      })
    },
    //获取主机
    getHost() {
        // let params = {
        //     page: '1',
        //     limit: 10
        // }
        this.$http.post(this.allUrl + "instance-list").then(res => {
            this.options = res.data.InstanceStatuses.InstanceStatus
            this.value = res.data.InstanceStatuses.InstanceStatus[0].InstanceId
      }).then(() => {
          this.getInfo()
          this.getData()
      })
    },
    // 画图
    drawLine(){
        // let myChart = this.$echarts.init(document.getElementById('statistics'))
        // let myChart1 = this.$echarts.init(document.getElementById('leaveRate'))
        let myChart = this.$echarts.init(document.getElementById('network'))
        let myChart1 = this.$echarts.init(document.getElementById('cunstomPie'))
        let myChart2 = this.$echarts.init(document.getElementById('showLeave'))
        // 绘制图表
        myChart.setOption({
        tooltip : {
            trigger: 'axis'
        },
        //  legend: {
        //     data:['入职','离职']
        // },
        grid: {
            top: 30,
            bottom: 20
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.weekDateData,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        ],
        series : [
            {
                name:'CPU使用率',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.cpuArr
            }
        ]
      });
        myChart1.setOption({
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            top: 30,
            bottom: 20
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.weekDateData,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        ],
        series : [
            {
                name:'外网(出网)',
                type:'line',
                smooth:true,
                color: ['#FE5757'],
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.internetTArr
            },
            {
                name:'外网(入网)',
                type:'line',
                smooth:true,
                color: ['#FDA158'],
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.internetRArr
            }
        ]
      });
        myChart2.setOption({
        tooltip : {
            trigger: 'axis'
        },
        grid: {
            top: 30,
            bottom: 20
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.weekDateData,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    show: true,
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        ],
        series : [
            {
                name:'内网(出网)',
                type:'line',
                smooth:true,
                color: ['#FE5757'],
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.intarnetTArr
            },
            {
                name:'内网(入网)',
                type:'line',
                smooth:true,
                color: ['#FDA158'],
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:this.intarnetRArr
            }
        ]
      });
    },
    // 获取信息
    getInfo() {
        let params = {
            InstanceId: this.value
        }
        this.$http.post(this.allUrl + "instance", params).then(res => {
            this.SystemEvent = res.data.SystemEvent
            this.RiskGroup = res.data.RiskGroup
            this.ID = res.data.InstanceId
            this.netType = res.data.InstanceNetworkType
            this.ID = res.data.InstanceId
            this.ID = res.data.InstanceId
            this.aviableArea = res.data.ZoneId
            this.risk = res.data.TotalDisks
            this.photo = res.data.TotalSnapshots
            this.publicIp = res.data.ElasticPublicIp
            this.publicNet = res.data.NetworkInterfaces.NetworkInterface.NetworkInterfaceId
            this.name = res.data.InstanceName
            this.describe = res.data.Description
            this.area = res.data.Region
            this.size = res.data.InstanceType
            this.image = res.data.ImageId
            this.key = res.data.KeyPairName
            this.joke = res.data.RamRole
            this.group = res.data.ClusterId
            this.title = res.data.InstanceId
            this.pay = res.data.InstanceChargeType
            this.stop = res.data.StopModule
            let b =res.data.ExpiredTime.replace('T', ' ')
            this.expireTime = b.replace('Z', ':00')
            this.keepPay = res.data.StoppedMode
            let a = res.data.CreationTime.replace('T', ' ')
            this.creatTime = a.replace('Z', ':00')
            this.releaseTime = res.data.AutoReleaseTime
            this.cpu = res.data.Cpu + '核'
            this.ram = res.data.Memory + 'M'
            this.type = res.data.IoOptimized
            this.system = res.data.OSName
            this.NIC = res.data.NetworkInterfaces.NetworkInterface[0].NetworkInterfaceId
            this.publicIp = res.data.PublicIpAddress.IpAddress
            this.privateIp = res.data.NetworkInterfaces.NetworkInterface[0].PrimaryIpAddress
            this.BillingMode = res.data.InternetChargeType
            this.bandwidth = res.data.InternetMaxBandwidthOut + 'M'
            this.privateNet = res.data.VpcAttributes.VpcId
            this.Switch = res.data.VpcAttributes.VSwitchId
      })
    },
    back() {
        this.$router.push({
            path: '/president'
        })
    },
    toPath(item) {
      console.log(item)
      this.$router.push({ 
        path: item.url
      })
    },
    getLangDate() {
      function dateFilter(date){ //值小于10时，在前面补0
         if(date < 10){
             return "0"+date;
         }
         return date;
     }
      var dateObj = new Date(); //表示当前系统时间的Date对象
      var year = dateObj.getFullYear(); //当前系统时间的完整年份值
      var month = dateObj.getMonth() + 1; //当前系统时间的月份值
      var date = dateObj.getDate(); //当前系统时间的月份中的日
      var day = dateObj.getDay(); //当前系统时间中的星期值
      var hour = dateObj.getHours(); //当前系统时间的小时值
      var minute = dateObj.getMinutes(); //当前系统时间的分钟值
      var second = dateObj.getSeconds(); //当前系统时间的秒钟值
      this.time = dateFilter(year) +
        "年" +
        dateFilter(month) +
        "月" +
        dateFilter(date) +
        "日"
      this.time1 =
        dateFilter(hour) +
        ":" +
        dateFilter(minute) +
        ":" +
        dateFilter(second);
        setTimeout(() => {
          this.getLangDate()
        }, 1000)
    }
  }
};
</script>

<style lang="scss" scoped>
#main-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  background: url('../../assets/image/president/di112.png') no-repeat;
  background-size: 100% 100%;
  
}
#main-container .el-input__inner {
    background-color: #102761;
}
#main {
    display: flex;
    width: 100%;
    height: 100%;
}
.left {
    width:30%;
    height: 100%;
    
}
.right {
    width:70%;
    height: 100%;
}
.top {
    width: 100%;
    height: 14%;
    display: flex;
    position: relative;
    left: -72px;
    margin: 55px 0px 0px 0px;
}
.top>img{
    width: 30px;
    height: 30px;
}
.tableBar {
    position: relative;
    top: -39px;
    margin-left: 44px;
    width: 90%;
    height: 100%;
    li {
        display: inline-block;
    }
    // div {
    //     display: inline-block;
    // }
    span {
        color: #6B7298;
        font-size: 58px;
        position: relative;
    }
}
// .tableBar>div {
//     position: absolute;
//     top: -35px;
// }
.tableBar>li:nth-of-type(1){
    img {
        width: 178px;
        height: 18.86px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(2){
    margin-left: 42px;
    img {
        width: 178px;
        height: 18.86px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(3){
    margin-left: 20px;
    img {
        width: 178px;
        margin-left: 20px;
        vertical-align:middle
    }
}
.tableBar>li:nth-of-type(4){
    margin-left: 25px;
    img {
        // width: 178px;
        margin-left: 15px;
        vertical-align:middle
    }
}
.bottom {
    margin: 15px 0px 0px 0px;
    width: 95%;
    height: 85%;
}
#chooseArea {
    width: 64%;
    height: 100%;
    section {
        width: 90%;
        height: 100%;
        display: flex;
        margin: 10px auto;
        div {
            p {
                line-height: 45px;
                img{
                    width: 25px;
                    height: 25px;
                    position: relative;
                    top: 7px;
                }
                >span:nth-child(2) {
                    position: relative;
                    left: 3px;
                }
                >span:nth-child(3) {
                    position: relative;
                    left: 43px;
                }
            }
            width: 48%;
            height: 100%;
        }
    }
    position: relative;
    background: url('../../assets/image/border/k_16.png') no-repeat;
    background-size: 100% 100%; 
    >img {
        position: absolute;
        top: -56px;
        right: 35px;
        width: 122px;
        height: 122px;
    }
}
.pieOne {
    width:100%;
    height:27%;
    display: flex;
    background: url('../../assets/image/border/k_11.png') no-repeat;
    background-size: 100% 100%;
}
.pieTwo {
    width:100%;
    height:36%;
    // display: flex;
    margin-top: 10px;
    background: url('../../assets/image/border/k_12.png') no-repeat;
    background-size: 100% 100%;
    >div:nth-child(1) {
        width:100%;
        height:40%;
        display: flex;
        >div{
            width:50%;
            height:100%;
        }
    }
    >div:nth-child(2) {
        width:100%;
        height:60%;
    }
}
.pieOne>div {
    width: 50%;
    height: 100%;
    display: flex;
    ul{
        padding: 40px 0 0 15px;
        width: 50%;
        height: 100%;
    }
}
#cunstomList {
    margin-top: 5px;
}
#cunstomListTwo {
    margin: 25px 0 0 15px;
    display: inline-block;
    vertical-align: middle;
    >span:nth-child(2) {
        position: relative;
        top: -3px;
    }
}
#cunstomList>span:nth-of-type(1) {
    display: inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
}
#cunstomListTwo>span:nth-of-type(1) {
    display: inline-block;
    border-radius: 100%;
    width: 20px;
    height: 20px;
}
.pieWeekHalf>div:nth-of-type(1) {
    display: flex;
    width: 66%;
    height: 100%;
}
.pieWeekHalf>div:nth-of-type(2) {
    width: 33%;
    height: 100%;
}
.pieWeek {
    width:100%;
    height:31%;
    margin-top: 10px;
    background: url('../../assets/image/border/k_13.png') no-repeat;
    background-size: 100% 100%;
    >div:nth-child(1) {
        width:100%;
        height:30%;
        display: flex;
        >div{
            width:50%;
            height:100%;
        }
    }
    >div:nth-child(2) {
        width:100%;
        height:60%;
    }
}
#area {
    margin-left: 39px;
    width: 100%;
    height: 100%;
}
#area>div {
    width: 90%;
    height: 100%;
    position: relative;
    left: 10px;
    background: url('../../assets/image/border/k_8.png') no-repeat ;
    background-size: 100% 100%
}
#entry {
    width: 33%;
    margin-left: 38px;
    height: 100%;
    color: #ffffff;
    >section:nth-child(1) {
        width: 100%;
        height: 48%;
        display: flex;
        >div:nth-child(1) {
            width: 40%;
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(to right,#FD6F58,#FE5785);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
                img {
                    width: 40px;
                    height: 40px;
                    position: relative;
                    top: 20px;
                    left: 50px;
                }
            }
        }
        >div:nth-child(2) {
            width: 40%;
            height: 100%;
            margin-left: 15px;
            border-radius: 3px;
            background: linear-gradient(to right,#FF9E1D,#FFDE80);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
                img {
                    width: 40px;
                    height: 40px;
                    position: relative;
                    top: 20px;
                    left: 50px;
                }
            }
        }
    }
    >section:nth-child(2) {
        width: 100%;
        height: 48%;
        margin-top: 7px;
        display: flex;
        p:nth-child(2) {
            font-size: 35px;
            margin-top: 20px;
            text-align: center;
        }
        >div:nth-child(1) {
            width: 40%;
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(to right,#8FBD5B,#119A8B);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
            }
        }
        >div:nth-child(2) {
            width: 40%;
            height: 100%;
            margin-left: 15px;
            border-radius: 3px;
            background: linear-gradient(to right,#76FFF6,#298AC1);
            >div{
                width: 90%;
                height: 100%;
                margin: 5px auto;
            }
        }
    }
}
#line {
    width: 100%;
    height: 2px;
    border-top: 1px #00FFFF solid;
}
.time {
  display: flex;
  margin: 19px 0 0 53px;
  .clock {
    width: 100px;
    height: 100px;
  }
}
.use {
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    >div:nth-child(1) {
        color: #ffffff;
        position: relative;
        left: 75px;
        font-size: 25px;
    }
    div {
        >span:nth-child(1) {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: linear-gradient(left,#76FFF6,#298AC1);
            border-radius: 100%;
        }
        width: 13%;
        height: 100%;
    }
}
.innerNet {
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    >div:nth-child(1) {
        color: #ffffff;
        position: relative;
        left: 65px;
        font-size: 25px;
    }
    div {
        >span:nth-child(1) {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: linear-gradient(left,#FFF3B0,#FF8A30);
            border-radius: 100%;
        }
        >span:nth-child(3) {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: linear-gradient(left,#FFBAAF,#FE5785);
            border-radius: 100%;
        }
        width: 13%;
        height: 100%;
    }
}
#network,#cunstomPie,#showLeave {
    height: 90%;
    width: 100%
}
.choose {
    width: 100%;
    height: 7%;
    position: relative;
    div {
        width: 50%;
        margin: 0 auto;
        position: relative;
        left: -47px;
        top: 5px;
    }
    .el-input__inner {
        height: 28px;
    }
}
.date {
    width: 74%;
    position: absolute;
    top: 30px;
    left: 38px;
    margin: 0 auto
}
.location {
    position: absolute;
    top: 37px;
    right: 25px;
    img {
        width: 13px;
        height: 13px;
    }
}
.timeRight {
  margin: 21px;
  strong {
    font-size: 30px;
  }
}
#entryRate {
    width: 100%;
    height: 46%;
}
#allData {
    width: 100%;
    height: 40%;
    padding-top: 1rem;
}
.pieWeekHalf {
    display: flex;
    width: 100%;
    height: 50%;;
}
.progress {
    margin:15px 0 0 15px;
    width: 80%;
}
.info>li{
    display: flex;
    justify-content: space-between;
    span {
        display: inline-block;
    }
    >span:nth-child(1) {
        color: #33C8FF;
        width: 30%;
        margin-right: 60px;
    }
    >span:nth-child(2) {
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis
    }
    
}
.inner {
    margin-top: 35px;
}
.inner>div:nth-of-type(1){
    width: 95%;
    height: 8%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    >div:nth-child(1) {
        width: 6%;
        height: 100%;
        position: relative;
        top: 25px;
    }
    >div:nth-child(2) {
        width: 33%;
        height: 100%;
        display: flex;
        >div{
            height: 100%;
            img {
                width: 23px;
                height: 14px;
            }
        }
        >div:nth-child(1){
            width: 100%;
            position: relative;
            top: 9px;
        }
    }
}
.inner>div:nth-of-type(2){
    width: 95%;
    height: 46%;
    margin-top: 8px;background: url('../../assets/image/border/k_17.png') no-repeat ;
    background-size: 100% 100%
}
.inner>div:nth-of-type(3){
    width: 95%;
    height: 47%;
    margin-top: 12px;background: url('../../assets/image/border/k_17.png') no-repeat ;
    background-size: 100% 100%
}
.inner>div:nth-of-type(4){
    width: 95%;
    height: 47%;
    margin-top: 12px;background: url('../../assets/image/border/k_17.png') no-repeat ;
    background-size: 100% 100%
}
#main-container .el-input__inner {
    background-color: #102761;
}
</style>
