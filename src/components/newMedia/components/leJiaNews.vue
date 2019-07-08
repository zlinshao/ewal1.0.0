<template>
    <div id="friend_moments">
        <div class="water">
            <div class="piping" ref="piping0">
                <div class="card" v-for="(item,index) in columnData0" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})" @mouseenter="chooseTabAlert(chooseTab)">
                    <img src="../../../assets/image/newMedia/theme1/active.png" class="card-top">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.view}}</span>
                            <span><i></i>{{item.point}}</span>
                            <span><i></i>{{item.comment}}</span>
                        </p>
                        <p class="card-desc">{{item.desc}}</p>
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="avatar-name">
                                <p>{{item.name}}</p>
                                <p>{{item.department}}</p>
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.time}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="piping" ref="piping1">
                <div class="card" v-for="(item,index) in columnData1" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})">
                    <img src="../../../assets/image/newMedia/theme1/active.png" class="card-top">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.view}}</span>
                            <span><i></i>{{item.point}}</span>
                            <span><i></i>{{item.comment}}</span>
                        </p>
                        <p class="card-desc">{{item.desc}}</p>
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="avatar-name">
                                <p>{{item.name}}</p>
                                <p>{{item.department}}</p>
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.time}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="piping" ref="piping2">
                <div class="card" v-for="(item,index) in columnData2" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})">
                    <img src="../../../assets/image/newMedia/theme1/active.png" class="card-top">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.view}}</span>
                            <span><i></i>{{item.point}}</span>
                            <span><i></i>{{item.comment}}</span>
                        </p>
                        <p class="card-desc">{{item.desc}}</p>
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="avatar-name">
                                <p>{{item.name}}</p>
                                <p>{{item.department}}</p>
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.time}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="piping" ref="piping3">
                <div class="card" v-for="(item,index) in columnData3" @click.stop="routerLink('newsDetail',{type:chooseTab,id:item.id})">
                    <img src="../../../assets/image/newMedia/theme1/active.png" class="card-top">
                    <div class="card-middle">
                        <h3>{{item.title}}</h3>
                        <p class="card-status">
                            <span><i></i>{{item.view}}</span>
                            <span><i></i>{{item.point}}</span>
                            <span><i></i>{{item.comment}}</span>
                        </p>
                        <p class="card-desc">{{item.desc}}</p>
                    </div>
                    <div class="card-bottom">
                        <div class="avatar">
                            <img src="../../../assets/image/newMedia/theme1/staff.png" alt="">
                            <div class="avatar-name">
                                <p>{{item.name}}</p>
                                <p>{{item.department}}</p>
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.time}}</span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name:'leJiaNews',
        props:['chooseTabType'],
        data() {
            return {
                chooseTab:this.chooseTabType,
                newsData: [
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '天上掉下个了林妹妹天上掉下个了林妹妹天上掉下个了林妹妹天上掉下个了林妹妹天上掉下个了林妹妹天上掉下个了林妹妹',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 1,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹哈哈哈",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '其实我们每个人都有一个大侠梦！',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 2,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹哈哈哈哈嘿嘿",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '大侠梦，！，英雄梦！',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 3,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹哈哈哈哈哈哈哈哈",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '每个人都有一个大侠梦，！，英雄梦！',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 4,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 5,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 6,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 7,
                    },
                    {
                        imgUrl: "../../../assets/image/newMedia/theme1/active.png",
                        title: "天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈",
                        view: "222",
                        point: "333",
                        comment: '444',
                        desc: '天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈哈天上掉下个了林妹妹呼呼呼呼哈哈哈哈哈哈哈',
                        avatar: '../../../assets/image/newMedia/theme1/avatar.png',
                        name: '丽丽',
                        department: '南京二区一组',
                        time: '2018-02-12 14:04:12',
                        id: 8,
                    },

                ],//列表总数据
                columnData0:[],//管道1数据
                columnData1:[],//管道2数据
                columnData2:[],//管道3数据
                columnData3:[],//管道4数据
                available: 1,
                height1: 0,
                height2: 0,
                height3: 0,
                page: 1
            };
        },
        watch:{

        },
        created() {
            // 获取第一页数据
            this.fetchMoments();

        },
        mounted() {
            // console.log(this.chooseTab);
            // 用来监听滚轮
            window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            fetchMoments() {// 请求接口方法
                // fetch("").then(res => res.json()).then(res => {
                //     // this.newsData = res.data.data;
                //     // this.sort(0);// 分配数据到指定管道
                // });
                this.sort(0)

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
                            // that.$refs.piping0.innerHTML += html;
                        } else if (min == 1) {
                            this.columnData1.push(this.newsData[j]);
                            // that.$refs.piping1.innerHTML += html;
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
    @import "../../../assets/scss/newMedia/components/hotNews.scss";

    @mixin hotImg($n, $m) {
        $url: '../../../assets/image/newMedia/' + $n + '/' + $m;
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
                            i:first-child{
                                @include hotImg('theme1','pic_shoucang.png')
                            }
                            i:nth-child(2){
                                @include hotImg('theme1','pic_dianzan.png')
                            }
                            i:last-child{
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