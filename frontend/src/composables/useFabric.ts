import { ref, onUnmounted, markRaw } from 'vue'
import { Canvas, Rect, IText, Object as FabricObject, FabricImage } from 'fabric'
import type { TemplateConfig } from '../config/templates'

export function useFabric() {
    const canvas = ref<Canvas | null>(null)

    // Initialize Canvas
    const initCanvas = async (canvasEl: HTMLCanvasElement, containerWidth: number, containerHeight: number) => {
        if (canvas.value) {
            canvas.value.dispose()
        }

        // Create new Canvas instance
        // MarkRaw to avoid Vue reactivity performance overhead on complex canvas object
        const fabricCanvas = markRaw(new Canvas(canvasEl, {
            width: containerWidth,
            height: containerHeight,
            backgroundColor: '#f8fafc', // Slate-50 default
            selection: true
        }))

        canvas.value = fabricCanvas
        return fabricCanvas
    }

    // Add Editable Text
    const addText = (text: string = 'Double click to edit', options: any = {}) => {
        if (!canvas.value) return

        const iText = new IText(text, {
            left: 100,
            top: 100,
            fontFamily: 'Inter, sans-serif',
            fill: '#334155', // Slate-700
            fontSize: 20,
            ...options
        })

        canvas.value.add(iText)
        canvas.value.setActiveObject(iText)
    }

    // Add Rectangle
    const addRect = (options: any = {}) => {
        if (!canvas.value) return

        const rect = new Rect({
            left: 150,
            top: 150,
            fill: 'transparent',
            stroke: '#334155',
            strokeWidth: 2,
            width: 100,
            height: 100,
            ...options
        })

        canvas.value.add(rect)
        canvas.value.setActiveObject(rect)
    }

    // Load Template
    const loadTemplate = async (template: TemplateConfig) => {
        if (!canvas.value) return

        // 1. Clear Canvas
        canvas.value.clear()
        canvas.value.backgroundColor = '#f8fafc' // Reset bg

        try {
            // 2. Set Background Image
            // Fabric 6+ handling for fromURL usually requires create first then set
            const img = await FabricImage.fromURL(template.bgImage, {
                crossOrigin: 'anonymous'
            })

            // Scale bg to fit? Or just center?
            // For now, let's just center it if possible or scale to cover
            // Simple approach: set as background
            canvas.value.backgroundImage = img
            canvas.value.requestRenderAll()

        } catch (e) {
            console.error("Failed to load background image", e)
        }

        // 3. Add Overlay Objects
        template.overlayObjects.forEach(obj => {
            if (obj.type === 'text') {
                addText(obj.content, {
                    left: obj.left,
                    top: obj.top,
                    fontSize: obj.fontSize,
                    fill: obj.fill
                })
            } else if (obj.type === 'rect') {
                addRect({
                    left: obj.left,
                    top: obj.top,
                    width: obj.width,
                    height: obj.height,
                    fill: obj.fill,
                    stroke: '#334155', // Default stroke if not specified
                    strokeWidth: 2
                })
            }
        })

        // Deselect everything
        canvas.value.discardActiveObject()
        canvas.value.requestRenderAll()
    }

    // Export to Image (DataURL)
    const exportToImage = () => {
        if (!canvas.value) return ''
        return canvas.value.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2 // High res
        })
    }

    // Set Active Object Property
    const setSelectionProperty = (key: string, value: any) => {
        if (!canvas.value) return
        const activeObject = canvas.value.getActiveObject()
        if (activeObject) {
            activeObject.set(key, value)
            canvas.value.requestRenderAll()
        }
    }

    // Get Active Object
    const getActiveObject = (): FabricObject | null => {
        return canvas.value?.getActiveObject() || null
    }

    // Cleanup
    onUnmounted(() => {
        if (canvas.value) {
            canvas.value.dispose()
        }
    })

    return {
        canvas,
        initCanvas,
        addText,
        addRect,
        loadTemplate,
        exportToImage,
        setSelectionProperty,
        getActiveObject
    }
}
