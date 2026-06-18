document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('analyzeForm');
    const urlInput = document.getElementById('urlInput');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');
    const statusBadge = document.getElementById('statusBadge');
    const resultMessage = document.getElementById('resultMessage');
    const reasonsList = document.getElementById('reasonsList');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const themeToggleBtn = document.getElementById('themeToggle');

    // Theme Management
    let currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    // History Management
    let history = JSON.parse(localStorage.getItem('urlHistory')) || [];

    const saveHistory = () => {
        localStorage.setItem('urlHistory', JSON.stringify(history));
        renderHistory();
    };

    const addHistoryItem = (url, status) => {
        // Remove if exists to put it at the top
        history = history.filter(item => item.url !== url);
        history.unshift({ url, status, date: new Date().toISOString() });
        if (history.length > 20) history.pop(); // Keep last 20
        saveHistory();
    };

    const renderHistory = () => {
        historyList.innerHTML = '';
        if (history.length === 0) {
            historyList.innerHTML = '<li style="color: var(--text-secondary); text-align: center; padding: 1rem;">No history yet.</li>';
            return;
        }

        history.forEach(item => {
            const li = document.createElement('li');
            li.className = 'history-item';
            
            const date = new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });

            li.innerHTML = `
                <div class="history-url" title="${item.url}">${item.url}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <span class="history-status ${item.status}">${item.status === 'safe' ? '<i class="fas fa-check-circle"></i> Safe' : '<i class="fas fa-exclamation-triangle"></i> Suspicious'}</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">${date}</span>
                </div>
            `;
            
            li.addEventListener('click', () => {
                urlInput.value = item.url;
                form.dispatchEvent(new Event('submit'));
            });
            
            historyList.appendChild(li);
        });
    };

    clearHistoryBtn.addEventListener('click', () => {
        history = [];
        saveHistory();
    });

    // Initial render
    renderHistory();

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = urlInput.value.trim();
        
        if (!url) return;

        // Hide result, show loading
        resultSection.classList.add('hidden');
        loading.classList.remove('hidden');

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Update UI
            loading.classList.add('hidden');
            resultSection.classList.remove('hidden');

            statusBadge.className = `status-badge status-${data.status}`;
            
            if (data.status === 'safe') {
                statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> SAFE';
                resultMessage.textContent = 'This URL appears to be safe. No obvious phishing indicators were found.';
                reasonsList.innerHTML = '<li style="border-left-color: var(--color-safe);"><i class="fas fa-shield-check" style="color: var(--color-safe);"></i> Valid structure and no suspicious keywords.</li>';
            } else {
                statusBadge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> SUSPICIOUS';
                resultMessage.textContent = 'Warning! This URL has multiple indicators of a potential phishing attack.';
                
                reasonsList.innerHTML = '';
                data.reasons.forEach(reason => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-times-circle"></i> ${reason}`;
                    reasonsList.appendChild(li);
                });
            }

            addHistoryItem(url, data.status);

        } catch (error) {
            console.error('Error analyzing URL:', error);
            loading.classList.add('hidden');
            alert('An error occurred while analyzing the URL. Please ensure the backend is running.');
        }
    });
});
