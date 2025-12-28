# OneWriter - 学术写作辅助工具

一个集成多种学术写作工具的现代化Web应用，帮助研究人员和学生提高写作效率。

## 📁 项目结构

```
one-writer/
├── frontend/              # Vue 3 前端应用
│   ├── src/
│   │   ├── views/        # 页面组件
│   │   ├── router/       # 路由配置
│   │   ├── App.vue       # 根组件
│   │   ├── main.ts       # 入口文件
│   │   └── style.css     # 全局样式
│   ├── public/           # 静态资源
│   ├── package.json      # 前端依赖
│   └── vite.config.ts    # Vite配置
│
├── backend/              # Flask 后端服务
│   ├── api.py           # API服务入口
│   ├── requirements.txt  # Python依赖
│   ├── generated_diagrams/  # 生成的图表存储
│   └── README.md        # 后端文档
│
├── uml.py               # PlantUML工具脚本
├── 功能模块.txt          # 功能需求文档
└── 用例图使用说明.md     # 使用说明
```

## 🚀 快速开始

### 前置要求

- Node.js 18+
- Python 3.8+
- pnpm (前端包管理器)
- uv (Python包管理器，推荐)

### 1. 启动后端服务

```bash
cd backend

# 安装依赖
uv pip install -r requirements.txt --system

# 启动服务
python api.py
```

后端服务将在 **http://localhost:8000** 启动

### 2. 启动前端服务

```bash
cd frontend

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

前端服务将在 **http://localhost:9000** 启动

## 🎯 功能特性

### 📊 图表生成工具
- **功能模块图** - 嵌入校园小助手在线工具
- **用例图生成** - 调用本地PlantUML服务生成UML用例图
- **架构图生成** - 嵌入飞书文档工具
- **数据库E-R图** - 嵌入飞书E-R图工具
- **其他图表** - Mermaid Chart在线编辑器

### 📝 文档处理工具
- **参考文献处理** - 批量去除DOI、编号、URL等
- **Markdown转Word** - 实时预览，支持导出多种格式

### 🔗 工具链接导航
- 50+学术写作相关工具
- 8大分类：计算机工具、写作工具、降重工具、文档工具、查重工具、财务数据、数据分析、查找文献
- 智能搜索功能

## 🛠️ 技术栈

### 前端
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI框架**: Element Plus
- **路由**: Vue Router 4
- **包管理**: pnpm

### 后端
- **框架**: Flask
- **图表生成**: PlantUML
- **跨域支持**: Flask-CORS
- **包管理**: uv

## 📋 开发规范

### 端口配置
- 前端服务端口：**9000**
- 后端API端口：**8000**

### 前端规范
- 使用 pnpm 作为包管理器
- 使用 Element Plus UI框架
- 禁止使用紫色作为主题色
- 使用水平导航菜单

### 后端规范
- 使用 uv 进行项目管理
- API端口固定为 8000
- 生成的文件保存在 `generated_diagrams/` 目录

## 📖 使用文档

详细的使用说明请参考：
- [用例图使用说明](./用例图使用说明.md)
- [后端API文档](./backend/README.md)
- [前端开发文档](./frontend/README.md)

## 🎨 设计特色

- ✨ 现代化渐变色设计
- 🎭 流畅的动画效果
- 📱 完全响应式布局
- 🎯 直观的用户界面
- 💎 玻璃态设计元素

## 📝 Git版本控制

项目使用Git进行版本控制，已配置`.gitignore`文件，忽略：
- 编译产物（`dist/`, `build/`）
- 依赖包（`node_modules/`, `__pycache__/`）
- IDE配置文件（`.vscode/`, `.idea/`）
- 生成的文件（`generated_diagrams/`）
- 日志文件

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 License

MIT

## 👥 作者

OneWriter Team
