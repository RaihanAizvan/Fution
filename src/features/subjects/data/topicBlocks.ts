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

export type ListItemBlock = {
  title: string
  description?: string
}

export type AccordionBlock = {
  type: 'accordion'
  data: {
    items: ListItemBlock[]
  }
}

export type ChecklistBlock = {
  type: 'checklist'
  data: {
    items: ListItemBlock[]
  }
}

export type PitfallsBlock = {
  type: 'pitfalls'
  data: {
    items: ListItemBlock[]
  }
}

export type ResourcesBlock = {
  type: 'resources'
  data: {
    items: Array<{ title: string; url: string }>
  }
}

export type TopicBlock =
  | IntroBlock
  | CodeBlock
  | AccordionBlock
  | ChecklistBlock
  | PitfallsBlock
  | ResourcesBlock
