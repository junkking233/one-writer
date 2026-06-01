<template>
  <div class="home-page animate-fade-in">
    <section class="hero-section container">
      <div class="hero-copy">
        <span class="hero-eyebrow">
          <span class="badge-dot"></span>
          OneWriter 学术工具台
        </span>
        <h1 class="hero-headline">图表、文献和文档转换集中处理</h1>
        <p class="hero-subtext">
          保留高频论文辅助能力，入口更少、层级更清楚，打开后就能直接进入生成、处理和导出流程。
        </p>
        <div class="hero-module-strip">
          <button
            v-for="feature in features"
            :key="feature.title"
            type="button"
            class="module-chip"
            :style="{ '--feature-gradient': feature.gradient, '--feature-color': feature.color }"
            @click="router.push(feature.path)"
          >
            <span>{{ feature.index }}</span>
            {{ feature.shortTitle }}
          </button>
        </div>
        <div class="hero-actions-container">
          <el-button type="primary" size="large" @click="router.push('/diagram-generator')" class="hero-primary-action">
            <el-icon><PieChart /></el-icon>
            功能模块图
          </el-button>
          <el-button size="large" @click="router.push('/reference-processor')" class="hero-secondary-action">
            <el-icon><Document /></el-icon>
            处理参考文献
          </el-button>
        </div>
      </div>

      <div class="hero-workspace">
        <div class="workspace-brand">
          <img src="/favicon.png" alt="OneWriter" class="workspace-logo" />
          <div>
            <span>OneWriter</span>
            <strong>论文效率面板</strong>
          </div>
        </div>
        <div class="workspace-list">
          <button
            v-for="feature in features.slice(0, 4)"
            :key="feature.title"
            type="button"
            class="workspace-row"
            :style="{ '--feature-gradient': feature.gradient, '--feature-color': feature.color }"
            @click="router.push(feature.path)"
          >
            <span class="row-index">{{ feature.index }}</span>
            <span class="row-title">{{ feature.title }}</span>
            <el-icon><Right /></el-icon>
          </button>
        </div>
      </div>
    </section>

    <section class="features-section container">
      <div class="features-intro">
        <div>
          <span class="section-kicker">保留模块</span>
          <h2 class="features-main-title">五个核心入口</h2>
        </div>
        <p class="features-sub-desc">按论文制作流程重新编排，减少无关模块干扰。</p>
      </div>

      <div class="feature-matrix">
        <button
          v-for="feature in features"
          :key="feature.title"
          type="button"
          class="modern-feature-card"
          :style="{ '--feature-gradient': feature.gradient, '--feature-color': feature.color }"
          @click="router.push(feature.path)"
        >
          <span class="module-index">{{ feature.index }}</span>
          <div class="feature-card-top">
            <div class="icon-core">
              <el-icon :size="26"><component :is="feature.icon" /></el-icon>
            </div>
            <span v-if="feature.tag" class="gift-tag">{{ feature.tag }}</span>
          </div>
          <div class="feature-text-block">
            <h3 class="feature-label">{{ feature.title }}</h3>
            <p class="feature-summary">{{ feature.desc }}</p>
          </div>
          <div class="feature-footer">
            <span>进入模块</span>
            <el-icon><Right /></el-icon>
          </div>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  PieChart,
  TrendCharts,
  Document,
  DocumentCopy,
  Link,
  Right
} from '@element-plus/icons-vue'

const router = useRouter()

const features = [
  {
    index: '01',
    title: '功能模块图',
    desc: '打开在线模块图工具，快速整理系统结构、业务分层和模块关系。',
    shortTitle: '模块图',
    icon: PieChart,
    gradient: 'var(--gradient-primary)',
    color: '#10BFA3',
    path: '/diagram-generator'
  },
  {
    index: '02',
    title: '用例图生成',
    desc: '通过 PlantUML 脚本生成用例图，适合论文设计章节和系统说明。',
    shortTitle: '用例图',
    icon: TrendCharts,
    gradient: 'var(--gradient-sun)',
    color: '#FF9F43',
    path: '/usecase-diagram-generator'
  },
  {
    index: '03',
    title: '参考文献处理',
    desc: '批量去除 DOI、编号、URL 和多余空格，让引用列表更规整。',
    shortTitle: '文献',
    icon: Document,
    gradient: 'var(--gradient-sky)',
    color: '#1E73E8',
    path: '/reference-processor'
  },
  {
    index: '04',
    title: 'Markdown 转 Word',
    desc: '将 Markdown 内容渲染预览并导出为 Word、HTML 或 PDF。',
    shortTitle: '转 Word',
    icon: DocumentCopy,
    gradient: 'var(--gradient-coral)',
    color: '#FF5C48',
    tag: '免费赠送',
    path: '/markdown-converter'
  },
  {
    index: '05',
    title: '相关链接',
    desc: '集中保存论文写作、查重、文档处理、数据分析和图表工具。',
    shortTitle: '链接',
    icon: Link,
    gradient: 'var(--gradient-grass)',
    color: '#22C55E',
    path: '/tool-links'
  }
]
</script>

<style scoped>
.home-page {
  width: 100%;
  overflow-x: hidden;
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430px;
  align-items: stretch;
  gap: 28px;
  padding: 24px 0 36px;
}

.hero-copy,
.hero-workspace {
  min-height: 420px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.hero-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 54px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 255, 252, 0.82) 54%, rgba(255, 243, 222, 0.72) 100%);
}

.hero-copy::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(16, 191, 163, 0.12), transparent 22%),
    linear-gradient(150deg, transparent 52%, rgba(255, 209, 102, 0.22) 68%, transparent 84%),
    linear-gradient(35deg, transparent 0 58%, rgba(67, 181, 255, 0.13) 58% 72%, transparent 72%),
    linear-gradient(118deg, transparent 0 70%, rgba(255, 92, 72, 0.13) 70% 82%, transparent 82%);
  pointer-events: none;
}

.hero-copy > * {
  position: relative;
  z-index: 1;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: rgba(236, 248, 242, 0.88);
  color: var(--color-text-link);
  font-size: 14px;
  font-weight: 800;
}

.badge-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--gradient-primary);
  box-shadow: 0 0 0 5px rgba(16, 191, 163, 0.12);
}

.hero-headline {
  max-width: 760px;
  margin: 24px 0 20px;
  background: linear-gradient(112deg, #063A35 0%, #063A35 44%, #1E73E8 58%, #FF5C48 76%, #22C55E 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-size: 52px;
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: 0;
}

.hero-subtext {
  max-width: 680px;
  margin: 0 0 22px;
  color: var(--text-secondary);
  font-size: 18px;
  font-weight: 560;
}

.hero-module-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  max-width: 760px;
  margin-bottom: 28px;
}

.module-chip {
  display: flex;
  min-width: 0;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 10px;
  border: 1px solid color-mix(in srgb, var(--feature-color) 28%, transparent);
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, color-mix(in srgb, var(--feature-color) 10%, white), rgba(255, 255, 255, 0.76));
  color: var(--color-text-strong);
  cursor: pointer;
  font-size: 13px;
  font-weight: 900;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.module-chip span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 24px;
  flex: 0 0 auto;
  border-radius: var(--radius-sm);
  background: var(--feature-gradient);
  color: white;
  font-size: 12px;
}

.module-chip:hover {
  border-color: color-mix(in srgb, var(--feature-color) 48%, transparent);
  box-shadow: 0 12px 24px color-mix(in srgb, var(--feature-color) 14%, transparent);
  transform: translateY(-2px);
}

.hero-actions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-primary-action,
.hero-secondary-action {
  height: 48px;
  padding: 0 22px;
  border-radius: var(--radius-md);
}

.hero-secondary-action {
  border-color: rgba(67, 181, 255, 0.26);
  color: #1E73E8;
  background: linear-gradient(135deg, rgba(67, 181, 255, 0.1), rgba(255, 255, 255, 0.9));
}

.hero-workspace {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(236, 248, 242, 0.76)),
    linear-gradient(135deg, rgba(16, 191, 163, 0.1), rgba(255, 209, 102, 0.1) 42%, rgba(255, 92, 72, 0.08) 70%, rgba(34, 197, 94, 0.1));
}

.workspace-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--border-color);
}

.workspace-logo {
  width: 72px;
  height: 72px;
  object-fit: cover;
  object-position: center;
  border-radius: var(--radius-md);
  border: 1px solid rgba(17, 132, 116, 0.16);
  background: white;
}

.workspace-brand span {
  display: block;
  color: var(--text-tertiary);
  font-size: 13px;
  font-weight: 800;
}

.workspace-brand strong {
  display: block;
  color: var(--color-text-strong);
  font-size: 22px;
  line-height: 1.25;
}

.workspace-list {
  display: grid;
  gap: 12px;
}

.workspace-row {
  display: grid;
  grid-template-columns: 46px 1fr 18px;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 58px;
  padding: 12px 14px;
  border: 1px solid rgba(17, 132, 116, 0.14);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text);
  cursor: pointer;
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.workspace-row::before {
  content: '';
  width: 4px;
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--feature-gradient);
}

.workspace-row {
  grid-template-columns: 4px 46px 1fr 18px;
}

.workspace-row:hover {
  border-color: color-mix(in srgb, var(--feature-color) 44%, transparent);
  box-shadow: 0 14px 28px rgba(22, 68, 62, 0.1);
  transform: translateY(-2px);
}

.row-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: var(--feature-gradient);
  color: white;
  font-weight: 900;
}

.row-title {
  overflow: hidden;
  color: var(--color-text-strong);
  font-size: 15px;
  font-weight: 800;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.features-section {
  padding: 18px 0 72px;
}

.features-intro {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.section-kicker {
  color: var(--color-text-link);
  font-size: 13px;
  font-weight: 900;
}

.features-main-title {
  margin: 6px 0 0;
  color: var(--color-text-strong);
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 0;
}

.features-sub-desc {
  max-width: 380px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 15px;
  text-align: right;
}

.feature-matrix {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.modern-feature-card {
  position: relative;
  display: flex;
  min-height: 276px;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.modern-feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, color-mix(in srgb, var(--feature-color) 12%, transparent), transparent 46%);
  opacity: 0.8;
  pointer-events: none;
}

.modern-feature-card:hover {
  border-color: color-mix(in srgb, var(--feature-color) 42%, transparent);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.module-index {
  position: absolute;
  top: 18px;
  right: 18px;
  color: color-mix(in srgb, var(--feature-color) 62%, white);
  font-size: 38px;
  font-weight: 900;
  line-height: 1;
  opacity: 0.28;
}

.feature-card-top,
.feature-text-block,
.feature-footer {
  position: relative;
  z-index: 1;
}

.feature-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.icon-core {
  display: flex;
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--feature-gradient);
  color: white;
  box-shadow: 0 16px 28px color-mix(in srgb, var(--feature-color) 28%, transparent);
}

.gift-tag {
  padding: 5px 9px;
  border-radius: var(--radius-full);
  background: var(--gradient-coral);
  color: white;
  font-size: 12px;
  font-weight: 900;
}

.feature-label {
  margin: 28px 0 10px;
  color: var(--color-text-strong);
  font-size: 20px;
  font-weight: 900;
}

.feature-summary {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.feature-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(17, 132, 116, 0.12);
  color: var(--color-text-link);
  font-size: 14px;
  font-weight: 900;
}

@media (max-width: 1200px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .feature-matrix {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .hero-copy {
    padding: 36px;
  }

  .hero-headline {
    font-size: 40px;
  }

  .features-intro {
    align-items: flex-start;
    flex-direction: column;
  }

  .features-sub-desc {
    text-align: left;
  }

  .feature-matrix {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-module-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .hero-copy,
  .hero-workspace {
    min-height: auto;
  }

  .hero-copy {
    padding: 28px 20px;
  }

  .hero-headline {
    font-size: 32px;
  }

  .hero-subtext {
    font-size: 16px;
  }

  .hero-actions-container .el-button {
    width: 100%;
  }

  .hero-module-strip {
    grid-template-columns: 1fr 1fr;
  }

  .feature-matrix {
    grid-template-columns: 1fr;
  }
}
</style>
