<template>
	<view class="app-container">
		<view 
			class="file-image"
			v-for="(item, index) 
			in imageList" 
			:key="item.id" 
			@click="selectTemplate(item)"
			:style="{ 
				'background-image': `url(${item.src})`, 
				border: item.checked ? '4rpx solid #36C1BA': ''
			}"
		/>
		<view class="operation-confirm" v-show="operationVisible">
			<u-button 
				@click="handleClick()"
				type="primary" 
				shape="circle" 
				text="确 定" 
				color="#36C1BA">
			</u-button>
		</view>
	</view>
</template>

<script>
	import http from '@/util/request';
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		data () {
			return {
				imageList: [],
				tempFile: null
			}
		},
		computed: {
			...mapState(['$tempFile']),
			operationVisible () {
				return this.imageList.some(item => item.checked)
			}
		},
		methods: {
			...mapMutations(['SET_TEMP_FILE']),
			selectTemplate (file) {
				this.imageList.forEach(item => item.checked = false)
				file.checked = true
				this.tempFile = file
			},
			handleClick () {
				const res = this.imageList.find(item => item.checked)
				uni.setStorageSync('tempFile', res.id)
				this.SET_TEMP_FILE(res.id)
				uni.navigateBack({
					delta: 1
				})
			},
			async handleQuery () {
				const modelList = await uni.$u.http.get('/getModelList')
				this.imageList = modelList.map(i => {
					return {
						id: i,
						src: `https://www.heguangtc.top/img/${i}.png`,
						checked: false
					}
				})
			}
		},
		created() {
			this.handleQuery()
		}
	}
</script>
<style>
	.file-image {
		margin-top: 30rpx;
		background-size: 690rpx 1000rpx;
		height: 1000rpx;
		width: 690rpx;
		border-radius: 18rpx;
	}
	.operation-confirm {
		position: fixed;
		z-index: 1000;
		left: 70rpx;
		right: 70rpx;
		bottom: 40rpx;
	}
</style>
