import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

export const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-dark'],
      langs: ['javascript', 'typescript', 'json', 'bash', 'css', 'html', 'vue']
    })
  }

  return highlighterPromise
}
