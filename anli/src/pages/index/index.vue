<template>
  <view class="home">
    <scroll-view
      class="scrollNav"
      scroll-x="true"
      scroll-y="false"
      refresher-enabled="false"
      :refresher-triggered="triggered"
    >
      <view class="item" v-for="(v,k) of navList.item" :key="v" :class="index==k?'active':''" @click="clickNav(k,v.id)">{{v.classname}}</view>
    </scroll-view>

    <view class="content" >
      <view class="row" v-for="v,k of newList.item" :key="k">
      <newsBox @click.native="goDetail(v)" :item='{title:v.title,author:v.author,picUrl:v.picurl}'></newsBox>
      </view>
    </view>

    <view class='loading'>
      <view v-if='Loading==1'>数据加载中....</view>
      <view v-if="Loading==2">没有更多数据了~~</view>
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
import {onLoad,onReachBottom} from '@dcloudio/uni-app'
const index=ref(0)
const cid=ref()
const clickNav=(k,id)=>{
  currentPage.value=1
  newList.item.length=0
  index.value=k
  getNewsList(id)
  Loading.value=0
}
const router = useRouter();

const goDetail=(e)=>{
  uni.navigateTo({
    url:`/pages/detail/detail?cid=${e.classid}&id=${e.id}`
  })
}

const navList=reactive({
  item:[]
})
const newList=reactive({item:[]})


const currentPage=ref(1)
const getNewsList=(cid)=>{
  uni.request({
    url:'https://ku.qingnian8.com/dataApi/news/newslist.php',
    data:{
      cid:cid,
      page:currentPage.value
    },
    success:(res)=>{
      console.log(res.data)
      if(res.data.length==0){
        Loading.value==2
      }
      newList.item=[...newList.item,...res.data]
    }
  })
}
const getNavList=()=>{
    uni.request({
    url:'https://ku.qingnian8.com/dataApi/news/navlist.php',
    success:(res)=>{
      console.log(res.data)
      navList.item=res.data
    }
  })
}
onLoad(()=>{
  uni.request({
    url:'https://ku.qingnian8.com/dataApi/news/navlist.php',
    success:(res)=>{
      console.log(res.data)
      navList.item=res.data
    }
  })

    uni.request({
    url:'https://ku.qingnian8.com/dataApi/news/newslist.php',
    data:{
      num:5,
      cid:50
    },
    success:(res)=>{
      console.log(res.data)
      newList.item=res.data
    }
  })
})

onReachBottom(()=>{
  console.log("到底部了")
  currentPage.value++
  getNewsList()
Loading.value=1
})


const Loading=ref(0)



</script>
<style scoped lang="less">
.loading{
  text-align: center;
  font-size: 26rpx;
  color:#888;
  view{
  padding: 20rpx 0;

  }
}
.scrollNav::-webkit-scrollbar {
  display: none;
}
.scrollNav {
  height: 100rpx;
  background: #f7f8fa;
  white-space: nowrap;
  position: fixed;
  top: var(--window-top);left:0;
  z-index: 999;
  /deep/ ::-webkit-scrollbar{
    overflow:hidden;
  }
  .item {
    display: inline-block;
    fonts-size: 10rpx;
    line-height: 100rpx;
    padding: 0 30rpx;
    &.active{
      color:#31c27c
    }
  }
}
.content{

  padding: 30rpx;
    padding-top: 130rpx;

  .row{
    border-bottom: 1px dotted #efefef;
    padding: 15rpx 0;
  }
}
</style>