// Smooth Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate feature cards sequentially
                if (entry.target.classList.contains('features-grid')) {
                    const cards = entry.target.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            setTimeout(() => {
                                card.style.transition = 'all 0.6s ease-out';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 100);
                    });
                }
                
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-50px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s ease-out';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.features-grid, .timeline-item, .tech-content, .contact-content');
    animatedElements.forEach(element => observer.observe(element));

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        const starsBackground = document.querySelector('.stars-background');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (starsBackground) {
            starsBackground.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Connect Wallet button interaction
    const connectBtn = document.querySelector('.connect-btn');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            // Simulate wallet connection
            connectBtn.textContent = 'Connecting...';
            connectBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                connectBtn.textContent = '0x7a2f...3c4d';
                connectBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Create success ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: rgba(16, 185, 129, 0.6);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                connectBtn.style.position = 'relative';
                connectBtn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }, 2000);
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = contactForm.querySelector('.form-input');
            const submitBtn = contactForm.querySelector('.btn-primary');
            const email = emailInput.value;
            
            if (email) {
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed! ✓';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribe';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Add dynamic cursor glow effect
    let cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = (e.clientX - 150) + 'px';
        cursorGlow.style.top = (e.clientY - 150) + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    // Interactive floating cards in hero section
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1) rotate(5deg)';
            card.style.opacity = '0.4';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.opacity = '0.2';
        });
    });

    // Tech rings interaction
    const techRings = document.querySelectorAll('.tech-ring');
    
    techRings.forEach(ring => {
        ring.addEventListener('mouseenter', () => {
            ring.style.borderColor = 'rgba(14, 165, 233, 0.8)';
            ring.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.5)';
        });
        
        ring.addEventListener('mouseleave', () => {
            ring.style.borderColor = '';
            ring.style.boxShadow = '';
        });
    });

    // Add particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(14, 165, 233, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endY = -10;
        const duration = 5000 + Math.random() * 5000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0)', opacity: 0 },
            { transform: 'translateY(-50px)', opacity: 1, offset: 0.1 },
            { transform: `translateY(${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        animation.onfinish = () => particle.remove();
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0ea5e9, #7c3aed);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Add CSS keyframes for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 25, 41, 0.98);
            padding: 2rem;
            gap: 1rem;
            border-top: 1px solid rgba(14, 165, 233, 0.2);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translateY(8px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translateY(-8px);
        }
    `;
    document.head.appendChild(style);

    // Initialize all animations
    console.log('🚀 Seminator Web3 Landing Page Initialized');
    console.log('✨ All animations and interactions are active');
});

// Add smooth reveal animation for sections
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});
