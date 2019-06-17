<template>
  <div id="organization">
    <div id="org-chart-container">
      <!--<div class="menu-container">
        <button @click="bigger()">+</button>
        <button @click="smaller()">-</button>
      </div>-->
    </div>
  </div>
</template>

<script>
  import OrgChart from './org-chart'
  import { generateOrgChartData, Data } from './base/data-generator'


  export default {
    name: 'tree',
    components: {},
    data() {
      return {
        url: globalConfig.humanResource_server,
        data: {
          name: '总裁办',
          title: '',
          children: []
        },
        orgChart: null,
      }
    },
    async mounted() {
      if(!this.validatePermission('Organization-Structure')) return;
      await this.getOrgDataOnce();
      //await this.getTopPosition();
      //await this.getOrganizationData(1,this.data);
      this.orgChart = new OrgChart()
      this.orgChart.draw(this.data);
    },
    watch: {},
    computed: {},
    methods: {
      async getTopPosition() {
        await this.$http.get(this.url+'organization/position',{
          page: 1,
          limit: 999,
          is_top: 1
        }).then(res => {
          if (res.code === '20000') {
            _.forEach(res.data.data,(o,index) => {
              this.data.children[index] = {name:o.name,user:o.users[0]?.name||'无名'};
            });
          } else {
          }
        })
      },

      //获取组织架构数据
      async getOrganizationData(parent_id = 1, currentData) {
        let temp = currentData;
        let params = {
          page:1,
          limit:100,
          parent_id
        };
        await this.$http.get(`${this.url}organization/organization`,params).then(async res=> {
          if(res.code.toString().endsWith('0')) {
            _.forEach(res.data.data,async (o,index) => {
              temp.children[index] = {name:o.name,user:o.leader?.name||'无名',children: []};
              await this.getOrganizationData(o.id,temp.children[index]);
            });
          }
        });
      },

      //通过统一接口一次获取组织架构图所有数据
      async getOrgDataOnce() {
        await this.$http.get(`${this.url}organization/org`).then(res=> {
          if(res.code.toString().endsWith('0')) {
            this.data = res.data;
            this.data.user = '姜千';
            this.recursionHandleData(this.data);
          }
        });
      },

      //递归处理数据
      recursionHandleData(tempdata) {
        if(tempdata.users) {
          tempdata.user = tempdata.users[0]?.name;
        }
        if(tempdata.leader) {
          tempdata.user = tempdata.leader.name;
        }
        tempdata.user = tempdata.user||'无名';
        if (tempdata.name) {
          if(tempdata.name.length>=8) {
            tempdata.name = insertStr(tempdata.name,8);
            function insertStr(str, start) {//往字符串指定位置增加空格
              return str.slice(0, start) + ' ' + str.slice(start);
            }
          }
        }
        tempdata.children = tempdata.child||[];
        //删除无用数据
        delete tempdata.child;
        delete tempdata.users;
        delete tempdata.leader;
        delete tempdata.id;
        delete tempdata.leader_id;
        delete tempdata.position_id;
        let temp = tempdata;
        if(!temp.children) {
          temp.children = [];
        }
        _(temp.children).forEach((o,index)=> {
          this.recursionHandleData(o);
        });
      },

      bigger() {
        this.orgChart.bigger();
        /*        let result = this.data;
                let strResult = JSON.stringify(result);
                debugger
                console.log(JSON.stringify(result));*/
      },
      smaller() {
        this.orgChart.smaller()
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/humanResource/departments/organization/index.scss";

  @mixin organImg($m, $n) {
    $url: '../../../../assets/image/humanResource/departments/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #organization {
      background-color: #F2F2F2;
    }
  }

  #theme_name.theme2 {
    #organization {

    }
  }

  #theme_name.theme3 {
    #organization {

    }
  }

  #theme_name.theme4 {
    #organization {

    }
  }
</style>
