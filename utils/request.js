//登录接口域名
const LOGIN_URL = '/xx/xx'
const {
  baseUrl,
  // appid
} = uni.config

//封装接口请求
uni.http = (args = {}) => {
  let url = args.url || ""
  let data = args.data || {}
  // data.appid = appid
  let method = args.method || 'GET'
	return new Promise((resolve, reject) => {
		request(url, data, method, resolve, reject)
	}) 
}

// 接口封装
const request = async (url, data = {}, method, resolve, reject) => {
    // let token = await getToken()
    let header = {
      "content-type": "application/x-www-form-urlencoded",
      // 'token': token
    }
  uni.request({
    header,
    url: baseUrl + url,
    method,
    data,
    dataType: 'json',
    success: res => {
      if (res.statusCode == 200) {
        let code = res.statusCode
        if (code == 200) {
          resolve(res.data)
        } else {
          uni.showModal({
            title: "错误码：" + code,
            content: `${res.data.result}`
          })
        }
      }
    },
    fail: err => {
      reject(err)
    }
  })
}

// 获取Token
// const getToken = async () => {
//   let token = uni.getStorageSync('token')
//   if (token) {
//     return token
//   } else {
//     let tokenRes = await login()
//     return tokenRes.data.token
//   }
// }

// 封装登录
// const login = () => {
//   return new Promise((resolve, reject) => {
//     uni.getProvider({
//       service: "oauth",
//       success(providerRes) {
//         let provider = providerRes.provider[0]
//         uni.login({
//           provider,
//           success: (codeRes) => {
//             uni.request({
//               url: baseUrl + LOGIN_URL,
//               method: 'POST',
//               header: {
//                 'content-type': 'application/x-www-form-urlencoded',
//                 appid
//               },
//               data: {
//                 code: codeRes.code
//               },
//               dataType: 'json',
//               success: (res) => {
//                 if (res && res.statusCode == 200) {
//                   // 存储用户信息
//                   uni.setStorageSync('status', res.data.data)
//                   // 存储用户token
//                   uni.setStorageSync('token', res.data.token)
//                   resolve(res.data)
//                 } else {
//                   reject(res)
//                 }
//               },
//               fail: (err) => {
//                 reject(err)
//               }
//             })
//           },
//           fail: (err) => {
//             reject(err)
//           }
//         })
//       }
//     })
//   })
// }