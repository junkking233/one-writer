<template>
  <div class="markdown-converter-page animate-fade-in">
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title gradient-text-premium indigo">
          <el-icon class="title-icon"><DocumentCopy /></el-icon>
          Markdown 智能转 Word
        </h1>
        <p class="page-subtitle">毫秒级转换，保持完美排版，支持自定义模板导出</p>
      </div>
    </div>

    <div class="content-grid">
      <div class="editor-section">
        <div class="card-premium">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <el-icon><Edit /></el-icon> 文本编辑器
            </span>
            <div class="header-actions">
              <el-upload
                :before-upload="handleFileUpload"
                :show-file-list="false"
                accept=".md,.markdown,.txt"
              >
                <el-button class="round-btn">
                  <el-icon><Upload /></el-icon>
                  上传
                </el-button>
              </el-upload>
              <el-button @click="clearContent" class="round-btn">
                <el-icon><Delete /></el-icon>
                清空
              </el-button>
            </div>
          </div>
          
          <el-input
            v-model="markdownContent"
            type="textarea"
            :rows="20"
            placeholder="在此键入 Markdown 文档..."
            class="premium-textarea"
          />

          <div class="template-group">
            <h3 class="group-title">快捷预设</h3>
            <div class="template-wrapper">
              <el-button
                v-for="(template, index) in templates"
                :key="index"
                @click="loadTemplate(template)"
                class="template-btn"
                ghost
              >
                {{ template.name }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section">
        <div class="card-premium">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <el-icon><View /></el-icon> 实时排版预览
            </span>
            <div class="header-actions">
              <el-radio-group v-model="previewMode" size="small" class="premium-radio">
                <el-radio-button label="preview">渲染</el-radio-button>
                <el-radio-button label="html">代码</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          
          <div class="preview-canvas glass">
            <el-empty v-if="!markdownContent" description="等待解析您的文档">
              <template #image>
                <el-icon :size="80" class="empty-icon"><Document /></el-icon>
              </template>
            </el-empty>
            
            <div v-else-if="previewMode === 'preview'" class="markdown-body" v-html="renderedHtml"></div>
            
            <el-input
              v-else
              v-model="renderedHtml"
              type="textarea"
              :rows="20"
              readonly
              class="html-viewer"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="export-zone card-premium">
      <div class="export-header">
        <div class="export-info">
          <h3 class="export-title">
            <el-icon><Download /></el-icon> 导出与分发
          </h3>
          <p class="export-desc">一键转换至主流文档格式，确保跨平台兼容性</p>
        </div>
        <div class="export-actions">
          <el-button
            type="primary"
            size="large"
            @click="exportAsWord"
            class="action-btn-primary indigo-bg"
            :disabled="!markdownContent"
          >
            <el-icon><DocumentCopy /></el-icon> 导出为 Word
          </el-button>
          <el-button
            size="large"
            @click="exportAsHtml"
            class="action-btn"
            :disabled="!markdownContent"
          >
            <el-icon><Document /></el-icon> 导出 HTML
          </el-button>
          <el-button
            size="large"
            @click="exportAsPdf"
            class="action-btn"
            :disabled="!markdownContent"
          >
            <el-icon><Tickets /></el-icon> 转换为 PDF
          </el-button>
        </div>
      </div>
    </div>

    <div class="syntax-guide-section card-premium">
      <div class="guide-header">
        <el-icon><QuestionFilled /></el-icon>
        <span>Markdown 语法指南</span>
      </div>
      
      <el-collapse class="premium-collapse">
        <el-collapse-item
          v-for="(syntax, index) in syntaxGuide"
          :key="index"
          :title="syntax.title"
          :name="index"
        >
          <div class="guide-grid">
            <div class="syntax-box">
              <span class="label">代码</span>
              <pre><code>{{ syntax.syntax }}</code></pre>
            </div>
            <div class="output-box">
              <span class="label">解析效果</span>
              <div class="output-content" v-html="syntax.result"></div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  DocumentCopy,
  Edit,
  Upload,
  Delete,
  Document,
  View,
  Download,
  Tickets,
  QuestionFilled
} from '@element-plus/icons-vue'

const markdownContent = ref('')
const previewMode = ref<'preview' | 'html'>('preview')

const templates = [
  {
    name: '学术论文',
    content: `# 论文标题\n\n## 摘要\n这里是摘要内容...\n\n## 1. 引言\n这里是引言内容...\n\n## 2. 方法\n这里是方法描述...\n\n## 参考文献\n[1] 文献 A`
  },
  {
    name: '项目报告',
    content: `# 项目报告\n\n**日期：** 2024-01-01\n**作者：** OneWriter\n\n## 核心目标\n- 目标 1\n- 目标 2`
  }
]

const syntaxGuide = [
  {
    title: '标题体系',
    syntax: '# 一级\n## 二级\n### 三级',
    result: '<h1>一级</h1><h2>二级</h2><h3>三级</h3>'
  },
  {
    title: '文本强化',
    syntax: '**粗体** *斜体* ~~删除~~',
    result: '<strong>粗体</strong> <em>斜体</em> <del>删除</del>'
  }
]

// 简单的Markdown渲染（实际项目中应使用marked或markdown-it库）
const renderedHtml = computed(() => {
  let html = markdownContent.value
  
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 粗体和斜体
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')
  
  // 链接
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
  
  // 列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  // html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>') // This line was removed/changed in the new version
  
  // 段落
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  
  return html
})

const loadTemplate = (t: any) => {
  markdownContent.value = t.content
  ElMessage.success(`已加载模板: ${t.name}`)
}

const clearContent = () => (markdownContent.value = '')

const handleFileUpload = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    markdownContent.value = e.target?.result as string
    ElMessage.success('文档载入成功')
  }
  reader.readAsText(file)
  return false
}

const exportAsWord = () => {
  // 实际项目中应使用docx库或调用后端API
  const blob = new Blob([renderedHtml.value], { type: 'application/msword' })
  downloadFile(blob, 'export.doc')
  ElMessage.success('Word 导出成功')
}

const exportAsHtml = () => {
  const blob = new Blob([renderedHtml.value], { type: 'text/html' })
  downloadFile(blob, 'export.html')
  ElMessage.success('HTML 导出成功')
}

const exportAsPdf = () => {
  ElMessage.info('正在调用系统打印功能生成 PDF...')
  window.print()
}

const downloadFile = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.markdown-converter-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header { margin-bottom: 40px; }

.indigo {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.indigo-bg {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4) !important;
}

.page-title {
  font-size: 32px;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon { font-size: 40px; color: #6366f1; }

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
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  background: #f8fafc;
}

.template-group { margin-top: 24px; }

.group-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.template-wrapper { display: flex; gap: 12px; flex-wrap: wrap; }

.template-btn { border-radius: 10px; font-weight: 600; }

.premium-radio :deep(.el-radio-button__inner) {
  border-radius: 8px !important;
  margin-left: 4px;
  border: 1px solid var(--border-color) !important;
}

.preview-canvas {
  min-height: 520px;
  border-radius: 16px;
  background: white;
  padding: 32px;
  border: 1px solid var(--border-color);
  overflow-y: auto;
}

.markdown-body { line-height: 1.8; color: var(--text-primary); }

.markdown-body :deep(h1) { font-size: 28px; margin-bottom: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px; }

.markdown-body :deep(h2) { font-size: 22px; margin: 20px 0 12px; }

.markdown-body :deep(p) { margin: 12px 0; }

.html-viewer :deep(.el-textarea__inner) {
  background: #1e293b;
  color: #94a3b8;
  font-family: monospace;
}

.export-zone { padding: 32px; margin-bottom: 40px; }

.export-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }

.export-title { font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }

.export-desc { color: var(--text-secondary); margin: 0; font-size: 14px; }

.export-actions { display: flex; gap: 16px; }

.action-btn-primary { border-radius: 12px; font-weight: 700; height: 50px; padding: 0 28px; transition: all var(--transition-base); }

.action-btn { border-radius: 12px; font-weight: 600; height: 50px; padding: 0 24px; }

.syntax-guide-section { padding: 32px; }

.guide-header { font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }

.guide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 12px; }

.syntax-box pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 12px; }

.output-content { background: #f8fafc; border: 1px solid var(--border-color); padding: 16px; border-radius: 12px; height: 100%; }

.label { font-size: 12px; font-weight: 800; color: var(--text-tertiary); margin-bottom: 8px; display: block; }

.round-btn { border-radius: 10px; font-weight: 600; }

@media (max-width: 1200px) {
  .content-grid { grid-template-columns: 1fr; }
  .export-header { flex-direction: column; align-items: flex-start; }
}
</style>
