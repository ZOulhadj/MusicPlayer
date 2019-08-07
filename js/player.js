const songTitle = document.querySelector('.song-name');
const previousIcon = document.querySelector('.previous');
const playIcon = document.querySelector('.play');
const nextIcon = document.querySelector('.next');
const songs = document.querySelectorAll('audio');

let index = 0;
let currentSong = songs[index];

// Display the first track name when the page loads
songTitle.textContent = songs[index].getAttribute('title');

playIcon.addEventListener('click', ()=> {
    if (currentSong.paused) {
        currentSong.play();
        playIcon.className = 'play fas fa-pause-circle fa-3x';
    } else {
        currentSong.pause();
        playIcon.className = 'play fas fa-play-circle fa-3x';
    }
});

previousIcon.addEventListener('click', ()=> {
    currentSong.currentTime = 0;
    currentSong.pause();

    // Loop around to the last song in the array if already at the start (bounds-checking)
    if (index == 0) {
        currentSong = songs[songs.length - 1];
        index = songs.length - 1;
    } else {
        currentSong = songs[--index];
    }

    // When ready to play the song, change title, play and change icon
    songTitle.textContent = songs[index].getAttribute('title');
    currentSong.play();
    playIcon.className = 'play fas fa-pause-circle fa-3x';
});

// Next icon
nextIcon.addEventListener('click', ()=> {
    currentSong.currentTime = 0;
    currentSong.pause();

    // If at the end of the array, return to the start (bounds-checking)
    if (index == songs.length - 1) {
        currentSong = songs[0];
        index = 0;
    } else {
        currentSong = songs[++index];
    }

    // When ready to play the song, change title, play and change icon
    songTitle.textContent = songs[index].getAttribute('title');
    currentSong.play();
    playIcon.className = 'play fas fa-pause-circle fa-3x';
});

