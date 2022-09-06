<template>
	<view class="education-experience-container" >
		<view v-for="(item, index) in listWork" :key="index" class="form">
			<view class="operation">
				<view @click="handleDelete(index)">
					<u-icon name="minus-circle" size="20"></u-icon>
				</view>
				<view style="margin-left: 10px;" @click="handleAdd(index)">
					<u-icon name="plus-circle" size="20"></u-icon>
				</view>
			</view>
			<u--form
				labelWidth="auto"
				labelPosition="top"
				style="margin-bottom: 30rpx;"
			>
				<u-form-item
					label="公司名称"
					prop="userInfo.name"
					borderBottom
				>
					<u--input
						v-model="item.workExperienceCompany"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="职业名称"
					prop="userInfo.workExperiencePosition"
					borderBottom
				>
					<u--input
						v-model="item.workExperiencePosition"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="开始时间"
					prop="userInfo.name"
					borderBottom
					@click="handleOpenDatePicker(index, 'workExperienceStartTime')"
				>
					<u--input
						disabled
						v-model="item.workExperienceStartTime"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="结束时间"
					prop="userInfo.name"
					borderBottom
					@click="handleOpenDatePicker(index, 'workExperienceEndTime')"
				>
					<u--input
						disabled
						v-model="item.workExperienceEndTime"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="描述"
					prop="userInfo.name"
					borderBottom
				>
					<u--textarea v-model="item.workExperienceDescribe" placeholder="请输入内容" autoHeight :maxlength="-1" ></u--textarea>
				</u-form-item>
			</u--form>
		</view>
		<view class="bottom-btn">
			<u-button type="primary" shape="circle" color="#36C1BA" text="确 定"></u-button>
		</view>
		<u-datetime-picker
			:show="showDatetimePicker"
			@confirm="handleDatePickerConfirm"
			@cancel="showDatetimePicker = false"
			v-model="date"
			mode="date"
		></u-datetime-picker>
	</view>
</template>
<script>
	import { mapState } from 'vuex'
	import { saveResumeData } from '@/util/index.js'
	
	export default {
		data () {
			return {
				showDatetimePicker: false,
				currentIndex: null,
				currentKey: '',
				date: Number(new Date()),
			}
		},
		computed: {
			...mapState(['$userInfo']),
			listWork() {
				return this.$userInfo.listWork
			}
		},
		methods: {
			handleAdd(index) {
				this.listWork.splice(index + 1, 0, {
					school: '',
					education: '',
					majo: '',
					startTime: '',
					endTime: ''
				})
				uni.showToast({
					icon: 'none',
					title: '下方添加一条数据'
				})
			},
			handleDelete(index) {
				if (this.listWork.length === 1) {
					uni.showToast({
						icon: 'none',
						title: '至少一条数据'
					})
					return
				}
				this.listWork.splice(index, 1)
			},
			handleOpenDatePicker (index, key) {
				this.currentIndex = index
				this.currentKey = key
				this.showDatetimePicker = true
			},
			handleDatePickerConfirm (value) {
				this.listWork[this.currentIndex][this.currentKey] = this.newTime(value.value)
				this.showDatetimePicker = false
			},
			newTime(data){
				let newTime;
				if(data){
					const time = new Date(data)
			    	const year = time.getFullYear()
			    	const month = time.getMonth()+1
			    	const date = time.getDate()
			    	newTime = year+'.'+ this.addZero(month)+'.'+ this.addZero(date)
				}
				return newTime
			},
			//公用方法
			addZero(m){
				return m<10?'0'+m:m;
			}
		},
		created() {
			if (this.listWork.length === 0) {
				this.listWork.push({
					workExperienceCompany: '',
					// 职业名称
					workExperiencePosition: '',
					// 开始时间
					workExperienceStartTime: '',
					// 结束时间
					workExperienceEndTime: '',
					// 描述
					workExperienceDescribe: ''
				})
			}
		},
		beforeDestroy() {
			saveResumeData(this.$userInfo)
		}
	}
</script>
<style lang="scss">
	.education-experience-container {
		padding: 30rpx;
		.form {
			border-radius: 20rpx;
			padding: 0 30rpx;
			padding-bottom: 30rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			position: relative;
			.operation {
				position: absolute;
				display: flex;
				top: 5px;
				right: 30rpx;
				z-index: 1000;
			}
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
