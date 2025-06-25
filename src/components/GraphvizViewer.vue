<template>
  <div class="graphviz-container">
    <div class="controls">
      <h2>Graphviz 可视化展示</h2>
      <div class="control-buttons">
        <button @click="resetHighlight" class="reset-btn">重置高亮</button>
        <button @click="fitToScreen" class="fit-btn">适应屏幕</button>
      </div>
      <div class="instructions">
        <p>点击任意节点查看其下游依赖关系</p>
        <p v-if="selectedNode" class="selected-info">
          当前选中: <strong>{{ selectedNode }}</strong>
        </p>
      </div>
    </div>
    
    <div class="graph-wrapper">
      <div ref="graphContainer" class="graph-container"></div>
    </div>
    
    <div class="sample-controls">
      <h3>示例图表</h3>
      <select v-model="selectedSample" @change="loadSample">
        <option value="workflow">工作流示例</option>
        <option value="dependency">依赖关系示例</option>
        <option value="network">网络拓扑示例</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Graphviz } from '@hpcc-js/wasm'
import * as d3 from 'd3'

const graphContainer = ref(null)
const selectedNode = ref('')
const selectedSample = ref('workflow')
let graphviz = null
let currentDot = ''
let nodeConnections = new Map() // 存储节点连接关系
let originalColors = new Map() // 存储原始颜色

// 示例 DOT 图表
const sampleGraphs = {
  workflow: `
    digraph Workflow {
      rankdir=TB;
      node [shape=box, style=filled, fillcolor=lightblue];
      edge [color=gray, arrowhead=vee];
      
      Start [fillcolor=lightgreen];
      "数据采集" -> "数据清洗";
      "数据清洗" -> "数据验证";
      "数据验证" -> "数据转换";
      "数据转换" -> "数据存储";
      "数据存储" -> "数据分析";
      "数据分析" -> "报告生成";
      "报告生成" -> End;
      End [fillcolor=lightcoral];
      
      Start -> "数据采集";
      "数据分析" -> "异常检测";
      "异常检测" -> "告警通知";
    }
  `,
  dependency: `
    digraph Dependencies {
      rankdir=LR;
      node [shape=ellipse, style=filled, fillcolor=lightyellow];
      edge [color=darkblue, arrowhead=vee];
      
      "前端应用" -> "API网关";
      "API网关" -> "用户服务";
      "API网关" -> "订单服务";
      "API网关" -> "支付服务";
      
      "用户服务" -> "用户数据库";
      "订单服务" -> "订单数据库";
      "支付服务" -> "支付数据库";
      
      "订单服务" -> "库存服务";
      "支付服务" -> "第三方支付";
      "库存服务" -> "库存数据库";
      
      "用户服务" -> "缓存服务";
      "订单服务" -> "缓存服务";
      "支付服务" -> "消息队列";
      "消息队列" -> "通知服务";
    }
  `,
  network: `
    digraph Network {
      rankdir=TB;
      node [shape=circle, style=filled, fillcolor=lightcyan];
      edge [color=darkgreen, arrowhead=vee];
      
      "路由器A" -> "交换机1";
      "路由器A" -> "交换机2";
      "交换机1" -> "服务器1";
      "交换机1" -> "服务器2";
      "交换机2" -> "服务器3";
      "交换机2" -> "服务器4";
      
      "服务器1" -> "数据库1";
      "服务器2" -> "数据库1";
      "服务器3" -> "数据库2";
      "服务器4" -> "数据库2";
      
      "路由器A" -> "防火墙";
      "防火墙" -> "互联网";
    }
  `
}

onMounted(async () => {
  await initGraphviz()
  await loadSample()
})

async function initGraphviz() {
  try {
    graphviz = await Graphviz.load()
    console.log('Graphviz 初始化成功')
  } catch (error) {
    console.error('Graphviz 初始化失败:', error)
  }
}

async function loadSample() {
  if (!graphviz) return
  
  currentDot = sampleGraphs[selectedSample.value]
  await renderGraph()
}

async function renderGraph() {
  if (!graphviz || !currentDot) return
  
  try {
    // 渲染 SVG
    const svg = graphviz.dot(currentDot)
    
    // 清空容器并插入新的 SVG
    const container = d3.select(graphContainer.value)
    container.selectAll('*').remove()
    container.html(svg)
    
    // 解析节点连接关系
    parseConnections()
    
    // 添加交互功能
    addInteractivity()
    
    // 添加缩放功能
    addZoomBehavior()
    
    console.log('图表渲染成功')
  } catch (error) {
    console.error('图表渲染失败:', error)
  }
}

function parseConnections() {
  nodeConnections.clear()
  originalColors.clear()
  
  const container = d3.select(graphContainer.value)
  const nodes = container.selectAll('.node')
  const edges = container.selectAll('.edge')
  
  // 存储每个节点的原始颜色
  nodes.each(function() {
    const node = d3.select(this)
    const title = node.select('title').text()
    const fill = node.select('ellipse, polygon, rect').attr('fill') || 'lightblue'
    originalColors.set(title, fill)
    
    if (!nodeConnections.has(title)) {
      nodeConnections.set(title, { downstream: [], upstream: [] })
    }
  })
  
  // 解析边的连接关系
  edges.each(function() {
    const edge = d3.select(this)
    const title = edge.select('title').text()
    const [source, target] = title.split('->')
    
    if (source && target) {
      const cleanSource = source.trim()
      const cleanTarget = target.trim()
      
      if (!nodeConnections.has(cleanSource)) {
        nodeConnections.set(cleanSource, { downstream: [], upstream: [] })
      }
      if (!nodeConnections.has(cleanTarget)) {
        nodeConnections.set(cleanTarget, { downstream: [], upstream: [] })
      }
      
      nodeConnections.get(cleanSource).downstream.push(cleanTarget)
      nodeConnections.get(cleanTarget).upstream.push(cleanSource)
    }
  })
}

function addInteractivity() {
  const container = d3.select(graphContainer.value)
  const nodes = container.selectAll('.node')
  
  nodes
    .style('cursor', 'pointer')
    .on('click', function(event) {
      event.stopPropagation()
      const node = d3.select(this)
      const nodeId = node.select('title').text()
      
      if (selectedNode.value === nodeId) {
        // 如果点击的是已选中的节点，则重置
        resetHighlight()
      } else {
        // 高亮选中的节点及其下游
        highlightDownstream(nodeId)
        selectedNode.value = nodeId
      }
    })
    .on('mouseenter', function() {
      if (!selectedNode.value) {
        d3.select(this).select('ellipse, polygon, rect')
          .attr('stroke', '#ff6b35')
          .attr('stroke-width', '2')
      }
    })
    .on('mouseleave', function() {
      if (!selectedNode.value) {
        d3.select(this).select('ellipse, polygon, rect')
          .attr('stroke', null)
          .attr('stroke-width', null)
      }
    })
}

function highlightDownstream(nodeId) {
  const container = d3.select(graphContainer.value)
  const nodes = container.selectAll('.node')
  const edges = container.selectAll('.edge')
  
  // 重置所有元素样式
  resetHighlight()
  
  // 获取下游节点
  const downstreamNodes = getDownstreamNodes(nodeId)
  const allHighlightedNodes = new Set([nodeId, ...downstreamNodes])
  
  // 高亮相关节点
  nodes.each(function() {
    const node = d3.select(this)
    const title = node.select('title').text()
    
    if (allHighlightedNodes.has(title)) {
      if (title === nodeId) {
        // 选中的节点 - 红色高亮
        node.select('ellipse, polygon, rect')
          .attr('fill', '#ff6b35')
          .attr('stroke', '#d63384')
          .attr('stroke-width', '3')
      } else {
        // 下游节点 - 橙色高亮
        node.select('ellipse, polygon, rect')
          .attr('fill', '#ffa500')
          .attr('stroke', '#ff8c00')
          .attr('stroke-width', '2')
      }
    } else {
      // 未相关的节点 - 变暗
      node.select('ellipse, polygon, rect')
        .attr('fill', '#e9ecef')
        .attr('opacity', '0.3')
    }
  })
  
  // 高亮相关边
  edges.each(function() {
    const edge = d3.select(this)
    const title = edge.select('title').text()
    const [source, target] = title.split('->').map(s => s.trim())
    
    if (allHighlightedNodes.has(source) && allHighlightedNodes.has(target)) {
      // 相关的边 - 高亮
      edge.select('path')
        .attr('stroke', '#ff6b35')
        .attr('stroke-width', '2')
      edge.select('polygon')
        .attr('fill', '#ff6b35')
        .attr('stroke', '#ff6b35')
    } else {
      // 无关的边 - 变暗
      edge.select('path')
        .attr('stroke', '#dee2e6')
        .attr('opacity', '0.3')
      edge.select('polygon')
        .attr('fill', '#dee2e6')
        .attr('opacity', '0.3')
    }
  })
}

function getDownstreamNodes(nodeId) {
  const visited = new Set()
  const result = []
  
  function traverse(id) {
    if (visited.has(id)) return
    visited.add(id)
    
    const connections = nodeConnections.get(id)
    if (connections && connections.downstream) {
      connections.downstream.forEach(downstreamId => {
        if (!visited.has(downstreamId)) {
          result.push(downstreamId)
          traverse(downstreamId)
        }
      })
    }
  }
  
  traverse(nodeId)
  return result
}

function resetHighlight() {
  selectedNode.value = ''
  
  const container = d3.select(graphContainer.value)
  const nodes = container.selectAll('.node')
  const edges = container.selectAll('.edge')
  
  // 重置节点样式
  nodes.each(function() {
    const node = d3.select(this)
    const title = node.select('title').text()
    const originalColor = originalColors.get(title) || 'lightblue'
    
    node.select('ellipse, polygon, rect')
      .attr('fill', originalColor)
      .attr('stroke', null)
      .attr('stroke-width', null)
      .attr('opacity', '1')
  })
  
  // 重置边样式
  edges.each(function() {
    const edge = d3.select(this)
    edge.select('path')
      .attr('stroke', 'black')
      .attr('stroke-width', '1')
      .attr('opacity', '1')
    edge.select('polygon')
      .attr('fill', 'black')
      .attr('stroke', 'black')
      .attr('opacity', '1')
  })
}

function addZoomBehavior() {
  const container = d3.select(graphContainer.value)
  const svg = container.select('svg')
  
  const zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on('zoom', (event) => {
      svg.select('g').attr('transform', event.transform)
    })
  
  svg.call(zoom)
  
  // 点击空白区域重置选择
  svg.on('click', function(event) {
    if (event.target === this) {
      resetHighlight()
    }
  })
}

function fitToScreen() {
  const container = d3.select(graphContainer.value)
  const svg = container.select('svg')
  
  if (svg.empty()) return
  
  const g = svg.select('g')
  const bounds = g.node().getBBox()
  const parent = svg.node().parentElement
  const fullWidth = parent.clientWidth
  const fullHeight = parent.clientHeight
  
  const width = bounds.width
  const height = bounds.height
  const midX = bounds.x + width / 2
  const midY = bounds.y + height / 2
  
  if (width === 0 || height === 0) return
  
  const scale = Math.min(fullWidth / width, fullHeight / height) * 0.9
  const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY]
  
  svg.transition()
    .duration(750)
    .call(
      d3.zoom().transform,
      d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    )
}
</script>

<style scoped>
.graphviz-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
}

.controls {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 10;
}

.controls h2 {
  margin: 0 0 1rem 0;
  color: #333;
}

.control-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.control-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.reset-btn {
  background: #dc3545;
  color: white;
}

.reset-btn:hover {
  background: #c82333;
}

.fit-btn {
  background: #28a745;
  color: white;
}

.fit-btn:hover {
  background: #218838;
}

.instructions {
  font-size: 0.9rem;
  color: #666;
}

.selected-info {
  color: #ff6b35;
  font-weight: 500;
}

.graph-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.graph-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.graph-container :deep(svg) {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.graph-container :deep(svg:active) {
  cursor: grabbing;
}

.sample-controls {
  background: white;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}

.sample-controls h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.sample-controls select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: white;
  min-width: 200px;
}

/* 自定义节点悬停效果 */
.graph-container :deep(.node) {
  transition: all 0.2s ease;
}

.graph-container :deep(.node:hover) {
  filter: drop-shadow(0 0 6px rgba(255, 107, 53, 0.3));
}
</style>