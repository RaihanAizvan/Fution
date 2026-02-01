<template>
  <div class="subject-main">
    <header class="subject-main__header">
      <h1>{{ title }}</h1>
    </header>
    <div class="subject-main__content">
      <p>Content will load here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
