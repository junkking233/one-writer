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
                <el-checkbox label="convertQuotes" border size="large">英文引号转中文</el-checkbox>
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

    <div class="sync-section card-premium">
      <div class="sync-header">
        <div>
          <h3 class="section-title inline-title">转链工具与规则同步</h3>
          <p class="section-desc">已同步飞书 Wiki 中的文献清洗规则和常用参考文献格式示例。</p>
        </div>
        <div class="tool-links">
          <el-button
            v-for="tool in linkTools"
            :key="tool.url"
            class="link-tool-btn"
            @click="openLinkTool(tool.url)"
          >
            <el-icon><LinkIcon /></el-icon>
            {{ tool.title }}
            <el-icon><TopRight /></el-icon>
          </el-button>
        </div>
      </div>

      <div class="rules-grid">
        <div v-for="rule in referenceRules" :key="rule.title" class="rule-card">
          <span class="rule-name">{{ rule.title }}</span>
          <div class="rule-code">{{ rule.find }}</div>
          <p v-if="rule.replace" class="rule-replace">替换为：{{ rule.replace }}</p>
          <p class="rule-desc">{{ rule.description }}</p>
        </div>
      </div>

      <div class="examples-area">
        <h3 class="section-title examples-title">参考文献格式示例</h3>
        <div class="examples-grid">
          <div v-for="group in referenceExamples" :key="group.type" class="example-card">
            <div class="example-card-header">
              <span class="example-type">{{ group.type }}</span>
              <span class="example-format">{{ group.format }}</span>
            </div>
            <ul class="example-list">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
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
  Download,
  Link as LinkIcon,
  TopRight
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

const linkTools = [
  {
    title: '参考文献处理工具',
    url: 'https://my.feishu.cn/wiki/JdukwCNzhiji7Ikad3PcMW2Wn8b?from=from_copylink'
  },
  {
    title: '参考文献工具',
    url: 'https://my.feishu.cn/wiki/O4ixw1qL0ixMgckrIQjcbFEnnKb?from=from_copylink'
  }
]

const referenceRules = [
  {
    title: '去除文献列表标号',
    find: String.raw`\[\d+\]`,
    description: '匹配并删除 [1]、[12] 等参考文献编号。'
  },
  {
    title: '去除 DOI',
    find: String.raw`DOI:\d{2}\.\d{4,9}/[a-zA-Z0-9.-]+(?:/[a-zA-Z0-9.-]+)*`,
    description: '匹配并删除 DOI:10.1234/abc.def 等 DOI 信息。'
  },
  {
    title: '英文双引号改中文双引号',
    find: String.raw`"([^"]*)"`,
    replace: '“\\1”',
    description: '把英文双引号包裹的内容转换为中文引号。'
  }
]

const referenceExamples = [
  {
    type: '图书 [M]',
    format: '作者.书名[M].出版社:出版年.',
    items: [
      '鲁迅.药[M].上海人民美术出版社:1979.',
      '鲁迅.狂人日记[M].河北教育出版社:2003.',
      '中华人民共和国教育部.3~6岁儿童学习与发展指南[M].首都师范大学出版社:2022.'
    ]
  },
  {
    type: '网页 [EB/OL]',
    format: '作者/机构.文献标题[EB/OL].(发布日期).网址.',
    items: [
      '搜狐.全球奢侈品王国LVMH的碳中和实践[EB/OL].(2022-08-05).https://www.sohu.com/a/574456683_121422968.',
      '银川晚报.三顿半的“返航计划”又来咯[EB/OL].(2024-06-21).https://szb.ycfbapp.com/ycwb/pad/con/202406/21/content_57129.html.',
      '凉山彝族自治州人民政府.《凉山州人民政府关于印发<凉山州“十四五”文化和旅游发展规划>的通知》的解读[EB/OL].(2023-01-10).https://www.lsz.gov.cn/xxgk/zcwj/alxck_47018/xdfz_47032/202301/t20230110_2415080.html.'
    ]
  },
  {
    type: '报告 [R/OL]',
    format: '作者/机构.报告标题[R/OL].(发布日期).网址.',
    items: [
      '中国信通院.数字乡村发展研究报告-逻辑架构、突破重点与可持续模式探索[R/OL].(2024-09-04).http://www.zcsvillages.com/upload/2024/0904/aa3c3600-d5b1-4692-8d56-ba76e33f1eb0.pdf.',
      '东莞市石排镇人民政府.石排镇中心幼儿园：品质承载成长，游戏点亮童年[R/OL].(2024-04-28).https://www.dg.gov.cn/dgspz/gkmlpt/content/4/4195/post_4195419.html.'
    ]
  }
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
    if (options.value.includes('convertQuotes')) {
      result = result.replace(/"([^"]*)"/g, '“$1”')
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

const openLinkTool = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.reference-processor-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 28px;
  padding: 22px 24px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-sm);
}

.page-title {
  font-size: 30px;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--gradient-sky);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-icon {
  font-size: 40px;
  color: var(--sky-color);
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
  color: var(--color-text-strong);
  display: flex;
  align-items: center;
  gap: 10px;
}

.premium-textarea :deep(.el-textarea__inner) {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  background: rgba(247, 255, 252, 0.82);
  transition: all var(--transition-fast);
}

.premium-textarea :deep(.el-textarea__inner:focus) {
  background: white;
  border-color: var(--sky-color);
  box-shadow: 0 0 0 4px rgba(67, 181, 255, 0.14);
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
  color: rgba(30, 115, 232, 0.18);
}

.stats-preview {
  margin-top: 24px;
  padding: 20px;
  background: rgba(236, 248, 242, 0.68);
  border-radius: var(--radius-lg);
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
  color: var(--color-text-strong);
}

.text-success { color: var(--secondary-color); }

.round-btn {
  border-radius: var(--radius-md);
  font-weight: 600;
}

.el-button.round-btn-primary {
  border-radius: var(--radius-md);
  font-weight: 600;
  background: var(--gradient-sky);
  border: none;
}

.sync-section {
  margin-bottom: 40px;
  padding: 32px;
}

.sync-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.inline-title {
  margin-bottom: 6px;
  text-align: left;
}

.section-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.tool-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.link-tool-btn {
  min-height: 40px;
  border-radius: var(--radius-md);
  font-weight: 700;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.rule-card,
.example-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: rgba(247, 255, 252, 0.7);
}

.rule-card {
  padding: 18px;
}

.rule-name {
  display: block;
  margin-bottom: 10px;
  color: var(--color-text-strong);
  font-size: 15px;
  font-weight: 800;
}

.rule-code {
  overflow-x: auto;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  background: var(--color-text-strong);
  color: #F7FFFC;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  white-space: nowrap;
}

.rule-replace {
  margin: 10px 0 0;
  color: var(--color-text-link);
  font-size: 13px;
  font-weight: 700;
}

.rule-desc {
  margin: 10px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.examples-title {
  margin-bottom: 16px;
  text-align: left;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.example-card {
  overflow: hidden;
}

.example-card-header {
  padding: 16px 18px;
  background: linear-gradient(135deg, rgba(67, 181, 255, 0.14), rgba(16, 191, 163, 0.1));
  border-bottom: 1px solid var(--border-color);
}

.example-type {
  display: block;
  color: var(--color-text-strong);
  font-size: 16px;
  font-weight: 900;
}

.example-format {
  display: block;
  margin-top: 4px;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.example-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 16px 18px 18px 34px;
  color: var(--color-text);
  font-size: 13px;
  line-height: 1.65;
}

.example-list li {
  word-break: break-word;
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
  border-radius: var(--radius-md);
  background: var(--gradient-sky);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(30, 115, 232, 0.18);
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
  .rules-grid,
  .examples-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
  .sync-header { flex-direction: column; }
  .tool-links { justify-content: flex-start; }
}

@media (max-width: 768px) {
  .steps-grid { grid-template-columns: 1fr; }
  .sync-section { padding: 22px; }
}
</style>
