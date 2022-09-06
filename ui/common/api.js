const { http } = uni.$u
// 获取菜单
export const fetchMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// 上次文件
export const uploadImage = () => http.post('/ebapi/public_api/index', params)