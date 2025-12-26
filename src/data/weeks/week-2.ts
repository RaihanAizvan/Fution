import type { WeekData } from '../types'

export const week2Data: WeekData = {
  weekKey: 'week2',
  weekNumber: 2,
  title: 'Bootstrap & Portfolio',
  subtitle: 'Basics',
  
  topics: [
    {
      type: 'heading',
      title: 'Bootstrap Resources'
    },
    {
      title: 'Official Bootstrap Documentation',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Bootstrap is a CSS framework that provides pre-built components and utilities. The official documentation is the best place to start.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Bootstrap simplifies styling with ready-made components like navbars, cards, and buttons.</p>
        <p>Visit: <a href="https://getbootstrap.com/" target="_blank" class="text-blue-400 hover:underline">Bootstrap Official Docs</a></p>
      </div>`
    },
    {
      title: 'Portfolio Requirements',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: A portfolio showcases your skills and projects. It should have 6 essential sections.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Your portfolio must include:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Home</strong> - Hero section with your intro</li>
          <li><strong>About</strong> - Your background and skills</li>
          <li><strong>Projects</strong> - Showcase your work</li>
          <li><strong>Skills</strong> - Technologies you know</li>
          <li><strong>Contact</strong> - Contact form with EmailJS</li>
          <li><strong>Blog</strong> - Optional articles/posts</li>
        </ul>
      </div>`
    },
    {
      title: 'Form Validation',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Form validation ensures users enter correct data. Use JavaScript and regex for validation.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Validate inputs strictly:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Name: Only letters and spaces - <code class="bg-gray-900 px-2 rounded">/^[a-zA-Z ]+$/</code></li>
          <li>Email: Proper format - <code class="bg-gray-900 px-2 rounded">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</code></li>
          <li>Show error messages for invalid inputs</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <pre><code class="text-white">function validateName(name) {
  const regex = /^[a-zA-Z ]+$/;
  return regex.test(name);
}</code></pre>
        </div>
      </div>`
    },
    {
      title: 'EmailJS Integration',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: EmailJS allows sending emails from client-side JavaScript without a backend.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Use EmailJS to receive contact form submissions:</p>
        <ol class="list-decimal list-inside ml-4">
          <li>Sign up at <a href="https://www.emailjs.com/" target="_blank" class="text-blue-400 hover:underline">EmailJS</a></li>
          <li>Add the script: <code class="bg-gray-900 px-2 rounded">&lt;script src="https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js"&gt;&lt;/script&gt;</code></li>
          <li>Initialize and send emails from your form</li>
        </ol>
      </div>`
    },
    {
      title: 'Performance Optimization',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Performance is crucial for user experience. Aim for 90+ score on Lighthouse.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Optimization techniques:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Image Compression</strong> - Use TinyPNG or ImageOptim</li>
          <li><strong>Lazy Loading</strong> - Add <code class="bg-gray-900 px-2 rounded">loading="lazy"</code> to images</li>
          <li><strong>Minify CSS/HTML</strong> - Use cssnano and HTMLMinifier</li>
          <li><strong>Remove Unused CSS</strong> - Use PurgeCSS</li>
        </ul>
      </div>`
    },
    {
      title: 'Responsive Design',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Responsive design ensures your site works on all devices.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Make your portfolio mobile-friendly:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Use Bootstrap grid or Tailwind flexbox/grid</li>
          <li>Test on different screen sizes</li>
          <li>Add viewport meta tag: <code class="bg-gray-900 px-2 rounded">&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></li>
        </ul>
      </div>`
    }
  ],
  
  proTips: [
    { text: "Avoid Bootstrap this week; use Tailwind CSS for its flexible, customizable styles. Trust me guys Tailwind will make your portfolio shine. Bootstrap can slow you down with unused code. Even if you take bootstrap, eventually you will change it to Tailwind in your projects. Hahaha", color: "red" },
    { text: "Always add comments to your JavaScript, HTML, and CSS code. Comments explain your logic to reviewers and future teammates. They make debugging easier too.", color: "blue" },
    { text: "Use styles like carousels, hover effects, and tooltips sparingly. Try Tailwind's <code class='bg-gray-900 px-2 border border-gray-700 rounded-md'>hover:scale-105</code> for smooth effects or <code>tooltip</code> classes. Overuse can distract users.", color: "blue" },
    { text: "Your portfolio must have 6 sections: Home, About, Projects, Skills, Contact, and Blog. Link them in a sticky nav with Tailwind's <code>sticky top-0</code>. One HTML file with sections is enough.", color: "green" },
    { text: "You need to recieve email from the contact page with the details of the user. Use EmailJS to send emails from your portfolio. It's easy to set up and works well with JavaScript.", color: "green" },
    { text: "Don't skip JavaScript practice—it's key for Week 3! Work on event listeners and form validation now. It's like building a strong foundation for a house.", color: "blue" },
    { text: "Validate forms strictly. Block names like <code>$123username</code> using regex (e.g., <code>/^[a-zA-Z ]+$/</code>). Show a red error message if inputs are invalid.", color: "green" },
    { text: "Ensure email validation checks for proper format (e.g., <code>user@domain.com</code>). Use regex like <code>/^[^\\s@]+@[^\\s@]+\\.&nbsp[^\\s@]+$/</code>. Display a popup alert for invalid emails.", color: "green" },
    { text: "Use EmailJS for your contact form—it's simple and reliable. Include it with <code>&lt;script src='https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js'&gt;&lt;/script&gt;</code>. Set it up to send messages to your email.", color: "blue" },
    { text: "Aim for a performance score above 90 on tools like Lighthouse. Optimize images, minify files, and use lazy loading. Reviewers may test live performance!", color: "green" },
    { text: "Don't panic if performance is low—it depends on images, scripts, and styles. Focus on optimizing what you control, like CSS and images. Reviewers give 2 minutes to improve scores.", color: "blue" },
    { text: "Compress images with TinyPNG or ImageOptim to reduce file size. Smaller images load faster and boost performance. Always add <code>alt</code> text for accessibility.", color: "blue" },
    { text: "Minify CSS with cssnano and HTML with HTMLMinifier. Minified files reduce load time and improve performance. Use online tools or build scripts for automation.", color: "blue" },
    { text: "Remove unused CSS with PurgeCSS, especially if you accidentally include Bootstrap. Tailwind's utility classes are leaner. Clean CSS keeps your site fast.", color: "blue" },
    { text: "Add lazy loading to images <code>loading='lazy'</code>. It loads media only when visible, saving bandwidth. Example: <code>&lt;img src='logo.png' width=30 alt='Description' loading='lazy'&gt;</code>.", color: "blue" }
  ],
  
  practicals: []
}
