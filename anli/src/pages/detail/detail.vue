<template>
  <view class="detail">
    <view class="title"
      >{{detailInfo.item?.title}}</view
    >
    <view class="info">
      <view class="author">{{detailInfo.item?.author}}</view>
      <view class="time">{{detailInfo.item?.posttime}}</view>
    </view>
    <view class="content">
        <rich-text :nodes="detailInfo.item?.content"></rich-text>

    </view>
    <view class="description">
           河对岸横断山点哈电话i安速达核对单还蝴蝶酥换大号穗安点哈电话速度撒旦火啊好的话我
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  watch,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import {onLoad} from '@dcloudio/uni-app'
const router = useRouter();

const option=ref()
onLoad((e)=>{
    option.value=e
    console.log(option.value)
    getDetail()
})
const detailInfo=reactive({item:[]})
const getDetail=()=>{
    uni.request({
        url:'https://ku.qingnian8.com/dataApi/news/detail.php',
        data:option.value,
        success:(res)=>{
            console.log(res.data)
            detailInfo.item=res.data
        }
    })
}

</script>
<style scoped lang="less">
.detail {
  padding: 30rpx;
  .title {
    font-size: 46rpx;
    color: #333;
  }
  .info {
    background: #f6f6f6;
    padding:20rpx 10rpx;
    font-size: 22rpx;
    color: #666;
    display: flex;
    justify-content: space-between;
    margin:30rpx 0;
  }
  .content{
    padding-bottom: 50rpx;
  }
  .description{
    background: #FEF0F0;
    font-size: 26rpx;
    padding: 20rpx;
    color:#F89898;
    line-height: 1.8rem;
  }
}
</style>