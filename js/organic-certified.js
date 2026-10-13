// Organic Certified Products JavaScript

// Sample organic products data
const organicProducts = [
    {
        id: 1,
        title: "Organic Basmati Rice",
        titleMr: "सेंद्रिय बासमती तांदळ",
        category: "grains",
        categoryName: "Grains",
        categoryNameMr: "धान्य",
        description: "Premium aged organic basmati rice certified by NPOP with rich aroma and taste",
        descriptionMr: "NPOP द्वारे प्रमाणित प्रीमियम जुना सेंद्रिय बासमती तांदळ समृद्ध सुगंध आणि चवीसह",
        currentPrice: 220,
        originalPrice: 280,
        rating: 4.8,
        reviews: 342,
        certification: "npop",
        features: ["NPOP Certified", "Zero Chemicals", "3-Year Organic"],
        featuresMr: ["NPOP प्रमाणित", "शून्य रसायने", "3 वर्ष सेंद्रिय"],
        image: "../../images/organic-basmati.jpg",
        farmer: "Rajesh Patil, Solapur",
        farmerMr: "राजेश पाटील, सोलापूर"
    },
    {
        id: 2,
        title: "Organic Tomatoes",
        titleMr: "सेंद्रिय टोमॅटो",
        category: "vegetables",
        categoryName: "Vegetables",
        categoryNameMr: "भाज्या",
        description: "Fresh organic tomatoes grown without any pesticides, rich in vitamins and minerals",
        descriptionMr: "कोणतेही कीटकनाशके न वापरता वाढवलेले ताजे सेंद्रिय टोमॅटो, जीवनसत्व आणि खनिजांनी भरपूर",
        currentPrice: 80,
        originalPrice: 100,
        rating: 4.6,
        reviews: 156,
        certification: "jaivik",
        features: ["Jaivik Certified", "Pesticide Free", "Fresh Harvest"],
        featuresMr: ["जैविक प्रमाणित", "कीटकनाशक मुक्त", "ताजी कापणी"],
        image: "../../images/organic-tomatoes.jpg",
        farmer: "Sunita Deshmukh, Pune",
        farmerMr: "सुनिता देशमुख, पुणे"
    },
    {
        id: 3,
        title: "Organic Turmeric Powder",
        titleMr: "सेंद्रिय हळद पावडर",
        category: "spices",
        categoryName: "Spices",
        categoryNameMr: "मसाले",
        description: "Pure organic turmeric powder from Sangli farms with high curcumin content",
        descriptionMr: "सांगली शेतातील शुद्ध सेंद्रिय हळद पावडर उच्च कर्क्यूमिन सामग्रीसह",
        currentPrice: 150,
        originalPrice: 180,
        rating: 4.9,
        reviews: 289,
        certification: "npop",
        features: ["NPOP Certified", "Lab Tested", "High Curcumin"],
        featuresMr: ["NPOP प्रमाणित", "प्रयोगशाळा तपासणी", "उच्च कर्क्यूमिन"],
        image: "../../images/organic-turmeric.jpg",
        farmer: "Ramesh Jadhav, Sangli",
        farmerMr: "रमेश जाधव, सांगली"
    },
    {
        id: 4,
        title: "Organic Alphonso Mangoes",
        titleMr: "सेंद्रिय अल्फान्सो आंबे",
        category: "fruits",
        categoryName: "Fruits",
        categoryNameMr: "फळे",
        description: "Sweet organic Alphonso mangoes from Konkan region, king of fruits",
        descriptionMr: "कोकण प्रदेशातील गोड सेंद्रिय अल्फान्सो आंबे, फळांचा राजा",
        currentPrice: 450,
        originalPrice: 550,
        rating: 4.7,
        reviews: 198,
        certification: "usda",
        features: ["USDA Organic", "Chemical Free", "Premium Grade"],
        featuresMr: ["USDA सेंद्रिय", "रसायन मुक्त", "प्रीमियम दर्जा"],
        image: "../../images/organic-mangoes.jpg",
        farmer: "Prakash Sawant, Ratnagiri",
        farmerMr: "प्रकाश सावंत, रत्नागिरी"
    },
    {
        id: 5,
        title: "Organic Toor Dal",
        titleMr: "सेंद्रिय तूर डाळ",
        category: "pulses",
        categoryName: "Pulses",
        categoryNameMr: "डाळी",
        description: "High protein organic toor dal from Maharashtra with natural processing",
        descriptionMr: "महाराष्ट्रातील उच्च प्रथिन सेंद्रिय तूर डाळ नैसर्गिक प्रक्रियेसह",
        currentPrice: 180,
        originalPrice: 220,
        rating: 4.5,
        reviews: 124,
        certification: "jaivik",
        features: ["Jaivik Certified", "High Protein", "Natural Processing"],
        featuresMr: ["जैविक प्रमाणित", "उच्च प्रथिन", "नैसर्गिक प्रक्रिया"],
        image: "../../images/organic-toor-dal.jpg",
        farmer: "Vijay Kale, Kolhapur",
        farmerMr: "विजय काळे, कोल्हापूर"
    },
    {
        id: 6,
        title: "Organic Green Chillies",
        titleMr: "सेंद्रिय हिरव्या मिरच्या",
        category: "vegetables",
        categoryName: "Vegetables",
        categoryNameMr: "भाज्या",
        description: "Fresh organic green chillies with intense flavor and natural heat",
        descriptionMr: "तीव्र चव आणि नैसर्गिक तिखटपणा असलेल्या ताज्या सेंद्रिय हिरव्या मिरच्या",
        currentPrice: 120,
        originalPrice: 150,
        rating: 4.4,
        reviews: 87,
        certification: "npop",
        features: ["NPOP Certified", "Intense Flavor", "Farm Fresh"],
        featuresMr: ["NPOP प्रमाणित", "तीव्र चव", "शेत ताजी"],
        image: "../../images/organic-chillies.jpg",
        farmer: "Anita Bhosale, Nashik",
        farmerMr: "अनिता भोसले, नाशिक"
    },
    {
        id: 7,
        title: "Organic Wheat Flour",
        titleMr: "सेंद्रिय गव्हाचे पीठ",
        category: "grains",
        categoryName: "Grains",
        categoryNameMr: "धान्य",
        description: "Stone ground organic wheat flour with high fiber and nutritional value",
        descriptionMr: "उच्च फायबर आणि पौष्टिक मूल्यासह दगडी दळलेले सेंद्रिय गव्हाचे पीठ",
        currentPrice: 65,
        originalPrice: 80,
        rating: 4.6,
        reviews: 203,
        certification: "jaivik",
        features: ["Stone Ground", "High Fiber", "Fresh Milled"],
        featuresMr: ["दगडी दळलेले", "उच्च फायबर", "ताजे दळलेले"],
        image: "../../images/organic-wheat-flour.jpg",
        farmer: "Balkrishna Patil, Ahmednagar",
        farmerMr: "बाळकृष्ण पाटील, अहमदनगर"
    },
    {
        id: 8,
        title: "Organic Onions",
        titleMr: "सेंद्रिय कांदे",
        category: "vegetables",
        categoryName: "Vegetables",
        categoryNameMr: "भाज्या",
        description: "Fresh organic red onions with strong flavor and long shelf life",
        descriptionMr: "मजबूत चव आणि दीर्घ शेल्फ लाइफ असलेले ताजे सेंद्रिय लाल कांदे",
        currentPrice: 45,
        originalPrice: 60,
        rating: 4.3,
        reviews: 167,
        certification: "npop",
        features: ["NPOP Certified", "Long Shelf Life", "Strong Flavor"],
        featuresMr: ["NPOP प्रमाणित", "दीर्घ शेल्फ लाइफ", "मजबूत चव"],
        image: "../../images/organic-onions.jpg",
        farmer: "Sanjay More, Nashik",
        farmerMr: "संजय मोरे, नाशिक"
    },
    {
        id: 9,
        title: "Organic Jaggery",
        titleMr: "सेंद्रिय गूळ",
        category: "sweeteners",
        categoryName: "Sweeteners",
        categoryNameMr: "गोडसाखर",
        description: "Pure organic jaggery made from sugarcane without any chemicals",
        descriptionMr: "कोणत्याही रसायनांशिवाय ऊसापासून बनवलेला शुद्ध सेंद्रिय गूळ",
        currentPrice: 85,
        originalPrice: 100,
        rating: 4.7,
        reviews: 145,
        certification: "usda",
        features: ["USDA Organic", "Chemical Free", "Traditional Process"],
        featuresMr: ["USDA सेंद्रिय", "रसायन मुक्त", "पारंपरिक प्रक्रिया"],
        image: "../../images/organic-jaggery.jpg",
        farmer: "Mahesh Shinde, Kolhapur",
        farmerMr: "महेश शिंदे, कोल्हापूर"
    },
    {
        id: 10,
        title: "Organic Green Peas",
        titleMr: "सेंद्रिय हिरव्या वाटाणा",
        category: "vegetables",
        categoryName: "Vegetables",
        categoryNameMr: "भाज्या",
        description: "Fresh organic green peas rich in protein and vitamins",
        descriptionMr: "प्रथिने आणि जीवनसत्वांनी भरपूर ताज्या सेंद्रिय हिरव्या वाटाणा",
        currentPrice: 95,
        originalPrice: 120,
        rating: 4.5,
        reviews: 89,
        certification: "jaivik",
        features: ["Jaivik Certified", "High Protein", "Vitamin Rich"],
        featuresMr: ["जैविक प्रमाणित", "उच्च प्रथिन", "जीवनसत्व समृद्ध"],
        image: "../../images/organic-green-peas.jpg",
        farmer: "Kavita Jadhav, Pune",
        farmerMr: "कविता जाधव, पुणे"
    }
];

// Global variables
// Language and state variables
// currentLanguage is managed by language-toggle.js
function getCurrentLanguage() {
    return window.KisanBoxLanguage ? window.KisanBoxLanguage.getCurrentLanguage() : 'en';
}
let filteredProducts = [...organicProducts];
let currentPage = 1;
const productsPerPage = 8;

// Initialize page
function initializePage() {
    renderProducts();
    setupEventListeners();
    setupFilters();
    updatePaginationControls();
    updatePaginationInfo();
    
    // Listen for language changes
    document.addEventListener('languageChanged', function() {
        renderProducts();
        updatePaginationInfo();
        updateFilterOptions();
    });
}

// Render products with pagination
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666; margin-bottom: 0.5rem;">${getCurrentLanguage() === 'en' ? 'No products found' : 'कोणतीही उत्पादने आढळली नाहीत'}</h3>
                <p style="color: #999;">${getCurrentLanguage() === 'en' ? 'Try adjusting your filters or search terms' : 'तुमचे फिल्टर किंवा शोध शब्द समायोजित करण्याचा प्रयत्न करा'}</p>
            </div>
        `;
        return;
    }

    // Calculate products for current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

    currentPageProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });

    updatePaginationControls();
    updatePaginationInfo();
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card organic-product-card';
    card.setAttribute('data-category', product.category);
    card.onclick = () => window.location.href = `../product-view.html?id=${product.id}`;

    const currentLang = getCurrentLanguage();
    const title = currentLang === 'en' ? product.title : product.titleMr;
    const category = currentLang === 'en' ? product.categoryName : product.categoryNameMr;
    const description = currentLang === 'en' ? product.description : product.descriptionMr;
    const features = currentLang === 'en' ? product.features : product.featuresMr;
    const farmer = currentLang === 'en' ? product.farmer : product.farmerMr;

    const certName = {
        'npop': 'NPOP',
        'usda': 'USDA',
        'jaivik': getCurrentLanguage() === 'en' ? 'Jaivik Bharat' : 'जैविक भारत'
    };

    card.innerHTML = `
        <div class="organic-badge">
            <i class="fas fa-leaf"></i>
            <span>${getCurrentLanguage() === 'en' ? '100% Organic' : '100% सेंद्रिय'}</span>
        </div>
        <div class="certification-badge">${certName[product.certification]}</div>
        <div class="product-image">
            <img src="${product.image}" alt="${title}" onerror="this.src='../../images/placeholder.jpg'">
        </div>
        <div class="product-info">
            <div class="product-category">${category}</div>
            <h3 class="product-title">
                <a href="../product-view.html?id=${product.id}">${title}</a>
            </h3>
            <p class="product-description">${description}</p>
            
            <div class="organic-features">
                ${features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            
            <div class="product-rating">
                <div class="stars">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span class="rating-text">${product.rating} (${product.reviews} ${getCurrentLanguage() === 'en' ? 'reviews' : 'पुनरावलोकने'})</span>
            </div>
            
            <div class="product-price">
                <div class="price-info">
                    <span class="current-price">₹${product.currentPrice}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                </div>
                <div class="organic-premium">${getCurrentLanguage() === 'en' ? 'Organic Premium' : 'सेंद्रिय प्रीमियम'}</div>
            </div>
            
            <div class="farmer-name">${farmer}</div>
            
            <div class="product-actions">
                <button class="btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    ${getCurrentLanguage() === 'en' ? 'Add to Cart' : 'कार्टमध्ये जोडा'}
                </button>
                <button class="btn-outline" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

// Pagination functions
function updatePaginationControls() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationContainer = document.querySelector('.pagination-controls');
    
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('pagination-numbers');
    
    // Update Previous button
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => goToPreviousPage();
    }
    
    // Update Next button
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => goToNextPage();
    }
    
    // Update page numbers
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.onclick = () => goToPage(i);
                pageNumbers.appendChild(pageBtn);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
    }
}

function updatePaginationInfo() {
    const paginationInfo = document.getElementById('pagination-info');
    const resultsCount = document.getElementById('results-count');
    
    const totalProducts = filteredProducts.length;
    const startIndex = totalProducts === 0 ? 0 : (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, totalProducts);
    
    const englishText = totalProducts === 0 ? 'No products found' :
                       `Showing ${startIndex}-${endIndex} of ${totalProducts} products`;
    const marathiText = totalProducts === 0 ? 'कोणतेही उत्पादन सापडले नाही' :
                      `${totalProducts} पैकी ${startIndex}-${endIndex} उत्पादने दाखवत आहे`;
    
    const englishCountText = totalProducts === 0 ? 'No organic products found' :
                           `Showing ${totalProducts} organic products`;
    const marathiCountText = totalProducts === 0 ? 'कोणतेही सेंद्रिय उत्पादने सापडली नाहीत' :
                           `${totalProducts} सेंद्रिय उत्पादने दाखवत आहे`;
    
    // Update pagination info
    if (paginationInfo) {
        paginationInfo.setAttribute('data-en', englishText);
        paginationInfo.setAttribute('data-mr', marathiText);
        paginationInfo.textContent = getCurrentLanguage() === 'en' ? englishText : marathiText;
    }
    
    // Update results count
    if (resultsCount) {
        resultsCount.setAttribute('data-en', englishCountText);
        resultsCount.setAttribute('data-mr', marathiCountText);
        resultsCount.textContent = getCurrentLanguage() === 'en' ? englishCountText : marathiCountText;
    }
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProducts();
        
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
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
        goToPage(currentPage + 1);
    }
}

// Filter functions
function filterProducts() {
    const activeCategoryBtn = document.querySelector('.filter-btn.active');
    const category = activeCategoryBtn?.dataset?.category || '';
    const searchTerm = document.getElementById('product-search')?.value?.toLowerCase() || '';

    filteredProducts = organicProducts.filter(product => {
        // Category filter
        if (category && product.category !== category) return false;

        // Search filter
        if (searchTerm) {
            const titleMatch = (product.title.toLowerCase().includes(searchTerm) || 
                               product.titleMr.toLowerCase().includes(searchTerm));
            const categoryMatch = (product.categoryName.toLowerCase().includes(searchTerm) ||
                                 product.categoryNameMr.toLowerCase().includes(searchTerm));
            const descMatch = (product.description.toLowerCase().includes(searchTerm) ||
                              product.descriptionMr.toLowerCase().includes(searchTerm));
            if (!titleMatch && !categoryMatch && !descMatch) return false;
        }

        return true;
    });

    currentPage = 1; // Reset to first page when filtering
    renderProducts();
}

// Action functions
function addToCart(productId) {
    const product = organicProducts.find(p => p.id === productId);
    const title = getCurrentLanguage() === 'en' ? product.title : product.titleMr;
    const message = getCurrentLanguage() === 'en' ? 
        `${title} added to cart!` : 
        `${title} कार्टमध्ये जोडले!`;
    alert(message);
}

function toggleWishlist(productId) {
    const message = getCurrentLanguage() === 'en' ? 
        'Added to wishlist!' : 
        'इच्छा सूचीमध्ये जोडले!';
    alert(message);
}

// Update filter options for sort dropdown
function updateFilterOptions() {
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
        const options = sortSelect.querySelectorAll('option[data-en][data-mr]');
        options.forEach(option => {
            const text = option.getAttribute(`data-${getCurrentLanguage()}`);
            if (text) {
                option.textContent = text;
            }
        });
    }
}

// Setup filters
function setupFilters() {
    const categoryButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('sort-products');
    
    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            filterProducts();
        });
    });
    
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (sortSelect) sortSelect.addEventListener('change', sortProducts);
}

// Sort products
function sortProducts() {
    const sortValue = document.getElementById('sort-products')?.value || 'featured';
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.id) - new Date(a.id));
            break;
        default: // featured
            filteredProducts = [...organicProducts]; // Reset to original order
            filterProducts(); // Re-apply current filters
            return;
    }
    
    currentPage = 1; // Reset to first page
    renderProducts();
    updatePaginationControls();
    updatePaginationInfo();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // View toggle (Grid/List)
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.dataset.view;
            
            // Remove active class from all view buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update products grid view
            if (productsGrid) {
                if (viewType === 'list') {
                    productsGrid.classList.add('list-view');
                    productsGrid.classList.remove('grid-view');
                } else {
                    productsGrid.classList.add('grid-view');
                    productsGrid.classList.remove('list-view');
                }
            }
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);