<template>
  <div class="item">
    <i class="icon-container">
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
  transition: all 0.3s ease;
}

.item:hover {
  transform: translateY(-2px);
}

.details {
  flex: 1;
  margin-left: 1rem;
}

.icon-container {
  display: flex;
  place-items: center;
  place-content: center;
  width: 36px;
  height: 36px;
  color: var(--color-text);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.icon-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon-container:hover::before {
  opacity: 1;
}

.icon-container:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.icon-container :deep(svg) {
  color: white;
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  transition: color 0.3s ease;
}

.item:hover h3 {
  color: #667eea;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  .icon-container {
    top: calc(50% - 30px);
    left: -30px;
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  }

  .icon-container:hover {
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
    transform: scale(1.05) rotate(3deg);
  }

  .icon-container :deep(svg) {
    width: 28px;
    height: 28px;
  }

  .item:before {
    content: '';
    border-left: 2px solid transparent;
    background: linear-gradient(180deg, #667eea, #764ba2);
    position: absolute;
    left: 0;
    bottom: calc(50% + 30px);
    height: calc(50% - 30px);
    width: 2px;
    background-clip: padding-box;
    opacity: 0.6;
  }

  .item:after {
    content: '';
    border-left: 2px solid transparent;
    background: linear-gradient(180deg, #667eea, #764ba2);
    position: absolute;
    left: 0;
    top: calc(50% + 30px);
    height: calc(50% - 30px);
    width: 2px;
    background-clip: padding-box;
    opacity: 0.6;
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }

  .item:hover:before,
  .item:hover:after {
    opacity: 1;
    background: linear-gradient(180deg, #667eea, #764ba2);
  }
}

/* 添加一些特殊的图标样式变化 */
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

.item:nth-child(6) .icon-container {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}
</style>