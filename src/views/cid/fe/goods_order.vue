<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="24">
        <el-row justify="end">
          <el-form class="" :inline="true">
<!--            自动带入 商品ID-->
            <el-form-item label="商品ID" style="width: 200px">
              <el-input v-model="commodity_id" placeholder="请输入" clearable disabled/>
            </el-form-item>
            <el-form-item label="订单ID" style="width: 200px">
              <el-input v-model="query.keyword" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item label="订单状态" style="width: 200px">
              <el-select v-model="search.order_status" class="" placeholder="请选择" size="default">
                <el-option
                    v-for="item in CIDStore.orderStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
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
      <el-table-column prop="commodity_id" label="商品ID" width="" align="center"></el-table-column>
      <el-table-column prop="" width="" label="商品名称" align="center">
        <template #default="scope">
          <span :title="scope.row.commodity_name">{{scope.row.commodity_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" width="" label="付款金额" align="center"></el-table-column>
      <el-table-column prop="order_num" width="" label="淘宝订单编号" align="center"></el-table-column>
      <el-table-column prop="" width="" label="订单状态" align="center">
        <template #default="scope">
          <el-tag type="primary" plain round v-if="true">{{scope.row.state}}</el-tag>
          <el-tag type="warning" plain round v-else-if="false">{{scope.row.state}}</el-tag>
          <el-tag type="danger" plain round v-else>{{scope.row.state}}</el-tag>
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
import { onMounted, reactive, ref } from "vue";
import { usePage } from "../../../model/page";
import { useRoute, useRouter } from "vue-router";
import { FormInstance, } from "element-plus";
import { useCIDstore } from "../../../store/cid";
import { cidGoodsOrderList } from "../../../api/cid";

const ruleFormRef = ref<FormInstance>()
const CIDStore = useCIDstore()
const router = useRouter()
const show = ref(false)
const search = reactive({
  order_status: '0'
})
const selected = ref({
  id: ''
})
const refresh = ref('1')
const route = useRoute()
const commodity_id = ref(route.query.commodity_id||'')
const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidGoodsOrderList({
    commodity_id:commodity_id.value,
    page_index: query.page,
    page_size: query.page_size,
    order_id: query.keyword,
    state:search.order_status
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
  search.order_status = '0'
  goInit()
}
</script>

<style scoped lang="scss">
</style>