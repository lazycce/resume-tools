<template>
	<view>
		<view class="view-container">
			<view class="img-resume" v-show="imgResume" :style="{ 
				'background-image': `url(${imgResume})`, 
			}" />
		</view>
		<view class="scroll-operation">
			<u-scroll-list :indicator="false" v-show="imgResume">
				<view 
					v-for="(item, index) in imageList" 
					:key="index"
					class="img-out"
					@click="handleSelectTemp(item)"
				>
					<image class="tp-img" :src="item.src" :class="{
						'active-item': item.checked
					}"></image>
				</view>
			</u-scroll-list>
		</view>
	</view>
	
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: 'viewResume',
		data () {
			return {
				imgResume: '',
				imageList: []
			}
		},
		computed: {
			...mapState(['$userInfo', '$tempFile'])
		},
		async created() {
			uni.showLoading({
				title: '加载中'
			})
			await this.handleQuery()
			await this.handleViewResume()
			uni.hideLoading()
		},
		methods: {
			...mapMutations(['SET_TEMP_FILE']),
			async handleViewResume () {
				const imgResumeName = await uni.$u.http.post('/browseModelUrl', {
					...this.$userInfo ,
					modelId: this.$tempFile
				})
				this.imgResume = `https://www.heguangtc.top/pdf/${imgResumeName}.jpeg`;
			},
			async handleSelectTemp (file) {
				uni.showLoading({
					title: '加载中'
				})
				this.imageList.forEach(item => item.checked = false)
				file.checked = true
				uni.setStorageSync('tempFile', file.id)
				this.SET_TEMP_FILE(file.id)
				await this.handleViewResume()
				uni.hideLoading()
			},
			async handleQuery () {
				const modelList = await uni.$u.http.get('/getModelList')
				const imageList = modelList.map(i => {
					return {
						id: i,
						src: `https://www.heguangtc.top/img/${i}.png`,
						checked: false
					}
				})
				this.imageList.push(...imageList)
			}
		}
	}
</script>

<style lang="scss">
	.view-container {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		
		.img-resume {
			display: block;
			background-size: 690rpx 1000rpx;
			
			box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
			height: 972rpx;
			width: 690rpx;
			border-radius: 18rpx;
		}
	}
	.img-out {
		height: 280rpx;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.img-out:last-child {
		padding-right: 30rpx;
	}
	.tp-img {
		border-radius: 8rpx;
		width: 180rpx;
		height: 253rpx;
	}
	.active-item {
		width: 190rpx;
		height: 268rpx;
		box-shadow: 0 0 0 2px rgba(54, 193, 186,.2);
	}
	.scroll-operation {
		padding-top: 10px;
		background-color: #eee;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
