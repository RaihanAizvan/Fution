/**
 * Week-based Learning Tracker - Main JavaScript File
 * Handles topics, progress tracking, and user interactions with week-specific localStorage
 * Dependencies: window.topics, window.proTips, window.weekKey from HTML
 */


class WeekLearningTracker {
  constructor() {
    this.weekKey = window.weekKey || 'default-week';
    this.topics = window.topics || [];
    this.proTips = window.proTips || [];

    this.elements = {
      mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
      sidebar: document.getElementById('sidebar'),
      mobileOverlay: document.getElementById('mobile-overlay'),
      topicsContainer: document.getElementById('your-topics-container-id'), 
      hamburgerBars: {
        bar1: document.getElementById('bar1'),
        bar2: document.getElementById('bar2'),
        bar3: document.getElementById('bar3')
      },
      topicsContainer: document.getElementById('topicsContainer'),
      progressTextMain: document.getElementById('progress-text'),
      mainProgressCircle: document.getElementById('main-progress'),
      sidebarProgressText: document.getElementById('progressPercent'),
      sidebarProgressCircle: document.querySelector('.progress-ring'),
      progressCount: document.getElementById('progress-count'),
      proTipsList: document.getElementById('pro-tips-list')
    };

    this.progressConfig = {
      main: { radius: 40 },
      sidebar: { radius: 18 }
    };

    this.progressConfig.main.circumference = 2 * Math.PI * this.progressConfig.main.radius;
    this.progressConfig.sidebar.circumference = 2 * Math.PI * this.progressConfig.sidebar.radius;

    this.userTopics = [];
    this.topicsState = {};

    this.addTopicWrapper = null;
    this.addTopicInput = null;
    this.addTopicButton = null;

    this.init();
  }

  init() {
    console.log(`Initializing Week Learning Tracker for: ${this.weekKey}`);
    this.loadStoredData();
    this.setupProgressCircles();
    this.createAddTopicUI();
    this.renderAllTopics();
    this.renderPracticals();
    this.renderProTips();
    this.updateAllProgress();
    console.log('Initialization complete', {
      weekKey: this.weekKey,
      topics: this.topics,
      userTopics: this.userTopics,
      topicsState: this.topicsState
    });
  }

  getStorageKey(type) {
    return `weekTracker-${type}-${this.weekKey}`;
  }

  loadStoredData() {
    try {
      const userTopicsKey = this.getStorageKey('userTopics');
      const topicsStateKey = this.getStorageKey('topicsState');
      this.userTopics = JSON.parse(localStorage.getItem(userTopicsKey) || '[]');
      this.topicsState = JSON.parse(localStorage.getItem(topicsStateKey) || '{}');
      console.log('Loaded stored data:', { userTopics: this.userTopics, topicsState: this.topicsState });
    } catch (error) {
      console.error('Error loading stored data:', error);
      this.userTopics = [];
      this.topicsState = {};
    }
  }

  saveToStorage() {
    try {
      const userTopicsKey = this.getStorageKey('userTopics');
      const topicsStateKey = this.getStorageKey('topicsState');
      localStorage.setItem(userTopicsKey, JSON.stringify(this.userTopics));
      localStorage.setItem(topicsStateKey, JSON.stringify(this.topicsState));
      console.log('Data saved to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  setupProgressCircles() {
    const { mainProgressCircle, sidebarProgressCircle } = this.elements;
    if (mainProgressCircle) {
      mainProgressCircle.style.strokeDasharray = this.progressConfig.main.circumference;
      mainProgressCircle.style.strokeDashoffset = this.progressConfig.main.circumference;
    }
    if (sidebarProgressCircle) {
      sidebarProgressCircle.style.strokeDasharray = this.progressConfig.sidebar.circumference;
      sidebarProgressCircle.style.strokeDashoffset = this.progressConfig.sidebar.circumference;
    }
  }

  createAddTopicUI() {
    if (!this.elements.topicsContainer) {
      console.warn('Topics container not found');
      return;
    }
    this.addTopicWrapper = document.createElement('div');
    
    // --- MODIFICATION 1: Add transition and transform classes ---
    // We add classes for smooth transition and initial state.
    // 'transition-transform', 'duration-300', 'ease-in-out' control the animation.
    this.addTopicWrapper.className = "flex items-center sticky bottom-0 rounded-lg space-x-2 mt-4 py-2 transition-transform duration-300 ease-in-out";

    this.addTopicInput = document.createElement('input');
    this.addTopicInput.type = "text";
    this.addTopicInput.placeholder = "Add your own topic...";
    this.addTopicInput.className = "flex-1 px-4 py-2 rounded-lg bg-gradient-to-t from-gray-900 to-gray-900 border border-gray-700 border-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200";
    
    this.addTopicButton = document.createElement('button');
    this.addTopicButton.innerText = "Add";
    this.addTopicButton.className = "px-4 py-2 pb-3 rounded-md bg-gradient-to-t from-black to-blue-800/30 border border-gray-700 hover:bg-blue-600/40 hover:border-blue-500 text-white text-sm font-semibold transition-all duration-200";

    this.addTopicWrapper.appendChild(this.addTopicInput);
    this.addTopicWrapper.appendChild(this.addTopicButton);
    this.elements.topicsContainer.appendChild(this.addTopicWrapper);

    this.addTopicButton.addEventListener('click', () => this.handleAddTopic());
    this.addTopicInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleAddTopic();
    });

    // --- MODIFICATION 2: Set up event listeners for user activity ---
    this.setupActivityListeners();
    // Initially start the timer.
    this.resetInactivityTimer();
  }
  
  setupActivityListeners() {
    const activityEvents = ['scroll', 'mousemove', 'mousedown', 'keypress', 'touchstart'];
    const boundResetTimer = this.resetInactivityTimer.bind(this);
    
    // Listen for scroll specifically on your container
    if (this.elements.topicsContainer) {
        this.elements.topicsContainer.addEventListener('scroll', boundResetTimer);
    }
    // Listen for other activities on the whole window
    activityEvents.forEach(event => {
        if (event !== 'scroll') { // 'scroll' is already handled
            window.addEventListener(event, boundResetTimer);
        }
    });
  }

  resetInactivityTimer() {
    if (!this.addTopicWrapper) return;
    
    // 1. Make the input bar visible by removing the translate class
    // 'translate-y-full' moves the element down by 100% of its height.
    this.addTopicWrapper.classList.remove('translate-y-full');

    // 2. Clear any existing timer to prevent it from hiding the bar prematurely
    clearTimeout(this.inactivityTimer);

    // 3. Set a new timer. After 3 seconds of inactivity, hide the bar.
    const inactivityDelay = 3000; // 3 seconds
    this.inactivityTimer = setTimeout(() => {
      // Don't hide if the user is currently typing in the input
      if (document.activeElement !== this.addTopicInput) {
        this.addTopicWrapper.classList.add('translate-y-full');
      }
    }, inactivityDelay);
  }

  handleAddTopic() {
    const topicTitle = this.addTopicInput.value.trim();
    if (!topicTitle) return;
    const allTopics = [...this.topics.map(t => t.title), ...this.userTopics.map(t => t.title)];
    if (allTopics.includes(topicTitle)) {
      alert('This topic already exists!');
      return;
    }
    const newTopic = { title: topicTitle, details: null };
    this.userTopics.push(newTopic);
    // this.saveToStorage(); // Assuming you have this method
    this.renderTopic(newTopic, this.userTopics.length - 1, true); // Assuming you have this method
    this.addTopicInput.value = '';
    // this.updateAllProgress(); // Assuming you have this method
    
    // Scroll container to the bottom to show the new topic
    this.elements.topicsContainer.scrollTo({
      top: this.elements.topicsContainer.scrollHeight,
      behavior: 'smooth'
    });
    
    // --- MODIFICATION 3: Keep the bar visible after adding a topic ---
    this.resetInactivityTimer();
  }

  getTopicKey(topic, index, isUserTopic = false) {
    return isUserTopic ? `user-${index}-${topic}` : `default-${index}-${topic}`;
  }

  renderTopic(topic, index, isUserTopic = false) {
    const difficultyColors = {
      "Beginner": "bg-green-500",
      "Intermediate": "bg-orange-500",
      "Advanced": "bg-red-500",
      "Beginner → Intermediate": "bg-gradient-to-r from-green-500 to-orange-500",
      "Intermediate → Advanced": "bg-gradient-to-r from-orange-500 to-red-500"
    };

    if (topic.type === "heading") {
      const heading = document.createElement('div');
      heading.className = "text-md uppercase tracking-wider text-white px-2 py-4 font-bold";
      heading.textContent = topic.title;
      this.elements.topicsContainer.insertBefore(heading, this.addTopicWrapper);
      return;
    }

    const topicKey = this.getTopicKey(topic.title, index, isUserTopic);
    const isChecked = this.topicsState[topicKey] || false;
    const hasDetails = !!topic.details;

    const wrapper = document.createElement('div');
    wrapper.className = "accordion-item border-b border-gray-700/30 last:border-b-0";
    wrapper.setAttribute('data-topic-key', topicKey);

    const heading = document.createElement('div');
    heading.className = "accordion-heading flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700/20 transition-all duration-200";

    const contentWrapper = document.createElement('div');
    contentWrapper.className = "flex items-center space-x-3 flex-1";

    const label = document.createElement('label');
    label.className = "relative cursor-pointer flex items-center";

    const hiddenCheckbox = document.createElement('input');
    hiddenCheckbox.type = "checkbox";
    hiddenCheckbox.className = "hidden";
    hiddenCheckbox.checked = isChecked;

    const customCheckbox = document.createElement('div');
    customCheckbox.className = `w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-500 bg-white/10 backdrop-blur-sm'}`;

    const checkIcon = this.createCheckIcon(isChecked);
    customCheckbox.appendChild(checkIcon);

    const topicTitleWrapper = document.createElement('div');
    topicTitleWrapper.className = "flex items-center space-x-2";

    // Difficulty dot
    const diffDot = document.createElement('span');
    diffDot.className = `w-1 h-1 rounded-full ${difficultyColors[topic.difficulty] || 'bg-gray-400'}`;

    const topicTitle = document.createElement('p');
    topicTitle.className = "text-white/90";
    topicTitle.textContent = topic.title;

    topicTitleWrapper.appendChild(topicTitle);
    topicTitleWrapper.appendChild(diffDot);


    label.appendChild(hiddenCheckbox);
    label.appendChild(customCheckbox);
    contentWrapper.appendChild(label);
    contentWrapper.appendChild(topicTitleWrapper);


    if (isUserTopic) {
      const deleteButton = this.createDeleteButton(topic.title, topicKey, wrapper);
      contentWrapper.appendChild(deleteButton);
    }

    heading.appendChild(contentWrapper);


    // Accordion chevron
    const chevron = document.createElement('span');
    chevron.innerHTML = `<svg class="w-4 h-4 text-gray-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M19 9l-7 7-7-7" />
                        </svg>`;
    heading.appendChild(chevron);

    wrapper.appendChild(heading);

    if (hasDetails) {
      const panel = document.createElement('div');
      panel.className = "accordion-panel max-h-0 overflow-hidden transition-max-height duration-300";
      const panelContent = document.createElement('div');
      panelContent.className = "p-4 lg:ml-8 border border-gray-800 rounded-lg text-gray-300";
      panelContent.innerHTML = topic.details;
      panel.appendChild(panelContent);
      wrapper.appendChild(panel);


      heading.addEventListener('click', (e) => {
        if (!e.target.closest('label') && !e.target.closest('button')) {
          const isOpen = panel.style.maxHeight;
          if (isOpen) {
            panel.style.maxHeight = null;
            chevron.querySelector('svg').style.transform = "rotate(0deg)";
          } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
            chevron.querySelector('svg').style.transform = "rotate(180deg)";
          }
        }
      });
    }

    const toggleTopic = (e) => {
      e.preventDefault();
      hiddenCheckbox.checked = !hiddenCheckbox.checked;
      this.handleTopicToggle(topicKey, hiddenCheckbox.checked, customCheckbox, checkIcon);
    };

    customCheckbox.addEventListener('click', toggleTopic);
    hiddenCheckbox.addEventListener('change', () => {
      this.handleTopicToggle(topicKey, hiddenCheckbox.checked, customCheckbox, checkIcon);
    });

    this.elements.topicsContainer.insertBefore(wrapper, this.addTopicWrapper);
  }

  renderProTips() {
    const { proTipsList } = this.elements;
    if (!proTipsList || !Array.isArray(this.proTips) || this.proTips.length === 0) {
      console.warn('Pro tips list element not found or no pro tips available');
      return;
    }
    proTipsList.innerHTML = '';
    this.proTips.forEach((tip, index) => {
      const tipElement = this.createProTipElement(tip, index + 1);
      proTipsList.appendChild(tipElement);
    });
    console.log(`Rendered ${this.proTips.length} pro tips`);
  }

  renderPracticals() {
    if( !window.practicals || !Array.isArray(window.practicals) || window.practicals.length === 0) {
      console.warn('No practicals available or not an array');
      return;
    }
    const container = document.getElementById("practicalsContainer") ;
    container.innerHTML = ""; // Clear old ones
    if (!container) {
      console.warn('Practicals container not found');
      return;
    }

    window.practicals.forEach((item, index) => {
      // Map difficulty to color
      let colorClass = "bg-green-500"; // default Beginner
      if (item.difficulty.includes("Intermediate") && !item.difficulty.includes("Beginner")) {
        colorClass = "bg-orange-500";
      }
      if (item.difficulty.includes("Advanced") && !item.difficulty.includes("Intermediate")) {
        colorClass = "bg-red-500";
      }
      if (item.difficulty.includes("Beginner") && item.difficulty.includes("Intermediate")) {
        colorClass = "bg-yellow-500";
      }
      if (item.difficulty.includes("Intermediate") && item.difficulty.includes("Advanced")) {
        colorClass = "bg-pink-500";
      }

      // Create wrapper with Alpine.js
      const wrapper = document.createElement("div");
      wrapper.className = "border border-gray-700 rounded-lg overflow-hidden";
      wrapper.setAttribute("x-data", `{ open: false }`);

      // Create the full HTML structure with Alpine.js
  wrapper.innerHTML = `
    <div x-data="{ open: false }" class="border-b border-gray-700">
      <div 
        class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700/30 transition-all duration-200" 
        @click="open = !open"
      >
        <div class="flex items-center space-x-3">
          <span class="w-2 h-2 rounded-full ${colorClass}"></span>
          <span class="text-white font-medium">${item.practicalTopic}</span>
        </div>
        <span 
          class="transition-transform duration-300" 
          :class="{ 'rotate-180': open }"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </span>
      </div>

      <div 
        x-show="open"
        x-transition:enter="transition-all ease-out duration-300"
        x-transition:enter-start="max-h-0 opacity-0"
        x-transition:enter-end="max-h-screen opacity-100"
        x-transition:leave="transition-all ease-in duration-200"
        x-transition:leave-start="max-h-screen opacity-100"
        x-transition:leave-end="max-h-0 opacity-0"
        class="overflow-hidden text-gray-300"
      >
        <div class="p-4">
          ${item.details}
        </div>
      </div>
    </div>
  `;

  // Tell Alpine to re-scan this HTML so transitions work
  Alpine.initTree(wrapper);


      container.appendChild(wrapper);
    });
  }

  renderHeading(text) {
    const heading = document.createElement('div');
    heading.className = "text-sm uppercase  tracking-wider text-white px-2 py-4 font-semibold";
    heading.textContent = text;

    this.elements.topicsContainer.insertBefore(heading, this.addTopicWrapper);
  }

  createCheckIcon(isVisible) {
    const checkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    checkIcon.setAttribute("class", "w-3 h-3 text-white");
    checkIcon.setAttribute("fill", "none");
    checkIcon.setAttribute("stroke", "currentColor");
    checkIcon.setAttribute("stroke-width", "2");
    checkIcon.setAttribute("viewBox", "0 0 24 24");
    checkIcon.style.display = isVisible ? "block" : "none";
    const checkPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    checkPath.setAttribute("stroke-linecap", "round");
    checkPath.setAttribute("stroke-linejoin", "round");
    checkPath.setAttribute("d", "M5 13l4 4L19 7");
    checkIcon.appendChild(checkPath);
    return checkIcon;
  }

  createDeleteButton(topicText, topicKey, wrapper) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'relative w-6 h-6 rounded-full border border-white/60 bg-transparent hover:bg-red-500/20 hover:border-red-400 flex items-center justify-center transition-all duration-200 ml-auto flex-shrink-0';
    deleteButton.type = 'button';
    deleteButton.setAttribute('aria-label', `Delete topic: ${topicText}`);

    const minusIcon = document.createElement('span');
    minusIcon.className = 'text-white/80 hover:text-red-400 text-sm font-bold leading-none';
    minusIcon.textContent = '−';
    minusIcon.style.fontSize = '12px';
    minusIcon.style.lineHeight = '1';

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `
    absolute bottom-full left-1/3 -translate-x-2/3 mb-2 
    px-2 py-1 rounded-md bg-[#111827] text-white text-xs 
    opacity-0 pointer-events-none transition-opacity duration-300 
    z-50 whitespace-nowrap border border-white/10
  `;
    tooltip.textContent = 'Delete topic';

    // Show tooltip on hover
    deleteButton.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });
    deleteButton.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });

    deleteButton.appendChild(minusIcon);
    deleteButton.appendChild(tooltip);

    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.handleDeleteTopic(topicText, topicKey, wrapper);
      showFusionToast(`Topic "${topicText}" deleted successfully!`);
    });

    return deleteButton;
  }

  handleTopicToggle(topicKey, isChecked, customCheckbox, checkIcon) {
    this.topicsState[topicKey] = isChecked;
    this.saveToStorage();
    if (isChecked) {
      customCheckbox.className = "w-5 h-5 rounded-md border bg-blue-500 border-blue-500 flex items-center justify-center transition-all duration-200";
      checkIcon.style.display = "block";
    } else {
      customCheckbox.className = "w-5 h-5 rounded-md border border-gray-500 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-200";
      checkIcon.style.display = "none";
    }
    this.updateAllProgress();
  }

  handleDeleteTopic(topicText, topicKey, wrapper) {
    const topicIndex = this.userTopics.findIndex(t => t.title === topicText);
    if (topicIndex !== -1) {
      this.userTopics.splice(topicIndex, 1);
    }
    delete this.topicsState[topicKey];
    this.saveToStorage();
    wrapper.remove();
    this.updateAllProgress();
  }

  renderAllTopics() {
    if (!this.elements.topicsContainer) return;
    const existingTopics = this.elements.topicsContainer.querySelectorAll('[data-topic-key]');
    existingTopics.forEach(topic => topic.remove());
    this.topics.forEach((topic, index) => {
      this.renderTopic(topic, index, false);
    });
    this.userTopics.forEach((topic, index) => {
      this.renderTopic(topic, index, true);
    });
  }

  updateAllProgress() {
    const totalTopics = this.topics.length + this.userTopics.length;
    const completedTopics = Object.values(this.topicsState).filter(Boolean).length;
    const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    this.updateProgressCircle(this.elements.mainProgressCircle, progressPercentage, this.progressConfig.main.circumference);
    this.updateProgressCircle(this.elements.sidebarProgressCircle, progressPercentage, this.progressConfig.sidebar.circumference);
    if (this.elements.progressTextMain) this.elements.progressTextMain.innerText = `${progressPercentage}%`;
    if (this.elements.sidebarProgressText) this.elements.sidebarProgressText.innerText = `${progressPercentage}%`;
    if (this.elements.progressCount) this.elements.progressCount.textContent = `${completedTopics} / ${totalTopics}`;
    console.log('Progress updated:', { completedTopics, totalTopics, progressPercentage });
  }

  updateProgressCircle(circle, percentage, circumference) {
    if (!circle) return;
    const offset = (1 - percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  render  () {
    const { proTipsList } = this.elements;
    if (!proTipsList || !Array.isArray(this.proTips) || this.proTips.length === 0) {
      console.warn('Pro tips list element not found or no pro tips available');
      return;
    }
    proTipsList.innerHTML = '';
    this.proTips.forEach((tip, index) => {
      const tipElement = this.createProTipElement(tip, index + 1);
      proTipsList.appendChild(tipElement);
    });
    console.log(`Rendered ${this.proTips.length} pro tips`);
  }

  createProTipElement(tip, number) {
    const tipWrapper = document.createElement('div');
    //check what colour green or blue or red

    const bgColor = tip.color === "green" ? "bg-green-500/10" : tip.color === "blue" ? "bg-blue-500/10" : "bg-red-500/10";
    const borderColor = tip.color === "green" ? "border-green-500/20" : tip.color === "blue" ? "border-blue-500/20" : "border-red-500/20";
    const circleColor = tip.color === "green" ? "bg-green-500" : tip.color === "blue" ? "bg-blue-500" : "bg-red-500";
    tipWrapper.className = `${bgColor} px-4 py-3 cursor-pointer rounded-lg border ${borderColor} hover:bg-opacity-80 transition-all duration-200`;
    tipWrapper.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-6 h-6 ${circleColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="text-white text-sm font-bold">${number}</span>
        </div>
        <p class="text-white/90 text-sm">${tip.text}</p>
      </div>
    `;
    return tipWrapper;
  }

  getProgressStats() {
    const totalTopics = this.topics.length + this.userTopics.length;
    const completedTopics = Object.values(this.topicsState).filter(Boolean).length;
    const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    return { totalTopics, completedTopics, progressPercentage, weekKey: this.weekKey };
  }

  resetWeekProgress() {
    if (confirm(`Are you sure you want to reset all progress for ${this.weekKey}? This action cannot be undone.`)) {
      this.topicsState = {};
      this.saveToStorage();
      this.renderAllTopics();
      this.updateAllProgress();
      console.log(`Progress reset for week: ${this.weekKey}`);
    }
  }

  exportWeekData() {
    return {
      weekKey: this.weekKey,
      topics: this.topics,
      userTopics: this.userTopics,
      topicsState: this.topicsState,
      progressStats: this.getProgressStats()
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    window.weekLearningTracker = new WeekLearningTracker();
  } catch (error) {
    console.error('Failed to initialize Week Learning Tracker:', error);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    loader.classList.add('opacity-0');
    setTimeout(() => loader.remove(), 500);
  }, 300);
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (link.getAttribute('target') === '_blank' || link.href.startsWith('javascript')) return;
      e.preventDefault();
      if (!document.body.contains(loader)) document.body.appendChild(loader);
      loader.classList.remove('opacity-0');
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  });
});


function showFusionToast(message, type = 'success') {
  const toast = document.getElementById('fusionToast');
  const toastMsg = document.getElementById('toastMessage');

  toastMsg.textContent = message;

  // You can customize colors based on type
  toast.classList.remove('bg-red-600', 'bg-green-600', 'bg-gradient-to-r', 'from-blue-900/60', 'to-black');

  if (type === 'error') {
    toast.classList.add('bg-red-600');
  } else {
    toast.classList.add('bg-gradient-to-r', 'from-blue-900/60', 'to-black');
  }

  toast.classList.remove('hidden');
  toast.classList.add('animate-slide-in');

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('animate-slide-in');
  }, 4000);
}





// --- New Swipe Logic ---
let touchstartX = 0;
let touchendX = 0;
const swipeThreshold = 50; // Minimum distance in pixels to register as a swipe

const mainBox = document.getElementById('mainBox');
const tabNames = Array.from(document.querySelectorAll('.tab-btn')).map(btn => btn.dataset.tab);

let isSwiping = false;

// Handle the start of a touch gesture
mainBox.addEventListener('touchstart', e => {
    isSwiping = true;
    touchstartX = e.changedTouches[0].screenX;
    mainBox.style.transition = 'none'; // Disable CSS transition for smooth live drag
});

// Handle the movement during a touch gesture
mainBox.addEventListener('touchmove', e => {
    if (!isSwiping) return;

    const currentX = e.changedTouches[0].screenX;
    const diff = currentX - touchstartX;
    mainBox.style.transform = `translateX(${diff}px)`;
});

// Handle the end of a touch gesture
mainBox.addEventListener('touchend', e => {
    isSwiping = false;
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
    mainBox.style.transition = 'transform 0.3s ease-out'; // Re-enable transition for snapping back
    mainBox.style.transform = 'translateX(0)'; // Snap back to original position
});

function handleGesture() {
    const diff = touchendX - touchstartX;
    if (Math.abs(diff) < swipeThreshold) {
        return; // Not a significant enough swipe
    }

    const currentActiveBtn = document.querySelector('.tab-btn.active-tab');
    const currentTabName = currentActiveBtn.dataset.tab;
    const currentIndex = tabNames.indexOf(currentTabName);
    
    let nextIndex;
    if (diff > 0) { // Swiped right
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabNames.length - 1;
    } else { // Swiped left
        nextIndex = currentIndex < tabNames.length - 1 ? currentIndex + 1 : 0;
    }
    
    switchTab(tabNames[nextIndex]);
}

// --- End of New Swipe Logic ---

// Existing tab logic (slightly modified)

function switchTab(name) {
    // Hide all tabs and remove active state from buttons
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));

    // Show the new tab and set the new active button
    document.getElementById('tab-' + name).classList.remove('hidden');
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${name}"]`);
    activeBtn.classList.add('active-tab');

    // Move the highlight when tab changes
    moveHighlight(activeBtn);
}

function moveHighlight(activeBtn) {
    const highlight = document.querySelector(".tab-highlight");
    if (!highlight) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const parentRect = activeBtn.parentElement.getBoundingClientRect();

    highlight.style.width = `${btnRect.width}px`;
    highlight.style.transform = `translateX(${btnRect.left - parentRect.left}px)`;
}

// Ensure highlight is positioned correctly on page load
window.addEventListener("DOMContentLoaded", () => {
    const activeBtn = document.querySelector(".tab-btn.active-tab");
    if (activeBtn) {
        moveHighlight(activeBtn);
    }
});

