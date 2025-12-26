# Vue 3 Migration Guide for Fution

## Executive Summary

This migration converts the Fution codebase from vanilla HTML + Tailwind + JS to Vue 3 + Composition API while maintaining identical functionality and UI. The goal is to eliminate duplication, centralize data, and create a maintainable SPA structure.

---

## 📁 Proposed Folder Structure

```
fution-vue/
├── public/
│   ├── logo.png
│   ├── logo-ryhu.png
│   └── manifest.json
│
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css           # Migrated from style.css
│   │
│   ├── data/
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── sidebar-config.ts      # Sidebar configuration
│   │   ├── weeks/
│   │   │   ├── week-1.ts          # Week 1 topics + proTips
│   │   │   ├── week-2.ts
│   │   │   ├── week-3.ts
│   │   │   ├── week-4.ts
│   │   │   ├── week-5.ts
│   │   │   └── week-15.ts
│   │   └── index.ts               # Exports all week data
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.vue        # Sidebar with navigation
│   │   │   ├── MobileHeader.vue   # Mobile top bar
│   │   │   └── PageLoader.vue     # Loading spinner
│   │   │
│   │   ├── week/
│   │   │   ├── WeekHeader.vue     # Week title + progress circle
│   │   │   ├── TopicsList.vue     # Topics container + accordion
│   │   │   ├── TopicItem.vue      # Individual topic with checkbox
│   │   │   ├── ProTipsList.vue    # Pro tips sidebar
│   │   │   ├── PracticalsList.vue # Practicals with Alpine.js equivalent
│   │   │   └── AddTopicBar.vue    # Add custom topic input
│   │   │
│   │   ├── fution-space/
│   │   │   ├── TabNavigation.vue  # Tab switcher
│   │   │   ├── JournalTab.vue     # Journal functionality
│   │   │   ├── ResourcesTab.vue   # Resources management
│   │   │   └── GoalsTab.vue       # Goals tracking
│   │   │
│   │   └── shared/
│   │       ├── Toast.vue          # Toast notification
│   │       └── Modal.vue          # Reusable modal
│   │
│   ├── composables/
│   │   ├── useWeekTracker.ts      # Core week tracking logic
│   │   ├── useLocalStorage.ts     # localStorage utilities
│   │   ├── useProgressCircle.ts   # Progress circle calculations
│   │   └── useMobileMenu.ts       # Mobile menu toggle
│   │
│   ├── views/
│   │   ├── WeekView.vue           # Dynamic week page
│   │   └── FutionSpace.vue        # Fution Space page
│   │
│   ├── router/
│   │   └── index.ts               # Vue Router config
│   │
│   ├── App.vue                    # Root component
│   └── main.ts                    # Vue app entry point
│
├── index.html                     # Vite entry HTML
├── package.json
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
└── tailwind.config.js             # Tailwind config (keep as-is)
```

---

## 🔄 Migration Strategy

### Phase 1: Data Extraction
- Extract all `window.topics`, `window.proTips`, `window.practicals` into separate TypeScript files
- One file per week in `src/data/weeks/`
- Define TypeScript interfaces for type safety

### Phase 2: Component Creation
- Build Vue components matching existing UI structure
- Replace `document.querySelector` with Vue refs (sparingly)
- Use template bindings instead of DOM manipulation

### Phase 3: State Management
- Convert `WeekLearningTracker` class into `useWeekTracker` composable
- Use `ref()` and `reactive()` for state
- Use `computed()` for derived values like progress

### Phase 4: Routing
- Setup Vue Router for `/week/:id` and `/fution-space`
- Lazy load week data based on route params
- Remove page reload transitions

### Phase 5: Testing & Optimization
- Verify localStorage compatibility
- Test mobile menu behavior
- Ensure progress tracking works identically

---

## 🎯 Key Migrations

### 1. Topics Array (7000+ lines)
**Before (index.html):**
```javascript
window.topics = [ /* 40+ topics */ ];
```

**After (src/data/weeks/week-1.ts):**
```typescript
export const week1Topics: Topic[] = [ /* same data */ ];
```

### 2. WeekLearningTracker Class
**Before (main.js):**
```javascript
class WeekLearningTracker {
  constructor() { /* ... */ }
  init() { /* ... */ }
}
```

**After (composables/useWeekTracker.ts):**
```typescript
export function useWeekTracker(weekKey: string, topics: Topic[]) {
  const topicsState = ref<Record<string, boolean>>({})
  const userTopics = ref<Topic[]>([])
  const progressPercentage = computed(() => /* ... */)
  return { topicsState, userTopics, progressPercentage, ... }
}
```

### 3. DOM Manipulation → Template Bindings
**Before:**
```javascript
this.elements.progressTextMain.innerText = `${progressPercentage}%`;
```

**After:**
```vue
<span>{{ progressPercentage }}%</span>
```

### 4. Sidebar Navigation
**Before:** Static HTML generated per page
**After:** Single `Sidebar.vue` component with `router-link`

---

## 📊 Performance Optimizations

1. **Lazy Loading**: Week data loaded only when route is accessed
2. **Computed Properties**: Progress calculated reactively, no manual updates
3. **v-show vs v-if**: Use `v-show` for tabs (keep DOM, toggle visibility)
4. **No Watchers**: Rely on computed properties and event handlers
5. **Template Refs**: Only use `ref` for DOM access when absolutely necessary (progress circles, scroll)

---

## 🚨 Important Notes

- **No UI changes**: Keep Tailwind classes identical
- **No feature additions**: Port functionality as-is
- **localStorage keys**: Maintain exact same keys for compatibility
- **Mobile behavior**: Preserve swipe gestures and menu animations
- **Alpine.js**: Replace with Vue equivalents (v-show, v-if, @click)

---

## 🔧 Setup Instructions

```bash
# 1. Create Vue 3 + TypeScript project
npm create vite@latest fution-vue -- --template vue-ts

# 2. Install dependencies
cd fution-vue
npm install
npm install -D tailwindcss postcss autoprefixer
npm install vue-router@4

# 3. Setup Tailwind
npx tailwindcss init -p

# 4. Start development
npm run dev
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🎨 CSS Migration

Copy `style.css` to `src/assets/styles/main.css` with minimal changes:
- Keep all custom classes (`.bluue`, `.scrollbar-thin-gray`, etc.)
- Keep all animations
- Import in `main.ts`

---

## 🧪 Testing Checklist

- [ ] Week navigation works (all 8+ weeks)
- [ ] Progress tracking persists correctly
- [ ] Add/delete custom topics
- [ ] Accordion expand/collapse
- [ ] Mobile menu toggle
- [ ] Toast notifications
- [ ] Fution Space tabs (Journal, Resources, Goals)
- [ ] Export/Import functionality
- [ ] Swipe gestures (if preserved)
- [ ] Page transitions

---

## 🚀 Next Steps

1. Review this migration guide
2. Implement data files (see next deliverable)
3. Build core components
4. Setup routing
5. Test thoroughly
6. Deploy

