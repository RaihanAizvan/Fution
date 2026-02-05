<template>
  <IntroBlock
    v-if="block.type === 'intro'"
    :title="block.data.title"
    :description="isLoading ? 'Loading content…' : block.data.description"
  />
  <CodeBlock
    v-else-if="block.type === 'code'"
    :language="block.data.language"
    :code="isLoading ? 'Loading content…' : block.data.code"
  />
  <AccordionBlock
    v-else-if="block.type === 'accordion'"
    :items="
      isLoading
        ? [{ title: 'Loading', description: 'Loading content…' }]
        : block.data.items
    "
  />
  <ChecklistBlock v-else-if="block.type === 'checklist'" :items="block.data.items" />
  <PitfallsBlock v-else-if="block.type === 'pitfalls'" :items="block.data.items" />
  <ResourcesBlock v-else-if="block.type === 'resources'" :items="block.data.items" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccordionBlock from './blocks/AccordionBlock.vue'
import IntroBlock from './blocks/IntroBlock.vue'
import CodeBlock from './blocks/CodeBlock.vue'
import ChecklistBlock from './blocks/ChecklistBlock.vue'
import PitfallsBlock from './blocks/PitfallsBlock.vue'
import ResourcesBlock from './blocks/ResourcesBlock.vue'

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
