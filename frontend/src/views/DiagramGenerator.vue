<template>
  <div class="diagram-generator-page animate-fade-in" :class="{ 'web-fullscreen-mode': isWebFullScreen }">
    <div class="page-header" v-if="!isWebFullScreen">
      <div class="title-section">
        <h1 class="page-title gradient-text-premium">
          <el-icon class="title-icon"><PieChart /></el-icon>
          功能模块图生成
        </h1>
        <p class="page-subtitle">快速构建系统功能架构图，支持思维导图式快捷操作</p>
      </div>
      <div class="header-actions">
        <el-button @click="toggleWebFullScreen" class="action-btn">
          <template #icon><el-icon><FullScreen /></el-icon></template>
          页面全屏
        </el-button>
        <el-button type="primary" @click="openInNewTab" class="action-btn-primary">
          <template #icon><el-icon><Link /></el-icon></template>
          在新窗口打开
        </el-button>
      </div>
    </div>

    <div class="window-container glass" :class="{ 'is-web-fullscreen': isWebFullScreen }">
      <div class="window-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="window-address-bar">
          <input 
            v-model="currentUrl" 
            class="address-input" 
            placeholder="请输入文档地址 (如: https://...)"
          />
        </div>
        <div class="window-actions">
          <el-icon @click="toggleWebFullScreen" class="exit-btn" v-if="isWebFullScreen"><CloseBold /></el-icon>
          <el-icon @click="toggleWebFullScreen" v-else><Expand /></el-icon>
        </div>
      </div>
      <div class="iframe-wrapper">
        <iframe
          :src="currentUrl"
          frameborder="0"
          class="tool-iframe"
          title="功能模块图生成工具"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { PieChart, Link, FullScreen, Expand, CloseBold } from '@element-plus/icons-vue'

const isWebFullScreen = ref(false)
const defaultUrl = 'https://tools.anqstar.com/tools/structure?storage=local'
const currentUrl = ref(defaultUrl)

const STORAGE_KEY = 'one-writer-function-diagram-url'

onMounted(() => {
  const savedUrl = localStorage.getItem(STORAGE_KEY)
  if (savedUrl) {
    currentUrl.value = savedUrl
  }
})

watch(currentUrl, (newValue) => {
  localStorage.setItem(STORAGE_KEY, newValue)
})

const openInNewTab = () => {
  window.open(currentUrl.value, '_blank')
}

const toggleWebFullScreen = () => {
  isWebFullScreen.value = !isWebFullScreen.value
  if (isWebFullScreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.diagram-generator-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 24px;
  padding: 22px 24px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-sm);
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-size: 30px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  font-size: 36px;
  color: var(--primary-color);
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  height: 44px;
  padding: 0 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.action-btn-primary {
  height: 44px;
  padding: 0 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  background: var(--gradient-primary);
  border: none;
  color: white;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-glow);
}

.action-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.window-container {
  flex: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(17, 132, 116, 0.18);
  background: rgba(255, 255, 255, 0.9);
  min-height: calc(100vh - 220px);
  margin-bottom: 40px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.window-container.is-web-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2001;
  border-radius: 0;
  margin: 0;
  min-height: 100vh;
}

.window-header {
  height: 44px;
  background: rgba(236, 248, 242, 0.82);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 24px;
  border-bottom: 1px solid var(--border-color);
}

.window-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #FF5C48; }
.dot.yellow { background: #FFD166; }
.dot.green { background: #10BFA3; }

.window-address-bar {
  flex: 1;
  background: white;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  padding: 0 4px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.window-address-bar:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 191, 163, 0.1);
}

.address-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--text-tertiary);
  background: transparent;
  padding: 0 8px;
  font-family: inherit;
}

.window-actions {
  display: flex;
  gap: 12px;
  color: var(--text-secondary);
  cursor: pointer;
}

.iframe-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.tool-iframe {
  flex: 1;
  width: 100%;
  border: none;
}

@media (max-width: 992px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
}
</style>
