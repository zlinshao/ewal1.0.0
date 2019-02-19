<template>
  <div id="searchHigh" v-if="showModule">
    <div class="searchModule" @click="showModule = false"></div>
    <div class="searchContent">
      <div class="scroll_bar">
        <div class="items-center searchInput">
          <input type="text" v-model="params.keywords" placeholder="地址/合同编号">
          <span>搜索</span>
        </div>
        <div class="highGrade">
          <h5>高级</h5>{{params}}
          <div class="formData" v-for="item in showData">
            <h5>{{item.title}}</h5>
            <div v-if="item.keyType === 'dateRange'">
              <el-date-picker
                v-model="params[item.keyName]"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="items-center" v-if="item.keyType === 'radio'">
              <p @click="chooseRadio(item.keyName,key.id)" :class="{'highChoose': params[item.keyName] === key.id}"
                 v-for="key in item.value">
                {{key.title}}
              </p>
            </div>
            <div class="items-center" v-if="item.keyType === 'check'">
              <p @click="chooseCheck(item.keyName,key.id)" :class="{'highChoose': params[item.keyName].includes(key.id)}"
                 v-for="key in item.value" v-if="params[item.keyName]">
                {{key.title}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search-high",
    props: ['module'],
    data() {
      return {
        showModule: false,
        highChoose: 2,
        params: {},
        showData: [
          {
            keyType: 'dateRange',
            title: '创建时间',
            placeholder: '请选择日期',
            keyName: 'date1',
            dataType: [],
          },
          {
            keyType: 'dateRange',
            title: '跟进时间',
            placeholder: '请选择日期',
            keyName: 'date2',
            dataType: [],
          },
          {
            keyType: 'radio',
            title: '紧急程度',
            keyName: 'radio',
            dataType: '',
            value: [
              {
                id: 12,
                title: '特级',
              },
              {
                id: 13,
                title: '紧急',
              },
              {
                id: 14,
                title: '重要',
              },
              {
                id: 15,
                title: '一般',
              }
            ],
          },
          {
            keyType: 'check',
            title: '状态',
            keyName: 'check',
            dataType: [],
            value: [
              {
                id: 22,
                title: '已完成',
              },
              {
                id: 23,
                title: '未完成',
              },
            ],
          },
          {
            keyType: 'check',
            title: 'HHHHHH',
            keyName: 'checkS',
            dataType: [],
            value: [
              {
                id: 22,
                title: '已完成',
              },
              {
                id: 23,
                title: '未完成',
              },
            ],
          }
        ],
      }
    },
    mounted() {
      for (let key of this.showData) {
        this.params[key.keyName] = key.dataType;
      }
      this.params = Object.assign({}, this.params);
    },
    activated() {
    },
    watch: {
      module(val) {
        this.showModule = val;
      },
      showModule(val) {
        if (!val) {
          this.$emit('close');
        }
      }
    },
    computed: {},
    methods: {
      // 单选
      chooseRadio(key, val) {
        this.params[key] = val;
        this.params = Object.assign({}, this.params);
      },
      // 复选
      chooseCheck(key, val) {
        let check = this.params[key];
        if (check.includes(val)) {
          check.splice(check.indexOf(val), 1);
        } else {
          check.push(val);
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/search/index.scss";
</style>
