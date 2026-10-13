/* ===== PRODUCTS PAGE JAVASCRIPT ===== */
/* JavaScript functionality for products page - filtering, sorting, cart actions */

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

// Pagination variables
let currentPage = 1;
let productsPerPage = 8;
let allProducts = [];
let filteredProducts = [];

// Product filtering and sorting functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('sort-products');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Initialize pagination
    allProducts = Array.from(productCards);
    filteredProducts = [...allProducts];
    initializePagination();
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            if (category === 'all') {
                filteredProducts = [...allProducts];
            } else {
                filteredProducts = allProducts.filter(card => {
                    const cardCategories = card.getAttribute('data-category');
                    return cardCategories.includes(category);
                });
            }
            
            currentPage = 1; // Reset to first page
            displayPage(currentPage);
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (!searchTerm) {
                filteredProducts = [...allProducts];
            } else {
                filteredProducts = allProducts.filter(card => {
                    const title = card.querySelector('.product-title a').textContent.toLowerCase();
                    const description = card.querySelector('.product-description').textContent.toLowerCase();
                    const farmer = card.querySelector('.farmer-name').textContent.toLowerCase();
                    return title.includes(searchTerm) || description.includes(searchTerm) || farmer.includes(searchTerm);
                });
            }
            
            currentPage = 1; // Reset to first page
            displayPage(currentPage);
        });
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            
            // Sort the filtered products array
            filteredProducts.sort((a, b) => {
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
                        // Sort by data-category or other attribute
                        return a.getAttribute('data-category').localeCompare(b.getAttribute('data-category'));
                    default:
                        return 0;
                }
            });
            
            currentPage = 1; // Reset to first page
            displayPage(currentPage);
        });
    }
    
    // View toggle functionality
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active view button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Apply view changes
            const productsGrid = document.getElementById('products-grid');
            if (view === 'list') {
                productsGrid.style.gridTemplateColumns = '1fr';
                showNotification('Switched to list view', 'info');
            } else {
                productsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, max-content))';
                showNotification('Switched to grid view', 'info');
            }
        });
    });
    
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
    
    // Contact farmer functionality
    document.querySelectorAll('.contact-farmer').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const farmerName = productCard.querySelector('.farmer-name').textContent;
            
            // Show contact info (in real app, would open contact modal)
            showNotification(`Contact ${farmerName}: +91 9221591156 | WhatsApp available`, 'info');
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
            const productLink = productCard.querySelector('.product-title a').getAttribute('href');
            
            // In real app, would open modal. For now, redirect to product page
            window.open(productLink, '_blank');
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Simulate loading more products
            setTimeout(() => {
                this.disabled = false;
                this.innerHTML = '<span data-en="Load More Products" data-mr="अधिक उत्पादने लोड करा">Load More Products</span>';
                showNotification('All products loaded', 'info');
            }, 2000);
        });
    }
    
    // Update results count (now handled by updatePaginationInfo)
    function updateResultsCount() {
        // This function is now integrated into the pagination system
        updatePaginationInfo();
    }
    
    // Initialize results count
    updateResultsCount();
    
    // Handle URL parameters for category filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        const categoryBtn = document.querySelector(`[data-category="${categoryParam}"]`);
        if (categoryBtn) {
            categoryBtn.click();
        }
    }
    
    // Initialize pagination functionality
    function initializePagination() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const paginationNumbers = document.getElementById('pagination-numbers');
        
        if (prevBtn && nextBtn && paginationNumbers) {
            prevBtn.addEventListener('click', goToPreviousPage);
            nextBtn.addEventListener('click', goToNextPage);
            
            // Add event listeners for page number buttons
            paginationNumbers.addEventListener('click', function(e) {
                if (e.target.classList.contains('page-number')) {
                    goToPage(parseInt(e.target.dataset.page));
                }
            });
            
            displayPage(currentPage);
        }
    }
    
    function displayPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        
        // Hide all products first
        allProducts.forEach(product => {
            product.style.display = 'none';
        });
        
        // Show products for current page from filtered products
        const currentPageProducts = filteredProducts.slice(startIndex, endIndex);
        currentPageProducts.forEach(product => {
            product.style.display = 'block';
        });
        
        updatePaginationControls();
        updatePaginationInfo();
    }
    
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const paginationNumbers = document.getElementById('pagination-numbers');
        
        if (prevBtn && nextBtn && paginationNumbers) {
            // Update previous button
            prevBtn.disabled = currentPage === 1;
            
            // Update next button
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;
            
            // Update page numbers
            paginationNumbers.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.dataset.page = i;
                pageBtn.textContent = i;
                paginationNumbers.appendChild(pageBtn);
            }
        }
    }
    
    function updatePaginationInfo() {
        const paginationInfo = document.getElementById('pagination-info');
        if (paginationInfo) {
            const totalProducts = filteredProducts.length;
            const startIndex = (currentPage - 1) * productsPerPage + 1;
            const endIndex = Math.min(currentPage * productsPerPage, totalProducts);
            
            const englishText = totalProducts === 0 ? 'No products found' : 
                               `Showing ${startIndex}-${endIndex} of ${totalProducts} products`;
            const marathiText = totalProducts === 0 ? 'कोणतेही उत्पादन सापडले नाही' :
                              `${totalProducts} पैकी ${startIndex}-${endIndex} उत्पादने दाखवत आहे`;
            
            paginationInfo.setAttribute('data-en', englishText);
            paginationInfo.setAttribute('data-mr', marathiText);
            paginationInfo.textContent = englishText;
        }
    }
    
    function goToPage(page) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (page >= 1 && page <= totalPages) {
            displayPage(page);
            
            // Scroll to products grid smoothly
            const productsGrid = document.getElementById('products-grid');
            if (productsGrid) {
                productsGrid.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }
    
    function goToPreviousPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
    
    function goToNextPage() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }
    
    // Update filter functionality to work with pagination
    function updateFilteredProducts() {
        filteredProducts = allProducts.filter(card => 
            card.style.display !== 'none'
        );
        currentPage = 1; // Reset to first page when filtering
        displayPage(currentPage);
    }
    
    // Initialize pagination
    initializePagination();
});