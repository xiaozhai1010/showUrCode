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
				dataNews:[],
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
		// 生命周期
		onShow(){
			console.log('pages show')
		},
		onReady(){
			console.log('pages ready to show')
		},
		onHide(){
			console.log('pages hide')
		},
		mounted(){
			setTimeout(() => {
				this.datetimesingle = "2021-5-1";
				this.single = "2021-5-1";
			}, 0);
		},
		onPullDownRefresh(){
		   const newArr = this.news.map((item)=>{
				return{
					'author_name':'stan',
					'created_at':item.created_at,
					'author_avatar':item.author_avatar
				}
			})
			
			setTimeout(()=>{
				this.news = newArr
				uni.stopPullDownRefresh()
			},1000)
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
					this.news = res
					console.log(this.news,'数据')
				})
				//post 测试
				// api.change({id:2}).then((res)=>{
				// 	console.log(res,'post获取数据')
				// })
			},
			async itemClick(){
				uni.navigateTo({
					url:'/common/login/login?obj='+encodeURIComponent(JSON.stringify(this.news)),
					// success: (res) => {
					// 	console.log(res,'这是个什么东西')
					// 	res.eventChannel.emit('acceptDataFromOpenerPage', { data: this.news})
					// }
				})
			}
		}
	}
</script>

<style>

</style>
