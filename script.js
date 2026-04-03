// Spotlight effect
document.addEventListener('mousemove', e => {
    document.body.style.backgroundImage = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(216, 104, 109, 0.06), transparent 70%)`;
});

// Particles
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#d8686d' },
            opacity: { value: 0.45, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 0.6, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            events: { onhover: { enable: false }, onclick: { enable: false } }
        },
        retina_detect: true
    });
}

// GSAP page transitions
if (typeof gsap !== 'undefined') {
    const overlay = document.querySelector('.page-transition');
    if (overlay) {
        gsap.fromTo(overlay, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => overlay.style.pointerEvents = 'none' });

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    overlay.style.pointerEvents = 'all';
                    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.in', onComplete: () => window.location = href });
                });
            }
        });
    }
}

// VanillaTilt on project cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 2,
        speed: 600,
        glare: true,
        'max-glare': 0.04,
    });
}

// Typing animation (homepage only)
const roleEl = document.getElementById('roleText');

if (roleEl) {
    const roles = ['Data Analytics', 'Systems Analysis', 'Automation'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = roles[roleIndex];

        if (isDeleting) {
            roleEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 60 : 100;

        if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    type();
}

// Copy phone number
function copyPhone() {
    navigator.clipboard.writeText('303-501-2470').then(() => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
}

// Project expand toggle
function toggleExpand(btn) {
    const card = btn.closest('.project-card');
    const tags = card.querySelector('.project-tech');
    const content = card.querySelector('.project-expand-content');
    const isOpen = content.classList.contains('open');
    btn.classList.toggle('open', !isOpen);
    content.classList.toggle('open', !isOpen);
    tags.classList.toggle('hidden', !isOpen);
}


// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');

if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0) + 200;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    fadeEls.forEach(el => observer.observe(el));
}
