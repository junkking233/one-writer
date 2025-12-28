<template>
  <div class="h-[calc(100vh-64px)] flex bg-white">
    <!-- Left: Input Area -->
    <div class="w-52 border-r border-slate-200 flex flex-col bg-slate-50">
      <div class="p-3 border-b border-slate-200">
        <h2 class="text-sm font-medium text-slate-800">用户输入数据</h2>
      </div>
      
      <div class="flex-1 p-2 overflow-auto">
        <textarea 
          v-model="inputText"
          class="w-full h-full bg-white border border-slate-200 rounded p-2 text-xs font-mono text-slate-700 resize-none focus:outline-none focus:border-blue-500"
          placeholder="超市电商系统
  商品模块
    商品添加
    商品分类管理"
        ></textarea>
      </div>

      <div class="p-3 border-t border-slate-200">
        <button 
          @click="generateDiagram" 
          class="w-full bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span>🚀</span>
          <span>生成</span>
        </button>
        <p class="text-xs text-slate-400 mt-2 text-center">此功能涉及到AI生成内容,不代表本站立场,使用前请仔细甄别!</p>
      </div>
    </div>

    <!-- Center: Canvas Area -->
    <div class="flex-1 relative overflow-auto bg-white" ref="canvasContainer">
      <canvas ref="canvasEl" id="module-canvas"></canvas>
    </div>

    <!-- Right: Settings Panel -->
    <div class="w-64 border-l border-slate-200 bg-white overflow-auto">
      <div class="p-4">
        <!-- Canvas Settings -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-slate-700 mb-3">画布设置</h4>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs text-slate-600">缩放</span>
            <button @click="zoomOut" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm">-</button>
            <span class="text-xs text-slate-600 w-12 text-center">{{ Math.round(settings.zoom * 100) }}%</span>
            <button @click="zoomIn" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm">+</button>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button 
              @click="generateDiagram" 
              class="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs"
            >重新渲染</button>
            <button 
              @click="toggleFullscreen" 
              class="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded text-xs"
            >全屏</button>
            <button 
              @click="exportImage" 
              class="px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded text-xs"
            >导出图片</button>
            <button 
              @click="copyToClipboard" 
              class="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded text-xs"
            >复制到剪贴板</button>
          </div>
        </div>
        
        <!-- Style Settings -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-slate-700 mb-3">样式设置</h4>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs text-slate-600">边框颜色</label>
              <input 
                v-model="settings.borderColor" 
                type="color" 
                class="w-8 h-6 rounded border border-slate-300 cursor-pointer"
              />
            </div>
            
            <div class="flex items-center justify-between">
              <label class="text-xs text-slate-600">显示箭头</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.showArrows" class="sr-only peer">
                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <label class="text-xs text-slate-600">字体加粗</label>
              <button 
                @click="settings.boldFont = !settings.boldFont"
                :class="[
                  'px-3 py-1 text-sm font-bold rounded border',
                  settings.boldFont ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 border-slate-300'
                ]"
              >B</button>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-xs text-slate-600 block mb-1">边框粗细</label>
                <input v-model.number="settings.borderWidth" type="number" min="1" max="5" 
                  class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
              </div>
              <div>
                <label class="text-xs text-slate-600 block mb-1">字体大小</label>
                <input v-model.number="settings.fontSize" type="number" min="10" max="24" 
                  class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <label class="text-xs text-slate-600">字体颜色</label>
              <input v-model="settings.textColor" type="color" 
                class="w-8 h-6 rounded border border-slate-300 cursor-pointer"/>
            </div>
            
            <div>
              <label class="text-xs text-slate-600 block mb-1">字体选择</label>
              <select v-model="settings.fontFamily" class="w-full px-2 py-1 border border-slate-300 rounded text-xs">
                <option value="宋体">宋体</option>
                <option value="黑体">黑体</option>
                <option value="微软雅黑">微软雅黑</option>
                <option value="Arial">Arial</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Node Settings -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-slate-700 mb-3">节点设置</h4>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs text-slate-600 block mb-1">节点宽度</label>
              <input v-model.number="settings.nodeWidth" type="number" min="30" max="100" 
                class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">节点高度</label>
              <input v-model.number="settings.nodeHeight" type="number" min="30" max="150" 
                class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">节点间距</label>
              <input v-model.number="settings.horizontalSpacing" type="number" min="5" max="50" 
                class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">线条高度</label>
              <input v-model.number="settings.verticalSpacing" type="number" min="30" max="150" 
                class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">箭头宽度</label>
              <input v-model.number="settings.arrowWidth" type="number" min="4" max="20" 
                class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
            </div>
            <div>
              <label class="text-xs text-slate-600 block mb-1">箭头高度</label>
              <input v-model.number="settings.arrowHeight" type="number" min="4" max="20" 
                class="w-full px-2 py-1 border border-slate-300 rounded text-xs"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, markRaw } from 'vue'
import { Canvas, Rect, Line, IText, Triangle, Circle } from 'fabric'

interface TreeNode {
  name: string
  children: TreeNode[]
  level: number
}

interface NodePosition {
  x: number
  y: number
  width: number
  height: number
  centerX: number
}

const inputText = ref(`超市电商系统
  商品模块
    商品添加
    商品分类管理
    商品信息浏览
    商品购买
  购买模块
    购物车管理
    订单生成
  订单模块
    个人订单查询
    订单核实
    订单付款
    订单浏览
  商家模块
    生产商管理
    供应商管理
    品牌管理
  系统模块
    系统用户管理
    密码修改
    系统权限设置
    注册用户管理`)

const settings = ref({
  zoom: 0.4,
  borderColor: '#000000',
  textColor: '#000000',
  showArrows: true,
  boldFont: false,
  borderWidth: 1,
  fontSize: 14,
  fontFamily: '宋体',
  nodeWidth: 36,       // 叶子节点宽度（竖排文字）
  nodeHeight: 36,      // 非叶子节点高度
  horizontalSpacing: 10, // 节点水平间距
  verticalSpacing: 50,  // 层级垂直间距
  arrowWidth: 8,
  arrowHeight: 10
})

const canvasEl = ref<HTMLCanvasElement | null>(null)
const canvasContainer = ref<HTMLDivElement | null>(null)
let fabricCanvas: Canvas | null = null

// Parse text to tree structure
const parseToTree = (text: string): TreeNode | null => {
  const lines = text.split('\n').filter(l => l.trim() !== '')
  if (lines.length === 0) return null

  const firstLine = lines[0]
  if (!firstLine) return null

  const root: TreeNode = {
    name: firstLine.trim(),
    children: [],
    level: 0
  }

  const stack: { node: TreeNode; level: number }[] = [{ node: root, level: -1 }]

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line) continue
    
    const match = line.match(/^(\s*)(.*)/)
    if (!match || !match[2]) continue

    const spaces = match[1]?.length || 0
    const content = match[2].trim()
    if (!content) continue
    
    const level = Math.floor(spaces / 2)

    const newNode: TreeNode = {
      name: content,
      children: [],
      level: level
    }

    while (stack.length > 0 && stack[stack.length - 1]?.level !== undefined && stack[stack.length - 1]!.level >= level) {
      stack.pop()
    }

    const parent = stack[stack.length - 1]
    if (parent) {
      parent.node.children.push(newNode)
    }

    stack.push({ node: newNode, level })
  }

  return root
}

// Calculate text width (approximate)
const getTextWidth = (text: string, fontSize: number): number => {
  return text.length * fontSize * 0.8
}

// Get node dimensions based on type
const getNodeDimensions = (node: TreeNode): { width: number; height: number } => {
  const isLeaf = node.children.length === 0
  const fontSize = settings.value.fontSize
  
  if (isLeaf) {
    // Leaf node: vertical text, narrow and tall
    const charCount = node.name.length
    const width = settings.value.nodeWidth
    const height = charCount * (fontSize + 4) + 20
    return { width, height }
  } else {
    // Non-leaf node: horizontal text
    const textWidth = getTextWidth(node.name, fontSize)
    const width = Math.max(textWidth + 20, 80)
    const height = settings.value.nodeHeight
    return { width, height }
  }
}

// Calculate subtree width
const getSubtreeWidth = (node: TreeNode): number => {
  const dims = getNodeDimensions(node)
  
  if (node.children.length === 0) {
    return dims.width
  }
  
  const childrenWidth = node.children.reduce((sum, child) => sum + getSubtreeWidth(child), 0)
  const spacing = Math.max(0, node.children.length - 1) * settings.value.horizontalSpacing
  return Math.max(dims.width, childrenWidth + spacing)
}

// Draw the tree using Fabric.js
const drawTree = (tree: TreeNode) => {
  if (!fabricCanvas) return
  
  fabricCanvas.clear()
  
  // Add dotted grid background
  const gridSize = 20
  const width = fabricCanvas.width || 2000
  const height = fabricCanvas.height || 1500
  
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      const dot = new Circle({
        left: x,
        top: y,
        radius: 1,
        fill: '#e0e0e0',
        selectable: false,
        evented: false
      })
      fabricCanvas.add(dot)
    }
  }
  
  // Collect all node positions for drawing connections later
  const nodePositions: Map<TreeNode, NodePosition> = new Map()
  
  // Draw a node and its children recursively
  const drawNode = (node: TreeNode, x: number, y: number, availableWidth: number) => {
    const isLeaf = node.children.length === 0
    const dims = getNodeDimensions(node)
    const nodeX = x + (availableWidth - dims.width) / 2
    
    // Store node position
    nodePositions.set(node, {
      x: nodeX,
      y: y,
      width: dims.width,
      height: dims.height,
      centerX: nodeX + dims.width / 2
    })
    
    // Draw rectangle
    const rect = new Rect({
      left: nodeX,
      top: y,
      width: dims.width,
      height: dims.height,
      fill: '#ffffff',
      stroke: settings.value.borderColor,
      strokeWidth: settings.value.borderWidth,
      selectable: false
    })
    fabricCanvas!.add(rect)
    
    // Draw text
    if (isLeaf) {
      // Vertical text for leaf nodes - each character on a new line
      const chars = node.name.split('')
      const charHeight = settings.value.fontSize + 4
      const totalTextHeight = chars.length * charHeight
      const startY = y + (dims.height - totalTextHeight) / 2 + charHeight / 2
      
      chars.forEach((char, idx) => {
        const textObj = new IText(char, {
          left: nodeX + dims.width / 2,
          top: startY + idx * charHeight,
          fontSize: settings.value.fontSize,
          fontFamily: settings.value.fontFamily,
          fontWeight: settings.value.boldFont ? 'bold' : 'normal',
          fill: settings.value.textColor,
          originX: 'center',
          originY: 'center',
          selectable: false,
          editable: false
        })
        fabricCanvas!.add(textObj)
      })
    } else {
      // Horizontal text for non-leaf nodes
      const textObj = new IText(node.name, {
        left: nodeX + dims.width / 2,
        top: y + dims.height / 2,
        fontSize: settings.value.fontSize,
        fontFamily: settings.value.fontFamily,
        fontWeight: settings.value.boldFont ? 'bold' : 'normal',
        fill: settings.value.textColor,
        originX: 'center',
        originY: 'center',
        selectable: false,
        editable: false
      })
      fabricCanvas!.add(textObj)
    }
    
    // Draw children
    if (node.children.length > 0) {
      const parentPos = nodePositions.get(node)!
      const childY = y + dims.height + settings.value.verticalSpacing
      let childX = x
      
      // First pass: draw all children
      node.children.forEach((child) => {
        const childWidth = getSubtreeWidth(child)
        drawNode(child, childX, childY, childWidth)
        childX += childWidth + settings.value.horizontalSpacing
      })
      
      // Second pass: draw connections
      const parentCenterX = parentPos.centerX
      const parentBottomY = parentPos.y + parentPos.height
      
      // Collect child center positions
      const childCenters = node.children.map(child => {
        const pos = nodePositions.get(child)
        return pos ? { centerX: pos.centerX, topY: pos.y } : null
      }).filter(Boolean) as { centerX: number; topY: number }[]
      
      if (childCenters.length > 0) {
        const midY = (parentBottomY + childCenters[0].topY) / 2
        
        // Line from parent down to mid-point
        const parentVertLine = new Line([parentCenterX, parentBottomY, parentCenterX, midY], {
          stroke: settings.value.borderColor,
          strokeWidth: settings.value.borderWidth,
          selectable: false
        })
        fabricCanvas!.add(parentVertLine)
        
        // Horizontal line connecting all children
        if (childCenters.length > 1) {
          const leftmost = childCenters[0].centerX
          const rightmost = childCenters[childCenters.length - 1].centerX
          const horizLine = new Line([leftmost, midY, rightmost, midY], {
            stroke: settings.value.borderColor,
            strokeWidth: settings.value.borderWidth,
            selectable: false
          })
          fabricCanvas!.add(horizLine)
        }
        
        // Vertical lines from mid-point to each child
        childCenters.forEach(child => {
          const childVertLine = new Line([child.centerX, midY, child.centerX, child.topY], {
            stroke: settings.value.borderColor,
            strokeWidth: settings.value.borderWidth,
            selectable: false
          })
          fabricCanvas!.add(childVertLine)
          
          // Arrow
          if (settings.value.showArrows) {
            const arrow = new Triangle({
              left: child.centerX,
              top: child.topY,
              width: settings.value.arrowWidth,
              height: settings.value.arrowHeight,
              fill: settings.value.borderColor,
              angle: 180,
              originX: 'center',
              originY: 'top',
              selectable: false
            })
            fabricCanvas!.add(arrow)
          }
        })
      }
    }
  }
  
  const totalWidth = getSubtreeWidth(tree)
  const startX = 100
  const startY = 80
  
  drawNode(tree, startX, startY, totalWidth)
  
  fabricCanvas.requestRenderAll()
}

// Generate diagram
const generateDiagram = () => {
  const tree = parseToTree(inputText.value)
  if (tree) {
    drawTree(tree)
    applyZoom()
  }
}

// Zoom controls
const applyZoom = () => {
  if (!fabricCanvas) return
  fabricCanvas.setZoom(settings.value.zoom)
  fabricCanvas.requestRenderAll()
}

const zoomIn = () => {
  settings.value.zoom = Math.min(2, settings.value.zoom + 0.1)
  applyZoom()
}

const zoomOut = () => {
  settings.value.zoom = Math.max(0.1, settings.value.zoom - 0.1)
  applyZoom()
}

// Toggle fullscreen
const toggleFullscreen = () => {
  if (!canvasContainer.value) return
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    canvasContainer.value.requestFullscreen()
  }
}

// Export image
const exportImage = () => {
  if (!fabricCanvas) return
  const dataUrl = fabricCanvas.toDataURL({
    format: 'png',
    quality: 1,
    multiplier: 2
  })
  const link = document.createElement('a')
  link.download = 'module-diagram.png'
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Copy to clipboard
const copyToClipboard = async () => {
  if (!fabricCanvas) return
  try {
    const dataUrl = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    })
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    alert('已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
    alert('复制失败，请使用导出功能')
  }
}

// Initialize canvas
onMounted(async () => {
  await nextTick()
  
  if (!canvasEl.value || !canvasContainer.value) return
  
  fabricCanvas = markRaw(new Canvas(canvasEl.value, {
    width: 2000,
    height: 1500,
    backgroundColor: '#ffffff',
    selection: false
  }))
  
  generateDiagram()
})
</script>

<style scoped>
#module-canvas {
  display: block;
}
</style>
