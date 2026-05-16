<template>
  <article class="rounded-2xl bg-[var(--panel-bg)] p-5 text-left">
    <p class="text-sm font-semibold text-[var(--app-text)]">
      {{ lead }}
    </p>
    <p v-if="detail" class="mt-2 text-sm text-[var(--app-muted)]">
      {{ detail }}
    </p>
  </article>
</template>

<script setup lang="ts">
interface Props {
  lead: string
  detail?: string
}

defineProps<Props>()
</script>
