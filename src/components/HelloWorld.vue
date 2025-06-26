<template>
  <div class="greetings card">
    <h1 class="welcome-title">{{ msg }}</h1>
    <div class="welcome-subtitle">
      <h3>🚀 你已经成功创建了一个基于 Vite + Vue 3 的项目</h3>
      <p class="subtitle-text">现在开始你的精彩开发之旅吧！探索无限可能，创造属于你的作品。</p>
    </div>
    <div class="action-buttons">
      <button class="primary-btn" @click="startDeveloping">开始开发</button>
      <button class="secondary-btn" @click="learnMore">了解更多</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const startDeveloping = () => {
  console.log('🎉 开始你的开发之旅！')
}

const learnMore = () => {
  window.open('https://cn.vuejs.org/', '_blank')
}
</script>

<style scoped>
.greetings {
  text-align: center;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.greetings::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%),
    radial-gradient(circle, rgba(102, 126, 234, 0.1) 30%, transparent 70%);
  animation: rotate 20s linear infinite;
  z-index: -1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.welcome-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.welcome-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
}

.welcome-subtitle {
  margin: 2rem 0;
}

.welcome-subtitle h3 {
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.subtitle-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.5rem;
}

.primary-btn, .secondary-btn {
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  border: none;
  min-width: 140px;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  box-shadow: var(--shadow-soft);
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-medium);
}

.secondary-btn {
  background: var(--bg-glass);
  color: var(--text-primary);
  border: 2px solid var(--border-glass);
  backdrop-filter: blur(10px);
}

.secondary-btn:hover {
  background: var(--bg-glass-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
}

.primary-btn::before, .secondary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: var(--transition);
}

.primary-btn:hover::before, .secondary-btn:hover::before {
  left: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .greetings {
    padding: 2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn, .secondary-btn {
    width: 100%;
    max-width: 280px;
  }
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>