<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-10">
      <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
        <span class="block">集合你的</span>
        <span class="block text-blue-400">创造力工具箱</span>
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        从架构图设计到文档格式转换，One-Writer 为你提供丝滑的一站式解决方案。
      </p>
    </div>

    <!-- Chart Tools Section -->
    <section>
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
        <span>📊</span> 图表生成类
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Module Diagram -->
        <div class="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
          
          <div class="relative z-10">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 mb-4">
              🌳
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">功能模块图</h3>
            <p class="text-slate-400 text-sm mb-6 min-h-[40px]">将文本缩进结构瞬间转换为专业的树状层级图。</p>
            <router-link to="/module-diagram" class="inline-block w-full text-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20">
              立即使用
            </router-link>
          </div>
        </div>

        <!-- Use Case Diagram -->
        <div class="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-6 hover:bg-slate-800 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm">
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-pink-600/20 blur-3xl rounded-full group-hover:bg-pink-500/30 transition-all"></div>
          
          <div class="relative z-10">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-pink-500/20 text-pink-400 mb-4">
              🎨
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">用例图生成</h3>
            <p class="text-slate-400 text-sm mb-6 min-h-[40px]">基于 PlantUML，通过简单脚本快速生成系统用例图。</p>
            <button class="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10">
              立即使用
            </button>
          </div>
        </div>

        <!-- Architecture Diagram -->
        <div class="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-6 hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm">
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-cyan-600/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all"></div>
          
          <div class="relative z-10">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 mb-4">
              🏗️
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">架构图</h3>
            <p class="text-slate-400 text-sm mb-6 min-h-[40px]">嵌入飞书文档，在线查看系统架构设计。</p>
            <router-link to="/architecture-diagram" class="inline-block w-full text-center bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10">
              立即查看
            </router-link>
          </div>
        </div>

        <!-- E-R Diagram -->
        <div class="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
          <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
          
          <div class="relative z-10">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 mb-4">
              🗄️
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">数据库 E-R 图</h3>
            <p class="text-slate-400 text-sm mb-6 min-h-[40px]">嵌入飞书文档，在线查看数据库模型设计。</p>
            <router-link to="/er-diagram" class="inline-block w-full text-center bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10">
              立即查看
            </router-link>
          </div>
        </div>

      </div>
    </section>

    <!-- Doc Tools Section -->
    <section>
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
        <span>📝</span> 文档处理类
      </h2>
      <!-- ... Similar grid for doc tools ... -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-white/5 p-6 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm">
             <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-600/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all"></div>
             <div class="relative z-10">
                 <h3 class="text-xl font-semibold text-white mb-2">资源导航大全</h3>
                 <p class="text-slate-400 text-sm mb-6">聚合写作工具、计算机工具等高效资源链接。</p>
                 <router-link to="/resources" class="inline-block w-full text-center bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/10">进入导航</router-link>
             </div>
        </div>
      </div>
    </section>
  </div>
</template>
