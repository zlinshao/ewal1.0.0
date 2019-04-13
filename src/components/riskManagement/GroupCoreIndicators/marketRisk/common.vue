<template>
    <div id="InternalRegulations">
        <div>
            <div class="listTopCss items-bet">
                <div class="items-center listTopLeft">
                    <h1>市场风险监测制度</h1>
                </div>
            </div>
            <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
                <div class="InternalRegulations-info">
                    <div class="left-info">
                        <div>
                            <p v-for="(item,index) in department" @click="selects(item.id)"  :class="chooseTab===item.id?'activeTab':''">
                                <span class="flex-center"><i>{{item.tag}}</i></span>
                                <span><i>{{item.name}}</i></span>
                            </p>
                        </div>
                    </div>
                    <div class="right-info flex-center">
                        <div class="scroll_bar"  v-if="chooseTab===1">
                            <div v-for="(item,index) in fileData1" class="right-info-list flex-center">
                                <div class="right-info-box" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                    <p class="flex-center">
                                        <span v-show="seen&&index===current">
                                            <i @click.stop="openEdit(item.id,index)">编辑</i>
                                            <i @click.stop="openDel(item.id,index)">删除</i>
                                        </span>
                                        暂无数据
                                    </p>
                                    <p><span>营销中心制度及相关操作…</span></p>
                                    <p><span>2019-04-07</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="scroll_bar"  v-if="chooseTab===2">
                            <div v-for="(item,index) in fileData2" class="right-info-list flex-center">
                                <div class="right-info-box">
                                    <p class="flex-center">暂无数据</p>
                                    <p><span>营销中心制度及相关操作…</span></p>
                                    <p><span>2019-04-07</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="scroll_bar"  v-if="chooseTab===3">
                            <div v-for="(item,index) in fileData3" class="right-info-list flex-center">
                                <div class="right-info-box">
                                    <p class="flex-center">暂无数据</p>
                                    <p><span>营销中心制度及相关操作…</span></p>
                                    <p><span>2019-04-07</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="scroll_bar"  v-if="chooseTab===4">
                            <div v-for="(item,index) in fileData4" class="right-info-list flex-center">
                                <div class="right-info-box">
                                    <p class="flex-center">暂无数据</p>
                                    <p><span>营销中心制度及相关操作…</span></p>
                                    <p><span>2019-04-07</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-img"></div>
                    </div>
                    <div class="add-icons" @click="add_visible = true"><span>+</span></div>
                </div>
            </div>
        </div>

        <!--新增-->
        <lj-dialog
                :visible="add_visible"
                :size="{width: 450 + 'px' ,height:450 + 'px'}"
                @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增文件</h3>
                </div>
                <div class="dialog_main borderNone">
                    <el-form  label-width="80px">
                        <el-form-item label="所属部门">
                            <el-input placeholder="请选择"></el-input>
                        </el-form-item>
                        <el-form-item label="文件类型">
                            <el-input placeholder="请选择"></el-input>
                        </el-form-item>
                        <el-form-item label="添加文件">
                            <el-input placeholder="请选择"></el-input>
                        </el-form-item>
                        <el-form-item label="可见范围">
                            <el-input placeholder="请选择"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button size="small" type="danger" @click="postReceivable_tag()">确定</el-button>
                    <el-button size="small" type="info" @click="add_visible = false">取消</el-button>
                </div>
            </div>
        </lj-dialog>

        <!--删除讲师-->
        <lj-dialog :visible="delete_visible" :size="{width: 400 + 'px',height: 250 + 'px'}"
                   @close="delete_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>删除</h3>
                </div>
                <div class="dialog_main">
                    <div class="unUse-txt">确定删除该讲师吗？</div>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" @click="delOk">确定</el-button>
                    <el-button type="info" size="small" @click="delete_visible = false;current_id = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>




    </div>
</template>

<script>
    import LjDialog from '../../../common/lj-dialog.vue';
    export default {
        name: "InternalRegulations",
        components:{
            LjDialog
        },
        data() {
            return {
                add_visible:false,
                delete_visible:false,
                seen:true,
                current: '',
                chooseTab:1,
                department: [
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},

                ],
                fileData1:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                ],
                fileData2:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                    {id: 1, name: '营销中心 ', tag: '一'},
                ],
                fileData3:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},

                ],
                fileData4:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},

                ],
                fileData5:[
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                    {id: 1, name: '营销中心 ', tag: '一'},
                    {id: 2, name: '行政中心 ', tag: '二'},
                    {id: 3, name: '财务中心', tag: '三'},
                    {id: 4, name: '人力资源中心', tag: '四'},
                    {id: 5, name: '运维中心', tag: '五'},
                    {id: 6, name: '新媒体运营中心', tag: '六'},
                    {id: 7, name: '乐伽大学', tag: '七'},
                    {id: 8, name: '稽查中心', tag: '八'},
                ],
            }
        },
        methods:{
            selects(id){
                this.chooseTab=id;
            },
            //鼠标移入
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            //鼠标移出
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
            openEdit(){
                this.add_visible = true;
            },
            openDel(){
                this.delete_visible = true;
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
        #InternalRegulations {
            .activeTab{
                span:first-child{
                    i{
                        color:#FFFFFF;
                    }
                    background: #CF2E33;
                }
                span:last-child{
                    i{
                        color:#CF2E33;
                    }
                }
            }
            > div {
                .mainList {
                    .InternalRegulations-info {

                        .left-info {

                            div {
                                span {

                                    i {

                                    }

                                    i:first-child {

                                    }
                                }
                            }
                        }

                        .right-info{

                            >div{

                                .right-info-list{

                                    .right-info-box{
                                        p{

                                        }
                                        p:first-child{

                                            &:hover{

                                            }
                                            span{
                                                i{
                                                    &:hover{
                                                        @include riskManagementImg('xzgj.png','theme1');
                                                    }
                                                }

                                            }
                                        }

                                        p:last-child{

                                        }
                                    }
                                }
                            }
                            .bg-img{
                                @include riskManagementImg('diwen.png','theme1');
                            }
                        }
                    }
                }
            }

        }
    }

</style>