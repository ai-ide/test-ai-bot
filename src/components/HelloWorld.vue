<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      你已经成功创建了一个基于 Vite + Vue 3 的项目。现在开始你的开发之旅吧！
    </h3>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.green {
  color: hsla(160, 100%, 37%, 1);
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>