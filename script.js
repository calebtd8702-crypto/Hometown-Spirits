document.addEventListener('DOMContentLoaded', () => {
    // --- PERFORMANCE GUARD v8.8 ---
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    const magneticLogo = document.querySelector('.magnetic-logo');

    if (isTouch) {
        document.body.classList.add('is-touch');
        if (cursor) cursor.remove();
        if (follower) follower.remove();
    }

    // --- MAGNETIC LOGO INTERACTION ---
    if (magneticLogo && !isTouch) {
        magneticLogo.addEventListener('mousemove', (e) => {
            const bounds = magneticLogo.getBoundingClientRect();
            const x = e.clientX - bounds.left - bounds.width / 2;
            const y = e.clientY - bounds.top - bounds.height / 2;
            magneticLogo.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        magneticLogo.addEventListener('mouseleave', () => {
            magneticLogo.style.transform = `translate(0px, 0px)`;
        });
    }

    // --- CUSTOM CURSOR ---
    if (cursor && follower && !isTouch) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            setTimeout(() => {
                follower.style.left = `${e.clientX - 20}px`;
                follower.style.top = `${e.clientY - 20}px`;
            }, 30);
        });
        document.querySelectorAll('.matrix-card, .glass-panel, h2').forEach(link => {
            link.addEventListener('mouseenter', () => {
                follower.style.width = '80px';
                follower.style.height = '80px';
                follower.style.background = 'rgba(212, 175, 55, 0.1)';
            });
            link.addEventListener('mouseleave', () => {
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.background = 'transparent';
            });
        });
    }

    // --- REVEAL OBSERVER (Optimized) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (isTouch) revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: isTouch ? 0.05 : 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // --- COMING SOON TOAST v8.9 ---
    const showComingSoon = () => {
        const toast = document.createElement('div');
        toast.className = 'glass-panel reveal-up';
        toast.style.cssText = `
            position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);
            padding: 1rem 2rem; border: 1px solid var(--gold); background: var(--forest-deep);
            color: var(--gold); z-index: 10000; font-weight: 600; letter-spacing: 0.1rem;
            text-align: center; border-radius: 100px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        `;
        toast.textContent = "DIGITAL CATALOG COMING SOON";
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.bottom = '20px';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    document.querySelectorAll('.matrix-card img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', showComingSoon);
    });

    // --- TIFFIN PULSE: LIVE STORE STATUS ---
    const STORE_HOURS = {
        0: { open: 11, close: 19 }, // Sunday
        1: { open: 10, close: 21 }, // Monday
        2: { open: 10, close: 21 }, // Tuesday
        3: { open: 10, close: 21 }, // Wednesday
        4: { open: 10, close: 21 }, // Thursday
        5: { open: 10, close: 22 }, // Friday
        6: { open: 10, close: 22 }  // Saturday
    };

    const updatePulseHUD = () => {
        const timeEl = document.querySelector('.time-indicator b');
        const statusEl = document.querySelector('.status-indicator b');
        const now = new Date();
        const formatter = new Intl.DateTimeFormat([], {
            timeZone: 'America/Chicago',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        });
        const parts = formatter.formatToParts(now);
        const h = parseInt(parts.find(p => p.type === 'hour').value);
        const m = parts.find(p => p.type === 'minute').value;
        const todayHours = STORE_HOURS[now.getDay()];
        const isOpen = h >= todayHours.open && h < todayHours.close;
        
        if (timeEl) timeEl.textContent = `${h}:${m}`;
        if (statusEl) {
            statusEl.textContent = isOpen ? `OPEN` : `CLOSED`;
            statusEl.style.color = isOpen ? '#00ff00' : '#ff3b30';
        }
    };

    updatePulseHUD();
    setInterval(updatePulseHUD, 60000);
});
