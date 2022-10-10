<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                <div class="card-top-header">
                  <div class="card-top-title">注册用户数</div>
                  <div class="card-top-num">{{Number(8864).toLocaleString()}}</div>
                </div>
                <div class="card-content">
                  <line-chart  :chart-option="registerOptions"/>
                </div>
                <div class="card-footer">
                  <span class="card-footer-desc">日访问量</span>
                  <span class="card-footer-num">1234</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                <div class="card-top-header">
                  <div class="card-top-title">日新增用户数</div>
                  <div class="card-top-num">{{Number(8864).toLocaleString()}}</div>
                </div>
                <div class="card-content">
                  <line-chart  :chartOption="registerOptions2"/>
                </div>
                <div class="card-footer">
                  <span class="card-footer-desc">日访问量</span>
                  <span class="card-footer-num">1234</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                <div class="card-top-header">
                  <div class="card-top-title">日活跃用户数</div>
                  <div class="card-top-num">{{Number(8864).toLocaleString()}}</div>
                </div>
                <div class="card-content">
                  <line-chart  :chartOption="registerOptions3"/>
                </div>
                <div class="card-footer">
                  <span class="card-footer-desc">日访问量</span>
                  <span class="card-footer-num">1234</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div>
                <div class="card-top-header">
                  <div class="card-top-title">月活跃用户数</div>
                  <div class="card-top-num">{{Number(8864).toLocaleString()}}</div>
                </div>
                <div class="card-content">
                  <line-chart  :chartOption="registerOptions4"/>
                </div>
                <div class="card-footer">
                  <span class="card-footer-desc">日访问量</span>
                  <span class="card-footer-num">1234</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover">


          <div>
            <el-tabs
                v-model="activeName"
                class="demo-tabs"
                @tab-click="handleClick"
            >
              <div class="right-date">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                />
              </div>

              <el-tab-pane label="在线用户数" name="first"></el-tab-pane>
              <el-tab-pane label="注册用户数" name="second"></el-tab-pane>
            </el-tabs>

            <line-chart  height="300" :chart-option="registerOptions5"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import LineChart from "../components/lineChart.vue";
import { ref } from "vue";

const name = localStorage.getItem('ms_username');
const role: string = name ? '超级管理员' : '普通用户';

const activeName = ref('first')
const date = ref('')

const registerOptions = ref({})
const registerOptions2 = ref({})
const registerOptions3 = ref({})
const registerOptions4 = ref({})
const registerOptions5 = ref({})

const handleClick = () =>{}



registerOptions.value = {
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
};
registerOptions2.value = {
  xAxis: {
    show:false,
    data:[] // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    show:false
  },
  series: [
    {
      type: 'bar',
      smooth:true,
      data: [23, 24, 18, 25, 7, 28, 5,1],

    }
  ]
};
registerOptions3.value = {
  xAxis: {
    show:false,
    data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    show:false
  },
  series: [
    {
      type: 'bar',
      smooth:true,
      data: [3, 24, 18, 25, 7, 28, 5,1],
    }
  ]
};
registerOptions4.value = {
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
};
registerOptions5.value = {
  xAxis: {
    data:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
  },
  series: [
    {
      type: 'bar',
      smooth:true,
      data: [23, 24, 18, 25, 7, 28, 5,1],

    }
  ]
};
</script>

<style scoped>
.card-top-title,.card-footer-desc{
  color:#999999;
  font-size: 12px;
}
.card-top-num{
  font-size: 26px;
}
.card-footer{
  border-top: 1px solid #cccccc;
  padding-top: 10px;
}
.card-footer-num{
  margin-left: 10px;
}

.right-date{
  float: right;
}
</style>
