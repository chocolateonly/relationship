<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="6">
        <el-button type="primary" @click="add">添加管理员</el-button>
<!--        <el-button type="success" @click="output">导出</el-button>-->
      </el-col>
      <el-col :span="18">
        <el-row justify="end">
          <el-form class="" :inline="true">
            <el-form-item label="使用人/账号" style="width: 200px">
              <el-input v-model="query.keyword" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="goInit" icon="Search">查询</el-button>
              <el-button type="info" @click="resetSearch" icon="RefreshRight">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>

    <!--    列表-->
    <el-table :data="query.list" border v-loading="loading">
      <el-table-column prop="username" label="账号" width="" align="center"></el-table-column>
      <el-table-column prop="nickname" width="" label="使用人" align="center"></el-table-column>
<!--      <el-table-column prop="" width="" label="密码" align="center"></el-table-column>-->
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                     :page-size="query.page_size" :total="query.total" @current-change="goPage"></el-pagination>
    </div>
  </div>

  <!--  新增 编辑-->
  <el-dialog v-model="show" :title="CIDStore.operation=='edit'?'编辑':'新增'" @closed="cancel">
    <el-form class="common-form" ref="ruleFormRef" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="使用人" prop="nickname">
        <el-input type="text" v-model="form.nickname" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="form.username" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入" autocomplete="new-password"/>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button type="" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm(ruleFormRef)">确认</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { usePage } from "../../../model/page";
import { useRouter } from "vue-router";
import { ElMessage, FormInstance, FormRules, } from "element-plus";
import { useCIDstore } from "../../../store/cid";
import { exportExcelData } from "../../../utils/export2excel";
import {
  cidAdminAddB,
  cidAdminListB,
} from "../../../api/cid";
const ruleFormRef = ref<FormInstance>()
const CIDStore = useCIDstore()
const router = useRouter()
const show = ref(false)
const form_loading = ref(false)
const search = reactive({
  platform: ''
})
const selected = ref({
  id: 0
})
const refresh = ref('1')

const form = ref({
  nickname: '',
  username: '',
  password: '',
})
const rules = reactive<FormRules>({
  nickname: [
    {required: true, message: '请输入客户名称', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请填写至少6位密码', trigger: 'blur',min:6},
  ],
})

const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidAdminListB({
    page_index: query.page,
    page_size: query.page_size,
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
//重置搜索
const resetSearch = () => {
  query.keyword = ''
  goInit()
}
//弹窗取消
const cancel = () => {
  if (ruleFormRef) ruleFormRef.value?.resetFields()
  show.value = false
  form.value.nickname = ''
  form.value.username = ''
  form.value.password = ''
  selected.value.id = 0
}
//确认
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (form_loading.value) return;
      form_loading.value = true

      const data = {
        nickname: form.value.nickname,
        username: form.value.username,
        password: form.value.password,
      }
      if (selected.value.id) {

      } else {
        cidAdminAddB({
          ...data
        }).then((res: any) => {
          form_loading.value = false
          cancel()
          if (res.status == 200) {
            ElMessage.success('添加成功')
            goInit()
          }
        }).catch((e) => {
          form_loading.value = false
          ElMessage.error(e.message)
        })
      }
    } else {
      ElMessage.error('请将信息填写完整')
    }
  })

}
/**
 * 新增
 */
const add = () => {
  show.value = true
  CIDStore.setOperation('')
}
/**
 * 编辑
 * @param item
 */
const edit = (item: any) => {
  show.value = true
  CIDStore.setOperation('edit')
  selected.value = {...item}
  form.value.nickname = item.nickname
  form.value.username = item.username
  form.value.password = item.password
}
</script>

<style scoped lang="scss">
</style>