<template>
  <div id="human">
    <!--    <DatePicker @confirmDate="comfirm"></DatePicker>-->
   3.财务
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  export default {
    components: { DatePicker },
    name: "finance",
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
  #human{

  }


</style>
