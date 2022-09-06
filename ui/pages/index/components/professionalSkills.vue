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
					v-for="(item, index) in professionalSkills"
					:label="`意向岗位${index}`"
					:key="index"
					prop="form.objective"
					borderBottom
				>
					<u--input
						v-model="professionalSkills[index]"
						border="none"
					>
						<template slot="suffix">
							123
						</template>
					</u--input>
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
			professionalSkills() {
				return this.$userInfo.professionalSkills
			}
		},
		created() {
			this.form = {
			}
		},
		methods: {
			handleSave () {
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
