(function () {
    console.log(1)
    // LocalStorage keys for personal features (separate from weekTracker keys used by main.js)
    const KEY_JOURNAL = `fution-personal-journal-${window.weekKey}`;
    const KEY_RESOURCES = `fution-personal-resources-${window.weekKey}`;
    const KEY_GOALS = `fution-personal-goals-${window.weekKey}`;

    


    // Quick helpers
    function $(sel, ctx = document) { return ctx.querySelector(sel); }
    function $all(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

    // Toast
    function showToast(msg, type = 'success') {
        const toast = $('#fusionToast');
        const msgEl = $('#toastMessage');
        msgEl.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }

    // safe JSON parse with array fallback
    function safeParse(value, fallback = []) {
        try {
            const v = JSON.parse(value);
            return Array.isArray(v) ? v : fallback;
        } catch (e) {
            return fallback;
        }
    }

    // create modal once and append to body
    function createJournalModal() {
        if (document.getElementById('journalModal')) return document.getElementById('journalModal');

        const modal = document.createElement('div');
        modal.id = 'journalModal';
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center hidden z-50';
        modal.innerHTML = `
       <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-blue-500/20 backdrop-blur-md">
        <!-- Header -->
        <div class="p-4 border-b border-blue-500/20 flex justify-between items-center bg-gray-900/40">
            <h2 class="text-lg font-bold tracking-wider text-blue-400">JOURNAL LOG</h2>
            <button id="closeJournalModal" class="text-blue-400 hover:text-blue-300 transition-colors text-2xl leading-none">&times;</button>
        </div>
        
        <!-- Body -->
        <div class="p-4 space-y-4">
            <input
                id="journalTitle"
                placeholder="Entry Title..."
                class="w-full p-3 rounded-lg bg-gray-800 border border-blue-500/30 focus:border-white focus:ring-2 transition-all outline-none placeholder-gray-500 text-gray-100"
            />
            <textarea
                id="journalTextarea"
                rows="8"
                placeholder="Begin transmission..."
                class="w-full p-3 rounded-lg bg-gray-800 border border-blue-500/30 focus:border-white focus:ring-2 transition-all outline-none placeholder-gray-500 text-gray-100 resize-none"
            ></textarea>
        </div>
        
        <!-- Footer -->
        <div class="p-4 border-t border-blue-500/20 flex justify-between items-center gap-3 bg-gray-900/40">
            <div class="text-xs text-blue-400 font-mono" id="journalHint">Awaiting entry...</div>
            <div class="flex gap-3">
                <button
                    id="clearJournalModalBtn"
                    class="px-4 py-2 border border-blue-500/40 rounded-lg text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 transition-all"
                >
                    Clear
                </button>
                <button
                    id="saveJournalModalBtn"
                    class="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-opacity-10 border border-gray-700/30 rounded-lg text-white shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all"
                >
                    Save
                </button>
            </div>
        </div>
    </div>

        `;
        document.body.appendChild(modal);
        return modal;
    }

    //journal read modal
    function createJournalReadModal() {
        if (document.getElementById('journalReadModal'))
            return document.getElementById('journalReadModal');

        const modal = document.createElement('div');
        modal.id = 'journalReadModal';
        modal.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center hidden z-50';

        modal.innerHTML = `
      <div class="relative diary-read-card max-w-2xl w-full p-6 rounded-lg shadow-xl overflow-hidden">
        <button id="closeJournalReadModal" 
          class="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-2xl">&times;</button>
        <div class="mb-4">
          <div id="readDiaryDate" class="text-xs px-3 py-1 rounded bg-amber-200/80 text-gray-800 inline-block"></div>
        </div>
        <h2 id="readDiaryTitle" class="text-2xl font-bold mb-3 "></h2>
        <div id="readDiaryText" class="leading-relaxed whitespace-pre-line"></div>
      </div>
    `;

        document.body.appendChild(modal);
        return modal;
    }

    // escape HTML (avoid XSS)
    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function initJournal(tabSelector = '#tab-journal') {
        const container = document.querySelector(tabSelector);
        if (!container) return;
        if (container.dataset.journalInit === '1') return; // init guard
        container.dataset.journalInit = '1';

        const journalList = container.querySelector('#journalList');
        const newBtn = container.querySelector('.new-journal-btn');

        const modal = createJournalModal();
        const textarea = modal.querySelector('#journalTextarea');
        const titleInput = modal.querySelector('#journalTitle');
        const saveBtn = modal.querySelector('#saveJournalModalBtn');
        const closeBtn = modal.querySelector('#closeJournalModal');
        const clearBtn = modal.querySelector('#clearJournalModalBtn');
        const hint = modal.querySelector('#journalHint');

        function readEntries() {
            return safeParse(localStorage.getItem(KEY_JOURNAL), []);
        }
        function writeEntries(entries) {
            try { localStorage.setItem(KEY_JOURNAL, JSON.stringify(entries)); } catch (e) { }
        }

        // render list of cards
        function renderList() {
            const entries = readEntries();
            journalList.innerHTML = '';
            if (!entries.length) {
                journalList.innerHTML = `<div class="text-sm text-gray-400">No journal entries yet. Click "+ New" to write one.</div>`;
                return;
            }

            entries.forEach((entry, idx) => {
                const d = new Date(entry.updatedAt || entry.createdAt || Date.now());
                const dateStr = d.toLocaleDateString();
                const card = document.createElement('article');
                card.className = 'diary-card relative p-5 rounded-lg shadow-sm border border-white border-opacity-50 ';
                card.innerHTML = `
            <div class="absolute top-2 right-2 text-[8px] font-mono diary-date">${escapeHtml(dateStr)}</div>
            <div class="mb-3">
                <div class="diary-title text-lg font-semibold text-white mb-2">
                ${entry.title ? escapeHtml(entry.title) : 'Untitled Entry'}
                </div>
                <p class="diary-preview text-sm text-gray-300 leading-relaxed">
                ${escapeHtml(entry.text.slice(0, 120))}${entry.text.length > 120 ? '...' : ''}
                </p>
            </div>
            <div class="mt-4 flex justify-between items-center border-t border-blue-800 pt-2">
                <button data-action="read" data-idx="${idx}" class="text-xs font-medium text-gray-300 hover:underline">Read</button>
                <div class="flex gap-3">
                <button data-action="edit" data-idx="${idx}" class="text-xs text-gray-300 hover:underline">Edit</button>
                <button data-action="delete" data-idx="${idx}" class="text-xs text-red-600 hover:underline">Delete</button>
                </div>
            </div>
            `;

                journalList.appendChild(card);
            });
        }

        // open modal: 'new' or 'edit' with idx
        function openModal(mode = 'new', idx = null) {
            modal.classList.remove('hidden');
            if (mode === 'new') {
                textarea.value = '';
                titleInput.value = '';
                hint.textContent = 'New entry';
                modal.dataset.editIdx = '';
                textarea.focus();
            } else {
                const entries = readEntries();
                const e = entries[idx];
                if (!e) return;
                textarea.value = e.text;
                titleInput.value = e.title || '';
                hint.textContent = `Editing • ${new Date(e.updatedAt).toLocaleString()}`;
                modal.dataset.editIdx = idx;
                textarea.focus();
            }
        }
        function closeModal() { modal.classList.add('hidden'); }

        function saveFromModal() {
            const text = textarea.value.trim();
            if (!text) { alert('Cannot save an empty entry'); return; }
            const title = titleInput.value.trim();
            const entries = readEntries();
            const editIdx = modal.dataset.editIdx;
            if (editIdx) {
                entries[editIdx].text = text;
                entries[editIdx].title = title;
                entries[editIdx].updatedAt = Date.now();
            } else {
                entries.unshift({ text, title, createdAt: Date.now(), updatedAt: Date.now() });
            }
            writeEntries(entries);
            renderList();
            closeModal();
        }

        // delegation for read/edit/delete on cards
        journalList.addEventListener('click', (ev) => {
            const btn = ev.target.closest('button[data-action]');
            if (!btn) return;
            const idx = Number(btn.dataset.idx);
            const action = btn.dataset.action;
            if (action === 'read') {
                const entries = readEntries();
                const e = entries[idx];
                if (!e) return;

                const readModal = createJournalReadModal();
                readModal.querySelector('#readDiaryDate').textContent =
                    new Date(e.updatedAt || e.createdAt).toLocaleString();
                readModal.querySelector('#readDiaryTitle').textContent = e.title || 'Untitled Entry';
                readModal.querySelector('#readDiaryText').textContent = e.text;

                readModal.classList.remove('hidden');

                readModal.querySelector('#closeJournalReadModal').onclick = () => {
                    readModal.classList.add('hidden');
                };

                // click outside closes
                readModal.addEventListener('click', ev => {
                    if (ev.target === readModal) readModal.classList.add('hidden');
                });
            } else if (action === 'edit') {
                openModal('edit', idx);
            } else if (action === 'delete') {
                if (!confirm('Delete this entry?')) return;
                const entries = readEntries();
                entries.splice(idx, 1);
                writeEntries(entries);
                renderList();
            }
        });

        // wire buttons
        newBtn && newBtn.addEventListener('click', () => openModal('new'));
        closeBtn && closeBtn.addEventListener('click', closeModal);
        saveBtn && saveBtn.addEventListener('click', saveFromModal);
        clearBtn && clearBtn.addEventListener('click', () => { textarea.value = ''; titleInput.value = ''; });

        // click outside modal content closes
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // initial render
        renderList();
    }

    // init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initJournal('#tab-journal'));
    } else {
        initJournal('#tab-journal');
    }

    // Resources handlers
    function loadResources() {
        const list = JSON.parse(localStorage.getItem(KEY_RESOURCES) || '[]');
        renderResources(list);
    }
    function renderResources(list) {
        try {


            const container = $('#resourcesList');
            container.innerHTML = '';
            if (!list.length) {
                container.innerHTML = `<div class="text-sm text-gray-400">No resources yet. Add links above.</div>`;
                return;
            }
            list.forEach((r, idx) => {
                const row = document.createElement('div');
                if(r.url && !r.url.startsWith('http')) {
                    r.url = `https://${r.url}`; // ensure URL starts with http(s)
                }
                console.log(r)
                row.className = 'p-3 rounded-lg border border-gray-700 flex items-start justify-between';
                const parsedUrl = new URL(r.url);
                const faviconSrc = `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}`;
                const hostname = parsedUrl.hostname.replace('www.', '');

                row.innerHTML = `
                <div class="flex items-center">
                    <img src="${faviconSrc}" class="w-6 h-6 rounded-full" alt="favicon" />
                    <div class="ml-2">
                        <a href="${r.url}" target="_blank" class="font-semibold">
                            ${r.title || hostname}
                        </a>
                        <div class="text-xs text-gray-500 hover:underline hover:text-blue-600 cursor-pointer"><a href="${r.url}" target="_blank">${hostname}</a></div>
                        ${r.note ? `<div class="text-xs text-gray-400 mt-1">${r.note}</div>` : ''}
                    </div>
                </div>
                <div class="flex flex-col items-end ml-3 gap-2">
                    <button data-idx="${idx}" class="open-resource text-xs px-2 py-1 rounded bg-transparent border border-gray-700">Open</button>
                    <button data-idx="${idx}" class="del-resource text-xs px-2 py-1 rounded bg-red-700/10 border border-red-700 text-red-400">Delete</button>
                </div>
            `;
                container.appendChild(row);
            });
            // handlers
            // handlers
            $all('.open-resource').forEach(btn => btn.addEventListener('click', e => {
                const idx = +btn.getAttribute('data-idx');
                const items = JSON.parse(localStorage.getItem(KEY_RESOURCES) || '[]');
                const url = items[idx].url;
                if(url && !url.startsWith('http')) {
                    items[idx].url = `https://${url}`;
                    localStorage.setItem(KEY_RESOURCES, JSON.stringify(items));
                }
                window.open(items[idx].url, '_blank');
            }));

            $all('.del-resource').forEach(btn => btn.addEventListener('click', e => {
                const idx = +btn.getAttribute('data-idx');
                let items = JSON.parse(localStorage.getItem(KEY_RESOURCES) || '[]');
                items.splice(idx, 1);
                localStorage.setItem(KEY_RESOURCES, JSON.stringify(items));
                renderResources(items);
                showToast('Resource removed');
            }));
        } catch (err) {
            console.error('Error rendering resources:', err);
            showToast('Failed to load resources', 'error');
        }
    }




    // Goals handlers
    function loadGoals() {
        renderGoals(JSON.parse(localStorage.getItem(KEY_GOALS) || '[]'));
    }
    function renderGoals(list) {
        const container = $('#goalsList');
        container.innerHTML = '';
        if (!list.length) {
            container.innerHTML = `<div class="text-sm text-gray-400">No goals yet. Add one above.</div>`;
            return;
        }
        list.forEach((g, idx) => {
            const row = document.createElement('div');
            row.className = 'p-3 rounded-lg border border-gray-700 flex items-center justify-between';
            row.innerHTML = `
            <div class="flex items-center gap-3">
              <input type="checkbox" data-idx="${idx}" class="goal-check" ${g.completed ? 'checked' : ''} />
              <div>
                <div class="font-semibold ${g.completed ? 'text-gray-400 line-through' : ''}">${g.title}</div>
                <div class="text-xs text-gray-400">${g.createdAt ? new Date(g.createdAt).toLocaleDateString() : ''}</div>
              </div>
            </div>
            <div>
              <button data-idx="${idx}" class="del-goal text-xs px-2 py-1 rounded bg-red-700/10 border border-red-700 text-red-400">Delete</button>
            </div>
          `;
            container.appendChild(row);
        });

        // events
        $all('.goal-check').forEach(chk => chk.addEventListener('change', e => {
            const idx = +chk.getAttribute('data-idx');
            const list = JSON.parse(localStorage.getItem(KEY_GOALS) || '[]');
            list[idx].completed = chk.checked;
            localStorage.setItem(KEY_GOALS, JSON.stringify(list));
            renderGoals(list);
        }));
        $all('.del-goal').forEach(btn => btn.addEventListener('click', e => {
            const idx = +btn.getAttribute('data-idx');
            let list = JSON.parse(localStorage.getItem(KEY_GOALS) || '[]');
            list.splice(idx, 1);
            localStorage.setItem(KEY_GOALS, JSON.stringify(list));
            renderGoals(list);
            showToast('Goal removed');
        }));
    }

    // Snapshots & export/import
    function exportAll() {
        const weekData = window.weekLearningTracker?.exportWeekData?.() || null;
        const payload = {
            exportedAt: Date.now(),
            weekData,
            journal: JSON.parse(localStorage.getItem(KEY_JOURNAL) || 'null'),
            resources: JSON.parse(localStorage.getItem(KEY_RESOURCES) || '[]'),
            goals: JSON.parse(localStorage.getItem(KEY_GOALS) || '[]'),
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fution-personal-${window.weekKey}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Exported JSON');
    }

    function importFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.weekData) {
                    // restore WeekLearningTracker storages: userTopics and topicsState
                    const userTopicsKey = `weekTracker-userTopics-${window.weekKey}`;
                    const topicsStateKey = `weekTracker-topicsState-${window.weekKey}`;
                    if (data.weekData.userTopics) localStorage.setItem(userTopicsKey, JSON.stringify(data.weekData.userTopics));
                    if (data.weekData.topicsState) localStorage.setItem(topicsStateKey, JSON.stringify(data.weekData.topicsState));
                }
                if (data.journal) localStorage.setItem(KEY_JOURNAL, JSON.stringify(data.journal));
                if (Array.isArray(data.resources)) localStorage.setItem(KEY_RESOURCES, JSON.stringify(data.resources));
                if (Array.isArray(data.goals)) localStorage.setItem(KEY_GOALS, JSON.stringify(data.goals));
                showToast('Imported data — reloading page');
                setTimeout(() => location.reload(), 700);
            } catch (err) {
                console.error(err);
                showToast('Invalid JSON file', 'error');
            }
        };
        reader.readAsText(file);
    }



    // DOMContentLoaded wiring
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize sidebar if available
        if (typeof initializeSidebar === 'function') {
            try {
                initializeSidebar(); // auto-detects week from URL
            } catch (e) { /* ignore */ }
        }

        // Tab binding
        $all('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });

        switchTab('tasks'); // Also sets initial highlight


        // Journal

        // $('#saveJournalModalBtn').addEventListener('click', saveJournal);
        // $('#clearJournalBtn').addEventListener('click', clearJournal);
        // $('#togglePreview').addEventListener('click', () => {
        //     const preview = $('#journalPreview');
        //     if (preview.classList.contains('hidden')) {
        //         preview.innerHTML = marked ? marked($('#journalInput').value) : $('<div>').textContent = $('#journalInput').value.replace(/\n/g, '<br>');
        //         preview.classList.remove('hidden');
        //     } else preview.classList.add('hidden');
        // });

        // Resources
        loadResources();
        $('#resourceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = $('#resourceTitle').value.trim();
            const url = $('#resourceUrl').value.trim();
            if (!url) return showToast('Add a URL first', 'error');
            const list = JSON.parse(localStorage.getItem(KEY_RESOURCES) || '[]');
            list.unshift({ title, url, note: '', addedAt: Date.now() });
            localStorage.setItem(KEY_RESOURCES, JSON.stringify(list));
            $('#resourceTitle').value = '';
            $('#resourceUrl').value = '';
            renderResources(list);
            showToast('Resource added');
        });

        // Goals
        loadGoals();
        $('#goalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = $('#goalTitle').value.trim();
            if (!title) return;
            const list = JSON.parse(localStorage.getItem(KEY_GOALS) || '[]');
            list.unshift({ title, completed: false, createdAt: Date.now() });
            localStorage.setItem(KEY_GOALS, JSON.stringify(list));
            $('#goalTitle').value = '';
            renderGoals(list);
            showToast('Goal added');
        });

        // Export / Import
        $('#exportBtn').addEventListener('click', exportAll);
        $('#importInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) importFile(file);
        });


        // Ensure WeekLearningTracker exists and is connected
        if (!window.weekLearningTracker) {
            console.warn('WeekLearningTracker not found on page. Ensure main.js is loaded and not throwing errors.');
        } else {
            // after a tiny delay ensure it rendered topics UI
            setTimeout(() => {
                // scroll to bottom so new personal topics are visible
                const tc = document.getElementById('topicsContainer');
                if (tc) tc.scrollTop = tc.scrollHeight;
            }, 350);
        }

        // Add topic modal wiring (reuse your modal markup)
        $('#requestTopicBtn')?.addEventListener('click', () => {
            const modal = document.getElementById('requestModal');
            modal.classList.remove('pointer-events-none', 'opacity-0');
            setTimeout(() => modal.classList.add('scale-100'), 10);
        });
        $('#closeModal')?.addEventListener('click', () => {
            const modal = document.getElementById('requestModal');
            modal.classList.add('opacity-0', 'pointer-events-none');
        });

        // Page loader remove
        setTimeout(() => {
            $('#page-loader')?.classList.add('opacity-0');
            setTimeout(() => { $('#page-loader')?.remove(); }, 500);
        }, 300);
    });

    // Marked is optional (markdown preview). If user doesn't include it, preview will fallback to plain text.
    // If you want markdown preview, include <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

})();