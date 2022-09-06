import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
        // 用户信息
        $userInfo: uni.getStorageSync('resumeData') || {
            baseEntity: {
				headPortrait: '',
				headImage: '',
				name: '',
				sex: '',
				age: '',
				phone: '',
				graduationSchool: '', //毕业院校
				education: '', // 学历
				// 工作年限
				workingYears: '',
				// 籍贯
				natives: '',
				eMail: '',
				// 政治面貌
				landscape: '',
				// 民族
				national: '',
				// 意向职业,
				objective: '',
				// 意向城市
				city: '',
				// 期望薪资
				salary: '',
				// 求职类型
				jobType: '',
				// 个人评价
				assessment: ''
			},
			professionalSkills: ['专业技能'], // 专业技能
			listEdu: [
				// {
				// 	school: '南京工业大学',
				// 	endTime: '2022.01.12',
				// 	startTime: '2021.01.12',
				// 	// 专业
				// 	major: '自动化',
				// 	// 学历
				// 	education: '本科'
				// },
			],
			listWork: [
				// {
				// 	// 公司名称
				// 	workExperienceCompany: '南京培慕科技有限公司',
				// 	// 职业名称
				// 	workExperiencePosition: '前端开发工程师',
				// 	// 开始时间
				// 	workExperienceStartTime: '2020.10.12',
				// 	// 结束时间
				// 	workExperienceEndTime: '2022.10.12',
				// 	// 描述
				// 	workExperienceDescribe: '描述'
				// },
			],
			listPro: [
				// {
				// 	// 项目公司
				// 	projectCompany: '项目公司',
				// 	// 项目名称
				// 	projectName: '项目名称',
				// 	// 项目开始时间
				// 	projectStartTime: '2020.10.21',
				// 	// 项目结束时间
				// 	projectEndTime: '2020.10.21',
				// 	// 责任描述
				// 	projectDuty: '责任描述'
				// },
			]
        },
		$tempFile: uni.getStorageSync('tempFile') || 'model01'
    },
	mutations: {
		SET_TEMP_FILE: (state, payload) => {
			state.$tempFile = payload
		},
		SET_BASE_ENTITY: (state, payload) => {
			state.$userInfo.baseEntity = {
				...state.$userInfo.baseEntity,
				...payload
			}
		}
	}
})

export default store
