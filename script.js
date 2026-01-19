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
        },
        'release-start-afresh': {
            title: '1st Single "Start Afresh"',
            date: '2025年9月11日',
            type: 'release',
            tracks: [
                '1. Start Afresh',
                '2. Broken Wings',
                '3. Rage Against The Darkness'
            ],
            credits: [
                'Vo. MI-CO (from Candy Rain)',
                'Gt. タッカン',
                'Gt. TAKUMI',
                'Ba. 大ちゃん',
                'Ds. 福村 高志'
            ],
            streaming: 'Apple Music / Spotify / Amazon Music / YouTube Music / LINE MUSIC / AWA / レコチョク / dヒッツ'
        }
    };

    // Member data in Japanese
    const memberData = {
        'bass': {
            name: 'Ba. 大ちゃん',
            fullName: '大ちゃん',
            role: 'Bass',
            image: 'assets/images/member_vocal.png',
            bio: 'バンドを支える確かなベースライン。',
            bands: 'X',
            sns: ''
        },
        'guitar1': {
            name: 'Gt. タッカン',
            fullName: 'タッカン',
            role: 'Guitar',
            image: 'assets/images/member_drums.png',
            bio: 'パワフルなリフで観客を魅了するギタリスト。',
            bands: 'X',
            sns: ''
        },
        'vocal': {
            name: 'Vo. MI-CO',
            fullName: 'MI-CO',
            role: 'Vocal',
            image: 'assets/images/member_bass.png',
            bio: '圧倒的な歌唱力でバンドの顔として活躍。',
            bands: 'from Candy Rain',
            sns: ''
        },
        'guitar2': {
            name: 'Gt. TAKUMI',
            fullName: 'TAKUMI',
            role: 'Guitar',
            image: 'assets/images/member_guitar2.png',
            bio: 'テクニカルなプレイで楽曲に彩りを添える。',
            bands: 'from Candy Rain',
            sns: ''
        },
        'drums': {
            name: 'Ds. 福村 高志',
            fullName: '福村 高志',
            role: 'Drums',
            image: 'assets/images/member_guitar1.png',
            bio: 'バンドのリズムを刻む熟練ドラマー。',
            bands: 'RAJAS, X-Ray',
            sns: ''
        }
    };

    // Click event for member slices
    document.querySelectorAll('.member-slice').forEach(slice => {
        slice.addEventListener('click', function () {
            const memberId = this.getAttribute('data-member-id');
            const member = memberData[memberId];

            if (member) {
                modalImage.src = member.image;
                modalImage.alt = member.name;

                modalDetails.innerHTML = `
                    <h2>${member.name}</h2>
                    <div class="detail-section">
                        <span class="detail-label">パート</span>
                        <div class="detail-value">${member.role}</div>
                    </div>
                    
                    <div class="detail-section">
                        <span class="detail-label">プロフィール</span>
                        <div class="detail-value" style="font-size: 1.1rem; line-height: 1.8;">${member.bio}</div>
                    </div>
                    
                    ${member.bands && member.bands !== 'X' ? `
                    <div class="detail-section">
                        <span class="detail-label">主な経歴 / 所属バンド</span>
                        <div class="detail-value">${member.bands}</div>
                    </div>
                    ` : ''}
                    
                    ${member.sns ? `
                    <div class="detail-section">
                        <span class="detail-label">SNS</span>
                        <div class="detail-value"><a href="${member.sns}" target="_blank" style="color: var(--primary-red);">Link</a></div>
                    </div>
                    ` : ''}
                `;

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Click event for flyer images
    document.querySelectorAll('.clickable-flyer').forEach(img => {
        img.addEventListener('click', function () {
            const eventId = this.getAttribute('data-event-id');
            const event = eventData[eventId];

            if (event) {
                modalImage.src = this.src;
                modalImage.alt = this.alt;

                // Build details HTML based on type
                let detailsHTML = `
                    <h2>${event.title}</h2>
                    <div class="event-date">${event.date}</div>
                `;

                if (event.type === 'release') {
                    // Release details
                    detailsHTML += `
                        <div class="detail-section">
                            <span class="detail-label">収録曲</span>
                            <div class="detail-value">
                                ${event.tracks.map(track => `<div>${track}</div>`).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <span class="detail-label">メンバー</span>
                            <div class="detail-value">
                                ${event.credits.map(credit => `<div>${credit}</div>`).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <span class="detail-label">配信サービス</span>
                            <div class="detail-value" style="font-size: 0.95rem; line-height: 1.6;">${event.streaming}</div>
                        </div>
                    `;
                } else {
                    // Live event details
                    detailsHTML += `
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
                }

                modalDetails.innerHTML = detailsHTML;

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
