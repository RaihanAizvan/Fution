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
  grid-template-columns: minmax(240px, 300px) 1fr;
  min-height: 100vh;
  background: #0e1117;
}

.subject-layout__sidebar {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(15, 18, 24, 0.9);
}

.subject-layout__sidebar-content {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  padding: 2rem 1.5rem;
}

.subject-layout__main {
  padding: 3rem 4vw;
}
</style>
