<!-- <template>
	<view  class="container">
		<view class="uploadClass">
			<view class="icon">
				<i v-show="isShow" class="iconfont iconDel ">&#xe602;</i>
				<i  class="iconfont iconPic">&#xe600;</i>
			</view>
			<view class="imgClass">
				
			</view>
		</view>
		<view class="imgCount">
			当前已上传{{num}}/8 张
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0,
				isShow:false
			}
		},
		methods: {
		
		}
	}
</script>

<style scoped lang="scss">
@import url('@/components/uploadImg/uploadImg.scss');
</style> -->
<template>
  <view class="qtpicker">
    <!-- 默认展示模式 -->
    <view  v-if="!useCustom" style="width: 100%;">
      <!-- 预览 -->
      <view class="addImg preImgs" :style="normalStyle" v-for="(val,index) in preImgUrl" :key='index'>
        <image mode="" :src="val" @click="showImg(val,index)" style="width: 100%;">
        </image>
        <!-- 删除某张图片 -->
        <view class="cuo" v-if="!disabled" @click="delImg(index)">×</view>
      </view>
 
      <!-- 选择图片-->
      <view v-if="showAddBox" class="addImgBox">
        <view class="addImg" :style="normalStyle" @click="chooseImg">
          <view>+</view>
          <view style="font-size: 20rpx;">上传图片</view>
        </view>
      </view>
    </view>
 
    <!-- 自定义展示模式 -->
    <view v-if="useCustom" style="width: 100%;">
      <view v-for="(item,index) in preImgUrl" :key="index">
        <!-- 预览 -->
        <view class="addImgb preImgs" v-if="item" :style="customStyle" >
          <image mode="" :src="item" @click="showImg(item,index)" style="width: 100%;">
          </image>
          <!-- 删除某张图片 -->
          <view class="cuo" v-if="!disabled" @click="delImg(index)">×</view>
        </view>
 
        <!-- 选择图片-->
        <view v-if="!item">
          <view class="addImgb" :style="customStyle" @click="chooseImg(index)">
            <view>{{ textArray[index] }}</view>
          </view>
        </view>
      </view>
    </view>
 
  </view>
 
</template>
 
<script>
export default {
  props: {
    // 图片服务器地址
    upImgUrl: {
      type: String,
      default: 'www.baidu.com'
    },
    // 最大图片数量
    maxImgNum: {
      type: Number,
      default: 1
    },
    // 图片大小限制, 默认10Mb
    maxSize: {
      type: Number,
      default: 10485760
    },
    // 可选图片类型限制
    sizeType: {
      type: String,
      default: "original，compressed"
    },
 
    // 选择图片之前显示的样式文字
    textArray: {
      type: Array,
      default: () => ['身份证正面（国徽面）', '身份证反面（照片面）']
    },
 
    // 改变默认样式
    normalStyle: {
      type: Object
    },
    // 改变自定义样式
    customStyle: {
      type: Object
    },
    // 使用自定义模式？
    useCustom: {
      type: Boolean,
      default: false,
    },
 
    // 使用只读模式？禁止操作
    disabled: {
      type: Boolean,
      default: false
    },
 
    // 当前是哪张图片（组件）
    whichImg: {
      type: String,
    },
 
 
    // 获取到云端图片标志
    picChangeFlag: {
      type: Boolean,
      default: false
    },
 
    // 用蓝色背景
    useBgBlue: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      preImgUrl: [], //本地预览的图片数据
      serverUrl: this.upImgUrl, //要上传的图片的服务器地址
    }
  },
  watch: {
    preImgUrl: {
      deep: true,
      handler(newVal) {
        console.log('监听到图片改动=>', newVal)
        // 图片有改动
        this.$emit('imgsInfo', newVal)
      }
    },
 
    picChangeFlag(newVal) {
      this.getAuthentication()
    },
 
    useCustom: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.textArray){
          this.textArray.map((item, index) => {
            this.preImgUrl[index] = false
          })
        }
      }
    },
 
 
  },
  computed: {
    // 当前一共选中了多少张照片
    nowImgsNum() {
      return this.preImgUrl.length
    },
 
    // 有值的图片数量判断
    nowTrueImgsNum() {
      let num = 0
      this.preImgUrl.map(item => {
        num += item ? 1 : 0
      })
      return num
    },
 
    // 是否展示添加图片的按钮
    showAddBox(){
      return this.preImgUrl.length < this.maxImgNum
    }
 
 
  },
  mounted() {
  },
  methods: {
    // 选择图片事件
    chooseImg(index) {
      console.log(index)
      let that = this
      uni.chooseImage({
        count: this.maxImgNum, // 允许上传的照片数量 h5无法限制
        sizeType: this.sizeType, // sizeType:  original 原图，compressed 压缩图，默认二者都有
        success: function (res) { //选择成功，将图片存入本地临时路径，可删除，可查看，等待上传
          console.log(res)
          try {
            res.tempFiles.map(val => {
              // 判断并限制选中的图片数量
              if (that.nowImgsNum > that.maxImgNum && that.nowTrueImgsNum > that.maxImgNum) {
                that.nowImgsNum = that.maxImgNum
                uni.showToast({
                  icon: 'none',
                  title: '上传的图片最多不能超过' + that.maxImgNum + '张'
                })
                throw new Error()
              }
 
              // 判断并限制本次上传的图片大小
              if (val.size > that.maxSize) {
                uni.showToast({
                  icon: 'none',
                  title: '上传的图片大小不超过10M'
                })
                throw new Error()
              }
              if(!that.useCustom){
                that.preImgUrl.push(val.path)
              } 
			  else {
				if(res.tempFiles.length > 1 && that.preImgUrl[index]){
				  if(idx + 1 > that.maxImgNum){
					return
				  }
				  that.$set(that.preImgUrl, (index + idx) >= that.maxImgNum ? idx - 1 : (index + idx) , val.path)
				} else {
				  that.$set(that.preImgUrl, index, val.path)
				}
              }
            })
          } catch (err) {
            console.error(err)
          }
        }
      })
    },
 
    //点击小图查看大图片
    showImg(val, index) {
      let that = this
      uni.previewImage({
        // 对选中的图片进行预览
        urls: that.preImgUrl, //图片数组  // urls:['','']  图片的地址 是数组形式
        current: index, //当前图片的下标
      })
    },
 
    //删除某张图片，从本地的临时路径图片中, 删除路径即可
    delImg(index) {
      console.log(index)
      if(this.useCustom){
        this.$set(this.preImgUrl, index, false)
      } else {
        this.preImgUrl.splice(index, 1)
      }
    },
 
    //  上传事件，基本不在组件内用，直接获取本地图片地址就用了 localUrl:单张本地图片地址
    // 上传全部图片   allImgsArray 所有本地图片地址数组
    async uploadAllImgs(allImgsArray){
      let upRes = await Promise.all(allImgsArray.map(item => this.uploadAllImgs(item)))
      return upRes // 全部图片上传成功返回结果
    },
 
    // 上传单个图片promise
    uploadImgsPromise(localUrl) {
      if(!localUrl){
        return null
      }
      let that = this
      return new Promise((resolve) => {
        // 遍历要上传的图片临时地址，进行上传
        uni.uploadFile({
          url: that.upImgUrl, //服务器地址
          filePath: localUrl, //存在本地要上传的临时图片地址
          fileType: 'image',
          name: 'files',
          header: {
            'authorization': uni.getStorageSync('token'),
          },
          formData: {
            // 携带参数
          },
          success(res) { //上传成功的回调函数
            console.log('一个图片上传成功 =>', res)
            resolve(res)
          },
          fail(res) {
            console.log(res, '上传失败')
            uni.showToast({
              icon: 'none',
              title: '图片上传失败'
            })
          }
        })
      })
    }
 
 
  }
}
</script>
 
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
 
.qtpicker {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 auto;
  padding: 10rpx 0;
 
  .preImgs {
    position: relative;
    float: left;
    margin: 13rpx;
    height: 125rpx;
    width: 125rpx;
    border: none !important;
 
    image {
      width: 125rpx;
      height: 125rpx;
    }
 
    .cuo {
      width: 35rpx;
      height: 35rpx;
      line-height: 30rpx;
      text-align: center;
      font-size: 30rpx;
      border-radius: 50%;
      background-color: #ff0000;
      color: #FFFFFF;
      position: absolute;
      right: -17.5rpx;
      top: -17.5rpx;
    }
  }
 
  .addImgBox {
    float: left;
    .addImg {
      width: 125rpx;
      height: 125rpx;
      border: 2rpx solid #d4d4d4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 40rpx;
      margin: 13rpx;
    }
  }
 
 
  .addImgb {
    float: left;
    width: 45%;
    opacity: 0.8;
    height: 125rpx;
    border: 2rpx solid #4aa1ff;
    background-color: #d4e8fd;
    color: #4aa1ff;
    border-radius: 5rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25rpx;
    margin: 13rpx;
  }
 
}
 
</style>