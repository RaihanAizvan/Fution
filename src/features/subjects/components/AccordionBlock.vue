<template>
  <div class="accordion-block">
    <button class="accordion-block__toggle" type="button" @click="toggle">
      {{ headerTitle }}
    </button>
    <div v-if="isOpen" class="accordion-block__content">
      <div v-for="(item, index) in items" :key="index" class="accordion-block__item">
        <strong>{{ item.title }}</strong>
        <p>{{ item.content }}</p>
      </div>
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
const headerTitle = computed(() => props.items[0]?.title ?? 'Details')

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

.accordion-block__content {
  margin-top: 0.75rem;
  display: grid;
  gap: 0.75rem;
}

.accordion-block__item p {
  margin: 0.25rem 0 0;
}
</style>
