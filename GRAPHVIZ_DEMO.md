# Graphviz 可视化展示页面

## 📋 功能概述

本项目实现了一个完整的 Graphviz 可视化展示页面，支持交互式节点选择和下游依赖关系高亮显示。

## ✨ 主要功能

### 1. 图表渲染
- 使用 `@hpcc-js/wasm` 库解析和渲染 DOT 格式的图表
- 支持多种节点形状和布局方向
- 自动计算最佳布局和视觉效果

### 2. 交互式节点选择
- 点击任意节点高亮显示其下游依赖关系
- 选中节点用红色高亮显示
- 下游节点用橙色高亮显示
- 无关节点和连线自动变暗

### 3. 可视化控制
- **重置高亮**: 清除所有高亮效果，恢复原始状态
- **适应屏幕**: 自动缩放和居中显示图表
- **缩放和拖拽**: 支持鼠标滚轮缩放和拖拽移动

### 4. 示例图表
提供三种不同类型的示例图表：
- **工作流示例**: 数据处理流程图
- **依赖关系示例**: 微服务架构依赖图
- **网络拓扑示例**: 网络设备连接图

## 🛠 技术架构

### 前端技术栈
- **Vue 3**: 采用 Composition API 的现代前端框架
- **Vite**: 快速的构建工具和开发服务器
- **@hpcc-js/wasm**: Graphviz WASM 实现，用于解析 DOT 格式
- **D3.js**: 数据可视化和 DOM 操作库

### 核心组件
- `GraphvizViewer.vue`: 主要的可视化组件

### 关键功能实现

#### 1. DOT 格式解析
```javascript
const svg = graphviz.dot(currentDot)
```

#### 2. 节点连接关系解析
```javascript
function parseConnections() {
  // 解析 SVG 中的节点和边
  // 构建邻接关系映射表
}
```

#### 3. 下游节点查找
```javascript
function getDownstreamNodes(nodeId) {
  // 深度优先搜索下游依赖节点
  // 避免循环依赖
}
```

#### 4. 高亮显示逻辑
```javascript
function highlightDownstream(nodeId) {
  // 高亮选中节点（红色）
  // 高亮下游节点（橙色）
  // 变暗无关节点和连线
}
```

## 🎯 使用方法

### 启动应用
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 交互操作
1. **选择节点**: 点击任意节点查看其下游依赖
2. **重置视图**: 点击"重置高亮"按钮清除选择
3. **调整视图**: 点击"适应屏幕"按钮自动缩放
4. **缩放移动**: 使用鼠标滚轮缩放，拖拽移动视图
5. **切换示例**: 使用下方下拉菜单切换不同的示例图表

### 视觉反馈
- **鼠标悬停**: 节点显示橙色边框
- **选中节点**: 红色高亮显示
- **下游节点**: 橙色高亮显示
- **无关元素**: 透明度降低，变为灰色

## 📁 项目结构

```
src/
├── components/
│   └── GraphvizViewer.vue    # 主要可视化组件
├── App.vue                   # 根组件
└── main.js                   # 应用入口
```

## 🔧 自定义扩展

### 添加新的示例图表
在 `GraphvizViewer.vue` 中的 `sampleGraphs` 对象添加新的 DOT 格式图表：

```javascript
const sampleGraphs = {
  // 现有示例...
  custom: `
    digraph CustomGraph {
      // 你的 DOT 格式图表定义
    }
  `
}
```

### 修改高亮颜色
在 `highlightDownstream` 函数中修改颜色值：

```javascript
// 选中节点颜色 - 当前为红色 (#ff6b35)
node.select('ellipse, polygon, rect')
  .attr('fill', '#your-color')

// 下游节点颜色 - 当前为橙色 (#ffa500)
node.select('ellipse, polygon, rect')
  .attr('fill', '#your-color')
```

## 🎨 样式自定义

组件使用 Vue 的 scoped CSS，可以通过修改 `<style scoped>` 部分来自定义界面样式。

## 🚀 性能优化

- 使用 Vue 3 的响应式系统优化重渲染
- D3.js 事件处理优化交互性能
- WASM 版本的 Graphviz 提供本地性能
- 智能的连接关系缓存避免重复计算

## 📝 注意事项

1. 确保 DOT 格式语法正确
2. 大型图表可能需要更长的渲染时间
3. 复杂的依赖关系可能影响高亮显示性能
4. 建议在现代浏览器中使用以获得最佳体验

## 🎉 演示效果

应用已经在 `http://localhost:5173` 上运行，你可以：

1. 查看三种不同类型的示例图表
2. 点击任意节点体验交互式高亮功能
3. 使用控制按钮管理视图状态
4. 通过缩放和拖拽探索大型图表

这个实现提供了完整的 Graphviz 可视化解决方案，支持复杂的节点依赖关系分析和直观的交互体验。