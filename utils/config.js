//获取平台信息
const { system ,} = uni.getSystemInfoSync()

// 服务器环境
let baseUrl = ['http://xxx', 'https://unidemo.dcloud.net.cn/api']

//小程序参数
uni.config = {
  platform: system.startsWith("iOS") ? 2 : 1, // IOS为2 安卓为1
  imgUrl: "https://img.36krcdn.com", // 图片地址前缀
  baseUrl: baseUrl[1],
  // appid: "xxx", // appid
}