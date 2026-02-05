<template>
  <article
    class="grid gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
  >
    <header>
      <h2 class="text-lg font-semibold text-[var(--app-text)]">{{ language }}</h2>
      <p class="mt-1 text-sm text-[var(--app-muted)]">Code sample</p>
    </header>
    <pre
      class="rounded-xl border border-[var(--panel-border)] bg-[#0b0e14] px-5 py-4 text-sm text-[var(--app-text)]"
    >
      <code>{{ code }}</code>
    </pre>
  </article>
</template>

<script setup lang="ts">
interface Props {
  language: string
  code: string
}

defineProps<Props>()
</script>
