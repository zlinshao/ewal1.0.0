<template>
  <div id="human">
    <!--    <DatePicker @confirmDate="comfirm"></DatePicker>-->
    4、网络
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  export default {
    components: { DatePicker },
    name: "network",
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
