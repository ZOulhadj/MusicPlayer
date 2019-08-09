// TODO: Lot of the same code... Clean the code up at some point

const songTitle = document.querySelector('.song-name');
const songTime = document.querySelector('.song-time');
const previousIcon = document.querySelector('.previous');
const playIcon = document.querySelector('.play');
const nextIcon = document.querySelector('.next');
const songs = document.querySelectorAll('audio');

let index = 0;
let currentSong = songs[index];
let autoplay = true;

// Display the first track name when the page loads
songTitle.textContent = songs[index].getAttribute('title');

// TODO: Change the way that this is done
let currentTime = () => {
    let minutes = Math.floor(songs[index].currentTime / 60);
    let seconds = Math.floor(songs[index].currentTime - minutes * 60);

    return `${minutes} : ${seconds}`;
}

songs.forEach(song => {

    // Display the current song time
    song.addEventListener('timeupdate', ()=> {
        if (songs[index].currentTime < 60) {
            songTime.textContent = Math.floor(songs[index].currentTime);
        } else {
            songTime.textContent = currentTime();
        }
    });

    song.addEventListener('ended', ()=> {
        if (autoplay) {
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
        }
    });
});
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

