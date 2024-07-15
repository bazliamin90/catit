document.querySelectorAll('.audio-player').forEach(player => {
    const audio = player.querySelector('.audio');
    const playPauseButton = player.querySelector('.play-pause');
    const seekBar = player.querySelector('.seek-bar');
    const currentTime = player.querySelector('.current-time');
    const duration = player.querySelector('.duration');

    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });

    audio.addEventListener('loadedmetadata', () => {
        duration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        playPauseButton.textContent = 'Play';
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
