import { reactive } from 'vue'
export const usePage = (getList:any) => {
    const query = reactive({
        keyword:'',
        page: 1,
        page_size: 5,
        total: 0,
        list: []
    })

    const goPage = (index:number) => {
        query.page = index
        query.list = []
        getList()
    }

    const goInit = () => {
        query.page = 1
        query.total = 0
        query.list = []
        getList()
    }

    return {
        query,
        goPage,
        goInit,
    }
}


/* 
使用样例：

<template lang="">
    <div>
        <div>{{page.page}}-{{page.list}}</div>
        <el-button @click="goPage(page.page+1)">添加</el-button>
        <el-button @click="goInit">初始化</el-button>
    </div>
</template>
<script setup>
    import {onMounted} from 'vue'
    import {usePage} from '../model/page.js'
        const { page, goPage, goInit } = usePage(()=>getList())
        const getList = ()=>{
            
            console.log('请求列表分页数据：',page.page)
            
        }

        onMounted(() => {
            getList()
        })
</script>
<style lang="">
    
</style>

*/
