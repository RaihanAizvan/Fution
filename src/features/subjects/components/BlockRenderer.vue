<template>
  <IntroBlock
    v-if="block.type === 'intro'"
    :title="block.data.title"
    :description="props.isLoading ? 'Loading content…' : block.data.description"
  />
  <CodeBlock
    v-else-if="block.type === 'code'"
    :language="block.data.language"
    :code="props.isLoading ? 'Loading content…' : block.data.code"
  />
  <AccordionBlock
    v-else-if="block.type === 'accordion'"
    :items="
      props.isLoading
        ? [{ title: 'Loading', description: 'Loading content…' }]
        : block.data.items
    "
  />
  <ChecklistBlock v-else-if="block.type === 'checklist'" :items="block.data.items" />
  <PitfallsBlock v-else-if="block.type === 'pitfalls'" :items="block.data.items" />
  <ResourcesBlock v-else-if="block.type === 'resources'" :items="block.data.items" />
</template>

<script setup lang="ts">
import AccordionBlock from './blocks/AccordionBlock.vue'
import IntroBlock from './blocks/IntroBlock.vue'
import CodeBlock from './blocks/CodeBlock.vue'
import ChecklistBlock from './blocks/ChecklistBlock.vue'
import PitfallsBlock from './blocks/PitfallsBlock.vue'
import ResourcesBlock from './blocks/ResourcesBlock.vue'
import type { TopicBlock } from '../data/topicBlocks'

interface Props {
  block: TopicBlock
  isLoading?: boolean
}

const props = defineProps<Props>()
</script>
