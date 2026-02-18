document.addEventListener('DOMContentLoaded', function() {
    // === HERO SLIDER LOGIC ===
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showNextSlide() {
        if(slides.length > 0) {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }
    }

    // Initialize slide timer if slides exist
    if(slides.length > 0) {
        setInterval(showNextSlide, 5000); // 5 seconds per slide
    }

    // === EXISTING MOBILE MENU TOGGLE ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a nav item
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            document.body.classList.remove('menu-open');
        });
    });
    
    // === LANGUAGE TOGGLE LOGIC ===
    const toggleLanguage = (container) => {
        const englishContent = container.querySelector('.english-content');
        const marathiContent = container.querySelector('.marathi-content');
        
        // Check if we're on mobile
        const isMobile = window.innerWidth <= 768;
        
        // Toggle visibility with appropriate effect based on device
        if (englishContent.classList.contains('hidden')) {
            if (isMobile) {
                marathiContent.classList.add('hidden');
                englishContent.classList.remove('hidden');
            } else {
                marathiContent.classList.add('hidden');
                setTimeout(() => {
                    englishContent.classList.remove('hidden');
                }, 500);
            }
        } else {
            if (isMobile) {
                englishContent.classList.add('hidden');
                marathiContent.classList.remove('hidden');
            } else {
                englishContent.classList.add('hidden');
                setTimeout(() => {
                    marathiContent.classList.remove('hidden');
                }, 500);
            }
        }
    };
    
    // Toggle language every 10 seconds
    const visionLanguageContainer = document.getElementById('vision-language-container');
    const missionLanguageContainer = document.getElementById('mission-language-container');
    
    if (visionLanguageContainer && missionLanguageContainer) {
        // Set interval for Vision
        setInterval(() => {
            toggleLanguage(visionLanguageContainer);
        }, 10000);
        
        // Set interval for Mission with 5 second offset
        setTimeout(() => {
            setInterval(() => {
                toggleLanguage(missionLanguageContainer);
            }, 10000);
        }, 5000);
    }
    
    // === TESTIMONIAL SLIDER ===
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    // Initialize testimonial slider
    function showTestimonial(index) {
        if(testimonialItems.length === 0) return;

        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate dot
        if(testimonialItems[index]) {
            testimonialItems[index].style.display = 'block';
            testimonialItems[index].style.animation = 'fadeIn 0.8s ease';
        }
        if(testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
    }
    
    // Show first testimonial initially
    showTestimonial(currentTestimonial);
    
    // Add click event to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto slide testimonials
    if(testimonialItems.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // === COUNTER ANIMATION ===
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Run counter animation when in viewport
    function runCounters() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = +counter.innerText;
                const count = 0;
                const inc = target / speed;
                
                const updateCount = () => {
                    const currentValue = +counter.innerText;
                    if (currentValue < target) {
                        counter.innerText = Math.ceil(currentValue + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            }
        });
    }
    
    // Run counters on scroll
    window.addEventListener('scroll', runCounters);
    
    // Initial run for counters
    runCounters();
    
    // === SMOOTH SCROLLING ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === HEADER SCROLL EFFECT ===
    const header = document.querySelector('#header');
    let scrollPosition = window.scrollY;
    
    window.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // === MOBILE MENU OVERLAY ===
    const addMenuOverlay = () => {
        // If overlay already exists, don't add another one
        if (document.querySelector('.menu-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            document.body.classList.remove('menu-open');
            overlay.remove();
        });
    };
    
    // Listen for menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (!navMenu.classList.contains('active')) {
                addMenuOverlay();
            } else {
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) overlay.remove();
            }
        });
    }
    
    // RazorPay Button - Direct Link
    const razorpayButton = document.getElementById('razorpay-button');
    if (razorpayButton) {
        razorpayButton.addEventListener('click', function(e) {
            // No need to prevent default since we want the link to work normally
        });
    }
});