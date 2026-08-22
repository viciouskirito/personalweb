(function () {
    'use strict';

    document.documentElement.classList.add('js');

    document.addEventListener('DOMContentLoaded', function () {
        initHeader();
        initNavigation();
        initRevealAnimations();
        initCopyInteractions();
        initPointerGlow();
        initScrollProgress();
        initYear();
    });

    function initHeader() {
        var header = document.querySelector('.site-header');
        if (!header) return;

        function updateHeader() {
            header.classList.toggle('is-scrolled', window.scrollY > 24);
        }

        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    function initNavigation() {
        var nav = document.querySelector('.primary-nav');
        var toggle = document.querySelector('.menu-toggle');
        var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
        var sections = Array.prototype.slice.call(document.querySelectorAll('.page-section[id]'));

        if (toggle && nav) {
            toggle.addEventListener('click', function () {
                var isOpen = nav.classList.toggle('is-open');
                toggle.classList.toggle('is-open', isOpen);
                toggle.setAttribute('aria-expanded', String(isOpen));
                toggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
            });
        }

        links.forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        if ('IntersectionObserver' in window && sections.length) {
            var sectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) setActiveLink(entry.target.id);
                });
            }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });

            sections.forEach(function (section) { sectionObserver.observe(section); });
        }

        if (window.location.hash) setActiveLink(window.location.hash.slice(1));
        window.addEventListener('hashchange', function () {
            if (window.location.hash) setActiveLink(window.location.hash.slice(1));
        });

        function setActiveLink(id) {
            links.forEach(function (link) {
                var active = link.getAttribute('href') === '#' + id;
                link.classList.toggle('is-active', active);
                if (active) link.setAttribute('aria-current', 'page');
                else link.removeAttribute('aria-current');
            });
        }

        function closeMenu() {
            if (!nav || !toggle) return;
            nav.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', '打开导航菜单');
        }
    }

    function initRevealAnimations() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
        if (!elements.length) return;

        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            elements.forEach(function (element) { element.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -55px' });

        elements.forEach(function (element) { observer.observe(element); });
    }

    function initCopyInteractions() {
        var items = Array.prototype.slice.call(document.querySelectorAll('.contact-copy-item'));
        var toast = document.querySelector('.copy-toast');
        if (!items.length || !toast) return;

        var toastTimer;
        items.forEach(function (item) {
            function copy() {
                var text = item.getAttribute('data-copy-text') || '';
                var label = item.getAttribute('data-copy-label') || '内容';
                copyToClipboard(text).then(function (copied) {
                    toast.textContent = copied ? label + '已复制到剪贴板' : label + '复制失败，请手动复制';
                    toast.classList.add('is-visible');
                    window.clearTimeout(toastTimer);
                    toastTimer = window.setTimeout(function () { toast.classList.remove('is-visible'); }, 1900);
                });
            }

            item.addEventListener('click', copy);
            item.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    copy();
                }
            });
        });
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () { return fallbackCopy(text); });
        }
        return Promise.resolve(fallbackCopy(text));
    }

    function fallbackCopy(text) {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        var copied = false;
        try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
        document.body.removeChild(textArea);
        return copied;
    }

    function initPointerGlow() {
        var cards = Array.prototype.slice.call(document.querySelectorAll('.glow-card'));
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        cards.forEach(function (card) {
            card.addEventListener('pointermove', function (event) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--pointer-x', (event.clientX - rect.left) + 'px');
                card.style.setProperty('--pointer-y', (event.clientY - rect.top) + 'px');
            });
            card.addEventListener('pointerleave', function () {
                card.style.setProperty('--pointer-x', '50%');
                card.style.setProperty('--pointer-y', '50%');
            });
        });
    }

    function initScrollProgress() {
        var progressBar = document.querySelector('.scroll-progress span');
        if (!progressBar) return;

        var ticking = false;

        function updateProgress() {
            var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
            progressBar.style.width = (progress * 100).toFixed(2) + '%';
            ticking = false;
        }

        function requestProgressUpdate() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateProgress);
        }

        updateProgress();
        window.addEventListener('scroll', requestProgressUpdate, { passive: true });
        window.addEventListener('resize', requestProgressUpdate, { passive: true });
    }

    function initYear() {
        var year = document.querySelector('[data-year]');
        if (year) year.textContent = String(new Date().getFullYear());
    }
})();
