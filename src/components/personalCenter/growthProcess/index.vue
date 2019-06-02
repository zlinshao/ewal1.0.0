<template>
  <div id="growth_process" class="scroll_bar">
    <div class="m-container">
      <div class="bg-container"></div>
      <div v-for="item in growthList" class="m-container-item"
           :style="{width:growthList.length<5?`${100/growthList.length}%`:`20%`}">
        <div class="m-container-item-decorate">
          <span class="m-container-item-decorate-circle"></span>
        </div>
        <div title="点击查看详情" @click="showDialogDetail(item)" class="m-container-item-content">
          <span class="red-circle"></span>
          【{{item.growthTime}}{{item.content}}】
          <span class="red-circle"></span>
        </div>
      </div>
    </div>


    <lj-dialog :size="{width: '50%',height: '80%'}" :visible.sync="dialog_visible">
      <div id="dialog_timeline" class="dialog_container">
        <div class="dialog_header">
          <h3>详情</h3>
        </div>
        <div class="timeline-container">
          <el-timeline>
            <el-timeline-item color="#CF2E33" v-for="(item,index) in growthDetailList" :key="index" :timestamp="item.timestamp" placement="top">
              <p>由{{item.operatorName}}为您办理了{{item.growthContent}}{{item.detail}}</p>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </lj-dialog>
  </div>
</template>

<script>
  import LjDialog from '@/components/common/lj-dialog.vue';

  export default {
    name: "growthProcess",
    components: {
      LjDialog,
    },
    data() {
      return {
        url: globalConfig.humanResource_server,
        dialog_visible: false,
        growthList: [],
        growthDetailList: []
      }
    },
    mounted() {
      this.getGrowthList();
    },
    methods: {
      getGrowthList: function() {
        this.$http.get(`${this.url}/staff/user/${this.$storage.get('user_info').id}/growth`).then(res => {
          if (res.code==="20000") {
            for(let i = 0; i < res.data.data.length; i++){
              let date = new Date(res.data.data[0].created_at)
              let year = date.getFullYear();
              let month = date.getMonth()+1;
              let day = date.getDate();
              let obj = {
                id: res.data.data[i].id,
                growthTime: `${year}年${month}月${day}日`,
                content: res.data.data[i].zh
              }
              this.growthList.push(obj)
            }
          }
        })
      },
      showDialogDetail: function(item) {
        this.growthDetailList = [];
        this.$http.get(`${this.url}/staff/user/${this.$storage.get('user_info').id}/growth_record`).then(res => {
          if (res.code==="20000") {
            for(let i = 0; i < res.data.data.length; i++){
              let data = res.data.data[i]
              let obj = {}
              //判断系统或者操作员
              if(data.growth.hasOwnProperty("operator")){
                if(data.growth.operator !== null && data.growth.operator.hasOwnProperty("name")){
                  obj = {
                          timestamp: data.created_at.toString(),
                          growthContent: item.content,
                          operatorName: data.growth.operator.name,
                        }
                }
                else{
                  obj = {
                    timestamp: data.created_at.toString(),
                    growthContent: item.content,
                    operatorName: '系统'
                  }
                }
              }
              else{
                  obj = {
                    timestamp: data.created_at.toString(),
                    growthContent: item.content,
                    operatorName: '系统'
                  }
              }
              if(data.new_data !== null){
                let new_dataName = ''
                for(let j = 0; j< data.new_data.length; j++){
                  if(data.new_data[j].name !== undefined){
                    new_dataName = new_dataName + ',' + data.new_data[j].name
                  }
                }
                if(new_dataName !== ''){
                  obj.detail =  '，转到：' + new_dataName.substring(1)
                }
              }
              this.growthDetailList.push(obj);
            }
            this.dialog_visible = true;
          }
        })
      },
    },
  }
</script>


<style lang="scss">
  #growth_process {
    #dialog_timeline {
      .timeline-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        .el-timeline-item__wrapper {
          text-align: left;
          .el-timeline-item__timestamp {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            height: 35px;
            //line-height: 35px;
            font-size: 16px;
            //color: #CF2E33;
            color: #686874;
            font-family: MicrosoftYaHei-Bold;
            font-weight: 700;
          }
          p {

          }
        }
      }
    }
  }

</style>

<style scoped lang="scss">
  @import "../../../assets/scss/personalCenter/growthProcess/index";

  @mixin personalCenterImg($m, $n) {
    $url: '../../../assets/image/personalCenter/' + $n + '/' + $m;
    @include bgImage($url);
  }

  #theme_name.theme1 {
    #growth_process {
      @include personalCenterImg('beijing.png', 'theme1');
    }

    .m-container {
      .bg-container {
        @include personalCenterImg('liuxian.png', 'theme1');
      }
    }
  }

  #theme_name.theme2 {
    #growth_process {

    }
  }

  #theme_name.theme3 {
    #growth_process {

    }
  }

  #theme_name.theme4 {
    #growth_process {

    }
  }
</style>
