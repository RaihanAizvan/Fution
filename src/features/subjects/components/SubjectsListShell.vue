<template>
  <section class="subjects-list">
    <header class="subjects-list__header">
      <h1>Subjects</h1>
    </header>
    <div class="subjects-list__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.subjects-list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
}

.subjects-list__content {
  display: grid;
  gap: 1rem;
}
</style>
