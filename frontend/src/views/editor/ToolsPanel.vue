<template>
  <div class="h-full w-16 bg-slate-900 border-r border-white/10 flex flex-col items-center py-4 gap-4 z-10">
    
    <div class="text-xs text-slate-500 font-bold mb-2">Tools</div>

    <!-- Select Tool -->
    <button 
       @click="$emit('tool-click', 'select')"
       class="p-2 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-colors text-slate-400"
       title="Select"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
    </button>

    <!-- Text Tool -->
    <button 
       @click="$emit('tool-click', 'text')"
       class="p-2 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-colors text-slate-400"
       title="Add Text"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
    </button>

    <!-- Rectangle Tool -->
    <button 
       @click="$emit('tool-click', 'rect')"
       class="p-2 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-colors text-slate-400"
       title="Add Rectangle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
    </button>
    
    <!-- Circle/More Tools -->
    <div class="h-px w-8 bg-white/10 my-2"></div>

    <!-- Export -->
    <button 
       @click="$emit('action-click', 'export')"
       class="p-2 rounded-lg hover:bg-emerald-600/20 hover:text-emerald-400 transition-colors text-slate-400 mt-auto mb-4"
       title="Export Image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>

  </div>
</template>

<script setup lang="ts">
defineEmits(['tool-click', 'action-click'])
</script>
