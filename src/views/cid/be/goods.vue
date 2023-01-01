<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="24">
        <el-row justify="end">
          <el-form class="" :inline="true">
            <el-form-item label="推广位ID" style="width: 200px">
              <el-input v-model="search.adzone_id" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item label="商品名称/ID" style="width: 200px">
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
      <el-table-column prop="adzone_id" label="推广位ID" width="160" align="center"></el-table-column>
      <el-table-column prop="commodity_id" label="商品ID" width="200" align="center"></el-table-column>
      <el-table-column prop="" width="200" label="商品名称" align="center">
        <template #default="scope">
          <span :title="scope.row.commodity_name">{{scope.row.commodity_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" width="100" label="客户名称" align="center"></el-table-column>
      <el-table-column prop="" width="100" label="跳转类型" align="center">
        <template #default="scope">
            {{(CIDStore.jumpOptions.find((item:any)=>item.value==scope.row.jump_type)||{}).label}}
        </template>
      </el-table-column>
      <el-table-column prop="landing_page_url" width="200" label="落地页链接" align="center">
<!--        <template #default="scope">-->
<!--            <div @click="copy(scope.row.landing_page_url)">{{scope.row.landing_page_url}}</div>-->
<!--        </template>-->
        <template #default="scope">
           <span style="cursor: pointer;" v-if="scope.row.jump_type=='1'" :title="customer_platform+'#/cid_goods_detail?commodity_id='+scope.row.commodity_id"
                 @click="copy(customer_platform+'#/cid_goods_detail?commodity_id='+scope.row.commodity_id)">
             {{customer_platform+'#/cid_goods_detail?commodity_id='+scope.row.commodity_id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="game_code" width="200" label="商品链接" align="center">
        <template #default="scope">
          <span style="cursor: pointer;" @click="copy(scope.row.details_page_url)" :title="scope.row.details_page_url">{{scope.row.details_page_url}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pay_gmv" width="100" label="支付GMY" align="center"></el-table-column>
      <el-table-column prop="order_gmv" width="100" label="订单GMY" align="center"></el-table-column>
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
import { FormInstance, } from "element-plus";
import { useCIDstore } from "../../../store/cid";
import { cidGoodsListB } from "../../../api/cid";
import { copy } from "../../../utils/common";
import { customer_platform } from "../../../utils/request";

const ruleFormRef = ref<FormInstance>()
const CIDStore = useCIDstore()
const router = useRouter()
const show = ref(false)
const search = reactive({
  adzone_id: ''
})
const selected = ref({
  id: ''
})
const refresh = ref('1')

const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidGoodsListB({
    adzone_id:search.adzone_id,
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
  search.adzone_id = ''
  goInit()
}

</script>

<style scoped lang="scss">
</style>