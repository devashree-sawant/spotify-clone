console.log("Welcome to Spotify");

// =======================
// INITIAL SETUP
// =======================
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Blue", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Every Breath You Take", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Perfect", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Last Christmas", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Love Story", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }
];

// =======================
// LOAD SONG DATA
// =======================
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// =======================
// HELPER FUNCTIONS
// =======================
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(el => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
};

const makeAllBackgrounds = () => {
    songItems.forEach(el => {
        el.classList.remove('active');
    });
};

// =======================
// MASTER PLAY / PAUSE
// =======================
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
    masterSongName.innerText = songs[songIndex].songName;
});

// =======================
// PROGRESS BAR
// =======================
audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = parseInt(
        (audioElement.currentTime / audioElement.duration) * 100
    );
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime =
        (myProgressBar.value * audioElement.duration) / 100;
});

// =======================
// SONG LIST CLICK
// =======================
Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', e => {

        makeAllPlays();
        makeAllBackgrounds();

        songIndex = parseInt(e.target.id);

        e.target.classList.replace('fa-play-circle', 'fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        songItems[songIndex].classList.add('active');

        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
    });
});

// =======================
// NEXT BUTTON
// =======================
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});

// =======================
// PREVIOUS BUTTON
// =======================
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});

// =======================
// AUTO PLAY NEXT
// =======================
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});

// =======================
// PLAY SONG FUNCTION
// =======================
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();
    makeAllBackgrounds();
    songItems[songIndex].classList.add('active');

    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
}
