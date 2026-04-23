document.addEventListener('DOMContentLoaded', () => {
    // --- FINAL STABILITY BUILD v11.1 ---
    
    // --- REVEAL ON SCROLL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // --- STORE STATUS ---
    const STORE_HOURS = {
        0: { open: 11, close: 19 }, 1: { open: 10, close: 21 }, 2: { open: 10, close: 21 }, 
        3: { open: 10, close: 21 }, 4: { open: 10, close: 21 }, 5: { open: 10, close: 22 }, 
        6: { open: 10, close: 22 }
    };

    const updatePulseHUD = () => {
        const timeEl = document.querySelector('.time-indicator b');
        const statusEl = document.querySelector('.status-indicator b');
        if (!timeEl || !statusEl) return;

        const now = new Date();
        const formatter = new Intl.DateTimeFormat([], {
            timeZone: 'America/Chicago', hour: 'numeric', minute: 'numeric', hour12: false
        });
        
        try {
            const parts = formatter.formatToParts(now);
            const h = parseInt(parts.find(p => p.type === 'hour').value);
            const m = parts.find(p => p.type === 'minute').value;
            const todayHours = STORE_HOURS[now.getDay()];
            const isOpen = h >= todayHours.open && h < todayHours.close;
            
            timeEl.textContent = `${h}:${m}`;
            statusEl.textContent = isOpen ? `OPEN` : `CLOSED`;
            statusEl.style.color = isOpen ? '#00ff00' : '#ff3b30';
        } catch (e) {}
    };

    // --- COMING SOON ---
    document.querySelectorAll('.matrix-card img').forEach(img => {
        img.addEventListener('click', () => alert("DIGITAL CATALOG COMING SOON"));
    });

    updatePulseHUD();
    setInterval(updatePulseHUD, 60000);
});
