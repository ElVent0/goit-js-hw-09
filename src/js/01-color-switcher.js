const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorChosing() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

let interval = null;

function colorChanging() {
  interval = setInterval(colorChosing, 1000);
  startButtonEl.setAttribute('disabled', false);
  stopButtonEl.removeAttribute('disabled');
}

function colorStatic() {
  clearInterval(interval);
  stopButtonEl.setAttribute('disabled', false);
  startButtonEl.removeAttribute('disabled');
}

startButtonEl.addEventListener('click', colorChanging);

stopButtonEl.addEventListener('click', colorStatic);
