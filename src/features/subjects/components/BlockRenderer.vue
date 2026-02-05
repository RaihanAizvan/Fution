<template>
  <article
    class="grid gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
  >
    <template v-if="block.type === 'intro'">
      <header>
        <h2 class="text-lg font-semibold text-[var(--app-text)]">{{ block.data.title }}</h2>
        <p class="mt-1 text-sm text-[var(--app-muted)]">
          {{ isLoading ? 'Loading content…' : block.data.description }}
        </p>
      </header>
    </template>
    <template v-else-if="block.type === 'code'">
      <header>
        <h2 class="text-lg font-semibold text-[var(--app-text)]">{{ block.data.language }}</h2>
        <p class="mt-1 text-sm text-[var(--app-muted)]">Code sample</p>
      </header>
      <pre
        class="rounded-xl border border-[var(--panel-border)] bg-[#0b0e14] px-5 py-4 text-sm text-[var(--app-text)]"
      >
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
      <ul class="grid gap-2 pl-5 text-sm text-[var(--app-text)]/80">
        <li v-for="(item, index) in block.data.items" :key="index">
          {{ item.title }}
        </li>
      </ul>
    </template>
    <template v-else-if="block.type === 'pitfalls'">
      <div class="grid gap-3 text-sm text-[var(--app-text)]/80">
        <div v-for="(item, index) in block.data.items" :key="index">
          <strong class="text-[var(--app-text)]">{{ item.title }}</strong>
          <p v-if="item.description" class="mt-1 text-[var(--app-muted)]">
            {{ item.description }}
          </p>
        </div>
      </div>
    </template>
    <template v-else-if="block.type === 'resources'">
      <ul class="grid gap-2 pl-5 text-sm text-[var(--app-text)]/80">
        <li v-for="(item, index) in block.data.items" :key="index">
          <a :href="item.url" target="_blank" rel="noopener noreferrer" class="underline">
            {{ item.title }}
          </a>
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
