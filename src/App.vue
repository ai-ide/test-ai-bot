<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <img alt="Vue logo" class="logo" src="./assets/vue.svg" width="60" height="60" />
        <HelloWorld msg="欢迎使用 Vite + Vue!" />
      </div>
    </header>

    <main class="app-main">
      <TheWelcome />
    </main>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app-header {
  padding: 2rem 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: block;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: rotate(360deg);
}

.app-main {
  flex: 1;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1.5rem 0;
  }
  
  .header-content {
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .logo {
    width: 50px;
    height: 50px;
  }
}

@media (prefers-color-scheme: dark) {
  #app {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
  
  .app-header {
    background: rgba(52, 73, 94, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>