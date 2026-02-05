<template>
  <div class="app-shell">
    <main class="app-shell__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #0e1117;
  color: #e6e8ec;
  font-family: 'Inter', 'SF Pro Text', system-ui, sans-serif;
}

.app-shell__content {
  min-height: 100vh;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.04), transparent 45%);
}
</style>
