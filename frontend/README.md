# OneWriter - 学术写作辅助工具

一个集成多种学术写作工具的现代化Web应用，帮助研究人员和学生提高写作效率。

## 功能特性

### 📊 图表生成工具
- **功能模块图生成** - 使用在线工具快速生成系统功能模块图
- **用例图生成** - 输入PlantUML代码，实时预览和生成用例图
- **架构图生成** - 集成飞书文档，在线生成系统架构图
- **数据库E-R图** - 快速生成数据库实体关系图
- **其他图表** - 支持流程图、时序图、甘特图等多种图表类型

### 📝 文档处理工具
- **参考文献处理** - 批量去除DOI、编号、URL等，支持自定义处理选项
- **Markdown转Word** - 实时预览Markdown，支持导出为Word、HTML、PDF格式

### 🔗 工具链接导航
- 50+学术写作相关工具和资源
- 8大分类：计算机工具、写作工具、降重工具、文档工具、查重工具、财务数据、数据分析、查找文献
- 智能搜索功能

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI框架**: Element Plus
- **路由**: Vue Router 4
- **包管理**: pnpm

## 快速开始

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```
应用将在 http://localhost:9000 启动

### 构建生产版本
```bash
pnpm build
```

## 项目结构

```
frontend/
├── src/
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页
│   │   ├── DiagramGenerator.vue    # 功能模块图
│   │   ├── UsecaseDiagram.vue      # 用例图
│   │   ├── ArchitectureDiagram.vue # 架构图
│   │   ├── ERDiagram.vue           # E-R图
│   │   ├── OtherDiagrams.vue       # 其他图表
│   │   ├── ReferenceProcessor.vue  # 参考文献处理
│   │   ├── MarkdownConverter.vue   # Markdown转换
│   │   └── ToolLinks.vue           # 工具链接
│   ├── router/             # 路由配置
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── style.css          # 全局样式
├── public/                # 静态资源
├── index.html            # HTML模板
└── package.json          # 项目配置

```

## 设计特色

- ✨ 现代化渐变色设计
- 🎨 精美的卡片和动画效果
- 📱 完全响应式布局
- 🚀 流畅的页面过渡动画
- 🎯 直观的用户界面

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发规范

- 端口配置：前端服务端口 9000
- 包管理器：使用 pnpm
- UI框架：Element Plus
- 禁止使用紫色作为主题色

## License

MIT

## 作者

OneWriter Team
