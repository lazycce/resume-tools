<template>
	<view class="education-experience-container" >
		<view v-for="(item, index) in listPro" :key="index" class="form">
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
					label="项目名称"
					prop="userInfo.name"
					borderBottom
				>
					<u--input
						v-model="item.projectName"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="公司名称"
					prop="userInfo.projectCompany"
					borderBottom
				>
					<u--input
						v-model="item.projectCompany"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="开始时间"
					prop="userInfo.name"
					borderBottom
					@click="handleOpenDatePicker(index, 'projectStartTime')"
				>
					<u--input
						disabled
						v-model="item.projectStartTime"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="结束时间"
					prop="userInfo.name"
					borderBottom
					@click="handleOpenDatePicker(index, 'projectEndTime')"
				>
					<u--input
						disabled
						v-model="item.projectEndTime"
						border="none"
					></u--input>
				</u-form-item>
				<u-form-item
					label="责任描述"
					prop="userInfo.name"
					borderBottom
				>
					<u--textarea v-model="item.projectDuty" placeholder="请输入内容" autoHeight :maxlength="-1" ></u--textarea>
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
			listPro() {
				return this.$userInfo.listPro
			}
		},
		methods: {
			handleAdd(index) {
				this.listPro.splice(index + 1, 0, {
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
				if (this.listPro.length === 1) {
					uni.showToast({
						icon: 'none',
						title: '至少一条数据'
					})
					return
				}
				this.listPro.splice(index, 1)
			},
			handleOpenDatePicker (index, key) {
				this.currentIndex = index
				this.currentKey = key
				this.showDatetimePicker = true
			},
			handleDatePickerConfirm (value) {
				this.listPro[this.currentIndex][this.currentKey] = this.newTime(value.value)
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
			if (this.listPro.length === 0) {
				this.listPro.push({
					// 项目公司
					projectCompany: '',
					// 项目名称
					projectName: '',
					// 项目开始时间
					projectStartTime: '',
					// 项目结束时间
					projectEndTime: '',
					// 责任描述
					projectDuty: ''
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
