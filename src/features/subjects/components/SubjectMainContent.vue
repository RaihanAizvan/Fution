<template>
  <div class="subject-main">
    <header class="subject-main__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="subject-main__content">
      <p v-if="isLoading">Loading blocks…</p>
      <p v-else-if="hasError">Unable to load blocks.</p>
      <p v-else-if="blocks.length === 0">Content will load here.</p>
      <BlockRenderer v-else v-for="block in blocks" :key="blockKey(block)" :block="block" />
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

const blockKey = (block: TopicBlock) => {
  if (block.type === 'intro') {
    return `${block.type}-${block.data.title}`
  }

  if (block.type === 'code') {
    return `${block.type}-${block.data.language}-${block.data.code}`
  }

  const firstItem = block.data.items[0]
  return `${block.type}-${firstItem?.title ?? 'item'}`
}
</script>
