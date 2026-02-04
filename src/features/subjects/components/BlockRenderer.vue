<template>
  <article class="block-renderer">
    <template v-if="block.type === 'intro'">
      <header class="block-renderer__header">
        <h2>{{ block.data.title }}</h2>
      </header>
      <p class="block-renderer__description">
        {{ isLoading ? 'Loading content…' : block.data.description }}
      </p>
    </template>
    <template v-else-if="block.type === 'code'">
      <header class="block-renderer__header">
        <h2>{{ block.data.language }}</h2>
      </header>
      <pre class="block-renderer__code">
        <code>{{ isLoading ? 'Loading content…' : block.data.code }}</code>
      </pre>
    </template>
    <template v-else-if="block.type === 'accordion'">
      <AccordionBlock
        :items="
          isLoading
            ? [{ title: 'Loading', content: 'Loading content…' }]
            : block.data.items
        "
      />
    </template>
    <template v-else-if="block.type === 'checklist'">
      <ul class="block-renderer__list">
        <li v-for="(item, index) in block.data.items" :key="index">
          {{ item.text }}
        </li>
      </ul>
    </template>
    <template v-else-if="block.type === 'pitfalls'">
      <div class="block-renderer__pitfalls">
        <div v-for="(item, index) in block.data.items" :key="index">
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </template>
    <template v-else-if="block.type === 'resources'">
      <ul class="block-renderer__list">
        <li v-for="(item, index) in block.data.items" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
        </li>
      </ul>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

interface ChecklistBlock {
  type: 'checklist'
  data: {
    items: Array<{
      text: string
    }>
  }
}

interface PitfallsBlock {
  type: 'pitfalls'
  data: {
    items: Array<{
      title: string
      description: string
    }>
  }
}

interface ResourcesBlock {
  type: 'resources'
  data: {
    items: Array<{
      title: string
      url: string
    }>
  }
}

type Block = IntroBlock | CodeBlock | AccordionBlockType | ChecklistBlock | PitfallsBlock | ResourcesBlock

interface Props {
  block: Block
  isLoading?: boolean
}

const props = defineProps<Props>()

const isLoading = computed(() => props.isLoading ?? false)
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

.block-renderer__list {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.5rem;
}

.block-renderer__pitfalls {
  display: grid;
  gap: 0.75rem;
}

.block-renderer__pitfalls p {
  margin: 0.25rem 0 0;
}
</style>
