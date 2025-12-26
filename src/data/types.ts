/**
 * Core TypeScript interfaces for Fution app
 */

export interface Topic {
  title: string
  details?: string | null
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner → Intermediate' | 'Intermediate → Advanced'
  type?: 'heading' // For section headers
}

export interface ProTip {
  text: string
  color: 'blue' | 'green' | 'red'
}

export interface Practical {
  practicalTopic: string
  difficulty: string
  details: string // HTML string
}

export interface WeekData {
  weekKey: string
  weekNumber: number
  title: string
  subtitle: string
  topics: Topic[]
  proTips: ProTip[]
  practicals?: Practical[]
}

export interface WeekConfig {
  id: number
  title: string
  subtitle: string
  href: string
  isActive: boolean
}

export interface SidebarConfig {
  logo: {
    src: string
    alt: string
    title: string
    subtitle: string
  }
  weeks: WeekConfig[]
  footer: {
    img: string
    copyright: string
    author: {
      text: string
      name: string
      url: string
    }
  }
}

// LocalStorage state interfaces
export interface TopicsState {
  [key: string]: boolean // topicKey -> completed
}

export interface UserTopic {
  title: string
  details: string | null
}

export interface JournalEntry {
  text: string
  title: string
  createdAt: number
  updatedAt: number
}

export interface Resource {
  title: string
  url: string
  note: string
  addedAt: number
}

export interface Goal {
  title: string
  completed: boolean
  createdAt: number
}

export interface ExportData {
  exportedAt: number
  weekData: {
    weekKey: string
    topics: Topic[]
    userTopics: UserTopic[]
    topicsState: TopicsState
    progressStats: {
      totalTopics: number
      completedTopics: number
      progressPercentage: number
      weekKey: string
    }
  }
  journal: JournalEntry[]
  resources: Resource[]
  goals: Goal[]
}
