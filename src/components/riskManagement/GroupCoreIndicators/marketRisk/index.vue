<template>
    <div id="marketRisk">
        <div>
            <div class="listTopCss items-bet">
                <div class="items-center listTopLeft">
                    <p class="flex-center" @click="showFinMenuList = true">
                        <b>...</b>
                    </p>
                    <h1>集团核心指标</h1>
                    <h2 class="items-center">
          <span v-for="item in riskManagement.childrenData" @click="changeTabs(item.id,item.url)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.name}}<i></i>
          </span>
                    </h2>
                </div>
            </div>
            <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div v-if="chooseTab===1">
                    <div class="marketRisk-list">
                        <div class="marketRisk-list-info flex-center" v-for="(item,index) in marketRisk">
                            <div class="marketRisk-box flex-center" @click="routerLink(item.url)">
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="chooseTab===2">
                    <div class="marketRisk-list">
                        <div class="marketRisk-list-info flex-center" v-for="(item,index) in operationRisk">
                            <div class="marketRisk-box flex-center" @click="routerLink(item.url)">
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="chooseTab===3">
                    <div class="marketRisk-list">
                        <div class="marketRisk-list-info flex-center" v-for="(item,index) in liquidityRisk">
                            <div class="marketRisk-box flex-center" @click="routerLink(item.url)">
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="chooseTab===4">
                    <div class="marketRisk-list">
                        <div class="marketRisk-list-info flex-center" v-for="(item,index) in complianceRisk">
                            <div class="marketRisk-box flex-center" @click="routerLink(item.url)">
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {riskManagement} from '../../../../assets/js/allModuleList.js';

    export default {
        name: "index",
        data() {
            return {
                riskManagement,
                showFinMenuList: false,
                chooseTab: 1,
                marketRisk: [//市场
                    {id: 1, title: '市场风险监测制度',url:'riskManagementDetail'},
                    {id: 2, title: '市场风险量化控制制度',url:'riskManagementDetail'},
                    {id: 3, title: '系统性风险预警机制',url:'riskManagementDetail'},
                    {id: 4, title: '道德风险管理',url:'riskManagementDetail'},
                    {id: 5, title: '止损机制与强制平仓机制',url:'riskManagementDetail'},
                ],
                complianceRisk: [//合规
                    {id: 1, title: '公司内部规定',url:'internalRegulations'},
                    {id: 2, title: '行业法律规定',url:'internalRegulations'},
                    {id: 3, title: '委托方的合规比例',url:'internalRegulations'},
                ],
                operationRisk: [//运营
                    {id: 1, title: '集中交易制度',url:'riskManagementDetail'},
                    {id: 2, title: '交易审核',url:'riskManagementDetail'},
                    {id: 3, title: '执行力审计监督',url:'riskManagementDetail'},
                    {id: 4, title: 'IT系统及灾备风险',url:'riskManagementDetail'},
                ],
                liquidityRisk:[//流动性
                    {id: 1, title: '流动性风险量化控制制度',url:'riskManagementDetail'},
                    {id: 2, title: '人员流动性监测',url:'riskManagementDetail'},
                    {id: 3, title: '账户资本流动性管理',url:'riskManagementDetail'},
                ]


        }
        },
        methods: {
            changeTabs(id) {
                this.chooseTab = id;
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/riskManagement/GroupCoreIndicators/index.scss";

    @mixin riskManagementImg($m, $n) {
        $url: '../../../../assets/image/riskManagement/' + $n + '/' + $m;
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