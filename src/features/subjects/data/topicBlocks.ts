export type IntroBlock = {
  type: 'intro'
  title: string
  description: string
}

export type CodeBlock = {
  type: 'code'
  language: string
  code: string
}

export type AccordionBlock = {
  type: 'accordion'
  title: string
  content: string
}

export type TopicBlock = IntroBlock | CodeBlock | AccordionBlock

export const topicBlocks: Record<string, TopicBlock[]> = {
  variables: [
    {
      type: 'intro',
      title: 'Variables Overview',
      description: 'Intro content for Variables will appear here.'
    },
    {
      type: 'code',
      language: 'javascript',
      code: `// Variables example\nconst name = 'Ada';`
    },
    {
      type: 'accordion',
      title: 'Variables details',
      content: 'More details about Variables will appear here.'
    }
  ],
  functions: [
    {
      type: 'intro',
      title: 'Functions Overview',
      description: 'Intro content for Functions will appear here.'
    },
    {
      type: 'code',
      language: 'javascript',
      code: `// Functions example\nconst greet = () => 'Hello';`
    },
    {
      type: 'accordion',
      title: 'Functions details',
      content: 'More details about Functions will appear here.'
    }
  ],
  closures: [
    {
      type: 'intro',
      title: 'Closures Overview',
      description: 'Intro content for Closures will appear here.'
    },
    {
      type: 'code',
      language: 'javascript',
      code: `// Closures example\nconst makeCounter = () => {\n  let count = 0;\n  return () => ++count;\n};`
    },
    {
      type: 'accordion',
      title: 'Closures details',
      content: 'More details about Closures will appear here.'
    }
  ]
}
