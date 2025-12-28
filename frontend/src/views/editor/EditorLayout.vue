<template>
  <div class="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-900 text-white">
    <!-- Left: Tool Panel -->
    <ToolsPanel 
       class="flex-none"
       @tool-click="handleToolClick"
       @action-click="handleActionClick"
    />

    <!-- Center: Canvas Area -->
    <div class="flex-1 flex flex-col relative bg-stone-100">
       <!-- Top Bar for Template Selection (Optional) -->
       <div class="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
           <span class="text-slate-600 font-bold text-sm">Template:</span>
           <select 
             v-model="selectedTemplateId"
             @change="handleTemplateChange"
             class="bg-white border text-slate-700 border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
           >
               <option value="" disabled>Select a template...</option>
               <option v-for="t in templates" :key="t.id" :value="t.id">
                 {{ t.name }}
               </option>
           </select>
       </div>

       <!-- The Canvas -->
       <div class="flex-1 relative overflow-auto custom-scrollbar">
           <FabricCanvas 
             ref="canvasRef"
             @selection-created="handleSelection"
             @selection-updated="handleSelection"
             @selection-cleared="handleSelectionCleared"
           />
       </div>
    </div>

    <!-- Right: Property Panel -->
    <PropertiesPanel 
       class="flex-none"
       :selection-type="selectionType"
       :active-object="activeObjectData"
       @update-property="handlePropertyUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolsPanel from './ToolsPanel.vue'
import PropertiesPanel from './PropertiesPanel.vue'
import FabricCanvas from './FabricCanvas.vue'
import { MOCK_TEMPLATES } from '../../config/templates'

// State
const canvasRef = ref<InstanceType<typeof FabricCanvas> | null>(null)
const templates = ref(MOCK_TEMPLATES)
const selectedTemplateId = ref('')

const activeObject = ref<any>(null) // Raw fabric object
const selectionType = ref<'none' | 'text' | 'rect' | 'group'>('none')

// Computed object data for panel
const activeObjectData = computed(() => {
    if (!activeObject.value) return null
    return {
        type: activeObject.value.type,
        text: activeObject.value.text,
        fill: activeObject.value.fill,
        stroke: activeObject.value.stroke,
        fontSize: activeObject.value.fontSize
    }
})

// Handlers
const handleToolClick = (tool: string) => {
    if (!canvasRef.value) return
    
    if (tool === 'text') {
        canvasRef.value.addText()
    } else if (tool === 'rect') {
        canvasRef.value.addRect()
    }
}

const handleActionClick = (action: string) => {
    if (action === 'export' && canvasRef.value) {
        const dataUrl = canvasRef.value.exportToImage()
        // Trigger download
        const link = document.createElement('a')
        link.download = `diagram-${Date.now()}.png`
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

const handleTemplateChange = () => {
    const template = templates.value.find(t => t.id === selectedTemplateId.value)
    if (template && canvasRef.value) {
        // Need to confirm before overwriting?
        if (confirm("Load this template? Current canvas will be cleared.")) {
             canvasRef.value.loadTemplate(template)
        }
    }
}

const handleSelection = (obj: any) => {
    activeObject.value = obj
    selectionType.value = obj.type === 'i-text' ? 'text' : obj.type
}

const handleSelectionCleared = () => {
    activeObject.value = null
    selectionType.value = 'none'
}

const handlePropertyUpdate = (key: string, value: any) => {
    if (canvasRef.value) {
        canvasRef.value.setSelectionProperty(key, value)
        // Force update local state to reflect change in UI if needed (computed handles it though reactively if obj mutates?)
        // Fabric objects mutate in place, but Vue might not catch deep mutation unless we triggerRef.
        // For simple props, usually fine, but let's re-assign to trigger computed 
        // actually activeObject.value is the fabric object which is not reactive in Vue sense usually.
        // But we are reading props from it in computed.
        // Let's manually force an update if necessary.
        // For now reliance on properties panel input v-model binding is one way (panel -> parent). 
        // Parent calls canvas setter. Canvas re-renders.
    }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>
