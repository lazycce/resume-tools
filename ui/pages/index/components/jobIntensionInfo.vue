<template>
	<view class="base-info-container" >
		<view class="inner">
			<u--form
				:labelStyle="{
					fontWeight: 'bold'
				}"
				labelWidth="auto"
				labelPosition="top"
			>
				<u-form-item
					label="意向岗位"
					prop="form.objective"
					borderBottom
				>
					<u--input
						v-model="form.objective"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="期望薪资"
					prop="form.salary"
					@click="show = true"
					borderBottom
				>
					<u--input
						v-model="form.salary"
						border="none"
						readonly
					></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view class="bottom-btn">
			<u-button
				type="primary"
				shape="circle" 
				color="#36C1BA" 
				text="确 定"
				@click="handleSave()"
			/>
		</view>
		<u-picker 
			showToolbar="false" 
			:show="show" 
			:columns="columns"
			@cancel="show = false"
			@confirm="handleConfirm"
		></u-picker>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex'
	import { saveResumeData } from '@/util/index.js'
	
	export default {
		data () {
			return {
				show: false,
				form: {
					// 意向职业,
					objective: '',
					// 期望薪资
					salary: '',
				}
			}
		},
		computed: {
			...mapState(['$userInfo']),
			columns() {
				let arr = ['面议']
				for (let i = 1; i <= 60; i++) {
					arr.push(`${i}k`)
				}
				return [arr]
			},
			baseInfo() {
				return this.$userInfo.baseEntity
			}
		},
		created() {
			this.form = {
				...this.baseInfo
			}
		},
		methods: {
			...mapMutations(['SET_BASE_ENTITY']),
			handleSelect () {},
			handleConfirm ({ value }) {
				this.form.salary = value[0]
				this.show = false
			},
			handleSave () {
				this.SET_BASE_ENTITY(this.form)
				uni.navigateBack({
					delta: 1
				})
			}
		},
		beforeDestroy() {
			saveResumeData(this.$userInfo)
		}
	}
</script>

<style lang="scss">
	.base-info-container {
		padding: 30rpx;
		.inner {
			box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
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
