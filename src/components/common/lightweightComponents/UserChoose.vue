<template>
  <div id="userChoose">
    <el-input @focus="staffModule = true" v-model="input"></el-input>

    <StaffOrgan :module="staffModule" :organData="organData" @close="hiddenOrgan"></StaffOrgan>
  </div>
</template>

<script>
  import StaffOrgan from '../staffOrgan';

  export default {
    name: "UserChoose",
    props:['value'],
    components: {
      StaffOrgan
    },
    data() {
      return {
        staffModule: false,
        organData: {},// 组织架构配置 选择数量 num
        organKey: '',



      }
    },
    methods: {
      // 关闭 选择人员
      hiddenOrgan(ids, names, arr) {
        //debugger
        console.log(ids,names,arr);

        this.staffModule = false;
        if (ids !== 'close') {
          debugger

          this.params[this.organKey] = ids;
          this.showName[this.organKey] = names;
        }
      },
    }
  }
</script>

<style scoped>

</style>
