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
}

.app-shell__content {
  min-height: 100vh;
}
</style>
