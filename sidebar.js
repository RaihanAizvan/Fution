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
            title: "JAVAASCRIPT",
            subtitle: "Manipulation",
            href: "week-3.html",
            isActive: false
        },
        {
            id: 4,
            title: "Node JS & Express",
            subtitle: "The Backend World",
            href: "week-4.html",
            isActive: false
        },
        {
            id: 5,
            title: "MongoDB",
            subtitle: "Database",
            href: "week-5.html",
            isActive: false
        },
        {
            id: 6,
            title: "Full Domain",
            subtitle: "Things Gets Stuck Here",
            href: "week-6.html",
            isActive: false
        },
        {
            id: 7,
            title: "Figma, API, DB Design",
            subtitle: "First step to real world",
            href: "week-7.html",
            isActive: false
        },
        {
            id: 8,
            title: "Project 1",
            subtitle: "Building",
            href: "week-8.html",
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
    const currentPage = window.location.pathname.split("/").pop();

    // Fution Space active check
    const isFutionActive = currentPage === "fution-space.html";
    
    // Set active week
    config.weeks.forEach(week => {
        week.isActive = !isFutionActive && week.id === currentWeek;
    });


    const weeksHTML = config.weeks.map(week => {
        const activeClass = week.isActive ? 'active-week' : '';
        const numberBgClass = week.isActive ? 'bg-blue-500' : 'bg-gray-600';
        const activeIndicator = week.isActive
            ? '<div class="ml-auto"><div class="w-2 h-2 bg-blue-500 rounded-full"></div></div>'
            : '';
        return `
            <a href="${week.href}" 
               class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 week-item ${activeClass}">
                <div class="w-8 h-8 ${numberBgClass} rounded-full flex items-center justify-center text-sm font-bold ${week.isActive ? 'text-white' : ''}">
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

<div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"></div>


<nav id="sidebar" class="flex flex-col h-screen fixed top-0 left-0 w-64 lg:w-96 bluue border-r border-gray-700/70 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-50">
    
    <div class="p-6 flex-shrink-0">
        <button id="close-sidebar-button" class="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        <a href="${config.weeks[0].href}">
            <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img src="${config.logo.src}" alt="${config.logo.alt}" class="w-8 h-8 rounded" />
                </div>
                <div>
                    <h1 class="text-xl font-bold">${config.logo.title}</h1>
                    <p class="text-sm text-gray-400">${config.logo.subtitle}</p>
                </div>
            </div>
        </a>

        <div class="space-y-2">
            <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Fution Space</h2>
            <a href="fution-space.html" 
               class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isFutionActive ? 'bg-gray-700/50 border border-blue-500' : 'hover:bg-gray-700/50'}">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    <div class="w-5 h-5 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-70 rounded-xl flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M2.93 19.07A10 10 0 1 1 19.07 5.93 10 10 0 0 1 2.93 19.07zm1.41-1.41A8 8 0 1 0 18.59 4.42 8 8 0 0 0 4.34 17.66"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <div class="font-medium">Fution Space</div>
                    <div class="text-xs text-gray-400">Your personal learning hub</div>
                </div>
            </a>
        </div>
    </div>

    <div class="px-6 flex-grow overflow-y-auto scrollbar-thin-gray">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Weeks</h2>
        <div class="space-y-2">
            ${weeksHTML}
        </div>
    </div>
    
    <div class="p-6 flex-shrink-0">
        <div class="text-xs p-4 border border-gray-700/70 rounded-lg  mb-4">
            <h3 class="text-sm font-semibold mb-3 flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2zm10 0a4 4 0 0 1 4-4h1V7a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2z"/></svg>
                Random Quote
            </h3>
            <blockquote class="italic text-gray-300" id="motivationalQuote">
                "${q.text}"<br>
                <span class="text-xs text-gray-500">— ${q.category}</span>
            </blockquote>
        </div>

        <div class="border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
            <div class="flex items-center justify-center space-x-2">
                <img src="${config.footer.img}" alt="${config.logo.alt}" class="w-6 h-6" />
                <div>
                    <p>${config.footer.copyright}</p>
                    <p>${config.footer.author.text} <a href="${config.footer.author.url}" class="hover:text-white hover:underline" target="_blank">${config.footer.author.name}</a></p>
                </div>
            </div>
        </div>
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

