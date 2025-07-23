// sidebar-config.js - Configuration for all weeks
const sidebarConfig = {
    logo: {
        src: "logo.png",
        alt: "Logo",
        title: "Fution",
        subtitle: "Future + Education"
    },
    weeks: [
        {
            id: 1,
            title: "HTML & CSS",
            subtitle: "Fundamentals",
            href: "index.html",
            isActive: false // This will be set dynamically
        },
        {
            id: 2,
            title: "Bootstrap & Portfolio",
            subtitle: "Basics",
            href: "week-2.html",
            isActive: false
        },
        {
            id: 3,
            title: "DOM",
            subtitle: "Manipulation",
            href: "week-3.html",
            isActive: false
        },
        {
            id: 4,
            title: "React",
            subtitle: "Fundamentals",
            href: "week-4.html",
            isActive: false
        },
        {
            id: 5,
            title: "Projects",
            subtitle: "Building",
            href: "week-5.html",
            isActive: false
        },
        {
            id: 5,
            title: "Projects",
            subtitle: "Building",
            href: "week-5.html",
            isActive: false
        },
        {
            id: 5,
            title: "Projects",
            subtitle: "Building",
            href: "week-5.html",
            isActive: false
        },
        {
            id: 5,
            title: "Projects",
            subtitle: "Building",
            href: "week-5.html",
            isActive: false
        },
        // Add new weeks here as needed
    ],
    footer: {
        img: "logo-ryhu.png",
        copyright: "© 2025 Fution",
        author: {
            text: "Made by",
            name: "Raihan",
            url: "https://github.com/RaihanAizvan"
        }
    }
};






// sidebar-generator.js - Function to generate sidebar HTML

function generateSidebar(currentWeek = 1) {
    const config = sidebarConfig;

    // Set active week
    config.weeks.forEach(week => {
        week.isActive = week.id === currentWeek;
    });

    const weeksHTML = config.weeks.map(week => {
        const activeClass = week.isActive ? 'active-week' : '';
        const numberBgClass = week.isActive ? 'bg-blue-500' : 'bg-gray-600';
        const activeIndicator = week.isActive ?
            '<div class="ml-auto"><div class="w-2 h-2 bg-blue-500 rounded-full"></div></div>' : '';

        return `
            <a href="${week.href}" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 week-item ${activeClass}">
                <div class="w-8 h-8 ${numberBgClass} rounded-full flex items-center justify-center text-sm font-bold  ${week.isActive ? 'text-white' : ''}">
                ${week.id}
                </div>
                <div>
                <div class="font-medium">${week.title}</div>
                <div class="text-xs text-gray-400">${week.subtitle}</div>
                </div>
                ${activeIndicator}
            </a>
    `;
    }).join('');

    // Random motivational quote logic
    const quotes = [
        { text: "The `&ltmarquee>` tag was a non-standard HTML element used to create scrolling text — it’s now considered obsolete.", category: "HTML" },
        { text: "The `&ltblink>` tag made text blink — thankfully, browsers stopped supporting it.", category: "HTML" },
        { text: "You can nest `&lta>` tags inside block-level elements since HTML5 — before that, it wasn’t allowed.", category: "HTML" },
        { text: "CSS Grid was first fully supported by browsers in 2017 — making complex layouts way easier.", category: "CSS" },
        { text: "The `z-index` property only works on positioned elements (relative, absolute, fixed, sticky).", category: "CSS" },
        { text: "In CSS, `calc()` allows you to mix units like `width: calc(100% - 50px);`.", category: "CSS" },
        { text: "HTML5 introduced semantic tags like `&ltsection>`, `&ltarticle>`, and `&ltmain>` to improve document structure.", category: "HTML" },
        { text: "You can select every even child element with `:nth-child(even)` in CSS — super handy for tables.", category: "CSS" },
        { text: "`rem` units in CSS are relative to the root `&lthtml>` element’s font-size, not the parent element.", category: "CSS" },
        { text: "The viewport meta tag is essential for responsive design — without it, mobile browsers scale down your site weirdly.", category: "HTML" }
    ];

    const q = quotes[Math.floor(Math.random() * quotes.length)];

    return `
    <nav id="sidebar" class="flex flex-col justify-between fixed top-0 left-0 h-full w-64 lg:w-96 bluue border border-gray-700 border-opacity-70 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-50 border-r border-gray-700 pt-16 lg:pt-0 bg-gray-900">
      <div class="lg:p-6 p-3">
        <!-- Logo/Header -->
        <a href="${config.weeks[0].href}">
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <img src="${config.logo.src}" alt="${config.logo.alt}" class="w-8 h-8 rounded" />
            </div>
            <div>
              <h1 class="text-xl font-bold">${config.logo.title}</h1>
              <p class="text-sm text-gray-400">${config.logo.subtitle}</p>
            </div>
          </div>
        </a>
        
        <!-- Week Navigation -->
        <div class="space-y-2 overflow-y-auto lg:h-[calc(100vh-350px)] h-[calc(100dvh-400px)] overflow-x-hidden  scrollbar-thin-gray ">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 ">Weeks</h2>
          ${weeksHTML}
        </div>
        
        <!-- Creative Section: Random Motivational Quote -->
        <div class="text-[12px] mt-5s  p-4 border border-gray-700 border-opacity-70 rounded-lg bg-gradient-to-r from-blue-900/20 to-gray-700/20">
          <h3 class="text-sm font-semibold mb-3 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2zm10 0a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2z"/></svg>
            Random Quote
          </h3>
          <blockquote class="italic text-gray-300" id="motivationalQuote">
            "${q.text}"<br>
            <span class="text-xs text-gray-500">— ${q.category}</span>
          </blockquote>
        </div>
      </div>
      
      <!-- Bottom Footer -->
      <div class="p-2 border-t border-gray-700 text-center text-xs flex justify-center text-gray-500">
        <div class="flex justify-center mb-2">
            <img src="${config.footer.img}" alt="${config.logo.alt}" class="w-6 h-6 " />
            
            </div>
            <div class="flex flex-col items-center justify-center space-x-2">
            <p>${config.footer.copyright}</p>
            <p>${config.footer.author.text} <a href="${config.footer.author.url}" class="hover:text-white hover:underline" target="_blank">${config.footer.author.name}</a></p>
          </div>
      </nav>
  `;
}

// Initialize sidebar when DOM is loaded
function initializeSidebar(currentWeek = 1) {
    document.addEventListener('DOMContentLoaded', function () {
        // Find the existing sidebar and replace it
        const existingSidebar = document.getElementById('sidebar');
        if (existingSidebar) {
            existingSidebar.outerHTML = generateSidebar(currentWeek);
        } else {
            // If sidebar doesn't exist, insert it at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', generateSidebar(currentWeek));
        }
    });
}

// Usage examples:
// For Week 1: initializeSidebar(1);
// For Week 2: initializeSidebar(2);
// etc.

// Auto-detect current week from URL (optional)
function autoDetectWeek() {
    const currentPage = window.location.pathname.split('/').pop();
    console.log('currentweek', currentPage)

    // Map filenames to week numbers
    const pageToWeek = {
        'index.html': 1,
        'week-2.html': 2,
        'week-3.html': 3,
        'week-4.html': 4,
        'week-5.html': 5
    };

    return pageToWeek[currentPage] || 1;
}

// Auto-initialize with detected week
initializeSidebar(autoDetectWeek());


// Initialize sidebar and mobile toggle
document.addEventListener('DOMContentLoaded', function () {
    const currentWeek = autoDetectWeek();
    document.body.insertAdjacentHTML('afterbegin', generateSidebar(currentWeek));

    // Initialize mobile menu toggle after sidebar is created
    initializeMobileToggle();
});


// Mobile menu toggle functionality
function initializeMobileToggle() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    if (!mobileMenuToggle || !sidebar || !mobileOverlay) return;

    let isOpen = false;

    function toggleSidebar() {
        isOpen = !isOpen;

        if (isOpen) {
            // Open sidebar
            sidebar.classList.remove('-translate-x-full');
            mobileOverlay.classList.remove('hidden');

            // Animate hamburger to X
            bar1.style.transform = 'rotate(45deg) translate(6px, 6px)';
            bar2.style.opacity = '0';
            bar3.style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            // Close sidebar
            sidebar.classList.add('-translate-x-full');
            mobileOverlay.classList.add('hidden');

            // Animate X back to hamburger
            bar1.style.transform = 'rotate(0) translate(0, 0)';
            bar2.style.opacity = '1';
            bar3.style.transform = 'rotate(0) translate(0, 0)';
        }
    }

    // Toggle button click
    mobileMenuToggle.addEventListener('click', toggleSidebar);

    // Close on overlay click
    mobileOverlay.addEventListener('click', toggleSidebar);

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) {
            toggleSidebar();
        }
    });

    // Close sidebar when clicking on navigation links (mobile)
    sidebar.addEventListener('click', function (e) {
        if (e.target.closest('a[href]') && window.innerWidth < 1024) {
            toggleSidebar();
        }
    });

    // Close sidebar on window resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024 && isOpen) {
            toggleSidebar();
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const requestBtn = document.getElementById('requestTopicBtn');
    const modal = document.getElementById('requestModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('topicRequestForm');

    requestBtn?.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    closeBtn?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const serviceID = 'service_bqx0mf6';
      const templateID = 'template_jeqguhd';

      const formData = {
        email: form.email.value,
        topic: form.topic.value,
        description: form.description.value
      };

      emailjs.send(serviceID, templateID, formData)
        .then(() => {
            showFusionToast("✅ Request sent successfully!");
            modal.classList.add('hidden');
            form.reset();
        }, (error) => {
            console.error("Failed to send request:", error);
            showFusionToast("❌ Failed to send request. Try again later.", 'error');
        });
    });
  });


const modal = document.getElementById('requestModal');
const openBtn = document.getElementById('requestTopicBtn');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', () => {
  modal.classList.remove('pointer-events-none', 'opacity-0');
  setTimeout(() => {
    modal.classList.add('scale-100');
  }, 10);
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('scale-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
});

