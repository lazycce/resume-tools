<template>
	<view class="tool-container">
		<view class="base-info container-item" @click="goto('/pages/index/components/baseInfoEdit')">
			<view>
				<view class="vertical-center primary-text"> 
					<view class="username">{{ $userInfo.baseEntity.name || '姓名' }}</view>
				</view>
				<view class="second-text mt-8r">
					<span v-show="$userInfo.baseEntity.workingYears">{{ $userInfo.baseEntity.workingYears }}年</span>
					<span v-show="$userInfo.baseEntity.sex"> · {{ $userInfo.baseEntity.sex }}</span>
					<span v-show="$userInfo.baseEntity.age">· {{ $userInfo.baseEntity.age }}岁</span>
					<span v-show="$userInfo.baseEntity.national">· {{ $userInfo.baseEntity.national }}</span>
				</view>
				<view class="second-text mt-8r">
					<span v-show="$userInfo.baseEntity.landscape">{{ $userInfo.baseEntity.landscape }}</span>
				</view>
				<view class="second-text mt-8r">
					<span>{{ $userInfo.baseEntity.graduationSchool }}</span>
					<span v-show="$userInfo.baseEntity.education">· {{ $userInfo.baseEntity.education }}</span>
				</view>
				<view class="second-text mt-8r">
					{{ $userInfo.baseEntity.phone }}
				</view>
				<view class="second-text mt-8r">
					<span>{{ $userInfo.baseEntity.eMail }}</span>
				</view>
			</view>
			<view v-if="$userInfo.baseEntity.headPortrait">
				<u--image :src="`data:image/png;base64,${$userInfo.baseEntity.headPortrait}`"  width="160rpx" height="160rpx" radius="12" shape="square"></u--image>
			</view>
		</view>
		<view class="container-item" @click="goto('/pages/index/components/jobIntensionInfo')">
			<view class="item-header primary-text">
				<view>求职意向</view>
			</view>
			<view class="item-content">
				<view class="vertical-center">
					<view>{{ $userInfo.baseEntity.objective }}</view>
					<view class="ml-20r">{{ $userInfo.baseEntity.salary }}</view>
				</view>
			</view>
		</view>
		<view class="container-item bc" @click="goto('/pages/index/components/professionalSkills')">
			<view class="item-header primary-text">
				<view>专业技能</view>
				<view><u-icon name="minus-circle-fill" :size="20" color="#f56c6c"></u-icon></view>
			</view>
			<view class="item-content" v-for="(item, index) in $userInfo.listEdu" :key="index">
				<view class="flex-end">
					<view>{{ item.school }}</view>
					<view class="ml-20r second-text">{{ item.startTime }} ~ {{ item.endTime }}</view>
				</view>
				<view class="vertical-center second-text mt-8r">
					<view>{{ item.education }}</view>
					<view class="ml-20r">{{ item.major }}</view>
				</view>
			</view>
		</view>
		<view class="container-item" @click="goto('/pages/index/components/educationalExperienceEdit')">
			<view class="item-header primary-text">
				<view>教育经历</view>
			</view>
			<view class="item-content" v-for="(item, index) in $userInfo.listEdu" :key="index">
				<view class="flex-end">
					<view>{{ item.school }}</view>
					<view class="ml-20r second-text">{{ item.startTime }} ~ {{ item.endTime }}</view>
				</view>
				<view class="vertical-center second-text mt-8r">
					<view>{{ item.education }}</view>
					<view class="ml-20r">{{ item.major }}</view>
				</view>
			</view>
		</view>
		<view class="container-item bc" @click="goto('/pages/index/components/jobExperienceEdit')">
			<view class="item-header primary-text">
				<view>实习经历</view>
				<view><u-icon name="minus-circle-fill" :size="20" color="#f56c6c"></u-icon></view>
			</view>
			<view class="item-content" v-for="(item, index) in $userInfo.listWork" :key="index">
				<view>{{ item.workExperienceCompany }}</view>
				<view class="second-text mt-8r">{{item.workExperienceStartTime}} ~ {{item.workExperienceEndTime}}</view>
				<view class="vertical-center second-text mt-8r">
					<view>{{ item.workExperiencePosition }}</view>
				</view>
				<view class="vertical-center second-text mt-8r">
					{{ item.workExperienceDescribe }}
				</view>
			</view>
		</view>
		<view class="container-item bc" @click="goto('/pages/index/components/jobExperienceEdit')">
			<view class="item-header primary-text">
				<view>工作经历</view>
				<view><u-icon name="minus-circle-fill" :size="20" color="#f56c6c"></u-icon></view>
			</view>
			<view class="item-content" v-for="(item, index) in $userInfo.listWork" :key="index">
				<view>{{ item.workExperienceCompany }}</view>
				<view class="second-text mt-8r">{{item.workExperienceStartTime}} ~ {{item.workExperienceEndTime}}</view>
				<view class="vertical-center second-text mt-8r">
					<view>{{ item.workExperiencePosition }}</view>
				</view>
				<view class="vertical-center second-text mt-8r">
					{{ item.workExperienceDescribe }}
				</view>
			</view>
		</view>
		<view class="container-item bc"  @click="goto('/pages/index/components/projectExperienceEdit')">
			<view class="item-header primary-text">
				<view>项目经历</view>
				<view><u-icon name="minus-circle-fill" :size="20" color="#f56c6c"></u-icon></view>
			</view>
			<view class="item-content" v-for="(item, index) in $userInfo.listPro" :key="index">
				<view>{{ item.projectName }}</view>
				<view class="second-text mt-8r">{{ item.projectStartTime }} ~ {{ item.projectEndTime }}</view>
				<view class="vertical-center second-text mt-8r">
					<view>{{ item.projectCompany }}</view>
				</view>
				<view class="vertical-center second-text mt-8r">
					<view>{{ item.projectDuty }}</view>
				</view>
			</view>
		</view>
		<view class="container-item" @click="goto('/pages/index/components/selfEvaluation')">
			<view class="item-header primary-text">
				<view>自我评价</view>
			</view>
			<view class="vertical-center second-text mt-8r">
				<view>{{ $userInfo.baseEntity.assessment }}</view>
			</view>
		</view>
		<view class="operation" v-show="operationVisible">
			<u-grid>
				<u-grid-item @click="goto('/pages/index/components/modelManage')">
					<u--image src="/static/images/icon4.png" width="60rpx" height="60rpx" />
					<text class="second-text">添加模块</text>
				</u-grid-item>
				<u-grid-item @click="goto('/pages/index/components/viewResume');handleSaveResumeData()">
					<u--image src="/static/images/icon2.png" width="60rpx" height="60rpx" />
					<text class="second-text">简历预览</text>
				</u-grid-item>
				<u-grid-item @click="handleDownFile();handleSaveResumeData()">
					<u--image src="/static/images/icon3.png" width="60rpx" height="60rpx" />
					<text class="second-text">简历下载</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>
<script>
	import { mapState } from 'vuex'
	import { viewBaseUrl } from '@/common/config.js'
	export default {
		data () {
			return {
				operationVisible: true
			}
		},
		computed: {
			...mapState(['$userInfo', '$tempFile'])
		},
		methods: {
			async handleDownFile () {
				const file = await uni.$u.http.post('/createModelUrl', {
					...this.$userInfo ,
					modelId: this.$tempFile	
				})
				uni.downloadFile({
				  url: `${viewBaseUrl}/${file}.pdf`, //仅为示例，并非真实的资源
				  success (res) {
				    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
				    if (res.statusCode === 200) {
						console.log(res.tempFilePath)
					  uni.openDocument({
						showMenu: true,
					  	filePath: res.tempFilePath
					  })
				    }
				  }
				})
			},
			goto(path) {
				uni.navigateTo({
					url: path
				})
			},
			handleSaveResumeData () {
				uni.setStorageSync('resumeData', this.$userInfo)
			},
		},
		onPageScroll ({ scrollTop }) {
			if (Number(scrollTop) > 10) {
				this.operationVisible = false
			} else {
				this.operationVisible = true
			}
		}
	}
</script>
<style lang="scss">
	.tool-container {
		padding: 30rpx;
	}
	.base-info {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		background-color: fff;
		.username {
			font-size: 50rpx;
			font-weight: bolder;
		}
	}
	.primary-text {
		color: #313231;
		font-weight: 500;
	}
	.second-text {
		color: #909399;
		font-size: 28rpx;
		font-weight: 400;
	}
	.container-item {
		box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 50rpx 30rpx;
		.item-header {
			font-size: 40rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.item-content {
			margin-top: 30rpx;
		}
	}
	.operation {
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 1000;
		left: 70rpx;
		right: 70rpx;
		height: 140rpx;
		bottom: 50rpx;
		border-radius: 70rpx;
		background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
		box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
	}
	.bc {
		background-color: #95e1d3;
	}
</style>
