<template>
  <div class="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <router-link to="/" class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              W
            </div>
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              One-Writer
            </span>
          </router-link>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-1">
              <router-link 
                to="/" 
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="$route.path === '/' ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'"
              >首页</router-link>
              <router-link 
                to="/module-diagram" 
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="$route.path === '/module-diagram' ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'"
              >图表工具</router-link>
              <router-link 
                to="/editor" 
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="$route.path === '/editor' ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'"
              >文档处理</router-link>
              <router-link 
                to="/resources" 
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="$route.path === '/resources' ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'"
              >资源导航</router-link>
            </div>
          </div>
          <div class="flex items-center gap-4">
             <button class="text-slate-400 hover:text-white transition-colors">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
             </button>
             <div class="h-8 w-8 rounded-full bg-slate-700 border border-white/10"></div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 bg-slate-900 mt-auto">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p class="text-center text-sm text-slate-500">© 2024 One-Writer ToolSet. Designed with Deep Space UI.</p>
        </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const $route = useRoute()
</script>
