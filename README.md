# Test AI Bot 🤖

一个现代化的AI聊天机器人测试项目，使用React + Express + OpenAI API构建。

## 功能特性

- 🎨 现代化的聊天界面
- 🤖 支持OpenAI API集成
- 📱 响应式设计，支持移动端
- 🔄 实时消息传输
- 💾 对话历史记录
- 🎭 演示模式（无需API密钥）

## 技术栈

- **前端**: React + Vite
- **后端**: Express.js
- **AI**: OpenAI API
- **样式**: 纯CSS + 现代动效

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境配置

复制环境变量文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的OpenAI API密钥（可选）：
```
OPENAI_API_KEY=your_api_key_here
```

> 注意：如果不设置API密钥，应用会在演示模式下运行，使用预定义的回复。

### 3. 启动应用

#### 开发模式

同时启动前端和后端：

```bash
# 终端1：启动后端服务器
pnpm start

# 终端2：启动前端开发服务器
pnpm dev
```

#### 生产模式

```bash
# 构建前端
pnpm build

# 启动后端服务器（会自动服务静态文件）
pnpm start
```

### 4. 访问应用

- 开发模式：http://localhost:3000
- 生产模式：http://localhost:3001

## API 端点

- `GET /api/health` - 服务器健康检查
- `POST /api/chat` - 发送聊天消息

## 项目结构

```
test-ai-bot/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.jsx         # React入口
│   ├── index.css        # 全局样式
│   └── server.js        # Express服务器
├── public/              # 静态资源
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
└── .env.example         # 环境变量模板
```

## 开发说明

### 前端开发
- 使用React hooks进行状态管理
- 支持实时消息和输入状态
- 响应式设计，适配各种屏幕

### 后端开发
- Express.js提供RESTful API
- 支持CORS跨域
- 优雅的错误处理

### AI集成
- 支持OpenAI GPT模型
- 维护对话上下文
- 演示模式备选方案

## 许可证

MIT License