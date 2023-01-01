<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="24">
        <el-row justify="end">
          <el-form class="" :inline="true">
            <el-form-item label="商品名称" style="width: 200px">
              <el-input v-model="search.commodity_name" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item label="商品ID" style="width: 200px">
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
    <el-table :data="query.list" border v-loading="loading" @row-click="goOrderList">
      <el-table-column prop="commodity_id" label="商品ID" width="" align="center"></el-table-column>
      <el-table-column prop="" width="" label="商品名称" align="center">
        <template #default="scope">
          <span :title="scope.row.commodity_name">{{scope.row.commodity_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_count" width="" label="订单数量" align="center"></el-table-column>
      <el-table-column prop="pay_count" width="" label="付款单数" align="center"></el-table-column>
      <el-table-column prop="order_gmv" width="" label="电商订单GMV" align="center"></el-table-column>
      <el-table-column prop="pay_gmv" width="" label="电商支付GMV" align="center"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                     :page-size="query.page_size" :total="query.total" @current-change="goPage"></el-pagination>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { usePage } from "../../../model/page";
import { useRouter } from "vue-router";
import {  FormInstance, } from "element-plus";
import { cidGoodsDataList } from "../../../api/cid";

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const show = ref(false)
const search = reactive({
  commodity_name: ''
})
const selected = ref({
  id: ''
})
const refresh = ref('1')


const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidGoodsDataList({
    commodity_name:search.commodity_name,
    page_index: query.page,
    page_size: query.page_size,
    commodity_id: query.keyword
  }).then(res => {
    loading.value = false
    query.list = res.data.list
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
  search.commodity_name = ''
  goInit()
}

const goOrderList = (item:any) => {
  router.push('/cid_goods_order?commodity_id='+item.commodity_id)
}

</script>

<style scoped lang="scss">
</style>