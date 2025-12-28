<template>
  <div class="architecture-diagram-page animate-fade-in" :class="{ 'web-fullscreen-mode': isWebFullScreen }">
    <div class="page-header" v-if="!isWebFullScreen">
      <div class="title-section">
        <h1 class="page-title gradient-text-premium tertiary">
          <el-icon class="title-icon"><DataAnalysis /></el-icon>
          架构图生成
        </h1>
        <p class="page-subtitle">可视化展示技术栈与系统架构，支持在线协作与模板套用</p>
      </div>
      <div class="header-actions">
        <el-button @click="toggleWebFullScreen" class="action-btn">
          <template #icon><el-icon><FullScreen /></el-icon></template>
          页面全屏
        </el-button>
        <el-button type="primary" @click="openInNewTab" class="action-btn-primary tertiary-bg">
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
        <div class="window-address">
          feishu.cn/docx/GYKYdTzvwooDF2xQ1y3cbfzDned
        </div>
        <div class="window-actions">
          <el-icon @click="toggleWebFullScreen" class="exit-btn" v-if="isWebFullScreen"><CloseBold /></el-icon>
          <el-icon @click="toggleWebFullScreen" v-else><Expand /></el-icon>
        </div>
      </div>
      <div class="iframe-wrapper">
        <iframe
          src="https://ai.feishu.cn/docx/GYKYdTzvwooDF2xQ1y3cbfzDned?from=from_copylink"
          frameborder="0"
          class="tool-iframe"
          title="架构图生成工具"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DataAnalysis, Link, FullScreen, Expand, CloseBold } from '@element-plus/icons-vue'
import { ElMessage } from 'el-plus'

const isWebFullScreen = ref(false)

const openInNewTab = () => {
  window.open('https://ai.feishu.cn/docx/GYKYdTzvwooDF2xQ1y3cbfzDned?from=from_copylink', '_blank')
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
.architecture-diagram-page {
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
  margin-bottom: 24px;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tertiary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tertiary-bg {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%) !important;
}

.page-title {
  font-size: 32px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  font-size: 36px;
  color: #06b6d4;
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
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.action-btn-primary {
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  color: white;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);
}

.action-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.5);
}

.window-container {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: white;
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
  background: rgba(248, 250, 252, 0.8);
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

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.window-address {
  flex: 1;
  background: white;
  height: 28px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid var(--border-color);
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
  background: white;
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

