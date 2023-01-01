<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="6">
        <el-button type="primary" @click="add">添加子账号</el-button>
      </el-col>
      <el-col :span="18">
        <el-row justify="end">
          <el-form class="" :inline="true">
            <el-form-item label="账号ID" style="width: 200px">
              <el-input v-model="search.username" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item label="账号名称" style="width: 200px">
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
    <el-table :data="query.list" border v-loading="loading" >
      <el-table-column prop="username" label="账号ID" width="" align="center"></el-table-column>
      <el-table-column prop="nickname" width="" label="账号名称" align="center"></el-table-column>
      <!--      <el-table-column prop="" width="" label="密码" align="center"></el-table-column>-->
      <el-table-column prop="" width="" label="账号权限" align="center">
        <template #default="scope">
          {{scope.row.is_main_user?'主账号':'子账号'}}
        </template>
      </el-table-column>
      <el-table-column prop="" width="" label="账户授权" align="center">
        <template #default="scope">
          <el-tag type="" round v-if="!scope.row.is_authorization" @click="goAuth(scope.row)">授权</el-tag>
          <el-tag type="success" round v-else>已授权</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
          <!--          主账号不可删除-->
          <el-button type="warning" link @click="onDelete(scope.row)" v-if="!scope.row.is_main_user">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                     :page-size="query.page_size" :total="query.total" @current-change="goPage"></el-pagination>
    </div>
  </div>

  <!--  新增 编辑-->
  <el-dialog v-model="show" :title="CIDStore.operation=='edit'?'编辑':'新增'" @closed="cancel">
    <el-form class="common-form" ref="ruleFormRef" :model="form" :rules="rules" label-width="200px">
      <el-form-item label="客户名称" prop="nickname">
        <el-input type="text" v-model="form.nickname" placeholder="请输入" :disabled="selected.is_main_user"/>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="form.username" placeholder="请输入"  :disabled="selected.is_main_user"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入" autocomplete="new-password"/>
      </el-form-item>
      <el-form-item label="推广平台" prop="platform" >
        <el-checkbox-group v-model="form.platform" class="ml-4" @change="refreshRules"   :disabled="selected.is_main_user">
          <el-checkbox :label="item.value" size="large" v-for="(item,index) in CIDStore.platformOptions" :key="index">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="淘宝推广位PID" prop="taobao_adzone_id" v-if="form.platform.includes('0')">
        <el-input type="text" v-model="form.taobao_adzone_id" placeholder="请输入"   :disabled="selected.is_main_user"/>
      </el-form-item>
      <el-form-item label="京东推广位PID" prop="jd_adzone_id" v-if="form.platform.includes('1')">
        <el-input type="text" v-model="form.jd_adzone_id" placeholder="请输入"   :disabled="selected.is_main_user"/>
      </el-form-item>
      <el-form-item label="拼多多推广位PID" prop="pdd_adzone_id" v-if="form.platform.includes('2')">
        <el-input type="text" v-model="form.pdd_adzone_id" placeholder="请输入"   :disabled="selected.is_main_user"/>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button type="" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm(ruleFormRef)">确认</el-button>
            </span>
    </template>
  </el-dialog>

  <!--  删除-->
  <el-dialog v-model="delete_dialog" title="删除" @closed="cancelDelete">
    <el-form class="common-form" label-width="200px">
      <el-form-item label="是否删除账号下录入的商品" prop="platform">
        <el-radio-group v-model="form.goods_delete" class="ml-4">
          <el-radio label="" size="large">否</el-radio>
          <el-radio label="1" size="large">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button type="" @click="cancelDelete">取消</el-button>
                <el-button type="primary" @click="remove">确认</el-button>
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
import {
  cidUserAdd, cidUserDelete,
  cidUserEdit,
  cidUserList
} from "../../../api/cid";

const ruleFormRef = ref<FormInstance>()
const CIDStore = useCIDstore()
const router = useRouter()
const show = ref(false)
const form_loading = ref(false)
const search = reactive({
  username: ''
})
const selected = ref({
  id: '',
  is_main_user:false,
})
const refresh = ref('1')

const form = ref({
  nickname: '',
  username: '',
  password: '',
  taobao_adzone_id: '',
  jd_adzone_id: '',
  pdd_adzone_id: '',
  platform: ['0'],
  goods_delete: ''
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
  platform:[
    {required: true, message: '请选择平台', trigger: 'blur'},
  ],
  taobao_adzone_id: [
    {required: true, message: '请输入淘宝推广位PID', trigger: 'blur'},
  ],
  jd_adzone_id: [],
  pdd_adzone_id: [],
})
const delete_dialog = ref(false)
const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidUserList({
    username: search.username,
    page_index: query.page,
    page_size: query.page_size,
    nickname: query.keyword
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

const refreshRules = () => {

  if (form.value.platform.includes('0')){
    rules.taobao_adzone_id=[{required: true, message: '请输入淘宝推广位PID', trigger: 'blur'}]
  }else{
    rules.taobao_adzone_id=[]
    form.value.taobao_adzone_id=''
  }
  if (form.value.platform.includes('1')){
    rules.jd_adzone_id=[{required: true, message: '请输入京东推广位PID', trigger: 'blur'}]
  }else{
    rules.jd_adzone_id=[]
    form.value.jd_adzone_id=''
  }
  if (form.value.platform.includes('2')){
    rules.pdd_adzone_id=[{required: true, message: '请输入拼多多推广位PID', trigger: 'blur'}]
  }else{
    rules.pdd_adzone_id=[]
    form.value.pdd_adzone_id=''
  }
  ruleFormRef.value?.clearValidate()


}

//授权
const goAuth = (item: any) => {
   window.open(item.authorization_url,'_blank')
}
//重置搜索
const resetSearch = () => {
  query.keyword = ''
  search.username = ''
  goInit()
}

//弹窗取消
const cancel = () => {
  if (ruleFormRef) ruleFormRef.value?.resetFields()
  show.value = false
  form.value.goods_delete = ''
  form.value.nickname = ''
  form.value.username = ''
  form.value.password = ''
  form.value.taobao_adzone_id = ''
  form.value.jd_adzone_id = ''
  form.value.pdd_adzone_id = ''
  form.value.platform = ['0']
  selected.value.id = ''
  selected.value.is_main_user = false
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
        taobao_adzone_id: form.value.taobao_adzone_id,
        jd_adzone_id: form.value.jd_adzone_id,
        pdd_adzone_id: form.value.pdd_adzone_id,
        platform: form.value.platform.join(','),
      }
      if (selected.value.id) {
        cidUserEdit({
          id: selected.value.id,
          ...data
        }).then((res: any) => {
          cancel()
          form_loading.value = false
          if (res.status == 200) {
            ElMessage.success('编辑成功')
            goInit()
          }
        }).catch((e) => {
          form_loading.value = false
          ElMessage.error(e.message)
        })
      } else {
        cidUserAdd({
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
  form.value.taobao_adzone_id = item.taobao_adzone_id
  form.value.jd_adzone_id = item.jd_adzone_id
  form.value.pdd_adzone_id = item.pdd_adzone_id
  form.value.platform = item.user_platform
}
const onDelete = (item: any) => {
  delete_dialog.value = true
  selected.value.id = item.id
}
const cancelDelete = () => {
  delete_dialog.value = false
  form.value.goods_delete = ''
  selected.value.id = ''
}
/**
 * 删除
 */
const remove = () => {
  cidUserDelete({
    id: selected.value.id,
    type: form.value.goods_delete ? '1' : '0'
  }).then((res: any) => {
    if (res.status == 200) {
      cancelDelete()
      ElMessage.success('删除成功');
      goInit()
    } else {
      ElMessage.error(res.message)
    }
  }).catch(e => {
    ElMessage.error(e.message)
  })
}
</script>

<style scoped lang="scss">
</style>