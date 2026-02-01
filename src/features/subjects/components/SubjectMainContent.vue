<template>
  <div class="subject-main">
    <header class="subject-main__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="subject-main__content">
      <p v-if="!introBlock">Content will load here.</p>
      <BlockRenderer v-else :block="introBlock" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BlockRenderer from './BlockRenderer.vue'

interface IntroBlock {
  type: 'intro'
  title: string
  description: string
}

interface Props {
  title: string
  introBlock: IntroBlock | null
}

defineProps<Props>()
</script>
