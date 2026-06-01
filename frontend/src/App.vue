<template>
  <div id="app">
    <el-container>
      <!-- Header -->
      <el-header class="app-header glass">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-wrapper">
              <img src="/favicon.png" alt="OneWriter" class="brand-logo" />
            </div>
            <h1 class="app-title">OneWriter</h1>
          </div>
          
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            menu-trigger="click"
            :ellipsis="false"
            @select="handleMenuSelect"
            class="header-menu"
          >
            <el-menu-item index="/" class="nav-home">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="image-tools" class="nav-image-tools" popper-class="app-menu-popper">
              <template #title>
                <el-icon><Picture /></el-icon>
                <span>图片工具</span>
              </template>
              <el-menu-item index="/usecase-diagram-generator">
                <el-icon><Document /></el-icon>
                <span>角色用例图</span>
              </el-menu-item>
              <el-menu-item index="/image-tools/system-architecture">
                <el-icon><Document /></el-icon>
                <span>系统架构图</span>
              </el-menu-item>
              <el-menu-item index="/diagram-generator">
                <el-icon><Document /></el-icon>
                <span>功能模块图</span>
              </el-menu-item>
              <el-menu-item index="/image-tools/er-diagram">
                <el-icon><Document /></el-icon>
                <span>ER图</span>
              </el-menu-item>
              <el-menu-item index="/image-tools/sequence-diagram">
                <el-icon><Document /></el-icon>
                <span>时序图</span>
              </el-menu-item>
              <el-menu-item index="/image-tools/flow-chart">
                <el-icon><Document /></el-icon>
                <span>流程图</span>
              </el-menu-item>
              <el-menu-item index="/image-tools/class-diagram">
                <el-icon><Document /></el-icon>
                <span>类图</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/reference-processor" class="nav-reference">
              <el-icon><Document /></el-icon>
              <span>参考文献处理</span>
            </el-menu-item>
            <el-menu-item index="/markdown-converter" class="nav-markdown">
              <el-icon><DocumentCopy /></el-icon>
              <span>Markdown转Word</span>
            </el-menu-item>
            <el-menu-item index="/tool-links" class="nav-links">
              <el-icon><Link /></el-icon>
              <span>工具链接</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!-- Main Content -->
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" class="animate-fade-in" />
          </transition>
        </router-view>
      </el-main>

      <!-- Footer -->
      <el-footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2024 OneWriter · 您的智能学术协作伙伴</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  HomeFilled,
  Picture,
  Document,
  DocumentCopy,
  Link
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = ref(route.path)

watch(() => route.path, (newPath) => {
  activeMenu.value = newPath
})

const handleMenuSelect = (index: string) => {
  if (index.startsWith('/')) {
    router.push(index)
    activeMenu.value = index
  }
}
</script>

<style scoped>
.app-header {
  padding: 0;
  height: 74px !important;
  position: sticky;
  top: 0;
  z-index: 2005;
  background: rgba(252, 255, 253, 0.9);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  border-bottom: 1px solid rgba(17, 132, 116, 0.14);
  box-shadow: 0 10px 32px rgba(22, 68, 62, 0.08);
}

.header-content {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 28px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all var(--transition-base);
  flex: 0 0 auto;
}

.logo-section:hover {
  transform: translateY(-1px);
}

.logo-wrapper {
  width: 46px;
  height: 46px;
  background: white;
  border: 1px solid rgba(17, 132, 116, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.brand-logo {
  width: 42px;
  height: 42px;
  object-fit: cover;
  object-position: center;
  transform: scale(1.2);
}

.app-title {
  font-size: 24px;
  font-weight: 900;
  margin: 0;
  letter-spacing: 0;
  background: linear-gradient(105deg, #10BFA3 0%, #31D18B 26%, #FFD166 46%, #43B5FF 66%, #FF5C48 84%, #22C55E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-menu {
  background: transparent;
  border: none;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-left: 34px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.header-menu::-webkit-scrollbar {
  display: none;
}

.header-menu :deep(.el-menu-item),
.header-menu :deep(.el-sub-menu__title) {
  --nav-color: var(--primary-color);
  --nav-gradient: var(--gradient-primary);
  --nav-soft: rgba(236, 248, 242, 0.58);
  height: 74px !important;
  line-height: 74px !important;
  padding: 0 18px !important;
  color: var(--text-secondary) !important;
  font-weight: 750;
  font-size: 14px;
  transition: all var(--transition-fast);
  border-bottom: none !important;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  white-space: nowrap;
}

.header-menu :deep(.el-sub-menu .el-menu-item) {
  height: 42px !important;
  line-height: 42px !important;
}

.header-menu :deep(.nav-home) {
  --nav-color: #118474;
  --nav-gradient: var(--gradient-primary);
  --nav-soft: rgba(236, 248, 242, 0.64);
}

.header-menu :deep(.nav-image-tools .el-sub-menu__title) {
  --nav-color: #10BFA3;
  --nav-gradient: linear-gradient(100deg, #10BFA3 0%, #FFD166 28%, #43B5FF 54%, #FF5C48 78%, #22C55E 100%);
  --nav-soft: rgba(16, 191, 163, 0.08);
}

.header-menu :deep(.nav-reference) {
  --nav-color: #1E73E8;
  --nav-gradient: var(--gradient-sky);
  --nav-soft: rgba(67, 181, 255, 0.12);
}

.header-menu :deep(.nav-markdown) {
  --nav-color: #FF5C48;
  --nav-gradient: var(--gradient-coral);
  --nav-soft: rgba(255, 141, 107, 0.14);
}

.header-menu :deep(.nav-links) {
  --nav-color: #22C55E;
  --nav-gradient: var(--gradient-grass);
  --nav-soft: rgba(163, 230, 53, 0.16);
}

.header-menu :deep(.el-sub-menu__icon-arrow) {
  display: none;
}

.header-menu :deep(.el-menu-item .el-icon) {
  color: var(--nav-color);
}

.header-menu :deep(.el-menu-item:hover),
.header-menu :deep(.el-sub-menu__title:hover) {
  color: var(--nav-color) !important;
  background: var(--nav-soft) !important;
}

.header-menu :deep(.el-menu-item.is-active),
.header-menu :deep(.el-sub-menu.is-active .el-sub-menu__title) {
  color: var(--color-text-strong) !important;
  border-bottom: none !important;
  background: var(--nav-soft) !important;
}

.header-menu :deep(.el-menu-item.is-active::after),
.header-menu :deep(.el-sub-menu.is-active .el-sub-menu__title::after) {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 18px;
  right: 18px;
  height: 3px;
  background: var(--nav-gradient);
  border-radius: 4px;
  box-shadow: 0 8px 20px rgba(22, 68, 62, 0.16);
  animation: slideInWidth var(--transition-base);
}

@keyframes slideInWidth {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}

.app-main {
  min-height: calc(100vh - 130px);
  padding: 34px 28px;
}

.app-footer {
  background: rgba(255, 255, 255, 0.58);
  color: var(--text-tertiary);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(17, 132, 116, 0.12);
  font-size: 14px;
  font-weight: 500;
}

/* Page Transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all var(--transition-base);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

@media (max-width: 1200px) {
  .header-content { padding: 0 18px; }
  .header-menu { margin-left: 18px; }
  .header-menu :deep(.el-menu-item),
  .header-menu :deep(.el-sub-menu__title) {
    padding: 0 12px !important;
  }
}

@media (max-width: 1024px) {
  .app-title { display: none; }
}

@media (max-width: 768px) {
  .app-header {
    height: 66px !important;
  }

  .logo-wrapper {
    width: 40px;
    height: 40px;
  }

  .brand-logo {
    width: 36px;
    height: 36px;
  }

  .header-menu :deep(.el-menu-item),
  .header-menu :deep(.el-sub-menu__title) {
    height: 66px !important;
    line-height: 66px !important;
    font-size: 13px;
  }

  .app-main {
    padding: 24px 14px;
  }
}

:global(.app-menu-popper) {
  overflow: hidden;
  border: 1px solid rgba(17, 132, 116, 0.16);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

:global(.app-menu-popper .el-menu--popup) {
  min-width: 184px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.96);
}

:global(.app-menu-popper .el-menu-item) {
  height: 40px;
  margin: 2px 0;
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-weight: 750;
}

:global(.app-menu-popper .el-menu-item:hover),
:global(.app-menu-popper .el-menu-item.is-active) {
  background: rgba(236, 248, 242, 0.9);
  color: var(--color-text-strong);
}
</style>
