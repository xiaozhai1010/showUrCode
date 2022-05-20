<template>
		<view class="container">
			<view class="row-1" hover-class="row-1-active">
				<text>
					lets do something ! may i show ur code?		
				</text>
				<view class="row-2"	hover-class="row-2-active"  hover-stop-propagation  :hover-start-time="500">
					<text>
						lets do something ! may i show ur code?
					</text>
				</view>
			</view>
			<button  type="primary"   size="mini">click me</button>
			<button  type="primary"  class="btn">click me</button>
			<button  type="primary"  plain >click me</button>
			<button  type="primary"   plain disabled="false" >click me</button>
			<button  type="primary"   plain loading="true" >click me</button>
			<i class="iconfont menu" >&#xe614;</i>
			<!-- <image src="https://img2.baidu.com/it/u=3150477872,1644717328&fm=253&fmt=auto&app=138&f=GIF?w=220&h=220" ></image>
			<image src="https://img2.baidu.com/it/u=3150477872,1644717328&fm=253&fmt=auto&app=138&f=GIF?w=220&h=220" mode="aspectFill"></image>
			<image src="https://img2.baidu.com/it/u=3150477872,1644717328&fm=253&fmt=auto&app=138&f=GIF?w=220&h=220" mode="aspectFit"></image> -->
		</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			uni.onTabBarMidButtonTap(()=>{
				uni.navigateTo({
					url:"/pages/cart/cart"
				})
			})
			console.log(moment().format('YYYY-MM-DD hh:mm:ss'))
			console.log(moment().format('x'))
		},
		methods: {
			async testFunction(){
				console.log('你好么 ')
			}
		}
	}
</script>

<style lang="scss">
	@import url('@/pages/cate/cate.scss');
</style>
