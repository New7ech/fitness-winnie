const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.body.classList.add('js-ready');

const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.setAttribute('aria-hidden', 'true');
document.body.prepend(scrollProgress);

function updateScrollState() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;

    scrollProgress.style.transform = `scaleX(${ratio})`;
    document.body.classList.toggle('is-scrolled', window.scrollY > 24);
    root.style.setProperty('--scroll-ratio', ratio.toFixed(4));
}

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });

if (menuToggle && mobileMenu) {
    const closeMenu = () => {
        mobileMenu.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

        mobileMenu.hidden = isOpen;
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}

const heroSlides = Array.from(document.querySelectorAll('[data-hero-slide]'));
const slideDots = Array.from(document.querySelectorAll('[data-slide-dot]'));
const slidePrev = document.querySelector('[data-slide-prev]');
const slideNext = document.querySelector('[data-slide-next]');
let activeSlide = heroSlides.findIndex((slide) => slide.classList.contains('active'));
let slideTimer = null;

if (heroSlides.length > 1) {
    activeSlide = activeSlide >= 0 ? activeSlide : 0;

    const showSlide = (index) => {
        activeSlide = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === activeSlide);
        });

        slideDots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === activeSlide);
        });

        document.body.style.setProperty('--active-slide', activeSlide);
    };

    const restartSlider = () => {
        window.clearInterval(slideTimer);
        slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 4500);
    };

    slidePrev?.addEventListener('click', () => {
        showSlide(activeSlide - 1);
        restartSlider();
    });

    slideNext?.addEventListener('click', () => {
        showSlide(activeSlide + 1);
        restartSlider();
    });

    slideDots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => {
            showSlide(dotIndex);
            restartSlider();
        });
    });

    if (!reduceMotion) {
        restartSlider();
    }
}

const revealTargets = document.querySelectorAll([
    '.section-title',
    '.category-card',
    '.promo-tile',
    '.product-card',
    '.featured-strip',
    '.objective-card',
    '.mini-product',
    '.center-ad',
    '.article-grid article',
    '.request-copy',
    '.request-panel',
    '.request-steps span',
    '.logo-cloud span',
    '.movement-grid img',
    '.shop-footer > div',
    '.admin-heading',
    '.admin-stats article',
    '.admin-filters',
    '.admin-request-card',
    '.admin-login-panel',
].join(','));

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, entryObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entryObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.16,
    });

    revealTargets.forEach((target, index) => {
        target.classList.add('reveal-item');
        target.style.setProperty('--reveal-delay', `${Math.min(index % 8, 7) * 55}ms`);
        observer.observe(target);
    });
} else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const tiltTargets = document.querySelectorAll('.product-card, .category-card, .promo-tile, .objective-card, .article-grid article');

if (!reduceMotion) {
    tiltTargets.forEach((target) => {
        target.addEventListener('pointermove', (event) => {
            const bounds = target.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

            target.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
            target.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
            target.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
            target.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
            target.classList.add('is-tilting');
        });

        target.addEventListener('pointerleave', () => {
            target.classList.remove('is-tilting');
            target.style.removeProperty('--tilt-x');
            target.style.removeProperty('--tilt-y');
        });
    });
}

document.querySelectorAll('.button, .slider-cta, .category-nav a, .header-actions a, .icon-button, .product-action').forEach((button) => {
    button.addEventListener('click', (event) => {
        const ripple = document.createElement('span');
        const bounds = button.getBoundingClientRect();
        const size = Math.max(bounds.width, bounds.height);

        ripple.className = 'interaction-ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - bounds.left - size / 2}px`;
        ripple.style.top = `${event.clientY - bounds.top - size / 2}px`;
        button.append(ripple);
        window.setTimeout(() => ripple.remove(), 620);
    });
});

const hero = document.querySelector('.hero-shop');

if (hero && !reduceMotion) {
    hero.addEventListener('pointermove', (event) => {
        const bounds = hero.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        hero.style.setProperty('--hero-x', `${(x * 10).toFixed(2)}px`);
        hero.style.setProperty('--hero-y', `${(y * 7).toFixed(2)}px`);
    });

    hero.addEventListener('pointerleave', () => {
        hero.style.setProperty('--hero-x', '0px');
        hero.style.setProperty('--hero-y', '0px');
    });
}

const toast = document.createElement('div');
toast.className = 'site-toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.append(toast);
let toastTimer = null;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

document.querySelectorAll('[data-copy-contact]').forEach((button) => {
    button.addEventListener('click', async () => {
        const contact = button.dataset.copyContact || '';

        if (!contact) {
            return;
        }

        try {
            await navigator.clipboard.writeText(contact);
            showToast('Contact copie');
        } catch {
            showToast(contact);
        }
    });
});

document.querySelectorAll('[data-notify-template]').forEach((button) => {
    button.addEventListener('click', () => {
        const form = button.closest('.admin-notify-form');
        const subject = form?.querySelector('[name="subject"]');
        const message = form?.querySelector('[name="message"]');

        if (!form || !subject || !message) {
            return;
        }

        subject.value = button.dataset.templateSubject || subject.value;
        message.value = button.dataset.templateMessage || message.value;
        subject.dispatchEvent(new Event('input', { bubbles: true }));
        message.dispatchEvent(new Event('input', { bubbles: true }));
        showToast('Modele insere');
    });
});

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form input');
const serviceCards = Array.from(document.querySelectorAll('[data-product-card]'));
const firstServiceGrid = document.querySelector('.product-grid');
const emptyState = document.createElement('div');

emptyState.className = 'search-empty-state';
emptyState.textContent = 'Aucun service ne correspond a cette recherche.';
firstServiceGrid?.append(emptyState);

function filterServices() {
    const query = searchInput?.value.trim().toLowerCase() || '';
    let visibleCount = 0;

    serviceCards.forEach((card) => {
        const serviceName = (card.dataset.productName || '').toLowerCase();
        const isVisible = query.length === 0 || serviceName.includes(query);

        card.classList.toggle('is-filtered-out', !isVisible);

        if (isVisible) {
            visibleCount += 1;
        }
    });

    document.body.classList.toggle('is-searching', query.length > 0);
    emptyState.classList.toggle('is-visible', query.length > 0 && visibleCount === 0);
}

searchInput?.addEventListener('input', filterServices);
searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    filterServices();
    serviceCards.find((card) => !card.classList.contains('is-filtered-out'))?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'center',
    });
});

const requestSection = document.querySelector('.request-section');
const requestForm = document.querySelector('.request-form');

if (requestSection && requestForm) {
    const requestType = requestForm.querySelector('select[name="type"]');
    const submitButton = requestForm.querySelector('button[type="submit"]');
    const fieldStateUpdaters = [];

    Array.from(requestForm.querySelectorAll('input, select, textarea')).forEach((field) => {
        const label = field.closest('label');

        if (!label) {
            return;
        }

        label.dataset.field = field.name;

        const updateFilledState = () => {
            label.classList.toggle('is-filled', field.value.trim().length > 0);
        };

        fieldStateUpdaters.push(updateFilledState);
        field.addEventListener('focus', () => label.classList.add('is-active'));
        field.addEventListener('blur', () => label.classList.remove('is-active'));
        field.addEventListener('input', updateFilledState);
        field.addEventListener('change', updateFilledState);
        updateFilledState();
    });

    const updateRequestType = () => {
        const value = requestType?.value || 'question';
        const isReservation = value === 'reservation';
        const service = requestForm.querySelector('[name="service"]');
        const date = requestForm.querySelector('[name="preferred_date"]');
        const message = requestForm.querySelector('[name="message"]');

        requestSection.classList.toggle('is-reservation', isReservation);
        service?.toggleAttribute('required', isReservation);
        date?.toggleAttribute('required', isReservation);
        message?.toggleAttribute('required', !isReservation);
        service?.setAttribute('aria-required', String(isReservation));
        date?.setAttribute('aria-required', String(isReservation));
        message?.setAttribute('aria-required', String(!isReservation));

        if (submitButton) {
            submitButton.textContent = isReservation
                ? 'Reserver un creneau'
                : value === 'quote'
                    ? 'Demander un devis'
                    : value === 'plan'
                        ? 'Demander un plan'
                        : 'Envoyer la demande';
        }
    };

    requestType?.addEventListener('change', updateRequestType);
    requestForm.addEventListener('reset', () => {
        window.setTimeout(() => {
            fieldStateUpdaters.forEach((updateFilledState) => updateFilledState());
            updateRequestType();
        }, 0);
    });
    updateRequestType();
}
