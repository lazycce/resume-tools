<template>
	<view class="temp-container">
		<view class="item" 
			v-for="item in wordList" 
			:key="item.id" 
			:style="{ 
				backgroundImage: `url(${item.img})`, 
				boxShadow: item.checked ? '0 0 0 2px rgba(54, 193, 186,.2)' : '' 
			}"
			@click="handleChecked(item.id)"
		>
			<view class="transition download-btn" v-if="item.checked">
				<u-button 
					color="#36C1BA" 
					type="primary"
					size="mini" 
					text="下 载"
					@click="handleDownload(item.downloadUrl)"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import { wordDownloadBaseUrl } from '@/common/config.js'
	export default {
		name: 'tempPage',
		data () {
			return {
				wordList: []
			}
		},
		created() {
			for (let i = 1; i <= 6; i++) {
				this.wordList.push({
					id: i,
					checked: false,
					img: `${wordDownloadBaseUrl}/0${i}/i.png`,
					downloadUrl: `${wordDownloadBaseUrl}/0${i}/w.docx`
				})
			}
		},
		methods: {
			handleChecked (id) {
				this.wordList.forEach(i => {
					i.checked = id === i.id
				})
			},
			handleDownload(path) {
				uni.downloadFile({
				  url: path, //仅为示例，并非真实的资源
				  success (res) {
				    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				    if (res.statusCode === 200) {
					  uni.openDocument({
						showMenu: true,
					  	filePath: res.tempFilePath
					  })
				    }
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	.temp-container {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-gap: 30rpx;
		
		.item {
			position: relative;
			grid-column: span 6 / auto;
			height: 465rpx;
			border-radius: 20rpx;
			background-color: #fff;
			box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
			
			background-size: 100% 100%;
		}
		.download-btn {
			padding: 0 50rpx;
			margin-top: 350rpx;
		}
	}
</style>