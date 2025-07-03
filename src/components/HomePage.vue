<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          欢迎来到 <span class="brand-highlight">Test AI Bot</span>
        </h1>
        <p class="hero-subtitle">
          基于 Vue 3 构建的现代化 Web 应用，体验前沿技术带来的无限可能
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary">开始体验</button>
          <button class="btn btn-secondary">了解更多</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="floating-cards">
          <div class="card-item">🚀</div>
          <div class="card-item">⚡</div>
          <div class="card-item">🎯</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">核心特性</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>现代化设计</h3>
            <p>采用最新的设计理念，支持深色/浅色主题，提供极佳的用户体验</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>极速性能</h3>
            <p>基于 Vite 构建，享受闪电般的开发体验和优化的生产性能</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>开发友好</h3>
            <p>完善的开发工具链，ESLint + Prettier 保证代码质量</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">现代化技术栈</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">⚡</div>
            <div class="stat-label">极速开发体验</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">🎯</div>
            <div class="stat-label">用户体验优先</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>准备好开始了吗？</h2>
          <p>加入我们，体验下一代Web应用开发</p>
          <button class="btn btn-primary btn-large">立即开始</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 首页组件逻辑
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, var(--color-background) 0%, rgba(100, 108, 255, 0.1) 100%);
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
}

.brand-highlight {
  background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-cards {
  display: flex;
  gap: 2rem;
  animation: float 6s ease-in-out infinite;
}

.card-item {
  width: 80px;
  height: 80px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card-item:hover {
  transform: translateY(-5px);
}

.card-item:nth-child(2) {
  animation-delay: -2s;
}

.card-item:nth-child(3) {
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Features Section */
.features {
  padding: 5rem 0;
  background: var(--color-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: var(--color-heading);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--color-border-hover);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.feature-card p {
  color: var(--color-text-2);
  line-height: 1.6;
}

/* Stats Section */
.stats {
  padding: 4rem 0;
  background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* CTA Section */
.cta {
  padding: 5rem 0;
  background: var(--color-background);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.cta p {
  font-size: 1.25rem;
  color: var(--color-text-2);
  margin-bottom: 2rem;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(100, 108, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(100, 108, 255, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: #646cff;
  color: #646cff;
  transform: translateY(-2px);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    text-align: center;
    min-height: 60vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .floating-cards {
    margin-top: 2rem;
    gap: 1rem;
  }
  
  .card-item {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>