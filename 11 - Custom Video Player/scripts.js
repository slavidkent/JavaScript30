const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    video.paused ? video.play() : video.pause();
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + '%';
}
function updateProgress(e) {
    console.log(e);
    const time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;
}
function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}
function handleRangeUpdate() {
    if (sliderMouseDrag) {
        video[this.name] = this.value;
    }
}
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += Number(this.dataset.skip);
}

let progressMouseDrag = false;
let sliderMouseDrag = false;

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', updateProgress);
progress.addEventListener('mousedown', () => (progressMouseDrag = true));
progress.addEventListener('mousemove', (e)=> progressMouseDrag && updateProgress(e));
progress.addEventListener('mouseup', () => (progressMouseDrag = false));

toggle.addEventListener('click', togglePlay);

ranges.forEach((range) => range.addEventListener('mousedown', () => (sliderMouseDrag = true)));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mouseup', () => (sliderMouseDrag = false)));

skipButton.forEach((skipBtn) => skipBtn.addEventListener('click', skip));
