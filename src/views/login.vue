<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">大哥号生成系统</div>
			<el-form :model="param" :rules="rules" ref="login" class="ms-content" label-position="top">
				<el-form-item prop="username" label="玩家昵称">
					<el-input v-model="param.username" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="选择区域">
					<el-input type="" placeholder="请输入" v-model="param.password"
						@keyup.enter="submitForm(login)"></el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">报名领取</el-button>
				</div>
				<!--				<p class="login-tips">Tips : 用户名和密码随便填。</p>-->
			</el-form>
		</div>
	</div>
  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      :before-close="handleClose"
  >
    <span>报名成功！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          返回
        </el-button>
      </span>
    </template>
  </el-dialog>
<!--	<div class="login-footer">版权所有©️2022 关系科技集团</div>-->
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter,useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { fetchLoginData } from '../api/cid'
import { useIndex } from "../store";

interface LoginInfo {
	username: any;
	password: string;
}
const route = useRoute()
const router = useRouter();
const param = reactive<LoginInfo>({
	username: route.query.username||'',
	password: ''
});
if(localStorage.getItem('select_area')){
  param.password = localStorage.getItem('select_area')!
}
const dialogVisible = ref(false)
const isLoding = ref(false)
const indexStore = useIndex()
const handleClose = () => {
  dialogVisible.value = false
}
// 获取登录数据
const getLoginData = (data: any) => {
  isLoding.value = false
  localStorage.setItem('select_area',data.password)
  ElMessage({
    message: '报名成功！',
    grouping: true,
    type: 'success',
  })
  return;
	fetchLoginData(data).then(res => {
		console.log("getLoginData res:", res)
		console.log("getLoginData res.status", res.status)
    isLoding.value = false
    if (res.status == 200) {
			localStorage.setItem('token', res.data.token);
      localStorage.setItem('ms_cid_userinfo', JSON.stringify(res.data));
      //初始化用户权限信息
      indexStore.setUserinfo()
      ElMessage.success('登录成功');
			localStorage.setItem('ms_cid_userinfo_username', param.username);
			const keys = permiss.defaultList[res.data.permission===0 ? 'admin' : 'user'];
			permiss.handleSet(keys);
			localStorage.setItem('ms_keys', JSON.stringify(keys));
      router.push('/');
		} else {
			ElMessage.error('登录失败！');
		}
	}).catch(err => {
		isLoding.value = false
    ElMessage.error(err.message)
	});
};

const rules: FormRules = {
	// username: [
	// 	{
	// 		required: true,
	// 		message: '请输入用户名',
	// 		trigger: 'blur'
	// 	}
	// ],
	// password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid: boolean) => {
		if (valid) {
			if(isLoding.value) return;
			isLoding.value = true
			getLoginData(param)
		} else {
			ElMessage.error('请输入信息！');
			return false;
		}
	});
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/bg.gif);
	background-size: 100% 100%;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #333;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.5);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}

.login-footer {
	text-align: center;
	position: absolute;
	bottom: 10px;
	width: 100%;
	color: #999999;
}
</style>
