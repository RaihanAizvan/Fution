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
      <div v-for="(item, index) in items" :key="index">
        <strong class="text-[var(--app-text)]">{{ item.title }}</strong>
        <p v-if="item.description" class="mt-1 text-[var(--app-muted)]">
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
const headerTitle = computed(() => props.items[0]?.title ?? 'Details')

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>
