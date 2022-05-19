<template>
	<view class="container">
		<uni-list v-for="(item,index) in news"  :key='index'>
			<uni-list-item :title="item.author_name" :note="item.created_at" showArrow
			:thumb="item.author_avatar"
			thumb-size="lg" rightText="大图" />
		</uni-list>
		<button @click="itemClick">点我</button>
	</view>		
			
</template>

<script>
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				single:'2022-02-18',
				news:'',
			}
		},
		onLoad(){
				// uni.request({
				// 	url: 'https://unidemo.dcloud.net.cn/api/news',
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		this.news = res.data
				// 		console.log(this.news,'data1')
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
				this.getData()

		},
		mounted(){
			setTimeout(() => {
				this.datetimesingle = "2021-5-1";
				this.single = "2021-5-1";
			}, 0);
		},
		methods: {
			async maskClick(){
				console.log(this.single,'before')
				setTimeout(()=>{
					console.log(this.single,'after')
				},111)
			},
			async getData() {
			    api.getList().then((res)=>{
					console.log(res,'data')
					this.news = res
				})
			},
			async itemClick(){
				uni.navigateTo({
					url:"/common/login/login"
				})
			}
		}
	}
</script>

<style>

</style>
