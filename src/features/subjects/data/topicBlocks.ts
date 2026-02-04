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
