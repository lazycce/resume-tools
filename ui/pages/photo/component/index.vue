<template>
	<view class="photo-container">
			<canvas 
				id="myCanvas"
				class="canvas"
				type="2d"
				:style="{width: `${size.x}px`, height: `${size.y}px`}"
				style=";margin: 0 auto;margin-top: 40rpx;box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);;background-color: #fff;"
			/>
			<view class="select-color">
				<view @click='setColor("#FFFFFF")' class="item" style="background-color: #fff;" />
				<view @click='setColor("#428EDA")' class="item" style="background-color: #428EDA;" />
				<view @click='setColor("#98CBEC")' class="item" style="background-color: #98CBEC;" />
				<view @click='setColor("#FE0000")' class="item" style="background-color: #FE0000;" />
			</view>
		<cropper 
			class="bottom-btn" 
			:selWidth="`${size.x}px`" 
			:selHeight="`${size.y}px`" 
			@upload="myUpload" 
		>
		</cropper>
	</view>
</template>

<script>
	import { image2Base64 } from '@/util/index.js'
	import cropper from "@/components/cropper";
	export default {
		components: {
			cropper
		},
		onLoad({x, y}) {
			this.size = {
				x: Number(x),
				y: Number(y),
			}
		},
		data() {
			return {
				context: '',
				show: true,
				img: '',
				size: {
					x: 0,
					y: 0
				}
			}
		},
		methods: {
			//上传返回图片
			async myUpload(rsp) {
			  uni.uploadFile({
			  	url: 'https://www.heguangtc.top/resume/phone/createPhoneFile', //仅为示例，非真实的接口地址
			  	filePath: rsp.path,
			  	name: 'file',
			  	formData: {
			  		name: '张三',
			  		key: 'qazwsx'
			  	},
			  	success: (res) => {
			  		this.img = JSON.parse(res.data).phnoe;
			  		this.setColor();
			  	}
			  });
			},
			setColor (color) {
				if (!this.img) {
					
					return 
				}
				wx.createSelectorQuery()
					.select('#myCanvas') // 在 WXML 中填入的 id
					.fields({ node: true, size: true })
					.exec((res) => {// Canvas 对象
						const canvas = res[0].node
						// 渲染上下文
						const ctx = canvas.getContext('2d')
				
						// 初始化画布大小
						canvas.width = this.size.x 
						canvas.height = this.size.y
						
						if (color == undefined) {
							color = '#fff'
						}
						ctx.fillStyle = color
						ctx.fillRect(0, 0, this.size.x, this.size.y)
						// 图片对象
						const image = canvas.createImage()
						// 图片加载完成回调
						image.onload = () => {
							// 将图片绘制到 canvas 上
							ctx.drawImage(image, 0, 0, this.size.x, this.size.y)
						}
						// 设置图片src
						image.src = `data:image/png;base64,${this.img}`
				})
			},
			save() {
				uni.createSelectorQuery()
					.select('#myCanvas') // 在 WXML 中填入的 id
					.fields({ node: true, size: true })
					.exec((res) => {// Canvas 对象
						const canvas = res[0].node
						
						uni.canvasToTempFilePath({
						    canvas,
						    success: res => {
						        // 生成的图片临时文件路径
						        const tempFilePath = res.tempFilePath
								uni.saveImageToPhotosAlbum({
								  filePath: tempFilePath,  //设置下载图片的地址
								  success:function(){
								  }
								})
						    }
						})
				})
			}
		}
	}
</script>

<style lang="scss">
	.photo-container {
		padding: 30rpx;
		.bottom-btn {
			position: fixed;
			bottom: 30rpx;
			left: 50rpx;
			right: 50rpx;
		}
		.select-color {
			margin-top: 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.item {
				border-radius: 8rpx;
				box-shadow: 2px 2px 4px rgba(0,0,0,.6);
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
