<!--简历信息上传 图片 附件        list-type="picture-card"
      :on-preview="handlePictureCardPreview"-->
<template>
  <el-upload
      v-model:file-list="fileList"
      :action="action"
      :headers="headers"
      :accept="props.accept"
      :on-preview="handlePictureCardPreview"
      :list-type="props.list_type"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :limit="props.limit"
      :disabled="props.disabled"
      :before-upload="beforeUpload"
  >
    <el-icon v-if="props.list_type=='picture-card'"><Plus /></el-icon>

    <el-button type="primary" v-else>上传</el-button>

  </el-upload>

    <el-dialog v-model="dialogVisible">
      <div>
      <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
      </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadProps } from 'element-plus'
import aes from "../utils/aes";
import { baseUrl } from "../utils/request";
import { ElMessage } from "element-plus";
const emits = defineEmits(['refreshImage'])

const props= defineProps({
  files: {
    type:Array,
    default:()=> []
  },
  accept:{
    type:String,
    default:'image/*;*.pdf'
  },
  list_type:{
    type:String,
    default:'text'
  },
  action:{
    type:String,
    default:`${baseUrl}api/v1/upload_file`
  },
  limit:{
    type:Number,
    default:1
  },
  disabled:{
    type:Boolean,
    default:false
  }
})

const headers = {
  'Authorization':localStorage.getItem('token') || '',
  'x-access-token':aes.encrypt('uxdfppium' + Date.now().toString())
}
const fileList = ref<any[]>(props.files)
// const fileList = ref<UploadUserFile[]>([
//   {
//     name: 'food.jpeg',
//     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//   }
// ])
   watch(()=>props.files,(nVal,oVal)=>{
      fileList.value = nVal
   })
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const beforeUpload = () => {
  if(props.limit&&fileList.value.length==props.limit){
    ElMessage.error('上传数量已达上限')
    return false
  }else{
    return true
  }
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  const files = uploadFiles.map((item:any)=>{
    return {
      ...item,
      id:item.id||item.response.id,
      path:item.path||item.response.path,
      url:item.url||item.response.url,
    }
  })
  // console.log('remove',files)
  emits('refreshImage',{file:files,type:'remove'})
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  if(props.list_type=='picture-card'){
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
  }
}
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // console.log('change')
  // emits('refreshImage',{file:uploadFile,type:'change'})
}
const handleSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const files = uploadFiles.map((item:any)=>{
    return {
      ...item,
      id:item.id||item.response.data.lists[0].id,
      name:item.name||item.response.data.lists[0].file_name,
      url:item.url||item.response.data.lists[0].attachment_url,
    }
  })
  // console.log('response',files)
  emits('refreshImage',{file:files,type:'response'})
}
</script>
