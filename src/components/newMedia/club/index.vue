<template>
  <div id="club">
    <div class="listTopCss items-bet">
      <div class="items-center listTopLeft">
        <p class="flex-center" @click="showFinMenuList = true">
          <b>...</b>
        </p>
        <h1>俱乐部</h1>
      </div>

      <div class="items-center listTopRight">
        <div class="icons home_icon"></div>
        <div class="icons add" @click="addCustomer(chooseTab)"><b>+</b></div>
      </div>
    </div>

    <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
  </div>


</template>

<script>
    import mediaList from '../components/mediaList.vue'
    export default {
      name: "index",
      components:{
        mediaList,
      },
      data(){
        return{
          showFinMenuList:false,
        }
      }
    }
</script>

<style scoped>

</style>
