<template>
  <div class="h-[calc(100vh-64px)] w-full flex flex-col bg-slate-900">
    <!-- Toolbar -->
    <div class="bg-slate-800 border-b border-white/10 p-2 px-4 flex justify-between items-center shrink-0">
        <h2 class="text-white font-medium flex items-center gap-2">
           <span class="text-lg">🏗️</span> 架构图预览
        </h2>
        <div class="flex gap-2 items-center">
            <span class="text-xs text-slate-400 hidden sm:inline">如果无法预览内容，请点击:</span>
            <a href="https://ai.feishu.cn/docx/GYKYdTzvwooDF2xQ1y3cbfzDned" target="_blank" class="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition-colors shadow-lg shadow-blue-900/20">
                <span>在新窗口打开</span>
                <span class="text-xs">↗</span>
            </a>
        </div>
    </div>
    
    <!-- Iframe Container -->
    <div class="flex-1 relative bg-white">
        <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-50">
            <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>正在加载文档...</p>
        </div>
        <iframe 
          src="https://ai.feishu.cn/docx/GYKYdTzvwooDF2xQ1y3cbfzDned"
          class="w-full h-full border-0 relative z-10"
          allowfullscreen
          allow="clipboard-read; clipboard-write; fullscreen"
          referrerpolicy="no-referrer"
          @load="onLoad"
        ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const onLoad = () => {
    loading.value = false
}
</script>
