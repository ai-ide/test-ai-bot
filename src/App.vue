<template>
  <div id="app">
    <header class="app-header">
      <div class="logo-container animate-float">
        <img alt="Vue logo" class="logo" src="./assets/vue.svg" width="80" height="80" />
      </div>
      <div class="header-content">
        <HelloWorld msg="✨ 欢迎使用 Vite + Vue! ✨" />
      </div>
    </header>

    <main class="app-main">
      <div class="welcome-container">
        <TheWelcome />
      </div>
    </main>
    
    <footer class="app-footer">
      <p class="footer-text">Made with ❤️ using Vue 3 & Vite</p>
    </footer>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<style scoped>
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
  margin-bottom: 3rem;
}

.logo-container {
  position: relative;
}

.logo {
  display: block;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
  transition: var(--transition);
}

.logo:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.15));
}

.header-content {
  max-width: 800px;
  width: 100%;
}

.app-main {
  margin: 3rem 0;
}

.welcome-container {
  display: grid;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.app-footer {
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border-glass);
}

.footer-text {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
}

@media (min-width: 768px) {
  .app-header {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }
  
  .header-content {
    text-align: left;
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .welcome-container {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

/* 添加进入动画 */
.app-header {
  animation: slideInDown 0.8s ease-out;
}

.app-main {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.app-footer {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>