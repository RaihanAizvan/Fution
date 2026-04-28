<template>
  <div class="relative w-full">
    <div v-if="isLoading" class="flex flex-col space-y-4 animate-pulse">
      <div class="h-10 w-3/4 bg-[var(--app-surface)] rounded-lg"></div>
      <div class="space-y-2">
        <div class="h-4 w-full bg-[var(--app-surface)] rounded"></div>
        <div class="h-4 w-full bg-[var(--app-surface)] rounded"></div>
        <div class="h-4 w-5/6 bg-[var(--app-surface)] rounded"></div>
      </div>
    </div>

    <div v-else-if="hasError" class="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
      <p class="font-medium">{{ errorMessage || 'Error loading content' }}</p>
      <p class="text-sm opacity-80">Please check your connection or try again later.</p>
    </div>

    <div v-else-if="!html" class="p-8 rounded-2xl bg-[var(--app-surface)] text-[var(--app-muted)] text-center">
      <p>No content available for this topic yet.</p>
    </div>

    <article v-else class="space-y-8">
      <header class="pb-6 border-b border-[var(--app-border)] opacity-80">
        <h1 class="text-4xl font-bold text-[var(--app-text)] tracking-tight">
          {{ title }}
        </h1>
      </header>

      <div 
        class="prose lg:prose-lg dark:prose-invert max-w-none 
               prose-headings:text-[var(--app-text)] 
               prose-p:text-[var(--app-muted)] 
               prose-a:text-blue-400 
               prose-code:text-pink-400 
               prose-pre:bg-[var(--app-surface)] 
               prose-pre:border prose-pre:border-[var(--app-border)]"
        v-html="html"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  html: string | null
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string | null
}

defineProps<Props>()
</script>

<style>
/* Custom prose overrides for specific theme colors if needed */
.prose pre {
  @apply rounded-xl shadow-sm;
}
.prose code::before,
.prose code::after {
  content: "";
}
</style>