// ===== LANGUAGE TOGGLE FUNCTIONALITY =====

// Language data
const languages = {
    en: {
        name: 'English',
        code: 'en',
        direction: 'ltr'
    },
    mr: {
        name: 'मराठी',
        code: 'mr', 
        direction: 'ltr'
    }
};

// Current language state
let currentLanguage = localStorage.getItem('kisanbox-language') || 'en';

// Initialize language toggle
document.addEventListener('DOMContentLoaded', function() {
    initLanguageToggle();
    setLanguage(currentLanguage);
});

// ===== LANGUAGE TOGGLE INITIALIZATION =====
function initLanguageToggle() {
    const languageBtn = document.getElementById('language-btn');
    const currentLangSpan = document.getElementById('current-lang');
    
    if (!languageBtn || !currentLangSpan) {
        console.warn('Language toggle elements not found');
        return;
    }
    
    // Update button text
    updateLanguageButton();
    
    // Add click event listener
    languageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleLanguage();
    });
    
    // Add keyboard support
    languageBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLanguage();
        }
    });
}

// ===== LANGUAGE TOGGLE FUNCTION =====
function toggleLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'mr' : 'en';
    setLanguage(newLanguage);
    
    // Save preference
    localStorage.setItem('kisanbox-language', newLanguage);
    
    // Analytics (if available)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            'new_language': newLanguage,
            'previous_language': currentLanguage
        });
    }
}

// ===== SET LANGUAGE FUNCTION =====
function setLanguage(lang) {
    if (!languages[lang]) {
        console.error('Language not supported:', lang);
        return;
    }
    
    currentLanguage = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update direction if needed (for future RTL support)
    document.documentElement.dir = languages[lang].direction;
    
    // Add language class to body
    document.body.className = document.body.className.replace(/\blang-\w+\b/g, '');
    document.body.classList.add(`lang-${lang}`);
    
    // Update all translatable elements
    updateTranslatableElements();
    
    // Update language button
    updateLanguageButton();
    
    // Update form placeholders
    updatePlaceholders();
    
    // Update page title
    updatePageTitle();
    
    // Trigger custom event for other components
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang, previousLanguage: currentLanguage }
    }));
}

// ===== UPDATE TRANSLATABLE ELEMENTS =====
function updateTranslatableElements() {
    const elements = document.querySelectorAll('[data-en], [data-mr]');
    
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${currentLanguage}`);
        
        if (translation) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
            
            // Update aria-label if present
            const ariaLabel = element.getAttribute(`data-aria-${currentLanguage}`);
            if (ariaLabel) {
                element.setAttribute('aria-label', ariaLabel);
            }
        }
    });
}

// ===== UPDATE LANGUAGE BUTTON =====
function updateLanguageButton() {
    const currentLangSpan = document.getElementById('current-lang');
    const languageBtn = document.getElementById('language-btn');
    
    if (currentLangSpan) {
        currentLangSpan.textContent = languages[currentLanguage].name;
    }
    
    if (languageBtn) {
        const otherLang = currentLanguage === 'en' ? 'mr' : 'en';
        languageBtn.setAttribute('aria-label', 
            `Switch to ${languages[otherLang].name}`
        );
        languageBtn.setAttribute('title', 
            `Switch to ${languages[otherLang].name}`
        );
    }
}

// ===== UPDATE PLACEHOLDERS =====
function updatePlaceholders() {
    const elementsWithPlaceholders = document.querySelectorAll('[data-placeholder-en], [data-placeholder-mr]');
    
    elementsWithPlaceholders.forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
}

// ===== UPDATE PAGE TITLE =====
function updatePageTitle() {
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const enTitle = titleElement.getAttribute('data-en') || titleElement.textContent;
        const mrTitle = titleElement.getAttribute('data-mr') || titleElement.textContent;
        
        if (currentLanguage === 'mr' && mrTitle) {
            titleElement.textContent = mrTitle;
        } else if (currentLanguage === 'en' && enTitle) {
            titleElement.textContent = enTitle;
        }
    }
}

// ===== LANGUAGE DETECTION =====
function detectUserLanguage() {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && languages[langParam]) {
        return langParam;
    }
    
    // Check localStorage
    const savedLang = localStorage.getItem('kisanbox-language');
    if (savedLang && languages[savedLang]) {
        return savedLang;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
        const langCode = browserLang.substring(0, 2);
        if (languages[langCode]) {
            return langCode;
        }
        
        // Check for Marathi variants
        if (browserLang.includes('mr') || browserLang.includes('marathi')) {
            return 'mr';
        }
    }
    
    // Default to English
    return 'en';
}

// ===== FONT LOADING FOR MARATHI =====
function loadMarathiFonts() {
    if ('fonts' in document) {
        // Load Noto Sans Devanagari font
        const font = new FontFace('Noto Sans Devanagari', 
            'url(https://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bj6wRbzxTFMX40kFQRx0_05U.woff2)'
        );
        
        font.load().then(function(loadedFont) {
            document.fonts.add(loadedFont);
        }).catch(function(error) {
            console.warn('Failed to load Marathi font:', error);
        });
    }
}

// ===== URL UPDATE FOR LANGUAGE =====
function updateURLForLanguage(lang) {
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
}

// ===== FORM SUBMISSION LANGUAGE HANDLING =====
function handleFormLanguage() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add hidden language input
        const langInput = document.createElement('input');
        langInput.type = 'hidden';
        langInput.name = 'language';
        langInput.value = currentLanguage;
        form.appendChild(langInput);
        
        // Update language input on language change
        document.addEventListener('languageChanged', function(e) {
            langInput.value = e.detail.language;
        });
    });
}

// ===== DYNAMIC CONTENT LOADING =====
async function loadLanguageContent(lang, section) {
    try {
        const response = await fetch(`./data/lang/${lang}/${section}.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.warn(`Failed to load ${lang} content for ${section}:`, error);
    }
    return null;
}

// ===== LANGUAGE SWITCHER ANIMATION =====
function animateLanguageSwitch() {
    const body = document.body;
    
    // Add switching class for animation
    body.classList.add('language-switching');
    
    // Remove class after animation
    setTimeout(() => {
        body.classList.remove('language-switching');
    }, 300);
}

// ===== ACCESSIBILITY FOR LANGUAGE TOGGLE =====
function announceLanguageChange(newLang) {
    // Create announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    
    const message = newLang === 'mr' 
        ? 'भाषा मराठीमध्ये बदलली'
        : 'Language changed to English';
    
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== ENHANCED TOGGLE WITH ANIMATION =====
function enhancedToggleLanguage() {
    // Add loading state
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn) {
        languageBtn.disabled = true;
        languageBtn.style.opacity = '0.7';
    }
    
    // Animate switch
    animateLanguageSwitch();
    
    // Toggle language
    const newLanguage = currentLanguage === 'en' ? 'mr' : 'en';
    
    setTimeout(() => {
        setLanguage(newLanguage);
        announceLanguageChange(newLanguage);
        
        // Re-enable button
        if (languageBtn) {
            languageBtn.disabled = false;
            languageBtn.style.opacity = '1';
        }
    }, 150);
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Detect and set initial language
    const detectedLang = detectUserLanguage();
    if (detectedLang !== currentLanguage) {
        currentLanguage = detectedLang;
    }
    
    // Load Marathi fonts if needed
    if (currentLanguage === 'mr') {
        loadMarathiFonts();
    }
    
    // Handle forms
    handleFormLanguage();
    
    // Set initial language
    setLanguage(currentLanguage);
});

// ===== CSS FOR LANGUAGE SWITCHING ANIMATION =====
const languageStyles = document.createElement('style');
languageStyles.textContent = `
    .language-switching {
        transition: opacity 0.3s ease;
    }
    
    .language-switching * {
        transition: all 0.2s ease;
    }
    
    /* Language-specific font adjustments */
    .lang-mr {
        font-family: 'Noto Sans Devanagari', sans-serif;
    }
    
    .lang-mr .logo h2,
    .lang-mr .hero-content h1,
    .lang-mr h1, .lang-mr h2, .lang-mr h3 {
        font-weight: 600;
        letter-spacing: 0.02em;
    }
    
    .lang-mr .btn {
        font-weight: 500;
    }
    
    /* Improved readability for Marathi text */
    .lang-mr p, .lang-mr li, .lang-mr span {
        line-height: 1.7;
    }
    
    /* Language toggle button styles */
    #language-btn {
        transition: all 0.3s ease;
        position: relative;
    }
    
    #language-btn:hover {
        transform: scale(1.05);
    }
    
    #language-btn:disabled {
        cursor: not-allowed;
        transform: none !important;
    }
    
    /* Loading indicator for language switch */
    .language-switching #language-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 8px;
        width: 12px;
        height: 12px;
        margin-top: -6px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: rgba(255,255,255,0.8);
        animation: languageSpinner 0.8s linear infinite;
    }
    
    @keyframes languageSpinner {
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(languageStyles);

// ===== EXPORT FOR TESTING =====
if (typeof window !== 'undefined') {
    window.KisanBoxLanguage = {
        setLanguage,
        toggleLanguage: enhancedToggleLanguage,
        getCurrentLanguage: () => currentLanguage,
        getSupportedLanguages: () => Object.keys(languages)
    };
}

// ===== MODULE EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setLanguage,
        toggleLanguage: enhancedToggleLanguage,
        getCurrentLanguage: () => currentLanguage,
        languages
    };
}