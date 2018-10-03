/* get elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



function togglePlay(){
  video[video.paused ? 'play' : 'pause']();
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}
function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}
function updateProgressBar(){
  video[this.name] = this.value;
}
function handleProgress(){
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}
function updateVideoTime(e){
  if(!e.isTrusted) return;
  console.log(e);
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// handle buttons
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach( button => button.addEventListener('click', skip));

// handle progress bar movemnt and clicking
ranges.forEach( range => range.addEventListener('change', updateProgressBar));
ranges.forEach( range => range.addEventListener('mousemove', updateProgressBar));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', updateVideoTime);

// handle mouse click and drag
let mousedown = false;

progress.addEventListener('mousemove', (e) => mousedown && updateProgressBar(e) );
progress.addEventListener('mousedown', () => mousedown = true  );
progress.addEventListener('mouseup', () => mousedown = false  );
