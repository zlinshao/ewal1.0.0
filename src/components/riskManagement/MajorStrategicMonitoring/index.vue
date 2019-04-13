<template>
    <div id="GroupCoreIndicators" >
        <div>
            <div class="listTopCss items-bet">
                <div class="items-center listTopLeft">
                    <p class="flex-center">
                        <b>...</b>
                    </p>
                    <h1>重大战略监测</h1>
                </div>
            </div>
            <div class="mainList" :style="{'height': this.mainListHeight() + 'px'}">
                <div class="menu-list">
                    <div v-for="(item,index) in riskManagement.childrenData3" @click="routerLink(item.url)" class="flex-center">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {riskManagement} from '../../../assets/js/allModuleList.js';
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
    @import "../../../assets/scss/riskManagement/GroupCoreIndicators/index.scss";

    @mixin riskManagementImg($m, $n) {
        $url: '../../../assets/image/riskManagement/' + $n + '/' + $m;
        @include bgImage($url);
    }
    #theme_name.theme1{
        #GroupCoreIndicators {
            >div{
                .mainList {
                    @include riskManagementImg('di_2.png','theme1');
                    .menu-list {
                        div{
                            width: 283px;
                            height: 285px;
                            @include riskManagementImg('scjj_0.png','theme1');
                            &:hover{
                                @include riskManagementImg('scjj_1.png','theme1');
                                span{
                                    color:#B9292D;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>