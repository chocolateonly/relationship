<template>
  <div class="preview-img-wrap">
<!--    <div class="img-title">-->
<!--      <h3>效果预览</h3><span>推荐尺寸：(750*1334)</span>-->
<!--    </div>-->
    <div class="preview-img" v-if="!form.landing_page_background">
      <el-icon class="preview-img-icon" :size="60" color="#666">
        <Picture/>
      </el-icon>

      <div class="preview-img-footer">
        <div class="btn-title" @click="goPage">引导图点击区域</div>
        <div class="btn-title-size">引导图推荐尺寸：(750*169)</div>
      </div>

    </div>

    <!--                   预览图-->
    <div class="preview-img-real-wrap" v-else>
      <!--按钮-->
      <div  class="preview-btn" >
      <el-image @click="goPage" :src="form.landing_page_button" v-if="form.landing_page_button" fit="contain">
        <template #error>
          <div class="image-slot">
            <el-button type="primary">去查看</el-button>
          </div>
        </template>
      </el-image>
      </div>
      <el-image class="preview-bg" :src="form.landing_page_background" v-if="form.landing_page_background"/>

    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { cidGoodsDetail } from "../../../api/cid";
import { ElMessage } from "element-plus";
const route = useRoute()
const commodity_id = ref(route.query.commodity_id||'')

const params = reactive({
   adid :route.query.adid||'',
   creativeid :route.query.creativeid||'',
   promotionid :route.query.promotionid||'',
   projectid :route.query.projectid||'',
   creativetype :route.query.creativetype||'',
   clickid :route.query.clickid||'',
})
const form = ref({
  details_page:'',
  landing_page_background:'',
  landing_page_button:'',
})

const getDetail = () => {
  cidGoodsDetail({
    commodity_id:commodity_id.value,
    ...params
  }).then((res:any)=>{
    if(res.status==200){
      form.value.details_page = res.data.details_page
      form.value.landing_page_background = res.data.landing_page_background
      form.value.landing_page_button = res.data.landing_page_button
    }
  }).catch(e=>{
    ElMessage.error(e.message)
  })
}

const goPage = () => {
  window.open(form.value.details_page,'_blank')
}
getDetail()
</script>

<style scoped lang="scss">
html, body{
  overflow-y: auto;
}
.preview-img-wrap {
  height: 100%;
  //padding: 20px;
  background: #f2f6fb;
  text-align: left;
  overflow-y: scroll;
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
    width:100%;
    //width: 375px;
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
  }

  .preview-img-real-wrap{
    position: relative;
    z-index: 1;

    .preview-bg {
      width: 100%;
      //height: 100%;
      z-index: 2;
      background: #fff;
    }

    .preview-btn {
      position: absolute;
      bottom: 50px;
      z-index: 3;
      width:400px;
      height: 100px;
      //background: #fcc;
      left:50%;
      margin-left: -200px;
      overflow:hidden;
      text-align: center
    }
  }
}
</style>