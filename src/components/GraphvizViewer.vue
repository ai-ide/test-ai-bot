<template>
  <div class="graphviz-container">
    <div class="sidebar">
      <div class="sidebar-content">
        <h2>Graphviz 可视化</h2>
        
        <div class="control-section">
          <h3>操作控制</h3>
          <div class="control-buttons">
            <button @click="resetHighlight" class="reset-btn">重置高亮</button>
            <button @click="fitToScreen" class="fit-btn">适应屏幕</button>
            <button @click="toggleDotInput" class="input-btn">
              {{ showDotInput ? '隐藏输入' : '自定义DOT' }}
            </button>
            <label for="file-upload" class="upload-btn">
              上传DOT文件
              <input 
                id="file-upload" 
                type="file" 
                accept=".dot,.gv" 
                @change="handleFileUpload" 
                style="display: none;"
              />
            </label>
          </div>
        </div>
        
        <div class="export-section">
          <h3>导出选项</h3>
          <div class="control-buttons">
            <button @click="exportAsSVG" class="export-btn">导出SVG</button>
            <button @click="exportAsPNG" class="export-btn">导出PNG</button>
          </div>
        </div>
        
        <div class="sample-section">
          <h3>示例图表</h3>
          <select v-model="selectedSample" @change="loadSample" class="sample-select">
            <option value="workflow">工作流示例</option>
            <option value="dependency">依赖关系示例</option>
            <option value="network">网络拓扑示例</option>
          </select>
        </div>
        
        <div v-if="showDotInput" class="dot-input-section">
          <div class="dot-input-header">
            <h3>DOT 代码</h3>
            <button @click="renderCustomDot" class="render-btn" :disabled="!customDot.trim()">
              渲染图表
            </button>
          </div>
          <textarea 
            id="dot-textarea"
            v-model="customDot" 
            placeholder="在此处粘贴或输入 DOT 代码..."
            class="dot-textarea"
            @keydown.ctrl.enter="renderCustomDot"
            @keydown.meta.enter="renderCustomDot"
          ></textarea>
          <p class="input-tip">提示: 按 Ctrl+Enter (Mac: Cmd+Enter) 快速渲染</p>
        </div>
        
        <div class="instructions">
          <h3>使用说明</h3>
          <p>点击任意节点查看其下游依赖关系</p>
          <p v-if="selectedNode" class="selected-info">
            当前选中: <strong>{{ selectedNode }}</strong>
          </p>
          
          <div class="shortcuts">
            <h4>快捷键</h4>
            <div class="shortcut-list">
              <div class="shortcut-item">
                <span class="shortcut-key">Ctrl+R</span>
                <span class="shortcut-desc">重置高亮</span>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-key">Ctrl+F</span>
                <span class="shortcut-desc">适应屏幕</span>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-key">Ctrl+S</span>
                <span class="shortcut-desc">导出SVG</span>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-key">Ctrl+P</span>
                <span class="shortcut-desc">导出PNG</span>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-key">ESC</span>
                <span class="shortcut-desc">重置高亮</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="main-content">
      <div class="graph-wrapper">
        <div v-if="isLoading" class="loading-overlay">
          <div class="loading-spinner"></div>
          <p>正在渲染图表...</p>
        </div>
        <div v-if="errorMessage" class="error-overlay">
          <div class="error-icon">⚠️</div>
          <p>{{ errorMessage }}</p>
          <button @click="retryRender" class="retry-btn">重试</button>
        </div>
        <div ref="graphContainer" class="graph-container" :class="{ hidden: isLoading || errorMessage }"></div>
        <div ref="tooltip" class="tooltip" v-show="tooltipVisible">
          {{ tooltipText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Graphviz } from '@hpcc-js/wasm'
import * as d3 from 'd3'

const graphContainer = ref(null)
const tooltip = ref(null)
const selectedNode = ref('')
const selectedSample = ref('workflow')
const showDotInput = ref(false)
const customDot = ref('')
const tooltipVisible = ref(false)
const tooltipText = ref('')
const isLoading = ref(true)
const errorMessage = ref('')
let graphviz = null
let currentDot = ''
let nodeConnections = new Map() // 存储节点连接关系
let originalColors = new Map() // 存储原始颜色
let originalTexts = new Map() // 存储原始文字内容

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
  setupKeyboardShortcuts()
})

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (event) => {
    // 忽略在输入框中的按键
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
      return
    }
    
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'r':
          event.preventDefault()
          resetHighlight()
          break
        case 'f':
          event.preventDefault()
          fitToScreen()
          break
        case 's':
          event.preventDefault()
          exportAsSVG()
          break
        case 'p':
          event.preventDefault()
          exportAsPNG()
          break
      }
    }
    
    // ESC键重置高亮
    if (event.key === 'Escape') {
      resetHighlight()
    }
  })
}

async function initGraphviz() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    graphviz = await Graphviz.load()
    console.log('Graphviz 初始化成功')
  } catch (error) {
    console.error('Graphviz 初始化失败:', error)
    errorMessage.value = 'Graphviz 初始化失败，请刷新页面重试'
  } finally {
    isLoading.value = false
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
    isLoading.value = true
    errorMessage.value = ''
    
    // 渲染 SVG
    const svg = graphviz.dot(currentDot)
    
    // 清空容器并插入新的 SVG
    const container = d3.select(graphContainer.value)
    container.selectAll('*').remove()
    container.html(svg)
    
    // 确保 SVG 填满容器
    const svgElement = container.select('svg')
    if (!svgElement.empty()) {
      svgElement
        .attr('width', '100%')
        .attr('height', '100%')
        .style('display', 'block')
    }
    
    // 解析节点连接关系
    parseConnections()
    
    // 添加交互功能
    addInteractivity()
    
    // 处理长文字截断
    truncateNodeTexts()
    
    // 添加缩放功能
    addZoomBehavior()
    
    // 自动适应屏幕
    await nextTick()
    fitToScreen()
    
    console.log('图表渲染成功')
    isLoading.value = false
  } catch (error) {
    console.error('图表渲染失败:', error)
    errorMessage.value = '图表渲染失败：' + (error.message || '未知错误')
    isLoading.value = false
  }
}

function parseConnections() {
  nodeConnections.clear()
  originalColors.clear()
  originalTexts.clear()
  
  const container = d3.select(graphContainer.value)
  const nodes = container.selectAll('.node')
  const edges = container.selectAll('.edge')
  
  // 存储每个节点的原始颜色和文字
  nodes.each(function() {
    const node = d3.select(this)
    const title = node.select('title').text()
    const fill = node.select('ellipse, polygon, rect').attr('fill') || 'lightblue'
    const textElement = node.select('text')
    const originalText = textElement.text()
    
    originalColors.set(title, fill)
    originalTexts.set(title, originalText)
    
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

function truncateNodeTexts() {
  const container = d3.select(graphContainer.value)
  const nodes = container.selectAll('.node')
  const maxLength = 25 // 最大显示字符数
  
  nodes.each(function() {
    const node = d3.select(this)
    const textElement = node.select('text')
    const originalText = textElement.text()
    const title = node.select('title').text()
    
    // 存储原始文字（如果还没存储的话）
    if (!originalTexts.has(title)) {
      originalTexts.set(title, originalText)
    }
    
    // 如果文字太长，则截断
    if (originalText.length > maxLength) {
      // 智能截断：优先在分隔符处截断
      let truncatedText = originalText.substring(0, maxLength)
      const separators = [':', '.', '_', '-', ' ']
      
      // 寻找最后一个分隔符位置
      let lastSeparatorIndex = -1
      for (let i = truncatedText.length - 1; i >= Math.max(0, maxLength - 8); i--) {
        if (separators.includes(truncatedText[i])) {
          lastSeparatorIndex = i
          break
        }
      }
      
      // 如果找到合适的分隔符位置，在那里截断
      if (lastSeparatorIndex > maxLength * 0.6) {
        truncatedText = originalText.substring(0, lastSeparatorIndex + 1) + '..'
      } else {
        truncatedText = originalText.substring(0, maxLength) + '...'
      }
      
      textElement.text(truncatedText)
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
    .on('mouseenter', function(event) {
      const node = d3.select(this)
      const nodeId = node.select('title').text()
      const originalText = originalTexts.get(nodeId) || nodeId
      
      // 显示悬浮提示
      if (originalText.length > 25) {
        showTooltip(event, originalText)
      }
      
      if (!selectedNode.value) {
        node.select('ellipse, polygon, rect')
          .attr('stroke', '#ff6b35')
          .attr('stroke-width', '2')
      }
    })
    .on('mouseleave', function() {
      hideTooltip()
      
      if (!selectedNode.value) {
        d3.select(this).select('ellipse, polygon, rect')
          .attr('stroke', null)
          .attr('stroke-width', null)
      }
    })
    .on('mousemove', function(event) {
      if (tooltipVisible.value) {
        updateTooltipPosition(event)
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
  
  // 自动聚焦到选中的节点
  focusOnNode(nodeId)
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
  hideTooltip()
  
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
  const gNode = g.node()
  
  // 检查 g 元素是否存在且不为空
  if (g.empty() || !gNode) {
    console.warn('SVG 中没有找到 g 元素，无法执行适应屏幕操作')
    return
  }
  
  let bounds
  try {
    bounds = gNode.getBBox()
  } catch (error) {
    console.error('获取 SVG 边界框失败:', error)
    return
  }
  
  const parent = svg.node().parentElement
  if (!parent) {
    console.warn('SVG 父元素不存在，无法执行适应屏幕操作')
    return
  }
  
  const fullWidth = parent.clientWidth
  const fullHeight = parent.clientHeight
  
  const width = bounds.width
  const height = bounds.height
  const midX = bounds.x + width / 2
  const midY = bounds.y + height / 2
  
  if (width === 0 || height === 0) {
    console.warn('SVG 内容宽度或高度为0，无法执行适应屏幕操作')
    return
  }
  
  const scale = Math.min(fullWidth / width, fullHeight / height) * 0.9
  const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY]
  
      svg.transition()
    .duration(750)
    .call(
      d3.zoom().transform,
      d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    )
}

function toggleDotInput() {
  showDotInput.value = !showDotInput.value
  
  // 第一次打开时，如果没有内容，则填入示例代码
  if (showDotInput.value && !customDot.value.trim()) {
    customDot.value = `digraph Example {
  rankdir=TB;
  node [shape=box, style=filled, fillcolor=lightblue];
  
  A -> B;
  B -> C;
  B -> D;
  C -> E;
  D -> E;
  E -> F;
}`
  }
}

async function renderCustomDot() {
  if (!customDot.value.trim()) return
  
  currentDot = customDot.value
  await renderGraph()
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = async (e) => {
    const content = e.target.result
    customDot.value = content
    currentDot = content
    await renderGraph()
    
    // 显示输入区域以便用户查看和编辑
    showDotInput.value = true
  }
  reader.readAsText(file)
  
  // 清空文件输入，允许重复上传同一文件
  event.target.value = ''
}

function focusOnNode(nodeId) {
  const container = d3.select(graphContainer.value)
  const svg = container.select('svg')
  
  if (svg.empty()) return
  
  // 找到指定的节点
  let targetNode = null
  const nodes = container.selectAll('.node')
  
  nodes.each(function() {
    const node = d3.select(this)
    const title = node.select('title').text()
    if (title === nodeId) {
      targetNode = this
    }
  })
  
  if (!targetNode) return
  
  try {
    const nodeBounds = targetNode.getBBox()
    const parent = svg.node().parentElement
    
    if (!parent) return
    
    const containerWidth = parent.clientWidth
    const containerHeight = parent.clientHeight
    
    // 计算节点中心点
    const nodeCenterX = nodeBounds.x + nodeBounds.width / 2
    const nodeCenterY = nodeBounds.y + nodeBounds.height / 2
    
    // 设置聚焦缩放级别（比当前稍大一些）
    const focusScale = 1.5
    
    // 计算平移量，让节点居中
    const translateX = containerWidth / 2 - focusScale * nodeCenterX
    const translateY = containerHeight / 2 - focusScale * nodeCenterY
    
    // 应用变换
    svg.transition()
      .duration(500)
      .call(
        d3.zoom().transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(focusScale)
      )
  } catch (error) {
    console.warn('聚焦节点失败:', error)
  }
}

function showTooltip(event, text) {
  tooltipText.value = text
  tooltipVisible.value = true
  updateTooltipPosition(event)
}

function hideTooltip() {
  tooltipVisible.value = false
  tooltipText.value = ''
}

function updateTooltipPosition(event) {
  if (!tooltip.value) return
  
  const tooltipEl = tooltip.value
  const rect = graphContainer.value.getBoundingClientRect()
  
  // 计算相对于图表容器的位置
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 设置tooltip位置，并避免超出边界
  const tooltipWidth = tooltipEl.offsetWidth
  const tooltipHeight = tooltipEl.offsetHeight
  const containerWidth = rect.width
  const containerHeight = rect.height
  
  let left = x + 10
  let top = y - 10
  
  // 防止tooltip超出右边界
  if (left + tooltipWidth > containerWidth) {
    left = x - tooltipWidth - 10
  }
  
  // 防止tooltip超出上边界
  if (top < 0) {
    top = y + 20
  }
  
  // 防止tooltip超出下边界
  if (top + tooltipHeight > containerHeight) {
    top = containerHeight - tooltipHeight - 10
  }
  
  tooltipEl.style.left = `${left}px`
  tooltipEl.style.top = `${top}px`
}

function retryRender() {
  if (currentDot) {
    renderGraph()
  } else {
    loadSample()
  }
}

function exportAsSVG() {
  const container = d3.select(graphContainer.value)
  const svgElement = container.select('svg')
  
  if (svgElement.empty()) {
    alert('没有可导出的图表')
    return
  }
  
  try {
    // 克隆SVG元素
    const svgNode = svgElement.node()
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgNode)
    
    // 创建下载链接
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'graphviz-export.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('导出SVG失败:', error)
    alert('导出SVG失败：' + error.message)
  }
}

function exportAsPNG() {
  const container = d3.select(graphContainer.value)
  const svgElement = container.select('svg')
  
  if (svgElement.empty()) {
    alert('没有可导出的图表')
    return
  }
  
  try {
    const svgNode = svgElement.node()
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgNode)
    
    // 创建canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = function() {
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      
      // 创建下载链接
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'graphviz-export.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    }
    
    img.onerror = function() {
      alert('导出PNG失败：无法转换SVG')
    }
    
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
  } catch (error) {
    console.error('导出PNG失败:', error)
    alert('导出PNG失败：' + error.message)
  }
}
</script>

<style scoped>
.graphviz-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background: #f8f9fa;
}

.sidebar {
  width: 320px;
  background: white;
  box-shadow: 2px 0 4px rgba(0,0,0,0.1);
  z-index: 10;
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-content {
  padding: 1rem;
}

.sidebar h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

.sidebar h3 {
  margin: 1rem 0 0.5rem 0;
  color: #555;
  font-size: 0.95rem;
  font-weight: 600;
}

.sidebar h3:first-of-type {
  margin-top: 0;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.control-buttons button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
  width: 100%;
  text-align: center;
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

.input-btn {
  background: #007bff;
  color: white;
}

.input-btn:hover {
  background: #0056b3;
}

.upload-btn {
  background: #6f42c1;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
  border: none;
  display: block;
  width: 100%;
  text-align: center;
}

.upload-btn:hover {
  background: #5a2d91;
}

.export-btn {
  background: #17a2b8;
  color: white;
}

.export-btn:hover {
  background: #138496;
}

.instructions {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.instructions p {
  margin: 0.5rem 0;
}

.selected-info {
  color: #ff6b35;
  font-weight: 500;
}

.sample-select {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.shortcuts {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.shortcuts h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #555;
  font-weight: 600;
}

.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.shortcut-key {
  background: #f8f9fa;
  color: #495057;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  border: 1px solid #dee2e6;
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  min-width: 60px;
  text-align: center;
}

.shortcut-desc {
  color: #6c757d;
  font-size: 0.75rem;
}

.dot-input-section {
  margin: 0.5rem 0;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.dot-input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.dot-input-header h3 {
  margin: 0;
  font-size: 0.95rem;
}

.render-btn {
  background: #fd7e14;
  color: white;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.render-btn:hover:not(:disabled) {
  background: #e8630a;
}

.render-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.dot-textarea {
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  resize: vertical;
  background: white;
  min-height: 120px;
}

.dot-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.input-tip {
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  color: #6c757d;
  font-style: italic;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  pointer-events: none;
  z-index: 1000;
  max-width: 300px;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
}

.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-overlay, .error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 100;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p, .error-overlay p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background: #c82333;
}



/* 自定义节点悬停效果 */
.graph-container :deep(.node) {
  transition: all 0.2s ease;
}

.graph-container :deep(.node:hover) {
  filter: drop-shadow(0 0 6px rgba(255, 107, 53, 0.3));
}

/* 响应式优化 */
@media (max-width: 768px) {
  .graphviz-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    max-height: 50vh;
    overflow-y: auto;
  }
  
  .sidebar-content {
    padding: 0.75rem;
  }
  
  .sidebar h2 {
    font-size: 1.1rem;
    margin: 0 0 0.75rem 0;
  }
  
  .sidebar h3 {
    font-size: 0.9rem;
    margin: 0.75rem 0 0.4rem 0;
  }
  
  .control-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  
  .control-buttons button, .upload-btn {
    flex: 1;
    min-width: calc(50% - 0.2rem);
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  
  .dot-textarea {
    height: 120px;
  }
  
  .main-content {
    min-height: 50vh;
  }
}

@media (max-width: 480px) {
  .control-buttons {
    flex-direction: column;
  }
  
  .control-buttons button, .upload-btn {
    width: 100%;
    min-width: auto;
  }
  
  .sidebar {
    max-height: 60vh;
  }
  
  .main-content {
    min-height: 40vh;
  }
  
  .shortcuts {
    display: none;
  }
}
</style>