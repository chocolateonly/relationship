<template>
  <breadcrumb />
  <div class="container">
    <!--    撤销  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="6">
        <el-button type="danger" @click="revoke">撤销</el-button>
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
  <el-table :data="query.list" border v-loading="loading"
            ref="multipleTableRef"   @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="用户ID" width="95" align="center"></el-table-column>
    <el-table-column prop="nickname" width="200" label="用户昵称" align="center"></el-table-column>
    <el-table-column prop="tel" label="手机号" width="200" align="center"></el-table-column>
    <el-table-column prop="" label="注销状态" width="200" align="center">
      <template #default="scope">
        {{ statusText[scope.row.status] }}
      </template>
    </el-table-column>
    <el-table-column prop="logout_apply_time" label="申请时间" width="200" align="center"></el-table-column>
    <el-table-column prop="cancel_time" label="注销时间" width="200" align="center"></el-table-column>
    <el-table-column label="操作" align="center" min-width="180" fixed="right">
      <template #default="scope">
        <el-button type="warning" link @click="revoke(scope.row)" v-if="scope.row.status===2">撤销注销</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                   :page-size="query.page_size" :total="query.total" @current-change="goPage"></el-pagination>
  </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePage } from "../model/page";
import { revokeList, revokeUser } from "../api/resumelibrary";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import Breadcrumb from "../components/breadcrumb.vue";
const mode = ref('0')
const multipleSelection = ref<User[]>([])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const statusText = ['正常', '待注销', '已注销']
interface User{
  id:string
}
const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
//获取列表
const getList = () => {
  loading.value = true
  revokeList({
    page_index: query.page,
    page_size: query.page_size,
    mode: mode.value,
    keyword: query.keyword
  }).then(res => {
    loading.value = false
    query.list = res.data.lists
    query.total = res.data.total_count
  }).catch(()=>{
    loading.value = false
  })
}
onMounted(() => {
  getList()
})
//撤销
const revoke = (item:User)=>{
  if(item.id){
    multipleSelection.value.push(item)
  }
  const length = multipleSelection.value.length
  if(length==0){
    ElMessage.error('请选择要撤销项')
  }else{
    ElMessageBox.confirm(`确定撤销${length}个用户注销？撤销后则可正常使用。`, '撤销用户注销', {
      type: 'warning'
    })
        .then(() => {
          revokeUser({
            id: (multipleSelection.value).map(it=> {
              return it.id
            }).join(',')
          }).then(() => {
            ElMessage.success('撤销成功');
            goInit()
          }).catch()
        })
        .catch(() => {
          multipleTableRef.value!.clearSelection()
        });
  }

}

//多选
const handleSelectionChange = (selection:[])=>{
  multipleSelection.value = selection
}

</script>

<style scoped>

</style>