<template>
  <v-header/>
  <v-sidebar/>
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    		<v-tags></v-tags>
    <div class="content">
      <router-view v-slot="{ Component }" v-if="showrouter">
<!--        <Breadcrumb />-->
        <transition name="move" mode="out-in">
          <keep-alive :include="tags.nameList">
            <div>
              <component :is="Component"></component>
            </div>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import { useTagsStore } from '../store/tags';
import vHeader from '../components/header.vue';
import vSidebar from '../components/sidebar.vue';
import vTags from '../components/tags.vue';
import { ref, provide, nextTick, onMounted } from 'vue';
import { useIndex } from "../store";
const showrouter=ref(true)
const reload=()=>{
  showrouter.value=false
  nextTick(()=>{
    showrouter.value=true
  })
}

const sidebar = useSidebarStore();
const tags = useTagsStore();
//获取权限
const indexStore = useIndex()
indexStore.setUserinfo()
provide('reload',reload)
</script>
