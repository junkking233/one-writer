<template>
  <div class="usecase-diagram-page animate-fade-in" style="--tool-gradient: var(--gradient-sun); --tool-color: #FF9F43;">
    <div class="page-header">
      <div class="title-section">
        <span class="tool-kicker">图片工具 · 模块 02</span>
        <h1 class="page-title">
          <el-icon class="title-icon"><TrendCharts /></el-icon>
          用例图 自动绘制
        </h1>
        <p class="page-subtitle">基于 PlantUML 引擎，将复杂的业务交互逻辑转化为专业级可视化用例图</p>
      </div>
      <div class="header-badge">
        <el-icon><MagicStick /></el-icon>
        <span>实时渲染</span>
      </div>
    </div>

    <div class="content-grid">
      <div class="editor-section">
        <div class="card-premium editor-card">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <span class="title-accent-bar"></span>
              <el-icon><Edit /></el-icon> 脚本编辑器
            </span>
            <div class="header-actions">
              <el-button @click="clearInput" class="round-btn">
                <el-icon><Delete /></el-icon> 清空
              </el-button>
              <el-button type="primary" @click="generateDiagram" :loading="generating" class="round-btn-primary">
                <el-icon><Promotion /></el-icon> 生成图表
              </el-button>
            </div>
          </div>

          <div class="textarea-wrapper">
            <el-input
              v-model="usecaseContent"
              type="textarea"
              :rows="18"
              placeholder="请输入 PlantUML 脚本内容..."
              class="premium-textarea"
            />
          </div>

          <div class="template-group">
            <h3 class="group-title">
              <span class="group-dot"></span>
              快捷模板
            </h3>
            <div class="template-wrapper">
              <el-button
                v-for="(example, index) in examples"
                :key="index"
                @click="loadExample(example)"
                class="template-btn"
                :style="{ '--t-gradient': templateGradients[index % templateGradients.length] }"
                ghost
              >
                <span class="template-index">{{ String(index + 1).padStart(2, '0') }}</span>
                {{ example.name }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <div class="card-premium preview-card">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <span class="title-accent-bar preview-bar"></span>
              <el-icon><View /></el-icon> 图表预览
            </span>
            <div class="header-actions" v-if="diagramUrl">
              <el-button @click="downloadDiagram" class="round-btn">
                <el-icon><Download /></el-icon> 下载
              </el-button>
              <el-button @click="copyToClipboard" class="round-btn">
                <el-icon><DocumentCopy /></el-icon> 链接
              </el-button>
            </div>
          </div>

          <div class="preview-canvas">
            <div v-if="!diagramUrl && !generating" class="empty-state">
              <div class="empty-icon-wrap">
                <el-icon :size="56"><Picture /></el-icon>
              </div>
              <h3 class="empty-title">等待生成您的专业图表</h3>
              <p class="empty-desc">在左侧编辑器中输入 PlantUML 脚本，点击生成即可预览</p>
            </div>

            <div v-if="generating" class="loader-box">
              <div class="loader-ring">
                <el-icon :size="40"><Loading /></el-icon>
              </div>
              <p>引擎正在处理您的请求...</p>
              <div class="loader-progress">
                <div class="loader-progress-bar"></div>
              </div>
            </div>

            <div v-if="diagramUrl && !generating" class="image-box">
              <el-image
                :src="diagramUrl"
                fit="contain"
                class="diagram-img"
                :preview-src-list="[diagramUrl]"
              >
                <template #placeholder>
                  <div class="img-loading">
                    <el-icon class="is-loading" :size="32"><Loading /></el-icon>
                    <span>加载中...</span>
                  </div>
                </template>
              </el-image>
            </div>
          </div>

          <el-alert
            v-if="error"
            :title="error"
            type="error"
            show-icon
            class="premium-alert"
          />
        </div>
      </div>
    </div>

    <div class="guide-section card-premium">
      <div class="guide-header">
        <div class="guide-icon">
          <el-icon><QuestionFilled /></el-icon>
        </div>
        <div class="guide-title-wrap">
          <h3>PlantUML 语法速查</h3>
          <p>常用语法示例，帮助您快速上手</p>
        </div>
      </div>
      <el-collapse class="premium-collapse">
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">
              <span class="collapse-num" style="--n-color: #10BFA3;">01</span>
              基础语法
            </span>
          </template>
          <div class="code-block">
            <pre><code>@startuml
actor 用户
usecase (用例名称)
用户 --> (用例名称)
@enduml</code></pre>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <span class="collapse-title">
              <span class="collapse-num" style="--n-color: #FF9F43;">02</span>
              关系定义 (Include/Extend)
            </span>
          </template>
          <div class="code-block">
            <pre><code>(用例A) .> (用例B) : &lt;&lt;include&gt;&gt;
(用例A) &lt;. (用例B) : &lt;&lt;extend&gt;&gt;</code></pre>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getPlantUMLUrl } from '../utils/plantuml'
import {
  TrendCharts,
  Edit,
  Promotion,
  View,
  Download,
  DocumentCopy,
  Picture,
  Loading,
  QuestionFilled,
  Delete,
  MagicStick
} from '@element-plus/icons-vue'

const usecaseContent = ref('')
const diagramUrl = ref('')
const generating = ref(false)
const error = ref('')

const templateGradients = [
  'linear-gradient(135deg, #10BFA3 0%, #31D18B 100%)',
  'linear-gradient(135deg, #FFD166 0%, #FF9F43 100%)',
  'linear-gradient(135deg, #43B5FF 0%, #1E73E8 100%)',
  'linear-gradient(135deg, #FF8D6B 0%, #FF5C48 100%)',
  'linear-gradient(135deg, #A3E635 0%, #22C55E 100%)'
]

const examples = [
  {
    name: '基础逻辑',
    content: `@startuml
left to right direction
actor 用户 as user
rectangle 系统 {
  usecase (登录系统) as UC1
  usecase (查看信息) as UC2
}
user --> UC1
user --> UC2
@enduml`
  },
  {
    name: '复合关系',
    content: `@startuml
actor 用户
usecase (购买商品) as UC1
usecase (登录验证) as UC2
用户 --> UC1
UC1 .> UC2 : <<include>>
@enduml`
  }
]

const loadExample = (ex: any) => {
  usecaseContent.value = ex.content
  ElMessage.success(`已加载模板: ${ex.name}`)
}

const clearInput = () => {
  usecaseContent.value = ''
  diagramUrl.value = ''
  error.value = ''
}

const generateDiagram = async () => {
  if (!usecaseContent.value.trim()) {
    ElMessage.warning('请输入脚本内容')
    return
  }
  generating.value = true
  error.value = ''
  try {
    const url = getPlantUMLUrl(usecaseContent.value)
    diagramUrl.value = url
    ElMessage.success('图表生成成功')
  } catch (err: any) {
    error.value = err.message || '生成图表时发生错误'
    ElMessage.error(error.value)
  } finally {
    generating.value = false
  }
}

const downloadDiagram = async () => {
  if (!diagramUrl.value) return
  try {
    const res = await fetch(diagramUrl.value)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `usecase-${Date.now()}.png`
    a.click()
    URL.revokeObjectURL(url)
    ElMessage.success('下载任务已开始')
  } catch { ElMessage.error('导出失败') }
}

const copyToClipboard = () => {
  if (diagramUrl.value) {
    navigator.clipboard.writeText(diagramUrl.value)
    ElMessage.success('图片链接已复制')
  }
}
</script>

<style scoped>
.usecase-diagram-page {
  max-width: 1400px;
  margin: 0 auto;
}

/* ========== 页面头部 ========== */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
  padding: 24px 28px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tool-color) 24%, transparent);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--tool-color) 11%, white), rgba(255, 255, 255, 0.84)),
    var(--gradient-page-bg);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.page-header::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -6%;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: var(--tool-gradient);
  opacity: 0.08;
  pointer-events: none;
}

.tool-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-text-link);
  font-size: 12px;
  font-weight: 800;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 8px 0 10px;
  color: var(--color-text-strong);
  font-size: 30px;
  font-weight: 900;
}

.title-icon {
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: var(--tool-gradient);
  color: white;
  font-size: 26px;
  box-shadow: 0 12px 24px color-mix(in srgb, var(--tool-color) 28%, transparent);
}

.page-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-full);
  background: var(--tool-gradient);
  color: white;
  font-size: 13px;
  font-weight: 900;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--tool-color) 30%, transparent);
  position: relative;
  z-index: 1;
}

/* ========== 内容网格 ========== */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

/* ========== 卡片 ========== */
.editor-card,
.preview-card {
  position: relative;
  overflow: hidden;
}

.editor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0.6;
}

.preview-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--tool-gradient);
  opacity: 0.6;
}

.card-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.card-title-premium {
  font-size: 17px;
  font-weight: 850;
  color: var(--color-text-strong);
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-accent-bar {
  display: block;
  width: 5px;
  height: 22px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
}

.title-accent-bar.preview-bar {
  background: var(--tool-gradient);
}

/* ========== 文本域 ========== */
.textarea-wrapper {
  position: relative;
}

.textarea-wrapper::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  opacity: 0.5;
  z-index: 2;
  transition: opacity var(--transition-fast);
}

.textarea-wrapper:focus-within::before {
  opacity: 1;
}

.premium-textarea :deep(.el-textarea__inner) {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px 16px 16px 20px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.7;
  background: rgba(247, 255, 252, 0.72);
  transition: all var(--transition-fast);
}

.premium-textarea :deep(.el-textarea__inner:focus) {
  background: rgba(247, 255, 252, 0.92);
  border-color: rgba(16, 191, 163, 0.4);
  box-shadow: 0 0 0 4px rgba(16, 191, 163, 0.08), 0 4px 16px rgba(16, 191, 163, 0.06);
}

/* ========== 模板按钮 ========== */
.template-group {
  margin-top: 22px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 800;
  color: var(--text-tertiary);
  text-transform: uppercase;
  margin-bottom: 14px;
  letter-spacing: 0.04em;
}

.group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gradient-primary);
}

.template-wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.template-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px 0 6px;
  height: 38px;
  border-radius: var(--radius-md);
  border: 1px solid color-mix(in srgb, var(--t-gradient, #10BFA3) 28%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--t-gradient, #10BFA3) 8%, white), rgba(255, 255, 255, 0.8));
  color: var(--color-text-strong);
  font-weight: 750;
  font-size: 13px;
  transition: all var(--transition-fast);
}

.template-btn:hover {
  border-color: color-mix(in srgb, var(--t-gradient, #10BFA3) 50%, transparent);
  box-shadow: 0 10px 22px color-mix(in srgb, var(--t-gradient, #10BFA3) 14%, transparent);
  transform: translateY(-2px);
}

.template-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 24px;
  border-radius: var(--radius-sm);
  background: var(--t-gradient);
  color: white;
  font-size: 11px;
  font-weight: 900;
  flex-shrink: 0;
}

/* ========== 预览画布 ========== */
.preview-canvas {
  min-height: 480px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), color-mix(in srgb, var(--tool-color) 6%, white));
  border: 1px dashed color-mix(in srgb, var(--tool-color) 28%, transparent);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.preview-canvas::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--tool-color) 8%, transparent) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, color-mix(in srgb, #10BFA3 6%, transparent) 0%, transparent 50%);
  pointer-events: none;
}

/* 空状态 */
.empty-state {
  text-align: center;
  position: relative;
  z-index: 1;
}

.empty-icon-wrap {
  display: inline-flex;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, color-mix(in srgb, var(--tool-color) 14%, white), rgba(255, 255, 255, 0.9));
  color: var(--tool-color);
  margin-bottom: 18px;
  box-shadow: 0 14px 32px color-mix(in srgb, var(--tool-color) 12%, transparent);
}

.empty-title {
  margin: 0 0 8px;
  color: var(--color-text-strong);
  font-size: 18px;
  font-weight: 800;
}

.empty-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
}

/* 加载状态 */
.loader-box {
  text-align: center;
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
}

.loader-ring {
  display: inline-flex;
  width: 72px;
  height: 72px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, color-mix(in srgb, var(--tool-color) 12%, white), rgba(255, 255, 255, 0.9));
  color: var(--tool-color);
  margin-bottom: 16px;
  box-shadow: 0 12px 28px color-mix(in srgb, var(--tool-color) 14%, transparent);
  animation: loaderPulse 2s ease-in-out infinite;
}

@keyframes loaderPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 12px 28px color-mix(in srgb, var(--tool-color) 14%, transparent); }
  50% { transform: scale(1.05); box-shadow: 0 16px 36px color-mix(in srgb, var(--tool-color) 22%, transparent); }
}

.loader-box p {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 16px;
  color: var(--color-text-strong);
}

.loader-progress {
  width: 160px;
  height: 4px;
  border-radius: var(--radius-full);
  background: rgba(17, 132, 116, 0.1);
  margin: 0 auto;
  overflow: hidden;
}

.loader-progress-bar {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--tool-gradient);
  animation: loaderSlide 1.4s ease-in-out infinite;
}

@keyframes loaderSlide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(200%); }
}

/* 图片展示 */
.image-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.diagram-img {
  max-width: 100%;
  max-height: 600px;
  border-radius: var(--radius-md);
  box-shadow: 0 24px 56px rgba(22, 68, 62, 0.14);
  cursor: zoom-in;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.diagram-img:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 28px 64px rgba(22, 68, 62, 0.18);
}

.img-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
}

/* ========== 警告 ========== */
.premium-alert {
  margin-top: 16px;
  border-radius: var(--radius-md);
}

/* ========== 按钮 ========== */
.round-btn {
  border-radius: var(--radius-md);
  font-weight: 700;
}

.round-btn-primary {
  border-radius: var(--radius-md);
  font-weight: 700;
  background: var(--tool-gradient);
  border: none;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--tool-color) 26%, transparent);
  transition: all var(--transition-fast);
}

.round-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 32px color-mix(in srgb, var(--tool-color) 34%, transparent);
}

/* ========== 底部指南 ========== */
.guide-section {
  padding: 28px 32px;
  position: relative;
  overflow: hidden;
}

.guide-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--gradient-primary), var(--tool-gradient), var(--gradient-sky), var(--gradient-coral), var(--gradient-grass));
  opacity: 0.5;
}

.guide-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.guide-icon {
  display: flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(16, 191, 163, 0.12), rgba(255, 209, 102, 0.12));
  color: var(--color-text-link);
  font-size: 22px;
}

.guide-title-wrap h3 {
  margin: 0 0 4px;
  color: var(--color-text-strong);
  font-size: 18px;
  font-weight: 900;
}

.guide-title-wrap p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
}

/* Collapse */
.premium-collapse :deep(.el-collapse-item__header) {
  height: 52px;
  font-size: 15px;
  font-weight: 750;
  color: var(--color-text-strong);
  border-bottom: 1px solid rgba(17, 132, 116, 0.1);
  transition: background var(--transition-fast);
  padding-left: 4px;
}

.premium-collapse :deep(.el-collapse-item__header:hover) {
  background: rgba(236, 248, 242, 0.5);
}

.premium-collapse :deep(.el-collapse-item__wrap) {
  background: transparent;
}

.premium-collapse :deep(.el-collapse-item__content) {
  padding-bottom: 16px;
}

.collapse-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.collapse-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 24px;
  border-radius: var(--radius-sm);
  background: var(--n-color);
  color: white;
  font-size: 12px;
  font-weight: 900;
  flex-shrink: 0;
}

/* 代码块 */
.code-block {
  background: linear-gradient(135deg, #063A35 0%, #0A4A42 100%);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  margin-top: 4px;
  position: relative;
  overflow: hidden;
}

.code-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #10BFA3, #FFD166, #43B5FF);
  opacity: 0.6;
}

.code-block pre {
  margin: 0;
  overflow-x: auto;
}

.code-block code {
  color: #E8F5F2;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.8;
}

/* ========== 响应式 ========== */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .title-icon {
    width: 40px;
    height: 40px;
    font-size: 22px;
  }

  .preview-canvas {
    min-height: 360px;
  }

  .guide-section {
    padding: 22px 20px;
  }

  .card-header-premium {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
