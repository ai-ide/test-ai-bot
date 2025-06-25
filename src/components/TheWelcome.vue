<template>
  <div class="welcome-container">
    <div class="welcome-header">
      <h2 class="welcome-title">开始您的 Vue 开发之旅</h2>
      <p class="welcome-subtitle">探索 Vue 生态系统，获取有用的资源和工具</p>
    </div>
    
    <div class="welcome-grid">
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>文档</template>

        Vue 的
        <a href="https://cn.vuejs.org/" target="_blank" rel="noopener">官方文档</a>
        提供了您所需的所有信息。
      </WelcomeItem>

      <WelcomeItem>
        <template #icon>
          <ToolingIcon />
        </template>
        <template #heading>工具</template>

        这个项目使用了
        <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a> +
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>。如果您需要测试您的组件并且需要 Web API，请尝试
        <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a> 和
        <a href="https://cypress.io/" target="_blank" rel="noopener">Cypress</a>。
      </WelcomeItem>

      <WelcomeItem>
        <template #icon>
          <EcosystemIcon />
        </template>
        <template #heading>生态系统</template>

        获取 Vue 的官方工具和库：
        <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>，
        <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>，
        <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>，和
        <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>。如果您需要更多资源，我们建议您付费查看
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>。
      </WelcomeItem>

      <WelcomeItem>
        <template #icon>
          <CommunityIcon />
        </template>
        <template #heading>社区</template>

        遇到困难？在
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a> 上寻求帮助，我们的官方 Discord 服务器，或者
        <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>。您还应该订阅
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">我们的邮件列表</a> 并在
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a> 上关注官方 Vue 的 Twitter 账户，以获取最新新闻。
      </WelcomeItem>

      <WelcomeItem>
        <template #icon>
          <SupportIcon />
        </template>
        <template #heading>支持 Vue</template>

        作为一个独立项目，Vue 依靠社区支持来维持其可持续发展。您可以通过
        <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">成为赞助者</a> 来帮助我们。
      </WelcomeItem>
    </div>
  </div>
</template>

<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<style scoped>
.welcome-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.welcome-header {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-2);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.welcome-grid {
  display: grid;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .welcome-container {
    padding: 1.5rem 1rem;
  }
  
  .welcome-header {
    margin-bottom: 2rem;
  }
  
  .welcome-title {
    font-size: 1.8rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .welcome-grid {
    gap: 1rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .welcome-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .welcome-container {
    padding: 3rem 2rem;
  }
  
  .welcome-header {
    margin-bottom: 4rem;
  }
  
  .welcome-title {
    font-size: 3rem;
  }
  
  .welcome-subtitle {
    font-size: 1.3rem;
  }
  
  .welcome-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1200px) {
  .welcome-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (prefers-color-scheme: dark) {
  .welcome-title {
    background: linear-gradient(135deg, #8b9dc3 0%, #9ca3db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>