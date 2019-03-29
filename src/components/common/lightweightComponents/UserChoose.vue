<template>
  <div id="userChoose" :style="{width:`${this.dropdownListWidth}px`}">
    <el-input @focus="staffModule = true" v-model="inputContent"></el-input>
    <StaffOrgan :module="staffModule" :organ-data="organData" @close="hiddenOrgan"></StaffOrgan>
  </div>
</template>

<script>
  import StaffOrgan from '../staffOrgan';

  export default {
    name: "UserChoose",
    props:['value','width','num'],
    components: {
      StaffOrgan
    },
    data() {
      return {
        staffModule: false,
        organData: {
          //num:1,
        },// 组织架构配置 选择数量 num
        inputContent:'',
        dropdownListWidth: 320
      }
    },
    watch: {
      width: {
        handler(val, oldVal) {
          if (val) {
            this.dropdownListWidth = val;
          }
        },
        immediate: true//第一次绑定也执行
      },
      num: {
        handler(val, oldVal) {
          if(val) {
            this.organData.num = parseInt(val);
          }
        },
        immediate: true//第一次绑定也执行
      }
    },
    methods: {
      // 关闭 选择部门
      hiddenOrgan(ids, names, arr) {
        this.staffModule = false;
        if (ids !== 'close') {
          this.inputContent = names;
          this.$emit('input',ids);
        }
      },
    }
  }
</script>

<style scoped>

</style>
