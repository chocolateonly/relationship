<template>
  <div>
    <breadcrumb />
    <div class="container" v-if="operation!=='show'">
      <!--    新增  搜索-->
      <el-row justify="space-between" align="middle" class="top-search">
        <el-col :span="6">
          <el-button type="primary" @click="add">新增</el-button>
        </el-col>
        <el-col :span="18">
          <el-row justify="end">
            <el-form :inline="true">
              <el-form-item label="" style="width: 120px">
                <el-select v-model="mode" placeholder="" class="">
                  <el-option key="1" label="用户ID" value="0"></el-option>
                  <el-option key="2" label="用户手机号" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" style="width: 200px">
                <el-input v-model="query.keyword" placeholder="请输入搜索内容" clearable/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="goInit" icon="Search"></el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-col>
      </el-row>

      <!--    列表-->
      <el-table :data="query.list" border v-loading="loading">
        <el-table-column prop="id" label="账号ID" width="95" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120" align="center"></el-table-column>
        <el-table-column prop="" label="头像" width="" align="center">
          <template #default="scope">
            <el-avatar :src="scope.row.head_portrait"/>
          </template>
        </el-table-column>
        <el-table-column prop="tel" width="120" label="手机号"></el-table-column>
        <el-table-column prop="" width="100" label="实名认证" align="center">
          <template #default="scope">
            {{ scope.row.certification ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="180" align="center"></el-table-column>
        <el-table-column prop="ip" label="ip属地" width="150" align="center"></el-table-column>
        <el-table-column prop="device_id" label="注册设备" width="200" align="center"></el-table-column>
        <el-table-column prop="" label="状态" width="100" align="center">
          <template #default="scope">
            {{ statusText[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="180" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="show(scope.row)">详情</el-button>
            <!--            <el-button type="primary" link @click="goAuth(scope.row)">实名认证</el-button>-->
            <el-button type="warning" link @click="logout(scope.row)" v-if="scope.row.status===0">注销</el-button>
            <el-button type="warning" link @click="revoke(scope.row)" v-if="scope.row.status===2">撤销注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                       :page-size="query.page_size" :total="query.total" @current-change="goPage"></el-pagination>
      </div>

    </div>

    <!--    详情-->
    <div v-else class="container">
      <el-icon style="float: right;z-index:999" @click="closeShow">
        <Close />
      </el-icon>
      <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
      >
        <el-tab-pane label="基础信息" name="first">
          <el-row>
            <el-col :span="12">
              <el-form>
                <el-form-item label="账户ID：" label-width="120px">
                  {{ selected_user.id }}
                </el-form-item>

                <el-form-item label="昵称：" label-width="120px">
                  {{ selected_user.nickname }}
                </el-form-item>
                <el-form-item label="性别：" label-width="120px">
                  {{ selected_user.sex == null ? '实名认证后显示' : indexStore.sexOptions[selected_user.sex] }}
                </el-form-item>
                <el-form-item label="实名认证：" label-width="120px">
                  <el-button type="warning" @click='goAuth'>去实名认证</el-button>
                </el-form-item>
                <el-form-item label="手机号：" label-width="120px">
                  {{ selected_user.tel }}
                </el-form-item>
                <el-form-item label="注册设备：" label-width="120px">
                  {{ selected_user.device_id }}
                </el-form-item>
                <el-form-item label="注册时间：" label-width="120px">
                  {{ selected_user.created_at }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form>
                <el-form-item label="姓名：" label-width="120px">
                  {{ selected_user.true_name || '实名认证后显示' }}
                </el-form-item>
                <el-form-item label="身份证号：" label-width="120px">
                  {{ selected_user.id_card || '实名认证后显示' }}
                </el-form-item>
                <el-form-item label="实名时间：" label-width="120px">
                  {{ selected_user.true_name_time }}
                </el-form-item>
                <el-form-item label="账户状态：" label-width="120px">
                  {{ indexStore.userStatusOptions[selected_user.status] }}
                  <el-button type="danger" @click='logout(selected_user)' v-if="selected_user.status===0"
                             style="margin-left: 10px">注销
                  </el-button>
                  <el-button type="danger" @click='revoke(selected_user)' v-if="selected_user.status===2"
                             style="margin-left: 10px">撤销注销
                  </el-button>
                </el-form-item>
                <el-form-item label="注销申请：" label-width="120px">
                  {{ selected_user.logout_apply_time }}
                </el-form-item>
                <el-form-item label="注销时间：" label-width="120px">
                  {{ selected_user.cancellation_time }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="日志记录" name="second">
          <user-log v-if="selected_user.id" :userId="selected_user.id"/>
        </el-tab-pane>
      </el-tabs>

    </div>

    <!--  新增  编辑？？-->
    <el-dialog
        v-model="addVisible"
        title="新增"
        width="40%"
        :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item label="昵称：" label-width="120px">
          <el-input v-model="userInfo.username" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="手机号：" label-width="120px">
          <el-input v-model="userInfo.tel" placeholder="请输入"/>
        </el-form-item>
        <!--        <el-form-item label="实名认证：" label-width="120px">-->
        <!--          <el-button type="warning" @click='goAuth'>去实名认证</el-button>-->
        <!--        </el-form-item>-->
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
      </template>
    </el-dialog>

    <!--  实名认证-->
    <el-dialog
        v-model="authVisible"
        title="实名认证"
        width="40%"
        :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item label="用户名：" label-width="120px">
          <el-input v-model="userInfo.username" placeholder="请输入" disabled/>
        </el-form-item>
        <el-form-item label="姓名：" label-width="120px">
          <el-input v-model="userInfo.name" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="证件号：" label-width="120px">
          <el-input v-model="userInfo.idcard" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelAuth">取消</el-button>
        <el-button type="primary" @click="confirmAuth">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue'
import { usePage } from '../model/page'
import { addUser, authUser, getUserDetail, getUserList, loginOutUser, revokeUser } from '../api/resumelibrary'
import UserLog from "../components/userLog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useIndex } from "../store";
import Breadcrumb from "../components/breadcrumb.vue";

const statusText = ['正常', '待注销', '已注销']
const addVisible = ref(false)
const authVisible = ref(false)
const userObj = {
  username: '',
  tel: '',
  name: '',
  idcard: ''
}
const userInfo = ref({...userObj})
const selected_user = ref({
  id: 0,
  nickname: '',
  sex: null,
  tel: '',
  device_id: '',
  created_at: '',
  true_name: '',
  id_card: '',
  true_name_time: '',
  status: 0,
  logout_apply_time: '',
  cancellation_time: ''
})
const activeName = ref('first')
const form_loading = ref(false)
const indexStore = useIndex()
//--
const operation = ref('')
const mode = ref('0')

const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
//获取列表
const getList = () => {
  loading.value = true
  getUserList({
    page_index: query.page,
    page_size: query.page_size,
    mode: mode.value,
    keyword: query.keyword
  }).then(res => {
    loading.value = false
    query.list = res.data.lists
    query.total = res.data.total_count
  }).catch(() => {
    loading.value = false
  })
}
onMounted(() => {
  getList()
})
//--
//打开新增弹窗
const add = () => {
  addVisible.value = true
}
//关闭新增弹窗
const cancel = () => {
  addVisible.value = false
  userInfo.value = {...userObj}
}
//新增用户
const confirm = () => {
  form_loading.value = true
  addUser({
    tel: userInfo.value.tel,
    username: userInfo.value.username
  }).then(() => {
    ElMessage.success('添加成功')
    form_loading.value = false
    cancel()
    goInit()
  }).catch(() => {
    form_loading.value = false
  });
}
//关闭实名认证窗口
const cancelAuth = () => {
  authVisible.value = false
  userInfo.value.username = ''
  userInfo.value.name = ''
  userInfo.value.idcard = ''
}
//实名认证
const confirmAuth = () => {
  form_loading.value = true
  authUser({
    id: selected_user.value.id,
    name: userInfo.value.name,
    idcard: userInfo.value.idcard
  }).then(() => {
    ElMessage.success('实名认证成功')
    form_loading.value = false
    cancelAuth()
    show(selected_user)
  }).catch(() => {
    form_loading.value = false
  });
}
//打开实名认证窗口
const goAuth = () => {
  authVisible.value = true
  userInfo.value.username = selected_user.value.nickname
  userInfo.value.name = selected_user.value.true_name
  userInfo.value.idcard = selected_user.value.id_card
}
//查看详情
const show = (item: any) => {
  operation.value = 'show'
  getUserDetail(item.id)
      .then(res => {
        selected_user.value = res.data
      })
      .catch(() => {
      })
}
//关闭详情窗口
const closeShow = () => {
  operation.value = ''
}
//注销
const logout = (item: any) => {
  ElMessageBox.confirm('确定要注销吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        loginOutUser({
          id: item.id
        }).then(() => {
          ElMessage.success('注销成功');
          operation.value == 'show' ? show(item) : getList()
        }).catch()
      })
      .catch(() => {
      });
}
//撤销注销
const revoke = (item: any) => {
  ElMessageBox.confirm('确定要撤销注销吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        revokeUser({
          id: item.id.toString()
        }).then(() => {
          ElMessage.success('撤销注销成功');
          operation.value == 'show' ? show(item) : getList()
        }).catch()
      })
      .catch(() => {
      });
}

</script>

<style scoped>

</style>