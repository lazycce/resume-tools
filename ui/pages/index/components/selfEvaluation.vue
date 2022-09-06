<template>
	<view class="evaluation-container">
		<view class="inner">
			<u--form
				labelWidth="auto"
				labelPosition="top"
			>
				<u-form-item
					label="自我评价"
					prop="userInfo.assessment"
					borderBottom
				>
					<u--textarea
						v-model="baseInfo.assessment" 
						placeholder="请输入内容" 
						autoHeight 
						:maxlength="-1" 
					/>
				</u-form-item>
			</u--form>
		</view>
		<view class="bottom-btn">
			<u-button type="primary" shape="circle" color="#36C1BA" text="确 定"></u-button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'selfEvaluation',
		computed: {
			...mapState(['$userInfo']),
			baseInfo() {
				return this.$userInfo.baseEntity
			}
		},
	}
</script>

<style lang="scss">
	.evaluation-container {
		padding: 30rpx;
		.inner {
			border-radius: 20rpx;
			padding: 30rpx;
			background-color: #fff;
		}
		.bottom-btn {
			position: fixed;
			bottom: 30rpx;
			z-index: 1000;
			left: 50rpx;
			right: 50rpx;
		}
	}
</style>
