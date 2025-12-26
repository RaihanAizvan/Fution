/**
 * Central export for all week data
 * Lazy-loadable per route
 */

import type { WeekData } from './types'

// Dynamic imports for code splitting
export const loadWeekData = async (weekNumber: number): Promise<WeekData> => {
  switch (weekNumber) {
    case 1:
      return (await import('./weeks/week-1')).week1Data
    case 2:
      return (await import('./weeks/week-2')).week2Data
    case 3:
      return (await import('./weeks/week-3')).week3Data
    case 4:
      return (await import('./weeks/week-4')).week4Data
    case 5:
      return (await import('./weeks/week-5')).week5Data
    case 15:
      return (await import('./weeks/week-15')).week15Data
    default:
      throw new Error(`Week ${weekNumber} not found`)
  }
}

// Export sidebar config
export { sidebarConfig, motivationalQuotes } from './sidebar-config'
export type * from './types'
