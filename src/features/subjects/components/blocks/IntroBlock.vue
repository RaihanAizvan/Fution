<template>
  <article
    class="grid gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
  >
    <header>
      <h2 class="text-lg font-semibold text-[var(--app-text)]">{{ title }}</h2>
      <p class="mt-1 text-sm text-[var(--app-muted)]">
        {{ description }}
      </p>
    </header>
  </article>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>
