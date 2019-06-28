<template>
  <div id="human">
<!--    <DatePicker @confirmDate="comfirm"></DatePicker>-->
   2、人力资源
  </div>
</template>

<script>
  import DatePicker from '../../common/president-component/datePicker.vue';   //日历
  export default {
    components: { DatePicker },
    name: "human",
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
