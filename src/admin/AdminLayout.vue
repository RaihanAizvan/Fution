<template>
  <div class="admin-layout">
    <header class="admin-layout__header">
      <h1>Admin</h1>
    </header>
    <main class="admin-layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  padding: 2rem;
}

.admin-layout__header {
  margin-bottom: 1.5rem;
}
</style>
