<template>
  <div id="searchHigh">
    <div class="searchModule" v-if="showModule" @click="showModule = false"></div>
    <div class="searchContent" :class="{'showSearchContent': showModule}">
      <div class="scroll_bar">
        <div class="items-center searchInput">
          <input type="text" v-model="params[showData.keywords]" placeholder="地址/合同编号">
          <span @click="subSearch">搜索</span>
        </div>
        <div class="highGrade">
          <h5>高级</h5>
          <div class="formData borderNone" v-for="item in showData.data">
            <h5>{{item.title}}</h5>
            <div v-if="item.keyType === 'date'">
              <el-date-picker
                v-model="params[item.keyName]"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
            <div v-if="item.keyType === 'dateRange'">
              <el-date-picker
                v-model="params[item.keyName]"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="items-center" v-if="item.keyType === 'radio'">
              <p class="radioSelection" @click="chooseRadio(item.keyName,key.id)"
                 :class="{'highChoose': params[item.keyName] === key.id}"
                 v-for="key in item.value">
                {{key.title}}
              </p>
            </div>
            <div class="items-center" v-if="item.keyType === 'check'">
              <p class="radioSelection" @click="chooseCheck(item.keyName,key.id)"
                 :class="{'highChoose': params[item.keyName].includes(key.id)}"
                 v-for="key in item.value" v-if="params[item.keyName]">
                {{key.title}}
              </p>
            </div>
            <div v-if="item.keyType === 'staff'">
              <el-input @focus="staffSearch(item.value, item.keyName)" readonly v-model="showName[item.keyName]"
                        :placeholder="item.placeholder"></el-input>
            </div>
          </div>
        </div>
        <footer class="flex-center">
          <div @click="subSearch">确定</div>
          <div @click="resetting">重置</div>
        </footer>
      </div>
    </div>
    <!--选择人员-->
    <StaffOrgan :module="organModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
  </div>
</template>

<script>
  import StaffOrgan from './staffOrgan.vue'

  export default {
    name: "search-high",
    props: ['module', 'showData'],
    components: {StaffOrgan},
    data() {
      return {
        showModule: false,
        organModule: false,
        organData: {},// 组织架构配置 选择数量 num
        organKey: '',
        showName: {},
        params: {},
        reset: {},
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    mounted() {
    },
    activated() {
    },
    watch: {
      module(val) {
        this.showModule = val;
      },
      showModule(val) {
        if (!val) {
          this.$emit('close', 'close');
        }
      },
      showData: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          for (let key of val.data) {
            this.reset[key.keyName] = key.dataType;
          }
          let word = val.keywords ? val.keywords : 'search';
          this.reset[word] = '';
          this.reset.page = val.page ? val.page : 1;
          this.reset.limit = val.limit ? val.limit : 30;
          this.resetting();
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      // 单选
      chooseRadio(key, val) {
        if (val === this.params[key]) {
          this.params[key] = '';
        } else {
          this.params[key] = val;
        }
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
      // 选择人员
      staffSearch(val = '', key) {
        this.organModule = true;
        this.organData = val;
        this.organKey = key;
      },
      // 关闭 选择人员
      hiddenOrgan(ids, names) {
        this.organModule = false;
        if (ids !== 'close') {
          console.log(ids)
          console.log(names)
          this.params[this.organKey] = ids;
          this.showName[this.organKey] = names;
        }
      },
      subSearch() {
        this.$emit('close', this.params);
      },
      resetting() {
        this.params = JSON.parse(JSON.stringify(this.reset));
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/search/index.scss";
</style>
