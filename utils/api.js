// 获取列表

export default{
	getList : async (data)=> {return await uni.http({ url: "/news",data, method: "GET"})},
	
	
}
 

