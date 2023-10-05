const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playBtn = document.getElementById("play");

//Music
const song = [
  {
    name: "musik-1",
    displayName: "Build a bitch",
    artist: "Bella poarch",
  },
  {
    name: "musik-2",
    displayName: "Meri Jaan",
    artist: "Neti Mohan",
  },
  {
    name: "musik-3",
    displayName: "Masakali",
    artist: "Mohit Chauhaan",
  },
  {
    name: "musik-4",
    displayName: "Hanuman Chalisa",
    artist: "Unknown",
  },
  {
    name: "musik-5",
    displayName: "Chand Shifarish",
    artist: "Toshi Sabri",
  },
];

//check if playing
let isPlaying = false;

//play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//play or pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//Next song
function nextSong() {
  songIndex++;
  if (songIndex > song.length - 1) {
    songIndex = 0;
  }
  loadSong(song[songIndex]);
  playSong();
}
//previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = song.length - 1;
  }
  loadSong(song[songIndex]);
  playSong();
}
// onload select frst song
loadSong(song[songIndex]);

// upadte progress bar & time;

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //update the progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //delay switching the duration elements to avoid NaN flash
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set progress bar *{dragging the bar}
// we get all this information in the event object in the console of browser

function setProgressBar(e) {
  console.log(e);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  console.log(music);
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
