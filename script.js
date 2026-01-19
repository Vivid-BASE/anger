document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple interaction for hero text glitch effect (optional enhancement)
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.textShadow = `
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ff0000,
                ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #0000ff
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '3px 3px 0 var(--primary-red)';
            }, 100);
        }, 3000);
    }
});
