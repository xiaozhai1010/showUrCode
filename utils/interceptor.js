//页面白名单
const whiteList = [
	'/pages/home/home',
	'/pages/cate/cate',
	]
	function hasPermission(url){
		//请求路径在白名单中直接跳转，或者带有token直接跳转，
		for (let i = 0; i < whiteList.length; i++) {
			let token = uni.getStorageSync('token')
			console.log(token,'2222')
			if(url.indexOf(whiteList[i]) !== -1 || token){
				return true
			}
		}
		return false 
	}


// uni.addInterceptor('navigateTo',{
// 	invoke(e) {
// 		console.log(e)
// 		if(!hasPermission(e.url)){
// 			console.log('请跳转')
// 			uni.navigateTo({
// 				url:'/common/login/login'
// 			})
// 			// return false
// 		}
// 		return true
// 	},success(e) {
// 		console.log(e)
// 	},fail(e){
// 		console.log(e)
// 	}
// })