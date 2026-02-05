<template>
  <article
    class="grid gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
  >
    <ul class="grid gap-2 pl-5 text-sm text-[var(--app-text)]/80">
      <li v-for="(item, index) in items" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer" class="underline">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
interface ResourceItem {
  title: string
  url: string
}

interface Props {
  items: ResourceItem[]
}

defineProps<Props>()
</script>
