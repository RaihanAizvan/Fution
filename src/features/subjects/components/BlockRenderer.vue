<template>
  <article class="block-renderer">
    <template v-if="block.type === 'intro'">
      <header class="block-renderer__header">
        <h2>{{ block.data.title }}</h2>
        <p class="block-renderer__description">
          {{ isLoading ? 'Loading content…' : block.data.description }}
        </p>
      </header>
    </template>
    <template v-else-if="block.type === 'code'">
      <header class="block-renderer__header">
        <h2>{{ block.data.language }}</h2>
        <p class="block-renderer__description">Code sample</p>
      </header>
      <pre class="block-renderer__code">
        <code>{{ isLoading ? 'Loading content…' : block.data.code }}</code>
      </pre>
    </template>
    <template v-else-if="block.type === 'accordion'">
      <AccordionBlock
        :items="
          isLoading
            ? [{ title: 'Loading', description: 'Loading content…' }]
            : block.data.items
        "
      />
    </template>
    <template v-else-if="block.type === 'checklist'">
      <ul class="block-renderer__list">
        <li v-for="(item, index) in block.data.items" :key="index">
          {{ item.title }}
        </li>
      </ul>
    </template>
    <template v-else-if="block.type === 'pitfalls'">
      <div class="block-renderer__pitfalls">
        <div v-for="(item, index) in block.data.items" :key="index">
          <strong>{{ item.title }}</strong>
          <p v-if="item.description">{{ item.description }}</p>
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

interface ListItemBlock {
  title: string
  description?: string
}

interface AccordionBlockType {
  type: 'accordion'
  data: {
    items: ListItemBlock[]
  }
}

interface ChecklistBlock {
  type: 'checklist'
  data: {
    items: ListItemBlock[]
  }
}

interface PitfallsBlock {
  type: 'pitfalls'
  data: {
    items: ListItemBlock[]
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
  padding: 1.5rem 1.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.block-renderer__header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #f5f7fb;
}

.block-renderer__description {
  margin: 0.35rem 0 0;
  color: rgba(230, 232, 236, 0.7);
}

.block-renderer__code {
  margin: 0;
  padding: 1rem 1.25rem;
  border-radius: 0.85rem;
  background: #0b0e14;
  color: #e6e8ec;
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.block-renderer__list {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.5rem;
  color: rgba(230, 232, 236, 0.78);
}

.block-renderer__pitfalls {
  display: grid;
  gap: 0.75rem;
  color: rgba(230, 232, 236, 0.78);
}

.block-renderer__pitfalls p {
  margin: 0.25rem 0 0;
}
</style>
