let zSpacing = -800;
lastPos = zSpacing / 5;
$frames = document.getElementsByClassName('frame');
frames = Array.from($frames);
zVals = [];

window.onscroll = function () {
    let top = document.documentElement.scrollTop;
    delta = lastPos - top;
    lastPos = top;

    frames.forEach(function (n, i) {
        zVals.push((i * zSpacing) + zSpacing);
        zVals[i] += delta * -5.5;
        let frame = frames[i];
        transform = `translateZ(${zVals[i]}px)`;
        opacity = zVals[i] < Math.abs(zSpacing) / 1.8
            ? 1
            : 0;
        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`);
    });
};

window.scrollTo(0, 1);

let soundButton = document.querySelector('.soundbutton');
audio = document.querySelector('.audio');

soundButton.addEventListener('click', e => {
    soundButton.classList.toggle('paused');
    audio.paused
        ? audio.play()
        : audio.pause();
});

window.onfocus = function () {
    soundButton.classList.contains('paused')
        ? audio.pause()
        : audio.play();
};

window.onblur = function () {
    audio.pause()
};

const items = document.querySelectorAll('.countdown-item > h4');
const countdownElement = document.querySelector('.countdown');

let countdownDate = new Date(2024, 3, 4, 0, 0, 0).getTime();

function getCountdownTime() {

    const now = new Date().getTime();

    const distance = countdownDate - now;

    const second = 1000;
    const day = 24 * 60 * 60 * 1000;
    const hour = 60 * 60 * 1000;
    const minute = 60 * 1000;

    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);

    const values = [days, hours, minutes, seconds];
    
    items.forEach(function(item, index) {
        item.textContent = values[index];
    });

    if (distance < 0) {
        clearInterval(countdown);
        countdownElement.innerHTML = '<h3>33!</h3>';
    };
};

let countdown = setInterval(getCountdownTime, 1000);

getCountdownTime();
