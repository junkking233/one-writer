<template>
  <div class="tool-links-page animate-fade-in">
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title">
          <span class="gradient-text-premium secondary-gradient">
            <el-icon class="title-icon"><Link /></el-icon>
            工具导航站
          </span>
        </h1>
        <p class="page-subtitle">把常用论文、图表、查重、数据和文档工具集中放在一个页面里。</p>
      </div>
      <div class="page-count">
        <strong>{{ visibleCount }}</strong>
        <span>个工具</span>
      </div>
    </div>

    <div class="toolbar-wrapper glass">
      <el-input
        v-model="searchQuery"
        placeholder="搜索工具名称、网址或分类..."
        :prefix-icon="Search"
        size="large"
        clearable
        class="premium-search-input"
      />
    </div>

    <div class="category-summary">
      <span
        v-for="category in categories"
        :key="category"
        class="category-pill"
        :style="{ '--category-gradient': getGradient(category) }"
      >
        <el-icon><component :is="getCategoryIcon(category)" /></el-icon>
        {{ category }}
        <b>{{ countByCategory(category) }}</b>
      </span>
    </div>

    <div class="tool-directory">
      <section
        v-for="group in groupedTools"
        :key="group.category"
        class="category-section"
      >
        <div class="section-heading">
          <div class="section-title-wrap">
            <span class="section-icon" :style="{ background: getGradient(group.category) }">
              <el-icon><component :is="getCategoryIcon(group.category)" /></el-icon>
            </span>
            <div>
              <h2>{{ group.category }}</h2>
              <p>{{ group.items.length }} 个常用入口</p>
            </div>
          </div>
        </div>

        <div class="tool-grid">
          <button
            v-for="tool in group.items"
            :key="tool.url"
            type="button"
            class="tool-card"
            @click="openTool(tool)"
          >
            <span class="tool-tag">{{ tool.category }}</span>
            <div class="card-inner">
              <div class="tool-icon-wrapper" :style="{ background: getGradient(tool.category) }">
                <el-icon><component :is="getCategoryIcon(tool.category)" /></el-icon>
              </div>
              <div class="tool-info">
                <h3 class="tool-name">{{ tool.title }}</h3>
                <p class="tool-url">{{ getHostname(tool.url) }}</p>
              </div>
              <div class="tool-arrow">
                <el-icon><TopRight /></el-icon>
              </div>
            </div>
          </button>
        </div>
      </section>

      <el-empty
        v-if="visibleCount === 0"
        description="未发现匹配工具"
        class="empty-premium"
      >
        <template #image>
          <el-icon :size="80" class="empty-icon"><Search /></el-icon>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
  Coin
} from '@element-plus/icons-vue'

type ToolItem = {
  title: string
  url: string
  category: string
}

const searchQuery = ref('')

const tools: ToolItem[] = [
  { title: 'draw.io', url: 'https://app.diagrams.net/?src=about', category: '计算机工具' },
  { title: 'Mermaid 转 draw.io', url: 'https://www.min2k.com/tools/mermaid/', category: '计算机工具' },
  { title: 'Markdown转 Excel', url: 'https://tableconvert.com/zh-cn/markdown-to-excel', category: '计算机工具' },
  { title: 'PNG转ICO', url: 'https://www.aconvert.com/cn/icon/png-to-ico/', category: '计算机工具' },
  { title: 'HTML转PNG', url: 'https://cloudconvert.com/html-to-png', category: '计算机工具' },
  { title: 'PlantUML', url: 'https://plantuml.com/zh/', category: '计算机工具' },
  { title: '校园小助手（三线表 E-R图）', url: 'https://tools.anqstar.com/tools/structure?storage=local', category: '计算机工具' },
  { title: 'GenSpark超级智能体', url: 'https://www.genspark.ai/', category: '计算机工具' },

  { title: 'meta材料搜索', url: 'https://metaso.cn/', category: '写作工具' },
  { title: 'Monica AI', url: 'https://monica.im/home', category: '写作工具' },
  { title: 'claude AI', url: 'https://claude.ai/chat', category: '写作工具' },

  { title: '写作狗（淘宝买卡密）', url: 'http://newpaper.modifypaper.com/', category: '降重工具' },
  { title: '香蕉降重（淘宝买卡密）', url: 'https://banana.paperjai.com/', category: '降重工具' },

  { title: 'SimpleTex 公式工具', url: 'https://simpletex.cn/', category: '文档工具' },
  { title: '比格设计', url: 'https://bigesj.com/', category: '文档工具' },

  { title: 'PaperPass', url: 'https://www.paperpass.com/', category: '查重工具' },
  { title: '万方 查重', url: 'https://cx.wanfangdata.com.cn/#/', category: '查重工具' },
  { title: '维普 查重', url: 'https://vpcs.fanyu.com/#firstSlide', category: '查重工具' },
  { title: '格子达 查重', url: 'https://www.gezida.com/fileUploadCheck/init.do?control_type=1', category: '查重工具' },
  { title: '知网 查重', url: 'https://cx.cnki.net/main.html#/detectionResult', category: '查重工具' },

  { title: '雪球 财务数据', url: 'https://xueqiu.com/S/BILI?md5__1038=n4jxnDBDyDcD2DRx05DKETxIoLGQF4eGQeH4D', category: '财务数据搜集' },
  { title: '新浪财经 财务数据', url: 'https://finance.sina.com.cn/realstock/company/sz002594/nc.shtml', category: '财务数据搜集' },
  { title: '台股票查询-TWSE 臺灣證券交易所', url: 'https://www.twse.com.tw/zh/index.html', category: '财务数据搜集' },
  { title: '台股票查询-公開資訊觀測站', url: 'https://mops.twse.com.tw/mops/web/t164sb04', category: '财务数据搜集' },

  { title: '199IT', url: 'https://www.199it.com/', category: '数据分析' },
  { title: 'Kaggle 数据集', url: 'https://www.kaggle.com/datasets?topic=trendingDataset', category: '数据分析' },
  { title: '艾瑞咨询', url: 'https://www.iresearch.com.cn/', category: '数据分析' },
  { title: '国家数据', url: 'https://data.stats.gov.cn/easyquery.htm?cn=E0103', category: '数据分析' },
  { title: '在线SPSS分析软件', url: 'https://spssau.com/addmoney.html', category: '数据分析' },

  { title: 'Citely找文献源', url: 'https://citely.ai/zh', category: '查找文献' },
  { title: '知网官网', url: 'https://www.cnki.net/', category: '查找文献' },
  { title: 'Google 学术（官网）', url: 'https://scholar.google.com.hk/?hl=zh-CN', category: '查找文献' },
  { title: '巨人学术搜索（英文）', url: 'https://xs.typicalgame.com/', category: '查找文献' },
  { title: '学术图书馆（中文）', url: 'http://lib.luobolibrary.cn/#/', category: '查找文献' }
]

const categories = ['计算机工具', '写作工具', '降重工具', '文档工具', '查重工具', '财务数据搜集', '数据分析', '查找文献']

const gradients = [
  'var(--gradient-primary)',
  'var(--gradient-sun)',
  'var(--gradient-sky)',
  'var(--gradient-coral)',
  'var(--gradient-grass)'
]

const filteredTools = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  if (!keyword) return tools
  return tools.filter(tool => {
    return tool.title.toLowerCase().includes(keyword) ||
      tool.url.toLowerCase().includes(keyword) ||
      tool.category.toLowerCase().includes(keyword)
  })
})

const groupedTools = computed(() => {
  return categories
    .map(category => ({
      category,
      items: filteredTools.value.filter(tool => tool.category === category)
    }))
    .filter(group => group.items.length > 0)
})

const visibleCount = computed(() => filteredTools.value.length)

const countByCategory = (category: string) => tools.filter(tool => tool.category === category).length

const getGradient = (category: string) => {
  const index = Math.max(categories.indexOf(category), 0)
  return gradients[index % gradients.length]
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    '计算机工具': Monitor,
    '写作工具': Edit,
    '降重工具': TrendCharts,
    '文档工具': Document,
    '查重工具': Checked,
    '财务数据搜集': Coin,
    '数据分析': DataAnalysis,
    '查找文献': Reading
  }
  return icons[category] || Link
}

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return url.replace(/^https?:\/\//, '')
  }
}

const openTool = (tool: ToolItem) => window.open(tool.url, '_blank')
</script>

<style scoped>
.tool-links-page {
  max-width: 1400px;
  margin: 0 auto;
}

.secondary-gradient {
  background: var(--gradient-grass);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
  padding: 22px 24px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-sm);
}

.page-title {
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 850;
}

.title-icon {
  margin-right: 10px;
  font-size: 36px;
}

.page-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
}

.page-count {
  display: grid;
  min-width: 104px;
  place-items: center;
  padding: 12px 18px;
  border: 1px solid rgba(17, 132, 116, 0.14);
  border-radius: var(--radius-lg);
  background: rgba(236, 248, 242, 0.74);
}

.page-count strong {
  color: var(--color-text-strong);
  font-size: 28px;
  line-height: 1;
}

.page-count span {
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 800;
}

.toolbar-wrapper {
  padding: 8px;
  border-radius: var(--radius-lg);
  margin-bottom: 16px;
}

.premium-search-input :deep(.el-input__wrapper) {
  height: 58px;
  padding: 0 20px;
  border: none;
  border-radius: var(--radius-md);
  background: white;
  box-shadow: none;
}

.premium-search-input :deep(.el-input__inner) {
  font-size: 16px;
  font-weight: 500;
}

.category-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 800;
}

.category-pill .el-icon {
  color: var(--color-text-link);
}

.category-pill b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 22px;
  padding: 0 6px;
  border-radius: var(--radius-full);
  background: var(--category-gradient);
  color: white;
  font-size: 12px;
}

.tool-directory {
  display: grid;
  gap: 34px;
  padding-bottom: 42px;
}

.category-section {
  padding-top: 8px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: white;
  font-size: 22px;
  box-shadow: 0 12px 22px rgba(22, 68, 62, 0.12);
}

.section-title-wrap h2 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: 21px;
  font-weight: 900;
}

.section-title-wrap p {
  margin: 2px 0 0;
  color: var(--text-tertiary);
  font-size: 13px;
  font-weight: 700;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 14px;
}

.tool-card {
  position: relative;
  min-height: 126px;
  overflow: hidden;
  padding: 18px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.84);
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.tool-card:hover {
  border-color: rgba(34, 197, 94, 0.34);
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.tool-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  max-width: 112px;
  overflow: hidden;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  background: rgba(236, 248, 242, 0.86);
  color: var(--color-text-link);
  font-size: 11px;
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-inner {
  display: grid;
  grid-template-columns: 48px 1fr 18px;
  align-items: end;
  gap: 13px;
  min-height: 88px;
}

.tool-icon-wrapper {
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: white;
  font-size: 24px;
  box-shadow: 0 12px 22px rgba(22, 68, 62, 0.12);
}

.tool-info {
  min-width: 0;
}

.tool-name {
  margin: 0 0 8px;
  color: var(--color-text-strong);
  font-size: 17px;
  font-weight: 850;
  line-height: 1.35;
}

.tool-url {
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--text-tertiary);
  font-size: 12px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tool-arrow {
  color: var(--text-tertiary);
  font-size: 18px;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.tool-card:hover .tool-arrow {
  color: var(--color-text-link);
  transform: translate(2px, -2px);
}

.empty-premium {
  padding: 80px 0;
}

.empty-icon {
  color: var(--border-color);
}

@media (max-width: 900px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-count {
    width: 100%;
    min-width: 0;
    grid-template-columns: auto auto;
    justify-content: center;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
