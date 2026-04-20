document.addEventListener('DOMContentLoaded', () => {
    const magneticLogo = document.querySelector('.magnetic-logo');
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    // --- ARCHITECT RECOVERY v6 ---
    // Reverting to native scroll for 100% field reliability.
    // Logic below handles interactions only.

    // --- MAGNETIC LOGO INTERACTION ---
    if (magneticLogo) {
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
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        setTimeout(() => {
            follower.style.left = `${e.clientX - 20}px`;
            follower.style.top = `${e.clientY - 20}px`;
        }, 30);
    });

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

    // --- HUD LOGIC ---
    const updateHUD = () => {
        const timeElements = document.querySelectorAll('.ti-rt b');
        const now = new Date();
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        timeElements.forEach(el => el.textContent = `${h}:${m}`);
    };
    setInterval(updateHUD, 1000);
    updateHUD();
});
