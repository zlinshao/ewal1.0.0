<template>
  <div id="operation">
    <!--    <DatePicker @confirmDate="comfirm"></DatePicker>-->
    5、运维
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  export default {
    components: { DatePicker },
    name: "operation",
    data() {
      return {

      };
    },
    mounted() {

    },
    activated() {

    },
    watch: {},
    computed: {},
    methods: {
      //选择时间
      comfirm(val){
        console.log(val)

      }
    },

  };
</script>


<style lang="scss" scoped>
  #operation{

  }


</style>
