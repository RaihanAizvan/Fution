<template>
  <article class="block-renderer">
    <template v-if="block.type === 'intro'">
      <header class="block-renderer__header">
        <h2>{{ block.data.title }}</h2>
      </header>
      <p class="block-renderer__description">{{ block.data.description }}</p>
    </template>
    <template v-else-if="block.type === 'code'">
      <header class="block-renderer__header">
        <h2>{{ block.data.language }}</h2>
      </header>
      <pre class="block-renderer__code"><code>{{ block.data.code }}</code></pre>
    </template>
    <template v-else-if="block.type === 'accordion'">
      <AccordionBlock :items="block.data.items" />
    </template>
  </article>
</template>

<script setup lang="ts">
import AccordionBlock from './AccordionBlock.vue'

interface IntroBlock {
  type: 'intro'
  data: {
    title: string
    description: string
  }
}

interface CodeBlock {
  type: 'code'
  data: {
    language: string
    code: string
  }
}

interface AccordionBlockType {
  type: 'accordion'
  data: {
    items: Array<{
      title: string
      content: string
    }>
  }
}

type Block = IntroBlock | CodeBlock | AccordionBlockType

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
