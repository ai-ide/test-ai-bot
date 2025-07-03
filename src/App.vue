<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <img src="./assets/vue.svg" alt="Logo" class="logo-img" />
          <span class="logo-text">Test AI Bot</span>
        </div>
        <div class="nav-links">
          <a href="#home" class="nav-link">首页</a>
          <a href="#features" class="nav-link">功能</a>
          <a href="#demo" class="nav-link">演示</a>
          <a href="#about" class="nav-link">关于</a>
        </div>
      </div>
    </nav>

    <!-- 英雄区域 -->
    <section id="home" class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          智能AI机器人
          <span class="gradient-text">测试平台</span>
        </h1>
        <p class="hero-subtitle">
          体验最先进的AI技术，探索人工智能的无限可能
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary" @click="startDemo">开始体验</button>
          <button class="btn btn-secondary" @click="learnMore">了解更多</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="ai-avatar">
          <div class="avatar-circle">
            <div class="avatar-inner">
              <span class="avatar-text">AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能介绍 -->
    <section id="features" class="features">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">💬</div>
            <h3>智能对话</h3>
            <p>支持自然语言处理，能够理解和回应复杂的问题</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>深度学习</h3>
            <p>基于先进的深度学习算法，持续优化回答质量</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>快速响应</h3>
            <p>毫秒级响应时间，提供流畅的用户体验</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>数据安全</h3>
            <p>严格的数据加密和隐私保护机制</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 演示区域 -->
    <section id="demo" class="demo">
      <div class="container">
        <h2 class="section-title">在线演示</h2>
        <div class="demo-container">
          <div class="chat-interface">
            <div class="chat-header">
              <span class="chat-title">AI助手</span>
              <div class="chat-status">
                <span class="status-dot"></span>
                在线
              </div>
            </div>
            <div class="chat-messages">
              <div class="message bot-message">
                <div class="message-content">
                  您好！我是AI助手，有什么可以帮助您的吗？
                </div>
              </div>
              <div class="message user-message" v-for="message in messages" :key="message.id">
                <div class="message-content">
                  {{ message.text }}
                </div>
              </div>
            </div>
            <div class="chat-input">
              <input 
                type="text" 
                v-model="inputMessage" 
                placeholder="输入您的问题..."
                @keyup.enter="sendMessage"
                class="input-field"
              />
              <button @click="sendMessage" class="send-btn">发送</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">关于我们</h2>
        <div class="about-content">
          <p>
            Test AI Bot是一个先进的人工智能测试平台，致力于为用户提供最优质的AI体验。
            我们的团队由资深的AI研究人员和工程师组成，专注于推动人工智能技术的发展。
          </p>
          <div class="stats">
            <div class="stat-item">
              <div class="stat-number">1000+</div>
              <div class="stat-label">用户</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10k+</div>
              <div class="stat-label">对话</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">准确率</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Test AI Bot. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const inputMessage = ref('')
const messages = ref([])

// 方法
const startDemo = () => {
  const demoSection = document.getElementById('demo')
  demoSection.scrollIntoView({ behavior: 'smooth' })
}

const learnMore = () => {
  const featuresSection = document.getElementById('features')
  featuresSection.scrollIntoView({ behavior: 'smooth' })
}

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    messages.value.push({
      id: Date.now(),
      text: inputMessage.value,
      type: 'user'
    })
    
    // 模拟AI回复
    setTimeout(() => {
      messages.value.push({
        id: Date.now() + 1,
        text: '这是一个模拟的AI回复。在实际项目中，这里会连接到真实的AI接口。',
        type: 'bot'
      })
    }, 1000)
    
    inputMessage.value = ''
  }
}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
}

/* 英雄区域样式 */
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  padding: 120px 20px 80px;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(45deg, #ffd700, #ffb347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ai-avatar {
  position: relative;
}

.avatar-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}

.avatar-inner {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-size: 3rem;
  font-weight: 800;
  color: white;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 功能介绍样式 */
.features {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* 演示区域样式 */
.demo {
  padding: 80px 0;
  background: white;
}

.demo-container {
  display: flex;
  justify-content: center;
}

.chat-interface {
  width: 100%;
  max-width: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background: #3498db;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-weight: 600;
}

.chat-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2ecc71;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.chat-messages {
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  background: #f8f9fa;
}

.message {
  margin-bottom: 1rem;
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
}

.bot-message .message-content {
  background: #e3f2fd;
  color: #1565c0;
  margin-right: auto;
}

.user-message .message-content {
  background: #3498db;
  color: white;
  margin-left: auto;
}

.chat-input {
  display: flex;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.input-field {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  outline: none;
  font-size: 1rem;
}

.input-field:focus {
  border-color: #3498db;
}

.send-btn {
  margin-left: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.send-btn:hover {
  background: #2980b9;
}

/* 关于我们样式 */
.about {
  padding: 80px 0;
  background: #f8f9fa;
}

.about-content {
  text-align: center;
}

.about-content p {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
}

/* 页脚样式 */
.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .hero {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-visual {
    margin-top: 2rem;
  }
  
  .avatar-circle {
    width: 150px;
    height: 150px;
  }
  
  .avatar-inner {
    width: 120px;
    height: 120px;
  }
  
  .avatar-text {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}
</style>