<template>
  <div id="searchHigh">
    <div class="searchModule" v-if="showModule" @click="showModule = false"></div>
    <div class="searchContent" :class="{'showSearchContent': showModule}">
      <div class="scroll_bar">
        <div class="items-center searchInput">
          <input type="text" v-model.trim="params[showData.keywords]" :placeholder="showData.placeholder || '请输入搜索内容'">
          <span @click="subSearch">搜索</span>
        </div>
        <div v-if="showData.data&&showData.data.length>0" class="highGrade">
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
              <user-choose width="470" :num="item.value.num||null" :title="item.placeholder"
                           v-model="params[item.keyName]"></user-choose>
            </div>
            <div v-if="item.keyType === 'depart'">
              <org-choose width="470" :num="item.value.num||null" :title="item.placeholder"
                          v-model="params[item.keyName]"></org-choose>
            </div>
            <div v-if="item.keyType === 'position'">
              <post-choose width="470" :num="item.value.num||null" :title="item.placeholder"
                           v-model="params[item.keyName]"></post-choose>
            </div>
            <div v-if="item.keyType === 'input'">
              <el-input width="470"  :placeholder="item.placeholder" v-model="params[item.keyName]"  ></el-input>
            </div>
            <div v-if="item.keyType === 'subject'">
              <el-input width="470"  :placeholder="item.placeholder" @focus="subject_visible = true;which_subject = 'out_account';is_disabled = true;keyName=item.keyName;lebleName=item.lebleName" v-model="params[item.lebleName]"  ></el-input>
            </div>
          </div>
        </div>
        <footer class="flex-center">
          <div @click="subSearch">确定</div>
          <div @click="resetting">重置</div>
        </footer>
      </div>
    </div>
     <lj-subject :visible="subject_visible" @close="subject_visible = false" @confirm="handleConfirmSubject"
                style="z-index:1000"></lj-subject>
  </div>
</template>

<script>
import LjSubject from './lj-subject.vue';
  export default {
    name: "search-high",
    props: ['module', 'showData'],
    components: { LjSubject},
    data() {
      return {
        showModule: false,
        subject_visible: false,
        is_disabled: false,
        which_subject: '',
        lebleName: '',
        lebleName: '',
        move_subject: {
          initial: '',
          parent_id: '',
          title: ''
        },
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
        this.listenOnKeyDownEnter(val);
      },
      showData: {//深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
         if(val != oldVal) {
          for (let key of val.data) {
              this.reset[key.keyName] = key.dataType;
            }
            let word = val.keywords ? val.keywords : 'search';
            this.reset[word] = '';
            this.reset.page = val.page ? val.page : 1;
            this.reset.limit = val.limit ? val.limit : 30;
            this.resetting();
         }
        },
        deep: true
      },
    },
    computed: {},
    methods: {
      /**
       * 监听或禁用enter事件
       * @param flag 控制是否监听enter事件
       */
      listenOnKeyDownEnter(flag = false) {
        let _this = this;
        document.onkeydown = function(e){
          e = window.event || e;
          if(e.keyCode=='13'||e.keyCode=='108'){
            if (flag) {
              _this.subSearch();
            } else {
              return false;
            }
          }
        }
      },
      handleConfirmSubject(val) { //科目确定
        if (this.which_subject === 'move_subject') {
          // this.move_subject.parent_id = val.id;
          // this.move_subject.title = val.title;
           this.params[this.keyName] =  val.id;
          this.params[this.lebleName] =  val.title;
        }
        if (this.which_subject === 'subject') {
           this.params[this.keyName] =  val.id;
           this.params[this.lebleName] =  val.title;
          // this.subject.parent_name = val.title;
          // this.subject.parent_id = val.id;

          // this.formData.subject_id = val.id;
          // this.formData.subject_name = val.title;

          // this.ruleForm.subject_id = val.id;
          // this.ruleForm.subject_name = val.title;
        }
        if (this.which_subject === 'out_account') {
          this.params[this.keyName] =  val.id;
          this.params[this.lebleName] =  val.title;
          // this.out_form.subject_id = val.id;
          // this.out_form.subject_name = val.title;
        }
      },

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
      subSearch() {
        this.$emit('close', this.params);
      },
      resetting() {
        _.forEach(this.showData.data, (o) => {
          if (_(['depart', 'position', 'staff']).includes(o.keyType)) {
            //this.$set(this.params, o.keyName, []);
            this.params[o.keyName] = [];
          }
        });
        this.params = this.jsonData(this.reset);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/search/index.scss";
</style>
