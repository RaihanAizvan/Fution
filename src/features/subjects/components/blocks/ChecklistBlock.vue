<template>
  <article
    class="grid gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
  >
    <ul class="grid gap-2 pl-5 text-sm text-[var(--app-text)]/80">
      <li v-for="(item, index) in items" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
interface ListItem {
  title: string
  description?: string
}

interface Props {
  items: ListItem[]
}

defineProps<Props>()
</script>
