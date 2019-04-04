<template>
  <div id="lj_comment" :style="{width:width+'px'}">
    <div class="comment-container">
        <div class="comment-item" v-for="item in commentList">
          <div class="comment-item-left">
            <div><img :src="item.photo" alt=""></div>
          </div>
          <div class="comment-item-right">
            <div class="comment-item-right-up">
              <div class="comment-item-right-up-left">
                {{item.name}}
              </div>
              <div class="comment-item-right-up-right">
                {{item.datetime}}
              </div>
            </div>
            <div :title="item.comment" class="comment-item-right-down">
              {{item.comment}}
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LjComment",//评论组件
    props: {
      width:{
        default:600
      }
    },
    data() {
      return {
        commentList: [
          {
            name:'张三',
            photo:'http://static.lejias.cn/lejia7f87dea5d2f218312028484e56211173.jpg',
            comment:'雷克萨解放拉萨解放螺丝钉看见发来看是否雷克萨解放拉萨解放螺丝钉看见发来看是否雷克萨解放拉萨解放螺丝钉',
            datetime:'2019-03-28',
          },
          {
            name:'李四',
            photo:'http://static.lejias.cn/lejia7f87dea5d2f218312028484e56211173.jpg',
            comment:'6666666666666666',
            datetime:'2019-03-28',
          },
          {
            name:'李四',
            photo:'http://static.lejias.cn/lejia7f87dea5d2f218312028484e56211173.jpg',
            comment:'6666666666666666',
            datetime:'2019-03-28',
          },{
            name:'李四',
            photo:'http://static.lejias.cn/lejia7f87dea5d2f218312028484e56211173.jpg',
            comment:'6666666666666666',
            datetime:'2019-03-28',
          },{
            name:'李四',
            photo:'http://static.lejias.cn/lejia7f87dea5d2f218312028484e56211173.jpg',
            comment:'6666666666666666',
            datetime:'2019-03-28',
          },{
            name:'李四',
            photo:'http://static.lejias.cn/lejia7f87dea5d2f218312028484e56211173.jpg',
            comment:'6666666666666666',
            datetime:'2019-03-28',
          },
        ],//评论列表
      }
    },

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common/lightweightComponents/LjComment";

  #lj_comment {
    //width: 600px;
    .comment-container {
      width: 100%;
      .comment-item {
        width: 100%;
        min-height: 100px;
        margin: 10px 0;
        display: flex;
        &:not(:last-child) {
          border-bottom: 2px solid #EFEFEF;
        }

        .comment-item-left {

          max-height: 100%;
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            display: block;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
          }
          /*background-color: red;*/
        }
        .comment-item-right {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          .comment-item-right-up {
            width: 100%;
            height: 25px;
            display: flex;
            justify-content: space-between;
            color: #ccc;
            .comment-item-right-up-left {
              //padding-left: 20px;
            }
            .comment-item-right-up-right {
              //padding-right: 20px;
            }


          }
          .comment-item-right-down {
            flex: 1;
            width: 100%;
          }
        }
      }
    }
  }

</style>
