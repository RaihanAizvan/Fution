<template>
  <article class="block-renderer">
    <header class="block-renderer__header">
      <h2>{{ block.title }}</h2>
    </header>
    <p class="block-renderer__description">{{ block.description }}</p>
  </article>
</template>

<script setup lang="ts">
interface IntroBlock {
  type: 'intro'
  title: string
  description: string
}

interface Props {
  block: IntroBlock
}

defineProps<Props>()
</script>

<style scoped>
.block-renderer {
  display: grid;
  gap: 0.75rem;
}

.block-renderer__description {
  margin: 0;
}
</style>
