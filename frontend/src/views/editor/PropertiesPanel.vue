<template>
  <div class="h-full w-64 bg-slate-900 border-l border-white/10 p-4 flex flex-col gap-6 overflow-y-auto z-10">
    
    <div class="text-xs text-slate-500 font-bold uppercase tracking-wider">Properties</div>

    <div v-if="selectionType === 'none'" class="text-sm text-slate-400 italic">
      Select an object to edit properties
    </div>

    <!-- Text Properties -->
    <div v-if="selectionType === 'text'" class="flex flex-col gap-4">
      <div class="space-y-1">
         <label class="text-xs text-slate-400">Content</label>
         <input 
           :value="activeObject?.text" 
           @input="(e: any) => $emit('update-property', 'text', e.target.value)"
           class="w-full bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
         />
      </div>

      <div class="space-y-1">
         <label class="text-xs text-slate-400">Font Size</label>
         <input 
           type="number"
           :value="activeObject?.fontSize"
           @input="(e: any) => $emit('update-property', 'fontSize', parseInt(e.target.value))"
           class="w-full bg-slate-800 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
         />
      </div>

       <div class="space-y-1">
         <label class="text-xs text-slate-400">Color</label>
         <div class="flex gap-2">
            <input 
              type="color"
              :value="activeObject?.fill" 
              @input="(e: any) => $emit('update-property', 'fill', e.target.value)"
              class="h-8 w-8 rounded bg-transparent cursor-pointer"
            />
            <span class="text-xs self-center text-slate-400">{{ activeObject?.fill }}</span>
         </div>
      </div>
    </div>

    <!-- Shape Properties -->
    <div v-if="selectionType === 'rect'" class="flex flex-col gap-4">
      <div class="space-y-1">
         <label class="text-xs text-slate-400">Fill Color</label>
          <div class="flex gap-2">
            <input 
              type="color"
              :value="activeObject?.fill === 'transparent' ? '#ffffff' : activeObject?.fill" 
              @input="(e: any) => $emit('update-property', 'fill', e.target.value)"
              class="h-8 w-8 rounded bg-transparent cursor-pointer"
            />
         </div>
      </div>
       <div class="space-y-1">
         <label class="text-xs text-slate-400">Stroke Color</label>
          <div class="flex gap-2">
            <input 
              type="color"
              :value="activeObject?.stroke" 
              @input="(e: any) => $emit('update-property', 'stroke', e.target.value)"
              class="h-8 w-8 rounded bg-transparent cursor-pointer"
            />
         </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectionType: 'none' | 'text' | 'rect' | 'group' | string;
  activeObject: any;
}>()

defineEmits(['update-property'])
</script>
