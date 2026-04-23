document.addEventListener('DOMContentLoaded', () => {
    // --- EMERGENCY RESET v11.0 ---
    // Disabling all scroll-heavy observers and interactive logic.
    
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
        
        if (!timeEl && !statusEl) return;

        const now = new Date();
        const formatter = new Intl.DateTimeFormat([], {
            timeZone: 'America/Chicago',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        });
        
        try {
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
        } catch (e) {
            console.error("Status update failed", e);
        }
    };

    // --- COMING SOON TOAST ---
    const showComingSoon = (e) => {
        e.preventDefault();
        alert("DIGITAL CATALOG COMING SOON"); // Using native alert for 100% reliability in emergency mode
    };

    document.querySelectorAll('.matrix-card img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', showComingSoon);
    });

    updatePulseHUD();
    setInterval(updatePulseHUD, 60000);
});
