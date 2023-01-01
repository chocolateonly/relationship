<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="6">
        <el-button type="primary" @click="add">添加账户</el-button>
        <el-button type="success" @click="output">导出</el-button>
      </el-col>
      <el-col :span="18">
        <el-row justify="end">
          <el-form class="" :inline="true">
            <el-form-item label="客户名称/账号" style="width: 200px">
              <el-input v-model="query.keyword" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item label="销售平台" style="width: 200px">
              <el-select v-model="search.platform" class="" placeholder="请选择" size="default">
                <el-option
                    v-for="item in CIDStore.platformOptions"
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
      <el-table-column prop="username" label="客户账号" width="" align="center"></el-table-column>
      <el-table-column prop="nickname" width="" label="客户名称" align="center"></el-table-column>
<!--      <el-table-column prop="" width="" label="密码" align="center"></el-table-column>-->
      <el-table-column prop="email" width="" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="" width="" label="销售平台" align="center">
        <template #default="scope">
          {{(CIDStore.platformOptions.filter((item:any)=>scope.row.platform.includes(item.value))).map((item:any)=>item.label).join(',')}}
        </template>
      </el-table-column>
      <el-table-column prop="ocean_engine_account" width="" label="媒体账号" align="center"></el-table-column>
      <el-table-column label="操作" align="center" min-width="" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="enter(scope.row)">进入账号</el-button>
          <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
          <el-button type="warning" link @click="remove(scope.row)">删除</el-button>
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
        <el-input type="text" v-model="form.nickname" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="form.username" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入" autocomplete="new-password"/>
      </el-form-item>
      <el-form-item label="推广平台" prop="platform" >
        <el-checkbox-group v-model="form.platform" class="ml-4" @change="refreshRules">
          <el-checkbox :label="item.value" size="large" v-for="(item,index) in CIDStore.platformOptions" :key="index">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="淘宝推广位PID" prop="taobao_adzone_id" v-if="form.platform.includes('0')">
        <el-input type="text" v-model="form.taobao_adzone_id" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="京东推广位PID" prop="jd_adzone_id" v-if="form.platform.includes('1')">
        <el-input type="text" v-model="form.jd_adzone_id" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="拼多多推广位PID" prop="pdd_adzone_id" v-if="form.platform.includes('2')">
        <el-input type="text" v-model="form.pdd_adzone_id" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="form.email" placeholder="请输入"/>
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
import { ElMessage, ElMessageBox, FormInstance, FormRules, } from "element-plus";
import { useCIDstore } from "../../../store/cid";
import { exportExcelData } from "../../../utils/export2excel";
import {
  cidCustomerAddB,
  cidCustomerDeleteB,
  cidCustomerEditB,
  cidCustomerEnter,
  cidCustomerListB
} from "../../../api/cid";
import { customer_platform } from "../../../utils/request";
import { useIndex } from "../../../store";
import { useSidebarStore } from "../../../store/sidebar";
import { useTagsStore } from "../../../store/tags";
import { usePermissStore } from "../../../store/permiss";
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

const permiss = usePermissStore();
const refresh = ref('1')
const indexStore = useIndex()
const tagsStore = useTagsStore()
const form = ref({
  nickname: '',
  username: '',
  password: '',
  taobao_adzone_id: '',
  jd_adzone_id: '',
  pdd_adzone_id: '',
  email: '',
  platform:['0']
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
  email: [
    {
      validator: (rule, value, callback) => {
        const val = form.value.email
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!val) return callback()
        !(reg.test(val)) ? callback(new Error("邮箱格式不正确")) : callback();
      },
      trigger: 'blur'
    }
  ],
})

const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidCustomerListB({
    platform:search.platform,
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
const refreshRules = () => {

  if (form.value.platform.includes('0')){
    rules.taobao_adzone_id=[{required: true, message: '请输入淘宝推广位PID', trigger: 'blur'}]
  }else{
    rules.taobao_adzone_id=[]
    form.value.taobao_adzone_id = ''
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
//进入账号
const enter = (item:any) => {

  //登录到用户账号
  cidCustomerEnter({
    id:item.id
  }).then((res:any)=>{
    if(res.status==200){
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('ms_cid_userinfo', JSON.stringify(res.data));
      localStorage.setItem('ms_cid_userinfo_username', res.data.nickname);
      const keys = permiss.defaultList[res.data.permission===0 ? 'admin' : 'user'];
      permiss.handleSet(keys);
      localStorage.setItem('ms_keys', JSON.stringify(keys));
      indexStore.setUserinfo()
      tagsStore.clearTags()
      router.push(res.data.permission===0?'/cid_goods':'/cid_goods_tb')
    }
  }).catch((e)=>{
    ElMessage.error(e.message)
  })

}
//重置搜索
const resetSearch = () => {
  query.keyword = ''
  search.platform = ''
  goInit()
}
/**
 * 导出
 */
const output = () => {

  //处理导出数据
  cidCustomerListB({
    platform:search.platform,
    page_index: query.page,
    page_size: 10000,
    keyword: query.keyword
  }).then((res: any) => {
    if (res.status == 200) {
      const tableExportData = res.data.lists.map((item: any) => {
        const platform = CIDStore.platformOptions.find(it=>it.value==item.platform)
        return {
          username: item.username,
          nickname: item.nickname,
          email: item.email,
          platform: platform?platform.label:'',
          ocean_engine_account: item.ocean_engine_account,
        };

      });
      const titleArr = [
        "客户账号",
        "客户名称",
        "邮箱",
        "销售平台",
        "媒体账号",
      ]

      // let data = JSON.parse(JSON.stringify(tableExportData.value))
      console.log(tableExportData);
      exportExcelData(tableExportData, "客户列表", titleArr, "客户列表");
      // console.log(res.data.lists);
    } else {
      ElMessage.error(res.message || '后端api接口异常！');
    }

  }).catch((e:any) => {
    ElMessage.error(e.message);
  })
}

//弹窗取消
const cancel = () => {
  if (ruleFormRef) ruleFormRef.value?.resetFields()
  show.value = false
  form.value.nickname = ''
  form.value.username = ''
  form.value.password = ''
  form.value.taobao_adzone_id = ''
  form.value.jd_adzone_id = ''
  form.value.pdd_adzone_id = ''
  form.value.email = ''
  form.value.platform = ['0']
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
        taobao_adzone_id: form.value.taobao_adzone_id,
        jd_adzone_id: form.value.jd_adzone_id,
        pdd_adzone_id: form.value.pdd_adzone_id,
        email: form.value.email,
        platform: form.value.platform.join(','),
      }
      if (selected.value.id) {
        cidCustomerEditB({
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
        cidCustomerAddB({
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
  form.value.email = item.email
  form.value.platform = item.platform
}
/**
 * 删除
 * @param item
 */
const remove = (item: any) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        cidCustomerDeleteB({
          username: item.username
        }).then((res: any) => {
          if (res.status == 200) {
            ElMessage.success('删除成功');
            goInit()
          } else {
            ElMessage.error(res.message)
          }
        }).catch(e => {
          ElMessage.error(e.message)
        })
      })
      .catch(() => {
      });
}
</script>

<style scoped lang="scss">
</style>