<template>
  <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      :action="`${baseUrl}api/v1/upload_file`"
      :headers="headers"
      :accept="props.accept"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :disabled="props.disabled"
  >
    <el-button type="primary">上传</el-button>
<!--    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>-->
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { UploadProps } from 'element-plus'
import aes from "../utils/aes";
import { baseUrl } from "../utils/request";
import { UploadFile, UploadFiles } from "element-plus";
const emits = defineEmits(['refreshImage'])

const props= defineProps({
  files: {
    type:Array,
    default:()=> []
  },
  accept:{
    type:String,
    default:''
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
//   // {
//   //   name: 'food.jpeg',
//   //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//   // },
// ])
watch(()=>props.files,(nVal,oVal)=>{
  fileList.value = nVal
})
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
