<template>
  <div class="item card">
    <div class="icon-container">
      <slot name="icon"></slot>
    </div>
    <div class="details">
      <h3 class="item-heading">
        <slot name="heading"></slot>
      </h3>
      <div class="item-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 1.5rem;
  display: flex;
  position: relative;
  padding: 2rem;
  transition: var(--transition);
  background: var(--bg-glass);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-glass);
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
}

.item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  transform: scaleY(0);
  transform-origin: bottom;
  transition: var(--transition);
}

.item:hover::before {
  transform: scaleY(1);
}

.item:hover {
  background: var(--bg-glass-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.icon-container {
  display: flex;
  place-items: center;
  place-content: center;
  width: 56px;
  height: 56px;
  min-width: 56px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  margin-right: 1.5rem;
}

.item:hover .icon-container {
  transform: scale(1.1) rotate(5deg);
  box-shadow: var(--shadow-medium);
}

.details {
  flex: 1;
  min-width: 0;
}

.item-heading {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--text-primary);
  line-height: 1.3;
}

.item-content {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
}

.item-content a {
  color: var(--accent-color);
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: var(--transition);
}

.item-content a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  transition: var(--transition);
}

.item-content a:hover::after {
  width: 100%;
}

.item-content a:hover {
  color: rgba(240, 147, 251, 0.8);
  transform: translateY(-1px);
}

/* 动画效果 */
.item:nth-child(1) { animation-delay: 0.1s; }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.3s; }
.item:nth-child(4) { animation-delay: 0.4s; }
.item:nth-child(5) { animation-delay: 0.5s; }

/* 响应式设计 */
@media (max-width: 768px) {
  .item {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .icon-container {
    width: 48px;
    height: 48px;
    min-width: 48px;
    margin-right: 1rem;
  }
  
  .item-heading {
    font-size: 1.2rem;
  }
  
  .item-content {
    font-size: 0.95rem;
  }
}

@media (min-width: 1024px) {
  .item {
    margin-bottom: 2rem;
    padding: 2.5rem;
  }
  
  .icon-container {
    width: 64px;
    height: 64px;
    min-width: 64px;
    margin-right: 2rem;
  }
  
  .item-heading {
    font-size: 1.5rem;
  }
}
</style>