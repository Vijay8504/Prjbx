(function() {
    var activeFilters = { price: 500, certs: [], locations: [], rating: 0, availability: 'all' };

    var sidebar = document.getElementById('filter-sidebar');
    var overlay = document.getElementById('sidebar-overlay');
    var mobileToggle = document.getElementById('mobile-filter-toggle');
    var clearAllBtn = document.getElementById('clear-all-filters');
    var applyBtn = document.getElementById('apply-filters');
    var priceSlider = document.getElementById('price-max-slider');
    var priceMaxDisplay = document.getElementById('price-max-display');
    var activeFiltersEl = document.getElementById('active-filters');
    var filterTagsEl = document.getElementById('filter-tags');
    var ratingBtns = document.querySelectorAll('.rating-filter-btn');

    // Mobile sidebar toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.add('sidebar-open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Price slider live update
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            activeFilters.price = parseInt(this.value);
            priceMaxDisplay.textContent = this.value === '500' ? '500+' : this.value;
        });
    }

    // Rating buttons
    ratingBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            ratingBtns.forEach(function(b) { b.classList.remove('active'); });
            if (activeFilters.rating === parseInt(this.dataset.rating)) {
                activeFilters.rating = 0;
            } else {
                this.classList.add('active');
                activeFilters.rating = parseInt(this.dataset.rating);
            }
        });
    });

    // Apply filters
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            collectFilters();
            applyAllFilters();
            renderFilterTags();
            closeSidebar();
        });
    }

    function collectFilters() {
        activeFilters.certs = Array.from(document.querySelectorAll('input[name="cert"]:checked')).map(function(el) { return el.value; });
        activeFilters.locations = Array.from(document.querySelectorAll('input[name="location"]:checked')).map(function(el) { return el.value; });
        var avail = document.querySelector('input[name="availability"]:checked');
        activeFilters.availability = avail ? avail.value : 'all';
    }

    function applyAllFilters() {
        var cards = document.querySelectorAll('#products-grid .product-card');
        var shown = 0;
        cards.forEach(function(card) {
            var show = true;

            // Price filter
            var priceEl = card.querySelector('.current-price');
            if (priceEl && activeFilters.price < 500) {
                var priceVal = parseFloat(priceEl.textContent.replace(/[^\d.]/g, ''));
                if (!isNaN(priceVal) && priceVal > activeFilters.price) show = false;
            }

            // Cert filter
            if (show && activeFilters.certs.length > 0) {
                var cardCert = card.dataset.cert || '';
                var certMatch = activeFilters.certs.some(function(c) { return cardCert.includes(c); });
                if (!certMatch) show = false;
            }

            // Location filter
            if (show && activeFilters.locations.length > 0) {
                var cardLoc = card.dataset.location || '';
                var locMatch = activeFilters.locations.some(function(l) { return cardLoc.includes(l); });
                if (!locMatch) show = false;
            }

            // Rating filter
            if (show && activeFilters.rating > 0) {
                var cardRating = parseFloat(card.dataset.rating || '0');
                if (cardRating < activeFilters.rating) show = false;
            }

            // Availability filter
            if (show && activeFilters.availability !== 'all') {
                var cardAvail = card.dataset.availability || '';
                if (cardAvail !== activeFilters.availability) show = false;
            }

            card.style.display = show ? '' : 'none';
            if (show) shown++;
        });

        // Update results count
        var infoEl = document.getElementById('pagination-info');
        if (infoEl) infoEl.textContent = 'Showing ' + shown + ' of ' + cards.length + ' products';
    }

    function renderFilterTags() {
        if (!filterTagsEl) return;
        filterTagsEl.innerHTML = '';
        var hasTags = false;

        if (activeFilters.price < 500) {
            hasTags = true;
            filterTagsEl.appendChild(makeTag('Max ₹' + activeFilters.price, function() {
                activeFilters.price = 500;
                if (priceSlider) priceSlider.value = 500;
                if (priceMaxDisplay) priceMaxDisplay.textContent = '500+';
                applyAllFilters(); renderFilterTags();
            }));
        }

        activeFilters.certs.forEach(function(c) {
            hasTags = true;
            filterTagsEl.appendChild(makeTag(c, function() {
                activeFilters.certs = activeFilters.certs.filter(function(x) { return x !== c; });
                var checkbox = document.querySelector('input[name="cert"][value="' + c + '"]');
                if (checkbox) checkbox.checked = false;
                applyAllFilters(); renderFilterTags();
            }));
        });

        activeFilters.locations.forEach(function(l) {
            hasTags = true;
            filterTagsEl.appendChild(makeTag(l, function() {
                activeFilters.locations = activeFilters.locations.filter(function(x) { return x !== l; });
                var checkbox = document.querySelector('input[name="location"][value="' + l + '"]');
                if (checkbox) checkbox.checked = false;
                applyAllFilters(); renderFilterTags();
            }));
        });

        if (activeFilters.rating > 0) {
            hasTags = true;
            filterTagsEl.appendChild(makeTag(activeFilters.rating + '+ stars', function() {
                activeFilters.rating = 0;
                ratingBtns.forEach(function(b) { b.classList.remove('active'); });
                applyAllFilters(); renderFilterTags();
            }));
        }

        if (activeFiltersEl) activeFiltersEl.style.display = hasTags ? '' : 'none';
    }

    function makeTag(label, onRemove) {
        var tag = document.createElement('span');
        tag.className = 'filter-tag';
        tag.innerHTML = label + ' <button aria-label="Remove filter">×</button>';
        tag.querySelector('button').addEventListener('click', onRemove);
        return tag;
    }

    // Clear all
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            activeFilters = { price: 500, certs: [], locations: [], rating: 0, availability: 'all' };
            if (priceSlider) priceSlider.value = 500;
            if (priceMaxDisplay) priceMaxDisplay.textContent = '500+';
            document.querySelectorAll('input[name="cert"], input[name="location"]').forEach(function(el) { el.checked = false; });
            var allRadio = document.querySelector('input[name="availability"][value="all"]');
            if (allRadio) allRadio.checked = true;
            ratingBtns.forEach(function(b) { b.classList.remove('active'); });
            document.querySelectorAll('#products-grid .product-card').forEach(function(c) { c.style.display = ''; });
            if (filterTagsEl) filterTagsEl.innerHTML = '';
            if (activeFiltersEl) activeFiltersEl.style.display = 'none';
            var infoEl = document.getElementById('pagination-info');
            var total = document.querySelectorAll('#products-grid .product-card').length;
            if (infoEl) infoEl.textContent = 'Showing 1-' + total + ' of ' + total + ' products';
        });
    }
})();
