<template>
    <div id="riskManagement" >
        <div>
            <div class="listTopCss items-bet">
                <div class="items-center listTopLeft">
                    <h1>风险控制</h1>
                </div>
            </div>
            <div class="mainList" :style="{'height': this.mainListHeight() + 'px'}">
                <div class="menu-list">
                    <div v-for="(item,index) in riskManagement.data" @click="routerLink(item.url)" class="flex-center">
                        <span class="writingMode">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {riskManagement} from '../../assets/js/allModuleList.js';
    export default {
        name: "index",
        data(){
            return{
                riskManagement,
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/riskManagement/index.scss";

    @mixin riskManagementImg($m, $n) {
        $url: '../../assets/image/riskManagement/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1{
        #riskManagement {
            >div{
                .mainList {
                    @include riskManagementImg('di_1.png','theme1');
                    .menu-list {
                        div{
                            @include riskManagementImg('fxkz_0.png','theme1');
                            &:hover{
                                @include riskManagementImg('fxkz_1.png','theme1');
                                span{
                                    color:#ffffff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>