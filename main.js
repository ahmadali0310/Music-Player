// * Buttons play prev and next
const play = document.getElementById("btn-play");
const next = document.getElementById("btn-forword");
const prev = document.getElementById("btn-prev");

// * music-info pop-up
const music_popUp = document.querySelector(".music-info");

// * Progress and Progress Container
const progress = document.querySelector(".progress");
const progress_container = document.querySelector(".progress-container");

// * Cover Image
const image = document.querySelector(".cover");

// * Cover Title
const title = document.querySelector(".title");

// * Audio Tag
const audio = document.querySelector("audio");

// * Array for song names

const songs_Names = ["hey", "summer", "ukulele"];

let songIndex = 0;

loadSong(songs_Names[songIndex]);

// * Load the songs Initially

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  image.src = `images/${song}.jpg`;
}

// * For playing Song

function playSong() {
  music_popUp.classList.add("play");
  image.classList.add("play");
  play.querySelector(".fas").classList.remove("fa-play");
  play.querySelector(".fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  music_popUp.classList.remove("play");
  image.classList.remove("play");
  play.querySelector(".fas").classList.add("fa-play");
  play.querySelector(".fas").classList.remove("fa-pause");

  audio.pause();
}

play.addEventListener("click", (e) => {
  const isPlaying = music_popUp.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prev.addEventListener("click", (e) => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs_Names.length - 1;
  }
  loadSong(songs_Names[songIndex]);
  playSong();
});

next.addEventListener("click", (e) => {
  songIndex++;
  if (songIndex > songs_Names.length - 1) {
    songIndex = 0;
  }
  loadSong(songs_Names[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  let total_progress = (currentTime / duration) * 100;
  progress.style.width = `${total_progress}%`;
});

function updateSong(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progress_container.addEventListener("click", updateSong);
