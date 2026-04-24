document.addEventListener('DOMContentLoaded', () => {
    // --- THE LUXURIOUS STANDARD v14.0 ---
    
    // 1. REVEAL OBSERVER
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. STORE STATUS HUD
    const STORE_HOURS = {
        0: { open: 11, close: 19 }, // Sun
        1: { open: 10, close: 21 }, // Mon
        2: { open: 10, close: 21 }, // Tue
        3: { open: 10, close: 21 }, // Wed
        4: { open: 10, close: 21 }, // Thu
        5: { open: 10, close: 22 }, // Fri
        6: { open: 10, close: 22 }  // Sat
    };

    const updateStatus = () => {
        const timeEl = document.querySelector('.time-indicator');
        const statusEl = document.querySelector('.status-indicator');
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

    // 3. CATALOG INTERACTION
    document.querySelectorAll('.matrix-item img, .magazine-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            alert("DIGITAL CATALOG COMING SOON");
        });
    });

    updateStatus();
    setInterval(updateStatus, 60000);
});
