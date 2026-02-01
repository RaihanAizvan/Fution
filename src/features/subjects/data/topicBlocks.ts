export type IntroBlock = {
  type: 'intro'
  data: {
    title: string
    description: string
  }
}

export type CodeBlock = {
  type: 'code'
  data: {
    language: string
    code: string
  }
}

export type AccordionBlock = {
  type: 'accordion'
  data: {
    items: Array<{
      title: string
      content: string
    }>
  }
}

export type TopicBlock = IntroBlock | CodeBlock | AccordionBlock

export const topicBlocks: Record<string, TopicBlock[]> = {
  variables: [
    {
      type: 'intro',
      data: {
        title: 'Variables Overview',
        description: 'Intro content for Variables will appear here.'
      }
    },
    {
      type: 'code',
      data: {
        language: 'javascript',
        code: `// Variables example\nconst name = 'Ada';`
      }
    },
    {
      type: 'accordion',
      data: {
        items: [
          {
            title: 'Variables details',
            content: 'More details about Variables will appear here.'
          }
        ]
      }
    }
  ],
  functions: [
    {
      type: 'intro',
      data: {
        title: 'Functions Overview',
        description: 'Intro content for Functions will appear here.'
      }
    },
    {
      type: 'code',
      data: {
        language: 'javascript',
        code: `// Functions example\nconst greet = () => 'Hello';`
      }
    },
    {
      type: 'accordion',
      data: {
        items: [
          {
            title: 'Functions details',
            content: 'More details about Functions will appear here.'
          }
        ]
      }
    }
  ],
  closures: [
    {
      type: 'intro',
      data: {
        title: 'Closures Overview',
        description: 'Intro content for Closures will appear here.'
      }
    },
    {
      type: 'code',
      data: {
        language: 'javascript',
        code: `// Closures example\nconst makeCounter = () => {\n  let count = 0;\n  return () => ++count;\n};`
      }
    },
    {
      type: 'accordion',
      data: {
        items: [
          {
            title: 'Closures details',
            content: 'More details about Closures will appear here.'
          }
        ]
      }
    }
  ]
}
