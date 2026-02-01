<template>
  <section class="subject-layout">
    <aside class="subject-layout__sidebar">
      <div class="subject-layout__sidebar-content">
        <slot name="sidebar" />
      </div>
    </aside>
    <main class="subject-layout__main">
      <slot />
    </main>
  </section>
</template>

<style scoped>
.subject-layout {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  min-height: 100vh;
}

.subject-layout__sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.subject-layout__sidebar-content {
  max-height: 100vh;
  overflow-y: auto;
  padding: 1.5rem 1rem;
}

.subject-layout__main {
  padding: 2rem;
}
</style>
