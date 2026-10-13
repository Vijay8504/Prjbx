(function() {
    // Tab switching
    var tabs = document.querySelectorAll('.tab-btn');
    var allCards = document.querySelectorAll('.supplier-card');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            var target = this.dataset.tab;

            // Show/hide cards based on tab
            allCards.forEach(function(card) {
                if (target === 'all' || card.dataset.tab === target) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Get Quote modal
    var modal = document.getElementById('quote-modal');
    var modalClose = document.getElementById('modal-close');
    var backdrop = document.getElementById('modal-backdrop');

    document.querySelectorAll('.get-quote-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (modal) modal.style.display = 'flex';
        });
    });

    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Contact Supplier buttons
    document.querySelectorAll('.contact-supplier-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            showNotification('WhatsApp: +91 9221591156 | Call: +91 9221591156', 'success');
        });
    });

    // Requirement form
    var reqForm = document.getElementById('requirement-form');
    if (reqForm) {
        reqForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Your requirement has been submitted! Our team will contact you within 24 hours via WhatsApp.', 'success');
            reqForm.reset();
        });
    }

    // Mobile sidebar toggle
    var mobileToggle = document.getElementById('mobile-filter-toggle');
    var sidebar = document.getElementById('filter-sidebar');
    var overlay = document.getElementById('sidebar-overlay');

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.add('sidebar-open');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (sidebar) sidebar.classList.remove('sidebar-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    function showNotification(msg, type) {
        var n = document.createElement('div');
        n.className = 'notification ' + (type || 'success');
        n.innerHTML = '<p>' + msg + '</p><button onclick="this.parentElement.remove()">×</button>';
        n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:' + (type === 'success' ? '#2d5016' : '#c62828') + ';color:#fff;padding:1rem 1.5rem;border-radius:8px;z-index:9999;max-width:340px;display:flex;gap:1rem;align-items:flex-start;box-shadow:0 4px 20px rgba(0,0,0,0.3);font-family:Inter,sans-serif;font-size:0.9rem;';
        document.body.appendChild(n);
        setTimeout(function() { if (n.parentElement) n.remove(); }, 5000);
    }
})();
