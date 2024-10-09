const play = document.querySelector('.play-pause');
const back = document.querySelector('.back');
const next = document.querySelector('.next');
const repro = document.querySelector('.repro');
const progress = document.querySelector('.progress');
const duration = document.querySelector('.duration');

let playing = false;
let currentSong = 0;

function checkPlaying() {
  if (!playing) {
    play.style.backgroundImage = "url('resources/Stop_and_play_fill_reverse.svg')";
  } else {
    play.style.backgroundImage = "url('resources/Play_fill.svg')";
  }
}

function renderData () {
  const albunImage = document.querySelector('.albun');
  const name = document.querySelector('.song-name');
  const albunName = document.querySelector('.albun-name');

  albunImage.style.backgroundImage =`url(resources/${songs[currentSong].albun})`;
  name.innerHTML = songs[currentSong].name;
  albunName.innerHTML = songs[currentSong].author;

}

const songs = [{
  name: 'Lost in the City Lights',
  albun : 'cover-1.png',
  author: 'Cosmo Sheldrake',
  audio: new Audio('resources/lost-in-city-lights-145038.mp3')
},{
  name: 'Forest Lullaby',
  albun : 'cover-2.png',
  author: 'Lesfm',
  audio: new Audio('resources/forest-lullaby-110624.mp3')
}];

let song = songs[currentSong].audio;

play.addEventListener('click', () => {
  
  checkPlaying();

  if(!playing) {
    song.play();
    playing = true;
  } else {
    song.pause();
    playing = false;
  }
});

next.addEventListener('click', () => {
  if(currentSong < songs.length - 1) {
    if (playing) {
      song.pause();
      currentSong++;
      renderData();
      song = songs[currentSong].audio;
      song.currentTime = 0;
      song.play();
    } else {
      checkPlaying();
      playing = true;
      currentSong++;
      renderData();
      song = songs[currentSong].audio;
      song.currentTime = 0;
      song.play();
    }
  }
})

back.addEventListener('click', () => {
  if (currentSong > 0) {
    if (playing) {
      song.pause();
      currentSong--;
      renderData();
      song = songs[currentSong].audio;
      song.currentTime = 0;
      song.play();
    } else {
      checkPlaying();
      playing = true;
      currentSong--;
      renderData();
      song = songs[currentSong].audio;
      song.currentTime = 0;
      song.play();
    }
  }
})

setInterval(() => {
  if(playing) {
    const totalSecondsRepro = song.currentTime;
    const minutesRepro = Math.floor(totalSecondsRepro / 60);
    const secondsRepro = Math.floor(totalSecondsRepro % 60);
    const timeRepro = (song.currentTime / song.duration) * 100;

    const totalSong = song.duration;
    const totalMinutes = Math.floor(totalSong / 60);
    const totalSeconds = Math.floor(totalSong % 60);

    progress.style.width = `${timeRepro}%`;

    duration.innerHTML = `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    repro.innerHTML = `${String(minutesRepro).padStart(2, '0')}:${String(secondsRepro).padStart(2, '0')}`;
  }
}, 1000);

