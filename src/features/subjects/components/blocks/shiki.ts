import { getHighlighter as createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

export const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-dark'],
      langs: [
        'bash',
        'css',
        'html',
        'javascript',
        'json',
        'jsx',
        'markdown',
        'scss',
        'tsx',
        'typescript',
        'vue',
        'xml'
      ]
    })
  }

  return highlighterPromise
}
