<template>
  <!--  -->
  <div class="container">
    <!--    新增  搜索-->
    <el-row justify="space-between" align="middle" class="top-search">
      <el-col :span="6">
        <el-button type="primary" @click="add">添加商品</el-button>
        <el-button type="success" @click="output">导出</el-button>
      </el-col>
      <el-col :span="18">
        <el-row justify="end">
          <el-form class="" :inline="true">
            <el-form-item label="淘宝店铺" style="width: 200px">
              <el-input v-model="query.keyword" placeholder="请输入" clearable/>
            </el-form-item>
            <el-form-item label="商品名称/ID" style="width: 200px">
              <el-input v-model="search.name" placeholder="请输入" clearable/>
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
      <el-table-column prop="commodity_id" label="商品ID" width="200" align="center"></el-table-column>
      <el-table-column prop="" width="200" label="商品名称" align="center">
        <template #default="scope">
          <span :title="scope.row.commodity_name">{{scope.row.commodity_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="seller_id" width="200" label="店铺ID" align="center"></el-table-column>
      <el-table-column prop="seller_name" width="200" label="店铺名称" align="center"></el-table-column>
      <el-table-column prop="" width="100" label="跳转类型" align="center">
        <template #default="scope">
          <span>
          {{(CIDStore.jumpOptions.find((item:any)=>item.value==scope.row.jump_type)||{}).label}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="" width="200" label="落地页链接" align="center" class-name="line1">
        <template #default="scope">
           <span style="cursor: pointer;width: 200px" v-if="scope.row.jump_type=='1'" :title="customer_platform+'#/cid_goods_detail?commodity_id='+scope.row.commodity_id"
                 @click="copy(customer_platform+'#/cid_goods_detail?commodity_id='+scope.row.commodity_id)">
             {{customer_platform+'#/cid_goods_detail?commodity_id='+scope.row.commodity_id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" width="200" label="详情页链接" align="center">
        <template #default="scope">
          <span style="cursor: pointer;width: 200px" @click="copy(scope.row.details_page_url)"  :title="scope.row.details_page_url">{{scope.row.details_page_url}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200" fixed="right">
        <template #default="scope">
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
      <el-form-item label="广告平台">
        <el-tag effect="plain" size="large">巨量引擎</el-tag>
      </el-form-item>
      <el-form-item label="商品ID" prop="commodity_id">
        <el-input type="text" v-model="form.commodity_id" placeholder="请输入"/>
        <el-button type="primary" @click="checkInfo" style="margin-left:10px">检测</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="commodity_name">
        <el-input type="text" v-model="form.commodity_name" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="店铺ID" prop="seller_id">
        <el-input type="text" v-model="form.seller_id" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="店铺名称" prop="seller_name">
        <el-input type="text" v-model="form.seller_name" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="详情页链接" prop="details_page_url">
        <el-input type="text" v-model="form.details_page_url" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="跳转类型" prop="jump" required>
        <div style="display:flex;flex-direction: column">
          <el-radio-group v-model="form.jump" class="ml-4">
            <el-radio :label="item.value" size="large" v-for="(item,index) in CIDStore.jumpOptions" :key="index">{{item.label}}</el-radio>
          </el-radio-group>
          <el-button v-if="form.jump=='1'" type="primary" @click="openMakingDialog">制作落地页</el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button type="" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm(ruleFormRef)">确认</el-button>
            </span>
    </template>
  </el-dialog>

  <!--  制作落地页-->
  <el-dialog v-model="making_dialog" title="制作落地页" @closed="cancelMaking">

    <el-row>
      <el-col :span="8">
        <el-form class="common-form" label-width="100px">
          <el-form-item label="落地页主图" required>
            <div style="width:100px">
              <upload-image :key="refresh" :files="form.back_img" @refreshImage="refreshBackImg"/>
            </div>
          </el-form-item>
          <el-form-item label="引导按钮图" required>
            <div style="width:100px">
              <upload-image :key="refresh" :files="form.btn_img" @refreshImage="refreshBtnImg"/>
            </div>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="16" align="center">
        <!--        预览-->
        <div class="preview-img-wrap">
          <div class="img-title">
            <h3>效果预览</h3><span>推荐尺寸：(750*1334)</span>
          </div>
          <div class="preview-img">
            <el-icon class="preview-img-icon" :size="60" color="#666">
              <Picture/>
            </el-icon>

            <div class="preview-img-footer">
              <div class="btn-title">引导图点击区域</div>
              <div class="btn-title-size">引导图推荐尺寸：(400*100)</div>
            </div>

            <!--                   预览图-->
            <el-image class="preview-bg" :src="form.back_img[0].url" v-if="form.back_img.length>0"/>
            <!--按钮-->
            <el-image class="preview-btn" :src="form.btn_img[0].url" v-if="form.btn_img.length>0"/>

          </div>

        </div>
      </el-col>
    </el-row>

    <template #footer>
            <span class="dialog-footer">
                <el-button type="" @click="cancelMaking">取消</el-button>
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
import UploadImage from "../../../components/upload-image.vue";
import { cidGoodsAdd, cidGoodsDelete, cidGoodsEdit, cidGoodsIdCheck, cidGoodsList } from "../../../api/cid";
import { customer_platform } from "../../../utils/request";
import { copy } from "../../../utils/common";

const ruleFormRef = ref<FormInstance>()
const CIDStore = useCIDstore()
const router = useRouter()
const show = ref(false)
const form_loading = ref(false)
const making_dialog = ref(false)
const search = reactive({
  name: ''
})
const selected = ref({
  id: ''
})
const refresh = ref('1')

interface Url {
  name: string,
  url: string,
  id: number,
  path: string
}

const form = ref({
  commodity_id: '',
  commodity_name: '',
  seller_id: '',
  seller_name: '',
  details_page_url: '',
  commodity_platform:'0',
  jump: '0',
  back_img: <Array<Url>>[],
  btn_img: <Array<Url>>[]
})
const rules = reactive<FormRules>({
  commodity_id: [
    {required: true, message: '请输入商品ID', trigger: 'blur'},
  ],
  commodity_name: [
    {required: true, message: '请输入商品名称', trigger: 'blur'},
  ],
  seller_name: [
    {required: true, message: '请输入店铺名称', trigger: 'blur'},
  ],

})

const loading = ref(false)
const {query, goPage, goInit} = usePage(() => getList())
const getList = () => {
  loading.value = true
  cidGoodsList({
    page_index: query.page,
    page_size: query.page_size,
    keywords: query.keyword,
    seller_name:search.name
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

/**
 * 更新上传数据
 * @param data
 */
const refreshBackImg = (data: any) => {
  form.value.back_img = data.file
}
const refreshBtnImg = (data: any) => {
  form.value.btn_img = data.file
}
//重置搜索
const resetSearch = () => {
  query.keyword = ''
  search.name = ''
  goInit()
}
//打开落地页
const openMakingDialog = () => {
  making_dialog.value = true
}
/**
 * 检测 通过商品id 获取商品信息
 */
const checkInfo = () => {
  if (!form.value.commodity_id) return ElMessage.error('请输入商品编号')
  if (!form.value.commodity_name) return ElMessage.error('请输入商品名称')

  cidGoodsIdCheck({
    commodity_id:form.value.commodity_id,
    commodity_name:form.value.commodity_name,
  }).then((res:any)=>{
    if(res.status==200){
      form.value.commodity_name = res.data.commodity_name
      form.value.seller_id = res.data.seller_id
      form.value.seller_name = res.data.seller_name
      form.value.details_page_url = res.data.details_page_url
    }
  }).catch(e=>{
    ElMessage.error(e.message)
  })

}
/**
 * 导出
 */
const output = () => {

  //处理导出数据
  cidGoodsList({
    page_index: query.page,
    page_size: 10000,
    keywords: query.keyword,
    seller_name:search.name
  }).then((res: any) => {
    if (res.status == 200) {
      const tableExportData = res.data.list.map((item: any) => {
        return {
          commodity_id: item.commodity_id,
          commodity_name: item.commodity_name,
          seller_id: item.seller_id,
          seller_name: item.seller_name,
          jump: (CIDStore.jumpOptions.find((it:any)=>it.value==item.jump_type)||{}).label,
          url: customer_platform+'#/cid_goods_detail?commodity_id='+item.commodity_id,
          details_page_url: item.details_page_url,
        };

      });
      const titleArr = [
        "商品ID",
        "商品名称",
        "店铺ID",
        "店铺名称",
        "跳转类型",
        "落地页链接",
        "详情页链接",
      ]

      // let data = JSON.parse(JSON.stringify(tableExportData.value))
      console.log(tableExportData);
      exportExcelData(tableExportData, "商品推广", titleArr, "商品列表");
      // console.log(res.data.lists);
    } else {
      ElMessage.error(res.message || '后端api接口异常！');
    }

  }).catch((e) => {
    ElMessage.error(e.message);
  })
}

const cancelMaking = () => {
  making_dialog.value = false
  form.value.back_img = []
  form.value.btn_img = []
}
//弹窗取消
const cancel = () => {
  if (ruleFormRef) ruleFormRef.value?.resetFields()
  show.value = false
  form.value.commodity_id = ''
  form.value.commodity_name = ''
  form.value.details_page_url = ''
  form.value.seller_id = ''
  form.value.seller_name = ''
  form.value.commodity_platform = '0'
  form.value.jump = '0'
  selected.value.id = ''
  cancelMaking()
}
//确认
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {

      if (form.value.jump == '1' && form.value.back_img.length == 0) {
        return ElMessage.error('请设置落地页')
      }
      if (form.value.jump == '1' && form.value.btn_img.length == 0) {
        return ElMessage.error('请设置引导按钮')
      }

      if (form_loading.value) return;
      form_loading.value = true
      const data = {
        commodity_id: form.value.commodity_id,
        commodity_name: form.value.commodity_name,
        seller_id: form.value.seller_id,
        seller_name: form.value.seller_name,
        jump_type: form.value.jump,
        details_page_url: form.value.details_page_url,
        advertising_platform:'0',
        commodity_platform:form.value.commodity_platform,
        landing_page_background:form.value.back_img.map(item=>item.id).join(','),
        landing_page_button:form.value.btn_img.map(item=>item.id).join(','),
      }
      if (selected.value.id) {
        cidGoodsEdit({
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
        cidGoodsAdd({
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
  form.value.commodity_id = item.commodity_id
  form.value.commodity_name = item.commodity_name
  form.value.seller_id = item.seller_id
  form.value.seller_name = item.seller_name
  form.value.details_page_url = item.details_page_url
  form.value.commodity_platform = item.commodity_platform.toString()
  form.value.jump = item.jump_type.toString()
  form.value.back_img =  item.landing_page.length>0?item.landing_page.slice(0,1):[]
  form.value.btn_img =  item.landing_page.length>0?item.landing_page.slice(1):[]
}
/**
 * 移除
 * @param item
 */
const remove = (item: any) => {
  ElMessageBox.confirm('确定要移除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        cidGoodsDelete({
          id: item.id
        }).then((res: any) => {
          if (res.status == 200) {
            ElMessage.success('移除成功');
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
.preview-img-wrap {
  padding: 20px;
  background: #f2f6fb;
  text-align: left;

  .img-title {
    margin-bottom: 10px;

    h3 {
      display: inline-block;
      margin-right: 10px;
    }

    span {
      color: #6895f7;

    }
  }

  .preview-img {
    width: 375px;
    min-height: 200px;
    //min-height: 667px;
    margin: 0 auto;
    background: #dce9fb;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;

    .preview-img-icon {
      text-align: center;
      margin: 0 auto;
    }

    .preview-img-footer {
      text-align: center;

      .btn-title {
        color: #6895f7;
      }

      .btn-title-size {
        color: #a6a6a6;
      }
    }

    .preview-bg {
      position: absolute;
      width: 100%;
      //height: 100%;
      z-index: 1;
      background: #fff;
    }

    .preview-btn {
      position: relative;
      z-index: 2;
      max-width: 370px;
      max-height: 200px;
      margin: 0 auto;
    }

  }

}
</style>