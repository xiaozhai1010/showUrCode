<template>
	<view>
		<button @click="countAdd">click</button>
		 add 1 when u click btn : {{curNum}}
	</view>
</template>

<script>
	export default {
		props:['num'],
		data() {
			return {
				curNum:0,
			}
		},
		methods: {
			countAdd(){
				
				this.$emit('addClick',this.curNum++)
			}
		},
		watch:{
			curNum:{
				handler(val){
					this.curNum = val
				}
			}
		}
	} 
</script>

<style>

</style>
