<template>
  <div class="admin-layout">
    <header class="admin-layout__header">
      <h1>Admin</h1>
      <div class="admin-layout__dev-panel">
        <p class="admin-layout__dev-note">Debug panel: quick navigation only.</p>
        <nav>
          <RouterLink to="/admin/subjects">Subjects</RouterLink>
        </nav>
      </div>
    </header>
    <main class="admin-layout__content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.admin-layout {
  padding: 2rem;
}

.admin-layout__header {
  margin-bottom: 1.5rem;
}

.admin-layout__dev-panel {
  display: grid;
  gap: 0.5rem;
}

.admin-layout__dev-note {
  margin: 0;
  font-size: 0.875rem;
}
</style>
