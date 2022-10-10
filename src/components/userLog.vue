<template>
  <!--    列表-->
  <el-table :data="query.list" border v-loading="loading">
    <el-table-column prop="id" label="用户ID" width="95" align="center"></el-table-column>
    <el-table-column prop="action" width="" label="操作内容" align="center"></el-table-column>
    <el-table-column prop="device_id" label="端口" width="200" align="center"></el-table-column>
    <el-table-column prop="operation_time" label="操作时间" width="200" align="center"></el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                   :page-size="query.page_size" :total="query.total" @current-change="goPage"></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePage } from "../model/page";
import { logList } from "../api/resumelibrary";
const props = defineProps({
  userId:{
    type:Number,
    default:''
  }
})

const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  logList({
    page_index: query.page,
    page_size: query.page_size,
    id: props.userId
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
</script>

<style scoped>

</style>