<template>
  <div id="app">
    <el-container>
      <!-- Header -->
      <el-header class="app-header glass">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-wrapper">
              <el-icon :size="24" class="logo-icon">
                <Edit />
              </el-icon>
            </div>
            <h1 class="app-title gradient-text-premium">OneWriter</h1>
          </div>
          
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            :ellipsis="false"
            @select="handleMenuSelect"
            class="header-menu"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="diagrams">
              <template #title>
                <el-icon><PieChart /></el-icon>
                <span>图表生成</span>
              </template>
              <el-menu-item index="/diagram-generator">功能模块图</el-menu-item>
              <el-menu-item index="/usecase-diagram">用例图</el-menu-item>
              <el-menu-item index="/architecture-diagram">架构图</el-menu-item>
              <el-menu-item index="/er-diagram">数据库E-R图</el-menu-item>
              <el-menu-item index="/other-diagrams">其他图表</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/reference-processor">
              <el-icon><Document /></el-icon>
              <span>参考文献处理</span>
            </el-menu-item>
            <el-menu-item index="/markdown-converter">
              <el-icon><DocumentCopy /></el-icon>
              <span>Markdown转Word</span>
            </el-menu-item>
            <el-menu-item index="/tool-links">
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
  Edit,
  HomeFilled,
  PieChart,
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
  height: 80px !important;
  position: sticky;
  top: 0;
  z-index: 2005;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.header-content {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all var(--transition-base);
}

.logo-section:hover {
  transform: translateY(-1px);
}

.logo-wrapper {
  width: 44px;
  height: 44px;
  background: var(--gradient-primary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px -6px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.6);
  position: relative;
  overflow: hidden;
}

.logo-wrapper::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: rotate(45deg);
  animation: shine 4s infinite ease-in-out;
}

.logo-icon {
  color: white;
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.app-title {
  font-size: 26px;
  font-weight: 900;
  margin: 0;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-menu {
  background: transparent;
  border: none;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-left: 60px;
}

.header-menu :deep(.el-menu-item),
.header-menu :deep(.el-sub-menu__title) {
  height: 80px !important;
  line-height: 80px !important;
  padding: 0 24px !important;
  color: #64748b !important;
  font-weight: 700;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: none !important;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.header-menu :deep(.el-menu-item:hover),
.header-menu :deep(.el-sub-menu__title:hover) {
  color: var(--primary-color) !important;
  background: transparent !important;
}

.header-menu :deep(.el-menu-item.is-active),
.header-menu :deep(.el-sub-menu.is-active .el-sub-menu__title) {
  color: var(--primary-color) !important;
  border-bottom: none !important;
  background: transparent !important;
}

/* Redesigned Active Indicator */
.header-menu :deep(.el-menu-item.is-active::after),
.header-menu :deep(.el-sub-menu.is-active .el-sub-menu__title::after) {
  content: '';
  position: absolute;
  bottom: 12px;
  left: 24px;
  right: 24px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 4px;
  box-shadow: 0 2px 10px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.4);
  animation: slideInWidth 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideInWidth {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}

.app-main {
  min-height: calc(100vh - 140px);
  padding: 40px;
}

.app-footer {
  background: white;
  color: #94a3b8;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f1f5f9;
  font-size: 14px;
  font-weight: 500;
}

/* Page Transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

@keyframes shine {
  0% { transform: translateX(-200%) rotate(45deg); }
  30%, 100% { transform: translateX(200%) rotate(45deg); }
}

/* Mobile Adjustments */
@media (max-width: 1200px) {
  .header-menu { margin-left: 20px; }
}

@media (max-width: 1024px) {
  .app-title { display: none; }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-5px) rotate(5deg);
  }
}
</style>

