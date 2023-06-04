<template>
  <view class='user'>
    <view class="top">
        <image src="../../static/img/history.png" mode="aspectFill" />
        <text>浏览历史</text>
    </view>
    <view class="content">
        <view class="row" v-for="item in 10" :key="item">
        <newsBox></newsBox>
            
        </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from "vue-router"
const router = useRouter();


</script>
<style scoped lang="less">
.top{
    // width: 500rpx;
    padding-top: 20rpx;
    margin: 0px auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    image{
        width: 150rpx;
        height: 150rpx;
    }
}
.content{
  padding: 30rpx;
  .row{
    border-bottom: 1px dotted #efefef;
    padding: 15rpx 0;
  }
}
</style>