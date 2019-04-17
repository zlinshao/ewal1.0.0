<template>
   <div>
       <div class="listTopCss items-bet">
           <div class="items-center listTopLeft">
               <p class="flex-center" @click="showFinMenuList = true">
                   <b>...</b>
               </p>
               <h1>公司资料</h1>
               <h2 class="items-center">
          <span v-for="item in selects" @click="changeTabs(item.id)" class="items-column"
                :class="{'chooseTab': chooseTab === item.id}">
            {{item.title}}<i></i>
          </span>
               </h2>
           </div>
       </div>
       <div v-if="chooseTab===1" class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
           <div id="profile_video_back">
               <div class="mainList scroll_bar">
                   <div class="video-lists">
                       <div class="video-list-info flex-center" v-for="(item,index) in dataLists">
                           <div class="video-box" @click.stop="openDetail(item)">
                               <div class="video-box-top" @mouseleave="onMousteOut()" @mouseenter="onMousteIn(index)">
                                   <img-slider :arr="item.file_id" :single="true"
                                               :size="{width:'100%',height:'100%'}"></img-slider>
                               </div>
                               <div class="video-box-bottom">
                                   <div class="title">{{item.name}}</div>
                                   <div class="flex-center justify-bet">
                                       <span class="time">{{item.created_at}}</span>
                                       <span class="btn">
                                </span>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <media-list :module="showFinMenuList" @close="showFinMenuList = false"></media-list>

           </div>
       </div>

       <div v-if="chooseTab===2" class="mainList scroll_bar" :style="{'height': this.mainListHeight(-9) + 'px'}" ref='viewBox'>
           <div id="file">
               <div class="mainList" :style="{'height': this.mainListHeight(-9) + 'px'}">
                   <div class="InternalRegulations-info">
                       <div class="right-info flex-center">
                           <div class="scroll_bar">
                               <div v-for="(item,index) in fileData" class="right-info-list flex-center">
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

                           <div class="bg-img"></div>
                       </div>
                       <div class="add-icons" @click="add_visible = true"><span>+</span></div>
                   </div>
               </div>

               <!--新增-->
               <lj-dialog
                       :visible="add_visible"
                       :size="{width: 450 + 'px' ,height:450 + 'px'}"
                       @close="add_visible = false">
                   <div class="dialog_container">
                       <div class="dialog_header">
                           <h3>新增文档</h3>
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
       </div>
       <!--分页-->
       <footer class="flex-center bottomPage">
           <div class="develop flex-center">
               <i class="el-icon-d-arrow-right"></i>
           </div>
           <div class="page">
               <el-pagination
                       :total="count"
                       layout="total,jumper,prev,pager,next"
                       :current-page="params.offset"
                       :page-size="params.limit"
                       @current-change="handleChangePage"
               >
               </el-pagination>
           </div>
       </footer>
   </div>

</template>

<script>
    import mediaList from '../components/mediaList.vue';
    import LjDialog from '../../common/lj-dialog.vue';
    import ImgSlider from '@/components/common/lightweightComponents/ImgSlider.vue';
    import LjUpload from '../../common/lightweightComponents/lj-upload';

    export default {
        props: ['is_add'],
        name: "backVideo",
        components: {
            mediaList,
            LjDialog,
            LjUpload,
            ImgSlider,

        },
        data() {
            return {
                showFinMenuList: false,
                visible: false,
                count:0,
                chooseTab: 1,
                current: '',//当前
                seen: false,//显隐
                selects: [
                    {id: 1, title: "视频"}, {id: 2, title: "文档"}
                ],
                params: {//查询参数
                    search: '',
                    startRange: '',
                    endRange: '',
                    offset: 1,
                    limit: 6,
                    department_ids: '',
                    export: '',
                    type_id: 1,
                    all:1
                },
                dataLists: [],
                form: {
                    name: '',
                    file_info:[],//视频的七牛云文件数组
                    position: '',//岗位id数组
                    position_name:'',//岗位名称
                    file_id:'',//视频的七牛云文件id
                },
                fileData:[
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
        watch: {

        },
        mounted() {
            this.getDataLists();

        },
        methods: {



            // 查看详情
            openDetail(row) {
                for (let item of Object.keys(this.form)) {
                    this.form[item] = '';
                }
                this.visible = true;
                this.current_item = row;
                this.flag = 3;
                this.$http.get(globalConfig.newMedia_sever+'/api/datum/admin/'+row.id).then(res=>{
                    if(res.status===200){
                        let result = res.data;
                        let position_arr = result.position;
                        let file_arr = result.file_id;
                        let names = '';
                        let position_arr_ids = [];
                        let file_arr_ids=[];
                        for(let item of position_arr){//权限ids
                            names += item.name+'、';
                            position_arr_ids.push(item.id);
                        }
                        for(let item of file_arr){//文件ids
                            file_arr_ids.push(item.id)
                        }
                        this.form.position_name = names;
                        this.form.position = position_arr_ids;
                        this.form.file_id = file_arr_ids;
                        this.form.file_info = file_arr;
                        this.form.name = result.name;
                    }
                })
            },

            //tab切换
            changeTabs(id) {
                this.chooseTab = id;
            },
            //移入
            onMousteIn: function (index) {
                this.seen = true; //鼠标移入显示
                this.current = index;
            },
            //移出
            onMousteOut: function (index) {
                this.seen = false; //鼠标移出隐藏
                this.current = null;
            },
            //获取列表
            getDataLists() {
                this.$http.get(globalConfig.newMedia_sever + '/api/datum/admin', this.params).then(res => {
                    if (res.status === 200) {
                        this.dataLists = res.data.data;
                        this.count = res.data.total;
                    }else{
                        this.dataLists = [];
                        this.count = 0
                    }
                })

            },

        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/newMedia/back/profile/video.scss";
    @import "../../../assets/scss/newMedia/back/profile/file.scss";

    @mixin profile_video($n, $m) {
        $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1 {
        #profile_video_back {
            .video-lists {
                .video-list-info {
                    .video-box {
                        .video-box-top {
                            video {
                            }

                            .video-start-icon {
                                @include profile_video('theme1', 'start.png')
                            }

                            .video-modal {
                            }
                        }


                        .video-box-bottom {
                            .title {
                            }

                            .time {

                            }

                            .btn {
                                i {
                                }

                                i:nth-child(1) {
                                    @include profile_video('theme1', 'bianji.png')
                                }

                                i:nth-child(2) {
                                    @include profile_video('theme1', 'shanchu.png')
                                }
                            }

                        }
                    }
                }
            }
        }

        .window {
            .video-container .play-container {
                width: 480px !important;
                height: 300px !important;
            }
        }
    }

</style>