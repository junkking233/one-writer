<template>
  <div class="home-page animate-fade-in">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-grid container">
        <div class="hero-text-area">
          <div class="hero-badge animate-slide-down">
            <span class="badge-dot"></span>
            <span class="badge-text">OneWriter v2.0 · 智能学术协作</span>
          </div>
          <h1 class="hero-headline">
            定义学术写作的 <br />
            <span class="gradient-text-premium secondary-flow">未来生产力</span>
          </h1>
          <p class="hero-subtext">
            一个为研究者而生的极简工作空间。通过 AI 驱动的绘图引擎与自动化文献处理，
            我们将您从繁琐的排版与构图中解放，全速奔向学术顶峰。
          </p>
          <div class="hero-actions-container">
            <el-button type="primary" size="large" @click="router.push('/usecase-diagram')" class="premium-call-to-action">
              <el-icon><MagicStick /></el-icon> 开启智能创作
            </el-button>
            <el-button size="large" @click="router.push('/tool-links')" class="premium-secondary-action">
              <el-icon><Compass /></el-icon> 浏览工具阵列
            </el-button>
          </div>
        </div>
        
        <div class="hero-visual-area">
          <div class="abstract-shape shape-1"></div>
          <div class="abstract-shape shape-2"></div>
          <div class="hero-card-preview glass shadow-premium">
            <div class="preview-body">
              <div class="skeleton-line w-80"></div>
              <div class="skeleton-line w-60"></div>
              <div class="skeleton-line w-70"></div>
              <div class="skeleton-grid">
                <div class="skeleton-box"></div>
                <div class="skeleton-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section container">
      <div class="features-intro">
        <h2 class="features-main-title">全域效率引擎</h2>
        <p class="features-sub-desc">覆盖学术生命周期的每一处细节，为您提供无缝的数字工具链</p>
      </div>
      
      <div class="feature-matrix">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="modern-feature-card"
          @click="router.push(feature.path)"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <div class="card-glass-base"></div>
          <div class="feature-inner-content">
            <div class="icon-orbit" :style="{ '--orbit-color': feature.color }">
              <div class="icon-core" :style="{ background: feature.gradient }">
                <el-icon :size="28"><component :is="feature.icon" /></el-icon>
              </div>
            </div>
            <div class="feature-text-block">
              <h3 class="feature-label">{{ feature.title }}</h3>
              <p class="feature-summary">{{ feature.desc }}</p>
            </div>
            <div class="feature-footer">
              <span class="explore-text">探索功能</span>
              <div class="mini-arrow-box">
                <el-icon><Right /></el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  MagicStick,
  Compass,
  PieChart,
  Document,
  DocumentCopy,
  DataAnalysis,
  TrendCharts,
  FolderOpened,
  Right
} from '@element-plus/icons-vue'

const router = useRouter()

const features = [
  {
    title: '功能模块图',
    desc: '自动化构建系统全景视图，清晰展示层级化的业务逻辑与模块依赖。',
    icon: PieChart,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#6366f1',
    path: '/diagram-generator'
  },
  {
    title: '用例图生成',
    desc: '基于 PlantUML 引擎，一键转化文字描述为专业级系统交互图。',
    icon: TrendCharts,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#f59e0b',
    path: '/usecase-diagram'
  },
  {
    title: '架构图生成',
    desc: '可视化展示技术栈分层与数据流向，支持在线协作与模板快速套用。',
    icon: DataAnalysis,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    color: '#06b6d4',
    path: '/architecture-diagram'
  },
  {
    title: '数据库 E-R 图',
    desc: '将复杂的模型关系可视化，助力精准的数据库 Schema 设计与调优。',
    icon: FolderOpened,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#10b981',
    path: '/er-diagram'
  },
  {
    title: '参考文献处理',
    desc: '深度解析学术规范，毫秒级完成 DOI 匹配与文献引用格式转换。',
    icon: Document,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    color: '#ec4899',
    path: '/reference-processor'
  },
  {
    title: 'Markdown 转 Word',
    desc: '保持完美排版的一键导出功能，让您的技术文档瞬间转化为办公文档。',
    icon: DocumentCopy,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: '#8b5cf6',
    path: '/markdown-converter'
  }
]
</script>

<style scoped>
.home-page {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section Refined */
.hero-section {
  padding: 120px 0 100px;
  position: relative;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 80px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: white;
  border-radius: 99px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  margin-bottom: 40px;
}

.badge-dot {
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
}

.badge-text {
  font-size: 14px;
  font-weight: 800;
  color: #475569;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.hero-headline {
  font-size: clamp(3.5rem, 6vw, 4.8rem);
  font-weight: 950;
  line-height: 1;
  margin-bottom: 32px;
  letter-spacing: -2.5px;
  color: #0f172a;
}

.secondary-flow {
  background: linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtext {
  font-size: 20px;
  line-height: 1.7;
  color: #64748b;
  max-width: 640px;
  margin-bottom: 56px;
  font-weight: 500;
}

.hero-actions-container {
  display: flex;
  gap: 24px;
}

.premium-call-to-action {
  height: 64px !important;
  padding: 0 40px !important;
  font-size: 17px !important;
  border-radius: 20px !important;
  font-weight: 800 !important;
  background: var(--gradient-primary) !important;
  border: none !important;
  box-shadow: 0 15px 35px -10px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.5) !important;
}

.premium-secondary-action {
  height: 64px !important;
  padding: 0 40px !important;
  font-size: 17px !important;
  border-radius: 20px !important;
  font-weight: 800 !important;
  border: 1px solid #e2e8f0 !important;
  color: #1e293b !important;
  background: white !important;
}

/* Features Section */
.features-section {
  padding: 120px 0 160px;
}

.features-intro {
  text-align: center;
  margin-bottom: 80px;
}

.features-main-title {
  font-size: 40px;
  font-weight: 900;
  margin: 0 0 20px 0;
  color: #0f172a;
  letter-spacing: -1px;
}

.features-sub-desc {
  font-size: 18px;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 500;
  line-height: 1.6;
}

.feature-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 40px;
}

.modern-feature-card {
  position: relative;
  background: white;
  border-radius: 32px;
  padding: 48px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #f1f5f9;
  overflow: hidden;
  height: 100%;
}

.modern-feature-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 80px -20px rgba(0,0,0,0.08);
  border-color: rgba(59, 130, 246, 0.15);
}

.icon-orbit {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  padding: 5px;
  border: 1.5px solid transparent;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-feature-card:hover .icon-orbit {
  border-color: var(--orbit-color);
  transform: rotate(-8deg) scale(1.05);
}

.icon-core {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 12px 24px -6px rgba(0,0,0,0.12);
}

.feature-label {
  font-size: 24px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.feature-summary {
  font-size: 16px;
  line-height: 1.8;
  color: #64748b;
  margin-bottom: 40px;
}

.feature-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
  border-top: 1px solid #f8fafc;
}

.explore-text {
  font-size: 15px;
  font-weight: 800;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.mini-arrow-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #f8fafc;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

.modern-feature-card:hover .explore-text { color: #1e293b; }
.modern-feature-card:hover .mini-arrow-box {
  background: #0f172a;
  color: white;
  transform: translateX(6px);
}

@media (max-width: 1200px) {
  .hero-grid { gap: 40px; }
  .feature-matrix { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 1100px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-text-area { display: flex; flex-direction: column; align-items: center; }
  .hero-subtext { width: 100%; }
  .hero-visual-area { display: none; }
  .feature-matrix { gap: 32px; }
}

@media (max-width: 768px) {
  .hero-headline { font-size: 3rem; }
  .feature-matrix { grid-template-columns: 1fr; }
  .modern-feature-card { padding: 32px; }
  .features-section { padding: 80px 16px; }
}
</style>
