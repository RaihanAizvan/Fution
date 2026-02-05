<template>
  <div class="subject-main">
    <header class="subject-main__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="subject-main__content">
      <p v-if="hasError">Unable to load blocks.</p>
      <p v-else-if="!isLoading && blocks.length === 0">Content will load here.</p>
      <template v-else>
        <BlockRenderer
          v-for="(block, index) in renderedBlocks"
          :key="blockKey(block, index)"
          :block="block"
          :isLoading="isLoading"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BlockRenderer from './BlockRenderer.vue'

import type { TopicBlock } from '../data/topicBlocks'

interface Props {
  title: string
  blocks: TopicBlock[]
  isLoading: boolean
  hasError: boolean
}

const props = defineProps<Props>()

const blocks = computed(() => props.blocks)

const loadingBlocks: TopicBlock[] = [
  {
    type: 'intro',
    data: { title: 'Loading', description: 'Loading content…' }
  },
  {
    type: 'code',
    data: { language: 'Loading', code: 'Loading content…' }
  },
  {
    type: 'accordion',
    data: { items: [{ title: 'Loading', description: 'Loading content…' }] }
  }
]

const renderedBlocks = computed(() => (props.isLoading ? loadingBlocks : blocks.value))

const blockKey = (block: TopicBlock, index: number) => {
  if (block.type === 'intro') {
    return `${block.type}-${block.data.title}-${index}`
  }

  if (block.type === 'code') {
    return `${block.type}-${block.data.language}-${block.data.code}-${index}`
  }

  const firstItem = block.data.items[0]
  return `${block.type}-${firstItem?.title ?? 'item'}-${index}`
}
</script>

<style scoped>
.subject-main {
  display: grid;
  gap: 2rem;
}

.subject-main__header h1 {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #f5f7fb;
}

.subject-main__content {
  display: grid;
  gap: 1.75rem;
}

.subject-main__content p {
  color: rgba(230, 232, 236, 0.7);
}
</style>
