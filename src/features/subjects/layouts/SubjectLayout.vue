<template>
  <section
    class="grid min-h-screen grid-cols-[minmax(240px,300px)_1fr] bg-[var(--app-bg)] md:grid-cols-[minmax(220px,280px)_1fr] max-[900px]:grid-cols-1"
  >
    <aside
      class="border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] max-[900px]:border-b max-[900px]:border-r-0"
    >
      <div class="sticky top-0 max-h-screen overflow-y-auto px-6 py-8 max-[900px]:static max-[900px]:max-h-none">
        <slot name="sidebar" />
      </div>
    </aside>
    <main class="px-[4vw] py-12 max-[900px]:py-10 max-[640px]:px-6 max-[640px]:pb-12">
      <slot />
    </main>
  </section>
</template>
