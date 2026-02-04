<template>
  <div class="accordion-block">
    <div v-for="(item, index) in items" :key="index" class="accordion-block__item">
      <button class="accordion-block__toggle" type="button" @click="toggle(index)">
        {{ item.title }}
      </button>
      <div v-if="openIndex === index" class="accordion-block__content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AccordionItem {
  title: string
  content: string
}

interface Props {
  items: AccordionItem[]
}

defineProps<Props>()

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.accordion-block__item {
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 0;
}

.accordion-block__toggle {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  font: inherit;
  cursor: pointer;
}

.accordion-block__content {
  margin-top: 0.5rem;
}
</style>
