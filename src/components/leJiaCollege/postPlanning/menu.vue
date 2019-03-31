<template>
    <div id="menu">
        <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
            <div class="menu-list flex-center">
                <span
                        v-for="item in selects"
                        class="flex-center"
                        @click="routerLink(item.url,{type:4,url:'postPlanningLists',id:item.id,tab:1})"
                >
                    <i class="writingMode">{{item.title}}</i>
                </span>
            </div>
            <div class="right-tab">
                <div v-for="item in tabs" @click="routerLink(item.url,{type:4,url:'postPlanningLists',id:item.id,tab:2,switchTabs:item.tab})">
                    <span>
                        <i class="writingMode">{{item.title}}</i>
                    </span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "postPlanning",
        data(){
            return{
                selects:[
                    {id:1,title:'合伙人',url:'partner',},
                    {id:2,title:'城市总',url:'generalManager'},
                    {id:3,title:'城市副总',url:'viceManager'},
                    {id:4,title:'区域经理',url:'districtManager'},
                    {id:5,title:'储备区域经理',url:'reserveDistrictManager'},
                    {id:6,title:'片区经理',url:'areaManager'},
                    {id:7,title:'储备片区经理',url:'reserveAreaManager'},
                    {id:8,title:'市场专员',url:'sales'},
                ],
                tabs:[
                    {id:1,title:'新人训',url:'newTraining',tab:1},
                    {id:2,title:'储备培训',url:'reserveTraining',tab:2},
                ],
            }
        },

    }
</script>

<style scoped lang="scss">
@import "../../../assets/scss/leJiaCollege/postPlanning/menu.scss";
@mixin leJiaCollegeImg($n, $m) {
    $url: '../../../assets/image/leJiaCollege/' + $n + '/' + $m;
    @include bgImage($url);
}
    #theme_name.theme1{
        #menu{
           .mainList{
               @include leJiaCollegeImg('theme1','train-bg.png');
               .menu-list{
                   @for $i from 1 through 8{
                       span:nth-child(#{$i}){
                           @include leJiaCollegeImg('theme1','post#{$i}.png');
                           &:hover{
                               @include leJiaCollegeImg('theme1','hoverpost#{$i}.png');
                               color:#FFFFFF;
                           }



                       }
                   }

               }
           }
        }
    }
</style>