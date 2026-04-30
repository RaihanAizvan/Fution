<template>
  <nav
    v-if="headings.length > 0"
    class="overflow-visible"
  >
    <div class="mb-4 flex items-center gap-2 text-[var(--app-text)]">
      <ListTree class="h-4 w-4 text-blue-400" />
      <p class="text-xs font-semibold uppercase tracking-wider text-[var(--app-muted)]">On this page</p>
    </div>
    <ul class="space-y-0.5 border-l border-[var(--panel-border)]">
      <li v-for="heading in headings" :key="heading.id">
        <button
          type="button"
          @click="scrollToHeading(heading.id)"
          :class="[
            'w-full border-l-2 border-transparent px-3 py-1.5 text-left text-sm leading-snug transition hover:border-blue-400/50 hover:text-[var(--app-text)]',
            {
              'border-blue-400 bg-[var(--sidebar-active)] font-semibold text-[var(--app-text)]': activeHeading === heading.id,
              'font-medium text-[var(--app-text)]': heading.level === 2 && activeHeading !== heading.id,
              'text-[var(--app-muted)]': activeHeading !== heading.id,
              'pl-6 text-xs': heading.level === 3,
              'pl-9 text-xs': heading.level === 4,
            }
          ]"
        >
          {{ heading.text }}
        </button>
      </li>
    </ul>
  </nav>
  <div v-else class="text-[var(--app-muted)]">
    <div class="flex items-center gap-2 rounded-md border border-[var(--panel-border)] bg-[var(--panel-bg)] px-3 py-2">
      <ListTree class="h-4 w-4" />
      <p class="text-xs text-[var(--app-muted)]">No table of contents available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { ListTree } from 'lucide-vue-next'

interface Heading {
  id: string
  text: string
  level: number
}

interface Props {
  html: string | null
}

const props = defineProps<Props>()
const headings = ref<Heading[]>([])
const activeHeading = ref<string>('')

const extractHeadings = () => {
  headings.value = []
  if (!props.html) return

  const content = document.querySelector('.topic-content')
  const elements = content?.querySelectorAll('h2, h3, h4') ?? []
  let headingCounter = 0

  elements.forEach((element) => {
    const level = parseInt(element.tagName[1])
    const text = element.textContent || ''

    if (text.trim()) {
      let id = element.id
      if (!id) {
        id = `heading-${headingCounter++}`
        element.id = id
      }

      headings.value.push({
        id,
        text,
        level
      })
    }
  })
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const updateActiveHeading = () => {
  const headingElements = headings.value.map(heading => document.getElementById(heading.id)).filter(Boolean)
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]!
    const rect = element.getBoundingClientRect()
    
    // If the heading is above the viewport (with some tolerance), it's active
    if (rect.top <= 100) {
      activeHeading.value = element.id
      return
    }
  }
  
  // If no heading is active, set the first one
  activeHeading.value = headings.value[0]?.id || ''
}

const handleScroll = () => {
  updateActiveHeading()
}

watch(
  () => props.html,
  () => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      extractHeadings()
      updateActiveHeading()
    }, 100)
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
