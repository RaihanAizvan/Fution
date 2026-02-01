<template>
  <div class="subject-main">
    <header class="subject-main__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="subject-main__content">
      <p v-if="topicTitle">Selected topic: {{ topicTitle }}</p>
      <p v-else>Content will load here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  topicTitle: string | null
}

defineProps<Props>()
</script>
