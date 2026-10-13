/* ===== NEW ARRIVALS PAGE JAVASCRIPT ===== */
/* JavaScript functionality for new arrivals page - filtering, sorting, cart actions */

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Product filtering and sorting functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('sort-products');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Current view mode tracker
    let currentView = 'grid';
    
    // Apply current view to products grid
    function applyCurrentView() {
        const productsGrid = document.getElementById('products-grid');
        if (currentView === 'list') {
            productsGrid.classList.remove('grid-view');
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
            productsGrid.classList.add('grid-view');
        }
    }
    
    // Filter products and maintain view
    function filterProducts() {
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const title = card.querySelector('.product-title a').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const farmer = card.querySelector('.farmer-name').textContent.toLowerCase();
            
            let showByCategory = false;
            let showBySearch = true;
            
            // Category filtering
            if (category === 'all') {
                showByCategory = true;
            } else if (category === 'organic') {
                showByCategory = cardCategory.includes('organic');
            } else {
                showByCategory = (cardCategory === category || cardCategory.includes(category));
            }
            
            // Search filtering
            if (searchTerm) {
                showBySearch = title.includes(searchTerm) || description.includes(searchTerm) || farmer.includes(searchTerm);
            }
            
            // Show/hide card based on both filters
            if (showByCategory && showBySearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Maintain current view after filtering
        applyCurrentView();
        updateResultsCount();
    }
    
    // Filter functionality - adapted for new arrivals with organic support
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filtering
            filterProducts();
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Apply filtering (includes both search and category filtering)
            filterProducts();
        });
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const productsGrid = document.getElementById('products-grid');
            const cards = Array.from(productCards);
            
            cards.sort((a, b) => {
                switch (sortBy) {
                    case 'price-low':
                        const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('₹', '').replace('/kg', '').replace('/dozen', ''));
                        const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('₹', '').replace('/kg', '').replace('/dozen', ''));
                        return priceA - priceB;
                    case 'price-high':
                        const priceA2 = parseFloat(a.querySelector('.current-price').textContent.replace('₹', '').replace('/kg', '').replace('/dozen', ''));
                        const priceB2 = parseFloat(b.querySelector('.current-price').textContent.replace('₹', '').replace('/kg', '').replace('/dozen', ''));
                        return priceB2 - priceA2;
                    case 'newest':
                        // Sort by arrival time for new arrivals page
                        const arrivalA = a.getAttribute('data-arrival');
                        const arrivalB = b.getAttribute('data-arrival');
                        const arrivalOrder = { 'today': 2, 'thisweek': 1 };
                        return (arrivalOrder[arrivalB] || 0) - (arrivalOrder[arrivalA] || 0);
                    case 'featured':
                        // Sort by category for featured
                        return a.getAttribute('data-category').localeCompare(b.getAttribute('data-category'));
                    default:
                        return 0;
                }
            });
            
            // Re-append sorted cards
            cards.forEach(card => productsGrid.appendChild(card));
        });
    }
    
    // View toggle functionality
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active view button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current view
            currentView = view;
            
            // Apply view changes
            applyCurrentView();
            
            if (view === 'list') {
                showNotification('Switched to list view', 'info');
            } else {
                showNotification('Switched to grid view', 'info');
            }
        });
    });
    
    // Initialize with grid view
    applyCurrentView();
    
    // Quantity selector functionality
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.qty-input');
            const currentValue = parseInt(input.value) || 1;
            
            if (this.classList.contains('plus')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('minus') && currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title a').textContent;
            const quantity = productCard.querySelector('.qty-input').value;
            
            // Add loading state
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            
            // Simulate API call
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = '<span data-en="Add to Cart" data-mr="कार्टमध्ये जोडा">Add to Cart</span>';
                showNotification(`${productName} (${quantity} units) added to cart!`, 'success');
            }, 1000);
        });
    });
    
    // Contact farmer functionality (Quick Order)
    document.querySelectorAll('.contact-farmer').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const farmerName = productCard.querySelector('.farmer-name').textContent;
            const productName = productCard.querySelector('.product-title a').textContent;
            
            // Show contact info for quick order
            showNotification(`Quick Order for ${productName} from ${farmerName}: +91 9221591156 | WhatsApp available`, 'info');
        });
    });
    
    // Wishlist functionality
    document.querySelectorAll('.wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            const productName = this.closest('.product-card').querySelector('.product-title a').textContent;
            
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#dc3545';
                showNotification(`${productName} added to wishlist`, 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showNotification(`${productName} removed from wishlist`, 'info');
            }
        });
    });
    
    // Quick view functionality
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title a').textContent;
            const farmer = productCard.querySelector('.farmer-name').textContent;
            const price = productCard.querySelector('.current-price').textContent;
            
            // Show quick view info for new arrivals
            showNotification(`Quick view: ${productName} from ${farmer} - ${price} | Fresh arrival!`, 'info');
        });
    });
    
    // Update results count for new arrivals
    function updateResultsCount() {
        const visibleProducts = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        ).length;
        
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            const totalProducts = productCards.length;
            resultsCount.innerHTML = `
                <span data-en="Showing ${visibleProducts} of ${totalProducts} new arrivals" 
                      data-mr="${totalProducts} पैकी ${visibleProducts} नवीन आगमन दाखवत आहे">
                    Showing ${visibleProducts} of ${totalProducts} new arrivals
                </span>
            `;
        }
    }
    
    // Initialize results count
    updateResultsCount();
    
    // Subscribe newsletter function
    window.subscribeNewsletter = function(event) {
        event.preventDefault();
        const email = event.target.querySelector('.newsletter-input').value;
        showNotification(`Thank you! Newsletter subscription for ${email} successful. You'll get updates on new arrivals!`, 'success');
        event.target.reset();
    };
});

// Language toggle integration
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn && typeof toggleLanguage === 'function') {
        languageBtn.addEventListener('click', toggleLanguage);
    }
});