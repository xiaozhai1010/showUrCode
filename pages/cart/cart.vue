<template>
	<view >
		<view>
			<uniImg :maxImgNum="8" :upImgUrl="arr"></uniImg>
			<button  @click="clickImg">上传图片</button>
		</view>
		<view v-for="(item,index) in imgArr"  :key="index" class="showImg">
				<image :src="item" @click="preImg(item,index)"></image>
		</view>
		<!-- #ifdef H5 -->
		<view class="">
			H5页面显示 
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="">
			wechat页面显示
			<navigator style="color:blue;cursor: pointer;" url="/pages/home/home" open-type="switchTab" >点击跳转主页</navigator>
			<demo v-model="num"></demo>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import demo from '@/components/testDemo/testDemo.vue';
	import uniImg from '@/components/uploadImg/uploadImg.vue'
	export default {
		components:{
			uniImg,
			demo
		},
		data() {
			return {
				// num:1,
				arr:',',
				imgArr:[]
			}
		},
		methods: {
			// naviToHome(){
			// 	console.log('跳转')
			// 	uni.switchTab({
			// 		url:'/pages/home/home'
			// 	})
			// },
			clickBtn(num){
				console.log(num,'数字')
			},
			clickImg(){
				uni.chooseImage({
					count:2,
					sizeType: ['original', 'compressed'], 
					success:(res)=>{
						console.log(res)
						this.imgArr = res.tempFilePaths
					}
				})
			},
			preImg(val,idx){
				console.log(val,idx)
				uni.previewImage({
					current:idx,
					urls:this.imgArr,
					loop:true,//app
					indicator:'default',//app
					success:()=>{
						console.log(`当前预览的是第${idx+1}张照片`)
					}
				})
			}
		}
	}
</script>

<style>

</style>
