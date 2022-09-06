<template>
	<view class="base-info-container">
		<view class="inner">
			<view class="vertical-h-center">
				<u-upload
					:fileList="fileList"
					@afterRead="afterRead"
					@delete="deletePic"
					:maxCount="1"
				/>
			</view>
			<u--form
				:labelStyle="{
					fontWeight: 'bold'
				}"
				labelWidth="auto"
				labelPosition="top"
			>
				<u-form-item
					label="姓名"
					prop="form.name"
					borderBottom
				>
					<u--input
						v-model="form.name"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="性别"
					prop="form.sex"
					@click="showSex = true"
					borderBottom
				>
					<u--input
						v-model="form.sex"
						border="none"
						readonly
					/>
				</u-form-item>
				<u-form-item
					label="年龄"
					prop="form.age"
					borderBottom
				>
					<u--input
						type="number"
						v-model="form.age"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="毕业院校"
					prop="form.graduationSchool"
					borderBottom
				>
					<u--input
						v-model="form.graduationSchool"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="学历"
					prop="form.education"
					borderBottom
				>
					<u--input
						v-model="form.education"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="手机号码"
					prop="form.phone"
					borderBottom
				>
					<u--input
						type="number"
						v-model="form.phone"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="邮箱"
					prop="form.eMail"
					borderBottom
				>
					<u--input
						v-model="form.eMail"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="工作年限"
					prop="form.workingYears"
					borderBottom
				>
					<u--input
						type="number"
						v-model="form.workingYears"
						border="none"
					/>
				</u-form-item>
				<u-form-item
					label="政治面貌"
					prop="form.landscape"
					borderBottom
				>
					<u--input
						v-model="form.landscape"
						border="none"
					/>
				</u-form-item>
			</u--form>
			<u-action-sheet
				:show="showSex"
				:actions="actions"
				title="请选择性别"
				@close="showSex = false"
				@select="sexSelect"
			>
			</u-action-sheet>
		</view>
		<view class="bottom-btn">
			<u-button 
				type="primary" 
				shape="circle" 
				color="#36C1BA" 
				text="确 定"
				@click="handleSave"
			/>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations } from 'vuex'
	import { image2Base64 } from '@/util/index.js'
	import { saveResumeData } from '@/util/index.js'
	
 	export default {
		data () {
			return {
				showSex: false,
				actions: [
					{
						name: '男',
					},
					{
						name: '女',
					}
				],
				fileList: [],
				image: '',
				form: {
					name: '', //姓名
					sex: '', //性别
					age: '', //年龄
					graduationSchool: '', //毕业院校
					education: '', // 学历
					phone: '', //手机号
					eMail: '', //手机邮箱
					workingYears: '', // 工作年限
					landscape: '',
				},
			}
		},
		computed: {
			...mapState(['$userInfo']),
			baseInfo() {
				return this.$userInfo.baseEntity
			}
		},
		created() {
			this.form = {
				...this.baseInfo
			}
			if (this.baseInfo.headImage) {
				this.fileList.push({
					url: this.baseInfo.headImage
				})
			}
		},
		methods: {
			...mapMutations(['SET_BASE_ENTITY']),
			handleSave () {
				this.SET_BASE_ENTITY(this.form)
				uni.navigateBack({
					delta: 1
				})
			},
			sexSelect(e) {
				this.form.sex = e.name
			},
			async afterRead (event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'success',
						message: ''
					})
				})
				for (let i = 0; i < lists.length; i++) {
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
					}))
					fileListLen++
				}
				const imageBase64 = await image2Base64(this.fileList[0].url)
				this.baseInfo.headImage = this.fileList[0].url
				this.baseInfo.headPortrait = imageBase64.replace('data:image/png;base64,', '')
			},
			deletePic (event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.baseInfo.headPortrait = ''
				this.baseInfo.headImage = ''
			}
		},
		beforeDestroy() {
			saveResumeData(this.$userInfo)
		}
	}
</script>
<style lang="scss">
	.u-upload__wrap  {
		display: flex;
		justify-content: center;
	}
	.base-info-container {
		padding: 30rpx;
		.inner {
			box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
			border-radius: 20rpx;
			padding: 30rpx;
			background-color: #fff;
			margin-bottom: 120rpx;
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
