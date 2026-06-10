/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    // ------------------------------------------------------------------
    // Revamp: Apple-style motion layer
    // ------------------------------------------------------------------
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // Scroll-reveal via IntersectionObserver
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    // Animated count-up for stats
    const counters = document.querySelectorAll('[data-count]');
    const runCount = (el) => {
        const target = parseFloat(el.getAttribute('data-count')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        if (prefersReducedMotion) { el.textContent = target + suffix; return; }
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) { requestAnimationFrame(tick); }
        };
        requestAnimationFrame(tick);
    };
    if (counters.length) {
        if (!('IntersectionObserver' in window)) {
            counters.forEach(runCount);
        } else {
            const countObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { runCount(entry.target); obs.unobserve(entry.target); }
                });
            }, { threshold: 0.6 });
            counters.forEach(el => countObserver.observe(el));
        }
    }

    // Scroll progress bar + hero parallax (rAF-throttled)
    const progress = document.getElementById('scrollProgress');
    const orbs = document.querySelectorAll('.masthead-orbs .orb');
    let ticking = false;
    const onScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (progress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }
        if (!prefersReducedMotion && orbs.length && scrollTop < window.innerHeight) {
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 0.06;
                orb.style.transform = 'translateY(' + (scrollTop * speed) + 'px)';
            });
        }
        ticking = false;
    };
    document.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

});