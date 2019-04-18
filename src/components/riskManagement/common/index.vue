<template>
    <div id="marketRisk">
        <div>
            <div class="listTopCss items-bet">
                <div class="items-center listTopLeft">
                    <p class="flex-center" @click="showFinMenuList = true">
                        <b>...</b>
                    </p>
                    <h1>{{this.$route.query.pre_name}}</h1>
                    <h2 class="items-center">
                      <span v-for="(item,index) in selects" @click="changeTabs(index+1,item.id)"
                            class="items-column"
                            :class="{'chooseTab': chooseTab === index+1}">
                        {{item.name}}<i></i>
                      </span>
                    </h2>
                </div>
            </div>
            <div class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div>
                    <div class="marketRisk-list">
                        <div class="marketRisk-list-info flex-center" v-for="(item,index) in gradeChildrenData">
                            <div class="marketRisk-box flex-center" @click="routerLink('riskManagementDetail',{pre_name:item.name,pre_id:item.id})">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
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
        data() {
            return {
                riskManagement,
                showFinMenuList: false,
                chooseTab: 1,
                params: {//查询参数
                    search: '',
                    offset: 1,
                    limit: '',
                },
                gradeChildrenData: [],//三级列表数据
                selects:[],
                parent_id:'',

            }
        },
        mounted() {
            this.chooseTab = this.$route.query.pre_index;//切换tab
            this.selects = this.$route.query.pre_data;
            this.parent_id = this.$route.query.pre_id;
            this.getDataList();
        },
        watch: {
            $route: {
                handler: function(val, oldVal){
                    console.log(val);
                    this.chooseTab = this.$route.query.pre_index;//切换tab
                    this.selects = this.$route.query.pre_data;
                    this.parent_id = this.$route.query.pre_id;
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            changeTabs(id,pre_id) {
                this.chooseTab = id;
                this.parent_id = pre_id;
                this.getDataList();
            },
            getDataList() {
                this.$http.get(globalConfig.risk_sever + "/api/risk/classify",{parent_id:this.parent_id}).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log(res.data.data);
                        this.gradeChildrenData = res.data.data;
                    }
                })
            }

        },
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/riskManagement/GroupCoreIndicators/index.scss";

    @mixin riskManagementImg($m, $n) {
        $url: '../../../assets/image/riskManagement/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #marketRisk {
            > div {
                .mainList {
                    .marketRisk-list {
                        .marketRisk-list-info {
                            .marketRisk-box {
                                @include riskManagementImg('gsgd_0.png', 'theme1');

                                &:hover {
                                    @include riskManagementImg('gsgd_1.png', 'theme1');
                                }
                            }
                        }


                    }
                }
            }
        }
    }

</style>