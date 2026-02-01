<template>
  <div class="accordion-block">
    <button class="accordion-block__toggle" type="button" @click="toggle">
      {{ activeItem?.title ?? 'Details' }}
    </button>
    <div v-if="isOpen" class="accordion-block__content">
      {{ activeItem?.content ?? '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface AccordionItem {
  title: string
  content: string
}

interface Props {
  items: AccordionItem[]
}

const props = defineProps<Props>()

const isOpen = ref(false)
const activeItem = computed(() => props.items[0])

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.accordion-block__toggle {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  font: inherit;
  cursor: pointer;
}
</style>
