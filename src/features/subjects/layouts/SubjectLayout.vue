<template>
  <section
    class="grid min-h-screen grid-cols-[minmax(240px,280px)_1fr_minmax(200px,250px)] gap-6 bg-[var(--app-bg)] md:grid-cols-[minmax(220px,260px)_1fr_minmax(180px,220px)] xl:gap-8 max-[1200px]:grid-cols-[minmax(220px,280px)_1fr] max-[900px]:grid-cols-1"
  >
    <!-- Sidebar -->
    <aside
      class="border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] max-[900px]:border-b max-[900px]:border-r-0 max-[900px]:order-2"
    >
      <div class="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8 max-[900px]:static max-[900px]:max-h-none max-[900px]:top-0">
        <slot name="sidebar" />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="px-[4vw] py-12 max-[900px]:py-10 max-[900px]:order-1 max-[640px]:px-4 max-[640px]:pb-12">
      <slot />
    </main>

    <!-- Table of Contents (Right Sidebar) -->
    <aside
      class="hidden border-l border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] px-6 py-8 max-[1200px]:block max-[900px]:hidden"
    >
      <div class="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <slot name="toc" />
      </div>
    </aside>
  </section>
</template>
