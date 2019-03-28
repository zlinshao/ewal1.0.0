<template>
    <div id="companyProfile">
        <div class="listTopCss items-bet">
            <div class="items-center listTopLeft">
                <p class="flex-center" @click="showFinMenuList = true">
                    <b>...</b>
                </p>
                <h1>公司资料</h1>
            </div>
            <div class="items-center listTopRight">
                <div class="icons home_icon"></div>
                <div class="icons add" @click="add_visible = true"><b>+</b></div>
            </div>
        </div>
        <div class="mainList flex-center">
            <div class="menu_images flex-center justify-bet">
                <div v-for="(item,index) in profileType" class="menu_img_type flex-center"  @click="routerLink(item.url)" :key="index">
                    <span>{{item.title}}</span>
                </div>
            </div>

        </div>
        <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>
        <!--新增-->
        <lj-dialog :visible="add_visible" :size="{width: 500 + 'px',height: 500 + 'px'}"
                   @close="add_visible = false">
            <div class="dialog_container">
                <div class="dialog_header">
                    <h3>新增资料</h3>
                </div>
                <div class="dialog_main">
                    <el-form size="mini">
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>资料类型</span>
                                </div>
                                <div class="item_content">
                                    <!--<el-input ></el-input>-->
                                    <el-select placeholder="请选择">
                                        <el-option label="视频"></el-option>
                                        <el-option label="文档"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>资料名称</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>查看权限</span>
                                </div>
                                <div class="item_content">
                                    <el-input ></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="form_item_container">
                                <div class="item_label">
                                    <b class="item_icons">
                                        <i class="icon_account"></i>
                                    </b>
                                    <span>添加附件</span>
                                </div>
                                <div class="item_content">
                                    <span class="uploadFile">+</span>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button type="danger" size="small" >确定</el-button>
                    <el-button type="info" size="small" @click="add_visible = false;current_row = ''">取消</el-button>
                </div>
            </div>
        </lj-dialog>

    </div>


</template>

<script>
    import mediaList from '../../components/mediaList.vue';
    import LjDialog from '../../../common/lj-dialog.vue';

    export default {
        name: "index",
        components: {
            mediaList,
            LjDialog
        },
        data() {
            return {
                profileType:[
                    {
                        url: 'backVideo',
                        title: '视频',
                    },
                    {
                        url: 'backDocument',
                        title: '文档'
                    },
                ],
                showFinMenuList: false,
                add_visible:false,//新增
            }
        },
        watch:{
            "$route.path":function (to,from) {
                console.log(to)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../assets/scss/newMedia/back/profile/index.scss";
    @mixin companyProfileImg($n, $m) {
        $url: '../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #companyProfile{
            >div{

            }
            .menu_images{
                .menu_img_type{
                    @include companyProfileImg('theme1','zhongguojie2.png');
                    span{

                    }
                    &:hover{
                        @include companyProfileImg('theme1','zhongguoje.png');
                    }
                }
            }


        }

    }


</style>
