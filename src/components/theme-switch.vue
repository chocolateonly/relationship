<template>
  <el-switch inline-prompt v-model="theme" @click="toggle()"></el-switch>
</template>

<script setup lang="ts">

import { useToggle } from '@vueuse/shared'
import { useDark } from "@vueuse/core";
import { ref } from "vue";

const theme = ref<boolean>(false)

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})

const toggle = useToggle(isDark);

</script>

<style scoped lang="scss">

</style>