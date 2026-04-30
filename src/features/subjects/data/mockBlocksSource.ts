import type { TopicBlock } from './topicBlocks'

export interface BlocksSource {
  getBlocksByTopic: (slug: string) => Promise<TopicBlock[]>
}

const mockBlocks: Record<string, TopicBlock[]> = {
  variables: [
    {
      type: 'intro',
      data: {
        title: 'Understanding Variables',
        description: 'Variables are containers for storing data values. They allow you to store, retrieve, and manipulate data throughout your program.'
      }
    },
    {
      type: 'accordion',
      data: {
        items: [
          {
            title: 'var, let, and const',
            description: 'Learn the differences between variable declaration keywords.'
          },
          {
            title: 'Scope and Hoisting',
            description: 'Understand how variable scope works and what hoisting means.'
          }
        ]
      }
    }
  ],
  functions: [
    {
      type: 'intro',
      data: {
        title: 'Functions in JavaScript',
        description: 'Functions are reusable blocks of code designed to perform a particular task.'
      }
    },
    {
      type: 'code',
      data: {
        language: 'javascript',
        code: `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function call
console.log(greet('World'));`
      }
    },
    {
      type: 'checklist',
      data: {
        items: [
          { title: 'Understand function declarations' },
          { title: 'Learn about function expressions' },
          { title: 'Master arrow functions' }
        ]
      }
    }
  ],
  closures: [
    {
      type: 'intro',
      data: {
        title: 'Closures Explained',
        description: 'A closure is a function that has access to variables from its outer (enclosing) function scope.'
      }
    },
    {
      type: 'code',
      data: {
        language: 'javascript',
        code: `function outer() {
  let count = 0;
  
  function inner() {
    count++;
    return count;
  }
  
  return inner;
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2`
      }
    }
  ],
  elements: [
    {
      type: 'intro',
      data: {
        title: 'HTML Elements',
        description: 'HTML elements are the building blocks of web pages. They tell the browser how to display content.'
      }
    },
    {
      type: 'accordion',
      data: {
        items: [
          {
            title: 'Structural Elements',
            description: 'Elements like header, main, section, article, footer'
          },
          {
            title: 'Content Elements',
            description: 'Elements like p, h1-h6, ul, ol, blockquote'
          }
        ]
      }
    }
  ],
  forms: [
    {
      type: 'intro',
      data: {
        title: 'HTML Forms',
        description: 'Forms are used to collect user input. Form elements include text inputs, checkboxes, radio buttons, and more.'
      }
    },
    {
      type: 'resources',
      data: {
        items: [
          {
            title: 'MDN Form Guide',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form'
          },
          {
            title: 'HTML Form Best Practices',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms'
          }
        ]
      }
    }
  ]
}

export const createMockBlocksSource = (): BlocksSource => ({
  async getBlocksByTopic(slug: string) {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBlocks[slug] ?? [])
      }, 300)
    })
  }
})
