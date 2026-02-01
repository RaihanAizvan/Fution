<template>
  <div class="subject-main">
    <header class="subject-main__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="subject-main__content">
      <p v-if="blocks.length === 0">Content will load here.</p>
      <BlockRenderer v-for="block in blocks" :key="blockKey(block)" :block="block" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BlockRenderer from './BlockRenderer.vue'

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
  title: string
  introBlock: IntroBlock | null
  codeBlock: CodeBlock | null
}

const props = defineProps<Props>()

const blocks = computed(() => [props.introBlock, props.codeBlock].filter(Boolean) as Block[])

const blockKey = (block: Block) => {
  if (block.type === 'intro') {
    return `${block.type}-${block.title}`
  }

  return `${block.type}-${block.language}-${block.code}`
}
</script>
