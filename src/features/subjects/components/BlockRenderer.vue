<template>
  <article class="block-renderer">
    <template v-if="block.type === 'intro'">
      <header class="block-renderer__header">
        <h2>{{ block.title }}</h2>
      </header>
      <p class="block-renderer__description">{{ block.description }}</p>
    </template>
    <template v-else-if="block.type === 'code'">
      <header class="block-renderer__header">
        <h2>{{ block.language }}</h2>
      </header>
      <pre class="block-renderer__code"><code>{{ block.code }}</code></pre>
    </template>
    <template v-else>
      <header class="block-renderer__header">
        <button class="block-renderer__toggle" type="button" @click="toggleAccordion">
          {{ block.title }}
        </button>
      </header>
      <div v-if="isAccordionOpen" class="block-renderer__accordion">
        {{ block.content }}
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

interface AccordionBlock {
  type: 'accordion'
  title: string
  content: string
}

type Block = IntroBlock | CodeBlock | AccordionBlock

interface Props {
  block: Block
}

defineProps<Props>()

const isAccordionOpen = ref(false)

const toggleAccordion = () => {
  isAccordionOpen.value = !isAccordionOpen.value
}
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

.block-renderer__toggle {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  font: inherit;
  cursor: pointer;
}
</style>
