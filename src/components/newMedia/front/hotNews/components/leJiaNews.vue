<template>
    <div id="friend_moments">
        <div class="water">
            <div class="piping" ref="piping0">
                <div class="card" v-for="(item,index) in columnData0" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})" @mouseenter="chooseTabAlert(chooseTab)">
                    <img v-if="item.cover&&item.cover[0]" :src="item.cover[0].uri" class="card-top" style="height:150px">
                    <img v-else src="../../../../../assets/image/newMedia/theme1/active.png" class="card-top" style="height:150px">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.collect_number}}</span>
                            <span><i></i>{{item.thumbs_up_number}}</span>
                            <span><i></i>{{item.comment_number}}</span>
                        </p>
                        <!-- <div style="overflow: hidden;text-overflow: ellipsis; -o-text-overflow: ellipsis;white-space:nowrap; width:100%; height: " v-html="item.content"></div> -->
                        <!-- <p class="card-desc">{{item.content}}</p> -->
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img :src="item.user_id.avatar" alt="">
                            <div class="avatar-name">
                                <p>{{item.user_id?item.user_id.name: ''}}</p>
                                <p>{{item.user_id? item.user_id.org[0].name: ''}}</p>
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.created_at}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="piping" ref="piping1">
                <div class="card" v-for="(item,index) in columnData1" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})">
                     <img v-if="item.cover&&item.cover[0]" :src="item.cover[0].uri" class="card-top" style="height:150px">
                    <img v-else src="../../../../../assets/image/newMedia/theme1/active.png" class="card-top" style="height:150px">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.collect_number}}</span>
                            <span><i></i>{{item.thumbs_up_number}}</span>
                            <span><i></i>{{item.comment_number}}</span>
                        </p>
                        <!-- <div style="overflow: hidden;text-overflow: ellipsis; -o-text-overflow: ellipsis;white-space:nowrap; width:100%; height: " v-html="item.content"></div> -->
                        <!-- <p class="card-desc">{{item.content}}</p> -->
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img :src="item.user_id.avatar" alt="">
                            <div class="avatar-name">
                                <p>{{item.user_id.name}}</p>
                                <p>{{item.user_id? item.user_id.org[0].name: ''}}</p>
                                <!-- <p>{{item.user_id.name}}</p> -->
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.created_at}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="piping" ref="piping2">
                <div class="card" v-for="(item,index) in columnData2" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})">
                     <img v-if="item.cover&&item.cover[0]" :src="item.cover[0].uri" class="card-top" style="height:150px">
                    <img v-else src="../../../../../assets/image/newMedia/theme1/active.png" class="card-top" style="height:150px">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.collect_number}}</span>
                            <span><i></i>{{item.thumbs_up_number}}</span>
                            <span><i></i>{{item.comment_number}}</span>
                        </p>
                        <!-- <div style="overflow: hidden;text-overflow: ellipsis; -o-text-overflow: ellipsis;white-space:nowrap; width:100%; height: " v-html="item.content"></div> -->
                        <!-- <p class="card-desc">{{item.content}}</p> -->
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img :src="item.user_id.avatar" alt="">
                            <div class="avatar-name">
                                <p>{{item.user_id.name}}</p>
                                <p>{{item.user_id? item.user_id.org[0].name: ''}}</p>
                                <!-- <p>{{item.user_id.name}}</p> -->
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.created_at}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="piping" ref="piping3">
                <div class="card" v-for="(item,index) in columnData3" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})">
                     <img v-if="item.cover&&item.cover[0]" :src="item.cover[0].uri" class="card-top" style="height:150px">
                    <img v-else src="../../../../../assets/image/newMedia/theme1/active.png" class="card-top" style="height:150px">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.collect_number}}</span>
                            <span><i></i>{{item.thumbs_up_number}}</span>
                            <span><i></i>{{item.comment_number}}</span>
                        </p>
                        <!-- <div style="overflow: hidden;text-overflow: ellipsis; -o-text-overflow: ellipsis;white-space:nowrap; width:100%; height: " v-html="item.content"></div> -->
                        <!-- <p class="card-desc">{{item.content}}</p> -->
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img :src="item.user_id.avatar" alt="">
                            <div class="avatar-name">
                                <p>{{item.user_id.name}}</p>
                                <p>{{item.user_id? item.user_id.org[0].name: ''}}</p>
                                <!-- <p>{{item.user_id.name}}</p> -->
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.created_at}}</span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name:'hotNews',
        props:['chooseTabType'],
        data() {
            return {
                chooseTab:this.chooseTabType,
                newsData:[],
                columnData0:[],//管道1数据
                columnData1:[],//管道2数据
                columnData2:[],//管道3数据
                columnData3:[],//管道4数据
                available: 1,
                height1: 0,
                height2: 0,
                height3: 0,
                offset: 1,
                params:{
                    offset:1,
                    limit:12
                }
            };
        },
        watch:{

        },
        created() {
            // 获取第一页数据
            this.getDataLists();
        },
        mounted() {
            // 用来监听滚轮
            window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            getDataLists() {// 请求接口方法
                this.$http.get(globalConfig.newMedia_sever + '/api/article/news',{is_open:1}).then(res => {
                    if(res.status===200){
                        this.newsData = res.data.data;
                        this.sort(0);// 分配数据到指定管道
                    }else{
                        this.newsData = [];
                        this.count = 0;
                    }
                });
            },

            chooseTabAlert(val){
                console.log(val)
            },


            // sort()函数是递归的，因为要确保每个卡片的图片加载完成后再获取管道的高度，但是图片加载完成的函数是个异步函数，
            // 如果放在for循环中会打乱顺序，因此要使异步函数同步执行，for循环改为递归。
            sort(j) {
                if (j < this.newsData.length) {
                    let that = this;
                    // 创建Image类
                    var newImg = new Image();
                    // 获取要加载的图片地址
                    // newImg.src = "http://lanyue.ink:8123/images/" + (Math.floor(Math.random() * 15) + 1) + ".png";
                    newImg.src = 'https://unsplash.it/1600/900?random';

                    // 图片加载完成后（异步）
                    newImg.onload = () => {
                        // 四个管道的高度
                        var arr = [
                            that.$refs.piping0.offsetHeight,
                            that.$refs.piping1.offsetHeight,
                            that.$refs.piping2.offsetHeight,
                            that.$refs.piping3.offsetHeight
                        ];
                        //获取管道最小高度
                        var min = arr.indexOf(Math.min.apply(Math, arr));
                        // 添加卡片的模板

                        //给最小的管道添加卡片
                        if (min == 0) {
                            this.columnData0.push(this.newsData[j]);
                        } else if (min == 1) {
                            this.columnData1.push(this.newsData[j]);
                        } else if (min == 2) {
                            this.columnData2.push(this.newsData[j]);
                        } else if (min == 3) {
                            this.columnData3.push(this.newsData[j]);
                        }
                        that.sort(j + 1);
                    };
                }
            },
            handleScroll() {
                // 获取滚轮位置
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                this.height1 = scrollTop;
                // 文档高度
                this.height2 = document.body.scrollHeight;
                // 可视区域
                this.height3 = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
                // 如果滚动到最低（这里设置离最底还有100距离才触发函数）
                // available条件是为了防止触底时一直不断地请求。因此，请求一次后available设为0，直到滚动到离底部超过100距离（即数据加载玩后）才设为1
                if (this.height3 + this.height1 >= this.height2 - 100 && this.available) {
                    //请求下一页
                    this.page++;
                    this.available = 0;
                    let that = this;
                    fetch("  " + this.page)
                        .then(res => res.json())
                        .then(res => {
                            that.newsData = res.data;
                            if (that.newsData[0]) {
                                that.sort(0);
                            } else {
                                that.page--;
                            }
                        });
                } else if (this.height3 + this.height1 < this.height2 - 100) {
                    this.available = 1;
                }
            }
        }
    };

</script>

<style scoped lang="scss">
    @import "../../../../../assets/scss/newMedia/front/hotNews/components/hotNews.scss";

    @mixin hotImg($n, $m) {
        $url: '../../../../../assets/image/newMedia/' + $n + '/' + $m;
        @include bgImage($url);
    }

    #theme_name.theme1{
        #friend_moments{
            .water {
            }
            .piping {
                .card {
                    .card-top{
                        img{
                        }
                    }
                    .card-middle{
                        h3{
                        }
                        .card-status{
                            span{
                                i{
                                }
                            }
                            span:nth-child(1) i{
                                @include hotImg('theme1','pic_shoucang.png')
                            }
                            span:nth-child(2) i{
                                @include hotImg('theme1','pic_dianzan.png')
                            }
                            span:nth-child(3) i{
                                @include hotImg('theme1','pic_pinglun.png')
                            }
                        }
                        .card-desc{

                        }
                    }
                    .card-bottom{
                        .avatar{
                            .avatar-name{
                                p:first-child{
                                }
                            }
                            img{
                            }
                        }
                        .time{

                        }

                    }

                }

            }
        }
    }




</style>