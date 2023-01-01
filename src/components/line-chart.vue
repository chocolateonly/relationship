<template>
<div class="chart" ref="myChart" :style="{height:height+`px`}"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref,defineProps } from "vue";
const props = defineProps({
  height:{
    type:String,
    default:'100'
  },
  chartOption:{
    type:Object,
    default:{
      xAxis: {
        show:false,
        data:[] // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        show:false
      },
      series: [
        {
          // type: 'bar',
          type: 'line',

          smooth:true,
          data: [23, 24, 18, 25, 7, 28, 5,1],

          //line 内容面积
          areaStyle: {
            color: '#a87e3f',
            opacity: 1
          },
          //line 折线宽度
          lineStyle: {
            width: 0
          },
          //line 是否显示标记的圆形
          showSymbol: false,
        }
      ]
    }
  }
})
const myChart:any = ref(null);
let chart:any = null;

onMounted(()=>{
  chart = echarts.init(myChart.value)
  chart.setOption(props.chartOption)
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chart.resize();
  })
})


</script>

<style scoped lang="scss">
</style>
