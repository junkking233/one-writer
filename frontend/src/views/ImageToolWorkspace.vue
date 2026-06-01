<template>
  <div class="image-tool-page animate-fade-in" :style="{ '--tool-gradient': currentTool.gradient, '--tool-color': currentTool.color }">
    <div class="page-header">
      <div class="title-section">
        <span class="tool-kicker">图片工具</span>
        <h1 class="page-title">
          <el-icon class="title-icon"><Picture /></el-icon>
          {{ currentTool.title }}
        </h1>
        <p class="page-subtitle">{{ currentTool.description }}</p>
      </div>
      <div class="status-badge">占位中</div>
    </div>

    <div class="workspace-grid">
      <div class="card-premium upload-panel">
        <div class="panel-header">
          <span><el-icon><Upload /></el-icon> 图片输入</span>
          <el-button v-if="previewUrl" class="round-btn" @click="clearImage">
            <el-icon><Delete /></el-icon>
            清空
          </el-button>
        </div>

        <el-upload
          drag
          :show-file-list="false"
          accept="image/*"
          :before-upload="handleImageUpload"
          class="image-upload"
        >
          <div v-if="previewUrl" class="preview-wrap">
            <img :src="previewUrl" :alt="fileName" />
          </div>
          <template v-else>
            <el-icon class="upload-icon"><Picture /></el-icon>
            <div class="upload-title">放入图片</div>
            <div class="upload-subtitle">PNG / JPG / WebP / SVG</div>
          </template>
        </el-upload>
      </div>

      <div class="card-premium output-panel">
        <div class="panel-header">
          <span><el-icon><View /></el-icon> 处理结果</span>
          <el-button type="primary" class="process-btn" @click="runPlaceholder">
            <el-icon><MagicStick /></el-icon>
            开始处理
          </el-button>
        </div>

        <div class="result-stage">
          <div class="result-mark">
            <el-icon><Picture /></el-icon>
          </div>
          <h2>{{ currentTool.resultTitle }}</h2>
          <p>{{ previewUrl ? fileName : '等待图片输入' }}</p>
        </div>
      </div>
    </div>

    <div class="tool-steps card-premium">
      <div
        v-for="step in currentTool.steps"
        :key="step"
        class="step-chip"
      >
        {{ step }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Delete,
  MagicStick,
  Picture,
  Upload,
  View
} from '@element-plus/icons-vue'

const route = useRoute()
const previewUrl = ref('')
const fileName = ref('')

const toolMap = {
  'system-architecture': {
    title: '系统架构图',
    description: '用于架构图图片上传、识别、优化和导出。',
    resultTitle: '架构图处理区',
    gradient: 'var(--gradient-sky)',
    color: '#1E73E8',
    steps: ['上传架构图', '识别层级', '结构优化', '导出图片']
  },
  'er-diagram': {
    title: 'ER图',
    description: '用于实体关系图图片上传、整理和格式处理。',
    resultTitle: 'ER 图处理区',
    gradient: 'var(--gradient-grass)',
    color: '#22C55E',
    steps: ['上传 ER 图', '识别实体', '整理关系', '导出图片']
  },
  'sequence-diagram': {
    title: '时序图',
    description: '用于时序图图片上传、清晰化和版式处理。',
    resultTitle: '时序图处理区',
    gradient: 'var(--gradient-sun)',
    color: '#FF9F43',
    steps: ['上传时序图', '识别生命线', '调整间距', '导出图片']
  },
  'flow-chart': {
    title: '流程图',
    description: '用于流程图图片上传、节点整理和视觉优化。',
    resultTitle: '流程图处理区',
    gradient: 'var(--gradient-primary)',
    color: '#10BFA3',
    steps: ['上传流程图', '识别节点', '优化连线', '导出图片']
  },
  'class-diagram': {
    title: '类图',
    description: '用于类图图片上传、类关系识别和排版处理。',
    resultTitle: '类图处理区',
    gradient: 'var(--gradient-coral)',
    color: '#FF5C48',
    steps: ['上传类图', '识别类名', '整理关系', '导出图片']
  }
} as const

const currentTool = computed(() => {
  const toolKey = String(route.params.toolKey || '')
  return toolMap[toolKey as keyof typeof toolMap] || toolMap['system-architecture']
})

const handleImageUpload = (file: File) => {
  if (!file.type.startsWith('image/')) {
    ElMessage.warning('请选择图片文件')
    return false
  }

  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = event => {
    previewUrl.value = String(event.target?.result || '')
  }
  reader.readAsDataURL(file)
  return false
}

const clearImage = () => {
  previewUrl.value = ''
  fileName.value = ''
}

const runPlaceholder = () => {
  ElMessage.info(`${currentTool.value.title}处理能力待接入`)
}
</script>

<style scoped>
.image-tool-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
  padding: 24px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tool-color) 24%, transparent);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--tool-color) 11%, white), rgba(255, 255, 255, 0.84)),
    var(--gradient-page-bg);
  box-shadow: var(--shadow-sm);
}

.tool-kicker {
  color: var(--color-text-link);
  font-size: 13px;
  font-weight: 900;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 6px 0 8px;
  color: var(--color-text-strong);
  font-size: 32px;
  font-weight: 900;
}

.title-icon {
  color: var(--tool-color);
}

.page-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
}

.status-badge {
  padding: 8px 12px;
  border-radius: var(--radius-full);
  background: var(--tool-gradient);
  color: white;
  font-size: 13px;
  font-weight: 900;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
  gap: 22px;
  margin-bottom: 22px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
  color: var(--color-text-strong);
  font-size: 17px;
  font-weight: 850;
}

.panel-header span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.round-btn,
.process-btn {
  border-radius: var(--radius-md);
  font-weight: 700;
}

.process-btn {
  background: var(--tool-gradient);
  border: 0;
}

.image-upload :deep(.el-upload) {
  width: 100%;
}

.image-upload :deep(.el-upload-dragger) {
  display: flex;
  min-height: 420px;
  align-items: center;
  justify-content: center;
  border-color: color-mix(in srgb, var(--tool-color) 30%, transparent);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, color-mix(in srgb, var(--tool-color) 8%, white), rgba(255, 255, 255, 0.9));
}

.upload-icon {
  color: var(--tool-color);
  font-size: 58px;
}

.upload-title {
  margin-top: 10px;
  color: var(--color-text-strong);
  font-size: 20px;
  font-weight: 900;
}

.upload-subtitle {
  margin-top: 6px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 700;
}

.preview-wrap {
  width: 100%;
  height: 420px;
  padding: 14px;
}

.preview-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.result-stage {
  display: grid;
  min-height: 420px;
  place-items: center;
  align-content: center;
  gap: 12px;
  border: 1px dashed color-mix(in srgb, var(--tool-color) 30%, transparent);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.86), color-mix(in srgb, var(--tool-color) 8%, white));
  text-align: center;
}

.result-mark {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border-radius: var(--radius-lg);
  background: var(--tool-gradient);
  color: white;
  font-size: 38px;
  box-shadow: 0 16px 30px color-mix(in srgb, var(--tool-color) 24%, transparent);
}

.result-stage h2 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: 22px;
  font-weight: 900;
}

.result-stage p {
  max-width: 280px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 700;
  word-break: break-word;
}

.tool-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 22px;
}

.step-chip {
  padding: 9px 12px;
  border: 1px solid color-mix(in srgb, var(--tool-color) 24%, transparent);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--tool-color) 9%, white);
  color: var(--color-text-strong);
  font-size: 13px;
  font-weight: 850;
}

@media (max-width: 1000px) {
  .workspace-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .image-upload :deep(.el-upload-dragger),
  .preview-wrap,
  .result-stage {
    min-height: 300px;
    height: 300px;
  }
}
</style>
