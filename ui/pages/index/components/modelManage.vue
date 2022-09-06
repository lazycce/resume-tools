<template>
	<view class="model-container">
		<checkbox-group @change="checkboxChange">
			<label class="item" :class="list.includes('cb1') ? 'active-item' : '' ">
				专业技术
				<checkbox class="checkbox" value="cb1" />
			</label>
			<label class="item" :class="list.includes('cb2') ? 'active-item' : '' ">
				实习经历
				<checkbox class="checkbox" value="cb2" />
			</label>
			<label class="item" :class="list.includes('cb3') ? 'active-item' : '' ">
				工作经历
				<checkbox class="checkbox" value="cb3" />
			</label>
			<label class="item" :class="list.includes('cb4') ? 'active-item' : '' ">
				项目经历
				<checkbox class="checkbox" value="cb4" />
			</label>
			<label class="item" :class="list.includes('cb5') ? 'active-item' : '' ">
				校园经历
				<checkbox class="checkbox" value="cb5" />
			</label>
			<label class="item" :class="list.includes('cb6') ? 'active-item' : '' ">
				技能证书
				<checkbox class="checkbox" value="cb6" />
			</label>
		</checkbox-group>
		
		<view style="margin-top: 60rpx;">
			<u-button type="primary" shape="circle" color="#36C1BA" text="返 回"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'modelManage',
		data () {
			return {
				list: []
			}
		},
		methods: {
			handleClick (e) {
				console.log(e)
			},
			checkboxChange (e) {
				this.list = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.model-container {
		padding: 30rpx;
		.item {
			display: block;
			color: #313231;
			
			box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
			background-color: #fff;
			margin-bottom: 30rpx;
			border-radius: 30rpx;
			padding: 20rpx;
		}
		.checkbox {
			opacity: 0;
		}
		.active-item {
			box-shadow: 0 0 0 2px rgba(54, 193, 186,.3);
			background-color: #e3fdfd;
		}
	}
</style>