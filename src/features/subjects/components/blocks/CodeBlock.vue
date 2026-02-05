<template>
  <section class="rounded-2xl bg-[var(--panel-bg)] px-6 py-5">
    <header class="mb-3">
      <h3 class="text-sm font-medium text-[var(--app-muted)]">
        {{ languageLabel }}
      </h3>
    </header>

    <div class="overflow-x-auto rounded-xl bg-[#0b0e14] px-5 py-4 text-sm leading-relaxed">
      <div v-if="isLoading" class="text-[var(--app-muted)]">Loading syntax highlighting…</div>
      <div v-else v-html="highlighted" class="shiki-output" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { getHighlighter } from './shiki'

interface Props {
  language: string
  code: string
}

const props = defineProps<Props>()

const highlighted = ref('')
const isLoading = ref(true)

const languageLabel = computed(() => props.language || 'Code')

const renderHighlight = async () => {
  isLoading.value = true
  const highlighter = await getHighlighter()
  const lang = props.language?.toLowerCase() || 'javascript'
  highlighted.value = highlighter.codeToHtml(props.code || '', {
    lang,
    theme: 'vitesse-dark'
  })
  isLoading.value = false
}

onMounted(() => {
  void renderHighlight()
})

watch(() => [props.code, props.language], () => {
  void renderHighlight()
})
</script>

<style scoped>
.shiki-output :deep(pre) {
  margin: 0;
  background: transparent !important;
  padding: 0 !important;
}

.shiki-output :deep(code) {
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
