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

    // Image Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDetails = document.getElementById('modalDetails');
    const modalClose = document.querySelector('.modal-close');

    // Event data in Japanese
    const eventData = {
        'live-20260301': {
            title: 'LOUD&PROUD vol.455',
            date: '2026年3月1日（土）',
            venue: 'CRESCENDO',
            open: '16:30',
            start: '17:00',
            adv: '¥2,500',
            door: '¥3,000',
            lineup: 'ETERNAL GROUND / TRASH GANG feat. Shigeru / <span class="lineup-highlight">ANGER MANAGEMENT</span> / THUNDERWARRIOR / Dancing Brave',
            tickets: 'チケット料金: Web予約 → バンド予約 → 当日券の順'
        }
    };

    // Click event for flyer images
    document.querySelectorAll('.clickable-flyer').forEach(img => {
        img.addEventListener('click', function () {
            const eventId = this.getAttribute('data-event-id');
            const event = eventData[eventId];

            if (event) {
                modalImage.src = this.src;
                modalImage.alt = this.alt;

                // Build details HTML in Japanese
                modalDetails.innerHTML = `
                    <h2>${event.title}</h2>
                    <div class="event-date">${event.date}</div>
                    
                    <div class="detail-section">
                        <span class="detail-label">会場</span>
                        <div class="detail-value">${event.venue}</div>
                    </div>
                    
                    <div class="detail-section">
                        <span class="detail-label">時間</span>
                        <div class="detail-value">開場 ${event.open} / 開演 ${event.start}</div>
                    </div>
                    
                    <div class="detail-section">
                        <span class="detail-label">料金</span>
                        <div class="detail-value">前売 ${event.adv} / 当日 ${event.door}</div>
                    </div>
                    
                    <div class="detail-section">
                        <span class="detail-label">出演</span>
                        <div class="detail-value">${event.lineup}</div>
                    </div>
                    
                    <div class="detail-section">
                        <div class="detail-value" style="font-size: 0.9rem; color: var(--text-muted);">${event.tickets}</div>
                    </div>
                `;

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
