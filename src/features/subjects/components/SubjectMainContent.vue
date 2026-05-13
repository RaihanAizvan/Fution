<template>
  <div class="relative w-full">
    <div v-if="isLoading" class="mx-auto max-w-3xl flex flex-col space-y-4 animate-pulse px-4">
      <div class="h-10 w-3/4 bg-[var(--app-surface)] rounded-lg"></div>
      <div class="space-y-2">
        <div class="h-4 w-full bg-[var(--app-surface)] rounded"></div>
        <div class="h-4 w-full bg-[var(--app-surface)] rounded"></div>
        <div class="h-4 w-5/6 bg-[var(--app-surface)] rounded"></div>
      </div>
    </div>
    

    <div v-else-if="hasError" class="mx-auto max-w-3xl p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
      <p class="font-medium">{{ errorMessage || 'Error loading content' }}</p>
      <p class="text-sm opacity-80">Please check your connection or try again later.</p>
    </div>

    <div v-else-if="!html" class="mx-auto max-w-3xl p-8 rounded-2xl bg-[var(--app-surface)] text-[var(--app-muted)] text-center">
      <p>No content available for this topic yet.</p>
    </div>

    <article v-else class="mx-auto max-w-3xl px-4 space-y-6">
      <Breadcrumbs :subjectTitle="subjectTitle" :topicTitle="topicTitle" />

      

      <header class="pb-6 border-b border-[var(--app-border)]/50">
        <h1 class="text-4xl font-bold text-[var(--app-text)] tracking-tight">
          {{ title }}
        </h1>
      </header>

      <div
        class="topic-content prose prose-neutral dark:prose-invert max-w-none
               prose-h1:text-4xl prose-h1:font-bold
               prose-h2:text-2xl prose-h2:mt-10 prose-h2:font-semibold prose-h2:scroll-mt-24
               prose-h3:scroll-mt-24 prose-h4:scroll-mt-24
               prose-p:text-[var(--app-muted)] prose-p:leading-relaxed
               prose-li:marker:text-orange-400
               prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-pink-400 prose-code:font-medium
               prose-pre:bg-black prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl"
        v-html="html"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from './Breadcrumbs.vue'

interface Props {
  title: string
  html: string | null
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string | null
  subjectTitle?: string
  topicTitle?: string
}

defineProps<Props>()

defineEmits<{
  back: []
}>()
</script>

<style>
/* Modern vertical rhythm and micro-adjustments */
</style>
