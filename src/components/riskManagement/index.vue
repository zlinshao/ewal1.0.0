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
                    <div v-for="(item,index) in riskData" @click="routerLink('riskManagementCommon',{org_id:item.id})" class="flex-center">
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
                params: {//查询参数
                    search: '',
                    offset: 1,
                    limit: 6,
                },
                riskData: [],
            }
        },
        mounted(){
           this.getDataList();
        },
        methods:{
            getDataList(){
                this.$http.get(globalConfig.risk_sever+"/api/risk/classify",this.params).then(res=>{
                    console.log(res);
                    if(res.status===200){
                        console.log(res.data.data);
                        this.riskData = res.data.data;
                    }
                })
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