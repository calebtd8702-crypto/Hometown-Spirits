document.addEventListener('DOMContentLoaded', () => {
    const magneticLogo = document.querySelector('.magnetic-logo');
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    // --- ARCHITECT RECOVERY v6 ---
    // Reverting to native scroll for 100% field reliability.
    // Logic below handles interactions only.

    // --- INTERACTIVE SHUTDOWN (Mobile) ---
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
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

    // --- CUSTOM CURSOR v4 ---
    if (!isTouch) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                follower.style.left = `${e.clientX - 20}px`;
                follower.style.top = `${e.clientY - 20}px`;
            }, 30);
        });
    }

    const hoverLinks = document.querySelectorAll('.matrix-card, .glass-panel, h2');
    hoverLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.width = '80px';
            follower.style.height = '80px';
            follower.style.background = 'rgba(212, 175, 55, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.background = 'transparent';
            follower.style.borderColor = 'var(--gold-muted)';
        });
    });

    // --- REVEAL OBSERVER ---
    const revealItems = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => observer.observe(item));

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
        const timeEl = document.querySelector('.ti-rt b');
        const statusEl = document.querySelector('.ti-lt b');
        
        // Accurate central time for Tiffin, IA
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
        const day = now.getUTCDay(); // Approximation, good for demo
        
        const todayHours = STORE_HOURS[day];
        const isOpen = h >= todayHours.open && h < todayHours.close;
        
        // Update Time
        if (timeEl) timeEl.textContent = `${h}:${m}`;
        
        // Update Status
        if (statusEl) {
            const statusText = isOpen ? `OPEN UNTIL ${todayHours.close > 12 ? todayHours.close - 12 : todayHours.close}PM` : `CLOSED - OPENS ${todayHours.open}AM`;
            const pulseColor = isOpen ? '#00ff00' : '#ff3b30';
            statusEl.innerHTML = `<span class="pulse-dot" style="background: ${pulseColor}"></span> ${statusText}`;
        }
    };

    setInterval(updatePulseHUD, 1000);
    updatePulseHUD();

    // Native scroll is primary. No additional logic needed for scrolling.
});
