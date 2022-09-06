<template>
	<view>
		<image :src="imgurl" ></image>
		{{ imgurl }}
		<cropper selWidth="296px" selHeight="413px" @upload="myUpload" avatarStyle="width:100vw;height:100vw;background:red">
		</cropper>
	</view>
</template>

<script>
	 import cropper from "../../components/cropper";
	    export default {
	        components: {
	          cropper
	        },
	        data() {
	            return {
	                 imgurl:"/static/logo.png"
	            }
	        },
	        methods: {
	            //上传返回图片
	            myUpload(rsp) {
	              const self = this;
	              self.imgurl = rsp.path; //更新头像方式一
	              // rsp.avatar.imgSrc = rsp.path; //更新头像方式二
	            },
	
	        }
	    }
</script>

<style>
</style>