document.addEventListener('DOMContentLoaded', () => {

    const trendingSongs = [
        {
            title: "Phool",
            artist: "AUR",
            filePath: "trending/AUR - Phool  پھول.mp3",
            coverPath: "image.png"
        },
        {
            title: "Humsafar",
            artist: "AUR",
            filePath: "trending/Humsafar [128] Kbps-(SongsPk.com.se).mp3",
            coverPath: "image.png"
        },
        {
            title: "Kabhi Kabhi",
            artist: "AUR",
            filePath: "trending/Kabhi Kabhi(KoshalWorld.Com).mp3",
            coverPath: "image.png"
        },
        {
            title: "Par Ab Jo Aayegi Tu",
            artist: "AUR",
            filePath: "trending/Par Ab Jo Aayegi Tu - AUR(MpThree.in).mp3",
            coverPath: "image.png"
        },
        {
            title: "Sanam Teri Kasam",
            artist: "Ankit Tiwari",
            filePath: "trending/Sanam Teri Kasam Ankit Tiwari 128 Kbps.mp3",
            coverPath: "image.png"
        },
        {
            title: "Tera Chehra",
            artist: "Himesh Reshamiya",
            filePath: "trending/Tera Chehra Sanam Teri Kasam 128 Kbps.mp3",
            coverPath: "image.png"
        },
        {
            title: "Tu Hai Kahan",
            artist: "AUR",
            filePath: "trending/Tu Hai Kahan-(Mr-Jat.in).mp3",
            coverPath: "image.png"
        }
    ];

    const ninetSongs = [
        {
            title: "Baharon Phool Barsao",
            artist: "Mohammed Rafi",
            filePath: "ninet/Baharon Phool Barsao Mera Mehboob Aaya Hai(KoshalWorld.Com).mp3",
            coverPath: "90s.jpg"
        },
        {
            title: "Breathless",
            artist: "Shankar Mahadevan",
            filePath: "ninet/Breathless (PenduJatt.Com.Se).mp3",
            coverPath: "90s.jpg"
        },
        {
            title: "Dil To Bachcha Hai",
            artist: "Rahat Fateh Ali Khan",
            filePath: "ninet/Dil To Bachcha Hai Ishqiya 128 Kbps.mp3",
            coverPath: "90s.jpg"
        },
        {
            title: "Jaane Kahan Mera Jigar Gaya Ji",
            artist: "Mohammed Rafi",
            filePath: "ninet/Jaane Kahan Mera Jigar Gaya Ji(KoshalWorld.Com).mp3",
            coverPath: "90s.jpg"
        },
        {
            title: "Kajra Mohabbat Wala",
            artist: "Asha Bhosle",
            filePath: "ninet/Kajra Mohabbat Wala (PenduJatt.Com.Se).mp3",
            coverPath: "90s.jpg"
        },
        {
            title: "Ruk Ja O Dil Deewane",
            artist: "Udit Narayan",
            filePath: "ninet/Ruk Ja O Dil Deewane - Dilwale Dulhania Le Jayenge 128 Kbps.mp3",
            coverPath: "90s.jpg"
        },
        {
            title: "Tum Agar Saath Dene Ka Vada Karo",
            artist: "Mahendra Kapoor",
            filePath: "ninet/Tum Agar Saath Dene Ka Vada Karo - Hamraaz 128 Kbps.mp3",
            coverPath: "90s.jpg"
        }
    ];

    const audio = new Audio();
    let currentCategory = null;
    let currentSongIndex = -1;
    const trendingCardContainer = document.getElementById('trending-cards');
    const ninetCardContainer = document.getElementById('ninet-cards');

    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const seekBar = document.getElementById('seek-bar');

    const nowPlayingCover = document.getElementById('now-playing-cover');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    function generateTrendingSongCards() {
        let cardHTML = '';
        trendingSongs.forEach((song, index) => {
            cardHTML += `
                <div class="card" data-category="trending" data-index="${index}">
                    <div class="play-btn">
                        <div class="play-icon"></div>
                    </div>
                    <img src="${song.coverPath}" onerror="this.src='images/cover.jpg';">
                    <strong>${song.title}</strong>
                    <span>${song.artist}</span>
                </div>
            `;
        });
        trendingCardContainer.innerHTML = cardHTML;
    }

    function generateNinetSongCards() {
        let cardHTML = '';
        ninetSongs.forEach((song, index) => {
            cardHTML += `
                <div class="card" data-category="ninet" data-index="${index}">
                    <div class="play-btn">
                        <div class="play-icon"></div>
                    </div>
                    <img src="${song.coverPath}" onerror="this.src='images/cover.jpg';">
                    <strong>${song.title}</strong>
                    <span>${song.artist}</span>
                </div>
            `;
        });
        ninetCardContainer.innerHTML = cardHTML;
    }

    function playSong(category, songIndex) {
        const songsArray = category === 'trending' ? trendingSongs : ninetSongs;
        if (songIndex < 0 || songIndex >= songsArray.length) return;

        currentCategory = category;
        currentSongIndex = songIndex;
        const song = songsArray[currentSongIndex];

        audio.src = song.filePath;
        audio.load();
        audio.play().then(() => {
            playPauseBtn.src = "pause.svg";
        }).catch(() => {
            playPauseBtn.src = "play.svg";
        });
        updatePlayerUI(song);
        updatePlayingCardUI();
    }

    function updatePlayerUI(song) {
        nowPlayingCover.src = song.coverPath;
        nowPlayingTitle.innerText = song.title;
        nowPlayingArtist.innerText = song.artist;
    }

    function togglePlayPause() {
        if (!audio.src) return;
        if (audio.paused) {
            audio.play();
            playPauseBtn.src = "pause.svg";
        } else {
            audio.pause();
            playPauseBtn.src = "play.svg";
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateSeekBar() {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            seekBar.value = progress;
            currentTimeEl.innerText = formatTime(audio.currentTime);
            totalDurationEl.innerText = formatTime(audio.duration);
            seekBar.style.setProperty('--progress-percent', `${progress}%`);
        }
    }

    generateTrendingSongCards();
    generateNinetSongCards();

    currentCategory = null;
    currentSongIndex = -1;
    playPauseBtn.src = "play.svg";

    function updatePlayingCardUI() {
        document.querySelectorAll('.card.playing').forEach(card => {
            card.classList.remove('playing');
        });
        if (currentCategory) {
            const container = currentCategory === 'trending' ? trendingCardContainer : ninetCardContainer;
            const currentCard = container.querySelector(`.card[data-index="${currentSongIndex}"]`);
            if (currentCard) {
                currentCard.classList.add('playing');
            }
        }
    }

    function togglePlayPause() {
        if (!audio.src) return;
        if (audio.paused) {
            audio.play();
            playPauseBtn.src = "pause.svg";
            updatePlayingCardUI();
        } else {
            audio.pause();
            playPauseBtn.src = "play.svg";
            if (currentCategory) {
                const container = currentCategory === 'trending' ? trendingCardContainer : ninetCardContainer;
                const currentCard = container.querySelector(`.card[data-index="${currentSongIndex}"]`);
                if (currentCard) {
                    currentCard.classList.remove('playing');
                }
            }
        }
    }

    function handleCardClick(e) {
        const card = e.target.closest('.card');
        if (card) {
            const category = card.dataset.category;
            const songIndex = parseInt(card.dataset.index, 10);
            if (category === currentCategory && songIndex === currentSongIndex) {
                togglePlayPause();
            } else {
                playSong(category, songIndex);
            }
        }
    }

    trendingCardContainer.addEventListener('click', handleCardClick);
    ninetCardContainer.addEventListener('click', handleCardClick);

    playPauseBtn.addEventListener('click', togglePlayPause);

    prevBtn.addEventListener('click', () => {
        if (currentCategory) {
            const songsArray = currentCategory === 'trending' ? trendingSongs : ninetSongs;
            playSong(currentCategory, (currentSongIndex - 1 + songsArray.length) % songsArray.length);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentCategory) {
            const songsArray = currentCategory === 'trending' ? trendingSongs : ninetSongs;
            playSong(currentCategory, (currentSongIndex + 1) % songsArray.length);
        }
    });

    audio.addEventListener('timeupdate', updateSeekBar);

    seekBar.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = (seekBar.value / 100) * audio.duration;
        }
    });

    audio.addEventListener('ended', () => {
        if (currentCategory) {
            const container = currentCategory === 'trending' ? trendingCardContainer : ninetCardContainer;
            const currentCard = container.querySelector(`.card[data-index="${currentSongIndex}"]`);
            if (currentCard) {
                currentCard.classList.remove('playing');
            }
        }
        nextBtn.click();
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    document.body.appendChild(renderer.domElement);

    const particleCount = 10000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i*3] = (Math.random() * 2 - 1) * 1000;
        positions[i*3 + 1] = (Math.random() * 2 - 1) * 1000;
        positions[i*3 + 2] = (Math.random() * 2 - 1) * 1000;

        velocities[i*3] = (Math.random() - 0.5) * 0.5;
        velocities[i*3 + 1] = (Math.random() - 0.5) * 0.5;
        velocities[i*3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function animate() {
        requestAnimationFrame(animate);

        for (let i = 0; i < particleCount; i++) {
            positions[i*3] += velocities[i*3];
            positions[i*3 + 1] += velocities[i*3 + 1];
            positions[i*3 + 2] += velocities[i*3 + 2];

            for (let axis = 0; axis < 3; axis++) {
                if (positions[i*3 + axis] > 1000 || positions[i*3 + axis] < -1000) {
                    velocities[i*3 + axis] = -velocities[i*3 + axis];
                }
            }
        }

        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

});
