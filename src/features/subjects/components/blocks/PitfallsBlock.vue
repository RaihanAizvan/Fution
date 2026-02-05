<template>
  <article
    class="grid gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
  >
    <div class="grid gap-3 text-sm text-[var(--app-text)]/80">
      <div v-for="(item, index) in items" :key="index">
        <strong class="text-[var(--app-text)]">{{ item.title }}</strong>
        <p v-if="item.description" class="mt-1 text-[var(--app-muted)]">
          {{ item.description }}
        </p>
      </div>
    </div>
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
