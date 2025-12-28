<template>
  <div class="usecase-diagram-page animate-fade-in">
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title gradient-text-premium secondary">
          <el-icon class="title-icon"><TrendCharts /></el-icon>
          用例图 自动绘制
        </h1>
        <p class="page-subtitle">基于 PlantUML 引擎，将复杂的业务交互逻辑转化为专业级可视化用例图</p>
      </div>
    </div>

    <div class="content-grid">
      <div class="editor-section">
        <div class="card-premium">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <el-icon><Edit /></el-icon> 脚本编辑器
            </span>
            <div class="header-actions">
              <el-button @click="clearInput" class="round-btn">清空</el-button>
              <el-button type="primary" @click="generateDiagram" :loading="generating" class="round-btn-primary">
                <el-icon><Promotion /></el-icon> 生成图表
              </el-button>
            </div>
          </div>
          
          <el-input
            v-model="usecaseContent"
            type="textarea"
            :rows="18"
            placeholder="请输入 PlantUML 脚本内容..."
            class="premium-textarea"
          />

          <div class="template-group">
            <h3 class="group-title">快捷模板</h3>
            <div class="template-wrapper">
              <el-button
                v-for="(example, index) in examples"
                :key="index"
                @click="loadExample(example)"
                class="template-btn"
                ghost
              >
                {{ example.name }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <div class="card-premium">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <el-icon><View /></el-icon> 图影预览
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
          
          <div class="preview-canvas glass">
            <el-empty v-if="!diagramUrl && !generating" description="等待生成您的专业图表">
              <template #image>
                <el-icon :size="80" class="empty-icon"><Picture /></el-icon>
              </template>
            </el-empty>
            
            <div v-if="generating" class="loader-box">
              <el-icon class="is-loading" :size="48" color="var(--primary-color)"><Loading /></el-icon>
              <p>引擎正在处理您的请求...</p>
            </div>
            
            <div v-if="diagramUrl && !generating" class="image-box">
              <el-image 
                :src="diagramUrl" 
                fit="contain" 
                class="diagram-img"
                :preview-src-list="[diagramUrl]"
              >
                <template #placeholder>
                  <div class="img-loading">加载中...</div>
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
        <el-icon><QuestionFilled /></el-icon>
        <span>PlantUML 语法速查</span>
      </div>
      <el-collapse class="premium-collapse">
        <el-collapse-item title="基础语法" name="1">
          <div class="code-block">
            <pre><code>@startuml
actor 用户
usecase (用例名称)
用户 --> (用例名称)
@enduml</code></pre>
          </div>
        </el-collapse-item>
        <el-collapse-item title="关系定义 (Include/Extend)" name="2">
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
  QuestionFilled
} from '@element-plus/icons-vue'

const usecaseContent = ref('')
const diagramUrl = ref('')
const generating = ref(false)
const error = ref('')

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
    // 直接在前端生成 PlantUML URL，不再需要调用后端 API
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

.page-header {
  margin-bottom: 40px;
}

.secondary {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-title {
  font-size: 32px;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon { font-size: 40px; color: #f97316; }

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

.card-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-title-premium {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.premium-textarea :deep(.el-textarea__inner) {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  background: #f8fafc;
}

.template-group { margin-top: 24px; }

.group-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.template-wrapper { display: flex; gap: 12px; flex-wrap: wrap; }

.template-btn { border-radius: 10px; font-weight: 600; }

.preview-canvas {
  min-height: 480px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.5);
  border: 1px dashed var(--border-color);
  padding: 24px;
}

.loader-box { text-align: center; color: var(--text-secondary); }

.image-box { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }

.diagram-img {
  max-width: 100%;
  max-height: 600px;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  cursor: zoom-in;
}

.premium-alert { margin-top: 20px; border-radius: 12px; }

.guide-section { padding: 32px; }

.guide-header {
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.code-block { background: #0f172a; border-radius: 12px; padding: 16px; margin-top: 12px; }

.code-block code { color: #f8fafc; font-family: monospace; font-size: 14px; }

.round-btn { border-radius: 10px; font-weight: 600; }

.round-btn-primary { border-radius: 10px; font-weight: 600; background: var(--gradient-primary); border: none; }

@media (max-width: 1200px) { .content-grid { grid-template-columns: 1fr; } }
</style>
