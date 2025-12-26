import type { SidebarConfig } from './types'

export const sidebarConfig: SidebarConfig = {
  logo: {
    src: '/logo.png',
    alt: 'Logo',
    title: 'Fution',
    subtitle: 'Future + Education'
  },
  weeks: [
    {
      id: 1,
      title: 'HTML & CSS',
      subtitle: 'Fundamentals',
      href: '/week/1',
      isActive: false
    },
    {
      id: 2,
      title: 'Bootstrap & Portfolio',
      subtitle: 'Basics',
      href: '/week/2',
      isActive: false
    },
    {
      id: 3,
      title: 'JAVAASCRIPT',
      subtitle: 'Manipulation',
      href: '/week/3',
      isActive: false
    },
    {
      id: 4,
      title: 'Node JS & Express',
      subtitle: 'The Backend World',
      href: '/week/4',
      isActive: false
    },
    {
      id: 5,
      title: 'MongoDB',
      subtitle: 'Database',
      href: '/week/5',
      isActive: false
    },
    {
      id: 6,
      title: 'Full Domain',
      subtitle: 'Things Gets Stuck Here',
      href: '/week/6',
      isActive: false
    },
    {
      id: 7,
      title: 'Figma, API, DB Design',
      subtitle: 'First step to real world',
      href: '/week/7',
      isActive: false
    },
    {
      id: 8,
      title: 'Project 1',
      subtitle: 'Building',
      href: '/week/8',
      isActive: false
    },
    {
      id: 15,
      title: 'DSA - 3',
      subtitle: 'Advanced DSA',
      href: '/week/15',
      isActive: false
    }
  ],
  footer: {
    img: '/logo-ryhu.png',
    copyright: '© 2025 Fution',
    author: {
      text: 'Made by',
      name: 'Raihan',
      url: 'https://github.com/RaihanAizvan'
    }
  }
}

export const motivationalQuotes = [
  { text: "The `<marquee>` tag was a non-standard HTML element used to create scrolling text — it's now considered obsolete.", category: "HTML" },
  { text: "The `<blink>` tag made text blink — thankfully, browsers stopped supporting it.", category: "HTML" },
  { text: "You can nest `<a>` tags inside block-level elements since HTML5 — before that, it wasn't allowed.", category: "HTML" },
  { text: "CSS Grid was first fully supported by browsers in 2017 — making complex layouts way easier.", category: "CSS" },
  { text: "The `z-index` property only works on positioned elements (relative, absolute, fixed, sticky).", category: "CSS" },
  { text: "In CSS, `calc()` allows you to mix units like `width: calc(100% - 50px);`.", category: "CSS" },
  { text: "HTML5 introduced semantic tags like `<section>`, `<article>`, and `<main>` to improve document structure.", category: "HTML" },
  { text: "You can select every even child element with `:nth-child(even)` in CSS — super handy for tables.", category: "CSS" },
  { text: "`rem` units in CSS are relative to the root `<html>` element's font-size, not the parent element.", category: "CSS" },
  { text: "The viewport meta tag is essential for responsive design — without it, mobile browsers scale down your site weirdly.", category: "HTML" }
]
