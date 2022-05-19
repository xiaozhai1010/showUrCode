<template>
		<view class="container">
			<view class="row-1">
				<text>
					lets do something ! may i show ur code?		
				</text>
			</view>
			<view class="row-2">
				<text>
					lets do something ! may i show ur code?
				</text>
			</view>
		</view>
</template>

<script>
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
		},
		methods: {
			async testFunction(){
				console.log('你好么')
			}
		}
	}
</script>

<style lang="scss">
	@import url('@/pages/cate/cate.scss');
</style>
