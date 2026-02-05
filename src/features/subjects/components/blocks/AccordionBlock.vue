<template>
  <div class="grid gap-3">
    <button
      class="flex items-center justify-between text-left text-base font-medium text-[var(--app-text)]"
      type="button"
      @click="toggle"
    >
      <span>{{ headerTitle }}</span>
      <span
        class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sidebar-active)] text-[var(--app-text)]/70 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" fill="none" class="h-3 w-3" stroke="currentColor" stroke-width="2">
          <path d="M5 7.5l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="isOpen" class="grid gap-3 text-sm text-[var(--app-text)]/80">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="rounded-lg bg-[var(--sidebar-active)] p-3"
        >
          <button
            class="flex w-full items-center justify-between text-left text-sm font-medium text-[var(--app-text)]"
            type="button"
            @click="toggleItem(index)"
          >
            {{ item.title }}
            <span
              class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sidebar-bg)] text-[var(--app-text)]/70 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="none" class="h-3 w-3" stroke="currentColor" stroke-width="2">
                <path d="M5 7.5l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <p v-if="openIndex === index && item.description" class="mt-2 text-[var(--app-muted)]">
              {{ item.description }}
            </p>
          </transition>
        </div>
      </div>
    </transition>
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
