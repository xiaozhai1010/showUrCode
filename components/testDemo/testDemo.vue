<template>
	<view>
		<button @click="countAdd">click</button>
		 add 1 when u click btn : {{curNum}}
	</view>
</template>

<script>
	export default {
		props:['value'],
		data() {
			return {
				curNum:0,
			}
		},
		methods: {
			countAdd(){
				this.curNum++
				this.$emit('update:value',this.curNum)
			}
		},
		watch:{
			value:{
				handler(val){
					this.curNum = val
				}
			}
		}
	} 
</script>

<style>

</style>
