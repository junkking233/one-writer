<template>
  <div class="min-h-screen bg-slate-900 text-slate-200 py-8">
     <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-white mb-8 border-l-4 border-emerald-500 pl-4">资源导航大全</h1>
        
        <div class="space-y-12">
            <div v-for="(links, category) in groupedLinks" :key="category">
                <h2 class="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {{ category }}
                </h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <a 
                      v-for="link in links" 
                      :key="link.title" 
                      :href="link.url"
                      target="_blank"
                      class="block group p-4 bg-slate-800 rounded-lg border border-white/5 hover:border-emerald-500/50 hover:bg-slate-700 transition-all"
                    >
                        <div class="flex items-start justify-between">
                            <span class="font-medium text-white group-hover:text-emerald-300 transition-colors">{{ link.title }}</span>
                            <span class="text-slate-500 group-hover:text-emerald-500">↗</span>
                        </div>
                        <div class="mt-2 text-xs text-slate-500 truncate">{{ link.url }}</div>
                    </a>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script setup lang="ts">
interface LinkItem {
    title: string;
    url: string;
    category: string;
}

const rawLinks: LinkItem[] = [
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
  { title: "Monica AI", url: "https://monica.im/", category: "写作工具" },
  { title: "claude AI", url: "https://claude.ai/chat", category: "写作工具" },
  
  // 降重工具
  { title: "写作狗", url: "http://newpaper.modifypaper.com/", category: "降重工具" },
  { title: "香蕉降重", url: "https://banana.paperjai.com/", category: "降重工具" },
  
  // 文档工具
  { title: "SimpleTex 公式工具", url: "https://simpletex.cn/", category: "文档工具" },
  { title: "比格设计", url: "https://bigesj.com/", category: "文档工具" },
  
  // 查重工具
  { title: "PaperPass 查重", url: "https://www.paperpass.com/", category: "查重工具" },
  { title: "万方 查重", url: "https://cx.wanfangdata.com.cn/", category: "查重工具" },
  { title: "维普 查重", url: "https://vpcs.fanyu.com/", category: "查重工具" },
  { title: "格子达 查重", url: "https://www.gezida.com/", category: "查重工具" },
  { title: "知网 查重", url: "https://cx.cnki.net/", category: "查重工具" },
  
  // 数据分析
  { title: "199IT", url: "https://www.199it.com/", category: "数据分析" },
  { title: "Kaggle 数据集", url: "https://www.kaggle.com/", category: "数据分析" },
  { title: "艾瑞咨询", url: "https://www.iresearch.com.cn/", category: "数据分析" },
  { title: "国家数据", url: "https://data.stats.gov.cn/", category: "数据分析" },
  { title: "在线SPSS分析", url: "https://spssau.com/", category: "数据分析" },
  
  // 查找文献
  { title: "Citely找文献源", url: "https://citely.ai/zh", category: "查找文献" },
  { title: "知网官网", url: "https://www.cnki.net/", category: "查找文献" },
  { title: "Google 学术", url: "https://scholar.google.com.hk/", category: "查找文献" },
  { title: "巨人学术搜索", url: "https://xs.typicalgame.com/", category: "查找文献" },
]

// Group by category
const groupedLinks = rawLinks.reduce((acc, item) => {
    const links = acc[item.category] || []
    links.push(item)
    acc[item.category] = links
    return acc
}, {} as Record<string, LinkItem[]>)
</script>
