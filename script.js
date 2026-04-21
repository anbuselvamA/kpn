document.addEventListener("DOMContentLoaded", () => {
    // 1. Particle System
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const colors = ['#22C55E', '#F0B429'];
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 2 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 15 + 10; // 10 to 25s
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.15 + 0.1;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.left = `${left}vw`;
            particle.style.top = `${top}vh`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // 2. Scroll Reveal via IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');

    if (mobileMenuBtn && mobileNav && mobileNavClose) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
    }

    // 4. Booking Form WhatsApp Submission
    const mainForm = document.getElementById('mainBookingForm');
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fname').value;
            // Get date and slot text
            const dateInput = document.getElementById('fdate');
            const dateVal = dateInput.value;
            const dateStr = dateVal ? new Date(dateVal).toLocaleDateString('en-GB') : '';

            const slot = document.getElementById('fslot').value;
            const duration = document.getElementById('fduration').value;
            const players = document.getElementById('fplayers').value;
            const format = document.getElementById('fformat').value;
            const req = document.getElementById('freq').value;
            
            let message = `Hi KPN Turf!🏏\n\nI'd like to book a slot.\n\n*Name:* ${name}\n*Date:* ${dateStr}\n*Slot:* ${slot}\n*Duration:* ${duration}\n*Players:* ${players}\n*Format:* ${format}`;
            if (req) {
                message += `\n*Special Requests:* ${req}`;
            }

            const phone = "919876543210";
            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
        });
    }

    // 5. Quick Booking Strip WhatsApp Submission
    const qbForm = document.getElementById('qb-form');
    if (qbForm) {
        qbForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = qbForm.querySelectorAll('.qb-input');
            const dateVal = inputs[0].value;
            const slot = inputs[1].value;
            const duration = inputs[2].value;
            const dateStr = dateVal ? new Date(dateVal).toLocaleDateString('en-GB') : '';

            let message = `Hi KPN Turf!🏏\n\nChecking availability for:\n*Date:* ${dateStr}\n*Time Slot:* ${slot}\n*Duration:* ${duration}`;

            const phone = "919876543210";
            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
        });
    }
});
