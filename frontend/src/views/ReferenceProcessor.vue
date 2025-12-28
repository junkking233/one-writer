<template>
  <div class="reference-processor-page animate-fade-in">
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title gradient-text-premium">
          <el-icon class="title-icon"><Document /></el-icon>
          参考文献 智能处理
        </h1>
        <p class="page-subtitle">批量处理参考文献，一键去除 DOI、编号及冗余信息，规范学术引用</p>
      </div>
    </div>

    <div class="content-grid">
      <div class="input-section">
        <div class="card-premium">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <el-icon><EditPen /></el-icon>
              输入文献
            </span>
            <div class="header-actions">
              <el-button @click="clearInput" class="round-btn">清空</el-button>
              <el-button type="primary" @click="processReferences" class="round-btn-primary">
                <el-icon><MagicStick /></el-icon> 开始处理
              </el-button>
            </div>
          </div>
          
          <el-input
            v-model="inputText"
            type="textarea"
            :rows="18"
            placeholder="请粘贴您的参考文献..."
            class="premium-textarea"
          />

          <div class="options-group">
            <h3 class="group-title">处理选项</h3>
            <div class="checkbox-wrapper">
              <el-checkbox-group v-model="options">
                <el-checkbox label="removeDOI" border size="large">去除 DOI</el-checkbox>
                <el-checkbox label="removeNumber" border size="large">去除编号</el-checkbox>
                <el-checkbox label="removeURL" border size="large">去除 URL</el-checkbox>
                <el-checkbox label="trimSpaces" border size="large">清理空格</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>

      <div class="output-section">
        <div class="card-premium">
          <div class="card-header-premium">
            <span class="card-title-premium">
              <el-icon><DocumentChecked /></el-icon>
              处理结果
            </span>
            <div class="header-actions" v-if="outputText">
              <el-button @click="copyOutput" class="round-btn">
                <el-icon><DocumentCopy /></el-icon> 复制
              </el-button>
              <el-button @click="downloadOutput" class="round-btn">
                <el-icon><Download /></el-icon> 下载
              </el-button>
            </div>
          </div>
          
          <div class="result-container">
            <el-empty v-if="!outputText" description="等待处理您的文献...">
              <template #image>
                <el-icon :size="80" class="empty-icon"><Document /></el-icon>
              </template>
            </el-empty>
            
            <el-input
              v-else
              v-model="outputText"
              type="textarea"
              :rows="18"
              readonly
              class="premium-textarea result-textarea"
            />
          </div>

          <div v-if="stats.total > 0" class="stats-preview animate-slide-down">
            <div class="stat-item">
              <span class="stat-label">总条数</span>
              <span class="stat-value">{{ stats.total }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">已处理</span>
              <span class="stat-value text-success">{{ stats.processed }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">处理率</span>
              <span class="stat-value">{{ stats.rate }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="guide-section card-premium">
      <h3 class="section-title">使用指南</h3>
      <div class="steps-grid">
        <div v-for="(step, index) in steps" :key="index" class="step-item">
          <div class="step-num">{{ index + 1 }}</div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Document,
  EditPen,
  MagicStick,
  DocumentChecked,
  DocumentCopy,
  Download
} from '@element-plus/icons-vue'

const inputText = ref('')
const outputText = ref('')
const options = ref(['removeDOI', 'removeNumber'])

const stats = ref({
  total: 0,
  processed: 0,
  rate: 0
})

const steps = [
  { title: '粘贴文献', description: '将需要处理的参考文献批量粘贴到左侧输入框。' },
  { title: '个性化选型', description: '根据需求选择是否保留 DOI、编号或清理多余空格。' },
  { title: '智能处理', description: '点击开始处理，系统将在毫秒内完成格式规范化。' },
  { title: '一键导出', description: '通过复制或下载，将规范后的文献直接应用到论文中。' }
]

const clearInput = () => {
  inputText.value = ''
  outputText.value = ''
  stats.value = { total: 0, processed: 0, rate: 0 }
}

const processReferences = () => {
  if (!inputText.value.trim()) {
    ElMessage.warning('请先输入参考文献')
    return
  }

  const lines = inputText.value.split('\n').filter(line => line.trim())
  let processed = lines.map(line => {
    let result = line
    if (options.value.includes('removeNumber')) {
      result = result.replace(/^\[\d+\]\s*/, '').replace(/^\d+\.\s*/, '')
    }
    if (options.value.includes('removeDOI')) {
      result = result.replace(/DOI:\s*[\d.\/a-zA-Z-]+/gi, '')
        .replace(/doi:\s*[\d.\/a-zA-Z-]+/gi, '')
        .replace(/https?:\/\/doi\.org\/[\d.\/a-zA-Z-]+/gi, '')
    }
    if (options.value.includes('removeURL')) {
      result = result.replace(/https?:\/\/[^\s]+/gi, '')
    }
    if (options.value.includes('trimSpaces')) {
      result = result.replace(/\s+/g, ' ').trim().replace(/\s+([.,;:])/g, '$1')
    }
    return result
  })

  outputText.value = processed.join('\n')
  stats.value = { total: lines.length, processed: processed.length, rate: 100 }
  ElMessage.success('智能处理完成')
}

const copyOutput = () => {
  if (outputText.value) {
    navigator.clipboard.writeText(outputText.value)
    ElMessage.success('结果已复制到剪贴板')
  }
}

const downloadOutput = () => {
  if (outputText.value) {
    const blob = new Blob([outputText.value], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `processed-references-${new Date().getTime()}.txt`
    link.click()
    URL.revokeObjectURL(url)
    ElMessage.success('文件下载成功')
  }
}
</script>

<style scoped>
.reference-processor-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  font-size: 40px;
  color: var(--primary-color);
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
  margin: 0;
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
  transition: all var(--transition-fast);
}

.premium-textarea :deep(.el-textarea__inner:focus) {
  background: white;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
}

.options-group {
  margin-top: 24px;
}

.group-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.checkbox-wrapper :deep(.el-checkbox) {
  margin-right: 12px;
  margin-bottom: 12px;
  border-radius: 10px;
}

.result-container {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.empty-icon {
  color: #e2e8f0;
}

.stats-preview {
  margin-top: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
  display: flex;
  justify-content: space-around;
  border: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
}

.text-success { color: var(--secondary-color); }

.round-btn {
  border-radius: 10px;
  font-weight: 600;
}

.round-btn-primary {
  border-radius: 10px;
  font-weight: 600;
  background: var(--gradient-primary);
  border: none;
}

.guide-section {
  padding: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 32px 0;
  text-align: center;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.step-num {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: var(--primary-light);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 4px 12px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2);
}

.step-content h4 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.step-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 1200px) {
  .content-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .steps-grid { grid-template-columns: 1fr; }
}
</style>
