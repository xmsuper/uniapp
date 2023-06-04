<template>
  <view class="newsBox">
    <view class="pic">
      <image :src='item.picUrl' mode="aspectFill" />
    </view>
    <view class="text">
      <view class="title">{{item.title}}</view>
      <view class="info">
        <text>{{item.title}}</text>
        <text class="">{{item.his}}浏览</text>
      </view>
      <view class="info">
        <text>浏览时间：{{item.lookTime}}</text>
      </view>
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
const router = useRouter();
const props=defineProps({
    item:{
        type:Object,
        default:{
            title:'组件内默认标题',
            author:"张三",
            his:668,
            picUrl:'../../static/img/img.png',
            lookTime:"2022-1-1"
        }
    }
})

</script>
<style scoped lang="less">
.newsBox {
  display: flex;
  .pic {
    width: 230rpx;
    height: 160rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    // border: 1px solid red;
    flex: 1;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 36rpx;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .info {
      font-size: 26rpx;
      color: #999;
      padding-top: 20rpx;
      text {
        padding-right: 30rpx;
      }
    }
  }
}
</style>