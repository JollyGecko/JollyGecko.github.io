/* Main JS: smooth nav, section image swap, and nav highlight */
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.site-header');
        const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
        const sections = Array.from(document.querySelectorAll('.right section[id][data-image]'));
        const stickyImage = document.querySelector('.image-panel .sticky-image');

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            link.addEventListener('click', (ev) => {
                ev.preventDefault();
                const id = href.slice(1);
                const target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // IntersectionObserver to swap sticky image and update nav active state
        const captionEl = document.querySelector('.image-panel .image-caption');
        if (sections.length && stickyImage) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const sec = entry.target;
                    const id = sec.id;

                    // update nav active
                    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));

                    // swap image smoothly and update caption
                    const src = sec.dataset.image;
                    const caption = sec.dataset.caption || '';
                    if (captionEl) captionEl.textContent = caption;
                    if (src && stickyImage.getAttribute('src') !== src) {
                        stickyImage.classList.add('image-fade');
                        const img = new Image();
                        img.onload = () => {
                            stickyImage.setAttribute('src', src);
                            requestAnimationFrame(() => {
                                stickyImage.classList.remove('image-fade');
                                stickyImage.classList.add('image-highlight');
                                setTimeout(() => stickyImage.classList.remove('image-highlight'), 420);
                            });
                        };
                        img.src = src;
                    }
                });
            }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.35 });

            sections.forEach(s => observer.observe(s));

            // initial image and caption: prefer the first section's data-image/data-caption
            const initial = sections.find(Boolean);
            if (initial) {
                if (initial.dataset.image) stickyImage.setAttribute('src', initial.dataset.image);
                if (captionEl) captionEl.textContent = initial.dataset.caption || '';
            }
        }

        // header visual toggle on scroll
        const onScroll = () => {
            if (!header) return;
            header.classList.toggle('scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // Auto-adjust gradient length so the gradient spans the full document height
        const setGradientLength = () => {
            const docH = document.documentElement.scrollHeight || document.body.scrollHeight;
            const vh = window.innerHeight || document.documentElement.clientHeight || 768;
            let length = docH / vh;
            // clamp to sensible range
            if (!isFinite(length) || length <= 0) length = 1;
            // ensure at least 1 and round to 2 decimals for CSS niceness
            length = Math.max(1, Math.round(length * 100) / 100);
            document.documentElement.style.setProperty('--gradient-length', String(length));
        };

        // debounce helper
        let resizeTimer = null;
        const debouncedSet = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setGradientLength, 150);
        };

        // initial call and event listeners
        setGradientLength();
        window.addEventListener('resize', debouncedSet);
        // also update after images load since images change document height
        window.addEventListener('load', setGradientLength);
        // if images are added/changed dynamically, MutationObserver could be added later
    });
})();
