document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile menu when links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================================================
    // HERO SLIDER CONTROLS
    // ==========================================================================
    const slidesBgs = document.querySelectorAll('.slide-bg');
    const slidesContent = document.querySelectorAll('.slide-content');
    const currentSlideNum = document.getElementById('current-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    let currentIdx = 0;
    const totalSlides = slidesBgs.length;
    let autoplayInterval;

    function showSlide(index) {
        // Wrap index around boundaries
        if (index >= totalSlides) {
            currentIdx = 0;
        } else if (index < 0) {
            currentIdx = totalSlides - 1;
        } else {
            currentIdx = index;
        }

        // Update Backgrounds
        slidesBgs.forEach((bg, idx) => {
            bg.classList.toggle('active', idx === currentIdx);
        });

        // Update Text Content
        slidesContent.forEach((content, idx) => {
            content.classList.toggle('active', idx === currentIdx);
        });

        // Update Sidebar Slide Index Number (e.g. 01, 02)
        if (currentSlideNum) {
            currentSlideNum.textContent = String(currentIdx + 1).padStart(2, '0');
        }
    }

    function nextSlide() {
        showSlide(currentIdx + 1);
    }

    function prevSlide() {
        showSlide(currentIdx - 1);
    }

    // Attach Event Listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    // Autoplay configuration (8 seconds)
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 8000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Initialize Autoplay
    startAutoplay();

    // ==========================================================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================================================
    // Target sections and components for smooth fade-in entry
    const revealTargets = [
        document.querySelector('.about-col-title'),
        document.querySelector('.about-col-main'),
        document.querySelector('.about-col-services'),
        document.querySelector('.projects-header'),
        ...document.querySelectorAll('.project-column-card'),
        ...document.querySelectorAll('.footer-main-grid > div')
    ];

    // Set initial classes programmatically to keep markup clean
    revealTargets.forEach(el => {
        if (el) {
            el.classList.add('reveal-item');
        }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
    });

    revealTargets.forEach(target => {
        if (target) {
            revealObserver.observe(target);
        }
    });

    // ==========================================================================
    // LOGO 3D TILT EFFECT (DESKTOP ONLY)
    // ==========================================================================
    const logoContainer = document.getElementById('logo-container');
    if (logoContainer && !window.matchMedia("(pointer: coarse)").matches) {
        logoContainer.addEventListener('mousemove', (e) => {
            const rect = logoContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            // Calculate tilt angle (-8 to 8 degrees for subtle luxury effect)
            const angleX = (yc - y) / 3;
            const angleY = (x - xc) / 3;
            
            logoContainer.style.transform = `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });
        
        logoContainer.addEventListener('mouseleave', () => {
            logoContainer.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
            logoContainer.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        logoContainer.addEventListener('mouseenter', () => {
            logoContainer.style.transition = 'transform 0.1s ease';
        });
    }
});
