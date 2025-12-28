<template>
  <div class="tool-links-page animate-fade-in">
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title">
          <span class="gradient-text-premium secondary-gradient">
            <el-icon class="title-icon"><Link /></el-icon>
            全能学术工具库
          </span>
        </h1>
        <p class="page-subtitle">精选科研写作、数据分析与内容生成的顶级资源，助力学术巅峰</p>
      </div>
    </div>

    <div class="toolbar-wrapper glass shadow-premium">
      <div class="search-container">
        <el-input
          v-model="searchQuery"
          placeholder="搜索您需要的工具、资源或网站..."
          :prefix-icon="Search"
          size="large"
          clearable
          class="premium-search-input"
        />
      </div>
    </div>

    <div class="content-wrapper">
      <div class="categories-window card-premium">
        <el-tabs v-model="activeCategory" class="custom-premium-tabs">
          <el-tab-pane
            v-for="category in categories"
            :key="category"
            :name="category"
          >
            <template #label>
              <div class="tab-item-box">
                <el-icon class="tab-icon"><component :is="getCategoryIcon(category)" /></el-icon>
                <span>{{ category }}</span>
              </div>
            </template>

            <div class="tool-grid">
              <div
                v-for="(tool, index) in filteredTools(category)"
                :key="index"
                class="tool-card-premium"
                @click="openTool(tool)"
                :style="{ animationDelay: `${index * 50}ms` }"
              >
                <div class="card-inner">
                  <div class="tool-icon-wrapper" :style="{ background: getGradient(index) }">
                    <el-icon><component :is="getCategoryIcon(tool.category)" /></el-icon>
                  </div>
                  <div class="tool-info">
                    <h4 class="tool-name">{{ tool.title }}</h4>
                    <span class="tool-tag">{{ tool.category }}</span>
                  </div>
                  <div class="tool-arrow">
                    <el-icon><TopRight /></el-icon>
                  </div>
                </div>
                <div class="tool-description-mini">{{ tool.url.replace(/^https?:\/\//, '') }}</div>
              </div>
            </div>

            <el-empty
              v-if="filteredTools(category).length === 0"
              description="未发现匹配工具"
              class="empty-premium"
            >
              <template #image>
                <el-icon :size="80" class="empty-icon"><Search /></el-icon>
              </template>
            </el-empty>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Link,
  Search,
  TopRight,
  Monitor,
  Edit,
  TrendCharts,
  Document,
  Checked,
  DataAnalysis,
  Reading,
  Coin,
  Histogram
} from '@element-plus/icons-vue'

const searchQuery = ref('')
const activeCategory = ref('计算机工具')

const tools = [
  { title: "draw.io", url: "https://app.diagrams.net/?src=about", category: "计算机工具" },
  { title: "Mermaid 转 draw.io", url: "https://www.min2k.com/tools/mermaid/", category: "计算机工具" },
  { title: "Excalidraw", url: "https://excalidraw.com/", category: "计算机工具" },
  { title: "Kroki (代码转图)", url: "https://kroki.io/", category: "计算机工具" },
  { title: "GitHub", url: "https://github.com/", category: "计算机工具" },
  { title: "DeepL 翻译", url: "https://www.deepl.com/translator", category: "写作工具" },
  { title: "Notion", url: "https://www.notion.so/", category: "写作工具" },
  { title: "Monica AI", url: "https://monica.im/home", category: "写作工具" },
  { title: "Claude AI", url: "https://claude.ai/chat", category: "写作工具" },
  { title: "写作狗", url: "http://newpaper.modifypaper.com/", category: "降重工具" },
  { title: "香蕉降重", url: "https://banana.paperjai.com/", category: "降重工具" },
  { title: "SmallPDF", url: "https://smallpdf.com/cn", category: "文档工具" },
  { title: "I Love PDF", url: "https://www.ilovepdf.com/", category: "文档工具" },
  { title: "PaperYY (免费制)", url: "https://www.paperyy.com/", category: "查重工具" },
  { title: "东方财富", url: "https://www.eastmoney.com/", category: "财务数据搜集" },
  { title: "雪球", url: "https://xueqiu.com/", category: "财务数据搜集" },
  { title: "Google Scholar", url: "https://scholar.google.com/", category: "查找文献" },
  { title: "巨人学术", url: "https://xs.typicalgame.com/", category: "查找文献" }
]

const categories = ['计算机工具', '写作工具', '降重工具', '文档工具', '查重工具', '财务数据搜集', '查找文献']

const stats = [
  { value: '20+', label: '已收录网站', icon: Link },
  { value: '7+', label: '细分分类', icon: Monitor },
  { value: '24/7', label: '可用性监控', icon: Checked },
  { value: '1.2k', label: '月度访问量', icon: Histogram }
]

const gradients = [
  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
]

const filteredTools = (category: string) => {
  return tools.filter(tool => {
    const matchCategory = tool.category === category
    const matchSearch = tool.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        tool.url.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
}

const getGradient = (index: number) => gradients[index % gradients.length]

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    '计算机工具': Monitor,
    '写作工具': Edit,
    '降重工具': TrendCharts,
    '文档工具': Document,
    '查重工具': Checked,
    '财务数据搜集': Coin,
    '查找文献': Reading
  }
  return icons[category] || Link
}

const openTool = (tool: any) => window.open(tool.url, '_blank')
</script>

<style scoped>
.tool-links-page {
  max-width: 1400px;
  margin: 0 auto;
}

.secondary-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-header { margin-bottom: 32px; }

.page-title {
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon { font-size: 40px; }

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.toolbar-wrapper {
  padding: 8px;
  border-radius: 20px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.premium-search-input :deep(.el-input__wrapper) {
  background: white;
  border-radius: 16px;
  height: 64px;
  padding: 0 24px;
  box-shadow: none;
  border: none;
}

.premium-search-input :deep(.el-input__inner) {
  font-size: 16px;
  font-weight: 500;
}

.custom-premium-tabs :deep(.el-tabs__header) {
  margin: 0 0 32px 0;
  border-bottom: 1px solid var(--border-color);
  padding: 8px 16px 0;
}

.custom-premium-tabs :deep(.el-tabs__nav-wrap::after) { display: none; }

.custom-premium-tabs :deep(.el-tabs__item) {
  height: 54px;
  font-size: 15px;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  padding: 0 24px !important;
}

.custom-premium-tabs :deep(.el-tabs__item.is-active) {
  color: var(--primary-color);
  font-weight: 800;
}

.tab-item-box { display: flex; align-items: center; gap: 10px; }
.tab-icon { font-size: 18px; }

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  padding: 4px;
}

.tool-card-premium {
  background: white;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.tool-card-premium:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.card-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.tool-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);
}

.tool-info { flex: 1; }

.tool-name {
  font-size: 17px;
  font-weight: 800;
  margin: 0 0 4px 0;
  color: var(--text-primary);
}

.tool-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-tertiary);
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}

.tool-arrow {
  color: var(--text-tertiary);
  font-size: 20px;
  transition: all var(--transition-fast);
}

.tool-card-premium:hover .tool-arrow {
  color: var(--primary-color);
  transform: translate(3px, -3px);
}

.tool-description-mini {
  font-size: 12px;
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 12px;
  border-top: 1px solid #f8fafc;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.stat-item {
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.stat-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.empty-premium { padding: 80px 0; }
.empty-icon { color: var(--border-color); }

@media (max-width: 768px) {
  .tool-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
}
</style>
