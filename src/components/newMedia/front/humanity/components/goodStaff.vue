<template>
    <div id="goodStaff" class="scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
        <h1 class="flex-center"><span>优秀员工大赏</span></h1>
        <div class="goodStaff-lists">
            <div class="goodStaff-lists-info" v-for="(item,index) in goodStaffData">
                <div class="goodStaff-box">
                    <div>
                        <img src="../../../../../assets/image/newMedia/theme1/staff.png" alt="">
                    </div>
                    <p>
                        <span>{{item.department}}</span>
                        <span>{{item.name}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "goodStaff",
        data(){
            return{
                goodStaffData:[
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                    {
                        image:'',
                        department:'南京二区一组',
                        name:'切尔西'
                    },
                ],

            }
        }
    }
</script>

<style scoped lang="scss">
@import "../../../../../assets/scss/newMedia/front/humanity/components/goodStaff.scss";
@mixin goodStaffImg($n, $m) {
    $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
    @include bgImage($url);
}
#theme_name.theme1{
    #goodStaff{
        @include goodStaffImg('theme1','background_2.png');
        >h1{
            @include goodStaffImg('theme1','yxyg_dashang.png')
        }
        .goodStaff-lists{
            .goodStaff-lists-info{
                .goodStaff-box{
                    >div{
                        @include goodStaffImg('theme1','youxiu_grey.png');
                        &:hover{
                            @include goodStaffImg('theme1','youxiu_red.png');
                        }
                    }
                    img{


                    }
                }


            }
        }

    }
}
</style>