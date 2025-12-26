import type { WeekData } from '../types'

export const week2Data: WeekData = {
  weekKey: 'week2',
  weekNumber: 2,
  title: 'Bootstrap & Portfolio',
  subtitle: 'Basics',

  topics: [
    {
      type: 'heading',
      title: "Bootstrap Resources",
    },
    {
      title: "What is Bootstrap",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap is a popular CSS framework for building responsive websites. It offers pre-designed components and utilities. It simplifies web development for beginners and experts.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Bootstrap is a front-end framework for mobile-first, responsive web design:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Uses CSS and JavaScript components</li>
          <li>Provides responsive grid system</li>
          <li>Includes buttons, forms, navbars, and more</li>
        </ul>
        <p class="text-sm text-gray-400">It’s widely used for its simplicity and consistency.</p> <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">Click here</a>
      </div>`
    },
    {
      title: "How to include Bootstrap in your project",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap can be added using a CDN link. Include CSS and JavaScript files in your HTML. This makes styling and components ready to use.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Add Bootstrap via CDN in your HTML:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 overflow-x-auto">
  <pre class="whitespace-pre-wrap break-words">
    <code class="text-white">&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"&gt;</code>
  </pre>
</div>

        <p class="text-sm text-gray-400">Place in <code>&lt;head&gt;</code> for CSS and before
          <code>&lt;/body&gt;</code> for
          JS.</p>
          <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">
            Click here
          </a>
  </div>`
    },
    {
      title: "Bootstrap Grid System",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap’s grid
    system uses flexbox for responsive layouts. It has 12 columns for flexible designs. Containers, rows, and columns
    align content easily.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>The grid system creates responsive layouts with 12 columns:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="container">
    <div class="flex">
      <div class="w-1/3">Column 1</div>
      <div class="w-1/3">Column 2</div>
      <div class="w-1/3">Column 3</div>
    </div>

</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Use <code>.container</code>, <code>.row</code>, and <code>.col</code> classes.</p>
    <a href="https://getbootstrap.com/docs/5.3/layout/grid/">Click here</a>
  </div>`
    },
    {
      title: "Understanding the grid system",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: The grid system has
    containers, rows, and columns. Columns are responsive with breakpoints like sm, md, lg. It adjusts layouts for
    different screen sizes.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Grid uses flexbox with six breakpoints (xs, sm, md, lg, xl, xxl):</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="container">
 <div class="flex flex-wrap">
  <div class="w-full sm:w-1/2">Half on small screens</div>
  <div class="w-full sm:w-1/2">Half on small screens</div>
</div>

</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Columns stack on smaller screens automatically.</p>
    <a href="https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php">Click here</a>
  </div>`
    },
    {
      title: "Creating responsive layouts",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Responsive layouts
    adjust to screen sizes. Use classes like col-sm-4 or col-md-6. Breakpoints ensure layouts look good on all devices.
  </blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Create layouts that adapt to different devices:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="container">
  <div class="flex flex-wrap">
  <div class="w-full md:w-1/3 bg-blue-700 p-4">1/3 on medium screens</div>
  <div class="w-full md:w-2/3 bg-green-500 p-4">2/3 on medium screens</div>
</div>

</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Use breakpoint classes for responsive design.</p>
    <a href="https://www.w3schools.com/bootstrap/bootstrap_grid_basic.asp">Click here</a>
  </div>`
    },
    {
      title: "Text styling and alignment",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap has classes
    for text styling and alignment. Use text-center or fw-bold for quick styling. It makes text look clean and
    professional.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Style and align text with utility classes:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><p class="text-center fw-bold text-primary">Bold Centered Text</p></code></pre>
    </div>
    <p class="text-sm text-gray-400">Classes like <code>text-start</code>, <code>text-end</code>, <code>fw-normal</code>
      control alignment and weight.</p>
  </div>`
    },
    {
      title: "Utility classes for text",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Text utilities
    control size, weight, and alignment. Classes like fs-1 or text-uppercase are easy to use. They save time in styling
    text.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Text utilities adjust font properties:</p>
    <ul class="list-disc list-inside ml-4">
      <li><code>fs-1</code>: Large font size</li>
      <li><code>text-uppercase</code>: Uppercase text</li>
      <li><code>text-muted</code>: Subdued color</li>
    </ul>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><p class="fs-3 text-uppercase">Big Uppercase Text</p></code></pre>
    </div>
  </div>`
    },
    {
      title: "Using Bootstrap color classes",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Color classes add
    vibrant styles to elements. Use text-primary or bg-success for quick color changes. They keep designs consistent.
  </blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Apply colors with classes like <code>text-primary</code>, <code>text-danger</code>:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><p class="text-green-500">Success Text</p>
<div class="bg-orange-500 text-dark">Warning Background</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Colors match Bootstrap’s theme.</p>
    <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">Click here</a>
  </div>`
    },
    {
      title: "Background utilities",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Background utilities
    set element backgrounds. Use bg-primary or bg-light for styling. They make elements stand out visually.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Add backgrounds with classes:</p>
    <div class="bg-primary text-white p-4 rounded">Primary Background</div>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="bg-primary text-white">Primary Background</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Combine with <code>text-*</code> for contrast.</p>
  </div>`
    },
    {
      title: "Buttons",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap buttons are
    customizable and responsive. Use btn and btn-primary for styling. They enhance user interaction.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Create buttons with <code>btn</code> classes:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><button class="bg-blue-500">Click Me</button>
<button class="border ">Outline Button</button></code></pre>
    </div>
    <p class="text-sm text-gray-400">Use <code>btn-lg</code> or <code>btn-sm</code> for sizes.</p>
    <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">Click here</a>
  </div>`
    },
    {
      title: "Alerts",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Alerts show important
    messages to users. Use alert and alert-success for styling. They are dismissible and responsive.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Display alerts with <code>alert</code> classes:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Success!</strong>
  <span class="block sm:inline">Task completed.</span>
</div>

    </div>
    <p class="text-sm text-gray-400">Add <code>alert-dismissible</code> for close buttons.</p>
    <a href="https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php">Click here</a>
  </div>`
    },
    {
      title: "Badges",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Badges highlight
    small pieces of information. Use badge and bg-info for styling. They are great for notifications.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Badges are small labels:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <span class="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">New</span>
    </div>
    <p class="text-sm text-gray-400">Use with buttons or text for emphasis.</p>
    <a href="https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php">Click here</a>
  </div>`
    },
    {
      title: "Cards",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Cards organize
    content in a clean layout. Use card and card-body for structure. They are flexible for images and text.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Cards group content stylishly:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <div class="bg-white shadow-md rounded-lg p-4">
  <h5 class="text-lg font-semibold mb-2">Card Title</h5>
  <p class="text-gray-700">Some content here.</p>
</div>

    </div>
    <p class="text-sm text-gray-400">Add <code>card-img-top</code> for images.</p>
    <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">Click here</a>
  </div>`
    },
    {
      title: "Forms",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap forms are
    user-friendly and styled. Use form-control for inputs. They support validation and layouts.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Create forms with <code>form-control</code>:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <form class="space-y-4">
  <input type="text" placeholder="Name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
  <input type="email" placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
</form>
    </div>
    <p class="text-sm text-gray-400">Use <code>form-group</code> for spacing.</p>
    <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">Click here</a>
  </div>`
    },
    {
      title: "Creating a navbar",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Navbars provide
    navigation menus. Use navbar and navbar-expand for responsive design. They include links and toggles.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Build a responsive navbar:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a href="#" class="text-xl font-semibold text-gray-800">Logo</a>

      <!-- Toggle Button (Mobile) -->
      <button id="navbar-toggle" class="md:hidden text-gray-800 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Nav Links -->
      <div id="navbar-menu" class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-700 hover:text-blue-500">Home</a>
        <!-- Add more links as needed -->
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="md:hidden hidden px-4 pb-4">
    <a href="#" class="block py-2 text-gray-700 hover:text-blue-500">Home</a>
    <!-- Add more links as needed -->
  </div>
</nav>

<script>
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');

    </div>
    <p class="text-sm text-gray-400">Requires Bootstrap JS for toggling.</p>
    <a href="https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php">Click here</a>
  </div>`
    },
    {
      title: "Dropdown menus",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Dropdown menus
    organize navigation options. Use dropdown and dropdown-menu classes. They work well in navbars.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Create dropdowns for menus:</p>
    <p class="text-sm text-gray-400">Needs Bootstrap JS for functionality.</p>
    <a href="https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php">Click here</a>
  </div>`
    },
    {
      title: "Spacing utilities (padding and margin)",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Spacing utilities
    control padding and margin. Use classes like p-3 or m-2 for quick adjustments. They make layouts clean and balanced.
  </blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Adjust spacing with utilities:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="p-4 m-3 bg-light">Padding and Margin</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Use <code>p-*</code> for padding, <code>m-*</code> for margin (0 to 5).</p>
    <a href="https://getbootstrap.com/docs/5.3/layout/grid/">Click here</a>
  </div>`
    },
    {
      title: "Display utilities",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Display utilities
    control element visibility. Use d-none or d-flex for layouts. They adapt to different screen sizes.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Control visibility with display classes:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="d-none d-md-block">Visible on medium screens</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Use <code>d-*</code> for responsive display.</p>
    [](https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/)
  </div>`
    },
    {
      title: "Flex utilities",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Flex utilities align
    and arrange elements. Use d-flex and justify-content-center for control. They simplify complex layouts.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Use flexbox for alignment:</p>
    <div class="d-flex justify-content-between bg-light p-3 rounded">
      <div class="bg-primary text-white p-2">Item 1</div>
      <div class="bg-primary text-white p-2">Item 2</div>
    </div>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <pre><code class="text-white"><div class="d-flex justify-content-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div></code></pre>
    </div>
    <p class="text-sm text-gray-400">Combine with <code>align-items-*</code> for vertical alignment.</p>
    [](https://getbootstrap.com/docs/4.1/layout/grid/)
  </div>`
    },
    {
      title: "Creating and customizing modals",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Modals are dialog
    popups for user interaction. Use modal and modal-dialog for structure. Customize with classes like modal-lg.
  </blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Create modals for alerts or forms:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <!-- Hidden Checkbox Controller -->
      <input type="checkbox" id="modal-toggle" class="hidden peer" />

      <!-- Trigger Button -->
      <label for="modal-toggle" class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
        Open Modal
      </label>

      <!-- Modal Backdrop and Content -->
      <div class="fixed inset-0 bg-black bg-opacity-50 hidden peer-checked:flex items-center justify-center z-50">
        <!-- Modal Content -->
        <label for="modal-toggle" class="absolute inset-0 cursor-pointer"></label> <!-- click outside to close -->
        
        <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full z-10">
          <!-- Modal Header -->
          <div class="flex justify-between items-center border-b px-4 py-2">
            <h5 class="text-lg font-semibold">Modal Title</h5>
            <label for="modal-toggle" class="text-gray-500 hover:text-gray-700 cursor-pointer text-xl">&times;</label>
          </div>
          <!-- Modal Body -->
          <div class="p-4 text-gray-700">
            Content here
          </div>
        </div>
      </div>

    </div>
    <p class="text-sm text-gray-400">Requires Bootstrap JS for functionality.</p>
    <a href="https://www.geeksforgeeks.org/bootstrap/bootstrap-tutorial/">Click here</a>
  </div>`
    },
    {
      title: "Styling tables with Bootstrap",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap styles
    tables with classes like table. Add table-striped or table-bordered for effects. They make tables clear and
    attractive.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Style tables with Bootstrap classes:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200 text-left">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 text-sm font-medium text-gray-700">Header</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="bg-white">
        <td class="px-4 py-2 text-gray-800">Data</td>
      </tr>
      <tr class="bg-gray-50">
        <td class="px-4 py-2 text-gray-800">Data 2</td>
      </tr>
      <tr class="bg-white">
        <td class="px-4 py-2 text-gray-800">Data 3</td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
    <p class="text-sm text-gray-400">Use <code>table-hover</code> for interactive rows.</p>
    <a href="https://getbootstrap.com/docs/3.4/css/">Click here</a>
  </div>`
    },
    {
      title: "Table responsive utilities",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Responsive tables
    adapt to small screens. Use table-responsive to make tables scrollable. It improves usability on mobile devices.
  </blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Make tables responsive:</p>
    <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
      <div class="overflow-x-auto">
  <table class="min-w-full table-auto border border-gray-300">
    <tr class="border-b">
      <td class="p-4 whitespace-nowrap">Wide Content</td>
    </tr>
  </table>
</div>

    </div>
    <p class="text-sm text-gray-400">Add <code>table-responsive-sm</code> for specific breakpoints.</p>
    <a href="https://getbootstrap.com/docs/3.4/css/">Click here</a>
  </div>`
    },
    {
      title: "Including and using Bootstrap icons",
      details: `
  <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Bootstrap icons add
    visual elements. Include the icon CDN and use i tags. They enhance buttons and links.</blockquote>
  <div class="space-y-3 text-gray-300">
    <p>Add icons via CDN:</p>
    <p class="text-sm text-gray-400">Use <code>bi-*</code> classes for different icons.</p>
    <a href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-grid-system.php">Click here</a>
  </div>`
    },
    {
      type: 'heading',
      title: "Basic Javascript",
    },

    {
      title: "What is JavaScript",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: JavaScript makes websites interactive. It adds life to HTML and CSS. It’s like the brain of a webpage.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Think of JavaScript as the <span class="text-yellow-300">magic wand</span> that makes web pages dynamic. It handles actions like button clicks, form submissions, and animations.</p>
        <ul class="list-disc list-inside ml-4">
          <li>Runs in browsers to control webpage behavior</li>
          <li>Works with HTML and CSS</li>
          <li>Used for games, apps, and more</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">console.log("Hello, JavaScript!");</code></pre>
        </div>
        <p class="text-sm text-gray-400">JavaScript brings interactivity to static pages.</p>
      </div>`
    },
    {
      title: "How to include JavaScript in HTML",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: JavaScript is added to HTML with script tags. You can write it inline or link a file. Place it before the body closing tag for best performance.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>JavaScript is like a <span class="text-blue-400">recipe</span> you add to your HTML cake. Use the <code>&lt;script&gt;</code> tag in two ways:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Inline: Write code directly in HTML</li>
          <li>External: Link a .js file</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">&lt;script&gt;
  alert("Welcome!");
&lt;/script&gt;
&lt;script src="script.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p class="text-sm text-gray-400">Put <code>&lt;script&gt;</code> before <code>&lt;/body&gt;</code> to load after HTML.</p>
      </div>`
    },
    {
      title: "Variables (var, let, const)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Variables store data like numbers or text. Use var, let, or const for different needs. Const is for values that don’t change.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Variables are <span class="text-pink-400">containers</span> holding data. JavaScript has three types:</p>
        <ul class="list-disc list-inside ml-4">
          <li><code>var</code>: Old way, can be redeclared</li>
          <li><code>let</code>: Can be updated, not redeclared</li>
          <li><code>const</code>: Cannot change after set</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">let name = "Alice";
const age = 25;
var score = 100;
name = "Bob"; // OK
// age = 26; // Error!</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use <code>let</code> or <code>const</code> for modern code.</p>
      </div>`
    },
    {
      title: "Data types (string, number, boolean, array, object)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: JavaScript has data types like strings and numbers. Arrays hold lists, objects hold key-value pairs. They store different kinds of information.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Data types are like <span class="text-green-400">ingredients</span> in a recipe. Common types include:</p>
        <ul class="list-disc list-inside ml-4">
          <li><code>String</code>: Text, e.g., "Hello"</li>
          <li><code>Number</code>: Numbers, e.g., 42</li>
          <li><code>Boolean</code>: True or false</li>
          <li><code>Array</code>: List, e.g., [1, 2, 3]</li>
          <li><code>Object</code>: Key-value pairs, e.g., {name: "Alice"}</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">let text = "Hello";
let num = 42;
let isTrue = true;
let list = [1, 2, 3];
let person = { name: "Alice", age: 25 };</code></pre>
        </div>
        <p class="text-sm text-gray-400">Each type serves a unique purpose.</p>
      </div>`
    },
    {
      title: "Operators (arithmetic, comparison, logical)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Operators do math, compare values, or combine conditions. They include plus, equal, and AND. They make JavaScript powerful for decisions.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Operators are like <span class="text-yellow-300">tools</span> for working with data:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Arithmetic: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code></li>
          <li>Comparison: <code>==</code>, <code>===</code>, <code>&gt;</code>, <code>&lt;</code></li>
          <li>Logical: <code>&&</code>, <code>||</code>, <code>!</code></li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">let sum = 5 + 3; // 8
let isEqual = 5 === "5"; // false
let result = (sum > 5) && (sum < 10); // true</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use <code>===</code> for strict equality checks.</p>
      </div>`
    },
    {
      title: "Declaring and invoking functions",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Functions are reusable blocks of code. Declare with function keyword and call by name. They make code organized and efficient.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Functions are like <span class="text-blue-400">recipes</span> you can reuse:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Declare with <code>function</code> keyword</li>
          <li>Invoke by calling the function name</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">function greet(name) {
  return "Hello, " + name;
}
console.log(greet("Alice")); // Hello, Alice</code></pre>
        </div>
        <p class="text-sm text-gray-400">Functions can take parameters for flexibility.</p>
      </div>`
    },
    {
      title: "Function expressions and arrow functions",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Function expressions store functions in variables. Arrow functions are a shorter syntax. Both are modern ways to write functions.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Think of these as <span class="text-pink-400">shortcuts</span> for functions:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Function expression: Assign function to a variable</li>
          <li>Arrow function: Compact syntax with <code>=></code></li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const add = function(a, b) { return a + b; };
const multiply = (a, b) => a * b;
console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6</code></pre>
        </div>
        <p class="text-sm text-gray-400">Arrow functions are concise but lack <code>this</code> binding.</p>
      </div>`
    },
    {
      title: "Conditional statements (if, else, switch)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Conditionals control code flow based on conditions. Use if-else for simple checks and switch for multiple options. They make decisions in code.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Conditionals are like <span class="text-green-400">traffic lights</span> guiding code:</p>
        <ul class="list-disc list-inside ml-4">
          <li><code>if-else</code>: Check conditions</li>
          <li><code>switch</code>: Handle multiple cases</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">let age = 18;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
switch (age) {
  case 18: console.log("Just 18"); break;
  default: console.log("Other age");
}</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use <code>break</code> in switch to avoid fall-through.</p>
      </div>`
    },
    {
      title: "Loops (for, while, do...while)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Loops repeat code for tasks. For, while, and do-while handle different needs. They save time for repetitive actions.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Loops are like a <span class="text-yellow-300">conveyor belt</span> repeating tasks:</p>
        <p>Just like you studied in fumigation</p>
        <ul class="list-disc list-inside ml-4">
          <li><code>for</code>: Known number of iterations</li>
          <li><code>while</code>: Condition-based looping</li>
          <li><code>do...while</code>: Runs at least once</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use loops to automate repetitive tasks.</p>
      </div>`
    },
    {
      title: "Understanding DOM events",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: DOM events are user actions like clicks or typing. JavaScript listens to these events. They make websites interactive.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>DOM events are like <span class="text-blue-400">sensors</span> detecting user actions:</p>
        <ul class="list-disc list-inside ml-4">
          <li><code>click</code>: Button or element click</li>
          <li><code>input</code>: Form input change</li>
          <li><code>mouseover</code>: Hovering over element</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">document.getElementById("myButton").onclick = () => {
  alert("Clicked!");
};</code></pre>
        </div>
        <p class="text-sm text-gray-400">Events trigger JavaScript actions.</p>
      </div>`
    },
    {
      title: "Event listeners",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Event listeners watch for user actions. Use addEventListener for flexibility. They handle clicks, keypresses, and more.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Event listeners are like <span class="text-pink-400">guards</span> waiting for events:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const button = document.querySelector("#myButton");
button.addEventListener("click", () => {
  console.log("Button clicked!");
});</code></pre>
        </div>
        <p class="text-sm text-gray-400">Listeners are better than inline event attributes.</p>
      </div>`
    },
    {
      title: "Selecting elements (getElementById, querySelector)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Selecting elements lets you control the DOM. Use getElementById for IDs and querySelector for flexibility. They target specific HTML elements.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Selecting elements is like <span class="text-green-400">finding keys</span> in a room:</p>
        <ul class="list-disc list-inside ml-4">
          <li><code>getElementById</code>: Select by ID</li>
          <li><code>querySelector</code>: Select by CSS selector</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const title = document.getElementById("title");
const para = document.querySelector(".my-class");</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use <code>querySelectorAll</code> for multiple elements.</p>
      </div>`
    },
    {
      title: "Modifying elements (textContent, innerHTML, style)",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Modifying elements changes their content or style. Use textContent for text, innerHTML for HTML, and style for CSS. They update the webpage dynamically.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Modifying elements is like <span class="text-yellow-300">painting</span> a canvas:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const para = document.querySelector("p");
para.textContent = "New text";
para.innerHTML = "<b>Bold text</b>";
para.style.color = "blue";</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use <code>textContent</code> to avoid XSS risks with <code>innerHTML</code>.</p>
      </div>`
    },
    {
      title: "Creating arrays",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Arrays store lists of data like numbers or strings. Use square brackets to create them. They are great for managing collections.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Arrays are like <span class="text-blue-400">shelves</span> for storing items:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const fruits = ["Apple", "Banana", "Orange"];
            fruits.push("Mango"); // Add item
            console.log(fruits[0]); // Apple</code></pre>
        </div>
        <p class="text-sm text-gray-400">Access items with index (starts at 0).</p>
      </div>`
    },
    {
      title: "JavaScript Form Validation",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Form validation checks user input before submission. Use JavaScript to ensure data is correct. It improves user experience and data quality.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Form validation is like a <span class="text-pink-400">gatekeeper</span> checking entries:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  const input = document.querySelector("#name");
  if (input.value === "") {
    alert("Name is required!");
    e.preventDefault();
  }
});</code></pre>
        </div>
        <p class="text-sm text-gray-400">Validate inputs to prevent errors.</p>
      </div>`
    },
    {
      title: "Basic form validation techniques",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Basic validation checks for empty fields or formats. Use conditions and regex for rules. It ensures data is valid before processing.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Validation techniques are like <span class="text-green-400">filters</span> for data:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Check for empty inputs</li>
          <li>Validate email format</li>
          <li>Ensure numbers are valid</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const email = document.querySelector("#email");
if (!email.value.includes("@")) {
  alert("Invalid email!");
}</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use regex for complex patterns like emails.</p>
      </div>`
    },
    {
      title: "Preventing form submission",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Preventing form submission stops invalid data. Use event.preventDefault in event listeners. It keeps forms user-friendly and safe.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Prevent submission like a <span class="text-yellow-300">stop sign</span> for bad data:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  const input = document.querySelector("#input");
  if (input.value.length < 3) {
    e.preventDefault();
    alert("Input too short!");
  }
});</code></pre>
        </div>
        <p class="text-sm text-gray-400">Use <code>preventDefault</code> to stop form submission.</p>
      </div>`
    },
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
