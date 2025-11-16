// ===== Language Switcher =====
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || this.detectLanguage();
        this.init();
    }

    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('ja') ? 'ja' : 'en';
    }

    init() {
        this.setLanguage(this.currentLang);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update text content
        document.querySelectorAll('[data-en][data-ja]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Check if element is an input/textarea
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }
}

// ===== Scroll Animations =====
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addScrollEffects();
    }

    observeElements() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        // Observe all fade-in-scroll elements
        document.querySelectorAll('.fade-in-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    addScrollEffects() {
        let lastScroll = 0;
        const languageSwitcher = document.querySelector('.language-switcher');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Hide/show language switcher on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                languageSwitcher.style.transform = 'translateY(-100px)';
                languageSwitcher.style.opacity = '0';
            } else {
                languageSwitcher.style.transform = 'translateY(0)';
                languageSwitcher.style.opacity = '1';
            }

            lastScroll = currentScroll;
        });
    }
}

// ===== Smooth Scroll =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== Code Block Copy Functionality =====
class CodeBlockCopy {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.code-block, .code-block-large').forEach(block => {
            const copyButton = this.createCopyButton();
            block.style.position = 'relative';
            block.appendChild(copyButton);

            copyButton.addEventListener('click', () => {
                this.copyCode(block, copyButton);
            });
        });
    }

    createCopyButton() {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
        button.setAttribute('aria-label', 'Copy code');
        return button;
    }

    copyCode(block, button) {
        const code = block.querySelector('code') || block;
        const text = code.textContent;

        navigator.clipboard.writeText(text).then(() => {
            button.classList.add('copied');
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;

            setTimeout(() => {
                button.classList.remove('copied');
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                        <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" stroke-width="2"/>
                    </svg>
                `;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// ===== Parallax Effect =====
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroIcon = document.querySelector('.hero-icon');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;

            if (heroIcon && scrolled < window.innerHeight) {
                heroIcon.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// ===== Add Copy Button Styles =====
function addCopyButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.5rem;
            background: rgba(133, 77, 44, 0.1);
            border: 1px solid rgba(133, 77, 44, 0.2);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: var(--ink-brown);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .copy-btn:hover {
            background: var(--ink-brown);
            color: var(--paper-bg);
            transform: scale(1.1);
        }

        .copy-btn.copied {
            background: #4CAF50;
            color: white;
            border-color: #4CAF50;
        }

        .code-block,
        .code-block-large {
            position: relative;
        }

        .language-switcher {
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== Performance Optimization =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadResources() {
        // Preload fonts
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        ];

        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = font;
            document.head.appendChild(link);
        });
    }
}

// ===== Easter Egg: Konami Code =====
class KonamiCode {
    constructor() {
        this.keys = [];
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.keys.push(e.key);
            this.keys.splice(-this.konamiCode.length - 1, this.keys.length - this.konamiCode.length);

            if (this.keys.join('').includes(this.konamiCode.join(''))) {
                this.activateEasterEgg();
            }
        });
    }

    activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s infinite';
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
}

// ===== Initialize All Components =====
document.addEventListener('DOMContentLoaded', () => {
    // Add copy button styles
    addCopyButtonStyles();

    // Initialize components
    new LanguageSwitcher();
    new ScrollAnimations();
    new SmoothScroll();
    new CodeBlockCopy();
    new ParallaxEffect();
    new PerformanceOptimizer();
    new KonamiCode();

    // Add loading animation
    document.body.classList.add('loaded');

    // Analytics (placeholder)
    console.log('Paper Notebook Light theme landing page loaded successfully!');
});

// ===== Service Worker Registration (for PWA support) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you create a service worker
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('ServiceWorker registered:', registration);
        // }).catch(error => {
        //     console.log('ServiceWorker registration failed:', error);
        // });
    });
}

// ===== Export for module usage =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageSwitcher,
        ScrollAnimations,
        SmoothScroll,
        CodeBlockCopy,
        ParallaxEffect,
        PerformanceOptimizer
    };
}
