<template>
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
</template>

<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>