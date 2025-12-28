<template>
  <div ref="containerRef" class="w-full h-full bg-slate-800/50 flex items-center justify-center relative overflow-hidden">
     <!-- The Canvas Element -->
     <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFabric } from '../../composables/useFabric'

const props = defineProps<{
  template?: any
}>()

const emit = defineEmits(['ready', 'selection-created', 'selection-cleared', 'selection-updated'])

const containerRef = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

const { initCanvas, canvas, addText, addRect, loadTemplate, exportToImage, setSelectionProperty } = useFabric()

onMounted(async () => {
   if (containerRef.value && canvasEl.value) {
       // Initialize with container dimensions
       const { width, height } = containerRef.value.getBoundingClientRect()
       const fabricInstance = await initCanvas(canvasEl.value, width, height)
       
       // Listen to events to push state up
       fabricInstance.on('selection:created', (e) => emit('selection-created', e.selected?.[0]))
       fabricInstance.on('selection:updated', (e) => emit('selection-updated', e.selected?.[0]))
       fabricInstance.on('selection:cleared', () => emit('selection-cleared'))
       
       emit('ready', fabricInstance)
   }
})

// Expose methods for parent component to control the canvas
defineExpose({
    addText,
    addRect,
    loadTemplate,
    exportToImage,
    setSelectionProperty,
    canvas
})
</script>
