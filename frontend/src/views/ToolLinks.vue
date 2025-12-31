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
  // 计算机工具
  { title: "draw.io", url: "https://app.diagrams.net/?src=about", category: "计算机工具" },
  { title: "Mermaid 转 draw.io", url: "https://www.min2k.com/tools/mermaid/", category: "计算机工具" },
  { title: "Markdown转 Excel", url: "https://tableconvert.com/zh-cn/markdown-to-excel", category: "计算机工具" },
  { title: "PNG转ICO", url: "https://www.aconvert.com/cn/icon/png-to-ico/", category: "计算机工具" },
  { title: "HTML转PNG", url: "https://cloudconvert.com/html-to-png", category: "计算机工具" },
  { title: "PlantUML", url: "https://plantuml.com/zh/", category: "计算机工具" },
  { title: "校园小助手（三线表 E-R图）", url: "https://tools.anqstar.com/tools/structure?storage=local", category: "计算机工具" },
  { title: "GenSpark超级智能体", url: "https://www.genspark.ai/", category: "计算机工具" },
  
  // 写作工具
  { title: "meta材料搜索", url: "https://metaso.cn/", category: "写作工具" },
  { title: "Monica AI", url: "https://monica.im/home", category: "写作工具" },
  { title: "claude AI", url: "https://claude.ai/chat", category: "写作工具" },
  
  // 降重工具
  { title: "写作狗（淘宝买卡密）", url: "http://newpaper.modifypaper.com/", category: "降重工具" },
  { title: "香蕉降重（淘宝买卡密）", url: "https://banana.paperjai.com/", category: "降重工具" },
  
  // 文档工具
  { title: "SimpleTex 公式工具", url: "https://simpletex.cn/", category: "文档工具" },
  { title: "比格设计", url: "https://bigesj.com/", category: "文档工具" },
  
  // 查重工具
  { title: "PaperPass 查重", url: "https://www.paperpass.com/", category: "查重工具" },
  { title: "万方 查重", url: "https://cx.wanfangdata.com.cn/#/", category: "查重工具" },
  { title: "维普 查重", url: "https://vpcs.fanyu.com/#firstSlide", category: "查重工具" },
  { title: "格子达 查重", url: "https://www.gezida.com/fileUploadCheck/init.do?control_type=1", category: "查重工具" },
  { title: "知网 查重", url: "https://cx.cnki.net/main.html#/detectionResult", category: "查重工具" },
  
  // 财务数据搜集
  { title: "雪球 财务数据", url: "https://xueqiu.com/S/BILI?md5__1038=n4jxnDBDyDcD2DRx05DKETxIoLGQF4eGQeH4D", category: "财务数据搜集" },
  { title: "新浪财经 财务数据", url: "https://finance.sina.com.cn/realstock/company/sz002594/nc.shtml", category: "财务数据搜集" },
  { title: "台股票查询-TWSE 臺灣證券交易所", url: "https://www.twse.com.tw/zh/index.html", category: "财务数据搜集" },
  { title: "台股票查询-公開資訊觀測站", url: "https://mops.twse.com.tw/mops/web/t164sb04", category: "财务数据搜集" },
  
  // 数据分析
  { title: "199IT", url: "https://www.199it.com/", category: "数据分析" },
  { title: "Kaggle 数据集", url: "https://www.kaggle.com/datasets?topic=trendingDataset", category: "数据分析" },
  { title: "艾瑞咨询", url: "https://www.iresearch.com.cn/", category: "数据分析" },
  { title: "国家数据", url: "https://data.stats.gov.cn/easyquery.htm?cn=E0103", category: "数据分析" },
  { title: "在线SPSS分析软件", url: "https://spssau.com/addmoney.html", category: "数据分析" },
  
  // 查找文献
  { title: "Citely找文献源", url: "https://citely.ai/zh", category: "查找文献" },
  { title: "知网官网", url: "https://www.cnki.net/", category: "查找文献" },
  { title: "Google 学术官网搜索", url: "https://scholar.google.com.hk/?hl=zh-CN", category: "查找文献" },
  { title: "巨人学术搜索", url: "https://xs.typicalgame.com/", category: "查找文献" },
  { title: "书童图书馆（付费）", url: "https://3.shutong2.com/zhongwenku/", category: "查找文献" },
  { title: "知网文献下载（bimu查重）", url: "https://a.bimuchachong.com/#/", category: "查找文献" },
  { title: "知网文献下载（萝卜图书馆）", url: "http://lib.luobolibrary.cn/#/login", category: "查找文献" }
]

const categories = ['计算机工具', '写作工具', '降重工具', '文档工具', '查重工具', '财务数据搜集', '数据分析', '查找文献']

const stats = [
  { value: '40+', label: '已收录网站', icon: Link },
  { value: '8+', label: '细分分类', icon: Monitor },
  { value: '24/7', label: '可用性监控', icon: Checked },
  { value: '1.5k', label: '月度访问量', icon: Histogram }
]

const gradients = [
  'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
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
    '数据分析': DataAnalysis,
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
