let songIndex = 0;
let audioElement = new Audio("One.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let currentTimeElement = document.getElementById('currentTime');
let durationTimeElement = document.getElementById('durationTime');

let songs = [
    { songName: "One Piece", filePath: "One.mp3" },
    { songName: "Death Note", filePath: "DeathNote.mp3" },
    { songName: "Your Name", filePath: "YourName.mp3" }
];

let songItems = Array.from(document.getElementsByClassName('songitem'));

const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
};

const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

audioElement.addEventListener('loadedmetadata', () => {
    durationTimeElement.innerText = formatTime(audioElement.duration);
});

audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
    currentTimeElement.innerText = formatTime(audioElement.currentTime);
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

songItems.forEach((element, i) => {
    element.getElementsByClassName('songitemplay')[0].addEventListener('click', (e) => {
        if (songIndex !== i) {
            songIndex = i;
            makeAllPlays();
            masterSongName.innerText = songs[songIndex].songName;
            playSong();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
        } else {
            if (audioElement.paused) {
                playSong();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
            } else {
                pauseSong();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
            }
        }
    });
});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex >= 1){
        songIndex = songIndex - 1;
    }
    else{
        songIndex = songs.length - 1;
    }
    makeAllPlays();
    playSong();
    masterSongName.innerText = songs[songIndex].songName;
    document.getElementById('masterPlay').classList.remove('fa-play');
    document.getElementById('masterPlay').classList.add('fa-pause');
});

document.getElementById('forward').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    makeAllPlays();
    playSong();
    masterSongName.innerText = songs[songIndex].songName;
    document.getElementById('masterPlay').classList.remove('fa-play');
    document.getElementById('masterPlay').classList.add('fa-pause');
});
