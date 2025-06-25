<template>
  <div class="item">
    <div class="icon-container">
      <slot name="icon"></slot>
    </div>
    <div class="details">
      <h3 class="heading">
        <slot name="heading"></slot>
      </h3>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1.5rem;
  display: flex;
  position: relative;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.15), 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  border-color: var(--color-border-hover);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.item:hover .icon-container {
  transform: scale(1.1);
}

.details {
  flex: 1;
  margin-left: 1.25rem;
  min-width: 0;
}

.heading {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
  line-height: 1.2;
}

.content {
  color: var(--color-text-2);
  line-height: 1.6;
  font-size: 0.95rem;
}

.content a {
  color: #646cff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.content a:hover {
  color: #535bf2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .item {
    margin-top: 1rem;
    padding: 1.25rem;
  }
  
  .icon-container {
    width: 40px;
    height: 40px;
  }
  
  .details {
    margin-left: 1rem;
  }
  
  .heading {
    font-size: 1.1rem;
  }
  
  .content {
    font-size: 0.9rem;
  }
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding: 2rem;
  }
  
  .icon-container {
    width: 56px;
    height: 56px;
  }
  
  .heading {
    font-size: 1.4rem;
  }
  
  .content {
    font-size: 1rem;
  }
}

/* 为不同的项目添加不同的渐变色 */
.item:nth-child(1) .icon-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.item:nth-child(2) .icon-container {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.item:nth-child(3) .icon-container {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.item:nth-child(4) .icon-container {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.item:nth-child(5) .icon-container {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

@media (prefers-color-scheme: dark) {
  .item {
    background: var(--vt-c-black-soft);
    border-color: var(--vt-c-gray-dark-3);
  }
  
  .item:hover {
    border-color: var(--vt-c-gray-dark-2);
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.3), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>