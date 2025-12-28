<template>
  <div class="other-diagrams-page">
    <div class="content-container">
      <el-card class="tool-intro-card" shadow="hover">
        <div class="tool-content">
          <h2 class="tool-name">Mermaid Chart</h2>
          <p class="tool-description">
            Mermaid Chart 是一个基于文本的图表绘制工具，让您可以使用类似 Markdown 的语法快速创建复杂的图表。
            它支持流程图、时序图、甘特图、类图、状态图等多种类型的图表，非常适合开发人员和文档编写者使用。
          </p>
          <div class="tool-actions">
            <el-button type="primary" size="large" @click="openInNewTab" :icon="Link" round>
              前往 Mermaid Chart 使用
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PieChart, Link } from '@element-plus/icons-vue'

const openInNewTab = () => {
  window.open('https://www.mermaidchart.com/play', '_blank')
}
</script>

<style scoped>
.other-diagrams-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px 0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;
}

.page-title .el-icon {
  font-size: 36px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.tool-intro-card {
  max-width: 800px;
  width: 100%;
  text-align: center;
  padding: 48px;
  border-radius: 16px;
}

.tool-icon-large {
  font-size: 80px;
  color: var(--primary-color);
  margin-bottom: 24px;
  display: inline-block;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: 50%;
}

.tool-name {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.tool-description {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tool-actions {
  display: flex;
  justify-content: center;
}

.tool-actions .el-button {
  padding: 16px 48px;
  font-size: 18px;
  height: auto;
}
</style>
