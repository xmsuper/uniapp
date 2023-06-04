<template>
	<view>
		<!-- <image :src=avator></image> -->
		<button type="primary" size="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录</button>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import requestFn from '@/utils/request.js'
	// import WXBizDataCrypt from "@/utils/WXBizDataCrypt.js";
	const username = ref('')
	const avator = ref('')

	const curOpenID = ref()
	const unionid = ref()
	const session_key = ref()
	onLoad(() => {
		uni.login({
			success: res => {
				console.log(res)
				if (res.code) {
					uni.showToast({
						title: "成功"
					})
					uni.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session',
						method: 'GET',
						data: {
							appid: 'wx2f8466dcb242da06',
							secret: 'e4b55c07d6a20bb940b73b850a6b2643',
							js_code: res.code
						},
						success: (e) => {
							console.log(e)
							curOpenID.value = e.data.openid,
								session_key.value = e.data.session_key
						}
					})
				} else {
					uni.showToast({
						title: "登录失败" + res.errMsg
					})
				}
			}
		})
	})

	const getPhoneNumber = (e) => {
		console.log(e.detail.errMsg)
		console.log(e.detail.encryptedData)
		console.log(e.detail.iv)
		if (e.detail.errMsg == 'getPhoneNumber:ok') {
			console.log('hh')
			console.log('rrr')
			console.log('jjjj')
			// let pc = new WXBizDataCrypt('wx2f8466dcb242da06', session_key.value); //wxXXXXXXX为你的小程序APPID  
			// let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);

			// console.log(data) //data就是最终解密的用户信息  
		}
	}
</script>
<style>

</style>