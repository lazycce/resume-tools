<template>
	<view class="grid">
		<view class="item" @click="goto(260, 378)">
			<view class="name">一寸</view>
			<view class="desc">
				<text>296 x 413px</text>
				<text style="margin-left: 30rpx;">25 x 35mm</text>
			</view>
		</view>
		<view class="item" @click="goto(260, 378)">
			<view class="name">二寸</view>
			<view class="desc">
				<text>413 x 579px</text>
				<text style="margin-left: 30rpx;">35 x 49mm</text>
			</view>
		</view>
		<view class="item" @click="goto(260, 378)">
			<view class="name">小一寸</view>
			<view class="desc">
				<text>260 x 378px</text>
				<text style="margin-left: 30rpx;">22 x 32mm</text>
			</view>
		</view>
		<view class="item" @click="goto(260, 378)">
			<view class="name">小二寸</view>
			<view class="desc">
				<text>413 x 531px</text>
				<text style="margin-left: 30rpx;">35 x 45mm</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goto (x, y) {
				uni.navigateTo({
					url:`/pages/photo/component/index?x=${x}&y=${y}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.grid {
		padding: 30rpx;
		.item {
			border-radius: 20rpx;
			background-color: #fff;
			padding: 30rpx;
			margin-bottom: 30rpx;
		}
		.name {
			font-size: 32rpx;
		}
		.desc {
			margin-top: 10rpx;
			font-size: 22rpx;
			color: #606266;
		}
	}
</style>