<template>
  <div class="grid gap-3">
    <button
      class="text-left text-base font-medium text-[var(--app-text)] transition hover:text-[var(--app-text)]"
      type="button"
      @click="toggle"
    >
      {{ headerTitle }}
    </button>
    <div v-if="isOpen" class="grid gap-3 text-sm text-[var(--app-text)]/80">
      <div v-for="(item, index) in items" :key="index" class="rounded-lg border border-[var(--panel-border)] p-3">
        <button
          class="flex w-full items-center justify-between text-left text-sm font-medium text-[var(--app-text)]"
          type="button"
          @click="toggleItem(index)"
        >
          {{ item.title }}
          <span class="text-xs text-[var(--app-muted)]">{{ openIndex === index ? 'Hide' : 'Show' }}</span>
        </button>
        <p v-if="openIndex === index && item.description" class="mt-2 text-[var(--app-muted)]">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface AccordionItem {
  title: string
  description?: string
}

interface Props {
  items: AccordionItem[]
}

const props = defineProps<Props>()

const isOpen = ref(false)
const openIndex = ref<number | null>(null)
const headerTitle = computed(() => props.items[0]?.title ?? 'Details')

const toggle = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    openIndex.value = null
  }
}

const toggleItem = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
