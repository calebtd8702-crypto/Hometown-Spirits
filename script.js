document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scroll-container');
    const mainWrapper = document.querySelector('.main-wrapper');
    const magneticLogo = document.querySelector('.magnetic-logo');
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    // --- ARCHITECT SCROLL ENGINE v4 ---
    let current = 0;
    let target = 0;
    let ease = 0.085; // Pure Silk

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    function updateScroll() {
        target = window.scrollY;
        current = lerp(current, target, ease);
        
        if (scrollContainer) {
            scrollContainer.style.transform = `translate3d(0, ${-current}px, 0)`;
        }
        
        requestAnimationFrame(updateScroll);
    }

    const setSize = () => {
        document.body.style.height = `${scrollContainer.getBoundingClientRect().height}px`;
    }

    window.addEventListener('resize', setSize);
    setTimeout(setSize, 500); // Initial calculation delay for assets
    
    requestAnimationFrame(updateScroll);

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
        // Dot movement
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Follower movement (slightly delayed)
        setTimeout(() => {
            follower.style.left = `${e.clientX - 20}px`;
            follower.style.top = `${e.clientY - 20}px`;
        }, 30);
    });

    // Cursor hover states
    const hoverLinks = document.querySelectorAll('.matrix-card, .glass-panel, h2');
    hoverLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.width = '80px';
            follower.style.height = '80px';
            follower.style.left = `${parseFloat(follower.style.left) - 20}px`;
            follower.style.top = `${parseFloat(follower.style.top) - 20}px`;
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
    }, { threshold: 0.15 });

    revealItems.forEach(item => observer.observe(item));

    // --- HUD LOGIC ---
    const updateHUD = () => {
        const timeEl = document.querySelector('.ti-rt b');
        const now = new Date();
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        timeEl.textContent = `${h}:${m}`;
    };
    setInterval(updateHUD, 1000);
    updateHUD();

    window.onload = setSize;
});
