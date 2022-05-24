<template>
	<view>
		<uniImg :maxImgNum="8" :upImgUrl="arr"></uniImg>
	</view>
</template>

<script>
	import uniImg from '@/components/uploadImg/uploadImg.vue'
	export default {
		components:{
			uniImg
		},
		data() {
			return {
				arr:','
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
