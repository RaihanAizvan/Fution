<template>
  <article class="block-renderer">
    <template v-if="block.type === 'intro'">
      <header class="block-renderer__header">
        <h2>{{ block.title }}</h2>
      </header>
      <p class="block-renderer__description">{{ block.description }}</p>
    </template>
    <template v-else>
      <header class="block-renderer__header">
        <h2>{{ block.language }}</h2>
      </header>
      <pre class="block-renderer__code"><code>{{ block.code }}</code></pre>
    </template>
  </article>
</template>

<script setup lang="ts">
interface IntroBlock {
  type: 'intro'
  title: string
  description: string
}

interface CodeBlock {
  type: 'code'
  language: string
  code: string
}

type Block = IntroBlock | CodeBlock

interface Props {
  block: Block
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

.block-renderer__code {
  margin: 0;
}
</style>
