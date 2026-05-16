export interface TopicSummary {
  id: string
  title: string
}

export interface TopicsSource {
  listTopicsBySubject: (slug: string) => Promise<TopicSummary[]>
}

const mockTopics: Record<string, TopicSummary[]> = {
  javascript: [
    { id: 'variables', title: 'Variables' },
    { id: 'functions', title: 'Functions' },
    { id: 'closures', title: 'Closures' }
  ],
  html: [
    { id: 'elements', title: 'Elements' },
    { id: 'forms', title: 'Forms' },
    { id: 'semantics', title: 'Semantics' }
  ],
  css: [
    { id: 'selectors', title: 'Selectors' },
    { id: 'layout', title: 'Layout' },
    { id: 'responsive', title: 'Responsive Design' }
  ]
}

export const createMockTopicsSource = (): TopicsSource => ({
  async listTopicsBySubject(slug: string) {
    return mockTopics[slug] ?? []
  }
})
