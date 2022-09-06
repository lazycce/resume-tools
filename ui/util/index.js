/**
 * 图片url 转 base64
 */
export const image2Base64 = async(imageUrl) => {
	const canvas = uni.createOffscreenCanvas({
		type: '2d',
		width: 300,
		height: 390
	})
	const context = canvas.getContext('2d')

	const image = canvas.createImage()
	// 等待图片加载
	await new Promise(resolve => {
		image.onload = resolve
		image.src = imageUrl // 要加载的图片 url
	})

	context.clearRect(0, 0, 500, 500)
	context.drawImage(image, 0, 0, 300, 390)
	return canvas.toDataURL("image/png")
}

/**
 * 保存数据
 * @param {Object} data
 */
export const saveResumeData = (data) => {
	uni.setStorageSync('resumeData', data)
}