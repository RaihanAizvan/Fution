<template>
  <article class="rounded-2xl bg-[var(--panel-bg)] p-5 text-left">
    <h3 class="text-base font-semibold text-[var(--app-text)]">
      {{ title }}
    </h3>
    <p class="mt-2 text-sm text-[var(--app-muted)]">
      {{ description }}
    </p>
    <a
      v-if="link"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 inline-flex text-xs font-medium uppercase tracking-[0.16em] text-[var(--app-muted)] transition hover:text-[var(--app-text)]"
    >
      Open resource
    </a>
  </article>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  link?: string
}

defineProps<Props>()
</script>
