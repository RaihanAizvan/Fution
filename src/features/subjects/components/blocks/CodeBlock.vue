<template>
  <section class="rounded-lg bg-[var(--panel-bg)] px-6 py-5">
    <header class="mb-3">
      <h3 class="text-sm font-medium text-[var(--app-muted)]">
        {{ languageLabel }}
      </h3>
    </header>

    <div class="overflow-x-auto rounded-md bg-[var(--code-bg)] px-5 py-4 text-sm leading-relaxed">
      <div v-if="isLoading" class="text-[var(--app-muted)]">Loading syntax highlighting…</div>
      <div v-else v-html="highlighted" class="shiki-output" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { format } from 'prettier/standalone'
import parserBabel from 'prettier/plugins/babel'
import parserTypeScript from 'prettier/plugins/typescript'
import parserHtml from 'prettier/plugins/html'
import parserPostcss from 'prettier/plugins/postcss'
import parserEstree from 'prettier/plugins/estree'
import { getHighlighter } from './shiki'

interface Props {
  language: string
  code: string
}

const props = defineProps<Props>()

const highlighted = ref('')
const isLoading = ref(true)

const languageLabel = computed(() => props.language || 'Code')

const parserForLanguage = (lang: string) => {
  const normalized = lang.toLowerCase()
  if (['js', 'javascript', 'jsx'].includes(normalized)) return 'babel'
  if (['ts', 'typescript', 'tsx'].includes(normalized)) return 'typescript'
  if (['json'].includes(normalized)) return 'json'
  if (['html', 'xml', 'vue'].includes(normalized)) return 'html'
  if (['css', 'scss', 'less'].includes(normalized)) return 'css'
  if (['markdown', 'md'].includes(normalized)) return 'markdown'
  return 'babel'
}

const formatCode = async (code: string, lang: string) => {
  if (!code || code.includes('Loading content')) {
    return code
  }

  try {
    return format(code, {
      parser: parserForLanguage(lang),
      plugins: [parserBabel, parserTypeScript, parserHtml, parserPostcss, parserEstree],
      semi: true,
      singleQuote: true,
      trailingComma: 'none'
    })
  } catch (error) {
    return code
  }
}

const renderHighlight = async () => {
  isLoading.value = true
  try {
    const highlighter = await getHighlighter()
    const rawLang = props.language?.toLowerCase() || 'javascript'
    const lang = ['loading', ''].includes(rawLang) ? 'javascript' : rawLang
    const formatted = await formatCode(props.code || '', lang)
    highlighted.value = highlighter.codeToHtml(formatted, {
      lang,
      theme: 'vitesse-dark'
    })
  } finally {
    isLoading.value = false
  }
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
