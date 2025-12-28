# OneWriter 后端服务

使用 PlantUML 生成 UML 图表的后端 API 服务。

## 功能

- 接收 PlantUML 代码
- 生成 UML 图表（PNG格式）
- 提供图表访问接口

## 安装依赖

```bash
pip install -r requirements.txt
```

或使用 uv（推荐）：

```bash
uv pip install -r requirements.txt
```

## 启动服务

```bash
python api.py
```

服务将在 `http://localhost:8000` 启动

## API 接口

### 1. 生成 UML 图表

**POST** `/api/generate-uml`

请求体：
```json
{
  "content": "@startuml\nactor 用户\n@enduml"
}
```

响应：
```json
{
  "success": true,
  "filename": "diagram_abc123_20241228.png",
  "url": "/api/diagram/diagram_abc123_20241228.png"
}
```

### 2. 获取图表

**GET** `/api/diagram/<filename>`

返回生成的 PNG 图片

### 3. 健康检查

**GET** `/api/health`

响应：
```json
{
  "status": "ok"
}
```

## 目录结构

```
backend/
├── api.py                  # Flask API 服务
├── requirements.txt        # Python 依赖
├── generated_diagrams/     # 生成的图表存储目录（自动创建）
└── README.md              # 本文件
```

## 注意事项

- 端口：8000（与用户规范一致）
- 生成的图表保存在 `generated_diagrams/` 目录
- 支持跨域请求（CORS）
- 使用 PlantUML 官方服务器生成图表
